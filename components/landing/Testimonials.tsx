"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

const testimonials = [
  // ... (keeping existing testimonials)
  {
    id: 1,
    name: "Sophia Martinez",
    role: "Interior Designer",
    location: "London, UK",
    rating: 5,
    text: "Suradiq transformed my vision into reality. The quality of their furniture is unmatched — every piece feels like it was crafted specifically for my clients' spaces. The attention to detail is extraordinary.",
    avatar: "SM",
    size: "large" as const,
  },
  {
    id: 2,
    name: "Alexander König",
    role: "Architect",
    location: "Berlin, Germany",
    rating: 5,
    text: "As an architect, I demand precision and aesthetics in equal measure. Suradiq delivers both flawlessly.",
    avatar: "AK",
    size: "small" as const,
  },
  {
    id: 3,
    name: "Olivia Chen",
    role: "Homeowner",
    location: "Singapore",
    rating: 5,
    text: "I've never experienced such seamless shopping. From the AI recommendations to the white-glove delivery, everything was perfect. My Royale Emerald Sofa is the centrepiece of my living room.",
    avatar: "OC",
    size: "medium" as const,
  },
  {
    id: 4,
    name: "James Okoro",
    role: "Hospitality Manager",
    location: "Dubai, UAE",
    rating: 5,
    text: "We furnished our entire boutique hotel with Suradiq pieces. Guests constantly compliment the furniture — it truly elevates the experience.",
    avatar: "JO",
    size: "small" as const,
  },
  {
    id: 5,
    name: "Emma Lindström",
    role: "Creative Director",
    location: "Stockholm, Sweden",
    rating: 5,
    text: "Minimalism with soul — that's how I describe Suradiq. Their Scandinavian-inspired collections are timeless, and the craftsmanship speaks for itself. Absolutely worth every penny.",
    avatar: "EL",
    size: "medium" as const,
  },
  {
    id: 6,
    name: "Ravi Patel",
    role: "Real Estate Developer",
    location: "Mumbai, India",
    rating: 5,
    text: "Premium quality at every touchpoint. From showroom to doorstep, Suradiq delivers excellence.",
    avatar: "RP",
    size: "small" as const,
  },
];

const accentColors = [
  "from-emerald-500/20 to-teal-500/20",
  "from-amber-500/20 to-orange-500/20",
  "from-violet-500/20 to-purple-500/20",
  "from-rose-500/20 to-pink-500/20",
  "from-sky-500/20 to-blue-500/20",
  "from-lime-500/20 to-green-500/20",
];

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function Testimonials() {
  const t = useTranslations("Testimonials");
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[#FAF9F7] dark:bg-zinc-950" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
            {t("title")}
          </h2>
        </motion.div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ms-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="ps-4 basis-[90%] sm:basis-[48%]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="flex flex-col justify-between rounded-[2rem] border border-zinc-200/60 bg-white p-8 h-full dark:border-zinc-800/60 dark:bg-zinc-900"
                  >
                    <div>
                      <div className={`mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accentColors[index % accentColors.length]}`}>
                        <Quote className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />
                      </div>
                      <div className="mb-4 flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                    </div>
                    <div className="mt-8 flex items-center gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-black text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{testimonial.name}</p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop Bento Grid */}
        <div className="hidden lg:grid auto-rows-auto grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => {
            const isLarge = testimonial.size === "large";
            const isMedium = testimonial.size === "medium";

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`group relative flex flex-col justify-between rounded-[2rem] border border-zinc-200/60 bg-white p-8 transition-all duration-500 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/60 dark:bg-zinc-900 dark:hover:border-zinc-700 ${
                  isLarge ? "col-span-2 row-span-2 p-12" : isMedium ? "row-span-2 p-10" : "p-8"
                }`}
              >
                {/* Quote Icon */}
                <div>
                  <div
                    className={`mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accentColors[index % accentColors.length]} transition-transform duration-500 group-hover:scale-110`}
                  >
                    <Quote className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />
                  </div>

                  {/* Stars */}
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={`star-${testimonial.id}-${i}`}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p
                    className={`leading-relaxed text-zinc-600 dark:text-zinc-300 ${
                      isLarge
                        ? "text-lg sm:text-xl lg:text-2xl lg:leading-relaxed"
                        : isMedium
                          ? "text-base lg:text-lg"
                          : "text-sm"
                    }`}
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div className="mt-8 flex items-center gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-black text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {testimonial.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {testimonial.role} · {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
