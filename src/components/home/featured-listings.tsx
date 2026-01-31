"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Home, Building, Calendar, Star } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Apartment {
  id: string;
  title: string;
  description: string;
  monthlyPrice: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  address: string;
  city: string;
  state: string;
  amenities: string[];
  images: string[];
  availableDate: string;
}

interface ListingCardProps {
  apartment: Apartment;
}

export function ListingCard({ apartment }: ListingCardProps) {
  return (
    <Link href={`/listing/${apartment.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
        {/* Image */}
        <div className="relative h-48 bg-muted overflow-hidden">
          {/* Placeholder gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Building className="h-16 w-16 text-muted-foreground/30" />
          </div>

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">
              For Rent
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Price */}
          <div className="mb-2">
            <span className="text-2xl font-bold text-foreground">
              {formatCurrency(apartment.monthlyPrice)}
            </span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>

          {/* Address */}
          <h3 className="font-semibold text-base mb-1 line-clamp-1">{apartment.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {apartment.city}, {apartment.state}
          </p>

          {/* Specs */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Home className="h-3 w-3" />
              {apartment.bedrooms} bed
            </span>
            <span>•</span>
            <span>{apartment.bathrooms} bath</span>
            <span>•</span>
            <span>{apartment.squareFeet.toLocaleString()} sqft</span>
          </div>

          {/* Amenities preview */}
          <div className="flex flex-wrap gap-1">
            {apartment.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {apartment.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{apartment.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface FeaturedListingsProps {
  apartments?: Apartment[];
}

export function FeaturedListings({ apartments = [] }: FeaturedListingsProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Apartments</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover hand-picked apartments from trusted landlords
          </p>
        </div>

        {apartments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {apartments.map((apartment) => (
              <ListingCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No featured apartments at this time.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/search">View All Apartments</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
