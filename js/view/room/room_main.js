/**
 * Room page module
 *
 * @module room
 * @class room

 */
/**
 * Description: program entry
 *
 * @method jquery.ready
 */
$(function () {
    load_emotion();
    load_gift_list();
    load_gift_message();
    load_room_data();
    xchat_start();
    var splash_base = '/room/images/';
    var video_swf_param = {
        server: roompara.mserverip + ":19350",
        room_id: room_id,
        uid: userpara.gid,
        level: userpara.levelinroom,
        token: "video_token",
        nickname: Base64.decode(userpara.nickname_b64),
        splash: [splash_base + "splash.png", splash_base + "mic_free.png", splash_base + "mic_chairman.png"],
        bps: roompara.m_bitrate,
        vq: 90
    };
    video_start(video_swf_param, userpara.roomer);
    load_speak_data();
    load_anchor_fans();
    load_room_bullet();
    setTimeout(function () {
        document.getElementById('p1').scrollIntoView();
    }, 1000);
});
/**
 * Ini video, Requiring attributes from server
 *
 * @method video_start
 * @return {Undefined}
 *
 * @param userpara.roomer {Number}
 * @example
 *     0
 * @param roompara
 * @type {Object}
 * @example
 *     {"server":"182.18.61.9:19350","room_id":201937,"uid":150858271,"level":1,"token":"video_token","nickname":"游客8271","splash":["/room/images/splash.png","/room/images/mic_free.png","/room/images/mic_chairman.png"],"bps":150000,"vq":90}
 * @param room_id
 * @type {Number}
 * @example
 *     201855
 * @param roompara.m_bitrate
 * @type {Number}
 * @example
 *     150000
 * @param userpara.gid
 * @type {Number}
 * @example
 *     150830239
 * @param userpara.levelinroom
 * @type {Number}
 * @example
 *     1
 * @param userpara.nickname_b64
 * @type {String}
 * @example
 *     "5ri45a6iMDIzOQ=="
 */
function video_start(swfParam, roomer) {
    if (roomer) {
        video_swf.Init(swfParam, "video_zone", 1, null);
    }
    else {
        video_swf.Init(swfParam, "video_zone", 0, null);
    }
}
/**
 * Description: insert flash for server side communication
 *
 * @xchat_start
 */
function xchat_start() {
    var xconf_swf_param = {
        ip: roompara.serverip,
        port: 19188,	//roompara.serverport,
        room_id: room_id,
        uid: userpara.gid,
        level: userpara.levelinroom,
        token: "gtoken",
        nickname: Base64.decode(userpara.nickname_b64),
        chatdisable: userpara.chatdisable,
        appdata: Base64.encode(JSON.stringify(userpara))
    };
    chat_panel.init();
    var swfParam = xconf_swf_param;
    if (/^游客/.test(swfParam.nickname)) {
        swfParam.uid = 0
    }
    xMessager.init(swfParam);
    xchat_swf.Init(swfParam, 'xchat', null);
}
function SendGiftCB(r) {
    //console.log('SendGiftCB Called.');
    //console.log(r);
    if (r.RES == 0) {
        $("#returnmsg").html(r.HINT);
        $("#tips02").click();
        //alert(r.HINT);
    }
    if (r.RES == 1) {
        $('#mycoin').html(jQuery.parseJSON(r.PARAM1).coin_after);
        xMessager.giftmessage(r.PARAM0, JSON.parse(r.PARAM1), r.PARAM2);
    }
}
function load_gift_list() {
    var url = '/room/giftList';
    $.get(url, function (result) {
            //console.log('load_gift_message. ' + result);
            $('#liwu').html(result);
            makeGitfTip();
        }
    );
}
function load_gift_message() {
    var url = '/room/gift_message.php';
    $.post(url, function (result) {
            $('#gift_message').html(result);
        }
    );
}
/**
 * Description: load speak data for scroll in the bottom
 *
 * @method load_speak_data
 */
function load_speak_data() {
    var url = '/room/broadcast';
    $.post(url, function (result) {
            $('#spmsg').html(result);
        }
    );
}
function fill_gift_list(gift_list) {
    s = '';
    for (var i = 0; i < gift_list.length; i++) {
        s += '<li><span><img src="' + gift_list[i].gift_img + '"></span>';
        s += '<span class="clGiftList01">' + gift_list[i].gift_sum + '个</span>';
        s += '<span class="clGiftList02">' + gift_list[i].from_nickname + '</span>';
        s += '<span class="clCoin"><i class="ubIco"></i>U' + gift_list[i].total_price + '</span></li>';
    }
    if (s == '') {
        s = '<li><span>还没有收到礼物！</span></li>';
    }
    $('#clGiftList').html(s);
}
/**
 * Description: common method to construct list of today and total
 *
 * @method fill_fan
 */
