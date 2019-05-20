/**
@author max
@version 13.9.22 
*/

function checkIe67(){
	if(navigator.userAgent.indexOf("MSIE 7")!=-1){
		return false;
	}
	if(navigator.userAgent.indexOf("MSIE 6")!=-1){
		return false;
	}
	return true;
}

var ban_mun=$('.c_banner img').length;  //获取banner数目
var centre_w=$('.tvtv_centre').width();
var ban_time=4*1000;
var ban_i=0;
var sr_down=true; //初始滚动条，是否自动移到最底端
var tvtv_show_tf=true;//是否弹幕
var user_login=false; //用户是否登录

function check_B(){
	var user_B=checkIe67();
	if(user_B==true){
		add_t_show=new C_danMu(".all_tvtv_talk_show",8000); //实例化弹幕
		add_t_show.setWidth("100%");
		add_t_show.setHeight("100%");

		ss=new qq_ico();//实例化QQ表情
		ss.start(14);
		ss.scr(".qq_box",".qq_scr_d");


		//实例化ajax_s,用于消息的传输...
		abc=new ajax_s(user_t_src,
			function (_s){
				commentBack(_s);
			},
			function (_e){
				connected(_e);
			},
			function (){
				connectSucceed()
			}
	);
	}else{
		alert("你的浏览器太旧了，请更换浏览器");
	}
}
check_B();

$ban_li_c=Array(); //banner的mun最多只提供5中颜色
$ban_li_c[0]="#77005d";
$ban_li_c[1]="#3b0163";
$ban_li_c[2]="#003477";
$ban_li_c[3]="#ac6a00";
$ban_li_c[4]="#077a27";
$ban_li_c=shuffle($ban_li_c);

function all_star(){//初始化函数
	$('.all_none').css("height",$(document).innerHeight());
	$('.live_t_control').css("top",($('.c_live_box').height() - $('.live_t_control').height())/2-$('.c_live_box').height());
	$('.live_t_control').css("left",(($('.c_live_t_box').width()) -  ($('.live_t_control').width())));
    $('.c_live_t_box').css("top",($('.c_live_box').height() - $('.live_t_control').height())-2*$('.c_live_box').height());
	$('.c_live_ts').css("top",($('.c_live_box').height() - $('.live_t_control').height())-3*$('.c_live_box').height());
	for($b_i=0; $b_i<ban_mun; $b_i++){
		$('.ban_mun li:eq('+$b_i+')').css("background-color",$ban_li_c[$b_i]);
	}
}
all_star();

var live_t_maxtop=0;

function live_t_t(){//使用户看到最新消息--------滚动条
    $l_t_box_h=$('.live_t_box').innerHeight();
	$l_t_v_h=$('.live_t_view').innerHeight();
    if($l_t_box_h>$l_t_v_h){
		$('.live_t_scroll').fadeIn(300);
		$scroll_h=($l_t_v_h/$l_t_box_h)*($('.live_t_scroll').height());
		if($scroll_h<=25){
			$scroll_h=25;
		}
		$('.live_t_s_m').css("height",$scroll_h);
		live_t_maxtop=($('.live_t_scroll').height())-$scroll_h;
		if(sr_down==true){
			$('.live_t_box').css("top",($l_t_v_h-$l_t_box_h));
			$('.live_t_s_m').css("top",($('.live_t_scroll').height() - $scroll_h));
		}
	}else{
		$('.live_t_scroll').fadeOut(300);
	}
}

$('.tvtv_nav_box div').mouseenter(function (){
	$('.tvtv_nav_box div').removeClass('tvtv_nav_hover');
	$(this).addClass('tvtv_nav_hover');
})

$('.tvtv_nav_box div').mouseleave(function (){
	$('.tvtv_nav_box div').removeClass('tvtv_nav_hover');
	$('.tvtv_nav_box div:eq(1)').addClass('tvtv_nav_hover');
})

function ban_paly(){//banner播放
	for($b_i=0; $b_i<ban_mun; $b_i++){
		$('.ban_mun li:eq('+$b_i+')').css("background-color",$ban_li_c[$b_i]);
	}
	$img_h=$('.c_banner_box li').height();
	$('.c_banner_box ul').animate({marginTop:-ban_i*$img_h},ban_time-2*1000); //停顿时间
	$('.ban_mun li:eq('+ban_i+')').css("background-color","#fff");
	ban_i++;
	if(ban_i==ban_mun){
		ban_i=0;
	}
}
ban_paly();

