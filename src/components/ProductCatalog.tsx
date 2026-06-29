/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Info, Check, Plus, Minus, X, Percent, MessageSquare } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data';
import { Product } from '../types';

interface ProductCatalogProps {
  onAddToCart: (product: Product, quantity: number) => void;
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

export default function ProductCatalog({
  onAddToCart,
  selectedCategory,
  onSelectCategory,
}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
  const [successAnimationId, setSuccessAnimationId] = useState<string | null>(null);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    const currentQty = quantities[productId] || 1;
    const newQty = Math.max(1, currentQty + delta);
    setQuantities({ ...quantities, [productId]: newQty });
  };

  const handleAddToCartClick = (product: Product) => {
    const qty = quantities[product.id] || 1;
    onAddToCart(product, qty);
    
    // Trigger localized checkmark animation
    setSuccessAnimationId(product.id);
    setTimeout(() => {
      setSuccessAnimationId(null);
    }, 1500);

    // Reset local quantity count
    setQuantities({ ...quantities, [product.id]: 1 });
  };

  // Filter products based on category and search query
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.indication?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-16 bg-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Interactive Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-[#E5E7EB] pb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Katalog Produk Apotek
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-medium">
              Cari dan beli kebutuhan obat, vitamin harian, susu bayi, serta alat medis asli terjamin.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Cari obat, vitamin, multivitamin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:bg-white transition-all text-[#111827] placeholder-gray-400 font-medium"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-gray-200/50 p-0.5 rounded-full"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Category filter tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#166534] text-white shadow-md'
                : 'bg-gray-100 text-[#4B5563] hover:bg-gray-200'
            }`}
          >
            Semua Produk ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#166534] text-white shadow-md'
                    : 'bg-gray-100 text-[#4B5563] hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Empty state if nothing matches */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
            <p className="text-gray-500 font-bold text-lg">Produk tidak ditemukan</p>
            <p className="text-gray-400 text-xs mt-1.5 max-w-sm mx-auto leading-relaxed">
              Coba gunakan kata kunci pencarian yang berbeda atau reset filter kategori untuk melihat seluruh inventaris kami.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="mt-5 bg-green-50 text-[#166534] border border-green-200 py-2 px-5 rounded-full text-xs font-bold hover:bg-green-100 transition-colors"
            >
              Reset Filter & Cari
            </button>
          </div>
        )}

        {/* Products Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const hasDiscount = product.isPromo && product.discountPercent;
            const currentQty = quantities[product.id] || 1;
            const isSuccess = successAnimationId === product.id;

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-[#E5E7EB] rounded-3xl p-4.5 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all flex flex-col justify-between group relative"
              >
                {/* Floating Discount Tag */}
                {hasDiscount && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black py-1 px-3.5 rounded-full flex items-center gap-1 z-10 shadow-sm animate-pulse">
                    <Percent size={10} />
                    <span>DISKON {product.discountPercent}%</span>
                  </span>
                )}

                {/* Info Dialog Button */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute top-3 right-3 p-1.5 bg-gray-50 hover:bg-[#166534] hover:text-white rounded-full text-gray-400 shadow-sm transition-colors cursor-pointer z-10"
                  title="Detail Khasiat Obat"
                >
                  <Info size={15} />
                </button>

                {/* Product Image */}
                <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 relative flex items-center justify-center p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Packaging Unit & Title */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9.5px] font-extrabold text-green-700 tracking-wider uppercase bg-green-50 px-2.5 py-1 rounded-md w-fit mb-2 inline-block">
                      {product.unit}
                    </span>
                    <h3 className="text-[14.5px] font-bold text-gray-900 group-hover:text-[#166534] transition-colors leading-tight mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing block */}
                  <div className="mb-4">
                    {hasDiscount ? (
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through leading-none mb-1">
                          {formatRupiah(product.originalPrice || 0)}
                        </span>
                        <span className="text-base font-extrabold text-red-600 leading-none">
                          {formatRupiah(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-base font-extrabold text-gray-900 leading-none">
                        {formatRupiah(product.price)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Row: Quantity & Add Button */}
                <div className="flex items-center gap-2.5 border-t border-gray-50 pt-3">
                  {/* Quantity adjustment buttons */}
                  <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 p-1 shrink-0">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 rounded-md transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="text-xs font-bold text-gray-900 w-6 text-center leading-none">
                      {currentQty}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 rounded-md transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Add button with status toggle */}
                  <button
                    onClick={() => handleAddToCartClick(product)}
                    className={`flex-1 text-[11.5px] font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                      isSuccess
                        ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-md'
                        : 'bg-[#166534] hover:bg-[#114b27] text-white'
                    }`}
                  >
                    {isSuccess ? (
                      <>
                        <Check size={14} className="stroke-[3.5]" />
                        <span>Dimasukkan!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={13} />
                        <span>Beli</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-2xl max-w-lg w-full relative border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>

              {/* Product Info Layout */}
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="w-full sm:w-1/3 aspect-square bg-gray-50 rounded-2xl overflow-hidden p-3 flex items-center justify-center border border-gray-100 shrink-0">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-green-700 tracking-wider uppercase bg-green-50 px-3 py-1 rounded-md inline-block mb-2">
                    {selectedProduct.unit}
                  </span>
                  <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-2.5">
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-[#166534]">
                      {formatRupiah(selectedProduct.price)}
                    </span>
                    {selectedProduct.isPromo && selectedProduct.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatRupiah(selectedProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-500 font-bold block mt-2">
                    📦 Sisa Stok: <span className="text-[#16a34a]">{selectedProduct.stock} Pcs</span> (Tersedia)
                  </span>
                </div>
              </div>

              {/* Drug Specifics Section */}
              <div className="space-y-4 border-t border-gray-100 pt-4 text-xs">
                <div>
                  <h4 className="font-extrabold text-gray-900 uppercase tracking-wider mb-1">
                    Deskripsi Produk:
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                </div>

                {selectedProduct.indication && (
                  <div>
                    <h4 className="font-extrabold text-gray-900 uppercase tracking-wider mb-1">
                      Indikasi Umum (Khasiat):
                    </h4>
                    <p className="text-gray-600 leading-relaxed">{selectedProduct.indication}</p>
                  </div>
                )}

                {selectedProduct.dosage && (
                  <div>
                    <h4 className="font-extrabold text-gray-900 uppercase tracking-wider mb-1">
                      Dosis & Aturan Minum:
                    </h4>
                    <p className="text-gray-600 leading-relaxed font-semibold text-green-950 bg-green-50/50 p-2.5 rounded-xl border border-green-100/50">
                      {selectedProduct.dosage}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons inside Drawer */}
              <div className="flex gap-3 border-t border-gray-100 pt-5 mt-6">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3.5 rounded-full transition-colors cursor-pointer"
                >
                  Tutup Info
                </button>
                <button
                  onClick={() => {
                    handleAddToCartClick(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 bg-[#166534] hover:bg-[#114b27] text-white text-xs font-bold py-3.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart size={14} />
                  <span>Masukkan Keranjang</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