function fill_fan(fans, d_id) {
    s = '';
    s1 = '';
    for (var i = 0; i < fans.length; i++) {
        var isThree = false;
        if (i == 0) {
            s = '<span class="lrtPic"><img src="' + fans[i].avatar + '" alt=""/><i class="zzMaster"></i><em class="lrtTu"><i class="rankIco rankFirst"></i></em></span><strong>' + fans[i].from_nickname + '</strong><p><b>' + fans[i].total_coin + '</b><i class="ubIco"></i></p>';
            jQuery(d_id + ' .lrtSecond').html(s);
            if (d_id == '#con_fan_1') {
                jQuery('#todayfirst').html('<strong class="ellipsis">' + fans[i].from_nickname + '</strong><p><i class="ubIco"></i><span>' + fans[i].total_coin + '</span></p>');
            } else if (d_id == '#con_fan_3') {
                jQuery('#allfirst').html('<strong class="ellipsis">' + fans[i].from_nickname + '</strong><p><i class="ubIco"></i><span>' + fans[i].total_coin + '</span></p>');
            }
        } else if (i == 1) {
            s = '<span class="lrtPic"><img src="' + fans[i].avatar + '" alt=""/><i class="zzMaster"></i><em class="lrtTu"><i class="rankIco rankSecond"></i></em></span><strong>' + fans[i].from_nickname + '</strong><p><b>' + fans[i].total_coin + '</b><i class="ubIco"></i></p>';
            jQuery(d_id + ' .lrtFirst').html(s);
        } else if (i == 2) {
            s = '<span class="lrtPic"><img src="' + fans[i].avatar + '" alt=""/><i class="zzMaster"></i><em class="lrtTu"><i class="rankIco rankThird"></i></em></span><strong>' + fans[i].from_nickname + '</strong><p><b>' + fans[i].total_coin + '</b><i class="ubIco"></i></p>';
            jQuery(d_id + ' .lrtThird').html(s);
        } else {
            s1 += '<li><span class="lrbNum">' + (i + 1) + '.</span><span class="lrbName">' + fans[i].from_nickname + '</span><span class="lrbUIco">' + fans[i].total_coin + '<i class="ubIco"></i></span></li>';
        }
        //s += '<li class="f-cb"><span class="fl"><img src="/room/images/'+(i+1)+'.png" alt="one" /></span><span class="l-pic"></span><span class="l-name">';
        //if (fans[i].vip){
        //	s += '<img src="/room/images/vip/v' + fans[i].vip + '.gif">';
        //}
    }
    jQuery(d_id + ' .other').html(s1);
}
/**
 * Description: load data for left and right columns
 *
 * @method load_room_data
 */
function load_room_data() {
    var url = '/room/room_data.php?room_id=' + room_id;
    $.post(url, function (result) {
        if (result.res == 0) {
            return;
        }
        var result = jQuery.parseJSON(result);
        var s = '';
        if (result.glamour > 0) {
            //s = '<font color="#EE3A8C">离</font><span class="star_icon star_'+result.glamour_next+'"></span><font color="#EE3A8C">还差</font>' + result.glamour_need + 'U豆';
            //s += '<span class="star_icon star_' + result.glamour + '"></span><span class="l-dj' + result.glamour_need_percent+ '">还差' + result.glamour_need + 'Ｕ豆,升级到</span><span class="star_icon star_' + result.glamour_next + '"></span>';
            s = '<span class="lpLevelStart"><i class="zhuboIco zb' + result.glamour + '"></i></span><div class="lpLevelPro"><p class="lpLevleData" >还差<b>' + result.glamour_need + '</b>U豆到</p><span><i style="width:' + result.glamour_need_percent + '%;"></i></span></div><span class="lpLevelEnd"><i class="zhuboIco zb' + result.glamour_next + '"></i></span>';
            $('#star_levl_next').html(s);
            //s = '<span class="star_icon star_' + result.glamour + '"></span>';
            //$('#star_levl_now').html(s);
        }
        s = '富豪等级：';
        if (result.rich) {
            s += '<span class="rich_icon rich_' + result.rich + '"></span><span class="l-dj' + result.rich_need_percent + '">还差' + result.rich_need + 'Ｕ币,升级到</span><span class="rich_icon rich_' + result.rich_next + '"></span>';
            $('#roomer_title').html(s);
        }
        fill_fan(result.fans[0], '#con_fan_1');
        //fill_fan(result.fans[1],'#con_fan_2');
        fill_fan(result.fans[2], '#con_fan_3');
        fill_gift_list(result.gift_list);
    });
}
function emotion_it(i) {
    //console.log('emotion_it:'+i);
    var s = $("#message_input").val() + "/b" + i;
    jQuery("#message_input").val(s);
    jQuery(".lwfFaceList").hide();
}
function emotion_it_o(i) {
    //console.log('emotion_it:'+i);
    var s = $("#sperkercont").val() + "/b" + i;
    jQuery("#sperkercont").val(s);
    jQuery(".gbFaceList").hide();
}
function load_emotion() {
    var s = '';
    var count = 60;
    for (var i = 0; i < count; i++) {
        s += '<a href="javascript:emotion_it(' + i + ')"><img src="/images/room/emotion/' + i + '.gif" ></a>';
    }
    jQuery(".lwfFaceList").html(s);
    s = s.replace(/emotion_it/g, "emotion_it_o")
    jQuery(".gbFaceList").html(s);
}
/**
 * Description: show cars when page loaded
 *
 * @owshowcar
 * @deprecated Use chat.showCar
 * instead
 */
