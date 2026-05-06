"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";
import logo from "@/images/logo.png";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Offerings", href: "#offerings" },
  { name: "Events", href: "#events" },
  { name: "Partners", href: "#partners" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#020617]/70 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src={logo.src}
              alt="Spark Tech Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
            />
            <span className="font-bold text-xl tracking-tight text-white">
              Spark Tech<span className="text-accent-400">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-accent-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button size="sm" onClick={() => window.open('https://chat.whatsapp.com/G3XaKFfbVc659w9lGI8Xxi', '_blank')}>
              Join Community
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0A0F1C]/95 backdrop-blur-xl shadow-2xl border-t border-white/5 p-4 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-accent-400 p-2 rounded-md hover:bg-white/5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10">
              <Button className="w-full" onClick={() => window.open('https://chat.whatsapp.com/G3XaKFfbVc659w9lGI8Xxi', '_blank')}>
                Join Community
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
