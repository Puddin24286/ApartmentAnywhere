"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmartSearchInput } from '@/components/search/smart-search-input';

/**
 * Home Page Hero Component for ApartmentAnywhere
 * Main hero section with search functionality
 */
export default function HomePageHero() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const handleNaturalLanguageSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      // Navigate to search page with query parameter
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } catch (error) {
      console.error('Search navigation error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative text-white overflow-hidden">
      {/* Background Gradient - No image needed for MVP */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-700 to-purple-800 dark:from-cyan-900 dark:via-blue-900 dark:to-purple-950" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Flex container to center and stack heading and subtitle */}
          <div className="flex flex-col items-center gap-8 mb-10">
            {/* Heading with backdrop blur */}
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-3xl px-8 py-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 drop-shadow-2xl text-white">
                Stay a While.
                <span className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent mt-2">
                  Anywhere.
                </span>
              </h1>
            </div>

            {/* Subtitle with backdrop */}
            <div className="backdrop-blur-sm bg-white/5 dark:bg-black/10 rounded-2xl px-6 py-4">
              <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-2xl font-medium flex items-center justify-center gap-4 md:gap-8">
                <span>Monthly apartments</span>
                <span className="text-cyan-300">•</span>
                <span>No leases</span>
                <span className="text-cyan-300">•</span>
                <span>Flexible stays</span>
              </p>
            </div>
          </div>

          {/* Natural Language Search */}
          <div className="max-w-3xl mx-auto mb-8">
            <SmartSearchInput
              onSearch={handleNaturalLanguageSearch}
              isSearching={isSearching}
              placeholder='Try: "2 bedroom apartment in Austin under $2000"'
              showInlinePreview={true}
              autoFocus={false}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 font-semibold"
            >
              <Link href="/search">Browse Apartments</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white backdrop-blur-md bg-white/10 text-white hover:bg-white hover:text-blue-900 shadow-2xl transition-all hover:scale-105 font-semibold"
            >
              <Link href="/#how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
