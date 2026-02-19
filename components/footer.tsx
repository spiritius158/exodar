import { Shield } from "lucide-react"
import Link from "next/link"

const links = {
  services: [
    { label: "Gold Selling", href: "/services/gold" },
    { label: "Character Boosting", href: "/services/boosting" },
    { label: "Character Marketplace", href: "/services/accounts" },
    { label: "Place an Order", href: "/order" },
  ],
  goldServers: [
    { label: "Spineshatter Horde Gold", href: "/gold/spineshatter-horde" },
    { label: "Spineshatter Alliance Gold", href: "/gold/spineshatter-alliance" },
    { label: "Thunderstrike Horde Gold", href: "/gold/thunderstrike-horde" },
    { label: "Thunderstrike Alliance Gold", href: "/gold/thunderstrike-alliance" },
  ],
  items: [
    { label: "Primal Nether Boost", href: "/items/primal-nether-boost" },
    { label: "Spellstrike Craft", href: "/items/spellstrike-whitemend-craft" },
    { label: "Eye of Quagmirran", href: "/items/eye-of-quagmirran-run" },
    { label: "Raid Consumables", href: "/items/raid-consumables-bulk" },
    { label: "Drums of Battle Kit", href: "/items/drums-of-battle-kit" },
  ],
  support: [
    { label: "FAQ", href: "/#faq" },
    { label: "Contact Us", href: "/order" },
    { label: "Discord", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-fel-green/10 bg-deep-black">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-fel-green/30 bg-stone-dark">
                <Shield className="h-4 w-4 text-fel-green-glow" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-widest text-gold uppercase">Exodar</span>
                <span className="text-[9px] font-medium tracking-[0.3em] text-fel-green-glow uppercase">Market</span>
              </div>
            </Link>
            <p className="mb-3 max-w-xs text-xs leading-relaxed text-parchment/40">
              Your premier marketplace for WoW: The Burning Crusade
              Classic Anniversary Edition services. Fastest delivery, lowest prices, smooth transactions.
            </p>
            <a
              href="https://discord.com/users/exodarmarket111"
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-3 flex items-center gap-2.5 rounded-lg border border-[#5865F2]/30 bg-[#5865F2]/10 px-4 py-2.5 transition-all hover:border-[#5865F2]/60 hover:bg-[#5865F2]/20 hover:shadow-[0_0_20px_rgba(88,101,242,0.2)]"
            >
              <svg className="h-5 w-5 shrink-0 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
              <div className="flex flex-col">
                <span className="text-[9px] font-semibold tracking-wider text-[#5865F2]/60 uppercase">Discord</span>
                <span className="text-xs font-bold text-gold group-hover:text-gold-light">exodarmarket111</span>
              </div>
            </a>
            <p className="text-[10px] leading-relaxed text-parchment/30">
              Combo deals on Character + Gold orders. Ask us for a custom quote on Discord!
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-[10px] font-bold tracking-[0.3em] text-gold uppercase">Services</h4>
            <ul className="flex flex-col gap-2">
              {links.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-parchment/40 transition-colors hover:text-parchment">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gold Servers */}
          <div>
            <h4 className="mb-4 text-[10px] font-bold tracking-[0.3em] text-gold uppercase">Buy Gold</h4>
            <ul className="flex flex-col gap-2">
              {links.goldServers.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-parchment/40 transition-colors hover:text-parchment">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Items & Boosts */}
          <div>
            <h4 className="mb-4 text-[10px] font-bold tracking-[0.3em] text-gold uppercase">Items & Boosts</h4>
            <ul className="flex flex-col gap-2">
              {links.items.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-parchment/40 transition-colors hover:text-parchment">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-[10px] font-bold tracking-[0.3em] text-gold uppercase">Support</h4>
            <ul className="flex flex-col gap-2">
              {links.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-parchment/40 transition-colors hover:text-parchment">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-[10px] font-bold tracking-[0.3em] text-gold uppercase">Legal</h4>
            <ul className="flex flex-col gap-2">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-parchment/40 transition-colors hover:text-parchment">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone pt-8 sm:flex-row">
          <p className="text-[10px] tracking-wider text-parchment/30 uppercase">
            {'2026 Exodar Market. All rights reserved.'}
          </p>
          <p className="text-[10px] tracking-wider text-parchment/20 uppercase">
            Not affiliated with Blizzard Entertainment or Activision
          </p>
        </div>
      </div>
    </footer>
  )
}
