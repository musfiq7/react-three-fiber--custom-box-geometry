import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import './App.css';

const positions = new Float32Array([
  // Front face
  -1, 1, 1,
  -1, -1, 1,
  1, -1, 1,
  1, 1, 1,
  // Back face
  -1, 1, -1,
  -1, -1, -1,
  1, -1, -1,
  1, 1, -1,
])

const normals = new Float32Array([
  // Front face
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  // Back face
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
])

const colors = new Float32Array([
  // Front face
  0, 1, 1, 1,
  1, 0, 1, 1,
  1, 1, 0, 1,
  1, 1, 1, 1,
  // Back face
  0, 1, 1, 1,
  1, 0, 1, 1,
  1, 1, 0, 1,
  1, 1, 1, 1,
])

const indices = new Uint16Array([
  // Front face
  0, 1, 2,
  0, 2, 3,
  // Back face
  4, 5, 6,
  4, 6, 7,
  // Top face
  0, 3, 7,
  0, 7, 4,
  // Bottom face
  1, 2, 6,
  1, 6, 5,
  // Left face
  0, 1, 5,
  0, 5, 4,
  // Right face
  2, 3, 7,
  2, 7, 6,
])

const CustomGeometryParticles = () => {
  const ref = useRef();

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach='attributes-color'
          array={colors}
          count={colors.length / 4}
          itemSize={4} // 4 components for RGBA
        />
        <bufferAttribute
          attach='attributes-normal'
          array={normals}
          count={normals.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
      />
      {/* <shaderMaterial
       vertexColors
       side={THREE.DoubleSide}
      /> */}
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 55 }}>
      <ambientLight intensity={0.5} />
      <CustomGeometryParticles />
      <OrbitControls autoRotate/>
    </Canvas>
  );
};

export default Scene;  


// import { OrbitControls } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { useRef } from "react";
// import * as THREE from "three";
// import { shaderMaterial } from "@react-three/drei";

// import './App.css';

// const positions = new Float32Array([
//   // Front face
//   -1, 1, 1,
//   -1, -1, 1,
//   1, -1, 1,
//   1, 1, 1,
//   // Back face
//   -1, 1, -1,
//   -1, -1, -1,
//   1, -1, -1,
//   1, 1, -1,
// ])

// const normals = new Float32Array([
//   // Front face
//   0, 0, 1,
//   0, 0, 1,
//   0, 0, 1,
//   0, 0, 1,
//   // Back face
//   0, 0, -1,
//   0, 0, -1,
//   0, 0, -1,
//   0, 0, -1,
// ])

// const colors = new Float32Array([
//   // Front face
//   0, 1, 1, 1,
//   1, 0, 1, 1,
//   1, 1, 0, 1,
//   1, 1, 1, 1,
//   // Back face
//   0, 1, 1, 1,
//   1, 0, 1, 1,
//   1, 1, 0, 1,
//   1, 1, 1, 1,
// ])

// const indices = new Uint16Array([
//   // Front face
//   0, 1, 2,
//   0, 2, 3,
//   // Back face
//   4, 5, 6,
//   4, 6, 7,
//   // Top face
//   0, 3, 7,
//   0, 7, 4,
//   // Bottom face
//   1, 2, 6,
//   1, 6, 5,
//   // Left face
//   0, 1, 5,
//   0, 5, 4,
//   // Right face
//   2, 3, 7,
//   2, 7, 6,
// ])

// const ShaderParticlesMaterial = shaderMaterial(
//   {
//     uniforms: {},
//     vertexShader: `
//       attribute vec3 position;
//       attribute vec4 color;
//       varying vec4 vColor;

//       void main() {
        
//         vColor = color;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }
//     `,
//     fragmentShader: `
//       varying vec4 vColor;

//       void main() {
//         gl_FragColor = vColor;
//       }
//     `,
//   }
// );

// const CustomGeometryParticles = () => {
//   const ref = useRef();

//   return (
//     <mesh material={ShaderParticlesMaterial}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach='attributes-position'
//           array={positions}
//           count={positions.length / 3}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach='attributes-color'
//           array={colors}
//           count={colors.length / 4}
//           itemSize={4} // 4 components for RGBA
//         />
//         <bufferAttribute
//           attach='attributes-normal'
//           array={normals}
//           count={normals.length / 3}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="index"
//           array={indices}
//           count={indices.length}
//           itemSize={1}
//         />
//       </bufferGeometry>
//     </mesh>
//   );
// };

// const Scene = () => {
//   return (
//     <Canvas camera={{ position: [0, 2, 5], fov: 55 }}>
//       <ambientLight intensity={0.5} />
//       <CustomGeometryParticles />
//       <OrbitControls autoRotate />
//     </Canvas>
//   );
// };

// export default Scene;

