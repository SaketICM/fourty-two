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
import { ThumbsUp, MessageSquare, Share2, Send, Building2 } from "lucide-react";
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
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

type LinkedInPostProps = {
  article: Article;
};

export const LinkedInPost = ({ article }: LinkedInPostProps) => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFullText, setShowFullText] = useState(false);

  //   const handlePost = async () => {
  //     setLoading(true);
  //     setError("");

  //     try {
  //       await postToLinkedIn(post);
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
          LinkedIn
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>LinkedIn Preview</DialogTitle>
        </DialogHeader>

        <p className="text-gray-800 mb-4">
          {showFullText ? (
            <>
              {article.text}
              <br />
              <button
                className="text-blue-500 cursor-pointer"
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
                className="text-blue-500 cursor-pointer"
                onClick={() => setShowFullText(true)}
              >
                Read more
              </button>
            </>
          )}{" "}
          <br />
          <br />
          {article.citation}
        </p>
        {article?.image && <Image
          src={article.image}
          alt="Project Preview"
          className="w-full rounded-lg"
          height={250}
          width={250}
        />}

        {/* </CardContent>
        </Card> */}
        <DialogFooter>
          <Button type="submit" className="cursor-pointer">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
