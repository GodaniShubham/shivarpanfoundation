import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOGO_TEXTURE_SOURCE = "/shivarpan-logo-transparent.png";

const VOID_AND_CLUSTER_14X14 = [
  131, 187, 8, 78, 50, 18, 134, 89, 155, 102, 29, 95, 184, 73,
  22, 86, 113, 171, 142, 105, 34, 166, 9, 60, 151, 128, 40, 110,
  168, 137, 45, 28, 64, 188, 82, 54, 124, 189, 80, 13, 156, 56,
  7, 61, 186, 121, 154, 6, 108, 177, 24, 100, 38, 176, 93, 123,
  83, 148, 96, 17, 88, 133, 44, 145, 69, 161, 139, 72, 30, 181,
  115, 27, 163, 47, 178, 65, 164, 14, 120, 48, 5, 127, 153, 52,
  190, 58, 126, 81, 116, 21, 106, 77, 173, 92, 191, 63, 99, 12,
  76, 144, 4, 185, 37, 149, 192, 39, 135, 23, 117, 31, 170, 132,
  35, 172, 103, 66, 129, 79, 3, 97, 57, 159, 70, 141, 53, 94,
  114, 20, 49, 158, 19, 146, 169, 122, 183, 11, 104, 180, 2, 165,
  152, 87, 182, 118, 91, 42, 67, 25, 84, 147, 43, 85, 125, 68,
  16, 136, 71, 10, 193, 112, 160, 138, 51, 111, 162, 26, 194, 46,
  174, 107, 41, 143, 33, 74, 1, 101, 195, 15, 75, 140, 109, 90,
  32, 62, 157, 98, 167, 119, 179, 59, 36, 130, 175, 55, 0, 150,
];

const SIMPLEX_NOISE = `
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x * 34.0) + 10.0) * x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
   -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));

  vec3 m = max(
    0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

const vertexShader = `
uniform float uRowSize;
uniform float uColumnSize;
uniform float uDitherProgress;
uniform float uGridOffsetStart;
uniform float uGridOffsetEnd;
uniform sampler2D uTexture;

attribute float aRow;
attribute float aColumn;
attribute float aThreshold;

varying vec3 vColor;
varying vec3 vNormal;
varying float vMask;
varying float vContentMask;

${SIMPLEX_NOISE}

void main() {
  vec2 st = vec2(aColumn, uRowSize - 1.0 - aRow) / vec2(uColumnSize - 1.0, uRowSize - 1.0);
  float bayerThreshold = aThreshold;
  float rowId = aRow / uRowSize;
  float columnId = aColumn / uColumnSize;

  vec4 textureColor = texture2D(uTexture, st);
  float initialColor = 0.0;
  float contentMask = smoothstep(0.02, 0.22, textureColor.a);
  float targetColor = dot(textureColor.rgb, vec3(0.299, 0.587, 0.114)) * contentMask;

  float cellDelayIndex = snoise(vec2(rowId, columnId) * 80.7);
  cellDelayIndex = smoothstep(-1.0, 1.0, cellDelayIndex);

  float animationDuration = 0.15;
  float animationDelay = cellDelayIndex * (1.0 - animationDuration);
  float animationEnd = animationDelay + animationDuration;
  float animationProgress = smoothstep(animationDelay, animationEnd, uDitherProgress);

  float ditheredColor = step(bayerThreshold, targetColor);
  float ditherProgress = smoothstep(0.0, 1.0, animationProgress);
  float finalColor = mix(initialColor, ditheredColor, ditherProgress);
  float revealBoost = smoothstep(0.82, 1.0, uDitherProgress);
  float finalReveal = mix(finalColor, contentMask, revealBoost);
  float cellOffset = mix(uGridOffsetStart, uGridOffsetEnd, finalReveal);

  vec4 cellLocalPosition = vec4(position, 1.0);
  vec4 cellPosition = modelMatrix * instanceMatrix * cellLocalPosition;
  cellPosition.z += cellOffset;
  vec4 modelNormal = modelMatrix * instanceMatrix * vec4(normal, 0.0);

  gl_Position = projectionMatrix * viewMatrix * cellPosition;
  vColor = textureColor.rgb;
  vNormal = normalize(modelNormal.xyz);
  vMask = finalReveal;
  vContentMask = contentMask;
}
`;

const fragmentShader = `
varying vec3 vColor;
varying vec3 vNormal;
varying float vMask;
varying float vContentMask;

