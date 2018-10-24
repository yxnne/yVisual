
var now = d3.time.year.floor(new Date());
 
var spacetime = d3.select('body');
var width = 960,
    height = 500,
    radius = Math.min(width, height);
 
var radii = {
  "sun": radius / 8,
  "earthOrbit": radius / 2.5,
  "earth": radius / 32,
  "moonOrbit": radius / 16,
  "moon": radius / 96
};
 
// Space
var svg = spacetime.append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + 04+ "," + height / 2 + ")");

let r = 100;

 

var earthOrbitPosition = d3.svg.arc()

  .outerRadius(r )
  .innerRadius(r )
  .startAngle(0)
  .endAngle(Math.PI/4);

svg.append("path")
  .attr("class", "earthOrbitPosition")
  .attr("d", earthOrbitPosition)
	.attr("stroke","black")
	.attr("stroke-width", 2)
	.attr("stroke-dasharray","8 18");

	// .style("fill", "rgba(255, 204, 0, 0.75)");
 
var interpolateEarthOrbitPosition = d3.interpolate(earthOrbitPosition.startAngle()(),earthOrbitPosition.endAngle()());

d3.transition()
.duration(1000)
.tween("aaa", function () {
  return function (t) {
    // Animate Earth orbit position
    d3.select(".earthOrbitPosition")
      .attr("d", earthOrbitPosition.endAngle(interpolateEarthOrbitPosition(t)));
  };
});

d3.transition()
.duration(1000)
.delay(3000)
.tween("aaa", function () {
  return function (t) {
    // Animate Earth orbit position
    d3.select(".earthOrbitPosition")
      .attr("d", earthOrbitPosition.startAngle(interpolateEarthOrbitPosition(t)));
  };
});
 
