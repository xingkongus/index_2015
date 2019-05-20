function start(){
	li_top = [];
	$li_len = $('.sky_mz_ad_ban li').length;
	for (var i = 0;i < $li_len; i++ ) {
		$obj = $('.sky_mz_ad_ban li').eq(i);
		if ($obj[0].id == ''){
			li_top[i] = $obj.offset().top;
		}
	};
}
start();

$('.sky_mz_ad_addban').mouseenter(function (){
	$('.sky_mz_ad_addban_bj').css("background-color","#FC0");
})
$('.sky_mz_ad_addban').mouseleave(function (){
	$('.sky_mz_ad_addban_bj').css("background-color","#fff");
})
$('.sky_mz_ad_addban').click(function (){
	$('.sky_mz_ad_addban_box').fadeOut(300);
	$addban_t=($(this).offset().top)-70;
	$('body').animate({"scrollTop":$addban_t},300);
	addban_w();
})
function addban_w(){
	$li_last=$('.sky_mz_ad_ban li').length;
	var html = "<div class='sky_mz_ad_addban_do_box'><form action='add_ban_img.php?tvtv=tvtv' method='post' enctype='multipart/form-data'><input class='hidden' type='text' name='add_ban_title' value='banner'/><div class='sky_mz_ad_addban_img'><a>banner</a><div class='sky_mz_ad_subban'><label for='file'>文件名：</label><input type='file' name='file' id='file' /><br /><input class='sky_mz_ad_addban_do_sub' type='submit' name='addban_sub' value='开始上传' /></div></div></form></div>";
	$(".sky_mz_ad_ban li:last").html(html);
	addban_sub();
}

function addban_sub(){
    $('input[name=addban_sub').click(function (){
		$addban_name=$('input[name=add_ban_title]').val();
		$addban_url=$('input[name=add_ban_url]').val();
		$addban_file=$('input[name=file]').val();
		
		if($addban_url.indexOf('http://')<0){ //当用户没有填写 http:// 开头时
			$addban_url="http://"+$addban_url;
		}
		
		if($addban_name.replace(/\s/g,"")!=="" && $addban_url.replace(/\s/g,"")!=="" && $addban_file.replace(/\s/g,"")!==""){ //如果内容不为空
		    return true;
		}else{
		    return false;
		}
		
    })
}

function Ajax(_M,_T){
	if(typeof(_T) == "undefined"){
		_T = '';
	}
	$.ajax({ 
		type      : 'post',
		url		  : 'add_ban_img.php?type='+_T+'&tvtv=tvtv',
		//timeout   : 200,
		dataType  : 'json',
		data      : {data : _M},
		success   : function(_msg){
			if(_msg==""){
				alert("Error：001 与服务器失去连接");
				return false;
			}else{
				if(_msg.ret > 0){
				}
				return true;
			}
		} 
	});
}
function TvtvAjax(_M,_T){
	if(typeof(_T) == "undefined"){
		_T = '';
	}
	$.ajax({ 
		type      : 'post',
		url		  : 'ajax.php?tvtv_title='+_T,
		//timeout   : 200,
		dataType  : 'json',
		data      : {data : _M},
		success   : function(_msg){
			if(_msg==""){
				alert("Error：001 与服务器失去连接");
				return false;
			}else{
				alert(_msg);
				return true;
			}
		} 
	});
}

$(".sky_mz_ad_ban li").mousedown(function (){
	var node = 0;
	$(this).children('.fuk_box').clone().appendTo(this);
	$(this).children('.fuk_box').eq(1).addClass('fuk_box_copy');
	$(this).children('.fuk_box').eq(0).addClass('sky_mz_ad_ban_move');
	$(this).mousemove(function(event) {
		$t_top = event.pageY-75;
		$(this).children('.fuk_box').eq(0).css({
			"position" : "absolute",
			"z-index" : "10",
			"top" : $t_top,
		});
		for(var i = 0; i<li_top.length; i++){
			if($t_top >= li_top[li_top.length-1]){
				node = li_top.length-1;
				break;
			}else{
				if(li_top[i] < $t_top && $t_top < li_top[i+1]){
					node = i;
					break;
				}
			}
		}
	}).mouseup(function() {
		$(this).children('.fuk_box').eq(0).removeClass('sky_mz_ad_ban_move');
		$g = $(this).children('.fuk_box_copy').detach();
		$(this).children('.fuk_box').detach();
		$s = $(".sky_mz_ad_ban li").eq(node).children('.fuk_box').detach();
		$(this).append($s);
		$($g).removeClass('fuk_box_copy');
		$(".sky_mz_ad_ban li").eq(node).append($g);
		$post_Ar = [];
		for(var i = 0; i<li_top.length; i++){
			$id = $('.sky_mz_ad_ban li').eq(i).children('.fuk_box').data('id');
			$post_Ar[i] = $id;
		}
		Ajax($post_Ar, 'baner_s');
		$(this).unbind('mousemove mouseup');
	});
});
$('#tvtv_add').unbind('mousedown');
$('.banner_del').click(function() {
	$del = confirm("\u662f\u5426\u5220\u9664 "+$(this).next().find('.sky_mz_ad_ban_txt').text()+" \u5e7b\u706f\u7247\uff1f");
	if($del){
		Ajax($(this).next().find('.fuk_box').data('id'), "banner_del");
	}
});

$(function (){
	var _this = this;
	this.fun = {
		start : $(function (){
			for(var c in _this.even){
				var tmpFun = _this.even[c];
				tmpFun();
			}
		})
	};
	this.even = {
		title : function (){
			$(".tvtv_title_sub").click(function() {
				var val = $("input[name=tvtv_title_t]").val();
				TvtvAjax({tvtv_title : val}, "tvtv");
			});
		}
	};
});