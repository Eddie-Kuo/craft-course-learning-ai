import Image from "next/image";
import Link from "next/link";

interface NavbarProps {}

function Navbar({}: NavbarProps) {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-blue-100 px-6 py-4 ">
      <Link href="/" className="flex items-center gap-4">
        <Image alt="logo" height={65} width={65} src="/assets/logo.png" />
        <p>Craft Course Learning</p>
      </Link>
    </nav>
  );
}

export default Navbar;
