<?php
/**
 * Created by PhpStorm.
 * User: caoxiang
 * Date: 15/2/1
 * Time: 上午11:55
 */

class Room {
    static function getList(){
        $result = Api::get('anchor', 'list');
        if(isset($result['result']) && $result['result'] == 0) {
            return $result['data'];
        }else{
            return false;
        }
    }

    static function getInfoByAnchor($anchor_id){
        $result = Api::get('room', 'infoByAnchor', array('anchor_id'=>$anchor_id));
        if(isset($result['result']) && $result['result'] == 0) {
            return $result['data'];
        }else{
            return false;
        }
    }

    static function getCommonInfo(){
        $result = Api::get('site', 'commonInfo');
        if(isset($result['result']) && $result['result'] == 0) {
            return $result['data'];
        }else{
            return false;
        }
    }

    static function getCar($id){
        $result = Api::get('room', 'car', array('car_id'=>$id));
        if(isset($result['result']) && $result['result'] == 0) {
            return $result['data'];
        }else{
            return false;
        }
    }
}