/**
 * Provides chat interaction
 *
 * @module xchat_swf
 */
function CalcRank(appdata) {
    var score = 0;

    if (appdata.roomer) {
        score = 2147483648; //0x80000000
        return score;
    }

    if (appdata.watchman) {
        score = 1048576 * 7;//0x40000,1<<18
    }
    //if (appdata.vip>=28){
    if (appdata.vip && appdata.vip < 100) {
        score += appdata.vip * 524288;//0x100000
    }
    //}


    //if (appdata.agency){
    //score += 524288;//0x80000,1<<19
    //}


    if (appdata.vip2) {
        score += appdata.vip2 * 262144;//0x100000
    }
    if (appdata.levelinroom == 900) {
        score += 131072;//0x20000,1<<17
    }
    //score += appdata.vip;
    if (appdata.levelinroom == 100) {
        score += 65535;//0x10000,1<<16
    }

    if (appdata.vip && appdata.vip >= 100) {
        score += appdata.vip;//0x100000
    }
    //score += appdata.title*8;

    /*if (appdata.vip<=5){
     score += appdata.vip;
     }*/

    return score;
}
/**
 * Description: Rendering users list
 *
 * @class User
 * @static
 * @param {Number} uid {Number} level {Object} appdata
 * @example
 *  var user = new User(32035941,4,{...});
 *
 */
function User(uid, level, appdata) {
    this.uid = uid;
    this.level = level;
    this.init_level = level;
    this.appdata = appdata;
    this.rank = CalcRank(appdata);
    
}

