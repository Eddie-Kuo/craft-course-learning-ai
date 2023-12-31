import ConfirmChapters from "@/components/ConfirmChapters";
import getSession from "@/lib/actions/getSession";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface pageProps {
  params: {
    courseId: string;
  };
}

async function CoursePage({ params: { courseId } }: pageProps) {
  const session = await getSession();
  if (!session?.user) {
    return redirect("/dashboard");
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: { chapters: true },
      },
    },
  });

  if (!course) {
    return redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start pt-44 ">
      <h4 className="text-sm uppercase text-secondary-foreground">
        Course Name
      </h4>
      <h1 className="text-3xl font-semibold text-darkText">{course.name}</h1>

      <div className="my-2 flex items-center gap-3 rounded-md border border-slate-100 bg-zinc-400/70 p-4">
        <AiOutlineInfoCircle className="h-20 w-20 " />
        <div className="flex flex-col gap-2">
          <p>
            We`ve generated chapters for each of your units below. Please look
            over them before clicking the confirmation button to continue.
          </p>
          <p>
            <strong>Disclaimer:</strong> Due to the nature of the OpenAI Api &
            Youtube Api, if a chapter fails to generate and displays red,
            refresh the page and try generating again. If another fail occurs,
            either continue with the loaded chapters or recreate the course with
            new units. We apologize for the inconvenience
          </p>
        </div>
      </div>
      <ConfirmChapters course={course} />
    </div>
  );
}

export default CoursePage;
