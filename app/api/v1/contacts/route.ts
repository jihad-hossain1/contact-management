import connectDB from "@/helpers/connectdb";
import Contact from "@/models/contact.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || name == "") {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  } else if (!email || email == "") {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  } else if (!message || message == "") {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  try {
    await connectDB();

    await Contact.create({
      name,
      email,
      message,
    });

    return NextResponse.json(
      {
        message: "Thank you for your message!",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function GET() {
  try {
    const contacts = await Contact.find();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
