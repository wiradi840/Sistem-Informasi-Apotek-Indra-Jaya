/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductCatalog from './components/ProductCatalog';
import PromoWeekend from './components/PromoWeekend';
import SidebarWidgets from './components/SidebarWidgets';
import ReviewsSection from './components/ReviewsSection';
import ArticlesSection from './components/ArticlesSection';
import WordPressExporter from './components/WordPressExporter';
import Keunggulan from './components/Keunggulan';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ConsultationModal from './components/ConsultationModal';
import { Product, CartItem } from './types';
import pharmacistImage from "./assets/images/pharmacist_hero_1782712511677.jpg";
import vitaminsPromoImage from "./assets/images/vitamins_promo_1782712529131.jpg";

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationDefaultTab, setConsultationDefaultTab] = useState<'prescription' | 'chat'>('prescription');

  // Exact generated paths from image tool
  //const pharmacistImage = '/src/assets/images/pharmacist_hero_1782712511677.jpg';
  //const vitaminsPromoImage = '/src/assets/images/vitamins_promo_1782712529131.jpg';

  // Smooth scroll to target sections on navigation click
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Quick handle for catalog category selection triggers from header/footer
    if (sectionId === 'promos') {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of our sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Observe active sections for nav highlights during scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'services', 'articles', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenPrescription = () => {
    setConsultationDefaultTab('prescription');
    setIsConsultationOpen(true);
  };

  const handleOpenConsultation = () => {
    setConsultationDefaultTab('chat');
    setIsConsultationOpen(true);
  };

  // Quick select category wrapper that also scrolls down to products
  const handleSelectCategory = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    handleNavClick('products');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900 scroll-smooth antialiased">
      
      {/* Top Banner & Sticky Nav Bar Header */}
      <Header
        onNavClick={handleNavClick}
        activeSection={activeSection}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPrescription={handleOpenPrescription}
      />

      {/* Main Sections flow */}
      <main>
        {/* Hero Section */}
        <Hero
          onSeeProducts={() => handleNavClick('products')}
          onSeePromos={() => handleNavClick('about')} // scrolls to weekend promo
          pharmacistImage={pharmacistImage}
          promoProductImage={vitaminsPromoImage}
        />

        {/* Categories Quick Grid */}
        <Categories
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />

        {/* Live Product Catalog & Search Section */}
        <ProductCatalog
          onAddToCart={handleAddToCart}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Two-Column About us and Promo Weekend */}
        <PromoWeekend
          onSeePromos={() => handleNavClick('products')}
          onOpenConsultation={handleOpenConsultation}
          promoProductGroupImage={vitaminsPromoImage}
        />

        {/* Layout Sidebars style (Layanan & Lokasi) */}
        <SidebarWidgets
          onOpenConsultation={handleOpenConsultation}
          onOpenPrescription={handleOpenPrescription}
        />

        {/* Reviews Section Slider */}
        <ReviewsSection />

        {/* Educational Health Articles block */}
        <ArticlesSection />

        {/* WordPress Theme Exporter compilation box */}
        <WordPressExporter />

        {/* Bottom trust anchors banner */}
        <Keunggulan />
      </main>

      {/* Footer Area */}
      <Footer
        onNavClick={handleNavClick}
        onSelectCategory={handleSelectCategory}
      />

      {/* Sliding Side-Drawer Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Medical Services Center Dialog (Tebus Resep & Chatbot AI) */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultTab={consultationDefaultTab}
      />

      {/* Simple floating action button when products are added to cart */}
      {cartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#16a34a] hover:bg-[#166534] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:scale-105 animate-bounce hover:animate-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span className="text-xs font-black bg-white text-green-950 h-5 px-1.5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      )}
    </div>
  );
}
