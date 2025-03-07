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
  Heart,
  MessageCircle,
  Bookmark,
  Smile,
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

type InstagramPostProps = {
  article: Article;
};

export const InstagramPost = ({ article }: InstagramPostProps) => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFullText, setShowFullText] = useState(false);

  //   const handlePost = async () => {
  //     setLoading(true);
  //     setError("");

  //     try {
  //       await postToInstagram(post);
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
          Instagram
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Instagram Preview</DialogTitle>
        </DialogHeader>

        {/* Post Image */}
        <div className="relative pt-4">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
            alt="Design Project"
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Heart size={24} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Like</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MessageCircle size={24} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Comment</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Send size={24} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark size={24} />
          </Button>
        </div>

        {/* Caption */}
        <div className="text-sm mb-2">
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
          <span className="text-gray-500">{article.citation}</span>
        </div>

        <DialogFooter>
          <Button type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
