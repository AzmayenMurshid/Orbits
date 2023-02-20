import './style.css';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';
import { Loader } from 'three';

const scene =  new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 0.0000001, 1000000);
const renderer = new THREE.WebGLRenderer({ antialias: false, alpha:true }); // Canvas HTML component that runs WebGL
//Framework that is required to render Threejs on the web.
//rendering 3D objects

renderer.setClearColor(0xffffff, 0);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const loader = new THREE.TextureLoader();

camera.position.y = 1400; // camera positioning
camera.position.z = 3600;

const sunGeometry = new THREE.SphereGeometry(500, 128, 32, 2 )
const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xF8E71C, 
  wireframe: true,
  //map: loader.load("https://tse4.mm.bing.net/th?id=OIP.VRLz5WpaqhK6qG70VHnA1QHaHa&pid=Api&P=0"),
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

const mercuryGeometry = new THREE.SphereGeometry( 20, 16, 16 )
const mercuryMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

const venusGeometry = new THREE.SphereGeometry( 30, 32, 16 )
const venusMaterial = new THREE.MeshBasicMaterial({color: 0xA45F07, wireframe: true})
const venus = new THREE.Mesh(venusGeometry, venusMaterial);

const earthGeometry = new THREE.SphereGeometry( 40, 32, 16 )
const earthMaterial = new THREE.MeshBasicMaterial({
  color: 0x1CAEF8,
  wireframe: true,
  //map: loader.load("https://static.turbosquid.com/Preview/001233/310/D1/3D-model-globe-earth_Z.jpg"),
})
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

const moonGeometry = new THREE.SphereGeometry( 10, 32, 16 )
const moonMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

const marsGeometry = new THREE.SphereGeometry( 20, 32, 16 )
const marsMaterial = new THREE.MeshBasicMaterial({color: 0xCB7D10, wireframe: true})
const mars = new THREE.Mesh(marsGeometry, marsMaterial);

const jupiterGeometry = new THREE.SphereGeometry( 100, 32, 16 )
const jupiterMaterial = new THREE.MeshBasicMaterial({color: 0x64471F, wireframe: true})
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);

const saturnGeometry = new THREE.SphereGeometry(90, 32, 16)
const saturnMaterial = new THREE.MeshBasicMaterial({color: 0xBA8F52, wireframe: true})
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);

const saturnRingGeometry = new THREE.RingGeometry( 200, 130, 110 );
const saturnRingMaterial = new THREE.MeshBasicMaterial( { color: 0x847D69, side: THREE.DoubleSide, wireframe: true } );
const saturnRingMesh = new THREE.Mesh( saturnRingGeometry, saturnRingMaterial );

saturnRingMesh.rotation.x += 1.0

const uranusGeometry = new THREE.SphereGeometry(80, 32, 16)
const uranusMaterial = new THREE.MeshBasicMaterial({color: 0x165674, wireframe: true})
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);

const neptuneGeometry = new THREE.SphereGeometry(75, 32, 16)
const neptuneMaterial = new THREE.MeshBasicMaterial({color: 0x91AEBC, wireframe: true})
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);

const plutoGeometry = new THREE.SphereGeometry(7, 32, 16);
const plutoMaterial = new THREE.MeshBasicMaterial({
  color: 0x67685F, 
  wireframe: true,
})
const pluto = new THREE.Mesh(plutoGeometry, plutoMaterial);

scene.add(sun);
scene.add(mercury);
scene.add(venus);
scene.add(earth);
scene.add(moon);
scene.add(mars);
scene.add(jupiter);
scene.add(saturn);
scene.add( saturnRingMesh );
scene.add(uranus);
scene.add(neptune);
scene.add(pluto);

new OrbitControls( camera, renderer.domElement );

const orbits = {
  mercury: {
    r: 700,
    theta: 0,
    dTheta: 2 *  Math.PI / 400,
  },
  venus: {
    r: 800,
    theta: 0,
    dTheta: 2 *  Math.PI / 750,
  },
  earth: {
    r: 1000,
    theta: 0,
    dTheta: 2 * Math.PI / 900,
  }, 
  moon: {
    r: 990,
    theta: 0,
    dTheta: 2 * Math.PI / 900,
  },
  mars: {
    r: 1100,
    theta: 0,
    dTheta: 2 * Math.PI / 800,
  },
  jupiter: {
    r: 1300,
    theta: 0,
    dTheta: 2 * Math.PI / 1000,
  },
  saturn: {
    r: 1700,
    theta: 0,
    dTheta: 2 * Math.PI / 1300,
  },
  uranus: {
    r: 1900,
    theta: 0,
    dTheta: 2 * Math.PI / 1600,
  },
  neptune: {
    r: 2000,
    theta: 0,
    dTheta: 2 * Math.PI / 2000,
  },
  pluto: {
    r: 2500,
    theta: 0,
    dTheta: 2 * Math.PI / 2800,
  }
}

let isRotating = true;
let isRevolving = true;
let textIsShowing = false;
let isFullScreen = false;

function rotation(){
  if(isRotating === false){
    document.getElementById("btnRotation").innerHTML = "Stop Rotation";
  } else{
    document.getElementById("btnRotation").innerHTML = "Start Rotation";
  }
  isRotating = !isRotating;
}

document.getElementById("btnRotation").addEventListener("click", rotation);

