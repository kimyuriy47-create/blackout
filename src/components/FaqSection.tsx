import React, { useState } from 'react';
import { Sparkles, ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { faqList } from '../data/products';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-3.5 py-1.5 rounded-full mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.faqBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.faqTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqList.map((item) => {
            const isOpen = openId === item.id;
            const q = lang === 'ru' ? item.questionRu : item.questionKz;
            const a = lang === 'ru' ? item.answerRu : item.answerKz;

            return (
              <div
                key={item.id}
                className="border border-stone-200 rounded-2xl overflow-hidden transition-all bg-stone-50/50"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-100/70 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                    {q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-stone-900 text-white border-stone-900' : 'text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 pt-4 bg-white">
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Prompt */}
        <div className="mt-10 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                {lang === 'ru' ? 'Не нашли ответ на свой вопрос?' : 'Сұрағыңызға жауап таппадыңыз ба?'}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                {lang === 'ru' ? 'Наш инженер бесплатно проконсультирует вас в WhatsApp прямо сейчас' : 'Инженеріміз қазірдің өзінде WhatsApp арқылы тегін кеңес береді'}
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/77773458899?text=Здравствуйте!%20Хочу%20задать%20вопрос%20по%20автоматическим%20шторам"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs text-center shrink-0"
          >
            {lang === 'ru' ? 'Спросить в WhatsApp' : 'WhatsApp-та сұрау'}
          </a>
        </div>

      </div>
    </section>
  );
};
