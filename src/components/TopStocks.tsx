import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const TopStocks = () => {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers'>('gainers');
  const [stocks, setStocks] = useState<{ gainers: Stock[], losers: Stock[] }>({
    gainers: [
      { symbol: "LT", name: "Larsen & Toubro Ltd", price: 3752.00, change: 107.60, changePercent: 2.95 },
      { symbol: "TATAMOTORS", name: "Tata Motors Ltd", price: 674.15, change: 9.85, changePercent: 1.48 },
      { symbol: "ITC", name: "ITC Ltd", price: 405.05, change: 4.95, changePercent: 1.24 },
      { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 1380.00, change: 7.60, changePercent: 0.55 },
      { symbol: "MARUTI", name: "Maruti Suzuki India Ltd", price: 16346.00, change: 77.00, changePercent: 0.47 },
    ],
    losers: [
      { symbol: "ICICIBANK", name: "ICICI Bank", price: 1156.80, change: -24.50, changePercent: -2.07 },
      { symbol: "HDFCBANK", name: "HDFC Bank", price: 1743.25, change: -18.75, changePercent: -1.06 },
      { symbol: "INFY", name: "Infosys", price: 1842.90, change: -15.60, changePercent: -0.84 },
      { symbol: "TCS", name: "Tata Consultancy Services", price: 4125.30, change: -31.20, changePercent: -0.75 },
      { symbol: "WIPRO", name: "Wipro", price: 565.40, change: -3.85, changePercent: -0.68 },
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => ({
        gainers: prevStocks.gainers.map(stock => ({
          ...stock,
          change: stock.change + (Math.random() - 0.5) * 10,
          changePercent: stock.changePercent + (Math.random() - 0.5) * 0.5,
        })),
        losers: prevStocks.losers.map(stock => ({
          ...stock,
          change: stock.change + (Math.random() - 0.5) * 10,
          changePercent: stock.changePercent + (Math.random() - 0.5) * 0.5,
        })),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentStocks = stocks[activeTab];

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex space-x-2">
        <motion.button
          onClick={() => setActiveTab('gainers')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'gainers'
              ? 'bg-trading-green-soft text-trading-green-bright glow-trading'
              : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Top Gainers
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('losers')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'losers'
              ? 'bg-trading-red-soft text-trading-red-bright glow-danger'
              : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Top Losers
        </motion.button>
      </div>

      {/* Stock List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          {currentStocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center justify-between p-3 rounded-lg bg-background-elevated/50 hover:bg-background-elevated/80 transition-all cursor-pointer border border-transparent hover:border-border-bright"
            >
              <div className="flex-1">
                <div className="font-semibold text-sm">{stock.symbol}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {stock.name}
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-sm">
                  ₹{stock.price.toLocaleString('en-IN', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </div>
                <motion.div 
                  className={`text-xs flex items-center justify-end space-x-1 ${
                    stock.change >= 0 ? 'text-trading-green-bright' : 'text-trading-red-bright'
                  }`}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3 
                  }}
                >
                  <span>{stock.change >= 0 ? '↗' : '↘'}</span>
                  <span>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} 
                    ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TopStocks;