var ban_p=setInterval("ban_paly()",ban_time);

$('.c_banner').mouseenter(function (){
	ban_p=clearInterval(ban_p);
});

$('.c_banner').mouseleave(function (){
	ban_p=setInterval("ban_paly()",ban_time);
});

$('.ban_mun li').mouseenter(function (){Go_ban_play(this);})

function Go_ban_play(bb){
	ban_i=$(bb).attr("value");
	$('.c_banner_box ul').clearQueue();
	ban_paly();
}

var mon_yy=mou_y=null;
$('.live_t_s_m').mousedown(function (){
    sr_down=false;
	$('.live_t_s_m').css("background-color","#242424");
	mou_y=($(".live_t_scroll").offset().top);
    $('body').bind("mousemove",function (e){
	    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); //移动时禁止选择文字
		var event=e||window.event;
		var mouseYY=event.clientY;
		mon_yy=$m_top=(mouseYY+$(document).scrollTop()-mou_y)-($(".live_t_s_m").height()/2);
		//add_t_show.addComment(mouseYY);
		if($m_top>=0  && $m_top<=live_t_maxtop){
		    $('.live_t_s_m').css("top",$m_top);
			$m_top_b=$m_top/live_t_maxtop;
			$t_box_t=($('.live_t_box').innerHeight() ) - ($('.live_t_view').height());
			$('.live_t_box').css("top",-$m_top_b*$t_box_t);
		}
	});
});

$('body').mouseup(function (){
	$('.live_t_s_m').css("background-color","#000");
	$('body').unbind("mousemove");
	if(mon_yy>(live_t_maxtop-5)){
		sr_down=true;
	};
})

$('.live_t_view').mouseenter(function (){
	 this.onmousewheel=function (){
		sr_down=false;
		if($('.live_t_scroll').css("display")!="none" && $('.live_t_s_m').innerHeight()!=$('.live_t_scroll').innerHeight()){
			if($.browser.msie||$.browser.safari){//禁止默认滚动条滚动
					event.returnValue = false;
			}else{
					event.preventDefault();
			}
			$sr_td=event.wheelDelta>0 ? 1:-1;
			live_sr($sr_td);
		}
	}
})

$('.live_t_view').mouseleave(function (){
	$m_nn_t=Number($('.live_t_s_m').css("top").replace("px",""));
	if($m_nn_t>(live_t_maxtop-5)){
		sr_down=true;
	};
})

var sr_go_time=10;
function live_sr(td){//滑轮滚动
	$m_now_t=Number($('.live_t_s_m').css("top").replace("px",""));
	$t_now_t=Number($('.live_t_box').css("top").replace("px",""));
	$t_box_t=($('.live_t_box').innerHeight()) - ($('.live_t_view').height());
	//add_t_show.addComment(live_t_maxtop);
	if($m_now_t<=(live_t_maxtop+1) && $m_now_t>=0){
		if(td==-1){
			if(($m_now_t+10)>=live_t_maxtop){
				$('.live_t_s_m').animate({top:live_t_maxtop},sr_go_time);
				$('.live_t_box').animate({top:-$t_box_t},sr_go_time);
			}else{
				$('.live_t_s_m').animate({top:$m_now_t+10},sr_go_time);
				$m_now_b=($m_now_t+10)/live_t_maxtop;
				$('.live_t_box').animate({top:-$m_now_b*$t_box_t},sr_go_time);
			}
		}else if(td==1){
			if($m_now_t-10<=0){
				$('.live_t_s_m').animate({top:0},sr_go_time);
				$('.live_t_box').animate({top:0},sr_go_time);
			}else{
				$('.live_t_s_m').animate({top:$m_now_t-10},sr_go_time);
				$m_now_b=($m_now_t-10)/live_t_maxtop;
				$('.live_t_box').animate({top:-$m_now_b*$t_box_t},sr_go_time);
			}
		}
	}
}

