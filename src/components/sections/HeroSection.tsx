"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import NeuralNetwork3D from "../ui/NeuralNetwork3D";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden bg-gradient-to-b from-[#0A0F1C] to-[#020617]">
      {/* 3D Background Animation */}
      <NeuralNetwork3D />

      {/* Floating Blur Shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen" style={{ animation: "pulse 8s infinite alternate" }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Sparkles size={16} />
            <span>Welcome to the future of AI</span>
          </motion.div>

          <motion.div variants={itemVariants} className="relative mb-6">
            {/* Gradient Glow Behind Heading */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/30 to-cyan-400/30 blur-[60px] -z-10 rounded-full opacity-50" />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white">
              Ignite Your Future <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary-500 to-blue-600">
                with AI
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium"
          >
            Join India&apos;s fastest growing AI community connecting students with experts. Learn, build, and innovate.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Glowing Primary Button */}
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-primary-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
              <Button
                size="lg"
                className="relative w-full sm:w-auto bg-[#0A0F1C] border border-white/10 text-white hover:bg-white/5 hover:text-cyan-400 transition-all duration-300"
                onClick={() => window.open('https://chat.whatsapp.com/YOUR_GROUP_LINK', '_blank')}
              >
                Join Community
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Outline Button */}
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-white/5 hover:border-gray-500 hover:text-white transition-all duration-300 backdrop-blur-sm bg-transparent"
              onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Events
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
