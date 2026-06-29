/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Menu, X, Send } from 'lucide-react';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  cartCount: number;
  onOpenCart: () => void;
  onOpenPrescription: () => void;
}

export default function Header({
  onNavClick,
  activeSection,
  cartCount,
  onOpenCart,
  onOpenPrescription,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Beranda', id: 'home' },
    { name: 'Tentang Kami', id: 'about' },
    { name: 'Produk', id: 'products' },
    { name: 'Promo', id: 'promos' },
    { name: 'Layanan', id: 'services' },
    { name: 'Artikel', id: 'articles' },
    { name: 'Kontak', id: 'contact' },
  ];

  const handleNavItemClick = (id: string) => {
    onNavClick(id);
    setIsMobileMenuOpen(false);
  };

  const formatWhatsAppUrl = () => {
    const message = encodeURIComponent(
      'Halo Apotek Sehat, saya ingin bertanya mengenai ketersediaan obat dan konsultasi kesehatan harian saya.'
    );
    return `https://wa.me/6281234567890?text=${message}`;
  };

  return (
    <header className="w-full z-50">
      {/* Top Bar */}
      <div className="bg-[#166534] text-white text-[11px] py-2 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-2 border-b border-[#15803d] font-sans">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-1">
          <div className="flex items-center gap-1.5 hover:text-green-200 transition-colors">
            <MapPin size={13} className="text-green-300" />
            <span>Jl. Teuku Umar No. 45, Denpasar, Bali</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-green-200 transition-colors">
            <Clock size={13} className="text-green-300" />
            <span>08.00 - 21.00 WITA (Setiap Hari)</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-200">Ikuti kami:</span>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/apoteksehat.official"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
              title="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/apoteksehat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
              title="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://tiktok.com/@apoteksehat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
              title="TikTok"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav
        id="main-nav"
        className={`w-full bg-white border-b border-[#E5E7EB] transition-all duration-300 ${
          isScrolled ? 'fixed top-0 shadow-sm py-3' : 'relative py-4'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => handleNavItemClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Custom Premium Cross & Heart Logo as in mockup */}
            <div className="relative w-12 h-12 flex items-center justify-center bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
              {/* Green Cross */}
              <div className="absolute w-8 h-2 bg-[#166534] rounded-sm"></div>
              <div className="absolute h-8 w-2 bg-[#166534] rounded-sm"></div>
              {/* Inner leaf/heart stylized element inside the cross */}
              <div className="absolute w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#16a34a] rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#111827] leading-tight font-sans uppercase">
                Apotek <span className="text-[#16a34a]">Sehat</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium font-sans italic tracking-wide">
                Sehat Anda, Prioritas Kami
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavItemClick(item.id)}
                  className="relative text-[15px] font-semibold text-gray-700 hover:text-[#166534] transition-colors py-2 group cursor-pointer"
                >
                  {item.name}
                  {/* Active Slide Indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#166534] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-1/2'
                    }`}
                  ></span>
                </button>
              );
            })}
          </div>

          {/* Right Area Controls */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Action buttons */}
            <button
              onClick={onOpenPrescription}
              className="text-xs font-semibold text-[#166534] bg-green-50 border border-green-200 hover:bg-green-100 transition-colors py-2 px-3.5 rounded-full flex items-center gap-1.5 cursor-pointer"
            >
              <Send size={13} />
              Tebus Resep
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-[#166534] rounded-full transition-colors cursor-pointer"
              title="Keranjang Belanja"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5.5 w-5.5"
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
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Contact Button */}
            <a
              href={formatWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#16a34a] hover:bg-[#166534] text-white text-[15px] font-semibold py-2.5 px-5 rounded-full flex items-center gap-2 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              <Phone size={16} fill="white" className="stroke-none" />
              <span>Hubungi Kami</span>
            </a>
          </div>

          {/* Mobile Navigation Right Controls */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Cart Button Mobile */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-700 rounded-full hover:bg-gray-100"
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
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`absolute top-0 right-0 w-4/5 max-w-sm h-screen bg-white shadow-2xl p-6 transition-transform duration-300 ease-out transform ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-900 uppercase tracking-tight">
                Menu Apotek Sehat
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-800 rounded-full bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavItemClick(item.id)}
                    className={`text-left text-base font-semibold py-2.5 px-4 rounded-xl transition-all ${
                      isActive
                        ? 'bg-green-50 text-[#166534] border-l-4 border-[#166534]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenPrescription();
                }}
                className="w-full text-center text-xs font-semibold text-[#166534] bg-green-50 border border-green-200 py-3 rounded-full flex items-center justify-center gap-1.5"
              >
                <Send size={14} />
                Tebus Resep Dokter
              </button>
              <a
                href={formatWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#16a34a] hover:bg-[#166534] text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Phone size={16} fill="white" className="stroke-none" />
                Hubungi Kami (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
