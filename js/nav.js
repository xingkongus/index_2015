//µ¼º½Ð§¹û
$(document).ready(function(){
	$('#nav_1').hover(function(){
		$('ul', this).animate({
			top: "+=30px",
			opacity:0.4
		},200).animate({
			top: "+=15px",
			opacity:1
		},100);
	},function(){
		$('ul', this).animate({
			top: "-=15px",
			opacity:0.4
		},200).animate({
			top: "-=30px",
			opacity:0
		},100);
	});
	$('#nav_2').hover(function(){
		$('ul', this).animate({
			top: "+=20px",
			opacity:0.4
		},200).animate({
			top: "+=10px",
			opacity:1
		},100);
	},function(){
		$('ul', this).animate({
			top: "-=20px",
			opacity:0.4
		},200).animate({
			top: "-=10px",
			opacity:0
		},100);
	});

});