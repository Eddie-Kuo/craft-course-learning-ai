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
  });

  console.log(data);

  return (
    <div className=" mx-auto max-w-5xl pt-40">
      <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <DashboardCourseCard />
        <DashboardCourseCard />
        <DashboardCourseCard />
        <DashboardCourseCard />
        <DashboardCourseCard />
        <DashboardCourseCard />
      </div>
    </div>
  );
}
