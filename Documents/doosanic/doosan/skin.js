$(function(){
	$(".uiWeb .diagram4 .domestic em").each(function(){
		var txt = $(this).text().replace(/[^0-9]/g,'');
		$(this).parent().stop().animate({width:txt + '%'}, 800);;
	});
	
	$(".uiWeb .diagram5 .number em").each(function(){
		var txt = $(this).text().replace(/[^0-9]/g,'');
		$(this).parent().stop().animate({height:(txt * 1.6)}, 1000);;
	});
	
	$("#product_search_btn").click(function(){
		this.value = '';
	});

	$(".product_search_btn").click(function(){
		var searchProductName = $("#product_search_btn").val();
		if(searchProductName != '')
		{
			searchProductByName(searchProductName);
		}else{
		}
		return false;
	});
	// 검색 submit
	$(".product_search_btn").keydown(function(e) {
		if (e.keyCode == 13) 
		{
		var searchProductName = $("#product_search_btn").val();
		if(searchProductName != '')
		{
			searchProductByName(searchProductName);
		}else{
		}
		}
		return false;
	});

	 // 언어 구분
	langDir='en';
	lang='en';
	if(document.URL.indexOf('/kr/') >= 0) {
		langDir = 'kr';
		lang='kr';
	} else if(document.URL.indexOf('/cn/') >= 0) {
		langDir = 'cn';
		lang='zh';
	} else if(document.URL.indexOf('/es/') >= 0) {
		langDir = 'es';
		lang='es';
	}
	
	$('.history .list > li .item').each(function(i){
		$(this).attr('id','year-'+i);
	});
	
	$('.history .type-nav-3 ul li a').each(function(i){
		$(this).attr('href','#year-'+i);
	})

	$(".uiMobile .csr-strategy .introduce h2 + p").insertAfter(".uiMobile .csr-strategy .introduce .cont");

	$(".uiMobile .rnd.customer [class*='type-grid'] > *").each(function(){
		$(this).find('p').prependTo($(this));
	});
	
	$(".uiMobile .brand.story .list > li").each(function(){ // 타이틀 위치 썸네일 위로 올리기
		$(this).find('h2').prependTo($(this));
	});
	
	$(".uiMobile .media-ui .type-list > li").each(function(){ // 타이틀 위치 썸네일 위로 올리기
		$(this).find('h3').prependTo($(this));
	});
	
	$(".uiMobile .thumb-area").each(function(){ // 타이틀 위치 썸네일 위로 올리기
		$(this).find(':header:not(.tit):not(.brief):not(.title)').prependTo($(this));
	});
	
	$(".uiMobile .leadership.manager .thumb-area").each(function(){
		var el = $(this).find('.cont');
		$(this).find('.thumb').prependTo(el);
		$(this).find('h2').clone().prependTo($(this));
		$(this).find('.cont h2').removeClass('tit');
	});
	
	if($('.uiMobile .business-ui .type-accordion').length){
		$('.uiMobile .business-ui .type-accordion li').each(function(){
			$(this).wrapInner('<div class="cont">');
			var el = $(this).find('.cont');
			$(this).find('.tit').insertAfter(el);
		});
	}
	
	/* 글로벌 사업장 */
	$("a[href='#nav-activity']").on("click", function() {
		$(this).text(function(i, text){
			if(lang === 'kr') return text === "활약상 목록 보기" ? "활약상 목록 접기" : "활약상 목록 보기"; 
			else if(lang === 'en') return text === "View the list" ? "Hide the list" : "View the list"
			else if(lang === 'zh') return text === "查看列表" ? "隐藏列表 " : "查看列表"
	    });
		return false;
	})
	
	
	if($(".ir iframe").length){
		//setsize('uiWeb');
	//	$(".bread, #dBody, #dFoot").width('944')
	}

	/*$('.uiWeb .business-group select').clone().prependTo('.uiWeb .business-group');
	
	$('.uiWeb .business-group select:first-child').replaceWith(function() {
	    return $('<div/>', {
	        html: this.innerHTML
	    });
	});
	
	$('.uiWeb .business-group optgroup').replaceWith(function() {
	    return $('<ul/>', {
	        html: this.innerHTML
	    });
	});
	
	$('.uiWeb .business-group option').replaceWith(function() {
	    return $('<li/>', {
	        html: this.innerHTML
	    });
	});*/
	
	/*$('.uiMobile .contents-wrap[class*="history"] h2').each(function(){
		var el = $(this).find('span');
		$(el).appendTo($(this));
	});*/
	
	/*$('.uiMobile .contents-wrap.talent .cont').each(function(){
		var el = $(this).prev('.diagram');
		$(el).insertBefore($(this).find('h4:eq(0)'));
		//$(this).find('h4:eq(1)').
	});*/
	
	if($('.uiMobile .global.activity').length){
		$('.type-nav-1').prependTo($('.global.activity'));
	}
	
	/*$('.btn_history_all').click(function(){
		$('html, body').scrollTop(0);
		$('.history').addClass('history_all');
		$('.history_all').find('.year').each(function(){
			var el = $(this).siblings('.desc');
			$(this).prependTo(el);
			$('.btn_history_all').hide().siblings().show();
			$('.section_head nav').hide();
		});
	});
	
	$('.btn_history_by_age').hide().click(function(){
		$('html, body').scrollTop(0);
		$('.history').removeClass('history_all');
		$('.history').find('.year').each(function(){
			var el = $(this).closest('li');
			$(this).prependTo(el);
			$('.btn_history_by_age').hide().siblings().show();
			$('.section_head nav').show();
		});
	});*/
	
	$('.activity [class*="type-nav"] li a').click(function(){
		var _id = $(this).attr('href');
		var t = $(_id).offset().top -50;
		$('html, body').animate({scrollTop:t},300);
		return false;
	});
	
	if($('.uiWeb .history').length){
		$('.uiWeb .history .list .cont > li').each(function(i){
		//	$(this).find('.cont li').each(function(i){
				var cate = 'year'; // + $(this).parent('ul').siblings('.year').text();
				var num = $(this).index()+1;
				$(this).attr('id',cate+'-'+i);
				$('.type-nav-3 a').eq(i).attr('href','#'+cate+'-'+i);
		//	});
		});
		
		$('.uiWeb .history [class*="type-nav"] li a').click(function(){
			var _id = $(this).attr('href');
			var t = $(_id).offset().top -50;
			$('html, body').animate({scrollTop:t},300);
			return false;
		});
		
	/* if($('.uiWeb .history').length){
		$('.uiWeb .history .list').each(function(i){
			var cate = $(this).parents('.wrap').attr('id');
			
			var num = $(this).children('li').length;
			var el_break = Math.ceil(num/2);
			var parent = $(this).parents('.wrap');
			parent.prepend('<nav class="type-nav-3">');

			$(this).clone().prependTo(parent.find('.type-nav-3'));
			$('.type-nav-3').find('.thumb, p').remove();
			$('.type-nav-3').children('ul').removeClass('list');
			$('.type-nav-3').addClass('type-grid-2');
			$('.type-nav-3').find('.title').each(function(){
				$(this).replaceWith('<a href="">' + $(this).text() + '</a>');
				$('.type-nav-3 .cont a').unwrap();
			})
			console.log(num,el_break)
			parent.find('ul > li:eq('+el_break+')').after('</ul><ul>')
		}); */
		
	} 
	
	
	if($('.stockinfo, .market-price-daily, .market-view').length){
	//	viewport = document.querySelector("meta[name=viewport]");
	//	viewport.setAttribute('content', 'width=944, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
		
		$(this).parents('body').removeClass('uiMobile').addClass('uiWeb');
	}
	
	// 두산인 이야기
	$('.uiMobile .doosanman .navi_cont').hide();
	$('.doosanman .type-nav.thumb-area a').click(function(){
		$(this).parents('.type-nav').hide();
		$('.section_head').hide();
		$('.doosanman .navi_cont').show();
		
		var otherIndex = $(this).parents('.type-box').index();
		$('.other-contents ul li').eq(otherIndex).addClass('on').siblings().removeClass('on');

		return false;
	});
	
});


