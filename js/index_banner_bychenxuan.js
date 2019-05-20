// index banner code by ChenXuan at 20121105
function C_div(_jq){
	this.div=_jq;
	
	if(_jq!=null){
		this.div=$(_jq)[0];
		this.y=$(_jq).offset().top;
		this.x=$(_jq).offset().left;
		this.width=$(_jq).width();
		this.height=$(_jq).height();
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
}
function C_showStage(){
	C_div.call(this,"#showStage");//继承
	this.clearLastWord=function (_w){
		if(_w.substring(_w.length-1,_w.length)==","){
			return _w.substring(0,_w.length-1);
		}else{
			return _w;
		}
	}
	this.getImgList=this.clearLastWord(($(this.div).attr("imgsrclist"))).split(",");
	this.wordList=this.clearLastWord(($(this.div).attr("wordlist"))).split(",");
	this.urlList=this.clearLastWord(($(this.div).attr("imglinktourl"))).split(",");
}
function C_moveingDiv(_imgList,_urlList){
	C_div.call(this);//继承
	this.addWidth=930;
	this.nowX=0;
	this.width=0;
	this.div=document.createElement("div");
	this.setSelf();
	$(this.div).css("float","left");
	this.div.style.height="268px";
	var len=_imgList.length;
	for(var i=0;i<len;i++){
		this.width+=this.addWidth;
		this.div.style.width=String(this.width)+"px";
		this.add(new C_img(_imgList[i],_urlList[i]));
	}
	this.move=function (_x,_t){
		this.nowX=_x;
		$(this.div).stop().animate({"marginLeft":String(-_x)},_t);
		return this;
	}
}
function C_img(_src,_url){
	C_div.call(this);//继承
	this.div=document.createElement("img");
	this.setSelf();
	this.div.src=_src;
	$(this.div).css("float","left");
	if(_url!=null||_url!=""){
		$(this.div).click(
			function (){
				window.location.href=_url;
			}
		);
	}
}
function C_ball(_s){
	C_div.call(this);//继承
	this.div=document.createElement("div");
	this.setSelf();
	$(this.div).css("float","left");
	this.div.style.width="22px";
	this.div.style.height="22px";
	if(_s){
		this.div.style.backgroundImage="url(img_lib/littleBlueBall.png)";
	}else{
		this.div.style.backgroundImage="url(img_lib/littleBlackBall.png)";
	}
}
function C_bar(_s){
	C_div.call(this);//继承
	this.div=document.createElement("div");
	this.setSelf();
	$(this.div).css("float","left");
	this.div.style.width="250px";
	this.div.style.height="5px";
	this.div.style.marginTop="9px";
	if(_s){
		this.div.style.backgroundColor="#92dcff";
	}else{
		this.div.style.backgroundColor="#000";
	}
	this.setWidth=function (_w){
		$(this.div).width(_w);
		return this;
	}
}
function C_wordLine(_ctrler,_index){
	C_div.call(this);//继承
	this.ctrler=_ctrler;
	this.index=_index;
	this.div=document.createElement("div");
	this.setSelf();
	this.setAbsolute();
	this.div.style.width="250px";
	this.div.style.height="16px";
	this.div.style.fontSize="14px";
	this.div.style.color="#000";
	this.div.style.textAlign="center";
	this.div.style.cursor="pointer";
	this.setWord=function (_s){
		this.div.innerHTML=_s;
		return this;
	}
	this.changeFontColor=function (_colorCode){
		this.div.style.color=_colorCode;
		return this;
	}
	this.setWidth=function (_w){
		$(this.div).width(_w);
		return this;
	}
	$(this.div).click(
		function (){
			this.self.ctrler.runScreen(_index);
		}
	);
	
}
function C_progressBar(_s,_numPic){
	if(_s==null){
		_s=0;
	}
	C_div.call(this);//继承
	this.width=1113*0.83;
	this.numPic=_numPic;
	this.div=document.createElement("div");
	this.setSelf();
	this.div.style.width=String(this.width)+"px";
	this.div.style.height="22px";
	this.barWidth=(this.width-(_numPic+1)*22)/_numPic;
	for(var i=0;i<_numPic;i++){
		this.add(new C_ball(_s)).add(new C_bar(_s).setWidth(this.barWidth));
	}
	this.add(new C_ball(_s));
}
function C_coverProgressBar(_numPic){
	C_div.call(this);//继承
	this.layer=new C_progressBar(true,_numPic);
	this.div=document.createElement("div");
	this.setSelf();
	this.setAbsolute();
	this.div.style.width="0px";
	this.div.style.height="22px";
	$(this.div).css("overflow","hidden");
	this.add(this.layer);
	this.move=function (_s,_t,_f){
		$(this.div).stop().animate({"width":String(_s)+"px"},_t,_f);
		return this;
	}
}
function theCtrler(_screen,_blueBar){
	this.bannerScreen=_screen;
	this.bannerScreen.mother=this;
	this.blueBar=_blueBar;
	this.blueBar.mother=this;
	this.indexScreen=0;
	this.blueBarWidth=this.blueBar.layer.barWidth;
	this.maxPicNum=this.blueBar.layer.numPic;
	this.switchScreen=function (_s,_f){
		this.bannerScreen.move(_s*this.bannerScreen.addWidth,500);
		//$(this.blueBar.div).stop().width(_s*(22+250));
		this.blueBar.move(_s*(22+this.blueBarWidth)+22,500,_f);
		return this;
	}
	this.blueBarLoading=function (_s,_f){
		//$(this.blueBar.div).stop().width(_s*(250+22)+22);
		this.blueBar.move(_s*(22+this.blueBarWidth)+this.blueBarWidth+22,5000,_f);
		return this;
	}
	this.resetScreen=function (_f){
		this.bannerScreen.move(0,500);
		this.blueBar.move(0,500,_f);
		return this;
	}
	this.runScreen=function (_s){
		_s++;
		this.switchScreen(_s-1,
			function (){
				this.self.mother.blueBarLoading(_s-1,
					function (){
						this.self.mother.runScreen(_s);
					}
				)
			}
		);
		if(_s==this.maxPicNum+1){
			_s=0;
			this.resetScreen(
				function (){
					this.self.mother.runScreen(_s);
				}
			);
		}
	}
}

function C_index_banner_bychenxuan(){
	this.banner=new C_div("#index_banner_bychenxuan");
	this.showStage=new C_showStage();
	this.numPic=this.showStage.getImgList.length;
	this.moveingDiv=new C_moveingDiv(this.showStage.getImgList,this.showStage.urlList);
	this.showStage.add(this.moveingDiv);
	
	this.barX=this.banner.x+20;
	this.barY=this.banner.y+this.banner.height+16;
	this.blackProgressBar=(new C_progressBar(null,this.numPic)).setAbsolute().setPosition(this.barX,this.barY);
	this.blueProgressBar=(new C_coverProgressBar(this.numPic)).setPosition(this.barX,this.barY);
	
	this.banner.add(this.blackProgressBar);
	this.banner.add(this.blueProgressBar);
	
	this.ctrlBanner=new theCtrler(this.moveingDiv,this.blueProgressBar);
	this.ctrlBanner.runScreen(0);
	this.widthOfBarInprogressBar=this.ctrlBanner.blueBarWidth;
	
	var addWordX=this.barX+22;;
	for(var i=0;i<this.numPic;i++){
		this.banner.add((new C_wordLine(this.ctrlBanner,i)).setWord(this.showStage.wordList[i]).setWidth(this.widthOfBarInprogressBar).setPosition(addWordX,this.barY-11));
		addWordX+=this.widthOfBarInprogressBar+22;
	}
}
new C_index_banner_bychenxuan();