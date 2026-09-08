import React, { useState } from 'react';
import { RouteMateLogo } from '../RouteMateLogo';
import {
  Bell,
  Sparkles,
  Plus,
  ChevronRight,
  Bookmark,
  SlidersHorizontal,
  CheckCircle2,
  ArrowRight,
  Ticket,
  Bed,
  Plane,
  Clock,
  MapPin,
  QrCode,
  X,
  Copy,
} from 'lucide-react';
import { Place, BookingItem } from '../../types';
import { mockAllReservations } from './MyReservationsScreen';

interface HomeScreenProps {
  onStartCreateCourse: () => void;
  onOpenTripDetail: () => void;
  onOpenBookings: () => void;
  onOpenReservations?: () => void;
  onOpenPlaceDetail?: (place: Place) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartCreateCourse,
  onOpenTripDetail,
  onOpenBookings,
  onOpenReservations,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<BookingItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({
    'hot-1': true,
    'hot-2': true,
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const upcomingBookings = mockAllReservations.filter((b) => b.status !== 'used');

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleReservationsClick = () => {
    if (onOpenReservations) {
      onOpenReservations();
    } else {
      onOpenBookings();
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-6">
      {/* Top App Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 h-14 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <RouteMateLogo size="sm" showText={true} />
        <div className="flex items-center gap-2">
          <button
            aria-label="알림"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF5C5C]" />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Stream */}
      <main className="px-4 pt-4 space-y-5">
        {/* Hero Banner: AI 자동 여행 플래너 */}
        <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-[#F0FCFA] to-[#E2FAF6] p-5 border border-[#39D9C8]/40 shadow-sm">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#39D9C8]/15 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#39D9C8]/20 text-[#006a61] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00A896]" />
            <span>AI 자동 여행 플래너</span>
          </div>

          <h1 className="text-[22px] font-extrabold text-[#2D3A4A] tracking-tight leading-snug">
            저장한 여행지,
            <br />
            <span className="text-[#00A896]">바로 코스로 완성!</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            SNS 링크나 캡처만 넣으면 AI가 알아서 최적 동선을 계산해 드려요.
          </p>

          <button
            onClick={onStartCreateCourse}
            className="mt-4 w-full h-[50px] rounded-2xl bg-[#39D9C8] hover:bg-[#32c9b9] text-[#2D3A4A] font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#39D9C8]/30 active:scale-[0.98] transition-all"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>+ 새 여행 코스 만들기</span>
          </button>
        </section>

        {/* 정리 대기 중인 장소 7개 (SNS 보관함) */}
        <section className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB85C]" />
              <span className="text-sm font-bold text-[#2D3A4A]">정리 대기 중인 장소 7개</span>
            </div>
            <span className="text-[11px] font-medium text-gray-400">SNS 보관함 실시간</span>
          </div>

          <div className="flex items-center justify-between">
            {/* Thumbnail stack */}
            <div className="flex items-center -space-x-2.5 overflow-hidden">
              <img
                className="w-11 h-11 rounded-xl object-cover border-2 border-white shadow-2xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY1HKdhV42-XFT6SRlqXd35A_IhdAkJGo8rXFchshqPCPhMifeG896DjpbH9IHuaK44oujQBDk60I7SCjC9uDO6qYIcL0gK5wQ_FyH4giIWlLK1K1K3rSSZutyJLXdFATzXw7wYg-W6Nuoa72QjhAJtAkh1dWIC9dDnMxoqoIgxIOBCjY0sB1S6R3dpORZe1l-SG_QRGvq2Po5N0LO7j--UCJkpEsi7f66Chtaoi2mW7SzoRNVrYtlTw"
                alt="톤쇼우"
              />
              <img
                className="w-11 h-11 rounded-xl object-cover border-2 border-white shadow-2xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8fEUsQYpxhRGpBLzwOWdecRtn64BoTiw-jrBvTZ6ckM-hIE6WTfhWigRg6ONkHaAlCb8_2hWh_op1b9DJsrMipYyEKODe3AdnvunbXogK2YDKFb92WPGhBBB1hTGMbVOTv2g81Jlud9XoCtekYqAccaZzeBbVOE6WS5JduBFh58F05EpnIhvJLMOh7isNMJIatnOQpgG9Qm1pVzHqf38qglAJJgSF1Gbl3lTsCli3CSPjF3g8kpXjnQ"
                alt="샌드카페"
              />
              <img
                className="w-11 h-11 rounded-xl object-cover border-2 border-white shadow-2xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn4SalnsCdbOQwJjYlE15x0Awo8B0E6iJ1PoUKK-sBwI-0fo6JQrbzqPzMeQ_BraaR7Gj95lFzh7U5XKqe59SAr-BksM-qZ83tzmYG1o81x9voNGmtWXOQr-YPUuOhy22GW9myJMAt0_Cnw4fO3KcSqV5mn1naWb3uaqEULtwMorxXIGL50tyt3OxYrl2_32ZwhZfYD8HvD5mXjS7Dnj4YWwQs4p3uFTqcs4DSOK0sRIvul-kLIduOGg"
                alt="밀락더마켓"
              />
              <div className="w-11 h-11 rounded-xl bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                +4
              </div>
            </div>

            <button
              onClick={onStartCreateCourse}
              className="flex items-center gap-1 text-xs font-bold text-[#006a61] bg-[#39D9C8]/15 hover:bg-[#39D9C8]/25 px-3 py-2 rounded-xl transition-colors"
            >
              <span>코스 생성</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* 다가오는 나의 예약 (Upcoming Bookings Section) */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold text-[#2D3A4A]">다가오는 나의 예약</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#39D9C8] text-[#2D3A4A] text-[10px] font-black">
                {upcomingBookings.length}건
              </span>
            </div>
            <button
              onClick={handleReservationsClick}
              className="text-xs font-bold text-[#006a61] hover:text-[#2D3A4A] flex items-center gap-0.5 transition-colors"
            >
              <span>전체보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* D-3 Upcoming Trip Main Ticket Card */}
          <div className="bg-white rounded-[24px] border border-gray-200 overflow-hidden shadow-2xs hover:border-[#39D9C8] transition-all">
            {/* Top Accent Header */}
            <div className="bg-gradient-to-r from-[#1E293B] to-[#2D3A4A] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#39D9C8] text-[#2D3A4A] text-xs font-black">
                  D-3
                </span>
                <span className="text-xs font-extrabold text-white">
                  부산 광안리 &amp; 영도 힐링 투어
                </span>
              </div>
              <span className="text-[11px] text-gray-300 font-medium">10.24(목) ~ 10.26(토)</span>
            </div>

            {/* List of Booked Items in this upcoming trip */}
            <div className="p-4 space-y-3">
              {/* Hotel Item */}
              <div
                onClick={() => setSelectedTicket(upcomingBookings[0])}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-gray-50 hover:bg-[#F0FCFA] cursor-pointer transition-colors border border-gray-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#39D9C8]/20 flex items-center justify-center text-[#006a61] shrink-0 font-bold text-xs">
                    🏨
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-[#2D3A4A] truncate">
                        광안리 센트럴오션뷰 호텔
                      </span>
                      <span className="text-[10px] font-bold text-[#00A896] bg-[#39D9C8]/20 px-1.5 py-0.2 rounded">
                        확정
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                      체크인 15:00 · 디럭스 더블 오션뷰 2박
                    </p>
                  </div>
                </div>
                <QrCode className="w-4 h-4 text-gray-400 hover:text-[#39D9C8] shrink-0 ml-2" />
              </div>

              {/* Flight Item */}
              <div
                onClick={() => setSelectedTicket(upcomingBookings[1])}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-gray-50 hover:bg-[#F0FCFA] cursor-pointer transition-colors border border-gray-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#4A7DFF]/15 flex items-center justify-center text-[#4A7DFF] shrink-0 font-bold text-xs">
                    ✈️
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-[#2D3A4A] truncate">
                        에어부산 BX8811 (김포 → 부산)
                      </span>
                      <span className="text-[10px] font-bold text-[#4A7DFF] bg-[#4A7DFF]/15 px-1.5 py-0.2 rounded">
                        발권완료
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                      10.24(목) 08:30 탑승 · 좌석 14A, 14B
                    </p>
                  </div>
                </div>
                <QrCode className="w-4 h-4 text-gray-400 hover:text-[#39D9C8] shrink-0 ml-2" />
              </div>

              {/* Waiting / Restaurant Item */}
              <div
                onClick={() => setSelectedTicket(upcomingBookings[2])}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-gray-50 hover:bg-[#F0FCFA] cursor-pointer transition-colors border border-gray-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB85C]/20 flex items-center justify-center text-[#D97706] shrink-0 font-bold text-xs">
                    🍽️
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-[#2D3A4A] truncate">
                        톤쇼우 광안점 원격 대기표
                      </span>
                      <span className="text-[10px] font-bold text-[#D97706] bg-[#FFB85C]/20 px-1.5 py-0.2 rounded">
                        대기 7번
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                      테이블링 연동 · 예상 입장 12:40
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-gray-100 flex gap-2">
                <button
                  onClick={() => setSelectedTicket(upcomingBookings[0])}
                  className="flex-1 h-10 rounded-2xl bg-[#39D9C8] hover:bg-[#32c9b9] text-[#2D3A4A] text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>모바일 티켓 / 바코드</span>
                </button>
                <button
                  onClick={handleReservationsClick}
                  className="px-3.5 h-10 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                >
                  전체 내역 &gt;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 최근 나의 여행 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#2D3A4A]">최근 나의 여행</h2>
            <button
              onClick={onOpenTripDetail}
              className="text-xs font-medium text-gray-500 hover:text-[#2D3A4A] flex items-center"
            >
              <span>전체보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-1">
            {/* Card 1: 부산 광안리 당일치기 */}
            <div
              onClick={onOpenTripDetail}
              className="min-w-[260px] max-w-[260px] bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs hover:border-[#39D9C8] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-[#35C98B]/15 text-[#218357] text-[11px] font-bold">
                  확정 일정
                </span>
                <span className="text-[11px] text-gray-400 font-medium">2024.10.12</span>
              </div>
              <h3 className="text-sm font-bold text-[#2D3A4A] group-hover:text-[#00A896] transition-colors truncate">
                부산 광안리 & 영도 당일치기
              </h3>
              <p className="text-xs text-gray-500 mt-1">총 4개 장소 · 이동 3시간 20분</p>
              
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[11px] text-[#FFB85C] font-semibold">#오션뷰</span>
                <span className="text-[11px] text-[#FFB85C] font-semibold">#감성카페</span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center text-[11px] text-gray-500 truncate">
                <span className="text-[#39D9C8] mr-1">📍</span>
                <span className="truncate">광안리 → 흰여울마을 → 영도</span>
              </div>
            </div>

            {/* Card 2: 제주 애월 힐링 투어 */}
            <div className="min-w-[260px] max-w-[260px] bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs hover:border-[#39D9C8] transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-[#FFB85C]/20 text-[#D97706] text-[11px] font-bold">
                  추천 생성완료
                </span>
                <span className="text-[11px] text-gray-400 font-medium">2024.11.02</span>
              </div>
              <h3 className="text-sm font-bold text-[#2D3A4A] truncate">제주 애월 힐링 투어</h3>
              <p className="text-xs text-gray-500 mt-1">총 5개 장소 · 예상 5시간</p>

              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[11px] text-[#FFB85C] font-semibold">#힐링</span>
                <span className="text-[11px] text-[#FFB85C] font-semibold">#디저트</span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center text-[11px] text-gray-500 truncate">
                <span className="text-[#39D9C8] mr-1">📍</span>
                <span className="truncate">한담해변 → 곽지과물 → 카페거리</span>
              </div>
            </div>
          </div>
        </section>

        {/* 최근 수집된 핫플레이스 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-[#2D3A4A]">최근 수집된 핫플레이스</h2>
              <p className="text-xs text-gray-400">SNS 자동 수집 보관함</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-800">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>필터</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
            {[
              { id: 'all', label: '전체 14' },
              { id: 'restaurant', label: '맛집' },
              { id: 'cafe', label: '카페' },
              { id: 'sightseeing', label: '관광명소' },
              { id: 'stay', label: '숙소' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#2D3A4A] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Place Cards */}
          <div className="space-y-3">
            {/* Place 1: 웨이브온 오션뷰 로스터리 */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex gap-3 items-center">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&auto=format&fit=crop&q=80"
                alt="웨이브온"
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-gray-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#D97706] bg-[#FFB85C]/15 px-1.5 py-0.5 rounded">
                    감성 카페
                  </span>
                  <span className="text-[11px] text-gray-400">부산 수영구</span>
                </div>
                <h3 className="text-sm font-bold text-[#2D3A4A] mt-1 truncate">웨이브온 오션뷰 로스터리</h3>
                <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                  인스타그램 릴스에서 저장됨 · 2.4만 저장
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#35C98B] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#35C98B]" />
                    <span>AI 주소 검증완료</span>
                  </span>
                  <button
                    onClick={() => toggleBookmark('hot-1')}
                    className="text-gray-400 hover:text-[#39D9C8] transition-colors p-1"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${bookmarkedIds['hot-1'] ? 'fill-[#39D9C8] text-[#39D9C8]' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Place 2: 영도 해녀촌 성게알김밥 */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex gap-3 items-center">
              <img
                src="https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&auto=format&fit=crop&q=80"
                alt="영도 해녀촌"
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-gray-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#006a61] bg-[#39D9C8]/20 px-1.5 py-0.5 rounded">
                    현지인 맛집
                  </span>
                  <span className="text-[11px] text-gray-400">부산 영도구</span>
                </div>
                <h3 className="text-sm font-bold text-[#2D3A4A] mt-1 truncate">영도 해녀촌 성게알김밥</h3>
                <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                  네이버 블로그 리뷰 추출 · 평점 4.8
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#35C98B] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#35C98B]" />
                    <span>영업시간 확인됨</span>
                  </span>
                  <button
                    onClick={() => toggleBookmark('hot-2')}
                    className="text-gray-400 hover:text-[#39D9C8] transition-colors p-1"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${bookmarkedIds['hot-2'] ? 'fill-[#39D9C8] text-[#39D9C8]' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Barcode & Ticket Modal in Home */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full overflow-hidden shadow-2xl text-[#2D3A4A] animate-scale-up">
            <div className="p-4 bg-gradient-to-r from-[#2D3A4A] to-[#1E293B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#39D9C8]" />
                <h3 className="text-sm font-extrabold">모바일 티켓 / 예약 확인서</h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-center">
              <div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#39D9C8]/20 text-[#006a61]">
                  {selectedTicket.categoryTag}
                </span>
                <h4 className="text-base font-extrabold text-[#2D3A4A] mt-1">
                  {selectedTicket.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">{selectedTicket.subtitle}</p>
              </div>

              {/* Barcode Lines */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-dashed border-gray-300">
                <div className="py-2 flex items-center justify-center gap-0.5 h-16 overflow-hidden">
                  {[2, 1, 4, 1, 3, 5, 8, 2, 6, 4, 3, 5, 9, 7, 8, 3, 2, 4, 8, 4, 6, 2, 7, 4, 3, 5, 8, 3, 2, 6, 8].map(
                    (val, idx) => (
                      <div
                        key={idx}
                        className={`h-14 bg-[#2D3A4A] ${val % 2 === 0 ? 'w-1' : 'w-0.5'}`}
                      />
                    )
                  )}
                </div>
                <div className="font-mono font-bold text-xs tracking-widest text-[#2D3A4A] mt-1">
                  {selectedTicket.barcodeNumber || '8801948271038472'}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  현장 키오스크 및 체크인 데스크에서 제시해 주세요
                </p>
              </div>

              {/* Info summary */}
              <div className="bg-gray-50 rounded-2xl p-3 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-400">예약번호:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold text-[#2D3A4A]">
                      {selectedTicket.bookingCode}
                    </span>
                    <button
                      onClick={() => handleCopy(selectedTicket.bookingCode || '')}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">일정:</span>
                  <span className="font-semibold text-gray-800">{selectedTicket.dateStr}</span>
                </div>
                {selectedTicket.seatInfo && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">좌석 번호:</span>
                    <span className="font-extrabold text-[#39D9C8]">{selectedTicket.seatInfo}</span>
                  </div>
                )}
              </div>

              {copiedCode && (
                <p className="text-xs text-[#00A896] font-bold">예약 번호가 복사되었습니다!</p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="flex-1 py-3 rounded-2xl bg-[#2D3A4A] text-white font-extrabold text-xs shadow-md"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    setSelectedTicket(null);
                    handleReservationsClick();
                  }}
                  className="px-4 py-3 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700"
                >
                  보관함 열기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
