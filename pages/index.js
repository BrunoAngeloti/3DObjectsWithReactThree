import React, { useRef, Suspense } from 'react'
import styles from '../styles/Home.module.css'

import * as THREE from "three";
import { DDSLoader } from "three-stdlib";

import { Canvas, useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls, Environment } from "@react-three/drei";

import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

function Box(){
  return (
    <mesh>
      <boxBufferGeometry attach='geometry'/>
      <meshLambertMaterial attach='material' color="hotpink"/>
    </mesh>
  )
}

function Teste(){
  const materials = useLoader(MTLLoader, "pocadores.mtl");
  const obj = useLoader(OBJLoader, '/pocadores.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={obj} scale={0.4}/>
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Canvas>
      <Suspense fallback={null}>
        <OrbitControls />
        <Environment preset="sunset" background />
        <ambientLight intensity={0.9} />
        <spotLight position={[10, 15, 10]} angle={0.5} />
        <Teste />
        </Suspense>
      </Canvas>
    </div>
  )
}