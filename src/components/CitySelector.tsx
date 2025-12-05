import { useState } from 'react';
import { Check, ChevronDown, MapPin, Search } from 'lucide-react';
import { cities, City } from '@/lib/prayerData';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CitySelectorProps {
  selectedCity: City | null;
  onSelect: (city: City) => void;
}

export function CitySelector({ selectedCity, onSelect }: CitySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(search.toLowerCase()) ||
    city.country.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCities = filteredCities.reduce((acc, city) => {
    if (!acc[city.country]) {
      acc[city.country] = [];
    }
    acc[city.country].push(city);
    return acc;
  }, {} as Record<string, City[]>);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-14 text-left font-normal bg-card hover:bg-muted"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              {selectedCity ? (
                <>
                  <p className="font-semibold text-foreground">{selectedCity.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedCity.country}</p>
                </>
              ) : (
                <p className="text-muted-foreground">Select a city...</p>
              )}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {Object.entries(groupedCities).map(([country, countryCities]) => (
            <div key={country}>
              <p className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {country}
              </p>
              {countryCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelect(city);
                    setOpen(false);
                    setSearch('');
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors",
                    selectedCity?.id === city.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  )}
                >
                  <span className="font-medium">{city.name}</span>
                  {selectedCity?.id === city.id && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          ))}
          {filteredCities.length === 0 && (
            <p className="text-center py-6 text-muted-foreground">No cities found</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
