
function start(){
    $ad_ban_h=($('.sky_mz_ad_ban li').length)*($('.sky_mz_ad_ban li:eq(0)').height()+20);
	$('.sky_mz_ad_ban:eq(1)').css("height",$ad_ban_h);
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
	document.getElementsByClassName("sky_mz_ad_ban")[1].getElementsByTagName("li")[$li_last-1].innerHTML="<div class='sky_mz_ad_addban_do_box'><p class='sky_mz_ad_prompt'>温馨提示：&nbsp;1) 图片格式&nbsp;jpg，png，gif&nbsp;且不超过4M</p><form action='add_ban_img_all.php' method='post' enctype='multipart/form-data'><div class='sky_mz_ad_addban_img_tvtv'><a>banner</a><div class='sky_mz_ad_subban'><label for='file'>文件名：</label><input type='file' name='file' id='file' /><br /><input style='display:none' name='add_ban_w' width='0' height='0' value='960' /><input style='display:none' name='add_ban_h' width='0' height='0' value='200' /><input style='display:none' name='admin_type' width='0' height='0' value='<?php echo $get_t; ?>' /><input class='sky_mz_ad_addban_do_sub' type='submit' name='submit_download' value='开始上传' /></div></div></form></div>";
}

$('.tvtv_title_sub').click(function (){
	$title_t=$('input[name=tvtv_title_t]').val();
	if($title_t.replace(/\s/g,"")!==""){
		$.ajax({ 
		type:'post',
		url:'ajax.php',
		data:"tvtv_title="+$title_t,
		success: function(msg_data){
			if(msg_data==""){
				alert("错误信息！");
				return false;
		    }else{
				alert(msg_data);
				location.reload();
			    return true;
			}
		  } 
		}); 
	}
})