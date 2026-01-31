"use client";

import { ProtectedRoute } from "@/components/admin/admin-auth";
import { ApartmentForm } from "@/components/admin/apartment-form";
import { mockApartments } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { Apartment } from "@/types/apartment";

export default function NewApartmentPage() {
  const router = useRouter();

  const handleSave = (apartment: Apartment) => {
    // In a real app, this would save to database
    console.log('Created apartment:', apartment);
    return true;
  };

  return (
    <ProtectedRoute>
      <ApartmentForm mode="create" onSave={handleSave} />
    </ProtectedRoute>
  );
}
