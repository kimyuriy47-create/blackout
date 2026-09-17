import React from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FloatingCtaProps {
  lang: Language;
}

export const FloatingCta: React.FC<FloatingCtaProps> = ({ lang }) => {
  const t = translations[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md border border-stone-200 flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
        title="Наверх"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Direct WhatsApp Quick Floating Button */}
      <a
        href="https://wa.me/77773458899?text=Здравствуйте!%20Хочу%20получить%20консультацию%20по%20автоматическим%20шторам"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
        title={t.floatingWhatsappTooltip}
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="text-xs font-bold hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
};
