/* 禁用一些键*/
document.onkeydown = function()
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
}
document.oncontextmenu = function()
{
	return false;
}