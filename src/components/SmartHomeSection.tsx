import React, { useState } from 'react';
import { Mic, Smartphone, Sun, Moon, Shield, Sparkles, Volume2, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SmartHomeSectionProps {
  lang: Language;
}

export const SmartHomeSection: React.FC<SmartHomeSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeVoiceCmd, setActiveVoiceCmd] = useState<string>('alice');
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);

  const triggerVoiceFeedback = (type: string, message: string) => {
    setActiveVoiceCmd(type);
    setActiveFeedback(message);
    setTimeout(() => {
      setActiveFeedback(null);
    }, 3500);
  };

  return (
    <section id="smart-home" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 uppercase tracking-widest bg-purple-50 px-3.5 py-1.5 rounded-full mb-3 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{t.smartBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.smartTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {t.smartSubtitle}
          </p>
        </div>

        {/* Voice Control Interactive Demo Card */}
        <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-10 mb-14 border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Assistant Buttons */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-stone-400 font-bold block">
                {lang === 'ru' ? 'Нажмите, чтобы протестировать команду:' : 'Команданы тексеру үшін басыңыз:'}
              </span>

              {/* Alice Button */}
              <button
                type="button"
                onClick={() =>
                  triggerVoiceFeedback(
                    'alice',
                    lang === 'ru'
                      ? 'Яндекс Алиса: «Принято! Плавно закрываю шторы в гостиной на 70%»'
                      : 'Яндекс Алиса: «Қабылданды! Қонақ бөлмесіндегі перделерді 70 пайызға жабамын»'
                  )
                }
                className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                  activeVoiceCmd === 'alice'
                    ? 'border-purple-500 bg-purple-950/40 text-white shadow-lg'
                    : 'border-stone-800 bg-stone-900/60 hover:bg-stone-900 text-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    Я
                  </div>
                  <div>
                    <span className="text-sm font-bold block">Яндекс Алиса</span>
                    <span className="text-xs text-purple-300 italic">{t.smartAliceQuote}</span>
                  </div>
                </div>
                <Volume2 className="w-5 h-5 text-purple-400 shrink-0" />
              </button>

              {/* Apple Siri */}
              <button
                type="button"
                onClick={() =>
                  triggerVoiceFeedback(
                    'siri',
                    lang === 'ru'
                      ? 'Apple Siri: «Выполняю. Сценарий «Кинотеатр» активирован, шторы опущены на 100%»'
                      : 'Apple Siri: «Орындалуда. «Кинотеатр» сценарийі қосылды, перделер толық жабылды»'
                  )
                }
                className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                  activeVoiceCmd === 'siri'
                    ? 'border-sky-500 bg-sky-950/40 text-white shadow-lg'
                    : 'border-stone-800 bg-stone-900/60 hover:bg-stone-900 text-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    Siri
                  </div>
                  <div>
                    <span className="text-sm font-bold block">Apple HomeKit / Siri</span>
                    <span className="text-xs text-sky-300 italic">{t.smartSiriQuote}</span>
                  </div>
                </div>
                <Volume2 className="w-5 h-5 text-sky-400 shrink-0" />
              </button>

              {/* Google Assistant */}
              <button
                type="button"
                onClick={() =>
                  triggerVoiceFeedback(
                    'google',
                    lang === 'ru'
                      ? 'Google Assistant: «Opening bedroom blinds right away»'
                      : 'Google Assistant: «Жатын бөлме перделерін ашып жатырмын»'
                  )
                }
                className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                  activeVoiceCmd === 'google'
                    ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-lg'
                    : 'border-stone-800 bg-stone-900/60 hover:bg-stone-900 text-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 text-white flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <div>
                    <span className="text-sm font-bold block">Google Home</span>
                    <span className="text-xs text-stone-400 italic">{t.smartGoogleQuote}</span>
                  </div>
                </div>
                <Volume2 className="w-5 h-5 text-emerald-400 shrink-0" />
              </button>
            </div>

            {/* Right: Audio Wave Feedback Display */}
            <div className="lg:col-span-6 bg-stone-900/80 rounded-2xl p-6 border border-stone-800 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {lang === 'ru' ? 'Акустический шлюз активен' : 'Акустикалық шлюз белсенді'}
                  </span>
                  <span className="font-mono text-stone-500">Wi-Fi + Zigbee 3.0</span>
                </div>

                <div className="my-6">
                  {activeFeedback ? (
                    <div className="p-4 rounded-xl bg-stone-800 border border-purple-500/50 text-purple-200 text-sm font-medium animate-in fade-in">
                      {activeFeedback}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-stone-500 text-xs">
                      {lang === 'ru'
                        ? 'Выберите голосовую команду слева для имитации работы'
                        : 'Жұмысын тексеру үшін сол жақтағы дауыстық пәрменді таңдаңыз'}
                    </div>
                  )}
                </div>
              </div>

              {/* Supported ecosystem pills */}
              <div className="pt-3 border-t border-stone-800 flex flex-wrap gap-2 text-[11px] text-stone-400">
                <span className="bg-stone-800 px-2.5 py-1 rounded-md">Яндекс Станция</span>
                <span className="bg-stone-800 px-2.5 py-1 rounded-md">Apple Home</span>
                <span className="bg-stone-800 px-2.5 py-1 rounded-md">Aqara Home</span>
                <span className="bg-stone-800 px-2.5 py-1 rounded-md">Tuya / Smart Life</span>
                <span className="bg-stone-800 px-2.5 py-1 rounded-md">Matter 1.2</span>
                <span className="bg-stone-800 px-2.5 py-1 rounded-md">Home Assistant</span>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Smart Automation Scenarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-2">{t.smartScenario1Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{t.smartScenario1Desc}</p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Moon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-2">{t.smartScenario2Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{t.smartScenario2Desc}</p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-2">{t.smartScenario3Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{t.smartScenario3Desc}</p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-2">{t.smartScenario4Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{t.smartScenario4Desc}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
