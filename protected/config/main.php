<?php
/**
 * Created by PhpStorm.
 * User: caoxiang
 * Date: 15/3/17
 * Time: 下午4:41
 */

$conf = array(
    'components'=>array(

        'cache'=>array(
            'class'=>'system.caching.CMemCache',
            'servers'=>array(
                array('host'=>'127.0.0.1', 'port'=>11211, 'weight'=>100),
            ),
            'keyPrefix' => 'umweb:',
            'hashKey' => false,
        ),
        'db'=>array(
            'connectionString' => 'mysql:host=localhost;dbname=umei',
            'emulatePrepare' => true,
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8',
        ),
    ),
    'params'=>array(
        'api_host' => 'api.uumie.cn',
        'web_host' => 'new.uumie.cn',
    ),
);
$common = include('common.php');
return array_merge_recursive($common, $conf);