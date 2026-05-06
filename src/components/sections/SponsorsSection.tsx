"use client";



const sponsors = [
  "PW", "GeeksforGeeks", "Coding Blocks", "Nestlé", "Reynolds",
  "Perplexity", "Red Bull", "Monster", "Burger Singh", "Domino's"
];

export function SponsorsSection() {
  return (
    <section className="py-20 bg-transparent border-y border-white/5 overflow-hidden relative z-10">
      <div className="container mx-auto px-4 md:px-6 mb-10 text-center">
        <h2 className="text-2xl font-bold text-gray-600 uppercase tracking-widest">
          Trusted By Industry Leaders
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="mx-8 md:mx-12 text-2xl md:text-3xl font-extrabold text-gray-700 hover:text-white transition-colors cursor-default"
            >
              {sponsor}
            </div>
          ))}
          {/* Duplicate for infinite effect */}
          {sponsors.map((sponsor, index) => (
            <div
              key={`dup-${index}`}
              className="mx-8 md:mx-12 text-2xl md:text-3xl font-extrabold text-gray-700 hover:text-white transition-colors cursor-default"
            >
              {sponsor}
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
