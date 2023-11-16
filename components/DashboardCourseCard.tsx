import { Chapter, Course, Unit } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface DashboardCourseCardProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}

function DashboardCourseCard({ course }: DashboardCourseCardProps) {
  return (
    <div className="flex flex-col items-center rounded-md border border-zinc-400 p-1">
      <div className="relative">
        <Link href={`/course/${course.id}/0/0`}>
          <Image
            src={course.image || ""}
            width={300}
            height={300}
            className="w-full rounded-t-sm"
            alt="course image"
          />
        </Link>
      </div>
      <div className="flex w-full justify-center rounded-b-sm bg-zinc-400 p-2 ">
        <h2 className="text-center font-semibold tracking-wider">
          {course.name}
        </h2>
      </div>
    </div>
  );
}

export default DashboardCourseCard;
