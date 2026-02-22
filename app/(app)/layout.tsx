import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <main>{children}</main>
      <SanityLive />
    </ClerkProvider>
  );
}
