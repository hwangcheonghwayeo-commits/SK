import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, Sparkles, Share2 } from 'lucide-react';
import { RouteMateLogo } from './RouteMateLogo';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, tripTitle }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-[28px] p-5 w-full max-w-sm shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RouteMateLogo size="sm" showText={false} />
            <h3 className="text-sm font-extrabold text-[#2D3A4A]">여행 일정 공유하기</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Share Card Preview */}
        <div className="rounded-2xl bg-gradient-to-br from-[#E6FAF7] to-[#D5F5F0] p-4 border border-[#39D9C8]/40 shadow-xs">
          <span className="text-[10px] font-extrabold bg-[#39D9C8] text-[#2D3A4A] px-2 py-0.5 rounded-full">
            RouteMate AI 일정
          </span>
          <h4 className="text-sm font-extrabold text-[#2D3A4A] mt-2">{tripTitle}</h4>
          <p className="text-xs text-gray-600 mt-1">
            4개 핫플레이스 최적 동선 · 이동시간 22분 압축 완성
          </p>
          <div className="mt-2.5 flex items-center gap-1 text-[11px] text-[#006a61] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>동행자와 함께 실시간 길찾기 & 예약 공유</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleCopy}
            className="w-full h-12 rounded-2xl bg-[#FEE500] hover:bg-[#ebd300] text-[#3C1E1E] text-xs font-extrabold flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-xs"
          >
            <span className="text-base">💬</span>
            <span>카카오톡 친구에게 일정 보내기</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 text-[#2D3A4A] text-xs font-extrabold flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            {copied ? <Check className="w-4 h-4 text-[#35C98B]" /> : <Copy className="w-4 h-4 text-gray-500" />}
            <span>{copied ? '링크가 복사되었습니다!' : '일정 초대 링크 복사'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