function revolution(){
  if(isRevolving === false){
    document.getElementById("btnRevolution").innerHTML = "Stop Revolution";
  } else{
    document.getElementById("btnRevolution").innerHTML = "Start Revolution";
  }
  isRevolving = !isRevolving;
}

document.getElementById("btnRevolution").addEventListener("click", revolution);

function toggleText(){
  if(textIsShowing === true){
    document.getElementById("texts").innerHTML = "<p>Hello World <p>";
    
  } else{
    document.getElementById("texts").style.display = "none;";
    
  }
  textIsShowing = !textIsShowing;
}

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {
    console.log(intersects);
	}
}

function animate(){ // adding animation
  requestAnimationFrame(animate) //recusion

  if(isRotating){

    sun.rotation.y += 0.1;
    mercury.rotation.y += 0.6;
    venus.rotation.y += 0.5;
    earth.rotation.y += 0.005;
    moon.rotation.y += 0.5
    mars.rotation.y += 0.007;
    jupiter.rotation.y += 0.07;
    saturn.rotation.y += 0.2;
    saturnRingMesh.rotation.x += 0.005;
    saturnRingMesh.rotation.y += 0.005;
    //saturnRingMesh.rotation.z += 0.01;
    uranus.rotation.y += 0.25;
    neptune.rotation.y += 0.3;
    pluto.rotation.y += 0.4;

  }

  if(isRevolving){

    orbits.mercury.theta += orbits.mercury.dTheta;
    mercury.position.x = orbits.mercury.r * Math.cos(orbits.mercury.theta);
    mercury.position.y = orbits.mercury.r * Math.sin(orbits.mercury.theta) / 100;
    mercury.position.z = orbits.mercury.r * Math.sin(orbits.mercury.theta);

    orbits.venus.theta += orbits.venus.dTheta;
    venus.position.x = orbits.venus.r * Math.cos(orbits.venus.theta);
    venus.position.y = orbits.venus.r * Math.sin(orbits.venus.theta) / 200;
    venus.position.z = orbits.venus.r * Math.sin(orbits.venus.theta);

    orbits.earth.theta += orbits.earth.dTheta;
    earth.position.x = orbits.earth.r * Math.cos(orbits.earth.theta);
    earth.position.y = orbits.earth.r * Math.sin(orbits.earth.theta) / 300;
    earth.position.z = orbits.earth.r * Math.sin(orbits.earth.theta);

    orbits.moon.theta += orbits.moon.dTheta;
    moon.position.x = orbits.moon.r * Math.cos(orbits.moon.theta) - 50;
    moon.position.y = earth.position.y + 10;
    moon.position.z = orbits.moon.r * Math.sin(orbits.moon.theta) - 50;

    orbits.mars.theta += orbits.mars.dTheta;
    mars.position.x = orbits.mars.r * Math.cos(orbits.mars.theta);
    mars.position.y = orbits.mars.r * Math.sin(orbits.mars.theta) / 400;
    mars.position.z = orbits.mars.r * Math.sin(orbits.mars.theta);


    orbits.jupiter.theta += orbits.jupiter.dTheta;
    jupiter.position.x = orbits.jupiter.r * Math.cos(orbits.jupiter.theta);
    jupiter.position.y = orbits.jupiter.r * Math.sin(orbits.jupiter.theta) / 500;
    jupiter.position.z = orbits.jupiter.r * Math.sin(orbits.jupiter.theta);

    orbits.saturn.theta += orbits.saturn.dTheta;
    saturn.position.x = orbits.saturn.r * Math.cos(orbits.saturn.theta);
    saturn.position.y = orbits.saturn.r * Math.sin(orbits.saturn.theta) / 600;
    saturn.position.z = orbits.saturn.r * Math.sin(orbits.saturn.theta);

    saturnRingMesh.position.x = saturn.position.x;
    saturnRingMesh.position.y = saturn.position.y;
    saturnRingMesh.position.z = saturn.position.z;

    orbits.uranus.theta += orbits.uranus.dTheta;
    uranus.position.x = orbits.uranus.r * Math.cos(orbits.uranus.theta);
    uranus.position.y = orbits.uranus.r * Math.sin(orbits.uranus.theta) / 700;
    uranus.position.z = orbits.uranus.r * Math.sin(orbits.uranus.theta);

    orbits.neptune.theta += orbits.neptune.dTheta;
    neptune.position.x = orbits.neptune.r * Math.cos(orbits.neptune.theta);
    neptune.position.y = orbits.neptune.r * Math.sin(orbits.neptune.theta) / 800;
    neptune.position.z = orbits.neptune.r * Math.sin(orbits.neptune.theta);

    orbits.pluto.theta += orbits.pluto.dTheta;
    pluto.position.x = orbits.pluto.r * Math.cos(orbits.pluto.theta);
    pluto.position.y = orbits.pluto.r * Math.sin(orbits.pluto.theta) / 900;
    pluto.position.z = orbits.pluto.r * Math.sin(orbits.pluto.theta);

  }

  renderer.setSize(innerWidth, innerHeight)
  renderer.setPixelRatio(devicePixelRatio) // fixes edge pixels to make visuals smoother
  document.body.appendChild(renderer.domElement)

  window.addEventListener( 'pointermove', onPointerMove );
  renderer.render(scene, camera);

}

animate();
