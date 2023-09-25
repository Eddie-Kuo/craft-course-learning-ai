"use client";

import { cn } from "@/lib/utils";
import { Chapter, Course, Unit } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ChapterCard, { ChapterCardHandler } from "./ChapterCard";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

interface ConfirmChaptersProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}

function ConfirmChapters({ course }: ConfirmChaptersProps) {
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(
    new Set(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const chapterRef: Record<string, React.RefObject<ChapterCardHandler>> = {};
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      chapterRef[chapter.id] = React.useRef(null);
    });
  });

  const totalChapterCount = useMemo(() => {
    return course.units.reduce((acc, unit) => {
      return acc + unit.chapters.length;
    }, 0);
  }, [course.units]);

  return (
    <div className="w-full">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-semibold">{unit.name}</h3>
            <div>
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                    completedChapters={completedChapters}
                    setCompletedChapters={setCompletedChapters}
                    ref={chapterRef[chapter.id]}
                    key={chapter.id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="mb-32 mt-4 flex items-center justify-center">
        <Separator className="flex-[1] bg-zinc-400" />
        <div className="mx-2 flex gap-2">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({
                variant: "secondary",
              }),
              "font-semibold",
            )}
          >
            <MdKeyboardArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>

          {totalChapterCount === completedChapters.size ? (
            <Link
              href={`/course/${course.id}/0/0`}
              className={buttonVariants({
                className: "bg-sky-600 font-semibold",
              })}
            >
              Save & Continue
            </Link>
          ) : (
            <Button
              type="button"
              className="bg-slate-800 font-semibold hover:bg-slate-600"
              onClick={() => {
                setIsLoading(true);
                Object.values(chapterRef).forEach((ref) => {
                  ref.current?.triggerLoad();
                });
              }}
              disabled={isLoading}
            >
              Generate
            </Button>
          )}
        </div>
        <Separator className="flex-[1] bg-zinc-400" />
      </div>
    </div>
  );
}

export default ConfirmChapters;
