// Import the necessary functions and modules
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import user from "@/models/userModel";

// Connect to the database
connect();

// Define the GET function that handles the request
export async function GET(req: NextRequest) {
  try {
    // Extract the user ID from the token
    const userId = await getDataFromToken(req);

    // Find the user in the database by their ID and exclude the password and isAdmin fields
    const userOnDB = await user.findById(userId).select("-password -isAdmin");

    // Return a JSON response with a success message and the user object
    return NextResponse.json({ message: "Success", user: userOnDB });
  } catch (error: any) {
    // Return a JSON response with the error message and a status code of 500
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
