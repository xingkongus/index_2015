window.onload = function(){
	var obtn = document.getElementById('btn');
	var tool = document.getElementById('tool');
	var clientHeight = document.documentElement.clientHeight;
	var nav_ifo = document.getElementById('nav_ifo');
	var sch_nav = document.getElementById('sch_nav');
	var timer = null;
	var isTop = true;
	alert('jjj');
	window.onscroll = function(){
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
		if(osTop > clientHeight){
			tool.style.display = "block";
		}else{
			tool.style.display = "none";
		}
	}

	
	obtn.onclick = function(){
		timer = setInterval(function(){
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			var scrollSpeed = Math.floor(osTop/10);
			isTop = true;
			document.documentElement.scrollTop = document.body.scrollTop = osTop - scrollSpeed;
			if(osTop < 20){
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
};