import Image from "next/image";
import Link from "next/link";

interface DashboardCourseCardProps {}

function DashboardCourseCard({}: DashboardCourseCardProps) {
  return (
    <div className="flex flex-col items-center rounded-md border border-zinc-400 p-1">
      <div className="relative">
        <Link href={``}>
          <Image
            src="/assets/courseImagePlaceholder.jpeg"
            width={300}
            height={300}
            className="w-full rounded-t-sm"
            alt="course image"
          />
        </Link>
      </div>
      <div className="flex w-full justify-center rounded-b-sm bg-zinc-400 p-2 ">
        <h2 className="text-center font-semibold tracking-wider">
          How to train a newborn dog
        </h2>
      </div>
    </div>
  );
}

export default DashboardCourseCard;
