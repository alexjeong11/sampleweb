/*------------------------------------------------------------
	Created : 2012.10.10
	Updated 1: 2013.03.07
	Updated 2: 2013.05.04
	Author : Kim ji hyun
 ------------------------------------------------------------*/
var lang='';
var ua = navigator.userAgent; //0715

var arrAlert ={
					"en" : {"font-small":"It's the smallest font size", "font-big":"It's the biggest font size"},
					"kr" : {"font-small":"가장 작은 글자 크기입니다", "font-big":"가장 큰 글자크기입니다"},
					"zh" : {"font-small":"最小的字体大小", "font-big":"最大的字体大小"},
					"es" : {"font-small":"Es la letra más pequeña.", "font-big":"Es la letra más grande."}
				};

if( window.console == undefined ){ console = { log : function(){} }; }

var getNowScroll = function(){
	var now = {};
	if(typeof pageYOffset!= 'undefined'){
		//most browsers except IE before #9
		now.X = pageXOffset;
		now.Y = pageYOffset;
	} else {
    	var de = document.documentElement;
    	var b = document.body;
	
    	now.X = document.all ? (!de.scrollLeft ? b.scrollLeft : de.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX);
    	now.Y = document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);
	}
	return now;
}
/*var myScroll;

function loaded () {
	console.log('st')
	myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: true, mouseWheel: true });
}

 document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);*/
