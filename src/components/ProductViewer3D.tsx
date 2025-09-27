import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Stars, Text, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Loader2, RotateCcw, ZoomIn, ZoomOut, Maximize2, Eye, EyeOff } from "lucide-react";
import * as THREE from "three";

interface ProductViewer3DProps {
  productName: string;
  category: string;
  materials: string[];
  onClose?: () => void;
  isVisible: boolean;
}

// 3D Jewelry Model Component (placeholder - in real app would load actual 3D models)
function JewelryModel({ category, materials }: { category: string; materials: string[] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Determine geometry and material based on product category
  const getGeometry = () => {
    switch (category) {
      case "rings":
        return <torusGeometry args={[1, 0.3, 16, 32]} />;
      case "necklaces":
        return <sphereGeometry args={[0.8, 32, 32]} />;
      case "earrings":
        return <sphereGeometry args={[0.6, 32, 32]} />;
      case "bracelets":
        return <torusGeometry args={[1.2, 0.2, 16, 32]} />;
      case "watches":
        return <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />;
      default:
        return <sphereGeometry args={[0.8, 32, 32]} />;
    }
  };

  const getMaterialColor = () => {
    if (materials.includes("Gold") || materials.includes("18K Gold")) return "#FFD700";
    if (materials.includes("Diamond")) return "#E8E8E8";
    if (materials.includes("Platinum")) return "#E5E4E2";
    if (materials.includes("Emerald")) return "#50C878";
    if (materials.includes("Pearl")) return "#F8F6F0";
    return "#C0C0C0";
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {getGeometry()}
        <meshPhysicalMaterial
          color={getMaterialColor()}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

// Cosmic particles component
function CosmicParticles() {
  const points = useRef<THREE.Points>(null);
  const particlesCount = 200;
  
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    // Gold and purple cosmic colors
    const color = new THREE.Color();
    if (Math.random() > 0.7) {
      color.setHex(0xFFD700); // Gold
    } else {
      color.setHex(0x9B59B6); // Purple
    }
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          name="position"
          args={[positions, 3]}
        />
        <bufferAttribute
          name="color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Loading component for 3D scene
function SceneLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-3 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
        <p className="text-sm">Loading 3D view...</p>
      </div>
    </Html>
  );
}

// Controls overlay component
function ControlsOverlay({ 
  onReset, 
  onToggleWireframe, 
  wireframe, 
  onClose 
}: {
  onReset: () => void;
  onToggleWireframe: () => void;
  wireframe: boolean;
  onClose?: () => void;
}) {
  return (
    <div className="absolute top-4 right-4 z-10 space-y-2">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col space-y-2"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleWireframe}
          className={`bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 ${
            wireframe ? 'bg-yellow-500/20' : ''
          }`}
        >
          {wireframe ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>

        {onClose && (
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        )}
      </motion.div>
    </div>
  );
}

// Instructions overlay
function InstructionsOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute bottom-4 left-4 right-4 z-10"
        >
          <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-lg p-4 text-white text-center">
            <p className="text-sm mb-2">🌟 3D Jewelry View</p>
            <div className="text-xs text-white/70 space-y-1">
              <p>• Drag to rotate • Scroll to zoom</p>
              <p>• Pinch to zoom on mobile</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ProductViewer3D({ 
  productName, 
  category, 
  materials, 
  onClose, 
  isVisible 
}: ProductViewer3DProps) {
  const [wireframe, setWireframe] = useState(false);
  const controlsRef = useRef<any>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-pink-900/40 backdrop-blur-lg border border-white/20"
    >
      {/* Product info overlay */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-2"
        >
          <h3 className="text-white font-medium">{productName}</h3>
          <div className="flex flex-wrap gap-1">
            {materials.slice(0, 2).map((material, i) => (
              <Badge 
                key={i} 
                variant="outline" 
                className="border-white/30 text-white/90 bg-white/10 text-xs"
              >
                {material}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <ControlsOverlay
        onReset={handleReset}
        onToggleWireframe={() => setWireframe(!wireframe)}
        wireframe={wireframe}
        onClose={onClose}
      />

      {/* Instructions */}
      <InstructionsOverlay />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<SceneLoader />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#FFD700" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#9B59B6" />
          <pointLight position={[0, 0, 10]} intensity={0.5} color="#FFFFFF" />

          {/* Environment */}
          <Environment preset="night" />
          
          {/* Starfield */}
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          
          {/* Cosmic particles */}
          <CosmicParticles />

          {/* 3D Jewelry Model */}
          <JewelryModel category={category} materials={materials} />

          {/* Floating text */}
          <Float speed={1} rotationIntensity={0.2}>
            <Text
              position={[0, -2.5, 0]}
              fontSize={0.3}
              color="#FFD700"
              anchorX="center"
              anchorY="middle"
              fontWeight={500}
            >
              {category.toUpperCase()}
            </Text>
          </Float>

          {/* Controls */}
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            maxDistance={10}
            minDistance={2}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}