import { MeshTransmissionMaterial, Text, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Knight = () => {
  const knight = useRef();

  const { nodes } = useGLTF('/knight.glb');
  const { viewport } = useThree();

  useFrame((gl, delta) => {
    knight.current.rotation.y -= delta * 0.8;
  });

  const materialProps = useControls(
    'Knight',
    {
      chromaticAberration: {
        value: 0.53,
        min: 0,
        max: 1,
        step: 0.001,
        pad: 2,
      },
      transmission: {
        value: 1,
        min: 0,
        max: 1,
        step: 0.001,
        pad: 2,
      },
      thickness: {
        value: 0.45,
        min: 0,
        max: 3,
        step: 0.001,
        pad: 2,
      },
      roughness: {
        value: 0.16,
        min: 0,
        max: 1,
        step: 0.001,
        pad: 2,
      },
      ior: {
        value: 0.88,
        min: 0,
        max: 3,
        step: 0.001,
        pad: 2,
      },
      anisotropicBlur: {
        value: 0.1,
        min: 0,
        max: 10,
        step: 0.001,
        pad: 2,
      },
      distortion: {
        value: 0.64,
        min: 0,
        max: 1,
        step: 0.001,
        pad: 2,
      },
      distortionScale: {
        value: 0.5,
        min: 0,
        max: 10,
        step: 0.001,
        pad: 2,
      },
      temporalDistortion: {
        value: 0.26,
        min: 0,
        max: 3,
        step: 0.001,
        pad: 2,
      },
      backside: { value: false },
    },
    { collapsed: true, order: 1 }
  );

  useEffect(() => {
    if (knight.current) {
      knight.current.material.side = materialProps.backside
        ? THREE.DoubleSide
        : THREE.FrontSide;
      knight.current.material.needsUpdate = true;
    }
  }, [materialProps.backside]);

  return (
    <>
      <group scale={viewport.width / 2} position={[0, -0.2, 0]}>
        <Text
          font="fonts/WTSkrappa.ttf"
          fontSize={0.6}
          position={[0, 0, -0.4]}
          color={'#e2e8f0'}
          anchorX="center"
          anchorY="middle"
        >
          KNIGHTHOOD
        </Text>
        <mesh
          ref={knight}
          castShadow
          receiveShadow
          geometry={nodes.Knight.geometry}
          material={nodes.Knight.material}
          scale={0.17}
        >
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      </group>
    </>
  );
};

export default Knight;

useGLTF.preload('/knight.glb');
