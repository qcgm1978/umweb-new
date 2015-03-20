function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 9; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function generate_gift(swf,x,y,z,w,h,life)
{
	var div_id = 'gift_display' + makeid();
	var css_style = 'z-index: ' + (70+z) +'; overflow:hidden;position: absolute;background-color: rgba(255, 255, 255, 0.1);';
	css_style += "width: " + w +"px; height: " + h +"px; left: " + x + "px; top: " + y + "px;"; 
	swfobject.createCSS("#"+div_id, css_style);
	var $div = $('<div />').appendTo('body');
	$div.attr('id', div_id);
	
	//console.log($("#"+div_id).width());
	
	var flashvars = {};
	var params = {};
	params.quality = "high";
	params.wmode = "transparent";
	var attributes = {};
	var w = $("#"+div_id).width();
	var h = $("#"+div_id).height();
	swfobject.embedSWF("/upload/gift_img/"+ swf, div_id, w, h, "7",null,flashvars, params, attributes);
	setTimeout(function(){
			swfobject.removeSWF(div_id);
			gift_center.showed -=1 ;
		},life*1000);
}

function generate_gift_1(swf,x,y,z,w,h,life)
{
	var div_id = 'gift_display' + makeid();
	var css_style = 'z-index: ' + (70+z) +'; overflow:hidden;position: absolute;background-color: rgba(255, 255, 255, 0.1);';
	css_style += "width: " + w +"px; height: " + h +"px; left: " + x + "px; top: " + y + "px;"; 
	swfobject.createCSS("#"+div_id, css_style);
	var $div = $('<div />').appendTo('body');
	$div.attr('id', div_id);
	
	//console.log($("#"+div_id).width());
	
	var flashvars = {};
	var params = {};
	params.quality = "high";
	params.wmode = "transparent";
	var attributes = {};
	var w = $("#"+div_id).width();
	var h = $("#"+div_id).height();
	swfobject.embedSWF("/upload/gift_img/"+ swf, div_id, w, h, "7",null,flashvars, params, attributes);
	setTimeout(function(){
			swfobject.removeSWF(div_id);
			//gift_center.showed -=1 ;
		},life*1000);
}

function giftctrl(){
	gift_center.walk();
}

var gift_center = {
	queue : [],
	showed : 0,

	random_pos : function(){
		var s_w = get_w_w();
		var left = 200;
		var top = 150;
		if (s_w > 1180){
			left = Math.floor((s_w-1180)/2+200);
		}
		var x = left + Math.floor((Math.random() * 80) + 1) * 10;
		var y = top + Math.floor((Math.random() * 30) + 1) * 10;
		var r = {};
		r.x = x;
		r.y = y;
		return r;
	},	
		
	random_pos_4_big : function(){
		var s_w = get_w_w();
		var left = 0;
		var top = 0;
		var w = 200;
		var h = 80;
		if (s_w > 1180){
			w += (s_w - 1180);
		}
		var x = left + Math.floor((Math.random() * 10) + 1) * 20;
		var y = top + Math.floor((Math.random() * 10) + 1) * 20;
		var r = {};
		r.x = x;
		r.y = y;
		return r;
	},	

	display_screen_hint : function(gift){
		var text;
		text = '[礼物]' + gift.from_nickname + ' 向 ' + gift.to_nickname + ' 送：' + gift.sum + gift.unit + gift.gift_name;
		balloon_message(text);
	},
	
	small_gift : function(swf,count,life,data){
		console.log('small_gift');
		
		if (count>=18){
			count = 18;
			//gift_center.display_screen_hint(data);
		}
		var row = Math.floor(count/9)+1;
		var z_w,z_h;
		if (count<9)
			z_w = count*120;
		else
			z_w = 9*120;
		z_h = row*120;
		
		var x = Math.floor((get_w_w() - z_w)/2);
		var y = Math.floor((get_w_h() - z_h)/2);
		if (x<0) x=0;
		if (y<0) y=0;
		
		console.log(get_w_w() + ',' + get_w_h());
		console.log(z_w + ',' + z_h + ',' + x + ',' + y);
		
		for (var i=0;i<count;i++){
			var r = Math.floor(i/9);
			var c = i%9;
			var pos = gift_center.random_pos();
			//gift_center.showed +=1 ;
			//generate_gift(swf,pos.x,pos.y,i,120,120,life);
			//small gifts display immediately,
			generate_gift_1(swf,pos.x,pos.y,i,120,120,life);
		}
	},
	
	big_gift : function(swf,count,life){
		var z_w,z_h;
		z_w = 980;
		z_h = 500;
		
		var x = Math.floor((get_w_w() - z_w)/2);
		var y = 0;//Math.floor((get_w_h() - z_h)/2);
		if (x<0) x=0;
		if (y<0) y=0;
		
		for (var i=0;i<count;i++){
			gift_center.showed +=1 ;
			//generate_gift(swf,x+i*40,y+i*40,i,z_w,z_h,life);
			var pos = gift_center.random_pos_4_big();
			generate_gift(swf,pos.x,pos.y,i,z_w,z_h,life);
		}
	},
	
	show_gift : function(type,swf,count,life,data){
		if (type == 'S'){
			var d = {};
			d.type = type;
			d.swf = swf;
			d.count = count;
			d.life = life;
			d.data = data;
			//small gifts display immediately,
			gift_center.small_gift(swf,count,life,data);
			//gift_center.queue.push(d);
		}
		if (type == 'B'){
			var count = data.sum;
			while (1){
				var d = {};
				d.type = type;
				d.swf = swf;
				if (count > 10){
					d.count = 10;
					d.life = 5;
					
					gift_center.queue.push(d);
					console.log('gift_center.queue.push(d) B');
					
					count -= 10;
				}
				else{
					d.count = count;
					d.life = life;
					
					gift_center.queue.push(d);
					console.log('gift_center.queue.push(d) B');
					break;
				}
			}
		}
	},
	
	walk : function(){
		if (gift_center.showed == 0 && gift_center.queue.length>0){
			var i = gift_center.queue.shift();
			if (i.type=='B'){
				gift_center.big_gift(i.swf,i.count,i.life);
			}
			if (i.type=='S'){
				gift_center.small_gift(i.swf,i.count,i.life,i.data);
			}
		}
	}
};

window.setInterval(giftctrl,2000);
