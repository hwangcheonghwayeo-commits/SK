import React, { useState } from 'react';
import {
  ArrowLeft,
  Plane,
  Hotel,
  Ticket,
  Sparkles,
  Star,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface ExploreHotelScreenProps {
  onBack: () => void;
  onOpenBookings?: () => void;
}

export const ExploreHotelScreen: React.FC<ExploreHotelScreenProps> = ({ onBack, onOpenBookings }) => {
  const [selectedCity, setSelectedCity] = useState<'busan' | 'tokyo' | 'jeju'>('busan');

  return (
    <div className="flex-1 flex flex-col relative pb-28">
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
          <h1 className="text-base font-extrabold text-[#2D3A4A] tracking-tight">
            AI 동선 연계 호텔 & 패스
          </h1>
          <span className="text-[11px] text-[#00A896] font-bold">일정 최적화 숙소</span>
        </div>
        {onOpenBookings ? (
          <button
            onClick={onOpenBookings}
            className="flex items-center gap-1 text-[11px] font-bold text-[#006a61] bg-[#39D9C8]/15 px-2 py-1 rounded-full"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>예약센터</span>
          </button>
        ) : (
          <div className="w-8" />
        )}
      </header>

      {/* Main Content */}
      <main className="px-4 pt-4 space-y-4">
        {/* City Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
          {[
            { id: 'busan', label: '부산 광안리/해운대' },
            { id: 'tokyo', label: '도쿄 4박 5일 인기' },
            { id: 'jeju', label: '제주 애월/서귀포' },
          ].map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCity === city.id
                  ? 'bg-[#2D3A4A] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {city.label}
            </button>
          ))}
        </div>

        {/* Hero Hint */}
        <section className="bg-gradient-to-r from-[#18202A] to-[#2D3A4A] text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#39D9C8]/20 text-[#39D9C8] text-[11px] font-bold mb-1">
            <Sparkles className="w-3 h-3 text-[#39D9C8]" />
            <span>AI 코스 마침표 추천</span>
          </div>
          <h2 className="text-sm font-extrabold text-white">
            {selectedCity === 'busan'
              ? '광안리 일정 종료지 도보 3분 거리 오션뷰 특가'
              : selectedCity === 'tokyo'
              ? '신주쿠 & 시부야 AI 동선 99% 매칭 숙소와 직항편'
              : '애월 카페거리 도보 산책 힐링 풀빌라'}
          </h2>
          <p className="text-[11px] text-gray-300 mt-1">
            일정 이동 시간을 줄여 여행의 피로도를 절반으로 줄여드립니다.
          </p>
        </section>

        {/* Listings */}
        <div className="space-y-3">
          {selectedCity === 'busan' && (
            <>
              {/* Hotel 1: 광안리 호텔 에이치 */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200 shadow-2xs space-y-2">
                <div className="relative rounded-xl overflow-hidden h-36">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=80"
                    alt="광안리 오션뷰 호텔"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#2D3A4A]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    동선 종료지 도보 3분
                  </span>
                  <span className="absolute top-2.5 right-2.5 bg-[#FF5C5C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    38% 특가
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#2D3A4A]">광안리 오션뷰 호텔 에이치</h3>
                    <p className="text-xs text-gray-500">디럭스 더블 (광안대교 파노라마 뷰)</p>
                    <div className="flex items-center gap-1 text-[11px] text-[#D97706] font-bold mt-1">
                      <Star className="w-3.5 h-3.5 fill-[#FFB85C] text-[#FFB85C]" />
                      <span>4.9 (리뷰 1,280개)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] line-through text-gray-400 block">220,000원</span>
                    <span className="text-base font-extrabold text-[#FF5C5C]">148,000원~</span>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-[#39D9C8]/15 hover:bg-[#39D9C8]/25 text-[#006a61] text-xs font-bold transition-colors flex items-center justify-center gap-1">
                  <span>아고다·여기어때 최저가 예약 조회</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Hotel 2: 영도 라발스 호텔 */}
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200 shadow-2xs space-y-2">
                <div className="relative rounded-xl overflow-hidden h-36">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=80"
                    alt="영도 라발스 호텔"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#2D3A4A]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    영도 포차거리 인접
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#2D3A4A]">영도 라발스 호텔</h3>
                    <p className="text-xs text-gray-500">스탠다드 코너 하버뷰</p>
                    <div className="flex items-center gap-1 text-[11px] text-[#D97706] font-bold mt-1">
                      <Star className="w-3.5 h-3.5 fill-[#FFB85C] text-[#FFB85C]" />
                      <span>4.8 (리뷰 940개)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] line-through text-gray-400 block">160,000원</span>
                    <span className="text-base font-extrabold text-[#FF5C5C]">118,000원~</span>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-[#39D9C8]/15 hover:bg-[#39D9C8]/25 text-[#006a61] text-xs font-bold transition-colors flex items-center justify-center gap-1">
                  <span>실시간 예약 가능 객실 보기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}

          {selectedCity === 'tokyo' && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[11px] font-bold">
                    항공 특가
                  </span>
                  <span className="text-xs font-extrabold text-[#FF5C5C]">289,000원~</span>
                </div>
                <h3 className="text-sm font-extrabold text-[#2D3A4A]">인천(ICN) ↔ 도쿄 나리타(NRT) 직항</h3>
                <p className="text-xs text-gray-500">티웨이항공 / 진에어 왕복 특가</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[11px] font-bold">
                    호텔
                  </span>
                  <span className="text-xs font-extrabold text-[#FF5C5C]">1박 162,000원~</span>
                </div>
                <h3 className="text-sm font-extrabold text-[#2D3A4A]">신주쿠 그란벨 호텔</h3>
                <p className="text-xs text-gray-500">히가시신주쿠역 도보 4분 · 도쿄 AI 동선 99%</p>
              </div>
            </div>
          )}

          {selectedCity === 'jeju' && (
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[11px] font-bold">
                  독채 스테이
                </span>
                <span className="text-xs font-extrabold text-[#FF5C5C]">195,000원~</span>
              </div>
              <h3 className="text-sm font-extrabold text-[#2D3A4A]">애월 한담 스테이 풀빌라</h3>
              <p className="text-xs text-gray-500">노을 명소 카페거리 도보 5분 · 프라이빗 자쿠지</p>
            </div>
          )}
        </div>

        {/* Link to Booking Screen */}
        {onOpenBookings && (
          <div
            onClick={onOpenBookings}
            className="bg-gradient-to-r from-[#1E293B] to-[#2D3A4A] text-white p-4 rounded-2xl cursor-pointer hover:border-[#39D9C8] border border-slate-700/50 shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#39D9C8]/20 flex items-center justify-center text-[#39D9C8]">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">일정 연계 맛집 줄서기 & 입장권</h4>
                  <p className="text-[11px] text-gray-300">톤쇼우 대기 0분 예약 및 밀락더마켓 티켓</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#39D9C8]">예약센터 &gt;</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
