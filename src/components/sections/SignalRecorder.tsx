import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Radio, 
  Play, 
  Square, 
  BarChart3, 
  Zap,
  History,
  TrendingUp,
  Target,
  Clock,
  CheckCircle
} from "lucide-react";

const SignalRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTrades, setRecordedTrades] = useState(0);

  const mockTrades = [
    { symbol: "RELIANCE", action: "BUY", price: 2847.50, time: "10:45 AM", reason: "RSI Oversold + Volume Spike" },
    { symbol: "NIFTY", action: "SELL", price: 21456.30, time: "11:20 AM", reason: "Resistance Break Failed" },
    { symbol: "BANKNIFTY", action: "BUY", price: 54234.75, time: "12:15 PM", reason: "Support Bounce + Bullish Divergence" },
    { symbol: "TCS", action: "SELL", price: 4125.80, time: "1:30 PM", reason: "Profit Target Reached" },
  ];

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate recording trades
      const interval = setInterval(() => {
        setRecordedTrades(prev => {
          if (prev >= 28) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 200);
    }
  };

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
            <span className="bg-gradient-danger bg-clip-text text-transparent">
              Signal Recorder
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your manual trading patterns into automated strategies. 
            Record your trades and let AI generate optimized algorithms.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recording Interface */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-8">
              <div className="text-center mb-8">
                <motion.div
                  className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    isRecording 
                      ? 'bg-gradient-danger glow-danger animate-pulse-glow' 
                      : 'bg-gradient-primary glow-primary'
                  }`}
                  animate={{ 
                    scale: isRecording ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: isRecording ? Infinity : 0 
                  }}
                >
                  <Radio className="w-12 h-12 text-primary-foreground" />
                </motion.div>
                
                <h3 className="text-2xl font-semibold mb-2">
                  {isRecording ? 'Recording Active' : 'Ready to Record'}
                </h3>
                <p className="text-muted-foreground">
                  {isRecording 
                    ? 'Capturing your trading patterns and decisions...' 
                    : 'Click to start recording your manual trades'
                  }
                </p>
              </div>

              {/* Recording Stats */}
              <AnimatePresence>
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-background-elevated/50 rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Trades Recorded:</span>
                      <motion.span 
                        className="text-lg font-bold text-trading-green-bright"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.3 }}
                        key={recordedTrades}
                      >
                        {recordedTrades}
                      </motion.span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2 mt-2">
                      <motion.div
                        className="bg-gradient-trading h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(recordedTrades / 28) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Control Button */}
              <Button
                onClick={handleRecordingToggle}
                size="lg"
                className={`w-full ${
                  isRecording 
                    ? 'bg-gradient-danger hover:opacity-90 glow-danger' 
                    : 'bg-gradient-primary hover:opacity-90 glow-primary'
                } text-primary-foreground`}
              >
                {isRecording ? (
                  <>
                    <Square className="w-5 h-5 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>

              {/* Feature List */}
              <div className="mt-8 space-y-3">
                {[
                  { icon: History, text: "Captures entry/exit decisions" },
                  { icon: Target, text: "Records reasoning & conditions" },
                  { icon: BarChart3, text: "Analyzes market context" },
                  { icon: Zap, text: "Generates AI suggestions" }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <Icon className="w-4 h-4 text-electric-cyan" />
                      <span>{feature.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Trade History & Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Recorded Trades</h3>
              <div className="space-y-3">
                {mockTrades.map((trade, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-background-elevated/50 hover:bg-background-elevated transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        trade.action === 'BUY' ? 'bg-trading-green-bright' : 'bg-trading-red-bright'
                      }`} />
                      <div>
                        <div className="font-semibold text-sm">{trade.symbol}</div>
                        <div className="text-xs text-muted-foreground">{trade.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        trade.action === 'BUY' ? 'text-trading-green-bright' : 'text-trading-red-bright'
                      }`}>
                        {trade.action} ₹{trade.price}
                      </div>
                      <div className="text-xs text-muted-foreground max-w-40 truncate">
                        {trade.reason}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">AI Pattern Analysis</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-trading/10 border border-trading-green-soft">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-trading-green-bright" />
                    <span className="text-sm">RSI Oversold Pattern</span>
                  </div>
                  <span className="text-xs text-trading-green-bright">85% Accuracy</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-primary/10 border border-electric-blue/30">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-electric-blue" />
                    <span className="text-sm">Volume Confirmation</span>
                  </div>
                  <span className="text-xs text-electric-blue">78% Accuracy</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-danger/10 border border-trading-red-soft">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-trading-red-bright" />
                    <span className="text-sm">Time-based Exits</span>
                  </div>
                  <span className="text-xs text-trading-red-bright">92% Accuracy</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-gradient-primary hover:opacity-90 text-primary-foreground"
                size="sm"
              >
                <Zap className="w-4 h-4 mr-2" />
                Generate Strategy
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-semibold text-center mb-8">
              From Manual Trading to Automation
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Record", desc: "Capture your trading decisions", icon: Radio, color: "text-electric-purple" },
                { step: "2", title: "Analyze", desc: "AI identifies patterns", icon: BarChart3, color: "text-electric-blue" },
                { step: "3", title: "Generate", desc: "Create strategy skeleton", icon: Zap, color: "text-trading-green-bright" },
                { step: "4", title: "Deploy", desc: "Automate with safeguards", icon: Target, color: "text-golden" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="relative mb-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto glow-primary">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-trading rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {item.step}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignalRecorder;