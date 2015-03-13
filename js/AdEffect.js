//pos(obj)
function pos(obj){
	var lt = {"left":0,"top":0};
	while(obj){
		lt.left += obj.offsetLeft;
		lt.top += obj.offsetTop;
		obj = obj.offsetParent;
	};
	return lt;
}
//viewWH()
function viewWH(){
	var wh = {'width':'','height':''};
	wh.width = $(window).width();
	wh.height =$(window).height();
	return wh;
};
/*对联广告*/
var srcTop = $(document).scrollTop();
function resizeEle(){
	srcTop = $(document).scrollTop();
}
$(function(){
	var leftAd = $(".coupletAdLeft");//左侧广告
	var rightAd = $(".coupletAdRight");//右侧广告
	var eleWidth = 1180;//页面宽度
	var eleTop = 78;//顶部距离
	var clientW = viewWH().width;//可视区宽度
	var adW = $(".coupletAd").width();//广告宽度
	var closeBtn = $(".copletClose");//关闭按钮
	function resetPos(){
		if((clientW - eleWidth)/2 < adW){
			$(leftAd).css({"left":0,"top":srcTop + eleTop},60);
			$(rightAd).css({"right":0,"top":srcTop + eleTop},60);
		}
		if((clientW - eleWidth)/2 >= adW){
			$(leftAd).css({"left":((clientW - eleWidth)/2-adW-5),"top":srcTop + eleTop},60);
			$(rightAd).css({"right":((clientW - eleWidth)/2-adW-5),"top":srcTop + eleTop},60);
		}	
	}
	resetPos();
	$(window).scroll(function () {
		resizeEle();
		resetPos();
	});	
	$(closeBtn).click(function(){
		$(leftAd).animate({"opacity":0});
		$(rightAd).animate({"opacity":0});	
	});
});