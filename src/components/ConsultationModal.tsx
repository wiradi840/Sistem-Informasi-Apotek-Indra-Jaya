/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Upload, FileText, Check, Phone, ArrowRight, User, Sparkles, MessageSquare } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab: 'prescription' | 'chat';
}

export default function ConsultationModal({ isOpen, onClose, defaultTab }: ConsultationModalProps) {
  const [activeTab, setActiveTab] = useState<'prescription' | 'chat'>(defaultTab);
  
  // Prescription Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat/AI State
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Halo! Saya Asisten Farmasi AI Apotek Sehat. Saya dapat memberikan informasi tepercaya mengenai aturan dosis obat, khasiat herbal, atau tips vitamin harian. Silakan pilih pertanyaan populer di bawah atau ketik pertanyaan Anda sendiri!',
      time: 'Baru Saja',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const presetQuestions = [
    'Berapa dosis aman Paracetamol 500mg untuk dewasa?',
    'Rekomendasi vitamin penambah imun di musim pancaroba?',
    'Bagaimana cara membedakan obat bebas dan obat keras?',
    'Apakah jamu tradisional aman dikonsumsi bersama obat dokter?',
  ];

  // Prescription Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (selectedFile: File) => {
    if (selectedFile.type.startsWith('image/') || selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview('pdf'); // PDF placeholder indicator
      }
    } else {
      alert('Mohon unggah file gambar (JPG/PNG) atau PDF resep resmi.');
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handlePrescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name || !phone) {
      alert('Mohon isi Nama, No. WhatsApp, dan unggah foto Resep Dokter Anda.');
      return;
    }
    setIsSubmitted(true);
  };

  // AI Chat Handlers
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = { sender: 'user' as const, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    // Simulate smart medical bot response
    setTimeout(() => {
      let responseText = '';
      const lowercaseText = text.toLowerCase();

      if (lowercaseText.includes('paracetamol') || lowercaseText.includes('dosis')) {
        responseText = 'Dosis standar Paracetamol 500mg untuk dewasa adalah 1 sampai 2 tablet sekali minum, yang dapat diulang setiap 4-6 jam jika diperlukan (maksimal 8 tablet atau 4000mg per 24 jam). Pastikan untuk minum sesudah makan guna menghindari ketidaknyamanan lambung, dan hindari konsumsi alkohol selama penggunaan.';
      } else if (lowercaseText.includes('vitamin') || lowercaseText.includes('imun') || lowercaseText.includes('pancaroba')) {
        responseText = 'Untuk meningkatkan imunitas di musim pancaroba, kami sangat merekomendasikan kombinasi Vitamin C (500mg - 1000mg), Vitamin D3 (1000 IU), dan suplemen Zinc. Produk premium seperti Blackmores Multivitamins atau You C1000 sangat ideal dikonsumsi pagi hari setelah sarapan.';
      } else if (lowercaseText.includes('beda') || lowercaseText.includes('keras') || lowercaseText.includes('bebas')) {
        responseText = 'Perbedaan utamanya terletak pada tanda lingkaran kemasan. Lingkaran hijau adalah Obat Bebas (boleh dibeli langsung). Lingkaran biru adalah Obat Bebas Terbatas (bebas dibeli dengan batasan tertentu). Lingkaran merah bertanda huruf K adalah Obat Keras yang secara hukum wajib menyertakan resep dokter demi keselamatan Anda.';
      } else if (lowercaseText.includes('herbal') || lowercaseText.includes('jamu') || lowercaseText.includes('dokter')) {
        responseText = 'Konsumsi herbal/jamu bersamaan dengan obat resep dokter sebaiknya diberikan jeda minimal 2 sampai 3 jam. Ini penting untuk mencegah terjadinya interaksi obat yang dapat menurunkan khasiat pengobatan dokter atau memicu efek samping yang tidak diinginkan.';
      } else {
        responseText = `Terima kasih atas pertanyaannya mengenai "${text}". Saya menyarankan Anda berkonsultasi langsung secara tatap muka atau via chat WhatsApp dengan Apoteker Senior kami di nomor 0812-3456-7890 untuk mendapatkan penanganan medis yang lebih spesifik dan akurat sesuai keluhan klinis Anda.`;
      }

      const botMsg = { sender: 'bot' as const, text: responseText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleResetPrescription = () => {
    setName('');
    setPhone('');
    setNotes('');
    setFile(null);
    setFilePreview(null);
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-[#14532d] text-white p-6 relative flex flex-col justify-between shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-green-200 hover:text-white p-1.5 rounded-full hover:bg-green-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-2.5 mb-2.5">
            <Sparkles size={18} className="text-yellow-400 animate-pulse" />
            <h2 className="text-xl font-extrabold tracking-tight">Pusat Layanan Medis Online</h2>
          </div>
          <p className="text-xs text-green-100/90 leading-relaxed max-w-lg">
            Tepercaya, Cepat, dan Aman. Tebus resep dokter Anda atau tanyakan aturan obat langsung kepada tim AI Farmasi kami.
          </p>

          {/* Navigation Tabs inside Header */}
          <div className="flex gap-2.5 mt-5 border-t border-green-800 pt-4">
            <button
              onClick={() => setActiveTab('prescription')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'prescription'
                  ? 'bg-white text-green-950 shadow-md'
                  : 'bg-green-900/40 text-green-100 hover:bg-green-900/60'
              }`}
            >
              <FileText size={14} />
              <span>Tebus Resep Dokter</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-white text-green-950 shadow-md'
                  : 'bg-green-900/40 text-green-100 hover:bg-green-900/60'
              }`}
            >
              <MessageSquare size={14} />
              <span>Konsultasi Apoteker AI</span>
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          
          {/* TAB 1: Prescription Upload Form */}
          {activeTab === 'prescription' && (
            <div className="h-full flex flex-col justify-between">
              {!isSubmitted ? (
                <form onSubmit={handlePrescriptionSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Patient Name */}
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wide">Nama Lengkap Pasien *</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Contoh: Budi Santoso"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#16a34a] font-medium"
                        />
                        <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wide">Nomor WhatsApp *</label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Contoh: 081234567890"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#16a34a] font-medium"
                        />
                        <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Drag and Drop File Upload Container */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wide">Unggah Resep Dokter (Foto / PDF) *</label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={handleTriggerUpload}
                      className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                        isDragOver
                          ? 'border-[#16a34a] bg-green-50/50'
                          : file
                          ? 'border-green-300 bg-white'
                          : 'border-gray-200 hover:border-gray-400 bg-white'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                        className="hidden"
                      />

                      {filePreview ? (
                        <div className="w-full flex flex-col items-center">
                          {filePreview === 'pdf' ? (
                            <div className="p-4 bg-red-50 text-red-500 rounded-2xl mb-2 border border-red-100">
                              <FileText size={40} />
                            </div>
                          ) : (
                            <img
                              src={filePreview}
                              alt="Resep Dokter Preview"
                              className="max-h-28 object-contain rounded-xl shadow-sm mb-3 border border-gray-100"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <span className="text-xs font-bold text-gray-800 line-clamp-1">{file?.name}</span>
                          <span className="text-[10px] text-gray-400 mt-1 font-medium">Click atau drag file baru untuk mengganti</span>
                        </div>
                      ) : (
                        <>
                          <div className="p-4.5 bg-green-50 text-[#166534] rounded-2xl mb-3 shadow-sm border border-green-100/50">
                            <Upload size={24} />
                          </div>
                          <p className="text-xs font-bold text-gray-800">Tarik & Letakkan file resep di sini</p>
                          <p className="text-[10px] text-gray-400 mt-1.5 font-medium">Mendukung format gambar JPEG, PNG, atau PDF resmi</p>
                          <button
                            type="button"
                            className="mt-3.5 bg-green-50 text-[#166534] text-[10.5px] font-extrabold py-2 px-4 rounded-full border border-green-200 hover:bg-green-100 transition-colors"
                          >
                            Pilih File Manual
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Notes input */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wide">Catatan Khusus Apoteker (Opsional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Contoh: Mohon buatkan obat pusing puyer atau diganti merk generik jika ada."
                      rows={3}
                      className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#16a34a] font-medium"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#16a34a] hover:bg-[#166534] text-white font-extrabold text-xs py-3.5 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <span>Kirim Resep Sekarang</span>
                      <ArrowRight size={14} className="stroke-[3]" />
                    </button>
                  </div>
                </form>
              ) : (
                /* Submitted Success Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 px-4 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-green-100 text-[#16a34a] rounded-full flex items-center justify-center mb-6 shadow-md border-2 border-green-200">
                    <Check size={32} className="stroke-[3]" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 leading-tight">Resep Berhasil Dikirim!</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm mt-3 font-medium">
                    Terima kasih, <span className="font-bold text-gray-800">{name}</span>. Resep Anda telah diterima oleh apoteker kami. Kami akan memverifikasi ketersediaan dan rincian harga obat dalam waktu <span className="font-bold text-green-700">10-15 menit</span>.
                  </p>
                  
                  <div className="bg-green-50/50 border border-green-100 rounded-2xl p-4.5 w-full max-w-sm text-left text-xs my-6 text-gray-600 space-y-2">
                    <div>
                      <span className="font-bold text-gray-800">Nama Pasien:</span> {name}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800">No. WhatsApp:</span> {phone}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800">Status Pemeriksaan:</span> <span className="font-bold text-amber-600 animate-pulse">Menunggu Verifikasi</span>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full max-w-sm">
                    <button
                      onClick={handleResetPrescription}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3.5 rounded-full transition-colors cursor-pointer"
                    >
                      Kirim Resep Lain
                    </button>
                    <a
                      href={`https://wa.me/${phone.replace(/[^0-0-9]/g, '')}?text=${encodeURIComponent(
                        `Halo Apotek Sehat, saya ${name} baru saja mengunggah resep dokter. Mohon bantuannya.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#16a34a] hover:bg-[#166534] text-white text-xs font-bold py-3.5 rounded-full flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Phone size={14} fill="white" className="stroke-none" />
                      <span>Chat WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* TAB 2: AI Pharmacist Chatbot */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[400px]">
              
              {/* Message History area */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3.5 pr-1 text-xs">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-3.5 rounded-2xl max-w-[85%] shadow-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#166534] text-white rounded-tr-none'
                          : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-[9px] block text-right mt-1.5 ${
                        msg.sender === 'user' ? 'text-green-200' : 'text-gray-400 font-medium'
                      }`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Typing status loader */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-500 border border-gray-100 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full animate-bounce delay-150"></span>
                      <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full animate-bounce delay-300"></span>
                      <span className="text-[10px] font-bold text-green-700 ml-1">Apoteker AI mengetik...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick preset questions selector */}
              <div className="mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Pertanyaan Populer:</span>
                <div className="flex flex-wrap gap-1.5">
                  {presetQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-[10.5px] bg-white hover:bg-green-50 hover:border-green-300 border border-gray-200 text-gray-700 py-1.5 px-3 rounded-full font-medium transition-all text-left truncate max-w-full cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Send Form Input */}
              <div className="flex gap-2.5 shrink-0">
                <input
                  type="text"
                  placeholder="Ketik pertanyaan medis atau aturan obat di sini..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(chatInput)}
                  className="flex-1 p-3.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#16a34a] font-medium"
                />
                <button
                  onClick={() => handleSendMessage(chatInput)}
                  className="bg-[#166534] hover:bg-[#114b27] text-white p-3.5 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-colors cursor-pointer"
                  title="Kirim Pesan"
                >
                  <Send size={15} />
                </button>
              </div>

            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
