/* 礼物跑道类 */
function giftBanner(obj)
{
	this.isStarted  = false;                                                               // 跑道是否已经启动
	this.obj        = document.getElementById(obj);                                        // 礼物跑道DOM容器
	this.banWidth   = document.body.clientWidth;                                           // 跑道宽度
	this.banHeight  = document.body.clientHeight;                                          // 跑道高度
	this.msgLeft    = this.banWidth;                                                       // 礼物消息起始X坐标
	this.msgLength  = this.obj.clientWidth;                                                // 礼物消息实际长度
	this.msgs       = new Array();                                                         // 礼物消息容器
	this.lastMsg    = "";                                                                  // 最后一条礼物消息
	this.questTime  = 0;                                                                   // 最后一次请求服务器时间
	this.srollTimer = null;                                                                // 滚动定时器标石
	this.time       = function(d){return new Date(d*1000).toLocaleTimeString()}; // 格式化时间
};

giftBanner.prototype = {
	/* 启动跑道 */
	start:function(){
		if(this.isStarted === false && this.lastMsg){
			var self = this;
			this.obj.style.left = this.banWidth;
			this.srollTimer = window.setInterval(function(){self.sroll();}, 30);
			this.isStarted = true;
		}
	},
	
	/* 滚动消息 */
	sroll:function(){
		if(this.msgLeft > this.msgLength * -1){
			this.obj.style.left = this.msgLeft;
			this.msgLeft        = this.msgLeft - 3;
		}else{
			this.obj.innerHTML = this.lastMsg;
			this.msgLength     = this.obj.clientWidth;
			this.msgLeft       = this.banWidth;
		}
	},
	
	/* 加载消息 */
	show:function(){
		if(this.msgs.length > 0){
			// 计算需要的礼物消息间距
			var rightx = parseInt(this.banWidth - (this.msgLeft + this.msgLength));
			var xsum = rightx > 7 ? parseInt(rightx/7) : 10;
			var nbsp = "";
			for(var i=0; i<xsum; i++){
				nbsp += "&nbsp;";
			}
			this.lastMsg = this.msgs.shift();
			if(this.lastMsg){
				this.obj.innerHTML += nbsp + this.lastMsg;
			}
			this.msgLength = this.obj.clientWidth;
			this.start();
		}		
	},
	
	/* 格式化消息 */
	adds:function(res){
		if(typeof(res) === "object"){
			this.questTime = res.t;
			var bs = res.b, s='';
			for(var i=0; i<bs.length; i++){
				s += '<img src="/upload/gift_img/' + bs[i].gift_img + '" align="absmiddle" height="30px"/>&nbsp;';
				if(bs[i].gift_from == 1){
					s += '<font color="#ff8c00" style="font-size:20px">[黄袋]</font>&nbsp;';
				}
				if(bs[i].gift_from == 2){
					s += '<font color="#0000ff" style="font-size:20px">[蓝袋]</font>&nbsp;';
				}
				if(bs[i].gift_from == 3){
					s += '<font color="#9400D3" style="font-size:20px">[紫袋]</font>&nbsp;';
				}
				s += '<font color="#ff3b85">' + bs[i].from_nickname + '('+  bs[i].from_gid  +')' + '</font>&nbsp;';
				s += '送给&nbsp;<font color="#ff3b85">' + bs[i].to_nickname + '('+  bs[i].to_gid  +')' + '</font>&nbsp;';
				s += bs[i].gift_sum + '&nbsp;' + bs[i].gift_unit + '&nbsp;<font color="#ff0000">' + bs[i].gift_name + '</font>&nbsp;';
				s += '<font color="#072f8a" style="font-size:20px">[' + bs[i].room_name + '('+ bs[i].room_id +')的直播间'+ '&nbsp;&nbsp;' +this.time(bs[i].add_time) + ']</font>';
				this.msgs.push(s);
				s='';
			}
		}
		this.show();
	}
};