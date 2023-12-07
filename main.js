import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const STARTY = 20

camera.position.z = 30;
var width = 28
var height = width / 30 * 28
const OSHAGeo = new THREE.PlaneGeometry( width, height );
const OSHAtexture = new THREE.TextureLoader().load('OSHAcert.png')
const OSHAmat = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: OSHAtexture} );
const OSHA = new THREE.Mesh( OSHAGeo, OSHAmat );

const ITFGeo = new THREE.PlaneGeometry( width, height );
const ITFtexture = new THREE.TextureLoader().load('ITF.png')
const ITFmat = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: ITFtexture} );
const ITF = new THREE.Mesh( ITFGeo, ITFmat );

const FBJSGeo = new THREE.PlaneGeometry( width, height );
const FBJStexture = new THREE.TextureLoader().load('FBJS.png')
const FBJSmat = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: FBJStexture} );
const FBJS = new THREE.Mesh( FBJSGeo, FBJSmat );



OSHA.rotation.y = STARTY
OSHA.position.x = -23
OSHA.scale.set(0.8, 0.75)
OSHA.position.y += 5

ITF.rotation.y = STARTY
ITF.position.x = -23
ITF.scale.set(0.8, 0.75)
ITF.position.y -= 15

FBJS.rotation.y = STARTY
FBJS.position.x = -23
FBJS.scale.set(0.8, 0.75)
FBJS.position.y -= 35



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
    if (window.innerWidth >= 600) {
        camera.position.x = -25
        FBJS.rotation.y = STARTY
        OSHA.rotation.y = STARTY
        ITF.rotation.y = STARTY
        FBJS.position.x = -48
        OSHA.position.x = -48
        ITF.position.x = -48
    }
    else {
        camera.position.x = -10
        FBJS.rotation.y = 0
        OSHA.rotation.y = 0
        ITF.rotation.y = 0
        FBJS.position.x = -10
        OSHA.position.x = -10
        ITF.position.x = -10
    }
}

window.addEventListener('resize', resizeWindow)
document.body.onscroll = moveCamera
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
resizeWindow()
animate()

