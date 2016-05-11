(function(){
    var xiangClock,
        zzClock;
    var _pri = {
        //UI元素集合
        node: {
            xiangDom: $('#xiang'),
            zzDom: $('#zzItem'),
            zzsuccDom: $('#zzsuccItem'),
            cloudDom: $('#cloud'),
            lhand: $('#lhand'),
            rhand: $('#rhand'),
            container: $('#container'),
            fodder: $('#fodder'),
        },
        conf: {
            time: 40,
            cloudTime:70,
        },
        //绑定元素事件
        bindUI: function() {
            // _pri.node.xiangDom.on("click", _pri.util.lhandAni);
            _pri.node.xiangDom.on("click", _pri.util.handAni);
        },
        util: {
            initxiang: function(){
                var i = 0;
                var clock = setInterval(function(){
                    if(i == 23) clearInterval(clock);
                    $(_pri.node.xiangDom).css({backgroundSize:'100rem 5rem',backgroundPosition:'-' + (3.55*i++) + 'rem 0'});
                },_pri.conf.time);
            },
            initzz: function(){
                var i = 1;
                var clock = setInterval(function(){
                    if(i == 22) clearInterval(clock);
                    $(_pri.node.zzDom).css({backgroundSize:'167.5rem 7.075rem',backgroundPosition:'-' + (7.15*i++) + 'rem 0'});
                },_pri.conf.time);
            },
            cloudAni: function(){
                $(_pri.node.cloudDom).css('visibility','visible');
                var i = 1;
                var clockCloud = setInterval(function(){
                    if(i == 12) {
                        $(_pri.node.cloudDom).css('visibility','hidden');
                        clearInterval(clockCloud);
                    }
                    $(_pri.node.cloudDom).css({backgroundSize:'192.5rem 8.85rem',backgroundPosition:'-' + (16*i++) + 'rem 0'});
                },_pri.conf.cloudTime);
            },
            handAni: function(){
                $(_pri.node.lhand).addClass('lhandAni');
                $(_pri.node.rhand).addClass('rhandAni');
                _pri.util.stopinitAni();
                setTimeout(function(){
                    // $(_pri.node.lhand).removeClass('lhandAni');
                    $(_pri.node.lhand).addClass('lhandzzAni');
                    $(_pri.node.fodder).addClass('zzlhandAni');
                },1000);
                setTimeout(function(){
                    _pri.node.cloudDom.css('visibility','visible');
                    _pri.util.cloudAni();
                },2000);
                setTimeout(function(){
                    _pri.node.cloudDom.css('visibility','hidden');
                    $(_pri.node.lhand).removeClass('lhandzzAni');
                    $(_pri.node.lhand).removeClass('lhandAni');
                    $(_pri.node.rhand).removeClass('rhandAni');
                    $(_pri.node.fodder).removeClass('zzlhandAni');
                    $(_pri.node.xiangDom).css('visibility','hidden'); 
                    $(_pri.node.zzDom).css('visibility','hidden'); 
                    $(_pri.node.zzsuccDom).css('visibility','visible'); 

                },3000);
            },
            stopinitAni: function(){
                clearInterval(xiangClock);
                clearInterval(zzClock);
            }
            
        }
    }
    var init = function() {
        _pri.bindUI();
        xiangClock = setInterval(function(){
             _pri.util.initxiang();
         },1000);
        zzClock = setInterval(function(){
             _pri.util.initzz();
         },2000);
       
    }
    init();
})();