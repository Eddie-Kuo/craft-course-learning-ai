"use client";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ChapterCardProps {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<string>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export type ChapterCardHandler = {
  triggerLoad: () => void;
};

const ChapterCard = React.forwardRef<ChapterCardHandler, ChapterCardProps>(
  ({ chapter, chapterIndex, completedChapters, setCompletedChapters }, ref) => {
    const [success, setSuccess] = useState<boolean | null>(false);
    const { mutate: getChapterInfo, isLoading } = useMutation({
      mutationFn: async () => {
        const response = await axios.post("/api/chapter/getInfo", {
          chapterId: chapter.id,
        });
        return response.data;
      },
    });

    const addChapterIdToSet = useCallback(() => {
      const newSet = new Set(completedChapters);
      newSet.add(chapter.id);
      setCompletedChapters(newSet);
    }, [completedChapters, chapter.id, setCompletedChapters]);

    // check if id to video already exists
    useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true), addChapterIdToSet();
      }
    }, [chapter, addChapterIdToSet]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        // if video id is already processed, early return
        if (chapter.videoId) {
          addChapterIdToSet();
          return;
        }

        getChapterInfo(undefined, {
          onSuccess: () => {
            setSuccess(true);
            addChapterIdToSet();
          },
          onError: (error) => {
            console.log(error);
            setSuccess(false);
            toast.error(
              "Error occurred while generating course. Please try again.",
            );
            addChapterIdToSet();
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
