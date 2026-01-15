import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Zap, Gift, CheckCircle2, ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { LiquidBackground } from './LiquidDistortion'; // Import komponen liquid background

// Komponen Card (sedikit modifikasi untuk liquid border)
const Card = ({ duration, type, price, features, isPopular }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`glass-card p-8 flex flex-col h-full relative overflow-hidden group 
      ${isPopular ? 'ring-1 ring-white/30 shadow-[0_0_60px_-15px_rgba(255,255,255,0.15)]' : ''}`}
  >
    {/* Liquid Border Effect */}
    <div className="absolute inset-0 z-0 rounded-[2.5rem] overflow-hidden">
      <div className="absolute -inset-1 animate-spin-slow bg-gradient-to-br from-white/10 via-purple-500/10 to-blue-500/10 group-hover:from-white/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
    </div>
    
    <div className="relative z-10 flex flex-col h-full">
      {isPopular && (
        <div className="absolute top-0 right-0 bg-white text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter liquid-badge">
          Most Wanted
        </div>
      )}
      
      <div className="mb-12">
        <p className="text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase mb-2">{type}</p>
        <h3 className="text-4xl font-bold tracking-tighter text-white liquid-text">{duration}</h3>
      </div>

      <div className="mb-8">
        <span className="text-5xl font-extrabold text-white tracking-tight leading-none italic liquid-text">{price}</span>
        <span className="text-zinc-500 text-sm ml-2 font-medium">/ IDR</span>
      </div>

      <ul className="space-y-4 mb-12 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-zinc-400 text-sm">
            <CheckCircle2 size={16} className="text-white opacity-40" /> {f}
          </li>
        ))}
      </ul>

      <button className="liquid-btn group relative overflow-hidden">
        <span className="relative z-10 flex items-center justify-center gap-2">
          ORDER NOW <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </button>
    </div>
  </motion.div>
);

// Komponen FAQ Item
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="border-b border-white/5 py-6 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center text-lg font-medium text-white hover:text-white/80 transition-colors">
        <p>{question}</p>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} className="text-white/60" />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <p className="mt-4 text-zinc-400 leading-relaxed text-sm pr-8">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const plans = [
    { duration: "1 Bulan", type: "Via Login", price: "50k", features: ["Proses Cepat", "Full Garansi", "Resmi Premium"], isPopular: false },
    { duration: "3 Bulan", type: "Via Login", price: "135k", features: ["Lebih Hemat", "Full Garansi", "Badge Eksklusif"], isPopular: false },
    { duration: "3 Bulan", type: "Via Gift", price: "160k", features: ["Tanpa Login", "Privasi Terjaga", "Legal 100%"], isPopular: true },
    { duration: "6 Bulan", type: "Via Login", price: "260k", features: ["Best Value", "Admin Support", "No Expired Link"], isPopular: false },
    { duration: "6 Bulan", type: "Via Gift", price: "300k", features: ["Gift Card Resmi", "Tanpa Password", "Privasi Maksimal"], isPopular: false },
    { duration: "12 Bulan", type: "Via Login", price: "500k", features: ["Ultimate Plan", "Priority Support", "Garansi 1 Tahun"], isPopular: false },
  ];

  const faqs = [
    { question: "Bagaimana cara kerja Telegram Premium via Login?", answer: "Anda memberikan detail login Telegram Anda (nomor HP dan kode OTP), dan kami akan mengaktifkan Premium di akun Anda secara langsung. Proses sangat cepat dan aman." },
    { question: "Apa itu Telegram Premium via Gift?", answer: "Metode ini memungkinkan Anda mendapatkan Telegram Premium tanpa perlu login. Kami akan mengirimkan kode hadiah yang bisa Anda redeem sendiri. Cocok untuk privasi maksimal." },
    { question: "Apakah Zhens Store aman dan terpercaya?", answer: "Ya, Zhens Store berkomitmen pada keamanan dan kepuasan pelanggan. Kami menyediakan garansi penuh untuk setiap pembelian dan menggunakan metode aktivasi yang resmi." },
    { question: "Berapa lama proses aktivasi?", answer: "Proses aktivasi biasanya memakan waktu 5-15 menit setelah pembayaran Anda terkonfirmasi, tergantung pada antrian." },
    { question: "Metode pembayaran apa saja yang diterima?", answer: "Kami menerima berbagai metode pembayaran populer seperti transfer bank, e-wallet, dan lainnya. Detail akan diberikan saat checkout." },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* Liquid Background Canvas */}
      <LiquidBackground />

      {/* Main Content */}
      <div className="relative z-10"> 
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-10 max-w-7xl mx-auto backdrop-blur-md">
          <div className="text-2xl font-black tracking-tighter uppercase italic liquid-text">ZHENS<span className="text-zinc-600">.</span></div>
          <div className="flex gap-4">
             <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
               Status: Online
             </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-16 pb-32 px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-[9rem] font-black tracking-[ -0.05em] leading-[0.85] uppercase mb-12 liquid-text">
              TELEGRAM <br /> <span className="text-zinc-800 italic">PREMIUM</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
              Eksklusivitas tanpa batas. Dapatkan fitur premium dengan harga terbaik di Zhens Store. Mewah, Cepat, dan Bergaransi.
            </p>
          </motion.div>
        </section>

        {/* Grid Pricing */}
        <section className="max-w-7xl mx-auto px-6 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
            {plans.map((p, i) => <Card key={i} {...p} />)}
          </div>
        </section>

        {/* Trust Section */}
        <section className="border-t border-white/5 py-24 bg-zinc-950/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
             <div className="flex flex-col items-center md:items-start gap-4">
                <ShieldCheck className="text-zinc-600" size={32} />
                <h4 className="font-bold uppercase tracking-widest text-sm text-white/90">Keamanan Terjamin</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">Data Anda aman 100%. Kami menjaga privasi setiap pelanggan dengan standar tinggi.</p>
             </div>
             <div className="flex flex-col items-center md:items-start gap-4">
                <Zap className="text-zinc-600" size={32} />
                <h4 className="font-bold uppercase tracking-widest text-sm text-white/90">Proses Instan</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">Pengisian dilakukan secara cepat dalam hitungan menit setelah pembayaran dikonfirmasi.</p>
             </div>
             <div className="flex flex-col items-center md:items-start gap-4">
                <Gift className="text-zinc-600" size={32} />
                <h4 className="font-bold uppercase tracking-widest text-sm text-white/90">Opsi Gift Card</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">Tersedia metode via Gift tanpa perlu memberikan akses akun (login).</p>
             </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 max-w-4xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tighter text-center mb-16 liquid-text"
          >
            Pertanyaan Umum
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-[10px] font-bold tracking-[0.5em] text-zinc-700 uppercase border-t border-white/5">
          © 2026 ZHENS STORE — Premium Experience
        </footer>
      </div>
    </div>
  );
}
