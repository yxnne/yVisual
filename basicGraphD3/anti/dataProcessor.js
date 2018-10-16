// 数据处理模块

/*
	统一返回数据结构
	{
		mainNodeSize: num,
		nodes:[],
		edges:[],
	}
*/


/** 产生假数据 2 主节点*/
const genFake2 = () =>{
	return {
		mainNodeSize: 2,
		nodes:[
			{ id:'1', name:'1', type:'main', props:'' }, 
			{ id:'2', name:'2', type:'main', props:'' }, 
			{ id:'s1', name:'s1', type:'sub', props:'' }, 
			{ id:'s2', name:'s2', type:'sub', props:'' }, 
			{ id:'s3', name:'s3', type:'sub', props:'' }, 
		],
		edges:[
			{source:'1', target:'2', type:'main', props:'' },
			{source:'1', target:'s1', type:'sub', props:'' },
			{source:'1', target:'s2', type:'sub', props:'' },
			{source:'2', target:'s3', type:'sub', props:'' },
		],
	};
}

/** 产生假数据 3 主节点*/
const genFake3 = () =>{
	return {
		mainNodeSize: 3,
		nodes:[
			{ id:'1', name:'1', type:'main', props:'' }, 
			{ id:'2', name:'2', type:'main', props:'' }, 
			{ id:'3', name:'3', type:'main', props:'' }, 
			{ id:'s1', name:'s1', type:'sub', props:'' }, 
			{ id:'s2', name:'s2', type:'sub', props:'' }, 
			{ id:'s3', name:'s3', type:'sub', props:'' }, 
			{ id:'s4', name:'s4', type:'sub', props:'' }, 
		],
		edges:[
			{source:'1', target:'2', type:'main', props:'' },
			{source:'2', target:'3', type:'main', props:'' },
			{source:'3', target:'1', type:'main', props:'' },
			{source:'1', target:'s1', type:'sub', props:'' },
			{source:'2', target:'s2', type:'sub', props:'' },
			{source:'2', target:'s3', type:'sub', props:'' },
			{source:'3', target:'s4', type:'sub', props:'' },
		],
	};
}

/** 产生假数据 4 主节点*/
const genFake4 = () =>{
	return {
		mainNodeSize: 4,
		nodes:[
			{ id:'1', name:'1', type:'main', props:'' }, 
			{ id:'2', name:'2', type:'main', props:'' }, 
			{ id:'3', name:'3', type:'main', props:'' }, 
			{ id:'4', name:'4', type:'main', props:'' }, 
			{ id:'s1', name:'s1', type:'sub', props:'' }, 
			{ id:'s2', name:'s2', type:'sub', props:'' }, 
			{ id:'s3', name:'s3', type:'sub', props:'' }, 
			{ id:'s4', name:'s4', type:'sub', props:'' }, 
			{ id:'s5', name:'s5', type:'sub', props:'' }, 
		],
		edges:[
			{source:'1', target:'2', type:'main', props:'' },
			{source:'2', target:'3', type:'main', props:'' },
			{source:'3', target:'4', type:'main', props:'' },
			{source:'4', target:'1', type:'main', props:'' },
			{source:'1', target:'s1', type:'sub', props:'' },
			{source:'2', target:'s2', type:'sub', props:'' },
			{source:'2', target:'s3', type:'sub', props:'' },
			{source:'3', target:'s4', type:'sub', props:'' },
			{source:'4', target:'s5', type:'sub', props:'' },
		],
	};
}

/** 产生假数据 5 主节点*/
const genFake5 = () =>{
	return {
		mainNodeSize: 4,
		nodes:[
			{ id:'1', name:'1', type:'main', props:'' }, 
			{ id:'2', name:'2', type:'main', props:'' }, 
			{ id:'3', name:'3', type:'main', props:'' }, 
			{ id:'4', name:'4', type:'main', props:'' }, 
			{ id:'5', name:'5', type:'main', props:'' }, 
			{ id:'s1', name:'s1', type:'sub', props:'' }, 
			{ id:'s2', name:'s2', type:'sub', props:'' }, 
			{ id:'s3', name:'s3', type:'sub', props:'' }, 
			{ id:'s4', name:'s4', type:'sub', props:'' }, 
			{ id:'s5', name:'s5', type:'sub', props:'' }, 
			{ id:'s6', name:'s6', type:'sub', props:'' },
			{ id:'s7', name:'s7', type:'sub', props:'' },
		],
		edges:[
			{source:'1', target:'2', type:'main', props:'' },
			{source:'2', target:'3', type:'main', props:'' },
			{source:'3', target:'4', type:'main', props:'' },
			{source:'4', target:'5', type:'main', props:'' },
			{source:'5', target:'1', type:'main', props:'' },
			{source:'1', target:'s1', type:'sub', props:'' },
			{source:'2', target:'s2', type:'sub', props:'' },
			{source:'2', target:'s3', type:'sub', props:'' },
			{source:'3', target:'s4', type:'sub', props:'' },
			{source:'4', target:'s5', type:'sub', props:'' },
			{source:'4', target:'s6', type:'sub', props:'' },
		],
	};
}

/** 处理真实数据 */
const genData = (data) =>{

}
