import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator,
  PieChart,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Settings,
  Zap,
  Shield,
  Target,
  Clock,
  DollarSign,
  Activity
} from "lucide-react";
import ToolsVisualization3D from "@/components/backgrounds/ToolsVisualization3D";

const TradingTools = () => {
  const tools = [
    {
      name: "Options Calculator",
      description: "Calculate Greeks, implied volatility, and profit/loss scenarios",
      icon: Calculator,
      color: "text-electric-blue",
      gradient: "bg-gradient-primary",
      features: ["Greeks Calculation", "P&L Scenarios", "Volatility Analysis"]
    },
    {
      name: "Portfolio Analyzer",
      description: "Advanced portfolio analytics and risk assessment tools",
      icon: PieChart,
      color: "text-electric-purple",
      gradient: "bg-gradient-trading",
      features: ["Risk Metrics", "Correlation Analysis", "Performance Attribution"]
    },
    {
      name: "Risk Manager",
      description: "Real-time risk monitoring and position sizing tools",
      icon: AlertTriangle,
      color: "text-trading-red-bright",
      gradient: "bg-gradient-danger",
      features: ["Position Sizing", "Stop Loss Alerts", "Drawdown Monitoring"]
    }
  ];

  const quickTools = [
    { name: "Position Calculator", icon: Target, value: "₹2,45,000", desc: "Current Position Value" },
    { name: "P&L Tracker", icon: TrendingUp, value: "+₹12,450", desc: "Today's P&L" },
    { name: "Risk Meter", icon: Shield, value: "2.5%", desc: "Portfolio Risk" },
    { name: "Active Alerts", icon: Clock, value: "7", desc: "Price Alerts" }
  ];

  const marketAnalysis = [
    { metric: "Volatility Index", value: "15.67", change: "+0.45", trend: "up" },
    { metric: "Put/Call Ratio", value: "0.84", change: "-0.12", trend: "down" },
    { metric: "Fear & Greed", value: "72", change: "+5", trend: "up" },
    { metric: "Market Breadth", value: "68%", change: "+2.3%", trend: "up" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ToolsVisualization3D />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-background/87 via-background/67 to-background/87 z-10" />
      
      <div className="container mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-trading bg-clip-text text-transparent">
              Trading Tools
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional-grade tools to analyze markets, manage risk, 
            and optimize your trading performance.
          </p>
        </motion.div>

        {/* Main Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-6 mb-12"
        >
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="glass-card p-6 hover:glow-primary transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${tool.gradient} rounded-xl flex items-center justify-center glow-primary`}>
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <Button size="sm" variant="outline" className="border-border-bright">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground">
                    <Zap className="w-4 h-4 mr-2" />
                    Launch Tool
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Tools Dashboard */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Quick Access Tools */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6">Quick Access Dashboard</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-center p-4 rounded-lg bg-background-elevated/50 hover:bg-background-elevated transition-all cursor-pointer"
                    >
                      <Icon className="w-8 h-8 text-electric-cyan mx-auto mb-2" />
                      <div className="text-lg font-bold mb-1">{tool.value}</div>
                      <div className="text-xs text-muted-foreground">{tool.desc}</div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Real-time Indicators */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6">Market Indicators</h3>
              <div className="space-y-4">
                {marketAnalysis.map((item, index) => (
                  <motion.div
                    key={item.metric}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-3 rounded-lg bg-background-elevated/50"
                  >
                    <div>
                      <div className="text-sm font-medium">{item.metric}</div>
                      <div className="text-lg font-bold">{item.value}</div>
                    </div>
                    <motion.div 
                      className={`text-sm font-medium ${
                        item.trend === 'up' ? 'text-trading-green-bright' : 'text-trading-red-bright'
                      }`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {item.trend === 'up' ? '↗' : '↘'} {item.change}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Advanced Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="glass-card p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4">Advanced Analytics Suite</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools for deep market analysis, backtesting, and performance optimization
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: BarChart3, title: "Technical Analysis", desc: "50+ indicators", color: "text-electric-blue" },
                { icon: Activity, title: "Live Scanner", desc: "Real-time opportunities", color: "text-trading-green-bright" },
                { icon: DollarSign, title: "Cost Analysis", desc: "Brokerage optimizer", color: "text-golden" },
                { icon: Shield, title: "Risk Analytics", desc: "Portfolio protection", color: "text-trading-red-bright" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 rounded-lg bg-background-elevated/30 hover:bg-background-elevated/50 transition-all cursor-pointer border border-transparent hover:border-border-bright"
                  >
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 glow-primary">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground glow-primary">
                <Activity className="w-5 h-5 mr-2" />
                Explore All Tools
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingTools;