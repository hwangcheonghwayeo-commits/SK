import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  RotateCw,
  Map as MapIcon,
  List,
  Sparkles,
  Navigation,
  ZoomIn,
  ZoomOut,
  Locate,
  Clock,
  Footprints,
  Wallet,
  Check,
  ChevronRight,
  Plus,
  ArrowRight,
  ExternalLink,
  Info,
} from 'lucide-react';
import { CourseOption, Place } from '../../types';

interface RecommendedCourseScreenProps {
  courses: CourseOption[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
  onConfirmCourse: (course: CourseOption) => void;
  onBack: () => void;
  onReoptimize: (newPlaceName?: string) => Promise<void>;
  isReoptimizing: boolean;
  onOpenShareModal: () => void;
}

export const RecommendedCourseScreen: React.FC<RecommendedCourseScreenProps> = ({
  courses,
  selectedCourseId,
  onSelectCourse,
  onConfirmCourse,
  onBack,
  onReoptimize,
  isReoptimizing,
  onOpenShareModal,
}) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [activePinIndex, setActivePinIndex] = useState<number>(0);
  const [newPlaceInput, setNewPlaceInput] = useState('');
  const [mapZoom, setMapZoom] = useState(1);

  const currentCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0] || ({} as CourseOption);
  const activePinPlace = currentCourse.stops?.[activePinIndex] || currentCourse.stops?.[0];

  const handleAddCustomPlace = async (placeName: string) => {
    if (!placeName.trim()) return;
    await onReoptimize(placeName.trim());
    setNewPlaceInput('');
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
          <h1 className="text-base font-extrabold text-[#2D3A4A] tracking-tight">AI 추천 코스</h1>
          <span className="text-[11px] text-[#00A896] font-bold">광안리 맞춤 여행 3가지</span>
        </div>
        <div className="flex items-center gap-1 -mr-1">
          <button
            onClick={() => onReoptimize()}
            aria-label="재계산"
            title="AI 재계산"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-[#2D3A4A]"
          >
            <RotateCw className={`w-4 h-4 ${isReoptimizing ? 'animate-spin text-[#00A896]' : ''}`} />
          </button>
          <button
            onClick={onOpenShareModal}
            aria-label="공유"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-[#2D3A4A]"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-3 space-y-4">
        {/* Title Announcement */}
        <div>
          <span className="text-xs font-bold text-[#00A896] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>저장된 {currentCourse.stops?.length || 4}곳을 완벽하게 연결했어요</span>
          </span>
          <h2 className="text-lg font-extrabold text-[#2D3A4A] mt-0.5">
            맞춤 여행 코스 3가지 중 선택하세요
          </h2>
        </div>

        {/* View Mode Toggle: [지도 중심 뷰] / [상세 리스트] */}
        <div className="flex items-center justify-between">
          <div className="bg-gray-100 p-1 rounded-full flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setViewMode('map')}
              className={`py-1.5 px-3 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-[#2D3A4A] shadow-xs'
                  : 'text-gray-500 hover:text-[#2D3A4A]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 text-[#00A896]" />
              <span>지도 중심 뷰</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`py-1.5 px-3 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-[#2D3A4A] shadow-xs'
                  : 'text-gray-500 hover:text-[#2D3A4A]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>상세 리스트</span>
            </button>
          </div>
          <span className="text-xs text-gray-400 font-medium">전체보기</span>
        </div>

        {/* Visual Interactive Map (Matches Image 12) */}
        {viewMode === 'map' && (
          <div className="relative rounded-[24px] overflow-hidden border border-gray-200 bg-[#EEF5F8] shadow-sm select-none">
            {/* SVG Map Canvas */}
            <div
              className="relative w-full h-[270px] overflow-hidden transition-transform duration-200"
              style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }}
            >
              <svg viewBox="0 0 360 270" className="w-full h-full">
                {/* Land background */}
                <rect width="360" height="270" fill="#E8F1F2" />

                {/* Ocean Area */}
                <path
                  d="M 0 160 Q 90 140 180 170 T 360 150 L 360 270 L 0 270 Z"
                  fill="#D4EDFA"
                />

                {/* Sandy Beach Band */}
                <path
                  d="M 0 156 Q 90 136 180 166 T 360 146"
                  stroke="#FFE6A7"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Beach Label */}
                <text x="135" y="195" fill="#3D7E9A" fontSize="11" fontWeight="700" opacity="0.85">
                  광안리 해수욕장
                </text>

                {/* Gwangan Bridge (Dashed Curve in Ocean) */}
                <path
                  d="M 20 220 Q 180 200 340 235"
                  stroke="#3B82F6"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  fill="none"
                  opacity="0.8"
                />
                <text x="150" y="242" fill="#2563EB" fontSize="10" fontWeight="bold">
                  광안대교
                </text>

                {/* City Streets & Grid lines */}
                <line x1="20" y1="40" x2="340" y2="40" stroke="#CBD5E1" strokeWidth="2.5" />
                <line x1="40" y1="90" x2="320" y2="90" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="60" y1="20" x2="60" y2="150" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="150" y1="20" x2="150" y2="150" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="240" y1="20" x2="240" y2="150" stroke="#CBD5E1" strokeWidth="2" />

                {/* AI Route Curve (Glowing Mint Path) */}
                <path
                  d={
                    currentCourse.svgRoutePath ||
                    'M 62 70 Q 120 54 146 102 T 235 118 T 282 82'
                  }
                  stroke="#39D9C8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="drop-shadow-sm"
                />

                {/* Walking Time Badges on Paths */}
                <g transform="translate(100, 52)">
                  <rect width="66" height="18" rx="9" fill="white" stroke="#39D9C8" strokeWidth="1.5" />
                  <text x="33" y="12.5" fill="#2D3A4A" fontSize="9" fontWeight="bold" textAnchor="middle">
                    도보 6분 · 410m
                  </text>
                </g>

                <g transform="translate(178, 92)">
                  <rect width="68" height="18" rx="9" fill="white" stroke="#39D9C8" strokeWidth="1.5" />
                  <text x="34" y="12.5" fill="#2D3A4A" fontSize="9" fontWeight="bold" textAnchor="middle">
                    도보 9분 · 580m
                  </text>
                </g>

                <g transform="translate(245, 82)">
                  <rect width="66" height="18" rx="9" fill="white" stroke="#39D9C8" strokeWidth="1.5" />
                  <text x="33" y="12.5" fill="#2D3A4A" fontSize="9" fontWeight="bold" textAnchor="middle">
                    도보 7분 · 480m
                  </text>
                </g>

                {/* Stop Markers */}
                {currentCourse.stops?.map((stop, sIdx) => {
                  const x = stop.mapPos?.x || 60 + sIdx * 75;
                  const y = stop.mapPos?.y || 70 + (sIdx % 2) * 35;
                  const isActive = activePinIndex === sIdx;

                  return (
                    <g
                      key={stop.id || sIdx}
                      className="cursor-pointer"
                      onClick={() => setActivePinIndex(sIdx)}
                    >
                      {/* Outer pulse if active */}
                      {isActive && (
                        <circle cx={x} cy={y} r="18" fill="#39D9C8" opacity="0.3" className="animate-ping" />
                      )}

                      {/* Pin Circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill={isActive ? '#00A896' : '#2D3A4A'}
                        stroke="white"
                        strokeWidth="2.5"
                      />
                      <text
                        x={x}
                        y={y + 4}
                        fill="white"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {sIdx + 1}
                      </text>

                      {/* Stop Label Banner */}
                      <text
                        x={x}
                        y={y - 15}
                        fill="#1F2937"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="bg-white"
                      >
                        {stop.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Floating Active Pin Card (Matches Image 12) */}
            {activePinPlace && (
              <div className="absolute top-2.5 left-2.5 right-12 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-md border border-gray-100 flex items-center justify-between">
                <div className="min-w-0 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#39D9C8] text-[#2D3A4A] font-extrabold text-xs flex items-center justify-center shrink-0">
                    {activePinIndex + 1}
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-bold text-[#2D3A4A] truncate block">
                      {activePinPlace.name}
                    </span>
                    <span className="text-[10px] text-gray-500 truncate block">
                      체류 {activePinPlace.stayMinutes || 60}분 · {activePinPlace.waitingNote || '대기 없음'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      activePinPlace.name + ' ' + activePinPlace.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-[10px] font-bold text-gray-700 flex items-center gap-1"
                  >
                    <span>구글맵</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href={`https://map.naver.com/p/search/${encodeURIComponent(activePinPlace.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 rounded-lg bg-[#03C75A]/15 hover:bg-[#03C75A]/25 text-[10px] font-bold text-[#03C75A] flex items-center gap-1"
                  >
                    <span>길안내</span>
                  </a>
                </div>
              </div>
            )}

            {/* Map Controls */}
            <div className="absolute bottom-12 right-2.5 flex flex-col gap-1">
              <button
                onClick={() => setMapZoom((prev) => Math.min(prev + 0.15, 1.4))}
                aria-label="확대"
                className="w-7 h-7 rounded-xl bg-white shadow-md text-gray-700 flex items-center justify-center hover:bg-gray-50"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setMapZoom((prev) => Math.max(prev - 0.15, 0.85))}
                aria-label="축소"
                className="w-7 h-7 rounded-xl bg-white shadow-md text-gray-700 flex items-center justify-center hover:bg-gray-50"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setMapZoom(1);
                  setActivePinIndex(0);
                }}
                aria-label="내 위치"
                className="w-7 h-7 rounded-xl bg-white shadow-md text-[#00A896] flex items-center justify-center hover:bg-gray-50"
              >
                <Locate className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Map Bottom Transit Info Strip */}
            <div className="bg-white/95 backdrop-blur-md px-3 py-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-[#00A896]" />
                <span className="text-[#2D3A4A]">
                  총 이동 {currentCourse.totalDistanceStr || '1.8km'} · {currentCourse.transitDurationStr || '22분'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#006a61] bg-[#39D9C8]/15 px-2 py-0.5 rounded-full font-bold">
                  {currentCourse.highlightPill || '최소 이동 최적화'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3 Course Option Selection Tabs */}
        <div className="space-y-3">
          {courses.map((course) => {
            const isSelected = course.id === selectedCourseId;
            return (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course.id)}
                className={`rounded-[22px] p-4 transition-all cursor-pointer border-2 shadow-2xs ${
                  isSelected
                    ? 'bg-white border-[#39D9C8] ring-2 ring-[#39D9C8]/20 shadow-md'
                    : 'bg-white/80 border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Course Top Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#39D9C8] text-[#2D3A4A]'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {course.badgeTitle || `OPTION ${course.code}`}
                    </span>
                    {course.optimizationScore && (
                      <span className="text-[11px] font-bold text-[#35C98B]">
                        {course.optimizationScore}% 최적화
                      </span>
                    )}
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-[#39D9C8] text-[#2D3A4A]' : 'border-2 border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Course Title & Description */}
                <h3 className="text-base font-extrabold text-[#2D3A4A] mt-2">{course.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{course.subtitle}</p>

                {/* Metrics Pill Row */}
                <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-gray-100 text-xs font-semibold text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00A896]" />
                    <span>{course.totalDurationStr}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Footprints className="w-3.5 h-3.5 text-[#4A7DFF]" />
                    <span>이동 {course.transitDurationStr}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wallet className="w-3.5 h-3.5 text-[#FFB85C]" />
                    <span>{course.estimatedCostStr}</span>
                  </div>
                </div>

                {/* If selected, show expanded itinerary stops */}
                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-3">
                    <div className="text-xs font-bold text-[#2D3A4A]">경로 상세 타임라인</div>
                    <div className="space-y-2">
                      {course.stops?.map((stop, sIdx) => (
                        <div key={stop.id || sIdx} className="relative pl-6 pb-2 last:pb-0">
                          {/* Timeline vertical bar */}
                          {sIdx < (course.stops?.length || 0) - 1 && (
                            <div className="absolute left-2.5 top-3.5 bottom-0 w-0.5 bg-[#39D9C8]/40" />
                          )}
                          {/* Timeline node */}
                          <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-[#39D9C8] text-[#2D3A4A] font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                            {sIdx + 1}
                          </div>

                          <div className="bg-gray-50 rounded-xl p-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#2D3A4A]">{stop.name}</span>
                              <span className="text-[10px] text-gray-400 font-medium">
                                {stop.timeSlot || `${stop.stayMinutes}분`}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-0.5">{stop.address}</p>
                            {stop.tip && (
                              <div className="mt-1.5 text-[10px] font-semibold text-[#006a61] bg-[#39D9C8]/15 px-2 py-0.5 rounded inline-block">
                                💡 {stop.tip}
                              </div>
                            )}
                          </div>

                          {/* Transit node indicator */}
                          {stop.transitToNext && (
                            <div className="my-1.5 ml-2 text-[10px] font-bold text-gray-500 flex items-center gap-1.5">
                              <Footprints className="w-3 h-3 text-[#39D9C8]" />
                              <span>{stop.transitToNext.note || '도보 7분'}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom Place Addition Panel (Matches Image 14) */}
        <section className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-[#2D3A4A] flex items-center gap-1.5">
              <span>새 장소 추가 & 동선 재계산</span>
              <span className="text-[10px] text-[#00A896] bg-[#39D9C8]/20 px-2 py-0.5 rounded-full font-bold">
                AI 연동
              </span>
            </h3>
            <span className="text-[11px] text-gray-400">장소 검색</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="새 장소 검색 (예: 칠링아웃샵 광안점, 드론쇼)"
              value={newPlaceInput}
              onChange={(e) => setNewPlaceInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomPlace(newPlaceInput)}
              className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#2D3A4A] focus:outline-none focus:border-[#39D9C8]"
            />
            <button
              onClick={() => handleAddCustomPlace(newPlaceInput)}
              disabled={isReoptimizing}
              className="px-3 py-2 bg-[#2D3A4A] hover:bg-gray-800 text-white rounded-xl text-xs font-bold shrink-0 transition-colors"
            >
              추가
            </button>
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              '+ 칠링아웃샵 광안점',
              '+ 밀락더마켓 LP바',
              '+ 광안리 드론쇼 명당',
              '+ 랜디스도넛',
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => handleAddCustomPlace(tag.replace('+ ', ''))}
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#39D9C8]/20 text-[11px] font-semibold text-gray-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => onReoptimize()}
              disabled={isReoptimizing}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#39D9C8]/20 to-[#4A7DFF]/20 text-[#006a61] text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00A896]" />
              <span>{isReoptimizing ? '동선 재계산 중...' : 'AI 최적 동선 재계산'}</span>
            </button>
          </div>
        </section>
      </main>

      {/* Bottom Sticky Confirmation Bar */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-4 py-3 border-t border-gray-200 flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[11px] font-bold text-[#006a61] bg-[#39D9C8]/20 px-2 py-0.5 rounded">
            {currentCourse.badgeTitle?.split(' · ')[0] || 'OPTION A'} 선택됨
          </span>
          <div className="text-xs font-extrabold text-[#2D3A4A] mt-0.5">
            {currentCourse.stops?.length || 4}개 장소 · {currentCourse.totalDurationStr}
          </div>
        </div>

        <button
          onClick={() => onConfirmCourse(currentCourse)}
          className="h-[50px] px-6 rounded-full bg-[#39D9C8] hover:bg-[#32c9b9] text-[#2D3A4A] font-extrabold text-sm flex items-center gap-2 shadow-md shadow-[#39D9C8]/30 transition-all active:scale-95"
        >
          <span>이 코스로 일정 확정</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
