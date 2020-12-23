import React, { Component } from 'react';

import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import { STLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.120.1/examples/jsm/loaders/STLLoader.js';
import foxy from '../3Dfiles/foxy.stl';

export default class CreateQuote extends Component {

   


    componentDidMount(){
    //     var scene = new THREE.Scene();
    //     var loader = new STLLoader();

      
    //     scene.background = new THREE.Color( 0xc4c4c4 );
    //    // === THREE.JS CODE START ===
        
    //     var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    //     var renderer = new THREE.WebGLRenderer({ alpha: true });
    //     renderer.setSize( window.innerWidth, window.innerHeight );

    //     const controls = new OrbitControls(camera, renderer.domElement)
    //     controls.enableDamping = true
    //     // //document.body.appendChild( renderer.domElement );
    //     this.mount.appendChild( renderer.domElement );
    //      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //     // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //     // var cube = new THREE.Mesh( geometry, material );
    //     // scene.add( cube );
        
    //     loader.load('../3Dfiles/foxy.stl', function(geometry) {
    //         var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
    //         var mesh = new THREE.Mesh(geometry)
    //        mesh.position.set( 0, - 0.25, 0.6 );
	// 		//mesh.rotation.set( 0, - Math.PI / 2, 0 );
	// 		//mesh.scale.set( 0.5, 0.5, 0.5 );
    //         //mesh.castShadow = true;
    //         //mesh.receiveShadow = true;
    //         mesh.position.set( 0, 20, 0);
    //         scene.add(mesh)
    //     },  // called when loading is in progresses
    //     ( xhr ) => {

    //         console.log((xhr.loaded / xhr.total * 100) + '% loaded')

    //    }, (error) => {
    //         console.log(error)
    //     })
    //     camera.position.z = 5;
    //     renderer.render( scene, camera );
        // var animate = function () {
        //     requestAnimationFrame( animate );
        //     cube.rotation.x += 0.01;
        //     cube.rotation.y += 0.01;
        //     renderer.render( scene, camera );
        // };
        //animate();
        // === THREE.JS EXAMPLE CODE END ===

        // Necessary for camera/plane rotation
			var degree = Math.PI/180;

			// Setup
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			var renderer = new THREE.WebGLRenderer();

			renderer.setSize(window.innerWidth, window.innerHeight);
            //document.body.appendChild(renderer.domElement);
            this.mount.appendChild( renderer.domElement );

			// Resize after viewport-size-change
			window.addEventListener("resize", function () {
			    var height = window.innerHeight;
			    var width = window.innerWidth;
			    renderer.setSize(width, height);
			    camera.aspect = width / height;
			    camera.updateProjectionMatrix();
			});

			// Adding controls
			var controls = new OrbitControls(camera, renderer.domElement);

			// Ground (comment out line: "scene.add( plane );" if Ground is not needed...)
			var plane = new THREE.Mesh(
			    new THREE.PlaneBufferGeometry(500, 500 ),
			    new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
			);
			plane.rotation.x = -90 * degree;
			plane.position.y = 0;
			scene.add( plane );
			plane.receiveShadow = true;

			var loader = new STLLoader();
			// Binary files - STL Import
            loader.load( foxy, function ( geometry ) {
			    var material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, specular: 0x111111, shininess: 200 } );
			    var mesh = new THREE.Mesh( geometry, material );
                mesh.position.set( 0, 1, 0);
                mesh.rotation.x  = -90 * degree;
                mesh.receiveShadow = true;
			    scene.add( mesh );
			} );

			// Camera positioning
			camera.position.z = 100;
			camera.position.y = 100;
			camera.rotation.x = -45 * degree;

			// Ambient light (necessary for Phong/Lambert-materials, not for Basic)
			var ambientLight = new THREE.AmbientLight(0xffffff, 1);
			scene.add(ambientLight);

			// Draw scene
			var render = function () {
			    renderer.render(scene, camera);
			};

			// Run game loop (render,repeat)
			var GameLoop = function () {
			    requestAnimationFrame(GameLoop);

			    render();
			};

			GameLoop();


    }

    render() {
        return (
           <div ref={ref => (this.mount = ref)}/>
        )
    }
}