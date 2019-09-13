ROOT_URL = './';

$(function() {

	slides();
	fixed_foot();
	getTriangleWidth();

	$(window).on('resize',function(){
		getTriangleWidth();
		fixed_foot();
	});

	//技术咨询产品研发运维测试部分的小图标居中显示
	for (var i = 0; i < $('.service_cont ul img').length; i++) {
		var width_img = parseInt($('.service_cont ul img').eq(i).attr('width')) / 2;
		var height_img = parseInt($('.service_cont ul img').eq(i).attr('height')) / 2;
		$('.service_cont ul img').eq(i).css({
			'margin-left': -width_img,
			'margin-top': -height_img
		});
	}
	//首页案例白色部分效果变化
	$('.cases_cont .bd li a').mouseover(function() {
		$(this).children('h3').stop().animate({
			height: '100px'
		}, 200);
	});
	$('.cases_cont .bd li a').mouseout(function() {
		$(this).children('h3').stop().animate({
			height: '0px'
		}, 200);
	});
	//底部联系我们去掉样式和textarea的效果
	var input_len = $('.footer .contact_fr input[type=text]').length;
	for (var i = 0; i < input_len; i++) {
		if ((i + 1) % 2 == 0) {
			$('.footer .contact_fr input[type=text]').eq(i).css('margin-right', '0');;
		}
	}
	$('.footer .contact_fr form div').click(function(event) {
		var evt = event || window.event;
		$(this).css('box-shadow', '0px 0px 1px #fff inset');
		evt.stopPropagation();
	});
	$(document).click(function() {
		$('.footer .contact_fr form div').css('box-shadow', 'none');
	});
	//底部滑过小图标微信出现二维码
	$('.scan_code').mouseover(function() {
		$('.er_code').fadeIn();
		$(this).attr('src',ROOT_URL+'images/weixin_2.png');
	})
	$('.scan_code').mouseout(function() {
		$('.er_code').fadeOut();
		$(this).attr('src',ROOT_URL+'images/weixin_1.png');
	})
	$('.scan_code1').mouseover(function() {
		$('.er_code1').fadeIn();
	})
	$('.scan_code1').mouseout(function() {
		$('.er_code1').fadeOut();
	})
	$('.in_icon').mouseover(function() {
		$(this).attr('src',ROOT_URL+'images/in_2.png');
	})
	$('.in_icon').mouseout(function() {
		$(this).attr('src',ROOT_URL+'images/in_1.png');
	})
	$('.sina_icon').mouseover(function() {
		$(this).attr('src',ROOT_URL+'images/sina_2.png');
	})
	$('.sina_icon').mouseout(function() {
		$('.er_code').fadeOut();
		$(this).attr('src',ROOT_URL+'images/sina_1.png');
	})

	//发送消息成功后提示信息,之后重新刷新页面
	$('#send_message').click(function(){
		if( $('#input_name').val()==''){
			showErr('姓名不能为空');
			$('#input_name').val('').focus();
			return;
		}
		if( $('#input_company').val()==''){
			showErr('公司不能为空');
			$('#input_company').val('').focus();
			return;
		}
		if( $('#input_phone').val()==''){
			showErr('电话不能为空');
			$('#input_phone').val('').focus();
			return;
		}
		if( !(/^1[345678]\d{9}$/.test( $('#input_phone').val() ) ) ){
			showErr('电话格式不正确');
			$('#input_phone').val('').focus();
			return;
		}
		if( $('#input_email').val()==''){
			showErr('邮箱不能为空');
			$('#input_email').val('').focus();
			return;
		}
		if( !(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test( $('#input_email').val() ) ) ){
			showErr('邮箱格式不正确');
			$('#input_email').val('').focus();
			return;
		}
		if( $('#input_type').val()==''){
			showErr('项目类型不能为空');
			// $('#input_type').val('').focus();
			return;
		}
		if( $('#input_starttime').val()==''){
			showErr('开始时间不能为空');
			// $('#input_starttime').val('').focus();
			return;
		}

		// $(this).parent('form').submit();
		$.ajax({
			url: './mail.php',
			type: 'POST',
			dataType: 'json',
			data: $('#form1').serialize(),
		})
		.success(function(data) {
			if(!data.error){
				showMsg(data.msg);
				setTimeout(function(){
					location.reload();
				},1500);
			}
			else showErr(data.msg);
		});

	})

	//点击变换背景颜色
	var n=0;
	$('#change_color').on('click',function(){
		changeButton();

		var list = $('#service_list li');
		// console.log(n+','+list.length)
		if (n==list.length) n=0;
		$('.service_circle').css({'background':'url('+list.eq(n).data('image')+')','backgroundSize':'100% 100%'});
		$(this).find('p').text(list.eq(n).data('title'));
		n++;
		showHide();
	});
	$('#change_color').trigger('click');

	//返回顶部
	$('#to_top').on('click',function(){
		if (document.documentElement.scrollTop) {
			Buffe('documentElement');
		} else {
			Buffe('body');
		}
	});

	//获取真实手机号码
	$('.real_phone').one('click', function(event) {
	    /* Act on the event */
	    $(this).html('18576671072');
	});

	//获取真实邮箱
	$('.real_email').one('click', function(event) {
	    /* Act on the event */
	    $(this).html('vip@fengqihetai.com');
	});

})
/////_______________________________________________________________

	//滑动效果
	function slides(){
		$(".slideBox").slide({
			mainCell: ".bd ul",
			effect: "leftLoop",
			titCell: ".hd ul",
			autoPage: true,
			autoPlay: true,
			interTime: 5000,
			delayTime: 800
		});
		$(".banner").slide({
			mainCell: ".bd ul",
			effect: "leftLoop",
			mouseOverStop: false,
			vis:"auto",
			autoPlay: true,
			interTime: 5000,
			delayTime: 800
		});
		$(".slideBox1").slide({
			mainCell: ".bd ul li",
			effect: "leftLoop",
			titCell: ".hd ul",
			autoPage: true,
			scroll: 3,
			vis: 3,
			autoPlay: true,
			interTime: 5000,
			delayTime: 800
		});
		$(".slideBox3").slide({
			mainCell: ".bd ul li",
			effect: "leftLoop",
			titCell: ".hd ul",
			autoPage: true,
			scroll: 3,
			vis: 3,
			autoPlay: true,
			interTime: 5000,
			delayTime: 800
		});
		$(".slideBox4").slide({
			mainCell: ".bd ul li",
			effect: "leftLoop",
			titCell: ".hd ul",
			autoPage: true,
			scroll: 4,
			vis: 4,
			autoPlay: true,
			interTime: 5000,
			delayTime: 800
		});
		$(".slideBox5").slide({
			mainCell: ".bd ul",
			effect: "leftLoop",
			titCell: ".hd ul",
			autoPage: true,
			autoPlay: true,
			interTime: 5000,
			delayTime: 800
		});
	}

	function fixed_foot(){
		var DH = $('body').height();
		var WH = $(window).height();
		if(parseInt(DH)<parseInt(WH)){
			$('.footerWarp').css({'position':'absolute','bottom':0})
		}
	}

	//获取屏幕宽度，赋值给三角形的border-width,在缩放时改变其宽度
	function getTriangleWidth() {
		var width = $(window).width()
		$('.back_triangle').css('border-left-width', width);
		$('.back_triangle_up').css('border-right-width', width);
	}

	//改变按钮效果
	function changeButton(){
		var $line_top = '<span class="line line_top"></span>';
		var $line_bottom = '<span class="line line_bottom"></span>';
		var $line_left = '<span class="line line_left"></span>';
		var $line_right = '<span class="line line_right"></span>';
		$this = $('#change_color');
		$this.children('div').hide();
		$this.append($line_top, $line_bottom, $line_left, $line_right);
		var wd = $this.outerWidth(true);
		var hg = $this.height();
		var time = 1000;
		$this.find(".line_top").css({left: -wd,top: 0,width: wd,height: 2,opacity: 0}).animate({
			left: 0,opacity: 1
		}, time);
		$this.find(".line_bottom").css({
			left: wd,
			bottom: 0,
			width: wd,
			height: 2,
			opacity: 0
		}).animate({
			left: 0,
			opacity: 1
		}, time);
		$this.find(".line_right").css({
			right: 0,
			top: -hg,
			width: 2,
			height: hg,
			opacity: 0
		}).animate({
			top: 0,
			opacity: 1
		}, time);
		$this.find(".line_left").css({
			left: 0,
			top: -hg,
			width: 2,
			height: hg,
			opacity: 0
		}).animate({
			top: 0,
			opacity: 1
		}, time);
	}

	//弹出message
	function showMsg(str){
		$('.message_prompt').css({'background':'#0050A9'}).text(str).fadeIn(1000);
		setTimeout(function(){
			$('.message_prompt').fadeOut(1000);
		},1500);
	}
	function showErr(str){
		$('.message_prompt').css({'background':'#ff9a00'}).text(str).fadeIn(1000);
		setTimeout(function(){
			$('.message_prompt').fadeOut(1000);
		},1500);
	}

	//删除span
	function showHide(){
		setTimeout(function(){
			$('#change_color').find('div').show();
			$('#change_color').find('.line').remove();
		},800)
	}

	//弹性回到顶部
	function Buffe(obj){
		var timer = null;
		timer = setInterval(function() {
			var iSpeed = document[obj].scrollTop / 5;
			if (document[obj].scrollTop == 0) {
				clearInterval(timer);
			} else {
				document[obj].scrollTop = document[obj].scrollTop - iSpeed;
			}
		}, 30);
	}
