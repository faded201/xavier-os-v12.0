import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Html, Box, Text } from '@react-three/drei';
import * as THREE from 'three';
import { SubscriptionTier, TIER_CONFIG } from '../types';

interface Destination {
  id: string;
  label: string;
  position: [number, number, number];
  cost: number;
  flightTimeHours: number;
  products: { name: string; price: number; requiredTier?: SubscriptionTier }[];
}

const DESTINATIONS: Destination[] = [
  { id: 'SYDNEY', label: 'SYDNEY_BASE', position: [1.8, -1.2, 1.5], cost: 0, flightTimeHours: 0, products: [] },
  { id: 'LONDON', label: 'LONDON_PRIME', position: [0.2, 1.8, 1.8], cost: 100, flightTimeHours: 22, products: [{ name: 'Savile Row Suit', price: 2500 }, { name: 'Royal Artifact', price: 50000 }] },
  { id: 'TOKYO', label: 'NEO_TOKYO', position: [-2.0, 1.0, 1.0], cost: 150, flightTimeHours: 9, products: [
      { name: 'Cybernetic Arm', price: 12000 }, 
      { name: 'Rare Mecha', price: 8500 }, 
      { name: 'Quantum Processor', price: 25000, requiredTier: 'ARCHITECT' },
      { name: 'Global Arcade License', price: 500 } // One-time fee product
  ] },
  { id: 'NY', label: 'NEW_YORK_CORE', position: [1.0, 1.5, -1.5], cost: 120, flightTimeHours: 14, products: [{ name: 'Wall St Algo', price: 15000 }, { name: 'High Fashion', price: 3000 }] },
];

