// 定义类型
const TYPE_NODE_MAIN = 'TYPE_NODE_MAIN'; 	// 节点
const TYPE_NODE_SUB = 'TYPE_NODE_SUB';
const TYPE_EDGE_MAIN = 'TYPE_EDGE_MAIN';	// 边
const TYPE_EDGE_SUB = 'TYPE_EDGE_SUB';

const EVERY_TIME = 200;
const EVERY_HARF_TIME = EVERY_TIME / 2;

// 准备数据

let sourceName = '';

let allTimeParam = 1;
let everyParam = 0.9;

var nodes = [ 
	{ name: "0" , type: TYPE_NODE_MAIN, isSource:true }, 
	{ name: "1" , type: TYPE_NODE_MAIN },
	{ name: "2" , type: TYPE_NODE_SUB },
	{ name: "3" , type: TYPE_NODE_SUB },
	{ name: "4" , type: TYPE_NODE_SUB },
	{ name: "5" , type: TYPE_NODE_SUB },
	{ name: "6" , type: TYPE_NODE_MAIN } ,
	{ name: "7" , type: TYPE_NODE_MAIN } ,
	{ name: "8" , type: TYPE_NODE_MAIN } ,
	{ name: "9" , type: TYPE_NODE_MAIN } ,
	{ name: "10", type: TYPE_NODE_MAIN } ,
	{ name: "11", type: TYPE_NODE_SUB } ,
];

var edges = [  
	
	{ source : 0  , target: 2 , distance:100, type: TYPE_EDGE_SUB } ,
	{ source : 0  , target: 3 , distance:100, type: TYPE_EDGE_SUB } ,
	{ source : 1  , target: 4 , distance:100, type: TYPE_EDGE_SUB } ,
	{ source : 1  , target: 5 , distance:100, type: TYPE_EDGE_SUB } ,
	{ source : 0  , target: 1 , distance:100, type: TYPE_EDGE_MAIN } ,
	{ source : 1  , target: 6 , distance:100, type: TYPE_EDGE_MAIN} ,
	{ source : 6  , target: 7 , distance:100, type: TYPE_EDGE_MAIN } ,
	{ source : 7  , target: 8 , distance:100, type: TYPE_EDGE_MAIN } ,
	{ source : 8  , target: 9 , distance:100, type: TYPE_EDGE_MAIN } ,
	{ source : 9  , target: 10 , distance:100, type: TYPE_EDGE_MAIN } ,
	{ source : 10  , target: 0 ,distance:100, type: TYPE_EDGE_MAIN } ,
	{ source : 9  , target: 11 ,distance:100, type: TYPE_EDGE_SUB } ,
];	

let svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// 注册高斯模糊
var filter = g.append("filter")
    .attr("id", "GaussianBlur") // 效果索引
    .attr("height", "130%");

filter.append("feGaussianBlur")
    .attr("stdDeviation", 2)
    .attr("result", "blur");

var filter2 = g.append("filter")
    .attr("id", "GaussianBlur2Line") // 效果索引
    .attr("height", "130%");
filter2.append("feGaussianBlur")
    .attr("stdDeviation", 1)
    .attr("result", "blur");

var simulation = d3.forceSimulation(nodes)
	.force("charge", d3.forceManyBody().strength(-40))
	.force("link", d3.forceLink(edges).distance(20).strength(1).iterations(1))
	.force("x", d3.forceX())
	.force("y", d3.forceY())
	.stop();

var loading = svg.append("text")
	.attr("dy", "0.35em")
	.attr("text-anchor", "middle")
	.attr("font-family", "sans-serif")
	.attr("font-size", 10)
	.text("Simulating. One moment please…");

d3.timeout(function() {
  loading.remove();

  // See https://github.com/d3/d3-force/blob/master/README.md#simulation_tick
  for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
    simulation.tick();

  }

  // 划点
  // 先找到起始点
  const souceNode = nodes.filter(item => {
  	return item.isSource
  })[0];
  sourceName = souceNode.name;

  drawByNode(g, souceNode, nodes, edges)


});


// 划点的方法
function drawByNode(g, theNode, nodes, edges){

	addNodeComplex(g, theNode.x, theNode.y);  // 锁定节点

	let sourceNode;
	let targetNode;
	const targetNodes = [];
	// 先根据theNode 拿到相关的边
	const relativeEdges = edges.filter(item => {
		// console.log('item.source')
		return item.source.name === theNode.name
	}).forEach(item =>{
		sourceNode = nodes.filter(one => (one.name === item.source.name))[0];
		targetNode = nodes.filter(one => (one.name === item.target.name))[0];
		targetNodes.push(targetNode);
		switch(item.type){
			case TYPE_EDGE_SUB:
				addEdgeSimple(g, {x: sourceNode.x, y:sourceNode.y}, {x:targetNode.x, y:targetNode.y})
				break;
			case TYPE_EDGE_MAIN:
				addEdgeComplex(g, {x: sourceNode.x, y:sourceNode.y}, {x:targetNode.x, y:targetNode.y});
				break;
		}
	});

	targetNodes.forEach(item =>{
		switch(item.type){
			case TYPE_NODE_SUB:
				addNodeSimple(g, item.x, item.y )
				break;
			case TYPE_NODE_MAIN:
				// addEdgeComplex(g, {x: sourceNode.x, y:sourceNode.y}, {x:targetNode.x, y:targetNode.y});
				if (item.name !== sourceName){
					setTimeout(()=>{
						drawByNode(g, item, nodes, edges)
					}, EVERY_TIME * allTimeParam);
				}
				
				break;
		}
	});

	allTimeParam *= everyParam;

}



