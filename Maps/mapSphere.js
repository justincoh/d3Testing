var width = 750,
    height = 500;


var color = d3.scale.linear()
  .domain([1,8])
  .range(['blue','red'])


  var projection = d3.geo.orthographic()
    .scale(250)
    .translate([width /2, height / 2])
    // .clipAngle(200)
    .precision(.1);



var path = d3.geo.path()
    .projection(projection);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var graticule = d3.geo.graticule();

svg.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);

svg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

svg.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);


//////////////////////////////Start Map

var filePath = './shapeFiles/ne_50m_land/land.json'
d3.json(filePath, function(error, land) {
  if (error) return console.error(error);


console.log('LAND ',land)
  var land = topojson.topology({collection: land});    //See if the topology function works

  svg.selectAll(".land")
      .data(land)
    .enter().insert('path','.graticule')
      .attr('class','land')
      .attr('d',path)
      // .style('fill','#bbb')

  // svg.insert('path','.graticule')
  //   .datum(topojson.mesh(land,land))
  //   .attr('class','boundary')
  //   .attr('d',path);
      
      

///////Gives state boundary lines
  svg.insert('path','.graticule')
    .datum(topojson.feature(land, land,function(a, b) {return a !== b; }))
    .attr('class','state-boundary')
    .attr("d", path);

  

      })  

       
  





