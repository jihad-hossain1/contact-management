import connectDB from "@/helpers/connectdb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
