import{_ as o,L as m,r,o as c,b as l,d as t,w as a,j as n,i as f,g as k}from"./main-3e49f720.js";const x={name:"admin-links",setup:()=>({userStore:m()})},$={key:0,class:"admin-links"};function h(s,_,d,i,p,u){const e=r("router-link");return s.userStore.user.status==="admin"?(c(),l("div",$,[t(e,{"exact-path":"",to:"/users"},{default:a(()=>[n("Все пользователи")]),_:1}),t(e,{"exact-path":"",to:"/createBrand"},{default:a(()=>[n("Создание бренда")]),_:1}),t(e,{"exact-path":"",to:"/createCar"},{default:a(()=>[n("Создание машины")]),_:1}),t(e,{"exact-path":"",to:"/analytics"},{default:a(()=>[n("Аналитика")]),_:1})])):f("",!0)}const v=o(x,[["render",h],["__scopeId","data-v-346aad83"]]),w={name:"admin-view",components:{AdminLinks:v}};function y(s,_,d,i,p,u){const e=r("admin-links");return c(),k(e)}const C=o(w,[["render",y]]);export{C as default};