$(function(){
	
	 // 언어 구분
	langDir='en';
	lang='en';
	if(document.URL.indexOf('/kr/') >= 0) {
		langDir = 'kr';
		lang='kr';
	} else if(document.URL.indexOf('/cn/') >= 0) {
		langDir = 'cn';
		lang='zh';
	}else if(document.URL.indexOf('/es/') >= 0) {
		langDir = 'es';
		lang='es';
	}

	setGnbInit();
	setTopAnchor();
	//setSlider(); //0708 주석 처리


	$(window).bind('resize',function(){
		browserWidth = $(window).width();
		if(browserWidth>768) 	onlyWeb();
		else onlyMobile();
	});
	
	//모든 A link클릭시 GA 클릭 이벤트 추적을 단다.
	
	$('a').on('click', function() {
		ga('send', 'event', 'a 링크클릭', 'click', document.title +" > " + $(this).text() +" > "+ $(this).attr('href'));
	});
	
	// browser check
	var MSIE8 = (ua.indexOf('compatible; MSIE 8') >= 0);
	if(MSIE8) setIE8();
	//if(ua.match('Firefox')==null) setSlider(); //0715
	
	// 메인 상단 공지
	if(getCookie("pop_maininfo") != "pop_maininfo"){
		$('#notice-bar').insertBefore($('#dHead')).show();
	}
	$('#notice-bar .pop-btn-close').click(function(){
		$('#notice-bar').hide();
	});
	$("input#close-one-day").on("click", function(){
		if($(this).prop("checked")){
			setCookie("pop_maininfo","pop_maininfo",1);
			$('#notice-bar').hide();
	    }		
	});
	function setCookie(name, value, expiredays){
	    var todayDate = new Date();
	    todayDate.setDate(todayDate.getDate() + expiredays);
	    document.cookie=name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}
	function getCookie(name){
	    var nameOfCookie = name + "=";
	    var x =0;
	    while (x<=document.cookie.length){
	        var y = (x+nameOfCookie.length);
	        if(document.cookie.substring(x,y) == nameOfCookie){
	            if((endOfCookie=document.cookie.indexOf(";",y))==-1){
	            	endOfCookie = document.cookie.length;
	            }
	                
	            return unescape(document.cookie.substring(y, endOfCookie));
	        }
	        x=document.cookie.indexOf(" ",x) +1;
	        if(x==0){
	        	break;
	        }
	    }
	    return "";
	}
	
	// 게시판 메타태그
	if ($("#title")) { 
		$("meta[name='title']").attr("content", $("#title").val());
	}
	if ($("#keywords")) {
		$("meta[name='keywords']").attr("content", $("#keywords").val());
	}
	if ($("#description")) {
		$("meta[name='description']").attr("content", $("#description").val());
	}
	$("meta[name='WT.ti']").attr("content", $("#title").val());
	
	// 설명접기/열기
	//($("#section_head .description-area").length>0) ? $(".head-toggle").show() : $(".head-toggle").hide();
	var txtToggle;
	if(lang === 'kr') txtToggle = "설명접기"
	else if(lang === 'en') txtToggle = "Hide Summary"
	else if(lang === 'zh') txtToggle = "隐藏说明"
	else if(lang === 'es') txtToggle = "Cerrar"
	$('#dBody > .section_head').append('<a href="#" class="head-toggle">'+ txtToggle +'</a>');
	
	($(".uiWeb .product_ui").length>0) ? $(".head-toggle").show() : $(".head-toggle").hide();
	
	$(".head-toggle").on("click", function() {
		$(this).toggleClass("on");
		$(this).parent().find('p').slideToggle("fast");

		$(".head-toggle").text(function(i, text){
			if(lang === 'kr') return text === "설명보기" ? "설명접기" : "설명보기"
			else if(lang === 'en') return text === "Show Summary" ? "Hide Summary" : "Show Summary"
			else if(lang === 'zh') return text === "显示摘要" ? "隐藏说明 " : "显示摘要"
			else if(lang === 'es') return text === "Abrir" ? "Cerrar" : "Abrir"
	    });
		return false;
	});
	
	// 뉴스검색
	$(".btn_boardSearch").click(function(){
		$(".boardSearch_block").toggle();
		$("#btn_show_all").toggle();
		$(".btn_boardSearch").toggleClass("active");
		
		// 검색 눌렀을때 focus 이동
		if($(".boardSearch_block").is(':visible')) {
			$('#searchword').val('');
			$('#searchword').focus();
		}

		return false;
	});
	
	// 뉴스검색페이지
	$("#searchword").click(function() {
		$(this).val("");
	});
	
	// 개인정보 수집 및 이용동의 textarea 열기/접기
	/*$('.area_switch .btn').each(function(){
		var $area = $(this).parent().prev('.textarea');
		$(this).toggle(function()
			{
				$($area).addClass("wide");
				$(this).css('color','#1e1e1e');
				$('.ico_arrowL', this).removeClass('type_down_color').addClass('type_up_gray');
				return false;
			},
			function(){
				$($area).removeClass("wide");
				$(this).css('color','');
				$('.ico_arrowL', this).removeClass('type_up_gray').addClass('type_down_color');
				return false;
			}
		);
	});*/
	
	// 상단검색
	 $('.btn_search_open').click(function(){
		$('.gnb-search-form').toggle();		
		$(".uiMobile #gnbMenu").hide();

		if($('.gnb-search-form').is(":visible")) {
			$('#searchbar').find('.keyworld').focus();
			$("body.uiMobile").append("<div id='dimmed'></div>");
			$("#dimmed").bind("click", function() {
				 $('.btn_search_open').trigger("click");
			});
		} else {
			$("#dimmed").detach();
		}
		return false;
	});	

	var searchbarFlag = false;
	$('#searchbar').mouseenter(function(){
		searchbarFlag = true;
	});
	$('#searchbar').mouseleave(function(){
		searchbarFlag = false;
	});

	var searchbarFlag = false;
	$('#searchbar').focusin(function(){
		searchbarFlag = true;
	});

	 $('.btn_menu_open').on("click",function(){
		 $("#gnbMenu").slideToggle();
		 $('.gnb-search-form').hide();		
		 $("#dimmed").detach();
		 return false;
	 });

	
	$(this).click(function(){
		if ( $('.gnb-search-form').is(":visible")) {
			var query = $("#query1").val();
			if(query=="询问" || query=="Search" || query=="검색")
				return false;		
			if(query==null || query=="")
				return false;
		}
	}); 

	$('body').click(function(){
		if ( $('.gnb-search-form').is(":visible")) {
			if ( !searchbarFlag ){
				$('.gnb-search-form').hide();
				$("#dimmed").detach();
			}
		}
	});
	
	// 텍스트박스 리셋
	$('input.reset').each(function(){
		var resetFlag = true;
		$(this).on('click', function(){
			if ( resetFlag ) {
				$(this).val('');
				resetFlag = false; 
			}
		});
		$(this).on('keydown', function(){
			if ( resetFlag ) {
				$(this).val('');
				resetFlag = false; 
			}
		});
	});
	
	// 검색 submit
	$("#query1").keydown(function(e) {
		if (e.keyCode == 13) doMainSearch();
	});

	//리스트 아코디언
	if($(".accordion").length>0) {
		$(".accordion dt").click(function() {
			if($(this).hasClass("on")) {
				$(this).removeClass("on");
				$(this).next().slideUp();
			} else {
				$(".accordion dt").removeClass("on");
				$(".accordion dd").hide();
				
				$(this).addClass("on");
				$(this).next().slideDown();
			}
			return false;
		});

	}
	if($(".history-list").length>0) {
		$(".history-list h3").click(function() {
			if($(this).hasClass("on")) {
				$(this).removeClass("on");
				$(this).next().slideUp();
			} else {
				$(".history-list h3").removeClass("on");
				$(".history-list article").hide();
				
				$(this).addClass("on");
				$(this).parent().find("article").slideDown();
			}
			return false;
		});

	}

	//$(".uiMobile [class*='type-accordion'].web-except > li .tit + .cont").hide();
	if($("[class*='type-accordion']").length && $(".uiWeb .web-except").length == 0 && $(".uiWeb .mobile-except").length == 0) {
		/* list = $("[class*='type-accordion'] .tit").each(function(i){
			var val = $(this).height();
		}) */
		$("[class*='type-accordion'] .tit + .cont").hide();
		$(".type-accordion .tit:not(.tit-only), .type-accordion1 .tit:not(.tit-only)").bind('click', function() {
			
			if ($(this).is('[href^=#]')){
				$(this).parent().toggleClass("on");
				var href = $(this).attr('href');
				$(href).stop().slideToggle();
			} else if ($(this).next('.cont').length){
				$(this).parent().toggleClass("on");
				$(this).next().stop().slideToggle();
			}
			$(this).parent().siblings().removeClass('on').find('.tit + .cont').hide();

			// 리스트 하위가 있지만 리스트 펼치기 전이었던 경우에만 이동시키기
			if($(this).parent().children('.list_detail') != null)
			{
				if( !( $(this).parent().attr('class') == null || $(this).parent().attr('class').indexOf('on') < 0 ) )
				{
	//				$('html body').scrollTop($(window).scrollTop());
				//	$('html body').delay(500).animate({'scrollTop':$(this).offset().top});
				}
			}
			
			if($(this).parent().find('.bxslider').length){
			//	setSlider();
			}
			return false;
		});
		
		$(".type-accordion2 .tit").click(function() {
			$(this).parent().toggleClass("on");
			if ($(this).is('[href^=#]')){
				var href = $(this).attr('href');
				$(href).toggleClass('spread');
				$('html, body').animate({'scrollTop':$(href).offset().top})
			} else {
				$(this).next().stop().slideToggle();
			}
			return false;
		});

	}
	
	//language select
	$("#lang_option li").each(function() {
		$(this).find("a").on("click", function() {
			change_lang = $(this).data("lang");
			trackClicks("Change Lang : " + change_lang);
			
			$("#mainLang > var").html(change_lang);
			$("#selectedLang").html($(this).html());			
			
			loc = location.href;
			loc = loc.replace("/"+langDir+"/", "/"+$("#mainLang > var").text()+"/");
			
			//2016-07-12
			var kr = [
		  		"/kr/ir/disclosure",
		  		"/kr/ir/announce",
				"/kr/csr/cyberreport/"
		  	];
			url = location.href;
		  	for(var i=0; i<kr.length; i++) {
		  		if(url.indexOf(kr[i]) > -1) {
		  			loc = "/en/lang/";
		  			break;
		  		}
		  	}

		  	// 언어 변환시 param 제외
		  	var noParam = [
		  	    "/contact-us/",
				"/news-view",
				"/news/"
		  	];
		  	
		  	for(var i=0; i<noParam.length; i++) {
		  		if(url.indexOf(noParam[i]) > -1) {
		  			loc = "/"+$("#mainLang > var").text() + noParam[i];
		  			break;
		  		}
		  	}

			if(url.indexOf('news-view') > -1)
			{
				loc = "/" + $("#mainLang > var").text() + "/media/news/";
			}
			
			$("#langChange").attr("href", loc);						

			return false;
		});
	});
	
	//switch ko/en pages
	$("#sleLang").on('change', function() {
        if (this.selectedIndex!==0) {
			loc = location.href;
			loc = loc.replace("/"+langDir+"/", "/"+$("#sleLang :selected").attr('data-lang')+"/");
            window.location.href = loc;
        }		
	});

	/*
	document.getElementById("sleLang").onchange = function() {
        if (this.selectedIndex!==0) {
            window.location.href = this.value;
        }        
    };
    */

	$('.uiWeb .line-break').css({'white-space':'pre-wrap'}).html(function() {
	    return $.trim($(this).html()).replace(/\t/g, '');
	});
	
	$('.btn_toggle').click(function(){
		var target = $(this).attr('href');
		$(target).toggle();
		return false;
	});
	
	$('.btn_toggle_next').click(function(){
		$(this).next().show();
		return false;
	})
});

