"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllPosts, getToken, updatePostMeta } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ChartNoAxesColumn, Heart, Loader, Loader2, Send } from "lucide-react";
import { LinkedInPost } from "./components/linkedin-post";
import { InstagramPost } from "./components/instagram-post";
import { TwitterPost } from "./components/twitter-post";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import removeMarkdown from "remove-markdown";

export type Article = {
  id: string;
  image?: string;
  text: string;
  citation?: string;
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
  const [currentState, setcurrentState] = useState("create_post");
  const [isLoading, setIsLoading] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const [articles, setArticles] = useState<Article[] | null>(null);
  const [oldArticles, setoldArticles] = useState<Article[] | null>();
  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const [articleValues, setArticleValues] = useState<{
    [key: string]: Article;
  }>({});

  useEffect(() => {
    getAllPosts().then((data) => {
      if (data?.success) {
        setoldArticles(data?.posts);
      } else {
        setoldArticles([]);
      }
    });
  }, []);

  // Toggle edit mode for a specific article
  const toggleEditMode = (id: string) => {
    setEditStates((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!editStates[id]) {
      setArticleValues((prev) => ({
        ...prev,
        [id]: articles?.find((article) => article.id === id) || {
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

  // Fetch news with keywords
  const textKeywords = async (text: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://team42.incredmoney.com/users/prompts/text",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await response.json();

      setIsLoading(false);

      console.log("93 : ", data);

      if (!data.success) {
        return {
          success: false,
          message: data.message || "Unable to fetch data for the keyword(s)",
        };
      }

      return {
        success: true,
        message: "Data fetched successfully",
        data: data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to fetch data for the keyword(s)",
      };
    }
  };

  // Fetch news with keywords
  const summarisedResponse = async (_id: string) => {
    try {
      setIsSummaryLoading(true);
      const response = await fetch(
        `https://team42.incredmoney.com/users/prompts/text/${_id}/summarize`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = await response.json();

      const updatedArticle = articles?.map((article) => ({
        ...article,
        text: article.id === data.data._id ? data?.data?.summary : article.text,
      }));

      if (updatedArticle) {
        setArticles(updatedArticle);
      }

      setIsSummaryLoading(false);

      if (!data.success) {
        return {
          success: false,
          message: data.message || "Unable to fetch summarize data",
        };
      }

      return {
        success: true,
        message: "Data fetched successfully",
        token: data.token,
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to fetch summarize data",
      };
    }
  };

  const handleTextCall = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchQuery, "2");

    if (!searchQuery) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const result: any = await textKeywords(searchQuery);

      if (result.success) {
        toast.success("Data fetch Successfully");

        const formattedData = result?.data?.choices?.map((choice: any) => ({
          id: result.data._id,
          text: removeMarkdown(choice.message.content),
        }));
        setArticles(formattedData);
      } else {
        toast.error(
          result.message || "Unable to fetch data for the keyword(s)"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
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
  const handleSubmit = async (id: string) => {
    const result = await updatePostMeta(id, articleValues[id]?.meta);

    if (result?.success) {
      toast.success("Article updated successfully");
    } else {
      toast.error("Failed to update article");
    }

    toggleEditMode(id);
  };

  // Mock articles data
  // const articles: Article[] = [
  //   {
  //     id: "87y",
  //     image:
  //       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  //     text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉Excited to share that I've just completed a major redesign project forour flagship product! 🎉Excited to share that I've just completed a major redesign project forour flagship product! 🎉Excited to share that I've just completed a major redesign project forour flagship product! 🎉Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
  //     citation: "Trends in retail investors shifting from stocks to bonds",
  //     meta: {
  //       likes: 100,
  //       reach: 1000,
  //       impressions: 973,
  //     },
  //   },
  //   {
  //     id: "98",
  //     image:
  //       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  //     text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
  //     citation: "Trends in retail investors shifting from stocks to bonds",
  //     meta: {
  //       likes: 10,
  //       reach: 243,
  //       impressions: 155,
  //     },
  //   },
  //   {
  //     id: "09oji",
  //     image:
  //       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  //     text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
  //     citation: "Trends in retail investors shifting from stocks to bonds",
  //     meta: {
  //       likes: 100,
  //       reach: 1000,
  //       impressions: 973,
  //     },
  //   },
  //   {
  //     id: "09oi",
  //     image:
  //       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  //     text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
  //     citation: "Trends in retail investors shifting from stocks to bonds",
  //     meta: {
  //       likes: 100,
  //       reach: 1000,
  //       impressions: 973,
  //     },
  //   },
  //   {
  //     id: "09o978i",
  //     image:
  //       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  //     text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
  //     citation: "Trends in retail investors shifting from stocks to bonds",
  //     meta: {
  //       likes: 100,
  //       reach: 1000,
  //       impressions: 973,
  //     },
  //   },
  //   {
  //     id: "98oi",
  //     image:
  //       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  //     text: "Excited to share that I've just completed a major redesign project forour flagship product! 🎉",
  //     citation: "Trends in retail investors shifting from stocks to bonds",
  //     meta: {
  //       likes: 100,
  //       reach: 1000,
  //       impressions: 973,
  //     },
  //   },
  // ];

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

  // if (isLoading) {
  //   return <Loader2 className="absolute left-1/2 top-1/2 w-10 animate-spin" />;
  // }
  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto">
      <header className="border-b py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <div className="mr-2 flex h-8 w-8 items-center justify-center border-2 border-blue-600">
              <div className="text-orange-500">✓</div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Team42
            </span>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="cusor-pointer"
          >
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Logout
            </span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs
          defaultValue="create_post"
          value={currentState}
          className="flex h-full justify-items-start space-x-4 lg:p-0 mb-8"
        >
          <TabsList>
            <TabsTrigger value="create_post" className="relative" asChild>
              <Link href={""} onClick={() => setcurrentState("create_post")}>
                Create Post
              </Link>
            </TabsTrigger>
            <TabsTrigger value="old_post" className="relative" asChild>
              <Link href={""} onClick={() => setcurrentState("old_post")}>
                Old Post
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {currentState !== "old_post" && (
          <div>
            <div className="mb-12 mt-40 text-center">
              <h2
                className="mb-2 text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >Leave the ordinary behind</h2>
              <p className="text-gray-600">
                Create you next social media post with AI
              </p>
            </div>

            <div className="mb-12 flex justify-center">
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Start typing your next post..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 rounded-full"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTextCall(e);
                    }
                  }}
                />
                <div className="absolute inset-y-0 h-9 text-gray-400 right-0 flex items-center pr-3">
                  <Search size={20} />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentState === "create_post" ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading && (
              <Loader2 className="mt-8 absolute left-1/2 top-1/2 w-10 animate-spin" />
            )}
            {articles &&
              articles.map((article) => (
                <Card key={article.id} className="overflow-hidden p-4">
                  <CardHeader className="p-4">
                    <div className="flex justify-center">
                      {article?.image && (
                        <Image
                          height={200}
                          width={200}
                          className="w-full rounded-lg"
                          alt="News Image"
                          src={article?.image}
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center px-2">
                    <Textarea
                      className="mb-2 text-sm text-gray-500 overflow-y-auto h-[120px]"
                      readOnly
                      value={article?.text}
                    ></Textarea>
                  </CardContent>
                  <CardFooter className="flex justify-center gap-4 pb-4">
                    <div className="gap-3 flex">
                      <LinkedInPost article={article} />
                      {/* <InstagramPost article={article} /> */}
                      <TwitterPost article={article} />
                      <Button
                        variant="default"
                        className="text-xs cursor-pointer"
                        size="sm"
                        onClick={async () => {
                          await summarisedResponse(article?.id);
                        }}
                      >
                        {isSummaryLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Summarizing...
                          </>
                        ) : (
                          "Summarize"
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading && (
              <Loader2 className="mt-8 absolute left-1/2 top-1/2 w-10 animate-spin" />
            )}
            {oldArticles && oldArticles.length > 0 ?
              oldArticles.map((article) => (
                <Card key={article?.id} className="overflow-hidden p-4">
                  <CardHeader className="p-4">
                    <div className="flex justify-center">
                      {article?.image && (
                        <Image
                          height={200}
                          width={200}
                          className="w-full rounded-lg"
                          alt="News Image"
                          src={article?.image}
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center px-2">
                    <Textarea
                      className="mb-2 text-sm text-gray-500 overflow-y-auto h-[120px]"
                      readOnly
                      value={article?.text}
                    ></Textarea>
                  </CardContent>
                  <CardFooter className="flex justify-center gap-4 pb-4">
                    <div>
                      <div className="flex justify-left">
                        <div className="flex items-center ml-8 my-5">
                          <Heart className="cursor-pointer" />
                          <input
                            type="input"
                            value={
                              editStates[article?.id]
                                ? articleValues[article?.id]?.meta?.likes ??
                                  article?.meta?.likes
                                : article?.meta?.likes ?? 0
                            }
                            className="max-w-14 ml-2 text-lg focus:outline-0"
                            readOnly={!editStates[article?.id]}
                            onChange={(e) =>
                              handleChange(
                                article?.id,
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
                              editStates[article?.id]
                                ? articleValues[article?.id]?.meta?.reach ??
                                  article?.meta?.reach
                                : article?.meta?.reach ?? 0
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
                              editStates[article.id]
                                ? articleValues[article.id]?.meta
                                    ?.impressions ?? article?.meta?.impressions
                                : article?.meta?.impressions ?? 0
                            }
                            className="max-w-14 ml-2 text-lg focus:outline-0"
                            readOnly={!editStates[article.id]}
                            onChange={(e) =>
                              handleChange(
                                article?.id,
                                "impressions",
                                Number(e.target.value)
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="flex justify-between gap-3">
                        <Button
                          variant="outline"
                          className="px-16 py-4 rounded-xl cursor-pointer"
                          size="sm"
                          onClick={() => toggleEditMode(article?.id)}
                        >
                          {`${editStates[article?.id] ? "Cancel" : "Edit"}`}
                        </Button>
                        <Button
                          className="px-16 py-4 rounded-xl cursor-pointer"
                          size="sm"
                          disabled={!editStates[article?.id]}
                          onClick={() => handleSubmit(article?.id)}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              )) : <p className="text-3xl font-semibold flex items-center mt-6">You have no older posts</p>}
          </div>
        )}
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
