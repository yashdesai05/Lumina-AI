import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { Features } from "@/components/landing/Features";
import { Playground } from "@/components/landing/Playground";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <Playground />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
