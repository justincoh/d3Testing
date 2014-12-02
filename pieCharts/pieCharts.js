// var width = 960,
//     height = 500,
//     radius = Math.min(width, height) / 2;

// var color = d3.scale.category20()
//     // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// var arc = d3.svg.arc()
//     .outerRadius(radius - 10)
//     .innerRadius(radius*.4);

// var pie = d3.layout.pie()
//     .sort(null)
//     .value(function(d) { return d.population; });

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//   .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//     // console.log("SVG: ",Object.keys(svg[0][0]).sort())

// var data = [
// 	{age:'<5',population:270},
// 	{age:'5-13',population:449},
// 	{age:'14-17',population:215},
// 	{age:'Junk',population:300},
// 	{age:'More Junk',population:50}
// 	]

//   var g = svg.selectAll(".arc")
//       .data(pie(data))
//     .enter().append("g")
//       .attr("class", "arc");

//   g.append("path")
//       .attr("d", arc)
//       .style("fill", function(d) { 
//       	console.log(d.data.age,": Start Angle , ",d.startAngle)  //Getting angles for each arc (in radians)
//       	console.log(d.data.age,": End Angle , ",d.endAngle)  //Getting angles for each arc
//       	return color(d.data.age); });


//   g.append("text")
//       .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
//       .attr("dy", ".35em")
//       .style("text-anchor", "middle")
//       .text(function(d) { return d.data.age; });

// // });


// var express = require('express');

var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2,
    labelRadius = radius * 1.2;

var color = d3.scale.category20()
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius*.4);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });


var data = [   //This was test data
 {age:'<5',population:270},
 {age:'5-13',population:449},
 {age:'14-17',population:215},
 {age:'Junk',population:300},
 {age:'More Junk',population:50}
 ];



 var total=0; //for calculating percentages
 for(var i = 0; i<data.length;i++){
  total += data[i]['population'];
  //Or should I store this as a key of the obj?
 }

function createPieChart(data){
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    // console.log("SVG: ",Object.keys(svg[0][0]).sort())



  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { 
        // console.log(d.data.age,": Start Angle , ",d.startAngle)  //Getting angles for each arc (in radians)
        // console.log(d.data.age,": End Angle , ",d.endAngle)  //Getting angles for each arc
        return color(d.data.age); });


  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.age; });

  //For tooltip positioning

  var element = d3.selectAll('svg')
  element = element[0][0];
  var bbox = element.getBBox();
  
  var tooltip = d3.select('body').append('div')
              .style('position', 'absolute')
              .style('padding', '0 10px')
              .style('background', 'black')
              .style('color','white')
              .style('opacity', 0) // setting to 0 because we dont want it to show when the graphic first loads
              .style('font-size','20px')
          d3.selectAll('path').on('click', function(d) {
            // console.log('D ',d)
            d3.select(this)
              .style('opacity', 0.5)
            tooltip.transition()
              .style('opacity', .9)
            tooltip.html('Value '+ (d['value']/total).toFixed(2)+'%')
              // console.log(d)
              // .style('left', (d3.event.pageX -15) + 'px')
              // .style('top', (d3.event.pageY - 30) + 'px')
              .style('left', (bbox.width*.5) + 'px')
              .style('top', (bbox.height/2) + 'px')
                
          })
            .on('mouseout', function(d) {
                d3.select(this)
                  .style('opacity', 1)
                tooltip.transition()
                  .style('opacity', 0)
            })
}




createPieChart(data)
