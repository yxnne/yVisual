G6.registerGroup('custom', {
  draw(item) {
    const group = item.getGraphicGroup();
    const childrenBox = item.getChildrenBBox();
    group.addShape('text', {
      attrs: {
        x: childrenBox.x,
        y: childrenBox.y,
        text: '这是一个群组',
        fill: 'red'
      }
    });
    return group.addShape('rect', {
      attrs: {
        ...childrenBox,
        stroke: 'red'
      }
    });
  }
});
const data = {
  nodes: [
  {
    id: 'node1',
    x: 100,
    y: 200,
    label: '节点1',
    parent: 'group1'
  },{
    id: 'node2',
    x: 300,
    y: 200,
    label: '节点2',
    parent: 'group1'
  },
  {
    id: 'node3',
    x: 500,
    y: 200,
    label: '节点3',
    parent: 'group2'
  },


  ],
  edges: [{
    id: 'edge1',
    target: 'node2',
    source: 'node1'
  },
  {
    id: 'edge2',
    target: 'group1',
    source: 'group2'
  }],
  groups: [{
    id: 'group1',
    label: '群组'
  },
  {
    id: 'group2',
    label: '群组'
  }
  ]
};
const graph = new G6.Graph({
  container: 'mountNode',
  fitView: 'cc',
  width: 500,
  height: 500,
});
graph.group({
  shape: 'custom'
});
graph.read(data);




// tree
var dataTree = {
  roots: [{
    label: 'root',
    children: [{
      label: 'child1',
      children: [{
        label: 'child\n1.1'
      }]
    }, {
      label: 'child2'
    }]
  }]
};
var tree = new G6.Tree({
  container: 'mountNode',
  width: 500,
  height: 500,
  fitView: 'cc'
});
tree.read(dataTree);