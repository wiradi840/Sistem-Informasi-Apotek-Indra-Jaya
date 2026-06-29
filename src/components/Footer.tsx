/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export default function Footer({ onNavClick, onSelectCategory }: FooterProps) {
  const quickLinks = [
    { name: 'Beranda', id: 'home' },
    { name: 'Tentang Kami', id: 'about' },
    { name: 'Katalog Produk', id: 'products' },
    { name: 'Promo Spesial', id: 'promos' },
    { name: 'Layanan Medis', id: 'services' },
    { name: 'Artikel Kesehatan', id: 'articles' },
  ];

  const categories = [
    { name: 'Obat Bebas', slug: 'obat-bebas' },
    { name: 'Vitamin & Suplemen', slug: 'vitamin-suplemen' },
    { name: 'Alat Kesehatan', slug: 'alat-kesehatan' },
    { name: 'Perawatan Tubuh', slug: 'perawatan-tubuh' },
    { name: 'Ibu & Anak', slug: 'ibu-anak' },
    { name: 'Herbal Alami', slug: 'herbal' },
  ];

  return (
    <footer id="contact" className="bg-[#0F2E1E] text-white pt-16 pb-8 border-t border-[#15803d] font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer links columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10 mb-8">
          
          {/* Col 1: About Brand (takes 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                <span className="text-[#16A34A] font-black text-xl">+</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Apotek <span className="text-[#16A34A]">Sehat</span>
                </span>
                <span className="text-[9px] text-green-300 font-medium italic">
                  Sehat Anda, Prioritas Kami
                </span>
              </div>
            </div>
            
            <p className="text-xs text-green-100/80 leading-relaxed max-w-sm mt-1">
              Apotek modern tepercaya penyedia obat asli 100% bergaransi, multivitamin berkualitas, susu formula bayi, serta alat medis terakreditasi dengan layanan konsultasi resep online cepat.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 bg-white/5 hover:bg-[#16A34A] rounded-full flex items-center justify-center border border-white/10 hover:border-transparent transition-all text-xs"
                title="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 bg-white/5 hover:bg-[#16A34A] rounded-full flex items-center justify-center border border-white/10 hover:border-transparent transition-all text-xs"
                title="Facebook"
              >
                Facebook
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 bg-white/5 hover:bg-[#16A34A] rounded-full flex items-center justify-center border border-white/10 hover:border-transparent transition-all text-xs"
                title="TikTok"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (takes 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#16A34A] uppercase tracking-wider mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Link Cepat
            </h4>
            <ul className="space-y-3.5 text-xs text-green-100/90 font-medium">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavClick(link.id)}
                    className="hover:text-green-300 transition-colors flex items-center gap-1 cursor-pointer group"
                  >
                    <ChevronRight size={12} className="text-[#16A34A] opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Categories (takes 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#16A34A] uppercase tracking-wider mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Kategori Produk
            </h4>
            <ul className="space-y-3.5 text-xs text-green-100/90 font-medium">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onSelectCategory(cat.slug)}
                    className="hover:text-green-300 transition-colors flex items-center gap-1 cursor-pointer group"
                  >
                    <ChevronRight size={12} className="text-[#16A34A] opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact/Store Info (takes 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-[#16A34A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Kontak Apotek
            </h4>
            
            <div className="space-y-4 text-xs text-green-100/90 font-medium">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#16A34A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Jl. Teuku Umar No. 45, Denpasar Barat, Denpasar, Bali 80113
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#16A34A] shrink-0" />
                <span>0812-3456-7890 (Layanan Pelanggan)</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#16A34A] shrink-0" />
                <span>info@apoteksehat.official.com</span>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={16} className="text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <p>Setiap Hari: 08.00 - 21.00 WITA</p>
                  <p className="text-[10px] text-green-400 mt-1">*Hari Libur Nasional Tetap Buka</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-green-300/80 font-medium pt-8">
          <span>
            © 2026 Apotek Sehat. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Peta Situs</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
