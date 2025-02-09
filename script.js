let scene, camera, renderer, plane, material;
init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.PlaneGeometry(5, 5, 64, 64);
    
    // Embed shader directly instead of using shader.glsl
    let fragmentShaderCode = `
        varying vec2 vUv;
        uniform float time;

        void main() {
            float wave = sin(vUv.x * 10.0 + time) * 0.1;
            gl_FragColor = vec4(0.2, 0.5 + wave, 0.6, 1.0);
        }
    `;

    material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 1.0 },
            resolution: { value: new THREE.Vector2() }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
        `,
        fragmentShader: fragmentShaderCode // Use embedded shader code instead of shader.glsl
    });

    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    camera.position.z = 3;

    window.addEventListener('mousemove', function (e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        material.uniforms.time.value = x * y * 10;
    });
}

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += 0.05;
    renderer.render(scene, camera);
}
