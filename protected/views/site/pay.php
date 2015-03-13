<link href="pay.css" rel="stylesheet" type="text/css" />

<br>
<br>
<br>

<div class="center">

    <div class="main">
        <div class="menu">
            <li <?php if ($mod == 'payment'):?>class="current"<?php endif?>>
                <a href="?act=payment&orid={$orid}">帐户充值</a>
            </li>
        </div>
        <?php if ($mod == 'payment'):?> <!--{* 在线充值 *} ,global.js -->
        {insert_scripts files="ajax.js"}
        <div id="mask" style="display:none"></div>
        <div id="pay" style="display:none">
            <div class="paybox" id="paybox">
                <h1><div class="t_left">充值信息确认</div><div class="t_right"><a href="javascript:hidden();" onclick="" class="close">x</a></div></h1>
                <ul class="payinfo">
                    <Li>充值账号：<span id="account">username</span>（<span id="uid">uid</span>）</Li>
                    <Li>充值金额：<span id="amount">amount</span></Li>
                    <Li>支付方式：<span id="payname">payname</span></Li>
                    <Li>订单编号：<span id="order_sn">order_sn</span></Li>
                </ul>
                <ul class="paybtn" id="paybtn">paybtn</ul>
                <ul style="display:none" id="checkbtn"><input type="submit" value="查看结果" class="submit"  onClick="javascript:pay_confirm()">提示：如果您看到网银提示“付款成功”信息，未看到网站的“支付成功”信息，请过几秒再次查看。</ul>
                <ul class="payhelp">提示：如果当前充值账号和您的账号不一致，请勿进行付款操作。</ul>
            </div>
        </div>
        <div id="alert" style="display:none; z-Index:999;" class="alert">
            <div class="box">
                <h1>提示</h1>
                <ul style="text-align:center"><li id="alertmsg"></li></ul>
                <ul style="text-align:center">
                    <input type="submit" value=" 确定 " class="submit" onClick="calert()" id="alertbtn"/>
                </ul>
            </div>
        </div>
        <form action="javascript:topay()" name="payment" method="post">
            <div class="payment">
                <ul class="left">
                    {foreach from=$paylist item=list}
                    <a href="?act=payment&paytype={$list.pay_code}&orid={$orid}" {if $nowpay.pay_code eq $list.pay_code}class="click"{/if}>{$list.pay_name}</a>
                    {/foreach}
                </ul>
                <ul class="right">
                    <h1>{if $room_name}“<span style="color:#F00">{$room_name}</span>”提醒您，{/if}您选择了“<span style="color:#F00">{$nowpay.pay_name}</span>”进行支付。</h1>
                    <form action="javascript:topay()" name="payment" method="post">
                        {if $paynomi}
                        <li>
                            选择面额：<br>
                            {foreach from=$paynomi item=nomi}
                            <input type="radio" name="parVal" value="{$nomi}" onclick="selectVal(this)">{$nomi}元
                            {/foreach}
                            <input type="hidden" name="amounts" id="amounts" class="txtinput amount" maxlength="5"/>
                            <input type="submit" value="点击此处提交" class="submit"/>
                        </li>
                        {/if}
                        {if $nowpay.pay_name == '财付通'}
                        <li>
                            <input type="hidden" name="pay_pass" value=""/>
                            充值金额：<input type="text" name="amounts" id="amounts" class="txtinput amount" maxlength="5"/> 元 <span id="countUB">(1元 = {$coin_scale}Ｕ币)</span>
                            <input type="submit" value="点击此处提交" class="submit"/>
                        </li>
                        {/if}
                        {if $nowpay.pay_name == '支付宝'}
                        <li>
                            充值金额：<input type="text" name="amounts" id="amounts" class="txtinput amount" maxlength="5"/> 元 <span id="countUB">(1元 = {$coin_scale}Ｕ币)</span>
                            <input type="submit" value="点击此处提交" class="submit"/>
                        </li>
                        {/if}
                        {if $banks}
                        <li >
                            选择银行：<br>
                            <table border="0">
                                <tr><td>
                                        {foreach from=$banks item=bank name=count}
                                        <div title="{$bank.name}" style="background:url(images/banks/{$bank.icon})" class="banks_d" onclick="get_bank('{$bank.name}','{$bank.code}')" code="{$bank.code}"></div>
                                        {if ($smarty.foreach.count.index+1) % 3 == 0 }</td></tr><tr><td>{/if}
                                        {/foreach}
                                    </td></tr>
                            </table>
                        </li>
                        <li >
                            <input type="hidden" name="pay_pass" id="pay_pass" value=""/>
                            充值金额：<input type="text" name="amounts" id="amounts" class="txtinput amount" maxlength="5"/> 元 <span id="countUB">(1元 = {$coin_scale}Ｕ币)</span>
                            <input type="submit" value="点击此处提交" class="submit"/>
                        </li>
                        {/if}
                        {if $games}
                        <li>
                            选择点卡：
                            <select name="pay_pass" onchange="change_game()" onmousewheel="return false;" id="games">
                                <option value="" nomi="">— 点击此处选择</option>
                                {foreach from=$games item=game}
                                <option value="{$game.code}" nomi="{$game.nomi}" noti="{$game.noti}">— {$game.name}</option>
                                {/foreach}
                            </select>
                            <input type="submit" value="点击此处提交" class="submit"/>
                        </li>
                        <li id="nomi" style="display:none"></li>
                        {/if}
                        <li id="notice" style="display:none"></li>
                        <li>
                            <input type="hidden" name="orid" id="orid" value="{$orid}" />
                            <input type="hidden" name="virtual_sn" id="virtual_sn" value="{$virtual_sn}" />
                        </li>
                    </form>
                    {if $nowpay.pay_desc}
                    <fieldset class="remark">
                        <legend style="margin-bottom:5px">充值提示</legend>
				<span id="remark">{$nowpay.pay_desc}<span>
                    </fieldset>
                    {/if}
                </ul>
            </div>
        </form>
        <script type="text/javascript">
            var coin_scale = {$coin_scale};
            var pay_code = "{$nowpay.pay_code}";
        </script>
        {insert_scripts files="pay.source.js"}
        <?php endif?>

    </div>
</div>