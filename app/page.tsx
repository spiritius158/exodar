import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServiceCards } from "@/components/service-cards"
import { FeaturesSection } from "@/components/features-section"
import { ReviewsSection } from "@/components/reviews-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Buy TBC Classic Anniversary Gold & Boosting | Phase 1 2026 | Exodar Market",
  description:
    "Buy TBC Anniversary gold on Spineshatter & Thunderstrike. Classic TBC leveling boost 58-70, profession boost jewelcrafting 1-375, and Phase 1 geared accounts. Cheapest prices, instant delivery.",
  alternates: {
    canonical: "/",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Exodar Market",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://exodar.market",
  description:
    "Trusted marketplace for World of Warcraft: The Burning Crusade Classic Anniversary Edition services.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://exodar.market"}/services/{service}`,
    },
    "query-input": "required name=service",
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is it safe to buy WoW TBC Classic Anniversary gold in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, buying TBC Anniversary gold from Exodar Market is safe. We exclusively use face-to-face trades with natural trading patterns. Across 3,400+ completed orders on servers like Spineshatter and Thunderstrike, we maintain a zero ban rate.",
      },
    },
    {
      "@type": "Question",
      name: "How fast is gold delivery on Spineshatter and Thunderstrike?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most gold deliveries on Spineshatter and Thunderstrike are completed within 5-10 minutes via secure face-to-face trade in Orgrimmar, Stormwind, or Shattrath City.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest way to get TBC Anniversary gold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cheapest TBC fresh gold starts at $0.4626 per 10 gold with bulk discounts on orders over 5,000g. We also offer combo deals on character + gold purchases.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a level 58-70 boost for TBC Classic Anniversary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our classic TBC leveling boost 58-70 is completed in 2-3 days by verified TBC veterans with premium VPN protection and natural play patterns.",
      },
    },
    {
      "@type": "Question",
      name: "Is buying Jewelcrafting profession boost 1-375 worth it in Phase 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jewelcrafting is one of the most profitable professions in TBC Phase 1 2026. Our profession boost 1-375 costs $42.99 and saves 15-20 hours of grinding. Jewelers earn 50-100g per hour cutting gems.",
      },
    },
  ],
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Exodar Market",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://exodar.market",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://exodar.market"}/icon.svg`,
  description:
    "Your trusted marketplace for WoW TBC Classic Anniversary Edition. Gold, boosting, and premium accounts.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Czech"],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <HeroSection />
      <ServiceCards />
      <FeaturesSection />
      <ReviewsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
