<?php
/**
 * Created by PhpStorm.
 * User: caoxiang
 * Date: 15/1/31
 * Time: 下午6:02
 */

class UserController extends Controller {
    function actionLogin(){
        $username = Yii::app()->request->getParam('username');
        $password = Yii::app()->request->getParam('password');
        $r = User::login($username, $password);
        if($r){
            $result['error'] = 0;
            $result['message'] = '登录成功';
            $result['content'] = 0;
        }else{
            $result['error'] = 1;
            $result['message'] = '登录失败';
            $result['content'] = 0;
        }
        echo json_encode($result);
    }

    function actionLogout(){
        User::logout();
        $this->redirect('/');
    }

    function actionTotalOnline(){
        echo User::totalOnline();
    }

    function actionRegister(){
        $username = Yii::app()->request->getParam('username');
        $password = Yii::app()->request->getParam('password');
        $confirm_password = Yii::app()->request->getParam('confirm_password');
        $captcha = Yii::app()->request->getParam('captcha');

        $r = User::register($username, $password);
        if($r){
            $result['error'] = 0;
            $result['message'] = '注册成功';
            $result['content'] = 0;
        }else{
            $result['error'] = 1;
            $result['message'] = '注册失败';
            $result['content'] = 0;
        }
        echo json_encode($result);
    }
}