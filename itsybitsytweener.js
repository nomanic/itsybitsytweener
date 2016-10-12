/**
 * itsybitsytweener.js
 *
 * A JavaScript micro-framework for animating elements
 *
 * @author     Neil Oman
 * @version    1
 * @copyright  Copyright 2016 Neil Oman
 * @license    Dual licensed under MIT and GPL
 */
var tweenable=function() {
	this.create=function(options) {
		this.duration=options.duration;
		this.easing=options.easing;
		this.target=options.target;
		this.animate=options.step;
		this.finish=options.finish;
		this.autorun=options.autorun?this.start():0;
	}
	this.start=function() {
		this.d0=new Date().getTime();
		this.run();
	}
	this.run=function() {
		var i,self = this,tdif=(new Date().getTime()-this.d0)/this.duration,iw=(i=(tdif>1))?this.animate(this.target,1)+this.finish():this.animate(this.target,this.easing?this.easing(tdif):tdif);
		return i?0:((typeof window.requestTimeout === "function")?requestTimeout(function(){self.run();},50):setTimeout(function(){self.run();},50));
	}
};

var easer={
	cl:0.3/(2*Math.PI)*Math.asin(1),
	pi3:(2*Math.PI)/0.3,
	easeInOutQuad:function(tw) {
		return ((tw*=0.5) < 1)?(0.5*tw*tw):(-0.5 * ((--tw)*(tw-2) - 1));
	},
	easeOutElastic:function(tw) {
		return ((tw==0)||(tw==1))?tw:(Math.pow(2,-10*tw) * Math.sin( (tw-easer.cl)*easer.pi3 ) + 1);
	},
	easeOutBounce:function(tw) {
		return (tw < 0.36364)?(7.5625*tw*tw):((tw < 0.7273)?(7.5625*(tw-=0.5454)*tw + .75):((tw < 0.9091)?(7.5625*(tw-=0.8182)*tw + .9375):(7.5625*(tw-=0.95454)*tw + .984375)));
	},
	easeInOutSine: function (tw) {
		return -0.5 * (Math.cos(Math.PI*tw) - 1);
	},
	hexToRgb:function(hex) {
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,hex1 = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		}),result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex1);
		return result ? [
			parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16)
		] : null;
	},
	rgbToHex:function(r, g, b) {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	},
	interp:function(x0,x1,tw) {
		return (tw*(x1-x0))+x0;
	},
	interphex:function(h0,h1,tw) {
		var x0=easer.hexToRgb(h0),x1=easer.hexToRgb(h1);
		return easer.rgbToHex(easer.interp(x0[0],x1[0],tw),easer.interp(x0[1],x1[1],tw),easer.interp(x0[2],x1[2],tw));
	},
	nospline:function(t,p0,p1) {
		return {x:easer.interp(p0.x,p1.x,t),y:easer.interp(p0.y,p1.y,t)};
	},
	bezier1:function(t, p0, p1, cp0) {
		var t1=(1 - t),t2=t1*t1,t3=t1*2*t,t4=t*t;
		return {x: (t2 * p0.x + t3 * cp0.x + t4 * p1.x), y: (t2 * p0.y + t3 * cp0.y + t4 * p1.y)};
	},
	bezier2:function(t, p0, p1, cp0, cp1){
		var t3,t2,cX = 3 * (cp0.x - p0.x),
		bX = 3 * (cp1.x - cp0.x) - cX,
		aX = p1.x - p0.x - cX - bX,
		cY = 3 * (cp0.y - p0.y),
		bY = 3 * (cp1.y - cp0.y) - cY,
		aY = p1.y - p0.y - cY - bY;
		return {x: ((aX * (t3=Math.pow(t, 3))) + (bX * (t2=Math.pow(t, 2))) + (cX * t) + p0.x), y: ((aY * t3) + (bY * t2) + (cY * t) + p0.y)};
	}
}
