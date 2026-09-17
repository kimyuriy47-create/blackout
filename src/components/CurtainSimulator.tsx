import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Wifi, Zap, Sliders, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CurtainSimulatorProps {
  lang: Language;
}

export const CurtainSimulator: React.FC<CurtainSimulatorProps> = ({ lang }) => {
  const t = translations[lang];
  // 0 = completely closed, 100 = completely open
  const [openPercentage, setOpenPercentage] = useState<number>(75);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const handlePosition = (target: number) => {
    setIsMoving(true);
    setOpenPercentage(target);
    setTimeout(() => {
      setIsMoving(false);
    }, 1100);
  };

  const getStatusText = () => {
    if (openPercentage >= 95) return t.simStatusOpen;
    if (openPercentage <= 5) return t.simStatusClosed;
    return `${openPercentage}% ${t.simStatusOpen.toLowerCase()}`;
  };

  return (
    <div id="curtain-simulator-widget" className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-xl p-5 sm:p-6 overflow-hidden">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${isMoving ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="font-medium text-stone-700">
            {isMoving ? t.simMotorRunning : t.simMotorIdle}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full font-mono text-[11px]">
            <Wifi className="w-3 h-3 text-emerald-600" /> Zigbee 3.0
          </span>
          <span className="flex items-center gap-1 text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full font-mono text-[11px]">
            <Volume2 className="w-3 h-3 text-stone-400" /> 19 dB
          </span>
        </div>
      </div>

      {/* Interactive Window Visualizer */}
      <div 
        className="relative mt-4 h-64 sm:h-72 rounded-xl overflow-hidden bg-gradient-to-b from-sky-100 via-amber-50 to-orange-50 border-4 border-stone-800 shadow-inner flex flex-col justify-between"
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)', transform: 'translateZ(0)' }}
      >
        {/* Exterior View through Window (City & Mountains skyline) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
            alt="View outside window"
            className="w-full h-full object-cover object-center filter saturate-110 brightness-95"
          />
          {/* Subtle daylight ambient glow */}
          <div 
            className="absolute inset-0 bg-amber-500/10 pointer-events-none transition-opacity duration-700" 
            style={{ opacity: openPercentage / 100 }}
          />
          {/* Window Frame Panes (Crossbars) */}
          <div className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2">
            <div className="border-r-2 border-b-2 border-stone-800/40" />
            <div className="border-b-2 border-stone-800/40" />
            <div className="border-r-2 border-stone-800/40" />
            <div />
          </div>
        </div>

        {/* Top Motorized Track Beam */}
        <div className="relative z-20 bg-stone-900 text-stone-200 px-4 py-1.5 flex items-center justify-between text-[11px] shadow-md border-b border-stone-700">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-semibold tracking-wider uppercase font-mono">SMART RAIL 3.2M</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-mono text-[10px]">Position: {openPercentage}%</span>
            <div className="w-16 h-1.5 bg-stone-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${openPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* The Animated Curtains (Left and Right panels sliding outward/inward) */}
        <div className="relative flex-1 flex w-full z-10 overflow-hidden pointer-events-none">
          {/* Left Curtain Drape */}
          <motion.div
            className="h-full bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100 shadow-2xl relative border-r border-stone-300 flex"
            animate={{
              width: `${(100 - openPercentage) / 2}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 18,
            }}
            style={{ minWidth: '4%', WebkitTransform: 'translateZ(0)', willChange: 'width' }}
          >
            {/* Visual vertical folds effect */}
            <div className="absolute inset-0 flex justify-around opacity-40">
              <div className="w-1 h-full bg-stone-400/40" />
              <div className="w-1 h-full bg-stone-400/40" />
              <div className="w-1 h-full bg-stone-400/40" />
            </div>
          </motion.div>

          {/* Center Light Aperture Gap */}
          <div className="flex-1" />

          {/* Right Curtain Drape */}
          <motion.div
            className="h-full bg-gradient-to-l from-stone-100 via-stone-200 to-stone-100 shadow-2xl relative border-l border-stone-300 flex justify-end"
            animate={{
              width: `${(100 - openPercentage) / 2}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 18,
            }}
            style={{ minWidth: '4%', WebkitTransform: 'translateZ(0)', willChange: 'width' }}
          >
            {/* Visual vertical folds effect */}
            <div className="absolute inset-0 flex justify-around opacity-40">
              <div className="w-1 h-full bg-stone-400/40" />
              <div className="w-1 h-full bg-stone-400/40" />
              <div className="w-1 h-full bg-stone-400/40" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Window Sill with Current Status Badge */}
        <div className="relative z-20 bg-stone-900/90 backdrop-blur-sm px-3 py-1.5 flex items-center justify-between text-xs text-stone-300">
          <span className="font-medium text-stone-200">{getStatusText()}</span>
          <span className="text-[11px] text-amber-300 flex items-center gap-1 font-mono">
            {isMoving && <RefreshCw className="w-3 h-3 animate-spin" />}
            {openPercentage === 100 ? '☀️ 100% Day light' : openPercentage === 0 ? '🌙 100% Blackout' : '⛅ Dimmed'}
          </span>
        </div>
      </div>

      {/* Control Buttons & Slider */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => handlePosition(100)}
            className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
              openPercentage >= 95
                ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {t.simBtnOpen}
          </button>
          <button
            type="button"
            onClick={() => handlePosition(50)}
            className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
              openPercentage === 50
                ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {t.simBtn50}
          </button>
          <button
            type="button"
            onClick={() => handlePosition(0)}
            className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
              openPercentage <= 5
                ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {t.simBtnClose}
          </button>
        </div>

        {/* Manual Range Slider */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-stone-400" />
              {t.simSliderLabel}
            </span>
            <span className="font-mono font-bold text-stone-800">{openPercentage}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={openPercentage}
            onChange={(e) => {
              setIsMoving(true);
              setOpenPercentage(Number(e.target.value));
            }}
            onMouseUp={() => setIsMoving(false)}
            onTouchEnd={() => setIsMoving(false)}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
          />
        </div>
      </div>
    </div>
  );
};
