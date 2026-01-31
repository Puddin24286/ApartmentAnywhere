"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Search, Sparkles, Loader2, X, HelpCircle, MapPin, DollarSign, Maximize2, Home, Calendar, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface SmartSearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isSearching?: boolean;
  className?: string;
  showInlinePreview?: boolean;
  autoFocus?: boolean;
}

const EXAMPLE_QUERIES = [
  "2 bedroom apartment in Austin under $2000",
  "1 bedroom near downtown with parking",
  "3 bedroom apartment in Dallas with washer dryer",
  "studio apartment in Houston under $1500",
  "pet friendly 2 bedroom in San Antonio",
];

export function SmartSearchInput({
  onSearch,
  placeholder = 'Try: "2 bedroom apartment in Austin under $2000"',
  isSearching = false,
  className,
  showInlinePreview = true,
  autoFocus = false,
}: SmartSearchInputProps) {
  const [query, setQuery] = useState("");
  const [showExamples, setShowExamples] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query.trim());
    setShowExamples(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === "Escape") {
      setShowExamples(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    setShowExamples(false);
    textareaRef.current?.focus();
  };

  const handleClear = () => {
    setQuery("");
    textareaRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Main Input Container */}
      <div className="relative group">
        {/* Gradient Glow Effect */}
        <div className="absolute -inset-1 rounded-xl blur-md opacity-40 group-hover:opacity-60 group-focus-within:opacity-70 transition-all duration-500"
          style={{
            background: `linear-gradient(to right, hsl(var(--search-glow-from)), hsl(var(--search-glow-via)), hsl(var(--search-glow-to)))`
          }}
        />

        <div className="relative rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden bg-background dark:bg-background/95">
          {/* Input Row */}
          <div className="flex items-center px-3 py-2 gap-2.5">
            {/* AI Indicator */}
            <div className="flex-shrink-0">
              <Sparkles className={cn(
                "h-5 w-5 transition-all duration-300 text-[hsl(var(--search-glow-from))]",
                isSearching && "animate-pulse"
              )} />
            </div>

            {/* Textarea Input */}
            <textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (!query.trim()) setShowExamples(true);
              }}
              placeholder={placeholder}
              rows={1}
              className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 focus:outline-none bg-background text-foreground text-sm placeholder:text-muted-foreground/60 px-0 py-0 min-h-[36px]"
              autoFocus={autoFocus}
            />

            {/* Clear Button */}
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-8 w-8 p-0 rounded-full hover:bg-muted flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={!query.trim() || isSearching}
              className="text-white h-9 w-9 p-0 rounded-full"
              style={{
                background: `linear-gradient(to right, hsl(var(--search-glow-from)), hsl(var(--search-glow-to)))`,
                boxShadow: `0 4px 14px hsl(var(--search-glow-shadow))`
              }}
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>

            {/* Help Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full hover:bg-muted hidden sm:flex"
                >
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <h4 className="font-semibold mb-2 text-sm">Smart Search Tips</h4>
                <ul className="text-xs space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Building className="h-3.5 w-3.5 mt-0.5 text-[hsl(var(--search-glow-from))]" />
                    <span>Specify beds/baths: "2 bedroom", "1 bathroom"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 text-[hsl(var(--search-glow-from))]" />
                    <span>Add location: "in Austin", "near downtown"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-3.5 w-3.5 mt-0.5 text-[hsl(var(--search-glow-from))]" />
                    <span>Set budget: "under $2000", "between $1500 and $2500"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Home className="h-3.5 w-3.5 mt-0.5 text-[hsl(var(--search-glow-from))]" />
                    <span>Add amenities: "with parking", "washer dryer", "pet friendly"</span>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile Action Bar */}
          <div className="sm:hidden flex items-center justify-between px-3 pb-3 pt-0">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 rounded-lg hover:bg-muted text-xs text-muted-foreground"
              onClick={() => setShowExamples(!showExamples)}
            >
              <HelpCircle className="h-4 w-4 mr-1.5" />
              Tips
            </Button>
          </div>
        </div>
      </div>

      {/* Example Queries Dropdown */}
      {showExamples && !query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="bg-background rounded-xl shadow-2xl overflow-hidden border">
            <div className="px-3 py-2 bg-muted">
              <span className="text-xs font-medium text-muted-foreground">
                Try searching for...
              </span>
            </div>
            <div className="flex flex-col max-h-64 overflow-y-auto">
              {EXAMPLE_QUERIES.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="w-full px-3 py-2.5 text-left hover:bg-muted/50 active:bg-muted transition-colors flex items-center gap-2.5 group"
                >
                  <Search className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 transition-colors group-hover:text-[hsl(var(--search-glow-from))]" />
                  <span className="text-xs text-foreground/80 group-hover:text-foreground">{example}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
