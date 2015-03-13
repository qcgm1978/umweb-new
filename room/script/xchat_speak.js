function CalcRank(appdata)
{
	var score = 0;
	
	if (appdata.roomer){
		score = 2147483648; //0x80000000
		return score;
	}
	
	if (appdata.vip>=28){
		score = appdata.vip * 1048576;//0x100000
	}
	
	if (appdata.agency){
		score += 524288;//0x80000,1<<19
	}
	
	if (appdata.watchman){
		score += 262144;//0x40000,1<<18
	}
	
	if (appdata.levelinroom==900){
		score += 131072;//0x20000,1<<17
	}
	
	if (appdata.levelinroom==100){
		score += 65535;//0x10000,1<<16
	}
	
	score += appdata.title*8;
	
	if (appdata.vip<=5){
		score += appdata.vip;
	}
	
	return score;
}

function User(uid,level,appdata){
	this.uid = uid;
	this.level = level;
	this.init_level = level;
	this.appdata = appdata;
	this.rank = CalcRank(appdata);
	console.log('rank.' + this.rank);
}

User.prototype = {
	hint : function(){
		//return this.appdata.nickname;
		
		var s;

		s = '<li><p><span>'+ this.appdata.nickname +'</span><span class="fr'+((this.appdata.nicegid+"").length<8?" l-state":"")+'">'+ this.appdata.nicegid +'</span></p>';
		s += '<p><span>';

		if (this.appdata.roomer || this.appdata.title>0 || this.appdata.vip>0 || this.appdata.watchman>0 || this.level==900 || this.appdata.agency>0){
			if (this.appdata.roomer){
				s += '<img src="/room/images/role/r_z.gif">'
				if (this.appdata.starlevel>0){
					s += '<img src="/room/images/star/s'+this.appdata.starlevel+'.png">';
				}
			}
			else{
				if (this.appdata.title>0){
					s += '<img src="/room/images/title/t'+this.appdata.title+'.gif">';
				}
				if (this.appdata.vip>0){
					s += '<img src="/room/images/vip/v'+this.appdata.vip+'.gif">';
				}
				if (this.appdata.watchman>0){
					s += '<img src="/room/images/role/r8.gif">';
				}
				else{
					if (this.level==900){
						s += '<img src="/room/images/role/r5.gif">';
					}
				}
				if (this.appdata.agency>0){
					s += '<img src="/room/images/role/r128.gif">';
				}
			}	
		
		}
		
		
		s += '</span></p></li>';
		return s;
	},

	IsAdmin : function(){
		if (this.level==900)
			return true;
		if (this.appdata.watchman>0)
			return true;
		return false;
	},
	
	Selected : function(){
		if ($("#message_to option[value='" + this.uid + "']").length == 0){
			//$("#message_to").val(this.appdata.nickname);
			$("#message_to").append(new Option(this.appdata.nickname,this.uid))
		}
		$("#message_to").val(this.uid);
		g_UserList.UserSelected(this.uid);
	},

	AddToAdminListUI : function(){
		var element = $("<li>").attr("id",'a_'+this.uid).append(this.hint()
				);
		var room_member_list = '#con_th_2';
		$(room_member_list).append(element);
		
				
		var CB_Para = this;
		$("#a_"+this.uid).click(function(e) {
				//console.log('x,y:'+e.pageX+':'+e.pageY)
				var cb_para = CB_Para;
				cb_para.DisplayMenu(cb_para,e.pageX,e.pageY);
			});
	},
	
	AddToMemberListUI : function(before_user){
		var data = {user:this};
		var element = $("<li>").attr("id",this.uid).append(this.hint()
				).click(data,function(event){
				//$(this).addClass("active");
				////event.data.user.Selected();
			});
		if (before_user == null){	
			var room_member_list = '#con_th_1';
			$(room_member_list).append(element);
			console.log('AddToMemberListUI:'+this.hint());
		}
		else{
			$("#"+before_user.uid).before(element);
			console.log('AddToMemberListUI:'+this.hint() + ',before:'+before_user.uid);
		}
				
		var CB_Para = this;
		$("#"+this.uid).mouseenter(function(e) {
						var cb_para = CB_Para;
						//cb_para.DisplayMenu(cb_para);
					});
		$("#"+this.uid).mouseout(function(e) {
						//chat_panel.set_hidemenu_flag();
					});
		$("#"+this.uid).click(function(e) {
				console.log('x,y:'+e.pageX+':'+e.pageY)
				var cb_para = CB_Para;
				cb_para.DisplayMenu(cb_para,e.pageX,e.pageY);
			});
			
		if (this.IsAdmin()){	
			this.AddToAdminListUI();	
		}
	},

	DisplayMenu : function(para,x,y){
		console.log('DisplayMenu.' + para.uid);
		g_UserList.menu_selected_uid = para.uid;
		
		this.ControlMenuItem(para);
		
		$(".m_nickname").html(para.appdata.nickname+'-'+para.uid);
		$(this.menu_id).css({ top: y, left: x })
		$(this.menu_id).show();
		/*
		window.setTimeout(function(){
			document.onclick = function (){
				//关闭右键菜单
				$("#MemberMenu").hide();
				console.log('document.onclick');
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

	ControlMenuItem : function(para){
		var ADMIN_LEVEL = 900;

		if (xMessager.level==2000){
			if (xMessager.uid != para.uid){
				if (para.level == ADMIN_LEVEL){
					$('.m_setadmin').text('把Ta的管理取消');
				}
				else{
					$('.m_setadmin').text('把Ta设置为管理');
				}
				this.menu_id = '#MemberMenu_Roomer';
			}
			else{
				this.menu_id = '#MemberMenu';
			}
			return;
		}
		
		if (xMessager.level < ADMIN_LEVEL){
			this.menu_id = '#MemberMenu';
			return;
		}

		if (xMessager.level>=ADMIN_LEVEL && xMessager.level > para.level){
			this.menu_id = '#MemberMenu_Admin';
		}
		else{
			this.menu_id = '#MemberMenu';
		}
	},

	RemoveFromListUI : function(){
		$("#"+this.uid).remove();
		$("#a_"+this.uid).remove();
	},
};

function chat_zone_display_user_memu(type,x,y,uid)
{
	//alert(type+','+x+','+y+','+uid);
	var u = g_UserList.GetUser(uid);
	if (u){
		var position;
		if (type==0){
			position = $("#chat_pub").position();
		}
		else{
			position = $("#chat_prv").position();
		}
		var x1 = x + position.left;
		var y1 = y + position.top + 4;
		u.DisplayMenu(u,x1,y1);
	}
}

var chat_panel = {
	menu_flag : 0,
	
	init : function(){
		$("#message_btn").click(function(event){
			console.log('secret_check:'+$("#secret_check").is(':checked'));
			xMessager.message($("#message_input").val(),$("#secret_check").is(':checked'));
			$("#message_input").val(""); 
		});

		$("#message_to").change(function(){
			console.log('message_to changed.' + $(this).val());
			g_UserList.UserSelected(parseInt($(this).val()));
			console.log('g_UserList.selected_uid = ' + g_UserList.selected_uid);
		});

		$("#message_input").keypress(function(event) {
			if ( event.which == 13 ) {
				$("#message_btn").click();
			}
		});

		$(".m_gift").click(function(event){
			console.log('m_gift');
			chat_panel.set_gift_target();
			chat_panel.HideMenu();
		});
		
		$(".m_chat").click(function(event){
			console.log('m_chat');
			chat_panel.selected(false);
			chat_panel.HideMenu();
		});

		$(".m_chat_p").click(function(event){
			console.log('m_chat_p');
			chat_panel.selected(true);
			chat_panel.HideMenu();
		});
		
		$(".m_freeflower").unbind('click').click(function(event){
			console.log('m_freeflower');
			xMessager.freeflower();
			chat_panel.HideMenu();
		});
		
		$(".m_disable_chat").unbind('click').click(function(event){
			console.log('m_disable_chat');
			xMessager.disablechat();
			chat_panel.HideMenu();
		});
		
		$(".m_kick").unbind('click').click(function(event){
			console.log('m_kick');
			xMessager.kickout();
			chat_panel.HideMenu();
		});
		
		$(".m_setadmin").unbind('click').click(function(event){
			console.log('m_setadmin');
			xMessager.setadmin();
			chat_panel.HideMenu();
		});

		$(".m_close").click(function(event){
			chat_panel.HideMenu();
		});
	},
	
	HideMenu : function(){
		$("#MemberMenu").hide();
		$("#MemberMenu_Admin").hide();
		$("#MemberMenu_Roomer").hide();
	},
	

	set_menu_flag : function(flag){
		var d = new Date();
		this.menu_flag = flag;
		console.log('set_menu_flag. ' + this.menu_flag);
	},
	
	get_menu_flag : function(){
		return this.menu_flag;
	},
	
	selected : function(secret){
		var uid = g_UserList.menu_selected_uid;
		var u = g_UserList.GetUser(uid);
		if (!u){
			return;
		}
		if ($("#message_to option[value='" + uid + "']").length == 0){
			$("#message_to").append(new Option(u.appdata.nickname,uid))
		}
		$("#message_to").val(uid);
		if (secret){
			$("#secret_check").prop( "checked", true );
		}
		else{
			$("#secret_check").prop( "checked", false );
		}
		g_UserList.UserSelected(uid);
	},
	
	set_gift_target : function(){
		var uid = g_UserList.menu_selected_uid;
		var u = g_UserList.GetUser(uid)
		if (u){
			SetGiftRX(uid,u.appdata.nickname);
		}
	}
};

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var g_UserList = {
	members : {},
	member_ui_array : [],
	selected_uid : 0,
	menu_selected_uid : 0,
	admin_count : 0,
	
	GetUser : function(uid){
		if (uid in this.members){
			return this.members[uid];
		}
		return null;
	},
	
	GetSelectedUser : function(){
		if (this.selected_uid == 0){
			return null;
		}
		return this.members[this.selected_uid];
	},

	UserSelected : function(uid){
		this.selected_uid = uid;
	},

	UserIn : function(user){
		console.log('UserIn:'+user.appdata.nickname);
		this.members[user.uid] = user;
		var before_u = null;

		var arrayLength = this.member_ui_array.length;
		for (var i = 0; i < arrayLength; i++) {
			var u = this.member_ui_array[i];
			//console.log(user.rank + ',' + u.rank);
			if (user.rank > u.rank || (user.rank == u.rank && user.appdata.nicegid < u.appdata.nicegid)){
				before_u = u;
				this.member_ui_array.insert(i,user);
				break;
			}
		}
		
		user.AddToMemberListUI(before_u);

		if (before_u == null){
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
		
		$('#user_count').html('('+this.member_ui_array.length+')');
		
		if (user.IsAdmin()){
			this.admin_count += 1;
			$('#admin_count').html('('+this.admin_count+')');
		}
	},

	UserOut : function(uid){
		if (this.members[uid] == null){
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
			if (uid == u.uid){
				this.member_ui_array.remove(i);
				break;
			}
		}
		
		if (this.members[uid].IsAdmin()){
			this.admin_count -= 1;
			$('#admin_count').html('('+this.admin_count+')');
		}
		
		delete this.members[uid];
		
		$('#user_count').html('('+this.member_ui_array.length+')');
	},

	ChangeLevel : function(uid,level){
		if (this.members[uid] == null){
			return;
		}
		this.members[uid].level = level;
		//this.members[uid].RefeshUI();
	},

	Clear : function(){
		for (var uid in this.members){
			this.UserOut(uid);
		}
		this.members = {};
		this.member_ui_array = [];
	},
};

var persist = {
	url : "/room/persist.php",
	
	doit : function(type,room_id,touid){
		var data = {
			'TYPE':type,
			'TOGID':touid,
			'ROOMID': room_id,
		};
		console.log(data);
		$.post(this.url,JSON.stringify(data),function(result){
			console.log(result);
			var r = jQuery.parseJSON(result);
			if (r.RES==0){
				alert(r.HINT);
			}
			if (r.RES==1){
				alert('操作成功！');
			}
		})
		.fail(function(){
			console.log('error');
			alert('操作发生错误！');
			});
	},
	
	fav : function(room_id){
		this.doit(10,room_id,0);
	},
	
	disablechat : function(room_id,touid){
		this.doit(5,room_id,touid);
	},
	
	kickout : function(room_id,touid){
		this.doit(3,room_id,touid);
	},
	
	setadmin : function(room_id,touid,be_admin){
		if (be_admin){
			this.doit(6,room_id,touid);
		}
		else{
			this.doit(7,room_id,touid);
		}
	}
};

var xMessager = {
	logined : false,
	room_id : 0,
	uid : 0,
	level : 0,
	param : {},
	nickname : '',
	chatdisable : 0,
	
	init : function(param){
		this.uid = param.uid;
		this.room_id = param.room_id;
		this.level = param.level;
		this.nickname = param.nickname;
		this.chatdisable = param.chatdisable;
		this.param = param;
		if (this.chatdisable>0){
			window.setTimeout(function(){
					message_display.prv('<font class="warning">你的禁止发言已经解除!</font>');
					xMessager.chatdisable = 0;
				},this.chatdisable*60*1000);
		}
	},
	
	SocketError : function(){
		console.log('SocketError');
		if (!xMessager.logined){
			message_display.prv('<font class="warning">连接服务器失败！</font>');
		}
		else{
			message_display.prv('<font class="warning">与服务器的连接断开了，请重新登入房间！</font>');
		}
	},
	
	OnChat : function (chatdata){
		console.log('OnChat');
		console.log(chatdata);
		var is_my_message = false;
		if (chatdata.uid == this.uid || chatdata.touid == this.uid){
			is_my_message = true;
		}
		
		message_display.chat(chatdata,is_my_message);

		//generate_small_gift();
		//gift_center.show_gift("S","small.swf",102,8);

	},
	
	OnFreeFlower : function(data){
		console.log('OnFreeFlower');
		var is_my_message = false;
		if (data.fromwho.uid == this.uid || data.sendwho.uid == this.uid){
			is_my_message = true;
		}
		message_display.freeflower(data,is_my_message);
		
		//generate_big_gift();
		//gift_center.show_gift("B","big.swf",1,15);
	},
	
	OnGift : function(data){
		console.log('OnGift');
		var is_my_message = false;
		if (data.from_uid == this.uid || data.to_uid == this.uid){
			is_my_message = true;
		}
		message_display.gift(data,is_my_message);
		gift_center.show_gift(data.type,data.gift_swf,data.sum,data.gift_swf_life,data);
		
		if (data.from_uid == room_owner_uid || data.to_uid == room_owner_uid){
			console.log('room_owner data need change!');
			load_room_data();
		}
	},
	
	OnBanner : function(){
		console.log('OnBanner');
		load_gift_message();
	},
	
	OnSetAdmin : function(param){
		if (this.level==2000){
			return;
		}
		if (param==1){
			message_display.prv('<font class="warning">你被房主设置为房间管理员了，将重新进入房间改变身份！</font>');
		}
		else{
			message_display.prv('<font class="warning">你的房间管理员身份被房主取消了，将重新进入房间改变身份！</font>');
		}
		setTimeout(function(){
			location.reload(true);
		},5000);
	},
	
	OnData : function(data){
		console.log('OnData');
		switch (data.type){
			case 'C':
				this.OnChat(data.data);
				break;
			case 'F':
				this.OnFreeFlower(data.data);
				break;
			case 'G':
				this.OnGift(data.data);
				break;
			case 'BANNER':
				this.OnBanner();
				break;
			case 'ROOM_SET_ADMIN':
				this.OnSetAdmin(data.data);
				break;
		}
	},
	
	message : function(msg,secret){
		if (!this.logined){
			return;
		}
		
		if (msg==""){
			return;
		}
		if (this.level<100){
			alert('游客不能发言！');
			return;
		}
		if (this.chatdisable>0){
			alert('你目前处于禁止发言状态，不能发言！');
			return;
		}
		
		var chatdata = {
			uid : this.uid,
			nickname : this.nickname,
			touid : g_UserList.selected_uid,
			secret : secret,
			message : msg.replace(/</g,'&#60;').replace(/>/g,'&#62;').replace(/\//g,'&#47;'),
		};

		var selected_user = g_UserList.GetSelectedUser();
		if (selected_user == null){
			chatdata.to_nickname = "所有人";
			chatdata.secret = false;
		}
		else{
			chatdata.to_nickname = selected_user.appdata.nickname;
		}

		var data = {
			type : 'C',
			data : chatdata,
		};
			
		var to_uid = g_UserList.selected_uid;	
		if (!secret){
			to_uid = 0;
		}		
		
		console.log("message sent.");
		console.log(data);
		
		xchat_swf.send(to_uid,Base64.encode(JSON.stringify(data)));
	},

	freeflower : function(){
		if (this.level<100){
			alert('游客不能免费献花！');
			return;
		}
		
		var my_u = g_UserList.GetUser(this.uid);
		var to_u = g_UserList.GetUser(g_UserList.menu_selected_uid);
		if (my_u && to_u){
			var data = {
				type : 'F',
				data : {
					fromwho : {gid:my_u.appdata.gid,nickname:my_u.appdata.nickname},
					sendwho : {gid:to_u.appdata.gid,nickname:to_u.appdata.nickname},
				}
			}
			
			xchat_swf.send(0,Base64.encode(JSON.stringify(data)));
		}
	},
	
	disablechat : function(){
		var mins = 5;
		var to_u = g_UserList.GetUser(g_UserList.menu_selected_uid);
		if (to_u){
			persist.disablechat(this.room_id,to_u.uid);
			xchat_swf.disablechat(to_u.uid,mins);
		}
	},

	kickout : function(){
		var to_u = g_UserList.GetUser(g_UserList.menu_selected_uid);
		if (to_u){
			persist.kickout(this.room_id,to_u.uid);
			xchat_swf.kickout(to_u.uid);
		}	
	},
	
	setadmin : function(){
		var to_u = g_UserList.GetUser(g_UserList.menu_selected_uid);
		if (to_u){
			var be_admin = (to_u.level<900?1:0);
			persist.setadmin(this.room_id,to_u.uid,be_admin);
			var data = {
					type : 'ROOM_SET_ADMIN',
					data : be_admin
				}
			xchat_swf.send(to_u.uid,Base64.encode(JSON.stringify(data)));
		}
	},
	
	giftmessage : function(type,param,banner){
		var data = {
				type : 'G',
				data : param
			}
			
		xchat_swf.send(0,Base64.encode(JSON.stringify(data)));

		if (banner=='B'){
			var data = {
				type : 'BANNER'
				}
			
			xchat_swf.send(-1,Base64.encode(JSON.stringify(data)));
		}
	},
	
	ReEnter: function(){
		console.log('onReEnter');
		message_display.prv('<font class="warning">你的帐号已经在其他浏览器窗口进入了本房间！登录失败！</font>');
	},
	
	LoginACK : function(param){
		if (param.loginack==0){
			switch (param.reason){
				case 2:
					message_display.prv('<font class="warning">服务器人数满了！</font>');
				break;
				case 3:
					message_display.prv('<font class="warning">房间人数满了！</font>');
				break;
			}
		}
	},
};

var message_display = {
	prv : function(msg){
		document.getElementById('chat_prv').contentWindow.OutputInfo(msg);
	},
	
	pub : function(msg){
		document.getElementById('chat_pub').contentWindow.OutputInfo(msg);
	},
	
	chat : function(chatdata,is_my_message){
		if (is_my_message){
			console.log('message_display.chat chat_prv');
			document.getElementById('chat_prv').contentWindow.DisplayChatMessage(chatdata);
			if (chatdata.touid==0){
				document.getElementById('chat_pub').contentWindow.DisplayChatMessage(chatdata);
			}
		}
		else{
			console.log('message_display.chat chat_pub');
			document.getElementById('chat_pub').contentWindow.DisplayChatMessage(chatdata);
		}
	},
	
	freeflower : function(data,is_my_message){
		if (is_my_message){
			document.getElementById('chat_prv').contentWindow.FreeFlower(data);
		}
		else{
			document.getElementById('chat_pub').contentWindow.FreeFlower(data);
		}
	},
	
	gift : function(data,is_my_message){
		if (is_my_message){
			document.getElementById('chat_prv').contentWindow.PrivateGiftShow(data);
		}
		else{
			document.getElementById('chat_pub').contentWindow.PublicGiftShow(data);
		}
	},
	
}

var xchat_swf = {
	Init : function(swf_param,div_id,callbackFn){
		if (callbackFn == null){
			callbackFn = this.Created_cb;
		}
		var swfVersionStr = "11.0.0";
		// To use express install, set to playerProductInstall.swf, otherwise the empty string. 
		var xiSwfUrlStr = "playerProductInstall.swf";
		var flashvars = {};
		flashvars = {
			ip : swf_param.ip,
			port : swf_param.port,
			gid:swf_param.room_id,
			uid:swf_param.uid,
			level:swf_param.level,
			token:swf_param.token,
			appdata : swf_param.appdata,
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
		swfobject.embedSWF(
			"/room/xchat.swf", div_id, 
			$("#"+div_id).width(), $("#"+div_id).height(), 
			swfVersionStr, xiSwfUrlStr, 
			flashvars, params, attributes,callbackFn);
		// JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
		//swfobject.createCSS("#flashContent", "display:block;text-align:center;");
	},

	Created_cb : function(cbobj){
		if (cbobj.success){
		}
		else{
			alert("flash初始化失败.");
		}
	},
	
	swf : function(){
		return swfobject.getObjectById("xchat");
	},
	
	send : function(to_uid,data){
		this.swf().Chat(to_uid,data);
	},
	
	disablechat : function(touid,mins){
		this.swf().DisableChat(touid,mins);
	},
	
	kickout : function(touid){
		this.swf().Kickout(touid);
	},
	
	tokenop : function(type){
		if (type=='0'){
			this.swf().TokenOp(0);
			$('#live_time').html('开播时间：直播未开始');
		}
		if (type=='1'){
			this.swf().TokenOp(1);
			var currentdate = new Date(); 
			var datetime = currentdate.getHours() + ":" + currentdate.getMinutes();
			$('#live_time').html('开播时间：' + datetime);
		}

	},
};

function xchat_swf_debug(info){
	console.log("swf_debug: " + info );
}

function xchat_swf_error(Error){
	console.log("swf_error: " + Error);
	xMessager.SocketError();
}

function member_in_out_hint(appdata,type)
{
	appdata.type = type;
	document.getElementById('chat_pub').contentWindow.someone_in_out_info(appdata);
}

function xchat_swf_message(type,param){
	console.log('xchat_swf_message. ' + type);
	console.log(param);
	
	switch (type){
		case 'MSG_LOGIN_ACK':
			xMessager.LoginACK();
			break;
		case 'MSG_REENTER':
			xMessager.ReEnter();
			break;	
		case 'MSG_SESSION_PARAM':
			message_display.prv('连接服务器成功.');
			message_display.prv('<font color="#FF4444">主播欢迎你:</font>'+room_welcome+'');
			xMessager.logined = true;
			//if (video_start){
			//}
			
			break;
		case 'MSG_USER_LIST_PRE':
			setTimeout(function(){
				if (!$.isArray(param)){
					return;
				}
				for (var i=0;i<param.length;i++){
					if(typeof param[i] =='object'){
						xchat_swf_message('MSG_SOMEBODY_IN',param[i]);
					}
				}
			},100);
			break;
		case 'MSG_SOMEBODY_IN':
			console.log('MSG_SOMEBODY_IN OK.');
			console.log(Base64.decode(param.appdata));
			var appdata = jQuery.parseJSON(Base64.decode(param.appdata));
			appdata.nickname = Base64.decode(appdata.nickname_b64);
			console.log(appdata);
			var user = new User(param.uid,param.level,appdata);
			g_UserList.UserIn(user);
			if (param.in_out_hint){
				member_in_out_hint(appdata,1);
			}
			break;
		case 'MSG_SOMEBODY_OUT':
			u = g_UserList.GetUser(param.uid)
			if (param.in_out_hint && u){
				member_in_out_hint(u.appdata,0);
			}
			g_UserList.UserOut(param.uid);
			break;
		case 'MSG_SOMEBODY_CHANGELEVEL':
			break;	
		case 'MSG_SOMEBODY_CHANGEAPPDATA':
			break;
		case 'MSG_SOMEBODY_CHATENABLE':
			if (param.uid == xMessager.uid){
				if (param.chatenable){
					message_display.prv('<font class="warning">你的禁止发言已经解除!</font>');
					xMessager.chatdisable = 0;
				}
				else{
					message_display.prv('<font class="warning">你被管理员禁止发言5分钟!</font>');
					xMessager.chatdisable = 1;
				}
			}
			else{
				u = g_UserList.GetUser(param.uid);
				if (u){
					if (!param.chatenable){
						var s = '<font class="warning">【'+u.appdata.nickname + "】被被管理员禁止发言5分钟!</font>";
						message_display.pub(s);
					}
				}
			}
			break;
		case 'MSG_KICKOUT':
			if (param.uid == xMessager.uid){
				message_display.prv('<font class="warning">你被管理员踢出了！15分钟内不允许进入本房间！</font>');
				setTimeout(function(){
					location.reload(true);
				},5000);
				
			}
			else{
				u = g_UserList.GetUser(param.uid);
				if (u){
					var s = '<font class="warning">【'+u.appdata.nickname + "】被管理员踢出房间了。15分钟内不允许进入本房间。</font>";
					message_display.pub(s);
				}
			}
			break;	
		case 'MSG_MESSAGE':
			var data = jQuery.parseJSON(Base64.decode(param.chatdata));
			console.log('before xMessager.OnData.');
			console.log(data);
			xMessager.OnData(data);
			break;
		case 'MSG_TOKEN_INFO':
			if (param.tokenid==1){
				if (param.tokenstatus == 1){
					if ($('#live_time').html() == '开播时间：直播未开始'){
						var currentdate = new Date(); 
						var datetime = currentdate.getHours() + ":" + currentdate.getMinutes();
						$('#live_time').html('开播时间：' + datetime);
					}
				}
				else{
					$('#live_time').html('开播时间：直播未开始');
				}
			}
			break;
	}
}
