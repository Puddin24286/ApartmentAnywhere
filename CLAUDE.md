# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ApartmentAnywhere is a Next.js 16 long-term apartment rental platform built with React 19, Tailwind CSS, and shadcn/ui components. It provides apartment listing, search, and management capabilities for monthly apartment rentals without long-term leases.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Language**: TypeScript 5.9 (strict mode)
- **Styling**: Tailwind CSS 3.4 with shadcn/ui components
- **State Management**: React hooks (useState, useEffect, Suspense)
- **Icons**: lucide-react
- **Theming**: next-themes for light/dark mode support
- **UI Components**: shadcn/ui (Radix UI primitives)

## Essential Commands

### Development
```bash
npm run dev                # Start development server (Turbopack)
npm run build              # Production build
npm start                  # Start production server
npm run clean              # Clean .next cache
```

### Testing
No tests configured yet - this is a TODO for future implementation.

## Architecture

### Directory Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Homepage with hero and featured listings
│   ├── search/          # Search results page
│   │   └── page.tsx
│   └── admin/           # Admin panel for managing apartments
│       ├── page.tsx     # Admin dashboard
│       └── apartments/  # Apartment CRUD
│           ├── page.tsx       # List all apartments
│           ├── new/page.tsx   # Add new apartment
│           └── edit/[id]/page.tsx  # Edit apartment
├── components/           # React components
│   ├── ui/              # shadcn/ui primitives
│   ├── layout/          # Header component
│   ├── home/            # Homepage components (hero, featured listings)
│   ├── search/          # Smart search input component
│   ├── listing/         # Listing card component
│   ├── theme/           # Theme provider and theme changer
│   ├── logo/           # ApartmentAnywhere logo
│   ├── admin/          # Admin-specific components
│   │   ├── admin-auth.tsx      # PIN-based authentication
│   │   └── apartment-form.tsx  # Add/edit apartment form
│   ├── editing/        # Inline editing components
│   │   ├── editable-text.tsx   # Inline text editing
│   │   └── editable-number.tsx # Inline number/price editing
│   └── providers/       # App-wide providers
├── lib/                  # Shared utilities
│   ├── utils.ts         # Helper functions (cn, formatCurrency, etc.)
│   ├── admin-auth.ts    # Admin authentication functions
│   └── mock-data.ts     # Sample apartment data
├── styles/              # Global styles
│   └── globals.css     # Tailwind + theme CSS variables
└── types/               # TypeScript type definitions
    └── apartment.ts    # Apartment interfaces
