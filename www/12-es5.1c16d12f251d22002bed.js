!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{VpTV:function(n,a,r){"use strict";r.r(a),r.d(a,"CountryPageModule",(function(){return M}));var i=r("ofXK"),o=r("3Pt+"),s=r("TEn/"),c=r("tyNb"),h=r("mrSG"),b=r("AKWm"),u=r("sCaM"),l=r("VIqg"),d=r("gj+k"),p=r("iBRH"),g=r("fXoL"),f=r("yTNM");function m(t,e){1&t&&(g.Kb(0),g.hc(1," Sorry, we couldn't find specific covid data related to this country. Please check again at a later date "),g.Jb())}function x(t,e){if(1&t&&(g.Kb(0),g.Mb(1,"ion-row",6),g.Mb(2,"ion-col",7),g.Mb(3,"p"),g.hc(4,"Total Cases"),g.Lb(),g.Ib(5,"p",8),g.Lb(),g.Mb(6,"ion-col",7),g.Mb(7,"p"),g.hc(8,"New Cases"),g.Lb(),g.Ib(9,"p",8),g.Lb(),g.Lb(),g.Mb(10,"ion-row",6),g.Mb(11,"ion-col",7),g.Mb(12,"p"),g.hc(13,"Total Deaths"),g.Lb(),g.Mb(14,"ion-text",9),g.Ib(15,"p",8),g.Lb(),g.Lb(),g.Mb(16,"ion-col",7),g.Mb(17,"p"),g.hc(18,"New Deaths"),g.Lb(),g.Mb(19,"ion-text",9),g.Ib(20,"p",8),g.Lb(),g.Lb(),g.Lb(),g.Mb(21,"ion-row",6),g.Mb(22,"ion-col",7),g.Mb(23,"p"),g.hc(24,"Total Recovered"),g.Lb(),g.Mb(25,"ion-text",10),g.Ib(26,"p",8),g.Lb(),g.Lb(),g.Mb(27,"ion-col",7),g.Mb(28,"p"),g.hc(29,"New Recovered"),g.Lb(),g.Mb(30,"ion-text",10),g.Ib(31,"p",8),g.Lb(),g.Lb(),g.Lb(),g.Jb()),2&t){var n=g.Vb();g.xb(5),g.ac("innerText",n.textData.totalCases),g.xb(4),g.ac("innerText",n.textData.newCases),g.xb(6),g.ac("innerText",n.textData.totalDeaths),g.xb(5),g.ac("innerText",n.textData.newDeaths),g.xb(6),g.ac("innerText",n.textData.totalRecovered),g.xb(5),g.ac("innerText",n.textData.newRecovered)}}var y,v,w,C=[{path:":country",component:(y=function(){function n(e,a){t(this,n),this.activatedRoute=e,this.apiService=a,this.margin={top:20,right:40,bottom:30,left:60},this.necessaryDataReturned=!1,this.noDataFound=!1,this.width=900-this.margin.left-this.margin.right,this.height=500-this.margin.top-this.margin.bottom}var a,r,i;return a=n,(r=[{key:"ngOnInit",value:function(){return Object(h.a)(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.currentCountry=this.activatedRoute.snapshot.url[0].path,t.prev=1,t.next=4,this.apiService.findCountryInSummary(this.currentCountry);case 4:return e=t.sent,this.necessaryDataReturned=!0,this.textData={totalCases:this.numberWithCommas(e.TotalConfirmed),totalDeaths:this.numberWithCommas(e.TotalDeaths),totalRecovered:this.numberWithCommas(e.TotalRecovered),newCases:this.numberWithCommas(e.NewConfirmed),newDeaths:this.numberWithCommas(e.NewDeaths),newRecovered:this.numberWithCommas(e.NewRecovered)},console.log(e),console.log(this.textData),t.next=11,this.initialiseGraph();case 11:t.next=16;break;case 13:t.prev=13,t.t0=t.catch(1),console.log(t.t0),this.noDataFound=!0;case 16:case"end":return t.stop()}}),t,this,[[1,13]])})))}},{key:"initialiseGraph",value:function(){return Object(h.a)(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e,n=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.apiService.findSlugByCountryName(this.currentCountry);case 2:return e=t.sent,t.next=5,this.apiService.getPast7DaysNewCases(e);case 5:this.graphData=t.sent,this.svg=b.a("#lineChart").append("svg").attr("width","100%").attr("height","100%").attr("viewBox","0 0 900 500"),this.g=this.svg.append("g").attr("transform","translate("+this.margin.left+","+this.margin.top+")"),this.x=u.a().rangeRound([0,this.width]).padding(.1),this.y=l.a().rangeRound([this.height,0]),this.x.domain(this.graphData.map((function(t){return t.day}))),this.y.domain([0,d.a(this.graphData,(function(t){return t.newCases}))]),this.g.append("g").attr("class","axis axis--x").attr("transform","translate(0,"+this.height+")").call(p.a(this.x)).attr("font-size","14"),this.g.append("g").attr("class","axis axis--y").call(p.b(this.y)).attr("font-size","14"),this.g.selectAll(".scatter-dots").data(this.graphData).enter().append("circle").attr("class","svg:circle").attr("fill","rgb(84, 129, 177)").attr("cx",(function(t){return n.x(t.day)})).attr("cy",(function(t){return n.y(t.newCases)})).attr("width",this.x.bandwidth()).attr("height",(function(t){return n.height-n.y(t.newCases)})).attr("transform","translate(50,0)").attr("r",5),this.svg.append("line").data(this.graphData).enter().append("line").attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("x",(function(t){return n.x(t.day)})).attr("y",(function(t){return n.y(t.newCases)}));case 16:case"end":return t.stop()}}),t,this)})))}},{key:"numberWithCommas",value:function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}}])&&e(a.prototype,r),i&&e(a,i),n}(),y.\u0275fac=function(t){return new(t||y)(g.Hb(c.a),g.Hb(f.a))},y.\u0275cmp=g.Bb({type:y,selectors:[["app-country"]],decls:9,vars:3,consts:[["color","secondary"],["slot","start"],[1,"ion-text-center",3,"innerHTML"],[1,"ion-padding"],["id","lineChart"],[4,"ngIf"],[1,"ion-margin","border"],[1,"ion-text-center"],[3,"innerText"],["color","danger"],["color","success"]],template:function(t,e){1&t&&(g.Mb(0,"ion-header"),g.Mb(1,"ion-toolbar",0),g.Mb(2,"ion-buttons",1),g.Ib(3,"ion-back-button"),g.Lb(),g.Ib(4,"ion-title",2),g.Lb(),g.Lb(),g.Mb(5,"ion-content",3),g.Ib(6,"div",4),g.gc(7,m,2,0,"ng-container",5),g.gc(8,x,32,6,"ng-container",5),g.Lb()),2&t&&(g.xb(4),g.ac("innerHTML",e.currentCountry,g.dc),g.xb(3),g.ac("ngIf",e.noDataFound),g.xb(1),g.ac("ngIf",e.necessaryDataReturned&&!e.noDataFound))},directives:[s.h,s.q,s.e,s.b,s.c,s.p,s.g,i.i,s.m,s.f,s.o],styles:[""]}),y)}],D=((w=function e(){t(this,e)}).\u0275mod=g.Fb({type:w}),w.\u0275inj=g.Eb({factory:function(t){return new(t||w)},imports:[[c.i.forChild(C)],c.i]}),w),M=((v=function e(){t(this,e)}).\u0275mod=g.Fb({type:v}),v.\u0275inj=g.Eb({factory:function(t){return new(t||v)},imports:[[i.b,o.a,s.r,D]]}),v)}}])}();