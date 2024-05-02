import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/helpers/connectdb";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || email == "") {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  } else if (!password || password == "") {
    return NextResponse.json(
      { error: "password is required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Email are not valid" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Password are not valid" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { user: { fullname: user.fullname, email: user.email } },
      process.env.JWT_SECRET as string,
      { expiresIn: "10h" }
    );

    if (typeof window !== "undefined") {
      sessionStorage.setItem("token", token);
    }

    return NextResponse.json(
      {
        messsage: "Login successful",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
