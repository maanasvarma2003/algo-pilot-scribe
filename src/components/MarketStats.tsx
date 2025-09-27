import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

interface MarketStat {
  label: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  icon: React.ElementType;
}

const MarketStats = () => {
  const [stats, setStats] = useState<MarketStat[]>([
    { 
      label: "Market Cap", 
      value: "₹2,45,67,890 Cr", 
      change: "+12,340", 
      changePercent: "+0.52%", 
      isPositive: true,
      icon: DollarSign
    },
    { 
      label: "Volume Traded", 
      value: "₹3,45,890 Cr", 
      change: "-5,670", 
      changePercent: "-1.61%", 
      isPositive: false,
      icon: Activity
    },
    { 
      label: "Advances", 
      value: "1,245", 
      change: "+89", 
      changePercent: "+7.69%", 
      isPositive: true,
      icon: TrendingUp
    },
    { 
      label: "Declines", 
      value: "2,890", 
      change: "+156", 
      changePercent: "+5.71%", 
      isPositive: false,
      icon: TrendingDown
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => {
          const randomChange = (Math.random() - 0.5) * 0.1;
          const newIsPositive = Math.random() > 0.4;
          
          return {
            ...stat,
            change: newIsPositive ? `+${Math.floor(Math.random() * 20000)}` : `-${Math.floor(Math.random() * 15000)}`,
            changePercent: `${newIsPositive ? '+' : ''}${(randomChange * 100).toFixed(2)}%`,
            isPositive: newIsPositive,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <Card className="glass-card p-4 hover:glow-primary transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${
                  stat.isPositive ? 'text-trading-green-bright' : 'text-trading-red-bright'
                }`} />
                <motion.div
                  animate={{ 
                    rotate: stat.isPositive ? [0, 5, 0] : [0, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.5 }}
                  className={`text-xs px-2 py-1 rounded-full ${
                    stat.isPositive 
                      ? 'bg-trading-green-soft text-trading-green-bright' 
                      : 'bg-trading-red-soft text-trading-red-bright'
                  }`}
                >
                  {stat.changePercent}
                </motion.div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm text-muted-foreground">{stat.label}</h3>
                <div className="text-lg font-bold">{stat.value}</div>
                <motion.div 
                  className={`text-xs ${
                    stat.isPositive ? 'text-trading-green-bright' : 'text-trading-red-bright'
                  }`}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.change}
                </motion.div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MarketStats;