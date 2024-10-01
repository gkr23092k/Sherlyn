"use strict";(self.webpackChunkSherlyn=self.webpackChunkSherlyn||[]).push([[530],{2530:(O,p,i)=>{i.r(p),i.d(p,{DashboardModule:()=>X});var m=i(177),u=i(803),t=i(7705),d=i(1088),c=i(8585),r=i(9153),f=i(3339),b=i(205);c.DPo(f.A);let g=(()=>{class s{constructor(a,e){this.data=a,this.fb=e,this.dataarrayobj=[],this.content="",this.groupedData=[],this.msg="",this.grpcount=0,this.dataforfilter=[],this.colorlist=[]}ngOnChanges(){this.groupedData=this.spendlist,console.log(this.spendlist),this.initializeChart()}initializeChart(){this.chart=c.vtF("donut-chartdiv",r.KC),this.chart.innerRadius=c.KNB(55),this.chart.data=this.groupedData;const a=this.chart.series.push(new r.tB);a.dataFields.value="totalPrice",a.dataFields.category="matgroup",a.labels.template.text="",this.chart.legend=new r.s$}disposeChart(){this.chart?(this.chart.dispose(),console.log("Chart disposed successfully.")):console.warn("Chart was not initialized before disposal.")}static#t=this.\u0275fac=function(e){return new(e||s)(t.rXU(b.i),t.rXU(d.f))};static#s=this.\u0275cmp=t.VBU({type:s,selectors:[["donut-chart"]],inputs:{spendlist:["Spendlist","spendlist"]},features:[t.OA$],decls:1,vars:0,consts:[["id","donut-chartdiv",1,"shadow-lg","p-2","m-2",2,"width","99%","height","80vh"]],template:function(e,n){1&e&&t.nrm(0,"div",0)}})}return s})();var l=i(7376);c.DPo(f.A);let v=(()=>{class s{constructor(a,e){this.data=a,this.fb=e,this.dataarrayobj=[],this.chartdiv=""}ngOnChanges(){this.spendlist&&this.Idtoken&&(this.dataarrayobj=this.spendlist,this.chartdiv="chartdiv-"+this.Idtoken,this.dataloaded())}dataloaded(){this.disposeChart(),setTimeout(()=>{if(document.getElementById(this.chartdiv)){this.chart=c.vtF(this.chartdiv,r.C1);const a=l.groupBy(this.dataarrayobj,"date");this.dataarrayobj=l.map(a,(j,E)=>({date:E,matprice:l.sumBy(j,"matprice")})),console.log(this.dataarrayobj,"chart loader"),this.chart.data=this.dataarrayobj;const e=this.chart.xAxes.push(new r.cX);e.renderer.minGridDistance=25,e.renderer.labels.template.fontSize=12,e.renderer.labels.template.rotation=45,e.renderer.grid.template.location=0,this.chart.yAxes.push(new r.FL);const o=this.chart.series.push(new r.Im);o.dataFields.dateX="date",o.dataFields.valueY="matprice",o.strokeWidth=3,o.tooltipText="{matprice} Rs in {date}",o.stroke=c.yWT(this.colorcode),this.chart.cursor=new r.Av,this.chart.cursor.behavior="zoomX",this.chart.scrollbarX=new c.ZeV}else console.warn(`Chart container with id ${this.chartdiv} not found.`)},100)}ngOnDestroy(){this.disposeChart()}disposeChart(){this.chart?(this.chart.dispose(),console.log("Chart disposed successfully.")):console.warn("Chart was not initialized before disposal.")}static#t=this.\u0275fac=function(e){return new(e||s)(t.rXU(b.i),t.rXU(d.f))};static#s=this.\u0275cmp=t.VBU({type:s,selectors:[["line-chart"]],inputs:{spendlist:["Spendlist","spendlist"],Idtoken:"Idtoken",colorcode:"colorcode"},features:[t.OA$],decls:1,vars:1,consts:[[1,"shadow-lg","p-2","m-2",2,"width","99%","height","80vh",3,"id"]],template:function(e,n){1&e&&t.nrm(0,"div",0),2&e&&t.Y8G("id",n.chartdiv)}})}return s})();function C(s,h){if(1&s&&t.nrm(0,"donut-chart",4),2&s){const a=t.XpG();t.Y8G("Spendlist",a.groupeddata)}}function D(s,h){if(1&s&&t.nrm(0,"line-chart",5),2&s){const a=t.XpG();t.Y8G("colorcode","red")("Idtoken",1)("Spendlist",a.data)}}function I(s,h){if(1&s&&t.nrm(0,"line-chart",5),2&s){const a=t.XpG();t.Y8G("colorcode","red")("Idtoken",2)("Spendlist",a.groupeddatamonthly)}}function y(s,h){if(1&s&&t.nrm(0,"line-chart",5),2&s){const a=t.XpG();t.Y8G("colorcode","green")("Idtoken",3)("Spendlist",a.investdata)}}function S(s,h){if(1&s&&t.nrm(0,"line-chart",5),2&s){const a=t.XpG();t.Y8G("colorcode","green")("Idtoken",4)("Spendlist",a.groupeddatamonthlyinv)}}const T=[{path:"main",component:(()=>{class s{constructor(a){this.fb=a,this.ischart="SDAY"}ngOnInit(){this.fb.getAllspendItems().subscribe(a=>{this.data=a}),this.fb.getmatgroupspendItems().subscribe(a=>{this.groupeddata=a}),this.fb.getAllSpendItemsMonthly().subscribe(a=>{this.groupeddatamonthly=a}),this.fb.getAllinvestItems().subscribe(a=>{this.investdata=a}),this.fb.getAllInvestItemsMonthly().subscribe(a=>{this.groupeddatamonthlyinv=a})}static#t=this.\u0275fac=function(e){return new(e||s)(t.rXU(d.f))};static#s=this.\u0275cmp=t.VBU({type:s,selectors:[["app-dashboardmain"]],decls:16,vars:5,consts:[[1,"d-flex","justify-content-center","my-2"],[1,"btn","btn-sm","btn-info","mx-1","text-white",3,"click"],[3,"Spendlist",4,"ngIf"],[3,"colorcode","Idtoken","Spendlist",4,"ngIf"],[3,"Spendlist"],[3,"colorcode","Idtoken","Spendlist"]],template:function(e,n){1&e&&(t.j41(0,"div",0)(1,"button",1),t.bIt("click",function(){return n.ischart="SDAY"}),t.EFF(2,"DAY SPENDS"),t.k0s(),t.j41(3,"button",1),t.bIt("click",function(){return n.ischart="SMONTH"}),t.EFF(4,"MONTH SPENDS"),t.k0s(),t.j41(5,"button",1),t.bIt("click",function(){return n.ischart="GROUP"}),t.EFF(6,"GROUP"),t.k0s(),t.j41(7,"button",1),t.bIt("click",function(){return n.ischart="IDAY"}),t.EFF(8,"DAY INVEST"),t.k0s(),t.j41(9,"button",1),t.bIt("click",function(){return n.ischart="IMONTH"}),t.EFF(10,"MONTH INVEST"),t.k0s()(),t.DNE(11,C,1,1,"donut-chart",2),t.DNE(12,D,1,3,"line-chart",3),t.DNE(13,I,1,3,"line-chart",3),t.DNE(14,y,1,3,"line-chart",3),t.DNE(15,S,1,3,"line-chart",3)),2&e&&(t.R7$(11),t.Y8G("ngIf","GROUP"==n.ischart),t.R7$(1),t.Y8G("ngIf","SDAY"==n.ischart),t.R7$(1),t.Y8G("ngIf","SMONTH"==n.ischart),t.R7$(1),t.Y8G("ngIf","IDAY"==n.ischart),t.R7$(1),t.Y8G("ngIf","IMONTH"==n.ischart))},dependencies:[m.bT,g,v]})}return s})()},{path:"**",redirectTo:"main"}];let G=(()=>{class s{static#t=this.\u0275fac=function(e){return new(e||s)};static#s=this.\u0275mod=t.$C({type:s});static#a=this.\u0275inj=t.G2t({imports:[u.iI.forChild(T),u.iI]})}return s})();var F=i(9631),A=i(2102),Y=i(5084),k=i(6600),N=i(9417);let X=(()=>{class s{static#t=this.\u0275fac=function(e){return new(e||s)};static#s=this.\u0275mod=t.$C({type:s});static#a=this.\u0275inj=t.G2t({imports:[m.MD,G,A.RG,F.fS,Y.X6,k.WX,N.YN]})}return s})()}}]);