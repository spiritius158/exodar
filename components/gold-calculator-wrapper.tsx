"use client"

import dynamic from "next/dynamic"

const GoldCalculatorClient = dynamic(
  () => import("@/components/gold-calculator").then((mod) => mod.GoldCalculatorClient),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto mt-16 max-w-2xl">
        <div className="rounded-2xl border border-gold/20 parchment-card p-8 sm:p-10">
          <h3 className="mb-1 text-center text-xs font-bold tracking-[0.4em] text-gold/60 uppercase">
            Custom Amount
          </h3>
          <p className="mb-8 text-center text-lg font-black text-parchment">
            Gold Calculator
          </p>
          <div className="flex flex-col gap-4">
            <div className="h-10 animate-pulse rounded-lg bg-stone/30" />
            <div className="h-6 animate-pulse rounded-lg bg-stone/30" />
            <div className="h-24 animate-pulse rounded-lg bg-stone/30" />
            <div className="h-10 animate-pulse rounded-lg bg-stone/30" />
            <div className="h-10 animate-pulse rounded-lg bg-stone/30" />
            <div className="h-12 animate-pulse rounded-lg bg-stone/30" />
          </div>
        </div>
      </div>
    ),
  }
)

export function GoldCalculator() {
  return <GoldCalculatorClient />
}
