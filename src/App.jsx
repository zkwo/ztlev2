import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Gift, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-7 flex justify-between items-center text-left transition-all hover:pl-2">
        <span className="text-lg font-medium tracking-tight text-white/90">{question}</span>
        <ChevronDown className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="pb-7 text-zinc-400 text-sm leading-relaxed"
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
    { d: "1 Bulan", t: "Via Login", p: "50k", f: ["Aktivasi Cepat", "Full Garansi", "Resmi"] },
    { d: "3 Bulan", t: "Via Login", p: "135k", f: ["Harga Hemat", "Full Garansi", "Resmi"] },
    { d: "3 Bulan", t: "Via Gift", p: "160k", f: ["Tanpa Login", "Privacy 100%", "Legal Gift"], pop: true },
    { d: "6 Bulan", t: "Via Login", p: "260k", f: ["Paling Worth It", "Full Garansi", "Resmi"] },
    { d: "6 Bulan", t: "Via Gift", p: "300k", f: ["No Login Required", "Privacy Aman", "Resmi"], pop: false },
    { d: "12 Bulan", t: "Via Login", p: "500k", f: ["Ultimate Plan", "Garansi 1 Tahun", "Priority"], pop: false },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full" />
      </div>

      <nav className="p-10 max-w-7xl mx-auto flex justify-between items-center relative z-50">
        <div className="text-2xl font-black tracking-tighter uppercase">ZHENS</div>
        <div className="text-[10px] bg-white/5 border border-white/10 px-5 py-2 rounded-full font-bold tracking-[0.3em] backdrop-blur-md">STATUS: ONLINE</div>
      </nav>

      <header className="pt-24 pb-32 px-6 text-center relative z-10">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-9xl font-black uppercase leading-none tracking-tighter mb-8">
            TELEGRAM <span className="text-zinc-600 block">PREMIUM</span>
          </h1>
          <p className="text-zinc-500 max-w-lg mx-auto text-lg font-light tracking-wide">
            Eksklusivitas Telegram Premium dengan keamanan tingkat tinggi dan harga kompetitif.
          </p>
        </motion.div>
      </header>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-40 relative z-10">
        {plans.map((p, i) => (
          <div key={i} className="glass-card group p-[2px]">
            {/* Liquid Border Animation */}
            <div className="liquid-border" />
            
            <div className="bg-[#080808]/90 p-10 rounded-[2.4rem] h-full flex flex-col relative overflow-hidden">
              {/* Cling Shine Slider Effect */}
              <div className="cling-effect" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mb-3 font-bold">{p.t}</p>
                    <h3 className="text-3xl font-bold tracking-tight">{p.d}</h3>
                  </div>
                  {p.pop && <div className="bg-white text-black text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter">BEST SELLER</div>}
                </div>

                <div className="text-5xl font-bold mb-10 tracking-tighter">Rp {p.p}</div>
                
                <ul className="space-y-5 mb-14">
                  {p.f.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
                      <CheckCircle2 size={16} className="text-white/40" /> {feature}
                    </li>
                  ))}
                </ul>

                <button className="liquid-btn w-full">
                  ORDER NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-40 relative z-10">
        <h2 className="text-4xl font-bold mb-20 text-center tracking-tighter uppercase">F.A.Q</h2>
        <div className="space-y-2">
          <FAQItem question="Bagaimana proses via Login?" answer="Admin akan masuk ke akun Anda menggunakan nomor HP dan kode OTP. Setelah Premium aktif, admin akan langsung log-out dari perangkat." />
          <FAQItem question="Apakah Gift aman 100%?" answer="Sangat aman. Anda hanya akan menerima link resmi Telegram Gift. Tanpa resiko banned atau login." />
          <FAQItem question="Berapa lama waktu pengerjaan?" answer="Estimasi 5-30 menit tergantung antrian transaksi di Zhens Store." />
        </div>
      </section>

      <footer className="py-20 text-center opacity-30 text-[10px] tracking-[1em] font-bold">ZHENS STORE &copy; 2026</footer>
    </div>
  );
}
