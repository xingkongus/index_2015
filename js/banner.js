
$(document).ready(function(){
	var container = $('.container');
	var arrow = $('.arrow');
	var bannerNum = $('.bannerNum');
	var img = $('.pic .img');
	var index = 0;//图的索引
	var playtime = 1500;//播放banner的间隔时间

	//var a = $('.pic img').size();
	for(var i=0; i<3; i++)	bannerNum.append("<span>"+"</span>");
	var span = $('.bannerNum span');
	span.eq(0).addClass('active');
	img.eq(index).fadeIn().siblings().fadeOut();

	//点击事件
	bannerNum.on("click","span",function(){
		index = $(this).index();
		img.eq(index).fadeIn().siblings().fadeOut();
		$(this).addClass('active').siblings().removeClass('active');
	})

	//左右按钮点击事件
	$('.arrow-left').click(function(){
		index = ((index - 1) + 3) % 3;
		img.eq(index).fadeIn().siblings().fadeOut();
		span.eq(index).addClass('active').siblings().removeClass('active');
	});
	$('.arrow-right').click(function(){
		index = ((index + 1) + 3) % 3;
		img.eq(index).fadeIn().siblings().fadeOut();
		span.eq(index).addClass('active').siblings().removeClass('active');
	});

	//设置定时播放
	play = function(){
		img.eq(index).fadeIn().siblings().fadeOut();
		span.eq(index).addClass('active').siblings().removeClass('active');
		index = (index + 1) % 3;
		mytime = setTimeout(play,playtime);
	}
	mytime = setTimeout(play,playtime);
	//设置鼠标放上停止播放
	container.hover(function(){
		clearTimeout(mytime);
	},function(){
		mytime = setTimeout(play,playtime);
	});

	//arrow的出现消失判定
    container.mouseout(function(){
		arrow.hide();
	});
	container.mouseover(function(){
		arrow.show();
	});

});