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
  title: "Exodar Market - WoW TBC Classic Anniversary Edition Services",
  description:
    "Buy WoW TBC Classic Anniversary Edition gold, character boosting, and premium accounts. Trusted by 3,400+ customers with instant delivery and 24/7 live support.",
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
