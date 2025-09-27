import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface AuthPageProps {
  onClose: () => void;
}

const AuthPage = ({ onClose }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      toast.success("Login successful! Welcome to Nubra Trading Platform.");
    } else {
      toast.success("Account created successfully! Welcome to Nubra Trading Platform.");
    }
    
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: -180 }}
        transition={{ 
          duration: 0.6, 
          type: "spring", 
          stiffness: 100,
          perspective: 1000 
        }}
        className="relative w-full max-w-md mx-4"
      >
        <Card className="glass-card border-border-bright">
          <motion.button
            onClick={onClose}
            className="absolute -top-4 -right-4 p-2 rounded-full bg-gradient-primary text-primary-foreground hover:scale-110 transition-all duration-200 glow-primary"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          <div className="p-8">
            <motion.div
              className="text-center mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {isLogin ? "Welcome Back" : "Join Nubra"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Sign in to access your trading dashboard" 
                  : "Create your account to start trading"
                }
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium mb-2">
                      <User className="w-4 h-4 text-electric-blue" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-background-elevated border-border-bright focus:border-primary focus:ring-primary/20"
                      placeholder="Enter your full name"
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 text-electric-purple" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-background-elevated border-border-bright focus:border-primary focus:ring-primary/20"
                  placeholder="Enter your email"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Lock className="w-4 h-4 text-electric-cyan" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="bg-background-elevated border-border-bright focus:border-primary focus:ring-primary/20 pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-3 glow-primary"
                  size="lg"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </motion.div>
            </form>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-muted-foreground text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <motion.button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary/80 font-medium text-sm mt-1 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? "Sign up here" : "Sign in here"}
              </motion.button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;