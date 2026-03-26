'use client';
import React from 'react';
import '@/app/landing/globals.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/LandingV2/HeroSection";
import FeaturesGrid from "@/components/LandingV2/FeaturesGrid";
import TestimonialsSlider from "@/components/LandingV2/TestimonialsSlider";
import CTASection from "@/components/LandingV2/CTASection";

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />
      <HeroSection />
      <FeaturesGrid />
      <TestimonialsSlider />
      <CTASection />
      <Footer />
    </main>
  );
};

export default HomePage;
