import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "../globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Suradiq — Modern Minimalist Furniture",
    template: "%s | Suradiq"
  },
  description: "Discover our curated collection of bespoke furniture. Premium craftsmanship, modern minimalism, delivered to your door.",
  keywords: ["furniture", "minimalist", "bespoke", "luxury", "home decor", "Suradiq"],
  authors: [{ name: "Suradiq Team" }],
  creator: "Suradiq",
  publisher: "Suradiq",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Suradiq — Modern Minimalist Furniture",
    description: "Discover our curated collection of bespoke furniture. Premium craftsmanship, modern minimalism, delivered to your door.",
    url: "https://suradiq.com",
    siteName: "Suradiq",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suradiq — Modern Minimalist Furniture",
    description: "Discover our curated collection of bespoke furniture. Premium craftsmanship, modern minimalism, delivered to your door.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ClerkProvider localization={locale === 'ar' ? arSA : undefined}>
      <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
        <body
          className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        >
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>{children}</ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
