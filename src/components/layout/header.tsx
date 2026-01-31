"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/logo";
import { ThemeChanger } from "@/components/theme/theme-changer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, X, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Header Component for ApartmentAnywhere
 * Simplified responsive navigation for apartment search
 */
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Hide header search on search page to avoid redundancy
  const isSearchPage = pathname === '/search' || pathname?.startsWith('/search');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    try {
      // Navigate to search page with query parameter
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } catch (error) {
      console.error('Search navigation error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If already on home page, scroll to top instead of navigating
    if (pathname === "/" || pathname === "/home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
      {/* Logo - Always visible, different sizes for mobile/desktop */}
      <Link href="/" className="shrink-0" onClick={handleHomeClick}>
        <div className="hidden lg:block">
          <Logo size="lg" variant="pulse" />
        </div>
        <div className="lg:hidden">
          <Logo size="md" variant="pulse" />
        </div>
      </Link>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Smart Search Input - Hidden on search page */}
        {!isSearchPage && (
          <div className="hidden sm:block w-[200px] md:w-[280px] lg:w-[360px]">
            <div className="relative group">
              {/* Gradient Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg blur-md opacity-30 group-hover:opacity-50 group-focus-within:opacity-60 transition-all duration-500" />

              <div className="relative rounded-md shadow-sm hover:shadow-md transition-all duration-300 bg-background dark:bg-slate-700/90">
                {/* Main Input Row */}
                <div className="flex items-center gap-1.5 px-2 py-1">
                  {/* AI Indicator */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Sparkles className={cn(
                        "h-3 w-3 text-[hsl(var(--icon-header-base))] hover:text-[hsl(var(--icon-header-hover))] transition-all duration-300",
                        isSearching && "animate-pulse"
                      )} />
                      {isSearching && (
                        <div className="absolute -inset-0.5 bg-cyan-300/25 rounded-full animate-ping" />
                      )}
                    </div>
                  </div>

                  {/* Textarea Input */}
                  <textarea
                    ref={textareaRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search apartments..."
                    rows={1}
                    className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 focus:outline-none bg-transparent text-foreground text-xs leading-tight placeholder:text-muted-foreground/60 px-0 py-0.5 min-h-[20px] h-5"
                  />

                  {/* Action Buttons */}
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    {/* Clear Button */}
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearSearch}
                        className="h-5 w-5 p-0 rounded-full hover:bg-muted"
                      >
                        <X className="h-2.5 w-2.5" />
                      </Button>
                    )}

                    {/* Search Button */}
                    <Button
                      onClick={handleSearch}
                      disabled={!searchQuery.trim() || isSearching}
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white h-9 w-9 p-0 rounded-full shadow-sm shadow-cyan-500/20"
                    >
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Link (for site owners) */}
        <Link href="/admin">
          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
          >
            Admin
          </Button>
        </Link>

        {/* Theme Changer */}
        <ThemeChanger />

        {/* Register Button (placeholder - auth not implemented yet) */}
        <Button
          variant="default"
          size="sm"
          onClick={() => {/* TODO: Implement auth */}}
          className="hidden md:inline-flex shrink-0"
        >
          List Your Apartment
        </Button>
      </div>
    </div>
  );
};

export default Header;
