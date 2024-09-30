/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    //Verification
    const userWithToken = await User.findOne({
      verifyToken: token,
    });
    if (!userWithToken) {
      return NextResponse.json(
        {
          message: "User has already verified",
        },
        {
          status: 200,
        }
      );
    }
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid Token : Your token is expired",
        },
        {
          status: 400,
        }
      );
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Your Email has been verified successfully!",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // if (error instanceof error) {
    //   throw new error("some unknown error occured");
    // }
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
