import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/helpers/connectdb";

export async function POST(request: NextRequest) {
  const { fullname, email, password } = await request.json();
  if (!fullname || fullname == "") {
    return NextResponse.json(
      { error: "fullname is required" },
      { status: 400 }
    );
  } else if (!email || email == "") {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  } else if (!password || password == "") {
    return NextResponse.json(
      { error: "password is required" },
      { status: 400 }
    );
  } else if (password.length < 6) {
    return NextResponse.json(
      { error: "password must be at least 6 characters" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "user created successfully" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
