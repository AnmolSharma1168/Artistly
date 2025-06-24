'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import { mockArtists } from '@/lib/mockData';

export default function ArtistsPage() {
  const [artists, setArtists] = useState(mockArtists);
  const [filteredArtists, setFilteredArtists] = useState(mockArtists);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    let filtered = artists;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(artist => 
        artist.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(artist => 
        artist.location.toLowerCase() === locationFilter.toLowerCase()
      );
    }

    if (priceFilter !== 'all') {
      filtered = filtered.filter(artist => {
        const price = parseInt(artist.priceRange.split('-')[0].replace('$', '').replace(',', ''));
        switch (priceFilter) {
          case 'budget':
            return price < 1000;
          case 'mid':
            return price >= 1000 && price < 5000;
          case 'premium':
            return price >= 5000;
          default:
            return true;
        }
      });
    }

    setFilteredArtists(filtered);
  }, [categoryFilter, locationFilter, priceFilter, artists]);

  const uniqueLocations = [...new Set(artists.map(artist => artist.location))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Artists</h1>
        <p className="text-gray-600">Discover talented performers for your next event</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">Filter Artists</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="singers">Singers</SelectItem>
                <SelectItem value="dancers">Dancers</SelectItem>
                <SelectItem value="speakers">Speakers</SelectItem>
                <SelectItem value="djs">DJs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location.toLowerCase()}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (Under $1,000)</SelectItem>
                <SelectItem value="mid">Mid-range ($1,000 - $5,000)</SelectItem>
                <SelectItem value="premium">Premium ($5,000+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Artist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtists.map((artist) => (
          <Card key={artist.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{artist.name}</h3>
                  <Badge variant="secondary">{artist.category}</Badge>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-medium">{artist.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{artist.bio}</p>
              
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{artist.location}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-lg font-semibold text-green-600">{artist.priceRange}</p>
                </div>
                <Button>Ask for Quote</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArtists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No artists found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setCategoryFilter('all');
              setLocationFilter('all');
              setPriceFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}