<?php
/**
 * Created by PhpStorm.
 * User: caoxiang
 * Date: 15/1/31
 * Time: 下午4:42
 */

class User {
    static function login($name, $password){
        $result = Api::get('user', 'login', array('username'=>$name, 'password'=>$password));
        if(isset($result['result']) && $result['result'] == 0){
            setcookie('umei_token', $result['data']['token'], time()+86400, "/");
            return true;
        }else{
            return false;
        }
    }

    static public function logout(){
        if (!isset($_COOKIE['umei_token'])) {
            return false;
        }
        $token = $_COOKIE['umei_token'];
        Api::get('user', 'logout', array('token'=>$token));
    }

    static public function register($name, $password){
        $ip = Logic::getClientIP();
        $result = Api::get('user', 'register', array('username'=>$name, 'password'=>$password, 'ip'=>$ip));
        if(isset($result['result']) && $result['result'] == 0){
            return true;
        }else{
            return false;
        }
    }

    static public function info($uid=0){
        if ($uid) {
            $result = Api::get('user', 'info', array('uid'=>$uid));
        }else{
            if (!isset($_COOKIE['umei_token'])) {
                return false;
            }
            $result = Api::get('user', 'info', array('token'=>$_COOKIE['umei_token']));
        }
        if(isset($result['result']) && $result['result'] == 0){
            return $result['data'];
        }else{
            return false;
        }
    }

    static function totalOnline(){
        $result = Api::get('user', 'activeCount');
        return $result['data'];
    }

    static function managedAnchor(){
        if (!isset($_COOKIE['umei_token'])) {
            return false;
        }
        $result = Api::get('anchor', 'managed', array('token'=>$_COOKIE['umei_token']));
        if(isset($result['result']) && $result['result'] == 0){
            return $result['data'];
        }else{
            return array();
        }
    }

    static function favoriteAnchor(){
        if (!isset($_COOKIE['umei_token'])) {
            return false;
        }
        $result = Api::get('anchor', 'favorite', array('token'=>$_COOKIE['umei_token']));
        if(isset($result['result']) && $result['result'] == 0){
            return $result['data'];
        }else{
            return array();
        }
    }

    static function anchorInfo($anchor_id){
        $result = Api::get('anchor', 'info', array('anchor_id'=>$anchor_id));
        if(isset($result['result']) && $result['result'] == 0) {
            return $result['data'];
        }else{
            return false;
        }
    }

    static function checkFav($anchor_id){
        if (!isset($_COOKIE['umei_token'])) {
            return false;
        }
        $result = Api::get('user', 'checkFav', array('token'=>$_COOKIE['umei_token'], 'anchor_id'=>$anchor_id));
        if(isset($result['result']) && $result['result'] == 0){
            return $result['data']['fav'];
        }else{
            return 0;
        }
    }

    static function anchorLevels(){
        $result = Api::get('anchor', 'levels');
        if(isset($result['result']) && $result['result'] == 0) {
            return $result['data'];
        }else{
            return false;
        }
    }
}