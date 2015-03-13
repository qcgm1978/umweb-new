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
        $this->render('apply');
    }

    function actionIndex($type=0){
        $title = array(
            '联系客服',
            '找回密码',
            '重新设置密码',
            '服务协议',
            '用户反馈',
        );
        $this->title = $title[$type];
        $this->render('index', array('title'=>$title, 'type'=>$type));
    }

    function actionFeedback(){
        $this->render('apply');
    }

    function actionRepasswd(){
        $this->render('apply');
    }

    function actionAgreement(){
        $this->render('apply');
    }
}