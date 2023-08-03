// Import the 'connect' function from the 'dbConfig' module
import { connect } from "@/dbConfig/dbConfig";

// Import the 'user' model from the 'userModel' module
import user from "@/models/userModel";

// Import the 'NextRequest' and 'NextResponse' types from the 'next/server' module
import { NextRequest, NextResponse } from "next/server";

// Import the 'bcryptjs' module for password hashing
import bcryptjs from "bcryptjs";

// Connect to the database
connect();

// Define an async function named 'POST' that takes a 'request' parameter of type 'NextRequest'
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request
    const reqBody = await request.json();
    console.log(reqBody);
    const { username, email, password } = reqBody;

    // Check if a user with the same email already exists in the database
    const userExists = await user.findOne({ email });

    if (userExists) {
      // If user already exists, return a JSON response with an error message and status code 400
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }

    // Generate a salt for password hashing
    const salt = await bcryptjs.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new 'user' object with the provided username, email, and hashed password
    const newUser = new user({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Return a JSON response with a success message, the saved user object, and status code 200
    return NextResponse.json(
      { message: "user created successfully", savedUser },
      { status: 200 }
    );
  } catch (error: any) {
    // If an error occurs, return a JSON response with the error message and status code 500
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
