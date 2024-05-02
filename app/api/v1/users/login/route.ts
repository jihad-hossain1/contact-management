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

    // const token = jwt.sign(
    //   { user: { fullname: user.fullname, email: user.email } },
    //   process.env.JWT_SECRET as string,
    //   { expiresIn: "10h" }
    // );

    // if (typeof window !== "undefined") {
    //   sessionStorage.setItem("token", token);
    // }

    // return NextResponse.json(
    //   {
    //     messsage: "Login successful",
    //   },
    //   { status: 200 }
    // );

    const tokenData = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    };

    // console.log("user from tokendata", tokenData);

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "10h",
    });

    const response = NextResponse.json({
      message: "login successfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: false,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
