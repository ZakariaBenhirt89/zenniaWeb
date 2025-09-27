import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { Logo } from "./Logo";
import { motion } from "motion/react";

interface LoginScreenProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}

export function LoginScreen({ onSwitchToSignup, onLoginSuccess }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Login attempt:", { email, password, rememberMe });
    
    // Redirect to ecommerce page after successful login
    onLoginSuccess();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Logo */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.5 
              }}
            >
              <motion.div 
                className="relative"
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
              >
                <motion.div 
                  className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-white/20 relative"
                  animate={{
                    boxShadow: [
                      "0 25px 50px -12px rgba(255, 215, 0, 0.25)",
                      "0 25px 50px -12px rgba(255, 165, 0, 0.4)",
                      "0 25px 50px -12px rgba(255, 215, 0, 0.25)",
                    ],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Glowing ring effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"
                    animate={{
                      rotate: [0, 360],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      rotate: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      opacity: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    }}
                    style={{
                      filter: "blur(4px)",
                      zIndex: -1,
                      transform: "scale(1.1)",
                    }}
                  />
                  
                  {/* Zennia Logo */}
                  <div className="relative z-10">
                    <Logo className="w-10 h-10" animate={true} />
                  </div>
                </motion.div>

                {/* Floating particles around logo */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    animate={{
                      x: [0, Math.cos((i * 60) * Math.PI / 180) * 40],
                      y: [0, Math.sin((i * 60) * Math.PI / 180) * 40],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
            <motion.h1 
              className="text-3xl font-medium text-white mb-2 drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                textShadow: [
                  "0 0 10px rgba(255, 215, 0, 0.3)",
                  "0 0 20px rgba(255, 215, 0, 0.6)",
                  "0 0 10px rgba(255, 215, 0, 0.3)"
                ]
              }}
              transition={{ 
                opacity: { delay: 0.8 },
                textShadow: { duration: 3, repeat: Infinity }
              }}
            >
              Welcome to Zennia
            </motion.h1>
            <motion.p 
              className="text-white/80 drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Sign in to discover luxury jewelry collections
            </motion.p>
          </motion.div>

          {/* Login Form */}
          <motion.form 
            onSubmit={handleLogin} 
            className="space-y-6 max-w-sm mx-auto w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Email Field */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400/70" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-yellow-400/50 transition-colors"
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
            >
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400/70" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-yellow-400/50 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400/70 hover:text-yellow-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-white/30 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-black data-[state=checked]:border-yellow-500"
                />
                <Label htmlFor="remember" className="text-sm text-white/80">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-yellow-300 hover:text-yellow-200 underline transition-colors"
              >
                Forgot password?
              </button>
            </motion.div>

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                  />
                ) : (
                  "Sign In to Zennia"
                )}
              </Button>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <motion.div 
            className="flex items-center my-6 max-w-sm mx-auto w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <Separator className="flex-1 bg-white/20" />
            <span className="px-3 text-sm text-white/70">Or continue with</span>
            <Separator className="flex-1 bg-white/20" />
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div 
            className="space-y-3 max-w-sm mx-auto w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
          >
            <Button
              variant="outline"
              onClick={onLoginSuccess}
              className="w-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-yellow-400/50 transition-all duration-300"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              onClick={onLoginSuccess}
              className="w-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-yellow-400/50 transition-all duration-300"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.312-.623-.312-1.546c0-1.448.839-2.529 1.883-2.529.888 0 1.317.666 1.317 1.466 0 .893-.568 2.229-.861 3.467-.245 1.037.52 1.883 1.546 1.883 1.854 0 3.279-1.958 3.279-4.786 0-2.503-1.799-4.253-4.370-4.253-2.978 0-4.727 2.234-4.727 4.546 0 .9.347 1.866.780 2.391.085.104.098.195.072.301-.079.329-.255 1.045-.290 1.191-.047.188-.154.228-.355.137-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.190 6.22-1.013 0-1.966-.527-2.29-1.155l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.290 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
              Continue with Apple
            </Button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
          >
            <p className="text-white/70">
              Don't have an account?{" "}
              <button 
                onClick={onSwitchToSignup}
                className="text-yellow-300 hover:text-yellow-200 font-medium underline transition-colors"
              >
                Join Zennia
              </button>
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          className="text-center py-6 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          <p className="text-xs text-white/60">
            By signing in, you agree to our{" "}
            <button className="text-yellow-400 underline hover:text-yellow-300 transition-colors">Terms of Service</button> and{" "}
            <button className="text-yellow-400 underline hover:text-yellow-300 transition-colors">Privacy Policy</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}