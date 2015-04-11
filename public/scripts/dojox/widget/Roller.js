//>>built
define("dojox/widget/Roller",["dojo","dijit","dijit/_Widget"],function(b,d){var c=b.declare("dojox.widget.Roller",d._Widget,{delay:2E3,autoStart:!0,itemSelector:"\x3e li",durationIn:400,durationOut:275,_idx:-1,postCreate:function(){this.items||(this.items=[]);b.addClass(this.domNode,"dojoxRoller");b.query(this.itemSelector,this.domNode).forEach(function(a,e){this.items.push(a.innerHTML);0==e?(this._roller=a,this._idx=0):b.destroy(a)},this);this._roller||(this._roller=b.create("li",null,this.domNode));
this.makeAnims();this.autoStart&&this.start()},makeAnims:function(){var a=this.domNode;b.mixin(this,{_anim:{"in":b.fadeIn({node:a,duration:this.durationIn}),out:b.fadeOut({node:a,duration:this.durationOut})}});this._setupConnects()},_setupConnects:function(){var a=this._anim;this.connect(a.out,"onEnd",function(){this._setIndex(this._idx+1);a["in"].play(15)});this.connect(a["in"],"onEnd",function(){this._timeout=setTimeout(b.hitch(this,"_run"),this.delay)})},start:function(){this.rolling||(this.rolling=
!0,this._run())},_run:function(){this._anim.out.gotoPercent(0,!0)},stop:function(){this.rolling=!1;var a=this._anim,b=this._timeout;b&&clearTimeout(b);a["in"].stop();a.out.stop()},_setIndex:function(a){var b=this.items.length-1;0>a&&(a=b);a>b&&(a=0);this._roller.innerHTML=this.items[a]||"error!";this._idx=a}});c.RollerSlide=b.declare("dojox.widget.RollerSlide",dojox.widget.Roller,{durationOut:175,makeAnims:function(){var a=this.domNode;b.style(a,"position","relative");b.style(this._roller,"position",
"absolute");b.mixin(this,{_anim:{"in":b.animateProperty({node:a,duration:this.durationIn,properties:{top:{end:0,start:25},opacity:1}}),out:b.fadeOut({node:a,duration:this.durationOut})}});this._setupConnects()}});c._Hover=b.declare("dojox.widget._RollerHover",null,{postCreate:function(){this.inherited(arguments);this.connect(this.domNode,"onmouseenter","stop");this.connect(this.domNode,"onmouseleave","start")}});return c});
//@ sourceMappingURL=Roller.js.map