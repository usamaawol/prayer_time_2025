import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { PrayerCard } from '@/components/PrayerCard';
import { CitySelector } from '@/components/CitySelector';
import { AIPrayerTips } from '@/components/AIPrayerTips';
import { cities, City, calculatePrayerTimes, prayerNames, PrayerTimes } from '@/lib/prayerData';

export default function Dashboard() {
  const { user, userProfile, loading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<keyof PrayerTimes | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Set initial city from user profile or default to Mecca
    const cityId = userProfile?.selectedCity || 'mecca';
    const city = cities.find(c => c.id === cityId) || cities.find(c => c.id === 'mecca')!;
    setSelectedCity(city);
  }, [userProfile]);

  useEffect(() => {
    if (selectedCity) {
      const times = calculatePrayerTimes(selectedCity, new Date());
      setPrayerTimes(times);
    }
  }, [selectedCity]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (prayerTimes) {
      // Determine next prayer (simplified)
      const now = new Date();
      const currentHour = now.getHours() + now.getMinutes() / 60;
      
      const prayerOrder: (keyof PrayerTimes)[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
      
      for (const prayer of prayerOrder) {
        const timeStr = prayerTimes[prayer];
        const [time, period] = timeStr.split(' ');
        const [h, m] = time.split(':').map(Number);
        let hour = h + m / 60;
        if (period === 'PM' && h !== 12) hour += 12;
        if (period === 'AM' && h === 12) hour -= 12;
        
        if (hour > currentHour) {
          setNextPrayer(prayer);
          return;
        }
      }
      setNextPrayer('fajr'); // Next day's Fajr
    }
  }, [prayerTimes, currentTime]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    if (user) {
      updateUserProfile({ selectedCity: city.id });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div className="glass-card rounded-2xl p-6 animate-slide-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                    Assalamu Alaikum{userProfile?.name ? `, ${userProfile.name.split(' ')[0]}` : ''}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>{formatDate(currentTime)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Current Time</span>
                  </div>
                  <p className="text-3xl font-bold tabular-nums text-foreground">
                    {formatTime(currentTime)}
                  </p>
                </div>
              </div>

              <CitySelector selectedCity={selectedCity} onSelect={handleCitySelect} />
            </div>

            {/* Prayer Times Grid */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Prayer Times
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {prayerTimes && (Object.entries(prayerTimes) as [keyof PrayerTimes, string][]).map(([key, time], index) => {
                  const prayerInfo = prayerNames[key];
                  const isPast = false; // Simplified - would need proper time comparison
                  
                  return (
                    <div key={key} style={{ animationDelay: `${index * 0.1}s` }}>
                      <PrayerCard
                        name={prayerInfo.english}
                        arabic={prayerInfo.arabic}
                        time={time}
                        isNext={nextPrayer === key}
                        isPast={isPast}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Prayer Highlight */}
            {nextPrayer && prayerTimes && (
              <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-6 shadow-card animate-slide-up">
                <p className="text-sm opacity-80 mb-1">Next Prayer</p>
                <h3 className="font-serif text-3xl font-bold mb-2">
                  {prayerNames[nextPrayer].english}
                </h3>
                <p className="font-serif text-xl opacity-90">
                  {prayerNames[nextPrayer].arabic}
                </p>
                <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                  <p className="text-4xl font-bold tabular-nums">
                    {prayerTimes[nextPrayer]}
                  </p>
                </div>
              </div>
            )}

            {/* AI Prayer Tips */}
            <AIPrayerTips city={selectedCity} />

            {/* Quick Stats */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-serif text-lg font-semibold mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{selectedCity?.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Country</span>
                  <span className="font-medium">{selectedCity?.country}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Timezone</span>
                  <span className="font-medium text-sm">{selectedCity?.timezone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
