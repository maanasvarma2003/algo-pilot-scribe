import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, TrendingUp, Sparkles, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Trading3DBackground from "@/components/Trading3DBackground";

const HeroSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds",
      color: "text-electric-blue",
    },
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Bank-grade security protocols",
      color: "text-electric-purple",
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "AI-powered market insights",
      color: "text-trading-green-bright",
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Trading3DBackground />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80 z-10" />
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.span 
                className="bg-gradient-primary bg-clip-text text-transparent inline-flex items-center"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="mr-4"
                >
                  <Sparkles className="w-12 h-12 md:w-16 md:h-16" />
                </motion.div>
                Next-Gen
              </motion.span>
              <br />
              <motion.span 
                className="text-foreground relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Trading Platform
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Star className="w-8 h-8 text-golden" />
                </motion.div>
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your manual trading into powerful algorithms. 
              Build, backtest, and deploy strategies with our advanced AI-powered platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(66, 102, 255, 0.3)",
                    "0 0 40px rgba(66, 102, 255, 0.5)",
                    "0 0 20px rgba(66, 102, 255, 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-primary-foreground glow-primary text-lg px-8 py-4 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-100, 300] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center relative z-10"
                  >
                    <Rocket className="mr-2 w-5 h-5" />
                    Start Trading Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border-bright hover:bg-secondary/20 text-lg px-8 py-4 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10"
                    initial={false}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Watch Demo</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="hover-lift"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Card className="glass-card text-center p-6 hover:glow-primary transition-all duration-300 relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5"
                      initial={false}
                      whileHover={{ opacity: 0.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="flex justify-center mb-4 relative z-10">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center glow-primary"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3 + index * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </motion.div>
                    </div>
                    
                    <motion.h3 
                      className="text-lg font-semibold mb-2 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-muted-foreground relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                    >
                      {feature.description}
                    </motion.p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Floating particles */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-electric-blue' : 
              i % 3 === 1 ? 'bg-electric-purple' : 'bg-trading-green-bright'
            }`}
            style={{
              top: `${10 + (i * 8)}%`,
              left: `${5 + (i * 7)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Glowing orbs */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-sm"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              top: `${20 + (i * 15)}%`,
              right: `${10 + (i * 12)}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(66, 102, 255, 0.4), transparent)'
                : 'radial-gradient(circle, rgba(220, 38, 127, 0.4), transparent)',
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + (i * 0.8),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Connecting lines */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2 }}
        >
          <motion.path
            d="M100,200 Q300,100 500,300 T900,200"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M200,400 Q400,300 600,500 T1000,400"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(66, 102, 255, 0)" />
              <stop offset="50%" stopColor="rgba(66, 102, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(66, 102, 255, 0)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
              <stop offset="50%" stopColor="rgba(34, 197, 94, 0.8)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </div>
  );
};

export default HeroSection;