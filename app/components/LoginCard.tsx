"use client";

// Importing necessary dependencies
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Defining the LoginCard component
export function LoginCard() {
  const router = useRouter();

  // State for user input
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  // State for button disabled state
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  // State for loading state
  const [loading, setLoading] = React.useState(false);

  // Function to handle login
  async function onLogin() {
    try {
      setLoading(true);

      // Sending login request to the server
      const response = await axios.post("/api/users/login", user);
      console.log("login successful", response.data);

      // Redirecting to profile page after successful login
      router.push("/profile");
    } catch (error: any) {
      console.log(error);

      // Displaying error message using toast notification
      toast.error(`Something went wrong: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  // Effect hook to enable/disable login button based on user input
  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // Rendering the LoginCard component
  return (
    <Card className="w-[350px]">
      <Toaster />

      {/* Card header */}
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login into your account</CardDescription>
      </CardHeader>

      {/* Card content */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              {/* Email label */}
              <Label htmlFor="email">Email</Label>

              {/* Email input */}
              <Input
                id="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              {/* Password label */}
              <Label htmlFor="password">Password</Label>

              {/* Password input */}
              <Input
                id="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </div>
        </form>
      </CardContent>

      {/* Card footer */}
      <CardFooter className="flex justify-between">
        {/* Signup button */}
        <Button onClick={() => router.push("/signup")} variant="outline">
          Signup
        </Button>

        {/* Login button */}
        <Button disabled={buttonDisabled} onClick={() => onLogin()}>
          {loading ? (
            // Loading state
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            // Default state
            "SignIn"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
