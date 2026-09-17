import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Globe, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onLanguageChange, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="truncate">{t.topPromo}</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-md">
              {/* Minimalist Smart Curtain Monogram / Icon */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h18v2H3z" />
                <path d="M4 5v14c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5" />
                <path d="M14 5v14c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-stone-900">SmartCurtain</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
              </div>
              <p className="text-[11px] text-stone-600 font-medium tracking-wide uppercase">{t.brandSub}</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            <button
              type="button"
              onClick={() => scrollToSection('catalog')}
              className="hover:text-stone-950 transition-colors cursor-pointer py-1"
            >
              {t.navCatalog}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('calculator')}
              className="hover:text-stone-950 transition-colors cursor-pointer py-1 text-amber-700 font-semibold flex items-center gap-1"
            >
              <span>{t.navCalculator}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('smart-home')}
              className="hover:text-stone-950 transition-colors cursor-pointer py-1"
            >
              {t.navSmartHome}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('advantages')}
              className="hover:text-stone-950 transition-colors cursor-pointer py-1"
            >
              {t.navAdvantages}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('process')}
              className="hover:text-stone-950 transition-colors cursor-pointer py-1"
            >
              {t.navProcess}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('portfolio')}
              className="hover:text-stone-950 transition-colors cursor-pointer py-1"
            >
              {t.navPortfolio}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('reviews')}
              className="hover:text-stone-950 transition-colors cursor-pointer py-1"
            >
              {t.navReviews}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq')}
              className="hover:text-stone-950 transition-colors cursor-pointer py-1"
            >
              {t.navFaq}
            </button>
          </nav>

          {/* Right Action Cluster: Language Switcher, Phone, CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle Pill */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => onLanguageChange('kz')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === 'kz'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Қазақ тілі"
              >
                KZ
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ru')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === 'ru'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Русский язык"
              >
                RU
              </button>
            </div>

            {/* Quick Phone Call */}
            <a
              href="tel:+77773458899"
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 hover:text-amber-600 px-2 py-1.5 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="hidden xl:inline">+7 777 345-88-99</span>
            </a>

            {/* Primary Booking Button */}
            <button
              type="button"
              id="header-booking-btn"
              onClick={onOpenBooking}
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{t.bookMeasurementBtn}</span>
            </button>
          </div>

          {/* Mobile Menu & Language Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => onLanguageChange('kz')}
                className={`px-2 py-0.5 rounded ${lang === 'kz' ? 'bg-stone-900 text-white' : 'text-stone-600'}`}
              >
                KZ
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ru')}
                className={`px-2 py-0.5 rounded ${lang === 'ru' ? 'bg-stone-900 text-white' : 'text-stone-600'}`}
              >
                RU
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-800">
            <button
              type="button"
              onClick={() => scrollToSection('catalog')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              {t.navCatalog}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('calculator')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50 text-amber-700 font-semibold"
            >
              {t.navCalculator}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('smart-home')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              {t.navSmartHome}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('advantages')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              {t.navAdvantages}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('process')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              {t.navProcess}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('portfolio')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              {t.navPortfolio}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('reviews')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              {t.navReviews}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              {t.navFaq}
            </button>
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5">
            <a
              href="tel:+77773458899"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 text-stone-800 text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              +7 (777) 345-88-99
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-md"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              {t.bookMeasurementBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
