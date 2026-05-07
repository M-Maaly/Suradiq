"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-zinc-900 text-white dark:bg-black">
      {/* CTA Banner */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#EAE8E3] px-8 py-14 dark:bg-zinc-800 text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-4">
            {t("dontMissOut")}
          </p>
          <h2 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 md:text-6xl">
            {t("joinCommunity")}
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300 max-w-lg mx-auto">
            {t("communityDesc")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="flex-1 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
            />
            <button
              type="button"
              className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-700 hover:scale-105 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {t("subscribe")}
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 mb-4">
              {t("company")}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("aboutUs")}</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("careers")}</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("press")}</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("blog")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 mb-4">
              {t("customerService")}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("contact")}</Link></li>
              <li><Link href="/shipping" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("shipping")}</Link></li>
              <li><Link href="/returns" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("returns")}</Link></li>
              <li><Link href="/faq" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("faqs")}</Link></li>
              <li><Link href="/orders" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("trackOrder")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 mb-4">
              {t("moreToExplore")}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("newArrivals")}</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("bestSellers")}</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("sale")}</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("giftCards")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 mb-4">
              {t("connect")}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("instagram")}</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("pinterest")}</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("twitter")}</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t("facebook")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-zinc-800 pt-8">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Suradiq. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-zinc-500 hover:text-white transition-colors">{t("privacy")}</Link>
            <Link href="/terms" className="text-xs text-zinc-500 hover:text-white transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
