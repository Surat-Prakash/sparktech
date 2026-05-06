"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Briefcase, Users } from "lucide-react";
import { Card } from "../ui/Card";

const offerings = [
  {
    title: "Skills Development",
    icon: <BrainCircuit size={28} className="text-accent-400" />,
    items: [
      "Artificial Intelligence",
      "Machine Learning",
      "AI Tools",
      "Project-based learning",
    ],
  },
  {
    title: "Career Preparation",
    icon: <Briefcase size={28} className="text-purple-400" />,
    items: [
      "Workshops",
      "Resume building",
      "Networking",
      "Internship exposure",
    ],
  },
  {
    title: "Inclusive Community",
    icon: <Users size={28} className="text-primary-400" />,
    items: [
      "Beginners to advanced learners",
      "Mentorship programs",
      "Peer-to-peer support",
      "Collaborative environment",
    ],
  },
];

export function OfferingsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="offerings" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-400 text-sm font-medium mb-4 backdrop-blur-sm">
            What We Offer
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything you need to succeed in AI
          </h2>
          <p className="text-lg text-gray-400">
            Comprehensive resources, events, and a supportive community to accelerate your AI journey.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {offerings.map((offering, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <Card className="h-full flex flex-col group relative overflow-hidden">
                {/* Internal card glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  {offering.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{offering.title}</h3>
                <ul className="space-y-3 mt-auto">
                  {offering.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-400 mr-3 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
