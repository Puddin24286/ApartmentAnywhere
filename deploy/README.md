# ApartmentAnywhere

A modern platform for long-term apartment rentals, combining the best features of Airbnb and Craigslist without the complications.

## Overview

ApartmentAnywhere simplifies long-term apartment hunting by focusing exclusively on monthly rentals without the complexities of daily bookings, guest management, or hosting responsibilities. Our platform connects tenants directly with landlords for straightforward, professional rental agreements.

## Features

- **Simple Monthly Rentals**: No daily rates or complicated booking systems
- **Direct Landlord Connection**: Communicate directly with property owners
- **Comprehensive Listings**: Detailed apartment information with photos and amenities
- **Clean, Professional Interface**: Easy-to-use platform designed for adults
- **Secure Messaging**: Built-in communication system for inquiries
- **Verified Listings**: Landlord verification process for trust

## Target Audience

- Young professionals seeking 6+ month leases
- Small families looking for stable housing
- Students needing academic-year rentals
- Anyone wanting a simpler alternative to Craigslist's clutter

## Technology Stack

- **Frontend**: React with vanilla JavaScript (no build step needed for simplicity)
- **Backend**: Node.js with Express
- **Database**: (To be implemented) PostgreSQL/MongoDB
- **Authentication**: (To be implemented) OAuth with Google/Facebook
- **Deployment**: (To be implemented) Docker containers with Kubernetes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/apartmentanywhere.git
   ```

2. Navigate to the project directory:
   ```
   cd apartmentanywhere
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Visit `http://localhost:3000` in your browser

## Project Structure

```
apartmentanywhere/
├── public/              # Static files and HTML
├── src/
│   ├── client/          # Frontend React components (future implementation)
│   ├── server/          # Express server and API routes
│   └── shared/          # Shared utilities and types
├── package.json         # Project dependencies and scripts
└── README.md            # This file
```

## Future Enhancements

- User authentication and profiles
- Advanced search and filtering
- Photo gallery for listings
- Messaging system between tenants and landlords
- Payment processing integration
- Mobile-responsive design
- Admin panel for landlords
- Review and rating system

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need for a simpler long-term rental platform
- Designed to bridge the gap between corporate housing and Craigslist