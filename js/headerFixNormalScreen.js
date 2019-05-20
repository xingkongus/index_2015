// headerFixNormalScreen code by chenxuan
function C_headerFixNormalScreen(){
	this.div=document.getElementById("fixedHeader");
	this.screenWidth=document.body.clientWidth;
	this.theHeaderDivWidth=1440;
	this.theHeaderDivMiddle=696;
	//if(this.theHeaderDivWidth>this.screenWidth){
		this.div.style.left=String(-(this.theHeaderDivMiddle-this.screenWidth/2))+"px";
	//}
}
function C_footerFixNormalScreen(){
	this.div=document.getElementById("fixedFooter");
	this.screenWidth=document.body.clientWidth;
	this.middleDivWidth=960;
	//if(this.theHeaderDivWidth>this.screenWidth){
		this.div.style.marginLeft=String((this.screenWidth-this.middleDivWidth)/2)+"px";
	//}
}
function C_middleFixDiv(){
	this.div=document.getElementById("middleFixDiv");
	this.screenWidth=document.body.clientWidth;
	this.middleDivWidth=960;
	if(this.middleDivWidth<this.screenWidth){
		this.div.style.marginLeft=String((this.screenWidth-this.middleDivWidth)/2)+"px";
	}
}
new C_headerFixNormalScreen();
new C_footerFixNormalScreen();
try{
	new C_middleFixDiv();
}catch(e){}