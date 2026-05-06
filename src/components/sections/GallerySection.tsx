"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const galleryItems = [
  { title: "AI Summit 2023", gradient: "from-blue-900 to-indigo-900", size: "md:col-span-2 md:row-span-2" },
  { title: "Hackathon Winners", gradient: "from-purple-900 to-pink-900", size: "col-span-1" },
  { title: "ML Workshop", gradient: "from-emerald-900 to-teal-900", size: "col-span-1" },
  { title: "Networking Event", gradient: "from-orange-900 to-red-900", size: "col-span-1" },
  { title: "Tech Talk", gradient: "from-cyan-900 to-blue-900", size: "col-span-1" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-400 text-sm font-medium mb-4 backdrop-blur-sm">
              Gallery
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Community Highlights
            </h2>
            <p className="text-lg text-gray-400">
              Glimpses of our events, workshops, and hackathons.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.size} border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 group-hover:scale-105 transition-transform duration-500`} />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-black/40">
                <ImageIcon size={32} className="text-accent-400 mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <h3 className="text-white font-bold text-xl drop-shadow-md">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
