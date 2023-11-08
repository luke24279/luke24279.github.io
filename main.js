import { render } from 'ejs';
import * as THREE from './three.module.js';
import './style.css';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer(
  { canvas: document.querySelector('#bg') }
);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 100

//Light
const pointLight = new THREE.PointLight(0xffffff, 1000);
pointLight.position.set(0, 0, 50)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(pointLight)
scene.add(ambientLight)


//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
const axesHelper = new THREE.AxesHelper(20, 20, 20)
// scene.add(lightHelper, gridHelper, axesHelper)

//Pog
const geoPog = new THREE.CylinderGeometry(41.37, 41.37, 6, 36);
const texturePog = new THREE.TextureLoader().load("luke.png")
const matPog = new THREE.MeshStandardMaterial(
  {
    color: 0x00ff00,
    wireframe: false,
    map: texturePog
  }
);
const pog = new THREE.Mesh(geoPog, matPog)
scene.add(pog)

//Stars
function addStar() {
  const geoStar = new THREE.SphereGeometry(Math.round(Math.random() * 2) + 0.5, 24, 24);
  const textureStar = new THREE.TextureLoader().load("luke.png")
  const matStar = new THREE.MeshBasicMaterial({ color: 0xffff00, map: textureStar});
  const star = new THREE.Mesh(geoStar, matStar)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000))
  star.position.set(x, y, z);
  scene.add(star)
}
const backgroundPic = new THREE.TextureLoader().load("fuke.jpg")
scene.background = backgroundPic


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.01;

  pog.rotation.x += 0.05
  pog.rotation.y += 0.075
  pog.rotation.z += 0.05
}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera)
  controls.update()
}
Array(500).fill().forEach(addStar)
animate()