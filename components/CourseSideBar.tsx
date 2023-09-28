import { cn } from "@/lib/utils";
import { Chapter, Course, Unit } from "@prisma/client";
import Link from "next/link";
import { Separator } from "./ui/separator";

interface CourseSideBarProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  currentChapter: string;
}

async function CourseSideBar({ course, currentChapter }: CourseSideBarProps) {
  return (
    <div className="absolute flex h-full flex-col justify-center rounded-r-3xl bg-secondary p-6 sm:mt-0">
      <h1 className="text-3xl font-semibold uppercase text-darkText">
        {course.name}
      </h1>
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unitIndex}>
            <Separator className="my-2 bg-zinc-400" />
            <h2 className="text-lg font-semibold">{unit.name}</h2>
            {unit.chapters.map((chapter, chapterIndex) => {
              return (
                <div
                  key={chapterIndex}
                  className={cn(
                    "mt-1 rounded-md bg-zinc-300 px-2 py-1",
                    chapter.id === currentChapter && "bg-sky-400",
                  )}
                >
                  <Link
                    href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                  >
                    {chapter.name}
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default CourseSideBar;
