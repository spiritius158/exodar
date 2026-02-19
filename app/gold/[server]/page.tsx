import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GoldPriceTable } from "@/components/gold-price-table"
import { Coins, ArrowRight, Check, Shield, Zap, Clock, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type ServerKey =
  | "spineshatter-horde"
  | "spineshatter-alliance"
  | "thunderstrike-horde"
  | "thunderstrike-alliance"
  | "nightslayer-horde"
  | "nightslayer-alliance"
  | "dreamscythe-horde"
  | "dreamscythe-alliance"

interface ServerData {
  serverName: string
  faction: "Horde" | "Alliance"
  type: "PvP" | "PvE"
  population: string
  pricePerThousand: number
  deliveryTime: string
  stock: "High" | "Medium" | "Low"
  h1: string
  metaTitle: string
  metaDescription: string
  heroText: string
  bodyText: string
  faq: { q: string; a: string }[]
}

const serverData: Record<ServerKey, ServerData> = {
  "spineshatter-horde": {
    serverName: "Spineshatter",
    faction: "Horde",
    type: "PvP",
    population: "High",
    pricePerThousand: 43.99,
    deliveryTime: "5-10 min",
    stock: "High",
    h1: "Buy Gold on Spineshatter Horde - TBC Anniversary Phase 1",
    metaTitle: "Buy Gold on Spineshatter Horde - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy TBC Anniversary gold on Spineshatter Horde. Cheapest Phase 1 prices, 5-10 min face-to-face delivery, zero ban rate. Instant stock available for epic flying, Karazhan prep, and consumables.",
    heroText: "Get cheap TBC fresh gold delivered to your Spineshatter Horde character in minutes. Face-to-face trade in Orgrimmar or Shattrath, secure and instant.",
    bodyText: "Spineshatter is the most popular PvP server in TBC Classic Anniversary Edition 2026. With the Phase 1 Karazhan Attunement rush and Pre-BiS farming in full swing, gold demand is at an all-time high. Whether you need gold for your epic flying mount (5,000g), raid consumables like Super Mana Potions and Elixir of Major Shadow Power, or crafted gear from Tailoring and Blacksmithing, we have you covered with the best prices on the market.",
    faq: [
      { q: "How fast is gold delivery on Spineshatter Horde?", a: "Most Spineshatter Horde orders are completed within 5-10 minutes. We have dedicated traders stationed in Orgrimmar and Shattrath City 24/7 for instant face-to-face delivery." },
      { q: "Is buying gold on Spineshatter safe in 2026?", a: "Absolutely. We use face-to-face trades with natural trading patterns. Across 3,400+ completed orders we maintain a zero ban rate. Your Spineshatter Horde account stays safe." },
      { q: "What is the cheapest price for Spineshatter Horde gold?", a: "Our current rate is $43.99 per 1,000 gold. We offer bulk discounts starting at 5,000g orders - perfect for epic flying mount funding." },
    ],
  },
  "spineshatter-alliance": {
    serverName: "Spineshatter",
    faction: "Alliance",
    type: "PvP",
    population: "High",
    pricePerThousand: 45.99,
    deliveryTime: "5-10 min",
    stock: "High",
    h1: "Buy Gold on Spineshatter Alliance - TBC Anniversary Phase 1",
    metaTitle: "Buy Gold on Spineshatter Alliance - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy TBC Anniversary gold on Spineshatter Alliance. Lowest Phase 1 prices with instant face-to-face delivery in Stormwind or Shattrath. 3,400+ satisfied customers.",
    heroText: "Cheapest TBC Anniversary gold for Spineshatter Alliance. Fast face-to-face delivery in Stormwind or Shattrath, ready for your Karazhan Attunement grind.",
    bodyText: "Spineshatter Alliance is a competitive PvP faction with strong raiding guilds pushing Phase 1 content. Buy TBC Anniversary gold to fund your Karazhan Attunement, craft your Pre-BiS gear sets, or stock up on consumables for your first Gruul's Lair and Magtheridon attempts. Our Alliance traders are online 24/7 with deep stock reserves.",
    faq: [
      { q: "How fast is gold delivery on Spineshatter Alliance?", a: "Spineshatter Alliance deliveries typically take 5-10 minutes via face-to-face trade in Stormwind or Shattrath City." },
      { q: "Do you have stock for large Alliance orders?", a: "Yes, we maintain high stock levels on Spineshatter Alliance. Orders up to 50,000g can be fulfilled immediately." },
      { q: "Is it safe to buy TBC Anniversary gold in 2026?", a: "We use secure face-to-face trades with natural patterns. Zero bans across thousands of deliveries on all TBC Anniversary servers." },
    ],
  },
  "thunderstrike-horde": {
    serverName: "Thunderstrike",
    faction: "Horde",
    type: "PvE",
    population: "Medium",
    pricePerThousand: 41.99,
    deliveryTime: "5-15 min",
    stock: "High",
    h1: "Buy Gold on Thunderstrike Horde - TBC Anniversary Phase 1",
    metaTitle: "Buy Gold on Thunderstrike Horde - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy cheap TBC fresh gold on Thunderstrike Horde PvE server. Phase 1 best prices, fast face-to-face delivery, and zero ban rate. Fund your epic flying and raid prep.",
    heroText: "Buy cheap TBC fresh gold on Thunderstrike Horde. The best PvE server prices with face-to-face delivery in under 15 minutes.",
    bodyText: "Thunderstrike is a premier PvE server in TBC Classic Anniversary Edition, known for its strong Horde raiding community. Phase 1 content including Karazhan, Gruul's Lair, and Magtheridon's Lair demands serious gold investment - from epic flying mounts to raid consumables and profession materials. Our Thunderstrike Horde gold is sourced safely and delivered face-to-face by our dedicated server team.",
    faq: [
      { q: "How fast is gold delivery on Thunderstrike Horde?", a: "Thunderstrike Horde deliveries are completed in 5-15 minutes. Our traders are stationed in Orgrimmar and Shattrath around the clock." },
      { q: "Why is Thunderstrike gold cheaper than PvP servers?", a: "PvE servers like Thunderstrike tend to have slightly lower gold prices due to different economy dynamics. You get more gold for your money." },
      { q: "Is buying gold safe on Thunderstrike PvE?", a: "Completely safe. We use face-to-face trades with natural patterns. Our zero ban rate applies to all TBC Anniversary servers including Thunderstrike." },
    ],
  },
  "thunderstrike-alliance": {
    serverName: "Thunderstrike",
    faction: "Alliance",
    type: "PvE",
    population: "Medium",
    pricePerThousand: 44.99,
    deliveryTime: "5-15 min",
    stock: "Medium",
    h1: "Buy Gold on Thunderstrike Alliance - TBC Anniversary Phase 1",
    metaTitle: "Buy Gold on Thunderstrike Alliance - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy TBC Anniversary gold on Thunderstrike Alliance PvE. Cheapest Phase 1 gold with fast delivery. Perfect for Karazhan prep, epic flying, and profession leveling.",
    heroText: "Affordable TBC Anniversary gold for Thunderstrike Alliance. Fast and secure delivery for your Phase 1 Karazhan preparation.",
    bodyText: "Thunderstrike Alliance offers a relaxed PvE environment perfect for enjoying TBC Classic Anniversary Phase 1 content. Whether you need gold for your Jewelcrafting profession boost (1-375 materials cost around 2,000-3,000g), epic flying mount training, or stocking up on raid consumables for Karazhan progression, our traders are ready to deliver.",
    faq: [
      { q: "How fast is gold delivery on Thunderstrike Alliance?", a: "Most Thunderstrike Alliance orders are delivered within 5-15 minutes via face-to-face trade in Stormwind, Ironforge, or Shattrath City." },
      { q: "Can I buy gold for Jewelcrafting materials on Thunderstrike?", a: "Absolutely! Many players buy 2,000-3,000g to fund their Jewelcrafting profession boost 1-375. We can deliver any amount you need for profession leveling." },
      { q: "Is Thunderstrike Alliance well-stocked?", a: "We maintain medium-to-high stock on Thunderstrike Alliance. Most orders including bulk orders up to 20,000g are fulfilled same-day." },
    ],
  },
  "nightslayer-horde": {
    serverName: "Nightslayer",
    faction: "Horde",
    type: "PvP",
    population: "Medium",
    pricePerThousand: 42.99,
    deliveryTime: "10-15 min",
    stock: "Medium",
    h1: "Buy Gold on Nightslayer Horde - TBC Anniversary Phase 1",
    metaTitle: "Buy Gold on Nightslayer Horde - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy TBC Anniversary gold on Nightslayer Horde PvP server. Competitive Phase 1 prices, fast delivery, and zero ban guarantee.",
    heroText: "Competitive TBC Anniversary gold prices for Nightslayer Horde PvP. Fast face-to-face delivery for your Phase 1 needs.",
    bodyText: "Nightslayer is a solid PvP server in TBC Classic Anniversary with an active Horde community. Phase 1 gold demand is high with players farming Pre-BiS gear, completing Karazhan Attunement chains, and saving for epic flying. Our Nightslayer team ensures quick delivery with competitive pricing.",
    faq: [
      { q: "How fast is gold delivery on Nightslayer Horde?", a: "Nightslayer Horde deliveries typically take 10-15 minutes. We trade face-to-face in Orgrimmar or Shattrath." },
      { q: "Is Nightslayer a good server for TBC Anniversary?", a: "Nightslayer is a healthy PvP server with active raid and PvP scenes. Gold is always in demand for consumables, gear, and mounts." },
      { q: "Do you offer bulk discounts on Nightslayer?", a: "Yes, orders over 5,000g receive automatic bulk discounts. Contact us on Discord for guild bank pricing." },
    ],
  },
  "nightslayer-alliance": {
    serverName: "Nightslayer",
    faction: "Alliance",
    type: "PvP",
    population: "Medium",
    pricePerThousand: 44.99,
    deliveryTime: "10-15 min",
    stock: "Medium",
    h1: "Buy Gold on Nightslayer Alliance - TBC Anniversary Phase 1",
    metaTitle: "Buy Gold on Nightslayer Alliance - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy TBC Anniversary gold on Nightslayer Alliance PvP. Phase 1 cheapest prices with secure face-to-face delivery and zero ban rate.",
    heroText: "Buy TBC Anniversary gold for Nightslayer Alliance. Secure delivery, competitive Phase 1 pricing, ready for Karazhan.",
    bodyText: "Nightslayer Alliance PvP players need gold for everything from epic flying mounts to Arena preparation and raid consumables. Our dedicated traders maintain stock on Nightslayer Alliance and deliver via secure face-to-face trades in Stormwind and Shattrath City.",
    faq: [
      { q: "How fast is gold delivery on Nightslayer Alliance?", a: "Nightslayer Alliance deliveries take 10-15 minutes on average via face-to-face trade." },
      { q: "Can I buy gold for Arena gear preparation?", a: "Yes! Many Nightslayer Alliance players buy gold to fund consumables and enchants for Arena. We support any amount." },
      { q: "Is buying gold safe on Nightslayer PvP?", a: "Yes, we use secure face-to-face trading with natural patterns. Zero ban rate across all servers." },
    ],
  },
  "dreamscythe-horde": {
    serverName: "Dreamscythe",
    faction: "Horde",
    type: "PvE",
    population: "Low",
    pricePerThousand: 46.99,
    deliveryTime: "15-30 min",
    stock: "Low",
    h1: "Buy Gold on Dreamscythe Horde - TBC Anniversary Phase 1",
    metaTitle: "Buy Gold on Dreamscythe Horde - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy TBC Anniversary gold on Dreamscythe Horde PvE server. Phase 1 delivery available, secure face-to-face trades.",
    heroText: "TBC Anniversary gold for Dreamscythe Horde PvE. Reliable delivery for the smaller server community.",
    bodyText: "Dreamscythe is a smaller PvE server in TBC Classic Anniversary but maintains an active Horde community. Gold is essential for Phase 1 progression including epic flying, profession leveling, and raid preparation for Karazhan. We keep dedicated stock available for Dreamscythe Horde players.",
    faq: [
      { q: "How fast is gold delivery on Dreamscythe Horde?", a: "Dreamscythe Horde deliveries typically take 15-30 minutes due to lower server population. We recommend ordering in advance of raid nights." },
      { q: "Is Dreamscythe gold more expensive?", a: "Dreamscythe gold is slightly higher priced due to lower supply, but we still offer the most competitive rates available." },
      { q: "Do you always have Dreamscythe stock?", a: "We maintain stock on Dreamscythe but recommend checking availability for large orders. Contact us on Discord for real-time stock info." },
    ],
  },
  "dreamscythe-alliance": {
    serverName: "Dreamscythe",
    faction: "Alliance",
    type: "PvE",
    population: "Low",
    pricePerThousand: 48.99,
    deliveryTime: "15-30 min",
    stock: "Low",
    h1: "Buy Gold on Dreamscythe Alliance - TBC Anniversary Phase 1",
    metaTitle: "Buy Gold on Dreamscythe Alliance - TBC Anniversary Phase 1 2026",
    metaDescription: "Buy TBC Anniversary gold on Dreamscythe Alliance PvE. Phase 1 gold available with secure face-to-face trades.",
    heroText: "TBC Anniversary gold for Dreamscythe Alliance PvE. Secure delivery for your Phase 1 adventure.",
    bodyText: "Dreamscythe Alliance is a cozy PvE server perfect for players who want a relaxed TBC Classic Anniversary experience. Gold is still critical for epic flying mounts, profession boosts including Jewelcrafting 1-375, and raid preparation consumables for Karazhan and beyond.",
    faq: [
      { q: "How fast is gold delivery on Dreamscythe Alliance?", a: "Dreamscythe Alliance deliveries take 15-30 minutes. We recommend planning ahead for large orders." },
      { q: "Is Dreamscythe Alliance active enough?", a: "Yes, Dreamscythe Alliance has a dedicated community with active raiding guilds clearing Phase 1 content." },
      { q: "Can I get bulk gold on Dreamscythe?", a: "We stock Dreamscythe Alliance but large orders (10,000g+) may require advance notice. Contact us on Discord for availability." },
    ],
  },
}

const allServerKeys = Object.keys(serverData) as ServerKey[]

export function generateStaticParams() {
  return allServerKeys.map((server) => ({ server }))
}

export async function generateMetadata({ params }: { params: Promise<{ server: string }> }): Promise<Metadata> {
  const { server } = await params
  const data = serverData[server as ServerKey]
  if (!data) return { title: "Server Not Found" }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://exodar.market"
  const pageUrl = `${siteUrl}/gold/${server}`

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: pageUrl,
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: data.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: ["/og-image.jpg"],
    },
  }
}

