"use client";

import { motion } from "framer-motion";
import { Calendar, Code, Blocks, Users, ArrowRight } from "lucide-react";

const events = [
  {
    title: "AI & ML Workshops",
    description: "Deep dive into neural networks, LLMs, and computer vision with hands-on sessions.",
    icon: <Calendar size={24} className="text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "Hackathons",
    description: "48-hour coding challenges to build innovative AI solutions to real-world problems.",
    icon: <Code size={24} className="text-white" />,
    color: "bg-indigo-500",
  },
  {
    title: "Blockchain + AI Events",
    description: "Exploring the intersection of decentralized technologies and artificial intelligence.",
    icon: <Blocks size={24} className="text-white" />,
    color: "bg-violet-500",
  },
  {
    title: "Community Meetups",
    description: "Networking sessions with industry experts, researchers, and fellow students.",
    icon: <Users size={24} className="text-white" />,
    color: "bg-purple-500",
  },
];

export function EventsSection() {
  return (
    <section id="events" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-400 text-sm font-medium mb-4 backdrop-blur-sm">
              Events & Collaboration
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Learn, Build, and Connect
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              We host a variety of events designed to provide hands-on experience, foster innovation, and build a strong network within the tech community.
            </p>
            
            <div className="glass-card rounded-2xl p-6 border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-400 to-purple-500" />
              <h4 className="font-bold text-white mb-2">Want to collaborate?</h4>
              <p className="text-gray-400 text-sm mb-4">
                We are open to college collaborations and sponsorship opportunities.
              </p>
              <a href="mailto:contact@sparktechai.com" className="inline-flex items-center text-accent-400 font-medium hover:text-accent-300 transition-colors">
                Contact Us <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {events.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:border-accent-400/30 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`w-12 h-12 rounded-2xl ${event.color} flex items-center justify-center mb-6 shadow-[0_0_15px_currentColor] group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    {event.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">{event.title}</h3>
                  <p className="text-gray-400 leading-relaxed relative z-10">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
