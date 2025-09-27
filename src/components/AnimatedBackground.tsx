import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

export function AnimatedBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 3 + 2,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900" />
      
      {/* Moon with Orbital Movement */}
      <motion.div
        className="absolute w-28 h-28"
        initial={{ 
          x: "80vw", 
          y: "10vh",
          opacity: 0,
          scale: 0 
        }}
        animate={{ 
          x: ["80vw", "70vw", "50vw", "30vw", "20vw", "30vw", "50vw", "70vw", "80vw"],
          y: ["10vh", "15vh", "25vh", "20vh", "15vh", "10vh", "8vh", "12vh", "10vh"],
          opacity: [0, 0.8, 1, 1, 1, 1, 1, 0.8, 0],
          scale: [0, 1, 1.1, 1, 0.9, 1, 1.05, 1, 0],
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.1, 0.3, 0.5, 0.6, 0.7, 0.85, 0.95, 1]
        }}
      >
        {/* Moon Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-100"
          animate={{
            boxShadow: [
              "0 0 40px rgba(255, 255, 0, 0.3), 0 0 80px rgba(255, 255, 0, 0.1)",
              "0 0 60px rgba(255, 255, 0, 0.5), 0 0 120px rgba(255, 255, 0, 0.2)",
              "0 0 40px rgba(255, 255, 0, 0.3), 0 0 80px rgba(255, 255, 0, 0.1)",
            ],
            filter: [
              "blur(0px) brightness(1)",
              "blur(1px) brightness(1.2)",
              "blur(0px) brightness(1)",
            ]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            filter: "blur(2px)",
            transform: "scale(1.3)",
            zIndex: -1,
          }}
        />

        {/* Main Moon Body */}
        <motion.div
          className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 shadow-2xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            rotate: {
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* Moon craters with animation */}
          <motion.div 
            className="absolute top-4 left-5 w-3 h-3 rounded-full bg-yellow-300 opacity-40"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute top-10 right-7 w-2 h-2 rounded-full bg-yellow-300 opacity-35"
            animate={{
              opacity: [0.25, 0.5, 0.25],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div 
            className="absolute bottom-8 left-10 w-2.5 h-2.5 rounded-full bg-yellow-300 opacity-30"
            animate={{
              opacity: [0.2, 0.45, 0.2],
              scale: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div 
            className="absolute top-16 left-8 w-1.5 h-1.5 rounded-full bg-yellow-300 opacity-25"
            animate={{
              opacity: [0.15, 0.4, 0.15],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Moon phases effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-l from-slate-600/20 to-transparent"
            animate={{
              opacity: [0, 0.3, 0.1, 0.4, 0],
              scaleX: [0, 0.3, 0.7, 1, 0.8, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Moonbeams */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`moonbeam-${i}`}
            className="absolute w-0.5 h-12 bg-gradient-to-b from-yellow-200 to-transparent"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "center top",
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleY: [0.5, 1.2, 0.5],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, star.opacity, 0],
            scale: [0.5, 1, 0.5],
            y: [0, -10, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Shooting Stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          initial={{ 
            opacity: 0,
            x: -100,
            y: -50,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, 200, 400],
            y: [0, 100, 200],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 8 + 2,
            ease: "easeOut",
          }}
        >
          {/* Shooting star tail */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white via-blue-200 to-transparent"
            style={{
              width: "60px",
              height: "2px",
              transform: "rotate(25deg)",
              transformOrigin: "left center",
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 8 + 2,
            }}
          />
        </motion.div>
      ))}

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Nebula Effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 40%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
                       radial-gradient(circle at 70% 80%, rgba(75, 0, 130, 0.4) 0%, transparent 50%),
                       radial-gradient(circle at 40% 70%, rgba(25, 25, 112, 0.3) 0%, transparent 50%)`,
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}