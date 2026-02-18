import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-deep-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/80 via-transparent to-deep-black" />
      </div>

      {/* TBC Fel energy particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-fel-green/8 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 h-56 w-56 rounded-full bg-fel-orange/6 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-fel-green/5 blur-[90px] animate-pulse-glow" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 right-1/3 h-48 w-48 rounded-full bg-gold/4 blur-[80px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Top badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fel-green/30 bg-deep-black/70 px-5 py-2.5 backdrop-blur-sm animate-fel-pulse">
          <div className="h-2 w-2 rounded-full bg-fel-green animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-fel-green-glow uppercase">
            The Burning Crusade Anniversary Edition
          </span>
        </div>

        {/* Main heading */}
        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-7xl">
          <span className="block text-parchment">Beyond the</span>
          <span className="block fel-shimmer mt-2">Dark Portal</span>
        </h1>

        {/* TBC Ornamental divider */}
        <div className="mx-auto mb-6 tbc-divider w-48 sm:w-64" aria-hidden="true" />

        <p className="mx-auto mb-4 max-w-3xl text-base leading-relaxed text-parchment/70 sm:text-lg font-bold">
          World of Warcraft: The Burning Crusade Classic Anniversary Edition
        </p>
        <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-parchment/50 sm:text-base">
          Your premier marketplace for TBC Classic gold, expert character boosting,
          and battle-ready Outland accounts. Step through the Dark Portal with confidence.
        </p>

        {/* Discord CTA banner */}
        <a
          href="https://discord.com/users/exodarmarket111"
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto mb-6 flex w-fit items-center gap-3 rounded-xl border border-[#5865F2]/40 bg-[#5865F2]/10 px-6 py-3 backdrop-blur-sm transition-all hover:border-[#5865F2]/70 hover:bg-[#5865F2]/20 hover:shadow-[0_0_30px_rgba(88,101,242,0.3)] animate-discord-glow"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5865F2]/20">
            <svg className="h-5 w-5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-semibold tracking-wider text-[#5865F2]/80 uppercase">Message us on Discord</span>
            <span className="text-sm font-bold text-parchment group-hover:text-parchment">exodarmarket111</span>
          </div>
          <svg className="ml-1 h-4 w-4 text-[#5865F2]/50 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>

        {/* USP badges */}
        <div className="mx-auto mb-10 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-gold/60 uppercase">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Instant Delivery
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-gold/60 uppercase">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Lowest Prices
          </span>
          <span className="hidden items-center gap-1 text-[10px] font-semibold tracking-wider text-gold/60 uppercase sm:flex">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Combo Deals
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/order"
            className="group relative overflow-hidden rounded-lg px-8 py-4 text-sm font-bold tracking-widest text-deep-black uppercase bg-gradient-to-r from-gold via-gold-light to-gold transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.5),0_0_60px_rgba(57,211,83,0.15)]"
          >
            <span className="relative z-10">Enter Outland</span>
          </Link>
          <Link
            href="/#services"
            className="rounded-lg border border-fel-green/30 bg-deep-black/40 px-8 py-4 text-sm font-bold tracking-widest text-fel-green-glow uppercase backdrop-blur-sm transition-all hover:border-fel-green/60 hover:bg-fel-green/5 hover:shadow-[0_0_20px_rgba(57,211,83,0.15)]"
          >
            Explore Services
          </Link>
        </div>

        {/* Trust stats */}
        <div className="mt-16 grid grid-cols-4 gap-4 sm:gap-8">
          {[
            { value: "99.8%", label: "Delivery Rate" },
            { value: "24/7", label: "Discord Support" },
            { value: "<10min", label: "Avg Delivery" },
            { value: "Best", label: "Price Guarantee" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-xl font-black text-fel-green-glow sm:text-3xl">{stat.value}</span>
              <span className="mt-1 text-[10px] font-semibold tracking-widest text-parchment/40 uppercase sm:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <Link href="/#services" className="flex flex-col items-center gap-1 text-fel-green/30 transition-colors hover:text-fel-green-glow" aria-label="Scroll to services">
          <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
