import {demoFetch as fetch} from './demoApi';
import React, { useState } from 'react';
import { DeviceMockup } from './components/DeviceMockup';
import { BottomNavBar, NavTabId } from './components/BottomNavBar';
import { HomeScreen } from './components/screens/HomeScreen';
import { CreateCourseScreen } from './components/screens/CreateCourseScreen';
import { RecommendedCourseScreen } from './components/screens/RecommendedCourseScreen';
import { MyTripScreen } from './components/screens/MyTripScreen';
import { BookingScreen } from './components/screens/BookingScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ExploreHotelScreen } from './components/screens/ExploreHotelScreen';
import { MyReservationsScreen } from './components/screens/MyReservationsScreen';
import { ShareModal } from './components/ShareModal';
import {
  initialPlaces,
  initialCourseOptions,
  initialBookings,
  initialActiveTrip,
} from './data/initialData';
import { Place, CourseOption, TravelConditions, BookingItem, ActiveTrip } from './types';

export function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<
    'home' | 'create_course' | 'recommended' | 'mytrip' | 'bookings' | 'profile' | 'explore' | 'reservations'
  >('home');
  const [currentTab, setCurrentTab] = useState<NavTabId>('home');

  // Application Data State
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [courses, setCourses] = useState<CourseOption[]>(initialCourseOptions);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('opt-a');
  const [activeTrip, setActiveTrip] = useState<ActiveTrip>(initialActiveTrip);
  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);

  // Loading States
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReoptimizing, setIsReoptimizing] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Handlers
  const handleTabSelect = (tab: NavTabId) => {
    setCurrentTab(tab);
    if (tab === 'home') setCurrentScreen('home');
    if (tab === 'saved') setCurrentScreen('create_course');
    if (tab === 'bookings') setCurrentScreen('bookings');
    if (tab === 'mytrip') setCurrentScreen('mytrip');
    if (tab === 'profile') setCurrentScreen('profile');
  };

  // Real Gemini AI Course Generation
  const handleGenerateCourses = async (
    inputPlaces: Place[],
    conditions: TravelConditions,
    customNote: string
  ) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/recommend-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          places: inputPlaces,
          conditions,
          destination: '부산 광안리',
          customPrompt: customNote,
        }),
      });

      const data = await response.json();
      if (data.courses && Array.isArray(data.courses) && data.courses.length > 0) {
        setCourses(data.courses);
        setSelectedCourseId(data.courses[0].id);
      }
    } catch (err) {
      console.error('Failed to generate courses with AI:', err);
    } finally {
      setIsGenerating(false);
      setCurrentScreen('recommended');
    }
  };

  // AI Re-optimization
  const handleReoptimize = async (newPlaceName?: string) => {
    setIsReoptimizing(true);
    try {
      const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
      const res = await fetch('/api/reoptimize-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stops: currentCourse.stops,
          newPlaceName,
        }),
      });

      const data = await res.json();
      if (data.success && data.stops) {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === selectedCourseId
              ? {
                  ...c,
                  stops: data.stops,
                  svgRoutePath: data.svgRoutePath || c.svgRoutePath,
                  totalDurationStr: data.totalDurationStr || c.totalDurationStr,
                  optimizationScore: 99,
                }
              : c
          )
        );
      }
    } catch (err) {
      console.error('Failed to reoptimize:', err);
    } finally {
      setIsReoptimizing(false);
    }
  };

  const handleConfirmCourse = (course: CourseOption) => {
    setActiveTrip((prev) => ({
      ...prev,
      title: course.title,
      placeCount: course.stops.length,
      stops: course.stops,
      summary: {
        totalWalkDistance: course.totalDistanceStr || '1.8km',
        totalDuration: course.totalDurationStr || '4시간 30분',
        totalCost: course.estimatedCostStr || '₩42,000',
      },
    }));
    setCurrentTab('mytrip');
    setCurrentScreen('mytrip');
  };

  const screensList = [
    { id: 'home', label: '1. 홈', icon: 'Home' },
    { id: 'create_course', label: '2. 코스 생성', icon: 'Sparkles' },
    { id: 'recommended', label: '3. AI 추천 3코스', icon: 'Map' },
    { id: 'mytrip', label: '4. 마이트립 (LIVE)', icon: 'Clock' },
    { id: 'bookings', label: '5. 예약 (호텔/항공/티켓)', icon: 'Ticket' },
    { id: 'explore', label: '6. 호텔 & 특가', icon: 'Hotel' },
    { id: 'profile', label: '7. 프로필/마이페이지', icon: 'User' },
    { id: 'reservations', label: '8. 나의 예약 & 티켓 (보관함)', icon: 'Ticket' },
  ];

  return (
    <DeviceMockup
      activeScreenName={currentScreen}
      onSelectScreen={(screenId: string) => {
        setCurrentScreen(screenId as any);
        if (screenId === 'home') setCurrentTab('home');
        if (screenId === 'create_course') setCurrentTab('saved');
        if (screenId === 'bookings') setCurrentTab('bookings');
        if (screenId === 'mytrip') setCurrentTab('mytrip');
        if (screenId === 'profile' || screenId === 'reservations') setCurrentTab('profile');
      }}
      screensList={screensList}
    >
      <div className="flex-1 flex flex-col min-h-full">
        {/* Render Active Screen */}
        {currentScreen === 'home' && (
          <HomeScreen
            onStartCreateCourse={() => {
              setCurrentTab('saved');
              setCurrentScreen('create_course');
            }}
            onOpenTripDetail={() => {
              setCurrentTab('mytrip');
              setCurrentScreen('mytrip');
            }}
            onOpenBookings={() => {
              setCurrentTab('bookings');
              setCurrentScreen('bookings');
            }}
            onOpenReservations={() => {
              setCurrentTab('profile');
              setCurrentScreen('reservations');
            }}
          />
        )}

        {currentScreen === 'create_course' && (
          <CreateCourseScreen
            places={places}
            isGenerating={isGenerating}
            onBack={() => setCurrentScreen('home')}
            onGenerateCourses={handleGenerateCourses}
            onRemovePlace={(id) => setPlaces((prev) => prev.filter((p) => p.id !== id))}
            onAddPlace={(newPlace) => setPlaces((prev) => [...prev, newPlace])}
          />
        )}

        {currentScreen === 'recommended' && (
          <RecommendedCourseScreen
            courses={courses}
            selectedCourseId={selectedCourseId}
            onSelectCourse={setSelectedCourseId}
            onConfirmCourse={handleConfirmCourse}
            onBack={() => setCurrentScreen('create_course')}
            onReoptimize={handleReoptimize}
            isReoptimizing={isReoptimizing}
            onOpenShareModal={() => setShareModalOpen(true)}
          />
        )}

        {currentScreen === 'mytrip' && (
          <MyTripScreen
            trip={activeTrip}
            onBack={() => {
              setCurrentTab('home');
              setCurrentScreen('home');
            }}
            onOpenBookings={() => {
              setCurrentTab('bookings');
              setCurrentScreen('bookings');
            }}
            onOpenShareModal={() => setShareModalOpen(true)}
          />
        )}

        {currentScreen === 'bookings' && (
          <BookingScreen
            bookings={bookings}
            onBack={() => {
              setCurrentTab('home');
              setCurrentScreen('home');
            }}
            onOpenCourseDetail={() => {
              setCurrentScreen('recommended');
            }}
            onConfirmBookings={(booked) => {
              setBookings((prev) =>
                prev.map((b) =>
                  booked.some((x) => x.id === b.id) ? { ...b, status: 'confirmed' } : b
                )
              );
            }}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            onBackToHome={() => setCurrentScreen('home')}
            onOpenTripDetail={() => {
              setCurrentTab('mytrip');
              setCurrentScreen('mytrip');
            }}
            onGoToBookingCenter={() => {
              setCurrentTab('bookings');
              setCurrentScreen('bookings');
            }}
          />
        )}

        {currentScreen === 'reservations' && (
          <MyReservationsScreen
            onBack={() => {
              setCurrentScreen('profile');
            }}
            onOpenTripDetail={() => {
              setCurrentTab('mytrip');
              setCurrentScreen('mytrip');
            }}
            onGoToBookingCenter={() => {
              setCurrentTab('bookings');
              setCurrentScreen('bookings');
            }}
          />
        )}

        {currentScreen === 'explore' && (
          <ExploreHotelScreen
            onBack={() => {
              setCurrentTab('home');
              setCurrentScreen('home');
            }}
            onOpenBookings={() => {
              setCurrentTab('bookings');
              setCurrentScreen('bookings');
            }}
          />
        )}

        {/* Persistent Bottom Nav Bar across main tabs */}
        <BottomNavBar
          currentTab={currentTab}
          onSelectTab={handleTabSelect}
        />

        {/* Global Share Modal */}
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          tripTitle={activeTrip.title}
        />
      </div>
    </DeviceMockup>
  );
}

export default App;
