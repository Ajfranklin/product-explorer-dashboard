# Product Explorer

A modern, responsive product browsing application built with Next.js and React. Explore products from the FakeStore API with powerful search, filtering, and favorites functionality.

## Setup Instructions

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd technical-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Features Implemented

### Core Functionality

- **Product Browsing**: Browse all available products in a responsive grid layout
- **Product Details**: View detailed information for individual products including images, descriptions, ratings, and pricing
- **Search**: Real-time search functionality that filters products by title and description, with search terms preserved in the URL
- **Category Filtering**: Filter products by category (electronics, jewelry, men's clothing, women's clothing)
- **Sorting**: Sort products by price (ascending/descending) or default order
- **Favorites System**: Save and manage favorite products with persistent storage using localStorage
- **Favorites Page**: Dedicated page to view and manage all favorited products with sorting capabilities

### User Experience

- **Infinite Scroll**: Automatically loads more products as you scroll, improving performance and user experience
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Responsive Design**: Fully responsive layout that works seamlessly on mobile, tablet, and desktop devices
- **Loading States**: Skeleton loaders and loading indicators provide visual feedback during data fetching
- **Error Handling**: Graceful error states with retry functionality when API requests fail
- **Empty States**: Helpful messages and actions when no products match filters or favorites are empty

### Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **ARIA Labels**: Comprehensive ARIA labels and roles for screen readers
- **Focus Management**: Visible focus indicators and logical tab order
- **Semantic HTML**: Proper use of semantic HTML elements for better accessibility

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **Next.js App Router**: Modern Next.js routing with server components where appropriate
- **Custom Hooks**: Reusable hooks for favorites, products, infinite scroll, and theme management
- **Component Architecture**: Modular, reusable components with clear separation of concerns
- **URL State Management**: Search queries and navigation state reflected in URL parameters

## Assumptions / Trade-offs

### Data Source

- **External API Dependency**: The application relies on the FakeStore API (`https://fakestoreapi.com`) for product data. This is a third-party service, so availability and response times are outside our control.
- **No Backend**: All data fetching happens client-side. There's no custom backend or database.

### Favorites Storage

- **LocalStorage Only**: Favorites are stored exclusively in the browser's localStorage. This means:
  - Favorites are device/browser-specific and don't sync across devices
  - Favorites are lost if the user clears browser data
  - No user accounts or authentication required

### Performance Considerations

- **Client-Side Filtering**: All products are fetched and filtered on the client side. For a large catalog, this could impact performance, but works well for the current dataset size.
- **No Pagination API**: The infinite scroll is implemented client-side by showing subsets of already-loaded products, rather than fetching additional pages from the API.

### Feature Limitations

- **No Shopping Cart**: The application focuses on browsing and favoriting products. There's no cart functionality or checkout process.
- **No User Authentication**: The app doesn't require user accounts or login. All features work without authentication.
- **No Product Reviews**: While product ratings are displayed, users cannot add their own reviews or ratings.
- **Static Product Data**: Product information is read-only. There's no ability to edit product details or add new products.

### Browser Support

- **Modern Browsers**: The application targets modern browsers that support ES6+ features, localStorage, and CSS Grid/Flexbox.
- **No IE11 Support**: Internet Explorer 11 is not supported.

### Styling

- **Tailwind CSS**: Uses Tailwind CSS for styling. Custom animations and transitions are implemented inline.
- **No CSS-in-JS**: Styling is done through Tailwind utility classes rather than CSS-in-JS solutions like styled-components.

---

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS.
