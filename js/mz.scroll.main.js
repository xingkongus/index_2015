
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