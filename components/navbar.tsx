"use client"

import { useState } from "react"
import { Shield, Menu, X } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { label: "Gold", href: "/services/gold" },
  { label: "Boosting", href: "/services/boosting" },
  { label: "Characters", href: "/services/accounts" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-fel-green/15 bg-deep-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-fel-green/40 bg-stone-dark">
            <Shield className="h-5 w-5 text-fel-green-glow" />
            <div className="absolute inset-0 rounded-lg opacity-30 fel-glow" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-widest text-gold uppercase">Exodar</span>
            <span className="text-[10px] font-medium tracking-[0.3em] text-fel-green-glow uppercase">Market</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md px-4 py-2 text-xs font-semibold tracking-wider text-parchment/70 uppercase transition-colors hover:text-gold hover:bg-gold/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Discord + CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://discord.com/users/exodarmarket111"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg border border-[#5865F2]/40 bg-[#5865F2]/10 px-3.5 py-2 transition-all hover:border-[#5865F2]/70 hover:bg-[#5865F2]/20 hover:shadow-[0_0_20px_rgba(88,101,242,0.25)] animate-discord-glow"
          >
            <svg className="h-4 w-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold tracking-wider text-[#5865F2]/70 uppercase">Discord</span>
              <span className="text-[11px] font-bold text-parchment/90">exodarmarket111</span>
            </div>
          </a>
          <Link
            href="/order"
            className="rounded-md px-5 py-2.5 text-xs font-bold tracking-wider text-deep-black uppercase bg-gold transition-all hover:bg-gold-light hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-stone text-parchment md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-fel-green/10 bg-deep-black/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-semibold tracking-wider text-parchment/70 uppercase transition-colors hover:text-gold hover:bg-gold/5"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://discord.com/users/exodarmarket111"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2.5 rounded-md border border-[#5865F2]/40 bg-[#5865F2]/10 px-5 py-3 transition-all animate-discord-glow"
            >
              <svg className="h-5 w-5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-semibold tracking-wider text-[#5865F2]/70 uppercase">Message us on Discord</span>
                <span className="text-sm font-bold text-parchment/90">exodarmarket111</span>
              </div>
            </a>
            <Link
              href="/order"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-md px-5 py-3 text-center text-sm font-bold tracking-wider text-deep-black uppercase bg-gold"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
