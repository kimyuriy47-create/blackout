import React from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Language, ProductType } from '../types';
import { translations } from '../data/translations';
import { productsCatalog } from '../data/products';

interface CatalogSectionProps {
  lang: Language;
  onSelectProductForCalc: (productId: ProductType) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ lang, onSelectProductForCalc }) => {
  const t = translations[lang];

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-white border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-md border border-amber-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.catalogTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'ru' ? 'Премиальные системы автоматизации для любых окон' : 'Кез келген терезеге арналған премиум автоматика жүйелері'}
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            {t.catalogSubtitle}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsCatalog.map((product) => {
            const name = lang === 'ru' ? product.nameRu : product.nameKz;
            const tagline = lang === 'ru' ? product.taglineRu : product.taglineKz;
            const desc = lang === 'ru' ? product.descriptionRu : product.descriptionKz;
            const badge = lang === 'ru' ? product.badgeRu : product.badgeKz;
            const features = lang === 'ru' ? product.featuresRu : product.featuresKz;

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group relative flex flex-col bg-stone-50/70 rounded-2xl border border-stone-200/90 overflow-hidden hover:shadow-xl hover:border-stone-300 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-200">
                  <img
                    src={product.imageUrl}
                    alt={name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {badge && (
                    <div className="absolute top-3.5 left-3.5 bg-stone-900/90 backdrop-blur-sm text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-stone-700/80 shadow-sm">
                      {badge}
                    </div>
                  )}

                  {/* Starting Price Pill */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-baseline justify-between text-white">
                    <div>
                      <span className="text-xs text-stone-300 mr-1.5">{t.startingFrom}</span>
                      <span className="text-xl font-bold tracking-tight font-mono">
                        {product.basePriceKz.toLocaleString('ru-RU')} {t.currency}
                      </span>
                    </div>
                    <span className="text-xs text-stone-300">/ п.м.</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {name}
                    </h3>
                    <p className="text-xs font-medium text-amber-800 mt-1 mb-3">
                      {tagline}
                    </p>
                    <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                      {desc}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 border-t border-stone-200 pt-4 mb-6">
                      <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                        {t.featuresTitle}
                      </p>
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Calculator Action Button */}
                  <button
                    type="button"
                    onClick={() => onSelectProductForCalc(product.id)}
                    className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-amber-600 active:scale-98 text-white font-medium py-3 px-4 rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-sm group-hover:shadow"
                  >
                    <span>{t.orderCustom}</span>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
