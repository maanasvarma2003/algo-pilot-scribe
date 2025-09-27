import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TradingPlatform from "./pages/TradingPlatform";
import AuthPage from "./pages/AuthPage";
import Chatbot from "./components/Chatbot";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            {showAuth ? (
              <motion.div
                key="auth"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <AuthPage onClose={() => setShowAuth(false)} />
              </motion.div>
            ) : (
              <motion.div
                key="platform"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route path="/" element={<TradingPlatform onShowAuth={() => setShowAuth(true)} />} />
                  <Route path="*" element={<TradingPlatform onShowAuth={() => setShowAuth(true)} />} />
                </Routes>
              </motion.div>
            )}
          </AnimatePresence>
        </BrowserRouter>
        <Chatbot />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
