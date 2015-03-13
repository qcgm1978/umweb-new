
/* 登陆注册层 */
function viewWH(){
	var wh = {'width':'','height':''};
	wh.width = $(window).width();
	wh.height =$(window).height();
	return wh;
};
var srcPx = $(document).scrollTop();
//弹框插件
$(function(){
	//对象+命名空间
	$.fn.windowOpen = function(options){
		//默认值
		var defaults = {
			"clickEle":"loginReward",
			"popEle":"loginRewardPop"
		}
		//合并默认值与参数
		var options = $.extend(defaults,options);
		//操作代码
		this.each(function(){
			//生命动画变量
			var This = $(this);
			var clickEle = "#" + options.clickEle;
			var popEle = "#" + options.popEle;
			var popClose = $(popEle).find("h2 a");
			var popEleH = $(popEle).innerHeight();	
			var popEleW = $(popEle).innerWidth();		
			$(clickEle).click(function(){				
				var posTop = (viewWH().height - popEleH)/2 + srcPx;
				var posLeft = -(popEleW/2)
				$(".windowOpen").css({"display":"none"});
				$(".masterEle").height(document.body.scrollHeight);
				$(".masterEle").show();
				$(popEle).css({"display":"block","top":posTop,"marginLeft":posLeft});	
			});
			$(popClose).click(function(){
				$(popEle).css({"display":"none"});
				$(".masterEle").hide();
			});
			$(window).scroll(function () {
				resizeEle();
			});
			$(window).resize(function () {
				resizeEle();
			});
			function resizeEle(){
				srcPx = $(document).scrollTop();
				$(popEle).css({"top":srcPx + (viewWH().height - popEleH)/2});	
			}
		});
	}
});
$(function(){
	//提示01
	$("#tips01").windowOpen({
		"clickEle":"tips01",
		"popEle":"tips01Pop"
	});	
	//提示02
	$("#tips02").windowOpen({
		"clickEle":"tips02",
		"popEle":"tips02Pop"
	});	
	//提示03
	$("#tips03").windowOpen({
		"clickEle":"tips03",
		"popEle":"tips03Pop"
	});	
	//提示02
	$("#tips04").windowOpen({
		"clickEle":"tips04",
		"popEle":"tips04Pop"
	});	
	//提示02
	$("#tips05").windowOpen({
		"clickEle":"tips05",
		"popEle":"tips05Pop"
	});	
	//提示02
	$("#tips06").windowOpen({
		"clickEle":"tips06",
		"popEle":"tips06Pop"
	});	
	//提示02
	$("#tips07").windowOpen({
		"clickEle":"tips07",
		"popEle":"tips07Pop"
	});	
	//提示02
	$("#tips08").windowOpen({
		"clickEle":"tips08",
		"popEle":"tips08Pop"
	});							
	//注册
	$("#registerBox").windowOpen({
		"clickEle":"registerBox",
		"popEle":"registerPop"
	});	
	//注册成功
	$("#registerokBox").windowOpen({
		"clickEle":"registerokBox",
		"popEle":"registerokPop"
	});	
	//登录
	$("#loginBox").windowOpen({
		"clickEle":"loginBox",
		"popEle":"loginPop"
	});		
})