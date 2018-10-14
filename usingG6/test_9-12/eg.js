const data = {
	nodes:[
		{
			name:'BKMOBIL',
			id:'BKMOBIL',
			collapsed:false,
			sub:[
				"Subsystem A",
				"Subsystem B",
				"Subsystem C",
				"Subsystem D",
				"Subsystem E",
				"Subsystem F",
			],
			x: 0,
      y: 200,
		},
		{
			name:'BKMPORTAL',
			id:'BKMPORTAL',
			multi:true,
			collapsed:true,
			sub:[
				"Subsystem A",
				"Subsystem B",
				"Subsystem C",
				"Subsystem D",
				"Subsystem E",
				"Subsystem F",
			],
			x: 400,
      y: 100,
		}, {
			name:'SYSTEM',
			id:'SYSTEM',
			sub:[
				"Subsystem A",
				"Subsystem B",
				"Subsystem C"
			],
			x: 1200,
      y: 10,
		},
		
		{
			name:'SYSTEM2',
			id:'SYSTEM2',
			sub:[
				"Subsystem A",
				"Subsystem B",
				"Subsystem C"
			],
			x: 400,
      y: 400,
		},
		{
			name:'SYSTEM3',
			id:'SYSTEM3',
			sub:[
				"Subsystem A",
				"Subsystem B",
				"Subsystem C"
			],
			x: 400,
      y: 700,
		},
		{
			name:'SYSTEM4',
			id:'SYSTEM4',
			sub:[
				"Subsystem A",
				"Subsystem B",
				"Subsystem C"
			],
			x: 800,
      y: 350,
		},
		{
			name:'SYSTEM5',
			id:'SYSTEM5',
			sub:[
				"Subsystem A",
				"Subsystem B",
				"Subsystem C"
			],
			x: 800,
      y: 650,
		}
	],
	edges: [
		{
			id: 'edge1',
			shape: 'smooth',
			target: 'BKMOBIL',
			source: 'BKMPORTAL'
	  },
	  {
			id: 'edge2',
			shape: 'smooth',
			target: 'BKMPORTAL',
			source: 'SYSTEM'
	  },
	  {
			id: 'edge3',
			shape: 'smooth',
			target: 'BKMOBIL',
			source: 'SYSTEM2'
	  },
  ]
};

// 注册自定义节点
G6.registerNode('card', {
	collapseButtonUrl: 'https://gw.alipayobjects.com/zos/rmsportal/GGzWwlTjflbJHmXhjMXg.svg',
	expandButtonUrl: 'https://gw.alipayobjects.com/zos/rmsportal/DzWdTiwanggjaWKwcnWZ.svg',
  draw(item){
    const group = item.getGraphicGroup();
    const { name, sub, collapsed, multi } = item.getModel();
    let width = 250;
    if(multi){
    	width = width * 2;
    }
    const height = 200;
    const buttonWidth = 14;
    const buttonHeight = 14;

    // 单行模式 用户拼接subs html 字符串
    const genSubHtmlStringSingle = (subs)=>{
    	let str = '';
    	if(!collapsed){
	    	subs.forEach(item =>{
	    		str += `<div class="sub-container btn-with-color">${item}</div>`
	    	});
    	}
    	return str;
    }

    // 多列模式 用户拼接subs html 字符串
    const genSubHtmlStringMulti = (subs)=>{
    	let str = '';
    	if(!collapsed){
	    	subs.forEach(item =>{
	    		str += `<div class="sub-container btn-with-color multi">${item}</div>`
	    	});
    	}
    	return str;
    }

    // 基本html
    const html = G6.Util.createDOM(`
			<div class="card-outer">
				<h1 class="title-with-color">${name}</h1>
				
				${ multi?genSubHtmlStringMulti(sub):genSubHtmlStringSingle(sub) }
					
			</div>
    `);

    // 小按钮
    let button = '';
		if(sub && sub.length > 0 ) {
			
			button = '<img class="little-button" src='+(collapsed ? this.expandButtonUrl : this.collapseButtonUrl)+'>';
		} 

		// 添加html节点
		const mainHTML = group.addShape('dom', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        html,
      }
    });

		// 添加小按钮
    group.addShape('dom', {
			attrs: {
			x: width/2 - buttonWidth/2,
			y: 37,
			width: buttonWidth,
			height: buttonHeight,
			html: button
		}});

    return mainHTML;
  },
  anchor: [
    [0.5, 0],
    [0.5, 0.5]
  ]
});

// 注册平滑连线
G6.registerEdge('smooth', {
  getPath(item) {
    const points = item.getPoints();
    const start = points[0];
    const end = points[points.length - 1];
    const hgap = Math.abs(end.x - start.x);
    if (end.x > start.x) {
      return [
        [ 'M', start.x, start.y ],
        [ 'C', start.x + hgap / 4, start.y, end.x - hgap / 2, end.y, end.x, end.y ]
      ];
    }
    return [
      [ 'M', start.x, start.y ],
      [ 'C', start.x - hgap / 4, start.y, end.x + hgap / 2, end.y, end.x, end.y ]
    ];
  }
});

const graph = new G6.Graph({
  container: 'mountNode',  // 容器ID
  fitView: 'cc',
  renderer: 'svg',
  // height: window.innerHeight,
  width:1800,
  height:1800,
  // maxZoom:0.6
});

graph.node({
  shape: 'card'
});

// graph.zoom(0.5);
graph.read(data);

// 设置点击监听
graph.on('node:click', ev=>{
  const { domEvent, item } = ev;
  const { target } = domEvent;
  const { collapsed } = item.getModel();
  if (target.className === 'little-button') {
    if (collapsed) {
      graph.update(item, {
        collapsed: false,
      });
    } else {
      graph.update(item, {
        collapsed: true,
      });
    }
  }
});

// graph.zoom(0.6); 

// 展开所有
function expandAllItem(){
	data.nodes.forEach(item=>{
		const node = graph.find(item.id);

		graph.update(node, {
    	collapsed: false
		});
	})
}
// 展开所有
function closeAllItem(){
	data.nodes.forEach(item=>{
		const node = graph.find(item.id);

		graph.update(node, {
    	collapsed: true
		});
	})
}
