/**
 * Description: 聊天对象
 *
 * @module chat
 * @class chat
 * @constructor
 */
/* 聊天对象 */
function chat(o, type, $scroll) {
    this.chat_type = type;
    this.infosum = 0;        // 信息计数器
    this.lastmsg = [];       // 保存最后几条聊天信息
    this.autoscroll = true;     // 默认自动滚屏
    this.isautoclear = 1;    // 默认自动清屏
    this.bgifs = 1;          // 礼物滚屏计数器
    this.gtime = 0;          // 物滚屏计时器
    this.rspeed = 1;        // 礼物滚屏速度
    this.colors = new Array("FF0000", "800080", "000080", "800000", "008080", "FF8C00");// 礼物颜色库
    this.icolor = '#ff0000';// 礼物默认颜色
    // 免费献花库
    // 军衔
    this.titles = {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        12: '',
        13: '',
        14: '',
        15: '',
        16: '',
        17: '',
        18: '',
        19: '',
        20: '',
        21: '',
        22: ''
    };
    // 爵位
    this.vips = {1: '贵宾', 2: '绅士', 3: '骑士', 4: '领主', 5: '勋爵', 28: '元勋', 29: '元帅', 30: '元首'};
    this.$ = document.getElementById(o);
    /**
     * scrolling elements of chatting box
     *
     * @attribute $scrollEle
     * @required
     * @type Object
     */
    this.$scrollEle = $scroll
    this.kw_filter = null;
    var Freeflowers = new Array(
        '<font style="font-size:8pt"  color=green><b><i>棒棒</font><font style="font-size: 11pt" color=#33cc33>棒棒</font><font style="font- size: 14pt" color=#66ff33>棒棒</font><font style="font-size: 18pt"  color=#99ff66>棒棒</font><font style="font-size:14pt"  color=#ccff66>棒棒</font><font style="font-size: 11pt" color=#ffff66>棒棒</font><font style="font-size: 8pt" color=#ffcc66>棒棒</font><font  style="font-size: 11pt" color=#ff9900>棒棒</font><font style="font- size: 14pt" color=#ff3300>棒棒</font><font style="font-size: 18pt"  color=#ff7c80>棒棒</font><font style="font-size: 14pt"  color=#ff6699>棒棒</font><font style="font-size: 11pt" color=#ff66cc>棒棒</font><font style="font-size: 8pt" color=#ff33cc>棒棒</font><font  style="font-size: 11pt" color=#cc0099>棒棒</font><font style="font- size: 14pt" color=#990099>棒棒</font><font style="font-size: 18pt"  color=purple>棒棒</i></b></font>',
        '<font style="font-size:11pt" color=fuchsia><b>∵鼓掌～☆★∴**☆∵*☆★∴[m:101]☆((啪))((啪))((啪))[m:102]～～～～好听[m:103]</b></font>',
        '<font style="font-size:11pt" color=green><b><i>▄</font><font style="font-size: 11pt" color=#33cc33>▅</font><font style="font-size:11pt" color=#66ff33>▆</font><font style="font-size: 11pt"  color=#ccff33>▇</font><font style="font-size:11pt" color=yellow>█</font><font style="font-size: 11pt" color=#ff9900>献花</font><font style="font-size:11pt" color=#ff3300>█</font><font style="font-size:  11pt" color=#ff7c80>▇</font><font style="font-size: 11pt"  color=#ff3399>▆</font><font style="font-size: 11pt" color=#cc0099>▅</font><font style="font-size:11pt" color=#9933ff>▄</font><font  style="font-size:11pt" color=#6600ff>▃</font><font style="font-size:  11pt" color=#3333cc>好听好听～～</font><font style="font-size:11pt"  color=#a50021>☆★</font><font style="font-size:11pt"  color=#ff5050>∴☆∵</font><font style="font-size:11pt" color=#ffcccc>☆★</font><font style="font-size:11pt" color=#66ffcc>∴☆★∴</font><font style="font-size:11pt" color=#6600ff>▃</font><font style="font-size:11pt" color=#9933ff>▄</i></font><font style="font -size: 11pt" color=#cc0099><i>▅</font><font style="font-size:11pt" face= 宋体 color=#ff3399>▆</font><font style="font-size:11pt"  color=#ff7c80>▇</font><font style="font-size:11pt" color=#ff3300>█</font><font style="font-size:11pt" color=#ff9900>献花</font><font  style="font-size:11pt" color=yellow>█</font><font style="font-size:11pt" color=#ccff33>▇</font><font style="font-size:11pt"  color=#66ff33>▆</font><font style="font-size:11pt" color=#33cc33>▅</font><font style="font-size:11pt" color=green>▄</i></b></font>',
        '<font style="font-size:11pt" color=#33cccc>～~唱的太棒了[m:103]~～☆★/**☆～~我听得都醉了～☆[m:101]★～~给我签个名吧~ ～☆★[m:103]☆～~哇~～！～~太好听了~～</font>',
        '<font style="font-size:11pt" color=red><i>█</font><font style="font-size:11pt" color=#ff9933>好听[m:103]■</font><font style="font-size:11pt" color=yellow>你</font><font style="font-size:11pt" color=#ffcc66>■</font><font style="font-size:11pt" color=#ffcc99>是</font><font style="font-size:11pt" color=#ff99cc>■</font><font style="font-size:11pt" color=#cc99ff>明</font><font style="font-size:11pt" color=#cc0099>■</font><font style="font-size:11pt" color=#9900cc>星</font><font style="font-size:11pt" color=#9933ff>■</font><font style="font-size:11pt" color=#3366ff>好听</font><font style="font-size:11pt" color=blue>▄▅▆</font><font style="font-size:11pt" color=#ff9900>献花</font><font style="font-size:11pt" color=#339966>▆▅▄▃</font><font style="font-size:11pt" color=#cc00ff>好听</font><font style="font-size:11pt" color=#ff33cc>▁▂▃</font><font style="font-size:11pt" color=red>太美了</font><font style="font-size:11pt" color=#ffcc66>▁▂▃</font><font style="font-size:11pt" color=red>献花</font><font style="font-size:11pt" color=aqua>▃▄▅▆</font><font style="font-size:11pt" color=#993366>好听</i></font>',
        '<font style="font-size:11pt" color=#669900><b><i>真好听！[m:100]▁▂▃▄▅▆▇▇▆▅▄▃▂▁[m:100]啪啪啪[m:100]▁▂▃▄▅▆▇▇▆▅▄▃▂▁[m:100]太棒了！[m:100]▁▂▃▄▅▆▇[m:100]我醉了！</b></i></font>',
        '<font style="font-size:11pt" color=red><b>好！好！</font><font  style="font-size:11pt" color=#ff9900>ooo</font><font style="font-size:11pt" color=fuchsia>ooo</font><font style="font-size:11pt"  color=#ff99cc>为你来喝彩！！[m:104]</font><font style="font-size:11pt"  color=ime>ooo</font><font style="font-size:11pt" color=#33cccc>ooo</font><font style="font-size:11pt" color=#339966>掌声响起来</font><font style="font-size:11pt"  color=#99cc00>ooo</font><font style="font-size:11pt"  color=olive>ooo</font><font style="font-size:11pt" color=green>谢谢你的声音</font><font style="font-size:11pt" color=#33cccc>ooo</font><font style="font-size:11pt"  color=aqua>ooo</font><font style="font-size:11pt" color=#00ccff>啪啪啪啪啪</font><font style="font-size:11pt"  color=#3366ff>oooooo</font><font style="font-size:11pt" color=blue>为你来喝彩[m:111]</font><font style="font-size:11pt"  color=#666699>ooo</font><font style="font-size:11pt" color=navy>ooo</b></font>',
        '<font style="font-size:11pt" color=#ff9900>∵*☆★∴☆∵献花[m:100]～☆★∴☆∵*☆[m:112]★∴☆∵好听[m:103]～☆★∴☆∵*☆★∴☆∵鼓掌～☆★∴☆∵[m:111]</font>',
        '<font style="font-size:8pt"  color=#993300>●</font><font style="font- size: 11pt" color=#ff6600>●</font><font style="font-size: 14pt" face= 宋体 color=#ff9900>●</font><font style="font-size: 18pt"  color=#ffcc00>●</font><font style="font-size: 22pt" color=#ffcc00>●[m:101]</font><font style="font-size: 8pt" color=#993300>●</font><font  style="font-size:11pt" color=#ff6600>●</font><font style="font-size:14pt" color=#ff9900>●</font><font style="font-size: 18pt" color=#ffcc00>●</font><font style="font-size:22pt" color=#ffcc00>●[m:101]</font><font style="font-size:8pt" color=#993300>●</font><font style="font-size:11pt" color=#ff6600>●</font><font style="font-size:14pt" color=#ff9900>●</font><font style="font-size:18pt"  color=#ffcc00>●</font><font style="font-size: 22pt" color=#ffcc00>●[m:101]</font><font style="font-size: 9pt" color=#bb0000>●</font><font  style="font-size:11pt" color=#d50000>●</font><font style="font-size:14pt" color=#f00000>●</font><font style="font-size:18pt" color=#ff0c0c>●[m:112]</font><font style="font-size:9pt" color=#bb0000>●</font><font style="font-size:11pt" color=#d50000>●</font><font style="font-size:14pt" color=#f00000>●</font><font style="font-size: 18pt"  color=#ff0c0c>●[m:112]</font><font style="font-size: 9pt" color=#bb0000>●</font><font style="font-size:11pt" color=#d50000>●</font><font style="font-size:14pt" color=#f00000>●</font><font style="font-size:18pt" color=#ff0c0c>●[m:112]</font>',
        '<font style="font-size:11pt" color=blue>哗啦啦---[m:105]</font><font  style="font-size:11pt" color=#00ccff>下雨啦</font><font  style="font-size:11pt" color=#ff6600>｀、｀、｀、｀、</font><font  style="font-size:11pt" color=red>好听</font><font style="font- size: 11pt" color=#cc0099>｀给你雨伞、[m:106]</font><font style="font-size:11pt" color=lime>迷死人了</font><font style="font-size:11pt"  color=#ff6600>｀、｀、｀、</font><font style="font-size:11pt" color=red>鲜花[m:100]</font><font style="font-size:11pt" color=blue>｀、｀、｀、</font><font style="font-size:11pt" color=lime>太美了</font>',
        '<font style="font-size:11pt" color=#ff33cc><b><i>真好听！▁▂▃▄▅▆▇▇▆▅▄▃▂▁[m:103]啪啪啪[m:111]▁▂▃▄▅▆▇▇▆▅▄▃▂▁[m:102]太棒了！[m:111]▇▆▅▄▃▂▁我醉了！</i></b></font>',
        '<font style="font-size:11pt" color=#ff9900><b>唱的真棒[m:111]</font><font style="font-size:11pt" color=purple>鼓掌</font><font style="font-size:11pt" color=red>╰☆☆玫瑰╰☆☆╮[m:100]</font><font style="font-size:11pt" color=yellow>╰☆☆牡丹╰☆☆╮[m:108]</font><font style="font-size:11pt" color=lime>╰☆☆茉莉╰☆☆╮</font><font style="font-size:11pt" color=#cc0099>还有一枝勿忘我</b></font>',
        '<font style="font-size:14pt" color=#9900cc><b><i>∴°★**★°∴</font><font style="font-size: 14pt" color=#ccffcc>▁▂▃</font><font  style="font-size: 14pt" color=#99ff99>▄</font><font style="font-size:14pt" color=#66ff66>▅</font><font style="font-size: 14pt"  color=#33cc33>▆</font><font style="font-size: 14pt" color=green>▇</font><font style="font-size: 14pt" color=fuchsia>真好听</font><font  style="font-size: 14pt" color=red>▇</font><font style="font-size:  14pt" color=#ff9900>▆</font><font style="font-size: 14pt"  color=yellow>▅</font><font style="font-size: 14pt" color=#99cc00>▄</font><font style="font-size: 14pt" color=#00ccff>▃</font><font  style="font-size: 14pt" color=#00faf4>▂</font><font style="font-size:14pt" color=#ccecff>▁</font><font style="font-size: 14pt" color=#ff9900>啪啪啪</i></b></font>',
        '<font style="font-size:11pt" color=blue><i>啪啪啪∵*☆★**∴☆啪啪啪∵*☆★∴☆∵啪啪啪啪∵[m:101]*☆★∴☆啪啪啪∵*☆★[m:103]∴☆∵啪啪啪∵*☆★∴☆</i></font>',
        '[m:111]<font style="font-size:11pt" color=#ccffcc><b><i>▁▂▃</font><font style="font-size:11pt" color=#99ff99>▄</font><font  style="font-size:11pt" color=#66ff66>▅</font><font style="font-size:11pt" color=green>好</font><font style="font-size:11pt" color=#ccffcc>▁▂▃</font><font style="font-size:11pt" color=#99ff99>▄</font><font  style="font-size:11pt" color=#66ff66>▅</font><font style="font-size:  11pt" color=#33cc33>▆</font><font style="font-size:11pt"  color=green>听</font><font style="font-size:11pt" color=#ccffcc>▁▂▃</font><font style="font-size:11pt" color=#99ff99>▄</font><font  style="font-size:11pt" color=#66ff66>▅</font><font style="font-size:11pt" color=#33cc33>▆</font>[m:101]<font style="font-size:11pt" color=#ccffcc>▁▂▃</font><font style="font-size:11pt" color=#99ff99>▄</font><font style="font-size:11pt" color=#66ff66>▅</font><font style="font-size:  11pt" color=#33cc33>▆</font><font style="font-size:11pt"  color=green>好</font><font style="font-size:11pt" color=#ccffcc>▁▂▃</font><font style="font-size:11pt" color=#99ff99>▄</font><font  style="font-size:11pt" color=#66ff66>▅</font><font style="font-size:  11pt" color=#33cc33>▆</font><font style="font-size:11pt"  color=green>听</font></i></b></font>',
        '<font style="font-size:11pt" color=#ff9900><b>艺术家！[m:104]专业歌星[m:103]~~~~ぷ╰哗...☆╮满天星[m:102]ぷ鼓掌ぷぷ╰签名！签名！可否外加唇印?[m:107]</b></font>'
    );
    this.flowers = Freeflowers;
    //初始化聊天框
    this.init();
}
var ImageBase = '';
chat.prototype = {
    // 初始化聊天框高度
    init: function () {
        //this.$.style.height = (document.body.clientHeight-10) + 'px';
        //this.rolling();
    },
    // 时间
    time: function () {
        var date = new Date();
        var now = (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':'
            + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
        return now;
    },
	/**
	 * Description: 在聊天框中插入内容
	 *
	 * @method insert
	 * @param {String} info info to insert
     * @example
     *  "连接服务器成功."
	 */
	insert:function(info)
	{
        this.storelastmsg(info);
        this.autoclear();
        this.$.innerHTML += '<li><span class="lcTime">' + this.time() + '</span>' + info + '</li>';
        this.infosum++;
        this.rolling();
    },
    // 保存最后5条聊天记录
    storelastmsg: function (info) {
        if (this.lastmsg.length >= 0 && this.lastmsg.length < 5) {
            this.lastmsg.push(info);
        } else if (this.lastmsg.length >= 5) {
            this.lastmsg.shift();
            this.lastmsg.push(info);
        }
    },
    // 还原最后5条聊天记录
    restorelastmsg: function () {
        if (this.lastmsg.length > 0) {
            for (var i = 0; i < this.lastmsg.length; i++) {
                this.$.innerHTML += '<li><div class="message_block">' + this.time() + '&nbsp;&nbsp;' + this.lastmsg.shift() + '</div></li>';
            }
        }
        this.rolling();
    },
    // 用户清屏
    userclear: function () {
        this.$.innerHTML = '';
        this.infosum = 0;
    },
    // 自动清屏
    autoclear: function () {
        if ((this.infosum > 50 || this.$.scrollHeight > document.body.clientHeight * 5) && this.isautoclear == 1) {
            this.userclear();
            this.restorelastmsg();
        }
    },
    // 滚屏
    rolling: function () {
        if (this.autoscroll) {
            this.$scrollEle[0].scrollTop = this.$scrollEle[0].scrollHeight - 5;
        }
    },
    // 小礼物
    sgift: function (text, img, sum, unit) {
        var sgimg = '';
        var showsum = sum > 50 ? 50 : sum;
        for (var i = showsum; i > 0; i--) {
            sgimg += img;
        }
        if (showsum > 18) {
            this.insert(text + '&nbsp;' + sgimg + '&nbsp;共' + sum + unit);
        } else {
            this.insert(text + '&nbsp;' + sgimg);
        }
        sgimg = showsum = null;
        this.rolling();
    },
    // 大礼物
    bgift: function (text, img, sum, unit) {
        var self = this;
        this.icolor = this.colors[Math.floor(Math.random() * this.colors.length)];
        if (this.bgifs > sum) {
            window.clearTimeout(this.gtime);
            this.bgifs = 1;
            return;
        }
        this.insert('<span style="color:' + this.icolor + '">' + text + '&nbsp;' + img + '第' + this.bgifs + unit + '</span>');
        this.bgifs++;
        this.gtime = window.setTimeout(function () {
            self.bgift(text, img, sum, unit);
        }, self.rspeed);
    },
    // 显示礼物
    disgift: function (gift, win) {
        var self = this;
        /*
         if(win == 1) // 公聊区
         {
         var showimg = '<img src='+ gift.img +' />';
         if(gift.type=='S'){	 // 批量显示
         this.sgift(gift.text, showimg, gift.sum, gift.unit);
         }
         else if(gift.type=='B'){ // 刷屏显示
         this.bgift(gift.text, showimg, gift.sum, gift.unit);
         }
         }else{// 私聊区
         var showimg = '<img src="'+ gift.img +'" height="20"/>';
         this.insert(gift.text + '&nbsp;' + showimg);
         }
         */
        var showimg = '';
        var count = gift.sum > 10 ? 10 : gift.sum;
        if (gift.type == 'S') {
            for (var i = 0; i < count; i++) {
                showimg += '<span class="gift"><img src="' + gift.img + '" height="20"/></span>';
            }
        }
        else if (gift.type == 'B') {
            for (var i = 0; i < count; i++) {
                showimg += '<span class="gift"><img src="' + gift.img + '" height="40"/></span>';
            }
        }
        var text = '<div class="lcWord">';
        if (gift.tou) {
            var tou = gift.tou.appdata;
            var toadminimg = tou.tolevelinroom == 900 && !tou.towatchman ? '<i class="manageIco"></i>' : '';
            var towatchmanimg = tou.watchman ? '<i class="xunIco"></i>' : '';
            var tosimg = tou.roomer ? '<i class="zhuboIco zb' + tou.starlevel + '"></i>' : '';
            var tovimg = tou.vip2 ? '<i class="vipIco"></i>' : '';
            var totimg = tou.vip && !tou.roomer ? '<i class="jwIco V' + tou.vip + '"></i>' : '';
            var tofimg = Base64.decode(tou.family_name) != "0" ? '<i class="clubIcoText"><em>' + Base64.decode(tou.family_name) + '</em></i>' : '';
            var togid = (tou.nicegid + "").length < 8 ? '(<u>' + tou.nicegid + '</u>)<i class="lhIco"></i>' : '(' + tou.nicegid + ')';
            if (!tou.vip && !tou.roomer && !tou.watchman && (tou.nicegid + "").length <= 8) {
                totimg = '<i class="lmIco"></i>';
            }
        } else {
            var toadminimg = '';
            var towatchmanimg = '';
            var tosimg = '';
            var tovimg = '';
            var totimg = '';
            var tofimg = '';
            var togid = '';
            var lhimg = '';
        }
        var fromu = gift.fromu.appdata;
        var watchmanimg = fromu.watchman ? '<i class="xunIco"></i>' : '';
        var adminimg = fromu.levelinroom == 900 && !fromu.watchman ? '<i class="manageIco"></i>' : '';
        var simg = fromu.roomer ? '<i class="zhuboIco zb' + fromu.starlevel + '"></i>' : '';
        var vimg = fromu.vip2 ? '<i class="vipIco"></i>' : '';
        var timg = fromu.vip && !fromu.roomer ? '<i class="jwIco V' + fromu.vip + '"></i>' : '';
        var fimg = Base64.decode(fromu.family_name) != "0" ? '<i class="clubIcoText"><em>' + Base64.decode(fromu.family_name) + '</em></i>' : '';
        if (!fromu.vip && !fromu.roomer && !fromu.watchman && (fromu.nicegid + "").length <= 8) {
            timg = '<i class="lmIco"></i>';
        }
        var fgid = (fromu.nicegid + "").length < 8 ? '(<u>' + fromu.nicegid + '</u>)<i class="lhIco"></i>' : '(' + fromu.nicegid + ')';
        //text = '<font class=red>[礼物]</font><a href="javascript:void(0)" onClick="select_it('+this.chat_type+','+gift.from_uid+')"><span class="username">' + gift.from_nickname + '</span></a> 向 <a href="javascript:void(0)" onClick="select_it('+this.chat_type+','+gift.to_uid+')"><span class="username">' + gift.to_nickname + '</span></a> 送：' + gift.sum + gift.unit + gift.gift_name;
        text += simg + timg + vimg + fimg + watchmanimg + adminimg + '<span class="blue"><a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + gift.from_uid + ')">' + gift.from_nickname + fgid + '</a></span> 送给 ' + tosimg + totimg + tovimg + tofimg + towatchmanimg + toadminimg + '<span class="yellow"><a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + gift.to_uid + ')">' + gift.to_nickname + togid + '</a></span> 送：<span class="pink">' + gift.sum + gift.unit + gift.gift_name + '</span>';
        this.insert(text + '&nbsp;' + showimg + '</div>');
        window.setTimeout(function () {
            self.rolling();
        }, 1000);
    },
    // 随机显示花
    randflower: function () {
        var fl = this.flowers[Math.floor(Math.random() * this.flowers.length)];
        fl = fl.replace(/\[m:(\d{3})\]/g, "<img src='" + ImageBase + "/room/images/fl/$1.gif'>");
        return fl;
    },
    // 免费献花
    disflower: function (user) {
        var fl = this.randflower();
        var e_id = user.fromwho.gid + "_" + makeid();
        var e_id_1 = user.sendwho.gid + "_" + makeid();
        this.insert('<a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + user.fromwho.gid + ')"><span class="username">' + user.fromwho.nickname + '</span></a>&nbsp;对&nbsp;<a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + user.sendwho.gid + ')"><span class="username">' + user.sendwho.nickname + '</span></a>&nbsp;说：' + fl);
        //install_user_click(e_id,this.chat_type,user.fromwho.gid);
        //install_user_click(e_id_1,this.chat_type,user.sendwho.gid);
    },
    // 人员进出房间
    disinout: function (info) {
        var type = (info.type == 1) ? '进入房间</div>' : '离开房间</div>';
        var prefix = (info.type == 1) ? '<div class="lcWord">欢迎 ' : '<div class="lcWord">欢送 ';//;
        if ((info.nicegid + "").length > 8 && info.type == 1) {
            this.insert(prefix + '<span class="green"><a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + info.gid + ')">' + info.nickname + '</a></span>&nbsp;' + type);
            return;
        }
        var carmsg = '';
        if (parseInt(info.car_id) > 0) {
            carmsg = info.carmsg;
            type = '</div>';
        }
        var timg = info.vip && !info.roomer ? '<i class="jwIco V' + info.vip + '"></i>' : '';
        if (!info.vip && !info.roomer && !info.watchman && (info.nicegid + "").length <= 8) {
            timg = '<i class="lmIco"></i>';
        }
        var vimg = info.vip2 ? '<i class="vipIco"></i>' : '';
        var adminimg = info.levelinroom == 900 ? '<i class="manageIco"></i>' : '';
        var watchmanimg = info.watchman ? '<i class="xunIco"></i>' : '';
        var simg = info.roomer ? '<i class="zhuboIco zb' + info.starlevel + '"></i>' : '';
        var e_id = info.gid + "_" + makeid();
        var nicegid = (info.nicegid + "").length < 8 ? '(<u>' + info.nicegid + '</u>)' : '(' + info.nicegid + ')';
        var lhimg = (info.nicegid + "").length < 8 ? '<i class="lhIco"></i>' : '';
        var fimg = Base64.decode(info.family_name) != "0" ? '<i class="clubIcoText"><em>' + Base64.decode(info.family_name) + '</em></i>' : '';
        if (info.type == 1) { //只显示进入房间信息
            if (info.title || info.vip || info.roomer || info.levelinroom == 900 || info.vip2) {
                this.insert(prefix + simg + timg + vimg + adminimg + watchmanimg + fimg + '<span class="purple"><a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + info.gid + ')">' + info.nickname + nicegid + '</a></span>' + lhimg + carmsg + type);
            } else {
                this.insert(prefix + timg + adminimg + watchmanimg + fimg + '<span class="purple"><a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + info.gid + ')">' + info.nickname + nicegid + '</a></span>' + lhimg + carmsg + type);
            }
        }
    },
    display_chatmessage: function (chatdata) {
        if (this.kw_filter) {
            chatdata.message = chatdata.message.replace(this.kw_filter, '***');
        }
        //alert(chatdata.message);
        //'/' html escaped. &#47;
        chatdata.message = chatdata.message.replace(/&#47;b(\d+)/g, "<img src='" + ImageBase + "/room/images/emotion/$1.gif'>");
        var t = '<div class="lcWord">';
        if (chatdata.touid) {
            var tou = chatdata.tou.appdata;
            var toadminimg = tou.tolevelinroom == 900 && !tou.towatchman ? '<i class="manageIco"></i>' : '';
            var towatchmanimg = tou.watchman ? '<i class="xunIco"></i>' : '';
            var tosimg = tou.roomer ? '<i class="zhuboIco zb' + tou.starlevel + '"></i>' : '';
            var tovimg = tou.vip2 ? '<i class="vipIco"></i>' : '';
            var totimg = tou.vip && !tou.roomer ? '<i class="jwIco V' + tou.vip + '"></i>' : '';
            var tofimg = Base64.decode(tou.family_name) != "0" ? '<i class="clubIcoText"><em>' + Base64.decode(tou.family_name) + '</em></i>' : '';
            var togid = (tou.nicegid + "").length < 8 ? '(<u>' + tou.nicegid + '</u>)<i class="lhIco"></i>' : '(' + tou.nicegid + ')';
            if (!tou.vip && !tou.roomer && !tou.watchman && (tou.nicegid + "").length <= 8) {
                totimg = '<i class="lmIco"></i>';
            }
        }
        var fromu = chatdata.fromu.appdata;
        var watchmanimg = fromu.watchman ? '<i class="xunIco"></i>' : '';
        var adminimg = fromu.levelinroom == 900 && !fromu.watchman ? '<i class="manageIco"></i>' : '';
        var simg = fromu.roomer ? '<i class="zhuboIco zb' + fromu.starlevel + '"></i>' : '';
        var vimg = fromu.vip2 ? '<i class="vipIco"></i>' : '';
        var timg = fromu.vip && !fromu.roomer ? '<i class="jwIco V' + fromu.vip + '"></i>' : '';
        var fimg = Base64.decode(fromu.family_name) != "0" ? '<i class="clubIcoText"><em>' + Base64.decode(fromu.family_name) + '</em></i>' : '';
        var fgid = (fromu.nicegid + "").length < 8 ? '(<u>' + fromu.nicegid + '</u>)<i class="lhIco"></i>' : '(' + fromu.nicegid + ')';
        if (!fromu.vip && !fromu.roomer && !fromu.watchman && (fromu.nicegid + "").length <= 8) {
            timg = '<i class="lmIco"></i>';
        }
        var my_css = "cyan";
        var to_css = "cyan";
        var msg_css = "white";
        if (chatdata.is_my) {
            my_css = "yellow";
        } else {
            if (chatdata.fromu.appdata.roomer) {
                my_css = "pink";
                if (chatdata.is_my_to && chatdata.secret) {
                    msg_css = "orange";
                }
            }
        }
        if (chatdata.is_my_to) {
            to_css = "yellow";
        } else {
            if (chatdata.touid && chatdata.tou.appdata.roomer) {
                to_css = "pink";
            }
        }
        if (!chatdata.is_my && !chatdata.is_my_to) {
            to_css = "yellow";
        }
        if (chatdata.touid == 0) {
            t += simg + timg + vimg + fimg + watchmanimg + adminimg + '<span class="greenLight"><a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + chatdata.uid + ')">' + chatdata.nickname + fgid + '</a></span> 说:<span class="' + msg_css + '">' + chatdata.message + '</span>';
            this.insert(t);
        }
        else {
            if (chatdata.secret) {
                t += simg + timg + vimg + fimg + watchmanimg + adminimg + '<span class="' + my_css + '"><a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + chatdata.uid + ')">' + chatdata.nickname + fgid + '</a></span> 对' + tosimg + totimg + tovimg + tofimg + towatchmanimg + toadminimg + '<span class="' + to_css + '"><a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + chatdata.touid + ')">' + chatdata.to_nickname + togid + '</a></span>[悄悄的]说:<span class="' + msg_css + '">' + chatdata.message + '</span>';
            }
            else {
                t += simg + timg + vimg + fimg + watchmanimg + adminimg + '<span class="' + my_css + '"><a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + chatdata.uid + ')">' + chatdata.nickname + fgid + '</a></span> 对 ' + tosimg + totimg + tovimg + tofimg + towatchmanimg + toadminimg + '<span class="' + to_css + '"><a href="javascript:void(0)" onClick="select_it(' + this.chat_type + ',' + chatdata.touid + ')">' + chatdata.to_nickname + togid + '</a></span>说:<span class="' + msg_css + '">' + chatdata.message + '</span>';
            }
            t += '</div>';
            this.insert(t);
        }
    }
};
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function select_it(type, param) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    if (param) {
        chat_zone_display_user_memu(type, x, y, param);
    }
    param = "";
}