export type PlaceCategory = 'restaurant' | 'cafe' | 'culture' | 'sightseeing' | 'stay' | 'other';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  categoryLabel: string;
  address: string;
  tags: string[];
  summary?: string;
  photoUrl?: string;
  sourceType?: 'instagram' | 'naver' | 'youtube' | 'manual' | 'ocr';
  sourceUrl?: string;
  stayMinutes: number;
  timeSlot?: string;
  tip?: string;
  waitingNote?: string;
  transitToNext?: {
    type: 'walk' | 'transit' | 'car';
    durationMinutes: number;
    distanceMeters: number;
    note?: string;
  };
  // Relative coordinates on the 360x288 SVG map (x: 0~360, y: 0~288)
  mapPos?: {
    x: number;
    y: number;
  };
}

export interface CourseOption {
  id: string;
  code: 'A' | 'B' | 'C';
  badgeTitle: string;
  title: string;
  subtitle: string;
  totalDurationStr: string;
  transitDurationStr: string;
  estimatedCostStr: string;
  totalDistanceStr: string;
  optimizationScore: number;
  highlightPill: string;
  themeColor: string;
  stops: Place[];
  // SVG path definition string or coordinates
  svgRoutePath?: string;
}

export interface TravelConditions {
  duration: '2h' | 'half_day' | 'full_day' | '2d1n';
  durationLabel: string;
  budget: 'under_30k' | 'under_50k' | 'unlimited';
  budgetLabel: string;
  vibes: string[];
  transport: 'minimal' | 'transit' | 'walk';
  transportLabel: string;
}

export interface BookingItem {
  id: string;
  placeId?: string;
  placeName: string;
  categoryTag: string;
  servicePartner: string; // e.g., '테이블링', '클룩 & 네이버', '아고다', '에어부산'
  type: 'queue' | 'ticket' | 'free' | 'hotel' | 'flight';
  title: string;
  subtitle: string;
  badge?: string;
  price?: number;
  originalPrice?: number;
  discountPercent?: number;
  status: 'pending' | 'confirmed' | 'completed' | 'used' | 'cancelled';
  timeSlot?: string;
  dateStr?: string;
  imageUrl?: string;
  actionText: string;
  isSelected: boolean;
  bookingCode?: string;
  barcodeNumber?: string;
  usedAt?: string;
  seatInfo?: string;
  guestCount?: string;
  qrCodeUrl?: string;
}

export interface ActiveTrip {
  id: string;
  title: string;
  dateStr: string;
  dDay: string;
  placeCount: number;
  currentStepIndex: number;
  isLive: boolean;
  liveCurrentPlace: string;
  liveCurrentUntil: string;
  liveNextPlace: string;
  liveNextArrival: string;
  stops: Place[];
  bookings: BookingItem[];
  summary: {
    totalWalkDistance: string;
    totalDuration: string;
    totalCost: string;
  };
}
