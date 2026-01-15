import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, Zap, Gift, ArrowRight, CheckCircle2 } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:bg-white/[0.02] transition-all px-4"
      >
        <span className="text-lg font-medium tracking-tight">{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-6 text-zinc-400 text-sm leading-relaxed"
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
    { name: "1 Bulan", type: "Via Login", price: "50k", features: ["Proses 5 Menit", "Full Garansi", "Resmi"] },
    { name: "3 Bulan", type: "Via Login", price: "135k", features: ["Hemat 15k", "Full Garansi", "Resmi"] },
    { name: "3 Bulan", type: "Via Gift", price: "160k", features: ["Tanpa Login", "Via Link Gift", "Privasi Aman"], popular: true },
    { name: "6 Bulan", type: "Via Login", price: "260k", features: ["Best Seller", "Full Garansi", "Hemat Banyak"] },
    { name: "6 Bulan", type: "Via Gift", price: "300k", features: ["Tanpa Login", "Privasi 100%", "Legal"] },
    { name: "12 Bulan", type: "Via Login", price: "500k", features: ["Ultimate Plan", "Garansi 1 Tahun", "VVIP"] },
  ];

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
      {/* Liquid Background Canvas Effect (Simulasi via CSS Blur) */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-white blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-zinc-500 blur-[150px] animate-bounce"></div>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto backdrop-blur-sm sticky top-0">
          <h1 className="text-2xl font-black italic tracking-tighter liquid-text">ZHENS STORE</h1>
          <div className="text-[10px] tracking-[0.3em] font-bold border border-white/20 px-4 py-1 rounded-full">EST 2026</div>
        </nav>

        {/* Hero */}
        <header className="py-24 px-6 text-center">
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl md:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter mb-8 liquid-text"
          >
            Premium <br/> <span className="text-zinc-700 font-light italic">Liquid</span>
          </motion.h2>
          <p className="text-zinc-500 max-w-lg mx-auto text-lg font-medium">Layanan Telegram Premium kelas atas dengan sentuhan kemewahan dan kecepatan.</p>
        </header>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
          {plans.map((plan, i) => (
            <div key={i} className={`glass-card p-1 relative overflow-hidden group`}>
              {/* Liquid Border Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="bg-black/80 p-8 rounded-[2.3rem] h-full flex flex-col backdrop-blur-md">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">{plan.type}</span>
                <h3 className="text-3xl font-bold mb-6 liquid-text">{plan.name}</h3>
                <div className="text-5xl font-black mb-8 italic">Rp {plan.price}</div>
                
                <ul className="space-y-3 mb-12 flex-grow">
                  {plan.features.map((f, index) => (
                    <li key={index} className="text-zinc-400 text-sm flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-white" /> {f}
                    </li>
                  ))}
                </ul>

                <button className="liquid-btn group">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    BELI SEKARANG <ArrowRight size={16} />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-6 py-32 border-t border-white/5">
          <h2 className="text-4xl font-bold mb-16 text-center italic liquid-text tracking-tighter uppercase">Common Inquiries</h2>
          <div className="space-y-2">
            <FAQItem question="Berapa lama proses pengisian?" answer="Untuk via Login memakan waktu 5-10 menit. Untuk via Gift akan dikirimkan berupa link yang bisa langsung diklaim." />
            <FAQItem question="Apakah metode ini legal?" answer="100% Legal dan Resmi dari Telegram. Kami tidak menggunakan metode ilegal yang berisiko banned." />
            <FAQItem question="Ada garansi?" answer="Tentu. Semua paket memiliki garansi full selama masa berlangganan aktif." />
          </div>
        </section>

        <footer className="py-20 text-center opacity-30 text-[10px] tracking-[1em] font-bold uppercase">
          Zhens Store &copy; 2026
        </footer>
      </div>
    </div>
  );
}
