window.onload =function() { 
    backTop();
    animation();
}

function backTop(){
	var obtn = document.getElementById('btn');
	var tool = document.getElementById('tool');
	var clientHeight = document.documentElement.clientHeight;
	var nav_ifo = document.getElementById('nav_ifo');
	var sch_nav = document.getElementById('sch_nav');
	var timer = null;
	var isTop = true;
	//var teamTop = getClass('team');
    //
	//function getClass(clsName,parent){
	//	var oParent = parent?document.getElementById(parent):document,
	//		eles=[],
	//		elements = oParent.getElementsByTagName('*');
	//	for (var i = 0,l=elements.length; i <l; i++) {
	//		if(elements[i].className==clsName){
	//			eles.push(elements[i]);
	//		}
	//	}
	//	return eles;
	//}

	//滚轮滚动触发事件
	window.onscroll = function(){
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
		//侧边栏的出现高度设置
		if(osTop > 0.2*clientHeight){
			tool.style.display = "block";
		}else{
			tool.style.display = "none";
		}

        //板块出现的高度设置
		if(osTop>100){
			$('#technology').animate({
				opacity: 1,
				top:0
			},300)
			$('#design').animate({
				opacity: 1,
				top:0
			},700)
			$('#operat').animate({
				opacity: 1,
				top:0
			}, 1000)
		}


		if(osTop>400){
			$('#image_1').animate({
				opacity: 1,
		},500)
			$('#image_2').animate({
				opacity: 1
			},1000)
			if(osTop>800) {
				$('#image_3').animate({
					opacity: 1
				}, 500)
				$('#image_4').animate({
					opacity: 1
				}, 1000)
			}
		}
	}

	//回到顶部效果
	obtn.onclick = function(){
		timer = setInterval(function(){
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			var scrollSpeed = Math.ceil(osTop/4);
			isTop = true;
			document.documentElement.scrollTop = document.body.scrollTop = osTop - scrollSpeed;
			if(osTop == 0){
				clearInterval(timer);
			}
		},35);
	};

	sch_nav.onmousemove = function(){
		nav_ifo.style.display = "block";
	};

	nav_ifo.onmousemove = function(){
		this.style.display = "block";
	}

	nav_ifo.onmouseout = function(){
		this.style.display = "none";
	}
}

function animation(){
	
	//取除内联外的Css属性 attr 要加''如'top'
	function getStyle(obj, attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	}
	//parent 传id
	function getClass(clsName,parent){
		var oParent = parent?document.getElementById(parent):document,
			eles=[],
			elements = oParent.getElementsByTagName('*');
		for (var i = 0,l=elements.length; i <l; i++) {
			if(elements[i].className==clsName){
				eles.push(elements[i]);
			}
		}
		return eles;
	}
	var footTop = getClass('foot_pic')[0];//2091
	var information = getClass('information')[0];//991
	var More = getClass('More')[0];//1641
	var back = 0 ;
	var flag = 0;
		
	var scrollFunc = function(e){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		e = e || window.event;
		var speed = 30;
		var slowspeed = 0.5;
		if(((e.wheelDelta/120) || (e.wheelDelta/3)) > 0){
			if(flag > 0){
				flag -= (e.wheelDelta/120) || (e.wheelDelta/3);
			}
		}	
		else if(((e.wheelDelta/120) || (e.wheelDelta/3)) < 0){
			if(flag < 28){
				flag -= (e.wheelDelta/120) || (e.wheelDelta/3);
			}
		}	
		if(e.wheelDelta){
			if(e.wheelDelta > 0){
					if( flag > 17 && flag < 28){
						back +=(e.wheelDelta/4);
						information.style.top = back + 'px';
					}
			}
			if(e.wheelDelta < 0){
					if( flag > 18 && flag < 28){
						back +=(e.wheelDelta/4);
						information.style.top = back + 'px';
					}else if( flag == 28){
						back = -300;
						information.style.top = back + 'px';
					}
			}
		}else if (e.detail){
			if(e.detail > 0){
					if( flag > 17 && flag < 28){
						back +=(e.detail*10);
						information.style.top = back + 'px';
					}
			}
			if(e.detail < 0){
					if( flag > 18 && flag < 28){
						back +=(e.detail*10);
						information.style.top = back + 'px';
					}else if( flag == 28){
						back = -300;
						information.style.top = back + 'px';
					}
			}
		}		
	}
	
	if(document.addEventListener){
		document.addEventListener('DOMMouseScroll',scrollFunc ,false )
	}
	window.onmousewheel = document.onmousewheel = scrollFunc;
	//注册鼠标滚轮事件
}


