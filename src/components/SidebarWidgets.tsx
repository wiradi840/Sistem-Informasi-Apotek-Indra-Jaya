/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UserCheck,
  HeartPulse,
  Truck,
  FileText,
  ChevronRight,
  Phone,
  Instagram,
  MapPin,
  Clock,
  ExternalLink,
  ChevronDown,
  X,
} from 'lucide-react';
import { LAYANAN_LIST } from '../data';
import { Layanan } from '../types';

interface SidebarWidgetsProps {
  onOpenConsultation: () => void;
  onOpenPrescription: () => void;
}

export default function SidebarWidgets({
  onOpenConsultation,
  onOpenPrescription,
}: SidebarWidgetsProps) {
  const [selectedService, setSelectedService] = useState<Layanan | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="text-[#16a34a]" size={22} />;
      case 'HeartPulse':
        return <HeartPulse className="text-[#16a34a]" size={22} />;
      case 'Truck':
        return <Truck className="text-[#16a34a]" size={22} />;
      case 'FileText':
        return <FileText className="text-[#16a34a]" size={22} />;
      default:
        return <UserCheck className="text-[#16a34a]" size={22} />;
    }
  };

  const handleServiceClick = (service: Layanan) => {
    if (service.id === 'lay-1') {
      onOpenConsultation();
    } else if (service.id === 'lay-4') {
      onOpenPrescription();
    } else {
      setSelectedService(service);
    }
  };

  return (
    <section id="services" className="py-12 bg-gray-50 border-t border-b border-gray-200/50 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Layanan Kami Widget (Left - takes 7 columns on large screens) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    Layanan Kami
                  </h3>
                  <p className="text-xs text-gray-400 font-bold tracking-wider uppercase mt-0.5">
                    Solusi Kesehatan Komprehensif
                  </p>
                </div>
                <button
                  onClick={() => onOpenConsultation()}
                  className="text-xs font-bold text-[#166534] hover:text-[#114b27] flex items-center gap-0.5 group cursor-pointer"
                >
                  <span>Mulai Konsultasi</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Services List Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LAYANAN_LIST.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    onClick={() => handleServiceClick(service)}
                    className="p-5 bg-gray-50 border border-gray-100/80 rounded-2xl cursor-pointer hover:bg-white hover:border-[#16a34a] hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
                  >
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:bg-green-50 transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#166534] transition-colors flex items-center gap-1">
                        <span>{service.title}</span>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all text-[#166534]" />
                      </h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Service details notice banner */}
            <div className="mt-6 bg-green-50/50 border border-green-100/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#166534] font-medium">
              <span>💡 Butuh obat rutin atau penebusan resep dokter segera?</span>
              <button
                onClick={onOpenPrescription}
                className="bg-[#166534] text-white py-1.5 px-4 rounded-full text-[11px] font-bold shadow-sm hover:bg-[#114b27] transition-colors cursor-pointer"
              >
                Upload Resep Sekarang
              </button>
            </div>
          </div>

          {/* Lokasi Kami Widget (Right - takes 5 columns on large screens) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="mb-5">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Lokasi Kami
              </h3>
              <p className="text-xs text-gray-400 font-bold tracking-wider uppercase mt-0.5">
                Kunjungi Toko Fisik Kami
              </p>
            </div>

            {/* Custom stylized mini map card matching the mockup */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-gray-200 mb-5 shadow-inner bg-slate-100 group">
              {/* Fake grid-lines represent streets on map */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}></div>
              
              {/* Fake main roads styled beautifully */}
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-white border-t border-b border-gray-300"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-5 bg-white border-l border-r border-gray-300"></div>
              <div className="absolute left-2/3 top-1/4 bottom-0 w-4 bg-white border-l border-r border-gray-300 transform -rotate-12"></div>
              
              {/* Nearby locations */}
              <div className="absolute top-1/3 left-6 text-[10px] font-bold text-gray-400">Jl. Teuku Umar</div>
              <div className="absolute top-1/4 left-1/2 text-[9px] font-semibold text-gray-400">Bank Mandiri</div>
              <div className="absolute bottom-6 right-12 text-[9px] font-semibold text-gray-400">Restoran Surya</div>

              {/* Map Pin */}
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                {/* Pulsing glow under pin */}
                <span className="absolute bottom-1 w-5 h-2 bg-red-500/30 rounded-full blur-xs animate-ping"></span>
                <MapPin className="text-red-500 stroke-[2.5]" size={28} fill="rgba(239, 68, 68, 0.4)" />
                <div className="absolute bottom-8 bg-[#166534] text-white text-[9px] font-bold py-1 px-2.5 rounded-md shadow-md whitespace-nowrap border border-green-400/30">
                  Apotek Sehat
                </div>
              </div>

              {/* View map details button */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-white hover:bg-gray-100 text-[#166534] font-extrabold text-[10px] py-1.5 px-3 rounded-lg flex items-center gap-1.5 shadow-md border border-gray-200 cursor-pointer transition-colors"
              >
                <span>Buka Google Maps</span>
                <ExternalLink size={11} />
              </a>
            </div>

            {/* Direct Contact info block */}
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center gap-3.5 text-xs font-semibold text-gray-700 hover:text-[#16a34a] transition-colors p-1 group">
                <div className="p-2 bg-green-50 rounded-xl text-[#166534] group-hover:bg-[#166534] group-hover:text-white transition-colors">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Nomor Telepon</span>
                  <span>0812-3456-7890</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs font-semibold text-gray-700 hover:text-[#16a34a] transition-colors p-1 group">
                <div className="p-2 bg-green-50 rounded-xl text-[#166534] group-hover:bg-[#166534] group-hover:text-white transition-colors">
                  <Phone size={16} fill="none" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">WhatsApp Bisnis</span>
                  <span>0812-3456-7890</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs font-semibold text-gray-700 hover:text-[#16a34a] transition-colors p-1 group">
                <div className="p-2 bg-green-50 rounded-xl text-[#166534] group-hover:bg-[#166534] group-hover:text-white transition-colors">
                  <Instagram size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Instagram Resmi</span>
                  <span>@apoteksehat.official</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Expanded service detail modal overlay if selected */}
      <AnimatePresence>
        {selectedService && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-2xl max-w-md w-full relative border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 mb-5 border-b border-gray-100 pb-4">
                <div className="p-3 bg-green-50 text-[#166534] rounded-2xl shadow-sm border border-green-100">
                  {getServiceIcon(selectedService.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 leading-tight">
                    {selectedService.title}
                  </h3>
                  <p className="text-[10px] text-green-700 font-bold tracking-wider uppercase">
                    LAYANAN AKTIF
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {selectedService.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                  Detail Layanan Terintegrasi:
                </h4>
                <ul className="space-y-2.5">
                  {selectedService.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-gray-600">
                      <span className="w-5 h-5 bg-green-100 text-[#166534] rounded-full flex items-center justify-center font-bold text-[10px] mt-0.5 shrink-0">
                        ✓
                      </span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 rounded-full transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                    `Halo Apotek Sehat, saya ingin mengajukan layanan ${selectedService.title}!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-[#16a34a] hover:bg-[#166534] text-white text-xs font-bold py-3 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone size={14} fill="white" className="stroke-none" />
                  Mulai Sekarang
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
