"use client";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

interface ChapterCardProps {
  chapter: Chapter;
  chapterIndex: number;
}

export type ChapterCardHandler = {
  triggerLoad: () => void;
};

const ChapterCard = React.forwardRef<ChapterCardHandler, ChapterCardProps>(
  ({ chapter, chapterIndex }, ref) => {
    const [success, setSuccess] = useState<boolean | null>(false);
    const { mutate: getChapterInfo, isLoading } = useMutation({
      mutationFn: async () => {
        const response = await axios.post("/api/chapter/getInfo", {
          chapterId: chapter.id,
        });
        return response.data;
      },
    });
    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        getChapterInfo(undefined, {
          onSuccess: () => {
            console.log("success");
          },
        });
      },
    }));
    return (
      <div
        key={chapter.id}
        className={cn(
          "mt-2 flex justify-between rounded-md px-4 py-2",
          success === null && "bg-secondary",
          success === false && "bg-red-500",
          success === true && "bg-green-500",
        )}
      >
        <h5>
          Chapter {chapterIndex + 1}: {chapter.name}
        </h5>
      </div>
    );
  },
);

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
