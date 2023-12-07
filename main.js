import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const STARTY = 20

camera.position.z = 30;

const OSHAGeo = new THREE.PlaneGeometry( 30, 28 );
const OSHAtexture = new THREE.TextureLoader().load('OSHAcert.png')
const OSHAmat = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: OSHAtexture} );
const OSHA = new THREE.Mesh( OSHAGeo, OSHAmat );

const ITFGeo = new THREE.PlaneGeometry( 30, 28 );
const ITFtexture = new THREE.TextureLoader().load('ITF.png')
const ITFmat = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: ITFtexture} );
const ITF = new THREE.Mesh( ITFGeo, ITFmat );

const FBJSGeo = new THREE.PlaneGeometry( 30, 28 );
const FBJStexture = new THREE.TextureLoader().load('FBJS.png')
const FBJSmat = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: FBJStexture} );
const FBJS = new THREE.Mesh( FBJSGeo, FBJSmat );



OSHA.rotation.y = STARTY
OSHA.position.x = -15
OSHA.scale.set(0.8, 0.75)
OSHA.position.x -= 8

ITF.rotation.y = STARTY
ITF.position.x = -15
ITF.scale.set(0.8, 0.75)
ITF.position.x -= 8
ITF.position.y -= 45

FBJS.rotation.y = STARTY
FBJS.position.x = -15
FBJS.scale.set(0.8, 0.75)
FBJS.position.x -= 8

FBJS.position.y -= 75



const backgroundPic = new THREE.TextureLoader().load("background.jpg")
scene.background = backgroundPic

scene.add(OSHA, ITF, FBJS);
const renderer = new THREE.WebGLRenderer( { canvas: document.querySelector('#bg')});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const top = document.body.getBoundingClientRect().top;
camera.position.y = top * 0.05
function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = top * 0.05
}
function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (window.innerWidth <= 600) {
        camera.position.x = -25
    }
    else {camera.position.x = 0}
}

window.addEventListener('resize', resizeWindow)
document.body.onscroll = moveCamera
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()

