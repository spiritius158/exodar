"use client"

import Image from "next/image"
import Link from "next/link"
import { Coins, Sword, ScrollText, Package, ArrowRight, Star, Clock, ShieldCheck, Flame, Zap, TrendingUp } from "lucide-react"

const services = [
  {
    id: "gold",
    title: "TBC Gold",
    subtitle: "Cheapest in 2026",
    badge: "BEST SELLER",
    badgeType: "hot" as const,
    description:
      "Get your epic flying mount TODAY. Buy TBC Anniversary gold on Spineshatter & Thunderstrike at the lowest prices anywhere. Face-to-face delivery in 5-10 minutes -- no waiting, no risk.",
    image: "/images/gold-selling.jpg",
    icon: Coins,
    features: ["5-10 Min Delivery", "All Phase 1 Servers", "0% Ban Rate"],
    featureIcons: [Zap, ShieldCheck, Star],
    price: "From $21.99",
    pricePer: "per 1000g",
    highlight: "5,000g = Epic Flying Mount",
    color: "gold" as const,
    orderHref: "/order?service=gold",
    detailHref: "/services/gold",
  },
  {
    id: "boosting",
    title: "Powerleveling & Boosts",
    subtitle: "Skip the Grind",
    badge: "MOST POPULAR",
    badgeType: "popular" as const,
    description:
      "Why waste 50+ hours leveling? Classic TBC boost 58-70 done in 2-3 days. Profession boost jewelcrafting 1-375 in 24hrs. Arena rating, Pre-BiS gear, Karazhan attunement -- we do it all.",
    image: "/images/character-boosting.jpg",
    icon: Sword,
    features: ["58-70 in 2-3 Days", "All 13 Professions", "Arena Rating Boost"],
    featureIcons: [Flame, Star, TrendingUp],
    price: "From $29.99",
    pricePer: "per service",
    highlight: "Jewelcrafting = 50-100g/hr profit",
    color: "green" as const,
    orderHref: "/order?service=boosting",
    detailHref: "/services/boosting",
  },
  {
    id: "items",
    title: "Items & Farm Services",
    subtitle: "Primals, Mounts, Gear",
    badge: "NEW",
    badgeType: "new" as const,
    description:
      "Primal Might, Primal Fire, Eye of Quagmirran, Drums of Battle, Spellstrike set -- we farm or craft everything you need for Phase 1 endgame. Stop overpaying on the AH.",
    image: "/images/gold-selling.jpg",
    icon: Package,
    features: ["10+ Items Available", "Crafted Gear Sets", "Bulk Discounts"],
    featureIcons: [Star, ShieldCheck, Coins],
    price: "From $3.99",
    pricePer: "per item",
    highlight: "Spellstrike Set = Karazhan Ready",
    color: "emerald" as const,
    orderHref: "/items",
    detailHref: "/items",
  },
  {
    id: "accounts",
    title: "Geared Characters",
    subtitle: "Instant 70. Instant Raid.",
    badge: "LIMITED STOCK",
    badgeType: "limited" as const,
    description:
      "160+ Phase 1 characters ready NOW. Karazhan-attuned, Pre-BiS geared, professions maxed. Pick your class, pick your server, and raid tonight. Full Battle.net account transfer.",
    image: "/images/accounts.jpg",
    icon: ScrollText,
    features: ["Karazhan Attuned", "Pre-BiS / T4 Gear", "All Classes & Servers"],
    featureIcons: [Flame, Star, ShieldCheck],
    price: "From $170",
    pricePer: "per character",
    highlight: "Raid tonight, not next month",
    color: "orange" as const,
    orderHref: "/services/accounts",
    detailHref: "/services/accounts",
  },
]

const colorMap = {
  gold: {
    glow: "shadow-[0_0_30px_rgba(201,168,76,0.15)]",
    glowHover: "hover:shadow-[0_0_50px_rgba(201,168,76,0.35)]",
    border: "border-gold/30",
    borderHover: "hover:border-gold/70",
    icon: "text-gold",
    iconBg: "bg-gold/10",
    badge: "bg-gold/10 text-gold border-gold/20",
    badgePulse: "bg-gradient-to-r from-gold via-gold-light to-gold",
    button: "bg-gradient-to-r from-gold via-gold-light to-gold text-deep-black hover:shadow-[0_0_25px_rgba(201,168,76,0.5)]",
    link: "text-gold hover:text-gold-light",
    accent: "from-gold/10",
    highlightBg: "bg-gold/5 border-gold/15 text-gold",
  },
  green: {
    glow: "shadow-[0_0_30px_rgba(57,211,83,0.12)]",
    glowHover: "hover:shadow-[0_0_50px_rgba(57,211,83,0.3)]",
    border: "border-fel-green/30",
    borderHover: "hover:border-fel-green/70",
    icon: "text-fel-green-glow",
    iconBg: "bg-fel-green/10",
    badge: "bg-fel-green/10 text-fel-green-glow border-fel-green/20",
    badgePulse: "bg-gradient-to-r from-fel-green-dark via-fel-green to-fel-green-dark",
    button: "bg-gradient-to-r from-fel-green-dark via-fel-green to-fel-green-dark text-deep-black font-black hover:shadow-[0_0_25px_rgba(57,211,83,0.5)]",
    link: "text-fel-green-glow hover:text-fel-green",
    accent: "from-fel-green/10",
    highlightBg: "bg-fel-green/5 border-fel-green/15 text-fel-green-glow",
  },
  emerald: {
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.12)]",
    glowHover: "hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]",
    border: "border-emerald-500/30",
    borderHover: "hover:border-emerald-500/70",
    icon: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    badgePulse: "bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600",
    button: "bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 text-deep-black font-black hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]",
    link: "text-emerald-400 hover:text-emerald-300",
    accent: "from-emerald-500/10",
    highlightBg: "bg-emerald-500/5 border-emerald-500/15 text-emerald-400",
  },
  orange: {
    glow: "shadow-[0_0_30px_rgba(224,93,32,0.12)]",
    glowHover: "hover:shadow-[0_0_50px_rgba(224,93,32,0.3)]",
    border: "border-fel-orange/30",
    borderHover: "hover:border-fel-orange/70",
    icon: "text-fel-orange-glow",
    iconBg: "bg-fel-orange/10",
    badge: "bg-fel-orange/10 text-fel-orange-glow border-fel-orange/20",
    badgePulse: "bg-gradient-to-r from-fel-orange via-fel-orange-glow to-fel-orange",
    button: "bg-gradient-to-r from-fel-orange via-fel-orange-glow to-fel-orange text-deep-black font-black hover:shadow-[0_0_25px_rgba(224,93,32,0.5)]",
    link: "text-fel-orange-glow hover:text-fel-orange",
    accent: "from-fel-orange/10",
    highlightBg: "bg-fel-orange/5 border-fel-orange/15 text-fel-orange-glow",
  },
}

