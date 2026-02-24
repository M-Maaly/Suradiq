import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={logo}
        height="100"
        width="100"
        alt="logo"
        quality={100}
        className="h-10 w-10 md:h-[30px] md:w-[30px]"
      />
      <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        SURADIQ
      </span>
    </Link>
  );
}

export default Logo;
