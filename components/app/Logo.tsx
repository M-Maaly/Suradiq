"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import logo from "@/public/logo.png";
import { useTranslations } from "next-intl";

function Logo() {
  const t = useTranslations("Header");

  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <Image
        src={logo}
        height="100"
        width="100"
        alt={`${t("logo")} logo`}
        quality={100}
        className="h-8 w-8 md:h-7 md:w-7 transition-transform duration-200 group-hover:scale-110 dark:invert"
      />
      <span className="text-lg font-black tracking-tight text-zinc-900 uppercase dark:text-zinc-100">
        {t("logo")}
      </span>
    </Link>
  );
}

export default Logo;
