import React from "react";
import { Sparkles, Truck, Leaf, Coins, ShieldCheck } from "lucide-react";

const featureList = [
  {
    icon: Truck,
    title: "Fastest Delivery",
    description: "Groceries delivered straight to your doorstep in under 30 minutes.",
    accent: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    icon: Leaf,
    title: "Freshness Guaranteed",
    description: "100% farm-fresh, organic produce sourced directly from trusted growers.",
    accent: "from-green-500/20 to-emerald-500/10 text-green-400 border-green-500/30",
  },
  {
    icon: Coins,
    title: "Affordable Prices",
    description: "Wholesale-level grocery discounts and daily combo bundle deals.",
    accent: "from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30",
  },
  {
    icon: ShieldCheck,
    title: "Trusted by Thousands",
    description: "Loved by 10,000+ happy households with 99.8% on-time order satisfaction.",
    accent: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="my-16 bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-emerald-900/60">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2.5 border border-emerald-700/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The GreenCart Promise</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Why Millions Choose GreenCart Daily
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
          Setting the benchmark for speed, farm freshness, and trusted reliability.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {featureList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-emerald-900/40 border border-emerald-800/60 rounded-2xl p-6 text-center hover:bg-emerald-900/70 hover:border-emerald-600/60 transition duration-300 flex flex-col items-center group shadow-lg hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.accent} border flex items-center justify-center mb-4 p-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
