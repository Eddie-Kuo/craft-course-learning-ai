import CreateCourseForm from "@/components/CreateCourseForm";
import getSession from "@/lib/actions/getSession";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface pageProps {}

async function CreatePage({}: pageProps) {
  const session = await getSession();

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center px-8">
      <h1 className="text-center text-2xl font-bold text-darkText sm:text-4xl">
        Craft Course Learning AI
      </h1>
      <div className="mt-4 flex gap-3 rounded-md border border-slate-100 bg-zinc-400/70 p-4">
        <AiOutlineInfoCircle className="h-20 w-20 " />
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
          incidunt minus odit! Consequatur veritatis aliquid magnam dignissimos.
          Totam impedit nisi sequi id ipsa voluptate? Vero repellat repellendus
          ullam doloribus nobis!
        </div>
      </div>
      <CreateCourseForm />
    </div>
  );
}
export default CreatePage;
