import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Palette, Sparkles, RefreshCw } from 'lucide-react';

interface DeviceMockupProps {
  children: React.ReactNode;
  activeScreenName: string;
  onSelectScreen: (screenId: string) => void;
  screensList: { id: string; label: string; icon: string }[];
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  children,
  activeScreenName,
  onSelectScreen,
  screensList,
}) => {
  const [showFrame, setShowFrame] = useState(true);
  const [frameColor, setFrameColor] = useState<'black' | 'mint' | 'silver'>('black');
  const [currentTime, setCurrentTime] = useState('13:20');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const frameColors = {
    black: {
      outer: 'bg-[#181D24] border-[#313944]',
      rim: 'ring-[#0F1318]',
      island: 'bg-[#000000]',
    },
    mint: {
      outer: 'bg-[#1D3E3B] border-[#39D9C8]/40',
      rim: 'ring-[#132A28]',
      island: 'bg-[#000000]',
    },
    silver: {
      outer: 'bg-[#E2E8F0] border-[#CBD5E1]',
      rim: 'ring-[#94A3B8]',
      island: 'bg-[#000000]',
    },
  };

  return (
    <div className="min-h-screen bg-[#0E1318] text-[#E2E8F0] flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 select-none font-sans">
      {/* Desktop Helper Toolbar */}
      <header className="w-full max-w-5xl mb-4 flex flex-wrap items-center justify-between gap-3 bg-[#18202A]/90 backdrop-blur-md border border-[#2D3A4A]/50 px-4 py-2.5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#39D9C8] animate-pulse"></div>
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
            <span>RouteMate</span>
            <span className="px-2 py-0.5 rounded-md bg-[#39D9C8]/20 text-[#39D9C8] text-[11px] font-semibold">
              모바일 목업 뷰어
            </span>
          </span>
          <span className="hidden md:inline-block text-xs text-gray-400">|</span>
          <div className="hidden md:flex items-center gap-1 text-xs text-gray-300">
            <Sparkles className="w-3.5 h-3.5 text-[#39D9C8]" />
            <span>포트폴리오 체험판 · 예시 코스</span>
          </div>
        </div>

        {/* Device Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Screen Selector */}
          <div className="hidden lg:flex items-center bg-[#0F141C] p-1 rounded-xl border border-gray-800">
            {screensList.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeScreenName === s.id
                    ? 'bg-[#39D9C8] text-[#101e22] shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Color Switcher */}
          <div className="flex items-center gap-1 bg-[#0F141C] px-2 py-1 rounded-xl border border-gray-800">
            <Palette className="w-3.5 h-3.5 text-gray-400 mr-1" />
            <button
              onClick={() => setFrameColor('black')}
              className={`w-3.5 h-3.5 rounded-full bg-[#1e242d] border border-gray-600 ${
                frameColor === 'black' ? 'ring-2 ring-[#39D9C8]' : ''
              }`}
              title="티타늄 블랙"
            />
            <button
              onClick={() => setFrameColor('mint')}
              className={`w-3.5 h-3.5 rounded-full bg-[#39D9C8] border border-teal-300 ${
                frameColor === 'mint' ? 'ring-2 ring-white' : ''
              }`}
              title="루트 민트"
            />
            <button
              onClick={() => setFrameColor('silver')}
              className={`w-3.5 h-3.5 rounded-full bg-[#E2E8F0] border border-gray-400 ${
                frameColor === 'silver' ? 'ring-2 ring-[#39D9C8]' : ''
              }`}
              title="실버"
            />
          </div>

          {/* Frame Toggle */}
          <button
            onClick={() => setShowFrame(!showFrame)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              showFrame
                ? 'bg-[#39D9C8]/15 border-[#39D9C8]/40 text-[#39D9C8]'
                : 'bg-[#18202A] border-gray-700 text-gray-300'
            }`}
            title="스마트폰 외형 프레임 켜기/끄기"
          >
            {showFrame ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{showFrame ? '프레임 ON' : '전체화면'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="relative flex items-center justify-center w-full">
        {showFrame ? (
          /* Phone Outer Chassis */
          <div
            className={`relative w-full max-w-[420px] rounded-[52px] p-3.5 border-[3px] ${frameColors[frameColor].outer} ring-8 ${frameColors[frameColor].rim} shadow-[0_25px_70px_rgba(0,0,0,0.65)] transition-all duration-300`}
            style={{ minHeight: '720px' }}
          >
            {/* Left physical buttons */}
            <div className="absolute -left-[5px] top-[115px] w-[3px] h-[28px] bg-gray-600 rounded-l-sm" />
            <div className="absolute -left-[5px] top-[155px] w-[3px] h-[50px] bg-gray-600 rounded-l-sm" />
            <div className="absolute -left-[5px] top-[215px] w-[3px] h-[50px] bg-gray-600 rounded-l-sm" />
            {/* Right physical power button */}
            <div className="absolute -right-[5px] top-[170px] w-[3px] h-[65px] bg-gray-600 rounded-r-sm" />

            {/* Inner Phone Screen */}
            <div className="relative w-full rounded-[42px] overflow-hidden bg-[#F7FAFA] shadow-inner flex flex-col border border-black/10">
              {/* Phone Status Bar (Dynamic Island & Network Icons) */}
              <div className="sticky top-0 z-50 w-full h-11 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between text-xs font-semibold text-[#2D3A4A] select-none border-b border-gray-100/50">
                {/* Clock */}
                <span className="font-bold tracking-tight text-[13px]">{currentTime}</span>

                {/* Dynamic Island / Pill Notch */}
                <div
                  className={`w-24 h-5 ${frameColors[frameColor].island} rounded-full flex items-center justify-between px-2 shadow-xs`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111827] ring-1 ring-gray-700/50" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-1.5 text-gray-700">
                  <span className="text-[10px] font-bold">5G</span>
                  {/* Cellular Bars */}
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <rect x="2" y="16" width="3" height="6" rx="1" />
                    <rect x="7" y="12" width="3" height="10" rx="1" />
                    <rect x="12" y="8" width="3" height="14" rx="1" />
                    <rect x="17" y="4" width="3" height="18" rx="1" />
                  </svg>
                  {/* Battery */}
                  <div className="w-5 h-2.5 border border-gray-700 rounded-xs p-0.5 flex items-center">
                    <div className="w-full h-full bg-[#2D3A4A] rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Screen Body */}
              <div className="w-full min-h-[580px] h-[70vh] max-h-[790px] overflow-y-auto custom-scrollbar flex flex-col bg-[#F7FAFA]">
                {children}
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="sticky bottom-0 z-50 w-full h-5 bg-white/90 backdrop-blur-xs flex items-center justify-center pointer-events-none">
                <div className="w-32 h-1 bg-[#2D3A4A]/40 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* Full Viewport / Flat Container */
          <div className="w-full max-w-md rounded-2xl overflow-hidden bg-[#F7FAFA] shadow-2xl border border-[#2D3A4A]/30">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
