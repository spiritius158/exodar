import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServiceCards } from "@/components/service-cards"
import { FeaturesSection } from "@/components/features-section"
import { ReviewsSection } from "@/components/reviews-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
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