const badgeTypeStyles = {
  hot: "bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white animate-shimmer",
  popular: "bg-gradient-to-r from-fel-green-dark via-fel-green to-fel-green-dark text-deep-black animate-shimmer",
  new: "bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 text-deep-black animate-shimmer",
  limited: "bg-gradient-to-r from-fel-orange via-fel-orange-glow to-fel-orange text-deep-black animate-shimmer",
}

export function ServiceCards() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fel-green/20 to-transparent" />
        <div className="absolute top-1/3 left-0 h-80 w-80 rounded-full bg-fel-green/3 blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-fel-orange/2 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center sm:mb-20">
          <span className="mb-4 inline-block text-xs font-bold tracking-[0.4em] text-fel-green/60 uppercase">
            TBC Classic Anniversary - Phase 1 Services
          </span>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-parchment sm:text-4xl lg:text-5xl text-balance">
            Everything You Need for Outland
          </h2>
          <div className="mx-auto mb-6 tbc-divider w-48" aria-hidden="true" />
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-parchment/50 sm:text-base">
            Gold, powerleveling, rare items, and raid-ready characters. 3,400+ orders completed with a
            zero ban rate. Every order backed by our ironclad guarantee.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-[10px] font-black tracking-wider text-red-400 uppercase animate-pulse-glow">
              Phase 1 Launch Sale - 15% Off All Orders
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-stone bg-stone-dark/50 px-3 py-1.5 text-[10px] font-semibold text-parchment/40">
              <svg className="h-3.5 w-3.5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
              <span className="font-bold text-[#5865F2]">exodarmarket111</span>
            </span>
          </div>
        </div>

        {/* Service cards grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 lg:gap-8">
          {services.map((service) => {
            const colors = colorMap[service.color]
            const Icon = service.icon
            return (
              <article
                key={service.id}
                className={`group relative flex flex-col overflow-hidden rounded-xl border parchment-card transition-all duration-500 ${colors.border} ${colors.borderHover} ${colors.glow} ${colors.glowHover}`}
              >
                {/* Urgency badge */}
                <div className={`absolute top-0 left-0 right-0 z-20 flex justify-center`}>
                  <span className={`rounded-b-lg px-4 py-1 text-[9px] font-black tracking-[0.2em] uppercase ${badgeTypeStyles[service.badgeType]}`}>
                    {service.badge}
                  </span>
                </div>

                {/* Card image */}
                <div className="relative h-44 overflow-hidden sm:h-48">
                  <Image
                    src={service.image}
                    alt={`${service.title} - TBC Anniversary service`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-dark via-stone-dark/70 to-transparent" />

                  <div className={`absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-lg border border-foreground/10 backdrop-blur-md ${colors.iconBg}`}>
                    <Icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>

                  <div className={`absolute bottom-4 right-4 flex flex-col items-end`}>
                    <span className={`rounded-full border px-3 py-1 text-sm font-black tracking-wide backdrop-blur-sm ${colors.badge}`}>
                      {service.price}
                    </span>
                    <span className="mt-0.5 text-[9px] font-medium text-parchment/30">{service.pricePer}</span>
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-5">
                  <span className={`mb-0.5 text-[9px] font-bold tracking-[0.3em] uppercase ${colors.icon}`}>
                    {service.subtitle}
                  </span>
                  <h3 className="mb-2 text-lg font-black tracking-tight text-parchment sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-parchment/50">
                    {service.description}
                  </p>

                  {/* Highlight callout */}
                  <div className={`mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 ${colors.highlightBg}`}>
                    <Flame className="h-3 w-3 shrink-0" />
                    <span className="text-[10px] font-bold tracking-wide">{service.highlight}</span>
                  </div>

                  <div className="mb-5 flex flex-col gap-1.5">
                    {service.features.map((feature, idx) => {
                      const FeatureIcon = service.featureIcons[idx]
                      return (
                        <div key={feature} className="flex items-center gap-2">
                          <FeatureIcon className={`h-3 w-3 ${colors.icon}`} />
                          <span className="text-[11px] font-semibold text-parchment/60">{feature}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <Link
                      href={service.orderHref}
                      className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[10px] font-black tracking-[0.15em] uppercase transition-all duration-300 ${colors.button}`}
                    >
                      <span>{service.id === "accounts" ? "Browse Characters" : service.id === "items" ? "Browse All Items" : "Order Now"}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href={service.detailHref}
                      className={`flex items-center justify-center gap-2 rounded-lg border border-stone px-5 py-2 text-[9px] font-bold tracking-[0.15em] uppercase transition-all hover:border-stone/80 ${colors.link}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
