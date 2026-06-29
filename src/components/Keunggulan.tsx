/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wallet, ShieldCheck, Box, RefreshCw } from 'lucide-react';

export default function Keunggulan() {
  const items = [
    {
      title: 'Pembayaran Mudah',
      desc: 'Tunai, Transfer Bank, QRIS, & E-Wallet',
      icon: <Wallet size={20} className="text-[#166534]" />,
    },
    {
      title: 'Keamanan Data',
      desc: 'Data medis & resep pasien aman terenkripsi',
      icon: <ShieldCheck size={20} className="text-[#166534]" />,
    },
    {
      title: 'Packaging Aman',
      desc: 'Kemasan tersegel kedap air & bubble-wrap tebal',
      icon: <Box size={20} className="text-[#166534]" />,
    },
    {
      title: 'Return Mudah',
      desc: 'Syarat & ketentuan klaim garansi mudah',
      icon: <RefreshCw size={20} className="text-[#166534]" />,
    },
  ];

  return (
    <section className="bg-[#F8FAFC] border-t border-b border-[#E5E7EB] py-8 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="p-3 bg-[#F0FDF4] rounded-xl group-hover:bg-[#166534] group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 mb-0.5 group-hover:text-[#166534] transition-colors leading-none">
                  {item.title}
                </h4>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
