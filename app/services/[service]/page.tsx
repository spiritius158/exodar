import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CharacterMarketplace } from "@/components/character-marketplace"
import { GoldCalculator } from "@/components/gold-calculator-wrapper"
import { Shield, Zap, Clock, Headphones, Star, ShieldCheck, Coins, Sword, ScrollText, ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const serviceData = {
  gold: {
    title: "Gold Selling",
    subtitle: "Outland Riches Delivered Fast",
    heroDescription:
      "Stock up on TBC Classic Anniversary Edition gold for your epic flying mount, raid consumables, crafted gear, and auction house investments. All servers and factions supported with face-to-face delivery.",
    image: "/images/gold-selling.jpg",
    icon: Coins,
    color: "gold",
    features: [
      {
        title: "All Phase 1 Servers",
        description: "We cover Spineshatter (PvP), Nightslayer (PvP), Dreamscythe (PvE), and Thunderstrike (PvE). Both Horde and Alliance factions supported.",
      },
      {
        title: "Lightning-Fast Delivery",
        description: "Most TBC gold orders are delivered within 5-10 minutes via secure face-to-face trade in Shattrath or your capital city.",
      },
      {
        title: "Best Market Prices",
        description: "We continuously monitor TBC Classic Anniversary gold rates to offer the most competitive prices available.",
      },
      {
        title: "Epic Flying Fund",
        description: "Need 5,000g for your epic flying mount? We have affordable packages specifically designed for that milestone.",
      },
      {
        title: "Bulk Discounts",
        description: "Ordering gold for your raid team or guild bank? Contact us for custom bulk pricing on large orders.",
      },
      {
        title: "Money-Back Guarantee",
        description: "If we cannot deliver your TBC Classic gold for any reason, you receive a full refund immediately.",
      },
    ],
    pricingTiers: [
      { name: "Starter Pack", amount: "500 Gold", price: "$21.99", popular: false },
      { name: "Flying Mount Fund", amount: "5,000 Gold", price: "$210.99", popular: true },
      { name: "Raid Ready", amount: "10,000 Gold", price: "$511.99", popular: false },
      { name: "Guild Bank", amount: "50,000 Gold", price: "$2,000", popular: false },
    ],
    faq: [
      { q: "How fast is TBC Classic gold delivery?", a: "Most orders are delivered within 5-10 minutes via face-to-face trade on your server." },
      { q: "Is it safe for my account?", a: "Yes. We use face-to-face trades and take precautions to protect your account. Zero bans across thousands of deliveries." },
      { q: "Which TBC servers do you support?", a: "Spineshatter (PvP), Nightslayer (PvP), Dreamscythe (PvE), and Thunderstrike (PvE) - all Phase 1 Anniversary servers." },
      { q: "Can I get gold for epic flying?", a: "Absolutely. Our Flying Mount Fund package is specifically designed for the 5,000g epic flying skill." },
    ],
  },
  boosting: {
    title: "Character Boosting",
    subtitle: "Powerleveling & Boosting Services",
    heroDescription:
      "Buy WoW TBC Classic Anniversary boosting and achieve your desired character level quickly and effortlessly. Our professional players handle the grind while you enjoy the rewards. Leveling, gear farming, professions, and PvP - all done by verified TBC veterans.",
    image: "/images/character-boosting.jpg",
    icon: Sword,
    color: "blue",
    features: [
      {
        title: "Full Powerleveling 1-70",
        description: "Complete character leveling from level 1 to 70. Skip the tedious grind and jump straight into TBC endgame content. Average completion in 3-5 days.",
      },
      {
        title: "Outland Leveling 60-70",
        description: "Already have a level 60? We will power through Outland content and get you to 70 fast. Questing, dungeons, and efficient routes used by our pros.",
      },
      {
        title: "Profession Boost 0-375",
        description: "Get any profession leveled from 0 to 375. Whether its Enchanting, Jewelcrafting, Alchemy, or any other - our experts handle the mat farming and leveling.",
      },
      {
        title: "Pre-Raid Gear Package",
        description: "Get your character raid-ready with a full set of pre-raid gear from heroic dungeons, reputation vendors, and crafted items. Ready for Karazhan in no time.",
      },
      {
        title: "PvP Honor Set",
        description: "Full PvP honor gear set farmed for your character. Battleground grinding done efficiently by experienced PvP players. Arrive in Arena fully equipped.",
      },
      {
        title: "Arena Rating Boost",
        description: "Get your desired arena rating in 2v2, 3v3, or 5v5 brackets. Our Gladiator-level pilots push your character to any rating from 1500 up to 2200. Merciless and Vengeful gear unlocks guaranteed.",
      },
      {
        title: "Safe & Secure Service",
        description: "Premium VPN protection matching your location. Natural play patterns and verified professional players. Your account stays safe with zero ban rate.",
      },
    ],
    pricingTiers: [
      { name: "Most Popular", amount: "Character Level 60-70", price: "$105.99", popular: true },
      { name: "Full Powerleveling", amount: "Character Level 1-70", price: "$181.99", popular: false },
      { name: "Profession Boost", amount: "Any Profession 0-375", price: "$42.99", popular: false },
      { name: "Arena Rating Boost", amount: "Rating 1500-2200 (2v2/3v3/5v5)", price: "$16.99-$325.99", popular: false },
      { name: "PvP / Gear Add-on", amount: "Honor Set or Pre-Raid Gear", price: "+$110", popular: false },
    ],
    additionalPricing: [
      { label: "Quests Leveling", price: "+$20.93" },
      { label: "All Heroic Dungeons Attunements", price: "+$131.27" },
      { label: "Karazhan Attunement", price: "+$37.78" },
      { label: "60% Flying Skill Unlock", price: "+$61.89" },
      { label: "280% Flying Skill Unlock", price: "+$232.59" },
      { label: "Pre-Raid Gear Package", price: "+$110" },
      { label: "PvP Honor Set", price: "+$110" },
    ],
    faq: [
      { q: "What does TBC Classic Anniversary powerleveling include?", a: "A leveled character to your desired level, optional pre-raid gear farming, riding skill upgrades, and extra rewards like gold and rare items earned during the process." },
      { q: "How long does 1-70 leveling take?", a: "Typically 3-5 days for full 1-70 depending on class and server queues. Outland-only 60-70 is usually completed within 1-2 days." },
      { q: "Is it safe for my account?", a: "Yes. Our professional players use Premium VPN to match your location. We use natural play patterns and have a zero ban rate across thousands of orders." },
      { q: "Can I add extras to my leveling order?", a: "Yes! Add Pre-Raid Gear, PvP Honor Set, heroic attunements, Karazhan attunement, flying skills, and profession boosts to any order. Ask on Discord for combo deal pricing." },
      { q: "How does the process work?", a: "After ordering, our manager contacts you on Discord to arrange account access. A professional player logs in via VPN and completes your order. You can track progress anytime." },
      { q: "What professions can you level?", a: "All 13 TBC professions: Alchemy, Blacksmithing, Enchanting, Engineering, Herbalism, Jewelcrafting, Leatherworking, Mining, Skinning, Tailoring, Cooking, First Aid, and Fishing. Each at $42.99." },
      { q: "How does Arena Rating Boost work?", a: "Choose your bracket (2v2, 3v3, or 5v5) and target rating (1500-2200). Our Gladiator-experienced players pilot your character to the desired rating. Pricing scales linearly from $16.99 at 1500 to $325.99 at 2200." },
    ],
  },
  accounts: {
    title: "Character Marketplace",
    subtitle: "Pre-Built TBC Characters Ready for Outland",
    heroDescription:
      "Browse our marketplace of 60 pre-built World of Warcraft: TBC Classic Anniversary Edition Phase 1 characters. Every character is level 70, geared for Karazhan, Gruul, and Magtheridon, or PvP Arena.",
    image: "/images/accounts.jpg",
    icon: ScrollText,
    color: "purple",
    hasMarketplace: true,
    features: [
      {
        title: "Level 70 Characters",
        description: "Every character is max level 70 and ready for TBC Classic Anniversary endgame content.",
      },
      {
        title: "Tiered Gear Options",
        description: "Choose from Pre-Raid geared, full T4 Karazhan/Gruul geared, or PvP Arena geared characters depending on your needs.",
      },
      {
        title: "All Classes Available",
        description: "Warrior, Paladin, Hunter, Rogue, Priest, Shaman, Mage, Warlock, and Druid characters in stock.",
      },
      {
        title: "Horde & Alliance",
        description: "Both factions available across Blood Elf, Draenei, and all original TBC races.",
      },
      {
        title: "Secure Account Transfer",
        description: "Full Battle.net credentials with guided handover. Change email, password, and authenticator to yours.",
      },
      {
        title: "30-Day Warranty",
        description: "If anything goes wrong within 30 days, we provide a full replacement or refund.",
      },
    ],
    pricingTiers: [],
    faq: [
      { q: "Is buying an account safe?", a: "We change all associated details during handover to fully secure the account under your ownership." },
      { q: "Can I choose a specific character?", a: "Yes! Browse our marketplace below and pick the exact character, class, spec, and gear tier you want." },
      { q: "What do I receive?", a: "Full Battle.net account credentials, email access, and a step-by-step security transfer guide." },
      { q: "What is the 30-day warranty?", a: "If there is any recovery issue or problem within 30 days, we replace the account or issue a full refund." },
    ],
  },
} as const

type ServiceKey = keyof typeof serviceData

const colorStyles = {
  gold: {
    border: "border-gold/30",
    borderHover: "hover:border-gold/60",
    glow: "shadow-[0_0_30px_rgba(201,168,76,0.15)]",
    icon: "text-gold",
    iconBg: "bg-gold/10 border-gold/20",
    badge: "bg-gold/10 text-gold border-gold/20",
    button: "bg-gold text-deep-black hover:bg-gold-light hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]",
    outline: "border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60",
    heading: "text-gold",
    popularBorder: "border-gold",
    popularBg: "bg-gold/10",
  },
  blue: {
    border: "border-fel-green/30",
    borderHover: "hover:border-fel-green/60",
    glow: "shadow-[0_0_30px_rgba(57,211,83,0.12)]",
    icon: "text-fel-green-glow",
    iconBg: "bg-fel-green/10 border-fel-green/20",
    badge: "bg-fel-green/10 text-fel-green-glow border-fel-green/20",
    button: "bg-gradient-to-r from-fel-green-dark via-fel-green to-fel-green-dark text-deep-black font-black hover:shadow-[0_0_20px_rgba(57,211,83,0.4)]",
    outline: "border-fel-green/30 text-fel-green-glow hover:bg-fel-green/10 hover:border-fel-green/60",
    heading: "text-fel-green-glow",
    popularBorder: "border-fel-green",
    popularBg: "bg-fel-green/10",
  },
  purple: {
    border: "border-fel-orange/30",
    borderHover: "hover:border-fel-orange/60",
    glow: "shadow-[0_0_30px_rgba(224,93,32,0.12)]",
    icon: "text-fel-orange-glow",
    iconBg: "bg-fel-orange/10 border-fel-orange/20",
    badge: "bg-fel-orange/10 text-fel-orange-glow border-fel-orange/20",
    button: "bg-gradient-to-r from-fel-orange via-fel-orange-glow to-fel-orange text-deep-black font-black hover:shadow-[0_0_20px_rgba(224,93,32,0.4)]",
    outline: "border-fel-orange/30 text-fel-orange-glow hover:bg-fel-orange/10 hover:border-fel-orange/60",
    heading: "text-fel-orange-glow",
    popularBorder: "border-fel-orange",
    popularBg: "bg-fel-orange/10",
  },
}

export async function generateStaticParams() {
  return [{ service: "gold" }, { service: "boosting" }, { service: "accounts" }]
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params
  const data = serviceData[service as ServiceKey]
  if (!data) return { title: "Service Not Found" }
  return {
    title: `${data.title} - Exodar Market | TBC Classic Anniversary`,
    description: data.heroDescription,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params
  const data = serviceData[service as ServiceKey]
  if (!data) notFound()

  const colors = colorStyles[data.color as keyof typeof colorStyles]
  const Icon = data.icon
  const showMarketplace = "hasMarketplace" in data && data.hasMarketplace

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={data.image} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-deep-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/90 via-deep-black/50 to-deep-black" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-12 text-center sm:pt-16">
          <div className={`mb-2 inline-flex items-center gap-2 rounded-full border ${colors.badge} px-4 py-1.5`}>
            <Icon className={`h-4 w-4 ${colors.icon}`} />
            <span className="text-xs font-bold tracking-widest uppercase">{data.title}</span>
          </div>
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-parchment/40 uppercase">
            WoW: The Burning Crusade Classic Anniversary Edition
          </p>
          <h1 className="mb-4 text-3xl font-black tracking-tight text-parchment sm:text-4xl lg:text-5xl text-balance">
            {data.subtitle}
          </h1>
          <div className="mx-auto mb-6 tbc-divider w-48" aria-hidden="true" />
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-parchment/60 sm:text-base">
            {data.heroDescription}
          </p>

          {/* USP + Discord banner */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-fel-green/20 bg-fel-green/5 px-3 py-1 text-[10px] font-bold tracking-wider text-fel-green-glow/80 uppercase">Lowest Prices</span>
            <span className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[10px] font-bold tracking-wider text-gold/80 uppercase">Instant Delivery</span>
            <span className="rounded-full border border-fel-orange/20 bg-fel-orange/5 px-3 py-1 text-[10px] font-bold tracking-wider text-fel-orange-glow/80 uppercase">Smooth Transactions</span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <svg className="h-4 w-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
            <span className="text-xs text-parchment/50">Discord: </span>
            <span className="text-xs font-bold text-fel-green-glow">exodarmarket111</span>
            <span className="ml-2 text-[10px] text-parchment/30">| Combo deals on Character + Gold</span>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {showMarketplace ? (
              <a
                href="#marketplace"
                className={`flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all ${colors.button}`}
              >
                Browse Characters
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href={`/order?service=${service}`}
                className={`flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all ${colors.button}`}
              >
                Order Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {!showMarketplace && (
              <a
                href="#pricing"
                className={`rounded-lg border px-8 py-4 text-sm font-bold tracking-widest uppercase backdrop-blur-sm transition-all ${colors.outline}`}
              >
                View Pricing
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-16 text-center">
            <span className={`mb-4 inline-block text-xs font-bold tracking-[0.4em] uppercase ${colors.icon} opacity-60`}>
              What We Offer
            </span>
            <h2 className="mb-4 text-2xl font-black tracking-tight text-parchment sm:text-3xl lg:text-4xl">
              Why Choose Our {data.title}
            </h2>
            <div className="mx-auto mb-6 tbc-divider w-48" aria-hidden="true" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((feature, idx) => {
              const featureIcons = [ShieldCheck, Zap, Clock, Star, Shield, Headphones]
              const FIcon = featureIcons[idx % featureIcons.length]
              return (
                <div
                  key={feature.title}
                  className={`rounded-xl border parchment-card p-6 transition-all duration-300 ${colors.border} ${colors.borderHover}`}
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg border ${colors.iconBg}`}>
                    <FIcon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <h3 className="mb-2 text-sm font-bold tracking-wider text-parchment uppercase">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-parchment/50">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Character Marketplace (accounts only) */}
      {showMarketplace && (
        <section id="marketplace" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <span className="mb-4 inline-block text-xs font-bold tracking-[0.4em] text-fel-orange-glow/60 uppercase">
                Character Marketplace
              </span>
              <h2 className="mb-4 text-2xl font-black tracking-tight text-parchment sm:text-3xl lg:text-4xl text-balance">
                Browse TBC Classic Anniversary Characters
              </h2>
              <div className="mx-auto mb-6 tbc-divider w-48" aria-hidden="true" />
              <p className="mx-auto max-w-lg text-sm leading-relaxed text-parchment/50">
                60 hand-crafted Phase 1 characters across all TBC classes, races, and gear tiers.
                Filter by class, faction, or gear level to find your perfect match.
              </p>
            </div>
            <CharacterMarketplace />
          </div>
        </section>
      )}

      {/* Pricing (non-accounts) */}
      {!showMarketplace && data.pricingTiers.length > 0 && (
        <section id="pricing" className="py-20 sm:py-28">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-fel-green/20 to-transparent" />
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block text-xs font-bold tracking-[0.4em] text-fel-green/60 uppercase">
                Pricing
              </span>
              <h2 className="mb-4 text-2xl font-black tracking-tight text-parchment sm:text-3xl lg:text-4xl">
                TBC Classic Anniversary Packages
              </h2>
              <div className="mx-auto mb-6 flex items-center justify-center gap-3" aria-hidden="true">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-fel-green/40" />
                <div className="h-1.5 w-1.5 rotate-45 bg-fel-green/40" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-fel-green/40" />
              </div>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-parchment/50">
                Transparent pricing with no hidden fees. Final price confirmed before payment.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-xl border parchment-card p-6 transition-all duration-300 ${
                    tier.popular ? `${colors.popularBorder} ${colors.glow}` : `${colors.border} ${colors.borderHover}`
                  }`}
                >
                  {tier.popular && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${colors.badge}`}>
                      Most Popular
                    </div>
                  )}
                  <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] text-parchment/40 uppercase">{tier.name}</p>
                  <p className="mb-3 text-xl font-black text-gold gold-shimmer">{tier.amount}</p>
                  <div className="mb-6 rounded-md border border-gold/10 bg-gold/5 px-3 py-2">
                    <p className={`text-center text-3xl font-black ${colors.heading}`}>{tier.price}</p>
                  </div>
                  <Link
                    href={`/order?service=${service}`}
                    className={`mt-auto flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-bold tracking-widest uppercase transition-all ${
                      tier.popular ? colors.button : `border ${colors.outline}`
                    }`}
                  >
                    Order Now
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
            {service === "gold" && <GoldCalculator />}

            {/* Additional pricing table for boosting */}
            {data.additionalPricing && (
              <div className="mx-auto mt-16 max-w-2xl">
                <div className={`rounded-2xl border parchment-card p-8 sm:p-10 ${colors.border}`}>
                  <h3 className="mb-1 text-center text-xs font-bold tracking-[0.4em] text-fel-green-glow/60 uppercase">
                    Add-on Services
                  </h3>
                  <p className="mb-6 text-center text-lg font-black text-parchment">
                    Customize Your Boost
                  </p>
                  <div className="flex flex-col gap-0">
                    {data.additionalPricing.map((item, i) => (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between px-4 py-3 ${i % 2 === 0 ? "bg-stone-dark/30" : ""} ${i === 0 ? "rounded-t-lg" : ""} ${i === data.additionalPricing!.length - 1 ? "rounded-b-lg" : ""}`}
                      >
                        <span className="text-sm font-semibold text-parchment/70">{item.label}</span>
                        <span className="text-sm font-black text-fel-green-glow">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg border border-gold/15 bg-gold/5 p-4">
                    <p className="text-center text-xs leading-relaxed text-parchment/50">
                      <span className="font-bold text-gold/80">Profession Boosts:</span> All 13 TBC professions available at <span className="font-black text-gold">$42.99</span> each.
                      Alchemy, Blacksmithing, Enchanting, Engineering, Herbalism, Jewelcrafting, Leatherworking, Mining, Skinning, Tailoring, Cooking, First Aid, Fishing.
                    </p>
                  </div>
                  <div className="mt-4 text-center">
                    <Link
                      href={`/order?service=boosting`}
                      className="inline-flex items-center gap-2 rounded-lg bg-fel-green px-6 py-3 text-xs font-bold tracking-widest text-deep-black uppercase transition-all hover:bg-fel-green-glow"
                    >
                      Build Your Custom Order
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-bold tracking-[0.4em] text-gold/60 uppercase">
              Questions
            </span>
            <h2 className="mb-4 text-2xl font-black tracking-tight text-parchment sm:text-3xl">
              {data.title} FAQ
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {data.faq.map((item) => (
              <div key={item.q} className={`rounded-xl border parchment-card p-6 ${colors.border}`}>
                <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-parchment">
                  <Check className={`h-4 w-4 ${colors.icon}`} />
                  {item.q}
                </h3>
                <p className="pl-6 text-xs leading-relaxed text-parchment/50">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <div className="rounded-2xl border border-gold/20 parchment-card p-8 sm:p-12">
            <h2 className="mb-4 text-2xl font-black tracking-tight text-parchment sm:text-3xl">
              {showMarketplace ? "Need a Custom Character?" : "Ready to Order?"}
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-parchment/50">
              {showMarketplace
                ? "Don't see exactly what you need? Contact us and we'll find or build the perfect TBC Classic character for you."
                : `Place your TBC Classic Anniversary ${data.title.toLowerCase()} order now and our team will have you sorted within minutes.`
              }
            </p>
            <Link
              href="/order?service=accounts"
              className={`inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all ${colors.button}`}
            >
              {showMarketplace ? "Custom Order" : "Place Your Order"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