User.prototype = {
    hint: function () {
        //return this.appdata.nickname;

        var s;

        s = '<li';
        if ((this.appdata.nicegid + "").length < 8) {
            s += ' class="lianghao"';
        }
        s += '><div class="lvlName"><span>' + this.appdata.nickname + '</span><i>(' + this.appdata.nicegid + ')';
        if ((this.appdata.nicegid + "").length < 8) {
            s += '<em class="lhIco"></em>';
        }
        s += '</i></div>';
        s += '<div class="lmlInfor">';
        //if (this.appdata.roomer || this.appdata.title>0 || this.appdata.vip>0 || this.appdata.vip2>0 || this.appdata.watchman>0 || this.level==900 || this.appdata.agency>0){
        if (this.appdata.roomer) {
            s += '<i class="zhuboIco zb' + this.appdata.starlevel + '"></i>';
        }
        else {
            if (this.appdata.title > 999999999) {
                s += '<img src="/room/images/title/t' + this.appdata.title + '.gif">';
            }
            if (this.appdata.vip > 0) {
                s += '<i class="jwIco V' + this.appdata.vip + '"></i>';
            } else {
                if ((this.appdata.nicegid + "").length < 9 && this.appdata.watchman <= 0 && !this.appdata.roomer) {
                    s += '<i class="lmIco"></i>';
                }
            }
            if (this.appdata.vip2 > 0) {
                s += '<i class="vipIco"></i>';
            }
            if (this.appdata.watchman > 0) {
                s += '<i class="xunIco"></i>';
            }
            else {
                if (this.level == 900) {
                    s += '<i class="manageIco"></i>';
                }
            }
            if (this.appdata.agency > 0) {
                s += '<img src="/room/images/role/r128.gif">';
            }
        }

        //}
        if (this.appdata.family_name && Base64.decode(this.appdata.family_name) != "0") {
            s += '<i class="clubIcoText"><em>' + Base64.decode(this.appdata.family_name) + '</em></i>';
        }
        //if (this.appdata.family_id){
        //	s += '<img src="/upload/family_img/'+this.appdata.family_id+'.png">';
        //}
        s += '</div></li>';
        return s;
    },

    IsAdmin: function () {
        if (this.level == 900)
            return true;
        if (this.appdata.watchman > 0)
            return true;
        return false;
    },

    Selected: function () {
        if ($("#message_to option[value='" + this.uid + "']").length == 0) {
            //$("#message_to").val(this.appdata.nickname);
            $("#message_to").append(new Option(this.appdata.nickname, this.uid))
        }
        $("#message_to").val(this.uid);
        g_UserList.UserSelected(this.uid);
    },

    AddToAdminListUI: function () {
        var element = $("<li>").attr("id", 'a_' + this.uid).append(this.hint()
        );
        var room_member_list = '#con_th_2';
        $(room_member_list).append(element);


        var CB_Para = this;
        $("#a_" + this.uid).click(function (e) {

            var cb_para = CB_Para;
            cb_para.DisplayMenu(cb_para, e.pageX, e.pageY);
        });
    },

    AddToMemberListUI: function (before_user) {
        var data = {user: this};
        var element = $("<li>").attr("id", this.uid).append(this.hint()
        ).click(data, function (event) {
                //$(this).addClass("active");
                ////event.data.user.Selected();
            });
        if (before_user == null) {
            var room_member_list = '#con_th_1';
            $(room_member_list).append(element);

        }
        else {
            $("#" + before_user.uid).before(element);

        }

        var CB_Para = this;
        $("#" + this.uid).mouseenter(function (e) {
            var cb_para = CB_Para;
            //cb_para.DisplayMenu(cb_para);
        });
        $("#" + this.uid).mouseout(function (e) {
            //chat_panel.set_hidemenu_flag();
        });
        $("#" + this.uid).click(function (e) {

            var cb_para = CB_Para;
            cb_para.DisplayMenu(cb_para, e.pageX, e.pageY);
        });

        if (this.IsAdmin()) {
            this.AddToAdminListUI();
        }
    },

    DisplayMenu: function (para, x, y) {

        g_UserList.menu_selected_uid = para.uid;

        this.ControlMenuItem(para);

        var viewHeight = $(window).height();
        var useMeHeight = $(".userMenu").height();
        var userMenu = $(".userMenu");
        var info = '<h2><strong>' + para.appdata.nickname + '</strong><span>' + para.uid + '</span></h2><p>';
        if (para.appdata.roomer) {
            info += '<i class="zhuboIco zb' + para.appdata.starlevel + '"></i>';
        }
        if (para.appdata.vip > 0) {
            info += '<i class="jwIco V' + para.appdata.vip + '"></i>';
        } else {
            if ((para.appdata.nicegid + "").length < 9 && para.appdata.watchman <= 0 && !para.appdata.roomer) {
                info += '<i class="lmIco"></i>';
            }
        }
        if (para.appdata.vip2 > 0) {
            info += '<i class="vipIco"></i>';
        }
        if (para.appdata.watchman > 0) {
            info += '<i class="xunIco"></i>';
        }
        else {
            if (para.level == 900) {
                info += '<i class="manageIco"></i>';
            }
        }
        if (para.appdata.family_name && Base64.decode(para.appdata.family_name) != "0") {
            info += '<i class="clubIcoText"><em>' + Base64.decode(para.appdata.family_name) + '</em></i>';
        }
        info += '</p><span class="umInforCorner"></span>';
        $(".umInfor").html(info);
        viewHeight = $(window).height();
        //$(this).addClass("current").siblings().removeClass("current");
        $(userMenu).css({"display": "block", "left": x + 10, "top": y + 10});
        //alert(viewHeight);
        if (y + 10 < viewHeight) {
            $(userMenu).css({"left": x + 10, "top": y + 10});
        } else {
            $(userMenu).css({"left": x + 10, "top": 315});
        }

        //$(".m_nickname").html(para.appdata.nickname);
        //$(this.menu_id).css({ top: y, left: x })
        //$(this.menu_id).show();
        /*
         window.setTimeout(function(){
         document.onclick = function (){
         //关闭右键菜单
         $("#MemberMenu").hide();

         document.onclick = function (){};
         };
         },1000);
         */
        /*
         if (chat_panel.get_menu_flag()==0){
         chat_panel.set_menu_flag(1);
         $("#MemberMenu").show();
         }
         else{
         chat_panel.set_menu_flag(0);
         $("#MemberMenu").hide();
         }
         */
    },

    ControlMenuItem: function (para) {
        var ADMIN_LEVEL = 900;

        if (xMessager.level == 2000) {
            if (xMessager.uid != para.uid) {
                if (para.level == ADMIN_LEVEL) {
                    $('.m_setadmin').text('把Ta的管理取消');
                }
                else {
                    $('.m_setadmin').text('把Ta设置为管理');
                }
                this.menu_id = '#MemberMenu_Roomer';
            }
            else {
                this.menu_id = '#MemberMenu';
            }
            return;
        }

        if (xMessager.level < ADMIN_LEVEL) {
            this.menu_id = '#MemberMenu';
            return;
        }

        if (xMessager.level >= ADMIN_LEVEL && xMessager.level > para.level) {
            this.menu_id = '#MemberMenu_Admin';
        }
        else {
            this.menu_id = '#MemberMenu';
        }
    },

    RemoveFromListUI: function () {
        var uid = this.uid;
        $("#" + uid).remove();
        $("#a_" + uid).remove();
        $.each($('#message_to option'), function (i,n) {
          if($(n).val()==uid){
              $(n).remove()
              return false
          }
        })
    }
};

function chat_zone_display_user_memu(type, x, y, uid) {
    //alert(type+','+x+','+y+','+uid);
    var u = g_UserList.GetUser(uid);
    //$(this).click(function(event){
    if (u) {
        u.DisplayMenu(u, x, y);
    }
}
/**
 * handling user popup panel
 * @class chat_panel
 * */