const RotatingGlobe = ({ color, onSelectDest }: { color: string, onSelectDest: (d: Destination) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.001;
  });
  
  return (
    <group ref={groupRef}>
      {/* Wireframe Core */}
      <Sphere ref={meshRef} args={[2.5, 32, 32]}>
        <meshStandardMaterial 
          color={color} 
          wireframe 
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Inner Core */}
      <Sphere args={[2.3, 32, 32]}>
        <meshBasicMaterial color="black" />
      </Sphere>

      {/* Destination Markers */}
      {DESTINATIONS.map(dest => (
        <group key={dest.id} position={new THREE.Vector3(...dest.position)}>
          <mesh onClick={() => onSelectDest(dest)}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="red" emissive="red" emissiveIntensity={2} />
          </mesh>
          <Html distanceFactor={15}>
            <div 
              className="cursor-pointer bg-black/80 border border-red-500 text-red-500 px-2 py-1 text-[8px] font-mono hover:bg-red-500 hover:text-black transition-colors"
              onClick={() => onSelectDest(dest)}
            >
              {dest.label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

// 3D Shop Interior Component
const ShopInterior = ({ destination, onExit, buyItem }: { destination: Destination, onExit: () => void, buyItem: (price: number, name: string, requiredTier?: SubscriptionTier) => void }) => {
  return (
    <group>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 5, 0]} intensity={2} />
      
      {/* Shop Products */}
      {destination.products.map((prod, idx) => (
        <group key={idx} position={[(idx - 0.5) * 3, 0, 0]}>
          <Box args={[1, 1, 1]} position={[0, 0, 0]} onClick={() => buyItem(prod.price, prod.name, prod.requiredTier)}>
         <meshStandardMaterial color={idx % 2 === 0 ? "#00ff9d" : "#00f0ff"} wireframe />
          </Box>
          <Text position={[0, 1.5, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
            {prod.name}
          </Text>
          <Html position={[0, -1, 0]} center>
            <button 
              onClick={() => buyItem(prod.price, prod.name, prod.requiredTier)}
              className={`border px-3 py-1 text-xs hover:text-black ${prod.requiredTier ? 'bg-amber-500/20 border-amber-500 text-amber-500 hover:bg-amber-500' : 'bg-green-500/20 border-green-500 text-green-500 hover:bg-green-500'}`}
            >
              {prod.requiredTier ? `LOCKED: ${prod.requiredTier}` : 'BUY NOW'}
            </button>
          </Html>
        </group>
      ))}

      <Html position={[0, 3, -5]} center>
        <div className="text-center">
          <h1 className="text-4xl font-black text-white tracking-widest mb-2">XANDER HOLO WORLD</h1>
          <div className="text-xl text-cyan-500">{destination.label} BRANCH</div>
          <button onClick={onExit} className="mt-8 px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black">
            EXIT SHOP
          </button>
        </div>
      </Html>
    </group>
  );
};

const HolographicNexus: React.FC<{ unsettledAUD: number; setUnsettledAUD: React.Dispatch<React.SetStateAction<number>>; setPlatformRevenue: React.Dispatch<React.SetStateAction<number>>; tier: SubscriptionTier }> = ({ unsettledAUD, setUnsettledAUD, setPlatformRevenue, tier }) => {
  const [arMode, setArMode] = useState(false);
  const [inShop, setInShop] = useState(false);
  
  // Travel State Persistence
  const [travelState, setTravelState] = useState<{ location: string; destination: string | null; arrivalTime: number }>(() => {
    const saved = localStorage.getItem('xavier_travel_state');
    return saved ? JSON.parse(saved) : { location: 'SYDNEY', destination: null, arrivalTime: 0 };
  });

  // Save state on change
  useEffect(() => {
    localStorage.setItem('xavier_travel_state', JSON.stringify(travelState));
  }, [travelState]);

  // Timer for flight
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (travelState.destination && travelState.arrivalTime > 0) {
        const now = Date.now();
        if (now >= travelState.arrivalTime) {
          // Arrived
          setTravelState(prev => ({ ...prev, location: prev.destination!, destination: null, arrivalTime: 0 }));
        } else {
          const diff = travelState.arrivalTime - now;
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [travelState]);

  const handleTravel = (dest: Destination) => {
    if (dest.id === travelState.location) {
      // Already here, enter shop
      setInShop(true);
      return;
    }

    if (unsettledAUD < dest.cost) {
      alert(`INSUFFICIENT FUNDS. FLIGHT COST: $${dest.cost}`);
      return;
    }

    const isFastTravel = ['ARCHITECT', 'MAGISTRATE', 'INVERSION'].includes(tier);
    const flightTime = isFastTravel ? 0 : dest.flightTimeHours;
    const confirmMsg = isFastTravel 
      ? `QUANTUM JUMP TO ${dest.label}? COST: $${dest.cost} // INSTANT ARRIVAL (TIER PERK)`
      : `BOOK FLIGHT TO ${dest.label}? COST: $${dest.cost} // DURATION: ${dest.flightTimeHours} HOURS`;

    if (confirm(confirmMsg)) {
      setUnsettledAUD(prev => prev - dest.cost);
      const arrival = Date.now() + (flightTime * 60 * 60 * 1000);
      setTravelState({ location: 'TRANSIT', destination: dest.id, arrivalTime: arrival });
    }
  };

  const handleBuy = (price: number, name: string, requiredTier?: SubscriptionTier) => {
    if (requiredTier) {
      const userLevel = TIER_CONFIG[tier].level;
      const reqLevel = TIER_CONFIG[requiredTier].level;
      if (userLevel < reqLevel) {
        alert(`ACCESS DENIED. REQUIRED TIER: ${requiredTier}`);
        return;
      }
    }

    if (unsettledAUD >= price) {
      setUnsettledAUD(prev => prev - price);
      
      // Platform Fee Calculation
      const purchaseFee = price * 0.036; // 3.6% of purchase
      const shopCommission = price * 0.05; // 5% of product sold
      const totalFee = purchaseFee + shopCommission;
      setPlatformRevenue(prev => prev + totalFee);
      
      console.log(`[SYSTEM_INCOME] Transaction Fee (3.6%): $${purchaseFee.toFixed(2)}`);
      console.log(`[SYSTEM_INCOME] Shop Commission (5%): $${shopCommission.toFixed(2)}`);
      
      alert(`PURCHASE SUCCESSFUL: ${name}\n(Fees processed: $${totalFee.toFixed(2)} sent to Platform Treasury)`);
    } else {
      alert('INSUFFICIENT FUNDS');
    }
  };

  const currentDest = DESTINATIONS.find(d => d.id === travelState.location);

  return (
    <div className="h-full w-full relative">
      {/* AR / 3D Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-4">
        <button 
          onClick={() => setArMode(!arMode)}
          className={`px-4 py-2 border ${arMode ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-cyan-500 text-cyan-500 bg-black/50'} font-mono text-xs tracking-widest uppercase transition-all`}
        >
          {arMode ? 'AR: PASSTHROUGH ACTIVE' : 'AR: SIMULATION MODE'}
        </button>
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-right pointer-events-none">
        <div className="text-cyan-500 font-mono text-xs tracking-[0.3em]">GLOBAL_OVERWATCH</div>
        <div className="text-white/50 font-mono text-[10px]">LOC: {travelState.location}</div>
        {travelState.destination && (
          <div className="text-amber-500 font-mono text-lg animate-pulse mt-2">
            FLIGHT IN PROGRESS: {timeLeft}
          </div>
        )}
        {!travelState.destination && !inShop && (
          <div className="text-green-500 font-mono text-xs mt-2">
            STATUS: DOCKED
            <div className="text-[10px] opacity-70">SELECT DESTINATION ON GLOBE</div>
          </div>
        )}
      </div>

      <Canvas 
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: arMode ? 'transparent' : '#000000' }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {!arMode && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
        
        {!inShop ? (
          <RotatingGlobe color={arMode ? '#00ff00' : '#00f0ff'} onSelectDest={handleTravel} />
        ) : (
          currentDest && <ShopInterior destination={currentDest} onExit={() => setInShop(false)} buyItem={handleBuy} />
        )}

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          autoRotate={!arMode && !inShop}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default HolographicNexus;