<?php
/**
 * Created by PhpStorm.
 * User: caoxiang
 * Date: 15/3/5
 * Time: 下午7:34
 */

class ServiceController extends Controller {
    public function init(){
        $this->menu_key = 'service';
    }

    function actionApply(){
        if ($_REQUEST) {
            $this->layout = false;
            Api::get('anchor', 'apply', $_REQUEST);
            echo '{"error":0, "message":"申请成功"}';
        }else{
            $this->render('apply');
        }
    }

    function actionIndex($type=0)
    {
        $data_type = Yii::app()->request->getParam('data_type');
        if ($type == 4 && isset($data_type)) {
            $content = Yii::app()->request->getParam('cont');
            $qq = Yii::app()->request->getParam('qq');
            $this->layout = false;
            if (isset($_COOKIE['umei_token'])) {
                Api::get('user', 'feedback', array('content'=>$content, 'qq'=>$qq, 'token'=>$_COOKIE['umei_token']));
            }
            echo '{"error":0, "message":"提交成功"}';
        } else {
            $title = array(
                '联系客服',
                '找回密码',
                '重新设置密码',
                '服务协议',
                '用户反馈',
            );
            $this->title = $title[$type];
            $this->render('index', array('title' => $title, 'type' => $type));
        }
    }
}