import getSession from "@/lib/actions/getSession";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

interface pageProps {
  params: {
    courseId: string;
  };
}

async function CreateChapter({ params: { courseId } }: pageProps) {
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
    <div className="pt-44">
      <pre>{JSON.stringify(course, null, 2)}</pre>
    </div>
  );
}

export default CreateChapter;
