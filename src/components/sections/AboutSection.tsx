"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const aims = [
  "Connect students with AI professionals & researchers",
  "Create hands-on learning opportunities",
  "Encourage innovation in AI & ML",
  "Build a strong, future-ready tech community",
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-400 text-sm font-medium mb-4 backdrop-blur-sm">
              About Us
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Empowering the Next Generation of AI Innovators
            </h2>
            <div className="space-y-4 text-lg text-gray-400 mb-8">
              <p>
                Spark Tech AI Hub is a thriving AI-focused community dedicated to connecting students with industry experts, researchers, and professionals in Artificial Intelligence.
              </p>
              <p>
                We help learners build, innovate, and grow with real-world exposure and hands-on experience in AI and Machine Learning.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 w-full glass-card rounded-3xl p-8 md:p-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Our Aim</h3>
            <ul className="space-y-5">
              {aims.map((aim, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="mt-0.5 relative shrink-0">
                    <div className="absolute inset-0 bg-accent-400 blur-sm opacity-0 group-hover:opacity-50 transition-opacity" />
                    <CheckCircle2 className="text-accent-400 relative" size={20} />
                  </div>
                  <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{aim}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
