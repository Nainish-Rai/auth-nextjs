import { NextResponse } from "next/server";

// Define an asynchronous function named GET
export async function GET() {
  try {
    // Create a response object with a JSON payload containing the message "Logout Successful"
    const response = NextResponse.json({ message: "Logout Successfull" });

    // Set the "token" cookie in the response object with an empty value
    response.cookies.set("token", "", {
      httpOnly: true,
    });

    // Return the response object
    return response;
  } catch (error: any) {
    // If an error occurs, create a response object with a JSON payload containing the error message
    // and a status code of 500 (Internal Server Error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
