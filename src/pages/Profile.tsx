import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, MapPin, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CitySelector } from '@/components/CitySelector';
import { cities, City } from '@/lib/prayerData';
import { toast } from 'sonner';

export default function Profile() {
  const { user, userProfile, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(userProfile?.name || '');
  const [selectedCity, setSelectedCity] = useState<City | null>(
    cities.find(c => c.id === userProfile?.selectedCity) || null
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile({
        name,
        selectedCity: selectedCity?.id || 'mecca',
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="glass-card rounded-2xl p-8 animate-slide-up">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-6">
              Profile Settings
            </h1>

            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-foreground">
                    {name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    value={user.email || ''}
                    readOnly
                    className="pl-10 bg-muted"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Default City
                </label>
                <CitySelector
                  selectedCity={selectedCity}
                  onSelect={setSelectedCity}
                />
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  'Saving...'
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
