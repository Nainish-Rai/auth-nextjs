// Import the mongoose library
import mongoose from "mongoose";

// Create a new mongoose schema for the user
const userSchema = new mongoose.Schema({
  // Define the username field with type String and required property
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  // Define the email field with type String and required property
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  // Define the password field with type String and required property
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  // Define the isVerified field with type Boolean and default value of false
  isVerified: {
    type: Boolean,
    default: false,
  },
  // Define the isAdmin field with type Boolean and default value of false
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // Define the forgotPasswordToken field with type String
  forgotPasswordToken: String,
  // Define the forgotPasswordTokenExpiry field with type Date
  forgotPasswordTokenExpiry: Date,
  // Define the verifyToken field with type String
  verifyToken: String,
  // Define the verifyTokenExpiry field with type Date
  verifyTokenExpiry: Date,
});

// Create a new mongoose model using the user schema
const user = mongoose.models.user || mongoose.model("user", userSchema);

// Export the user model
export default user;
