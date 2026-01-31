/**
 * Simple Admin Authentication
 *
 * For MVP: A simple PIN-based admin system
 * In production, replace with proper authentication (NextAuth.js, Clerk, etc.)
 */

const ADMIN_PIN = process.env.ADMIN_PIN || "1234"; // Default PIN, should be in .env.local

/**
 * Verify admin PIN
 */
export function verifyAdminPin(pin: string): boolean {
  return pin === ADMIN_PIN;
}

/**
 * Set admin session in localStorage
 */
export function setAdminSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('isAdmin', 'true');
  sessionStorage.setItem('adminLoginTime', Date.now().toString());
}

/**
 * Check if user is logged in as admin
 */
export function isAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isAdmin') === 'true';
}

/**
 * Clear admin session
 */
export function clearAdminSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('isAdmin');
  sessionStorage.removeItem('adminLoginTime');
}

/**
 * Check admin session timeout (2 hours)
 */
export function isAdminSessionValid(): boolean {
  if (typeof window === 'undefined') return false;

  const loginTime = sessionStorage.getItem('adminLoginTime');
  if (!loginTime) return false;

  const elapsed = Date.now() - parseInt(loginTime);
  const TWO_HOURS = 2 * 60 * 60 * 1000;

  if (elapsed > TWO_HOURS) {
    clearAdminSession();
    return false;
  }

  return true;
}
