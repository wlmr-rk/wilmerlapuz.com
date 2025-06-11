// src/app/page.tsx
import Navigation from "../components/Navigation";
import MobileNavigation from "../components/MobileNavigation";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import StatsSection from "../components/StatsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <MobileNavigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
