import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Plane } from '@react-three/drei';
import * as THREE from 'three';

// Shader untuk efek distorsi liquid
const liquidShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uDistortionStrength: { value: 0.1 }, // Kekuatan distorsi
    uColor: { value: new THREE.Color(0xffffff) }, // Warna liquid
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uDistortionStrength;
    uniform vec3 uColor;

    varying vec2 vUv;

    // Simplex noise (dari glsl-noise, kita masukkan langsung di sini untuk kemudahan)
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439 );
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -  i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1.xy;
      x12.zw -= 1.0 - i1.xy;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      vec2 mouse = uMouse; // Mouse position

      // Distorsi berdasarkan noise dan waktu
      vec2 noiseCoord = uv * 4.0 + uTime * 0.1;
      float noise = snoise(noiseCoord);

      vec2 distortedUv = uv + vec2(noise * uDistortionStrength);
      
      // Distorsi responsif terhadap mouse
      float distToMouse = distance(uv, mouse);
      float mouseEffect = (1.0 - distToMouse) * 0.5; // Pengaruh mouse paling kuat di dekat mouse

      distortedUv += vec2(snoise(uv * 10.0 + uTime * 0.5) * uDistortionStrength * mouseEffect);

      vec4 color = texture2D(tDiffuse, distortedUv);
      gl_FragColor = color;
    }
  `,
};

function LiquidMesh({ position = [0, 0, 0], scale = [1, 1, 1], children, distortionStrength = 0.1, liquidColor = '#ffffff' }) {
  const meshRef = useRef();
  const uniforms = useRef({
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uDistortionStrength: { value: distortionStrength },
    uColor: { value: new THREE.Color(liquidColor) },
  });

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.current.uTime.value = state.clock.getElapsedTime();
      // Update mouse position normalized (0-1)
      uniforms.current.uMouse.value.x = (state.pointer.x + 1) / 2;
      uniforms.current.uMouse.value.y = 1 - (state.pointer.y + 1) / 2;
    }
  });

  // Render children sebagai tekstur untuk distorsi
  const target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1]} /> {/* Ukuran plane akan disesuaikan secara dinamis */}
        <shaderMaterial attach="material" args={[liquidShader]} uniforms={uniforms.current} />
      </mesh>
      {/* Kita akan 'memproyeksikan' children ke plane ini */}
      {/* Untuk implementasi ini, kita perlu membuat children menjadi renderable ke texture */}
      {/* Contoh: Render text atau elemen DOM ke texture, atau membuat objek 3D dari children */}
      {/* Karena Anda ingin efek pada TEXT dan BORDER/BACKGROUND, ini akan memerlukan pendekatan yang berbeda. */}
      {/* Untuk teks, kita bisa pakai Text dari Drei, untuk border/background kita bisa pakai Canvas DOM */}
    </group>
  );
}

// Untuk efek teks, kita bisa menggunakan Text dari Drei
// Untuk efek background/border, kita perlu pendekatan yang berbeda:
// 1. Menggambar elemen DOM ke sebuah Canvas 2D
// 2. Menggunakan Canvas 2D itu sebagai texture di Three.js

// **Implementasi yang lebih praktis untuk efek liquid pada DOM elements:**
// Kita akan membuat komponen React yang mengelola canvas di latar belakang,
// dan menerapkan efek distorsi pada element HTML (teks, border) menggunakan CSS filter atau SVG filter
// yang diupdate via JS, bukan langsung Three.js di setiap elemen.
// Ini akan lebih efisien dan mudah diintegrasikan.

// JADI, kita tidak akan pakai LiquidMesh di atas langsung,
// melainkan akan menggunakan satu Canvas Three.js sebagai BACKGROUND global,
// dan menerapkan efek pada teks/border DOM dengan CSS/SVG filter yang dikontrol JS
// agar lebih mudah di-manage untuk banyak elemen.

// Mari kita ubah pendekatan untuk Liquid Effect yang Anda inginkan:
// Kita akan punya satu Canvas Three.js di background untuk efek liquid global.
// Untuk efek di teks/border, kita akan pakai styling dan sedikit JS untuk animate.
export function LiquidBackground({ children }) {
  return (
    <Canvas
      dpr={[1, 2]}
      linear
      flat
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 1], fov: 75 }}
      style={{ position: 'fixed', inset: 0, zIndex: -1 }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />
      <LiquidPlane />
      {children} {/* Children akan dirender di atas canvas ini */}
    </Canvas>
  );
}

function LiquidPlane() {
  const meshRef = useRef();
  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uDistortionStrength: { value: 0.15 }, // Kekuatan distorsi global
    uColor1: { value: new THREE.Color(0x1a1a1a) }, // Warna gelap
    uColor2: { value: new THREE.Color(0x3a3a3a) }, // Warna sedikit terang
  });

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.current.uTime.value = state.clock.getElapsedTime();
      uniforms.current.uMouse.value.x = (state.pointer.x + 1) / 2;
      uniforms.current.uMouse.value.y = 1 - (state.pointer.y + 1) / 2;
    }
  });

  const backgroundShader = {
    uniforms: uniforms.current,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uDistortionStrength;
      uniform vec3 uColor1;
      uniform vec3 uColor2;

      varying vec2 vUv;

      // Simplex noise (sama seperti sebelumnya)
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439 );
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -  i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1.xy;
        x12.zw -= 1.0 - i1.xy;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        vec2 mouse = uMouse;

        // Animate noise
        vec2 noiseCoord = uv * 4.0 + uTime * 0.05;
        float noise = snoise(noiseCoord);

        vec2 distortedUv = uv + vec2(noise * uDistortionStrength);
        
        // Add mouse influence
        float distToMouse = distance(uv, mouse);
        float mouseEffect = (1.0 - distToMouse) * 0.8; 
        distortedUv += vec2(snoise(uv * 10.0 - uTime * 0.1) * uDistortionStrength * mouseEffect * 0.5);

        vec3 color = mix(uColor1, uColor2, sin(distortedUv.x + uTime * 0.2) * 0.5 + 0.5);
        color = mix(color, uColor1, snoise(uv * 5.0 - uTime * 0.03) * 0.3 + 0.3); // Add more noise detail

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  };

  return (
    <mesh ref={meshRef} scale={[window.innerWidth / window.innerHeight, 1, 1]}> {/* Adjust plane aspect */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial attach="material" args={[backgroundShader]} uniforms={uniforms.current} />
    </mesh>
  );
}