$(window).on("load resize", function(e) {
	//resetTilePosition();
	
	var wWidth = $(this).width();
	
});

function navCont(){
	
}

function resetTilePosition(){
	

	$(".global.activity .list").each(function(){
		var currentIndex = 0;

		var tileMargin = {left:6, bottom:16};
		var maxHeight = [0, 0];
		var wrapWith = 0;
		
		var $wrap = $(this);
		var $tiles = $wrap.find("li:visible");
		var curWrapWidth = $wrap.width();

		$('#nav-activity').toggle();
	//	$('#nav-activity ul').remove();
		
		if (curWrapWidth!=wrapWith||forced===true) {
			var runResize = true;
			if (curWrapWidth>640) {
				$tiles.css({width:464, position:"absolute"});
			//	$('#nav-activity').prepend('<ul></ul><ul></ul>');
			}
			/*
			else if (curWrapWidth>320) {
				$tiles.css({width:464, position:"absolute"});
			}
			*/
			else {
				runResize = false;
				$tiles.css({width:"100%", position:"static"});
			}
			if (runResize) {
				$tiles.each(function(i) {
					if (currentIndex==0||$(this).hasClass("item-type"+currentIndex)) {
						var colIdx = 0;
						// if (maxHeight[0]>maxHeight[1]) 세로 길이에 따라 채워지는 방식
						if (i%2 === 0) colIdx = 0; // 마크업 순서 그대로 적용
						else colIdx = 1;
						
						var tileH = $(this).height() + tileMargin.bottom;
						$(this).css({left:(474 + tileMargin.left)*colIdx, top:maxHeight[colIdx]});
						maxHeight[colIdx] += tileH
					}
				});
				$wrap.css({height:Math.max(maxHeight[0],maxHeight[1])});
			} else {
				$wrap.css({height:"auto"});
			}
		}
		
		wrapWith = curWrapWidth;
		maxHeight = [0, 0];
	})
	/*$tiles.each(function(){
		var num = $(this).index();
		var navText = $(this).find('.title').text();
		$(this).attr('id','acivity-'+num);
		$('#nav-activity ul').append('<li><a href="#acivity-'+num+'">'+navText+'</a></li>');
	});*/
	
	$('.global.activity [class*="type-nav"] a[href*="#"]').click(function(){
		var _id = $(this).attr('href');
		var t = $(_id).offset().top - 15;
		$('html, body').stop().animate({scrollTop:t},300);
		return false;
	});
			
}

