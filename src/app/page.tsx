
'use client';

import CTASection from "@/landing/CTASection";
import FeatureGrid from "@/landing/FeatureGrid";
import FeaturesCarousel from "@/landing/FeaturesCarousel";
import Header from "@/landing/Header";
import Hero from "@/landing/Hero";
import HowItWorks from "@/landing/HowItWorks";
import TrustLogos from "@/landing/TrustLogos";

export default function MarketingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustLogos />
        <FeaturesCarousel />
        <HowItWorks />
        <FeatureGrid />
        <CTASection />
      </main>
    </>
  );
}
