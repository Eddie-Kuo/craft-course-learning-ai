import CourseSideBar from "@/components/CourseSideBar";
import QuizCard from "@/components/QuizCard";
import VideoSummary from "@/components/VideoSummary";
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
        include: {
          chapters: {
            include: { questions: true },
          },
        },
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

  return (
    <div>
      <CourseSideBar course={course} currentChapter={chapter.id} />
      <div className="ml-[450px] px-8">
        <div className="flex">
          <VideoSummary
            unit={unit}
            chapter={chapter}
            unitIndex={unitIndex}
            chapterIndex={chapterIndex}
          />
          <QuizCard chapter={chapter} />
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