function setSlider() {
	
	browserWidth = $(window).width();
	
	$('.thumb:not(.array)').each(function(i){
		var el = $(this);
		el.find('[data-ui~="caption"]').each(function(){
			$(this).wrap('<div class="set">');
		});
		if(el.find('img:not(.web-only)').length>1){
			caption = (el.find('img[data-ui~="caption"]').length)?true:false;
			shadow = (el.find('img[data-ui~="shadow"]').length)?true:false;
			control = (el.find('img:not(.web-only)').length>1)?true:false;
			pager = (el.find('img:not(.web-only)').length>1 && !$('.uiMobile .activity').length)?true:false;
			var w = el.find('img').width();
			var h = el.find('img').height();
			
			if(browserWidth>768) {
				
				visual_slider = el.bxSlider({
					shadows :shadow,
					captions :control,
					pager : pager,
					slideWidth: w,
					infiniteLoop : false,
					controls : false,
					onSliderLoad : function(currentIndex) {
						el.parents('.bx-wrapper').find('.bx-pager').css({'top':h -30,'right':'4px'});
					}
				});
			} else {
			//	pager = (el.data("captions"))?"short":false;
			//	pager = ($('.activity').length)? false:true;
				//console.log(pager)
				visual_slider = el.bxSlider({
					shadows :false,
					captions :caption,
					controls : control,
					pager : pager,
					infiniteLoop : true,
					hideControlOnEnd: true,
					pagerType : "short",
					onSliderLoad : function(currentIndex) {
						el.parents('.bx-wrapper').find('.bx-pager').addClass('btm');
						el.css({"height":"auto"});
					}
				});
			}
		} else {
			el.find('[data-ui~="caption"]').each(function(){
				var title = $(this).attr('alt');
				$(this).parent().append('<div class="bx-caption"><span>' + title + '</span></div>');
			});
		}
		if(el.find('img:not(.web-only)').length>1){
			/*var w = el.find('img').width();
			var h = el.find('img').height();
			visual_slider = el.bxSlider({
				slideWidth: w,
				infiniteLoop : false,
				controls : false,
				onSliderLoad : function(currentIndex) {
					//el.parents('.bx-wrapper').find('.bx-pager').addClass('btr-inside');
					console.log(h)
					el.parents('.bx-wrapper').find('.bx-pager').css({'top':h -30});
					el.find('.shadow').css({'top':h +30});
				//	console.log(el.height())
				}
			});*/
			
			
			//console.log(i)
		}
	});
	
	$('.type-slider-mobile').each(function(i){
		var el = $(this);
		if(browserWidth>768) {
		} else {
			if(el.find('.thumb-area, li').length>1){
				visual_slider = el.bxSlider({
					infiniteLoop : true,
					pager: true,
					pagerType : 'short',
					onSliderLoad : function(currentIndex) {
						el.parents('.bx-wrapper').find('.bx-pager').addClass('btm');
					}
				});
				console.log(pagerType)
			}
			//setSlider();
			setTimeout(function() {
			//	$('.type-slider-mobile > *').css("height", bx_slider[i].height());
			},500);
		}
		
		
	});
	
	
	//main landing slider
	if($(".slider_landing li").length>1) {
		if(browserWidth>768) {
			
			visual_slider = $('.slider_landing .bxslider').bxSlider({
				controls : true,
				infiniteLoop : true,
				mode : 'fade',		
				pager: true,
			//	pagerCustom: '.landing-pager',
				//auto : true,
				autoControls : true,
				randomStart: true
			});
		} else {
			visual_slider = $('.slider_landing .bxslider').bxSlider({
				controls : false,
				randomStart: true,
				pager: true,
				onSliderLoad : function(currentIndex) {
					$('.slider_landing .bxslider').parents('.bx-viewport').addClass('bx-has-pager').siblings('.bx-controls').addClass('btm-fix');
				}
			});
		}
	}
	
}


