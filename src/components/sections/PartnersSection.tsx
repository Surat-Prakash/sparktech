"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";

const partners = [
  "Jamia Hamdard University",
  "Jamia Millia Islamia",
  "Delhi University",
  "Amity University",
  "IP University",
  "IIT Delhi"
];

export function PartnersSection() {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, 30, { duration: 2, ease: "easeOut" });
      return animation.stop;
    }
  }, [isInView, count]);

  return (
    <section id="partners" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-400 text-sm font-medium mb-4 backdrop-blur-sm">
            University Partners
          </div>
          <h2 ref={countRef} className="text-3xl md:text-5xl font-bold text-white mb-6">
            Trusted by <motion.span>{rounded}</motion.span>+ Universities
          </h2>
          <p className="text-lg text-gray-400">
            We collaborate with leading educational institutions to bring AI education to students across the country.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:border-accent-400/30 transition-all duration-300 group"
            >
              <GraduationCap size={32} className="text-gray-500 group-hover:text-accent-400 mb-3 transition-colors" />
              <h3 className="font-semibold text-gray-300 group-hover:text-white transition-colors">{partner}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
