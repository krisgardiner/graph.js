
var graph = function (graph) { //namespace

  graph.Graph = function(){
      console.log("Initialize Graph");
      let line, lineMaterial, lineGeometry;

      let bars;
      let barLabels = [];
      let groupBars = new THREE.Group();
      let groupLabels = new THREE.Group();
      let groupText = new THREE.Group();

      this.test = function(){

          console.log("test function");

      }

      // var action = {}; //Removing action object and adding it to the function parameter
      this.barGraph = function(numBars, dataset, font, scene){
        console.log("Create Bargraph");

        this.width = 20;
        this.depth = 20;
        this.spacing = this.width + 5;
        this.margin = this.width/2;
        this.startY = 1.2;
        this.precision = 100000; //what the dataset values will be divided by; the greater the number the smaller the graph and less precise, the lower the more precise but bigger graph
        // this.materials = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff });

        this.startX = 0;
        let newData = [];

        for (let i = 0; i < numBars; i++){
          newData.push(dataset.country[0].provinces[i].population/this.precision);
          // console.log("New Data"+[i]+": " + newData[i]);
        }
        let maxValue = Math.max(...newData);

        lineMaterial = new THREE.LineBasicMaterial({
        	color: 0xffffff
        });

        lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(
        	new THREE.Vector3( 0, Math.floor(maxValue)+this.margin, 0 ), // y-axis
          new THREE.Vector3( 0, this.startY, 0 ),
          new THREE.Vector3( (0+this.margin+(numBars*this.spacing)), this.startY, 0 ) // x-axis
        );

        line = new THREE.Line( lineGeometry, lineMaterial );
        line.translateY(-1.2);
        scene.add(line);

        //1.5 x spacing
        //translateY half of BoxGeometry y value
        for (let i = 0; i < numBars; i++){

          // bars.push(new THREE.Mesh( new THREE.BoxGeometry( this.width, (newData[i]), this.depth ), this.materials ));
          // random color: Math.random() * 0xffffff
          let barMaterial = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff });
          let bar = new THREE.Mesh( new THREE.BoxGeometry( this.width, (newData[i]), this.depth ), barMaterial );

          bar.translateX((this.spacing*i)); // reposition bars equally on the x axis
          bar.translateY(newData[i]/2); // reposition bars above x axis
          bar.name = dataset.country[0].provinces[i].name;
          groupBars.add( bar );

        }

        groupBars.translateX(this.width);

        // labels(this.width, dataset, font, scene);
        console.log("Create Labels");
        for (let i = 0; i < dataset.country[0].provinces.length; i++){
          barLabels.push(createLabel(dataset.country[0].provinces[i].name, font, scene, 6, this.margin+5+(i*(this.spacing)), -this.margin, 0, 150));
          // console.log(column[i].position.x);
          groupLabels.add(barLabels[i]);
        }
        scene.add(groupLabels);

        groupBars.width = this.spacing*numBars;
        groupBars.height = maxValue;
        return groupBars;
      } //end this.barGraph()

      this.label = function(text, font, scene, size, x, y, z, rotation){
        // this.text = function(newText){
        //   console.log("Remove text");
        //   if (groupText.children > 0) groupText.remove(groupText.children[0]);
        //   // groupText.add(createLabel(text, font, scene, size, x, y, z, rotation));
        // };

        // let _text = "";
        // Object.defineProperty(this, "text", {
        //   get: function() { return _text },
        //   set: function( value ) { _text = value}
        // });
        // console.log("_text: " + _text);

        // this.setText = function(text) {this.text = text};

        return createLabel(text, font, scene, size, x, y, z, rotation);
      }; //end this.title()
  }; //end graph.Graph()

  graph.Label = function(){
    this.createLabel = function(text, font, scene, size, x, y, z, rotation){
      return createLabel(text, font, scene, size, x, y, z, rotation);

    };

    this.changeText = function(meshText, newText){

    };
  }; //end graph.Label()

  function createLabel(text, font, scene, size, x, y, z, rotation){
    let materials = [
          new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
          new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
        ];

    let geometry = new THREE.TextGeometry( text, {
      font: font,
      size: size,
      height: 5,
      curveSegments: 2
    });

    geometry.computeBoundingBox();
    let meshtext = new THREE.Mesh( geometry, materials );

    meshtext.position.x = x;
    meshtext.position.y = y;
    meshtext.position.z = z;
    meshtext.rotation.z = rotation;

    return meshtext;
  };

  return graph;
}(graph || {});


