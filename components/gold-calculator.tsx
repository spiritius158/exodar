"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function GoldCalculatorClient() {
  const [amount, setAmount] = useState(500)
  const [charName, setCharName] = useState("")
  const [discord, setDiscord] = useState("")
  const price = (amount / 10) * 0.4626

  return (
    <div className="mx-auto mt-16 max-w-2xl">
      <div className="rounded-2xl border border-gold/20 parchment-card p-8 sm:p-10">
        <h3 className="mb-1 text-center text-xs font-bold tracking-[0.4em] text-gold/60 uppercase">
          Custom Amount
        </h3>
        <p className="mb-8 text-center text-lg font-black text-parchment">
          Gold Calculator
        </p>

        <div className="mb-6">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-xs font-semibold tracking-wider text-parchment/50 uppercase">Amount</span>
            <span className="text-2xl font-black text-gold gold-shimmer">
              {amount.toLocaleString()}g
            </span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={([v]) => setAmount(v)}
            min={500}
            max={100000}
            step={500}
          />
          <div className="mt-2 flex justify-between text-[10px] text-parchment/30">
            <span>500g</span>
            <span>100,000g</span>
          </div>
          <p className="mt-1 text-center text-[10px] text-parchment/30">$0.4626 per 10 gold</p>
        </div>

        <div className="mb-6 rounded-lg border border-gold/30 bg-gold/5 p-5 text-center" style={{ boxShadow: '0 0 20px rgba(201,168,76,0.15)' }}>
          <span className="block text-xs font-semibold tracking-widest text-parchment/60 uppercase">Your Price</span>
          <span className="mt-1 block text-3xl font-black text-gold gold-shimmer">${price.toFixed(2)}</span>
          <span className="mt-1 block text-[10px] text-parchment/40">
            {amount.toLocaleString()} gold at $0.4626 / 10g
          </span>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-parchment/50 uppercase">
            Character Name
          </label>
          <Input
            type="text"
            placeholder="Enter your character name"
            value={charName}
            onChange={(e) => setCharName(e.target.value)}
            className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/25 focus:border-gold/40"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-parchment/50 uppercase">
            Your Discord
          </label>
          <Input
            type="text"
            placeholder="username#0000"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            className="border-stone bg-stone-dark text-parchment placeholder:text-parchment/25 focus:border-gold/40"
          />
          <p className="mt-1 text-[10px] text-parchment/30">We will contact you on Discord to arrange delivery</p>
        </div>

        <Link
          href="/order?service=gold"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-xs font-bold tracking-widest text-deep-black uppercase transition-all hover:bg-gold-light"
        >
          Order {amount.toLocaleString()}g Now
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