function focusHandler(name){
	var target = $("input[name='"+name+"']");
	if( target.length == 0 ){a
		target = $("textarea[name='"+name+"']");
	}
	target.val("");
	target.focus();
}


function numberOnly(id){
	var target = getElById(id);
	//var target = $("#"+id);
	var regx = /^[0-9]*$/;
	target.keyup(function(){
		var val = this.value;
		var newVal = "";
		for(var i=0; i<val.length; i++){
			var tmpVal = val.substring(i, i+1);
			if( tmpVal != "" ){
				if( regx.test(tmpVal) ){
					newVal += tmpVal;
				}
			}
				
		}
		
		target.val( newVal );
		
	});
	
}

//URL 언어구분을 DB 구분으로..
function urlLangToDbLang($lang){
	if( $lang == "kr" ){
		return "ko"
	} else if( $lang == "cn" ){
		return "zh"
	} else if( $lang == "en" ){
		return "en";
	}
	return "ko";
}

String.prototype.replaceAll = function (stringToFind, stringToReplace) {
    if (stringToFind === stringToReplace) return this;
    var temp = this;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
};

function touchHelpInit(targetSelector) {
    var $touchParent = $(targetSelector);

    if ($touchParent.length == 0 || targetSelector == undefined) return;

    var hideTime = 200,
        parentCss = 'touchParent';

    $touchParent.addClass(parentCss).append($('<div class="msg_touch_help"><img src="/wp-content/themes/dstheme/img/bg_touch_help.png" alt=""/></div>')).scroll(function(){
        $(this).find('.msg_touch_help').fadeOut(hideTime);
    });
}



/**************************** mobile *************************/
function onlyMobile() {
	onlyMobile.called = true; // function detect
	
	//s : Bread Crumb(개선전, 삭제할 내용)
	$(".full-breadcrumb").on("click", function() {
		$("#full-location").addClass("full-open");
		$("#full-location span, .hide-breadcrumb").show();
		$("#full-location .depth_group .depth2").hide();
		$(this).hide();
		return false;
	});

	$(".hide-breadcrumb").on("click", function() {
		$("#full-location").removeClass("full-open");
		$("#full-location span").hide();
		$("#full-location span:last-child, .full-breadcrumb").show();
		$("#full-location .depth_group .depth2").hide();
		$(this).hide();
		return false;
	});
	//e : Bread Crumb(개선전, 삭제할 내용)

	// Bread Crumb(개선후)
	$(".full-breadcrumb").on("click", function() {
		$("#full-location").addClass("full-open");
		$("#full-location div, .hide-breadcrumb").show();
		$("#full-location .depth_group .depth2").hide();
		$(this).hide();
		return false;
	});

	$(".hide-breadcrumb").on("click", function() {
		$("#full-location").removeClass("full-open");
		$("#full-location div").hide();
		$("#full-location div:last-child, .full-breadcrumb").show();
		$("#full-location .depth_group .depth2").hide();
		$(this).hide();
		return false;
	});

	$(".depth_group a.hasDetail").on("click", function() {
		$(this).toggleClass('on').next().stop().slideToggle();
		return false;
	});

	// rss
	$("#rss_search").change(function() {
		val = $("#rss_search option:selected").val();

		$(".rss_list_type li .btn").find("em").removeClass().addClass("ico_rss type_"+val.toLowerCase());
		$(".rss_list_type li .btn").find("a").text(val);

		$(".rss_list_type li").each(function() {
			rss_lnk = (val=="XML") ? $(this).find(".rss-url").text() : "http://add.my.yahoo.com/rss?url="+$(this).find(".rss-url").text();
			$(this).find(".ico_xml").attr("href", rss_lnk);
		});
	});
	
	$('.board_search_toggle .btn_search[type=button]').click(function(){
		$('.board_search_toggle').addClass('open');
		return false;
	});
	
	$('.board_search_toggle .btn_close').click(function(){
		$('.board_search_toggle').removeClass('open');
	});
	
	$(".media-ui .list > li").each(function(){ // 광고 & PR 영상 타이틀 썸네일 위로 올리기
		$(this).find('.title').prependTo(this);
	})
}

