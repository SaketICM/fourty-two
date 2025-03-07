"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { LinkedInPost } from "./components/linkedin-post";
import { InstagramPost } from "./components/instagram-post";
import { TwitterPost } from "./components/twitter-post";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

export type Article = {
  id: string;
  image: string;
  text: string;
  citation: string;
  meta: {
    likes: number;
    reach: number;
    impressions: number;
  };
};

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const [articleValues, setArticleValues] = useState<{
    [key: string]: Article;
  }>({});

  // Toggle edit mode for a specific article
  const toggleEditMode = (id: string) => {
    setEditStates((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!editStates[id]) {
      setArticleValues((prev) => ({
        ...prev,
        [id]: articles.find((article) => article.id === id) || {
          id: "",
          image: "",
          text: "",
          citation: "",
          meta: {
            likes: 0,
            reach: 0,
            impressions: 0,
          },
        },
      }));
    }
  };

  // Handle input change for a specific article
  const handleChange = (
    id: string,
    field: keyof Article["meta"],
    value: number
  ) => {
    setArticleValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        meta: {
          likes: prev[id]?.meta?.likes || 0,
          reach: prev[id]?.meta?.reach || 0,
          impressions: prev[id]?.meta?.impressions || 0,
          [field]: value,
        },
      },
    }));
  };

  // Handle submit for a specific article
  const handleSubmit = (id: string) => {
    console.log(`Updated values for article ${id}:`, articleValues[id]?.meta);
    toggleEditMode(id);
  };

  // Mock articles data
  const articles: Article[] = [
    {
      id: "87y",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉Excited to share that I've just completed a major redesign project forour flagship product! 🎉Excited to share that I've just completed a major redesign project forour flagship product! 🎉Excited to share that I've just completed a major redesign project forour flagship product! 🎉Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
      citation: "Trends in retail investors shifting from stocks to bonds",
      meta: {
        likes: 100,
        reach: 1000,
        impressions: 973,
      },
    },
    {
      id: "98",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
      citation: "Trends in retail investors shifting from stocks to bonds",
      meta: {
        likes: 10,
        reach: 243,
        impressions: 155,
      },
    },
    {
      id: "09oji",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
      citation: "Trends in retail investors shifting from stocks to bonds",
      meta: {
        likes: 100,
        reach: 1000,
        impressions: 973,
      },
    },
    {
      id: "09oi",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
      citation: "Trends in retail investors shifting from stocks to bonds",
      meta: {
        likes: 100,
        reach: 1000,
        impressions: 973,
      },
    },
    {
      id: "09o978i",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
      citation: "Trends in retail investors shifting from stocks to bonds",
      meta: {
        likes: 100,
        reach: 1000,
        impressions: 973,
      },
    },
    {
      id: "98oi",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
      citation: "Trends in retail investors shifting from stocks to bonds",
      meta: {
        likes: 100,
        reach: 1000,
        impressions: 973,
      },
    },
  ];

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const handleNavigation = (query = {}) => {
    router.push(`${pathname}?${new URLSearchParams(query).toString()}`);
  };

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto">
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
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="cursor-pointer"
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="flex gap-6 justify-center pb-2 my-16">
        <div>
          <h3
            className={`text-md cursor-pointer ${
              searchParams.get("page") === "create_post"
                ? "text-red-600 bg-red-200 rounded-md px-2 py-1"
                : "text-black py-1"
            }`}
            onClick={() => handleNavigation({ page: "create_post" })}
          >
            Create Post
          </h3>
        </div>
        <div>
          <h3
            className={`text-md cursor-pointer ${
              searchParams.get("page") === "old_post"
                ? "text-red-600 bg-red-200 rounded-md px-2 py-1"
                : "text-black py-1"
            }`}
            onClick={() => handleNavigation({ page: "old_post" })}
          >
            Old Post
          </h3>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {searchParams.get("page") === "create_post" && (
          <div>
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-4xl font-bold">
                Diversify with confidence
              </h2>
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
                <div className="absolute inset-y-0 h-9 text-gray-400 right-0 flex items-center pr-3">
                  <Search />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden p-4">
              <CardHeader className="p-4">
                <div className="flex justify-center">
                  <Image
                    height={200}
                    width={200}
                    className="w-full rounded-lg"
                    alt="News Image"
                    src={article.image}
                  />
                </div>
              </CardHeader>
              <CardContent className="text-center px-2">
                <Textarea
                  className="mb-2 text-sm text-gray-500 overflow-y-auto h-[120px]"
                  defaultValue={article.text}
                ></Textarea>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 pb-4">
                {searchParams.get("page") === "create_post" ? (
                  <div className="gap-4 flex">
                    <LinkedInPost article={article} />
                    <InstagramPost article={article} />
                    <TwitterPost article={article} />
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-left">
                      <div className="flex items-center ml-8 my-5">
                        <Heart className="cursor-pointer" />
                        <input
                          type="input"
                          value={
                            articleValues[article.id]?.meta?.likes ??
                            article.meta?.likes
                          }
                          className="max-w-14 ml-2 text-lg focus:outline-0"
                          readOnly={!editStates[article.id]}
                          onChange={(e) =>
                            handleChange(
                              article.id,
                              "likes",
                              Number(e.target.value)
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center my-5 ml-5">
                        <Send className="cursor-pointer" />
                        <input
                          type="input"
                          value={
                            articleValues[article.id]?.meta?.reach ??
                            article.meta?.reach
                          }
                          className="max-w-14 ml-2 text-lg focus:outline-0"
                          readOnly={!editStates[article.id]}
                          onChange={(e) =>
                            handleChange(
                              article.id,
                              "reach",
                              Number(e.target.value)
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center my-5 ml-5">
                        <ChartNoAxesColumn className="cursor-pointer" />
                        <input
                          type="input"
                          value={
                            articleValues[article.id]?.meta?.impressions ??
                            article.meta?.impressions
                          }
                          className="max-w-14 ml-2 text-lg focus:outline-0"
                          readOnly={!editStates[article.id]}
                          onChange={(e) =>
                            handleChange(
                              article.id,
                              "impressions",
                              Number(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        className="px-16 py-4 rounded-xl cursor-pointer"
                        size="sm"
                        onClick={() => toggleEditMode(article.id)}
                      >
                        {`${editMode ? "Cancel" : "Edit"}`}
                      </Button>
                      <Button
                        className="px-16 py-4 rounded-xl"
                        size="sm"
                        disabled={!editStates[article.id]}
                        onClick={() => handleSubmit(article.id)}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
