<div class="menuSide">
<!-- 客服中心菜单begin -->
<dl class="current">
    <dt><a href="#" title="">客服中心>></a></dt>
    <dd <?php if (Yii::app()->controller->action->id == 'index' and $type == 0): ?>class="current"<?php endif ?>><a href="/service/index" title=""> >>联系客服</a></dd>
    <dd <?php if (Yii::app()->controller->action->id == 'apply'): ?>class="current"<?php endif ?>><a href="/service/apply" title=""> >>主播申请</a></dd>
    <dd <?php if (Yii::app()->controller->action->id == 'index' and $type == 4): ?>class="current"<?php endif ?>><a href="/service/index/type/4" title=""> >>用户反馈</a></dd>
    <dd <?php if (Yii::app()->controller->action->id == 'index' and $type == 1): ?>class="current"<?php endif ?>><a href="/service/index/type/1" title=""> >>找回密码</a></dd>
    <dd <?php if (Yii::app()->controller->action->id == 'index' and $type == 3): ?>class="current"<?php endif ?>><a href="/service/index/type/3" title=""> >>服务协议</a></dd>
</dl>
</div>