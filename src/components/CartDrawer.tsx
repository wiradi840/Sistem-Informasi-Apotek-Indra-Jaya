/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, Trash2, ShoppingBag, Plus, Minus, MessageSquare, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const deliveryFee = 0; // Free delivery radius 5KM promo!
  const serviceFee = 2000; // Normal safe seal packaging fee!
  const totalAmount = getSubtotal() + deliveryFee + serviceFee;

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    let message = `Halo Apotek Sehat, saya ingin melakukan pemesanan obat/produk kesehatan harian saya:\n\n`;
    
    cartItems.forEach((item, idx) => {
      const priceFormatted = formatRupiah(item.product.price * item.quantity);
      message += `${idx + 1}. *${item.product.name}*\n   Qty: ${item.quantity} x ${item.product.unit}\n   Subtotal: ${priceFormatted}\n\n`;
    });

    message += `-------------------------\n`;
    message += `*Subtotal:* ${formatRupiah(getSubtotal())}\n`;
    message += `*Kemasan Kedap Segel:* ${formatRupiah(serviceFee)}\n`;
    message += `*Biaya Antar:* ${formatRupiah(deliveryFee)} (PROMO FREE)\n`;
    message += `*GRAND TOTAL:* ${formatRupiah(totalAmount)}\n\n`;
    message += `Mohon segera bantu verifikasi alamat pengiriman dan no rekening transfer pembayaran. Terima kasih banyak.`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.35 }}
        className="w-full max-w-md h-screen bg-white shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-5.5 border-b border-gray-100 flex justify-between items-center bg-[#14532d] text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-green-300" />
            <h3 className="text-base font-black uppercase tracking-tight">Keranjang Belanja</h3>
            <span className="bg-white/20 text-white text-[10px] font-black py-0.5 px-2 rounded-full leading-none">
              {cartItems.length} Jenis
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-green-200 hover:text-white bg-green-800/50 hover:bg-green-800 rounded-full transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable list of items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4.5 border border-dashed border-gray-200">
                <ShoppingBag size={26} />
              </div>
              <p className="text-sm font-bold text-gray-800 leading-none">Keranjang masih kosong</p>
              <p className="text-xs text-gray-400 mt-2 max-w-xs mx-auto leading-relaxed">
                Belum ada produk obat atau vitamin yang Anda masukkan. Silakan jelajahi katalog produk kami.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#166534] hover:bg-[#114b27] text-white text-xs font-bold py-3 px-6 rounded-full transition-colors"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white border border-gray-100 rounded-2xl p-3.5 flex gap-4.5 shadow-xs hover:shadow-md transition-shadow relative group"
              >
                {/* Trash delete button */}
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors p-1"
                  title="Hapus Produk"
                >
                  <Trash2 size={14} />
                </button>

                {/* Product image */}
                <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden p-1.5 flex items-center justify-center border border-gray-100 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details column */}
                <div className="flex-1 flex flex-col justify-between pr-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 leading-tight line-clamp-2">
                      {item.product.name}
                    </h4>
                    <span className="text-[9.5px] text-gray-400 font-bold block mt-1">
                      {item.product.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Price total */}
                    <span className="text-sm font-black text-[#166534]">
                      {formatRupiah(item.product.price * item.quantity)}
                    </span>

                    {/* Quantity selectors */}
                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQty(item.product.id, -1)}
                        className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 rounded"
                        aria-label="Decrease"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-xs font-bold text-gray-900 w-5 text-center leading-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, 1)}
                        className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 rounded"
                        aria-label="Increase"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pricing calculations footer */}
        {cartItems.length > 0 && (
          <div className="p-5.5 border-t border-gray-100 bg-white shrink-0">
            <div className="space-y-2.5 mb-5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} Produk)</span>
                <span className="font-semibold text-gray-900">{formatRupiah(getSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <span>Biaya Antar</span>
                  <span className="bg-green-100 text-green-800 text-[8.5px] font-black py-0.5 px-2 rounded-full">
                    PROMO FREE
                  </span>
                </span>
                <span className="font-semibold text-gray-900 line-through">
                  {formatRupiah(15000)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Kemasan Kedap Segel</span>
                <span className="font-semibold text-gray-900">{formatRupiah(serviceFee)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-sm">
                <span className="font-bold text-gray-900">Total Pembayaran</span>
                <span className="font-black text-lg text-[#166534]">
                  {formatRupiah(totalAmount)}
                </span>
              </div>
            </div>

            {/* Check guarantees & submit button */}
            <div className="flex items-center gap-2 mb-4 text-[10px] text-green-700 bg-green-50/50 p-2.5 rounded-xl border border-green-100/40">
              <ShieldCheck size={14} className="shrink-0" />
              <span>Kemasan dilapisi bubble-wrap buram tersegel aman demi privasi pasien.</span>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={onClearCart}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold py-3.5 px-4 rounded-xl cursor-pointer"
                title="Kosongkan Keranjang"
              >
                Clear
              </button>
              <button
                onClick={handleCheckoutWhatsApp}
                className="flex-1 bg-[#16a34a] hover:bg-[#166534] text-white text-xs font-bold py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MessageSquare size={14} fill="white" className="stroke-none" />
                <span>Pesan Sekarang via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
