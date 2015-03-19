<?php
/**
 * Created by PhpStorm.
 * User: caoxiang
 * Date: 15/3/7
 * Time: 下午7:26
 */

class RoomController extends Controller {
    public function actionGiftMessage(){
        // TODO: gift log
    }

    public function actionBroadcast(){
        // TODO: loudspeaker
        echo '<marquee id="castWord" align="left" behavior="scroll" direction="left" width="1000" loop="-1" scrollamount="3" scrolldelay="10" onmouseover="this.stop();" onmouseout="this.start();" style="width: 1000px;">
	            <p><span><strong>蜘蛛ya:</strong><a href="" title="" target="_blank"><a href="http://www.uumie.com/number.php?act=numshop" target="_blank">靓号上新，五位靓号起售啦！超值优惠中！</a></a></span></p>
	            <p><span><strong>蜘蛛ya:</strong><a href="" title="" target="_blank">U美直播社区祝福所有小伙伴--新春快快！羊年大吉！新年礼物已上新,更多U美礼物，请查看礼物栏。</a></span></p>
                <p><span><strong>蜘蛛ya:</strong><a href="" title="" target="_blank">U美直播社区祝福所有小伙伴--新春快乐！羊年大吉！新年礼物已上新，更多U美礼物，请查看礼物栏！</a></span></p>
            </marquee>';
    }

    public function actionBulletin($id){
        $room_info = Room::getInfoByAnchor($id);
        if ($room_info) {
            echo $room_info['welcome'];
        }else{
            echo '';
        }
    }

    public function actionCar($id){
        $info = Room::getCar($id);
        if ($info) {
            $r['error'] = 0;
            $r['content']['msg'] = '开着<span class="red">'.$info['name'].'</span>进入房间<br><span class="lcwordcar"><img src="'.$info['image'].'"></span>';
            $r['content']['swf'] = $info['swf'];
            $r['content']['swf_life'] = $info['swf_life'];
        }else{
            $r['error'] = 1;
        }
        echo json_encode($r);
    }

    public function actionGiftList(){
        $r = array();
        $list = Api::getData('room', 'giftList');
        foreach ($list as $one) {
            $r[$one['gift_cat']][] = $one;
        }

        if ($list) {
            $this->layout = false;
            $this->render('/site/gift', array('list'=>$r));
        }else{
            echo '';
        }
    }

    public function actionFans($id){
        $room_info = Room::getInfoByAnchor($id);
        if ($room_info) {
            $n = $room_info['fans'];
        }else{
            $n = 0;
        }
        echo "粉丝人数（".$n."）";
    }

    public function actionRecommend(){
        $this->layout = false;
        $this->render('recommend');
    }

    public function actionAddFav(){
        $room_id = Yii::app()->request->getParam('room_id');
        // TODO:
        $r = true;
        if($r){
            $result['error'] = 0;
            $result['message'] = '成功';
            $result['content'] = 0;
        }else{
            $result['error'] = 1;
            $result['message'] = '失败';
            $result['content'] = 0;
        }
        echo json_encode($result);
    }

    public function actionDelFav(){
        $room_id = Yii::app()->request->getParam('room_id');
        // TODO:
        $r = true;
        if($r){
            $result['error'] = 0;
            $result['message'] = '成功';
            $result['content'] = 0;
        }else{
            $result['error'] = 1;
            $result['message'] = '失败';
            $result['content'] = 0;
        }
        echo json_encode($result);
    }

    public function actionConsume(){
        // TODO: gift consume
        echo '{"RES":0,"HINT":"\u53c2\u6570\u4e0d\u662f\u4e00\u4e2a\u6807\u51c6\u7684JSON","PARAM0":"","PARAM1":"","PARAM2":""}';
    }
}