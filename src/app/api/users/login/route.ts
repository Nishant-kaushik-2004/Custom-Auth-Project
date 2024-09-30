import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exists",
        },
        { status: 400 }
      );
    }
    console.log("user exists");
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }
    console.log("user pssword valid");
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //we had put this exclamation in surity that this value will 100% come ,so that typescript won't show any error.
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "LoggedIn successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
