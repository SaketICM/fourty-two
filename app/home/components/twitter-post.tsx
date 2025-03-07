"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Article } from "../page";
import { Textarea } from "@/components/ui/textarea";

import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Send,
  Building2,
  MoreHorizontal,
  MessageCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

type TwitterPostProps = {
  article: Article;
};

export const TwitterPost = ({ article }: TwitterPostProps) => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFullText, setShowFullText] = useState(false);

  //   const handlePost = async () => {
  //     setLoading(true);
  //     setError("");

  //     try {
  //       await postToTwitter(post);
  //       toast.success("Post successful");
  //       setPost("");
  //     } catch (error: any) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs cursor-pointer">
          Twitter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Twitter Preview</DialogTitle>
        </DialogHeader>
        {/* <div className="grid gap-4">
          <Image
            height={200}
            width={200}
            alt="Twitter Post Image"
            src={article.image}
          />
          <div className="items-center">
            <Label htmlFor="text" className="text-right pl-1 py-2">
              Text
            </Label>
            <Textarea defaultValue={article.text} />
          </div>
          <div className="items-center">
            <Label htmlFor="username" className="text-right pl-1 py-2">
              Citations
            </Label>
            <Textarea defaultValue={article.citation} disabled />
          </div>
        </div> */}

        <div className="max-w-[598px] w-full bg-white rounded-xl">
          <div className="flex items-start justify-between">
            <div className="flex">
              <div>
                <div className="mt-1 text-[15px] leading-normal">
                  {showFullText ? (
                    <>
                      {article.text}
                      <br />
                      <button
                        className="text-blue-500"
                        onClick={() => setShowFullText(false)}
                      >
                        Read less
                      </button>
                    </>
                  ) : (
                    <>
                      {article.text.substring(0, 200)}
                      <br />
                      <button
                        className="text-blue-500"
                        onClick={() => setShowFullText(true)}
                      >
                        Read more
                      </button>
                    </>
                  )}
                  <br />
                  <br />
                  {article.citation}
                </div>
                <div className="mt-3 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
                    alt="Design Project"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
