import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users,
  Award,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  CheckCircle,
  Star,
  Target
} from "lucide-react";
import AboutVisualization3D from "@/components/backgrounds/AboutVisualization3D";

const AboutSection = () => {
  const stats = [
    { value: "50K+", label: "Active Traders", icon: Users, color: "text-electric-blue" },
    { value: "₹1000Cr+", label: "Daily Volume", icon: TrendingUp, color: "text-trading-green-bright" },
    { value: "99.9%", label: "Uptime", icon: Shield, color: "text-electric-purple" },
    { value: "24/7", label: "Support", icon: Zap, color: "text-golden" }
  ];

  const features = [
    "Advanced algorithmic trading platform",
    "Real-time market data and analytics",
    "Professional-grade risk management",
    "AI-powered strategy optimization",
    "Multi-asset class support",
    "Institutional-level security"
  ];


  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <AboutVisualization3D />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-background/89 via-background/69 to-background/89 z-10" />
      
      <div className="container mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Nubra</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering traders with cutting-edge technology to transform manual trading into sophisticated algorithms.
          </p>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="glass-card text-center p-6 hover:glow-primary transition-all duration-300">
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-8 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center glow-primary mr-4">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To democratize algorithmic trading by providing sophisticated tools and AI-powered insights 
                that were once exclusive to institutional investors. We believe every trader should have 
                access to professional-grade technology to enhance their trading performance.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-8 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-trading rounded-xl flex items-center justify-center glow-trading mr-4">
                  <Globe className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become India's leading algorithmic trading platform, fostering a community of 
                successful automated traders. We envision a future where intelligent algorithms 
                help traders achieve consistent profitability while managing risk effectively.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-semibold text-center mb-8">Why Choose Nubra?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-trading-green-bright flex-shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>


        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-semibold text-center mb-8">Awards & Recognition</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Best Trading Platform 2024", org: "FinTech India Awards", icon: Award },
                { title: "Innovation in AI Trading", org: "TechCrunch Disrupt", icon: Zap },
                { title: "5-Star Customer Rating", org: "TrustPilot Reviews", icon: Star }
              ].map((award, index) => {
                const Icon = award.icon;
                return (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4"
                  >
                    <Icon className="w-12 h-12 text-golden mx-auto mb-3" />
                    <h4 className="font-semibold mb-1">{award.title}</h4>
                    <p className="text-sm text-muted-foreground">{award.org}</p>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of successful traders who have transformed their trading with Nubra's advanced platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground glow-primary"
              >
                <Users className="w-5 h-5 mr-2" />
                Join Our Community
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-border-bright hover:bg-secondary/20"
              >
                Schedule a Demo
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;