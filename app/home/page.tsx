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
import { ChartNoAxesColumn, Heart, Send } from "lucide-react";

interface Article {
  id: number;
  date: string;
  title: string;
}

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [likes, setLikes] = useState(0);
  const [reach, setReach] = useState(0);
  const [impressions, setImpressions] = useState(0);

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
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden p-4">
              <img />
              <CardContent className="flex">
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
                <h3 className="font-medium m-5">{article.title}</h3>
              </CardContent>
              <CardFooter className="flex justify-center pb-4"></CardFooter>

              <div className="flex justify-left">
                <div className="flex items-center ml-8 my-5">
                  <Heart className="cursor-pointer" />
                  <input
                    type="input"
                    value={likes}
                    readOnly={!editMode}
                    onChange={(e) => setLikes(Number(e.target.value))}
                    className="max-w-14 ml-2 text-lg focus:outline-0"
                  />
                </div>

                <div className="flex items-center my-5 ml-5">
                  <Send className="cursor-pointer" />
                  <input
                    type="input"
                    value={reach}
                    readOnly={!editMode}
                    onChange={(e) => setReach(Number(e.target.value))}
                    className="max-w-14 ml-2 text-lg focus:outline-0"
                  />
                </div>

                <div className="flex items-center my-5 ml-5">
                  <ChartNoAxesColumn className="cursor-pointer" />
                  <input
                    type="input"
                    value={impressions}
                    readOnly={!editMode}
                    onChange={(e) => setImpressions(Number(e.target.value))}
                    className="max-w-14 ml-2 text-lg focus:outline-0"
                  />
                </div>
              </div>

              <CardFooter className="flex justify-start gap-4 p-4">
                <Button
                  variant="outline"
                  className="px-20 py-4 rounded-xl cursor-pointer"
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  {`${editMode ? 'Cancel' : 'Edit'}`}
                </Button>

                <Button className="px-20 py-4 rounded-xl" size="sm">
                  Submit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
