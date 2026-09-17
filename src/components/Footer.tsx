import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenBooking }) => {
  const t = translations[lang];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contacts" className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-lg shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h18v2H3z" />
                  <path d="M4 5v14c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5" />
                  <path d="M14 5v14c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">SmartCurtain</span>
                <p className="text-[11px] text-stone-400 font-mono uppercase tracking-wider">{t.brandSub}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {t.footerDesc}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/77773458899"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/smartcurtain_kz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-sky-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {t.footerColNav}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button type="button" onClick={() => scrollTo('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navCatalog}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('calculator')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navCalculator}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('smart-home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navSmartHome}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('advantages')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navAdvantages}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('process')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navProcess}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('portfolio')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navPortfolio}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('faq')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navFaq}
                </button>
              </li>
            </ul>
          </div>

          {/* Systems Catalog (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {t.footerColSystems}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button type="button" onClick={() => scrollTo('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  {lang === 'ru' ? 'Электрокарнизы для штор' : 'Штораларға арналған электрлік карниздер'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  {lang === 'ru' ? 'Рулонные шторы с мотором' : 'Моторлы ролл-перделер'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  {lang === 'ru' ? 'Шторы День-Ночь / Зебра' : 'Күн-Түн / Зебра перделері'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  {lang === 'ru' ? 'Римские шторы с приводом' : 'Жетекті рим перделері'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  {lang === 'ru' ? 'Деревянные жалюзи 50мм' : '50мм ағаш жалюзилері'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  {lang === 'ru' ? 'Шторы-плиссе для мансард' : 'Мансардаға арналған плиссе'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts & Offices (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {t.footerColContacts}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{t.footerCityAlmaty}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{t.footerCityAstana}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+77773458899" className="hover:text-white font-mono font-semibold">
                  +7 (777) 345-88-99
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <a href="mailto:info@smartcurtain.kz" className="hover:text-white">
                  info@smartcurtain.kz
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{t.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {t.bookMeasurementBtn}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>{t.footerCopyright}</p>
          <div className="flex items-center gap-4">
            <span className="text-stone-400 font-mono">Somfy • Aqara • Dooya • Tuya • Matter</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
