// 绘制力导向图
var width  = 1000;	//SVG绘制区域的宽度
var height = 1000;	//SVG绘制区域的高度
	
var svg = d3.select("body")			//选择<body>
	.append("svg")			//在<body>中添加<svg>
	.attr("width", width)	//设定<svg>的宽度属性
	.attr("height", height);//设定<svg>的高度属性

// 初始数据
var nodes = [ { name: "0"    }, 
	{ name: "1" },
	{ name: "2"    },
	{ name: "3"   },
	{ name: "4"   },
	{ name: "5"    },
	{ name: "6"    } ];
			 
var edges = [  { source : 0  , target: 1 } ,
	{ source : 0  , target: 2 } ,
	{ source : 0  , target: 3 } ,
	{ source : 1  , target: 4 } ,
	{ source : 1  , target: 5 } ,
	{ source : 1  , target: 6 } ];	

// 转换数据
var force = d3.layout.force()
	.nodes(nodes)	//设定顶点数组
	.links(edges)	//设定边数组
	.size([width,height])	//设定作用范围
	.linkDistance(90)	//设定边的距离
	.charge(-400);	//设定顶点的电荷数

force.start();	//开启布局计算

console.log('nodes is :', nodes);	
console.log('edges is :', edges);

//3.绘制
var color = d3.scale.category20();
//绘制连线
var lines = svg.selectAll(".forceLine")
	.data(edges)
	.enter()
	.append("line")
	.attr("class","forceLine");

//绘制节点
var circles = svg.selectAll(".forceCircle")
	.data(nodes)
	.enter()
	.append("circle")
	.attr("class","forceCircle")
	.attr("r",20)
	.style("fill",function(d,i){
		return color(i);
	})
	.call(force.drag);

//绘制文字
var texts = svg.selectAll(".forceText")
	.data(nodes)
	.enter()
	.append("text")
	.attr("class","forceText")
	.attr("x",function(d){ return d.x; })
	.attr("y",function(d){ return d.y; })
	.attr("dy", ".3em")
	.text(function(d){ return d.name; });

		
//tick事件的监听器
force.on("tick", function(){
	
	 //更新连线的端点坐标
	 lines.attr("x1",function(d){ return d.source.x; });
	 lines.attr("y1",function(d){ return d.source.y; });
	 lines.attr("x2",function(d){ return d.target.x; });
	 lines.attr("y2",function(d){ return d.target.y; });
	 
	 //更新节点坐标
	 circles.attr("cx",function(d){ return d.x; });
	 circles.attr("cy",function(d){ return d.y; });
	 
	 //更新节点文字的坐标
	 texts.attr("x",function(d){ return d.x; });
	 texts.attr("y",function(d){ return d.y; });
	 
});


//力学图运动开始时
force.on("start", function(){
	console.log("运动开始");
});
	
//力学图运动结束时
force.on("end", function(){
	console.log("运动结束");
});
