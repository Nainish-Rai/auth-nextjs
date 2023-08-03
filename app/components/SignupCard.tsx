"use client";

// Importing necessary dependencies and components
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
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

// Creating a functional component called SignupCard
export function SignupCard() {
  // Initializing necessary state variables
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  // Function to handle signup process
  async function onSignUp() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup successfull", response.data);
      router.push("/login"); // Redirecting to login page after successful signup
    } catch (error: any) {
      console.log(error);
      toast.error(`Error: ${error.response.data.error}`); // Displaying error message using toast notification
    } finally {
      setLoading(false);
    }
  }

  // Effect hook to enable/disable signup button based on user input
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // Rendering the SignupCard component
  return (
    <Card className="w-[350px]">
      {/* Toaster for displaying toast message */}
      <Toaster />
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>SignUp into your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => router.push("/login")} variant="outline">
          Login
        </Button>
        <Button disabled={buttonDisabled} onClick={() => onSignUp()}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "SignUp"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
