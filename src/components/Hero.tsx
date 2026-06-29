/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Award, Users, ChevronRight, Sparkles, ShoppingBag, Percent } from 'lucide-react';

interface HeroProps {
  onSeeProducts: () => void;
  onSeePromos: () => void;
  pharmacistImage: string;
  promoProductImage: string;
}

export default function Hero({
  onSeeProducts,
  onSeePromos,
  pharmacistImage,
  promoProductImage,
}: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const promos = [
    {
      title: 'PROMO SPESIAL',
      tag: 'Hemat Sehat!',
      discount: '20%',
      desc: 'Untuk berbagai produk suplemen & vitamin imun tubuh pilihan.',
      buttonText: 'Lihat Semua Promo',
    },
    {
      title: 'PROMO BULANAN',
      tag: 'Ibu & Anak',
      discount: '15%',
      desc: 'Susu pertumbuhan dan minyak telon bayi original termurah.',
      buttonText: 'Belanja Sekarang',
    },
    {
      title: 'DISKON SPESIAL',
      tag: 'Alat Medis',
      discount: '10%',
      desc: 'Tensimeter digital & termometer akurat dijamin bergaransi.',
      buttonText: 'Cek Detail',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full bg-white pt-6 pb-12 overflow-hidden font-sans">
      {/* Decorative ambient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-55"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F0FDF4] text-[#166534] text-xs font-bold rounded-full w-fit mb-5 border border-[#E5E7EB]"
            >
              <Sparkles size={12} className="text-[#16A34A] animate-spin-slow" />
              <span>Apotek Terlengkap & Terpercaya</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111827] leading-[1.1] mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Apotek Terpercaya <br />
              Untuk <span className="text-[#16A34A]">Kesehatan Anda</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl mb-8"
            >
              Menyediakan berbagai kebutuhan obat asli, vitamin peningkat imun, perlengkapan bayi, dan alat kesehatan bersertifikat dengan pelayanan profesional sepenuh hati.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                onClick={onSeeProducts}
                className="bg-[#166534] hover:bg-[#16A34A] text-white text-base font-bold py-3.5 px-8 rounded-xl flex items-center gap-2.5 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <ShoppingBag size={18} />
                Lihat Produk
              </button>
              <button
                onClick={onSeePromos}
                className="bg-white hover:bg-green-50 text-[#166534] border-2 border-[#E5E7EB] text-base font-bold py-3.5 px-8 rounded-xl flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
              >
                <Percent size={18} />
                Promo Hari Ini
              </button>
            </motion.div>

            {/* Quick trust metrics row matching exactly the mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full"
            >
              <div className="flex items-center gap-3 p-4 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition-all group">
                <div className="p-2.5 bg-[#F0FDF4] rounded-full text-[#16A34A] transition-colors">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827] leading-none mb-1">Produk Terjamin</h4>
                  <p className="text-[10px] text-[#6B7280] leading-none font-medium">100% Original BPOM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition-all group">
                <div className="p-2.5 bg-[#F0FDF4] rounded-full text-[#16A34A] transition-colors">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827] leading-none mb-1">Harga Terjangkau</h4>
                  <p className="text-[10px] text-[#6B7280] leading-none font-medium">Banyak Promo Harian</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition-all group">
                <div className="p-2.5 bg-[#F0FDF4] rounded-full text-[#16A34A] transition-colors">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827] leading-none mb-1">Pelayanan Ramah</h4>
                  <p className="text-[10px] text-[#6B7280] leading-none font-medium">Apoteker Profesional</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Column: Photo + Special Promo Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Background glowing rings */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-green-300 to-emerald-100 rounded-[2.5rem] filter blur-xl opacity-30 transform rotate-1"></div>

            <div className="relative w-full max-w-lg lg:max-w-none grid grid-cols-1 sm:grid-cols-12 gap-4">
              
              {/* Pharmacist photo card (Left part of the right grid) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="sm:col-span-7 bg-white p-2.5 rounded-[2rem] shadow-xl border border-gray-100 relative group overflow-hidden"
              >
                <div className="aspect-[3/4] sm:aspect-auto sm:h-[420px] rounded-[1.7rem] overflow-hidden relative">
                  <img
                    src={pharmacistImage}
                    alt="Apoteker Profesional Apotek Sehat"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Bottom info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white">
                    <p className="text-xs text-green-300 font-bold mb-0.5 tracking-wide uppercase">Apoteker Mitra Anda</p>
                    <h3 className="text-base font-bold leading-tight">Melayani Konsultasi Resep 24 Jam</h3>
                  </div>
                </div>
              </motion.div>

              {/* Special Promo Slide Widget (Right part of the right grid) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="sm:col-span-5 flex flex-col justify-between"
              >
                <div className="bg-gradient-to-br from-[#166534] via-[#15803d] to-[#16a34a] p-5 rounded-[2rem] text-white shadow-xl h-full flex flex-col justify-between relative overflow-hidden min-h-[350px]">
                  {/* Dynamic background lighting circle */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                  
                  {/* Slide Content Header */}
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[11px] font-bold tracking-wider bg-white/20 text-white py-1 px-3.5 rounded-full uppercase">
                        {promos[activeSlide].title}
                      </span>
                      <span className="text-[10px] font-bold bg-amber-400 text-gray-900 py-1 px-3 rounded-full flex items-center gap-1">
                        <Sparkles size={10} className="fill-current" />
                        {promos[activeSlide].tag}
                      </span>
                    </div>

                    <p className="text-xs text-green-200 uppercase tracking-widest font-bold mb-1">Diskon</p>
                    <div className="flex items-baseline mb-2">
                      <span className="text-[12px] font-bold text-green-200">UP TO</span>
                      <span className="text-5xl font-extrabold text-white tracking-tighter ml-1.5 leading-none">
                        {promos[activeSlide].discount}
                      </span>
                    </div>

                    <p className="text-xs text-green-50 leading-relaxed font-medium">
                      {promos[activeSlide].desc}
                    </p>
                  </div>

                  {/* Supplemental Image Overlay overlapping */}
                  <div className="relative w-full h-24 my-3 rounded-xl overflow-hidden bg-white/5 p-1.5 flex items-center justify-center border border-white/10 group">
                    <img
                      src={promoProductImage}
                      alt="Vitamin Promo"
                      className="h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Action Link & Pagination dots */}
                  <div>
                    <button
                      onClick={onSeePromos}
                      className="w-full bg-white hover:bg-green-50 text-green-900 text-xs font-bold py-2.5 px-4 rounded-full flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
                    >
                      <span>{promos[activeSlide].buttonText}</span>
                      <ChevronRight size={14} className="stroke-[3]" />
                    </button>

                    {/* Pagination indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                      {promos.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlide(idx)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === activeSlide ? 'bg-white w-5' : 'bg-white/40 w-2'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
