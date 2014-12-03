var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .value(function(d) { return d.apples; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);

var transitionArc = d3.svg.arc()
      .innerRadius(radius - 80)
      .outerRadius(radius - 5);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// d3.tsv("data.tsv", type, function(error, data) {

// var data=[
// {apples:1800, oranges:700},
// {apples:2000, oranges:500},
// {apples:1200, oranges:60},
// {apples:200, oranges:700},
// {apples:900, oranges:500},
// {apples:400, oranges:700}
// ];

var data=[
{apples:1800, oranges:700},
{apples:2000, oranges:500},
{apples:1200, oranges:60},
{apples:200, oranges:700},
{apples:900, oranges:500},
{apples:400, oranges:700}
];

  var path = svg.datum(data).selectAll("path")
      .data(pie)
    .enter().append("path")
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", arc)
      .each(function(d) { this._current = d; }); // store the initial angles

  d3.selectAll("input")
      .on("change", change);

  // var timeout = setTimeout(function() {
  //   d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
  // }, 2000);





  function change() {
    var value = this.value;
    // clearTimeout(timeout);
    pie.value(function(d) { return d[value]; }); // change the value function
    path = path.data(pie); // compute the new angles
    path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
  }


function type(d) {
  d.apples = +d.apples;
  d.oranges = +d.oranges;
  return d;
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

//////////Transition toggling working
var paths = d3.selectAll('path');

paths.on('click', function() {
    var thisPath = d3.select(this);
    if(thisPath.attr('transitioned')==='true'){
      thisPath.transition().attr('d', arc)
      thisPath.attr('transitioned', false)
    } else {
      thisPath.transition().attr('d', transitionArc)
      thisPath.attr('transitioned', true)
    }
})


/*
function pieSliceToggle(element){
  var thisPath = d3.select(element);
    if(thisPath.attr('transitioned')==='true'){
      thisPath.transition().attr('d', arc)
      thisPath.attr('transitioned', false)
    } else {
      thisPath.transition().attr('d', transitionArc)
      thisPath.attr('transitioned', true)
    }
};
*/

