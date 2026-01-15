import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Gift, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex justify-between items-center text-left">
        <span className="text-lg font-semibold tracking-tight">{question}</span>
        <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="pb-6 text-zinc-400 text-sm leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const plans = [
    { d: "1 Bulan", t: "Login", p: "50k", f: ["Resmi", "Garansi", "5 Menit"] },
    { d: "3 Bulan", t: "Login", p: "135k", f: ["Hemat", "Garansi", "Fast"] },
    { d: "3 Bulan", t: "Gift", p: "160k", f: ["No Login", "Link Gift", "Privasi"], pop: true },
    { d: "6 Bulan", t: "Login", p: "260k", f: ["Best Value", "Garansi", "Resmi"] },
    { d: "6 Bulan", t: "Gift", p: "300k", f: ["No Login", "Privasi", "Fast"] },
    { d: "12 Bulan", t: "Login", p: "500k", f: ["VVIP", "1 Tahun", "Priority"] },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-white blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Nav */}
      <nav className="p-8 max-w-7xl mx-auto flex justify-between items-center relative z-50">
        <div className="text-2xl font-black italic liquid-text tracking-tighter uppercase">ZHENS</div>
        <div className="text-[10px] border border-white/20 px-4 py-1 rounded-full font-bold tracking-[0.2em]">ONLINE</div>
      </nav>

      {/* Hero */}
      <header className="pt-20 pb-32 px-6 text-center relative z-10">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-[9rem] font-black uppercase leading-[0.85] tracking-tighter liquid-text mb-8"
        >
          TELEGRAM <br/> <span className="text-zinc-800 italic">PREMIUM</span>
        </motion.h1>
        <p className="text-zinc-500 max-w-md mx-auto text-lg font-medium">Layanan premium dengan standar kemewahan baru.</p>
      </header>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-40 relative z-10">
        {plans.map((p, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10 }}
            className={`glass-card p-8 flex flex-col relative overflow-hidden group ${p.pop ? 'ring-2 ring-white/20' : ''}`}
          >
            {p.pop && <div className="absolute top-4 right-4 bg-white text-black text-[8px] font-black px-2 py-1 rounded uppercase">Best Seller</div>}
            <div className="mb-12">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">{p.t}</p>
              <h3 className="text-3xl font-bold liquid-text">{p.d}</h3>
            </div>
            <div className="text-5xl font-black mb-10 italic">Rp {p.p}</div>
            <ul className="space-y-4 mb-12 flex-grow">
              {p.f.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-zinc-400 text-sm italic">
                  <CheckCircle2 size={14} className="text-white" /> {feature}
                </li>
              ))}
            </ul>
            <button className="liquid-btn group">
              <span className="relative z-10 flex justify-center items-center gap-2">BELI SEKARANG <ArrowRight size={16}/></span>
            </button>
          </motion.div>
        ))}
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-40 relative z-10">
        <h2 className="text-4xl font-black mb-16 text-center italic liquid-text uppercase tracking-tighter">Information</h2>
        <div className="space-y-2">
          <FAQItem question="Metode Via Gift Aman?" answer="Sangat aman. Tanpa login akun, Anda hanya perlu klaim link yang kami berikan." />
          <FAQItem question="Berapa lama garansi?" answer="Garansi penuh sesuai dengan durasi paket yang Anda beli (1-12 bulan)." />
          <FAQItem question="Proses berapa lama?" answer="Rata-rata proses adalah 5 sampai 15 menit setelah konfirmasi pembayaran." />
        </div>
      </section>

      <footer className="py-12 text-center opacity-20 text-[10px] tracking-[0.8em] font-bold">ZHENS STORE &copy; 2026</footer>
    </div>
  );
}