```

### Key Patterns

#### Component Structure
- Functional components with arrow functions
- Use `'use client'` directive for components using hooks/state
- Path alias: `@/*` maps to `src/*`

#### Styling Conventions
- Tailwind CSS utility classes for all styling
- CSS variables for theme colors (light/dark mode)
- shadcn/ui components for consistent UI patterns
- `cn()` utility for conditional class merging

#### State Management
- React hooks (useState, useEffect) for local state
- Suspense boundaries for dynamic content (search params)
- No global state management yet (TODO: add if needed)

## Component Reference

### Pages

| Page | Route | Purpose |
|------|-------|---------|
| `src/app/page.tsx` | `/` | Homepage with hero, featured listings, how-it-works |
| `src/app/search/page.tsx` | `/search` | Search results with filters sidebar |
| `src/app/admin/page.tsx` | `/admin` | Admin dashboard (PIN-protected) |
| `src/app/admin/apartments/page.tsx` | `/admin/apartments` | List all apartments |
| `src/app/admin/apartments/new/page.tsx` | `/admin/apartments/new` | Add new apartment |
| `src/app/admin/apartments/edit/[id]/page.tsx` | `/admin/apartments/edit/[id]` | Edit apartment |

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `HomePageHero` | `src/components/home/` | Hero section with smart search |
| `FeaturedListings` | `src/components/home/` | Grid of featured apartments |
| `SmartSearchInput` | `src/components/search/` | Natural language search input |
| `ListingCard` | `src/components/listing/` | Apartment listing card |
| `Header` | `src/components/layout/` | Site navigation header |
| `ThemeChanger` | `src/components/theme/` | Light/dark mode toggle |
| `ProtectedRoute` | `src/components/admin/admin-auth.tsx` | Admin page wrapper |
| `ApartmentForm` | `src/components/admin/apartment-form.tsx` | Add/edit apartment form |
| `EditableText` | `src/components/editing/editable-text.tsx` | Inline text editing |
| `EditableNumber` | `src/components/editing/editable-number.tsx` | Inline number/price editing |

## Type Definitions

### Apartment Interface
```typescript
interface Apartment {
  id: string;
  title: string;
  description: string;
  monthlyPrice: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  amenities: string[];
  images: string[];
  availableDate: string;
  leaseTerm: string;
  landlordId: string;
  createdAt: Date;
}
```

## Theme System

The application supports:
- **Light mode** - Default bright theme with cyan/blue accents
- **Dark mode** - Tron-inspired futuristic neon theme

Theme is controlled via the theme changer button in the header (sun/moon icon).

## Admin Panel

The admin panel allows non-coders to manage apartment listings without touching code.

### Authentication
- **PIN-based login**: Default PIN is `1234` (configurable in `src/lib/admin-auth.ts`)
- **Session timeout**: 2 hours of inactivity
- **Storage**: Uses localStorage for persistent login, sessionStorage for timeout tracking

### Admin Routes
| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard with stats and quick actions |
| `/admin/apartments` | List all apartments with search, edit, delete |
| `/admin/apartments/new` | Create new apartment |
| `/admin/apartments/edit/[id]` | Edit existing apartment |

### Using the Admin Panel
```typescript
// Wrap any admin page with ProtectedRoute
import { ProtectedRoute } from "@/components/admin/admin-auth";

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <YourAdminContent />
    </ProtectedRoute>
  );
}
```

### ProtectedRoute Component
- Checks if user is authenticated via PIN
- Redirects to login form if not authenticated
- Validates session timeout (2 hours)
- Shows login UI with 4-digit PIN input

## Inline Editing

Inline editing components allow non-coders to edit content directly on the page by double-clicking.

### EditableText Component
For editing text content inline (titles, descriptions, etc.):

```typescript
import { EditableText } from '@/components/editing/editable-text';

<EditableText
  content={title}
  onSave={async (newTitle) => {
    // Save to database/API
    return true; // Return true on success
  }}
  placeholder="Enter title..."
  maxLength={100}
  multiline={false}  // Set true for multi-line textarea
/>
```

**Features:**
- Double-click to edit
- Enter to save, Esc to cancel
- Visual feedback (success/error icons)
- Optional multi-line mode

### EditableNumber Component
For editing numbers (prices, dimensions, etc.):

```typescript
import { EditableNumber } from '@/components/editing/editable-number';

<EditableNumber
  value={price}
  onSave={async (newPrice) => {
    // Save to database/API
    return true;
  }}
  prefix="$"
  suffix="/mo"
  min={0}
  step={1}
  decimals={0}
/>
```

**Features:**
- Double-click to edit
- Prefix/suffix formatting ($, /mo, sqft, etc.)
- Min/max validation
- Decimal precision control

### EditablePrice Component (convenience wrapper)
```typescript
import { EditablePrice } from '@/components/editing/editable-number';

<EditablePrice
  value={monthlyPrice}
  onSave={(newValue) => true}
  min={0}
/>
```

### When to Use Inline Editing vs Admin Panel
| Use Inline Editing | Use Admin Panel |
|-------------------|-----------------|
| Quick text/price updates | Creating new listings |
| Minor content tweaks | Managing multiple listings |
| On-page editing convenience | Complex form validation |
| Single field updates | Bulk operations |

## Development Guidelines

### When Adding New Features

1. **Pages**: Create in `src/app/` following App Router conventions
2. **Components**: Use functional components with arrow functions
3. **Styling**: Use Tailwind CSS utilities + shadcn/ui components
4. **Types**: Define interfaces in `src/types/`
5. **Client Components**: Add `'use client'` directive at top of file

### Code Style

```typescript
// Functional component with arrow function
const MyComponent = () => {
  return <div>Content</div>
}

// Use cn() for conditional classes
import { cn } from '@/lib/utils'
<div className={cn('base-class', isActive && 'active-class')} />

// Format currency/values
import { formatCurrency } from '@/lib/utils'
<span>{formatCurrency(price)}/month</span>
```

### shadcn/ui Component Usage

```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

<Button variant="default" size="lg">Click me</Button>
```

## Mock Data

Sample apartment listings are in `src/lib/mock-data.ts`:
- 12 apartments across Texas cities (Austin, Dallas, Houston, San Antonio, etc.)
- Price range: $1,100 - $7,500/month
- Various sizes: Studio to 4-bedroom

## Common Tasks

### Adding a New Page
1. Create `src/app/your-page/page.tsx`
2. Export a default component
3. Add navigation in header or other components

### Adding a New Component
1. Create in appropriate `src/components/` subdirectory
2. Use functional component pattern with arrow functions
3. Add `'use client'` if using React hooks

### Updating Theme Colors
Edit `src/styles/globals.css`:
- `:root` for light mode variables
- `.dark` for dark mode variables
- CSS variables use HSL color format

## Build & Deployment

- **Build command**: `npm run build`
- **Build output**: `.next/` directory
- **Static generation**: Pages are pre-rendered at build time
- **Development**: Turbopack (Next.js 16 default)

## Environment Variables

Create `.env.local` for local development (none needed currently):
```bash
# No environment variables required for basic functionality
# Future: DATABASE_URL, NEXTAUTH_SECRET, etc.
```

## Package Management

```bash
# Install a new shadcn/ui component
npx shadcn@latest add [component-name]

# Install a new dependency
npm install [package-name]
```

## Known Limitations (TODO)

- Admin authentication is PIN-based (simple, not enterprise-grade)
- No database integration (using mock data - console.log for saves)
- No API routes for CRUD operations
- No map view (Mapbox integration planned)
- No messaging system
- No photo upload capability
- Inline editing components created but not integrated into main pages yet

## Git Workflow

- No pre-commit hooks configured
- Always run `npm run build` before committing
- Commit messages should be descriptive
- Don't push unless explicitly instructed

## Important Notes

- **Next.js 16** uses Turbopack by default (faster builds)
- **React 19** is used (latest features available)
- **Server Components** are default; add `'use client'` only when needed
- **Path aliases** configured: `@/*` → `src/*`
- **shadcn/ui components** in `src/components/ui/`
- **Mock data** in `src/lib/mock-data.ts` for initial development
