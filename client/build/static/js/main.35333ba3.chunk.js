(this["webpackJsonpfungi-react"]=this["webpackJsonpfungi-react"]||[]).push([[0],{100:function(e,t,a){},102:function(e,t,a){},161:function(e,t,a){},278:function(e,t,a){},280:function(e,t,a){},282:function(e,t,a){},283:function(e,t,a){},284:function(e,t,a){},286:function(e,t,a){},287:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(18),r=a(22),s=a.n(r),o=a(6),i=a(13),l=a(8),u=a.n(l),j=a(12),d=a(16),b=a.n(d),h=a(1),O=Object(n.createContext)();function p(e){var t=Object(n.useState)(void 0),a=Object(o.a)(t,2),c=a[0],r=a[1];function s(){return i.apply(this,arguments)}function i(){return(i=Object(j.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("https://react-forager.herokuapp.com/auth/loggedIn");case 2:t=e.sent,r(t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){s()}),[]),Object(h.jsx)(O.Provider,{value:{loggedIn:c,getLoggedIn:s},children:e.children})}var m=O,x=a(11),f=Object(n.createContext)(),g={errors:null,isLoading:!0,user:"",images:[]},v=function(e,t){switch(t.type){case"login":return Object(x.a)(Object(x.a)({},e),{},{user:t.payload,images:[]});case"logout":return Object(x.a)(Object(x.a)({},e),{},{user:"",images:[]});case"fetchImages":return Object(x.a)(Object(x.a)({},e),{},{images:t.payload,isLoading:!0});case"fetchSuccess":return Object(x.a)(Object(x.a)({},e),{},{images:t.payload,isLoading:!1});case"fetchFail":return Object(x.a)(Object(x.a)({},e),{},{errors:t.payload,isLoading:!1});case"setTags":return Object(x.a)(Object(x.a)({},e),{},{tags:t.payload});default:return e}};a(100);var y=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)(""),s=Object(o.a)(r,2),l=s[0],d=s[1],O=Object(n.useContext)(m).getLoggedIn,p=Object(n.useContext)(f).dispatch,x=Object(i.e)();function g(){return(g=Object(j.a)(u.a.mark((function e(t){var n,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,b.a.post("https://react-forager.herokuapp.com/auth/login",{email:a,password:l});case 4:return n=e.sent,c=n.data,console.log(c),e.next=9,O();case 9:p({type:"login",payload:c._id}),window.localStorage.setItem("user",JSON.stringify(c._id)),x.push("/gallery"),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),console.error(e.t0);case 17:case"end":return e.stop()}}),e,null,[[1,14]])})))).apply(this,arguments)}return Object(h.jsx)("div",{className:"content-container",children:Object(h.jsx)("div",{className:"login-form",children:Object(h.jsxs)("form",{onSubmit:function(e){return g.apply(this,arguments)},children:[Object(h.jsx)("input",{type:"email",placeholder:"Email",onChange:function(e){return c(e.target.value)},value:a}),Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"password",placeholder:"Password",onChange:function(e){return d(e.target.value)},value:l}),Object(h.jsx)("br",{}),Object(h.jsx)("button",{type:"submit",children:"log in"})]})})})};var w=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)(""),s=Object(o.a)(r,2),l=s[0],d=s[1],O=Object(n.useState)(""),p=Object(o.a)(O,2),x=p[0],f=p[1],g=Object(n.useContext)(m).getLoggedIn,v=Object(i.e)();function y(){return(y=Object(j.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,n={email:a,password:l,passwordVerify:x},e.next=5,b.a.post("https://react-forager.herokuapp.com/auth/",n);case 5:return e.next=7,g();case 7:v.push("/"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})))).apply(this,arguments)}return Object(h.jsx)("div",{className:"content-container",children:Object(h.jsx)("div",{className:"register-form",children:Object(h.jsxs)("form",{onSubmit:function(e){return y.apply(this,arguments)},children:[Object(h.jsx)("input",{type:"email",placeholder:"Email",autoComplete:"off",onChange:function(e){return c(e.target.value)},value:a}),Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"password",placeholder:"Password",autoComplete:"off",onChange:function(e){return d(e.target.value)},value:l}),Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"password",placeholder:"Verify your password",autoComplete:"off",onChange:function(e){return f(e.target.value)},value:x}),Object(h.jsx)("br",{}),Object(h.jsx)("button",{type:"submit",children:"Register"})]})})})},N=a.p+"static/media/tester.497426e2.svg",k=(a(161),function(){return Object(h.jsx)("div",{className:"content-container",children:Object(h.jsxs)("div",{className:"welcome",children:[Object(h.jsx)("img",{src:N,alt:"mushroom"}),Object(h.jsx)("p",{children:"i'm a pretty fungi"})]})})});a(102);var S=function(){var e=Object(n.useContext)(m).getLoggedIn,t=Object(n.useContext)(f).dispatch,a=Object(i.e)();function c(){return(c=Object(j.a)(u.a.mark((function n(){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,b.a.get("https://react-forager.herokuapp.com/auth/logout");case 2:return n.next=4,e();case 4:t({type:"logout"}),window.localStorage.setItem("user",null),a.push("/");case 7:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return Object(h.jsx)("button",{onClick:function(){return c.apply(this,arguments)},children:"log out"})};var C=function(){var e=Object(n.useContext)(m).loggedIn;return Object(h.jsxs)("div",{className:"nav-links",children:[!1===e&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(c.c,{to:"/login",children:"log in"}),Object(h.jsx)(c.c,{to:"/register",children:"register"})]}),!0===e&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(c.c,{to:"/gallery",children:"gallery"}),Object(h.jsx)(c.c,{to:"/map",children:"map"}),Object(h.jsx)(S,{})]})]})},I=a(43),L=a(296),E=a(298),T=a(131);a(278);function F(e){var t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],r=a[1],s=Object(n.useState)(""),i=Object(o.a)(s,2),l=i[0],d=i[1],b=Object(n.useState)(""),O=Object(o.a)(b,2),p=O[0],m=O[1],x=Object(n.useState)(""),g=Object(o.a)(x,2),v=g[0],y=g[1],w=Object(n.useState)(),N=Object(o.a)(w,2),k=N[0],S=N[1],C=Object(n.useState)(),I=Object(o.a)(C,2),L=I[0],F=I[1],_=Object(n.useState)(),z=Object(o.a)(_,2),J=z[0],M=z[1],P=Object(n.useState)(),R=Object(o.a)(P,2),W=R[0],B=R[1],D=Object(n.useState)(!0),G=Object(o.a)(D,2),H=G[0],U=G[1],A=Object(n.useContext)(f).state.user,V=function(){var t=Object(j.a)(u.a.mark((function t(a){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("https://react-forager.herokuapp.com/auth/upload",{method:"POST",body:JSON.stringify({data:a,user:A,name:W,commonNames:L,notes:J,identification:H}),headers:{"Content-Type":"application/json"}});case 3:r(""),d(""),e.loadImages(),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.error(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}();return Object(h.jsx)("div",{className:"image-upload",children:Object(h.jsx)(E.a,{onSubmit:function(e){if(e.preventDefault(),k){var t=new FileReader;t.readAsDataURL(k),t.onloadend=function(){V(t.result)},t.onerror=function(){console.error("oop")}}},className:"image-form",children:Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(E.a.Control,{id:"fileInput",type:"file",name:"image",onChange:function(e){var t=e.target.files[0];S(t),r(e.target.value)},value:c,className:"form-input"}),Object(h.jsx)(E.a.Control,{id:"name",type:"text",placeholder:"name that fungus",value:l,onChange:function(e){var t=e.target.value;t&&B(t),d(e.target.value)}}),Object(h.jsx)(E.a.Group,{className:"mb-3",controlId:"formBasicCheckbox",children:Object(h.jsx)(E.a.Check,{type:"checkbox",label:"uncertain/unknown",onChange:function(e){H||U(!0),H&&U(!1),console.log(H)}})}),Object(h.jsx)(E.a.Control,{id:"common",type:"text",placeholder:"common names",value:p,onChange:function(e){var t=e.target.value.split(",");t&&F(t),m(e.target.value)}}),Object(h.jsx)(E.a.Control,{id:"notes",type:"text",placeholder:"notes",value:v,onChange:function(e){var t=e.target.value;t&&M(t),y(e.target.value)}}),Object(h.jsx)("div",{className:"upload-button",children:Object(h.jsx)(T.a,{size:"sm",className:"image-submit",type:"submit",children:"upload"})})]})})})}a(280);var _=function(){var e=Object(n.useContext)(f),t=e.state,a=e.dispatch,r=Object(n.useState)(!0),s=Object(o.a)(r,2),i=s[0],l=s[1],d=Object(n.useState)([]),O=Object(o.a)(d,2),p=O[0],m=O[1],x=t.user,g=function(){var e=Object(j.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b()({url:"https://react-forager.herokuapp.com/auth/mine",params:{user:x}});case 2:t=e.sent,m(t.data),a({type:"fetchSuccess",payload:t.data});case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function v(){setTimeout(Object(j.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g();case 3:l(!1),e.next=10;break;case 6:return e.prev=6,e.t0=e.catch(0),e.next=10,t=e.t0,a({type:"fetchFail",payload:{error:t.message}});case 10:case"end":return e.stop()}var t}),e,null,[[0,6]])}))),0)}return Object(n.useEffect)((function(){v()}),[]),i?Object(h.jsx)("div",{className:"loading",children:"...loading"}):Object(h.jsx)(I.a,{cloudName:"fung-id",children:Object(h.jsx)("div",{className:"content-container",children:Object(h.jsxs)("div",{className:"gallery",children:[Object(h.jsx)("div",{className:"images",children:p.length?Object(h.jsx)("div",{className:"thumbnails-inner",children:p.reverse().map((function(e){return Object(h.jsx)("div",{className:"image-one",children:Object(h.jsx)(c.c,{to:"/detail/".concat(e._id),children:Object(h.jsx)(I.b,{src:e.thumbnail,latitude:e.latitude,longitude:e.longitude,tags:e.tags},e._id)})},e._id)}))},p.id):Object(h.jsx)("div",{className:"empty-gallery",children:Object(h.jsxs)("p",{children:[Object(h.jsx)("span",{role:"img","aria-label":"mushroom emoji",children:"\ud83c\udf44"}),Object(h.jsx)("span",{children:" insert some fungus among us--please and thank you "}),Object(h.jsx)("span",{role:"img","aria-label":"mushroom emoji",children:"\ud83c\udf44"})]})})}),Object(h.jsx)("div",{className:"image-upload-area",children:Object(h.jsxs)(L.a,{className:"image-upload-dropdown",children:[Object(h.jsx)(L.a.Toggle,{variant:"light",id:"dropdown-basic",children:Object(h.jsx)("span",{role:"img","aria-label":"mushroom emoji",children:"+\ud83c\udf44"})}),Object(h.jsx)(L.a.Menu,{children:Object(h.jsx)(F,{loadImages:v})})]})})]})})})},z=a(62),J=a(297),M=a(292);function P(e){var t=Object(n.useContext)(f).state,a=t.images._id,c=Object(n.useState)({}),r=Object(o.a)(c,2),s=r[0],i=r[1];console.log(t);var l=function(e,t){i(Object(x.a)(Object(x.a)({},s),{},Object(z.a)({},e,t)))};function d(){return(d=Object(j.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://react-forager.herokuapp.com/auth/edit",{method:"PUT",body:JSON.stringify({name:s.name,_id:a,commonNames:s.common,notes:s.notes}),headers:{"Content-Type":"application/json"}});case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0.message);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))).apply(this,arguments)}return Object(h.jsxs)(J.a,Object(x.a)(Object(x.a)({},e),{},{size:"md","aria-labelledby":"contained-modal-title",children:[Object(h.jsx)(J.a.Body,{children:Object(h.jsx)(M.a,{children:Object(h.jsx)(E.a,{children:Object(h.jsxs)(E.a.Group,{controlId:"form.Edit",children:[Object(h.jsx)(E.a.Label,{children:"species"}),Object(h.jsx)(E.a.Control,{type:"text",placeholder:"species, if known",onChange:function(e){return l("name",e.target.value)}}),Object(h.jsx)(E.a.Group,{className:"mb-3",controlId:"formBasicCheckbox"}),Object(h.jsxs)(E.a.Group,{controlId:"form.Common",children:[Object(h.jsx)(E.a.Label,{children:"common name(s)"}),Object(h.jsx)(E.a.Control,{type:"text",placeholder:"comma separated",onChange:function(e){return l("common",e.target.value)}})]}),Object(h.jsxs)(E.a.Group,{controlId:"form.Textarea",children:[Object(h.jsx)(E.a.Label,{children:"notes"}),Object(h.jsx)(E.a.Control,{as:"textarea",rows:3,placeholder:"notes",onChange:function(e){return l("notes",e.target.value)}})]})]})})})}),Object(h.jsx)(J.a.Footer,{children:Object(h.jsx)(T.a,{onClick:function(e){return d.apply(this,arguments)},children:"Save"})})]}))}var R=function(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("p",{onClick:function(){return c(!0)},children:"edit details"}),Object(h.jsx)(P,{show:a,onHide:function(){return c(!1)}})]})},W=a(293),B=a(299),D=a(294),G=a(295);a(282);var H=function(){var e=Object(n.useState)(!0),t=Object(o.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)(),s=Object(o.a)(r,2),i=s[0],l=s[1],u=Object(n.useState)(),j=Object(o.a)(u,2),d=j[0],b=j[1],O=Object(n.useState)(),p=Object(o.a)(O,2),m=p[0],x=p[1],g=Object(n.useState)(),v=Object(o.a)(g,2),y=(v[0],v[1]),w=Object(n.useContext)(f).state;return Object(n.useEffect)((function(){l(w.images.latitude),b(w.images.longitude),y(w.images.commonNames[0]),c(!1),x(w.images.latitude+","+w.images.longitude)}),[]),a?Object(h.jsx)("div",{children:"...loading"}):Object(h.jsx)("div",{className:"mapid",children:Object(h.jsxs)(W.a,{center:[i,d],zoom:17,scrollWheelZoom:!0,children:[Object(h.jsx)(B.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Object(h.jsx)(D.a,{position:[i,d],children:Object(h.jsx)(G.a,{children:Object(h.jsx)("a",{href:"https://www.google.com/maps?q=".concat(m),target:"_blank",rel:"noopener noreferrer",children:"directions"})})})]})})};a(283);var U=function(e){var t=Object(i.f)().id,a=Object(i.e)(),c=Object(n.useContext)(f),r=c.state,s=c.dispatch,l=Object(n.useState)([]),d=Object(o.a)(l,2),O=d[0],p=d[1],m=Object(n.useState)(!0),x=Object(o.a)(m,2),g=x[0],v=x[1],y=Object(n.useState)([]),w=Object(o.a)(y,2),N=w[0],k=w[1],S=Object(n.useState)(),C=Object(o.a)(S,2),E=(C[0],C[1]),T=Object(n.useState)(),F=Object(o.a)(T,2),_=F[0],z=F[1],J=t,M=function(){var e=Object(j.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b()({url:"https://react-forager.herokuapp.com/auth/detail",params:{_id:J}});case 2:t=e.sent,s({type:"fetchSuccess",payload:t.data[0]}),p(t.data[0].imageurl),a=t.data[0].created.split(":"),k(a[1]+"/"+a[2]+"/"+a[0]),E(t.data[0].latitude+", "+t.data[0].longitude),z(t.data[0].commonNames);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function P(){return(P=Object(j.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(J),e.prev=1,e.next=4,b()({method:"DELETE",url:"https://react-forager.herokuapp.com/auth/delete",params:{_id:J}}).then(a.push("/gallery"));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.error(e.t0.message);case 9:case 10:case"end":return e.stop()}}),e,null,[[1,6]])})))).apply(this,arguments)}return Object(n.useEffect)((function(){setTimeout(Object(j.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,M();case 3:v(!1),e.next=10;break;case 6:return e.prev=6,e.t0=e.catch(0),e.next=10,t=e.t0,s({type:"fetchFail",payload:{error:t.message}});case 10:case"end":return e.stop()}var t}),e,null,[[0,6]])}))),0)}),[]),g?Object(h.jsx)("div",{className:"loading-detail",children:"...loading"}):Object(h.jsx)(I.a,{children:Object(h.jsx)("div",{className:"content-container",children:Object(h.jsxs)("div",{className:"detail-container",children:[Object(h.jsxs)("div",{className:"top-row",children:[Object(h.jsxs)("div",{className:"details",children:[Object(h.jsx)("div",{className:"detail-title",children:Object(h.jsx)("li",{className:"tag-one",children:Object(h.jsx)("h5",{className:"image-title",children:r.images.name})})}),Object(h.jsx)("div",{className:"detail-thumbnail",children:Object(h.jsx)(I.b,{src:O,alt:O.alt})})]}),Object(h.jsxs)("div",{className:"notes",children:[Object(h.jsx)("div",{className:"edit-outer",children:Object(h.jsx)("div",{className:"edit",children:Object(h.jsxs)(L.a,{children:[Object(h.jsx)(L.a.Toggle,{variant:"light",id:"dropdown-basic",children:"\u2022\u2022\u2022"}),Object(h.jsxs)(L.a.Menu,{children:[Object(h.jsx)("div",{className:"edit-newmodal",children:Object(h.jsx)(R,{})}),Object(h.jsx)(L.a.Item,{children:Object(h.jsx)("p",{onClick:function(){return P.apply(this,arguments)},children:"delete this image from my collection"})})]})]})})}),Object(h.jsxs)("ul",{children:[Object(h.jsxs)("li",{children:[Object(h.jsx)("h5",{children:"found: "}),N]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("h5",{children:"species: "}),r.images.name]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("h5",{children:"aka: "}),_.length?Object(h.jsx)("div",{children:_.map((function(e,t){return Object(h.jsx)("div",{children:e},t)}))}):Object(h.jsx)("p",{})]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("h5",{children:"notes:"}),r.images.notes]})]})]})]}),Object(h.jsx)("div",{className:"detail-map",children:Object(h.jsx)(H,{})})]})})})},A=a(90);a(284);var V=function(e){var t,a=Object(n.useState)(!0),r=Object(o.a)(a,2),s=r[0],i=r[1],l=Object(n.useState)([]),d=Object(o.a)(l,2),O=d[0],p=d[1],m=Object(n.useState)([]),x=Object(o.a)(m,2),g=(x[0],x[1]),v=Object(n.useState)([]),y=Object(o.a)(v,2),w=(y[0],y[1]),N=Object(n.useState)([]),k=Object(o.a)(N,2),S=k[0],C=k[1],I=Object(n.useState)([]),L=Object(o.a)(I,2),E=L[0],F=L[1],_=Object(n.useState)(""),z=Object(o.a)(_,2),J=z[0],M=z[1],P=Object(n.useState)("name"),R=Object(o.a)(P,2),H=R[0],U=R[1],V=Object(n.useContext)(f),Z=V.state,q=V.dispatch,$=Z.user,K=Object(A.a)(new Set(O.map((function(e){return e.name})))),Q=Object(A.a)(new Set(O.map((function(e){return e.commonNames[0]})))),X=function(){var e=Object(j.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b()({url:"https://react-forager.herokuapp.com/auth/mine",params:{user:$}});case 2:t=e.sent,q({type:"fetchSuccess",payload:t.data}),p(t.data),C(t.data),g(K),F([t.data[0].latitude,t.data[0].longitude]),M(15);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function Y(e){return ee.apply(this,arguments)}function ee(){return(ee=Object(j.a)(u.a.mark((function e(t){var a,n,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"name"===H&&(a=t.target.innerHTML,n=null),"common"===H&&(a=null,n=t.target.innerHTML,console.log(n)),e.next=6,b()({url:"https://react-forager.herokuapp.com/auth/locate",params:{user:$,name:a,commonNames:n}});case 6:c=e.sent,console.log(c.data),console.log(O),C(c.data),g(K),w(Q),F([c.data[0].latitude,c.data[0].longitude]);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return t="name"===H?K.map((function(e,t){return 0===K.length?Object(h.jsx)("div",{children:"..."}):void 0===e?null:Object(h.jsx)("div",{children:Object(h.jsx)("li",{onClick:Y,children:e})},t)})):Q.map((function(e,t){return 0===Q.length?Object(h.jsx)("div",{children:"..."}):Object(h.jsx)("div",{children:Object(h.jsx)("li",{onClick:Y,children:e})},t)})),Object(n.useEffect)((function(){setTimeout(Object(j.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,X();case 3:i(!1),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])}))),0)}),[]),s?Object(h.jsx)("div",{children:"...loading"}):Object(h.jsx)("div",{className:"content-container",children:Object(h.jsxs)("div",{className:"large-map-view",children:[Object(h.jsxs)("div",{className:"all-tags",children:[Object(h.jsx)("h4",{children:"tags"}),Object(h.jsxs)("div",{className:"tags-div",children:[Object(h.jsx)("div",{className:"sort-button",children:Object(h.jsx)(T.a,{size:"sm",onClick:function(){"name"===H&&U("common"),"common"===H&&U("name")},children:"toggle sort"})}),t]}),Object(h.jsx)("div",{className:"clear-selection",children:Object(h.jsx)("li",{onClick:function(){C(O),F([O[0].latitude,O[0].longitude])},children:"clear selection"})})]}),Object(h.jsx)("div",{className:"mapid",children:Object(h.jsx)("div",{className:"leaflet-container-large",children:Object(h.jsxs)(W.a,{className:"map-container",center:E,zoom:J,scrollWheelZoom:!0,children:[Object(h.jsx)(B.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),S.map((function(e,t){return Object(h.jsx)(D.a,{position:[e.latitude,e.longitude],children:Object(h.jsxs)(G.a,{children:[Object(h.jsx)("img",{src:e.thumbnail,style:{width:300,borderRadius:10},alt:e.alt}),Object(h.jsx)(c.c,{to:"/detail/".concat(e._id),children:Object(h.jsx)("p",{className:"popup-text",children:e.name||e.commonNames[0]})})]})},t)}))]},JSON.stringify(E))})})]})})};var Z=function(){var e=Object(n.useContext)(m).loggedIn;return Object(h.jsxs)(c.b,{children:[Object(h.jsx)(C,{}),Object(h.jsx)(i.a,{exact:!0,path:"/",children:Object(h.jsx)(k,{})}),!1===e&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(i.a,{exact:!0,path:"/register",children:Object(h.jsx)(w,{})}),Object(h.jsx)(i.a,{exact:!0,path:"/login",children:Object(h.jsx)(y,{})})]}),!0===e&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(i.a,{exact:!0,path:"/gallery",children:Object(h.jsx)(_,{})}),Object(h.jsx)(i.a,{exact:!0,path:"/detail/:id",children:Object(h.jsx)(U,{})}),Object(h.jsx)(i.a,{exact:!0,path:"/map",children:Object(h.jsx)(V,{})})]})]})};b.a.defaults.withCredentials=!0;var q=function(){var e=Object(n.useReducer)(v,g),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){c({type:"login",payload:JSON.parse(window.localStorage.getItem("user"))})}),[]),Object(h.jsx)(f.Provider,{value:{state:a,dispatch:c},children:Object(h.jsx)(p,{children:Object(h.jsx)(Z,{})})})},$=(a(285),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function K(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}a(286);s.a.render(Object(h.jsx)(c.a,{children:Object(h.jsx)(q,{})}),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("","/service-worker.js");$?function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):K(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):K(e)}))}}()}},[[287,1,2]]]);
//# sourceMappingURL=main.35333ba3.chunk.js.map