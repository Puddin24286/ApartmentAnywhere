"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { ListingCard, Apartment } from '@/components/listing/listing-card';
import { SmartSearchInput } from '@/components/search/smart-search-input';
import { Button } from '@/components/ui/button';
import { Building, SlidersHorizontal } from 'lucide-react';

// Mock data
const mockApartments: Apartment[] = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    description: "Stunning loft in the heart of downtown with floor-to-ceiling windows",
    monthlyPrice: 2200,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    address: "123 Main St",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    amenities: ["Parking", "Washer/Dryer", "Gym", "Rooftop"],
    images: [],
    availableDate: "2025-02-01",
    leaseTerm: "12 months"
  },
  {
    id: "2",
    title: "Cozy Studio Apartment",
    description: "Perfect for singles or couples, great location",
    monthlyPrice: 1450,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    address: "456 Oak Ave",
    city: "Austin",
    state: "TX",
    zipCode: "78702",
    amenities: ["Pet Friendly", "Pool"],
    images: [],
    availableDate: "2025-02-15",
    leaseTerm: "6 months"
  },
  {
    id: "3",
    title: "Spacious Family Home",
    description: "Great for families, near schools and parks",
    monthlyPrice: 3500,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2400,
    address: "789 Maple Dr",
    city: "Dallas",
    state: "TX",
    zipCode: "75201",
    amenities: ["Parking", "Backyard", "Pet Friendly", "Fireplace"],
    images: [],
    availableDate: "2025-03-01",
    leaseTerm: "12 months"
  },
  {
    id: "4",
    title: "Luxury High-Rise Apartment",
    description: "Premium living with amazing city views",
    monthlyPrice: 4200,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1500,
    address: "100 Skyline Blvd",
    city: "Houston",
    state: "TX",
    zipCode: "77001",
    amenities: ["Concierge", "Pool", "Gym", "Parking", "Doorman"],
    images: [],
    availableDate: "2025-02-01",
    leaseTerm: "12 months"
  },
  {
    id: "5",
    title: "Charming Bungalow",
    description: "Cozy bungalow with character and charm",
    monthlyPrice: 1800,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 900,
    address: "222 Pine St",
    city: "San Antonio",
    state: "TX",
    zipCode: "78201",
    amenities: ["Backyard", "Parking", "Washer/Dryer"],
    images: [],
    availableDate: "2025-02-15",
    leaseTerm: "6 months"
  },
  {
    id: "6",
    title: "Urban Studio",
    description: "Modern studio in walkable neighborhood",
    monthlyPrice: 1650,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 550,
    address: "555 Urban Way",
    city: "Austin",
    state: "TX",
    zipCode: "78703",
    amenities: ["Parking", "Bike Storage", "Pet Friendly"],
    images: [],
    availableDate: "2025-03-01",
    leaseTerm: "Flexible"
  }
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q');
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>(mockApartments);

  useEffect(() => {
    if (queryParam) {
      // Simple filter based on search query
      const query = queryParam.toLowerCase();
      const filtered = mockApartments.filter(apt =>
        apt.title.toLowerCase().includes(query) ||
        apt.city.toLowerCase().includes(query) ||
        apt.state.toLowerCase().includes(query) ||
        apt.description.toLowerCase().includes(query)
      );
      setFilteredApartments(filtered);
    }
  }, [queryParam]);

  const handleSearch = (query: string) => {
    // Navigate with new query
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {queryParam ? `Results for "${queryParam}"` : 'Search Apartments'}
          </h1>

          {/* Search Input */}
          <div className="max-w-2xl">
            <SmartSearchInput
              onSearch={handleSearch}
              placeholder="Search for apartments..."
              autoFocus={false}
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Clear all
                  </Button>
                </div>

                {/* Filter sections would go here */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="text-sm text-muted-foreground">
                      Coming soon
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                    <div className="text-sm text-muted-foreground">
                      Coming soon
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Amenities</label>
                    <div className="text-sm text-muted-foreground">
                      Coming soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Listings Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredApartments.length} {filteredApartments.length === 1 ? 'apartment' : 'apartments'} found
              </p>

              {/* Mobile Filters Button */}
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Grid */}
            {filteredApartments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredApartments.map((apartment) => (
                  <ListingCard key={apartment.id} apartment={apartment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Building className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No apartments found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button variant="outline" onClick={() => window.location.href = '/search'}>
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
