/**
 * Apartment Types
 * Type definitions for apartment listings and related entities
 */

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
  leaseTerm: string; // "6 months", "12 months", "Flexible", etc.
  landlordId: string;
  createdAt: Date;
}

export interface ApartmentFilters {
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  state?: string;
  amenities?: string[];
  leaseTerm?: string;
  availableBefore?: string;
  squareFeetMin?: number;
  squareFeetMax?: number;
}

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
  category: 'essential' | 'luxury' | 'lifestyle' | 'utilities';
}

export interface ApartmentImage {
  id: string;
  url: string;
  caption?: string;
  order: number;
}

export interface ApartmentWithDetails extends Omit<Apartment, 'images'> {
  images: ApartmentImage[];
  landlord?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    responseRate?: number;
  };
}

// Form types for creating/editing apartments
export interface ApartmentFormData {
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
  availableDate: string;
  leaseTerm: string;
}

// Search result types
export interface SearchResult {
  apartment: Apartment;
  matchScore?: number;
  highlightedFields?: string[];
}

// Pagination types
export interface PaginatedApartments {
  data: Apartment[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
