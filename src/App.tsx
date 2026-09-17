import React, { useState } from 'react';
import { Language, ProductType } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { Calculator } from './components/Calculator';
import { SmartHomeSection } from './components/SmartHomeSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { HowWeWork } from './components/HowWeWork';
import { PortfolioSection } from './components/PortfolioSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingForm } from './components/BookingForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingCta } from './components/FloatingCta';

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [selectedProductType, setSelectedProductType] = useState<ProductType>('curtain-track');
  const [attachedSummary, setAttachedSummary] = useState<string | undefined>(undefined);
  const [estimatedPrice, setEstimatedPrice] = useState<number | undefined>(undefined);

  const scrollToBooking = () => {
    const el = document.getElementById('booking-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProductForCalc = (productId: ProductType) => {
    setSelectedProductType(productId);
    scrollToCalculator();
  };

  const handleApplyCalculationToForm = (summary: string, total: number) => {
    setAttachedSummary(summary);
    setEstimatedPrice(total);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#FBFBFB] text-[#1E232A] flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Sticky Header with Language Switcher */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        onOpenBooking={scrollToBooking}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Interactive Curtain Simulator */}
        <Hero
          lang={lang}
          onOpenCalculator={scrollToCalculator}
          onOpenBooking={scrollToBooking}
        />

        {/* Catalog of Automated Window Systems */}
        <CatalogSection
          lang={lang}
          onSelectProductForCalc={handleSelectProductForCalc}
        />

        {/* The Online Cost Calculator */}
        <Calculator
          lang={lang}
          selectedProductType={selectedProductType}
          onApplyCalculationToForm={handleApplyCalculationToForm}
        />

        {/* Smart Home Ecosystems & Voice Control */}
        <SmartHomeSection lang={lang} />

        {/* Turnkey Advantages */}
        <AdvantagesSection lang={lang} />

        {/* 4-Step Process */}
        <HowWeWork lang={lang} />

        {/* Portfolio of Real Projects */}
        <PortfolioSection lang={lang} />

        {/* Client Reviews */}
        <ReviewsSection lang={lang} />

        {/* Measurement Booking Form */}
        <BookingForm
          lang={lang}
          attachedSummary={attachedSummary}
          estimatedPrice={estimatedPrice}
          onClearAttachedCalc={() => {
            setAttachedSummary(undefined);
            setEstimatedPrice(undefined);
          }}
        />

        {/* FAQ Accordion */}
        <FaqSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} onOpenBooking={scrollToBooking} />

      {/* Floating WhatsApp and Scroll-to-Top Actions */}
      <FloatingCta lang={lang} />
    </div>
  );
}
