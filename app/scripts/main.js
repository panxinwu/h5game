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
    // 定义常量
    var SEX_MALE = 0;
    var SEX_FEMALE = 1;
    var GUEST_ENUM = {
      0: '汪东城',
      1: '杜淳',
      2: '林允',
      3: 'ELLA',
      4: '宋小宝',
      5: '田亮',
      6: '杜海涛',
      7: '贾玲'
    };
    var _tool = {
      support3d: ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),
      setTranslateY: function (y) {
          return this.support3d ? 'translate3d(0, ' + y + ', 0)' : 'translate(0, ' + y + ')';
      },
      setTranslateX: function (x) {
          return this.support3d ? 'translate3d(' + x + ', 0, 0)' : 'translate(' + x + ', 0)';
      }
    };
    var requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || window.oRequestAnimationFrame
      || function(callback) {
          setTimeout(callback, 1000 / 60);
        };
    var _pri = {
      //UI元素集合
      node: {
        start_btn: $('#start_btn'),
        go_start: $('#go_start'),
        go_select: $('#go_select'),
        select_btn_all: $('.select_btn_all'),
        guest_btn_all: $('.select_btn_all', '.guest'),
        go_container: $('#go_container'),
        eye_icon: $('#eye_icon'),
        stage_bg_move: $('#stage_bg_move'),
        sure_btn: $('#sure_btn'),
        stage_game: $('#stage_game'),
        sex_item: $('.sex_item'),
        role_item_jiabin: $('.role_item_jiabin'),
        stage_tips_1: $('.stage_tips_1'),
        stage_tips_2: $('.stage_tips_2'),
        stage_tips_3: $('.stage_tips_3'),
        stage_tips_4: $('.stage_tips_3'),
        stage_tips_btn_r: $('.stage_tips_btn_r'),
        stage_tips_btn_l: $('.stage_tips_btn_l'),
        seconds_num: $('#seconds_num'),
        score_num: $('#score_num'),
        bar_red: $('.bar_red'),
        bar_black: $('.bar_black'),
        stage_tips_txt: $('#stage_tips_txt'),
      },
      conf: {
        clientWidth: document.body.clientWidth,
        clientHeight: document.body.clientHeight,
        radioWidth: window.screen.width,
        radioHeight: window.screen.height,
        x_position: 350,
        thisDom: '',
        num: 0,
        clockTime:0,
        shaked:0,
        gameClock:'',
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
          _pri.node.stage_tips_1.on("click",_pri.util.hideDom);
          _pri.node.stage_tips_2.on("click",_pri.util.hideDom);
          _pri.node.stage_tips_btn_l.on("click",_pri.util.startAgain);
          _pri.node.stage_tips_btn_r.on("click",_pri.util.share);
      },
      util: {
        share: function(){

        },
        speed: 10,
        hideDom: function(){
          $(this).fadeOut('slow');
          $(window).on('devicemotion', _pri.util.shakeMove, false);
          $(_pri.node.role_item_jiabin[_pri.util.selectedGuest[_pri.conf.num+1]]).fadeIn();
        },
        startGameFun: function(){
          _pri.util.gameClock();
          var selectedGuest = _pri.util.selectedGuest;
          var selectedSex = _pri.util.selectedSex;
          $(_pri.node.sex_item[selectedSex]).fadeIn();
          $(_pri.node.role_item_jiabin[selectedGuest[0]]).fadeIn();
          $(_pri.node.role_item_jiabin[selectedGuest[1]]).fadeIn();
          _pri.conf.thisDom = _pri.node.role_item_jiabin[selectedGuest[_pri.conf.num]];
          for(var i = 2; i < selectedGuest.length;i++){
            // $(_pri.node.role_item_jiabin[selectedGuest[i]]).fadeIn();
          }
          if (selectedGuest.length < 6) {
            alert('嘉宾必须选择6位');
          } else {
            _pri.node.go_select.fadeOut('slow');
            _pri.node.stage_game.fadeIn('slow');
            _pri.util.startMoveBg();
          }
        },
        gameClock: function(){
          _pri.conf.gameClock  = setInterval(function(){
            _pri.conf.clockTime =   _pri.conf.clockTime+1;
            $(_pri.node.seconds_num).html(60-_pri.conf.clockTime+ 's');
            if(_pri.conf.clockTime == 3 && !_pri.conf.shaked){
              $('.stage_tips_2').fadeIn();
            }
            if(_pri.conf.clockTime >= 60){
              clearInterval(_pri.conf.gameClock);
              $('.stage_tips_3').fadeIn();
              clearInterval(clock);
              return;
            }
          },1000);
        },
        startMoveBg: function() {
            var $bg = $('.stage_bg');
            var x = 0;
            function run() {
                x -= _pri.util.speed;

                if (x <= -4138) {
                  x = 0;
                }
                $bg.css('-webkit-transform', _tool.setTranslateX(x + 'px'));
                requestAnimationFrame(run);
            }
            run();
        },
        shake: function(){

          if(window.DeviceMotionEvent) {
              $(window).on('devicemotion', _pri.util.shakeMove, false);
          }else{alert('您的设备不支持重力感应');}
        },
        shakeMove: function(event){
              var speed = 25;
              var x, y, z, lastX, lastY, lastZ;
              x = y = z = lastX = lastY = lastZ = 0;
              var acceleration = event.accelerationIncludingGravity;
              x = acceleration.x;
              y = acceleration.y;
              if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
                    _pri.conf.shaked = 1; //摇动过
                    var sum = Math.abs(x-lastX) + Math.abs(y-lastY);
                    var x = Math.floor(sum/10);
                    _pri.conf.x_position = _pri.conf.x_position - x;
                    if(_pri.conf.x_position <= 0){
                        $(_pri.conf.thisDom).fadeOut();
                        $(_pri.node.stage_tips_txt).html(GUEST_ENUM[_pri.util.selectedGuest[_pri.conf.num]]);
                        $(_pri.node.bar_red[_pri.conf.num]).css('display','none');
                        _pri.conf.num = _pri.conf.num + 1;
                        $(_pri.node.score_num).html('X0'+_pri.conf.num);
                        $(_pri.node.bar_black).css('left',15*_pri.conf.num + '%');
                        if(_pri.conf.num >= 6){
                          $('.stage_tips_4').fadeIn();
                          clearInterval(_pri.conf.gameClock);
                          return;
                        }
                        $('.stage_tips_1').fadeIn();
                        // alert($(_pri.node.role_item_jiabin[selectedGuest[_pri.conf.num]]));
                        _pri.conf.thisDom = _pri.node.role_item_jiabin[_pri.util.selectedGuest[_pri.conf.num]];
                        _pri.conf.x_position = 350;
                        $(window).off();
                    }//end of if
                    $(_pri.conf.thisDom).attr('style','transform: translateX('+ _pri.conf.x_position+ 'px);display:block;');
                  }
                  lastX = x;
                  lastY = y;
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

          // _pri.node.go_container.css({width:_pri.conf.width,height:_pri.conf.height,});
        },
        startGame: function(){
          $(_pri.node.go_start).fadeOut('ease');
          $(_pri.node.go_select).fadeIn('ease');
          _pri.util.initSelect();
        },
        initSelect: function () {
          var selectedGuest = [];
          var guestArr = [0, 1, 2, 3, 4, 5, 6, 7];
          for (var i = 0; i < 6; i++) {
            var randIndex = Math.floor(Math.random() * (8 - i));
            selectedGuest.push(guestArr.splice(randIndex, 1)[0]);
          }
          _pri.node.guest_btn_all.each(function (i) {
            if (selectedGuest.indexOf(i) >= 0) {
              $(this).addClass('selected');
            }
          });
          _pri.util.selectedGuest = selectedGuest.sort();
          _pri.util.selectedSex = 0;
        },
        selectFun: function(){
          var index = $(this).index();
          if($(this).hasClass('boy') || $(this).hasClass('girl')){
            $('.boy').removeClass('selected');
            $('.girl').removeClass('selected');
            _pri.util.selectedSex = index;
            return _pri.util.toggleSelected($(this));
          }

          var selectedIndex = -1;
          var selectedGuest = _pri.util.selectedGuest;
          selectedGuest.forEach(function (item, i) {
            if (item === index) {
              selectedIndex = i;
            }
          });
          _pri.util.toggleSelected($(this), function () {
            _pri.util.selectedGuest.push(index);
          }, function () {
            _pri.util.selectedGuest.splice(selectedIndex, 1);
          });
        },
        toggleSelected: function ($el, onSelected, onRemoved) {
          if(!$el.hasClass('selected')){
            $el.addClass('selected');
            onSelected && onSelected();
          }else{
            $el.removeClass('selected');
            onRemoved && onRemoved();
          }
        }
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
