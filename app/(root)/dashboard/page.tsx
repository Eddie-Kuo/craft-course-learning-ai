import DashboardCourseCard from "@/components/DashboardCourseCard";

export default async function Home() {
  // fetch course data
  // const data = await prisma.course.findMany({
  //   where: {

  //   }
  // })

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
