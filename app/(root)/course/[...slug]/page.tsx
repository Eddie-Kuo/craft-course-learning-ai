import CourseSideBar from "@/components/CourseSideBar";
import QuizCard from "@/components/QuizCard";
import VideoSummary from "@/components/VideoSummary";
import prisma from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
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

  const prevChapter = unit.chapters[chapterIndex - 1];
  const nextChapter = unit.chapters[chapterIndex + 1];

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

        {/* Chapter navigation buttons */}
        <div className="mt-4 h-[1px] flex-[1] bg-gray-500 text-gray-500" />
        <div className="flex justify-between gap-10 pt-5">
          {prevChapter ? (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
              className="flex "
            >
              <div className="flex items-center">
                <MdKeyboardArrowLeft className="h-8 w-8" />
                <div className="flex flex-col items-start">
                  <span className="text-md font-light">Previous</span>
                  <span className="text-lg font-semibold">
                    {prevChapter.name}
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div></div>
          )}
          {nextChapter ? (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
            >
              <div className="flex items-center">
                <div className="flex flex-col items-end">
                  <span className="text-md font-light">Next</span>
                  <span className="text-lg font-semibold">
                    {nextChapter.name}
                  </span>
                </div>
                <MdKeyboardArrowRight className="h-8 w-8" />
              </div>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
