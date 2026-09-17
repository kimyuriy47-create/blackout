import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Send, 
  X, 
  ShieldCheck, 
  Calculator as CalcIcon,
  MessageCircle,
  ChevronDown
} from 'lucide-react';
import { Language, BookingFormData } from '../types';
import { translations } from '../data/translations';

interface BookingFormProps {
  lang: Language;
  attachedSummary?: string;
  estimatedPrice?: number;
  onClearAttachedCalc?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  lang,
  attachedSummary,
  estimatedPrice,
  onClearAttachedCalc,
}) => {
  const t = translations[lang];

  // Tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    city: 'almaty',
    address: '',
    preferredDate: minDateStr,
    preferredTimeSlot: 'afternoon',
    comment: '',
    calculatorSummary: attachedSummary,
    estimatedPrice,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  // Auto-format phone input for Kazakhstan +7 (XXX) XXX-XX-XX
  const handlePhoneChange = (val: string) => {
    let clean = val.replace(/\D/g, '');
    if (clean.startsWith('8')) clean = '7' + clean.slice(1);
    if (!clean.startsWith('7') && clean.length > 0) clean = '7' + clean;

    let formatted = '+7';
    if (clean.length > 1) {
      formatted += ' (' + clean.substring(1, 4);
    }
    if (clean.length >= 4) {
      formatted += ') ' + clean.substring(4, 7);
    }
    if (clean.length >= 7) {
      formatted += '-' + clean.substring(7, 9);
    }
    if (clean.length >= 9) {
      formatted += '-' + clean.substring(9, 11);
    }

    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const validate = () => {
    const errs: { name?: string; phone?: string; address?: string } = {};
    if (!formData.name.trim()) {
      errs.name = lang === 'ru' ? 'Пожалуйста, введите ваше имя' : 'Атыңызды енгізіңіз';
    }
    const cleanDigits = formData.phone.replace(/\D/g, '');
    if (cleanDigits.length < 11) {
      errs.phone = lang === 'ru' ? 'Введите корректный номер телефона' : 'Телефон нөмірін толық енгізіңіз';
    }
    if (!formData.address.trim()) {
      errs.address = lang === 'ru' ? 'Укажите улицу, дом или ЖК' : 'Көше, үй немесе ТК атауын жазыңыз';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call to save booking
    setTimeout(() => {
      setIsSubmitting(false);
      const randomId = 'SC-' + Math.floor(1000 + Math.random() * 9000);
      setGeneratedOrderId(randomId);
      setSuccessModalOpen(true);
    }, 700);
  };

  const getTimeSlotTitle = (slot: string) => {
    if (slot === 'morning') return t.timeMorning;
    if (slot === 'afternoon') return t.timeAfternoon;
    return t.timeEvening;
  };

  const getCityTitle = (code: string) => {
    if (code === 'almaty') return t.cityAlmaty;
    if (code === 'astana') return t.cityAstana;
    if (code === 'shymkent') return t.cityShymkent;
    if (code === 'karaganda') return t.cityKaraganda;
    return t.cityOther;
  };

  const handleOpenWhatsAppFromModal = () => {
    const text = encodeURIComponent(
      lang === 'ru'
        ? `Здравствуйте! Оставил заявку на бесплатный замер №${generatedOrderId}.\n` +
          `Имя: ${formData.name}\n` +
          `Телефон: ${formData.phone}\n` +
          `Город: ${getCityTitle(formData.city)}\n` +
          `Адрес: ${formData.address}\n` +
          `Желаемая дата: ${formData.preferredDate} (${getTimeSlotTitle(formData.preferredTimeSlot)})\n` +
          (attachedSummary ? `Расчет: ${attachedSummary}\n` : '') +
          `Жду звонка менеджера!`
        : `Сәлеметсіз бе! №${generatedOrderId} тегін өлшеуге өтініш қалдырдым.\n` +
          `Аты: ${formData.name}\n` +
          `Телефон: ${formData.phone}\n` +
          `Қала: ${getCityTitle(formData.city)}\n` +
          `Мекенжай: ${formData.address}\n` +
          `Күні: ${formData.preferredDate} (${getTimeSlotTitle(formData.preferredTimeSlot)})\n` +
          (attachedSummary ? `Есептеу: ${attachedSummary}\n` : '') +
          `Менеджердің қоңырауын күтемін!`
    );
    window.open(`https://wa.me/77773458899?text=${text}`, '_blank');
  };

  return (
    <section id="booking-form" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-3.5 py-1.5 rounded-full mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.formBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.formTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {t.formSubtitle}
          </p>
        </div>

        {/* Attached Calculator Notice Banner */}
        {attachedSummary && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-stone-800 text-xs sm:text-sm flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <CalcIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 block mb-0.5">
                  {t.attachedCalcBadge}
                </span>
                <p className="text-stone-700 leading-snug">{attachedSummary}</p>
                {estimatedPrice && (
                  <span className="font-bold text-amber-900 font-mono text-xs block mt-1">
                    {lang === 'ru' ? 'Ориентировочная сумма:' : 'Бағаланған сома:'} {estimatedPrice.toLocaleString('ru-RU')} ₸
                  </span>
                )}
              </div>
            </div>
            {onClearAttachedCalc && (
              <button
                type="button"
                onClick={onClearAttachedCalc}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                title="Удалить прикрепленный расчет"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* The Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-stone-50/80 rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6"
        >
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-stone-500" />
                {t.fieldName} *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder={t.fieldNamePlaceholder}
                className={`w-full px-4 py-3.5 rounded-xl border bg-white text-stone-900 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all ${
                  errors.name ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                }`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                {t.fieldPhone} *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="+7 (701) 123-45-67"
                className={`w-full px-4 py-3.5 rounded-xl border bg-white text-stone-900 font-mono text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all ${
                  errors.phone ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                }`}
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Row 2: City & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                {t.fieldCity}
              </label>
              <div className="relative">
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3.5 pr-10 rounded-xl border border-stone-300 bg-white text-stone-900 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all cursor-pointer"
                >
                  <option value="almaty">{t.cityAlmaty}</option>
                  <option value="astana">{t.cityAstana}</option>
                  <option value="shymkent">{t.cityShymkent}</option>
                  <option value="karaganda">{t.cityKaraganda}</option>
                  <option value="other">{t.cityOther}</option>
                </select>
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                {t.fieldAddress} *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  if (errors.address) setErrors({ ...errors, address: undefined });
                }}
                placeholder={t.fieldAddressPlaceholder}
                className={`w-full px-4 py-3.5 rounded-xl border bg-white text-stone-900 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all ${
                  errors.address ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                }`}
              />
              {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
            </div>
          </div>

          {/* Row 3: Date & Time Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-stone-500" />
                {t.fieldDate}
              </label>
              <input
                type="date"
                min={minDateStr}
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                {t.fieldTime}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'morning', label: '09:00 - 13:00' },
                  { id: 'afternoon', label: '13:00 - 17:00' },
                  { id: 'evening', label: '17:00 - 21:00' },
                ].map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredTimeSlot: slot.id })}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                      formData.preferredTimeSlot === slot.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Comment */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              {t.fieldComment}
            </label>
            <textarea
              rows={2}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder={t.fieldCommentPlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all resize-none"
            />
          </div>

          {/* Submit Action & Privacy */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 bg-stone-900 hover:bg-stone-800 active:scale-98 disabled:opacity-70 text-white font-bold py-4 px-6 rounded-2xl text-base shadow-lg transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span>{t.submittingBtn}</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 text-amber-400" />
                  <span>{t.submitBtn}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.formPrivacy}</span>
            </div>
          </div>

        </form>

      </div>

      {/* Success Modal */}
      {successModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSuccessModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-stone-900">
                {t.modalSuccessTitle}
              </h3>
              <p className="text-stone-600 text-sm mt-1.5 leading-relaxed">
                {t.modalSuccessDesc}
              </p>
            </div>

            {/* Order info badge */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-700 space-y-2 mb-6">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <span className="font-semibold text-stone-500">{t.modalOrderCode}</span>
                <span className="font-mono font-bold text-stone-900 bg-amber-100 px-2 py-0.5 rounded text-amber-900">
                  {generatedOrderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.fieldName}:</span>
                <span className="font-semibold text-stone-900">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.fieldPhone}:</span>
                <span className="font-mono font-semibold text-stone-900">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.fieldAddress}:</span>
                <span className="font-semibold text-stone-900 text-right truncate max-w-[200px]">
                  {formData.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.fieldDate}:</span>
                <span className="font-semibold text-stone-900 font-mono">
                  {formData.preferredDate} ({getTimeSlotTitle(formData.preferredTimeSlot)})
                </span>
              </div>
              {attachedSummary && (
                <div className="pt-2 border-t border-stone-200 text-stone-600">
                  <span className="font-bold text-stone-800 block mb-0.5">Расчет:</span>
                  <p className="text-[11px] leading-snug">{attachedSummary}</p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleOpenWhatsAppFromModal}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.modalWhatsappBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setSuccessModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                {t.modalCloseBtn}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
