"use client";

import { Zap } from "lucide-react";
import { FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import Link from "next/link";
import { Button } from "../ui/Button";

export function Footer() {
  return (
    <footer className="bg-[#0A0F1C] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-gradient-to-br from-primary-600 to-accent-400 p-2 rounded-xl text-white">
                <Zap size={24} fill="currentColor" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Spark Tech<span className="text-accent-400">.</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              A thriving AI-focused community dedicated to connecting students with industry experts, researchers, and professionals in Artificial Intelligence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full border border-white/10 text-gray-400 hover:text-accent-400 hover:border-accent-400/50 hover:bg-white/10 transition-colors">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full border border-white/10 text-gray-400 hover:text-accent-400 hover:border-accent-400/50 hover:bg-white/10 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full border border-white/10 text-gray-400 hover:text-accent-400 hover:border-accent-400/50 hover:bg-white/10 transition-colors">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="#about" className="text-gray-400 hover:text-accent-400 transition-colors">About Us</Link></li>
              <li><Link href="#offerings" className="text-gray-400 hover:text-accent-400 transition-colors">What We Offer</Link></li>
              <li><Link href="#events" className="text-gray-400 hover:text-accent-400 transition-colors">Events</Link></li>
              <li><Link href="#gallery" className="text-gray-400 hover:text-accent-400 transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Ready to ignite?</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Join Spark Tech AI Hub and start your AI journey today.
            </p>
            <Button size="sm" className="w-full sm:w-auto" onClick={() => window.open('https://chat.whatsapp.com/YOUR_GROUP_LINK', '_blank')}>
              Join Now
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Spark Tech AI Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