$('.live_t_control').mouseenter(function (){
	$('.live_t_c_ico').stop().fadeOut(100);
	$('.live_t_c_all').stop().animate({marginLeft:-($('.live_t_control').width())},300);
})

$('.live_t_control').mouseleave(function (){
	$('.live_t_c_ico').stop().fadeIn(300);
	$('.live_t_c_all').stop().animate({marginLeft:0},300);
})

$('.live_t_control_box li:eq(0)').click(function (){ //开关灯
	$t_off=$('.all_none').css("display");
	if($t_off=="none"){
	    $('.all_none').fadeIn(300);
		$(this).text("开灯");
	}else if($t_off=="block"){
	    $('.all_none').fadeOut(300);
		$(this).text("关灯");
	}
})

$('.live_t_control_box li:eq(1)').click(function (){ //弹幕
    $show_off=$(this).text();
	if($show_off=="弹幕"){
	    $('.c_live_t_box').css("visibility","visible");
		tvtv_show_tf=true;
		$(this).text("关幕");
	}else if($show_off=="关幕"){
	    $('.c_live_t_box').css("visibility","hidden");
		$('.all_tvtv_talk_show *').stop();
		$('.all_tvtv_talk_show').html("");
		tvtv_show_tf=false;
		$(this).text("弹幕");
	}
})

$('.live_t_control_box li:eq(2)').click(function (){ //宽屏、普屏
    $show_bs=$(this).text();
	if($show_bs=="普屏"){
		//$(this).att("1");
		$(this).text("宽屏");
	    show_bs(true);
	}else if($show_bs=="宽屏"){
		//$(this).val("0");
		$(this).text("普屏");
	    show_bs(false);
	}
})

$('.live_t_control_box li:eq(2)').click();

function show_bs(a){//宽屏 or 普屏 切换
	if(a==true){
		$b=5;
		$c=450;
		$show_m=Number($('.c_live_box').css("margin-top").replace("px",""));
		$('.c_live_box').css("width","70%");
		$('.c_live_box').css("height",$c);
		$('#flash_obj').css("height",$c);
		$('.c_live_talk').css("width","30%");
		$('.c_live_talk').css("margin-top",$show_m);
		$('.c_live_talk').css("height",$c);
		$('.live_t_view').css("height","89%");
		$('.live_t_sub').css("margin-left","5px");
		$('.user_tt').css("padding-left","5px");
		$('.user_tt').css("margin-left","5px");
		$('.live_loading').css("width","40px");
		$('.live_loading_a').css("font-size","14px");
		if($('.live_t_in_no').css("display")){
		    $('.live_t_in_no').css("font-size","14px");
			$this_t="你还没登陆呢，~~~我要<a href='http://www.xingkong.us/member.php?mod=logging&action=login'>&nbsp;登陆&nbsp;</a>";
		    $('.live_t_in_no').html($this_t);
		}
	}else{
		$b=15;
		$c=550;
		$('.c_live_box').css("width","100%");
		$('.c_live_box').css("height",$c);
		$('#flash_obj').css("height",$c);
	    $('.c_live_talk').css("width","100%");
	    $('.c_live_talk').css("height","250px");
		$('.c_live_talk').css("margin-top","10px");
		$('.live_t_view').css("height","80%");
		$('.live_t_sub').css("margin-left","10px");
		$('.user_tt').css("padding-left","15px");
		$('.user_tt').css("margin-left","20px");
		$('.live_loading').css("width","380px");
		$('.live_loading_a').css("font-size","16px");
		if($('.live_t_in_no').css("display")){
		    $('.live_t_in_no').css("font-size","18px");
			$this_t="你还没登陆呢，只能看评论喔~~~我要<a href='http://www.xingkong.us/member.php?mod=logging&action=login'>&nbsp;登陆&nbsp;</a>啪啪啪啪 ";
		    $('.live_t_in_no').html($this_t);
		}
	}
	var l_flash_w=$('.c_live_box').width();
	$('#flash_obj').css("width",l_flash_w);
	$('.live_t_box').css("width",($('.live_t_view').width() - 2*Number($('.live_t_box').css("padding-left").replace("px",""))- $('.live_t_scroll').outerWidth(true)- $b));
	if(user_uid!=0){
		$sub_w=$('.live_t_sub').outerWidth(true)+5;
		$inp_m=Number($('.user_tt').css("margin-left").replace("px",""));
		$inp_p=Number($('.user_tt').css("padding-left").replace("px",""));
		$inp_p+=Number($('.user_tt').css("padding-right").replace("px",""));
		$('.user_tt').css("width",$('.live_t_in').width() - $inp_p - $sub_w - $inp_m);
	}
	all_star();
	live_t_t();
	
}

