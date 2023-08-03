import { NextRequest } from "next/server"; // Importing the NextRequest type from the next/server module
import jwt from "jsonwebtoken"; // Importing the jwt library for JSON Web Token handling

// Defining a function named getDataFromToken that takes a NextRequest object as an argument
export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || ""; // Accessing the value of the "token" cookie from the request object

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!); // Verifying the token using the JWT_SECRET environment variable

    return decodedToken.id!; // Returning the "id" property from the decoded token
  } catch (error: any) {
    console.log(error); // Logging the error to the console
    throw new Error(error.message); // Throwing a new error with the error message
  }
};
