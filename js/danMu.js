// code by chenxuan
//this is for tvtv_show

function C_div(_jq){
	this.div=_jq;
	if(_jq!=null){
		this.jqObj=$(_jq);
		this.div=$(_jq)[0];
		this.y=Number($('.c_live_ts').height())+10;
		this.x=this.jqObj.offset().left;
		this.width=this.jqObj.width();
		this.height=this.jqObj.height();
		this.setWidth=function (s){
			this.jqObj.width(s);
			return this;
		};
		this.setHeight=function (s){
			this.jqObj.height(s);
			return this;
		}
	}
	this.setSelf=function (){
		this.div.self=this;
	}
	this.setAbsolute=function (){
		this.div.style.position="absolute";
		return this;
	}
	this.add=function (_obj){
		if(_obj.div==null){
			this.div.appendChild(_obj);
		}else{
			this.div.appendChild(_obj.div);
			_obj.father=this;
		}
		return this;
	}
	this.setPosition=function (_x,_y){
		if(_x!=null){
			this.div.style.left=String(_x)+"px";
		}
		if(_y!=null){
			this.div.style.top=String(_y)+"px";
		}
		return this;
	}
	this.createDiv=function (){
		this.div=document.createElement("div");
		return this;
	}
	this.del=function(){
		this.div.parentNode.removeChild(this.div);
	}
}
function C_word(_w,_t){
	C_div.call(this);
	this.createDiv();
	this.setSelf();
	this.flyTime=_t;
	this.remainFlyTime=0;
	this.inWhichLine=0;
	this.div.style.cssText="\
		position:absolute;\
		width:"+_w.length*16+"px\
	";
	this.div.innerHTML=_w;
	
	this.fly=function (){
		var fW=this.div.parentNode.self.jqObj.width();
		var tW=$(this.div).width();
		var speed=(tW+fW)/this.flyTime;
		var showAllTime=tW/speed;
		this.remainFlyTime=this.flyTime-showAllTime;
		$(this.div).animate({"left":String(fW-tW)+"px"},showAllTime,"linear",
			function (){
				this.parentNode.self.lineUsedList[this.self.inWhichLine]=false;
				
				$(this).animate({"left":-String($(this).width())+"px"},this.self.remainFlyTime,"linear",
					function (){
						this.self.del();
					}
				);
			}
		);
		
		
		
		/*$(this.div).animate({"left":-String($(this.div).width())+"px"},this.flyTime,"linear",
			function (){
				this.parentNode.self.xAdd=0;
				this.self.del();
			}
		);*/
		
	}
}
function C_danMu(_n,_t){
	C_div.call(this,_n);
	this.div.style.cssText="\
		width:500px;\
		height:400px;\
		position:absolute;\
		overflow:hidden;\
	";
	this.flyTimeOfWird=_t;
	this.setSelf();
	this.lineList=[];
	this.lineUsedList=[];
	this.lineListLen=parseInt(400/25);
	for(var i=0;i<this.lineListLen;i++){
		this.lineList[i]=i*25;
	}
	
	this.addComment=function (_w){
		var b=(new C_word(_w,this.flyTimeOfWird));
		var yAdd=0;
		for(var i=0;i<this.lineListLen;i++){
			if(!this.lineUsedList[i]){
				yAdd=this.lineList[i];
				this.lineUsedList[i]=true;
				b.inWhichLine=i;
				break;
			}
		}
		b.setPosition(this.x+this.jqObj.width(),this.y+yAdd);
		this.add(b);
		b.fly();
	}
}
