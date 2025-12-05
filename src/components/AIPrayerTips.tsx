import { useState } from 'react';
import { Sparkles, RefreshCw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { City } from '@/lib/prayerData';

interface AIPrayerTipsProps {
  city: City | null;
}

const sampleTips = [
  "Start your day with Fajr prayer to gain blessings and set a positive tone for the day ahead. The Prophet (PBUH) said: 'The two Rak'ah of Fajr are better than the world and all it contains.'",
  "Remember to make dhikr (remembrance of Allah) after each prayer. SubhanAllah, Alhamdulillah, and Allahu Akbar each 33 times brings great reward.",
  "Take a moment before prayer to make wudu mindfully, as it purifies not just the body but also the soul and prepares you for standing before Allah.",
  "Consider praying Tahajjud (night prayer) in the last third of the night. It's a blessed time when duas are more likely to be accepted.",
  "Use the time between Adhan and Iqamah to make dua. This is one of the times when supplications are accepted.",
  "Make it a habit to arrive at the mosque early for congregational prayers. Each step towards the mosque earns great reward.",
];

export function AIPrayerTips({ city }: AIPrayerTipsProps) {
  const [tip, setTip] = useState(sampleTips[0]);
  const [loading, setLoading] = useState(false);

  const generateTip = async () => {
    setLoading(true);
    // Simulate AI response - in production, this would call Firebase Function
    await new Promise(resolve => setTimeout(resolve, 1500));
    const randomTip = sampleTips[Math.floor(Math.random() * sampleTips.length)];
    setTip(randomTip);
    setLoading(false);
  };

  return (
    <div className="glass-card rounded-2xl p-6 islamic-pattern">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-accent">
          <Sparkles className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold">AI Prayer Tips</h3>
          <p className="text-sm text-muted-foreground">
            Personalized spiritual guidance
          </p>
        </div>
      </div>

      <div className={cn(
        "relative bg-muted/50 rounded-xl p-5 mb-4 min-h-[120px] transition-opacity",
        loading && "opacity-50"
      )}>
        <Lightbulb className="absolute top-4 right-4 w-5 h-5 text-gold opacity-50" />
        <p className="text-foreground leading-relaxed pr-8">
          {tip}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {city ? `Tips for ${city.name}` : 'Select a city for personalized tips'}
        </p>
        <Button 
          variant="gold" 
          size="sm" 
          onClick={generateTip}
          disabled={loading}
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          New Tip
        </Button>
      </div>
    </div>
  );
}
