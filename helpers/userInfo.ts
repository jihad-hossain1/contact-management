import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getUserInfoFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("token from decodedToken: ", decodedToken.id);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
