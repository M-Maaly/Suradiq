"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          <Languages className="h-[18px] w-[18px]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => toggleLanguage("en")}
          className={locale === "en" ? "bg-zinc-100 dark:bg-zinc-800" : ""}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleLanguage("ar")}
          className={locale === "ar" ? "bg-zinc-100 dark:bg-zinc-800" : ""}
        >
          العربية (Arabic)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
