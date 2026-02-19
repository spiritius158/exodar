"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Is it safe to buy WoW TBC Classic Anniversary gold in 2026?",
    answer:
      "Yes, buying TBC Anniversary gold from Exodar Market is safe. We exclusively use face-to-face trades with natural trading patterns that mimic regular player behavior. Across 3,400+ completed orders on servers like Spineshatter and Thunderstrike, we maintain a zero ban rate. Our traders are stationed 24/7 in Shattrath and capital cities for instant, secure delivery.",
  },
  {
    question: "How fast is gold delivery on Spineshatter and Thunderstrike?",
    answer:
      "Most gold deliveries on Spineshatter (PvP) and Thunderstrike (PvE) are completed within 5-10 minutes of purchase. We deliver via secure face-to-face trade directly to your character in Orgrimmar, Stormwind, or Shattrath City. During peak hours it may take up to 15 minutes. Nightslayer and Dreamscythe deliveries take 10-30 minutes depending on stock levels.",
  },
  {
    question: "What is the cheapest way to get TBC Anniversary gold?",
    answer:
      "The cheapest TBC fresh gold is available through our bulk discount system. Standard price starts at $0.4626 per 10 gold, but orders over 5,000g receive automatic discounts - perfect for epic flying mount funding (5,000g). We also offer combo deals: buy a character + gold together for an extra discount. Compare all Phase 1 server prices on our gold comparison page.",
  },
  {
    question: "Can I get a level 58-70 boost for TBC Classic Anniversary?",
    answer:
      "Absolutely! Our classic TBC leveling boost 58-70 is our most popular service, completed in 2-3 days by verified TBC veterans. We also offer full 1-70 powerleveling (3-5 days), Outland 60-70 express leveling, and Karazhan attunement completion. All boosting uses premium VPN protection matching your location with natural play patterns for complete account safety.",
  },
  {
    question: "Is buying Jewelcrafting profession boost 1-375 worth it in Phase 1?",
    answer:
      "Jewelcrafting is one of the most profitable professions in TBC Phase 1 2026. Our profession boost jewelcrafting 1-375 costs $42.99 and saves you 15-20 hours of grinding plus 2,000-3,000g in materials. Jewelers can craft powerful unique-equipped gems (like Delicate Living Ruby) and earn 50-100g per hour cutting gems for other players. We boost all 13 TBC professions at the same price.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fel-green/20 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="mb-16 text-center sm:mb-20">
          <span className="mb-4 inline-block text-xs font-bold tracking-[0.4em] text-fel-green/60 uppercase">
            Knowledge Base
          </span>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-parchment sm:text-4xl lg:text-5xl text-balance">
            Common Questions
          </h2>
          <div className="mx-auto mb-6 tbc-divider w-48" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-xl border transition-all duration-300",
                  isOpen
                    ? "border-fel-green/30 bg-stone-dark/80"
                    : "border-stone bg-stone-dark/30 hover:border-stone"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={cn(
                    "text-sm font-bold tracking-wide transition-colors sm:text-base",
                    isOpen ? "text-fel-green-glow" : "text-parchment/80"
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "ml-4 h-4 w-4 shrink-0 transition-all duration-300",
                      isOpen ? "rotate-180 text-fel-green-glow" : "text-parchment/40"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-48 pb-5" : "max-h-0"
                  )}
                >
                  <p className="px-6 text-sm leading-relaxed text-parchment/50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
