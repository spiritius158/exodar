import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OrderFormWrapper } from "@/components/order-form-wrapper"
import { Shield, Zap, Clock, Headphones } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Place Order - Exodar Market | TBC Classic Anniversary",
  description: "Order WoW TBC Classic Anniversary Edition gold, character boosting, or premium accounts. Fast, secure delivery with 24/7 support.",
  alternates: {
    canonical: "/order",
  },
  openGraph: {
    title: "Place Order - Exodar Market",
    description: "Order WoW TBC Classic Anniversary Edition gold, boosting, or premium accounts. Fast, secure delivery.",
    url: "/order",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Exodar Market - Place Order" }],
  },
}

const trustBadges = [
  { icon: Shield, label: "Money-Back Guarantee", detail: "Full refund if we fail to deliver" },
  { icon: Zap, label: "Lightning Fast", detail: "Average delivery under 10 minutes" },
  { icon: Clock, label: "Always Online", detail: "24/7 service, 365 days a year" },
  { icon: Headphones, label: "Live Support", detail: "Real humans ready to help" },
]

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero header */}
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-fel-green/5 blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-fel-orange/5 blur-[80px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="mb-4 inline-block text-xs font-bold tracking-[0.4em] text-gold/60 uppercase">
            Place Your Order
          </span>
          <h1 className="mb-4 text-3xl font-black tracking-tight text-parchment sm:text-4xl lg:text-5xl text-balance">
            Begin Your Journey
          </h1>
          <div className="mx-auto mb-4 flex items-center justify-center gap-3" aria-hidden="true">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <div className="h-1.5 w-1.5 rotate-45 bg-gold/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-parchment/50">
            Fill out the form below to place your order. Our team will contact you
            within 15 minutes to confirm and process your request.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
            <div className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-deep-black/40 px-3 py-1.5 backdrop-blur-sm">
              <svg className="h-3.5 w-3.5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
              <span className="text-[10px] font-bold text-parchment/60">exodarmarket111</span>
            </div>
            <span className="rounded-full border border-gold/15 bg-gold/5 px-3 py-1 text-[10px] font-bold tracking-wider text-gold/70 uppercase">Combo Deals Available - Ask on Discord</span>
          </div>
        </div>
      </section>

      {/* Order form */}
      <section className="relative pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="rounded-2xl border border-gold/20 parchment-card p-6 sm:p-10">
            <Suspense fallback={<div className="py-20 text-center text-parchment/40">Loading form...</div>}>
              <OrderFormWrapper />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {trustBadges.map((badge) => {
              const Icon = badge.icon
              return (
                <div key={badge.label} className="flex flex-col items-center rounded-xl border border-stone bg-stone-dark/50 p-4 text-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/5">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mb-1 text-xs font-bold tracking-wider text-parchment uppercase">{badge.label}</h3>
                  <p className="text-[10px] leading-relaxed text-parchment/40">{badge.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
