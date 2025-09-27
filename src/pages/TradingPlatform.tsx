import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/sections/HeroSection";
import MarketOverview from "@/components/sections/MarketOverview";
import StrategyBuilder from "@/components/sections/StrategyBuilder";
import SignalRecorder from "@/components/sections/SignalRecorder";
import TradingTools from "@/components/sections/TradingTools";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/Footer";

interface TradingPlatformProps {
  onShowAuth: () => void;
}

const TradingPlatform = ({ onShowAuth }: TradingPlatformProps) => {
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        activeSection={activeSection} 
        onNavigate={scrollToSection}
        onShowAuth={onShowAuth}
      />
      
      <main>
        <motion.section
          id="home"
          ref={(el) => sectionRefs.current.home = el}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.section>

        <motion.section
          id="markets"
          ref={(el) => sectionRefs.current.markets = el}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <MarketOverview />
        </motion.section>

        <motion.section
          id="strategy"
          ref={(el) => sectionRefs.current.strategy = el}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <StrategyBuilder />
        </motion.section>

        <motion.section
          id="recorder"
          ref={(el) => sectionRefs.current.recorder = el}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SignalRecorder />
        </motion.section>

        <motion.section
          id="tools"
          ref={(el) => sectionRefs.current.tools = el}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <TradingTools />
        </motion.section>

        <motion.section
          id="about"
          ref={(el) => sectionRefs.current.about = el}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <AboutSection />
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default TradingPlatform;