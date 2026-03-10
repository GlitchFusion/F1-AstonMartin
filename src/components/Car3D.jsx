import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

// Load the actual F1 Car Model
const RealF1Car = ({ setActivePart }) => {
  // Use the local asset path
  const { scene } = useGLTF('/src/assets/3dModels/aston_martin_f1_amr23_2023.glb');

  // We can traverse the loaded scene to add hover events to specific meshes if desired.
  // For a generic loaded model, it's safer to just render the primitive unless we know the 
  // exact node names inside the .glb file. Here we just render the raw model.
  return (
    <group 
      position={[0, -0.2, 0]} 
      scale={1.5} // Adjust scale as needed based on the model's native size
      onPointerOver={(e) => {
        // Stop propagation so we only get the first hit
        e.stopPropagation();
        // Optional: If the model has named nodes (e.g., "Front_Wing"), we could use e.object.name
        setActivePart('AMR24');
      }}
      onPointerOut={() => setActivePart(null)}
    >
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/src/assets/3dModels/aston_martin_f1_amr23_2023.glb');

const Car3D = () => {
  const [activePart, setActivePart] = useState(null);

  return (
    <section id="car3d" className="relative h-screen bg-[#050505] overflow-hidden flex flex-col justify-center">
      {/* UI Overlay */}
      <div className="absolute top-24 left-6 lg:left-12 z-10 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-orbitron font-bold text-am-neon uppercase tracking-wide mb-2"
        >
          Explore AMR24
        </motion.h2>
        <p className="text-gray-400 font-montserrat uppercase tracking-widest text-sm md:text-base">
          Interactive 3D Visualizer
        </p>
      </div>

      {/* Info Panel on Hover */}
      <div className="absolute top-24 right-6 lg:right-12 z-10 w-64 pointer-events-none">
        <AnimatePresence>
          {activePart && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-am-dark/80 backdrop-blur-sm border border-am-neon/50 p-6 rounded-lg shadow-[0_0_15px_rgba(0,255,179,0.2)]"
            >
              <h3 className="text-xl font-orbitron font-bold text-am-white mb-2">{activePart}</h3>
              <div className="w-12 h-1 bg-am-green mb-3" />
              <p className="text-sm font-montserrat text-gray-300">
                {activePart === 'AMR24' && 'Explore the aerodynamics and structural excellence of the AMR telemetry-driven design.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [4, 2, 5], fov: 45 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
              <RealF1Car setActivePart={setActivePart} />
            </Float>
            <ContactShadows position={[0, -0.6, 0]} opacity={0.6} scale={10} blur={2.5} far={4} resolution={256} />
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              minDistance={3}
              maxDistance={10}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-12 w-full text-center pointer-events-none text-gray-500 font-montserrat text-sm uppercase tracking-widest animate-pulse">
        Drag to rotate • Scroll to zoom • Hover parts
      </div>
    </section>
  );
};

export default Car3D;
