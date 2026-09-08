import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Ticket,
  Bed,
  Plane,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  RotateCw,
  ExternalLink,
  X,
  Share2,
  Copy,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { BookingItem } from '../../types';

interface MyReservationsScreenProps {
  onBack: () => void;
  onOpenTripDetail?: () => void;
  onGoToBookingCenter?: () => void;
}

export const mockAllReservations: BookingItem[] = [
  {
    id: 'res-1',
    placeId: 'hotel-1',
    placeName: '광안리 센트럴오션뷰 호텔',
    categoryTag: '숙소 예약',
    servicePartner: 'RouteMate x Trip.com',
    type: 'hotel',
    title: '광안리 센트럴오션뷰 호텔',
    subtitle: '디럭스 더블 오션뷰 (전 객실 광안대교 뷰)',
    badge: 'D-3 체크인',
    dateStr: '2024.10.24(목) - 10.26(토) · 2박',
    timeSlot: '체크인 15:00 ~ 체크아웃 11:00',
    price: 136400,
    status: 'confirmed',
    actionText: '모바일 체크인 & 바코드',
    isSelected: true,
    bookingCode: 'RM-202410-H0129',
    barcodeNumber: '8801948271038472',
    guestCount: '성인 2명 · 객실 1개',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'res-2',
    placeId: 'flight-1',
    placeName: '에어부산 BX8811',
    categoryTag: '항공권',
    servicePartner: '에어부산 직항',
    type: 'flight',
    title: '서울/김포(GMP) → 부산/김해(PUS)',
    subtitle: '스마트 일반석 · 좌석 14A, 14B',
    badge: 'D-3 탑승',
    dateStr: '2024.10.24(목)',
    timeSlot: '출발 08:30 - 도착 09:30',
    price: 68500,
    status: 'confirmed',
    actionText: '모바일 탑승권',
    isSelected: true,
    bookingCode: 'BX-994821-PUS',
    barcodeNumber: '7394820194729184',
    seatInfo: '14A, 14B',
    guestCount: '성인 2명',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'res-3',
    placeId: 'place-tonshou',
    placeName: '톤쇼우 광안점',
    categoryTag: '맛집 원격 줄서기',
    servicePartner: '테이블링 실시간 연동',
    type: 'queue',
    title: '톤쇼우 광안점 원격 대기표',
    subtitle: '버크셔K 특로스카츠 2인 예약 연계',
    badge: '대기 7번 (예상 25분)',
    dateStr: '2024.10.24(목)',
    timeSlot: '입장 예상 12:40 (알림 발송 예정)',
    status: 'confirmed',
    actionText: '원격 대기 순번 확인',
    isSelected: true,
    bookingCode: 'TBL-TON-007',
    barcodeNumber: '9948210482910',
    guestCount: '2명 (창가석 우선)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY1HKdhV42-XFT6SRlqXd35A_IhdAkJGo8rXFchshqPCPhMifeG896DjpbH9IHuaK44oujQBDk60I7SCjC9uDO6qYIcL0gK5wQ_FyH4giIWlLK1K1K3rSSZutyJLXdFATzXw7wYg-W6Nuoa72QjhAJtAkh1dWIC9dDnMxoqoIgxIOBCjY0sB1S6R3dpORZe1l-SG_QRGvq2Po5N0LO7j--UCJkpEsi7f66Chtaoi2mW7SzoRNVrYtlTw',
  },
  {
    id: 'res-4',
    placeId: 'place-millac',
    placeName: '밀락더마켓 복합문화공간 올패스',
    categoryTag: '투어 & 입장권',
    servicePartner: '밀락더마켓 x 네이버예약',
    type: 'ticket',
    title: '밀락더마켓 1일 올패스 + 식음료 1만원권',
    subtitle: '모바일 바코드 현장 태그 입장',
    badge: '사용 완료',
    dateStr: '2024.09.15(일)',
    timeSlot: '이용 시간 15:30 (입장 처리됨)',
    price: 15000,
    status: 'used',
    usedAt: '2024.09.15 15:30 (현장 게이트 태그 완료)',
    actionText: '사용 완료된 티켓',
    isSelected: false,
    bookingCode: 'MLK-PASS-88210',
    barcodeNumber: '88039201948291',
    guestCount: '성인 2명',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn4SalnsCdbOQwJjYlE15x0Awo8B0E6iJ1PoUKK-sBwI-0fo6JQrbzqPzMeQ_BraaR7Gj95lFzh7U5XKqe59SAr-BksM-qZ83tzmYG1o81x9voNGmtWXOQr-YPUuOhy22GW9myJMAt0_Cnw4fO3KcSqV5mn1naWb3uaqEULtwMorxXIGL50tyt3OxYrl2_32ZwhZfYD8HvD5mXjS7Dnj4YWwQs4p3uFTqcs4DSOK0sRIvul-kLIduOGg',
  },
  {
    id: 'res-5',
    placeId: 'place-blueline',
    placeName: '해운대 블루라인파크 해변열차',
    categoryTag: '모바일 탑승권',
    servicePartner: '블루라인파크 공식 제휴',
    type: 'ticket',
    title: '미포 ↔ 송정 왕복 해변열차 2인 탑승권',
    subtitle: '송정 정거장 회차 자유 이용',
    badge: '사용 완료',
    dateStr: '2024.08.20(화)',
    timeSlot: '탑승 시간 14:00 (검표 완료)',
    price: 24000,
    status: 'used',
    usedAt: '2024.08.20 14:02 (미포 정거장 탑승 완료)',
    actionText: '사용 완료된 티켓',
    isSelected: false,
    bookingCode: 'BLP-20240820-991',
    barcodeNumber: '77291039482910',
    guestCount: '일반 2명',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
  },
];

