"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import img1 from "@/images/img1.jpeg";
import img2 from "@/images/img2.jpeg";
import img3 from "@/images/img3.jpeg";
import img4 from "@/images/img4.jpeg";
import img5 from "@/images/img5.jpeg";

const galleryItems = [
  { image: img1.src, size: "md:col-span-2 md:row-span-2" },
  { image: img2.src, size: "col-span-1" },
  { image: img3.src, size: "col-span-1" },
  { image: img4.src, size: "col-span-1" },
  { image: img5.src, size: "col-span-1" },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
              onClick={() => setSelectedImage(item.image)}
            >
              <img src={item.image} className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-pointer backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-14 right-0 p-2 bg-white/10 rounded-full text-white hover:text-accent-400 hover:bg-white/20 transition-all border border-white/10"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage}
                alt="Full screen gallery view"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
