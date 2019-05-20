window.onload = function(){
	
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
	//document.body.offsetHeight	2315
	//document.body.clientHeight	2315
	//document.body.scrollHeight 	2315
	//window.screen.availHeight 	1040
	//var flag = footTop.offsetTop - document.documentElement.clientHeight - 276;//1519
	var back = 0 ;
	var flag = 0;
	//alert(flag);
	console.log(information.offsetHeight);
		
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
};