import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface LiveIndexChartProps {
  index: string;
  color: string;
}

interface DataPoint {
  time: string;
  value: number;
  change: number;
}

const LiveIndexChart = ({ index, color }: LiveIndexChartProps) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [change, setChange] = useState(0);
  const [changePercent, setChangePercent] = useState(0);

  // Base values for different indices
  const baseValues = {
    NIFTY50: 21500,
    BANKNIFTY: 54500,
    SENSEX: 80600,
  };

  useEffect(() => {
    const baseValue = baseValues[index as keyof typeof baseValues] || 21500;
    
    // Initialize with some historical data
    const initialData: DataPoint[] = [];
    const now = new Date();
    
    for (let i = 59; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 1000);
      const randomChange = (Math.random() - 0.5) * 100;
      const value = baseValue + randomChange;
      
      initialData.push({
        time: time.toLocaleTimeString(),
        value: Math.round(value * 100) / 100,
        change: randomChange,
      });
    }
    
    setData(initialData);
    setCurrentValue(initialData[initialData.length - 1].value);
    
    // Set up real-time updates
    const interval = setInterval(() => {
      const now = new Date();
      const randomChange = (Math.random() - 0.5) * 150; // More volatility
      const trend = Math.sin(Date.now() / 10000) * 50; // Subtle trend
      const newValue = baseValue + randomChange + trend;
      
      const newPoint: DataPoint = {
        time: now.toLocaleTimeString(),
        value: Math.round(newValue * 100) / 100,
        change: randomChange,
      };
      
      setData(prevData => {
        const newData = [...prevData.slice(1), newPoint];
        return newData;
      });
      
      setCurrentValue(newPoint.value);
      
      // Calculate change from previous value
      const prevValue = data[data.length - 1]?.value || baseValue;
      const changeVal = newPoint.value - prevValue;
      const changePercentVal = (changeVal / prevValue) * 100;
      
      setChange(changeVal);
      setChangePercent(changePercentVal);
    }, 1000);

    return () => clearInterval(interval);
  }, [index]);

  const isPositive = change >= 0;

  return (
    <div className="space-y-4">
      {/* Current Value Display */}
      <motion.div 
        className="flex items-center justify-between"
        animate={{ scale: change !== 0 ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <div className="text-2xl font-bold">
            {currentValue.toLocaleString('en-IN', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </div>
          <div className={`text-sm flex items-center ${
            isPositive ? 'text-trading-green-bright' : 'text-trading-red-bright'
          }`}>
            {isPositive ? '↗' : '↘'} {Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
          </div>
        </div>
        <div className={`text-lg font-semibold ${
          isPositive ? 'text-trading-green-bright' : 'text-trading-red-bright'
        }`}>
          {isPositive ? '+' : ''}{change.toFixed(2)}
        </div>
      </motion.div>

      {/* Live Chart */}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              opacity={0.3}
            />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              tick={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              domain={['dataMin - 50', 'dataMax + 50']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <div className={`w-2 h-2 rounded-full animate-pulse-glow`} style={{ backgroundColor: color }}></div>
        <span>Live • Updates every second</span>
      </div>
    </div>
  );
};

export default LiveIndexChart;