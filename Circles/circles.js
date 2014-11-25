 $(document).ready(function(){


      var colors = d3.scale.linear()        
          .domain([0,100])    //try and get this working with d3.max(data)
          .range(['#0F0202','#990BA1']);

      var randomData = function(numDots){
        var data = [];
        for(var i=0;i<numDots;i++){
          var percent1 = (Math.random()*100);
          var percent2 = (Math.random()*100);
          var radius = (Math.random()*8);
          data.push([percent1,percent2,radius]);
        };
        return data;
      }

      var generateDots=function(numDots){

        var data =randomData(numDots);
        var svg = d3.select("svg");
        var circle = svg.selectAll("circle").data(data);
        var circleEnter = circle.enter().append("circle");
        
        
        //This will do it for each element
        circleEnter.attr('cx',function(data,index){return data[0]+'%'})
                  .attr('cy',function(data,index){return data[1]+'%'})
                  .attr('r',function(data){return data[2]+'%'})    
                  .style('fill',function(d,i){ return colors(100-d[1]) }) //This is working, color based off of data which --> cx and cy
        };

        $('h2').click(function(){   //Generates dots on header click
          
          $('circle').remove();
          d3.select('#chart')
              // .append('svg')
              .attr('width', '100%')
              .attr('height','100%')

          generateDots(25);
        });



        $('.container').click(function(){
          var svg=d3.selectAll('svg');  
          if(typeof svg==='undefined'){
            // console.log('it was undefined');
            var svg = d3.selectAll('svg')};
          
          
          svg.on('click',function(){    

            var position = d3.mouse(this);
            var data = [];
            data.push([ position[0], position[1], Math.random()*10 ]);
            
            function toPercent(x) {
              return x + '%';
            };   
            
            var circle = svg.selectAll('svg').data(data);   //Why does this only work with selectAll and not select? there's only one svg
            
            var circleEnter = circle.enter().append('circle');
              circleEnter.attr('cx',toPercent(data[0][0]))
              .attr('cy',toPercent(data[0][1]))
              .attr('r', toPercent(data[0][2]))
              .style('fill',function(d,i){ return colors(100-d[1]) });
          
          }) //End svg.clickhandler

          var tooltip = d3.select('body').append('div')
              .style('position', 'absolute')
              .style('padding', '0 10px')
              .style('background', 'black')
              .style('color','white')
              .style('opacity', 0) // setting to 0 because we dont want it to show when the graphic first loads

          d3.selectAll('circle').on('mouseover', function(d) {
            d3.select(this)
              .style('opacity', 0.5)
            tooltip.transition()
              .style('opacity', .9)
            tooltip.html('R= '+d[2].toString().substring(0,4)+'%')
              // console.log(d)
              .style('left', (d3.event.pageX -15) + 'px')
              .style('top', (d3.event.pageY - 30) + 'px')
          })
            .on('mouseout', function(d) {
                d3.select(this)
                  .style('opacity', 1)
                tooltip.transition()
                  .style('opacity', 0)
            })


        });

        // ///To track mouse movements
        // svg.on('mousemove',function() {
        // var p1 = d3.mouse(this);
        // console.log(p1[0],p1[1])  //x and y
        // })
        //Same thing with JQuery
        // $('svg').click(function (e) { //Default mouse Position 
        // console.log(e)
        // });

    });