function shuffle(o){ //乱序函数
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function live_t_sub_d(){
	$(this).css("background-color","#005fed");
	user_send();
}

function live_t_sub_u(){
	$(this).css("background-color","#06F");
	$('input[name=user_t]').focus();
}

function user_t_f(){
	var send_msg=new Array();
	$(document).keydown(function (_bb){
			//add_t_show.addComment("key has been down");
			var bb=_bb||event||window.event;
		  if(bb.keyCode=="13" || (event.ctrlKey && bb.keyCode=="13") ){ //发送
		       user_send();
		  }
		  if(event.ctrlKey && bb.keyCode=="82"){
			  if(bb && bb.preventDefault) {
			      bb.preventDefault();
			  }else{
			      window.event.returnValue = false;
			  }
			  ss.ico_block('.qq_ico_go',".qq_ico_box")
		  }
    });
}

function user_add(msg){
	if(msg=="yes"){
		$('.live_t_sub').css("background-color","#06F");
	    $('input[name=user_t]').bind("focus",user_t_f);
		$('.live_t_sub').bind("mousedown",live_t_sub_d);
		$('.live_t_sub').bind("mouseup",live_t_sub_u);
	}else if(msg=="no"){
		$('.live_t_sub').css("background-color","#999");
	    $('input[name=user_t]').unbind("focus");
		$('.live_t_sub').unbind("mousedown");
		$('.live_t_sub').unbind("mouseup");
	}
}
var send_i=0;
function user_send(){
	$user_txt=$('input[name=user_t]').val();
	if(send_i==0 && $user_txt.length<200){
	    $('input[name=user_t]').val("");
	}
	if($user_txt.replace(/[ ]/g,"")!="" && send_i==0 && $user_txt.length<200){
		$u_txt=user_uid+"|,|"+user_name+"|,|"+$user_txt;
		abc.sendMsg($u_txt);
		sr_down=true;
		send_i=1;
		setTimeout("send_i=0",2*1000) //限制只能1秒提交一次
	}
}

//检测是否加载
function connected(a){
	if(user_uid!=0 && a==""){
		connectSucceed();
	}else{
		$('.live_load_d').css("display","block");
		$('.live_t_yes').css("display","none");
		$(".live_loading_a")[0].innerHTML="错误："+a;
		$('.live_loading_a').css("color","#ff0000");
    }
}

function connectSucceed(){ //登录成功
    if(user_uid!=0){
		user_login=true;
		$('.live_load_d').css("display","none");
		$('.live_t_yes').css("display","block");
		user_add("yes");
	}
}

function connectFailed(){
	user_add("no");
}
function admin_dos(dos){
	if(dos[1]=="-s"){
		if(dos[2]=="-t" && dos[3]){
		    setTimeout("window.opener=null;window.open('','_self');window.close()",dos[3]*1000);
		}else{
		    setTimeout("window.opener=null;window.open('','_self');window.close()",1*1000);
		}
	}else if(dos[1]=="-r"){
		if(dos[2]=="-t" && dos[3]){
		    setTimeout("window.location.reload();",dos[3]*1000);
		}else{
		    setTimeout("window.location.reload();",1*1000);
		}
	}
}

function commentBack(_t){//接收信息
	$u_tt=_t.split("|,|");
	var adm_dos=$u_tt[2].indexOf('shutdown');
	if(adm_dos!=-1){
		var adm_d=$u_tt[2].split(' ');
		admin_dos(adm_d);
	}else{
		var dd=$u_tt[2].replace(/</g,"&lt;");
		var dd=dd.replace(/>/g,"&gt;");
		var cc=dd.replace(/\[[^\/]*\/([\s\S]*?)\]/mg,'<img src="img/ico_gif/q_$1.gif">');
		$super_t1=cc.split("##"); //只用16进制颜色
		$super_t2=cc.split("$$"); //只用颜色别名
		$super_t3=cc.split("**"); //链接
		if($u_tt[0]==user_uid){
			$u_color="#333399";
		}else{
			$u_color="#993333";
		}
		$user_a_s="target='_blank' href='http://www.xingkong.us/home.php?mod=space&uid="+$u_tt[0]+"&do=profile' style='color:"+$u_color+"'";
		if($super_t1[1]!=undefined){
			$all_t="<p><a "+$user_a_s+" >&nbsp;@"+$u_tt[1]+"&nbsp;</a><a>说：</a><a style='color:#"+$super_t1[1]+";'>"+$super_t1[0]+"</a></p>";
		}else if($super_t2[1]!=undefined){
			$all_t="<p><a "+$user_a_s+" >&nbsp;@"+$u_tt[1]+"&nbsp;</a><a>说：</a><a style='color:"+$super_t2[1]+";'>"+$super_t2[0]+"</a></p>";
		}else if($super_t3[1]!=undefined){
			if($super_t3[1].indexOf('http://')<0){ //当用户没有填写 http:// 开头时
				$super_t3[1]="http://"+$super_t3[1];
			}
			$all_t="<p><a "+$user_a_s+" >&nbsp;@"+$u_tt[1]+"&nbsp;</a><a>说：</a><a target='_blank' href='"+$super_t3[1]+"' >"+$super_t3[0]+"</a></p>";
		}else{
			$all_t="<p><a "+$user_a_s+" >&nbsp;@"+$u_tt[1]+"&nbsp;</a><a>说：</a><a>"+$super_t1[0]+"</a></p>";
		}
		var old_html=$('.live_t_box').html();
		$('.live_t_box').html(old_html+$all_t);
		if(tvtv_show_tf==true){
			live_show(dd);
		}
		live_t_t();
	}
}

function live_show(str){//添加弹幕内容
	var str_=str.replace(/\[[^\/]*\/([\s\S]*?)\]/mg,'');
	$super_t1=str_.split("##"); //只用16进制颜色
	$super_t2=str_.split("$$"); //只用颜色别名
	$super_t3=str_.split("**"); //链接
	if($super_t1[1]!=undefined){
	    $all_t="<a style='color:#"+$super_t1[1]+";'>"+$super_t1[0]+"</a>";
	}else if($super_t2[1]!=undefined){
		$all_t="<a style='color:"+$super_t2[1]+";'>"+$super_t2[0]+"</a>";
	}else if($super_t3[1]!=undefined){
		$all_t="<a>"+$super_t3[0]+"</a>";
	}else{
	    $all_t="<a>"+$super_t1[0]+"</a>";
	}
	add_t_show.addComment($all_t); //调用类
}

$('.live_t_control_box a').mouseenter(function (){
	$(this).css("color","#0099FF");
})

$('.live_t_control_box a').mouseleave(function (){
	$(this).css("color","#ffffff");
})

setTimeout("$('.c_live_ts').fadeOut(300);add_t_show.y=10;",60*1000);

$('.qq_box a').mouseenter(function (){ss.ico_big(this)});
$('.qq_box a').mouseleave(function (){ss.ico_big("out")});
$('.qq_box a').click(function (){ss.ico_cli(this,"user_t");$('input[name=user_t]').focus();});

$('.qq_ico_go').click(function(){ss.ico_block(this,".qq_ico_box");$('input[name=user_t]').focus();})

//footer自适应1024屏
function C_footerFixNormalScreen(){
	this.div=document.getElementById("footerForIndex");
	this.divHeader=$(".tvtv_nav");
	this.screenWidth=document.body.clientWidth;
	
	this.theHeaderDivWidth=1400;
	this.theHeaderDivMiddle=696;
	if(this.theHeaderDivWidth>this.screenWidth){
		this.div.style.marginLeft=String(-(this.theHeaderDivMiddle-this.screenWidth/2))+"px";
		this.div.style.minWidth="1200px";
		this.divHeader.css("margin-left",String(-(this.theHeaderDivMiddle-this.screenWidth/2))+"px");
	}
}
//new C_footerFixNormalScreen()