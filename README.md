# OFPPT.pro - Educational Resource Platform

A high-performance React Single Page Application (SPA) designed to serve educational resources for Moroccan vocational training (OFPPT) students.

## Architecture & Engineering
This frontend application is built with a focus on performance and strict separation of concerns:
- **Component-Driven UI**: Strict isolation between presentational elements and stateful business logic containers.
- **Global State Management**: Aggressively caches fetched educational modules (EFM, EFF, TP resources) to minimize redundant network requests and improve TTFB.
- **API Optimization**: Implements lazy-loading and pagination when consuming the REST API to handle thousands of varied resources without blocking the main UI thread.
- **Responsive Design**: Mobile-first CSS architecture featuring custom dark mode support and accessible navigation.

## Tech Stack
- **Framework**: React.js
- **State Management**: React Context / Custom Hooks
- **Styling**: Modular CSS / Responsive Grid
- **Deployment**: Configured for Vercel Edge Networks

## Project Structure
- `src/components/` - Reusable presentational UI elements (Buttons, Cards, Navbars).
- `src/pages/` - Stateful container components mapping to router endpoints.
- `src/services/` - Abstracted API consumption and fetch logic.
- `src/assets/` - Static media and styles.

## Development Setup

```bash
# Install dependencies
npm install

# Start local development server
npm start

# Build for production
npm run build
```

## Deployment Notes
This project is configured to be deployed via Vercel. Ensure environment variables for the production REST API are properly set in the Vercel dashboard prior to triggering a build.
