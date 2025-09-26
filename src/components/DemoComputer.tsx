import { useRef, useEffect } from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import { Mesh } from 'three'

interface DemoComputerProps {
  texture: string
}

const DemoComputer = ({ texture }: DemoComputerProps) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('./models/Computer.glb')

  const txt = useVideoTexture(
    texture ? texture : '/assets/videos/xplorviedo.mp4',
  )

  useEffect(() => {
    if (txt) {
      txt.flipY = false
    }
  }, [txt])

  return (
    <group ref={group} dispose={null}>
      <group name='Scene'>
        <mesh
          name='monitor-screen'
          geometry={nodes['monitor-screen'].geometry}
          material={nodes['monitor-screen'].material}
          position={[0.027, 1.831, 1.500]}
          rotation={[1.571, -0.005, 0.031]}
          scale={[0.661, 0.608, 0.401]}
        >
          <meshBasicMaterial map={txt} toneMapped={false} />
        </mesh>
        <group
          name='RootNode'
          position={[0, 1.093, 0]}
          rotation={[-Math.PI / 2, 0, -0.033]}
          scale={0.045}
        >
          <group
            name='Screen001'
            position={[5.658, 1.643, 0.812]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.923, 0.855, 0.855]}
          />
        </group>
        <group
          name='Monitor-B-_computer_0'
          position={[0.150, 1.132, 1.050]}
          rotation={[0, -0.033, 0]}
          scale={[0.042, 0.045, 0.045]}
        >
          <mesh
            name='Monitor-B-_computer_0_1'
            geometry={nodes['Monitor-B-_computer_0_1'].geometry}
            material={materials.computer}
          />
          <mesh
            name='Monitor-B-_computer_0_2'
            geometry={nodes['Monitor-B-_computer_0_2'].geometry}
            material={materials.base__0}
          />
          <mesh
            name='Monitor-B-_computer_0_3'
            geometry={nodes['Monitor-B-_computer_0_3'].geometry}
            material={materials.Material_36}
          />
          <mesh
            name='Monitor-B-_computer_0_4'
            geometry={nodes['Monitor-B-_computer_0_4'].geometry}
            material={materials.Material_35}
          />
          <mesh
            name='Monitor-B-_computer_0_5'
            geometry={nodes['Monitor-B-_computer_0_5'].geometry}
            material={materials.Material_34}
          />
          <mesh
            name='Monitor-B-_computer_0_6'
            geometry={nodes['Monitor-B-_computer_0_6'].geometry}
            material={materials.keys}
          />
          <mesh
            name='Monitor-B-_computer_0_7'
            geometry={nodes['Monitor-B-_computer_0_7'].geometry}
            material={materials.keys2}
          />
          <mesh
            name='Monitor-B-_computer_0_8'
            geometry={nodes['Monitor-B-_computer_0_8'].geometry}
            material={materials.Material_37}
          />
        </group>
      </group>
    </group>
  )
}

export default DemoComputer