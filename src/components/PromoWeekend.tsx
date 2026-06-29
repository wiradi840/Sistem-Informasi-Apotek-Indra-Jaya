/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Calendar, Users, HeartHandshake, ChevronRight, Sparkles } from 'lucide-react';

interface PromoWeekendProps {
  onSeePromos: () => void;
  onOpenConsultation: () => void;
  promoProductGroupImage: string;
}

export default function PromoWeekend({
  onSeePromos,
  onOpenConsultation,
  promoProductGroupImage,
}: PromoWeekendProps) {
  return (
    <section id="about" className="py-16 bg-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Promo Weekend Tebus Murah */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="relative h-full bg-gradient-to-br from-[#166534] via-[#15803d] to-[#22c55e] p-8 sm:p-10 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between overflow-hidden group min-h-[360px]">
              {/* Decorative circle glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>

              {/* Header content */}
              <div className="relative z-10 max-w-[65%]">
                <span className="text-[11px] font-extrabold tracking-widest bg-yellow-400 text-green-950 py-1.5 px-3.5 rounded-full uppercase inline-block mb-4 shadow-sm">
                  PROMO WEEKEND
                </span>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
                  Tebus Murah
                </h3>
                <p className="text-lg font-bold text-green-100 mb-4">
                  Setiap Hari Sabtu - Minggu
                </p>
                <p className="text-[10px] text-green-200 tracking-wide font-medium italic">
                  *Syarat & Ketentuan Berlaku. Belanja min. Rp 50.000, tebus produk pilihan mulai dari Rp 1.000.
                </p>
              </div>

              {/* Floating Circle 15% Badge overlapping as in mockup */}
              <div className="absolute top-8 right-8 w-24 h-24 sm:w-28 sm:h-28 bg-white text-green-950 rounded-full flex flex-col items-center justify-center p-2 text-center shadow-lg border-2 border-green-200 transform group-hover:scale-105 group-hover:rotate-6 transition-all duration-300 z-20">
                <span className="text-[9px] font-black tracking-wider text-green-700 uppercase leading-none">DISKON HINGGA</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#166534] tracking-tighter leading-none my-1">15%</span>
                <span className="text-[9px] font-extrabold text-green-600 leading-none">PRODUK APTEK</span>
              </div>

              {/* Overlaying Product Group Image at the bottom right */}
              <div className="absolute bottom-4 right-4 w-1/2 max-w-[220px] aspect-square flex items-end justify-end pointer-events-none z-10">
                <img
                  src={promoProductGroupImage}
                  alt="Bundled Medicine Products"
                  className="max-h-full object-contain filter drop-shadow-xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Button */}
              <div className="relative z-10 mt-8 w-fit">
                <button
                  onClick={onSeePromos}
                  className="bg-white hover:bg-green-50 text-green-900 text-sm font-bold py-3.5 px-6 rounded-full flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <span>Lihat Promo Lainnya</span>
                  <ChevronRight size={16} className="stroke-[3]" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Tentang Apotek Sehat + Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#166534] bg-[#F0FDF4] px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border border-[#E5E7EB]">
                <Sparkles size={12} className="text-[#16A34A]" />
                <span>Profil Apotek</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Tentang Apotek Sehat
              </h2>
              
              <p className="text-base text-[#4B5563] leading-relaxed mb-6">
                Apotek Sehat berdiri sejak tahun 2015 dengan komitmen penuh memberikan pelayanan kesehatan terbaik bagi masyarakat Indonesia. Kami mengedepankan keaslian obat (100% Original), kecepatan pengiriman, serta pelayanan ramah dan profesional dari apoteker berlisensi.
              </p>
              
              <p className="text-base text-[#4B5563] leading-relaxed mb-8">
                Kami percaya bahwa akses kesehatan haruslah mudah, murah, dan terpercaya. Oleh karena itu, kami menghadirkan layanan penebusan resep dokter online secara langsung dan konsultasi tanya jawab obat gratis bagi Anda.
              </p>
            </div>

            {/* Grid of 3 Stat Metrics matching the mockup precisely */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 border-t border-[#E5E7EB] pt-8">
              
              {/* Stat 1 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-pointer">
                <div className="p-2.5 bg-[#F0FDF4] text-[#166534] rounded-2xl mb-3 group-hover:bg-[#166534] group-hover:text-white transition-all duration-300 shadow-sm border border-[#E5E7EB]">
                  <Calendar size={22} className="stroke-[2]" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#111827] leading-none mb-1">
                  10+
                </h4>
                <p className="text-xs text-[#6B7280] font-semibold leading-relaxed">
                  Tahun <br className="hidden sm:inline" /> Pengalaman
                </p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-pointer">
                <div className="p-2.5 bg-[#F0FDF4] text-[#166534] rounded-2xl mb-3 group-hover:bg-[#166534] group-hover:text-white transition-all duration-300 shadow-sm border border-[#E5E7EB]">
                  <Users size={22} className="stroke-[2]" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#111827] leading-none mb-1">
                  5000+
                </h4>
                <p className="text-xs text-[#6B7280] font-semibold leading-relaxed">
                  Pelanggan <br className="hidden sm:inline" /> Setiap Bulan
                </p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-pointer">
                <div className="p-2.5 bg-[#F0FDF4] text-[#166534] rounded-2xl mb-3 group-hover:bg-[#166534] group-hover:text-white transition-all duration-300 shadow-sm border border-[#E5E7EB]">
                  <HeartHandshake size={22} className="stroke-[2]" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#111827] leading-none mb-1">
                  100%
                </h4>
                <p className="text-xs text-[#6B7280] font-semibold leading-relaxed">
                  Kepuasan <br className="hidden sm:inline" /> Pelanggan
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
