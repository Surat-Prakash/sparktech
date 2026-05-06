import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { OfferingsSection } from "@/components/sections/OfferingsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { GallerySection } from "@/components/sections/GallerySection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <SponsorsSection />
        <AboutSection />
        <OfferingsSection />
        <EventsSection />
        <PartnersSection />
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}
