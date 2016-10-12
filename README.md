# itsybitsytweener (Basically a very small tweener)

###A JavaScript micro-framework for animating elements

Author: Neil Oman
Version: 1

Copyright 2016 Neil Oman
Dual licensed under MIT and GPL

## Features

* Simple
* Includes Elastic, Bounce, Sine & Quad (For linear don't use easing)
* Can have any easing equation added
* Contains functions for Bezier curves (1 & 2 Control Points)
* Allows tweening of colours
* Very lightweight (only 939b minified and gzipped)

## Samples! :)

```
//add script to page
<script type="text/javascript" src="itsybitsytweener.js"></script>

//set up HTML, a "BOX" to move & a button to press
<div id="box" style="position:absolute;top:100px;left:100px;width:100px;height:100px;background-color:#ff0000;"></div>
<div id="button" style="position:absolute;top:0px;left:0px;width:100px;height:100px;background-color:#0000ff;cursor:pointer;"></div>

<script type="text/javascript">
//create an instance of the tweener
var tween=new tweenable();

//define a new tween
tween.create({
	duration:	2000,
	easing:		easer.easeOutElastic,
	target:		[document.getElementById('box'),[100,100],[400,400],['FF0000','00FF00']],
  step: 		function(ar,tw) {
					    ar[0].style.left=easer.interp(ar[1][0],ar[2][0],tw)+'px';
					    ar[0].style.top=easer.interp(ar[1][1],ar[2][1],tw)+'px';
					    ar[0].style.backgroundColor=easer.interphex(ar[3][0],ar[3][1],tw);
				    },
	finish:		function() {
					    alert('moved!');
				    }
});

//start tween on pressing button
document.getElementById('button').onclick=function() {
	tween.start();
}
</script>
```

## Interpolation

to gain new values for say x, we have x_start, x_end and a value for t (tw)
the step function is passed ar & tw, where ar is our target data and tw is our tween value between 0 and 1
we just then interpolate between x_start and x_end

```
current_x=easer.interp(x_start,x_end,tw);
```

If we want to interpolate between 2 hexadecimal values we use interphex in exactly the same way

## Options

Basically when you create a tween, you define what it will do, it only ever tweens between 0 and 1
we then use this number to interpolate our values we wish to impose on the element

### Mandatory Options

duration, total duration of tween
step, a function to perform at each step of the tween (this is basically the function that updates the element)

### Optional Options

easing, the easing function to use
4 are defined in the easer variable
easer.easeInOutQuad
easer.easeOutElastic
easer.easeOutBounce
easer.easeInOutSine
If easing isn't specified, it's just linear

target, this is just a helper variable
[document.getElementById('box'),[100,100],[400,400],['FF0000','00FF00']]
it can be defined anyway you want
Here, it's just the element, then 3 pairs of values for old & new x,y and color values

finish, a function to call on completion

autorun, tween will begin straight after it has been created

## Adding Easing Equations

Because this tweener only ever runs between 0 and 1, all the easing equations are greatly simplified
We just take the easing equation for say easeOutElastic

```
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	}

//substituting 0 and 1 into this gives-

	easeOutElastic:function(tw) {
		return ((tw==0)||(tw==1))?tw:(Math.pow(2,-10*tw) * Math.sin( (tw-0.3/(2*Math.PI)*Math.asin(1))*(2*Math.PI)/0.3 ) + 1);
	}

//and add that into easer
```

Once created, we just call tween.start() to set it off
