import getSession from "@/lib/actions/getSession";
import Image from "next/image";
import Link from "next/link";
import Avatar from "./Avatar";

interface NavbarProps {}

async function Navbar({}: NavbarProps) {
  const session = await getSession();
  //   console.log(session);
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-zinc-200 px-6 py-4 shadow-lg">
      <Link href="/" className="flex items-center gap-4">
        <Image alt="logo" height={65} width={65} src="/assets/logo.png" />
        <p className="text-xl font-semibold">Craft Course Learning</p>
      </Link>

      <div className="flex items-center gap-6">
        <Link className="text-lg font-bold" href="/">
          Dashboard
        </Link>
        <Link className="text-lg font-bold" href="/create">
          Create Course
        </Link>
        <Avatar user={session!.user} credits={session?.user.credits!} />
      </div>
    </nav>
  );
}

export default Navbar;
