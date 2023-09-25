"use client";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { useState } from "react";

interface ChapterCardProps {
  chapter: Chapter;
  chapterIndex: number;
}

function ChapterCard({ chapter, chapterIndex }: ChapterCardProps) {
  const [success, setSuccess] = useState<boolean | null>(false);
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
}

export default ChapterCard;