function mobileNav(){
	$(".uiMobile [class*='type-nav']").each(function(){
		
		var el = $(this);
		var el_child = $(el).find("li");
		var num = el_child.length;
		//console.log(num)
		$(this).find('select').remove();
		
		if (num > 3){
			$(el).append('<select>')
			el_child.each(function(i){
				var txt = $(this).text();
				var links = $(this).find('a').attr('href');
				var active = $(el).find('.on').index();
				$(el).find('select').append('<option>');
				$(el).find('select option').eq(i).text(txt).val(links)
				$(el).find('select option').eq(active).prop('selected', true);
				$(el).find('select').bind('change', function(){
					var optionVal = $(this).val();
					var term = '#';
					var _id = $(this).attr('href');
					var _text = $(this).find("option:selected").text();
					//var _group = _id.substr(1,5);
					if( optionVal.indexOf( term ) != -1 ){
						var _group = optionVal.substr(1,5);
						$(this).parent().addClass('on').siblings().removeClass('on');
						
						var excection = $('.uiMobile .history, .uiWeb .part_ui').length;
						if($(this).parents('[class*="type-nav"]').attr('data-ui') == 'cate') {
							var cate = optionVal.replace(/#/, "");
							var cate_text = $(this).text();
							$('.'+cate).parent('li').show();
							$('.global:not(.'+cate+')').parent('li').hide();
							$('.title-sub').text(_text);
							resetTilePosition();
						} else if($(this).parents('[class*="type-nav"]').attr('data-ui') == 'scroll') {
							var t = $(_id).offset().top -50;
							$('html, body').stop().animate({scrollTop:t},300);
						} else {
							if(excection == 0){ // toggle
								$('[id^='+_group+']').hide();
								$(optionVal).show();
							} else { // 스크롤 이동
								var t = $(_id).offset().top -50;
								$('html, body').animate({scrollTop:t},300)
							}
						}
					} else {
						location.href = $(this).val()
					}
					var test = $('option').eq(active).text();
				});
			});
			el.find('ul').hide();
			
		} else {
			if(num === 1){
				el.hide();
			} else if(num === 2 && el.hasClass('type-nav-1')){
				el_child.css({'width':'50%'});
			} else if(num === 3 && el.hasClass('type-nav-1')){
				el_child.css({'width':'33.3333%'});
			}
		}
		
		/* 탭 다음에 오는 타이틀 히든 처리 */
		$('.contents-wrap .title-sub:eq(0)').addClass('invisible');
		$('.contents-wrap .navi_cont > *').find(':header:not(.reset):not(.tit)').eq(0).addClass('invisible');
		$('.contents-wrap [class*=type-nav] + :header:not(.reset):not(.tit)').addClass('invisible');
		
		$(this).css({'height':'auto','visibility':'visible'});
	});
	
}
function webNav(){
	$("[class*='type-nav']").each(function(){
		$(this).find('ul').show();
		$(this).find('select').remove();
	});
}

//모바일 화면에서 테이블의 정보가 많을 경우 테이블 가로 스크롤 발생
$(function() {
    touchHelpInit('.touchParent');
});

/**************************** pc *************************/
function onlyWeb() {	
	onlyWeb.called = true;
	webNav()
	// 언어변경 셀렉트
	$('#lang_title a').toggle(
		function(){ 
			$(this).closest('.lang_title').addClass('on');
			$('#lang_option').show().click(function(){
				$(this).hide();
			});
		},
		function(){
			$(this).closest('.lang_title').removeClass('on');
			$('#lang_option').hide();
		}
	);
	$('#lang_option a').on('click', function(){
		$('#lang_title a').trigger('click');
		return false;
	});

	
	// 글자크기 확대/축소	
	var font_size = 100;
	var font_max = 120;
	var font_min = 90;
	var font_gap = 10;

	var txt_expand;
	if(lang === 'kr') txt_expand = '본문 확대';
	else if(lang === 'en') txt_expand = 'Enlarge text';
	else if(lang === 'cn') txt_expand = '正文 扩大';
	else if(lang === 'es') txt_expand = 'Enlarge text';

	var txt_reduce;
	if(lang === 'kr') txt_reduce = '본문 축소';
	else if(lang === 'en') txt_reduce = 'Reduce text';
	else if(lang === 'cn') txt_reduce = '正文 缩小';
	else if(lang === 'es') txt_reduce = 'Reduce text';
	
	var landingCheck = $('[class*="landing"]:not(.landing-visual-2)').length;
	var fontCheck = $('.fontsize').length;
	if (!landingCheck && !fontCheck) $('#dBody > .section_head').append('<div class="fontsize"><a href="#none" class="size_expand">'+txt_expand+'</a><a href="#none" class="size_reduce">'+txt_reduce+'</a></div>')

	if($(".fontsize").length>0) {
		font_size = ($.cookie("cookie_font")) ? parseInt($.cookie("cookie_font"),10) : 100;
		$("#dBody").css("font-size", font_size+"%");
		if(font_size <= font_min) $(".fontsize a").eq(1).addClass("disabled");
		if(font_size >= font_max) $(".fontsize a").eq(0).addClass("disabled");
	}

	$(".fontsize a").on("click", function() {
		if($(this).attr("class")=="size_expand") {
			font_size += font_gap;
			if(font_size>font_max) {
				font_size = font_max;
				$(this).addClass("disabled");
				alert(arrAlert[lang]["font-big"]);
			} else {
				$(".fontsize a").removeClass("disabled");
			}
			$("#dBody").css("font-size", font_size+"%");

			if($("#search-frame").length>0) {
				$("#search-frame").get(0).contentWindow.setFontSize(font_size);
			}
		} else {
			font_size -= font_gap;
			if(font_size<font_min) {
				font_size = font_min;	
				$(this).addClass("disabled");
				alert(arrAlert[lang]["font-small"]);
			} else {
				$(".fontsize a").removeClass("disabled");
			}
			$("#dBody").css("font-size", font_size+"%");

			if($("#search-frame").length>0) {
				$("#search-frame").get(0).contentWindow.setFontSize(font_size);
			}
		}
		$.cookie("cookie_font", font_size);

		return false;
	});

	// 사이트맵
	$('.btn_trigger').on("click", function(){
		$(this).next().css("bottom", $("#dFoot").outerHeight());
		$(this).next().stop().slideToggle(250).siblings('.sitemap_ui').hide();
		$(this).toggleClass('on').siblings('.btn_trigger').removeClass('on');
		return false;
	});
	$('.sitemap > .btn_close').click(function(){
		$('.sitemap_ui').hide();
		$('.btn_trigger').removeClass('on');
		return false;
	});

	if($.cookie('main_notice_cookie')=="ok") {
		$("#main-notice-box").hide();
	}

	$(".ico-notice-close").on("click", function() {
		if($("#today_check").is(":checked")) {
			$.cookie('main_notice_cookie', 'ok', { expires: 1, path: '/' });
		} else {
			$.cookie('main_notice_cookie', null);
		}
		$("#main-notice-box").slideUp("fast");
		return false;
	});

	//video pop
	videoPop();
	imagePop();

	$(".pop-btn-close").on("click", function() {
		$("#video-pop").hide();
		//$("#video-src").stop();
		$("video").each(function () { this.pause() });
		$("#dimmed").detach();

		return false;
	});
	
	if($(".landing").length>0) {
		var h2Array = [];
		var pArray = [];
		var area = $(".landing [class*='type-grid'] > *").not('[class^=type-box]');
		
		/*$(area.find('h2')).each(function(i){
			h2Array.push($(this).outerHeight());
			h2Max = Math.max.apply(Math,h2Array);
		});
		$(area.find('h2')).height(h2Max);*/
		
		if(area.find('p').next().length){
			$(area.find('p')).each(function(i){
				pArray.push($(this).outerHeight());
				pMax = Math.max.apply(Math,pArray);
			});
			$(area.find('p')).height(pMax);
		}
	}

	if($(".contents-relation-wrap").length>0) {
		var titArray = [];
		var area = $(".contents-relation-wrap [class*='type-grid'] > *");
		
		$(area.find('h4')).each(function(i){
			titArray.push($(this).outerHeight());
			titMax = Math.max.apply(Math,titArray);
		});
		$(area.find('h4')).height(titMax);
	}
	
	// rss
	$("input[name=rssReader]").on("click", function() {
		val = $('input[name=rssReader]:checked').val();
		$(".rss_list_type li .btn").find("em").removeClass().addClass("ico_rss type_"+val.toLowerCase());
		$(".rss_list_type li .btn").find("a").text(val);

		$(".rss_list_type li").each(function() {
			rss_lnk = (val=="XML") ? $(this).find(".rss-url").text() : "http://add.my.yahoo.com/rss?url="+$(this).find(".rss-url").text();
			$(this).find(".ico_xml").attr("href", rss_lnk);
		});
	});
	
	if ($("[class*='type-nav']").length){
		var el = $("[class*='type-nav']");
		el.find('ul').show();
		el.find('select').remove();
	}
	
}

function videoPop(){
	$("[data-rel='video'], [data-rel='video']").on("click", function(e) {
		//web의 경우 영상의 href속성 클릭을 방지.
		e.preventDefault();

		var Browser = {
		   chk : navigator.userAgent.toLowerCase()
		 }
		
		var isIE = false;
	  
		Browser = {
			  ie : Browser.chk.indexOf('msie') != -1,
			  ie6 : Browser.chk.indexOf('msie 6') != -1,
			  ie7 : Browser.chk.indexOf('msie 7') != -1,
			  ie8 : Browser.chk.indexOf('msie 8') != -1,
			  ie9 : Browser.chk.indexOf('msie 9') != -1,
			  ie10 : Browser.chk.indexOf('msie 10') != -1,
			  ie11 : Browser.chk.indexOf('trident') != -1,
			  safari : Browser.chk.indexOf('safari') != -1,
			  safari3 : Browser.chk.indexOf('applewebkir/5') != -1,
			  mac : Browser.chk.indexOf('mac') != -1,
			  chrome : Browser.chk.indexOf('chrome') != -1,
			  firefox : Browser.chk.indexOf('firefox') != -1
		 }
		flash = $(this).attr("data-format") == "flash";
		if(Browser.ie || Browser.ie6 || Browser.ie7 || Browser.ie8 || Browser.ie9 || Browser.ie10 || Browser.ie11 || flash){
			isIE = true;
		}	
	
		play_id = $(this).attr("data-id");
		//select 박스를 통해 선택된 경우에는 값을 id로 넘겨줌
		select_play_id = $(this).parent().find('select').val();
		if(select_play_id != null && select_play_id !='' && select_play_id !='undefined' && select_play_id != undefined)
		{
			play_id = select_play_id+'file';
		}
		
		play_url = $(this).attr("href");

		//select 박스를 통해 선택된 경우에는 값을 id로 선택된 옵션의 영상을 재생.
		select_play_url = $('#' + play_id).find(".fileUrl").attr('href');
		if(select_play_url != null && select_play_url !='' && select_play_url !='undefined' && select_play_url != undefined)
		{
			play_url = select_play_url;
		}
		
		if(onlyWeb.called)
		{
			play_title = $('#' + play_id).find(".title").text();
			play_info = $('#' + play_id).find(".info").html();
			play_desc = $.trim($('#' + play_id).find(".desc").html()).replace(/\t/g, '').replace(/\n/g,'');
		
			play_thumb = $('#' + play_id).find(".thumb").find("img").attr("src");
			if(!play_thumb) play_thumb = $('[data-id='+play_id+']').find("img").attr("src");

			download_url = "/wp-content/themes/dstheme/file_download.php";
			var last_idx = play_url.lastIndexOf("/");
			file_path = play_url.substring(1, last_idx);
			file_name = play_url.substring(last_idx+1);

			if(!$("#dimmed").length){
				$("body").append("<div id='dimmed'></div>");
			}
			$("#dimmed").bind("click", function() {
				 $('.pop-btn-close').trigger("click");
			});

			$("#video-pop h3").text(play_title);
			$("#video-pop .video_info").html(play_info);
			
			if(play_desc == 'undefined' || play_desc == undefined || play_desc.indexOf('undefined') > -1)
			{
				//play_desc = '';
				$("#video-pop .desc").hide();
			}
			$("#video-pop .desc").html(play_desc);
			
			nowScroll = getNowScroll();
			
			$("#video-pop").css({'top':nowScroll.Y + 30});
			
			var frameCheck = $('#video-pop iframe').length;
			if (play_url.indexOf('youtube') >= 0 && !frameCheck){
				$("#video-pop").css({'width':'720px','margin-left':'-384px'});
				$("#video-pop video").hide();
				$("#video-pop .video_info").after("<iframe width='720' height='480' src="+ play_url +" frameborder='0' allowfullscreen=''></iframe>")
				$("#video-pop .type_btn").hide();
			} else {

				if(isIE)
				{
					//mp4 재생을 위한 video 영역 , flv 재생을 위한 flash 영역 IE인 경우 flowplayer를 사용하도록 컨트롤
					$("#doosan-video").hide();
					$("#doosan-video-flash").show();
					$("#doosan-video-flash a").attr("href",play_url.replaceAll(".mp4",".flv")).addClass('btn');
					$("#doosan-video-flash a").flowplayer("/flowplayer/flowplayer-3.2.15.swf",{plugins:{controls:{autoHide: false}},clip :{autoPlay: false,autoBuffering: true,}});
				}else{
					$("#doosan-video").show();
					$("#doosan-video-flash").hide();
					$("#video-src").attr("src",play_url);
					$("#video-pop video").attr("src",play_url);
					$("#video-pop video").attr("poster",play_thumb);
				}

				
				if($(this).attr('data-width')){
					var vWidth = $(this).attr('data-width');
					$("#video-pop video").width(vWidth).height(vHeight);
					$("#video-pop").css({'width':vWidth,'margin-left':-vWidth/2});
				}
				
				if($(this).attr('data-height')){
					var vHeight = $(this).attr('data-height');
					$("#video-pop video").height(vHeight);
				}
			}
			// 페이지 전체에 do-not-download 옵션을 적용
			var allowDownload = !$("div").hasClass("do-not-download");
			//특정 파일에만 다운로드 금지 옵션을 적용
			var allowOneFileDownload = !$(this).parent().children().hasClass("one-file-do-not-download");

			if(allowDownload && allowOneFileDownload){
				$("#video-pop .type_btn").show();
				$("#video-pop .type_btn").attr("href", download_url+"?key=movie"+"&path="+file_path+"&name="+file_name);
			}else{
				$("#video-pop .type_btn").hide();
			}
			
			$("#video-pop").show();
		}else{
			window.location.href = play_url;
		}
		return false;
	});
}


function imagePop(){
	$("[data-rel='image']").on("click", function() {
		play_id = $(this).attr("data-id");
		play_url = $(this).attr("href");
		play_title = $('#' + play_id).find(".title").text();
		play_info = $('#' + play_id).find(".info").html();
		play_desc = $.trim($('#' + play_id).find(".desc").html()).replace(/\t/g, '');	
		play_thumb = $('#' + play_id).find(".thumb").find("img").attr("src");

		$("#image-pop h3").text(play_title);
		$("#image-pop .video_info").html(play_info);

		if(!$("#dimmed").length){
			$("body").append("<div id='dimmed'></div>");
		}
		$("#dimmed").bind("click", function() {
			 $('.pop-btn-close').trigger("click");
		});
	
		nowScroll = getNowScroll();
		$("#image-pop").css({'top':nowScroll.Y + 30});
		
		$(".image_src").attr('src',play_url);
		$("#image-pop").show();	
		$("#image-pop").focus();

		return false;
		
	});


	$(".pop-btn-close").on("click", function() {
		$("#video-pop").hide();
		$("#image-pop").hide();

		//$("#video-src").stop();
		$("video").each(function () { this.pause() });
		$("#dimmed").detach();

		return false;
	});	
	
	$("a[href*='.pdf']").each(function(){ 
		$(this).attr('target','_blank');
	});
	
}

function printArea(area) {
	var cont = $('.'+area).html();
	$('body').append('<div class="print-area">'+cont+'</div>');
	$('.print-area').show().siblings().addClass('hide');
	$('.close, .type_btn').addClass('hide');
	print();
	$('.print-area').siblings().removeClass('hide');
	$('.close, .type_btn').removeClass('hide');
	$('.print-area').remove();
	return false;
}

function gridBreak () {
	$.each($(".uiMobile [Class*='type-grid-'].list"), function(){
		var num = $(this).attr('class').match(/\d+/)[0];
		if (num > 2){
			var num = num.replace(num, 2);
		}/* else {
			var num = num.replace(num, 1);
		}*/
		$(this).attr('class', 'type-grid-'+ num +' list');
	});
	
	$.each($("[class*='type-grid-']"), function(i) {
    	var num = $(this).attr('class').match(/\d+/)[0];
    	var divide_child = $(this).children();
    	$.each(divide_child, function(j) {
    		divide_child.eq(num*j+(num-1)).addClass('break');
    	});
    });
	
}

/**************************** pc + mobile *************************/

function setGnbInit() {	
	browserWidth = $(window).width();

	if(browserWidth>768) {
		$("#gnb .depth2").each(function(i) {
			var depth2_h = $(this).outerHeight();
			$(this).find(".depth3").each(function() {
			//	tmp_h = ($(this).hasClass("depth3")) ? $(this).outerHeight()+$(this).parents().position().top+15 : $(this).outerHeight();
				tmp_h = $(this).outerHeight()+$(this).parents().position().top+15;
				//if(i==4) console.log(tmp_h + " : " + depth2_h);

				if(tmp_h>depth2_h) {
					
					$("#gnb .depth2").eq(i).css("height", tmp_h);
					depth2_h = $("#gnb .depth2").eq(i).outerHeight();
				}
			});
			
			var pArray = [];
			var phArray = [];
			$(this).find("p").each(function() {
				var p_h = $(this).outerHeight()+$(this).parents().position().top + 9;
				pArray.push(p_h);
				var pMax = Math.max.apply(Math, pArray);
				
				phArray.push($(this).outerHeight()+24);
				var phMax = Math.max.apply(Math, phArray);
				
				if(pMax>depth2_h) {
					$(this).parents('.depth2').css("min-height", phMax);

					if(p_h>depth2_h) {
						//console.log($(this).prev().text(), $(this).parents('.depth2').position().top,'+', $(this).parents('.depth2').outerHeight(),'=',$(this).parents('.depth2').position().top + $(this).parents('.depth2').outerHeight(),',' , $(this).parent().position().top, '+', $(this).outerHeight() ,'=', $(this).parent().position().top + $(this).outerHeight())
						$("#gnb .depth2").eq(i).css("min-height", phMax);
						var t = ($(this).parents('.depth2').offset().top + $(this).parents('.depth2').outerHeight()) - ($(this).parent().offset().top + $(this).outerHeight()) - 9
						if(t<0){
							$(this).css({"margin-top" :t })
						}
					}
				} 
			});
		});
	} else {
		$("#gnb .depth2").css("height","auto");
	}
}



$(function(){
//관련 사이트 이동
	$(".btn-site-go").on("click", function(){
		var selectVal = $("#related_site").val();
		
		if(selectVal){
			window.open(selectVal);
		}
	});
});

/**************************** tab *************************/

$(function(){
	// s 0715 추가
	if($(".type-nav-1_select").length>0) {
		$(".type-nav-1_select").each(function(idx) {
			$(this).find("select").attr("id", "select_navi_"+ idx);
			$(this).prepend("<label for='select_navi_"+ idx + "' class='invisible'>select "+ $(".section_head h1").text() +"</label>");
		});
	}

	if($(".section_head .type-nav-1_select").length>0) {
		$(".section_head .type-nav-1 li").each(function(i) {
			$(".section_head .type-nav-1_select select option:eq("+i+")").prop("value",$(this).find("a").attr("href"));
			if($(this).hasClass("on")) $(".section_head .type-nav-1_select select option:eq("+i+")").prop("selected",true);
		});

		$(".section_head .type-nav-1_select select").on("change", function() {
			location.href = $(".section_head .type-nav-1_select select option:selected").val();
		});
		
	};
	
	if($(".type-nav-3_select").length>0) {
		$(".type-nav-3_select select").bind("change", function() {
			$(this).find('option:selected').addClass('on').siblings().removeClass('on');
			var ind = $(this).find('option:selected').index();
			$('[class*="type-nav"] li').eq(ind).find('a').trigger('click');
			//console.log($('[class*="type-nav"] li').eq(ind).find('a').text())
		}).trigger("change");
	};
	
	$("select.go").each(function(i){
		var ind = $(this).find('option:selected').val(); 
		$(this).on("change", function() {
			var ind = $(this).find('option:selected').val(); 
			$(ind).show().siblings().hide();
		});
		$(ind).show().siblings().hide();
	});
	
	$("select.go-btn").each(function(i){
		var select_ind, select_id;
		$(this).bind('change', function () {
			select_ind = $(this).find('option:selected').val();
			select_id = $(this).find('option:selected').attr('data-id');
		});
	    $(this).trigger('change');

		$(this).next('.type_btn').click(function(){
			if(select_ind.indexOf('.pdf')>0){
				window.open(select_ind, 'window name', '');
			} else if(select_ind.indexOf('.mp4')>0){
				$(this).attr('href',select_ind);
				$(this).attr('data-id',select_id);
				$(this).attr('data-rel','video');
			}else {
				location.href = select_ind;
			}
			return false;
		});
	});
	
	
    $.each($("[class*='divide']"), function(i) {
    	var num = $(this).attr('class').match(/\d+/)[0];
    	var divide_child = $(this).children();
    	$.each(divide_child, function(j) {
    		divide_child.eq(num*j+(num-1)).addClass('break');
    	});
    });

    /*$('.section_head .type-nav-1').parent().siblings().find('.contents-wrap:not(.history) h2').addClass('title-sub');
    $('.section_head .type-nav-1').parent().siblings().find('.contents-wrap:not(.history) .navi_cont h2').removeClass('title-sub');*/
    $('#dBody > .section_head .type-nav-1').parent().siblings().find('.contents-wrap:not(.history)').find('h2:not(.reset)').addClass('title-sub');
    $('.main-ui').parent().siblings('#dHead').find('#gnb').addClass('inner-wrap');

	// e 0715 추가

	$('.tab_desc .navi-type-2 a').click(function(){
		var _group = $(this).attr('class').substr(0,9);
		var _id = $(this).attr('class');
		$('[id^='+_group+']').hide();
		$('#'+_id).show();
		return false;
	});
	
	if ($('[class*="type-nav"] a[href*="#"]').length){
		$('[class*="type-nav"] a[href*="#"]').click(function(){
			var _id = $(this).attr('href');
			var _group = _id.substr(1,5);
			
			if(!$(this).parents('[class*="type-nav-3"]').length) $(this).parent().addClass('on').siblings().removeClass('on')
			
			var excection = $('.uiMobile .history, .uiWeb .part_ui, .uiWeb .material_ui').length;
			if($(this).parents('[class*="type-nav"]').attr('data-ui') == 'cate') {
				var cate = _id.replace(/#/, "");
				var cate_text = $(this).text();
				//console.log(cate)
				$('.'+cate).parent('li').show();
				$('.global:not(.'+cate+')').parent('li').hide();
				$('.title-sub').text(cate_text);
				
			} else if($(this).parents('[class*="type-nav"]').attr('data-ui') == 'scroll') {
				var t = $(_id).offset().top -50;
				$('html, body').stop().animate({scrollTop:t},300);
			} else {
				if(onlyMobile.called || excection == 0){ // toggle
					//$('[id^='+_group+']').hide();
					$(_id).show().siblings().hide();
				} else { // 스크롤 이동
					var t = $(_id).offset().top -50;
					$('html, body').stop().animate({scrollTop:t},300);
				}
			}
			resetTilePosition();
			return false;
		});

		$('[class*="type-nav"] a[href*="#"]').parents('[class*="type-nav"]').each(function(i){
			var active = $(this).find('.on').index();
			
			var excection = $('.uiWeb .part_ui, .uiWeb .material_ui').length; //, .uiWeb [class*="type-nav"].mobile-only, .uiMobile [class*="type-nav"].web-only
			if(excection > 0){
				$('.navi_cont:eq('+i+') > *').show();
			} else {
				$('.navi_cont:eq('+i+') > *:eq('+active+')').show().siblings().hide();
			}
		});
		
	}
	
	if ($('.uiWeb .layer').length){
		$(this).find('.frame').prepend('<button type="button" class="close">close</button>');
		$('.btn_layer').click(function(){
			var links = $(this).attr('href');
			$(links).show();
			nowScroll = getNowScroll();
			var w = $(links).find('.frame').outerWidth();
			var h = $(links).find('.frame').outerHeight();
			$('.uiWeb .layer .frame').css({'max-height':wHeight - 68, 'margin-left':-w/2, 'margin-top':-h/2});
			
			//console.log($(links))
			
			$('.layer .close, .layer:before, .btn-close').on('click', function(){
				$('.layer').hide();
			});	

			return false;
		});
	}
	
	$('.btn_compare').click(function(){
		$('.compare_area').slideToggle();
		
		$(this).toggleClass('on').text(function(i, text){
			if(lang === 'kr') return text === "열기" ? "닫기" : "열기"
			else if(lang === 'en') return text === "Show" ? "Hide" : "Show"
			else if(lang === 'cn') return text === "打开" ? "关闭" : "打开"
			else if(lang === 'es') return text === "Abrir" ? "Cerrar" : "Abrir"
	    });
		
		return false;
	});
	
	// 제품비교
	$('.btn_compare_product').click(function(e){
		var chk_length = $('.spec_table input[type=checkbox]:checked').length;
		if (chk_length < 2) {
			alert('제품 비교는 2개부터 가능합니다.');
		} else {
			layer(this.href,688,674);
		}
		e.preventDefault();
	});
	
	/* 
	console.log($._data($(window)[0], "events"))
	var events = $._data($(window)[0], "events");
	for ( var i in events ) {
	  console.log(i);
	}
	*/


	if ($('.spec_table').length){
		$(this).find('input[type=checkbox]').change(function(){
			var chk_length = $('.spec_table input[type=checkbox]:checked').length;
			if (chk_length > 3) {
				alert('제품 비교는 최대 3개까지 가능합니다.');
				$(this).prop("checked",false);
			}
		});
	}
	
	// 제품검색
	if ($('.product_cont').length){
		var wrapper = $(this);
		wrapper.find('input[type=radio]').bind('change', function(){
			wrapper.find('input[type=radio]:checked').closest('li').siblings().find('li > label > input[type=radio]').prop('checked',false);
			$(this).parent().next().find('li:first-child > label > input[type=radio]').prop('checked',true);
			
			wrapper.find('input[type=radio]:checked').parent().addClass('on').next('div').show();
			wrapper.find('input[type=radio]').not(':checked').parent().removeClass('on').next('div').hide();

			$('.product_cont').trigger('resize');
			
			var chked = wrapper.find('input[type=radio]:checked').parent().text();
			//console.log(chked);
			
		}).trigger('change');
		
		$('.product_cont').bind('resize', function(){
	        var $this = $(this), newHeight = 127;
	        var $children = $this.find('label + div:visible');
	        $.each( $children, function(i) {
	        	var t = $(this).parents('ul').height();
	        	$(this).css({'top':t});
	            newHeight += $(this).outerHeight();
	        });
	        $this.height( newHeight );
	    }).trigger('resize');
	}
	
	
	
	var wHeight;
	$(window).bind('resize', function() {
		setGnbInit();
		wWidth= $(this).width();
		wHeight= $(this).height();
		if($("body").hasClass("uiWeb")) {
			
		} else {
			$('.slider_landing, .slider_landing .bx-viewport, .slider_landing .bxslider > li,  [class*="landing-visual"]:not(.mobile-except)').height(wWidth * 0.665625);
			
			//.gallery-slider .bxslider > li img
			$('.business .gallery-slider .bxslider > li img').height(wWidth * 0.5625);
		}
	}).trigger('resize');

});


/*function layer(src,w,h) {
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
}*/

function setTopAnchor() {
	$("body").append("<div id='dTop'><div class='inner-wrap'><a href='#' class='ico-top'>TOP</a></div></div>");
	$(".ico-top").bind("click", function() {
		$("body, html").stop().animate({ scrollTop: 0 }, 300);
		return false;
	});
	$("#dTop").hide();
}

function setIE8() {
	$("#full-location span:first-child").addClass("location-first");
}

function setClass(){ // table col 속성에 class를 지정해서 table cell column에 반영 
	var aClass = ['web-only', 'tc', 'tl', 'tr', 'tm', 'tt', 'tb','tb1','tb2'];
	$.each(aClass, function(i){
		
		if ($('table col.'+aClass[i]+'').length){
			$('table col.'+aClass[i]+'').each(function(j){
				var order = $(this).index();
				//console.log(order);
				$('col.'+aClass[i]).closest('table').find('tr').each(function(){
					$(this).children('*:eq('+order+')').addClass(aClass[i]);
					//console.log(aClass[i], order);
				});
			});
		}
	
	});
}

$(window).scroll(function() {
	top_pos = $(this).scrollTop();
	top_ico = $("#dTop");

	var doc_h = $(document).height()-$(window).height()-$(window).scrollTop();

	if(top_pos>100) {
		top_ico.show();
		
		top_ico.css({"bottom":0,"position":"fixed"});
		if(onlyMobile.called) {
			if(doc_h <$("#dFoot").outerHeight()) {
				top_ico.css({"position":"relative","bottom":$("#dFoot").outerHeight()});
			} else top_ico.css({"bottom":0,"position":"fixed"});
		}
	} else {
		top_ico.hide();
	}
});

$(window).load(function() {
	gridBreak();
	mobileNav();
	//loaded();
	if(location.hash) {
		$(location.hash).prev().trigger("click");
		$("html, body").animate({scrollTop:$(location.hash).prev().offset().top}, 300);
	}
	setSlider();  //0715
	resetTilePosition();
	setClass();
	
});

// 특정 파일 확장자 체크. 허용되는 확장자가 아니면 false return.
function fileFormatCheck(fileExtension){
	var allowFileExtension = ["jpg","gif","bmp","tiff","png","zip","doc","docx","pdf","ppt","pptx","zip","jpeg","txt","xls","xlsx","hwp"];
	var isAllowFileFormat = false;
	for(i=0; i<allowFileExtension.length; i++)
	{
		if(allowFileExtension[i] == fileExtension)
		{
			isAllowFileFormat = true;
		}
	}

	return isAllowFileFormat;
}


//특정 단어를 찾아 볼드 체로 만들어 주는 함수
function MakeBold(search,text) {
    var search_low =  search.toLowerCase();
    var low = text.toLowerCase();
    var len = search.length;
    var position = new Array();
    var tempArr = new Array();
    var resultArr = new Array();
    var resultStrArr = new Array();
    var pos = low.indexOf(search_low);

    while(pos > -1){
        position.push(pos);
        pos =  low.indexOf(search_low, pos + 1);
    }

    for (var i = 0; i < position.length; i++) {
    	tempArr.push(text.substring(position[i],position[i] + len));//바꿔야할 놈
    	//resultArr.push("<strong>"+text.substring(position[i],position[i] + 1) +"@@@@" + text.substring(position[i]+1,position[i] + len) +"</strong>");
    	resultArr.push("@@@@"+text.substring(position[i],position[i] + 1)+text.substring(position[i]+1,position[i] + len)+"####");//바꿀 대상 문자
    }

	for(i=0;i<position.length;i++){ 
    	text = text.replace(tempArr[i], resultArr[i]); 
    	
    } 
    
	text= text.replace(/@@@@/gi, '<strong>');
	var result = text.replace(/####/gi, '</strong>');

    
    return result;
}

//ajax 처리 함수, IE 기본 처리
function crossDomainAjax (url, successCallback) {
    // IE8 & 9 only Cross domain JSON GET request
    if ('XDomainRequest' in window && window.XDomainRequest !== null) {

        var xdr = new XDomainRequest(); // Use Microsoft XDR
        xdr.open('get', url);
        xdr.onload = function () {
            var dom  = new ActiveXObject('Microsoft.XMLDOM'),
                JSON = $.parseJSON(xdr.responseText);

            dom.async = false;

            if (JSON == null || typeof (JSON) == 'undefined') {
                JSON = $.parseJSON(data.firstChild.textContent);
            }

            successCallback(JSON); // internal function
        };

        xdr.onerror = function() {
			//location.href="/kr/error" ;
        };

        xdr.send();
    } 

    // IE7 and lower can't do cross domain
    else if (navigator.userAgent.indexOf('MSIE') != -1 &&
             parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
       return false;
    }    

    // Do normal jQuery AJAX for everything else          
    else {
        $.ajax({
            url: url,
            cache: false,
            dataType: 'json',
            type: 'GET',
            async: false, // must be set to false
            success: function (data, success) {
                successCallback(data);
            },
			error: function(xhr) {
				//location.href="/kr/error" ;
			}
        });
    }
}

//해당 함수를 실행시 활서오
function nonActiveGnbMenu(){
	$("#gnbMenu > ul > li > a.active span").parent().removeClass('active');
}