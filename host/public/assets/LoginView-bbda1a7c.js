import{u as h,r as i,m as c,s as w,g}from"./index-c6def6da-6b083fe0.js";import{_ as f,L as _,u as E,I as V,r as v,o as l,b as S,d as r,w as a,k as b,l as y,g as L,P as k,i as A,Q as n,h as I,j as d,v as U,p as B,m as C,e as u}from"./main-3e49f720.js";const N={name:"login-view",setup:()=>({v$:h(),userStore:_(),loadingStore:E()}),validations:{email:{required:i},password:{required:i,minLength:c(6),containsUppercase:function(e){return/[A-Z]/.test(e)},containsLowercase:function(e){return/[a-z]/.test(e)},containsNumber:function(e){return/[0-9]/.test(e)}}},data:()=>({email:"",password:"",emailErrors:"",emailError:null,passwordErrors:"",passwordError:null}),watch:{email(){this.emailError=null},password(){this.passwordError=null}},computed:{alert(){return this.emailError||this.passwordError||null}},methods:{handleLoginError(e){switch(e.code){case"auth/invalid-email":this.emailError="Несуществующая почта";break;case"auth/wrong-password":this.passwordError="Неправильный пароль";break}},async handleLoginResponse(e){const s=e.user.uid;this.userStore.updateUid(s),await this.userStore.loadUser(),await this.$router.push("/")},async login(){await this.v$.$validate()&&(this.loadingStore.start(),await w(g(),this.email,this.password).then(this.handleLoginResponse).catch(this.handleLoginError).finally(()=>{V("login"),this.loadingStore.end()}))}}},m=e=>(B("data-v-89d4eb0e"),e=e(),C(),e),$={class:"login"},q=m(()=>u("h2",null,"Вход",-1)),F=m(()=>u("h5",null,"Нет аккаунта? Зарегистрироваться.",-1));function M(e,s,R,z,P,o){const p=v("router-link");return l(),S("div",$,[q,r(y,{novalidate:"",onSubmit:b(o.login,["prevent"])},{default:a(()=>[r(n,{modelValue:e.email,"onUpdate:modelValue":s[0]||(s[0]=t=>e.email=t),modelModifiers:{trim:!0},"error-messages":e.emailErrors,rules:[()=>!!e.email||"Почта отсутствует."],label:"E-mail",required:""},null,8,["modelValue","error-messages","rules"]),r(n,{modelValue:e.password,"onUpdate:modelValue":s[1]||(s[1]=t=>e.password=t),modelModifiers:{trim:!0},"error-messages":e.passwordErrors,rules:[()=>!!e.password||"Пароль отсутствует.",()=>e.password.length>=6||"Пароль меньше 6 символов.",()=>/[A-Z]/.test(e.password)||"Пароль должен содержать заглавные буквы",()=>/[a-z]/.test(e.password)||"Пароль должен содержать прописные буквы",()=>/[0-9]/.test(e.password)||"Пароль должен содержать цифры"],label:"Пароль",required:"",type:"password"},null,8,["modelValue","error-messages","rules"]),r(I,{class:"btnSubmit",type:"submit"},{default:a(()=>[d("Войти")]),_:1}),r(p,{class:"swap",to:"/reg"},{default:a(()=>[F]),_:1})]),_:1},8,["onSubmit"]),o.alert?(l(),L(k,{key:0,class:"alert",prominent:"",type:"error",variant:"flat"},{default:a(()=>[d(U(o.alert),1)]),_:1})):A("",!0)])}const j=f(N,[["render",M],["__scopeId","data-v-89d4eb0e"]]);export{j as default};