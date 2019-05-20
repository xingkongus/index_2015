//循环事件执行队列
var listDo=[];
var listObj=[];
var nowDo=0;
function roundDo(){
	var len=listDo.length;
	for(var i=0;i<len;i++){
		nowDo=i;
		if(listDo[i]!=null){
			if(listObj[i]!=null){
			
				listObj[i].fff=listDo[i];
			
				listObj[i].fff();
			}else{
				listDo[i]();
			}
		}
	}
	setTimeout("roundDo()",500);
}
roundDo();
//ajax_s类
function ajax_s(_url,_f,_failConnectF,_successConnectF){
	this.isIe=false;
	this.Ie7Check=false;
	this.failConnectF=_failConnectF;
	this.successConnectF=_successConnectF;
	this.sucessConnect=false;
	//this.canSend=true;
	/*this.sendMsg=function (_s){
		if(this.canSend){
			this.sendMsgNow(_s)
			this.canSend=false;
		}
	}*/
	this.sendMsg=function (_s){
		
		//alert(String(this.hasReadMsg));
		if(!_s){
			_s="2004"+String(this.hasReadMsg)+"@@@@"+"200320032003"+"2001"+"cx"+"2002";
		}else{
			_s="2004"+String(this.hasReadMsg)+"@@@@"+"2001"+_s+"2002"
		}
		//addText(this.hasReadMsg);
		if(this.isIe){
			this.initIE()
		}
		this.net.open("GET",this.url+"?"+encodeURIComponent(_s));
		
		/*if(!this.isIe){
			this.net.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		}*/
		
		try{
			this.net.send();

		}catch(e){
			this.sucessConnect=false;
			this.failConnectF(e);
		}
	}
	this.addRoundDo=function (_f){//添加循环执行的函数
		var doNow=listDo.length;
		listDo[doNow]=_f;
		listObj[doNow]=this;
	}
	this.msgBackFunction=function(){
		//this.self.canSend=true;
		if(this.readyState==4||this.self.isIe){	
			if(this.status==0){
				this.self.sucessConnect=false;
				this.self.failConnectF("不能连接到服务器");
			}else{
				if(!this.self.sucessConnect){
					this.self.sucessConnect=true;
					this.self.successConnectF(); 
					
				}
			}
			if(this.self.isIe){
				if(!this.self.sucessConnect){
					this.self.sucessConnect=true;
					this.self.successConnectF(); 
					
				}
			}
			var getMsg=this.responseText;
			//addText(getMsg);
			if(this.self.isIe){
				//this.net.responseText="";
				//this.net.timeout=1;
				//this.abort();
				//addText(_s);
			}
			if(getMsg.indexOf("200320032003")==-1){
				getMsg=decodeURIComponent(getMsg);
				//addText(getMsg);
				var p2004=getMsg.indexOf("2004");
				if(p2004!=-1){
					var pAT=getMsg.indexOf("@@@@");

					this.self.hasReadMsg=parseInt(getMsg.substr(p2004+4,pAT));
					//alert(this.self.hasReadMsg);
					if(this.self.hasReadMsg==NaN){
						this.self.hasReadMsg=0;
					}
					var getString=getMsg.substr(pAT+4,getMsg.length);
					if(getString!=""){
						
						if(this.self.commentComeDo){
							var msgList=getString.split("|@|");
							var len=msgList.length;
							for(var i=0;i<len;i++){
								var StringInMsgList=msgList[i];
								if (StringInMsgList) {
									this.self.commentComeDo(StringInMsgList);
								};
								
							}
						}
					}
				}
			}
		}
	}
	this.initIE=function (){
		if(!this.Ie7Check){
			this.Ie7Check=true;
			/*if(navigator.userAgent.indexOf("MSIE 7")!=-1){
				alert("您的浏览器太久了，请使用IE8以上的IE浏览器或者谷歌浏览器!");
			}
			if(navigator.userAgent.indexOf("MSIE 6")!=-1){
				alert("您的浏览器太久了，请使用IE8以上的IE浏览器或者谷歌浏览器!");
			}*/
		}
		this.isIe=true;
		this.net=new XDomainRequest();		
		//this.net.timeout=1;
		this.net.self=this;
		this.net.onload=this.msgBackFunction;
		//this.net.onprogress=this.msgBackFunction;
		this.net.onerror=function (){
			this.self.sucessConnect=false;
			this.self.failConnectF("不能连接到服务器");
		}
		this.net.ontimeout=function (){
			this.self.sucessConnect=false;
			this.self.failConnectF("超时");
			//this.self.canSend=true;
		}
	}
	if(navigator.userAgent.indexOf("MSIE")==-1){
		this.net=new XMLHttpRequest();
		this.net.onreadystatechange=this.msgBackFunction;
	}else{
		this.initIE();
	}
	this.net.self=this
	this.url=_url;
	this.hasReadMsg=0;
	this.commentComeDo=_f;
	this.addRoundDo(this.sendMsg);
}