<script type="text/javascript">



    function tobuy(id,type){
        var logined = '{$logined}';
        if(!logined){
            if(jQuery(".masterEle").css("display")=="none"){
                jQuery("#loginBox").click();
                return;
            }
        }
        jQuery.ajax({
            type: "post",
            data: {"act":"shopbuy","type": type,"id": id,"count": 1},
            url: "/shop.php",
            success: function (data,status) {
                var ms = JSON.parse(data);
                if(ms.error==0){
                    $("#returnmsg").html(ms.message);
                    $("#tips02").click();
                    //window.parent.location.reload();
                }else{
                    $("#returnmsg").html(ms.message);
                    $("#tips02").click();
                }
            }
        })
    }

    function tobuynum(gid,point){
        var logined = '{$logined}';
        if(!logined){
            if(jQuery(".masterEle").css("display")=="none"){
                jQuery("#loginBox").click();
                return;
            }
        }
        jQuery.ajax({
            type: "post",
            data: {"act":"act_buy","selgid": gid},
            url: "number.php",
            success: function (data,status) {
                var ms = JSON.parse(data);
                if(ms.error==0){
                    $("#returnmsg").html("购买成功");
                    $("#tips02").click();
                    setTimeout(function(){
                        window.parent.location.reload();
                    },2000);

                    //window.parent.location.reload();
                }else{
                    $("#returnmsg").html(ms.message);
                    $("#tips02").click();
                }
            }
        })
    }
</script>

<!--商城-->
<div class="thumBox">
    <div class="thumTitle"><span class="thumTitleName">商城---------------------------------------------------------------------------------->> {$title_name}</span></div>
    <!--thumMid-->
    <div class="thumMid wd grayBg">
        <!--thumCon-->
        <div class="thumCon">
            {include file="left_menu.htm"}
            <!--thumContent-->
            <div class="thumContent">
                <!--面包屑-->
                <div class="pageCrumb">
                    <span>位置</span>
                    <span> >> </span>
                    <span>{$title_name}</span>
                </div>
                <!--面包屑 end-->

                {if $mod eq 'vipshop'}
                <!--VIP商城-->
                <div class="carShop VIPShop">
                    <ul>
                        {foreach from=$vip_list item=vip}
                        <li>
                            <span class="carShopPic"><i></i><img src="/images/VipShop.png" alt="" /></span>
                            <div class="carShopDetail">
                                <strong>{$vip.name}</strong>
                                <p>
                                    u币购买<br />
                                    价格：<span>{$vip.price}</span>U币<br />
                                    （有效期{$vip.expire_time}）
                                </p>
                                <p><a href="javascript:tobuy('{$vip.id}','vip_vip')" title="" class="buyIco">我要购买</a></p>
                            </div>
                        </li>
                        {foreachelse}
                        <li>目前还没有道具出售</li>
                        {/foreach}
                    </ul>
                </div>
                <!--VIP商城 end-->
                {/if}

                {if $mod eq 'carshop'}
                <!--座驾商城-->
                <div class="carShop">
                    <ul>
                        {foreach from=$car_list item=car}
                        {if $car.is_hidden==0}
                        <li>
                            <span class="carShopPic"><i></i><img src="/upload/car_img/{$car.img}" alt="" /></span>
                            <div class="carShopDetail">
                                <strong>{$car.name}</strong>
                                <p>
                                    u币购买<br />
                                    价格：<span>{$car.price}</span>U币<br />
                                    （有效期{$car.expire_time}）
                                </p>
                                <p><a href="javascript:tobuy('{$car.id}','car')" title="" class="buyIco">我要购买</a></p>
                            </div>
                        </li>
                        {/if}
                        {foreachelse}
                        <li>目前还没有道具出售</li>
                        {/foreach}
                    </ul>
                </div>
                <!--座驾商城 end-->
                {/if}

                {if $mod eq 'numshop'} <!-- -->
                <!--靓号商城-->
                <div class="lianghaoShop">
                    <ul>
                        {foreach from=$gids item=v}
                        <li>
                            <strong>{$v.gid}</strong>
                            <p>
                                u币购买<br />
                                价格：<span>{$v.sale_point}</span>U币<br />
                                （有效期30天）
                            </p>
                            <p><a href="javascript:tobuynum('{$v.gid}','{$v.sale_point}')" title="" class="buyIco">我要购买</a></p>
                        </li>
                        {foreachelse}
                        <li>暂时没有找到您想要的号码</li>
                        {/foreach}
                    </ul>
                    {include file="pages1.html"}
                </div>
                <!--靓号商城 end-->
                {/if}
            </div>
            <!--thumContent end-->
        </div>
        <!--thumCon end-->
    </div>
    <!--thumMid end-->
</div>
<!--充值中心 end-->
</div>