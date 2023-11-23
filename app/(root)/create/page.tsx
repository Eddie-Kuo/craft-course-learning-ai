import CreateCourseForm from "@/components/CreateCourseForm";
import getSession from "@/lib/actions/getSession";
import { checkSubscription } from "@/lib/subscription";
import { redirect } from "next/navigation";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface pageProps {}

async function CreatePage({}: pageProps) {
  const session = await getSession();
  if (!session) {
    return redirect("/dashboard");
  }

  const subscribedUser = await checkSubscription();

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col items-center gap-4 px-8 pt-44">
      <h1 className="text-center text-2xl font-bold text-darkText sm:text-4xl">
        Craft Course Learning AI
      </h1>
      <div className="mt-2 flex gap-3 rounded-md border border-slate-100 bg-zinc-400/70 p-4">
        <AiOutlineInfoCircle className="h-20 w-20 " />
        <div>
          Start off by entering the general topic you would like to learn more
          about in the Title section. Below that are options for more specific
          sub topics you would like to do a deeper dive on about. <br></br>You
          can add as many Units as you would like. Each unit will generate sub
          chapters from each target unit along with video content and quiz
          questions.<br></br>
          Note: This process can take a couple seconds to complete
        </div>
      </div>
      <CreateCourseForm subscribedUser={subscribedUser} />
    </div>
  );
}
export default CreatePage;
