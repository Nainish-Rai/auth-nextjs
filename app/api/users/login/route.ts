// Import the 'connect' function from the 'dbConfig' module
import { connect } from "@/dbConfig/dbConfig";

// Import the 'user' model from the 'userModel' module
import user from "@/models/userModel";

// Import the 'NextRequest' and 'NextResponse' types from the 'next/server' module
import { NextRequest, NextResponse } from "next/server";

// Import the 'bcryptjs' module for password hashing
import bcryptjs from "bcryptjs";

// Import the 'jwt' module for token creation
import jwt from "jsonwebtoken";

// Connect to the database
connect();

// Define an async function named 'POST' that takes a 'request' parameter of type 'NextRequest'
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request
    const reqBody = await request.json();

    const { email, password } = reqBody;

    // Check if a user with the same email already exists in the database
    const userOnDB = await user.findOne({ email });

    if (!userOnDB) {
      // If user does not exist, return a JSON response with the error message and status code 400
      return NextResponse.json(
        { error: "user does not exists" },
        { status: 400 }
      );
    }

    // Check if the provided password matches the hashed password stored in the database
    const isValid = await bcryptjs.compare(password, userOnDB.password);

    // If the password is not valid, return a JSON response with the error message and status code 400
    if (!isValid) {
      return NextResponse.json({ error: "invalid password" }, { status: 400 });
    }

    // Create token data with user information
    const tokenData = {
      id: userOnDB._id,
      username: userOnDB.username,
      email: userOnDB.email,
    };

    // Create a token using jwt and a secret key, with a validity of 7 days
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "7day",
    });

    // Create a JSON response with a success message and status code 200
    const response = NextResponse.json(
      { message: "Login Successful" },
      { status: 200 }
    );

    // Set the token as a cookie in the response
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // Return the response
    return response;
  } catch (error: any) {
    // If an error occurs, return a JSON response with the error message and status code 500
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
