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
    var loader = new STLLoader();

    // Necessary for camera/plane rotation
    var degree = Math.PI/180;
    

    // reader.addEventListener( 'load', function ( event ) {

    //     var contents = event.target.result;
        
    //     var geometry = new STLLoader().parse( contents );
    //     var material = new THREE.MeshStandardMaterial();
    //     var mesh = new THREE.Mesh( geometry, material );
        
    //     mesh.castShadow = true;
    //     mesh.receiveShadow = true;
        
    //     //scene.add( mesh );
        
    //     //console.log(mesh)
    //     //return (mesh);

    // }, false );


     

//     loader.load( file[0], function ( geometry ) {
//         
        
//         var mesh = new THREE.Mesh( geometry, material );
//         mesh.position.set( 0, -6, 0);
//         mesh.rotation.x  = -90 * degree;
//         mesh.rotation.z = 90 * degree
    
//         mesh.receiveShadow = true;
//         mesh.castShadow = true;
        
//         mesh.name = 'new model'
// ;
//         return(mesh)
//     } );

    

    reader.onload = function ()
    {
        //var loader = new THREE.STLLoader();
        // parse the .stl file
        var material = new THREE.MeshPhongMaterial( { color: 0x757575 } );
        var geometry = loader.parse(this.result);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return(mesh);
    };
  
    reader.readAsArrayBuffer(file[0])
};

export default loadModel;