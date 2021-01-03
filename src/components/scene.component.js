import React, { Component } from 'react';

import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import { STLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.120.1/examples/jsm/loaders/STLLoader.js';
import foxy from '../3Dfiles/foxy.stl';
import dragon from '../3Dfiles/red-dragon-ancient-updated.stl';
import wall from '../3Dfiles/wall.stl';
import MContext from './provider.component';

export default class LoadScene extends Component {

   constructor(props) {
       super(props) 

      
        this.state = {
            models : [],
            meshes : props.meshes
        }

   }


    componentDidMount(){

   
        // Necessary for camera/plane rotation
        var degree = Math.PI/180;

        // Setup
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        
        //document.body.appendChild(renderer.domElement);
        this.mount.appendChild( renderer.domElement );

        // Resize after viewport-size-change
        window.addEventListener("resize", function () {
            var height = window.innerHeight;
            var width = window.innerWidth;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix()
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
        plane.receiveShadow = true;
        plane.castShadow = true;
        plane.name = "plane"
        scene.add( plane );
        
        

        var loader = new STLLoader();
        // Binary files - STL Import
        loader.load( foxy, function ( geometry ) {
            var material = new THREE.MeshPhongMaterial( { color: 0xc60b0b} );
            
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( 0, 1, 0);
            mesh.rotation.x  = -90 * degree;
            mesh.rotation.z = 90 * degree
        
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            
            mesh.name = 'foxy'
            //mesh.traverse(function(child){child.castShadow = true;});
            scene.add( mesh );
        } );

        loader.load( dragon, function ( geometry ) {
            var material = new THREE.MeshPhongMaterial( { color: 0xc60b0b } );
            
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( -50, 1, 200);
            mesh.rotation.x  = -90 * degree;
            mesh.rotation.z = 90 * degree
        
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            
            mesh.name = 'dragon'
;
            scene.add( mesh );
        } );

        loader.load( wall, function ( geometry ) {
            var material = new THREE.MeshPhongMaterial( { color: 0x757575 } );
            
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( -20, -6, 40);
            mesh.rotation.x  = -90 * degree;
            mesh.rotation.z = 90 * degree
        
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            
            mesh.name = 'dragon'
;
            scene.add( mesh );
        } );


       
        console.log(this.state.meshes)
        if (this.state.meshes != undefined ) {
            console.log('added')
            scene.add( this.state.meshes[0])
        }
        
        
        // var geometry = new THREE.BoxGeometry( 50, 50, 50 );

        // var material = new THREE.MeshPhongMaterial( { color: 0x2194ce } );
        // var cube = new THREE.Mesh( geometry, material );
        // cube.position.set(-50, 25, -50)
        // cube.castShadow = true;
        // cube.receiveShadow = false;
        // scene.add( cube );

        // Camera positioning
        camera.position.z = 100;
        camera.position.y = 100;
        camera.rotation.x = -45 * degree;

        // Ambient light (necessary for Phong/Lambert-materials, not for Basic)
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        //const light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
        //scene.add( light );
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight.position.set(0, 300, 0)
        directionalLight.rotation.x = -45 * degree
        directionalLight.target.position.set(0,0,0)
        directionalLight.castShadow = true;
        
        directionalLight.target.name = "target"
        //scene.add( directionalLight );
        scene.add(directionalLight.target)


        directionalLight.shadow.mapSize.width = 512; // default
        directionalLight.shadow.mapSize.height = 512; // default
        directionalLight.shadow.camera.near = 0.1; // default
        directionalLight.shadow.camera.far = 500; // default
        

        const spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set(200, 200, 0 );
        spotLight.angle = Math.PI / 4;
        spotLight.castShadow = true;
        spotLight.penumbra = 0.1;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 5;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 1;
        spotLight.shadow.focus = .8;
        scene.add( spotLight );

        const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
        //scene.add( helper );
        const helper2 = new THREE.SpotLightHelper( spotLight, 5 );
        scene.add( helper2 );

        const shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
        scene.add( shadowCameraHelper );

        scene.traverse( function( child ) { 

            if ( child.isMesh ) {
        
                child.castShadow = true;
                child.receiveShadow = true;
        
            }
        
        } );
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
            <> 
                <div ref={ref => (this.mount = ref)}/>
               
            
            
            </>
           
        )
    }
}