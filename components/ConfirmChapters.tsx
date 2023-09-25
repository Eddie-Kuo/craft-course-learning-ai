"use client";

import { Chapter, Course, Unit } from "@prisma/client";
import ChapterCard from "./ChapterCard";

interface ConfirmChaptersProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}

function ConfirmChapters({ course }: ConfirmChaptersProps) {
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
                return <ChapterCard key={chapter.id} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ConfirmChapters;
