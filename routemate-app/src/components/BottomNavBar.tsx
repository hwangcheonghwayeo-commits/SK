import React from 'react';
import { Home, Sparkles, Ticket, Map, User } from 'lucide-react';

export type NavTabId = 'home' | 'saved' | 'bookings' | 'mytrip' | 'profile';

interface BottomNavBarProps {
  currentTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  bookingCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  bookingCount = 3,
}) => {
  const tabs = [
    { id: 'home' as const, label: '홈', icon: Home },
    { id: 'saved' as const, label: '코스생성', icon: Sparkles },
    { id: 'bookings' as const, label: '예약·티켓', icon: Ticket, badge: bookingCount },
    { id: 'mytrip' as const, label: '마이트립', icon: Map },
    { id: 'profile' as const, label: '프로필', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-2 py-1.5 flex items-center justify-around shadow-sm select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
              isActive ? 'text-[#00A896]' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 px-1 min-w-[15px] h-[15px] rounded-full bg-[#FF5C5C] text-white text-[9px] font-extrabold flex items-center justify-center shadow-2xs">
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#39D9C8]" />
              )}
            </div>
            <span
              className={`text-[11px] mt-1 whitespace-nowrap ${
                isActive ? 'font-bold text-[#2D3A4A]' : 'font-medium text-gray-500'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

