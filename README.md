# StudyUp

StudyUp is a modern educational platform designed to streamline access to academic resources, including course materials, modules, and administrative files for OFPPT students. 

## Features
- **Dynamic Resource Navigation**: Seamlessly browse through academic years, specializations (filières), and specific modules.
- **Modern UI/UX**: Designed with a premium glassmorphism aesthetic, featuring fluid animations, dark/light mode toggles, and responsive grids.
- **SEO Optimized**: Automatically generates static sitemaps and properly configures meta tags for search engine visibility.

## Tech Stack
- **Frontend**: Built with React, Vite, and React Router for fast client-side routing.
- **Styling**: Custom CSS with dynamic theming support (Dark/Light mode) and advanced CSS Grid layouts.
- **Data Integration**: Integrates directly with the `podo.b1.ma` API to fetch real-time educational data.

## Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ElgarehMouataz/study-up-DEVOWFS-201.git
   cd study-up-DEVOWFS-201/frontend-StudyUp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
To build the project for production, run:
```bash
npm run build
```
This command will also automatically execute the sitemap generation script, creating an up-to-date `sitemap.xml` for all dynamic routes.

To preview the production build locally:
```bash
npm run preview
```

## Contributing
Feel free to open issues or submit pull requests. Ensure your code follows the established aesthetic and architectural guidelines.
