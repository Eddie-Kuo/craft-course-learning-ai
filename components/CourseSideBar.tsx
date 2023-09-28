import { Chapter, Course, Unit } from "@prisma/client";
import Link from "next/link";
import { Separator } from "./ui/separator";

interface CourseSideBarProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}

async function CourseSideBar({ course }: CourseSideBarProps) {
  return (
    <div className="absolute top-1/2 w-[400px] -translate-y-1/2 rounded-r-3xl bg-secondary p-6">
      <h1 className="text-3xl font-semibold uppercase text-darkText">
        {course.name}
      </h1>
      <Separator className="my-2 bg-zinc-400" />
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unitIndex}>
            <h2>{unit.name}</h2>
            {unit.chapters.map((chapter, chapterIndex) => {
              return (
                <div key={chapterIndex}>
                  <Link
                    href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                  >
                    {chapter.name}
                  </Link>
                </div>
              );
            })}
            <Separator className="mt-2 bg-zinc-400" />
          </div>
        );
      })}
    </div>
  );
}

export default CourseSideBar;
