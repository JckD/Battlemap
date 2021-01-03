import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

/*
    modelLoader.js

    Exports function loadModel.

    Takes a model file as input and loads it into
    the three.js scene
*/

 const loadModel = function(model) {

    var file = model;
    let reader = new FileReader();
    
    reader.addEventListener( 'load', function ( event ) {

        var contents = event.target.result;

        var geometry = new STLLoader().parse( contents );
        var material = new THREE.MeshStandardMaterial();
        var mesh = new THREE.Mesh( geometry, material );
        
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        //scene.add( mesh );
        
        console.log(mesh)
        return (mesh);

    }, false );

     
    if ( reader.readAsBinaryString !== undefined ) {

        reader.readAsBinaryString( file );

    } else {

        reader.readAsArrayBuffer( file );

    };


};

export default loadModel;