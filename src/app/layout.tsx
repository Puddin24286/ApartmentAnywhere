import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/components/providers/providers";

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true
});

export const metadata = {
  title: {
    default: "ApartmentAnywhere - Stay a While. Anywhere.",
    template: "%s | ApartmentAnywhere"
  },
  description: "Stay a While. Anywhere. Find your perfect monthly apartment rental without long-term leases. Flexible, hassle-free living across Texas.",
  keywords: [
    "apartments for rent",
    "monthly rentals",
    "flexible leases",
    "apartment listings",
    "rental housing",
    "apartments",
    "housing rental",
    "short-term rentals",
    "Texas apartments"
  ],
  authors: [{ name: 'ApartmentAnywhere' }],
  creator: 'ApartmentAnywhere',
  publisher: 'ApartmentAnywhere',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-background text-foreground`}>
        <Providers>
          <main className="flex-1 w-full">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
