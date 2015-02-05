circles
	.transition()
	.delay(function(d,i){return i*200})
	.duration(function(d,i){return i*1000})
	.attr('cy','80%')
	.attr('r',function(d,i){return (Math.random()*15)+'%'})

circles
	.transition()
	.delay(function(d,i){ return i*500 })
	.duration(2000)
	.ease('bounce')
	.attr('cy',function(d,i){return (Math.random()*100) + '%'})
	.attr('cx',function(d,i){return (Math.random()*100) + '%'})
	.attr('r',function(d,i){return (Math.random()*15) + '%'})
	.each('end',uptownfunc)

uptownfunc =function(){
	d3.select(this).transition()
	.delay(function(d,i){ return i*1000 })
	.duration(2000)
	.ease('bounce')
	.attr('cy',function(d,i){return (Math.random()*100) + '%'})
	.attr('cx',function(d,i){return (Math.random()*100) + '%'})
	.attr('r',function(d,i){return (Math.random()*15) + '%'})
	.each('end',uptownfunc)
}

///do the wave
wave = function() {
  //Move to left
  d3.select(this)
    .transition()
    .duration(3000)
    .attr("cx", "0%")
    .each("end", function() {

      //Move to right
      d3.select(this)
        .transition()
        .delay(function(d, i) {return i * 500;})
        .duration(2000)
        .attr("cx", "100%")
        .each("end", wave);
    });

};



c
	.transition()
	.duration(2000)
	.ease('elastic')
	.attr('cy','90%')
	.attr('cx',function(d){return percent(100-(d*10))})



























