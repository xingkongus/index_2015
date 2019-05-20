//全局变量声明
var ban_num=$('.sky_mz_banner li').length;  //获取幻灯片数量
var ban_i=0;  //播放幻灯片辅助参数
var ban_time=5*1000  //banner播放间隔时间
var ban_w=($('.sky_mz_centre').width()) - (($('.sky_mz_banner_box').css("border-left-width").replace("px",""))*2);  //banner宽度
var ban_min_w=((($('.sky_mz_centre').width())-22)/ban_num); 

function top_title(){ // all 初始化函数
	$top_h=$('.sky_mz_top').height()+10;
	$box_left=(($('body').width()) - ($('.sky_mz_box').width()))/2;
	$ban_ul_w=ban_w*($('.sky_mz_banner li').length);
    $ban_left=(($('.sky_mz_box').width()) - ($('body').width()))/2 + 10;
	
	if($('body').width()>$('.sky_mz_top_box').width()){ // top平铺
		$ban_logo_rl=(($('body').width() - $('.sky_mz_top_box').width())/2);
		$('.sky_mz_top_logo').css("margin-left",$ban_logo_rl-5);
		$('.sky_mz_top_logo').css("margin-right",$ban_logo_rl);
	}
	
	
	$('.sky_mz_title').animate({marginTop:"0px"},600);
	$('.sky_mz_b_txt_box li').css("width",ban_min_w);
	$('.sky_mz_b_txt_box li:eq('+ban_num+')').css("width","0px");
	$('.sky_mz_banner ul').css("width",$ban_ul_w)
	$('.sky_mz_banner li').css("width",ban_w);
	$('.sky_mz_centre').css("padding-top",$top_h);
	$('.sky_mz_box').css("margin-left",$box_left);
	$('.sky_mz_banner_box').css("width",ban_w);
	$('.sky_mz_banner').css("width",ban_w);
}
top_title();

var ban_gopaly=setInterval("ban_play()",ban_time);
var ban_txt_o_w=$('.sky_mz_b_txt_o').width();

function ban_play(){ //banner 演示
	if(ban_i==0){
		$('.sky_mz_b_txt_o').fadeOut(400);
		$('.sky_mz_b_txt_o:eq(0)').css("display","block");
		$('.sky_mz_banner li').animate({marginLeft:"0px"},600);
	}else{
		$('.sky_mz_banner li:eq('+ban_i+')').css("z-index",ban_i);
	    $('.sky_mz_banner li:eq('+ban_i+')').animate({marginLeft:-ban_w},600);
	}
	$('.sky_mz_b_txt_o:eq('+(ban_i)+')').fadeIn(600);
	ban_i++;
	$('.sky_mz_b_txt_go').delay(600).animate({width:ban_i*(ban_min_w+2)},(ban_time-800));
	if(ban_i==ban_num){
		$('.sky_mz_b_txt_o:eq('+(ban_i)+')').delay((ban_time-600)).fadeIn(600);
	    $('.sky_mz_b_txt_go').delay(200).animate({width:"0px"},400);
		ban_i=0;
	}
	//document.getElementsByClassName("sky_mz_top")[0].innerHTML+=ban_i+"->";
}
ban_play();

// nav 动态样式
$('.sky_mz_t_right_nav ul').mouseenter(function (){
	$(this).animate({marginTop:"0px"},300);
})

$('.sky_mz_t_right_nav ul').mouseleave(function (){
	$(this).animate({marginTop:"20px"},300);
})

//书签关闭按钮效果
$('.sky_mz_user_yes li').mouseenter(function (){
	$(this).find("div[class=sky_mz_user_close]").css("visibility","visible");
})
$('.sky_mz_user_yes li').mouseleave(function (){
	$(this).find("div[class=sky_mz_user_close]").css("visibility","hidden");
})

$('.sky_mz_user_noadd, .sky_mz_user_mark_add2').click(function (){
	$('.sky_mz_user_yes_noadd').fadeOut(300);
	$('.sky_mz_user_addmark').fadeIn(300);
	$('input[name=mark_name]').val("");
	$('input[name=mark_url]').val("");
})
$('.sky_mz_user_addmark_close').click(function (){
	$('.sky_mz_user_addmark').fadeOut(300);
	$('.sky_mz_user_yes_noadd').fadeIn(300);
})

$('.sky_mz_user_mark_add_sub').click(function (){
	$mark_name=$('input[name=mark_name]').val();
	$mark_url=$('input[name=mark_url]').val();
	if($mark_url.indexOf('http://')<0){ //当用户没有填写 http:// 开头时
		$mark_url="http://"+$mark_url;
	}
	if($mark_name.replace(/\s/g,"")!=="" && $mark_url.replace(/\s/g,"")!==""){ //如果内容不为空
		$.ajax({ 
		type:'post',
		url:'ajax.php',
		data:"user_do=add& user_id="+user_uid+"& user_markname="+$mark_name+"& user_markurl="+$mark_url,
		success: function(msg_data){
			if(msg_data==""){
				alert("错误信息！");
				return false;
		    }else{
				location.reload();
			    return true;
			}
		  } 
		}); 
	}
})

$('.sky_mz_user_close').click(function (){
	$mark_id=$(this).find("a").attr("name");
	$.ajax({ 
	type:'post',
	url:'ajax.php',
	data:"user_do=del& user_del_id="+$mark_id,
	success: function(msg_data){
		if(msg_data==""){
			alert("错误信息！");
			return false;
		}else{
			location.reload();
			return true;
		}
	  } 
	}); 
})