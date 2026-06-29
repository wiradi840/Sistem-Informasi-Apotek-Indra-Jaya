/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Clock, BookOpen, X, ChevronRight } from 'lucide-react';
import { ARTICLES } from '../data';
import { Article } from '../types';

export default function ArticlesSection() {
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  return (
    <section id="articles" className="py-16 bg-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex justify-between items-end mb-10 border-b border-[#E5E7EB] pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Artikel Kesehatan Terbaru
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              Edukasi obat harian dan tips kesehatan tepercaya langsung dari Tim Apoteker kami.
            </p>
          </div>
          <button className="text-xs sm:text-sm font-bold text-[#166534] hover:text-[#16A34A] flex items-center gap-0.5 group">
            <span>Semua Artikel</span>
            <ChevronRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ARTICLES.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              onClick={() => setReadingArticle(article)}
              className="bg-white border border-[#E5E7EB] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-300 transition-all flex flex-col justify-between group cursor-pointer"
            >
              {/* Image header zoom */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-[#166534] text-white text-[9.5px] font-black py-1 px-3.5 rounded-full uppercase tracking-wider shadow-sm">
                  {article.category}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta items */}
                  <div className="flex items-center gap-3.5 text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      <span>{article.date}</span>
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#16a34a] transition-colors leading-snug mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-5 font-medium">
                    {article.excerpt}
                  </p>
                </div>

                {/* Read more footer trigger */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-4 text-xs font-bold text-[#166534]">
                  <span className="flex items-center gap-1.5 group-hover:text-green-800">
                    <BookOpen size={14} />
                    <span>Baca Selengkapnya</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">Oleh: {article.author.split(' ')[0]}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Full reading Modal Dialog */}
      <AnimatePresence>
        {readingArticle && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setReadingArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-2xl max-w-2xl w-full relative border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100 z-10 bg-white shadow-sm border border-gray-100"
              >
                <X size={18} />
              </button>

              {/* Big Header Image banner */}
              <div className="aspect-[16/8] rounded-[1.8rem] overflow-hidden mb-6 relative">
                <img
                  src={readingArticle.image}
                  alt={readingArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <span className="absolute bottom-4 left-4 bg-yellow-400 text-green-950 text-[10px] font-black py-1 px-4.5 rounded-full uppercase tracking-wider">
                  {readingArticle.category}
                </span>
              </div>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-4 text-[10.5px] text-gray-400 font-bold uppercase tracking-wider mb-3">
                <span className="flex items-center gap-1">
                  <User size={13} className="text-[#16a34a]" />
                  <span>{readingArticle.author}</span>
                </span>
                <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-[#16a34a]" />
                  <span>{readingArticle.date}</span>
                </span>
                <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <Clock size={13} className="text-[#16a34a]" />
                  <span>{readingArticle.readTime}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight mb-5">
                {readingArticle.title}
              </h2>

              {/* Article Content Area */}
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-8 border-t border-gray-50 pt-5">
                {readingArticle.content}
              </div>

              {/* Modal action buttons */}
              <div className="flex gap-3 border-t border-gray-100 pt-5">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="flex-1 bg-[#166534] hover:bg-[#114b27] text-white text-xs font-bold py-3.5 rounded-full transition-all text-center cursor-pointer"
                >
                  Selesai Membaca
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
