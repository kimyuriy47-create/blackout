import React, { useState } from 'react';
import { Sparkles, MapPin, Maximize2, Cpu, Layers } from 'lucide-react';
import { Language, ProductType } from '../types';
import { translations } from '../data/translations';
import { portfolioItems } from '../data/products';

interface PortfolioSectionProps {
  lang: Language;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredItems =
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100/70 px-3.5 py-1.5 rounded-full mb-3 border border-amber-300/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.portfolioBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.portfolioTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {t.portfolioSubtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'curtain-track', label: t.filterCurtains },
            { id: 'roller-blind', label: t.filterRoller },
            { id: 'day-night', label: t.filterZebra },
            { id: 'roman-blind', label: t.filterRoman },
            { id: 'wood-blinds', label: t.filterVenetian },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const title = lang === 'ru' ? item.titleRu : item.titleKz;
            const city = lang === 'ru' ? item.cityRu : item.cityKz;
            const objectType = lang === 'ru' ? item.objectTypeRu : item.objectTypeKz;
            const fabric = lang === 'ru' ? item.fabricRu : item.fabricKz;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-200">
                  <img
                    src={item.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-200 text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{city}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
                    {objectType}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {title}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-semibold text-stone-700">{t.dimensionsLabel}</span>
                      <span className="font-mono text-stone-800">{item.dimensions}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-semibold text-stone-700">{t.motorLabel}</span>
                      <span className="truncate text-stone-800">{item.motor}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-semibold text-stone-700">{t.fabricLabel}</span>
                      <span className="truncate text-stone-800">{fabric}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
