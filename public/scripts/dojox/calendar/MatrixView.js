//>>built
require({cache:{"url:dojox/calendar/templates/MatrixView.html":'\x3cdiv data-dojo-attach-events\x3d"keydown:_onKeyDown"\x3e\n\t\x3cdiv  class\x3d"dojoxCalendarYearColumnHeader" data-dojo-attach-point\x3d"yearColumnHeader"\x3e\n\t\t\x3ctable\x3e\x3ctr\x3e\x3ctd\x3e\x3cspan data-dojo-attach-point\x3d"yearColumnHeaderContent"\x3e\x3c/span\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\t\t\n\t\x3c/div\x3e\t\n\t\x3cdiv data-dojo-attach-point\x3d"columnHeader" class\x3d"dojoxCalendarColumnHeader"\x3e\n\t\t\x3ctable data-dojo-attach-point\x3d"columnHeaderTable" class\x3d"dojoxCalendarColumnHeaderTable" cellpadding\x3d"0" cellspacing\x3d"0"\x3e\x3c/table\x3e\n\t\x3c/div\x3e\t\t\n\t\x3cdiv dojoAttachPoint\x3d"rowHeader" class\x3d"dojoxCalendarRowHeader"\x3e\n\t\t\x3ctable data-dojo-attach-point\x3d"rowHeaderTable" class\x3d"dojoxCalendarRowHeaderTable" cellpadding\x3d"0" cellspacing\x3d"0"\x3e\x3c/table\x3e\n\t\x3c/div\x3e\t\n\t\x3cdiv dojoAttachPoint\x3d"grid" class\x3d"dojoxCalendarGrid"\x3e\n\t\t\x3ctable data-dojo-attach-point\x3d"gridTable" class\x3d"dojoxCalendarGridTable" cellpadding\x3d"0" cellspacing\x3d"0"\x3e\x3c/table\x3e\n\t\x3c/div\x3e\t\n\t\x3cdiv data-dojo-attach-point\x3d"itemContainer" class\x3d"dojoxCalendarContainer" data-dojo-attach-event\x3d"mousedown:_onGridMouseDown,mouseup:_onGridMouseUp,ondblclick:_onGridDoubleClick,touchstart:_onGridTouchStart,touchmove:_onGridTouchMove,touchend:_onGridTouchEnd"\x3e\n\t\t\x3ctable data-dojo-attach-point\x3d"itemContainerTable" class\x3d"dojoxCalendarContainerTable" cellpadding\x3d"0" cellspacing\x3d"0" style\x3d"width:100%"\x3e\x3c/table\x3e\n\t\x3c/div\x3e\t\n\x3c/div\x3e\n'}});
define("dojox/calendar/MatrixView","dojo/_base/declare dojo/_base/array dojo/_base/event dojo/_base/lang dojo/_base/sniff dojo/_base/fx dojo/_base/html dojo/on dojo/dom dojo/dom-class dojo/dom-style dojo/dom-geometry dojo/dom-construct dojo/query dojox/html/metrics dojo/i18n ./ViewBase dojo/text!./templates/MatrixView.html dijit/_TemplatedMixin".split(" "),function(D,I,E,r,w,z,A,y,J,k,n,u,p,q,K,B,F,G,H){return D("dojox.calendar.MatrixView",[F,H],{templateString:G,baseClass:"dojoxCalendarMatrixView",
_setTabIndexAttr:"domNode",viewKind:"matrix",renderData:null,startDate:null,refStartTime:null,refEndTime:null,columnCount:7,rowCount:5,horizontalRenderer:null,labelRenderer:null,expandRenderer:null,percentOverlap:0,verticalGap:2,horizontalRendererHeight:17,labelRendererHeight:14,expandRendererHeight:15,cellPaddingTop:16,expandDuration:300,expandEasing:null,layoutDuringResize:!1,roundToDay:!0,showCellLabel:!0,scrollable:!1,resizeCursor:"e-resize",constructor:function(){this.invalidatingProperties=
"columnCount rowCount startDate horizontalRenderer labelRenderer expandRenderer rowHeaderDatePattern columnHeaderLabelLength cellHeaderShortPattern cellHeaderLongPattern percentOverlap verticalGap horizontalRendererHeight labelRendererHeight expandRendererHeight cellPaddingTop roundToDay itemToRendererKindFunc layoutPriorityFunction formatItemTimeFunc textDir items".split(" ");this._ddRendererList=[];this._ddRendererPool=[];this._rowHeaderHandles=[]},destroy:function(a){this._cleanupRowHeader();this.inherited(arguments)},
postCreate:function(){this.inherited(arguments);this._initialized=!0;this.invalidRendering||this.refreshRendering()},_createRenderData:function(){var a={};a.dateLocaleModule=this.dateLocaleModule;a.dateClassObj=this.dateClassObj;a.dateModule=this.dateModule;a.dates=[];a.columnCount=this.get("columnCount");a.rowCount=this.get("rowCount");a.sheetHeight=this.itemContainer.offsetHeight;this._computeRowsHeight(a);var b=this.get("startDate");null==b&&(b=new a.dateClassObj);this.startDate=b=this.floorToDay(b,
!1,a);for(var c=0;c<a.rowCount;c++){a.dates.push([]);for(var d=0;d<a.columnCount;d++)a.dates[c].push(b),b=a.dateModule.add(b,"day",1),b=this.floorToDay(b,!1,a)}a.startTime=this.newDate(a.dates[0][0],a);a.endTime=this.newDate(a.dates[a.rowCount-1][a.columnCount-1],a);a.endTime=a.dateModule.add(a.endTime,"day",1);a.endTime=this.floorToDay(a.endTime,!0);this.displayedItemsInvalidated&&!this._isEditing?(this.displayedItemsInvalidated=!1,this._computeVisibleItems(a)):this.renderData&&(a.items=this.renderData.items);
a.rtl=!this.isLeftToRight();return a},_validateProperties:function(){this.inherited(arguments);if(1>this.columnCount||isNaN(this.columnCount))this.columnCount=1;if(1>this.rowCount||isNaN(this.rowCount))this.rowCount=1;if(isNaN(this.percentOverlap)||0>this.percentOverlap||100<this.percentOverlap)this.percentOverlap=0;if(isNaN(this.verticalGap)||0>this.verticalGap)this.verticalGap=2;if(isNaN(this.horizontalRendererHeight)||1>this.horizontalRendererHeight)this.horizontalRendererHeight=17;if(isNaN(this.labelRendererHeight)||
1>this.labelRendererHeight)this.labelRendererHeight=14;if(isNaN(this.expandRendererHeight)||1>this.expandRendererHeight)this.expandRendererHeight=15},_setStartDateAttr:function(a){this.displayedItemsInvalidated=!0;this._set("startDate",a)},_setColumnCountAttr:function(a){this.displayedItemsInvalidated=!0;this._set("columnCount",a)},_setRowCountAttr:function(a){this.displayedItemsInvalidated=!0;this._set("rowCount",a)},__fixEvt:function(a){a.sheet="primary";a.source=this;return a},_formatRowHeaderLabel:function(a){return this.rowHeaderDatePattern?
this.renderData.dateLocaleModule.format(a,{selector:"date",datePattern:this.rowHeaderDatePattern}):this.getWeekNumberLabel(a)},_formatColumnHeaderLabel:function(a){return this.renderData.dateLocaleModule.getNames("days",this.columnHeaderLabelLength?this.columnHeaderLabelLength:"wide","standAlone")[a.getDay()]},_formatGridCellLabel:function(a,b,c){0==b&&0==c||1==a.getDate()?this.cellHeaderLongPattern?b=this.cellHeaderLongPattern:(b=B.getLocalization("dojo.cldr",this._calendar),b=b["dateFormatItem-MMMd"]):
this.cellHeaderShortPattern?b=this.cellHeaderShortPattern:(b=B.getLocalization("dojo.cldr",this._calendar),b=b["dateFormatItem-d"]);return this.renderData.dateLocaleModule.format(a,{selector:"date",datePattern:b})},refreshRendering:function(){this.inherited(arguments);if(this.domNode){this._validateProperties();var a=this.renderData;this.renderData=this._createRenderData();this._createRendering(this.renderData,a);this._layoutRenderers(this.renderData)}},_createRendering:function(a,b){if(0>=a.rowHeight)a.columnCount=
1,a.rowCount=1,a.invalidRowHeight=!0;else{if(b&&this.itemContainerTable){var c=q(".dojoxCalendarItemContainerRow",this.itemContainerTable);b.rowCount=c.length}this._buildColumnHeader(a,b);this._buildRowHeader(a,b);this._buildGrid(a,b);this._buildItemContainer(a,b);this.buttonContainer&&(null!=this.owner&&this.owner.currentView==this)&&n.set(this.buttonContainer,{right:0,left:0})}},_buildColumnHeader:function(a,b){var c=this.columnHeaderTable;if(c){var d=a.columnCount-(b?b.columnCount:0);8==w("ie")&&
(null==this._colTableSave?this._colTableSave=r.clone(c):0>d&&(this.columnHeader.removeChild(c),p.destroy(c),this.columnHeaderTable=c=r.clone(this._colTableSave),this.columnHeader.appendChild(c),d=a.columnCount));var e=q("tbody",c),f=q("tr",c),e=1==e.length?e[0]:A.create("tbody",null,c),f=1==f.length?f[0]:p.create("tr",null,e);if(0<d)for(e=0;e<d;e++)p.create("td",null,f);else{d=-d;for(e=0;e<d;e++)f.removeChild(f.lastChild)}q("td",c).forEach(function(b,c){b.className="";var d=a.dates[0][c];this._setText(b,
this._formatColumnHeaderLabel(d));0==c?k.add(b,"first-child"):c==this.renderData.columnCount-1&&k.add(b,"last-child");this.styleColumnHeaderCell(b,d,a)},this);this.yearColumnHeaderContent&&this._setText(this.yearColumnHeaderContent,a.dateLocaleModule.format(a.dates[0][0],{selector:"date",datePattern:"yyyy"}))}},styleColumnHeaderCell:function(a,b,c){k.add(a,this._cssDays[b.getDay()]);this.isWeekEnd(b)&&k.add(a,"dojoxCalendarWeekend")},_rowHeaderHandles:null,_cleanupRowHeader:function(){for(;0<this._rowHeaderHandles.length;)for(var a=
this._rowHeaderHandles.pop();0<a.length;)a.pop().remove()},_rowHeaderClick:function(a){var b=q("td",this.rowHeaderTable).indexOf(a.currentTarget);this._onRowHeaderClick({index:b,date:this.renderData.dates[b][0],triggerEvent:a})},_buildRowHeader:function(a,b){var c=this.rowHeaderTable;if(c){var d=q("tbody",c),e,d=1==d.length?d[0]:p.create("tbody",null,c),f=a.rowCount-(b?b.rowCount:0);if(0<f)for(var g=0;g<f;g++){e=p.create("tr",null,d);e=p.create("td",null,e);var h=[];h.push(y(e,"click",r.hitch(this,
this._rowHeaderClick)));w("touch")||(h.push(y(e,"mousedown",function(a){k.add(a.currentTarget,"Active")})),h.push(y(e,"mouseup",function(a){k.remove(a.currentTarget,"Active")})),h.push(y(e,"mouseover",function(a){k.add(a.currentTarget,"Hover")})),h.push(y(e,"mouseout",function(a){k.remove(a.currentTarget,"Hover")})));this._rowHeaderHandles.push(h)}else{f=-f;for(g=0;g<f;g++){d.removeChild(d.lastChild);for(e=this._rowHeaderHandles.pop();0<e.length;)e.pop().remove()}}q("tr",c).forEach(function(b,c){n.set(b,
"height",this._getRowHeight(c)+"px");var d=a.dates[c][0],e=q("td",b)[0];e.className="";0==c&&k.add(e,"first-child");c==this.renderData.rowCount-1&&k.add(e,"last-child");this.styleRowHeaderCell(e,d,a);this._setText(e,this._formatRowHeaderLabel(d))},this)}},styleRowHeaderCell:function(a,b,c){},_buildGrid:function(a,b){var c=this.gridTable;if(c){var d=q("tr",c),d=a.rowCount-d.length,e=0<d,f=a.columnCount-(b?b.columnCount:0);8==w("ie")&&(null==this._gridTableSave?this._gridTableSave=r.clone(c):0>f&&(this.grid.removeChild(c),
p.destroy(c),this.gridTable=c=r.clone(this._gridTableSave),this.grid.appendChild(c),f=a.columnCount,d=a.rowCount,e=!0));var g=q("tbody",c),g=1==g.length?g[0]:p.create("tbody",null,c);if(e)for(var h=0;h<d;h++)p.create("tr",null,g);else{d=-d;for(h=0;h<d;h++)g.removeChild(g.lastChild)}var m=a.rowCount-d,s=e||0<f,f=s?f:-f;q("tr",c).forEach(function(b,c){if(s){var d=c>=m?a.columnCount:f;for(c=0;c<d;c++){var e=p.create("td",null,b);p.create("span",null,e)}}else for(c=0;c<f;c++)b.removeChild(b.lastChild)});
q("tr",c).forEach(function(b,c){n.set(b,"height",this._getRowHeight(c)+"px");b.className="";0==c&&k.add(b,"first-child");c==a.rowCount-1&&k.add(b,"last-child");q("td",b).forEach(function(b,d){b.className="";0==d&&k.add(b,"first-child");d==a.columnCount-1&&k.add(b,"last-child");var e=a.dates[c][d],f=q("span",b)[0];this._setText(f,this.showCellLabel?this._formatGridCellLabel(e,c,d):null);this.styleGridCell(b,e,a)},this)},this)}},styleGridCellFunc:null,defaultStyleGridCell:function(a,b,c){k.add(a,this._cssDays[b.getDay()]);
c=this.dateModule;this.isToday(b)?k.add(a,"dojoxCalendarToday"):null!=this.refStartTime&&null!=this.refEndTime&&(0<=c.compare(b,this.refEndTime)||0>=c.compare(c.add(b,"day",1),this.refStartTime))?k.add(a,"dojoxCalendarDayDisabled"):this.isWeekEnd(b)&&k.add(a,"dojoxCalendarWeekend")},styleGridCell:function(a,b,c){this.styleGridCellFunc?this.styleGridCellFunc(a,b,c):this.defaultStyleGridCell(a,b,c)},_buildItemContainer:function(a,b){var c=this.itemContainerTable;if(c){var d=[],e=a.rowCount-(b?b.rowCount:
0);8==w("ie")&&(null==this._itemTableSave?this._itemTableSave=r.clone(c):0>e&&(this.itemContainer.removeChild(c),this._recycleItemRenderers(!0),this._recycleExpandRenderers(!0),p.destroy(c),this.itemContainerTable=c=r.clone(this._itemTableSave),this.itemContainer.appendChild(c),e=a.columnCount));var f=q("tbody",c),g,f=1==f.length?f[0]:p.create("tbody",null,c);if(0<e)for(var h=0;h<e;h++)g=p.create("tr",null,f),k.add(g,"dojoxCalendarItemContainerRow"),g=p.create("td",null,g),g=p.create("div",null,g),
k.add(g,"dojoxCalendarContainerRow");else{e=-e;for(h=0;h<e;h++)f.removeChild(f.lastChild)}q(".dojoxCalendarItemContainerRow",c).forEach(function(a,b){n.set(a,"height",this._getRowHeight(b)+"px");d.push(a.childNodes[0].childNodes[0])},this);a.cells=d}},resize:function(a){this.inherited(arguments);this._resizeHandler(null,!1)},_resizeHandler:function(a,b){var c=this.renderData;if(null==c)this.refreshRendering();else{if(c.sheetHeight!=this.itemContainer.offsetHeight&&(c.sheetHeight=this.itemContainer.offsetHeight,
-1==this.getExpandedRowIndex()?(this._computeRowsHeight(),this._resizeRows()):this.expandRow(c.expandedRow,c.expandedRowCol,0,null,!0),c.invalidRowHeight)){delete c.invalidRowHeight;this.renderData=null;this.displayedItemsInvalidated=!0;this.refreshRendering();return}this.layoutDuringResize||b?setTimeout(r.hitch(this,function(){this._layoutRenderers(this.renderData)}),20):(n.set(this.itemContainer,"opacity",0),this._recycleItemRenderers(),this._recycleExpandRenderers(),void 0!=this._resizeTimer&&
clearTimeout(this._resizeTimer),this._resizeTimer=setTimeout(r.hitch(this,function(){delete this._resizeTimer;this._resizeRowsImpl(this.itemContainer,"tr");this._layoutRenderers(this.renderData);0==this.resizeAnimationDuration?n.set(this.itemContainer,"opacity",1):z.fadeIn({node:this.itemContainer,curve:[0,1]}).play(this.resizeAnimationDuration)}),200))}},resizeAnimationDuration:0,getExpandedRowIndex:function(){return null==this.renderData.expandedRow?-1:this.renderData.expandedRow},collapseRow:function(a,
b,c){var d=this.renderData;void 0==c&&(c=!0);void 0==a&&(a=this.expandDuration);if(d&&null!=d.expandedRow&&-1!=d.expandedRow)if(c&&a){c=d.expandedRow;var e=d.expandedRowHeight;delete d.expandedRow;this._computeRowsHeight(d);var f=this._getRowHeight(c);d.expandedRow=c;this._recycleExpandRenderers();this._recycleItemRenderers();n.set(this.itemContainer,"display","none");this._expandAnimation=new z.Animation({curve:[e,f],duration:a,easing:b,onAnimate:r.hitch(this,function(a){this._expandRowImpl(Math.floor(a))}),
onEnd:r.hitch(this,function(a){this._expandAnimation=null;this._collapseRowImpl(!1);this._resizeRows();n.set(this.itemContainer,"display","block");setTimeout(r.hitch(this,function(){this._layoutRenderers(d)}),100);this.onExpandAnimationEnd(!1)})});this._expandAnimation.play()}else this._collapseRowImpl(c)},_collapseRowImpl:function(a){var b=this.renderData;delete b.expandedRow;delete b.expandedRowHeight;this._computeRowsHeight(b);if(void 0==a||a)this._resizeRows(),this._layoutRenderers(b)},expandRow:function(a,
b,c,d,e){var f=this.renderData;if(!f||0>a||a>=f.rowCount)return-1;if(void 0==b||0>b||b>=f.columnCount)b=-1;void 0==e&&(e=!0);void 0==c&&(c=this.expandDuration);void 0==d&&(d=this.expandEasing);var g=this._getRowHeight(a),h=f.sheetHeight-Math.ceil(this.cellPaddingTop*(f.rowCount-1));f.expandedRow=a;f.expandedRowCol=b;f.expandedRowHeight=h;e&&(c?(this._recycleExpandRenderers(),this._recycleItemRenderers(),n.set(this.itemContainer,"display","none"),this._expandAnimation=new z.Animation({curve:[g,h],
duration:c,delay:50,easing:d,onAnimate:r.hitch(this,function(a){this._expandRowImpl(Math.floor(a))}),onEnd:r.hitch(this,function(){this._expandAnimation=null;n.set(this.itemContainer,"display","block");setTimeout(r.hitch(this,function(){this._expandRowImpl(h,!0)}),100);this.onExpandAnimationEnd(!0)})}),this._expandAnimation.play()):this._expandRowImpl(h))},_expandRowImpl:function(a,b){var c=this.renderData;c.expandedRowHeight=a;this._computeRowsHeight(c,c.sheetHeight-a);this._resizeRows();b&&this._layoutRenderers(c)},
onExpandAnimationEnd:function(a){},_resizeRows:function(){0>=this._getRowHeight(0)||(this.rowHeaderTable&&this._resizeRowsImpl(this.rowHeaderTable,"tr"),this.gridTable&&this._resizeRowsImpl(this.gridTable,"tr"),this.itemContainerTable&&this._resizeRowsImpl(this.itemContainerTable,"tr"))},_computeRowsHeight:function(a,b){var c=null==a?this.renderData:a;b=b||c.sheetHeight;b--;7==w("ie")&&(b-=c.rowCount);if(1==c.rowCount)c.rowHeight=b,c.rowHeightFirst=b,c.rowHeightLast=b;else{var d=null==c.expandedRow?
c.rowCount:c.rowCount-1,e=b/d,f;f=b-Math.floor(e)*d;var g=Math.abs(b-Math.ceil(e)*d),d=1;f<g?(e=Math.floor(e),g=f):(d=-1,e=Math.ceil(e));f=e+d*Math.floor(g/2);c.rowHeight=e;c.rowHeightFirst=f;c.rowHeightLast=f+d*(g%2)}},_getRowHeight:function(a){var b=this.renderData;return a==b.expandedRow?b.expandedRowHeight:0==b.expandedRow&&1==a||0==a?b.rowHeightFirst:b.expandedRow==this.renderData.rowCount-1&&a==this.renderData.rowCount-2||a==this.renderData.rowCount-1?b.rowHeightLast:b.rowHeight},_resizeRowsImpl:function(a,
b){dojo.query(b,a).forEach(function(a,b){n.set(a,"height",this._getRowHeight(b)+"px")},this)},_setHorizontalRendererAttr:function(a){this._destroyRenderersByKind("horizontal");this._set("horizontalRenderer",a)},_setLabelRendererAttr:function(a){this._destroyRenderersByKind("label");this._set("labelRenderer",a)},_destroyExpandRenderer:function(a){a.destroyRecursive&&a.destroyRecursive();A.destroy(a.domNode)},_setExpandRendererAttr:function(a){for(;0<this._ddRendererList.length;)this._destroyExpandRenderer(this._ddRendererList.pop());
var b=this._ddRendererPool;if(b)for(;0<b.length;)this._destroyExpandRenderer(b.pop());this._set("expandRenderer",a)},_ddRendererList:null,_ddRendererPool:null,_getExpandRenderer:function(a,b,c,d,e){if(null==this.expandRenderer)return null;var f=this._ddRendererPool.pop();null==f&&(f=new this.expandRenderer);this._ddRendererList.push(f);f.set("owner",this);f.set("date",a);f.set("items",b);f.set("rowIndex",c);f.set("columnIndex",d);f.set("expanded",e);return f},_recycleExpandRenderers:function(a){for(var b=
0;b<this._ddRendererList.length;b++){var c=this._ddRendererList[b];c.set("Up",!1);c.set("Down",!1);a&&c.domNode.parentNode.removeChild(c.domNode);n.set(c.domNode,"display","none")}this._ddRendererPool=this._ddRendererPool.concat(this._ddRendererList);this._ddRendererList=[]},_defaultItemToRendererKindFunc:function(a){return 1440<=Math.abs(this.renderData.dateModule.difference(a.startTime,a.endTime,"minute"))?"horizontal":"label"},naturalRowsHeight:null,_roundItemToDay:function(a){var b=a.startTime;
a=a.endTime;this.isStartOfDay(b)||(b=this.floorToDay(b,!1,this.renderData));this.isStartOfDay(a)||(a=this.renderData.dateModule.add(a,"day",1),a=this.floorToDay(a,!0));return{startTime:b,endTime:a}},_sortItemsFunction:function(a,b){this.roundToDay&&(a=this._roundItemToDay(a),b=this._roundItemToDay(b));var c=this.dateModule.compare(a.startTime,b.startTime);0==c&&(c=-1*this.dateModule.compare(a.endTime,b.endTime));return c},_overlapLayoutPass3:function(a){for(var b=0,c=0,d=[],e=u.position(this.gridTable).x,
f=0;f<this.renderData.columnCount;f++){for(var g=!1,c=u.position(this._getCellAt(0,f)),b=c.x-e,c=b+c.w,h=a.length-1;0<=h&&!g;h--)for(var m=0;m<a[h].length;m++)if(g=a[h][m],g=g.start<c&&b<g.end){d[f]=h+1;break}g||(d[f]=0)}return d},applyRendererZIndex:function(a,b,c,d,e,f){n.set(b.container,{zIndex:e||d?b.renderer.mobile?100:0:void 0==a.lane?1:a.lane+1})},_layoutRenderers:function(a){null==a||(null==a.items||0>=a.rowHeight)||(!this.gridTable||null!=this._expandAnimation||null==this.horizontalRenderer&&
null==this.labelRenderer?this._recycleItemRenderers():(this.renderData.gridTablePosX=u.position(this.gridTable).x,this._layoutStep=a.columnCount,this._recycleExpandRenderers(),this._hiddenItems=[],this._offsets=[],this.naturalRowsHeight=[],this.inherited(arguments)))},_offsets:null,_layoutInterval:function(a,b,c,d,e){if(null!=this.renderData.cells){var f=[];a=[];for(var g=0;g<e.length;g++){var h=e[g],m=this._itemToRendererKind(h);"horizontal"==m?f.push(h):"label"==m&&a.push(h)}e=this.getExpandedRowIndex();
if(!(-1!=e&&e!=b)){e=[];g=null;h=[];if(0<f.length&&this.horizontalRenderer)var g=this._createHorizontalLayoutItems(b,c,d,f),s=this._computeHorizontalOverlapLayout(g,h);var l,f=[];0<a.length&&this.labelRenderer&&(l=this._createLabelLayoutItems(b,c,d,a),this._computeLabelOffsets(l,f));c=this._computeColHasHiddenItems(b,h,f);null!=g&&this._layoutHorizontalItemsImpl(b,g,s,c,e);null!=l&&this._layoutLabelItemsImpl(b,l,c,e,h);this._layoutExpandRenderers(b,c,e);this._hiddenItems[b]=e}}},_createHorizontalLayoutItems:function(a,
b,c,d){if(null!=this.horizontalRenderer){for(var e=this.renderData,f=e.dateModule,g=e.rtl?-1:1,h=[],m=0;m<d.length;m++){var s=d[m],l=this.computeRangeOverlap(e,s.startTime,s.endTime,b,c),k=f.difference(b,this.floorToDay(l[0],!1,e),"day"),C=e.dates[a][k],v=u.position(this._getCellAt(a,k,!1)),n=v.x-e.gridTablePosX;e.rtl&&(n+=v.w);!this.roundToDay&&!s.allDay&&(n+=g*this.computeProjectionOnDate(e,C,l[0],v.w));var n=Math.ceil(n),p=f.difference(b,this.floorToDay(l[1],!1,e),"day"),t;p>e.columnCount-1?(v=
u.position(this._getCellAt(a,e.columnCount-1,!1)),t=e.rtl?v.x-e.gridTablePosX:v.x-e.gridTablePosX+v.w):(C=e.dates[a][p],v=u.position(this._getCellAt(a,p,!1)),t=v.x-e.gridTablePosX,e.rtl&&(t+=v.w),this.roundToDay?this.isStartOfDay(l[1])||(t+=g*v.w):t+=g*this.computeProjectionOnDate(e,C,l[1],v.w));t=Math.floor(t);e.rtl&&(C=t,t=n,n=C);t>n&&(s=r.mixin({start:n,end:t,range:l,item:s,startOffset:k,endOffset:p},s),h.push(s))}return h}},_computeHorizontalOverlapLayout:function(a,b){for(var c=this.renderData,
d=this.horizontalRendererHeight,e=this.computeOverlapping(a,this._overlapLayoutPass3),f=this.percentOverlap/100,g=0;g<c.columnCount;g++){var h=e.addedPassRes[g],m=c.rtl?c.columnCount-g-1:g;b[m]=0==f?0==h?0:1==h?d:d+(h-1)*(d+this.verticalGap):0==h?0:h*d-(h-1)*f*d+this.verticalGap;b[m]+=this.cellPaddingTop}return e},_createLabelLayoutItems:function(a,b,c,d){if(null!=this.labelRenderer){for(var e=this.renderData,f=e.dateModule,g=[],h=0;h<d.length;h++){var m=d[h];a=this.floorToDay(m.startTime,!1,e);for(var s=
this.dateModule.compare;-1==s(a,m.endTime)&&-1==s(a,c);){var l=f.add(a,"day",1),l=this.floorToDay(l,!0),l=this.computeRangeOverlap(e,m.startTime,m.endTime,a,l),n=f.difference(b,this.floorToDay(l[0],!1,e),"day");if(n>=this.columnCount)break;if(0<=n){var k=g[n];null==k&&(k=[],g[n]=k);k.push(r.mixin({startOffset:n,range:l,item:m},m))}a=f.add(a,"day",1);this.floorToDay(a,!0)}}return g}},_computeLabelOffsets:function(a,b){for(var c=0;c<this.renderData.columnCount;c++)b[c]=null==a[c]?0:a[c].length*(this.labelRendererHeight+
this.verticalGap)},_computeColHasHiddenItems:function(a,b,c){for(var d=[],e=this._getRowHeight(a),f,g=0,h=0;h<this.renderData.columnCount;h++)f=null==b||null==b[h]?this.cellPaddingTop:b[h],f+=null==c||null==c[h]?0:c[h],f>g&&(g=f),d[h]=f>e;this.naturalRowsHeight[a]=g;return d},_layoutHorizontalItemsImpl:function(a,b,c,d,e){c=this.renderData.cells[a];a=this._getRowHeight(a);for(var f=this.horizontalRendererHeight,g=this.percentOverlap/100,h=0;h<b.length;h++){var m=b[h],s=m.lane,l=this.cellPaddingTop,
l=0==g?l+s*(f+this.verticalGap):l+s*(f-g*f),s=!1,k=a;if(this.expandRenderer){for(k=m.startOffset;k<=m.endOffset;k++)if(d[k]){s=!0;break}k=s?a-this.expandRendererHeight:a}if(l+f<=k){var s=this._createRenderer(m,"horizontal",this.horizontalRenderer,"dojoxCalendarHorizontal"),p=(k=this.isItemBeingEdited(m)&&!this.liveLayout&&this._isEditing)?a-this.cellPaddingTop:f,r=m.end-m.start;9<=w("ie")&&m.start+r<this.itemContainer.offsetWidth&&r++;n.set(s.container,{top:(k?this.cellPaddingTop:l)+"px",left:m.start+
"px",width:r+"px",height:p+"px"});this._applyRendererLayout(m,s,c,r,p,"horizontal")}else for(l=m.startOffset;l<m.endOffset;l++)null==e[l]?e[l]=[m.item]:e[l].push(m.item)}},_layoutLabelItemsImpl:function(a,b,c,d,e){for(var f,g,h=this.renderData,m=h.cells[a],k=this._getRowHeight(a),l=this.labelRendererHeight,p=u.getMarginBox(this.itemContainer).w,q=0;q<b.length;q++)if(f=b[q],null!=f){var v=this.expandRenderer?c[q]?k-this.expandRendererHeight:k:k;g=null==e||null==e[q]?this.cellPaddingTop:e[q]+this.verticalGap;
for(var w=u.position(this._getCellAt(a,q)),y=w.x-h.gridTablePosX,t=0;t<f.length;t++){if(g+l+this.verticalGap<=v){var x=f[t];r.mixin(x,{start:y,end:y+w.w});var z=this._createRenderer(x,"label",this.labelRenderer,"dojoxCalendarLabel"),A=this.isItemBeingEdited(x)&&!this.liveLayout&&this._isEditing,B=A?this._getRowHeight(a)-this.cellPaddingTop:l;h.rtl&&(x.start=p-x.end,x.end=x.start+w.w);n.set(z.container,{top:(A?this.cellPaddingTop:g)+"px",left:x.start+"px",width:w.w+"px",height:B+"px"});this._applyRendererLayout(x,
z,m,w.w,B,"label")}else break;g+=l+this.verticalGap}for(;t<f.length;t++)null==d[q]?d[q]=[f[t]]:d[q].push(f[t])}},_applyRendererLayout:function(a,b,c,d,e,f){var g=this.isItemBeingEdited(a),h=this.isItemSelected(a),m=this.isItemHovered(a),k=this.isItemFocused(a),l=b.renderer;l.set("hovered",m);l.set("selected",h);l.set("edited",g);l.set("focused",this.showFocus?k:!1);l.set("moveEnabled",this.isItemMoveEnabled(a._item,f));l.set("storeState",this.getItemStoreState(a));"label"!=f&&l.set("resizeEnabled",
this.isItemResizeEnabled(a,f));this.applyRendererZIndex(a,b,m,h,g,k);l.updateRendering&&l.updateRendering(d,e);p.place(b.container,c);n.set(b.container,"display","block")},_getCellAt:function(a,b,c){if((void 0==c||!0==c)&&!this.isLeftToRight())b=this.renderData.columnCount-1-b;return this.gridTable.childNodes[0].childNodes[a].childNodes[b]},_layoutExpandRenderers:function(a,b,c){if(this.expandRenderer){var d=this.renderData;if(d.expandedRow==a)null!=d.expandedRowCol&&-1!=d.expandedRowCol&&this._layoutExpandRendererImpl(d.expandedRow,
d.expandedRowCol,null,!0);else if(null==d.expandedRow)for(var e=0;e<d.columnCount;e++)b[e]&&this._layoutExpandRendererImpl(a,d.rtl?d.columnCount-1-e:e,c[e],!1)}},_layoutExpandRendererImpl:function(a,b,c,d){var e=this.renderData,f=r.clone(e.dates[a][b]),g=null,h=e.cells[a],g=this._getExpandRenderer(f,c,a,b,d);a=u.position(this._getCellAt(a,b));a.x-=e.gridTablePosX;this.layoutExpandRenderer(g,f,c,a,this.expandRendererHeight);p.place(g.domNode,h);n.set(g.domNode,"display","block")},layoutExpandRenderer:function(a,
b,c,d,e){n.set(a.domNode,{left:d.x+"px",width:d.w+"px",height:e+"px",top:d.h-e-1+"px"})},_onItemEditBeginGesture:function(a){var b=this._edProps,c=b.editedItem,d=a.dates,e=this.newDate("resizeEnd"==b.editKind?c.endTime:c.startTime);if("label"!=b.rendererKind&&"move"==a.editKind&&(c.allDay||this.roundToDay))b.dayOffset=this.renderData.dateModule.difference(this.floorToDay(d[0],!1,this.renderData),e,"day");this.inherited(arguments)},_computeItemEditingTimes:function(a,b,c,d,e){var f=this.renderData.dateModule,
g=this._edProps;if("label"!=c)if(a.allDay||this.roundToDay){var h=this.isStartOfDay(d[0]);switch(b){case "resizeEnd":!h&&a.allDay&&(d[0]=f.add(d[0],"day",1));case "resizeStart":h||(d[0]=this.floorToDay(d[0],!0));break;case "move":d[0]=f.add(d[0],"day",g.dayOffset);break;case "resizeBoth":h||(d[0]=this.floorToDay(d[0],!0)),this.isStartOfDay(d[1])||(d[1]=this.floorToDay(f.add(d[1],"day",1),!0))}}else d=this.inherited(arguments);return d},getTime:function(a,b,c,d){var e=this.renderData;null!=a&&(c=u.position(this.itemContainer,
!0),a.touches?(d=void 0==d?0:d,b=a.touches[d].pageX-c.x,c=a.touches[d].pageY-c.y):(b=a.pageX-c.x,c=a.pageY-c.y));d=u.getContentBox(this.itemContainer);0>b?b=0:b>d.w&&(b=d.w-1);0>c?c=0:c>d.h&&(c=d.h-1);a=u.getMarginBox(this.itemContainer).w/e.columnCount;c=null==e.expandedRow?Math.floor(c/(u.getMarginBox(this.itemContainer).h/e.rowCount)):e.expandedRow;d=u.getContentBox(this.itemContainer);e.rtl&&(b=d.w-b);d=Math.floor(b/a);b=Math.floor(1440*(b-d*a)/a);a=null;c<e.dates.length&&d<this.renderData.dates[c].length&&
(a=this.newDate(this.renderData.dates[c][d]),a=this.renderData.dateModule.add(a,"minute",b));return a},_onGridMouseUp:function(a){this.inherited(arguments);this._gridMouseDown&&(this._gridMouseDown=!1,this._onGridClick({date:this.getTime(a),triggerEvent:a}))},_onGridTouchEnd:function(a){this.inherited(arguments);var b=this._gridProps;b&&(this._isEditing||(!b.fromItem&&!b.editingOnStart&&this.selectFromEvent(a,null,null,!0),b.fromItem||(this._pendingDoubleTap&&this._pendingDoubleTap.grid?(this._onGridDoubleClick({date:this.getTime(this._gridProps.event),
triggerEvent:this._gridProps.event}),clearTimeout(this._pendingDoubleTap.timer),delete this._pendingDoubleTap):(this._onGridClick({date:this.getTime(this._gridProps.event),triggerEvent:this._gridProps.event}),this._pendingDoubleTap={grid:!0,timer:setTimeout(r.hitch(this,function(){delete this._pendingDoubleTap}),this.doubleTapDelay)}))),this._gridProps=null)},_onRowHeaderClick:function(a){this._dispatchCalendarEvt(a,"onRowHeaderClick")},onRowHeaderClick:function(a){},expandRendererClickHandler:function(a,
b){E.stop(a);var c=b.get("rowIndex"),d=b.get("columnIndex");this._onExpandRendererClick(r.mixin(this._createItemEditEvent(),{rowIndex:c,columnIndex:d,renderer:b,triggerEvent:a,date:this.renderData.dates[c][d]}))},onExpandRendererClick:function(a){},_onExpandRendererClick:function(a){this._dispatchCalendarEvt(a,"onExpandRendererClick");a.isDefaultPrevented()||(-1!=this.getExpandedRowIndex()?this.collapseRow():this.expandRow(a.rowIndex,a.columnIndex))},snapUnit:"minute",snapSteps:15,minDurationUnit:"minute",
minDurationSteps:15,triggerExtent:3,liveLayout:!1,stayInView:!0,allowStartEndSwap:!0,allowResizeLessThan24H:!1})});
//@ sourceMappingURL=MatrixView.js.map