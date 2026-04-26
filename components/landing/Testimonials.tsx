"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sophia Martinez",
    role: "Interior Designer",
    location: "London, UK",
    rating: 5,
    text: "Suradiq transformed my vision into reality. The quality of their furniture is unmatched — every piece feels like it was crafted specifically for my clients' spaces. The attention to detail is extraordinary.",
    avatar: "SM",
    accentColor: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 2,
    name: "Alexander König",
    role: "Architect",
    location: "Berlin, Germany",
    rating: 5,
    text: "As an architect, I demand precision and aesthetics in equal measure. Suradiq delivers both flawlessly. Their bespoke service and premium materials have made them my go-to furniture partner for high-end projects.",
    avatar: "AK",
    accentColor: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 3,
    name: "Olivia Chen",
    role: "Homeowner",
    location: "Singapore",
    rating: 5,
    text: "I've never experienced such seamless shopping. From the AI recommendations to the white-glove delivery, everything was perfect. My Royale Emerald Sofa is the centrepiece of my living room.",
    avatar: "OC",
    accentColor: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: 4,
    name: "James Okoro",
    role: "Hospitality Manager",
    location: "Dubai, UAE",
    rating: 5,
    text: "We furnished our entire boutique hotel with Suradiq pieces. The durability and elegance are unparalleled. Guests constantly compliment the furniture — it truly elevates the guest experience.",
    avatar: "JO",
    accentColor: "from-rose-500/20 to-pink-500/20",
  },
  {
    id: 5,
    name: "Emma Lindström",
    role: "Creative Director",
    location: "Stockholm, Sweden",
    rating: 5,
    text: "Minimalism with soul — that's how I describe Suradiq. Their Scandinavian-inspired collections are timeless, and the craftsmanship speaks for itself. Absolutely worth every penny.",
    avatar: "EL",
    accentColor: "from-sky-500/20 to-blue-500/20",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const goPrev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  const testimonial = testimonials[current];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background accent */}
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
            What Our Clients Say
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
            Voices of trust
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div
                className={`rounded-[2.5rem] border border-zinc-200/60 bg-white p-8 shadow-xl sm:p-12 lg:p-16 dark:border-zinc-800/60 dark:bg-zinc-900`}
              >
                {/* Quote icon */}
                <div
                  className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${testimonial.accentColor}`}
                >
                  <Quote className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
                </div>

                {/* Stars */}
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={`star-${i}`}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="mb-10 text-lg font-medium leading-relaxed text-zinc-700 sm:text-xl lg:text-2xl lg:leading-relaxed dark:text-zinc-300">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-sm font-black text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {testimonial.role} · {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-all hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-8 bg-zinc-900 dark:bg-zinc-100"
                      : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-all hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