var chat_panel = {
    menu_flag: 0,

    init: function () {
        $("#message_btn").click(function (event) {

            xMessager.message($("#message_input").val(), $("#secret_check").is(':checked'));
            $("#message_input").val("");
        });

        $("#message_to").change(function () {

            g_UserList.UserSelected(parseInt($(this).val()));

        });

        RoomCommon.setChatDialog($("#message_input"), function ($ele) {

            xMessager.message($ele.val(), $("#secret_check").is(':checked'));
            $ele.val("");
        });

        $("#m_gift").click(function (event) {

            chat_panel.set_gift_target();
            chat_panel.HideMenu();
        });

        $("#m_chat").click(function (event) {

            chat_panel.selected(false);
            chat_panel.HideMenu();
        });

        $("#m_chat_p").click(function (event) {

            chat_panel.selected(true);
            chat_panel.HideMenu();
        });

        $("#m_freeflower").unbind('click').click(function (event) {

            xMessager.freeflower();
            chat_panel.HideMenu();
        });
        /**
         * Description: bind disabling chat item click event
         *
         * @event
         */
        $("#m_disable_chat").unbind('click').click(function () {

            xMessager.disablechat();
            chat_panel.HideMenu();
        });

        $("#m_kick").unbind('click').click(function (event) {

            xMessager.kickout();
            chat_panel.HideMenu();
        });

        $("#m_setadmin").unbind('click').click(function (event) {

            xMessager.setadmin();
            chat_panel.HideMenu();
        });

        $(".m_close").click(function (event) {
            chat_panel.HideMenu();
        });
    },

    HideMenu: function () {
        $(".userMenu").hide();
        //$("#MemberMenu_Admin").hide();
        //$("#MemberMenu_Roomer").hide();
    },


    set_menu_flag: function (flag) {
        var d = new Date();
        this.menu_flag = flag;

    },

    get_menu_flag: function () {
        return this.menu_flag;
    },

    selected: function (secret) {
        var uid = g_UserList.menu_selected_uid;
        var u = g_UserList.GetUser(uid);
        if (!u) {
            return;
        }
        if ($("#message_to option[value='" + uid + "']").length == 0) {
            //$("#message_to").append(new Option(u.appdata.nickname,uid));
            var objOption = document.createElement("OPTION");
            objOption.text = u.appdata.nickname;
            objOption.value = uid;
            document.getElementById("message_to").options.add(objOption);
        }
        $("#message_to").val(uid);
        if (secret) {
            $("#secret_check").prop("checked", true);
        }
        else {
            $("#secret_check").prop("checked", false);
        }
        g_UserList.UserSelected(uid);
    },

    set_gift_target: function () {
        var uid = g_UserList.menu_selected_uid;
        var u = g_UserList.GetUser(uid)
        if (u) {
            SetGiftRX(uid, u.appdata.nickname);
        }
    }
};

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
/**
 * Description: Controlling business logic of users
 *
 * @class g_UserList
 * @static
 */
var g_UserList = {
    members: {},
    member_ui_array: [],
    selected_uid: 0,
    menu_selected_uid: 0,
    admin_count: 0,

    GetUser: function (uid) {
        if (uid in this.members) {
            return this.members[uid];
        }
        return null;
    },

    GetSelectedUser: function () {
        if (this.selected_uid == 0) {
            return null;
        }
        return this.members[this.selected_uid];
    },

    UserSelected: function (uid) {
        this.selected_uid = uid;
        if ($('#message_to').val()==0) {
            $('#secret_check').attr('disabled','disabled').removeAttr('checked')
        } else {
            $('#secret_check').removeAttr('disabled')
        }
    },

    UserIn: function (user) {

        this.members[user.uid] = user;
        var before_u = null;

        var arrayLength = this.member_ui_array.length;
        for (var i = 0; i < arrayLength; i++) {
            var u = this.member_ui_array[i];

            if (user.rank > u.rank || (user.rank == u.rank && user.appdata.nicegid < u.appdata.nicegid)) {
                before_u = u;
                this.member_ui_array.insert(i, user);
                break;
            }
        }

        user.AddToMemberListUI(before_u);

        if (before_u == null) {
            this.member_ui_array.push(user);
        }

        /*
         this.member_ui_array.push(user);
         this.member_ui_array.sort(function (a, b){
         if (a.rank > b.rank || (a.rank == b.rank && a.uid < a.uid)){
         return false;
         }
         return true;
         });

         var index = jQuery.inArray(user,this.member_ui_array);
         if (index < this.member_ui_array.length-1){
         before_u = this.member_ui_array[index+1];
         }

         user.AddToMemberListUI(before_u);
         */

        $('#user_count').html('(' + this.member_ui_array.length + ')');

        if (user.IsAdmin()) {
            this.admin_count += 1;
            $('#admin_count').html('(' + this.admin_count + ')');
        }
    },

    UserOut: function (uid) {

        if (this.members[uid] == null) {
            return;
        }

        this.members[uid].RemoveFromListUI();
        /*
         if (uid>0){
         $("#message_to option[value='" + uid + "']").remove();
         }
         if (this.selected_uid == uid){
         $("#message_to").val(0);
         }
         */
        var arrayLength = this.member_ui_array.length;
        for (var i = 0; i < arrayLength; i++) {
            var u = this.member_ui_array[i];
            if (uid == u.uid) {
                this.member_ui_array.remove(i);
                break;
            }
        }

        if (this.members[uid].IsAdmin()) {
            this.admin_count -= 1;
            $('#admin_count').html('(' + this.admin_count + ')');
        }

        delete this.members[uid];

        $('#user_count').html('(' + this.member_ui_array.length + ')');
    },

    ChangeLevel: function (uid, level) {
        if (this.members[uid] == null) {
            return;
        }
        this.members[uid].level = level;
        //this.members[uid].RefeshUI();
    },

    Clear: function () {
        for (var uid in this.members) {
            this.UserOut(uid);
        }
        this.members = {};
        this.member_ui_array = [];
    }
};
/**
 * Description: communication with server when chatting
 *
 * @class persist
 * @deprecated Use xchat_swf.disablechat
 * instead
 */
