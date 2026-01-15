import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Zap, Gift, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

const Card = ({ duration, type, price, features, isPopular }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`glass-card p-8 flex flex-col h-full relative overflow-hidden ${isPopular ? 'ring-1 ring-white/30 shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)]' : ''}`}
  >
    {isPopular && (
      <div className="absolute top-5 right-5 bg-white text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
        Most Wanted
      </div>
    )}
    
    <div className="mb-12">
      <p className="text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase mb-2">{type}</p>
      <h3 className="text-4xl font-bold tracking-tighter text-white">{duration}</h3>
    </div>

    <div className="mb-8">
      <span className="text-5xl font-extrabold text-white tracking-tight leading-none italic">{price}</span>
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
  </motion.div>
);

export default function App() {
  const plans = [
    { duration: "1 Bulan", type: "Via Login", price: "50k", features: ["Proses 5 Menit", "Full Garansi", "Resmi Premium"], isPopular: false },
    { duration: "3 Bulan", type: "Via Login", price: "135k", features: ["Lebih Hemat", "Full Garansi", "Badge Eksklusif"], isPopular: false },
    { duration: "3 Bulan", type: "Via Gift", price: "160k", features: ["Tanpa Login", "Privasi Terjaga", "Legal 100%"], isPopular: true },
    { duration: "6 Bulan", type: "Via Login", price: "260k", features: ["Best Value", "Admin Support", "No Expired Link"], isPopular: false },
    { duration: "6 Bulan", type: "Via Gift", price: "300k", features: ["Gift Card Resmi", "Tanpa Password", "Privasi Maksimal"], isPopular: false },
    { duration: "12 Bulan", type: "Via Login", price: "500k", features: ["Ultimate Plan", "Priority Support", "Garansi 1 Tahun"], isPopular: false },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* Background Liquid Liquid Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-10 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-tighter uppercase italic">ZHENS<span className="text-zinc-600">.</span></div>
        <div className="flex gap-4">
           <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
             Status: Online
           </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-32 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-[9rem] font-black tracking-[ -0.05em] leading-[0.85] uppercase mb-12">
            TELEGRAM <br /> <span className="text-zinc-800 italic">PREMIUM</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
            Eksklusivitas tanpa batas. Dapatkan fitur premium dengan harga terbaik di Zhens Store. Mewah, Cepat, dan Bergaransi.
          </p>
        </motion.div>
      </section>

      {/* Grid Pricing */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {plans.map((p, i) => <Card key={i} {...p} />)}
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative z-10 border-t border-white/5 py-24 bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
           <div className="flex flex-col items-center md:items-start gap-4">
              <ShieldCheck className="text-zinc-600" size={32} />
              <h4 className="font-bold uppercase tracking-widest text-sm">Keamanan Terjamin</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">Data Anda aman 100%. Kami menjaga privasi setiap pelanggan dengan standar tinggi.</p>
           </div>
           <div className="flex flex-col items-center md:items-start gap-4">
              <Zap className="text-zinc-600" size={32} />
              <h4 className="font-bold uppercase tracking-widest text-sm">Proses Instan</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">Pengisian dilakukan secara cepat dalam hitungan menit setelah pembayaran dikonfirmasi.</p>
           </div>
           <div className="flex flex-col items-center md:items-start gap-4">
              <Gift className="text-zinc-600" size={32} />
              <h4 className="font-bold uppercase tracking-widest text-sm">Opsi Gift Card</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">Tersedia metode via Gift tanpa perlu memberikan akses akun (login).</p>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-[10px] font-bold tracking-[0.5em] text-zinc-700 uppercase">
        © 2026 ZHENS STORE — Premium Experience
      </footer>
    </div>
  );
}
