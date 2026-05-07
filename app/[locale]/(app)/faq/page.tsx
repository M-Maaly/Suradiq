import type { Metadata } from "next";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about Suradiq's bespoke furniture, international shipping, production timelines, and material care.",
};

export default function FAQPage() {
  return <FAQContent />;
}
