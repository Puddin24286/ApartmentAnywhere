"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, LogOut, ShieldCheck, ShieldAlert } from "lucide-react";
import { verifyAdminPin, setAdminSession, isAdmin, clearAdminSession, isAdminSessionValid } from "@/lib/admin-auth";

interface AdminAuthProps {
  onAuthenticated: () => void;
}

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (verifyAdminPin(pin)) {
      setAdminSession();
      onAuthenticated();
    } else {
      setError("Invalid PIN. Please try again.");
      setPin("");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            <ShieldAlert className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter your PIN to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pin">Admin PIN</Label>
              <Input
                id="pin"
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  // Only allow numbers
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setPin(value);
                }}
                placeholder="Enter 4-digit PIN"
                className="text-center text-lg tracking-widest"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2 text-sm text-destructive">
                <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="bg-muted/50 rounded-md p-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2 mb-1">
                <Lock className="h-4 w-4" />
                <span className="font-medium">Default PIN: 1234</span>
              </p>
              <p className="text-xs">Change this by setting ADMIN_PIN in .env.local</p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={pin.length !== 4 || isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Login to Admin Panel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

interface AdminLogoutProps {
  onLoggedOut: () => void;
}

export function AdminLogout({ onLoggedOut }: AdminLogoutProps) {
  const handleLogout = () => {
    clearAdminSession();
    onLoggedOut();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}

interface AdminCheckProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminCheck({ children, fallback }: AdminCheckProps) {
  if (isAdmin() && isAdminSessionValid()) {
    return <>{children}</>;
  }
  return <>{fallback || null}</>;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(isAdmin() && isAdminSessionValid());

  // Check session validity periodically
  if (typeof window !== 'undefined') {
    setInterval(() => {
      if (!isAdminSessionValid()) {
        setIsAuthenticated(false);
      }
    }, 60000); // Check every minute
  }

  if (!isAuthenticated) {
    return (
      <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
    );
  }

  return <>{children}</>;
}
