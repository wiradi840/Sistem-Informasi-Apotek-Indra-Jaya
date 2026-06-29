/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../data';

export default function ReviewsSection() {
  const [activeReview, setActiveReview] = useState(0);

  const handleNext = () => {
    setActiveReview((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setActiveReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-16 bg-[#F8FAFC] border-t border-b border-[#E5E7EB] font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Apa Kata Mereka?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-medium leading-relaxed">
            Testimoni jujur dan tepercaya dari ratusan pasien harian kami yang mengandalkan keaslian produk dan kecepatan pelayanan Apotek Sehat.
          </p>
        </div>

        {/* Dynamic Reviews Testimonial Slide Canvas */}
        <div className="relative max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-[2.5rem] p-8 sm:p-10 shadow-sm flex flex-col justify-between overflow-hidden group">
          {/* Large Quote graphic mark */}
          <div className="absolute top-6 right-8 text-green-100/60 pointer-events-none group-hover:scale-105 transition-transform duration-500">
            <Quote size={80} className="fill-current" />
          </div>

          <div className="relative z-10">
            {/* Stars Rating block */}
            <div className="flex gap-1 mb-5">
              {[...Array(REVIEWS[activeReview].rating)].map((_, idx) => (
                <Star key={idx} size={15} className="text-amber-400 fill-current" />
              ))}
            </div>

            {/* Quote content */}
            <AnimatePresence mode="wait">
              <motion.p
                key={REVIEWS[activeReview].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm sm:text-base text-[#4B5563] leading-relaxed italic mb-8 font-medium"
              >
                "{REVIEWS[activeReview].comment}"
              </motion.p>
            </AnimatePresence>

            {/* Author Profile block */}
            <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-5">
              <div className="flex items-center gap-4">
                <img
                   src={REVIEWS[activeReview].avatar}
                   alt={REVIEWS[activeReview].name}
                   className="w-12 h-12 rounded-full object-cover shadow-sm border border-[#E5E7EB]"
                   referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#111827] leading-none mb-1">
                    {REVIEWS[activeReview].name}
                  </h4>
                  <span className="text-[10px] text-green-700 font-bold tracking-wider uppercase">
                    PASIEN TERVERIFIKASI
                  </span>
                </div>
              </div>
              
              <span className="text-[10px] text-gray-400 font-semibold">{REVIEWS[activeReview].date}</span>
            </div>
          </div>

          {/* Action buttons slider navigations */}
          <div className="flex justify-end gap-2.5 mt-6 sm:mt-0 sm:absolute sm:bottom-10 sm:right-10 z-20">
            <button
              onClick={handlePrev}
              className="p-2 bg-gray-50 hover:bg-[#166534] hover:text-white rounded-xl text-gray-500 border border-[#E5E7EB] transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-gray-50 hover:bg-[#166534] hover:text-white rounded-xl text-gray-500 border border-[#E5E7EB] transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
