import getSession from "@/lib/actions/getSession";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {}

async function Navbar({}: NavbarProps) {
  const session = await getSession();
  console.log(session);
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between border border-b-zinc-600/30 bg-blue-100 px-6 py-4">
      <Link href="/" className="flex items-center gap-4">
        <Image alt="logo" height={65} width={65} src="/assets/logo.png" />
        <p>Craft Course Learning</p>
      </Link>

      <div className="flex items-center gap-3">
        <Link href="/">Dashboard</Link>
        <Link href="/create">Create Course</Link>
      </div>
    </nav>
  );
}

export default Navbar;
