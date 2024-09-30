/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    // extract Data from token
    const userId = await GetDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    // check if there is no user
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
