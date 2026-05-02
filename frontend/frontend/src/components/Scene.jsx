import { Canvas, useThree } from "@react-three/fiber"
import { useRef, useEffect, Suspense, useMemo } from "react"
import { useGLTF, Float, Environment, ContactShadows, Preload, useProgress, Html, Stars, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { createProductStory } from "../animations/gsap"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-48 h-[1px] bg-white/5 overflow-hidden">
          <div 
            className="h-full bg-white/40 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 mt-6 font-light">
          Initialising ShopVerse {Math.round(progress)}%
        </span>
      </div>
    </Html>
  )
}

function ProductModel({ url, position, rotation, scale = 1, name }) {
  const { scene } = useGLTF(url)

  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material = new THREE.MeshStandardMaterial({
          color: child.material.color,
          metalness: 0.8,
          roughness: 0.2,
          envMapIntensity: 1,
        })
      }
    })
  }, [scene])

  return (
    <group name={name}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <primitive 
          object={scene} 
          position={position} 
          rotation={rotation} 
          scale={scale} 
        />
      </Float>
    </group>
  )
}

function Grid() {
  return (
    <gridHelper 
      args={[100, 50, 0xffffff, 0x111111]} 
      position={[0, -2, 0]} 
      rotation={[0, 0, 0]}
      opacity={0.05}
      transparent
    />
  )
}

function CameraRig({ cameraRef }) {
  const { camera } = useThree()
  useEffect(() => {
    cameraRef.current = camera
    if (cameraRef.current) {
      createProductStory(cameraRef.current)
    }
  }, [camera])
  return null
}

export default function Scene() {
  const cameraRef = useRef()

  return (
    <div className="w-full h-full bg-[#050505]">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          toneMapping: THREE.ReinhardToneMapping
        }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 40]} />
        
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={5} color="#4444ff" />
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={200} scale={[20, 20, 20]} size={2} speed={0.5} opacity={0.1} />
          <Grid />
          <group name="models-group">
            <ProductModel name="headset" url="/models/Headset.glb" position={[0, 0, 0]} scale={2} />
            <ProductModel name="watch" url="/models/watch.glb" position={[8, 2, -10]} scale={1.8} />
            <ProductModel name="shoe" url="/models/shoe.glb" position={[-8, -2, -20]} rotation={[0, Math.PI / 3, 0]} scale={3} />
            <ProductModel name="phone" url="/models/Phone.glb" position={[0, 0, -35]} rotation={[0, -Math.PI / 4, 0]} scale={1.5} />
          </group>

          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={40} blur={2} far={4.5} color="#000000" />
          
          <CameraRig cameraRef={cameraRef} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
