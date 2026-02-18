import Image from "next/image"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fel-green/20 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-fel-green/20 p-8 text-center sm:p-12 lg:p-16">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image src="/images/cta-bg.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-deep-black/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black/40 via-transparent to-deep-black/60" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 w-80 bg-fel-green/5 blur-[100px] rounded-full" aria-hidden="true" />
          <div className="absolute bottom-0 left-1/4 h-32 w-64 bg-fel-orange/4 blur-[80px] rounded-full" aria-hidden="true" />

          <div className="relative z-10">
            <span className="mb-4 inline-block text-xs font-bold tracking-[0.4em] text-fel-green/70 uppercase">
              Ready to Enter Outland?
            </span>
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-balance">
              <span className="text-parchment">Your TBC Legend </span>
              <span className="fel-shimmer">Awaits</span>
            </h2>
            <div className="mx-auto mb-6 tbc-divider w-48" aria-hidden="true" />
            <p className="mx-auto mb-4 max-w-lg text-sm leading-relaxed text-parchment/50 sm:text-base">
              Join thousands of champions who trust Exodar Market for their
              TBC Classic Anniversary Edition gold, boosting, and account needs.
            </p>

            {/* USP highlights */}
            <div className="mx-auto mb-4 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full border border-fel-green/20 bg-fel-green/5 px-3 py-1 text-[10px] font-bold tracking-wider text-fel-green-glow/80 uppercase">Lowest Prices Guaranteed</span>
              <span className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[10px] font-bold tracking-wider text-gold/80 uppercase">Delivery Under 10 Min</span>
              <span className="rounded-full border border-fel-orange/20 bg-fel-orange/5 px-3 py-1 text-[10px] font-bold tracking-wider text-fel-orange-glow/80 uppercase">Combo Deal Discounts</span>
            </div>

            {/* Discord contact */}
            <a
              href="https://discord.com/users/exodarmarket111"
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto mb-8 flex w-fit items-center gap-3 rounded-xl border border-[#5865F2]/40 bg-[#5865F2]/10 px-6 py-3 backdrop-blur-sm transition-all hover:border-[#5865F2]/70 hover:bg-[#5865F2]/20 hover:shadow-[0_0_30px_rgba(88,101,242,0.3)] animate-discord-glow"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5865F2]/20">
                <svg className="h-4.5 w-4.5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-semibold tracking-wider text-[#5865F2]/80 uppercase">Contact us on Discord</span>
                <span className="text-sm font-bold text-parchment group-hover:text-parchment">exodarmarket111</span>
              </div>
              <svg className="ml-1 h-4 w-4 text-[#5865F2]/50 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </a>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/order"
                className="rounded-lg px-8 py-4 text-sm font-bold tracking-widest text-deep-black uppercase bg-gradient-to-r from-gold via-gold-light to-gold transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.5),0_0_60px_rgba(57,211,83,0.15)]"
              >
                Place an Order
              </Link>
              <Link
                href="/services/accounts"
                className="rounded-lg border border-fel-green/30 bg-deep-black/40 px-8 py-4 text-sm font-bold tracking-widest text-fel-green-glow uppercase backdrop-blur-sm transition-all hover:border-fel-green/60 hover:bg-fel-green/5"
              >
                Browse Characters
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
