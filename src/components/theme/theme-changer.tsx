"use client";

/**
 * Theme Changer Component for ApartmentAnywhere
 * Simplified UI for switching between light/dark modes
 */

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function ThemeChanger() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration fix - only render after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  // Determine current effective mode
  const currentMode = theme === "system" ? systemTheme : theme;
  const isDark = currentMode === "dark";

  // Handle light/dark toggle
  const handleModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  // Handle system preference
  const handleSystemMode = () => {
    setTheme("system");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-9 w-9 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-label="Open theme settings"
        >
          {isDark ? (
            <Moon className="h-4 w-4 transition-transform duration-200" />
          ) : (
            <Sun className="h-4 w-4 rotate-0 transition-transform duration-200" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          {/* Header */}
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-foreground">Appearance</h4>
            <p className="text-xs text-muted-foreground">
              Customize theme mode
            </p>
          </div>

          {/* Light/Dark Mode Toggle */}
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="dark-mode" className="flex items-center gap-2 text-foreground">
              <Sun className="h-4 w-4" />
              <span className="text-sm font-medium">Dark Mode</span>
            </Label>
            <Switch
              id="dark-mode"
              checked={isDark}
              onCheckedChange={handleModeToggle}
            />
            <Moon className="h-4 w-4" />
          </div>

          {/* System Preference Button */}
          {theme !== "system" && (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={handleSystemMode}
            >
              <Monitor className="h-4 w-4" />
              Use System Preference
            </Button>
          )}

          {theme === "system" && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Monitor className="h-3 w-3" />
              <span>Following system preference ({systemTheme} mode)</span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
