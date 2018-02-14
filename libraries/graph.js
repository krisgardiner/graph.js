
var barGraph = function(barGraph){ //receives
  var line, lineMaterial, lineGeometry;
  barGraph.width = 20;
  barGraph.depth = 20;
  barGraph.spacing = barGraph.width + 5;
  barGraph.startX = -barGraph.width - 5;
  barGraph.margin = 5;
  barGraph.startY = 1.2;
  barGraph.precision = 100000; //what the dataset values will be divided by; the greater the number the smaller the graph and less precise, the lower the more precise but bigger graph
  var barStartX = -0.5;
  var bars = [];
  var group = new THREE.Group();

  // var action = {}; //Removing action object and adding it to the function parameter
  barGraph.init = function(numBars, dataset, scene){
    console.log("Create Bargraph");
    var newData = [];

    for (var i = 0; i < numBars; i++){
      newData.push(dataset[i]/barGraph.precision);
      console.log(i + " newData["+i+"] " + newData[i]);
    }
    var maxValue = Math.max(...newData);

    lineMaterial = new THREE.LineBasicMaterial({
    	color: 0xffffff
    });

    lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(
    	new THREE.Vector3( barGraph.startX, Math.floor(maxValue)+barGraph.margin, 0 ), // y-axis
      new THREE.Vector3( barGraph.startX, barGraph.startY, 0 ),
      new THREE.Vector3( (barGraph.startX+barGraph.margin+(numBars*barGraph.width)), barGraph.startY, 0 ) // x-axis
    );

    line = new THREE.Line( lineGeometry, lineMaterial );
    line.translateY(-1.2);
    group.add(line);

    //1.5 x spacing
    //translateY half of BoxGeometry y value
    for (var i = 0; i < numBars; i++){
      console.log("Data values: " + dataset[i]/barGraph.precision);
      bars.push(new THREE.Mesh( new THREE.BoxGeometry( barGraph.width, (dataset[i]/barGraph.precision), barGraph.depth ), new THREE.MeshNormalMaterial() ));
      bars[i].translateX(barStartX + (barGraph.spacing*i));
      bars[i].translateY(dataset[i]/barGraph.precision/2);
      group.add( bars[i] );
    }
    group.translateX(-(barGraph.startX+barGraph.margin+(numBars*barGraph.width))/2);
    group.translateY(-(maxValue/2));
    scene.add(group);
    // var mesh2 = new THREE.Mesh( new THREE.BoxGeometry( 1, 3, 1 ), new THREE.MeshNormalMaterial() );
    // mesh2.translateX(-0.5); //include spacing
    // mesh2.translateY(0.5); //divide by half of the geometry y value
    // scene.add( mesh2 );
  }

  barGraph.line = function(scene){
    console.log("Create Line");
  }

  return barGraph;
}(barGraph || {});

var label = function(label){

  label.create = function(text, font, scene, size, x, y, z, rotation){
  var materials = [
        new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
        new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
      ];

  var geometry = new THREE.TextGeometry( text, {
    font: font,
    size: size,
    height: 5,
    curveSegments: 2
  });

  geometry.computeBoundingBox();
  var meshtext = new THREE.Mesh( geometry, materials );

  meshtext.position.x = x;
  meshtext.position.y = y;
  meshtext.position.z = z;
  meshtext.rotation.z = rotation;
  scene.add(meshtext);
  return meshtext;
}

  return label;
}(label || {});
