"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Building } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export interface Apartment {
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
  zipCode: string;
  amenities: string[];
  images: string[];
  availableDate: string;
  leaseTerm: string;
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

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">
              For Rent
            </Badge>
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              {apartment.leaseTerm}
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

          {/* Title */}
          <h3 className="font-semibold text-base mb-1 line-clamp-1">{apartment.title}</h3>

          {/* Address */}
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
