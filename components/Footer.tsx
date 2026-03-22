import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[--text] text-[--bg]">
      <div className="mx-auto w-full max-w-[1440px] px-8 py-16">
        {/* Top row: brand + newsletter */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-display text-3xl italic">SOLEVAULT</div>
            <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-[--bg]/60">
              Footwear shaped by craft, restraint, and materials that age with purpose.
            </p>
          </div>

          <div className="w-full max-w-xs">
            <p className="font-sans text-xs uppercase tracking-widest text-[--bg]/50">
              Stay in the loop
            </p>
            <div className="mt-3 flex items-center gap-3 border-b border-[--bg]/30 pb-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent font-sans text-sm text-[--bg] placeholder:text-[--bg]/40 focus:outline-none"
              />
              <button className="flex-shrink-0 font-sans text-xs uppercase tracking-widest text-[--bg]/60 transition hover:text-[--bg]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-[--bg]/10" />

        {/* Bottom row: links + legal */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-6">
            {[
              { label: "Home", href: "/" },
              { label: "Collection", href: "/#products-section" },
              { label: "About", href: "/#editorial" },
              { label: "Materials", href: "/#materials" },
              { label: "Cart", href: "/cart" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-sans text-xs uppercase tracking-widest text-[--bg]/60 transition hover:text-[--bg]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6 font-sans text-[10px] uppercase tracking-widest text-[--bg]/40">
            <span>Privacy</span>
            <span>Terms</span>
            <span>© 2025 SoleVault</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
