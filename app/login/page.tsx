"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = loginUser(email, password);

      if (result.success) {
        toast.success("You have been logged in successfully");
        router.push("/home");
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center">
            <div className="mr-2 flex h-8 w-8 items-center justify-center border-2 border-blue-600">
              <div className="text-orange-500">✓</div>
            </div>
            <span className="text-xl font-bold">
              <span className="text-blue-600">InCred</span>
              <span className="text-orange-500">Money</span>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Submit"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-orange-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          By proceeding, I accept the{" "}
          <Link href="/terms" className="text-orange-500 hover:underline">
            Terms & Conditions
          </Link>
          , and agree to receive messages such as OTPs & important updates on
          WhatsApp.
        </div>
      </div>
    </div>
  );
}
