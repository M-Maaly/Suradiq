import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Discover the heritage of Suradiq, our commitment to artisanal craftsmanship, and our vision for modern minimalist luxury furniture.",
};

export default function AboutPage() {
  return <AboutContent />;
}
