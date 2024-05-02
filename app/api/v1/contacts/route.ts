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

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const searchTerm = searchParams.get("searchTerm");

  const sortBy = searchParams.get("sortBy") || "createdAt";

  const sortOrder = searchParams.get("sortOrder") || "asc";

  const parsedPage = parseInt(page.toString(), 10) || 1;

  const parsedPageSize = parseInt(pageSize.toString(), 10) || 10;

  const parsedSortOrder = sortOrder.toLowerCase() === "asc" ? "asc" : "desc";

  let where: Record<string, any> = {};

  if (searchTerm) {
    const searchFields = ["name", "email"];
    where = {
      $or: searchFields.map((field) => ({
        [field]: { $regex: searchTerm.toLowerCase(), $options: "i" },
      })),
    };
  }

  let sort: Record<string, any> = {};
  sort[sortBy] = parsedSortOrder;

  let skip = 0;

  if (parsedPage > 1 && !searchTerm) {
    skip = (parsedPage - 1) * parsedPageSize;
  }

  try {
    await connectDB();

    const [data, total] = await Promise.all([
      Contact.find(where).sort(sort).skip(skip).limit(parsedPageSize).exec(),
      Contact.countDocuments(where),
    ]);

    const allData = await Contact.find({});

    return NextResponse.json({
      data,
      total,
      page: parsedPage,
      pageSize: parsedPageSize,
      searchTerm: searchTerm || "",
      allData,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

