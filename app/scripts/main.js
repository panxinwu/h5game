(function(){
  var loading_barwidth = 0;
halo.use('loader', function(m){
  m.loader(['images/stage_bg_73d0c060.png',
  'images/bg_all.png',
  'images/loading_floor_2edcdddc.png',
  'images/play_bg_c906301b.png',
  'images/zhayan.png',])
  .loadend(function(percent){
    loading_barwidth = loading_barwidth +  20;
    $('#loading_bar').css('width',loading_barwidth+"%");
  })
  .complete(function(){
    var template = $('#template').html();
    $('#container').html(template);
    // $('#loading').addClass('loadingAni');
    setTimeout(function(){
      $('#loading').fadeOut('slow');
      $('#go_start').fadeIn('slow');
  },500);
    var _pri = {
      //UI元素集合
      node: {
        start_btn: $('#start_btn'),
        go_start: $('#go_start'),
        go_select: $('#go_select'),
        select_btn_all: $('.select_btn_all'),
        go_container: $('#go_container'),
        eye_icon: $('#eye_icon'),
        stage_bg_move: $('#stage_bg_move'),
        sure_btn: $('#sure_btn'),
        go_select: $('#go_select'),
        stage_game: $('#stage_game'),
        role_1: $('#role_1'),
      },
      conf: {
        clientWidth: document.body.clientWidth,
        clientHeight: document.body.clientHeight,
        radioWidth: window.screen.width,
        radioHeight: window.screen.height,
        x_position: 350,
      },
      resizeFun : {
        _fixMode: "height",
        _contentWidth: 1400,
        _contentHeight: 640,
        _resizeDelay: 0,
        _curRatio: 1,
        _docWidth: 0,
        _docHeight: 0,
        _rotate: !1,
        _els: [],
        _calcScaleRatio: function() {
            this._docWidth = document.documentElement.clientWidth,
            this._docHeight = document.documentElement.clientHeight,
            this._docWidth < this._docHeight ? (this._docWidth ^= this._docHeight, this._docHeight ^= this._docWidth, this._docWidth ^= this._docHeight, this._rotate = !1) : this._rotate = !0;
            var t = {
                width: this._docWidth / this._contentWidth,
                height: this._docHeight / this._contentHeight
            };
            return this._curRatio = t[this._fixMode] ? t[this._fixMode] : t.width > t.height ? t.height: t.width,
            this
        },
        _fixEl: function() {
          console.log(_pri.conf.radioHeight);
            for (var t = this._curRatio,
            _ = this._rotate ? 0 : 90, i = this._els.length; i--;) if(_ === 90){this._els[i].attr("style", "-webkit-transform:rotate(" + _ + "deg);transform-origin:0% 0%;width:"+_pri.conf.clientHeight+"px;height:"+_pri.conf.clientWidth+"px;left:"+_pri.conf.radioWidth+'px;');}else{ this._els[i].attr("style", "-webkit-transform:rotate(" + _ + "deg);transform-origin:0% 0%;width:"+_pri.conf.radioHeight+"px;height:"+document.body.clientHeight+"px;");}
            return this._rotate ? $("#music_switch").removeClass("rotate") : $("#music_switch").addClass("rotate"),
            this
        },
        _bindResize: function() {
            var t = null,
            _ = this;
            return $(window).bind("resize",
            function() {
                t && clearTimeout(t),
                t = setTimeout(function() {
                    _._calcScaleRatio()._fixEl()
                },
                _._resizeDelay)
            }),
            this
        },
        getScaleInfo: function() {
            return {
                ratio: this._curRatio,
                docWidth: this._docWidth,
                docHeight: this._docHeight,
                slideWidth: this._contentWidth,
                slideHeight: this._contentHeight,
                rotate: this._rotate
            }
        },
        addEl: function(t) {
            return this._els.push($(t)),
            this._fixEl()
        },
        init: function() {
            return this._calcScaleRatio()._bindResize()
        }
      },
      //绑定元素事件
      bindUI: function() {
          _pri.node.start_btn.on("click", _pri.util.startGame);
          _pri.node.select_btn_all.on("click",_pri.util.selectFun);
          _pri.node.sure_btn.on("click",_pri.util.startGameFun);
      },
      util: {
        speed: 10,
        startGameFun: function(){
          _pri.node.go_select.fadeOut('slow');
          _pri.node.stage_game.fadeIn('slow');
        },
        startMoveBg: function() {
            var $bg = $("#stage_bg_move");
            var x = 2069;
            function run() {
                x -= _pri.util.speed;
                if(x<0) x+=2069;
                $bg.css("backgroundPositionX", x+"px");
                // webkitRequestAnimationFrame(run);
                setTimeout(run,100);
            }
            run();
        },
        shake: function(){
          if(window.DeviceMotionEvent) {
              var speed = 15;
              var x, y, z, lastX, lastY, lastZ;
              x = y = z = lastX = lastY = lastZ = 0;
              window.addEventListener('devicemotion', function(event){
                  var acceleration = event.accelerationIncludingGravity;
                  x = acceleration.x;
                  y = acceleration.y;
                  if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
                    var sum = Math.abs(x-lastX) + Math.abs(y-lastY);
                    var x = Math.floor(sum/10);
                    _pri.conf.x_position = _pri.conf.x_position - x;
                    _pri.node.role_1.attr('style','-webkit-transform: translateX('+ _pri.conf.x_position+ 'px);');
                      // _pri.node.stage_bg_move.removeClass('speed0').addClass('speednone').addClass('speed3').removeClass('speednone');
                      // _pri.node.stage_bg_move.css('animation-duration', '3s');
                      // _pri.node.stage_bg_move.css('-webkit-animation-duration', '3s');
                      _pri.util.speed = 30;
                      // alert(_pri.node.stage_bg_move.attr('class'));
                    };
                  lastX = x;
                  lastY = y;
              }, false);
          }
        },
        eye_iconAni: function(){
          var clockkkkkk = setTimeout(function(){
            $(_pri.node.eye_icon).addClass('eye_iconAni');
          },3500);
          var clock = setInterval(function(){
            $(_pri.node.eye_icon).addClass('eye_iconAni');
            var clock2 = setTimeout(function(){
              $(_pri.node.eye_icon).removeClass('eye_iconAni');
            },2500);
          },4000);
        },
        init: function(){
          // _pri.util.runBgAni();
          if(_pri.conf.clientWidth > _pri.conf.clientHeight){
            // console.log('aaaa');
            var temp  = _pri.conf.clientWidth;
                _pri.conf.clientWidth = _pri.conf.clientHeight;
                _pri.conf.clientHeight = temp;
                temp = _pri.conf.radioWidth;
                _pri.conf.radioWidth = _pri.conf.radioHeight;
                _pri.conf.radioHeight = temp;
          }
          _pri.resizeFun.init().addEl($("#go_container"));
          _pri.util.eye_iconAni();
          // _pri.util.startMoveBg();
          // _pri.node.go_container.css({width:_pri.conf.width,height:_pri.conf.height,});
        },
        runBgAni: function(){
          console.log('runBgAni');
          var clock  = setInterval(function(){
            _pri.node.stage_bg_move.animate({'translate3d': '-2069px,0,0'}, 5000,function(){alert(1)});
          },0);
        },
        startGame: function(){
          $(_pri.node.go_start).fadeOut('ease');
          $(_pri.node.go_select).fadeIn('ease');
        },
        selectFun: function(){
          if($(this).hasClass('boy') || $(this).hasClass('girl')){
            $('.boy').removeClass('selected');
            $('.girl').removeClass('selected');
          }
          if(!$(this).hasClass('selected')){
            $(this).addClass('selected');
          }else{
            $(this).removeClass('selected');
          }
        },
      }
  }
  var init = function() {
      _pri.bindUI();
      _pri.util.init();
      _pri.util.shake();
      _pri.resizeFun.init();
      // window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", _pri.util.hengshuping, false);
  }
  init();
  });//end of halo.use
});
})();//end of ()
