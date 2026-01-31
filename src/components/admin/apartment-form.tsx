"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Apartment, ApartmentFormData } from "@/types/apartment";
import { mockApartments } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { availableAmenities, texasCities, leaseTerms } from "@/lib/mock-data";

interface ApartmentFormProps {
  apartment?: Apartment;
  mode: 'create' | 'edit';
  onSave?: (apartment: Apartment) => void;
}

const availableBedrooms = [0, 1, 2, 3, 4, 5];
const availableBathrooms = [1, 2, 3, 4, 5];
const availableSquareFeetage = [
  300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1500, 1800, 2000, 2500, 3000
];

export function ApartmentForm({ apartment, mode = 'create', onSave }: ApartmentFormProps) {
  const router = useRouter();
  const isEdit = mode === 'edit';

  // Form state
  const [formData, setFormData] = useState<ApartmentFormData>({
    title: apartment?.title || "",
    description: apartment?.description || "",
    monthlyPrice: apartment?.monthlyPrice || 0,
    bedrooms: apartment?.bedrooms || 1,
    bathrooms: apartment?.bathrooms || 1,
    squareFeet: apartment?.squareFeet || 600,
    address: apartment?.address || "",
    city: apartment?.city || "Austin",
    state: apartment?.state || "TX",
    zipCode: apartment?.zipCode || "",
    amenities: apartment?.amenities || [],
    availableDate: apartment?.availableDate || "",
    leaseTerm: apartment?.leaseTerm || "12 months"
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(formData.amenities);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (formData.monthlyPrice < 0) {
      newErrors.monthlyPrice = "Price must be positive";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const apartmentData: Apartment = {
      id: apartment?.id || `apt-${Date.now()}`,
      ...formData,
      amenities: selectedAmenities,
      images: apartment?.images || [],
      landlordId: apartment?.landlordId || "admin-1",
      createdAt: apartment?.createdAt || new Date()
    };

    // In a real app, this would save to a database
    console.log('Saving apartment:', apartmentData);

    if (onSave) {
      onSave(apartmentData);
    } else if (isEdit) {
      // Navigate back to list
      router.push('/admin/apartments');
    } else {
      // Navigate to the new listing
      router.push('/admin/apartments');
    }
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/apartments">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">
                  {isEdit ? 'Edit Apartment' : 'Add New Apartment'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isEdit ? 'Update apartment details' : 'Fill in the details below'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Modern Downtown Loft"
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyPrice">Monthly Price ($) *</Label>
                  <Input
                    id="monthlyPrice"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.monthlyPrice}
                    onChange={(e) => setFormData({ ...formData, monthlyPrice: Number(e.target.value) })}
                    placeholder="2200"
                    className={errors.monthlyPrice ? 'border-destructive' : ''}
                  />
                  {errors.monthlyPrice && (
                    <p className="text-sm text-destructive">{errors.monthlyPrice}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the apartment..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main St"
                    className={errors.address ? 'border-destructive' : ''}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Austin"
                    className={errors.city ? 'border-destructive' : ''}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <select
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="TX">Texas</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="78701"
                    className={errors.zipCode ? 'border-destructive' : ''}
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-destructive">{errors.zipCode}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <select
                    id="bedrooms"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {availableBedrooms.map((num) => (
                      <option key={num} value={num}>
                        {num === 0 ? 'Studio' : `${num} bed${num > 1 ? 's' : ''}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <select
                    id="bathrooms"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {availableBathrooms.map((num) => (
                      <option key={num} value={num}>
                        {num} bath{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="squareFeet">Square Feet</Label>
                  <select
                    id="squareFeet"
                    value={formData.squareFeet}
                    onChange={(e) => setFormData({ ...formData, squareFeet: Number(e.target.value) })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {availableSquareFeetage.map((sqft) => (
                      <option key={sqft} value={sqft}>
                        {sqft.toLocaleString()} sqft
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="availableDate">Available Date</Label>
                  <Input
                    id="availableDate"
                    type="date"
                    value={formData.availableDate}
                    onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leaseTerm">Lease Term</Label>
                  <select
                    id="leaseTerm"
                    value={formData.leaseTerm}
                    onChange={(e) => setFormData({ ...formData, leaseTerm: e.target.value })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {leaseTerms.map((term) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableAmenities.map((amenity) => (
                  <button
                    key={amenity.name}
                    type="button"
                    onClick={() => toggleAmenity(amenity.name)}
                    className={`
                      p-3 rounded-md border-2 text-sm transition-all
                      hover:border-primary/50
                      ${
                        selectedAmenities.includes(amenity.name)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted hover:bg-muted/50'
                      }
                    `}
                  >
                    {amenity.name}
                  </button>
                ))}
              </div>
              {selectedAmenities.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Selected ({selectedAmenities.length})</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedAmenities([])}
                    >
                      Clear all
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedAmenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => toggleAmenity(amenity)}
                      >
                        {amenity}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link href="/admin/apartments">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Saving...' : isEdit ? 'Update Apartment' : 'Create Apartment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
