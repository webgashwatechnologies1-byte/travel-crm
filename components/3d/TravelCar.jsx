'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function TravelCar() {
  const containerRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(5, 3, 8)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xEC792E, 0.5)
    pointLight.position.set(-3, 2, 3)
    scene.add(pointLight)

    // Create Car Group
    const carGroup = new THREE.Group()

    // Car Body
    const bodyGeometry = new THREE.BoxGeometry(2.5, 0.8, 1.2)
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0xEC792E,
      shininess: 100,
      emissive: 0xEC792E,
      emissiveIntensity: 0.1
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.5
    body.castShadow = true
    carGroup.add(body)

    // Car Roof/Cabin
    const cabinGeometry = new THREE.BoxGeometry(1.5, 0.6, 1.1)
    const cabinMaterial = new THREE.MeshPhongMaterial({
      color: 0xff9f5a,
      shininess: 80
    })
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial)
    cabin.position.set(-0.2, 1.1, 0)
    cabin.castShadow = true
    carGroup.add(cabin)

    // Windows
    const windowGeometry = new THREE.PlaneGeometry(0.6, 0.4)
    const windowMaterial = new THREE.MeshPhongMaterial({
      color: 0x87ceeb,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    })
    
    const windowLeft = new THREE.Mesh(windowGeometry, windowMaterial)
    windowLeft.position.set(-0.2, 1.1, 0.56)
    windowLeft.rotation.y = 0
    carGroup.add(windowLeft)

    const windowRight = new THREE.Mesh(windowGeometry, windowMaterial)
    windowRight.position.set(-0.2, 1.1, -0.56)
    windowRight.rotation.y = Math.PI
    carGroup.add(windowRight)

    // Front windshield
    const windshieldGeometry = new THREE.PlaneGeometry(0.5, 0.5)
    const windshield = new THREE.Mesh(windowGeometry, windowMaterial)
    windshield.position.set(0.55, 1.1, 0)
    windshield.rotation.y = Math.PI / 2
    carGroup.add(windshield)

    // Create Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16)
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
    
    const wheels = []
    const wheelPositions = [
      { x: 0.8, y: 0.3, z: 0.7 },
      { x: 0.8, y: 0.3, z: -0.7 },
      { x: -0.8, y: 0.3, z: 0.7 },
      { x: -0.8, y: 0.3, z: -0.7 }
    ]

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(pos.x, pos.y, pos.z)
      wheel.castShadow = true
      wheels.push(wheel)
      carGroup.add(wheel)
    })

    // Create People (simplified figures)
    const createPerson = (x, z, color) => {
      const personGroup = new THREE.Group()
      
      // Head
      const headGeometry = new THREE.SphereGeometry(0.15, 16, 16)
      const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac })
      const head = new THREE.Mesh(headGeometry, headMaterial)
      head.position.set(x, 1.3, z)
      personGroup.add(head)
      
      // Body
      const bodyGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.3, 8)
      const bodyMaterial = new THREE.MeshPhongMaterial({ color: color })
      const personBody = new THREE.Mesh(bodyGeometry, bodyMaterial)
      personBody.position.set(x, 0.95, z)
      personGroup.add(personBody)
      
      // Arms (waving)
      const armGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.25, 8)
      const armMaterial = new THREE.MeshPhongMaterial({ color: color })
      
      const leftArm = new THREE.Mesh(armGeometry, armMaterial)
      leftArm.position.set(x - 0.15, 1.0, z)
      leftArm.rotation.z = Math.PI / 4
      personGroup.add(leftArm)
      
      const rightArm = new THREE.Mesh(armGeometry, armMaterial)
      rightArm.position.set(x + 0.15, 1.0, z)
      rightArm.rotation.z = -Math.PI / 4
      personGroup.add(rightArm)
      
      return { group: personGroup, leftArm, rightArm }
    }

    // Add people in the car
    const driver = createPerson(0.3, 0.3, 0x4169e1)
    const passenger1 = createPerson(0.3, -0.3, 0xff69b4)
    const passenger2 = createPerson(-0.5, 0.3, 0x32cd32)
    const passenger3 = createPerson(-0.5, -0.3, 0xffd700)
    
    carGroup.add(driver.group)
    carGroup.add(passenger1.group)
    carGroup.add(passenger2.group)
    carGroup.add(passenger3.group)
    
    const people = [driver, passenger1, passenger2, passenger3]

    // Add luggage on top
    const luggageGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.6)
    const luggageMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })
    const luggage = new THREE.Mesh(luggageGeometry, luggageMaterial)
    luggage.position.set(-0.2, 1.6, 0)
    luggage.castShadow = true
    carGroup.add(luggage)

    // Add headlights
    const headlightGeometry = new THREE.SphereGeometry(0.1, 8, 8)
    const headlightMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffff00,
      emissive: 0xffff00
    })
    const headlightLeft = new THREE.Mesh(headlightGeometry, headlightMaterial)
    headlightLeft.position.set(1.3, 0.5, 0.4)
    carGroup.add(headlightLeft)
    
    const headlightRight = new THREE.Mesh(headlightGeometry, headlightMaterial)
    headlightRight.position.set(1.3, 0.5, -0.4)
    carGroup.add(headlightRight)

    // Add exhaust smoke particles
    const smokeParticles = []
    const smokeGeometry = new THREE.SphereGeometry(0.1, 8, 8)
    const smokeMaterial = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0.3
    })
    
    for (let i = 0; i < 5; i++) {
      const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial)
      smoke.position.set(-1.3, 0.3, 0)
      smoke.visible = false
      smokeParticles.push(smoke)
      carGroup.add(smoke)
    }

    scene.add(carGroup)

    // Create road/ground
    const groundGeometry = new THREE.PlaneGeometry(20, 10)
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x808080,
      side: THREE.DoubleSide
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.1
    ground.receiveShadow = true
    scene.add(ground)

    // Road lines
    const lineGeometry = new THREE.PlaneGeometry(0.2, 1)
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    for (let i = -5; i < 10; i += 2) {
      const line = new THREE.Mesh(lineGeometry, lineMaterial)
      line.rotation.x = -Math.PI / 2
      line.position.set(i, 0, 0)
      scene.add(line)
    }

    // Add clouds
    const clouds = []
    const cloudGeometry = new THREE.SphereGeometry(0.5, 8, 8)
    const cloudMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.7
    })
    
    for (let i = 0; i < 5; i++) {
      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial)
      cloud.position.set(
        Math.random() * 10 - 5,
        3 + Math.random() * 2,
        Math.random() * 10 - 5
      )
      cloud.scale.set(1 + Math.random(), 0.5, 1 + Math.random())
      clouds.push(cloud)
      scene.add(cloud)
    }

    // Add sun
    const sunGeometry = new THREE.SphereGeometry(0.8, 16, 16)
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffd700,
      emissive: 0xffd700
    })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    sun.position.set(-8, 6, -8)
    scene.add(sun)

    // Animation
    let time = 0
    let smokeIndex = 0
    const animate = () => {
      time += 0.01
      
      // Rotate entire car group for better view
      carGroup.rotation.y = Math.sin(time * 0.5) * 0.3
      
      // Floating effect
      carGroup.position.y = Math.sin(time * 2) * 0.1
      
      // Rotate wheels
      wheels.forEach(wheel => {
        wheel.rotation.x += 0.1
      })
      
      // Wave arms
      people.forEach((person, i) => {
        const waveSpeed = time * 3 + i
        person.leftArm.rotation.z = Math.PI / 4 + Math.sin(waveSpeed) * 0.3
        person.rightArm.rotation.z = -Math.PI / 4 - Math.sin(waveSpeed) * 0.3
        
        // Bob heads
        person.group.children[0].position.y = 1.3 + Math.sin(time * 2 + i) * 0.05
      })
      
      // Animate smoke
      if (Math.floor(time * 10) % 3 === 0) {
        const smoke = smokeParticles[smokeIndex % smokeParticles.length]
        smoke.visible = true
        smoke.position.set(-1.3, 0.3, 0)
        smoke.scale.set(1, 1, 1)
        smokeIndex++
      }
      
      smokeParticles.forEach((smoke, i) => {
        if (smoke.visible) {
          smoke.position.x -= 0.05
          smoke.position.y += 0.02
          smoke.scale.multiplyScalar(0.98)
          if (smoke.scale.x < 0.1) {
            smoke.visible = false
          }
        }
      })
      
      // Move clouds
      clouds.forEach(cloud => {
        cloud.position.x += 0.01
        if (cloud.position.x > 10) cloud.position.x = -10
      })
      
      // Pulse headlights
      const lightIntensity = 0.8 + Math.sin(time * 5) * 0.2
      headlightLeft.material.emissiveIntensity = lightIntensity
      headlightRight.material.emissiveIntensity = lightIntensity
      
      // Rotate camera slightly
      camera.position.x = 5 + Math.sin(time * 0.3) * 2
      camera.position.y = 3 + Math.sin(time * 0.5) * 0.5
      camera.lookAt(0, 0, 0)
      
      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
