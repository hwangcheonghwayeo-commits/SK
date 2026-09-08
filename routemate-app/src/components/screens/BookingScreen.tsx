import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Mic,
  Crosshair,
  Calendar,
  Users,
  ChevronDown,
  Search,
  Download,
  Star,
  Heart,
  Share2,
  Sparkles,
  Check,
  CheckCircle2,
  Globe,
  Bed,
  Plane,
  Ticket,
  SlidersHorizontal,
  RotateCw,
  GitFork,
  ShieldCheck,
  Headphones,
  DollarSign,
  ExternalLink,
  MapPin,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { RouteMateLogo } from '../RouteMateLogo';
import { BookingItem } from '../../types';

interface BookingScreenProps {
  bookings: BookingItem[];
  onBack: () => void;
  onConfirmBookings: (bookedItems: BookingItem[]) => void;
  onOpenCourseDetail?: () => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  bookings: initialBookings,
  onBack,
  onConfirmBookings,
  onOpenCourseDetail,
}) => {
  // Main Category Tab: 'hotel' | 'flight' | 'tour'
  const [activeCategory, setActiveCategory] = useState<'hotel' | 'flight' | 'tour'>('hotel');

  // Search Fields State
  const [destination, setDestination] = useState('부산 해운대 / 광안리');
  const [dateRange, setDateRange] = useState('10.24(목) - 10.26(토)');
  const [nights, setNights] = useState('2박');
  const [guestRoom, setGuestRoom] = useState('성인 2명 · 객실 1개');
  const [selectedTheme, setSelectedTheme] = useState<string>('ocean');

  // Flight specific state
  const [flightTripType, setFlightTripType] = useState<'round' | 'oneWay'>('round');
  const [flightOrigin, setFlightOrigin] = useState('서울/김포 (GMP)');
  const [flightDest, setFlightDest] = useState('부산/김해 (PUS)');

  // Favorites & Coupon State
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'h-1': true,
    'h-2': false,
    'h-3': false,
  });
  const [couponClaimed, setCouponClaimed] = useState(false);
  const [bookingModalHotel, setBookingModalHotel] = useState<any | null>(null);
  const [isVoiceSearching, setIsVoiceSearching] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    showToast(favorites[id] ? '관심 목록에서 제외되었습니다.' : '관심 숙소에 저장되었습니다.');
  };

  const handleClaimCoupon = () => {
    setCouponClaimed(true);
    showToast('🎉 첫만남 웰컴쿠폰팩 3종이 발급되었습니다!');
  };

  const handleSearch = () => {
    showToast(`🔍 "${destination}" 맞춤 특가 & 코스를 불러왔습니다.`);
  };

  const handleVoiceSearch = () => {
    setIsVoiceSearching(true);
    setTimeout(() => {
      setIsVoiceSearching(false);
      setDestination('제주 오션뷰 호텔 2박');
      showToast('🎙️ "제주 오션뷰 호텔 2박" 음성 인식이 완료되었습니다.');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7F9FA] text-[#2D3A4A] relative pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2D3A4A]/95 text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 border border-white/10 backdrop-blur-xs animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#39D9C8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header (뒤로가기, RouteMate 로고, 언어선택, 알림) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 h-14 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={onBack}
          aria-label="뒤로가기"
          className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-[#2D3A4A] hover:bg-gray-100 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center">
          <RouteMateLogo size="sm" showText={true} />
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector Pill */}
          <button
            onClick={() => showToast('현재 한국어 지원 모드입니다.')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100/90 text-[11px] font-bold text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Globe className="w-3 h-3 text-gray-500" />
            <span>한국어</span>
            <ChevronDown className="w-2.5 h-2.5 text-gray-400" />
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => showToast('새로운 특가 알림이 없습니다.')}
            aria-label="알림"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF5C5C]" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-4 pt-3.5 space-y-4">
        {/* 2. 간편 음성검색 배너 */}
        <section className="rounded-2xl bg-[#E2FAF6] border border-[#39D9C8]/40 p-2.5 pl-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <button
              onClick={handleVoiceSearch}
              className={`w-9 h-9 rounded-full bg-[#39D9C8] text-[#2D3A4A] flex items-center justify-center shrink-0 shadow-xs hover:bg-[#32c9b9] transition-all active:scale-95 ${
                isVoiceSearching ? 'animate-pulse ring-4 ring-[#39D9C8]/40' : ''
              }`}
            >
              <Mic className="w-4 h-4 text-[#2D3A4A] stroke-[2.5]" />
            </button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded-md bg-[#2D3A4A] text-white text-[9px] font-extrabold tracking-tight">
                  간편 음성검색
                </span>
              </div>
              <p className="text-xs font-bold text-[#2D3A4A] mt-0.5 truncate">
                {isVoiceSearching ? '음성을 듣고 있어요...' : '"제주 오션뷰 호텔 2박 찾아줘"'}
              </p>
            </div>
          </div>

          <button
            onClick={handleVoiceSearch}
            className="text-[11px] font-bold text-gray-500 hover:text-[#2D3A4A] px-2.5 py-1 rounded-lg hover:bg-white/60 transition-colors shrink-0"
          >
            음성 검색
          </button>
        </section>

        {/* 3. 예약 메인 검색 박스 카드 (화이트 둥근 카드) */}
        <section className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 space-y-4">
          {/* 3-Way Top Navigation Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {/* Tab 1: 호텔 / 숙소 */}
            <button
              onClick={() => setActiveCategory('hotel')}
              className={`py-2.5 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all ${
                activeCategory === 'hotel'
                  ? 'bg-[#2D3A4A] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bed className="w-4 h-4" />
              <span className="text-xs font-extrabold whitespace-nowrap">호텔 / 숙소</span>
            </button>

            {/* Tab 2: 항공권 */}
            <button
              onClick={() => setActiveCategory('flight')}
              className={`py-2.5 px-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                activeCategory === 'flight'
                  ? 'bg-[#2D3A4A] text-white shadow-sm'
                  : 'bg-[#EBF5FF] text-[#1E40AF] hover:bg-blue-100'
              }`}
            >
              <div className="flex items-center gap-1">
                <Plane className="w-4 h-4" />
                <span className="text-xs font-extrabold">항공권</span>
              </div>
            </button>

            {/* Tab 3: 투어 · 티켓 */}
            <button
              onClick={() => setActiveCategory('tour')}
              className={`py-2.5 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all ${
                activeCategory === 'tour'
                  ? 'bg-[#2D3A4A] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span className="text-xs font-extrabold whitespace-nowrap">투어 · 티켓</span>
            </button>
          </div>

          {/* Form Content Depending on Tab */}
          {activeCategory === 'hotel' && (
            <div className="space-y-3">
              {/* Field 1: 목적지 / 숙소명 */}
              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1">
                  목적지 / 숙소명
                </label>
                <div className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-[#F8FAFC] border border-gray-200 focus-within:border-[#39D9C8] transition-colors">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-transparent text-xs font-extrabold text-[#2D3A4A] w-full focus:outline-hidden"
                      placeholder="도시 또는 호텔명 입력"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 pl-2">
                    <button
                      onClick={handleVoiceSearch}
                      className="hover:text-gray-600 p-0.5"
                      title="음성 입력"
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setDestination('현재 내 위치 주변');
                        showToast('내 주변 반경 5km 숙소를 탐색합니다.');
                      }}
                      className="hover:text-gray-600 p-0.5"
                      title="내 위치"
                    >
                      <Crosshair className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Field 2: 체크인 - 체크아웃 */}
              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1">
                  체크인 - 체크아웃
                </label>
                <div className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-[#F8FAFC] border border-gray-200">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-xs font-extrabold text-[#2D3A4A]">{dateRange}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-gray-200/70 text-gray-600 text-[11px] font-bold">
                    {nights}
                  </span>
                </div>
              </div>

              {/* Field 3: 인원 및 객실 수 */}
              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1">
                  인원 및 객실 수
                </label>
                <div className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-[#F8FAFC] border border-gray-200">
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-xs font-extrabold text-[#2D3A4A]">{guestRoom}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Popular Theme Chips */}
              <div className="pt-1">
                <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
                  <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap mr-1">
                    인기 테마:
                  </span>
                  {[
                    { id: 'ocean', label: '오션뷰', emoji: '🌊' },
                    { id: 'pool', label: '인피니티풀', emoji: '🏊' },
                    { id: 'breakfast', label: '조식포함', emoji: '🍳' },
                    { id: 'cafe', label: '도보 5분 카페거리', emoji: '☕' },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                        selectedTheme === theme.id
                          ? 'bg-[#39D9C8]/25 text-[#006a61] border border-[#39D9C8]'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      <span>{theme.emoji}</span>
                      <span>{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full h-12 rounded-full bg-[#39D9C8] hover:bg-[#32c9b9] text-[#2D3A4A] font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#39D9C8]/30 transition-all active:scale-[0.99] mt-2"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>특가 & 맞춤 코스 찾기</span>
              </button>
            </div>
          )}

          {/* Flight Search Tab Content */}
          {activeCategory === 'flight' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                <div className="flex gap-3">
                  <button
                    onClick={() => setFlightTripType('round')}
                    className={`text-xs font-bold ${
                      flightTripType === 'round' ? 'text-[#2D3A4A] underline' : 'text-gray-400'
                    }`}
                  >
                    왕복
                  </button>
                  <button
                    onClick={() => setFlightTripType('oneWay')}
                    className={`text-xs font-bold ${
                      flightTripType === 'oneWay' ? 'text-[#2D3A4A] underline' : 'text-gray-400'
                    }`}
                  >
                    편도
                  </button>
                </div>
                <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                  스카이스캐너 연계 최저가
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 block font-bold">출발지</span>
                  <span className="text-xs font-extrabold text-[#2D3A4A] block mt-0.5">
                    {flightOrigin}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 block font-bold">도착지</span>
                  <span className="text-xs font-extrabold text-[#2D3A4A] block mt-0.5">
                    {flightDest}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">탑승일정</span>
                  <span className="text-xs font-extrabold text-[#2D3A4A]">{dateRange}</span>
                </div>
                <span className="text-[11px] font-bold text-gray-500">성인 2명 · 일반석</span>
              </div>

              <button
                onClick={() => showToast('✈️ 김포-김해 왕복 특가 항공권을 검색했습니다.')}
                className="w-full h-12 rounded-full bg-[#39D9C8] hover:bg-[#32c9b9] text-[#2D3A4A] font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#39D9C8]/30 transition-all active:scale-[0.99]"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>실시간 항공권 특가 검색</span>
              </button>
            </div>
          )}

          {/* Tour/Ticket Search Tab Content */}
          {activeCategory === 'tour' && (
            <div className="space-y-3">
              <div className="p-3 bg-[#F0FCFA] rounded-2xl border border-[#39D9C8]/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-[#2D3A4A]">
                    일정 맞춤 맛집 줄서기 & 입장권
                  </span>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    테이블링 원격 대기 및 밀락더마켓 패스권
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#39D9C8] text-[#2D3A4A] text-[10px] font-extrabold">
                  3건 가능
                </span>
              </div>

              <button
                onClick={() => showToast('🎟️ 부산 투어 & 티켓팅 패스 조회가 완료되었습니다.')}
                className="w-full h-12 rounded-full bg-[#39D9C8] hover:bg-[#32c9b9] text-[#2D3A4A] font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#39D9C8]/30 transition-all active:scale-[0.99]"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>투어 & 티켓 패스 찾기</span>
              </button>
            </div>
          )}
        </section>

        {/* 4. 첫만남 웰컴쿠폰팩 3종 즉시지급 다크 배너 */}
        <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white rounded-[24px] p-5 shadow-md relative overflow-hidden">
          <div className="flex items-start justify-between">
            <span className="inline-block px-2 py-0.5 rounded-md border border-[#F59E0B] text-[#FBBF24] text-[10px] font-extrabold tracking-wider">
              NEW MEMBER EXCLUSIVE
            </span>
            <span className="text-[11px] text-gray-400 font-medium">선착순 지급</span>
          </div>

          <h2 className="text-lg font-extrabold text-white mt-2.5 leading-tight">
            첫만남 웰컴쿠폰팩
            <br />
            <span className="text-[#39D9C8]">3종 즉시지급!</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">가입 즉시 사용 가능한 첫여행 혜택</p>

          {/* Coupons List */}
          <div className="mt-4 space-y-2 pt-3 border-t border-white/10">
            {/* Coupon 1 */}
            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-200">
                <Plane className="w-4 h-4 text-[#4A7DFF]" />
                <span>항공권 할인 쿠폰</span>
              </div>
              <span className="text-sm font-black text-[#39D9C8]">15,000원</span>
            </div>

            {/* Coupon 2 */}
            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-200">
                <Bed className="w-4 h-4 text-[#F59E0B]" />
                <span>호텔 숙박 할인</span>
              </div>
              <span className="text-sm font-black text-[#39D9C8]">20,000원</span>
            </div>

            {/* Coupon 3 */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2 text-xs text-gray-200">
                <Ticket className="w-4 h-4 text-[#39D9C8]" />
                <span>투어 & 티켓 패스</span>
              </div>
              <span className="text-sm font-black text-[#39D9C8]">10% OFF</span>
            </div>
          </div>

          {/* Coupon Code & Download Button */}
          <div className="mt-4 pt-1 flex items-center justify-between text-[11px] text-gray-400">
            <span>쿠폰코드</span>
            <span className="font-mono font-bold text-white tracking-widest bg-white/10 px-2 py-0.5 rounded">
              ROUTEMATE2024
            </span>
          </div>

          <button
            onClick={handleClaimCoupon}
            disabled={couponClaimed}
            className={`mt-3 w-full h-[46px] rounded-full font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
              couponClaimed
                ? 'bg-white/20 text-gray-300 cursor-default'
                : 'bg-[#39D9C8] hover:bg-[#32c9b9] text-[#2D3A4A] shadow-[#39D9C8]/20 active:scale-98'
            }`}
          >
            {couponClaimed ? (
              <>
                <Check className="w-4 h-4" />
                <span>쿠폰팩 지급 완료</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>쿠폰팩 한번에 받기</span>
              </>
            )}
          </button>
        </section>

        {/* 5. 추천 호텔 & 여행 코스 섹션 */}
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-1.5 py-0.2 rounded bg-[#39D9C8]/20 text-[#006a61] text-[9px] font-black">
                  AI ROUTE LINKED
                </span>
                <span className="text-[10px] text-gray-400">예약 시 최적 동선 자동 연결</span>
              </div>
              <h2 className="text-base font-extrabold text-[#2D3A4A]">추천 호텔 & 여행 코스</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('필터 및 정렬 옵션')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 bg-white text-[11px] font-semibold text-gray-600 hover:border-gray-300"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>필터 및 정렬</span>
              </button>
              <button
                onClick={() => showToast('전체 추천 숙소 24개')}
                className="text-[11px] font-bold text-gray-400 hover:text-[#2D3A4A]"
              >
                전체보기
              </button>
            </div>
          </div>

          {/* Hotel List */}
          <div className="space-y-4">
            {/* HOTEL 1: 광안리 센트럴오션뷰 호텔 */}
            <div className="bg-white rounded-[24px] overflow-hidden border border-gray-200 shadow-2xs">
              {/* Hotel Photo with Badges */}
              <div className="relative h-48 w-full bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80"
                  alt="광안리 센트럴오션뷰 호텔"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#2D3A4A]/80 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                  광안리 해변 도보 1분
                </span>
                <span className="absolute top-3 left-36 bg-[#39D9C8] text-[#2D3A4A] text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xs">
                  오늘만 38% 특가
                </span>
                <button
                  onClick={(e) => toggleFavorite('h-1', e)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites['h-1'] ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Details */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Star className="w-3.5 h-3.5 fill-[#FFB85C] text-[#FFB85C]" />
                  <span className="font-extrabold text-[#2D3A4A]">4.87</span>
                  <span>(이용후기 1,420개) · 호텔 · 리조트</span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#2D3A4A]">
                    광안리 센트럴오션뷰 호텔
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    부산 수영구 광안해변로 | 전 객실 광안대교 파노라마 뷰 &amp; 루...
                  </p>
                </div>

                {/* AI Route Box */}
                <div className="p-3 rounded-2xl bg-[#F0FCFA] border border-[#39D9C8]/40 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00A896] shrink-0" />
                  <span className="text-xs font-bold text-[#006a61]">
                    AI 코스 3개 연계: 주변 맛집·명소 최단 동선 자동 생성
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-[11px] text-gray-400">1박 기준 (세금 포함)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-gray-400 line-through">₩220,000</span>
                    <span className="text-lg font-black text-[#2D3A4A]">₩136,400</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={onOpenCourseDetail}
                    className="h-11 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-[#2D3A4A] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <GitFork className="w-3.5 h-3.5 text-[#39D9C8]" />
                    <span>주변 코스</span>
                  </button>
                  <button
                    onClick={() =>
                      setBookingModalHotel({
                        name: '광안리 센트럴오션뷰 호텔',
                        price: '136,400원',
                        date: '10.24(목) - 10.26(토)',
                      })
                    }
                    className="h-11 rounded-2xl bg-[#39D9C8] hover:bg-[#32c9b9] text-xs font-extrabold text-[#2D3A4A] flex items-center justify-center shadow-xs transition-colors"
                  >
                    <span>예약하기</span>
                  </button>
                </div>
              </div>
            </div>

            {/* HOTEL 2: 도쿄 신주쿠 그란벨 호텔 */}
            <div className="bg-white rounded-[24px] overflow-hidden border border-gray-200 shadow-2xs">
              <div className="relative h-48 w-full bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80"
                  alt="도쿄 신주쿠 그란벨 호텔"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#2D3A4A]/80 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                  신주쿠역 도보 7분
                </span>
                <span className="absolute top-3 left-32 bg-[#FFB85C] text-[#2D3A4A] text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xs">
                  인기 급상승
                </span>
                <button
                  onClick={(e) => toggleFavorite('h-2', e)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites['h-2'] ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 space-y-2.5">
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Star className="w-3.5 h-3.5 fill-[#FFB85C] text-[#FFB85C]" />
                  <span className="font-extrabold text-[#2D3A4A]">4.91</span>
                  <span>(이용후기 2,380개) · 디자인 호텔</span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#2D3A4A]">
                    도쿄 신주쿠 그란벨 호텔
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    도쿄도 신주쿠구 가부키초 | 루프탑 테라스 바 &amp; 현대미술 갤...
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#F0FCFA] border border-[#39D9C8]/40 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00A896] shrink-0" />
                  <span className="text-xs font-bold text-[#006a61]">
                    AI 코스 4개 연계: 도쿄 주요 명소 환승 최적화 코스
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-[11px] text-gray-400">1박 기준 (세금 포함)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-gray-400 line-through">₩285,000</span>
                    <span className="text-lg font-black text-[#2D3A4A]">₩189,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={onOpenCourseDetail}
                    className="h-11 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-[#2D3A4A] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <GitFork className="w-3.5 h-3.5 text-[#39D9C8]" />
                    <span>주변 코스</span>
                  </button>
                  <button
                    onClick={() =>
                      setBookingModalHotel({
                        name: '도쿄 신주쿠 그란벨 호텔',
                        price: '189,000원',
                        date: '10.24(목) - 10.26(토)',
                      })
                    }
                    className="h-11 rounded-2xl bg-[#39D9C8] hover:bg-[#32c9b9] text-xs font-extrabold text-[#2D3A4A] flex items-center justify-center shadow-xs transition-colors"
                  >
                    <span>예약하기</span>
                  </button>
                </div>
              </div>
            </div>

            {/* HOTEL 3: 제주 신화월드 메리어트관 */}
            <div className="bg-white rounded-[24px] overflow-hidden border border-gray-200 shadow-2xs">
              <div className="relative h-48 w-full bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80"
                  alt="제주 신화월드 메리어트관"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#2D3A4A]/80 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                  서귀포 힐링리조트
                </span>
                <span className="absolute top-3 left-36 bg-[#35C98B] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xs">
                  조식 무료 패키지
                </span>
                <button
                  onClick={(e) => toggleFavorite('h-3', e)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites['h-3'] ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 space-y-2.5">
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Star className="w-3.5 h-3.5 fill-[#FFB85C] text-[#FFB85C]" />
                  <span className="font-extrabold text-[#2D3A4A]">4.89</span>
                  <span>(이용후기 3,110개) · 5성급 호텔</span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#2D3A4A]">
                    제주 신화월드 메리어트관
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    제주 안덕면 신화역사로 | 사계절 온수풀 모실클럽하우스 &amp; ...
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#F0FCFA] border border-[#39D9C8]/40 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00A896] shrink-0" />
                  <span className="text-xs font-bold text-[#006a61]">
                    AI 코스 5개 연계: 제주 해안 드라이브 맞춤 코스
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-[11px] text-gray-400">1박 기준 (세금 포함)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-gray-400 line-through">₩310,000</span>
                    <span className="text-lg font-black text-[#2D3A4A]">₩215,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={onOpenCourseDetail}
                    className="h-11 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-[#2D3A4A] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <GitFork className="w-3.5 h-3.5 text-[#39D9C8]" />
                    <span>주변 코스</span>
                  </button>
                  <button
                    onClick={() =>
                      setBookingModalHotel({
                        name: '제주 신화월드 메리어트관',
                        price: '215,000원',
                        date: '10.24(목) - 10.26(토)',
                      })
                    }
                    className="h-11 rounded-2xl bg-[#39D9C8] hover:bg-[#32c9b9] text-xs font-extrabold text-[#2D3A4A] flex items-center justify-center shadow-xs transition-colors"
                  >
                    <span>예약하기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. RouteMate만의 특별함 섹션 */}
        <section className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-100 text-center space-y-3 mt-4">
          <div>
            <h3 className="text-base font-extrabold text-[#2D3A4A]">
              RouteMate만의 특별함
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              숙소 예약과 동시에 여행 코스가 완성됩니다.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 text-left">
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
              <div className="w-10 h-10 rounded-2xl bg-[#E2FAF6] text-[#00A896] flex items-center justify-center shrink-0">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#2D3A4A]">숙소 연계 자동 동선</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  체크인 시간에 맞춘 주변 동선 자동 완성
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
              <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#2D3A4A]">최저가 보상제</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Trip.com 연동 실시간 최저가 보장
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
              <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#2D3A4A]">24시간 한국어 케어</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  해외 숙소 문제 시 24시간 1:1 지원
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Confirmation Dialog */}
      {bookingModalHotel && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-5 w-full max-w-xs text-center shadow-2xl animate-scale-up space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#39D9C8]/20 text-[#00A896] flex items-center justify-center mx-auto">
              <Bed className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#2D3A4A]">
              {bookingModalHotel.name}
            </h3>
            <div className="bg-gray-50 rounded-2xl p-3 text-left space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">일정:</span>
                <span className="font-bold text-gray-700">{bookingModalHotel.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">결제 금액:</span>
                <span className="font-extrabold text-[#FF5C5C]">{bookingModalHotel.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">혜택:</span>
                <span className="font-bold text-[#00A896]">AI 맞춤 동선 코스 자동 생성</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400">
              호텔 예약 즉시 체크인 동선이 마이트립에 반영됩니다.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setBookingModalHotel(null)}
                className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-xs"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setBookingModalHotel(null);
                  showToast('🎉 예약이 확정되었습니다! 마이트립에 동선이 연결되었습니다.');
                  onConfirmBookings([
                    {
                      id: 'h-auto',
                      placeId: 'hotel-1',
                      placeName: bookingModalHotel.name,
                      categoryTag: '숙소 예약',
                      servicePartner: 'Trip.com 연동',
                      title: bookingModalHotel.name,
                      subtitle: '광안대교 오션뷰 디럭스 룸',
                      type: 'hotel',
                      price: 136400,
                      status: 'confirmed',
                      actionText: '예약 확인서',
                      isSelected: true,
                    },
                  ]);
                }}
                className="flex-1 py-3 rounded-2xl bg-[#39D9C8] text-[#2D3A4A] font-extrabold text-xs shadow-md"
              >
                예약 확정하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
