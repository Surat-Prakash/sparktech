"use client";

import { motion } from "framer-motion";
import { FiLinkedin } from "react-icons/fi";
import founderImg from "@/images/founder.jpeg";
import developerImg from "@/images/developer.jpeg";
import managerImg from "@/images/community manager.jpg";

const teamMembers = [
  {
    name: "Fardeen Ansari",
    role: "Founder",
    image: founderImg.src,
    linkedin: "https://www.linkedin.com/in/fardeen-ansari-642a352aa"
  },
  {
    name: "Alisha Sagar",
    role: "Developer",
    image: developerImg.src,
    linkedin: "https://www.linkedin.com/in/alisha-sagar-3b4052302"
  },
  {
    name: "",
    role: "Community Manager",
    image: managerImg.src,
    linkedin: "#",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-20 bg-transparent relative z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent-400/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-400 text-sm font-medium mb-4 backdrop-blur-sm"
          >
            Leadership
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Meet Our Core Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            The passionate minds driving the Spark Tech AI Hub forward.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="group glass-card rounded-3xl p-6 relative overflow-hidden flex flex-col items-center border border-white/10 hover:border-accent-400/50 transition-colors"
            >
              {/* Subtle hover glow inside card */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-2 border-white/10 group-hover:border-accent-400/50 transition-colors relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-accent-400 text-sm font-medium mb-6">{member.role}</p>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-accent-400 hover:border-accent-400 transition-all"
              >
                <FiLinkedin size={20} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
