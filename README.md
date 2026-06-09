# NexusMart — Premium E-Commerce Frontend Showcase

NexusMart is a high-fidelity, premium e-commerce frontend interface built using React, Vite, and custom CSS. It features a responsive layout with a modern dark theme, smooth transitions, and glassmorphism elements. This project showcases advanced React state management, complex user flows, and modern web design principles.

## 🚀 Live Demo
Check out the live deployment: [NexusMart Live Demo](https://vardhireddysaivardhanreddy.github.io/nexus-mart/)

## ✨ Key Features
- **Modern Catalog Grid**: View, search, and filter a curated list of premium tech gadgets and lifestyle products.
- **Advanced Filters**: Real-time search, category filters, and price range filtering, combined with multi-metric sorting (Featured, Price Low-to-High, Price High-to-Low, Top Rated).
- **Product Details Modal**: Modal presentation showing high-res-like emoji visuals, product description, rating breakdowns, and custom key specifications.
- **Slide-out Shopping Cart**: Sidebar overlay with item counter, item lists, subtotal, dynamically calculated tax (8%), shipping status (free over $150), and quantity adjusters.
- **Persistent State**: State is preserved across page refreshes using `localStorage`.
- **Interactive Checkout Flow**: Multi-field form validation (Credit Card formatting, Expiry pattern, email and physical address verification) with a sleek animated success receipt.
- **Dynamic Micro-animations**: Micro-animations on interactive elements, smooth hover effects, custom scrollbar styling, and responsive layout for desktop/tablet/mobile screens.

## 🛠️ Tech Stack
- **Frontend Core**: React JS (v18)
- **Scaffolding/Bundling**: Vite (v5)
- **Styling**: Vanilla CSS (Custom properties, Glassmorphism, animations)
- **Deployment**: GitHub Actions (auto-deploy to GitHub Pages)

## 📦 Local Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vardhireddysaivardhanreddy/nexus-mart.git
   cd nexus-mart
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the application in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
