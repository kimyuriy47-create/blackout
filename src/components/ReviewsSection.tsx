import React from 'react';
import { Sparkles, Star, CheckCircle, Quote } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { reviewsData } from '../data/products';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100/70 px-3.5 py-1.5 rounded-full mb-3 border border-amber-300/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.reviewsBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.reviewsTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsData.map((rev) => {
            const author = lang === 'ru' ? rev.authorRu : rev.authorKz;
            const city = lang === 'ru' ? rev.cityRu : rev.cityKz;
            const date = lang === 'ru' ? rev.dateRu : rev.dateKz;
            const text = lang === 'ru' ? rev.textRu : rev.textKz;
            const project = lang === 'ru' ? rev.projectRu : rev.projectKz;

            return (
              <div
                key={rev.id}
                className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">{date}</span>
                  </div>

                  {/* Project Tag */}
                  <div className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md inline-block mb-3 border border-amber-200/50">
                    {project}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic mb-6">
                    «{text}»
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={author}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-stone-900">{author}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-xs text-stone-500">{city}</span>
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
