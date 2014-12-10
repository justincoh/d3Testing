var width = 750,
    height = 1000;


var color = d3.scale.linear()
  .domain([0,7])
  .range(['blue','red'])

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);


var path = d3.geo.path()
    .projection(projection);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


//////////////////////////////Start Map
d3.json("us.json", function(error, us) {
  if (error) return console.error(error);


  svg.append("path")
      .datum(topojson.feature(us, us.objects.subunits))
      .attr("d", path);

  svg.selectAll(".subunit")
      .data(topojson.feature(us, us.objects.subunits).features)
    .enter().append("path")
      .attr("class", function(d) { return "subunit " + d.id; }) 
      //added id in above line to use as selector: ex US-NY
      .attr("d", path)
      
      // .style('fill','#bbb')

/////////Gives state boundary lines
  svg.insert('path','.graticule')
    .datum(topojson.feature(us, us.objects.subunits,function(a, b) {return a !== b; }))
    .attr('class','state-boundary')
    .attr("d", path);





    //Building hover tooltip
    //has to be inside d3.json build for async reasons
  var tooltip = d3.select('body').append('div')
              .style('position', 'absolute')
              .style('padding', '0 10px')
              .style('background', 'black')
              .style('color','white')
              .style('opacity', 0) // setting to 0 because we dont want it to show when the graphic first loads

      d3.selectAll('path').on('mouseover', function(d) {
        if(d3.select(this).attr('class')==='state-boundary'){
            return;  //Handles mouseover state boundary lines
          }

        var stateAbbrev = d.id.split('-')[1];
        // for(key in d){
          // console.log(d)
        //   tooltipInfo.push(d[key])
        // }
        // console.log(d)
        d3.select(this)
          .style('opacity', 0.5)
        tooltip.transition()
          .style('opacity', .9)
        tooltip.html(stateAbbrev)
          .style('left', (d3.event.pageX -15) + 'px')
          .style('top', (d3.event.pageY - 30) + 'px')
      })
      .on('mouseout', function(d) {
            d3.select(this)
              .style('opacity', 1)
            tooltip.transition().duration(500)
              .style('opacity', 0)
      })
      //////////////////////////////END MAP

      var stateHeat={};
      /////////////////////////
      /////Bringing in other json
      d3.json("data.json",function(error,datum){
          //Datum.nodes is an array of people with keys
          //name, occupation, location, gender, marital_status
          var people = datum.nodes
          var counter=0
          people.forEach(function(person){
            counter++
            var state =person.location;
            var thisState = d3.select('path[class*='+state+']')
            // console.log(counter,person.name,person.location, thisState.attr('class'))
            if(!stateHeat[state] && stateHeat[state]!==0){
              stateHeat[state] = 0;
            }
            else {
              stateHeat[state]+=1}

          })
          console.log(stateHeat)


          svg.selectAll(".subunit")
            .style('fill',function(d){
              var abbrev = d.id.split('-').pop();
              console.log('StateHeat ',stateHeat)
              return color(stateHeat[abbrev])
            })   
     

      })  

       

});            





