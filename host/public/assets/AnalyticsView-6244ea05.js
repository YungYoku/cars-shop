import{_,aA as h,o as n,b as l,e as d,B as m,aB as v,F as r,n as p,v as c,j as u,p as T,m as f}from"./main-3e49f720.js";const A={data(){return{analytics:[],selectedType:"",requestTypes:["login","register","addEmptyUserToDb","loadBrands","loadCars","loadUsers","createCar","addFavorite","removeFavorite","addSaved","removeSaved"]}},computed:{selectedAnalytics(){return this.selectedType?this.analytics.filter(e=>e.type===this.selectedType):[]}},mounted(){this.load()},methods:{async load(){this.analytics=await h()},findRequestsAmount(e){return this.analytics.filter(a=>a.type===e).length},generateOptionText(e){let s;const a=this.findRequestsAmount(e);return a%10===0||a%10>=5&&a%10<=9?s="запросов":a%10===1?s="запрос":s="запроса",`${e} (${a} ${s})`}}},y=e=>(T("data-v-42a6dd95"),e=e(),f(),e),g={class:"analytics"},x={for:"requestType"},k=y(()=>d("span",null," Тип запроса: ",-1)),S=["value"],w={key:0},B=y(()=>d("br",null,null,-1)),q={key:1},I={key:2};function V(e,s,a,b,o,i){return n(),l("div",g,[d("label",x,[k,m(d("select",{id:"requestType","onUpdate:modelValue":s[0]||(s[0]=t=>o.selectedType=t)},[(n(!0),l(r,null,p(o.requestTypes,t=>(n(),l("option",{key:t,value:t},c(i.generateOptionText(t)),9,S))),128))],512),[[v,o.selectedType]])]),i.selectedAnalytics.length?(n(),l("ul",w,[(n(!0),l(r,null,p(i.selectedAnalytics,t=>(n(),l("li",{key:t.date},[u(" IP запроса: "+c(t.ip)+" ",1),B,u(" Дата запроса: "+c(new Date(t.date.seconds)),1)]))),128))])):o.selectedType.length?(n(),l("span",I,"Запросы такого типа отсутствуют")):(n(),l("span",q,"Выберите тип запроса"))])}const F=_(A,[["render",V],["__scopeId","data-v-42a6dd95"]]);export{F as default};