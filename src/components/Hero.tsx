import React from 'react';
import { Calculator, Calendar, CheckCircle2, ShieldCheck, Zap, VolumeX, Sparkles, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { CurtainSimulator } from './CurtainSimulator';

interface HeroProps {
  lang: Language;
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenCalculator, onOpenBooking }) => {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-stone-50 via-white to-stone-50/60">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb15_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-stone-900 text-stone-100 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.12]">
              {t.heroTitleStart}{' '}
              <span className="relative inline-block text-amber-600">
                {t.heroTitleHighlight}
                <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-amber-400/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10, 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                id="hero-calc-cta"
                onClick={onOpenCalculator}
                className="flex items-center justify-center gap-2.5 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all cursor-pointer group"
              >
                <Calculator className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>{t.heroCtaCalculate}</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                id="hero-booking-cta"
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100/80 active:scale-95 text-amber-950 border border-amber-300 font-semibold py-4 px-6 rounded-2xl transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-amber-700" />
                <span>{t.heroCtaMeasurement}</span>
              </button>
            </div>

            {/* Key Micro-Pill Features */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-stone-600">
              <span className="flex items-center gap-1.5 bg-white border border-stone-200/90 rounded-lg px-2.5 py-1 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {lang === 'ru' ? 'Замер и образцы 0 ₸' : 'Өлшеу және үлгілер 0 ₸'}
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-stone-200/90 rounded-lg px-2.5 py-1 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                {lang === 'ru' ? 'Официальный договор' : 'Ресми келісімшарт'}
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-stone-200/90 rounded-lg px-2.5 py-1 shadow-xs">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                {lang === 'ru' ? 'Батарея держит 9 месяцев' : 'Батареясы 9 айға жетеді'}
              </span>
            </div>

            {/* 4 Quantitative Metric Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-stone-200/80">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-stone-900">{t.heroStatInstalled}</div>
                <div className="text-[11px] text-stone-600 font-medium leading-tight mt-0.5">{t.heroStatInstalledSub}</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-amber-600">{t.heroStatWarranty}</div>
                <div className="text-[11px] text-stone-600 font-medium leading-tight mt-0.5">{t.heroStatWarrantySub}</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-emerald-600">{t.heroStatNoise}</div>
                <div className="text-[11px] text-stone-600 font-medium leading-tight mt-0.5">{t.heroStatNoiseSub}</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-stone-900">{t.heroStatSpeed}</div>
                <div className="text-[11px] text-stone-600 font-medium leading-tight mt-0.5">{t.heroStatSpeedSub}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Simulator Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-6 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              {/* Simulator Header Label */}
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">
                  {t.simTitle}
                </span>
                <span className="text-[11px] text-stone-600 font-medium">{t.simSub}</span>
              </div>

              {/* The Live Interactive Component */}
              <CurtainSimulator lang={lang} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
