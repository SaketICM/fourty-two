"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Article } from "../page";

type TwitterPostProps = {
  article: Article;
};

export const TwitterPost = ({ article }: TwitterPostProps) => {
  const [showFullText, setShowFullText] = useState(false);

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
                  )}
                  <br />
                  <br />
                  {article.citation}
                </div>
                {article?.image && <div className="mt-3 rounded-2xl overflow-hidden">
                  <img
                    src={article.image}
                    alt="Design Project"
                    className="w-full h-auto object-cover cursor-pointer"
                  />
                </div>}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="cursor-pointer">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
