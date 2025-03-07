"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";

interface Article {
  id: number;
  date: string;
  title: string;
}

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock articles data
  const articles: Article[] = [
    {
      id: 1,
      date: "Feb 14, 2025",
      title: "Trends in retail investors shifting from stocks to bonds",
    },
    {
      id: 2,
      date: "Feb 14, 2025",
      title: "Trends in retail investors shifting from stocks to bonds",
    },
    {
      id: 3,
      date: "Feb 14, 2025",
      title: "Trends in retail investors shifting from stocks to bonds",
    },
    {
      id: 4,
      date: "Feb 14, 2025",
      title: "Trends in retail investors shifting from stocks to bonds",
    },
    {
      id: 5,
      date: "Feb 14, 2025",
      title: "Trends in retail investors shifting from stocks to bonds",
    },
    {
      id: 6,
      date: "Feb 14, 2025",
      title: "Trends in retail investors shifting from stocks to bonds",
    },
  ];

  useEffect(() => {
    // Check if user is authenticated
    const token = getToken();

    // If no token exists, redirect to login page
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <div className="mr-2 flex h-8 w-8 items-center justify-center border-2 border-blue-600">
              <div className="text-orange-500">✓</div>
            </div>
            <span className="text-xl font-bold">
              <span className="text-blue-600">InCred</span>
              <span className="text-orange-500">Money</span>
            </span>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-4xl font-bold">Diversify with confidence</h2>
          <p className="text-gray-600">
            Robust financial products for your satellite investments.
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Hinted search text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 rounded-full"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-2 text-sm text-gray-500">{article.date}</p>
                <h3 className="font-medium">{article.title}</h3>
              </CardContent>
              <CardFooter className="flex justify-center pb-4">
                <Button variant="ghost" size="sm" className="text-xs">
                  View details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
