"use client";

import { useState } from "react";
import { ProtectedRoute, AdminLogout } from "@/components/admin/admin-auth";
import { mockApartments } from "@/lib/mock-data";
import { Apartment } from "@/types/apartment";
import { Plus, Edit, Trash2, ArrowLeft, Eye, Search, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function ApartmentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apartments, setApartments] = useState<Apartment[]>(mockApartments);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState<string | null>(null);

  // Filter apartments based on search
  const filteredApartments = apartments.filter((apt) =>
    apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (apartmentToDelete) {
      setApartments(apartments.filter((apt) => apt.id !== apartmentToDelete));
      setIsDeleteDialogOpen(false);
      setApartmentToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Manage Apartments</h1>
                <p className="text-sm text-muted-foreground">
                  {apartments.length} {apartments.length === 1 ? 'apartment' : 'apartments'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AdminLogout onLoggedOut={() => window.location.href = '/admin'} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search apartments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Link href="/admin/apartments/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Apartment
            </Button>
          </Link>
        </div>

        {/* Apartment List */}
        <div className="space-y-4">
          {filteredApartments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No apartments found.</p>
              </CardContent>
            </Card>
          ) : (
            filteredApartments.map((apartment) => (
              <Card key={apartment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{apartment.title}</h3>
                        <Badge variant="outline">{apartment.leaseTerm}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {apartment.city}, {apartment.state}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-semibold">
                          ${apartment.monthlyPrice}/mo
                        </span>
                        <span>•</span>
                        <span>{apartment.bedrooms} bed</span>
                        <span>•</span>
                        <span>{apartment.bathrooms} bath</span>
                        <span>•</span>
                        <span>{apartment.squareFeet.toLocaleString()} sqft</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {apartment.amenities.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {apartment.amenities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{apartment.amenities.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/apartments/edit/${apartment.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/listing/${apartment.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setApartmentToDelete(apartment.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Apartment</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-muted-foreground mb-4">
                Are you sure you want to delete this apartment? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function ManageApartmentsPage() {
  return (
    <ProtectedRoute>
      <ApartmentList />
    </ProtectedRoute>
  );
}
