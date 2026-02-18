import { Shield, Zap, Clock, Headphones, Lock, Award } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Fastest Delivery in Outland",
    description: "Speed is everything. Average delivery under 10 minutes. Most gold and boosting orders start instantly. No waiting, no delays.",
  },
  {
    icon: Shield,
    title: "Guaranteed Lowest Prices",
    description: "We guarantee the lowest prices on all TBC Classic Anniversary services. Found a better deal? We will match it or beat it.",
  },
  {
    icon: Award,
    title: "Combo Deal Discounts",
    description: "Buy a character + gold together and save. We offer special bundle pricing for combined orders. Ask us on Discord for a custom quote.",
  },
  {
    icon: Headphones,
    title: "Discord Support 24/7",
    description: "Reach us anytime at exodarmarket111 on Discord. Real humans, real answers, real fast. We respond within minutes, day or night.",
  },
  {
    icon: Lock,
    title: "Smooth & Secure Transactions",
    description: "Every transaction is precise and hassle-free. VPN-protected deliveries, bank-grade encryption, zero issues. Your account stays safe.",
  },
  {
    icon: Clock,
    title: "Precision & Reliability",
    description: "We treat every order with care. Exact amounts, correct characters, and flawless execution. 50,000+ satisfied customers and counting.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fel-green/20 to-transparent" aria-hidden="true" />

      {/* Subtle TBC background atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-fel-green/3 blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 h-80 w-80 rounded-full bg-fel-orange/2 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 text-center sm:mb-20">
          <span className="mb-4 inline-block text-xs font-bold tracking-[0.4em] text-fel-green/60 uppercase">
            Why Choose Us
          </span>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-parchment sm:text-4xl lg:text-5xl text-balance">
            Forged in the Fires of Outland
          </h2>
          <div className="mx-auto mb-6 tbc-divider w-48" aria-hidden="true" />
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-parchment/50 sm:text-base">
            Speed. Precision. Lowest prices. Every order handled with care.
          </p>
          <a
            href="https://discord.com/users/exodarmarket111"
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto mt-4 flex w-fit items-center gap-2 rounded-lg border border-[#5865F2]/30 bg-[#5865F2]/10 px-4 py-2 transition-all hover:border-[#5865F2]/60 hover:bg-[#5865F2]/20 hover:shadow-[0_0_20px_rgba(88,101,242,0.2)]"
          >
            <svg className="h-4 w-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
            <span className="text-xs text-parchment/50">Contact us: </span>
            <span className="text-xs font-bold text-parchment/90 group-hover:text-parchment">exodarmarket111</span>
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative rounded-xl border border-stone bg-stone-dark/50 p-6 transition-all duration-300 hover:border-fel-green/30 hover:bg-stone-dark sm:p-8"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-fel-green/20 bg-fel-green/5">
                  <Icon className="h-5 w-5 text-fel-green-glow" />
                </div>
                <h3 className="mb-2 text-base font-bold tracking-wide text-parchment">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-parchment/45">
                  {feature.description}
                </p>
                <div
                  className="absolute top-0 right-0 h-12 w-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-fel-green/40 to-transparent" />
                  <div className="absolute top-0 right-0 h-8 w-px bg-gradient-to-b from-fel-green/40 to-transparent" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
