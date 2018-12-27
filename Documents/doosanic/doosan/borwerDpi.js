var resizeCallback;	//리사이즈 후 처리할 메소드 처리
var userAgent = navigator.userAgent
	, isRWD = true
//	, isRWDCookie = $.cookie('isRWD')
	, device = [ 
        "iPad", "GT-", "SHW-M180", "SHW-M380",
        "SHV-E140", "SHV-E150", "SHW-M430", "SHW-M480", "SHW-M500" 
    ];

for (var i = 0; i < device.length; i++) {
	if (userAgent.indexOf(device[i]) > 0) {
		isRWD = false;
	}
}

var checkWidth = function() {
	var browserWidth = $(window).width();
	var $body = jQuery('body');

	if (browserWidth <= 768) {
		if($("body").hasClass("uiWeb")) location.href=location.href;
		setsize('uiMobile');
//		$(".sitemap_shortcut").show();  필요없음

		// 모바일에서 주소표시줄 감추기
		var navAppName = navigator.appName;
		if (navAppName == "Netscape" || navAppName == "Opera") {
			window.addEventListener('load', function() {
				setTimeout(scrollTo, 0, 0, 1);
			}, false);
		}
	} else {
		if($("body").hasClass("uiMobile")) location.href=location.href;
		setsize('uiWeb');
		$(".menu").hide();
//	$(".sitemap_shortcut").hide();필요없음
	}
};

jQuery(function() {
	$(window).resize(checkWidth);
	checkWidth();
	function layer(src,w,h) {
		$('body').append('<div class="layer"></div>')
		$('.layer').load(src + ' .frame' , function() {
			nowScroll = getNowScroll();
			$('.layer .frame').css({'width':w, 'height':h, 'margin-left':-w/2, 'margin-top':nowScroll.Y + 30});
			$('.layer .frame').append('<button type="button" class="pop-btn-close">close</button>');
			$('.pop-btn-close, .layer:before').on('click', function(){
				$('.layer').remove();
			});	
			
		   
			$.getScript('/wp-content/themes/dstheme/js/doosan.js');
		});
		return false;
	}
});

var setsize = function(size) {
	var $body = jQuery('body');
	jQuery('body').removeClass('uiWeb uiMobile uiPad').addClass(size);

	/* if(size=="uiMobile") {
		bread_h = ($(".bread").length>0) ? $(".bread").outerHeight() : 0;
		$("#dBody").css("min-height", $(window).height()-$("#dHead").outerHeight()-$("#dFoot").outerHeight()-bread_h);
	} */

};