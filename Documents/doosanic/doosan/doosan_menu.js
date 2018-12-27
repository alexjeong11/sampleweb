/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function(i) {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;

            if (!$.browser.isAndroid) {
                $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
                    if (o.autoArrows) addArrow( $('>a:first-child',this) );
                })
                .not('.'+c.bcClass)
                    .hideSuperfishUl();
            }

			var $a = $('a',this);
			$a.each(function(i){
                if (!$.browser.isAndroid) {
                    var $li = $a.eq(i).parents('li');
                    $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
                }
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'on',
		pathClass	: 'curnet',
		pathLevels	: 1,
		delay		: 0,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: false,
		dropShadows : true,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var r = sf.op,
				not = (r.retainPath===true) ? r.$path : '';
			r.retainPath = false;
			var $ulDepth = $(['li.',r.hoverClass].join(''),this).add(this).not(not).removeClass(r.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			r.onHide.call($ulDepth);

			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ulDepth2 = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>.depth2').hide().css('visibility','hidden');
			o.onHide.call($ulDepth2);

			var j = sf.op,
				not = (j.retainPath===true) ? j.$path : '';
			j.retainPath = false;
			var $ulDepth3 = $(['li.',j.hoverClass].join(''),this).add(this).not(not).removeClass(j.hoverClass)
					.find('>.depth3').hide().css('visibility','hidden');
			j.onHide.call($ulDepth3);

			return this;
		},
		showSuperfishUl : function(){
			var r = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ulDepth = this.addClass(r.hoverClass)
					.find('>ul').css('visibility','visible');
			sf.IE7fix.call($ulDepth);
			r.onBeforeShow.call($ulDepth);
			$ulDepth.animate();

			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ulDepth2 = this.addClass(o.hoverClass)
					.find('>.depth2:hidden').css('visibility','visible');
			sf.IE7fix.call($ulDepth2);
			o.onBeforeShow.call($ulDepth2);
			$ulDepth2.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ulDepth2); o.onShow.call($ulDepth2); });

			var j = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ulDepth3 = this.addClass(j.hoverClass)
					.find('>.depth3:hidden').css('visibility','visible');
			sf.IE7fix.call($ulDepth3);
			j.onBeforeShow.call($ulDepth3);
			$ulDepth3.animate(j.animation, 0,function(){ sf.IE7fix.call($ulDepth3); j.onShow.call($ulDepth3); });
			return this;
		}
	});

})(jQuery);


(function($){
	$.fn.hoverIntent = function(f,g) {
		var cfg = {
			sensitivity: 7,
			interval: 30,
			timeout: 0
		};
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		var cX, cY, pX, pY;

		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				pX = cX; pY = cY;
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		var handleHover = function(e) {
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
			if ( p == this ) { return false; }

			var ev = jQuery.extend({},e);
			var ob = this;

			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			if (e.type == "mouseover") {
				pX = ev.pageX; pY = ev.pageY;
				$(ob).bind("mousemove",track);
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			} else {
				$(ob).unbind("mousemove",track);
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		return this.mouseover(handleHover).mouseout(handleHover);
	};
	
})(jQuery);


$(document).ready(function() {
	$("#gnb a").each(function() {
		if($(this).hasClass("hasDetail")) {
			$(this).append("<span class='gnb-arrow'>menu</span>");
		}
	});
	setGnbCheck();
});
$(window).resize(function() {
	setGnbCheck();
});

function setGnbCheck() {
	browserWidth = $(window).width();

	if(browserWidth>768) $(".menuJs > ul").superfish({speed:200, animation:{height:'show'}});
	else {
		$("#gnb a .gnb-arrow").unbind("click").click(function() {
			cn = $(this).parent().next().attr("class");

			if(!$(this).parent().hasClass("on")) {
				if(cn=="depth2") {
					$("#gnb a .gnb-arrow").parent().removeClass("on");
					$("#gnb a .gnb-arrow").parent().next().hide();

				} else if(cn=="depth3") {
					$("#gnb .depth2 .gnb-arrow").parent().removeClass("on");
					$("#gnb .depth3").hide();
				}
				$(this).parent().addClass("on");
				$(this).parent().next().slideDown("fast");
			} else {
				if(cn=="depth2") {
					$("#gnb a").removeClass("on");
					$("#gnb .depth2, #gnb .depth3").slideUp("fast");

				} else if(cn=="depth3") {
					$("#gnb .depth2 a").removeClass("on");
					$("#gnb .depth3").slideUp("fast");
				}

			}
				
			$("html,body").animate({ scrollTop: $(this).offset().top }, 500);
			return false;
		});
	}
}
