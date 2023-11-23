import DashboardCourseCard from "@/components/DashboardCourseCard";
import getSession from "@/lib/actions/getSession";
import prisma from "@/lib/db";

export default async function Home() {
  const session = await getSession();

  // fetch course data
  const data = await prisma.course.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto flex max-w-5xl justify-center pt-40">
      <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.length > 0 &&
          data.map((course) => {
            return <DashboardCourseCard key={course.id} course={course} />;
          })}
      </div>
      {data.length === 0 && (
        <h1 className="text-2xl font-semibold">
          Welcome to Craft Course! Start by creating a course and begin learning
        </h1>
      )}
    </div>
  );
}
