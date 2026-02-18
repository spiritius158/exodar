"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How fast is TBC Classic Anniversary gold delivery?",
    answer:
      "Most gold deliveries are completed within 5-10 minutes of purchase. We deliver via secure face-to-face trade on your TBC Classic Anniversary server. During peak hours it may take up to 30 minutes.",
  },
  {
    question: "Which TBC Classic Anniversary servers do you support?",
    answer:
      "We support all TBC Classic Anniversary Edition servers across US, EU, and OCE regions, both Horde and Alliance. This includes all freshly launched Anniversary realms.",
  },
  {
    question: "Is my account safe during boosting?",
    answer:
      "Absolutely. We use VPN protection matching your region, play during your normal hours, and follow all safety protocols. We have completed over 50,000 boosts across Classic and TBC with a 99.9% safety record.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept PayPal, all major credit and debit cards, cryptocurrency (BTC, ETH, USDT), and bank transfers. All transactions are encrypted and secure.",
  },
  {
    question: "Can I buy specific TBC characters from your marketplace?",
    answer:
      "Yes! Our accounts page features 30+ pre-built TBC Classic Anniversary characters spanning all classes and races. Each listing shows gear level, professions, and notable items so you can find exactly what you need.",
  },
  {
    question: "How do account transfers work?",
    answer:
      "After purchase, we securely transfer the full Battle.net account credentials through encrypted channels. We guide you through changing the email, password, and authenticator so the account is fully yours.",
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
