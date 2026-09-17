import React from 'react';
import { Sparkles, Calendar, Ruler, Cog, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HowWeWorkProps {
  lang: Language;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ lang }) => {
  const t = translations[lang];

  const steps = [
    {
      num: t.step1Num,
      title: t.step1Name,
      desc: t.step1Text,
      icon: Calendar,
      badge: lang === 'ru' ? '10 минут' : '10 минут',
    },
    {
      num: t.step2Num,
      title: t.step2Name,
      desc: t.step2Text,
      icon: Ruler,
      badge: lang === 'ru' ? '0 ₸ бесплатно' : '0 ₸ тегін',
    },
    {
      num: t.step3Num,
      title: t.step3Name,
      desc: t.step3Text,
      icon: Cog,
      badge: lang === 'ru' ? '3-5 дней' : '3-5 күн',
    },
    {
      num: t.step4Num,
      title: t.step4Name,
      desc: t.step4Text,
      icon: CheckCircle2,
      badge: lang === 'ru' ? '1 час на окно' : '1 сағат/терезе',
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-3.5 py-1.5 rounded-full mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.processBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.processTitle}
          </h2>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-stone-50 p-6 rounded-3xl border border-stone-200/90 flex flex-col justify-between hover:border-amber-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-amber-600 font-mono">
                      {step.num}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-700 bg-white border border-stone-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
