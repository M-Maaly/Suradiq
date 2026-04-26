import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-white dark:bg-black">
      {/* CTA Banner */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#EAE8E3] px-8 py-14 dark:bg-zinc-800 text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-4">
            Don&apos;t miss out
          </p>
          <h2 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 md:text-6xl">
            Join the Suradiq community
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300 max-w-lg mx-auto">
            Get early access to new collections, exclusive offers, and design inspiration delivered to your inbox.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
            />
            <button
              type="button"
              className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-700 hover:scale-105 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">About us</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 mb-4">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="text-sm text-zinc-400 hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-sm text-zinc-400 hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/orders" className="text-sm text-zinc-400 hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 mb-4">
              More to Explore
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Sale</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Gift Cards</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Pinterest</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Twitter</Link></li>
              <li><Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Facebook</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-zinc-800 pt-8">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Suradiq. All rights reserved. We embrace quality, minimalism and comfort.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-zinc-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-zinc-500 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
