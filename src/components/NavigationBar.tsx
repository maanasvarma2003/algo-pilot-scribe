import { motion } from "framer-motion";
import { 
  Home, 
  TrendingUp, 
  Layers, 
  Radio, 
  Wrench, 
  Info,
  LogIn,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavigationBarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onShowAuth: () => void;
}

const navigationItems = [
  { id: "home", label: "Home", icon: Home, color: "text-electric-blue" },
  { id: "markets", label: "Markets", icon: TrendingUp, color: "text-trading-green-bright" },
  { id: "strategy", label: "Strategy", icon: Layers, color: "text-electric-purple" },
  { id: "recorder", label: "Recorder", icon: Radio, color: "text-electric-cyan" },
  { id: "tools", label: "Tools", icon: Wrench, color: "text-golden" },
  { id: "about", label: "About", icon: Info, color: "text-silver" },
];

const NavigationBar = ({ activeSection, onNavigate, onShowAuth }: NavigationBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="fixed top-0 left-0 right-0 z-40 glass backdrop-blur-xl border-b border-border-bright"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center glow-primary">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Nubra
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`nav-item flex items-center space-x-2 ${
                      isActive ? "nav-item-active" : ""
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Auth Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onShowAuth}
                  className="bg-gradient-primary hover:opacity-90 text-primary-foreground glow-primary"
                  size="sm"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg glass hover:bg-secondary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3, type: "spring" }}
        className="fixed inset-0 z-50 md:hidden"
      >
        <div className="bg-background/95 backdrop-blur-xl h-full pt-20 px-6">
          <div className="space-y-4">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all ${
                    isActive 
                      ? "bg-gradient-primary text-primary-foreground glow-primary" 
                      : "hover:bg-secondary/20"
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "" : item.color}`} />
                  <span className="text-lg font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NavigationBar;