void main() {
  float shadow = dot(normalize(vec3(0.0, 0.95, 1.0)), normalize(vNormal));
  float mask = smoothstep(0.0, 1.0, vMask) * vContentMask;
  float depthMix = 1.0 - smoothstep(0.9, 1.0, vMask);
  float shade = mix(1.0, 0.9 + 0.35 * shadow, depthMix);
  vec3 base = vec3(0.82, 0.82, 0.82);
  vec3 reveal = mix(base, vColor, mask);
  vec3 color = clamp(reveal * shade, vec3(0.0), vec3(1.0));
  if (mask < 0.01) discard;
  gl_FragColor = vec4(color, mask);
}
`;

const buildThresholdAttribute = (rows: number, columns: number) => {
  const data = VOID_AND_CLUSTER_14X14;
  const mapSize = Math.sqrt(data.length);
  const scale = data.length;
  const count = rows * columns;
  const threshold = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const matrixRow = row % mapSize;
    const matrixColumn = column % mapSize;
    const matrixIndex = matrixColumn + matrixRow * mapSize;
    threshold[index] = data[matrixIndex] / scale;
  }

  return new THREE.InstancedBufferAttribute(threshold, 1);
};

const createGrid = ({
  rows,
  columns,
  texture,
}: {
  rows: number;
  columns: number;
  texture: THREE.Texture;
}) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const count = rows * columns;

  const rowArray = new Float32Array(count);
  const columnArray = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    rowArray[index] = Math.floor(index / columns);
    columnArray[index] = index % columns;
  }

  geometry.setAttribute("aRow", new THREE.InstancedBufferAttribute(rowArray, 1));
  geometry.setAttribute("aColumn", new THREE.InstancedBufferAttribute(columnArray, 1));
  geometry.setAttribute("aThreshold", buildThresholdAttribute(rows, columns));

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uRowSize: { value: rows },
      uColumnSize: { value: columns },
      uGridOffsetStart: { value: 0 },
      uGridOffsetEnd: { value: 0.3 },
      uTexture: { value: texture },
      uDitherProgress: { value: 0.04 },
    },
    transparent: true,
    alphaTest: 0.01,
  });

  const mesh = new THREE.InstancedMesh(geometry, material, count);
  const objectRef = new THREE.Object3D();

  for (let index = 0; index < count; index += 1) {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const x = column - (columns - 1) / 2;
    const y = -row + (rows - 1) / 2;

    objectRef.position.set(x, y, 0);
    objectRef.scale.set(1, 1, 0.58);
    objectRef.updateMatrix();
    mesh.setMatrixAt(index, objectRef.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;

  return { mesh, material, geometry };
};

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;

    if (!canvas || !root) {
      return;
    }

    let rafId = 0;
    let disposed = false;
    let resizeHandler: (() => void) | null = null;
    let timeline: gsap.core.Timeline | null = null;
    let mesh: THREE.InstancedMesh | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let texture: THREE.Texture | null = null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.OrthographicCamera();
    camera.position.set(0, 0, 1000);
    camera.lookAt(0, 0, 0);
    camera.near = 1;
    camera.far = 2000;

    const cameraAnchor = new THREE.Group();
    cameraAnchor.add(camera);
    cameraAnchor.rotation.reorder("ZXY");
    scene.add(cameraAnchor);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const render = () => {
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(render);
    };

    const finish = () => {
      gsap
        .timeline({
          onComplete: () => {
            if (!disposed) {
              onComplete();
            }
          },
        })
        .to(canvas, {
          scale: 1.12,
          duration: 0.45,
          ease: "power2.inOut",
          transformOrigin: "50% 50%",
        })
        .to(root, {
          autoAlpha: 0,
          duration: 0.55,
          ease: "power2.out",
        }, 0.1);
    };

    const textureLoader = new THREE.TextureLoader();

    const init = async () => {
      try {
        texture = await textureLoader.loadAsync(LOGO_TEXTURE_SOURCE);

        if (disposed || !texture) {
          return;
        }

        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.premultiplyAlpha = true;
        texture.generateMipmaps = true;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        texture.needsUpdate = true;

        const textureImage = texture.image as { width?: number; height?: number } | undefined;
        const imageWidth = textureImage?.width ?? 1;
        const imageHeight = textureImage?.height ?? 1;
        const imageRatio = Math.max(0.1, imageWidth / imageHeight);

        const longestSide = window.innerWidth < 768 ? 360 : 560;
        const rows = imageRatio >= 1
          ? Math.max(52, Math.round(longestSide / imageRatio))
          : longestSide;
        const columns = imageRatio >= 1
          ? longestSide
          : Math.max(52, Math.round(longestSide * imageRatio));
        const boundingBoxSize = Math.max(rows, columns) + 56;

        const grid = createGrid({ rows, columns, texture });
        mesh = grid.mesh;
        material = grid.material;
        geometry = grid.geometry;
        scene.add(mesh);

        camera.zoom = window.innerWidth < 768 ? 60 : 72;
        camera.updateProjectionMatrix();
        cameraAnchor.position.set(Math.max(130, columns * 0.48), -6, 0);
        cameraAnchor.rotation.z = Math.PI * 0.25;
        cameraAnchor.rotation.y = -0.18;
        cameraAnchor.rotation.x = Math.PI * 0.35;

        resizeHandler = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          const pixelRatio = Math.min(window.devicePixelRatio, 2);
          const aspect = width / height;

          if (aspect < 1) {
            camera.left = -boundingBoxSize / 2;
            camera.right = boundingBoxSize / 2;
            camera.top = boundingBoxSize / 2 / aspect;
            camera.bottom = -boundingBoxSize / 2 / aspect;
          } else {
            camera.left = (-boundingBoxSize / 2) * aspect;
            camera.right = (boundingBoxSize / 2) * aspect;
            camera.top = boundingBoxSize / 2;
            camera.bottom = -boundingBoxSize / 2;
          }

          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          renderer.setPixelRatio(pixelRatio);
        };

        resizeHandler();
        window.addEventListener("resize", resizeHandler);
        render();

        timeline = gsap.timeline({
          defaults: { ease: "sine.inOut" },
          onComplete: finish,
        });

        gsap.set(canvas, { opacity: 1, scale: 1 });

        timeline
          .to(material.uniforms.uDitherProgress, {
            value: 1,
            duration: 1.9,
            ease: "linear",
          }, 0)
          .to(material.uniforms.uGridOffsetEnd, {
            value: 0.08,
            duration: 1.9,
            ease: "power2.out",
          }, 0)
          .to(cameraAnchor.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2.2,
          }, 0)
          .to(camera, {
            zoom: 0.9,
            duration: 2.2,
            onUpdate: () => camera.updateProjectionMatrix(),
          }, 0)
          .to(cameraAnchor.position, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "inOutCubic",
          }, 0.9);
      } catch {
        onComplete();
      }
    };

    void init();

    return () => {
      disposed = true;
      timeline?.kill();
      window.cancelAnimationFrame(rafId);
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
      if (mesh) {
        scene.remove(mesh);
      }
      geometry?.dispose();
      material?.dispose();
      texture?.dispose();
      renderer.dispose();
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  return (
    <div ref={rootRef} className="app-loader" aria-label="Loading screen">
      <canvas ref={canvasRef} className="webgl" />
    </div>
  );
};

export default LoadingScreen;