var persist = {
    url: "/room/persist.php",

    doit: function (type, room_id, touid) {
        var data = {
            'TYPE': type,
            'TOGID': touid,
            'ROOMID': room_id
        };

        $.post(this.url, JSON.stringify(data), function (result) {

            var r = jQuery.parseJSON(result);
            if (r.RES == 0) {
                alert(r.HINT);
                return;
            }
            if (r.RES == 1) {
                alert('操作成功！');
            }
        })
            .fail(function () {

                alert('操作发生错误！');
            });
    },

    fav: function (room_id) {
        this.doit(10, room_id, 0);
    },

    disablechat: function (room_id, touid) {
        this.doit(5, room_id, touid);
    },

    kickout: function (room_id, touid) {
        this.doit(3, room_id, touid);
    },

    setadmin: function (room_id, touid, be_admin) {
        if (be_admin) {
            this.doit(6, room_id, touid);
        }
        else {
            this.doit(7, room_id, touid);
        }
    }
};
/**
 * handle chat messages
 * @class xMessager
 * */
var xMessager = {
    logined: false,
    room_id: 0,
    uid: 0,
    level: 0,
    param: {},
    nickname: '',
    chatdisable: 0,

    init: function (param) {
        this.uid = param.uid;
        this.room_id = param.room_id;
        this.level = param.level;
        this.nickname = param.nickname;
        this.chatdisable = param.chatdisable;
        this.param = param;
        if (this.chatdisable > 0) {
            window.setTimeout(function () {
                message_display.prv('<font class="warning">你的禁止发言已经解除!</font>');
                xMessager.chatdisable = 0;
            }, this.chatdisable * 60 * 1000);
        }
    },

    SocketError: function () {

        if (!xMessager.logined) {
            //message_display.prv('<font class="warning">连接服务器失败！</font>');
        }
        else {
            //message_display.prv('<font class="warning">与服务器的连接断开了，请重新登入房间！</font>');
        }
        message_display.prv('<font class="warning">玩命加载中，请稍后。。。</font>');
        g_UserList.Clear();
        xchat_start();
    },

    OnChat: function (chatdata) {


        var is_my_message = false;
        //if (chatdata.uid == this.uid || chatdata.touid == this.uid){
        //	is_my_message = true;
        //}
        if (chatdata.uid == this.uid) {
            is_my_message = true;
            chatdata.nickname = "我";
            chatdata.is_my = true;
        }
        if (chatdata.touid == this.uid) {
            is_my_message = true;
            chatdata.to_nickname = "我";
            chatdata.is_my_to = true;
        }
        chatdata.fromu = g_UserList.GetUser(chatdata.uid);
        if (chatdata.touid) {
            chatdata.tou = g_UserList.GetUser(chatdata.touid);
        }
        message_display.chat(chatdata, is_my_message);

        //generate_small_gift();
        //gift_center.show_gift("S","small.swf",102,8);

    },

    OnFreeFlower: function (data) {

        var is_my_message = false;
        if (data.fromwho.uid == this.uid || data.sendwho.uid == this.uid) {
            is_my_message = true;
        }
        message_display.freeflower(data, is_my_message);

        //generate_big_gift();
        //gift_center.show_gift("B","big.swf",1,15);
    },

    OnGift: function (data) {
        console.log('OnGift');
        var is_my_message = false;
        if (data.from_uid == this.uid || data.to_uid == this.uid) {
            is_my_message = true;
        }
        data.fromu = g_UserList.GetUser(data.from_uid)
        if (data.to_uid) {
            data.tou = g_UserList.GetUser(data.to_uid);
        }
        message_display.gift(data, is_my_message);
        gift_center.show_gift(data.type, data.gift_swf, data.sum, data.gift_swf_life, data);

        if (data.from_uid == room_owner_uid || data.to_uid == room_owner_uid) {
            console.log('room_owner data need change!');
            load_room_data();
        }
    },

    OnSpeaker: function (data) {
        console.log('OnSpeaker');
        load_speak_data();
    },

    OnAnchorFans: function (data) {
        console.log('OnAnchorFans');
        load_anchor_fans();
    },

    OnBanner: function () {
        console.log('OnBanner');
        load_gift_message();
    },

    OnSetAdmin: function (param) {
        if (this.level == 2000) {
            return;
        }
        if (param == 1) {
            message_display.prv('<font class="warning">你被房主设置为房间管理员了，将重新进入房间改变身份！</font>');
        }
        else {
            message_display.prv('<font class="warning">你的房间管理员身份被房主取消了，将重新进入房间改变身份！</font>');
        }
        setTimeout(function () {
            location.reload(true);
        }, 5000);
    },
    OnData: function (data) {
        switch (data.type) {
            case 'C':
                this.OnChat(data.data);
                break;
            case 'F':
                this.OnFreeFlower(data.data);
                break;
            case 'G':
                this.OnGift(data.data);
                break;
            case 'LS':
                this.OnSpeaker(data.data);
                break;
            case 'AFANS':
                this.OnAnchorFans(data.data);
                break;
            case 'BANNER':
                this.OnBanner();
                break;
            case 'ROOM_SET_ADMIN':
                this.OnSetAdmin(data.data);
                break;
        }
    },

    message: function (msg, secret) {
        if (!this.logined) {
            return;
        }

        if (msg == "") {
            return;
        }
        if (this.level < 100) {
            //alert('游客不能发言！');
            checklogin();
            return;
        }
        if (this.level < 100 && secret) {
            //alert('游客不能说悄悄话！');
            checklogin();
            return;
        }
        if (this.chatdisable > 0) {
            alert('你目前处于禁止发言状态，不能发言！');
            return;
        }

        var chatdata = {
            uid: this.uid,
            nickname: this.nickname,
            touid: g_UserList.selected_uid,
            secret: secret,
            message: msg.replace(/</g, '&#60;').replace(/>/g, '&#62;').replace(/\//g, '&#47;')
        };

        var selected_user = g_UserList.GetSelectedUser();
        if (selected_user == null) {
            chatdata.to_nickname = "所有人";
            chatdata.secret = false;
        }
        else {
            chatdata.to_nickname = selected_user.appdata.nickname;
        }

        var data = {
            type: 'C',
            data: chatdata
        };

        var to_uid = g_UserList.selected_uid;
        if (!secret) {
            to_uid = 0;
        }


        xchat_swf.send(to_uid, Base64.encode(JSON.stringify(data)));
    },

    freeflower: function () {
        if (this.level < 100) {
            //alert('游客不能免费献花！');
            checklogin();
            return;
        }

        var my_u = g_UserList.GetUser(this.uid);
        var to_u = g_UserList.GetUser(g_UserList.menu_selected_uid);
        if (my_u && to_u) {
            var data = {
                type: 'F',
                data: {
                    fromwho: {gid: my_u.appdata.gid, nickname: my_u.appdata.nickname},
                    sendwho: {gid: to_u.appdata.gid, nickname: to_u.appdata.nickname}
                }
            }

            xchat_swf.send(0, Base64.encode(JSON.stringify(data)));
        }
    },

    disablechat: function () {
        var mins = 5;
        var from_u = g_UserList.GetUser(this.uid);
        var to_u = g_UserList.GetUser(g_UserList.menu_selected_uid);
        if (to_u.appdata.watchman) {
            $("#returnmsg").html('小样，对巡管操作，想造反么。。。');
            $("#tips02Pop .pinkBtn").removeAttr("onclick");
            $("#tips02Pop .pinkBtn").click(function () {
                $("#tips02Pop .popPubClose")[0].click();
            });
            $("#tips02").click();
            return;
        }
        if (to_u.appdata.vip2 && (!from_u.appdata.roomer && !from_u.appdata.watchman)) {
            $("#returnmsg").html('用户享有<img src="/room/images/vip/vip.gif" style="width:27px;height:15px">，无法操作');
            $("#tips02Pop .pinkBtn").removeAttr("onclick");
            $("#tips02Pop .pinkBtn").click(function () {
                $("#tips02Pop .popPubClose")[0].click();
            });
            $("#tips02").click();
            return;
        }
        if (to_u) {
            //todo to del because xchat_swf.disablechat is responsible to communicate with server
            persist.disablechat(this.room_id, to_u.uid);
            xchat_swf.disablechat(to_u.uid, mins);
        }
    },

    kickout: function () {
        var from_u = g_UserList.GetUser(this.uid);
        var to_u = g_UserList.GetUser(g_UserList.menu_selected_uid);
        if (to_u.appdata.watchman) {
            $("#returnmsg").html('小样，对巡管操作，想造反么。。。');
            $("#tips02Pop .pinkBtn").removeAttr("onclick");
            $("#tips02Pop .pinkBtn").click(function () {
                $("#tips02Pop .popPubClose")[0].click();
            });
            $("#tips02").click();
            return;
        }
        if (to_u.appdata.vip2 && (!from_u.appdata.roomer && !from_u.appdata.watchman)) {
            $("#returnmsg").html('用户享有<img src="/room/images/vip/vip.gif" style="width:27px;height:15px">，无法操作');
            $("#tips02Pop .pinkBtn").removeAttr("onclick");
            $("#tips02Pop .pinkBtn").click(function () {
                $("#tips02Pop .popPubClose")[0].click();
            });
            $("#tips02").click();
            return;
        }
        if (to_u) {
            persist.kickout(this.room_id, to_u.uid);
            xchat_swf.kickout(to_u.uid);
        }
    },

    setadmin: function () {
        var to_u = g_UserList.GetUser(g_UserList.menu_selected_uid);
        if (to_u) {
            var be_admin = (to_u.level < 900 ? 1 : 0);
            persist.setadmin(this.room_id, to_u.uid, be_admin);
            var data = {
                type: 'ROOM_SET_ADMIN',
                data: be_admin
            }
            xchat_swf.send(to_u.uid, Base64.encode(JSON.stringify(data)));
        }
    },

    giftmessage: function (type, param, banner) {
        var data = {
            type: 'G',
            data: param
        }

        xchat_swf.send(0, Base64.encode(JSON.stringify(data)));

        if (banner == 'B') {
            var data = {
                type: 'BANNER'
            }

            xchat_swf.send(-1, Base64.encode(JSON.stringify(data)));
        }
    },

    speakermessage: function (param) {
        var data = {
            type: 'LS',
            data: param
        }
        xchat_swf.send(-1, Base64.encode(JSON.stringify(data)));
    },

    anchorfans: function () {
        var data = {
            type: 'AFANS'
        }
        xchat_swf.send(0, Base64.encode(JSON.stringify(data)));

    },

    ReEnter: function () {

        message_display.prv('<font class="warning">你已被同一账号挤出本房间！</font>');
    },

    LoginACK: function (param) {
        if (param.loginack == 0) {
            switch (param.reason) {
                case 2:
                    message_display.prv('<font class="warning">服务器人数满了！</font>');
                    break;
                case 3:
                    message_display.prv('<font class="warning">房间人数满了！</font>');
                    break;
            }
        }
    }
};
/**
 * Description: display messages on screen
 *
 * @class message_display
 * @static
 */
var message_display = {
    /**
     * Description: insert
     *
     * @
     * @
     */
    prv: function (msg) {
        uu89prv.insert(msg);
    },

    pub: function (msg) {
        uu89pub.insert(msg);
    },

    chat: function (chatdata, is_my_message) {
        if (is_my_message) {

            uu89prv.display_chatmessage(chatdata);
            if (chatdata.touid == 0) {
                uu89pub.display_chatmessage(chatdata);
            }
        }
        else {

            uu89pub.display_chatmessage(chatdata);
        }
    },

    freeflower: function (data, is_my_message) {
        if (is_my_message) {
            document.getElementById('chat_prv').contentWindow.FreeFlower(data);
        }
        else {
            document.getElementById('chat_pub').contentWindow.FreeFlower(data);
        }
    },

    gift: function (data, is_my_message) {
        if (is_my_message) {
            uu89prv.disgift(data, 0);
        }
        else {
            uu89pub.disgift(data, 1);
        }
    }
}
/**
 * Interacting between Js and Flash
 * @class xchat_swf

 * */
var xchat_swf = {
    /**
     * Init interaction event
     *
     * @method Init
     * @return {Undefined}
     * @example
     *    xchat_swf.Init(xconf_swf_param,'xchat',null);
     * */
    Init: function (swf_param, div_id, callbackFn) {
        if (callbackFn == null) {
            callbackFn = this.Created_cb;
        }
        var swfVersionStr = "11.0.0";
        // To use express install, set to playerProductInstall.swf, otherwise the empty string.
        var xiSwfUrlStr = "playerProductInstall.swf";
        var flashvars = {};
        flashvars = {
            ip: swf_param.ip,
            port: swf_param.port,
            gid: swf_param.room_id,
            uid: swf_param.uid,
            level: swf_param.level,
            token: swf_param.token,
            appdata: swf_param.appdata
        };
        var params = {};
        params.quality = "high";
        params.bgcolor = "#57799c";
        params.allowscriptaccess = "always";
        params.allowfullscreen = "true";
        params.wmode = "transparent";
        var attributes = {};
        attributes.id = "xchat";
        attributes.name = "xchat";
        attributes.align = "middle";
        attributes.wmode = 'transparent'
        /**
         * Description: embed swf in doc, ref: https://code.google.com/p/swfobject/wiki/documentation
         *
         * @method swfobject.embedSWF
         */
        var swfmame = "/room/old_xchat.swf";
        swfmame = "/room/new_xchat.swf";
        swfobject.embedSWF(
            swfmame, div_id,
            $("#" + div_id).width(), $("#" + div_id).height(),
            swfVersionStr, xiSwfUrlStr,
            flashvars, params, attributes, callbackFn);
        // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
        //swfobject.createCSS("#flashContent", "display:block;text-align:center;");
    },

    alertNoSwf: function () {
        alert("flash初始化失败.");
    },
    Created_cb: function (cbobj) {
        if (cbobj.success) {
        }
        else {
            xchat_swf.alertNoSwf();
        }
    },

    swf: function () {
        return swfobject.getObjectById("xchat");
    },

    send: function (to_uid, data) {
        try {
            this.swf().Chat(to_uid, data);
        } catch (e) {
            xchat_swf.alertNoSwf();
        }
    },

    disablechat: function (touid, mins) {
        this.swf().DisableChat(touid, mins);
    },

    kickout: function (touid) {
        this.swf().Kickout(touid);
    },
    /**
     * Description: prompting when broadcast ends
     *
     * @deprecated Use xchat_swf_message
     * instead
     */
    tokenop: function (type) {
        if (type == '0') {
            this.swf().TokenOp(0);
            $('#live_time').html('开播时间：直播未开始');
        }
        if (type == '1') {
            this.swf().TokenOp(1);
            var currentdate = new Date();
            var datetime = currentdate.getHours() + ":" + currentdate.getMinutes();
            $('#live_time').html('开播时间：' + datetime);
        }

    }
};

function xchat_swf_debug(info) {

}

function xchat_swf_error(Error) {

    xMessager.SocketError();
}

function member_in_out_hint(appdata, type) {
    appdata.type = type;
    uu89pub.disinout(appdata);
}
/**
 * Description: callback by Flash
 *
 * @xchat_swf_message
 * @
 */
function xchat_swf_message(type, param) {


    switch (type) {
        case 'MSG_LOGIN_ACK':
            xMessager.LoginACK(param);
            break;
        case 'MSG_REENTER':
            xMessager.ReEnter();
            break;
        case 'MSG_SESSION_PARAM':
            message_display.prv('连接服务器成功.');
            message_display.prv('<font color="#FF4444">主播欢迎你:</font>' + room_welcome + '');
            xMessager.logined = true;
            /*
             if (video_start){
             }
             video_start();
             */
            owshowcar();
            break;
        case 'MSG_USER_LIST_PRE':
            setTimeout(function () {
                if (!$.isArray(param)) {
                    return;
                }
                for (var i = 0; i < param.length; i++) {
                    if (typeof param[i] == 'object') {
                        xchat_swf_message('MSG_SOMEBODY_IN', param[i]);
                    }
                }
            }, 100);
            break;
        case 'MSG_SOMEBODY_IN':

            /**
             * Description: decode 64 coded string
             * @method Base64.decode
             * @param {String}
             * @example
             *  "5a6Y5pa55rWL6K+VMDAx"
             * @return {String}
             * @example
             *  "官方测试001"
             */

            var appdata = jQuery.parseJSON(Base64.decode(param.appdata));
            appdata.nickname = Base64.decode(appdata.nickname_b64);

            var user = new User(param.uid, param.level, appdata);
            g_UserList.UserIn(user);
            if (param.in_out_hint) {
                if (parseInt(appdata.car_id) > 0) {
                    showcar(appdata);
                } else {
                    member_in_out_hint(appdata, 1);
                }

            }
            break;
        case 'MSG_SOMEBODY_OUT':

            u = g_UserList.GetUser(param.uid)
            if (param.in_out_hint && u) {
                member_in_out_hint(u.appdata, 0);
            }
            g_UserList.UserOut(param.uid);
            break;
        case 'MSG_SOMEBODY_CHANGELEVEL':
            break;
        case 'MSG_SOMEBODY_CHANGEAPPDATA':
            break;
        case 'MSG_SOMEBODY_CHATENABLE':
            if (param.uid == xMessager.uid) {
                if (param.chatenable) {
                    message_display.prv('<font class="warning">你的禁止发言已经解除!</font>');
                    xMessager.chatdisable = 0;
                }
                else {
                    message_display.prv('<font class="warning">你被管理员禁止发言5分钟!</font>');
                    xMessager.chatdisable = 1;
                }
            }
            else {
                u = g_UserList.GetUser(param.uid);
                if (u) {
                    if (!param.chatenable) {
                        var s = '<font class="warning">【' + u.appdata.nickname + "】被被管理员禁止发言5分钟!</font>";
                        message_display.pub(s);
                    }
                }
            }
            break;
        case 'MSG_KICKOUT':
            if (param.uid == xMessager.uid) {
                message_display.prv('<font class="warning">你被管理员踢出了！15分钟内不允许进入本房间！</font>');
                setTimeout(function () {
                    location.reload(true);
                }, 5000);

            }
            else {
                u = g_UserList.GetUser(param.uid);
                if (u) {
                    var s = '<font class="warning">【' + u.appdata.nickname + '(' + u.appdata.uid + ")】被管理员踢出房间了。15分钟内不允许进入本房间。</font>";
                    message_display.pub(s);
                }
            }
            break;
        case 'MSG_MESSAGE':
            var data = jQuery.parseJSON(Base64.decode(param.chatdata));
            
            
            xMessager.OnData(data);
            break;
        case 'MSG_TOKEN_INFO':
            if (param.tokenid == 1) {
                if (param.tokenstatus == 1) {
                    if ($('#live_time').html() == '开播时间：直播未开始') {
                        var currentdate = new Date();
                        var datetime = currentdate.getHours() + ":" + currentdate.getMinutes();
                        $('#live_time').html('开播时间：' + datetime);
                    }
                    $(".noliveVideo").show();
                    $(".liveVideo").hide();
                    video_swf.LiveState(1);
                }
                else {
                    $('#live_time').html('开播时间：直播未开始');
                    if (!userpara.roomer) {
                        load_room_recommended();
                        $(".noliveVideo").hide();
                        $(".liveVideo").show();
                    }
                    video_swf.LiveState(0);
                }
            }
            break;
    }
}


function xchat_swf_message_new(pid, param) {
    switch (pid) {
        case 121:
            if (param.result == 0) {
                message_display.prv('连接服务器成功.');
                message_display.prv('<font color="#FF4444">主播欢迎你:</font>' + room_welcome + '');
                xMessager.logined = true;
                xMessager.uid = param.uid;
                owshowcar();
            }
            break;
        case 122:

            var user;
            if (param.in_out_hint) {
                user = new User(param.uid, param.level, param);
                g_UserList.UserIn(user);
                if (parseInt(param.car_id) > 0) {
                    showcar(param);
                } else {
                    member_in_out_hint(param, 1);
                }
            } else {
                user = g_UserList.GetUser(param.uid)
                if (user) {
                    member_in_out_hint(param, 0);
                }
                g_UserList.UserOut(param.uid);
            }
            break;
        case 123:
            var user = new User(param.uid, param.level, param);
            g_UserList.UserIn(user);
            break;
        case 132:
            xMessager.OnData({"type": "C", "data": param});
            break;
        case 142:
            /*param.id=10310;
             param.gift_swf="1423138795599345975.swf";
             param.img="/upload/gift_img/1423138795201857397.png";
             param.text="<font class=red>[礼物]</font><a id='32035942'>www123</a> 向 <a id='32035937'>官方测试001</a> 送：1个新年快乐";
             */
            xMessager.OnData({"type": "G", "data": param});
            break;
        case 151:
            break;
        case 152:
            xMessager.OnData({"type": "ROOM_SET_ADMIN", "data": param});
            break;
        case 161:
            break;
        case 162:
            if (param.uid == xMessager.uid) {
                if (param.chatenable) {
                    message_display.prv('<font class="warning">你的禁止发言已经解除!</font>');
                    xMessager.chatdisable = 0;
                }
                else {
                    message_display.prv('<font class="warning">你被管理员禁止发言5分钟!</font>');
                    xMessager.chatdisable = 1;
                }
            }
            else {
                var u = g_UserList.GetUser(param.uid);
                if (u) {
                    if (!param.chatenable) {
                        var s = '<font class="warning">【' + u.appdata.nickname + "】被被管理员禁止发言5分钟!</font>";
                        message_display.pub(s);
                    }
                }
            }
            break;
        case 171:
            break;
        case 172:
            if (param.uid == xMessager.uid) {
                message_display.prv('<font class="warning">你被管理员踢出了！15分钟内不允许进入本房间！</font>');
                setTimeout(function () {
                    location.reload(true);
                }, 5000);

            }
            else {
                u = g_UserList.GetUser(param.uid);
                if (u) {
                    var s = '<font class="warning">【' + u.appdata.nickname + '(' + u.appdata.uid + ")】被管理员踢出房间了。15分钟内不允许进入本房间。</font>";
                    message_display.pub(s);
                }
            }
            break;
        case 182 :
            if (param.tokenid == 1) {
                if (param.tokenstatus == 1) {
                    if ($('#live_time').html() == '开播时间：直播未开始') {
                        var currentdate = new Date();
                        var datetime = currentdate.getHours() + ":" + currentdate.getMinutes();
                        $('#live_time').html('开播时间：' + datetime);
                    }
                    $(".noliveVideo").show();
                    $(".liveVideo").hide();
                    video_swf.LiveState(1);
                }
                else {
                    $('#live_time').html('开播时间：直播未开始');
                    if (!userpara.roomer) {
                        load_room_recommended();
                        $(".noliveVideo").hide();
                        $(".liveVideo").show();
                    }
                    video_swf.LiveState(0);
                }
            }
            break;

    }
}