export default async function GoldServerPage({ params }: { params: Promise<{ server: string }> }) {
  const { server } = await params
  const data = serverData[server as ServerKey]
  if (!data) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://exodar.market"
  const factionColor = data.faction === "Horde" ? "red" : "blue"
  const factionBg = data.faction === "Horde" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-blue-500/10 border-blue-500/30 text-blue-400"

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `WoW TBC Classic Gold - ${data.serverName} ${data.faction}`,
    description: data.metaDescription,
    brand: { "@type": "Brand", name: "Exodar Market" },
    offers: {
      "@type": "Offer",
      price: data.pricePerThousand.toFixed(2),
      priceCurrency: "USD",
      availability: data.stock === "Low" ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock",
      priceValidUntil: "2026-12-31",
      seller: { "@type": "Organization", name: "Exodar Market" },
      itemCondition: "https://schema.org/NewCondition",
      description: `1,000 gold on ${data.serverName} ${data.faction} (${data.type})`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "3400",
      bestRating: "5",
      worstRating: "1",
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Gold", item: `${siteUrl}/services/gold` },
      { "@type": "ListItem", position: 3, name: `${data.serverName} ${data.faction}`, item: `${siteUrl}/gold/${server}` },
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Navbar />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-24 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-parchment/40">
          <li><Link href="/" className="transition-colors hover:text-gold">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/services/gold" className="transition-colors hover:text-gold">Gold</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-bold text-parchment/70">{data.serverName} {data.faction}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative pb-16 pt-8 sm:pb-24 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${factionBg}`}>
              {data.faction}
            </span>
            <span className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[10px] font-bold tracking-wider text-gold/80 uppercase">
              {data.type} Server
            </span>
            <span className="rounded-full border border-fel-green/20 bg-fel-green/5 px-3 py-1 text-[10px] font-bold tracking-wider text-fel-green-glow/80 uppercase">
              Phase 1
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-black tracking-tight text-parchment sm:text-4xl lg:text-5xl text-balance">
            {data.h1}
          </h1>
          <div className="mx-auto mb-6 flex items-center justify-center gap-3" aria-hidden="true">
            <div className={`h-px w-12 bg-gradient-to-r from-transparent ${factionColor === "red" ? "to-red-500/40" : "to-blue-500/40"}`} />
            <Coins className={`h-4 w-4 ${factionColor === "red" ? "text-red-400/60" : "text-blue-400/60"}`} />
            <div className={`h-px w-12 bg-gradient-to-l from-transparent ${factionColor === "red" ? "to-red-500/40" : "to-blue-500/40"}`} />
          </div>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-parchment/60 sm:text-base">
            {data.heroText}
          </p>

          {/* Quick stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className="rounded-xl border border-gold/20 parchment-card px-6 py-4 text-center">
              <p className="text-2xl font-black text-gold gold-shimmer">${data.pricePerThousand}</p>
              <p className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">per 1,000 gold</p>
            </div>
            <div className="rounded-xl border border-fel-green/20 parchment-card px-6 py-4 text-center">
              <p className="text-2xl font-black text-fel-green-glow">{data.deliveryTime}</p>
              <p className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">delivery time</p>
            </div>
            <div className="rounded-xl border border-fel-orange/20 parchment-card px-6 py-4 text-center">
              <p className="text-2xl font-black text-fel-orange-glow">{data.stock}</p>
              <p className="text-[10px] font-bold tracking-wider text-parchment/40 uppercase">stock level</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/order?service=gold&server=${server}`}
              className="flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-sm font-bold tracking-widest text-deep-black uppercase transition-all hover:bg-gold-light"
            >
              Buy {data.serverName} {data.faction} Gold
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#pricing"
              className="rounded-lg border border-gold/30 px-8 py-4 text-sm font-bold tracking-widest text-gold/70 uppercase backdrop-blur-sm transition-all hover:border-gold/50 hover:text-gold"
            >
              Compare All Servers
            </a>
          </div>
        </div>
      </section>

      {/* Body text for SEO */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <article className="rounded-xl border border-stone parchment-card p-8">
            <h2 className="mb-4 text-xl font-black tracking-tight text-parchment sm:text-2xl">
              Buy TBC Anniversary Gold on {data.serverName} {data.faction} ({data.type})
            </h2>
            <p className="text-sm leading-relaxed text-parchment/60">
              {data.bodyText}
            </p>
          </article>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-black tracking-tight text-parchment sm:text-3xl">
            Why Buy Gold from Exodar Market
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Zap, title: `${data.deliveryTime} Delivery`, desc: `Fast face-to-face trade on ${data.serverName} ${data.faction}. Our traders are stationed in major cities 24/7.` },
              { icon: Shield, title: "Zero Ban Rate", desc: "Secure face-to-face trades with natural patterns. 3,400+ satisfied customers across all TBC Anniversary servers." },
              { icon: Clock, title: "24/7 Live Support", desc: "Our team is online around the clock. Reach us on Discord at exodarmarket111 for instant assistance." },
            ].map((feature) => (
              <div key={feature.title} className="rounded-xl border border-gold/15 parchment-card p-6 transition-all hover:border-gold/30">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-gold/20 bg-gold/5">
                  <feature.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mb-2 text-sm font-bold tracking-wider text-parchment uppercase">{feature.title}</h3>
                <p className="text-xs leading-relaxed text-parchment/50">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price comparison table */}
      <section id="pricing" className="py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="mb-4 text-center text-2xl font-black tracking-tight text-parchment sm:text-3xl">
            TBC Anniversary Gold Prices - All Servers
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm leading-relaxed text-parchment/50">
            Compare gold prices across all Phase 1 TBC Classic Anniversary servers. Updated daily for the most competitive rates.
          </p>
          <GoldPriceTable highlightServer={server} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-black tracking-tight text-parchment sm:text-3xl">
            {data.serverName} {data.faction} Gold FAQ
          </h2>
          <div className="flex flex-col gap-4">
            {data.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-gold/15 parchment-card p-6">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-parchment">
                  <Check className="h-4 w-4 text-gold" />
                  {item.q}
                </h3>
                <p className="pl-6 text-xs leading-relaxed text-parchment/50">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <div className="rounded-2xl border border-gold/20 parchment-card p-8 sm:p-12">
            <h2 className="mb-4 text-2xl font-black tracking-tight text-parchment sm:text-3xl">
              Ready to Buy {data.serverName} {data.faction} Gold?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-parchment/50">
              Place your order now and receive your TBC Classic Anniversary gold within {data.deliveryTime} via secure face-to-face trade.
            </p>
            <Link
              href={`/order?service=gold&server=${server}`}
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-sm font-bold tracking-widest text-deep-black uppercase transition-all hover:bg-gold-light"
            >
              Order Gold Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
