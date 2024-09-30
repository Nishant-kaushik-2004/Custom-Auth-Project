import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "Logged out successfully", 
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
