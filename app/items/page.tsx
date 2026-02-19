import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, Clock, DollarSign, Package } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TBC Items & Services - Phase 1 Farming, Crafting & Carries 2026",
  description:
    "Browse all TBC Anniversary items and services: Primal Nethers, mount boosts, BiS trinket runs, raid consumables, Darkmoon decks, and crafted gear. Spineshatter, Thunderstrike & all servers.",
  alternates: { canonical: "/items" },
  openGraph: {
    title: "TBC Items & Services - Phase 1 2026 | Exodar Market",
    description: "Primal Nethers, Spellstrike crafts, mount boosts, and more for TBC Anniversary Phase 1.",
    url: "/items",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Exodar Market Items & Services" }],
  },
}

type Category = "Material" | "Mount" | "Trinket" | "Currency" | "Consumable" | "Craft"

interface ItemEntry {
  slug: string
  name: string
  shortName: string
  category: Category
  icon: string
  priceRange: string
  deliveryTime: string
  tagline: string
}

const items: ItemEntry[] = [
  {
    slug: "primal-nether-boost",
    name: "Primal Nether (Heroic Carry)",
    shortName: "Primal Nether",
    category: "Material",
    icon: "/images/items/primal-nether.jpg",
    priceRange: "$11.99 - $14.99",
    deliveryTime: "30-60 min",
    tagline: "Guaranteed Primal Nether from Heroic dungeon carry runs.",
  },
  {
    slug: "primal-fire-farming",
    name: "Primal Fire",
    shortName: "Primal Fire",
    category: "Material",
    icon: "/images/items/primal-fire.jpg",
    priceRange: "$4.49 - $5.49",
    deliveryTime: "15-60 min",
    tagline: "Essential crafting material for Spellstrike, Shadoweave, and flasks.",
  },
  {
    slug: "primal-might-transmute",
    name: "Primal Might",
    shortName: "Primal Might",
    category: "Material",
    icon: "/images/items/primal-might.jpg",
    priceRange: "$13.99 - $15.99",
    deliveryTime: "1-24 hrs",
    tagline: "Rarest TBC material. Alchemy transmute cooldown -- skip the wait.",
  },
  {
    slug: "talbuk-mount-farm",
    name: "War Talbuk Mount (Rep Grind)",
    shortName: "War Talbuk",
    category: "Mount",
    icon: "/images/items/talbuk-mount.jpg",
    priceRange: "$49.99 - $54.99",
    deliveryTime: "2-3 days",
    tagline: "Kurenai / Mag'har Exalted rep grind for the prestigious War Talbuk.",
  },
  {
    slug: "cenarion-hippogryph-boost",
    name: "Cenarion War Hippogryph",
    shortName: "Hippogryph",
    category: "Mount",
    icon: "/images/items/cenarion-hippogryph.jpg",
    priceRange: "$57.99 - $64.99",
    deliveryTime: "3-4 days",
    tagline: "Cenarion Expedition Exalted + rare Hippogryph flying mount.",
  },
  {
    slug: "eye-of-quagmirran-run",
    name: "Eye of Quagmirran (Trinket Run)",
    shortName: "Eye of Quag",
    category: "Trinket",
    icon: "/images/items/eye-of-quagmirran.jpg",
    priceRange: "$23.99 - $29.99",
    deliveryTime: "1-4 hours",
    tagline: "BiS caster trinket. Heroic Slave Pens carry until it drops.",
  },
  {
    slug: "badge-of-justice-farm",
    name: "Badge of Justice Farm",
    shortName: "Badge Farm",
    category: "Currency",
    icon: "/images/items/badge-of-justice.jpg",
    priceRange: "$32.99 - $39.99",
    deliveryTime: "1-3 days",
    tagline: "Heroic world tour for maximum badges. Gear up fast.",
  },
  {
    slug: "drums-of-battle-kit",
    name: "Drums of Battle Kit (LW 1-375)",
    shortName: "Drums Kit",
    category: "Consumable",
    icon: "/images/items/drums-of-battle.jpg",
    priceRange: "$37.99 - $44.99",
    deliveryTime: "1-2 hours",
    tagline: "Full Leatherworking 1-375 materials + 40x Drums of Battle.",
  },
  {
    slug: "darkmoon-card-vengeance",
    name: "Darkmoon Card: Vengeance / Crusade",
    shortName: "DMC Vengeance",
    category: "Trinket",
    icon: "/images/items/darkmoon-vengeance.jpg",
    priceRange: "$79.99 - $94.99",
    deliveryTime: "1-3 days",
    tagline: "Pre-assembled Darkmoon Furies or Blessings deck. Turn in for BiS trinket.",
  },
  {
    slug: "raid-consumables-bulk",
    name: "Raid Consumables Bulk Pack",
    shortName: "Consumables",
    category: "Consumable",
    icon: "/images/items/raid-consumables.jpg",
    priceRange: "$17.99 - $129.99",
    deliveryTime: "30-60 min",
    tagline: "Potions, flasks, food, oils - one pack for a full raid week.",
  },
  {
    slug: "spellstrike-whitemend-craft",
    name: "Spellstrike / Whitemend Craft Service",
    shortName: "Spellstrike",
    category: "Craft",
    icon: "/images/items/spellstrike-whitemend.jpg",
    priceRange: "$57.99 - $74.99",
    deliveryTime: "1-2 days",
    tagline: "All materials + master crafter. Phase 1 BiS caster gear.",
  },
]

