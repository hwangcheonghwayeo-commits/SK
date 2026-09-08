import React, { useState } from 'react';
import { RouteMateLogo } from '../RouteMateLogo';
import {
  User,
  Settings,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  MapPin,
  Bookmark,
  Award,
  CheckCircle2,
  Lock,
  Mail,
  Shield,
  Ticket,
  QrCode,
} from 'lucide-react';
import { MyReservationsScreen } from './MyReservationsScreen';

interface ProfileScreenProps {
  onBackToHome: () => void;
  onOpenTripDetail?: () => void;
  onGoToBookingCenter?: () => void;
  initialShowReservations?: boolean;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBackToHome,
  onOpenTripDetail,
  onGoToBookingCenter,
  initialShowReservations = false,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showReservations, setShowReservations] = useState(initialShowReservations);

  // If user navigated into My Reservations sub-screen
  if (showReservations) {
    return (
      <MyReservationsScreen
        onBack={() => setShowReservations(false)}
        onOpenTripDetail={onOpenTripDetail}
        onGoToBookingCenter={onGoToBookingCenter}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col relative pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 h-14 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <h1 className="text-base font-extrabold text-[#2D3A4A] tracking-tight">
          {isLoggedIn ? '마이페이지' : '로그인 / 시작하기'}
        </h1>
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="text-xs font-bold text-[#006a61] bg-[#39D9C8]/15 px-2.5 py-1 rounded-full hover:bg-[#39D9C8]/25 transition-colors"
        >
          {isLoggedIn ? '로그인 뷰 보기' : '프로필 뷰 보기'}
        </button>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-4 space-y-4">
        {isLoggedIn ? (
          /* Profile Mode (Matches Image 6) */
          <>
            {/* User Profile Card */}
            <section className="bg-white rounded-[24px] p-4 border border-gray-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="프로필 사진"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#39D9C8]"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#39D9C8] text-[#2D3A4A] flex items-center justify-center text-[10px] font-bold">
                    ★
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-base font-extrabold text-[#2D3A4A]">여행하는지우</h2>
                    <span className="text-[10px] font-bold bg-[#FFB85C]/20 text-[#D97706] px-2 py-0.5 rounded-full">
                      탐험가 Lv.3
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">jiwoo_travel@routemate.ai</p>
                  <div className="flex items-center gap-1 text-[11px] text-[#35C98B] font-semibold mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>SNS 보관함 연동됨 (인스타, 네이버)</span>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 text-center">
                <div className="p-2 rounded-xl bg-gray-50">
                  <span className="text-[10px] text-gray-400 font-medium">완료한 여정</span>
                  <div className="text-sm font-extrabold text-[#2D3A4A] mt-0.5">14회</div>
                </div>
                <div className="p-2 rounded-xl bg-gray-50">
                  <span className="text-[10px] text-gray-400 font-medium">저장 장소</span>
                  <div className="text-sm font-extrabold text-[#2D3A4A] mt-0.5">128곳</div>
                </div>
                <div className="p-2 rounded-xl bg-gray-50">
                  <span className="text-[10px] text-gray-400 font-medium">패스포트 스탬프</span>
                  <div className="text-sm font-extrabold text-[#00A896] mt-0.5">9개</div>
                </div>
              </div>
            </section>

            {/* 나의 예약 & 티켓 보관함 배너 (핵심 진입 카드) */}
            <section
              onClick={() => setShowReservations(true)}
              className="bg-gradient-to-r from-[#1E293B] to-[#2D3A4A] text-white rounded-[24px] p-4 shadow-sm border border-slate-700/60 cursor-pointer hover:border-[#39D9C8] transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#39D9C8]/20 flex items-center justify-center text-[#39D9C8] shrink-0">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-white">나의 예약 &amp; 티켓</h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#39D9C8] text-[#2D3A4A] text-[10px] font-black">
                        3건 예정
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">
                      호텔 예약 · 항공권 모바일 탑승권 · 맛집 줄서기
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-xs font-bold text-[#39D9C8] group-hover:translate-x-1 transition-transform">
                  <span>전체보기</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Mini Preview Badges */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39D9C8]" />
                  <span>광안리 센트럴오션뷰 호텔 (D-3)</span>
                </span>
                <span className="text-gray-400">지난 사용 2건 보관</span>
              </div>
            </section>

            {/* Travel DNA Analysis */}
            <section className="bg-gradient-to-br from-white to-[#F0FCFA] rounded-2xl p-4 border border-[#39D9C8]/40 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-[#2D3A4A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00A896]" />
                  <span>지우님의 AI 여행 DNA</span>
                </span>
                <span className="text-[11px] text-[#006a61] font-bold">감성 힐러형</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden flex mb-2">
                <div style={{ width: '45%' }} className="bg-[#39D9C8]" title="감성 카페 45%" />
                <div style={{ width: '30%' }} className="bg-[#4A7DFF]" title="오션뷰 30%" />
                <div style={{ width: '25%' }} className="bg-[#FFB85C]" title="맛집 25%" />
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                <span className="text-[#006a61]">● 감성 카페 45%</span>
                <span className="text-[#4A7DFF]">● 오션뷰 30%</span>
                <span className="text-[#D97706]">● 맛집 25%</span>
              </div>
            </section>

            {/* Setting Menu Items */}
            <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs divide-y divide-gray-100 text-xs font-semibold text-[#2D3A4A]">
              {/* 나의 예약 직접 가기 버튼 */}
              <button
                onClick={() => setShowReservations(true)}
                className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Ticket className="w-4 h-4 text-[#00A896]" />
                  <div>
                    <span className="font-bold text-[#2D3A4A]">나의 예약 및 사용 티켓 내역</span>
                    <span className="text-[10px] text-[#006a61] ml-2 bg-[#39D9C8]/20 px-1.5 py-0.2 rounded font-extrabold">
                      5건
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>예약 필수 개인정보 관리</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span>결제 수단 및 간편 결제 관리</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-gray-500" />
                  <span>알림 및 동선 실시간 브리핑 설정</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-gray-500" />
                  <span>고객센터 및 피드백 보내기</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </section>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="w-full py-3 text-xs font-bold text-gray-400 hover:text-gray-600 text-center"
            >
              로그아웃
            </button>
          </>
        ) : (
          /* Login Screen (Matches Image 2) */
          <div className="flex flex-col items-center justify-center pt-8 text-center space-y-6">
            <RouteMateLogo size="lg" showText={true} />

            <div className="space-y-1.5 px-4">
              <h2 className="text-xl font-extrabold text-[#2D3A4A] tracking-tight">
                여행 계획 스트레스는 그만!
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                SNS에서 저장한 명소 링크만 넣으면
                <br />
                AI가 완벽한 동선 코스를 설계해 드립니다.
              </p>
            </div>

            {/* Social Logins */}
            <div className="w-full space-y-2.5 pt-2">
              {/* Kakao */}
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full h-12 rounded-2xl bg-[#FEE500] hover:bg-[#ebd300] text-[#3C1E1E] text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
              >
                <span className="text-base">💬</span>
                <span>카카오로 3초 만에 시작하기</span>
              </button>

              {/* Naver */}
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full h-12 rounded-2xl bg-[#03C75A] hover:bg-[#02b350] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
              >
                <span className="text-sm font-black">N</span>
                <span>네이버 아이디로 로그인</span>
              </button>

              {/* Apple */}
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full h-12 rounded-2xl bg-[#000000] hover:bg-gray-900 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
              >
                <span className="text-base"></span>
                <span>Apple로 계속하기</span>
              </button>

              {/* Email */}
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full h-12 rounded-2xl bg-white border border-gray-300 hover:bg-gray-50 text-[#2D3A4A] text-xs font-extrabold flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-98"
              >
                <Mail className="w-4 h-4 text-gray-500" />
                <span>이메일로 로그인 / 회원가입</span>
              </button>
            </div>

            <p className="text-[11px] text-gray-400">
              가입 시 RouteMate의 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
