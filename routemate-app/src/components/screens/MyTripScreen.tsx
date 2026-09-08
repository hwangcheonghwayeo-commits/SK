import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  MoreVertical,
  Calendar,
  Users,
  MapPin,
  ExternalLink,
  Navigation,
  Clock,
  Footprints,
  Wallet,
  CheckCircle2,
  Ticket,
  Hotel,
  Coffee,
  Sparkles,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { ActiveTrip } from '../../types';

interface MyTripScreenProps {
  trip: ActiveTrip;
  onBack: () => void;
  onOpenBookings: () => void;
  onOpenShareModal: () => void;
}

export const MyTripScreen: React.FC<MyTripScreenProps> = ({
  trip,
  onBack,
  onOpenBookings,
  onOpenShareModal,
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'timeline'>('today');
  const [showToast, setShowToast] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col relative pb-32">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 h-14 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={onBack}
          aria-label="뒤로가기"
          className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-[#2D3A4A] hover:bg-gray-100 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-base font-extrabold text-[#2D3A4A] tracking-tight">MY TRIP 일정 상세</h1>
          <span className="text-[11px] text-[#00A896] font-bold">광안리 당일치기 투어</span>
        </div>
        <div className="flex items-center gap-1 -mr-1">
          <button
            onClick={onOpenShareModal}
            aria-label="공유"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-[#2D3A4A]"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            aria-label="더보기"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-[#2D3A4A]"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-4 space-y-4">
        {/* Trip Header Banner Card */}
        <section className="bg-gradient-to-br from-white via-[#F3FBFA] to-[#E3F9F6] rounded-[24px] p-4 border border-[#39D9C8]/40 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#39D9C8] text-[#2D3A4A] text-[11px] font-extrabold">
                일정 확정됨
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#FF5C5C]/15 text-[#E02424] text-[11px] font-extrabold">
                {trip.dDay || 'D-Day'}
              </span>
            </div>
            <span className="text-xs font-bold text-gray-500">{trip.placeCount}개 장소</span>
          </div>

          <h2 className="text-lg font-extrabold text-[#2D3A4A] mt-2 leading-tight">
            {trip.title}
          </h2>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{trip.dateStr}</span>
          </p>

          {/* Action Button Row */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-200/60">
            <button
              onClick={onOpenShareModal}
              className="py-2 px-1 rounded-xl bg-white hover:bg-gray-50 text-[#2D3A4A] border border-gray-200 text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#FFE812] fill-[#FFE812]" />
              <span>카카오톡 공유</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="py-2 px-1 rounded-xl bg-white hover:bg-gray-50 text-[#2D3A4A] border border-gray-200 text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-all active:scale-95"
            >
              <Users className="w-3.5 h-3.5 text-[#00A896]" />
              <span>동행자 초대</span>
            </button>
            <a
              href="https://map.naver.com"
              target="_blank"
              rel="noreferrer"
              className="py-2 px-1 rounded-xl bg-white hover:bg-gray-50 text-[#2D3A4A] border border-gray-200 text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-all active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 text-[#4A7DFF]" />
              <span>지도 앱 연동</span>
            </a>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="bg-gray-100 p-1 rounded-full flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'today'
                ? 'bg-white text-[#2D3A4A] shadow-xs'
                : 'text-gray-500 hover:text-[#2D3A4A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00A896]" />
            <span>오늘의 여행 & 예약</span>
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'timeline'
                ? 'bg-white text-[#2D3A4A] shadow-xs'
                : 'text-gray-500 hover:text-[#2D3A4A]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>전체 일정 타임라인</span>
          </button>
        </div>

        {/* LIVE 여행 진행 중 패널 */}
        <section className="bg-gradient-to-r from-[#18202A] to-[#2D3A4A] text-white rounded-2xl p-4 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 w-28 h-28 bg-[#39D9C8]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#39D9C8] animate-ping" />
              <span className="text-xs font-extrabold text-[#39D9C8] tracking-wider uppercase">
                LIVE 여행 진행 중
              </span>
            </div>
            <span className="text-[11px] font-bold text-gray-300">실시간 동선 추적</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
              <span className="text-[11px] text-gray-300 block">현재 체류 중:</span>
              <div className="font-bold text-white text-sm mt-0.5 flex items-center justify-between">
                <span>{trip.liveCurrentPlace || '샌드카페 광안'}</span>
                <span className="text-[11px] text-[#39D9C8] font-normal">
                  {trip.liveCurrentUntil || '~14:00까지'}
                </span>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-300 block">다음 목적지:</span>
                <div className="font-bold text-white text-sm mt-0.5">
                  {trip.liveNextPlace || '밀락더마켓 복합문화공간'}
                </div>
              </div>
              <span className="text-[11px] text-[#FFB85C] font-semibold">
                {trip.liveNextArrival || '14:15 도착예정'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
            <a
              href="https://map.kakao.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2 rounded-xl bg-[#39D9C8] text-[#18202A] text-xs font-extrabold flex items-center justify-center gap-1 active:scale-95 transition-transform"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>실시간 길찾기</span>
            </a>
            <button
              onClick={() => setActiveTab('timeline')}
              className="py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors"
            >
              타임라인 바로가기
            </button>
          </div>
        </section>

        {/* 확정된 예약 내역 3건 */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#2D3A4A] flex items-center gap-1.5">
              <span>확정된 예약 내역</span>
              <span className="w-5 h-5 rounded-full bg-[#00A896] text-white text-[11px] font-bold flex items-center justify-center">
                3
              </span>
            </h3>
            <button
              onClick={onOpenBookings}
              className="text-xs font-bold text-[#006a61] hover:underline flex items-center"
            >
              <span>예약 관리</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {/* Card 1: 톤쇼우 줄서기 */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFB85C]/20 flex items-center justify-center text-[#D97706]">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#2D3A4A]">톤쇼우 광안점</span>
                    <span className="text-[10px] font-bold text-[#35C98B] bg-[#35C98B]/15 px-1.5 py-0.2 rounded">
                      원격 줄서기 성공
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">테이블링 대기번호 #42 · 입장 완료</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#35C98B]" />
            </div>

            {/* Card 2: 미디어아트전 모바일 티켓 */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4A7DFF]/15 flex items-center justify-center text-[#4A7DFF]">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#2D3A4A]">밀락더마켓 미디어아트전</span>
                    <span className="text-[10px] font-bold text-[#4A7DFF] bg-[#4A7DFF]/15 px-1.5 py-0.2 rounded">
                      모바일 바코드
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">14:15 예약 확정 · 즉시 입장 가능</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#35C98B]" />
            </div>

            {/* Card 3: 광안리 오션뷰 부티크 호텔 */}
            <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#39D9C8]/20 flex items-center justify-center text-[#006a61]">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#2D3A4A]">광안리 오션뷰 부티크 호텔</span>
                    <span className="text-[10px] font-bold text-[#006a61] bg-[#39D9C8]/20 px-1.5 py-0.2 rounded">
                      체크인 15:00
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">디럭스 더블 오션뷰 · 바우처 완료</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#35C98B]" />
            </div>
          </div>
        </section>

        {/* 상세 타임라인 (Tab switch or below) */}
        <section className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#2D3A4A]">상세 일정 타임라인</h3>
            <span className="text-[11px] text-gray-400">총 4개 일정 완벽 연결</span>
          </div>

          <div className="space-y-4 pt-1">
            {trip.stops.map((stop, sIdx) => {
              const isPast = sIdx === 0;
              const isCurrent = sIdx === 1;
              return (
                <div key={stop.id || sIdx} className="relative pl-6 pb-2 last:pb-0">
                  {/* Vertical bar */}
                  {sIdx < trip.stops.length - 1 && (
                    <div
                      className={`absolute left-2.5 top-4 bottom-0 w-0.5 ${
                        isPast ? 'bg-[#35C98B]' : 'bg-[#39D9C8]/40'
                      }`}
                    />
                  )}

                  {/* Marker Circle */}
                  <div
                    className={`absolute left-0 top-1 w-5 h-5 rounded-full font-extrabold text-[10px] flex items-center justify-center ring-2 ring-white ${
                      isPast
                        ? 'bg-[#35C98B] text-white'
                        : isCurrent
                        ? 'bg-[#39D9C8] text-[#2D3A4A] ring-4 ring-[#39D9C8]/30'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {isPast ? '✓' : sIdx + 1}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2D3A4A] flex items-center gap-1.5">
                        <span>{stop.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold bg-[#39D9C8] text-[#2D3A4A] px-1.5 py-0.2 rounded">
                            현재 장소
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-500">
                        {stop.timeSlot || '12:00'}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-500 mt-1">{stop.summary || stop.address}</p>

                    {stop.tip && (
                      <div className="mt-2 text-[11px] font-medium text-[#006a61] bg-[#39D9C8]/15 px-2.5 py-1 rounded-lg">
                        💡 {stop.tip}
                      </div>
                    )}
                  </div>

                  {stop.transitToNext && (
                    <div className="my-2 ml-2 text-[11px] font-bold text-gray-500 flex items-center gap-1.5">
                      <Footprints className="w-3.5 h-3.5 text-[#00A896]" />
                      <span>{stop.transitToNext.note || '도보 7분'}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Summary Card */}
        <section className="bg-gray-100 rounded-2xl p-4 flex items-center justify-around text-center text-xs font-semibold">
          <div>
            <div className="text-gray-400 text-[11px]">총 도보거리</div>
            <div className="text-[#2D3A4A] font-extrabold text-sm mt-0.5">
              {trip.summary.totalWalkDistance}
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <div className="text-gray-400 text-[11px]">총 소요 시간</div>
            <div className="text-[#2D3A4A] font-extrabold text-sm mt-0.5">
              {trip.summary.totalDuration}
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <div className="text-gray-400 text-[11px]">예상 식음료비</div>
            <div className="text-[#2D3A4A] font-extrabold text-sm mt-0.5">
              {trip.summary.totalCost}
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Sticky Action */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-4 py-3 border-t border-gray-200 shadow-lg">
        <button
          onClick={onOpenShareModal}
          className="w-full h-[50px] rounded-full bg-[#39D9C8] hover:bg-[#32c9b9] text-[#2D3A4A] font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#39D9C8]/25 transition-all active:scale-98"
        >
          <Share2 className="w-4 h-4" />
          <span>일정 친구와 공유하기</span>
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#2D3A4A] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg z-50 animate-fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#39D9C8]" />
          <span>여행 일정 링크가 클립보드에 복사되었습니다!</span>
        </div>
      )}
    </div>
  );
};
