import HomePageHero from "@/components/home/home-page-hero";
import { FeaturedListings } from "@/components/home/featured-listings";
import Link from "next/link";

// Mock data for initial development
const mockApartments = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    description: "Stunning loft in the heart of downtown",
    monthlyPrice: 2200,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    address: "123 Main St",
    city: "Austin",
    state: "TX",
    amenities: ["Parking", "Washer/Dryer", "Gym"],
    images: [],
    availableDate: "2025-02-01"
  },
  {
    id: "2",
    title: "Cozy Studio Apartment",
    description: "Perfect for singles or couples",
    monthlyPrice: 1450,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    address: "456 Oak Ave",
    city: "Austin",
    state: "TX",
    amenities: ["Pet Friendly", "Pool"],
    images: [],
    availableDate: "2025-02-15"
  },
  {
    id: "3",
    title: "Spacious Family Home",
    description: "Great for families, near schools",
    monthlyPrice: 3500,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2400,
    address: "789 Maple Dr",
    city: "Dallas",
    state: "TX",
    amenities: ["Parking", "Backyard", "Pet Friendly"],
    images: [],
    availableDate: "2025-03-01"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HomePageHero />
      <FeaturedListings apartments={mockApartments} />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find your perfect apartment in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-muted-foreground">
                Use our smart search to describe your ideal apartment
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book</h3>
              <p className="text-muted-foreground">
                Contact landlords and book your stay online
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Move In</h3>
              <p className="text-muted-foreground">
                Arrive at your new apartment and feel at home
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 ApartmentAnywhere. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
