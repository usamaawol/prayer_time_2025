import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Moon, MapPin, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { MosqueSilhouette } from '@/components/MosqueSilhouette';

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const features = [
    {
      icon: Clock,
      title: 'Accurate Prayer Times',
      description: 'Get precise prayer times calculated for your exact location, updated daily.',
    },
    {
      icon: MapPin,
      title: '30+ Cities Worldwide',
      description: 'Support for major cities across USA, Germany, Saudi Arabia, UAE, and more.',
    },
    {
      icon: Sparkles,
      title: 'AI Prayer Tips',
      description: 'Receive personalized spiritual guidance and prayer tips powered by AI.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 islamic-pattern opacity-20"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Moon className="w-4 h-4" />
              <span className="text-sm font-medium">Track Your Daily Prayers</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Never Miss a Prayer
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Get accurate prayer times for your city, personalized AI tips, 
              and stay connected with your daily spiritual practice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button 
                variant="gold" 
                size="xl"
                onClick={() => navigate('/auth?mode=signup')}
              >
                Get Started Free
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate('/auth')}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Sign In
              </Button>
            </div>

            <MosqueSilhouette className="w-full max-w-2xl mx-auto h-32 mt-16 opacity-30" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete prayer companion designed to help you maintain your daily spiritual routine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card rounded-2xl p-8 text-center group hover:shadow-card transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-sky">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Your Spiritual Journey
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of Muslims worldwide who use Prayer Times to stay connected with their daily prayers.
          </p>
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => navigate('/auth?mode=signup')}
          >
            Create Free Account
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Moon className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-serif text-lg font-bold text-foreground">Prayer Times</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Prayer Times. Built with faith and care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
