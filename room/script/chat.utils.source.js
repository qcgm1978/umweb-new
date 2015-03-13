/* 显示右键菜单 */

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

var mouse_x = 0;
var mouse_y = 0;

document.onmousemove = function(e){
	e = e || window.event; // IE-ism
	var mousePos = mouseCoords(e);
    mouse_x = mousePos.x;
    mouse_y = mousePos.y;
}


document.oncontextmenu = function ()
{
	var selected_text = getSelectionText();
	/*
	if(selected_text)
	{		
		document.getElementById('copy').style.color  = '#000';
		document.getElementById('copy').style.cursor = 'pointer';
		document.getElementById('copy').onclick = function(){copy();}
	}
	else
	{
		document.getElementById('copy').style.color  = '#ccc';
		document.getElementById('copy').style.cursor = 'default';
		document.getElementById('copy').onclick = function(){return false;}
	}
	*/
	
	var menu = document.getElementById('oncontextmenu');
	menu.style.display = '';
	var left = mouse_x; 
	var top  = mouse_y;

	if(left > (document.body.clientWidth - menu.clientWidth -25))
	{
		left = document.body.clientWidth - menu.clientWidth -25;
	}
	if(top > (document.body.clientHeight - menu.clientHeight-10))
	{
		top = document.body.clientHeight - menu.clientHeight-10;
	}	
	menu.style.left = left + 'px'; 
	menu.style.top  = top + 'px';
};

/* 关闭右键菜单 */
document.onclick = function ()
{
	var menu = document.getElementById('oncontextmenu'); 	
	menu.style.display = "none";//关闭右键菜单
};

/* 复制选区文本 */
function copy()
{
	return;
	var selected_text = getSelectionText();
	if(selected_text){
		//window.clipboardData.clearData();
		//window.clipboardData.setData("Text", text);
		window.prompt("Copy to clipboard: Ctrl+C, Enter", selected_text);
	}
}

/* 滚屏开关 */
function sroll()
{
	var str = document.getElementById("sroll").innerHTML;
	if(str == '停止滚屏')
	{
		uu89.autoscroll = 0;
		document.getElementById("sroll").innerHTML='开始滚屏';//将按钮文字更改为开始滚屏
		document.getElementById('oncontextmenu').style.display = "none";//关闭右键菜单
		return;
	}else{
		uu89.autoscroll = 1; // 开始滚屏
		uu89.rolling();
		document.getElementById("sroll").innerHTML='停止滚屏';//将按钮文字更改为停止滚屏
		document.getElementById('oncontextmenu').style.display = "none";//关闭右键菜单
		return;
	}									 
}

/* 自动清屏开关 */
function autoclear()
{
	var str = document.getElementById("aclear").innerHTML;
	if(str == '自动清屏')
	{
		uu89.isautoclear = 1;
		document.getElementById("aclear").innerHTML='手动清屏';
		return;
	}else{
		uu89.isautoclear = 0;
		document.getElementById("aclear").innerHTML='自动清屏';
		return;
	}
}
function mouseCoords(ev) 
{ 
if(ev.pageX || ev.pageY){ 
return {x:ev.pageX, y:ev.pageY}; 
} 
return { 
x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
y:ev.clientY + document.body.scrollTop - document.body.clientTop 
}; 
} 

/* 显示背景开关 */
function showbg()
{
	var str = document.getElementById("showbg").innerHTML;
	if(str == '隐藏背景')
	{		
		document.body.style.background = "#FFF";
		document.getElementById("showbg").innerHTML='显示背景';
		return;
	}else{		
		document.body.style.background = 'url('+ _background +')';
		document.getElementById("showbg").innerHTML='隐藏背景';		
		return;
	}
}

/* 禁用一些键*/
document.onkeydown = function(event)
{
	if(event.altKey || event.ctrlKey || event.shiftKey)
	{
		switch(event.keyCode){
			case 27://停止
			case 65://全选
			case 70://查找
			case 75://重复选项卡
			case 78://新建窗口
			case 79:
			case 80://打印
			case 81://快速导航选项卡
			case 84://新建选项卡
			case 87://关闭选项卡
			case 116:
			event.keyCode = 0;
			event.returnValue  = false;
			event.cancelBubble = true;
			return false;
			break;
		}
	}
};