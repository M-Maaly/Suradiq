import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <Image
        src={logo}
        height="100"
        width="100"
        alt="Suradiq logo"
        quality={100}
        className="h-8 w-8 md:h-7 md:w-7 transition-transform duration-200 group-hover:scale-110"
      />
      <span className="text-lg font-black tracking-tight text-zinc-900 uppercase dark:text-zinc-100">
        Suradiq
      </span>
    </Link>
  );
}

export default Logo;
