varying vec2 vUv;
uniform float time;

void main() {
    float wave = sin(vUv.x * 10.0 + time) * 0.1;
    gl_FragColor = vec4(0.2, 0.5 + wave, 0.6, 1.0);
}