// function Graph(){
//   console.log("Initialize Graph");
//   let line, lineMaterial, lineGeometry;
//
//   let bars;
//   let barLabels = [];
//   let groupBars = new THREE.Group();
//   let groupLabels = new THREE.Group();
//
//   this.test = function(){
//
//       console.log("test function");
//
//   }
//
//   // var action = {}; //Removing action object and adding it to the function parameter
//   this.barGraph = function(numBars, dataset, font, scene){
//     console.log("Create Bargraph");
//
//     this.width = 20;
//     this.depth = 20;
//     this.spacing = this.width + 5;
//     this.margin = this.width/2;
//     this.startY = 1.2;
//     this.precision = 100000; //what the dataset values will be divided by; the greater the number the smaller the graph and less precise, the lower the more precise but bigger graph
//     // this.materials = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff });
//
//     this.startX = 0;
//     let newData = [];
//
//     for (let i = 0; i < numBars; i++){
//       newData.push(dataset.country[0].provinces[i].population/this.precision);
//       // console.log("New Data"+[i]+": " + newData[i]);
//     }
//     let maxValue = Math.max(...newData);
//
//     lineMaterial = new THREE.LineBasicMaterial({
//     	color: 0xffffff
//     });
//
//     lineGeometry = new THREE.Geometry();
//     lineGeometry.vertices.push(
//     	new THREE.Vector3( 0, Math.floor(maxValue)+this.margin, 0 ), // y-axis
//       new THREE.Vector3( 0, this.startY, 0 ),
//       new THREE.Vector3( (0+this.margin+(numBars*this.spacing)), this.startY, 0 ) // x-axis
//     );
//
//     line = new THREE.Line( lineGeometry, lineMaterial );
//     line.translateY(-1.2);
//     scene.add(line);
//
//     //1.5 x spacing
//     //translateY half of BoxGeometry y value
//     for (let i = 0; i < numBars; i++){
//
//       // bars.push(new THREE.Mesh( new THREE.BoxGeometry( this.width, (newData[i]), this.depth ), this.materials ));
//       // random color: Math.random() * 0xffffff
//       let barMaterial = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff });
//       let bar = new THREE.Mesh( new THREE.BoxGeometry( this.width, (newData[i]), this.depth ), barMaterial );
//
//       bar.translateX((this.spacing*i)); // reposition bars equally on the x axis
//       bar.translateY(newData[i]/2); // reposition bars above x axis
//       bar.name = dataset.country[0].provinces[i].name;
//       groupBars.add( bar );
//
//     }
//
//     groupBars.translateX(this.width);
//
//     // labels(this.width, dataset, font, scene);
//     console.log("Create Labels");
//     for (let i = 0; i < dataset.country[0].provinces.length; i++){
//       barLabels.push(createLabel(dataset.country[0].provinces[i].name, font, scene, 6, this.margin+(i*(this.spacing)), -this.margin, 0, 150));
//       // console.log(column[i].position.x);
//       groupLabels.add(barLabels[i]);
//     }
//     scene.add(groupLabels);
//
//     groupBars.width = this.spacing*numBars;
//     groupBars.height = maxValue;
//     return groupBars;
//   } //end this.barGraph()
//
//   this.label = function(text, font, scene, size, x, y, z, rotation){
//     this.text = text;
//     this.font = font;
//     this.scene = scene;
//     this.size = size;
//     this.x = x;
//     this.y = y;
//     this.z = z;
//     this.rotation = rotation;
//
//     // let _text = "";
//     // Object.defineProperty(this, "text", {
//     //   get: function() { return _text },
//     //   set: function( value ) { _text = value}
//     // });
//     // console.log("_text: " + _text);
//
//     // this.setText = function(text) {this.text = text};
//     return createLabel(this.text, this.font, this.scene, this.size, this.x, this.y, this.z, this.rotation);
//   }; //end this.title()
//
//   function createLabel(text, font, scene, size, x, y, z, rotation){
//     let materials = [
//           new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
//           new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
//         ];
//
//     let geometry = new THREE.TextGeometry( text, {
//       font: font,
//       size: size,
//       height: 5,
//       curveSegments: 2
//     });
//
//     geometry.computeBoundingBox();
//     let meshtext = new THREE.Mesh( geometry, materials );
//
//     meshtext.position.x = x;
//     meshtext.position.y = y;
//     meshtext.position.z = z;
//     meshtext.rotation.z = rotation;
//
//     return meshtext;
//   }
//
// } //end Graph()
