export interface City {
  id: string;
  name: string;
  country: string;
  timezone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export const cities: City[] = [
  // USA
  { id: 'new-york', name: 'New York', country: 'USA', timezone: 'America/New_York', coordinates: { lat: 40.7128, lng: -74.0060 } },
  { id: 'los-angeles', name: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles', coordinates: { lat: 34.0522, lng: -118.2437 } },
  { id: 'chicago', name: 'Chicago', country: 'USA', timezone: 'America/Chicago', coordinates: { lat: 41.8781, lng: -87.6298 } },
  { id: 'houston', name: 'Houston', country: 'USA', timezone: 'America/Chicago', coordinates: { lat: 29.7604, lng: -95.3698 } },
  
  // Germany
  { id: 'berlin', name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', coordinates: { lat: 52.5200, lng: 13.4050 } },
  { id: 'munich', name: 'Munich', country: 'Germany', timezone: 'Europe/Berlin', coordinates: { lat: 48.1351, lng: 11.5820 } },
  { id: 'frankfurt', name: 'Frankfurt', country: 'Germany', timezone: 'Europe/Berlin', coordinates: { lat: 50.1109, lng: 8.6821 } },
  
  // Saudi Arabia
  { id: 'mecca', name: 'Mecca', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', coordinates: { lat: 21.4225, lng: 39.8262 } },
  { id: 'medina', name: 'Medina', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', coordinates: { lat: 24.5247, lng: 39.5692 } },
  { id: 'riyadh', name: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', coordinates: { lat: 24.7136, lng: 46.6753 } },
  { id: 'jeddah', name: 'Jeddah', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', coordinates: { lat: 21.5433, lng: 39.1728 } },
  
  // UAE
  { id: 'dubai', name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', coordinates: { lat: 25.2048, lng: 55.2708 } },
  { id: 'abu-dhabi', name: 'Abu Dhabi', country: 'UAE', timezone: 'Asia/Dubai', coordinates: { lat: 24.4539, lng: 54.3773 } },
  
  // Qatar
  { id: 'doha', name: 'Doha', country: 'Qatar', timezone: 'Asia/Qatar', coordinates: { lat: 25.2854, lng: 51.5310 } },
  
  // Egypt
  { id: 'cairo', name: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', coordinates: { lat: 30.0444, lng: 31.2357 } },
  { id: 'alexandria', name: 'Alexandria', country: 'Egypt', timezone: 'Africa/Cairo', coordinates: { lat: 31.2001, lng: 29.9187 } },
  
  // Palestine
  { id: 'jerusalem', name: 'Jerusalem', country: 'Palestine', timezone: 'Asia/Jerusalem', coordinates: { lat: 31.7683, lng: 35.2137 } },
  { id: 'gaza', name: 'Gaza', country: 'Palestine', timezone: 'Asia/Gaza', coordinates: { lat: 31.5017, lng: 34.4668 } },
  
  // Ethiopia
  { id: 'addis-ababa', name: 'Addis Ababa', country: 'Ethiopia', timezone: 'Africa/Addis_Ababa', coordinates: { lat: 9.0320, lng: 38.7469 } },
  
  // Turkey
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', coordinates: { lat: 41.0082, lng: 28.9784 } },
  { id: 'ankara', name: 'Ankara', country: 'Turkey', timezone: 'Europe/Istanbul', coordinates: { lat: 39.9334, lng: 32.8597 } },
  
  // Indonesia
  { id: 'jakarta', name: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', coordinates: { lat: -6.2088, lng: 106.8456 } },
  
  // Malaysia
  { id: 'kuala-lumpur', name: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', coordinates: { lat: 3.1390, lng: 101.6869 } },
  
  // Pakistan
  { id: 'karachi', name: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi', coordinates: { lat: 24.8607, lng: 67.0011 } },
  { id: 'islamabad', name: 'Islamabad', country: 'Pakistan', timezone: 'Asia/Karachi', coordinates: { lat: 33.6844, lng: 73.0479 } },
  
  // Bangladesh
  { id: 'dhaka', name: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka', coordinates: { lat: 23.8103, lng: 90.4125 } },
  
  // Morocco
  { id: 'casablanca', name: 'Casablanca', country: 'Morocco', timezone: 'Africa/Casablanca', coordinates: { lat: 33.5731, lng: -7.5898 } },
  
  // UK
  { id: 'london', name: 'London', country: 'UK', timezone: 'Europe/London', coordinates: { lat: 51.5074, lng: -0.1278 } },
  
  // France
  { id: 'paris', name: 'Paris', country: 'France', timezone: 'Europe/Paris', coordinates: { lat: 48.8566, lng: 2.3522 } },
];

// Calculate prayer times based on coordinates and date
// Using simplified calculation method
export function calculatePrayerTimes(city: City, date: Date = new Date()): PrayerTimes {
  const { lat, lng } = city.coordinates;
  
  // Simplified calculation - in production, use a proper Islamic prayer time calculation library
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const declination = -23.45 * Math.cos((2 * Math.PI / 365) * (dayOfYear + 10));
  
  // Base times adjusted for latitude
  const latFactor = Math.abs(lat) / 90;
  const seasonFactor = Math.sin((2 * Math.PI / 365) * (dayOfYear - 80));
  
  // Calculate approximate times
  const fajrHour = 4 + latFactor * 1.5 - seasonFactor * 0.5;
  const sunriseHour = 5.5 + latFactor * 1.5 - seasonFactor * 1;
  const dhuhrHour = 12 + (lng / 15) % 1;
  const asrHour = 15 + latFactor * 0.5;
  const maghribHour = 18 + latFactor * 1.5 + seasonFactor * 1;
  const ishaHour = 19.5 + latFactor * 1.5 + seasonFactor * 1;
  
  const formatTime = (hour: number): string => {
    const h = Math.floor(hour);
    const m = Math.floor((hour - h) * 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
  };
  
  return {
    fajr: formatTime(fajrHour),
    sunrise: formatTime(sunriseHour),
    dhuhr: formatTime(dhuhrHour),
    asr: formatTime(asrHour),
    maghrib: formatTime(maghribHour),
    isha: formatTime(ishaHour),
  };
}

export const prayerNames: Record<keyof PrayerTimes, { arabic: string; english: string }> = {
  fajr: { arabic: 'الفجر', english: 'Fajr' },
  sunrise: { arabic: 'الشروق', english: 'Sunrise' },
  dhuhr: { arabic: 'الظهر', english: 'Dhuhr' },
  asr: { arabic: 'العصر', english: 'Asr' },
  maghrib: { arabic: 'المغرب', english: 'Maghrib' },
  isha: { arabic: 'العشاء', english: 'Isha' },
};
