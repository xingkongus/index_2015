function start(){
    $ad_ban_h=($('.sky_mz_ad_ban li').length)*($('.sky_mz_ad_ban li:eq(0)').height()+20);
	$('.sky_mz_ad_ban').css("height",$ad_ban_h);
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
	document.getElementsByClassName("sky_mz_ad_ban")[0].getElementsByTagName("li")[$li_last-1].innerHTML="<div class='sky_mz_ad_addban_do_box'><p class='sky_mz_ad_prompt'>温馨提示：&nbsp;1) 标题尽量缩短在10个字符以内。  2) 图片格式&nbsp;jpg，png，gif&nbsp;且不超过4M</p><form action='add_ban_img.php' method='post' enctype='multipart/form-data'><div class='sky_mz_ad_addban_title'><a>标题&链接地址</a><span style='margin-left:20px;'>标题：</span><input class='sky_mz_ad_addban_txt' name='add_ban_title' /><span style='margin-left:20px;'>url：</span><input class='sky_mz_ad_addban_txt' name='add_ban_url' /></div><div class='sky_mz_ad_addban_img'><a>banner</a><div class='sky_mz_ad_subban'><label for='file'>文件名：</label><input type='file' name='file' id='file' /><br /><input class='sky_mz_ad_addban_do_sub' type='submit' name='addban_sub' value='开始上传' /></div></div></form></div>";
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