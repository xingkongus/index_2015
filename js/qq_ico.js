function qq_ico(){
	var this_fun=this;
	var ico_all="微笑,撇嘴,色,发呆,得意,流泪,害羞,闭嘴,睡,大哭,尴尬,发怒,调皮,呲牙,惊讶,难过,酷,冷汗,抓狂,吐,偷笑,可爱,白眼,傲慢,饥饿,困,惊恐,流汗,";
	ico_all+="憨笑,大兵,奋斗,咒骂,疑问,嘘,晕,折磨,衰,骷髅,敲打,再见,擦汗,抠鼻,鼓掌,糗大了,坏笑,左哼哼,右哼哼,哈欠,鄙视,委屈,快哭了,阴险,亲亲,吓,可怜,菜刀,";
	ico_all+="西瓜,啤酒,篮球,乒乓,咖啡,饭,猪,玫瑰,凋谢,示爱,爱心,心碎,蛋糕,闪电,炸弹,刀,足球,瓢虫,便便,月亮,太阳,礼物,拥抱,强,弱,握手,胜利,抱拳,";
	ico_all+="勾引,拳头,差劲,爱你,NO,OK,爱情,飞吻,跳跳,发抖,怄火,转圈,磕头,回头,跳绳,挥手,激动,街舞,献吻,左太极,右太极";
	this.ico_a=ico_all=ico_all.split(",");
	this.start=function (a){
		if(a){
		    var ico_i=0;
			var x_1=-19;
			var y_1=-22;
			var aa=0;
			for(var ico_i=0 ; ico_i<105; ico_i++){
				var ico_1_hmtl="<td><a id='q_"+ico_i+"' title='"+ico_all[ico_i]+"' alt='"+ico_all[ico_i]+"' href='javascript:void(0)'><div class='qq_ico_1_d' style='background-position:"+x_1+"px "+y_1+"px;'></div></a></td>";
				var ico_o__html=$('.qq_box tr:eq('+aa+')').html();
				$('.qq_box tr:eq('+aa+')').html(ico_o__html+ico_1_hmtl);
				x_1-=26;
				if((ico_i+1)%a==0 && ico_i!=0){
					aa+=1;
					x_1=-19;
				    y_1-=26;
				}
			}
		}
		var table_h=$('.qq_box table').innerHeight()-2;
		$('.qq_ico_big').css("top","-"+table_h+"px");
		$('.qq_box').css({width:$('.qq_box').innerWidth() - $('.qq_scr').outerWidth(true),height:$('.qq_box table').innerHeight()});
		var src_h=(($('.qq_ico_box').innerHeight())/$('.qq_box').innerHeight())*($('.qq_scr').innerHeight());
		$('.qq_scr_d').css("height",src_h);
	}
	this.ico_big=function (b){
		if(b=="out"){
			$('.qq_ico_big').css("visibility","hidden");
		}else{
		    var right_big=$('.qq_box table').innerWidth()-($('.qq_ico_big').innerWidth())-($('.qq_box td').innerWidth())-4;
			var gif_id=$(b).attr("id");
			var _x=$(b).offset().left - ($('.qq_box').offset().left);
			if(_x<right_big){
				$('.qq_ico_big').css("left",(right_big + $('.qq_box td').innerWidth())+"px");
			}else{
				$('.qq_ico_big').css("left","2px");
			}
			$('.qq_ico_big img').attr("src","img/ico_gif/"+gif_id+".gif");
			$('.qq_ico_big').css("visibility","visible");
		}
	}
	this.ico_cli=function (c,d){
		var _name=$(c).attr("alt");
		var _num=$(c).attr("id").replace("q_","");
		var input_t=$('input[name='+d+']').val();
		$('input[name='+d+']').val(""+input_t+"["+_name+"/"+_num+"]");
	}
	this.scr=function (a,b){
		$('.qq_ico_box').mouseenter(function (){
			 this.onmousewheel=function (){
				if($('.qq_scr').css("display")!="none" && $('.qq_scr_d').innerHeight()!=$('.qq_scr').innerHeight()){
					if($.browser.msie||$.browser.safari){//禁止默认滚动条滚动
							event.returnValue = false;
					}else{
							event.preventDefault();
					}
					$sr_td=event.wheelDelta>0 ? 1:-1;
					this_fun.scr_do(a,b,$sr_td);
				}
			}
        })
		var mon_yy=mou_y=null;
		$(b).mousedown(function (){
		    var q_scr_maxtop=$('.qq_scr').height()-($(b).height());
			$(b).css("background-color","#242424");
			mou_y=($(".qq_scr").offset().top);
			$('body').bind("mousemove",function (){
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); //移动时禁止选择文字
				mon_yy=$m_top=(event.y+document.body.scrollTop-mou_y)-($(b).height()/2);
				if($m_top>=0  && $m_top<=q_scr_maxtop){
					$(b).css("top",$m_top);
					$m_top_b=$m_top/q_scr_maxtop;
					$t_box_t=($(a).outerHeight(true)) - ($('.qq_ico_box').height());
					$(a).css("top",-$m_top_b*$t_box_t);
				}
			});
		});
	}
	var sr_go_time=10;
    this.scr_do=function (a,b,td){//滑轮滚动
		$m_now_t=Number($(b).css("top").replace("px",""));
		$t_now_t=Number($(a).css("top").replace("px",""));
		$t_box_t=($(a).outerHeight(true)) - ($('.qq_ico_box').height());
		var q_scr_maxtop=$('.qq_scr').height()-($(b).height());
		if($m_now_t<=(q_scr_maxtop+1) && $m_now_t>=0){
			if(td==-1){
				if(($m_now_t+10)>=q_scr_maxtop){
					$(b).animate({top:q_scr_maxtop},sr_go_time);
					$(a).animate({top:-$t_box_t},sr_go_time);
				}else{
					$(b).animate({top:$m_now_t+10},sr_go_time);
					$m_now_b=($m_now_t+10)/q_scr_maxtop;
					$(a).animate({top:-$m_now_b*$t_box_t},sr_go_time);
				}
			}else if(td==1){
				if($m_now_t-10<=0){
					$(b).animate({top:0},sr_go_time);
					$(a).animate({top:0},sr_go_time);
				}else{
					$(b).animate({top:$m_now_t-10},sr_go_time);
					$m_now_b=($m_now_t-10)/q_scr_maxtop;
					$(a).animate({top:-$m_now_b*$t_box_t},sr_go_time);
				}
			}
	    }
    }
	this.ico_block=function (a,b){
		this_fun.ico_no_t();
		var _t_top=$(a).offset().top - ($(b).outerHeight(true))-15;
		var _t_left=$(a).offset().left - ($(b).outerWidth(true))+100;
		if($(b).css("visibility")=="hidden"){
		    $(b).css("visibility","visible");
		}else{
		    $(b).css("visibility","hidden");
		}
		$(b).css({top:_t_top,left:_t_left});
		$('.qq_ico_box').mouseleave(function (){
			$(this).css("visibility","hidden");
		})
	}
	this.ico_no_t=function (){
		$('.qq_scr_d').css("top","0px");
		$('.qq_box').css("top","0px");
	}
}
