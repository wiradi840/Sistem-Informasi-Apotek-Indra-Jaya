/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../data';
import { Category } from '../types';

interface CategoriesProps {
  onSelectCategory: (categorySlug: string) => void;
  selectedCategory: string;
}

// Function to render correct Lucide Icon dynamically
const CategoryIcon = ({ iconName, colorClass }: { iconName: string; colorClass: string }) => {
  const IconComponent = (Icons as any)[iconName];
  if (!IconComponent) return <Icons.Pill className={colorClass} size={28} />;
  return <IconComponent className={colorClass} size={28} />;
};

const getCategoryColorStyles = (slug: string) => {
  switch (slug) {
    case 'obat-bebas':
      return {
        bg: 'bg-blue-50 group-hover:bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-100',
      };
    case 'vitamin-suplemen':
      return {
        bg: 'bg-amber-50 group-hover:bg-amber-100',
        text: 'text-amber-600',
        border: 'border-amber-100',
      };
    case 'alat-kesehatan':
      return {
        bg: 'bg-red-50 group-hover:bg-red-100',
        text: 'text-red-600',
        border: 'border-red-100',
      };
    case 'perawatan-tubuh':
      return {
        bg: 'bg-purple-50 group-hover:bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-100',
      };
    case 'ibu-anak':
      return {
        bg: 'bg-pink-50 group-hover:bg-pink-100',
        text: 'text-pink-600',
        border: 'border-pink-100',
      };
    case 'herbal':
      return {
        bg: 'bg-emerald-50 group-hover:bg-emerald-100',
        text: 'text-emerald-600',
        border: 'border-emerald-100',
      };
    default:
      return {
        bg: 'bg-green-50 group-hover:bg-green-100',
        text: 'text-green-600',
        border: 'border-green-100',
      };
  }
};

export default function Categories({ onSelectCategory, selectedCategory }: CategoriesProps) {
  return (
    <section id="categories" className="py-12 bg-[#F8FAFC] border-t border-b border-[#E5E7EB] font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Kategori Produk
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-medium">
              Telusuri produk kesehatan terlengkap berdasarkan kategori pilihan Anda
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs sm:text-sm font-bold text-[#166534] hover:text-[#16A34A] flex items-center gap-1 transition-colors group cursor-pointer"
          >
            <span>Lihat Semua</span>
            <Icons.ChevronRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((category, index) => {
            const styles = getCategoryColorStyles(category.slug);
            const isSelected = selectedCategory === category.slug;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => onSelectCategory(category.slug)}
                className={`group relative p-5 rounded-3xl bg-white border cursor-pointer text-center flex flex-col items-center justify-between transition-all duration-300 ${
                  isSelected
                    ? 'border-[#166534] ring-4 ring-green-100 shadow-lg -translate-y-1.5'
                    : 'border-[#E5E7EB] hover:border-gray-300 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Active Selection Pin Indicator */}
                {isSelected && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#16a34a] rounded-full animate-ping"></span>
                )}

                {/* Circle Icon Container */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${styles.bg}`}
                >
                  <CategoryIcon iconName={category.icon} colorClass={styles.text} />
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-[#166534] transition-colors leading-snug">
                    {category.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">
                    {category.count} Produk
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div
                  className={`w-8 h-1 rounded-full mt-4 transition-all duration-300 ${
                    isSelected ? 'bg-[#166534] w-12' : 'bg-transparent group-hover:bg-gray-200'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
