# ApartmentAnywhere

**Stay a While. Anywhere.**

A modern platform for long-term apartment rentals, combining the best features of Airbnb and Craigslist without the complications.

## Overview

ApartmentAnywhere simplifies long-term apartment hunting by focusing exclusively on monthly rentals without the complexities of daily bookings, guest management, or hosting responsibilities. Our platform connects tenants directly with landlords for straightforward, professional rental agreements.

## Features

- **Smart Search**: Natural language search to find your perfect apartment
- **Monthly Rentals**: No daily rates or complicated booking systems
- **Admin Panel**: Easy-to-use interface for landlords to manage listings
- **Inline Editing**: Update content without touching code
- **Responsive Design**: Beautiful interface that works on all devices
- **Light/Dark Mode**: Toggle between themes

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Language**: TypeScript 5.9 (strict mode)
- **Styling**: Tailwind CSS 3.4 with shadcn/ui components
- **Icons**: lucide-react
- **Theming**: next-themes for light/dark mode support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Puddin24286/ApartmentAnywhere.git
   cd ApartmentAnywhere
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` in your browser

### Admin Access

1. Go to `http://localhost:3000/admin`
2. Enter PIN: `1234` (configurable in `.env.local`)

## Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── admin/            # Admin panel routes
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Homepage
│   └── search/           # Search page
├── components/
│   ├── admin/            # Admin components
│   ├── editing/          # Inline editing components
│   ├── home/             # Homepage components
│   ├── layout/           # Header, footer
│   ├── listing/          # Listing cards
│   ├── theme/            # Theme components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and data
├── styles/               # Global styles
└── types/                # TypeScript types
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## License

This project is licensed under the MIT License.
