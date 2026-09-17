import React, { useState, useEffect, useId } from 'react';
import { 
  Calculator as CalcIcon, 
  Sparkles, 
  Check, 
  HelpCircle, 
  Sliders, 
  BatteryCharging, 
  Zap, 
  Wifi, 
  Radio, 
  Mic, 
  Sun, 
  Send, 
  ArrowDown, 
  Plus, 
  Minus,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { Language, ProductType, MotorType, MotorBrand, FabricCategory, CalculatorState } from '../types';
import { translations } from '../data/translations';
import { productsCatalog } from '../data/products';

interface CalculatorProps {
  lang: Language;
  selectedProductType: ProductType;
  onApplyCalculationToForm: (summary: string, total: number) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({
  lang,
  selectedProductType,
  onApplyCalculationToForm,
}) => {
  const t = translations[lang];
  const calcSectionId = useId();

  // Calculator State
  const [productType, setProductType] = useState<ProductType>(selectedProductType);
  const [width, setWidth] = useState<number>(2.4);
  const [height, setHeight] = useState<number>(2.6);
  const [motorType, setMotorType] = useState<MotorType>('battery');
  const [motorBrand, setMotorBrand] = useState<MotorBrand>('aqara');
  const [fabricCategory, setFabricCategory] = useState<FabricCategory>('blackout');
  const [controlOptions, setControlOptions] = useState({
    remote: true,
    appControl: true,
    aliceVoice: true,
    sunSensor: false,
  });
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [appliedNotification, setAppliedNotification] = useState<boolean>(false);

  // Sync when prop changes
  useEffect(() => {
    setProductType(selectedProductType);
  }, [selectedProductType]);

  // Price calculations in KZT
  const calculateCosts = () => {
    const area = width * height;
    const perimeterOrWidth = productType === 'curtain-track' ? width : width;

    // 1. Base construction & profile price
    let baseRatePerMeter = 28000;
    if (productType === 'curtain-track') baseRatePerMeter = 24000;
    if (productType === 'roller-blind') baseRatePerMeter = 22000;
    if (productType === 'day-night') baseRatePerMeter = 27000;
    if (productType === 'roman-blind') baseRatePerMeter = 32000;
    if (productType === 'wood-blinds') baseRatePerMeter = 36000;
    if (productType === 'pleated') baseRatePerMeter = 30000;

    // 2. Fabric cost per sq. meter
    let fabricRatePerSqM = 8000;
    if (fabricCategory === 'basic') fabricRatePerSqM = 8000;
    if (fabricCategory === 'blackout') fabricRatePerSqM = 14000;
    if (fabricCategory === 'screen') fabricRatePerSqM = 16500;
    if (fabricCategory === 'premium') fabricRatePerSqM = 24000;

    const constructionAndFabricPerUnit = Math.round(perimeterOrWidth * baseRatePerMeter + (productType !== 'wood-blinds' ? area * fabricRatePerSqM : width * 22000));

    // 3. Motor drive price
    let motorPrice = 32000;
    if (motorBrand === 'dooya') motorPrice = 28000;
    if (motorBrand === 'aqara') motorPrice = 39000;
    if (motorBrand === 'somfy') motorPrice = 64000;

    // Add power surcharge if battery (higher initial motor battery cost)
    if (motorType === 'battery') {
      motorPrice += 8000;
    }

    // 4. Automation & controls
    let automationPerUnit = 0;
    if (controlOptions.remote) automationPerUnit += 8000;
    if (controlOptions.appControl) automationPerUnit += 12000;
    if (controlOptions.aliceVoice) automationPerUnit += 14000;
    if (controlOptions.sunSensor) automationPerUnit += 11000;

    // 5. Installation per unit
    const installPerUnit = includeInstallation ? 15000 : 0;

    // Single unit total before discount
    const subtotalSingleUnit = constructionAndFabricPerUnit + motorPrice + automationPerUnit + installPerUnit;
    const subtotalAll = subtotalSingleUnit * quantity;

    // 6. Volume discount
    let discountPercent = 0;
    if (quantity >= 5) {
      discountPercent = 15;
    } else if (quantity >= 3) {
      discountPercent = 10;
    }

    const discountAmount = Math.round((subtotalAll * discountPercent) / 100);
    const finalTotal = subtotalAll - discountAmount;

    return {
      constructionAndFabric: constructionAndFabricPerUnit * quantity,
      motorPrice: motorPrice * quantity,
      automationPrice: automationPerUnit * quantity,
      installPrice: installPerUnit * quantity,
      discountAmount,
      discountPercent,
      finalTotal,
    };
  };

  const costs = calculateCosts();

  // Helper text representations for summary
  const getProductTitle = () => {
    const item = productsCatalog.find((p) => p.id === productType);
    return lang === 'ru' ? item?.nameRu : item?.nameKz;
  };

  const getMotorTitle = () => {
    if (motorBrand === 'dooya') return 'Dooya Smart';
    if (motorBrand === 'aqara') return 'Aqara Zigbee';
    return 'Somfy Glydea Ultra';
  };

  const getPowerTitle = () => {
    return motorType === 'battery' ? 'Li-ion Battery (USB-C)' : '220V Hardwired';
  };

  const getFabricTitle = () => {
    if (fabricCategory === 'basic') return lang === 'ru' ? 'Базовая 50-60%' : 'Негізгі 50-60%';
    if (fabricCategory === 'blackout') return 'Blackout 100%';
    if (fabricCategory === 'screen') return 'Screen UV';
    return lang === 'ru' ? 'Премиум жаккард/лен' : 'Премиум жаккард/зығыр';
  };

  const generateSummaryString = () => {
    return `${getProductTitle()}, ${width}×${height}м (${quantity} шт), Мотор: ${getMotorTitle()} (${getPowerTitle()}), Ткань: ${getFabricTitle()}, Монтаж: ${includeInstallation ? 'Да' : 'Нет'}. Расчет: ${costs.finalTotal.toLocaleString('ru-RU')} ₸`;
  };

  const handleApplyToBooking = () => {
    const summary = generateSummaryString();
    onApplyCalculationToForm(summary, costs.finalTotal);
    setAppliedNotification(true);
    setTimeout(() => {
      setAppliedNotification(false);
    }, 4500);

    const bookingEl = document.getElementById('booking-form');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendWhatsApp = () => {
    const summary = generateSummaryString();
    const text = encodeURIComponent(
      lang === 'ru'
        ? `Здравствуйте! Рассчитал на сайте SmartCurtain предварительную стоимость:\n\n` +
          `• Система: ${getProductTitle()}\n` +
          `• Размеры: ${width}м (Ш) × ${height}м (В)\n` +
          `• Количество окон: ${quantity} шт\n` +
          `• Мотор: ${getMotorTitle()} (${getPowerTitle()})\n` +
          `• Категория ткани: ${getFabricTitle()}\n` +
          `• Монтаж под ключ: ${includeInstallation ? 'Да (+15 000 ₸/окно)' : 'Нет'}\n` +
          `• Скидка: ${costs.discountPercent}%\n` +
          `• Итоговая ориентировочная стоимость: ${costs.finalTotal.toLocaleString('ru-RU')} ₸\n\n` +
          `Хочу записаться на бесплатный замер с каталогами!`
        : `Сәлеметсіз бе! SmartCurtain сайтында алдын ала құнын есептедім:\n\n` +
          `• Жүйе: ${getProductTitle()}\n` +
          `• Өлшемдері: ${width}м (Ені) × ${height}м (Биіктігі)\n` +
          `• Терезелер саны: ${quantity} дана\n` +
          `• Мотор: ${getMotorTitle()} (${getPowerTitle()})\n` +
          `• Мата санаты: ${getFabricTitle()}\n` +
          `• Орнату қызметі: ${includeInstallation ? 'Иә' : 'Жоқ'}\n` +
          `• Жеңілдік: ${costs.discountPercent}%\n` +
          `• Жалпы құны: ${costs.finalTotal.toLocaleString('ru-RU')} ₸\n\n` +
          `Каталогтармен тегін өлшеуге жазылғым келеді!`
    );
    window.open(`https://wa.me/77773458899?text=${text}`, '_blank');
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100/70 px-3.5 py-1.5 rounded-full mb-3 border border-amber-300/60">
            <CalcIcon className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.calcBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.calcTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {t.calcSubtitle}
          </p>
        </div>

        {/* Applied Notification Banner */}
        {appliedNotification && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-medium flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{t.calcAppliedNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('booking-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-bold underline cursor-pointer text-emerald-800 hover:text-emerald-950"
            >
              {lang === 'ru' ? 'Перейти к форме' : 'Формаға өту'} ↓
            </button>
          </div>
        )}

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Parameters (8 cols) */}
          <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
            
            {/* Step 1: System Type Selector */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 text-xs flex items-center justify-center font-mono">1</span>
                  {t.step1Title}
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {productsCatalog.map((prod) => {
                  const isSelected = productType === prod.id;
                  const name = lang === 'ru' ? prod.nameRu : prod.nameKz;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setProductType(prod.id)}
                      className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100/80 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] uppercase font-bold tracking-wider font-mono ${isSelected ? 'text-amber-400' : 'text-stone-500'}`}>
                          {prod.id.replace('-', ' ')}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold line-clamp-2 leading-snug">
                        {name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dimensions & Quick Presets */}
            <div className="border-t border-stone-100 pt-6">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 text-xs flex items-center justify-center font-mono">2</span>
                {t.step2Title}
              </h3>

              {/* Quick Presets */}
              <div className="mb-5">
                <span className="text-xs font-semibold text-stone-500 mb-2 block">{t.presetsLabel}</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => { setWidth(1.8); setHeight(1.6); }}
                    className="text-xs py-1.5 px-3 rounded-lg border border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700 font-medium transition-colors"
                  >
                    {t.presetStd}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setWidth(3.2); setHeight(2.7); }}
                    className="text-xs py-1.5 px-3 rounded-lg border border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700 font-medium transition-colors"
                  >
                    {t.presetPanoramic}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setWidth(2.4); setHeight(2.2); }}
                    className="text-xs py-1.5 px-3 rounded-lg border border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700 font-medium transition-colors"
                  >
                    {t.presetBalcony}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setWidth(4.5); setHeight(2.8); }}
                    className="text-xs py-1.5 px-3 rounded-lg border border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700 font-medium transition-colors"
                  >
                    {t.presetWide}
                  </button>
                </div>
              </div>

              {/* Sliders & Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                {/* Width */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
                    <label htmlFor="width-slider">{t.widthLabel}</label>
                    <span className="font-mono text-base font-bold text-stone-900 bg-white px-2.5 py-0.5 rounded-md border border-stone-200 shadow-xs">
                      {width.toFixed(1)} м
                    </span>
                  </div>
                  <input
                    id="width-slider"
                    type="range"
                    min="0.8"
                    max="8.0"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                  />
                  <div className="flex justify-between text-[11px] text-stone-600 mt-1 font-mono">
                    <span>0.8 м</span>
                    <span>4.0 м</span>
                    <span>8.0 м</span>
                  </div>
                </div>

                {/* Height */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
                    <label htmlFor="height-slider">{t.heightLabel}</label>
                    <span className="font-mono text-base font-bold text-stone-900 bg-white px-2.5 py-0.5 rounded-md border border-stone-200 shadow-xs">
                      {height.toFixed(1)} м
                    </span>
                  </div>
                  <input
                    id="height-slider"
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                  />
                  <div className="flex justify-between text-[11px] text-stone-600 mt-1 font-mono">
                    <span>1.0 м</span>
                    <span>3.0 м</span>
                    <span>5.0 м</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Power Type & Motor Brand */}
            <div className="border-t border-stone-100 pt-6">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 text-xs flex items-center justify-center font-mono">3</span>
                {t.step3Title}
              </h3>

              {/* Power source selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setMotorType('battery')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    motorType === 'battery'
                      ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
                      <BatteryCharging className="w-4 h-4 text-emerald-600" />
                      <span>{t.powerBattery}</span>
                    </div>
                    {motorType === 'battery' && <Check className="w-4 h-4 text-amber-700" />}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t.powerBatteryDesc}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setMotorType('wire-220v')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    motorType === 'wire-220v'
                      ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span>{t.powerWire}</span>
                    </div>
                    {motorType === 'wire-220v' && <Check className="w-4 h-4 text-amber-700" />}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t.powerWireDesc}
                  </p>
                </button>
              </div>

              {/* Motor Brands */}
              <div className="space-y-2 mt-4">
                <span className="text-xs font-semibold text-stone-500 block">{t.motorBrandLabel}</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Dooya */}
                  <div
                    onClick={() => setMotorBrand('dooya')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      motorBrand === 'dooya'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm">{t.brandDooyaTitle}</span>
                      {motorBrand === 'dooya' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className={`text-[11px] leading-snug ${motorBrand === 'dooya' ? 'text-stone-300' : 'text-stone-500'}`}>
                      {t.brandDooyaDesc}
                    </p>
                  </div>

                  {/* Aqara */}
                  <div
                    onClick={() => setMotorBrand('aqara')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      motorBrand === 'aqara'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm">{t.brandAqaraTitle}</span>
                      {motorBrand === 'aqara' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className={`text-[11px] leading-snug ${motorBrand === 'aqara' ? 'text-stone-300' : 'text-stone-500'}`}>
                      {t.brandAqaraDesc}
                    </p>
                  </div>

                  {/* Somfy */}
                  <div
                    onClick={() => setMotorBrand('somfy')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      motorBrand === 'somfy'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm">{t.brandSomfyTitle}</span>
                      {motorBrand === 'somfy' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className={`text-[11px] leading-snug ${motorBrand === 'somfy' ? 'text-stone-300' : 'text-stone-500'}`}>
                      {t.brandSomfyDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Control & Smart Home */}
            <div className="border-t border-stone-100 pt-6">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 text-xs flex items-center justify-center font-mono">4</span>
                {t.step4Title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-100/80 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={controlOptions.remote}
                    onChange={(e) => setControlOptions({ ...controlOptions, remote: e.target.checked })}
                    className="w-4 h-4 text-stone-900 rounded accent-stone-900"
                  />
                  <Radio className="w-4 h-4 text-stone-600" />
                  <span className="text-xs font-medium text-stone-800">{t.optRemote}</span>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-100/80 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={controlOptions.appControl}
                    onChange={(e) => setControlOptions({ ...controlOptions, appControl: e.target.checked })}
                    className="w-4 h-4 text-stone-900 rounded accent-stone-900"
                  />
                  <Wifi className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-medium text-stone-800">{t.optApp}</span>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-100/80 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={controlOptions.aliceVoice}
                    onChange={(e) => setControlOptions({ ...controlOptions, aliceVoice: e.target.checked })}
                    className="w-4 h-4 text-stone-900 rounded accent-stone-900"
                  />
                  <Mic className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-medium text-stone-800">{t.optAlice}</span>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-100/80 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={controlOptions.sunSensor}
                    onChange={(e) => setControlOptions({ ...controlOptions, sunSensor: e.target.checked })}
                    className="w-4 h-4 text-stone-900 rounded accent-stone-900"
                  />
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-medium text-stone-800">{t.optSensor}</span>
                </label>
              </div>
            </div>

            {/* Step 5: Fabric Category */}
            <div className="border-t border-stone-100 pt-6">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 text-xs flex items-center justify-center font-mono">5</span>
                {t.step5Title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'basic', title: t.fabricBasic },
                  { id: 'blackout', title: t.fabricBlackout },
                  { id: 'screen', title: t.fabricScreen },
                  { id: 'premium', title: t.fabricPremium },
                ].map((fab) => (
                  <button
                    key={fab.id}
                    type="button"
                    onClick={() => setFabricCategory(fab.id as FabricCategory)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      fabricCategory === fab.id
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <span className="text-xs font-medium leading-snug">{fab.title}</span>
                    {fabricCategory === fab.id && <Check className="w-4 h-4 text-amber-400 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 6: Quantity & Installation */}
            <div className="border-t border-stone-100 pt-6">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 text-xs flex items-center justify-center font-mono">6</span>
                {t.step6Title}
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-stone-800">{t.qtyLabel}</span>
                  <div className="flex items-center bg-white rounded-xl border border-stone-300 p-1 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-stone-900 font-mono text-sm">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Volume discount badge */}
                {costs.discountPercent > 0 && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{quantity >= 5 ? t.discountApplied5 : t.discountApplied}</span>
                  </div>
                )}
              </div>

              {/* Professional Installation toggle */}
              <div className="mt-4">
                <label className="flex items-start gap-3 p-4 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeInstallation}
                    onChange={(e) => setIncludeInstallation(e.target.checked)}
                    className="w-4 h-4 text-stone-900 rounded accent-stone-900 mt-0.5"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                      {t.includeInstallLabel}
                    </span>
                    <span className="text-xs text-stone-500 mt-0.5 block">
                      {lang === 'ru'
                        ? 'Включает доставку, аккуратный монтаж с пылеулавливателем, навеску текстиля и привязку к смартфону'
                        : 'Жеткізуді, шаңсорғышпен ұқыпты орнатуды, матаны ілуді және смартфонға қосуды қамтиды'}
                    </span>
                  </div>
                </label>
              </div>

            </div>

          </div>

          {/* Right Column: Live Price Summary & Direct CTAs (Sticky on Desktop) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-800">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  {t.calcResultTitle}
                </span>
                <span className="text-xs text-stone-400 bg-stone-800 px-2 py-0.5 rounded font-mono">
                  {quantity} {lang === 'ru' ? 'ок.' : 'тер.'}
                </span>
              </div>

              {/* Itemized breakdown */}
              <div className="py-4 space-y-2.5 text-xs text-stone-300 border-b border-stone-800">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">{t.calcEquipment}</span>
                  <span className="font-mono text-stone-200">{costs.constructionAndFabric.toLocaleString('ru-RU')} ₸</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">{t.calcDrive}</span>
                  <span className="font-mono text-stone-200">{costs.motorPrice.toLocaleString('ru-RU')} ₸</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">{t.calcAutomation}</span>
                  <span className="font-mono text-stone-200">{costs.automationPrice.toLocaleString('ru-RU')} ₸</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">{t.calcInstall}</span>
                  <span className="font-mono text-stone-200">
                    {costs.installPrice > 0 ? `${costs.installPrice.toLocaleString('ru-RU')} ₸` : (lang === 'ru' ? 'Самостоятельно' : 'Өз бетінше')}
                  </span>
                </div>

                {costs.discountAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-400 font-semibold pt-1">
                    <span>{t.calcDiscount} (-{costs.discountPercent}%)</span>
                    <span className="font-mono">-{costs.discountAmount.toLocaleString('ru-RU')} ₸</span>
                  </div>
                )}
              </div>

              {/* Total Display */}
              <div className="pt-4 pb-6">
                <span className="text-xs text-stone-400 block mb-1">{t.calcTotal}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tracking-tight">
                    {costs.finalTotal.toLocaleString('ru-RU')}
                  </span>
                  <span className="text-xl font-bold text-amber-300">{t.currency}</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">
                  {t.calcNote}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  id="calc-apply-btn"
                  onClick={handleApplyToBooking}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-98 text-stone-950 font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>{t.calcApplyToForm}</span>
                </button>

                <button
                  type="button"
                  id="calc-whatsapp-btn"
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 active:scale-98 text-stone-200 font-medium py-3 px-4 rounded-xl text-xs transition-all cursor-pointer border border-stone-700"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.calcSendWhatsapp}</span>
                </button>
              </div>

            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-stone-800">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{lang === 'ru' ? 'Что входит в бесплатный выезд:' : 'Тегін келуге не кіреді:'}</span>
              </div>
              <ul className="space-y-1 text-stone-600 list-disc list-inside text-[11px]">
                <li>{lang === 'ru' ? 'Лазерный замер с точностью до 1 мм' : '1 мм дәлдікпен лазерлік өлшеу'}</li>
                <li>{lang === 'ru' ? 'Демонстрация моторов и уровня шума' : 'Моторлар мен дыбыс деңгейін көрсету'}</li>
                <li>{lang === 'ru' ? '450+ каталогов тканей и оттенков' : '450+ маталар мен реңктер каталогтары'}</li>
                <li>{lang === 'ru' ? 'Фиксация сметы и скидки в договоре' : 'Смета мен жеңілдікті шартта бекіту'}</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
