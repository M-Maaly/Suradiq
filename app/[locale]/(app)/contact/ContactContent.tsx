"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function ContactContent() {
  const t = useTranslations("Contact");
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center md:text-start mb-16">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            {t("desc")}
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact Form Placeholder */}
          <div className="rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("firstName")}</label>
                  <input id="first-name" type="text" className="w-full rounded-lg border border-zinc-300 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:focus:border-white dark:focus:ring-white" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("lastName")}</label>
                  <input id="last-name" type="text" className="w-full rounded-lg border border-zinc-300 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:focus:border-white dark:focus:ring-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("email")}</label>
                <input id="email" type="email" className="w-full rounded-lg border border-zinc-300 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:focus:border-white dark:focus:ring-white" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("message")}</label>
                <textarea id="message" rows={5} className="w-full rounded-lg border border-zinc-300 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:focus:border-white dark:focus:ring-white"></textarea>
              </div>
              <Button type="submit" className="w-full py-6 text-sm font-bold uppercase tracking-widest">
                {t("send")}
              </Button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-12 lg:ps-12">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                <Mail className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{t("details.email")}</h3>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">mo7amedm0stafa127@gmail.com</p>
                <p className="mt-1 text-sm text-zinc-500">{t("details.replyTime")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                <Phone className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{t("details.phone")}</h3>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">+201025560388</p>
                <p className="mt-1 text-sm text-zinc-500">{t("details.workHours")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                <MapPin className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{t("details.studio")}</h3>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                  Suradiq Studios<br />
                  Suez Canal Street<br />
                  Ismailia, Egypt 
                </p>
                <p className="mt-1 text-sm text-zinc-500">{t("details.appointment")}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
