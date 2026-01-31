"use client";

import { ProtectedRoute } from "@/components/admin/admin-auth";
import { ApartmentForm } from "@/components/admin/apartment-form";
import { mockApartments } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { notFound } from 'next/navigation';
import { Apartment } from "@/types/apartment";

export default function EditApartmentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const apartment = mockApartments.find((apt) => apt.id === params.id);

  if (!apartment) {
    notFound();
  }

  const handleSave = (apartment: Apartment) => {
    // In a real app, this would update in database
    console.log('Updated apartment:', apartment);
    return true;
  };

  return (
    <ProtectedRoute>
      <ApartmentForm apartment={apartment} mode="edit" onSave={handleSave} />
    </ProtectedRoute>
  );
}
