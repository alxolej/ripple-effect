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
        fragmentShader: document.getElementById('fragmentShader').textContent
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
    renderer.render(scene, camera);
}
