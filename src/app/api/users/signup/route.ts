import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { User } from "@/models/userModel";
import SendEmail from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    //Validation
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      console.log(user);
      return NextResponse.json(
        { error: "User already exists with the same email" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log("just before saving user");
    const savedUser = await newUser.save();
    console.log("user saved");
    console.log(savedUser);

    //send Verification mail
    await SendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({
      message: "User registerd successfully",
      success: true,
      savedUser,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
