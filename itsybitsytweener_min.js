/**
 * itsybitsytweener.js
 *
 * A JavaScript micro-framework for animating elements
 * to elements for advanced UI development.
 *
 * @author     Neil Oman
 * @version    1
 * @copyright  Copyright 2016 Neil Oman
 * @license    Dual licensed under MIT and GPL
 */
var tweenable=function(){this.create=function(t){this.duration=t.duration,this.easing=t.easing,this.target=t.target,this.animate=t.step,this.finish=t.finish,this.autorun=t.autorun?this.start():0},this.start=function(){this.d0=(new Date).getTime(),this.run()},this.run=function(){var t,e=this,n=((new Date).getTime()-this.d0)/this.duration;(t=n>1)?this.animate(this.target,1)+this.finish():this.animate(this.target,this.easing?this.easing(n):n)
return t?0:"function"==typeof window.requestTimeout?requestTimeout(function(){e.run()},50):setTimeout(function(){e.run()},50)}},easer={cl:.3/(2*Math.PI)*Math.asin(1),pi3:2*Math.PI/.3,easeInOutQuad:function(t){return(t*=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)},easeOutElastic:function(e){return 0==e||1==e?t:Math.pow(2,-10*e)*Math.sin((e-easer.cl)*easer.pi3)+1},easeOutBounce:function(t){return.36364>t?7.5625*t*t:.7273>t?7.5625*(t-=.5454)*t+.75:.9091>t?7.5625*(t-=.8182)*t+.9375:7.5625*(t-=.95454)*t+.984375},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},hexToRgb:function(t){var e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,n=t.replace(e,function(t,e,n,i){return e+e+n+n+i+i}),i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n)
return i?[parseInt(i[1],16),parseInt(i[2],16),parseInt(i[3],16)]:null},rgbToHex:function(t,e,n){return"#"+((1<<24)+(t<<16)+(e<<8)+n).toString(16).slice(1)},interp:function(t,e,n){return n*(e-t)+t},interphex:function(t,e,n){var i=easer.hexToRgb(t),r=easer.hexToRgb(e)
return easer.rgbToHex(easer.interp(i[0],r[0],n),easer.interp(i[1],r[1],n),easer.interp(i[2],r[2],n))},nospline:function(t,e,n){return{x:easer.interp(e.x,n.x,t),y:easer.interp(e.y,n.y,t)}},bezier1:function(t,e,n,i){var r=1-t,a=r*r,s=2*r*t,u=t*t
return{x:a*e.x+s*i.x+u*n.x,y:a*e.y+s*i.y+u*n.y}},bezier2:function(t,e,n,i,r){var a,s,u=3*(i.x-e.x),o=3*(r.x-i.x)-u,h=n.x-e.x-u-o,f=3*(i.y-e.y),c=3*(r.y-i.y)-f,x=n.y-e.y-f-c
return{x:h*(a=Math.pow(t,3))+o*(s=Math.pow(t,2))+u*t+e.x,y:x*a+c*s+f*t+e.y}}}
