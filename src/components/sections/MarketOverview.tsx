import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import LiveIndexChart from "@/components/LiveIndexChart";
import MarketStats from "@/components/MarketStats";
import TopStocks from "@/components/TopStocks";

const MarketOverview = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-trading bg-clip-text text-transparent">
              Live Market
            </span>{" "}
            Overview
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time market data, live charts, and comprehensive analytics 
            to keep you ahead of the markets.
          </p>
        </motion.div>

        {/* Live Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <MarketStats />
        </motion.div>

        {/* Live Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-3 h-3 bg-trading-green-bright rounded-full mr-2 animate-pulse-glow"></span>
                NIFTY 50 - Live
              </h3>
              <LiveIndexChart index="NIFTY50" color="#00ff88" />
            </Card>

            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-3 h-3 bg-electric-blue rounded-full mr-2 animate-pulse-glow"></span>
                BANK NIFTY - Live
              </h3>
              <LiveIndexChart index="BANKNIFTY" color="#4466ff" />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-3 h-3 bg-trading-red-bright rounded-full mr-2 animate-pulse-glow"></span>
                SENSEX - Live
              </h3>
              <LiveIndexChart index="SENSEX" color="#ff4444" />
            </Card>

            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">
                Top Performers
              </h3>
              <TopStocks />
            </Card>
          </motion.div>
        </div>

        {/* Market Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Market Insights & AI Analysis
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-trading rounded-full flex items-center justify-center mx-auto mb-4 glow-trading">
                  <span className="text-2xl font-bold text-primary-foreground">AI</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">AI Predictions</h4>
                <p className="text-muted-foreground">
                  Advanced algorithms analyze market patterns to predict trends
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 glow-primary">
                  <span className="text-2xl font-bold text-primary-foreground">RT</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Real-Time Data</h4>
                <p className="text-muted-foreground">
                  Live market data updated every second for instant decisions
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-danger rounded-full flex items-center justify-center mx-auto mb-4 glow-danger">
                  <span className="text-2xl font-bold text-primary-foreground">RA</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Risk Analysis</h4>
                <p className="text-muted-foreground">
                  Comprehensive risk assessment for every trading decision
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketOverview;