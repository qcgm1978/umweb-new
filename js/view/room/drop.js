var _move_speed = 6;

function get_w_w() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function get_w_h() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function center_entity(entity) {
    var x = (get_w_w() - entity._w) / 2;
    var y = (get_w_h() - entity._h) / 2;
    entity.attr({x: x, y: y});
}

function balloon_message(msg, life) {
    life = life ? (life * 1000) : 20000;
    var width = 900;
    var x = (get_w_w() - width) / 2;
    var y = 450;
    var b = $('<p>',{
        text:msg
    })
        .css({
            'z-index': 10000,
            alpha: 1,
            position:'absolute',
            top:y,
            left:x,
            width:width,
            'font-size': '36px',
            'font-family': 'SimHei',
            color:'#ffffff',
            'text-align': 'center',
            'text-shadow': '-1px 0px 30px #e5007c',
            filter: 'DropShadow(Color="#e5007c",OffX="15",OffY="15",Positive="1")'
        })
        .appendTo('body')
    b.animate({
        opacity: 0,
        top: 100
    }, life, function() {
        // Animation complete.
        $(this).remove()
    })
    //b.css({
    //    //filter:'glow(color=black,strength=5)'
    //    //'-ms-filter': "progid:DXImageTransform.Microsoft.Dropshadow(OffX=15, OffY=15, Color='#e5007c')"
    //});
    //b.text(msg);
    //center_entity(b);
    //b.attr({x: x, y: y});
    //b.attr({z: 99, alpha: 1});
    //$('#cr-stage').css('z-index', 10000)
    //b.bind("EnterFrame", function () {
    //    this.y -= 2;
    //});
    //b.delay(function () {
    //    this.destroy();
    //}, life);
    //b.tween({alpha: 0.0}, life);
}

$(document).ready(function () {
    //Crafty.init(get_w_w(), get_w_h());
    //
    //Crafty.timer.FPS(30);

    //Crafty.canvas.init();

    //var e = document.getElementById("cr-stage");
    //e.style.background = "transparent";
    ////pointer-events
    //e.style.pointerEvents = "none";
});

