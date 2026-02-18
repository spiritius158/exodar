"use client"

import Image from "next/image"
import Link from "next/link"
import { Coins, Sword, ScrollText, ArrowRight, Star, Clock, ShieldCheck } from "lucide-react"

const services = [
  {
    id: "gold",
    title: "Gold Selling",
    subtitle: "Outland Riches",
    description:
      "Stock up on TBC Classic Anniversary Edition gold for your epic flying mount, crafted gear, and consumables. All servers supported with rapid delivery.",
    image: "/images/gold-selling.jpg",
    icon: Coins,
    features: ["All TBC Servers", "Instant Delivery", "Best Prices"],
    featureIcons: [ShieldCheck, Clock, Star],
    price: "From $21.99",
    color: "gold" as const,
    orderHref: "/order?service=gold",
    detailHref: "/services/gold",
  },
  {
    id: "boosting",
    title: "Character Boosting",
    subtitle: "Outland Power",
    description:
      "Professional TBC Classic powerleveling and boosting. Full 1-70 leveling, Outland 60-70, profession boosts, pre-raid gear, and PvP honor sets. Done by verified TBC veterans.",
    image: "/images/character-boosting.jpg",
    icon: Sword,
    features: ["Leveling 1-70 / 60-70", "Professions 0-375", "Pre-Raid & PvP Gear"],
    featureIcons: [Star, ShieldCheck, Clock],
    price: "From $40",
    color: "blue" as const,
    orderHref: "/order?service=boosting",
    detailHref: "/services/boosting",
  },
  {
    id: "accounts",
    title: "Accounts",
    subtitle: "Battle-Ready Characters",
    description:
      "Browse our marketplace of 60 pre-built Phase 1 TBC Classic Anniversary characters. Karazhan-geared, professions leveled, and ready for Outland endgame.",
    image: "/images/accounts.jpg",
    icon: ScrollText,
    features: ["Level 70 Characters", "Epic Gear", "All Classes"],
    featureIcons: [Star, ShieldCheck, Clock],
    price: "From $170",
    color: "purple" as const,
    orderHref: "/services/accounts",
    detailHref: "/services/accounts",
  },
]

const colorMap = {
  gold: {
    glow: "shadow-[0_0_30px_rgba(201,168,76,0.15)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]",
    border: "border-gold/30",
    borderHover: "hover:border-gold/60",
    icon: "text-gold",
    iconBg: "bg-gold/10",
    badge: "bg-gold/10 text-gold border-gold/20",
    button: "bg-gradient-to-r from-gold via-gold-light to-gold text-deep-black hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]",
    link: "text-gold hover:text-gold-light",
    accent: "from-gold/10",
  },
  blue: {
    glow: "shadow-[0_0_30px_rgba(57,211,83,0.12)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(57,211,83,0.25)]",
    border: "border-fel-green/30",
    borderHover: "hover:border-fel-green/60",
    icon: "text-fel-green-glow",
    iconBg: "bg-fel-green/10",
    badge: "bg-fel-green/10 text-fel-green-glow border-fel-green/20",
    button: "bg-gradient-to-r from-fel-green-dark via-fel-green to-fel-green-dark text-deep-black font-black hover:shadow-[0_0_20px_rgba(57,211,83,0.4)]",
    link: "text-fel-green-glow hover:text-fel-green",
    accent: "from-fel-green/10",
  },
  purple: {
    glow: "shadow-[0_0_30px_rgba(224,93,32,0.12)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(224,93,32,0.25)]",
    border: "border-fel-orange/30",
    borderHover: "hover:border-fel-orange/60",
    icon: "text-fel-orange-glow",
    iconBg: "bg-fel-orange/10",
    badge: "bg-fel-orange/10 text-fel-orange-glow border-fel-orange/20",
    button: "bg-gradient-to-r from-fel-orange via-fel-orange-glow to-fel-orange text-deep-black font-black hover:shadow-[0_0_20px_rgba(224,93,32,0.4)]",
    link: "text-fel-orange-glow hover:text-fel-orange",
    accent: "from-fel-orange/10",
  },
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
            TBC Classic Anniversary Services
          </span>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-parchment sm:text-4xl lg:text-5xl text-balance">
            Choose Your Path Through Outland
          </h2>
          <div className="mx-auto mb-6 tbc-divider w-48" aria-hidden="true" />
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-parchment/50 sm:text-base">
            Three legendary services for The Burning Crusade Classic Anniversary Edition.
            Every order backed by our ironclad guarantee. Lowest prices guaranteed.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
            <span className="rounded-full border border-fel-green/15 bg-fel-green/5 px-3 py-1 text-[10px] font-bold tracking-wider text-fel-green-glow/70 uppercase">Combo Deals: Character + Gold = Extra Discount</span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-parchment/40">
              <svg className="h-3.5 w-3.5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
              <span className="font-bold text-fel-green/60">exodarmarket111</span>
            </span>
          </div>
        </div>

        {/* Service cards grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {services.map((service) => {
            const colors = colorMap[service.color]
            const Icon = service.icon
            return (
              <article
                key={service.id}
                className={`group relative flex flex-col overflow-hidden rounded-xl border parchment-card transition-all duration-500 ${colors.border} ${colors.borderHover} ${colors.glow} ${colors.glowHover}`}
              >
                {/* Card image */}
                <div className="relative h-48 overflow-hidden sm:h-56">
                  <Image
                    src={service.image}
                    alt={`${service.title} service illustration`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-dark via-stone-dark/60 to-transparent" />

                  <div className={`absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-lg border border-foreground/10 backdrop-blur-md ${colors.iconBg}`}>
                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                  </div>

                  <div className={`absolute top-4 right-4 rounded-full border px-4 py-1.5 text-xs font-black tracking-wider uppercase backdrop-blur-sm ${colors.badge}`}>
                    {service.price}
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-6">
                  <span className={`mb-1 text-[10px] font-bold tracking-[0.3em] uppercase ${colors.icon}`}>
                    {service.subtitle}
                  </span>
                  <h3 className="mb-3 text-xl font-black tracking-tight text-parchment sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-parchment/50">
                    {service.description}
                  </p>

                  <div className="mb-6 flex flex-col gap-2">
                    {service.features.map((feature, idx) => {
                      const FeatureIcon = service.featureIcons[idx]
                      return (
                        <div key={feature} className="flex items-center gap-2">
                          <FeatureIcon className={`h-3.5 w-3.5 ${colors.icon}`} />
                          <span className="text-xs font-medium text-parchment/60">{feature}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={service.orderHref}
                      className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all ${colors.button}`}
                    >
                      <span>{service.id === "accounts" ? "Browse Characters" : "Order Now"}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href={service.detailHref}
                      className={`flex items-center justify-center gap-2 rounded-lg border border-stone px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all hover:border-fel-green/20 ${colors.link}`}
                    >
                      Learn More
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
