"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userEmail", email);
        router.push("/workspace");
      } else {
        setMsg(data.error || "Login failed!");
      }
    } catch (err) {
      console.error(err);
      setMsg("Something went wrong");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 text-black">
      <Card className="w-[350px] shadow-md border rounded-2xl">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Login</h2>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 mb-3">
          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-black underline ">
              Sign Up
            </Link>
          </p>
          {msg && (
            <p className="text-center text-sm text-gray-600">{msg}</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