const categories: { label: string; value: Category | "all" }[] = [
  { label: "All Items", value: "all" },
  { label: "Materials", value: "Material" },
  { label: "Mounts", value: "Mount" },
  { label: "Trinkets", value: "Trinket" },
  { label: "Consumables", value: "Consumable" },
  { label: "Currency", value: "Currency" },
  { label: "Crafting", value: "Craft" },
]

const categoryColors: Record<Category, { border: string; bg: string; text: string; glow: string }> = {
  Material: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", glow: "shadow-[0_0_25px_rgba(245,158,11,0.1)]" },
  Mount: { border: "border-sky-500/30", bg: "bg-sky-500/10", text: "text-sky-400", glow: "shadow-[0_0_25px_rgba(14,165,233,0.1)]" },
  Trinket: { border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400", glow: "shadow-[0_0_25px_rgba(139,92,246,0.1)]" },
  Currency: { border: "border-gold/30", bg: "bg-gold/10", text: "text-gold", glow: "shadow-[0_0_25px_rgba(201,168,76,0.1)]" },
  Consumable: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "shadow-[0_0_25px_rgba(16,185,129,0.1)]" },
  Craft: { border: "border-rose-500/30", bg: "bg-rose-500/10", text: "text-rose-400", glow: "shadow-[0_0_25px_rgba(244,63,94,0.1)]" },
}

export default function ItemsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/3 blur-[180px]" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-fel-orange/3 blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-1.5 text-xs text-parchment/40">
            <Link href="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-parchment/70">Items & Services</span>
          </nav>

          <span className="mb-4 inline-block text-xs font-bold tracking-[0.4em] text-emerald-400/60 uppercase">
            Phase 1 Farming, Crafting & Carries
          </span>
          <h1 className="mb-4 text-3xl font-black tracking-tight text-parchment sm:text-4xl lg:text-5xl text-balance">
            TBC Anniversary Items & Services
          </h1>
          <div className="mx-auto mb-6 tbc-divider w-48" aria-hidden="true" />
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-parchment/50 sm:text-base">
            Primal Nethers, mount reputation grinds, BiS trinket runs, Darkmoon decks, raid consumables,
            and crafted gear. Everything you need for TBC Phase 1 on Spineshatter, Thunderstrike, and all servers.
          </p>
        </div>
      </section>

      {/* Category Filter (visual - all rendered server-side) */}
      <section className="mx-auto max-w-7xl px-4 pb-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <span
              key={cat.value}
              className={`rounded-full border px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase transition-colors ${
                cat.value === "all"
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-stone bg-stone-dark text-parchment/40"
              }`}
            >
              {cat.label}
            </span>
          ))}
        </div>
      </section>

      {/* Items Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-24 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const colors = categoryColors[item.category]
            return (
              <Link
                key={item.slug}
                href={`/items/${item.slug}`}
                className={`group relative flex flex-col overflow-hidden rounded-xl border parchment-card transition-all duration-300 hover:scale-[1.02] ${colors.border} ${colors.glow} hover:shadow-[0_0_40px_rgba(201,168,76,0.15)]`}
              >
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start gap-3">
                    <div className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border ${colors.border} ${colors.bg}`}>
                      <Image
                        src={item.icon}
                        alt={`${item.shortName} icon`}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`mb-0.5 inline-block rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase ${colors.border} ${colors.bg} ${colors.text}`}>
                        {item.category}
                      </span>
                      <h2 className="text-base font-black tracking-tight text-parchment leading-tight sm:text-lg">
                        {item.shortName}
                      </h2>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-5 flex-1 text-xs leading-relaxed text-parchment/45">
                    {item.tagline}
                  </p>

                  {/* Meta */}
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className={`h-3.5 w-3.5 ${colors.text}`} />
                      <span className="text-xs font-bold text-parchment/70">{item.priceRange}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-parchment/30" />
                      <span className="text-[11px] text-parchment/40">{item.deliveryTime}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center justify-between rounded-lg border px-4 py-2.5 transition-all ${colors.border} ${colors.bg} group-hover:border-gold/40`}>
                    <span className="text-[10px] font-bold tracking-wider text-parchment/60 uppercase">View Details</span>
                    <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${colors.text}`} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-sm text-parchment/40">
            {"Don't see what you need? We can source any TBC item or service."}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://discord.com/users/exodarmarket111"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[#5865F2]/40 bg-[#5865F2]/10 px-5 py-2.5 text-xs font-bold tracking-wider text-parchment uppercase transition-all hover:border-[#5865F2]/70"
            >
              <svg className="h-4 w-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
              Ask on Discord
            </a>
            <Link
              href="/order?service=item"
              className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-xs font-bold tracking-wider text-deep-black uppercase transition-all hover:bg-gold-light hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]"
            >
              <Package className="h-3.5 w-3.5" />
              Order Any Item
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
