import AuthForm from "@/components/AuthForm";
import Image from "next/image";

function Home() {
  return (
    <div className="bg-gray-10 relative flex min-h-full flex-col justify-center bg-zinc-200 py-12 sm:px-6 lg:px-8">
      <h1 className="text-darkText absolute left-0 top-0 p-5 text-3xl font-semibold">
        Course Craft
      </h1>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-row items-center justify-center gap-1">
          <Image alt="logo" height={65} width={65} src="/assets/logo.png" />
        </div>
        <h2 className="tracking-light text-darkText mt-4 text-center text-3xl font-semibold">
          Learn through the Power of AI
        </h2>
        <h5 className="text-darkText text-center text-lg font-bold">
          Generate courses. Master concepts.
        </h5>
        {/* <p className="mt-4 text-center text-sm font-light text-gray-500">
          Ready to Learn? Sign in or create an account
        </p> */}
      </div>
      <AuthForm />
    </div>
  );
}

export default Home;
