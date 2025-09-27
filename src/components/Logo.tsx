import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export function Logo({ className = "w-8 h-8", animate = true }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={animate ? {
          rotate: [0, 360],
        } : {}}
        transition={{
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }
        }}
      >
        {/* Diamond Shape Base */}
        <motion.path
          d="M16 2L26 12L16 30L6 12Z"
          fill="url(#diamondGradient)"
          stroke="url(#goldStroke)"
          strokeWidth="1"
          animate={animate ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Inner Diamond Facets */}
        <motion.path
          d="M16 2L21 7L16 12L11 7Z"
          fill="url(#facetGradient)"
          opacity="0.8"
          animate={animate ? {
            opacity: [0.6, 1, 0.6],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.path
          d="M11 7L16 12L6 12Z"
          fill="url(#shadowGradient)"
          opacity="0.6"
        />
        
        <motion.path
          d="M16 12L21 7L26 12Z"
          fill="url(#shadowGradient)"
          opacity="0.6"
        />
        
        {/* Center Light Reflection */}
        <motion.circle
          cx="16"
          cy="10"
          r="2"
          fill="url(#centerLight)"
          animate={animate ? {
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Sparkle Effects */}
        {animate && [...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={12 + (i % 3) * 4}
            cy={8 + Math.floor(i / 3) * 4}
            r="0.5"
            fill="#FFD700"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Zennia Text Integration (subtle) */}
        <motion.text
          x="16"
          y="25"
          textAnchor="middle"
          fill="url(#goldStroke)"
          fontSize="3"
          fontWeight="600"
          animate={animate ? {
            opacity: [0.7, 1, 0.7],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Z
        </motion.text>
        
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#FFD700" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#FFA500" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.6" />
          </linearGradient>
          
          <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
          
          <linearGradient id="facetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
          </linearGradient>
          
          <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8860B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B7000" stopOpacity="0.8" />
          </linearGradient>
          
          <radialGradient id="centerLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2" />
          </radialGradient>
        </defs>
      </motion.svg>
    </div>
  );
}