// 添加 第一种节点 普通点
// cx cy 中心点
// r 半径
function addNodeSimple(g, cx, cy){

	// 高斯模糊的小背景部分
	var cir = g.append("circle")
		.attr('class', 'shadow')
		.attr("fill","steelblue")
		.attr("cx",cx * 4)
		.attr("cy",cy * 4) 
		.style("filter", "url(#GaussianBlur)")
		.attr("r", 5)		
		.transition()
		.duration(EVERY_TIME * allTimeParam)
		.ease(d3.easeBackOut)
		.attr("r",11);

	g.append("circle")
		.attr('class', 'startNode')
		.attr("fill","white")
		.attr("cx",cx * 4)
		.attr("cy",cy * 4)
		.attr("r", 0)
		.transition()
		.duration(EVERY_TIME * allTimeParam)
		.ease(d3.easeBackOut)
		.attr("r",8);
}

// 添加 第二种节点 复杂点
// cx cy 中心点
// r 半径
function addNodeComplex(g, cx, cy){
	// 中心部分
	// 高斯模糊背景
	var cir = g.append("circle")
		.attr('class', 'shadow')
		.attr("fill","steelblue")
		.attr("cx",cx * 4)
		.attr("cy",cy * 4) 
		.style("filter", "url(#GaussianBlur)")
		.attr("r", 5)		
		.transition()
		.duration(EVERY_TIME * allTimeParam)
		.ease(d3.easeBackOut)
		.attr("r",15);

	g.append("circle")
		.attr('class', 'startNode')
		.attr("fill","#69c0ff")
		.attr("cx",cx * 4)
		.attr("cy",cy * 4)
		.attr("r", 0)
		.transition()
		.duration(EVERY_TIME * allTimeParam)
		.ease(d3.easeBackOut)
		.attr("r",13);
	g.append("circle")
		.attr('class', 'startNode')
		.attr("fill","white")
		.attr("cx",cx * 4)
		.attr("cy",cy * 4)
		.attr("r", 0)
		.transition()
		.duration(EVERY_TIME * allTimeParam)
		.ease(d3.easeBackOut)
		.attr("r",10);

	// 外侧环
	g.append("circle")
		.attr('class', 'startNode')
		.attr('fill', 'none')
		.attr("stroke","white")
		.attr("stroke-width", 2)
		.style("filter", "url(#GaussianBlur)")
		.attr("cx",cx * 4)
		.attr("cy",cy * 4)
		.attr("r", 0)
		.transition()
		.duration(EVERY_TIME * allTimeParam)
		.ease(d3.easeBackOut)
		.attr("r",18);

	g.append("circle")
		.attr('class', 'startNode')
		.attr('fill', 'none')
		.attr("stroke","#91d5ff")
		.attr("stroke-width", 2)
		.attr("cx",cx * 4)
		.attr("cy",cy * 4)
		.attr("r", 0)
		.transition()
		.duration(EVERY_TIME * allTimeParam )
		.ease(d3.easeBackOut)
		.attr("r",18);
		// stroke-dasharray="20,10,5,5,5,10"

	// 外侧环 发光物
	g.append("circle")
		.attr('class', 'startNode')
		.attr('fill', 'none')
		.attr("stroke","white")
		.attr("stroke-width", 2)
		.attr("stroke-dasharray","14 18")
		.attr("cx",cx * 4)
		.attr("cy",cy * 4)
		.attr("r", 0)
		.transition()
		.duration(EVERY_TIME * allTimeParam)
		.ease(d3.easeBackOut)
		.attr("r",20);
}

// 暗淡的连线
function addEdgeSimple(g, sourcePoint, targetPoint){
	var line = g.append("line")
		.attr("x1",sourcePoint.x * 4)
		.attr("y1",sourcePoint.y * 4)
		.attr("x2",sourcePoint.x * 4)
		.attr("y2",sourcePoint.y * 4)
		.attr("stroke","#91d5ff")
		.style("filter", "url(#GaussianBlur2Line)")
		.transition()
		.duration(EVERY_HARF_TIME * allTimeParam / 3)
		.ease(d3.easeLinear )
		.attr("x2",sourcePoint.x * 4)
		.attr("y2",sourcePoint.y * 4)
		.transition()
		.duration(EVERY_HARF_TIME * allTimeParam)
		.ease(d3.easeLinear )
		.attr("x2",targetPoint.x * 4)
		.attr("y2",targetPoint.y * 4) ;
}

// 明亮的连线
function addEdgeComplex(g, sourcePoint, targetPoint){
	var line = g.append("line")
		.attr("x1",sourcePoint.x * 4)
		.attr("y1",sourcePoint.y * 4)
		.attr("x2",sourcePoint.x * 4)
		.attr("y2",sourcePoint.y * 4)
		.attr("stroke","white")
		.attr("stroke-width", 2)
		.style("filter", "url(#GaussianBlur2Line)")
		.transition()
		.duration(EVERY_HARF_TIME * allTimeParam / 3 )
		.ease(d3.easeLinear )
		.attr("x2",sourcePoint.x * 4)
		.attr("y2",sourcePoint.y * 4)
		.transition()
		.duration(EVERY_HARF_TIME * allTimeParam)
		.ease(d3.easeLinear )
		.attr("x2",targetPoint.x * 4)
		.attr("y2",targetPoint.y * 4);
}