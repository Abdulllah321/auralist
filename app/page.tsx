import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { WhyChooseUs } from "@/components/why-choose-us"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTAFooter } from "@/components/cta-footer"
import { Header } from "@/components/header"
import { TrendingSection } from "@/components/trending-section"
import { NewsletterSection } from "@/components/newsletter-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <TrendingSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <NewsletterSection />
        <CTAFooter />
      </main>
    </div>
  )
}
