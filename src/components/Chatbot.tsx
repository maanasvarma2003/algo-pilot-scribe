import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Minimize2,
  Maximize2
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion';
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Nubra AI assistant. I can help you with trading strategies, market insights, and platform features. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    { text: "How to create a trading strategy?", icon: TrendingUp },
    { text: "Market analysis for today", icon: BarChart3 },
    { text: "Risk management tips", icon: PieChart },
    { text: "Live market data", icon: Activity }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('strategy') || message.includes('algo')) {
      return 'Great question! Nubra offers powerful strategy building tools. You can create algorithmic strategies using our visual builder or code editor. Would you like me to guide you through the Strategy Builder section?';
    } else if (message.includes('market') || message.includes('nifty') || message.includes('sensex')) {
      return 'I can see you\'re interested in market data! Our platform provides real-time data for Nifty50, Bank Nifty, and Sensex. You can view live charts and analytics in the Market Overview section.';
    } else if (message.includes('risk') || message.includes('management')) {
      return 'Risk management is crucial! Nubra includes advanced risk controls like position sizing, stop-loss automation, and portfolio diversification tools. Would you like to know more about our risk management features?';
    } else if (message.includes('help') || message.includes('how')) {
      return 'I\'m here to help! You can ask me about trading strategies, market analysis, platform features, or any trading-related questions. What specific area interests you?';
    } else if (message.includes('price') || message.includes('cost') || message.includes('subscription')) {
      return 'Nubra offers flexible pricing plans to suit different trading needs. You can start with our free tier and upgrade as you scale. Would you like to know more about our pricing options?';
    } else if (message.includes('demo') || message.includes('trial')) {
      return 'Absolutely! We offer a comprehensive demo and paper trading environment. You can test strategies risk-free before going live. Shall I show you how to get started?';
    } else {
      return 'That\'s an interesting question! While I can help with general trading and platform queries, for specific technical issues, our support team is available 24/7. Is there anything else about trading or Nubra features I can assist with?';
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2 p-3"
    >
      <Bot className="w-6 h-6 text-electric-blue" />
      <div className="flex space-x-1">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={`dot-${i}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 bg-electric-blue rounded-full"
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">AI is thinking...</span>
    </motion.div>
  );

  return (
    <>
      {/* Chatbot Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-primary hover:opacity-90 glow-primary group"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <MessageCircle className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform" />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              x: 50, 
              y: 50 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              x: 50, 
              y: 50 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            }`}
          >
            <Card className="glass-card border-border-bright h-full flex flex-col overflow-hidden">
              {/* Header */}
              <motion.div 
                className="p-4 border-b border-border-bright bg-gradient-primary/10"
                layout
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                      className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center glow-primary"
                    >
                      <Bot className="w-6 h-6 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold">Nubra AI Assistant</h3>
                      <p className="text-xs text-muted-foreground">
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Online
                        </motion.span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="hover:bg-secondary/20"
                    >
                      {isMinimized ? 
                        <Maximize2 className="w-4 h-4" /> : 
                        <Minimize2 className="w-4 h-4" />
                      }
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-secondary/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ 
                              opacity: 0, 
                              y: 20,
                              x: message.sender === 'user' ? 20 : -20
                            }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className={`flex ${
                              message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div className={`flex items-start space-x-2 max-w-[80%] ${
                              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                            }`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                message.sender === 'user' 
                                  ? 'bg-gradient-trading' 
                                  : 'bg-gradient-primary'
                              }`}>
                                {message.sender === 'user' ? (
                                  <User className="w-4 h-4 text-primary-foreground" />
                                ) : (
                                  <Bot className="w-4 h-4 text-primary-foreground" />
                                )}
                              </div>
                              
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className={`p-3 rounded-2xl ${
                                  message.sender === 'user'
                                    ? 'bg-gradient-trading text-primary-foreground'
                                    : 'bg-secondary/50 border border-border-bright'
                                }`}
                              >
                                <p className="text-sm leading-relaxed">{message.text}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </p>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                        
                        {isTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Quick Suggestions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border-t border-border-bright"
                    >
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {quickSuggestions.map((suggestion, index) => {
                          const Icon = suggestion.icon;
                          return (
                            <motion.button
                              key={suggestion.text}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSendMessage(suggestion.text)}
                              className="p-2 text-xs bg-secondary/30 hover:bg-secondary/50 rounded-lg border border-border-bright transition-all duration-200 text-left flex items-center space-x-2"
                            >
                              <Icon className="w-3 h-3 text-electric-blue" />
                              <span className="truncate">{suggestion.text}</span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Input */}
                      <div className="flex items-center space-x-2">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me anything about trading..."
                          className="flex-1 bg-secondary/30 border-border-bright"
                        />
                        <Button
                          onClick={() => handleSendMessage()}
                          disabled={!inputMessage.trim() || isTyping}
                          className="bg-gradient-primary hover:opacity-90 glow-primary"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;