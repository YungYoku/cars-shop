import{u as h,r as i,m as c,s as w,g}from"./index-c6def6da-73f40e5e.js";import{_ as f,L as V,P as _,I as E,r as v,o as l,b as S,d as r,w as a,m as b,n as y,h as L,Q as k,k as A,V as n,j as I,l as d,x as U,p as q,q as B,f as u}from"./main-c1366cb5.js";const C={name:"login-view",setup:()=>({v$:h(),userStore:V(),loadingStore:_()}),validations:{email:{required:i},password:{required:i,minLength:c(6),containsUppercase:function(e){return/[A-Z]/.test(e)},containsLowercase:function(e){return/[a-z]/.test(e)},containsNumber:function(e){return/[0-9]/.test(e)}}},data:()=>({email:"",password:"",emailErrors:"",emailError:null,passwordErrors:"",passwordError:null}),watch:{email(){this.emailError=null},password(){this.passwordError=null}},computed:{alert(){return this.emailError||this.passwordError||null}},methods:{handleLoginError(e){switch(e.code){case"auth/invalid-email":this.emailError="Несуществующая почта";break;case"auth/wrong-password":this.passwordError="Неправильный пароль";break}},async handleLoginResponse(e){const s=e.user.uid;this.userStore.updateUid(s),await this.userStore.loadUser(),await this.$router.push("/")},async login(){await this.v$.$validate()&&(this.loadingStore.start(),await w(g(),this.email,this.password).then(this.handleLoginResponse).catch(this.handleLoginError).finally(()=>{E("login"),this.loadingStore.end()}))}}},m=e=>(q("data-v-89d4eb0e"),e=e(),B(),e),N={class:"login"},$=m(()=>u("h2",null,"Вход",-1)),F=m(()=>u("h5",null,"Нет аккаунта? Зарегистрироваться.",-1));function M(e,s,R,z,P,o){const p=v("router-link");return l(),S("div",N,[$,r(y,{novalidate:"",onSubmit:b(o.login,["prevent"])},{default:a(()=>[r(n,{modelValue:e.email,"onUpdate:modelValue":s[0]||(s[0]=t=>e.email=t),modelModifiers:{trim:!0},"error-messages":e.emailErrors,rules:[()=>!!e.email||"Почта отсутствует."],label:"E-mail",required:""},null,8,["modelValue","error-messages","rules"]),r(n,{modelValue:e.password,"onUpdate:modelValue":s[1]||(s[1]=t=>e.password=t),modelModifiers:{trim:!0},"error-messages":e.passwordErrors,rules:[()=>!!e.password||"Пароль отсутствует.",()=>e.password.length>=6||"Пароль меньше 6 символов.",()=>/[A-Z]/.test(e.password)||"Пароль должен содержать заглавные буквы",()=>/[a-z]/.test(e.password)||"Пароль должен содержать прописные буквы",()=>/[0-9]/.test(e.password)||"Пароль должен содержать цифры"],label:"Пароль",required:"",type:"password"},null,8,["modelValue","error-messages","rules"]),r(I,{class:"btnSubmit",type:"submit"},{default:a(()=>[d("Войти")]),_:1}),r(p,{class:"swap",to:"/reg"},{default:a(()=>[F]),_:1})]),_:1},8,["onSubmit"]),o.alert?(l(),L(k,{key:0,class:"alert",prominent:"",type:"error",variant:"flat"},{default:a(()=>[d(U(o.alert),1)]),_:1})):A("",!0)])}const j=f(C,[["render",M],["__scopeId","data-v-89d4eb0e"]]);export{j as default};