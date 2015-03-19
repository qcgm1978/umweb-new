<?php
/**
 * Created by PhpStorm.
 * User: caoxiang
 * Date: 15/3/3
 * Time: 下午5:12
 */

class Logic {
    static public function getClientIP(){
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }

    static public function makeResponse($error='0', $msg='ok', $content=''){
        return json_encode(array('error'=>$error, 'message'=>$msg, 'content'=>$content));
    }

    static public function outputError($content){
        echo self::makeResponse('1', $content, '');
        exit();
    }
    
    static public function unserializeConfig($cfg) {
        if(is_string($cfg) && ($arr = unserialize($cfg)) !== false){
                $config = array();
            
                foreach($arr as $key=>$val){
                        $config[$val['name']] = $val['value'];
                }
            
                return $config;
        }else{
                return false;
        }
    }

    static public function get_order_sn() {
        $rand24 = mt_rand(10000000, 99999999) . mt_rand(10000000, 99999999) . mt_rand(10000000, 99999999);
        $rand8 = substr($rand24, mt_rand(0, 16), 8);
        return date('ymd') . str_pad($rand8, 8, '0', STR_PAD_LEFT);
    }

}