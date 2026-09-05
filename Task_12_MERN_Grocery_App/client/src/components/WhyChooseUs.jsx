import React from "react";
import { features } from "../assets/assets";
import { Sparkles } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="my-16 bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-emerald-900/50 border border-emerald-800/80 rounded-2xl p-6 text-center hover:bg-emerald-900/80 hover:border-emerald-700 transition duration-200 flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 p-2.5">
              <img
                src={item.icon}
                alt={item.title}
                className="w-full h-full object-contain filter invert brightness-0"
              />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
