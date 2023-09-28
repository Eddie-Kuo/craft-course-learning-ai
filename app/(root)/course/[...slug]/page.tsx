import CourseSideBar from "@/components/CourseSideBar";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

interface pageProps {
  params: {
    slug: string[];
  };
}

async function CoursePage({ params: { slug } }: pageProps) {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: { chapters: true },
      },
    },
  });

  if (!course) {
    return redirect("/dashboard");
  }

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/dashboard");
  }

  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/dashboard");
  }

  return <CourseSideBar course={course} />;
}

export default CoursePage;
