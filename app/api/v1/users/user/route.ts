import connectDB from "@/helpers/connectdb";
import { getUserInfoFromToken } from "@/helpers/userInfo";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userId = await getUserInfoFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
