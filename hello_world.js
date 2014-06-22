var w = 500;
var h = 500;

var h_grid_spacing = 20;
var v_grid_spacing = 20;
var cell_size = 15;
var grid_size = 10;

var svg = d3.select("body").append("svg");

svg.attr("width", w)
   .attr("height", h);

var dataset = d3.range(grid_size * grid_size)
                .map(function(d) {
                    return {x: ((d % grid_size) * h_grid_spacing),
                            y: (Math.floor(d / grid_size) * v_grid_spacing)};
                });

var grid = svg.selectAll("rect")
              .data(dataset)
              .enter()
              .append("rect");

var text = d3.select("body").selectAll("p")
             .data([0, 0])
             .enter()
             .append("p")
             .text(function (d) {
                return d;
             });

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", dragmove);

function data2rgb(d){
    return "rgb(" + d.x % 255 + ", " + d.y % 255 + ", 0)";
}

var i = 0;

function dragmove(d) {
    grid.attr("x", function(d){
            d.x += d3.event.dx;
            return d.x;
        })
        .attr("y", function(d){
            d.y += d3.event.dy;
            return d.y;
        })
       .attr("fill", data2rgb);

    svg.insert("circle", "rect")
      .attr("cx", d.x)
      .attr("cy", d.y)
      .attr("r", 20)
      .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
      .style("stroke-opacity", 1)
      .style("fill", d3.rgb(255, 255, 255))
    .transition()
      .duration(5000)
      .ease(Math.sqrt)
      .attr("r", 1e-6)
      .style("fill", data2rgb(d))
      .style("stroke-opacity", 1e-6)
      .remove();

    $(".label").text("(" + d.x + ", " + d.y + ")");
}

grid.attr("x", function(d) {
            return d.x;
       })
       .attr("y", function(d){
            return d.y;
       })
       .attr("width", cell_size)
       .attr("height", cell_size)
       .attr("fill", data2rgb)
       .call(drag);

$(document).ready(function(){
    $("body").append($("<p class=label> 0, 0 </p>"));
})