function owshowcar() {
    if (userpara.car_id > 0) {
        var nickname = nicknameIniVal;
        userpara.nickname = nickname;
        showcar(userpara);
    }
    /*else {
     userpara.nickname = Base64.decode(userpara.nickname_b64);
     member_in_out_hint(userpara, 1);
     }*/
}
function showcar(appdata) {
    var url = '/room/car/id/' + appdata.car_id;
    $.get(url, function (result) {
            var ms = JSON.parse(result);
            if (ms.error == 0) {
                appdata.carmsg = ms.content.msg;
                member_in_out_hint(appdata, 1);
                //message_display.pub(ms.content.msg);
                car_center.show_car(ms.content.swf, 1, ms.content.swf_life);
            }
        }
    );
}
function setFansVal(offset) {
    $('#anchor_fans').text(function (index, txt) {
        var num = Number(/\d+/.exec(txt)[0])
        return txt.replace(/\d+/, num + offset)
    });
}
/**
 * Description: load and render fans num on left-top about anchor info
 *
 * @method load_anchor_fans
 * @deprecated Use load_room_data
 * @since next version
 */

function addfav(roomid) {
    if (!checklogin()) {
        return false;
    }
    jQuery.ajax({
        type: "post",
        data: {"room_id": roomid},
        url: "/room/addFav",
        success: function (data, status) {
            var ms = JSON.parse(data);
            if (ms.error == 0) {
                var str = '<a href="javascript:;" onclick="delfav(' + roomid + ');" class="orangeBtn"><i>取消关注</i></a>';
                jQuery("#userfav").html(str);
                xMessager.anchorfans();
                var offset = 1;
                setFansVal(offset);
            }
        }
    });
}
function delfav(roomid) {
    jQuery.ajax({
        type: "post",
        data: {"room_id": roomid},
        url: "/room/delFav",
        success: function (data, status) {
            var ms = JSON.parse(data);
            if (ms.error == 0) {
                var str = '<a href="javascript:;" onclick="addfav(' + roomid + ');" class="orangeBtn"><i>添加关注</i></a>';
                jQuery("#userfav").html(str);
                xMessager.anchorfans();
                setFansVal(-1);
            }
        }
    });
}
/**
 * Loading recommended rooms if broadcast not starts, to refactor
 * @method load_room_recommended
 * @deprecated Use message_display.load_room_recommended
 *
 * */
function load_room_recommended() {
    var url = "/room/recommend";
    jQuery.post(url, function (result) {
            jQuery("#room_recommended").html(result);
        }
    );
}
/**
 * Description:
 *
 * @class todoCode
 */
/**
 * Description: speaking event bind hidden element, not triggered now(.radioWord not displayed)
 *
 * @event sendspeaker
 * @deprecated
 *
 */
function sendspeaker() {
    var spmsg = jQuery("#sperkercont").val();
    if (spmsg.length < 1) {
        alert("喇叭必须填写内容");
        return false;
    }
    if (spmsg.length > 100) {
        alert("字数不能大于100");
        return false;
    }
    var url = "/room/consume";
    var data = {
        'CONSUMETYPE': 10,
        'FROMGID': fromgidIniVal,
        'OBJ': {
            'MSG': spmsg,
            'room_id': room_id
        }
    }
    jQuery.post(url, JSON.stringify(data), function (result) {
        //console.log(result);
        jQuery("#sperker").hide();
        jQuery("#sperkercont").val("");
        var r = jQuery.parseJSON(result);
        {
            //console.log('call SendspeakerCB');
            SendspeakerCB(r);
        }
    })
        .fail(function () {
            //console.log('error');
            alert('发送小喇叭失败！');
        });
}
function SendspeakerCB(r) {
    //console.log('SendspeakerCB Called.');
    //console.log(r);
    if (r.RES == 0) {
        alert(r.HINT);
    }
    if (r.RES == 1) {
        xMessager.speakermessage(JSON.parse(r.PARAM1));
    }
}