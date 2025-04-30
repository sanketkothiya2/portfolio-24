// Three.js Background Animation

// Initialize Three.js scene
function initThreeBackground() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded');
        return;
    }

    // Get container
    const container = document.getElementById('three-background');
    if (!container) return;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create geometry for particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;

    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);

    // Fill arrays with random values
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 100;
        posArray[i + 1] = (Math.random() - 0.5) * 100;
        posArray[i + 2] = (Math.random() - 0.5) * 100;

        // Scale
        scaleArray[i / 3] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

    // Create material for particles
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        color: 0x6e00ff,
        blending: THREE.AdditiveBlending,
    });

    // Create points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Smooth mouse movement
        targetX = mouseX * 0.1;
        targetY = mouseY * 0.1;

        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;

        // Move particles based on mouse position
        particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.05;

        // Render scene
        renderer.render(scene, camera);
    }

    // Start animation
    animate();
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load Three.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = initThreeBackground;
    document.head.appendChild(script);
});
