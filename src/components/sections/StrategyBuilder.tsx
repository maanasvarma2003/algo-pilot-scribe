import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Layers, 
  Zap, 
  BarChart3, 
  Settings, 
  Play, 
  Pause,
  TrendingUp,
  Target,
  Shield
} from "lucide-react";
import StrategyVisualization3D from "@/components/backgrounds/StrategyVisualization3D";

const StrategyBuilder = () => {
  const strategies = [
    {
      name: "Iron Condor",
      description: "Multi-leg options strategy for range-bound markets",
      profit: "+₹12,450",
      winRate: "78%",
      icon: Layers,
      color: "text-electric-purple"
    },
    {
      name: "Momentum Breakout",
      description: "Captures strong price movements with volume confirmation",
      profit: "+₹8,920",
      winRate: "65%",
      icon: TrendingUp,
      color: "text-trading-green-bright"
    },
    {
      name: "Mean Reversion",
      description: "Profits from price returning to average levels",
      profit: "+₹15,680",
      winRate: "72%",
      icon: Target,
      color: "text-electric-blue"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Visual Builder",
      description: "Drag-and-drop interface for creating complex strategies",
      color: "text-electric-blue"
    },
    {
      icon: BarChart3,
      title: "Real-time Backtesting",
      description: "Test strategies against historical data instantly",
      color: "text-trading-green-bright"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Built-in safety controls and position sizing",
      color: "text-trading-red-bright"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <StrategyVisualization3D />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/65 to-background/85 z-10" />
      
      <div className="container mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Strategy Builder
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build, test, and deploy powerful trading algorithms with our 
            intuitive visual strategy builder.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="glass-card text-center p-6 hover:glow-primary transition-all duration-300 h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center glow-primary">
                      <Icon className={`w-6 h-6 text-primary-foreground`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Strategy Examples */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Strategy List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6">Template Strategies</h3>
              <div className="space-y-4">
                {strategies.map((strategy, index) => {
                  const Icon = strategy.icon;
                  return (
                    <motion.div
                      key={strategy.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-background-elevated/50 hover:bg-background-elevated transition-all cursor-pointer border-l-4 border-transparent hover:border-primary"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{strategy.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {strategy.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-trading-green-bright font-semibold">
                          {strategy.profit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Win Rate: {strategy.winRate}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Visual Builder Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6">Visual Strategy Builder</h3>
              
              {/* Mock Visual Builder */}
              <div className="space-y-4">
                <motion.div 
                  className="p-4 bg-gradient-trading rounded-lg text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-primary-foreground font-semibold">ENTRY CONDITIONS</div>
                  <div className="text-sm text-primary-foreground/80 mt-1">
                    RSI(14) &lt; 30 AND Volume &gt; 1.2x Avg
                  </div>
                </motion.div>

                <div className="flex justify-center">
                  <motion.div 
                    className="w-px h-8 bg-border-bright"
                    animate={{ scaleY: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                <motion.div 
                  className="p-4 bg-gradient-primary rounded-lg text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-primary-foreground font-semibold">POSITION SIZING</div>
                  <div className="text-sm text-primary-foreground/80 mt-1">
                    2% of Portfolio
                  </div>
                </motion.div>

                <div className="flex justify-center">
                  <motion.div 
                    className="w-px h-8 bg-border-bright"
                    animate={{ scaleY: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </div>

                <motion.div 
                  className="p-4 bg-gradient-danger rounded-lg text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-primary-foreground font-semibold">EXIT CONDITIONS</div>
                  <div className="text-sm text-primary-foreground/80 mt-1">
                    Target: 1.5R | Stop: 1R | Time: 30min
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <Button 
                  className="flex-1 bg-gradient-trading hover:opacity-90 text-primary-foreground"
                  size="sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Backtest
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-border-bright"
                  size="sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Ready to Build Your First Strategy?
            </h3>
            <p className="text-muted-foreground mb-6">
              Start with our guided wizard and create your first automated trading strategy in minutes.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground glow-primary"
            >
              <Zap className="w-5 h-5 mr-2" />
              Launch Strategy Builder
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default StrategyBuilder;