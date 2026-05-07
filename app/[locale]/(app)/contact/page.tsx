import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Suradiq. Our concierge team is here to help with bespoke orders, product inquiries, and delivery assistance.",
};

export default function ContactPage() {
  return <ContactContent />;
}
