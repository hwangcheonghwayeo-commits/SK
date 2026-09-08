import {demoFetch as fetch} from '../../demoApi';
import React, { useState } from 'react';
import {
  ArrowLeft,
  HelpCircle,
  Link as LinkIcon,
  ClipboardPaste,
  CloudUpload,
  CheckCircle2,
  X,
  SlidersHorizontal,
  Clock,
  Check,
  Plus,
  Sparkles,
  Info,
  Loader2,
  MapPin,
} from 'lucide-react';
import { Place, TravelConditions } from '../../types';

interface CreateCourseScreenProps {
  onBack: () => void;
  onGenerateCourses: (places: Place[], conditions: TravelConditions, customNote: string) => void;
  isGenerating: boolean;
  places: Place[];
  onRemovePlace: (id: string) => void;
  onAddPlace: (place: Place) => void;
}

export const CreateCourseScreen: React.FC<CreateCourseScreenProps> = ({
  onBack,
  onGenerateCourses,
  isGenerating,
  places,
  onRemovePlace,
  onAddPlace,
}) => {
  const [activeTab, setActiveTab] = useState<'places' | 'conditions'>('places');
  const [urlInput, setUrlInput] = useState('https://www.instagram.com/p/C3x9M2_Lp0Q/');
  const [isOcrAnalyzing, setIsOcrAnalyzing] = useState(false);
  const [ocrSuccessMsg, setOcrSuccessMsg] = useState('인스타그램 피드에서 4개 장소 추출 성공');
  const [newPlaceInput, setNewPlaceInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Conditions
  const [duration, setDuration] = useState<'2h' | 'half_day' | 'full_day' | '2d1n'>('half_day');
  const [budget, setBudget] = useState<'under_30k' | 'under_50k' | 'unlimited'>('under_50k');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([
    '#맛집중심',
    '#감성카페',
    '#오션뷰',
  ]);
  const [transport, setTransport] = useState<'minimal' | 'transit' | 'walk'>('minimal');

  const toggleVibe = (vibe: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]
    );
  };

  const handlePasteSample = () => {
    setUrlInput('https://www.instagram.com/p/C4Gwangan_SeaView/');
    simulateExtract('인스타그램 릴스에서 새로운 핫플레이스 링크 감지');
  };

  const simulateExtract = async (msg: string) => {
    setIsOcrAnalyzing(true);
    try {
      const res = await fetch('/api/extract-places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });
      const data = await res.json();
      if (data.places && data.places.length > 0) {
        setOcrSuccessMsg(`체험용 예시 ${data.places.length}개 장소 확인`);
      }
    } catch {
      setOcrSuccessMsg('AI 장소 추출 완료 (4개 명소)');
    } finally {
      setIsOcrAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateExtract(`캡처 이미지 [${file.name}] OCR 분석 완료`);
    }
  };

  const handleAddNewPlace = () => {
    if (!newPlaceInput.trim()) return;
    const newPlace: Place = {
      id: `place-custom-${Date.now()}`,
      name: newPlaceInput.trim(),
      category: 'other',
      categoryLabel: '추가장소',
      address: '부산 수영구 광안리 인근',
      tags: ['#직접추가', '#AI동선반영'],
      stayMinutes: 45,
      timeSlot: '동선 순서 자동 배치',
      tip: '사용자 지정 방문 추천 장소',
    };
    onAddPlace(newPlace);
    setNewPlaceInput('');
    setShowAddModal(false);
  };

  const handleGenerateClick = () => {
    const conditionPayload: TravelConditions = {
      duration,
      durationLabel:
        duration === '2h'
          ? '2시간'
          : duration === 'half_day'
          ? '반나절 (4~5시간)'
          : duration === 'full_day'
          ? '하루 종일'
          : '1박 2일',
      budget,
      budgetLabel:
        budget === 'under_30k' ? '3만원 이하' : budget === 'under_50k' ? '5만원 이하' : '제한 없음',
      vibes: selectedVibes,
      transport,
      transportLabel:
        transport === 'minimal'
          ? '최소 이동 (동선 최적화)'
          : transport === 'transit'
          ? '대중교통 중심'
          : '도보 중심',
    };

    onGenerateCourses(places, conditionPayload, '광안리 해변 감성 여행');
  };

  return (
    <div className="flex-1 flex flex-col relative pb-32">
      {/* Navigation App Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 h-14 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={onBack}
          aria-label="뒤로가기"
          className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-[#2D3A4A] hover:bg-gray-100 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-base font-extrabold text-[#2D3A4A] tracking-tight">새 여행 코스 만들기</h1>
          <span className="text-[11px] text-gray-400 font-medium">Step 1/2: 정보 & 조건 입력</span>
        </div>
        <button
          aria-label="도움말"
          className="w-9 h-9 -mr-1 rounded-full flex items-center justify-center text-gray-400 hover:text-[#2D3A4A]"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </header>

      {/* Main Form Content */}
      <main className="px-4 pt-4 space-y-5">
        {/* Step Tabs Pill */}
        <div className="bg-gray-100 p-1 rounded-full flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setActiveTab('places')}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'places'
                ? 'bg-white text-[#2D3A4A] shadow-xs'
                : 'text-gray-500 hover:text-[#2D3A4A]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                activeTab === 'places' ? 'bg-[#39D9C8]' : 'border border-gray-300'
              }`}
            />
            <span>1. 장소 가져오기</span>
          </button>
          <button
            onClick={() => setActiveTab('conditions')}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'conditions'
                ? 'bg-white text-[#2D3A4A] shadow-xs'
                : 'text-gray-500 hover:text-[#2D3A4A]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                activeTab === 'conditions' ? 'bg-[#39D9C8]' : 'border border-gray-300'
              }`}
            />
            <span>2. 여행 조건 설정</span>
          </button>
        </div>

        {/* SECTION 1: 저장해둔 장소 넣기 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-extrabold text-[#2D3A4A] flex items-center gap-1.5">
              <span>저장해둔 장소 넣기</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#39D9C8]" />
            </label>
            <span className="text-[11px] font-bold text-gray-400">SNS 링크 / 스크린샷</span>
          </div>

          {/* URL Input */}
          <div className="relative flex items-center bg-white border border-gray-300 rounded-2xl px-3.5 h-[50px] focus-within:border-[#39D9C8] focus-within:ring-2 focus-within:ring-[#39D9C8]/20 transition-all shadow-2xs">
            <LinkIcon className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://instagram.com/p/..."
              className="w-full bg-transparent text-[#2D3A4A] text-xs font-medium placeholder-gray-400 focus:outline-none pr-20"
            />
            <button
              onClick={handlePasteSample}
              className="absolute right-2 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#2D3A4A] text-[11px] font-bold flex items-center gap-1 transition-all active:scale-95"
            >
              <ClipboardPaste className="w-3.5 h-3.5 text-[#00A896]" />
              <span>붙여넣기</span>
            </button>
          </div>

          {/* Photo Dropzone */}
          <label className="border-2 border-dashed border-gray-300 hover:border-[#39D9C8] hover:bg-[#39D9C8]/5 bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all cursor-pointer group shadow-2xs">
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#39D9C8]/20 flex items-center justify-center text-[#2D3A4A] transition-all mb-1.5">
              <CloudUpload className="w-5 h-5 text-[#00A896]" />
            </div>
            <p className="text-xs font-bold text-[#2D3A4A]">여행·지도 캡처 사진 등록</p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              OCR로 상호명을 자동 판독합니다 (JPG, PNG 지원 · 최대 10MB)
            </p>
          </label>
        </section>

        {/* SECTION 2: AI 자동 분석 실시간 피드백 박스 */}
        <section className="bg-white border-2 border-[#35C98B] rounded-2xl p-4 shadow-2xs relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#35C98B]/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#35C98B]/15 flex items-center justify-center text-[#35C98B]">
                {isOcrAnalyzing ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#35C98B]" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#35C98B]" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-[#2D3A4A] block leading-tight">
                  {isOcrAnalyzing ? 'AI 분석 중...' : 'AI 분석 완료!'}
                </span>
                <span className="text-[11px] text-gray-500">{ocrSuccessMsg}</span>
              </div>
            </div>
            <span className="bg-[#35C98B]/15 text-[#218357] font-bold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35C98B] animate-ping" />
              {places.length}/{places.length} 성공
            </span>
          </div>

          {/* Extracted Places List */}
          <div className="space-y-2">
            {places.map((place, idx) => (
              <div
                key={place.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#39D9C8] text-[#2D3A4A] font-extrabold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#2D3A4A] truncate">{place.name}</span>
                      <span className="text-[10px] font-bold text-gray-500 bg-white px-1.5 py-0.2 rounded border border-gray-200 shrink-0">
                        {place.categoryLabel || '명소'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-[11px] text-gray-500 truncate">
                      <span>{place.address}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-[#D97706] font-medium truncate">
                        {(place.tags || []).slice(0, 2).join(' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemovePlace(place.id)}
                  aria-label="장소 삭제"
                  className="text-gray-400 hover:text-[#FF5C5C] p-1 rounded-full transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Add Place Input */}
          {showAddModal ? (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="추가할 장소명을 입력하세요 (예: 칠링아웃샵)"
                value={newPlaceInput}
                onChange={(e) => setNewPlaceInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNewPlace()}
                className="flex-1 text-xs bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-[#2D3A4A] focus:outline-none focus:border-[#39D9C8]"
                autoFocus
              />
              <button
                onClick={handleAddNewPlace}
                className="px-3 py-2 rounded-xl bg-[#2D3A4A] text-white text-xs font-bold hover:bg-gray-800 shrink-0"
              >
                등록
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-2.5 w-full py-2 rounded-xl border border-dashed border-gray-300 text-gray-600 hover:text-[#00A896] hover:border-[#39D9C8] text-xs font-bold flex items-center justify-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>직접 장소 더 추가하기</span>
            </button>
          )}
        </section>

        {/* SECTION 3: 여행 조건 설정 */}
        <section className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#00A896]" />
              <h2 className="text-sm font-extrabold text-[#2D3A4A]">여행 조건 설정</h2>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">맞춤 동선 생성</span>
          </div>

          {/* 1. 여행 가능 시간 */}
          <div>
            <label className="block text-xs font-bold text-[#2D3A4A] mb-2">여행 가능 시간</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDuration('2h')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all text-center border ${
                  duration === '2h'
                    ? 'border-2 border-[#39D9C8] bg-[#39D9C8]/10 text-[#2D3A4A] font-bold shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                2시간
              </button>

              <button
                type="button"
                onClick={() => setDuration('half_day')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                  duration === 'half_day'
                    ? 'border-2 border-[#39D9C8] bg-[#39D9C8]/10 text-[#2D3A4A] font-bold shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-[#006a61]" />
                <span>반나절 (4~5시간)</span>
              </button>

              <button
                type="button"
                onClick={() => setDuration('full_day')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all text-center border ${
                  duration === 'full_day'
                    ? 'border-2 border-[#39D9C8] bg-[#39D9C8]/10 text-[#2D3A4A] font-bold shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                하루 종일
              </button>

              <button
                type="button"
                onClick={() => setDuration('2d1n')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all text-center border ${
                  duration === '2d1n'
                    ? 'border-2 border-[#39D9C8] bg-[#39D9C8]/10 text-[#2D3A4A] font-bold shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                1박 2일
              </button>
            </div>
          </div>

          {/* 2. 1인당 예상 예산 */}
          <div>
            <label className="block text-xs font-bold text-[#2D3A4A] mb-2">1인당 예상 예산</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBudget('under_30k')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all text-center border ${
                  budget === 'under_30k'
                    ? 'border-2 border-[#39D9C8] bg-[#39D9C8]/10 text-[#2D3A4A] font-bold'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                3만원 이하
              </button>

              <button
                type="button"
                onClick={() => setBudget('under_50k')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all text-center border ${
                  budget === 'under_50k'
                    ? 'border-2 border-[#39D9C8] bg-[#39D9C8]/10 text-[#2D3A4A] font-bold'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                5만원 이하
              </button>

              <button
                type="button"
                onClick={() => setBudget('unlimited')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all text-center border ${
                  budget === 'unlimited'
                    ? 'border-2 border-[#39D9C8] bg-[#39D9C8]/10 text-[#2D3A4A] font-bold'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                제한 없음
              </button>
            </div>
          </div>

          {/* 3. 여행 취향 & 분위기 */}
          <div>
            <label className="block text-xs font-bold text-[#2D3A4A] mb-2">
              여행 취향 & 분위기 (다중 선택)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                '#맛집중심',
                '#감성카페',
                '#오션뷰',
                '#힐링',
                '#야경',
                '#액티비티',
                '#인생샷',
              ].map((vibe) => {
                const isSelected = selectedVibes.includes(vibe);
                return (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() => toggleVibe(vibe)}
                    className={`h-8 px-3 rounded-full text-xs font-bold flex items-center gap-1 transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-[#2D3A4A] text-white shadow-xs'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span>{vibe}</span>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. 우선 이동 방식 */}
          <div>
            <label className="block text-xs font-bold text-[#2D3A4A] mb-2">우선 이동 방식</label>
            <div className="space-y-2">
              {/* Option 1: Minimal */}
              <label
                onClick={() => setTransport('minimal')}
                className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  transport === 'minimal'
                    ? 'border-[#39D9C8] bg-[#39D9C8]/5'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      transport === 'minimal'
                        ? 'bg-[#39D9C8] text-[#2D3A4A]'
                        : 'border-2 border-gray-300'
                    }`}
                  >
                    {transport === 'minimal' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2D3A4A]">최소 이동 (동선 최적화)</div>
                    <div className="text-[11px] text-gray-500">
                      장소 간 이동 피로도를 최소화하는 알짜 경로
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#FFB85C]/20 text-[#D97706] px-2 py-0.5 rounded">
                  추천
                </span>
              </label>

              {/* Option 2: Public Transit */}
              <label
                onClick={() => setTransport('transit')}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  transport === 'transit'
                    ? 'border-2 border-[#39D9C8] bg-[#39D9C8]/5'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      transport === 'transit'
                        ? 'bg-[#39D9C8] text-[#2D3A4A]'
                        : 'border-2 border-gray-300'
                    }`}
                  >
                    {transport === 'transit' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2D3A4A]">대중교통 중심</div>
                    <div className="text-[11px] text-gray-500">
                      지하철/버스 정류장 접근성이 좋은 경로
                    </div>
                  </div>
                </div>
              </label>

              {/* Option 3: Walking */}
              <label
                onClick={() => setTransport('walk')}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  transport === 'walk'
                    ? 'border-2 border-[#39D9C8] bg-[#39D9C8]/5'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      transport === 'walk'
                        ? 'bg-[#39D9C8] text-[#2D3A4A]'
                        : 'border-2 border-gray-300'
                    }`}
                  >
                    {transport === 'walk' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2D3A4A]">도보 중심</div>
                    <div className="text-[11px] text-gray-500">골목길 산책과 주변 구경 위주 경로</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Info Hint */}
        <div className="bg-gray-100/90 rounded-2xl p-3 flex items-center gap-2.5 text-gray-600">
          <Info className="w-4 h-4 text-[#4A7DFF] shrink-0" />
          <p className="text-[11px] leading-relaxed">
            저장된 {places.length}곳의 영업시간과 대기 시간을 자동으로 반영하여{' '}
            <strong className="text-[#2D3A4A]">가장 완벽한 3가지 코스</strong>를 계산합니다.
          </p>
        </div>
      </main>

      {/* Bottom Sticky Action Area */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-4 py-3 border-t border-gray-200 flex items-center gap-2.5 shadow-lg">
        <button
          onClick={() => setShowAddModal(true)}
          className="h-[50px] px-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-[#2D3A4A] font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shrink-0"
        >
          <MapPin className="w-4 h-4 text-[#00A896]" />
          <span>장소 추가</span>
        </button>

        <button
          onClick={handleGenerateClick}
          disabled={isGenerating}
          className="flex-1 h-[50px] rounded-full bg-[#39D9C8] hover:bg-[#32c9b9] text-[#2D3A4A] font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#39D9C8]/25 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>AI 최적 코스 생성 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-[#2D3A4A]" />
              <span>맞춤 코스 3개 추천받기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
