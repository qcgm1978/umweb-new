/**
 * Description: common modules
 *
 * @module SiteCommon
 * @class SiteCommon
 * @static
 */
window.SiteCommon = {
    anchorVal: 4,//todo roomer is 0 or 1 currently, set 4 temp
    EMOTION_GIF_PATH:"/images/room/emotion/",
    SWF_DIR: '/swf/',
    isAnchor: function (roomer) {
        return roomer == this.anchorVal
    },
    setChatDialog: function ($ele, func) {
        $ele.keypress(function (event) {
            if (event.which == 13) {
                func.call(this, $ele);
            }
        });
    },
    /**
     *  @method isMaxUserName
      * @param begin 截取开始的索引
      * @param num 截取的长度
      */
    substrTrad: function (txt, begin, num) {
        var ascRegexp = /[^\x00-\xFF]/g, i = 0;
        while (i < begin) (i++ && this.charAt(i).match(ascRegexp) && begin--);
        i = begin;
        var end = begin + num;
        while (i < end) (i++ && txt.charAt(i).match(ascRegexp) && end--);
        return txt.substring(begin, end);
    }
}
/*二级页面左侧导航*/
$(function () {
    var menuSide = $(".menuSide");
    $(".menuSide dl").each(function (index) {
        var dds = $(this).find("dd").length;
        var dlDefaultHeight = 35;
        var dtDefaultHeight = 35;
        $(this).css({"height": dlDefaultHeight});
        var className = $(this).hasClass("current");
        if (className) {
            $(this).animate({"height": dds * dlDefaultHeight + dtDefaultHeight});
        }
        ;
        $(this).click(function (event) {
            var ddLength = $(this).find("dd").length;
            $(this).animate({"height": ddLength * 35 + dtDefaultHeight}).siblings().animate({"height": dtDefaultHeight});
        });
    });
});
function pos(obj) {
    var lt = {"left": 0, "top": 0};
    while (obj) {
        lt.left += obj.offsetLeft;
        lt.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    ;
    return lt;
}
//viewWH()
function viewWH() {
    var wh = {'width': '', 'height': ''};
    wh.width = $(window).width();
    wh.height = $(window).height();
    return wh;
};
//scrollLT
function scrollLT() {
    var lt = {'left': '', 'top': ''};
    lt.left = document.body.scrollLeft || document.documentElement.scrollLeft;
    lt.top = document.body.scrollTop || document.documentElement.scrollTop;
    return lt;
};
/* 登陆注册层 */
$(function () {
    SiteCommon.setChatDialog($('.controlGroup input'), function (data) {
        $('.pubLinks:visible').click()
    })
});
function viewWH() {
    var wh = {'width': '', 'height': ''};
    wh.width = $(window).width();
    wh.height = $(window).height();
    return wh;
};
var srcPx = $(document).scrollTop();
//弹框插件
$(function () {
    //对象+命名空间
    $.fn.windowOpen = function (options) {
        //默认值
        var defaults = {
            "clickEle": "loginReward",
            "popEle": "loginRewardPop"
        }
        //合并默认值与参数
        var options = $.extend(defaults, options);
        //操作代码
        this.each(function () {
            //生命动画变量
            var This = $(this);
            var clickEle = "#" + options.clickEle;
            var popEle = "#" + options.popEle;
            var popClose = $(popEle).find("h2").find('a');
            var popEleH = $(popEle).innerHeight();
            var popEleW = $(popEle).innerWidth();
            $(clickEle).click(function () {
                var posTop = (viewWH().height - popEleH) / 2 + srcPx;
                var posLeft = -(popEleW / 2)
                $(".windowOpen").css({"display": "none"});
                $(".masterEle").height(document.body.scrollHeight);
                $(".masterEle").show();
                $(popEle).css({"display": "block", "top": posTop, "marginLeft": posLeft});
            });
            $(popClose).click(function () {
                $(popEle).css({"display": "none"});
                $(".masterEle").hide();
            });
            $(window).scroll(function () {
                resizeEle();
            });
            $(window).resize(function () {
                resizeEle();
            });
            function resizeEle() {
                srcPx = $(document).scrollTop();
                $(popEle).css({"top": srcPx + (viewWH().height - popEleH) / 2});
            }
        });
    }
});
$(function () {
    //提示01
    $("#tips01").windowOpen({
        "clickEle": "tips01",
        "popEle": "tips01Pop"
    });
    //提示02
    $("#tips02").windowOpen({
        "clickEle": "tips02",
        "popEle": "tips02Pop"
    });
    //提示03
    $("#tips03").windowOpen({
        "clickEle": "tips03",
        "popEle": "tips03Pop"
    });
    //提示02
    $("#tips04").windowOpen({
        "clickEle": "tips04",
        "popEle": "tips04Pop"
    });
    //提示02
    $("#tips05").windowOpen({
        "clickEle": "tips05",
        "popEle": "tips05Pop"
    });
    //提示02
    $("#tips06").windowOpen({
        "clickEle": "tips06",
        "popEle": "tips06Pop"
    });
    //提示02
    $("#tips07").windowOpen({
        "clickEle": "tips07",
        "popEle": "tips07Pop"
    });
    //提示02
    $("#tips08").windowOpen({
        "clickEle": "tips08",
        "popEle": "tips08Pop"
    });
    //提示02
    $("#tips09").windowOpen({
        "clickEle": "tips09",
        "popEle": "tips09Pop"
    });
    //注册
    $("#registerBox").windowOpen({
        "clickEle": "registerBox",
        "popEle": "registerPop"
    });
    //注册成功
    $("#registerokBox").windowOpen({
        "clickEle": "registerokBox",
        "popEle": "registerokPop"
    });
    //登录
    $("#loginBox").windowOpen({
        "clickEle": "loginBox",
        "popEle": "loginPop"
    });
    //girl
    $("#girlBox").windowOpen({
        "clickEle": "girlBox",
        "popEle": "girlPop"
    });
    //remark
    $("#tdBox").windowOpen({
        "clickEle": "tdBox",
        "popEle": "tdPop"
    });
})