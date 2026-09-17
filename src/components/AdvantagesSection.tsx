import React from 'react';
import { Sparkles, Ruler, Sparkle, Battery, ShieldCheck, Factory, GraduationCap } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AdvantagesSectionProps {
  lang: Language;
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const advantages = [
    {
      icon: Ruler,
      title: t.adv1Title,
      desc: t.adv1Desc,
      highlight: lang === 'ru' ? '450+ каталогов' : '450+ каталог',
    },
    {
      icon: Sparkle,
      title: t.adv2Title,
      desc: t.adv2Desc,
      highlight: lang === 'ru' ? 'Чистый монтаж' : 'Таза орнату',
    },
    {
      icon: Battery,
      title: t.adv3Title,
      desc: t.adv3Desc,
      highlight: lang === 'ru' ? 'Без штробления' : 'Сымдарсыз',
    },
    {
      icon: ShieldCheck,
      title: t.adv4Title,
      desc: t.adv4Desc,
      highlight: lang === 'ru' ? '5 лет гарантии' : '5 жыл кепілдік',
    },
    {
      icon: Factory,
      title: t.adv5Title,
      desc: t.adv5Desc,
      highlight: lang === 'ru' ? 'От 3 дней' : '3 күннен бастап',
    },
    {
      icon: GraduationCap,
      title: t.adv6Title,
      desc: t.adv6Desc,
      highlight: lang === 'ru' ? 'Обучение и настройка' : 'Үйрету және қосу',
    },
  ];

  return (
    <section id="advantages" className="py-16 sm:py-24 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100/70 px-3.5 py-1.5 rounded-full mb-3 border border-amber-300/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.advBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.advTitle}
          </h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                      {adv.highlight}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {adv.desc}
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
