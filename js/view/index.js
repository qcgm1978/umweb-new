/**
 * Description:
 *
 * @module
 */
/*首页轮播*/
$(function () {
    var focusBox = $(".focusBox");
    var liElement = $(".focusNum a");
    var urElement = $(".focusMain ul");
    var w = $(".focusMain").width();
    var h = $(".focusMain").height();
    var animated = null;
    var time = 2000;//轮播时间
    var currentPath = 0;//当前索引
    var trueFale = true;//默认true为自动轮播，false为禁止自动轮播
    $(liElement).each(function (index) {
        $(this).mouseenter(function (event) {
            event.preventDefault();
            $(this).addClass("current").siblings().removeClass("current");
            //$(urElement).animate({"top": -index * h});
            var selector = 'li:has([src="' +
                $(this).find('img').attr('src') +
                '"])';
            $('.focusMain').find(selector).prependTo('.focusMain ul')
            currentPath = index;
        });
    });
    //判断是否自动轮播
    if (trueFale) {
        animated = setInterval(autoPaly, time);
        //清除+还原
        $(focusBox).hover(function () {
            clearInterval(animated);
        }, function () {
            animated = setInterval(autoPaly, time);
        });
    }
    //自动轮播函数
    function autoPaly() {
        $(urElement).animate({"top": -309}, function () {
            $(urElement).css('top', 0).find('li:first').appendTo(urElement)

        });
        var $li = $(liElement);
        var $current = $li.eq(currentPath);
        $current.addClass("current").siblings().removeClass("current");
    };
});
/*首页->广告*/
$(function () {
    var bannerAd = $(".bannerAd");
    var bannerLi = $(".bannerEle li");
    var bannerLiLength = $(".bannerEle li").length;
    var bannerMenu = $(".bannerMenu");
    var bannerEleUl = $(".bannerEle ul");
    var w = $(".bannerEle").width();
    var h = $(".bannerEle").height();
    var animatedBanner = null;
    var timeBanner = 2000;//轮播时间
    var currentPathBanner = 0;//当前索引
    var trueFale = true;//默认true为自动轮播，false为禁止自动轮播
    //创建广告导航
    for (var i = 0; i < bannerLiLength; i++) {
        $(bannerMenu).append('<a href="#">' + +'</a>')
    }
    ;
    $(bannerMenu).find("a").eq(0).addClass("current");
    $(".bannerMenu a").each(function (index) {
        $(this).click(function (event) {
            event.preventDefault();
            $(this).addClass("current").siblings().removeClass("current");
            $(bannerEleUl).animate({"left": -index * w});
            currentPath = index;
        });
    });
    //判断是否自动轮播
    if (trueFale) {
        animatedBanner = setInterval(autoShow, timeBanner);
        //清除+还原
        $(bannerAd).hover(function () {
            clearInterval(animatedBanner);
        }, function () {
            animatedBanner = setInterval(autoShow, timeBanner);
        });
    }
    //自动轮播函数
    function autoShow() {
        if (currentPathBanner < bannerLiLength - 1) {
            currentPathBanner++;
        } else {
            currentPathBanner = 0;
        }
        $(bannerEleUl).animate({"left": -currentPathBanner * w});
        $(".bannerMenu a").eq(currentPathBanner).addClass("current").siblings().removeClass("current");
    };
});