/*갤러리 메인 슬라이드 분리형*/
function setMainGallerySlider() {
	browserWidth = $(window).width();
	
	//sub gallery slider
	var bx_slider= new Array();
	if($(".gallery-slider").length>0) {
		$(".gallery-slider").each(function(i) {
				
			max = ($(this).data("max"))?$(this).data("max"):"1";
			min = ($(this).data("min"))?$(this).data("min"):"1";
			caption = ($(this).data("caption"))?$(this).data("caption"):false;
			pager = ($(this).data("pager"))?$(this).data("pager"):true;
			pagerAlign = ($(this).data("pager-align"))?$(this).data("pager-align"):"tr";
			controls = ($(this).data("controls"))?$(this).data("controls"):true;
			infiniteLoop = ($(this).data("loop"))?$(this).data("loop"):true;
			swidth = ($(this).data("width"))?$(this).data("width"):"184";
			enlarge = ($(this).data("enlarge"))?$(this).data("enlarge"):false;

			if(browserWidth>768 && !$(this).hasClass('web-except')) {
				
				bx_slider[i] = $(".gallery-slider").eq(i).find(".bxslider");

				bx_slider[i].bxSlider({
					captions : caption,
					minSlides: min,
					maxSlides: max,
					moveSlides: min,
					pager : pager,
					controls : controls,
					slideWidth: swidth,
					speed : 300,
					slideMargin: 10,
					infiniteLoop : false,
					hideControlOnEnd: true,
					onSliderLoad : function(currentIndex) {
						bx_slider[i].parents('.bx-wrapper').find('.bx-pager').addClass(pagerAlign);
						
						
						if(enlarge == true){
							$(".gallery-slider").eq(i).prepend("<div class='thumb' id='enlarge'><img arc='http://dsinfraenginev2.corp.doosan.com/img/product_list_noimage.gif' alt='noimage'>");
							
							if(caption == true) $(".gallery-slider").eq(i).find('.thumb').append('<div class="bx-caption">');
							
							$(".gallery-slider").eq(i).find(".bxslider li").click(function(){
								var thisSrc = $(this).find('img').attr('src');
								var thisCaption = $(this).find('img').attr('alt');
								$(this).addClass('over').siblings().removeClass('over');
								$(".gallery-slider").eq(i).find(".thumb img").attr({'src':thisSrc});
								if(caption == true) $(".gallery-slider").eq(i).find('.thumb .bx-caption').text(thisCaption);
								return false;
							});
							$(".gallery-slider").eq(i).find(".bxslider li:eq(0)").trigger('click');
						}
						
						
						
					}
				});
				
				for ( j = 0; j < min; j++ ) {
					bx_slider[i].find("li").last().clone().empty().appendTo(bx_slider[i]);
				}
				
				setTimeout(function() {
					bx_slider[i].find("li, li a").css("height", bx_slider[i].height());
				},500);
			} else if(browserWidth<=768) {
				pager = ($(this).data("caption"))?"short":false;

				$(this).find(".bxslider").bxSlider({
					captions : caption,
					infiniteLoop : infiniteLoop,
					pager : pager,
					hideControlOnEnd: true,
					pagerType : pager,
					onSliderLoad : function(currentIndex) {
						if(!$('.highlight').length){
							$(".gallery-slider").eq(i).find('.bx-pager').addClass('btm');
						}
						$(".gallery-slider").eq(i).css({"height":"auto"});
					}
				});

			}
		});
	}
}