export const MyReservationsScreen: React.FC<MyReservationsScreenProps> = ({
  onBack,
  onOpenTripDetail,
  onGoToBookingCenter,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'used'>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'hotel' | 'flight' | 'ticket'>('all');
  const [selectedBarcodeTicket, setSelectedBarcodeTicket] = useState<BookingItem | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const filteredReservations = mockAllReservations.filter((item) => {
    // Status Filter
    if (filter === 'active' && item.status === 'used') return false;
    if (filter === 'used' && item.status !== 'used') return false;

    // Category Filter
    if (activeCategory === 'hotel' && item.type !== 'hotel') return false;
    if (activeCategory === 'flight' && item.type !== 'flight') return false;
    if (activeCategory === 'ticket' && (item.type === 'hotel' || item.type === 'flight')) return false;

    return true;
  });

  const activeCount = mockAllReservations.filter((i) => i.status !== 'used').length;
  const usedCount = mockAllReservations.filter((i) => i.status === 'used').length;

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7F9FA] text-[#2D3A4A] relative pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 h-14 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={onBack}
          aria-label="뒤로가기"
          className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-[#2D3A4A] hover:bg-gray-100 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base font-extrabold text-[#2D3A4A] tracking-tight">
          나의 예약 &amp; 티켓 보관함
        </h1>

        {onGoToBookingCenter ? (
          <button
            onClick={onGoToBookingCenter}
            className="text-xs font-bold text-[#006a61] bg-[#39D9C8]/20 px-2.5 py-1 rounded-full hover:bg-[#39D9C8]/30 transition-colors"
          >
            예약하기 +
          </button>
        ) : (
          <div className="w-9" />
        )}
      </header>

      {/* Main Content */}
      <main className="px-4 pt-4 space-y-4">
        {/* Status Summary Banner */}
        <section className="bg-gradient-to-br from-[#1E293B] to-[#2D3A4A] text-white rounded-[24px] p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#39D9C8] animate-pulse" />
              <span className="text-xs font-bold text-[#39D9C8]">동선 연계 스마트 티켓</span>
            </div>
            <span className="text-[11px] text-gray-300">총 {mockAllReservations.length}건 보관 중</span>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10">
            <div>
              <p className="text-xs text-gray-300">이용 예정 티켓</p>
              <h2 className="text-xl font-black text-white mt-0.5">
                {activeCount}
                <span className="text-xs font-normal text-gray-300 ml-1">건</span>
              </h2>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-xs text-gray-300">사용 완료 티켓</p>
              <h2 className="text-xl font-black text-gray-300 mt-0.5">
                {usedCount}
                <span className="text-xs font-normal text-gray-400 ml-1">건</span>
              </h2>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-xs text-gray-300">AI 동선 연계</p>
              <h2 className="text-xl font-black text-[#39D9C8] mt-0.5">
                100
                <span className="text-xs font-normal text-gray-300 ml-1">%</span>
              </h2>
            </div>
          </div>
        </section>

        {/* Filter Segment Tabs */}
        <section className="space-y-2">
          {/* Active vs Used Segment */}
          <div className="bg-gray-200/80 p-1 rounded-2xl flex text-xs font-extrabold">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-white text-[#2D3A4A] shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              전체 ({mockAllReservations.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                filter === 'active'
                  ? 'bg-white text-[#006a61] shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              이용 예정 ({activeCount})
            </button>
            <button
              onClick={() => setFilter('used')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                filter === 'used'
                  ? 'bg-white text-gray-700 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              사용 완료 ({usedCount})
            </button>
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
            {[
              { id: 'all', label: '모든 종류' },
              { id: 'hotel', label: '🏨 숙소' },
              { id: 'flight', label: '✈️ 항공권' },
              { id: 'ticket', label: '🎟️ 티켓/줄서기' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#2D3A4A] text-white shadow-2xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Reservations List */}
        <section className="space-y-3">
          {filteredReservations.length === 0 ? (
            <div className="bg-white rounded-[24px] p-8 text-center space-y-2 border border-gray-200">
              <Ticket className="w-8 h-8 text-gray-300 mx-auto" />
              <p className="text-sm font-bold text-gray-500">해당하는 예약 내역이 없습니다.</p>
              <p className="text-xs text-gray-400">새로운 여행지 숙소나 티켓을 예약해 보세요.</p>
            </div>
          ) : (
            filteredReservations.map((item) => {
              const isUsed = item.status === 'used';

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-[24px] border transition-all overflow-hidden relative shadow-2xs ${
                    isUsed
                      ? 'border-gray-200 bg-gray-50/70 opacity-90'
                      : 'border-gray-200 hover:border-[#39D9C8] hover:shadow-xs'
                  }`}
                >
                  {/* Top Bar with Status */}
                  <div
                    className={`px-4 py-2.5 flex items-center justify-between border-b ${
                      isUsed ? 'bg-gray-100/70 border-gray-200' : 'bg-[#F0FCFA] border-[#39D9C8]/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                          isUsed
                            ? 'bg-gray-300 text-gray-700'
                            : item.type === 'hotel'
                            ? 'bg-[#39D9C8] text-[#2D3A4A]'
                            : item.type === 'flight'
                            ? 'bg-[#4A7DFF] text-white'
                            : 'bg-[#FFB85C] text-[#2D3A4A]'
                        }`}
                      >
                        {item.categoryTag}
                      </span>
                      <span className="text-[11px] font-bold text-gray-500">
                        {item.servicePartner}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isUsed ? (
                        <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-[10px] font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-gray-500" />
                          <span>사용 완료</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[#35C98B]/20 text-[#1E7D52] text-[10px] font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#35C98B]" />
                          <span>{item.badge || '예약 확정'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="p-4 space-y-3 relative">
                    {/* USED Watermark Stamp if used */}
                    {isUsed && (
                      <div className="absolute right-4 top-4 pointer-events-none rotate-[-12deg] border-2 border-gray-400/50 rounded-xl px-3 py-1 text-gray-400 font-mono font-black text-xs tracking-widest uppercase bg-white/60 backdrop-blur-2xs">
                        USED / 사용완료
                      </div>
                    )}

                    <div className="flex gap-3 items-start">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className={`w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100 ${
                            isUsed ? 'grayscale contrast-75' : ''
                          }`}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-sm font-extrabold truncate ${
                            isUsed ? 'text-gray-600 line-through' : 'text-[#2D3A4A]'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{item.subtitle}</p>

                        {/* Reservation Details */}
                        <div className="mt-2 space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="font-semibold">{item.dateStr}</span>
                          </div>
                          {item.timeSlot && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <span>{item.timeSlot}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Booking Code & Price Bar */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-gray-400 font-mono text-[11px]">
                        <span>예약번호:</span>
                        <span className="font-bold text-gray-700">{item.bookingCode}</span>
                      </div>

                      {item.price && (
                        <div className="font-black text-sm text-[#2D3A4A]">
                          ₩{item.price.toLocaleString()}
                        </div>
                      )}
                    </div>

                    {/* Used Notice / Active Action */}
                    {isUsed ? (
                      <div className="bg-gray-100 p-2.5 rounded-xl text-[11px] text-gray-500 flex items-center justify-between">
                        <span>{item.usedAt || '사용 처리 완료된 티켓입니다.'}</span>
                        <button
                          onClick={() => setSelectedBarcodeTicket(item)}
                          className="text-[11px] font-bold text-gray-600 hover:text-[#2D3A4A] underline"
                        >
                          영수증 보기
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setSelectedBarcodeTicket(item)}
                          className="flex-1 h-11 rounded-2xl bg-[#39D9C8] hover:bg-[#32c9b9] text-[#2D3A4A] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>{item.actionText}</span>
                        </button>

                        {onOpenTripDetail && (
                          <button
                            onClick={onOpenTripDetail}
                            className="h-11 px-3.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center justify-center gap-1 transition-colors"
                            title="동선 확인"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#39D9C8]" />
                            <span>동선</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>

      {/* Barcode / QR Ticket Detail Modal */}
      {selectedBarcodeTicket && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full overflow-hidden shadow-2xl animate-scale-up text-[#2D3A4A]">
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-[#2D3A4A] to-[#1E293B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#39D9C8]" />
                <h3 className="text-sm font-extrabold">모바일 티켓 / 예약 확인서</h3>
              </div>
              <button
                onClick={() => setSelectedBarcodeTicket(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-center">
              <div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#39D9C8]/20 text-[#006a61]">
                  {selectedBarcodeTicket.categoryTag}
                </span>
                <h4 className="text-base font-extrabold text-[#2D3A4A] mt-1">
                  {selectedBarcodeTicket.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">{selectedBarcodeTicket.subtitle}</p>
              </div>

              {/* Barcode & QR Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-dashed border-gray-300 relative">
                {selectedBarcodeTicket.status === 'used' && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-2xs flex flex-col items-center justify-center z-10 rounded-2xl">
                    <span className="px-3 py-1 rounded-lg bg-gray-800 text-white font-mono font-black text-xs tracking-widest">
                      USED / 사용완료
                    </span>
                    <span className="text-[10px] text-gray-500 mt-1">
                      {selectedBarcodeTicket.usedAt}
                    </span>
                  </div>
                )}

                {/* Simulated Barcode Lines */}
                <div className="py-2 flex items-center justify-center gap-0.5 h-16 overflow-hidden">
                  {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9].map(
                    (val, idx) => (
                      <div
                        key={idx}
                        className={`h-14 bg-[#2D3A4A] ${val % 2 === 0 ? 'w-1' : 'w-0.5'} ${
                          val > 6 ? 'opacity-90' : 'opacity-100'
                        }`}
                      />
                    )
                  )}
                </div>

                <div className="font-mono font-bold text-xs tracking-widest text-[#2D3A4A] mt-1">
                  {selectedBarcodeTicket.barcodeNumber || '8809123847291847'}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  게이트 입장 또는 카운터 체크인 시 위 바코드를 제시해 주세요.
                </p>
              </div>

              {/* Info Table */}
              <div className="bg-gray-50 rounded-2xl p-3 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-400">예약번호:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold text-[#2D3A4A]">
                      {selectedBarcodeTicket.bookingCode}
                    </span>
                    <button
                      onClick={() => handleCopyCode(selectedBarcodeTicket.bookingCode || '')}
                      className="text-gray-400 hover:text-gray-700"
                      title="복사"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">일정:</span>
                  <span className="font-semibold text-gray-800">{selectedBarcodeTicket.dateStr}</span>
                </div>

                {selectedBarcodeTicket.seatInfo && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">지정 좌석:</span>
                    <span className="font-extrabold text-[#39D9C8]">
                      {selectedBarcodeTicket.seatInfo}
                    </span>
                  </div>
                )}

                {selectedBarcodeTicket.guestCount && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">이용 인원:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedBarcodeTicket.guestCount}
                    </span>
                  </div>
                )}
              </div>

              {copyFeedback && (
                <p className="text-xs text-[#00A896] font-bold">예약 번호가 복사되었습니다!</p>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedBarcodeTicket(null)}
                className="w-full py-3 rounded-2xl bg-[#2D3A4A] text-white font-extrabold text-xs shadow-md"
              >
                확인 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
