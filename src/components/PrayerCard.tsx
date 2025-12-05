import { cn } from '@/lib/utils';
import { Moon, Sun, Sunrise, Sunset } from 'lucide-react';

interface PrayerCardProps {
  name: string;
  arabic: string;
  time: string;
  isNext?: boolean;
  isPast?: boolean;
}

const prayerIcons: Record<string, React.ReactNode> = {
  Fajr: <Moon className="w-6 h-6" />,
  Sunrise: <Sunrise className="w-6 h-6" />,
  Dhuhr: <Sun className="w-6 h-6" />,
  Asr: <Sun className="w-6 h-6" />,
  Maghrib: <Sunset className="w-6 h-6" />,
  Isha: <Moon className="w-6 h-6" />,
};

export function PrayerCard({ name, arabic, time, isNext, isPast }: PrayerCardProps) {
  return (
    <div
      className={cn(
        "relative group p-5 rounded-xl transition-all duration-300 animate-fade-in",
        isNext 
          ? "bg-gradient-primary text-primary-foreground shadow-card scale-105" 
          : isPast
            ? "bg-muted/50 text-muted-foreground"
            : "bg-card border border-border hover:shadow-soft hover:border-primary/20"
      )}
    >
      {isNext && (
        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full shadow-glow">
          Next
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={cn(
            "p-3 rounded-lg",
            isNext ? "bg-primary-foreground/20" : "bg-primary/10"
          )}>
            {prayerIcons[name]}
          </div>
          <div>
            <p className="font-serif text-xl font-semibold">{name}</p>
            <p className={cn(
              "text-sm font-serif",
              isNext ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {arabic}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className={cn(
            "text-2xl font-bold tabular-nums",
            isNext && "text-gold-light"
          )}>
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}
