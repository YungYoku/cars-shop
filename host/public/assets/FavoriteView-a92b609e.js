import{_ as h,L as C,M as I,N as S,o as a,b as i,F as k,n as p,g as l,w as d,d as s,s as x,j as v,v as o,t as y,K as c,e as u,D as V,h as m,x as b,G as g}from"./main-3e49f720.js";const w={name:"favorite-view",setup:()=>({userStore:C(),savedStore:I(),favoriteStore:S()}),methods:{isItMyCar(e){return!!this.userStore.user.saved.find(n=>n.brandId===e.brandId&&n.modelId===e.modelId)},addCar(e){this.savedStore.add(e.brandId,e.modelId)},removeCar(e){this.savedStore.remove(e.brandId,e.modelId)},removeFavorite(e){this.favoriteStore.remove(e.brandId,e.modelId)}}},F={class:"favourite"},B={key:0},N={key:1,class:"wrap"};function M(e,f,n,T,$,r){return a(),i("div",F,[e.favoriteStore.favorite.length?(a(),i("div",N,[(a(!0),i(k,null,p(e.favoriteStore.favorite,t=>(a(),l(g,{key:t.brandId+""+t.modelId,style:{marginBottom:"20px"},class:"mx-auto","min-width":"240",width:"100%"},{default:d(()=>[s(x,{src:t.image,class:"white--text align-end",height:"200px"},null,8,["src"]),s(y,null,{default:d(()=>[v(o(t.model),1)]),_:2},1024),s(c,{class:"pb-0"},{default:d(()=>[v(o(t.generation),1)]),_:2},1024),s(c,null,{default:d(()=>[v(o(t.price)+" ₽",1)]),_:2},1024),s(V,{class:"text--primary"},{default:d(()=>[u("div",null,"Страна: "+o(t.country),1),u("div",null,"Дверей: "+o(t.door),1),u("div",null,"Сидений: "+o(t.seat),1)]),_:2},1024),s(b,null,{default:d(()=>[r.isItMyCar(t)?(a(),l(m,{key:0,icon:"mdi-cart-off",text:"",onClick:_=>r.removeCar(t)},null,8,["onClick"])):(a(),l(m,{key:1,icon:"mdi-cart",text:"",onClick:_=>r.addCar(t)},null,8,["onClick"])),s(m,{icon:"mdi-star-off",text:"",onClick:_=>r.removeFavorite(t)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128))])):(a(),i("span",B,"Пусто"))])}const L=h(w,[["render",M],["__scopeId","data-v-333e275b"]]);export{L as default};