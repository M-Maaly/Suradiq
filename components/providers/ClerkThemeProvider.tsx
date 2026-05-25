"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { arSA } from "@clerk/localizations";
import { useTheme } from "next-themes";

interface ClerkThemeProviderProps {
  children: React.ReactNode;
  locale: string;
}

export function ClerkThemeProvider({ children, locale }: ClerkThemeProviderProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <ClerkProvider
      localization={locale === "ar" ? arSA : undefined}
      appearance={{
        baseTheme: isDark ? dark : undefined,
        variables: isDark
          ? {
              colorBackground: "#09090b",
              colorInputBackground: "#18181b",
              colorText: "#fafafa",
              colorTextSecondary: "#a1a1aa",
              colorPrimary: "#fafafa",
              colorInputText: "#fafafa",
              borderRadius: "0.75rem",
            }
          : {
              colorBackground: "#ffffff",
              colorInputBackground: "#fafaf9",
              colorText: "#18181b",
              colorTextSecondary: "#71717a",
              colorPrimary: "#18181b",
              colorInputText: "#18181b",
              borderRadius: "0.75rem",
            },
        elements: {
          card: isDark
            ? "bg-zinc-950 border border-zinc-800 shadow-2xl"
            : "bg-white border border-zinc-200 shadow-2xl",
          modalBackdrop: "backdrop-blur-sm bg-black/40",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
