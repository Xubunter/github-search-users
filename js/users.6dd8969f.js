(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["users"],{"00b4":function(e,t,r){"use strict";r("ac1f");var n=r("23e7"),a=r("da84"),i=r("c65b"),s=r("e330"),o=r("1626"),c=r("861d"),u=function(){var e=!1,t=/[ac]/;return t.exec=function(){return e=!0,/./.exec.apply(this,arguments)},!0===t.test("abc")&&e}(),l=a.Error,f=s(/./.test);n({target:"RegExp",proto:!0,forced:!u},{test:function(e){var t=this.exec;if(!o(t))return f(this,e);var r=i(t,this,e);if(null!==r&&!c(r))throw new l("RegExp exec method returned something other than an Object or null");return!!r}})},"06c5":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));r("fb6a"),r("d3b7"),r("b0c0"),r("a630"),r("3ca3"),r("ac1f"),r("00b4");var n=r("6b75");function a(e,t){if(e){if("string"===typeof e)return Object(n["a"])(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n["a"])(e,t):void 0}}},"06ce":function(e,t,r){"use strict";r("102a")},"102a":function(e,t,r){},"107c":function(e,t,r){var n=r("d039"),a=r("da84"),i=a.RegExp;e.exports=n((function(){var e=i("(?<a>b)","g");return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},1368:function(e,t,r){},"243f":function(e,t,r){"use strict";r("cdf3")},2532:function(e,t,r){"use strict";var n=r("23e7"),a=r("e330"),i=r("5a34"),s=r("1d80"),o=r("577e"),c=r("ab13"),u=a("".indexOf);n({target:"String",proto:!0,forced:!c("includes")},{includes:function(e){return!!~u(o(s(this)),o(i(e)),arguments.length>1?arguments[1]:void 0)}})},2659:function(e,t,r){"use strict";r("eda9")},2909:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r("6b75");function a(e){if(Array.isArray(e))return Object(n["a"])(e)}r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0"),r("a630");function i(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}var s=r("06c5");r("d9e2");function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e){return a(e)||i(e)||Object(s["a"])(e)||o()}},"408a":function(e,t,r){var n=r("e330");e.exports=n(1..valueOf)},"44e7":function(e,t,r){var n=r("861d"),a=r("c6b6"),i=r("b622"),s=i("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[s])?!!t:"RegExp"==a(e))}},"4a39":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page-user-profile"},[e.user?r("div",{staticClass:"page-user-profile__info"},[r("vs-avatar",{staticClass:"page-user-profile__avatar"},[r("img",{attrs:{src:e.user.avatar_url,alt:""}})]),r("h1",{staticClass:"page-user-profile__login"},[e._v("@"+e._s(e.user.login))]),e.user.name?r("h2",{staticClass:"page-user-profile__name"},[e._v(" "+e._s(e.user.name)+" ")]):e._e()],1):e._e(),r("Spinner",{directives:[{name:"show",rawName:"v-show",value:e.loadingUser,expression:"loadingUser"}]}),r("infinity-scroll",{attrs:{page:e.repositories.length+e.repositoriesParams.page},on:{next:e.getNextRepositoriesPage}},[r("div",{staticClass:"page-user-profile__repositories-header"},[r("h2",{staticClass:"page-user-profile__repositories-title"},[e._v("Repositories:")]),r("vs-select",{on:{input:function(t){return e.getRepositoriesPage()}},model:{value:e.repositoriesParams.sort,callback:function(t){e.$set(e.repositoriesParams,"sort",t)},expression:"repositoriesParams.sort"}},e._l(e.sortVariants,(function(t,n){return r("vs-option",{key:n,attrs:{label:t,value:n}},[e._v(" "+e._s(t)+" ")])})),1)],1),r("div",{staticClass:"page-user-profile__repositories"},[e._l(e.repositories,(function(e){return r("repository-item",{key:e.name,attrs:{name:e.name,description:e.description,html_url:e.html_url}})})),r("Spinner",{directives:[{name:"show",rawName:"v-show",value:e.loadingRepositories,expression:"loadingRepositories"}]})],2)])],1)},a=[],i=r("2909"),s=r("5530"),o=r("1da1"),c=(r("96cf"),r("d81d"),r("d3b7"),r("caad"),r("2532"),r("99af"),r("2b0e")),u=r("6dc0"),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"repository-item"},[r("h3",{staticClass:"repository-item__name"},[e._v(e._s(e.name))]),r("p",{staticClass:"repository-item__description"},[e._v(e._s(e.description))]),r("div",{staticClass:"repository-item__link"},[r("a",{attrs:{href:e.html_url,target:"__blank"}},[r("vs-button",{staticClass:"repository-item__link",attrs:{icon:"",shadow:""}},[r("box-icon",{attrs:{name:"link-external"}})],1)],1)])])},f=[],d=c["default"].extend({name:"RepositoryItem",components:{},props:{name:String,html_url:String,description:String},data:function(){return{}}}),p=d,g=(r("2659"),r("2877")),v=Object(g["a"])(p,l,f,!1,null,"071b590a",null),b=v.exports,m=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"spinner"})},h=[],x=c["default"].extend({name:"Spinner",components:{},mounted:function(){this.$vs.loading({target:this.$el,type:"scale"})}}),y=x,_=(r("cf38"),Object(g["a"])(y,m,h,!1,null,"037b970c",null)),O=_.exports,w=r("c31b"),j=r("4f24"),S=r("5b86"),R=r("5c7f");function I(e){return w["a"].get("users/".concat(e),{headers:{Accept:"application/vnd.github.v3+json"}}).then((function(e){return j["b"].guard(e.data)?Object(R["b"])(e.data):Object(R["a"])(new S["f"]({message:"Ошибка валидации"}))})).catch((function(e){return"404"===e.code?Object(R["a"])(new S["d"]):(console.error(e),Object(R["a"])(new S["e"]))}))}var E=r("4a5d"),N=Object(E["Record"])({id:E["Number"],name:E["String"],full_name:E["String"],html_url:E["String"],description:E["String"].nullable()});function A(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return w["a"].get("users/".concat(e,"/repos"),{headers:{Accept:"application/vnd.github.v3+json"},params:t}).then((function(e){return console.log(e),Object(E["Array"])(N).guard(e.data)?Object(R["b"])(e.data):Object(R["a"])(new S["f"]({message:"Ошибка валидации"}))})).catch((function(e){return console.error(e),Object(R["a"])(new S["e"])}))}var C=r("ccb7");function k(){return{page:0,sort:"full_name"}}var P=c["default"].extend({name:"UserProfilePage",components:{InfinityScroll:u["a"],RepositoryItem:b,Spinner:O},props:{username:String},data:function(){return{user:null,repositories:[],repositoriesParams:k(),loadingUser:!1,loadingRepositories:!1,sortVariants:{full_name:"Full name",created:"Created",updated:"Updated",pushed:"Pushed"}}},mounted:function(){this.getUser(),this.getRepositoriesPage()},methods:{filterNonUniqueRepositories:function(e){var t=this.repositories.map((function(e){return e.id}));return e.reduce((function(e,r){return t.includes(r.id)||e.push(r),e}),[])},getUser:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loadingUser=!0,t.next=3,I(e.username);case 3:r=t.sent,e.loadingUser=!1,r.isRight()&&(n=r.value,e.user=Object(s["a"])({},n));case 6:case"end":return t.stop()}}),t)})))()},getRepositoriesPage:function(){var e=arguments,t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a,o,c,u,l;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=e.length>0&&void 0!==e[0]?e[0]:1,a=Object(s["a"])({},t.repositoriesParams),o=1===n,t.loadingRepositories=!0,o&&(t.repositories=[]),r.next=7,A(t.username,Object(s["a"])({},a));case 7:if(c=r.sent,t.loadingRepositories=!1,!c.isRight()){r.next=16;break}if(u=c.value,0!==u.length){r.next=13;break}return r.abrupt("return");case 13:return t.repositoriesParams.page=n,t.repositories=o?Object(i["a"])(u):[].concat(Object(i["a"])(t.repositories),Object(i["a"])(t.filterNonUniqueRepositories(u))),r.abrupt("return");case 16:l=c.value,l instanceof S["f"]?C["a"].error({title:"Что-то пошло не так"}):l instanceof S["e"]?C["a"].error({title:"Что-то пошло совсем не так"}):Object(S["g"])(l);case 18:case"end":return r.stop()}}),r)})))()},getNextRepositoriesPage:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",e.getRepositoriesPage(e.repositoriesParams.page+1));case 1:case"end":return t.stop()}}),t)})))()}}}),U=P,$=(r("80da"),Object(g["a"])(U,n,a,!1,null,"2359130c",null));t["default"]=$.exports},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var n=r("e330"),a=r("1d80"),i=r("577e"),s=r("5899"),o=n("".replace),c="["+s+"]",u=RegExp("^"+c+c+"*"),l=RegExp(c+c+"*$"),f=function(e){return function(t){var r=i(a(t));return 1&e&&(r=o(r,u,"")),2&e&&(r=o(r,l,"")),r}};e.exports={start:f(1),end:f(2),trim:f(3)}},"5a34":function(e,t,r){var n=r("da84"),a=r("44e7"),i=n.TypeError;e.exports=function(e){if(a(e))throw i("The method doesn't accept regular expressions");return e}},"6b75":function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},"6dc0":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{ref:"container",staticClass:"infinity-scroll"},[e._t("default"),r("div",{ref:"container",staticClass:"infinity-scroll__target"},[r("Observer",{key:e.page,staticStyle:{height:"100%"},on:{intersect:e.onIntersect}})],1)],2)},a=[],i=(r("a9e3"),r("2b0e")),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"observer"})},o=[];function c(e){if(Array.isArray(e))return e}r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0");function u(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,i=[],s=!0,o=!1;try{for(r=r.call(e);!(s=(n=r.next()).done);s=!0)if(i.push(n.value),t&&i.length===t)break}catch(c){o=!0,a=c}finally{try{s||null==r["return"]||r["return"]()}finally{if(o)throw a}}return i}}var l=r("06c5");r("d9e2");function f(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e,t){return c(e)||u(e,t)||Object(l["a"])(e,t)||f()}var p=i["default"].extend({name:"Observer",components:{},data:function(){return{observer:null}},mounted:function(){var e=this,t={};this.observer=new IntersectionObserver((function(t){var r=d(t,1),n=r[0];n&&n.isIntersecting&&e.$emit("intersect")}),t),this.observer.observe(this.$el)}}),g=p,v=r("2877"),b=Object(v["a"])(g,s,o,!1,null,null,null),m=b.exports,h=i["default"].extend({name:"InfinityScroll",components:{Observer:m},props:{page:{type:Number,default:-1}},methods:{onIntersect:function(){this.$emit("next")}}}),x=h,y=(r("06ce"),Object(v["a"])(x,n,a,!1,null,"83c75eb0",null));t["a"]=y.exports},"80da":function(e,t,r){"use strict";r("1368")},"86f5":function(e,t,r){},9263:function(e,t,r){"use strict";var n=r("c65b"),a=r("e330"),i=r("577e"),s=r("ad6d"),o=r("9f7f"),c=r("5692"),u=r("7c73"),l=r("69f3").get,f=r("fce3"),d=r("107c"),p=c("native-string-replace",String.prototype.replace),g=RegExp.prototype.exec,v=g,b=a("".charAt),m=a("".indexOf),h=a("".replace),x=a("".slice),y=function(){var e=/a/,t=/b*/g;return n(g,e,"a"),n(g,t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),_=o.BROKEN_CARET,O=void 0!==/()??/.exec("")[1],w=y||O||_||f||d;w&&(v=function(e){var t,r,a,o,c,f,d,w=this,j=l(w),S=i(e),R=j.raw;if(R)return R.lastIndex=w.lastIndex,t=n(v,R,S),w.lastIndex=R.lastIndex,t;var I=j.groups,E=_&&w.sticky,N=n(s,w),A=w.source,C=0,k=S;if(E&&(N=h(N,"y",""),-1===m(N,"g")&&(N+="g"),k=x(S,w.lastIndex),w.lastIndex>0&&(!w.multiline||w.multiline&&"\n"!==b(S,w.lastIndex-1))&&(A="(?: "+A+")",k=" "+k,C++),r=new RegExp("^(?:"+A+")",N)),O&&(r=new RegExp("^"+A+"$(?!\\s)",N)),y&&(a=w.lastIndex),o=n(g,E?r:w,k),E?o?(o.input=x(o.input,C),o[0]=x(o[0],C),o.index=w.lastIndex,w.lastIndex+=o[0].length):w.lastIndex=0:y&&o&&(w.lastIndex=w.global?o.index+o[0].length:a),O&&o&&o.length>1&&n(p,o[0],r,(function(){for(c=1;c<arguments.length-2;c++)void 0===arguments[c]&&(o[c]=void 0)})),o&&I)for(o.groups=f=u(null),c=0;c<I.length;c++)d=I[c],f[d[0]]=o[d[1]];return o}),e.exports=v},"99af":function(e,t,r){"use strict";var n=r("23e7"),a=r("da84"),i=r("d039"),s=r("e8b5"),o=r("861d"),c=r("7b0b"),u=r("07fa"),l=r("8418"),f=r("65f0"),d=r("1dde"),p=r("b622"),g=r("2d00"),v=p("isConcatSpreadable"),b=9007199254740991,m="Maximum allowed index exceeded",h=a.TypeError,x=g>=51||!i((function(){var e=[];return e[v]=!1,e.concat()[0]!==e})),y=d("concat"),_=function(e){if(!o(e))return!1;var t=e[v];return void 0!==t?!!t:s(e)},O=!x||!y;n({target:"Array",proto:!0,arity:1,forced:O},{concat:function(e){var t,r,n,a,i,s=c(this),o=f(s,0),d=0;for(t=-1,n=arguments.length;t<n;t++)if(i=-1===t?s:arguments[t],_(i)){if(a=u(i),d+a>b)throw h(m);for(r=0;r<a;r++,d++)r in i&&l(o,d,i[r])}else{if(d>=b)throw h(m);l(o,d++,i)}return o.length=d,o}})},"9f7f":function(e,t,r){var n=r("d039"),a=r("da84"),i=a.RegExp,s=n((function(){var e=i("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),o=s||n((function(){return!i("a","y").sticky})),c=s||n((function(){var e=i("^r","gy");return e.lastIndex=2,null!=e.exec("str")}));e.exports={BROKEN_CARET:c,MISSED_STICKY:o,UNSUPPORTED_Y:s}},a630:function(e,t,r){var n=r("23e7"),a=r("4df4"),i=r("1c7e"),s=!i((function(e){Array.from(e)}));n({target:"Array",stat:!0,forced:s},{from:a})},a9e3:function(e,t,r){"use strict";var n=r("83ab"),a=r("da84"),i=r("e330"),s=r("94ca"),o=r("cb2d"),c=r("1a2d"),u=r("7156"),l=r("3a9b"),f=r("d9b5"),d=r("c04e"),p=r("d039"),g=r("241c").f,v=r("06cf").f,b=r("9bf2").f,m=r("408a"),h=r("58a8").trim,x="Number",y=a[x],_=y.prototype,O=a.TypeError,w=i("".slice),j=i("".charCodeAt),S=function(e){var t=d(e,"number");return"bigint"==typeof t?t:R(t)},R=function(e){var t,r,n,a,i,s,o,c,u=d(e,"number");if(f(u))throw O("Cannot convert a Symbol value to a number");if("string"==typeof u&&u.length>2)if(u=h(u),t=j(u,0),43===t||45===t){if(r=j(u,2),88===r||120===r)return NaN}else if(48===t){switch(j(u,1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+u}for(i=w(u,2),s=i.length,o=0;o<s;o++)if(c=j(i,o),c<48||c>a)return NaN;return parseInt(i,n)}return+u};if(s(x,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var I,E=function(e){var t=arguments.length<1?0:y(S(e)),r=this;return l(_,r)&&p((function(){m(r)}))?u(Object(t),r,E):t},N=n?g(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),A=0;N.length>A;A++)c(y,I=N[A])&&!c(E,I)&&b(E,I,v(y,I));E.prototype=_,_.constructor=E,o(a,x,E,{constructor:!0})}},ab13:function(e,t,r){var n=r("b622"),a=n("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(r){try{return t[a]=!1,"/./"[e](t)}catch(n){}}return!1}},ac1f:function(e,t,r){"use strict";var n=r("23e7"),a=r("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ac80:function(e,t,r){"use strict";r("86f5")},ad6d:function(e,t,r){"use strict";var n=r("825a");e.exports=function(){var e=n(this),t="";return e.hasIndices&&(t+="d"),e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},b0c0:function(e,t,r){var n=r("83ab"),a=r("5e77").EXISTS,i=r("e330"),s=r("9bf2").f,o=Function.prototype,c=i(o.toString),u=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,l=i(u.exec),f="name";n&&!a&&s(o,f,{configurable:!0,get:function(){try{return l(u,c(this))[1]}catch(e){return""}}})},caad:function(e,t,r){"use strict";var n=r("23e7"),a=r("4d64").includes,i=r("d039"),s=r("44d2"),o=i((function(){return!Array(1).includes()}));n({target:"Array",proto:!0,forced:o},{includes:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),s("includes")},cdf3:function(e,t,r){},cf38:function(e,t,r){"use strict";r("dca2")},d28b:function(e,t,r){var n=r("746f");n("iterator")},d81d:function(e,t,r){"use strict";var n=r("23e7"),a=r("b727").map,i=r("1dde"),s=i("map");n({target:"Array",proto:!0,forced:!s},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},dca2:function(e,t,r){},e01a:function(e,t,r){"use strict";var n=r("23e7"),a=r("83ab"),i=r("da84"),s=r("e330"),o=r("1a2d"),c=r("1626"),u=r("3a9b"),l=r("577e"),f=r("9bf2").f,d=r("e893"),p=i.Symbol,g=p&&p.prototype;if(a&&c(p)&&(!("description"in g)||void 0!==p().description)){var v={},b=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:l(arguments[0]),t=u(g,this)?new p(e):void 0===e?p():p(e);return""===e&&(v[t]=!0),t};d(b,p),b.prototype=g,g.constructor=b;var m="Symbol(test)"==String(p("test")),h=s(g.toString),x=s(g.valueOf),y=/^Symbol\((.*)\)[^)]+$/,_=s("".replace),O=s("".slice);f(g,"description",{configurable:!0,get:function(){var e=x(this),t=h(e);if(o(v,e))return"";var r=m?O(t,7,-1):_(t,y,"$1");return""===r?void 0:r}}),n({global:!0,constructor:!0,forced:!0},{Symbol:b})}},ed81:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page-users"},[r("div",{staticClass:"page-users__header"},[r("vs-input",{staticClass:"page-users__search",attrs:{placeholder:"User name"},on:{input:e.onSearch},scopedSlots:e._u([{key:"icon",fn:function(){return[r("box-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.params.name,callback:function(t){e.$set(e.params,"name",t)},expression:"params.name"}}),r("div",{staticClass:"page-users__search"})],1),r("infinity-scroll",{attrs:{page:e.users.length},on:{next:e.getNextPage}},[r("div",{staticClass:"page-users__list"},[e.loading||0!==e.users.length?e._e():r("h3",{staticClass:"page-users__list-empry-message"},[e._v(" Ничего не найдено ")]),e._l(e.users,(function(e){return r("router-link",{key:e.id,staticClass:"page-users__user-link",attrs:{to:{name:"user-profile",params:{username:e.login}}}},[r("user-search-item",{staticClass:"page-users__user",attrs:{avatar:e.avatar_url,login:e.login}})],1)}))],2),r("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],ref:"loading",staticClass:"page-users__loading"})])],1)},a=[],i=r("2909"),s=r("5530"),o=r("1da1"),c=(r("96cf"),r("d81d"),r("d3b7"),r("caad"),r("2532"),r("99af"),r("2b0e")),u=(r("b0c0"),r("c31b")),l=r("4f24"),f=r("5b86"),d=r("4a5d"),p=r("5c7f"),g=Object(d["Record"])({incomplete_results:d["Boolean"],items:Object(d["Array"])(l["a"]),total_count:d["Number"]});function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t="".concat(e.name||""," in:login type:user");return u["a"].get("search/users",{params:Object(s["a"])({q:t},e),headers:{Accept:"application/vnd.github.v3+json"}}).then((function(e){return g.guard(e.data)?Object(p["b"])(e.data):Object(p["a"])(new f["f"]({message:"Ошибка валидации"}))})).catch((function(e){return"ERR_BAD_REQUEST"===e.code?Object(p["a"])(new f["c"]):(console.error(e),Object(p["a"])(new f["e"]))}))}var b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"user-search-item"},[r("vs-avatar",{staticClass:"user-search-item__avatar"},[r("img",{attrs:{src:e.avatar,alt:""}})]),r("div",{staticClass:"user-search-item__login"},[e._v(e._s(e.login))])],1)},m=[],h=c["default"].extend({name:"UserSearchItem",components:{},props:{avatar:String,login:String},data:function(){return{}}}),x=h,y=(r("243f"),r("2877")),_=Object(y["a"])(x,b,m,!1,null,"6e13a60a",null),O=_.exports,w=r("6dc0"),j=r("ccb7");r("e9c4");function S(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.every((function(e){return JSON.stringify(e)===JSON.stringify(t[0])}))}var R=function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(){for(var n=this,a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];clearTimeout(t),t=setTimeout((function(){return e.apply(n,i)}),r)}};function I(){return{page:0,name:""}}var E=c["default"].extend({name:"UsersPage",components:{UserSearchItem:O,InfinityScroll:w["a"]},data:function(){return{users:[],loading:!1,totalUsers:0,params:I(),retry:{attempt:0,params:I()}}},computed:{hasNextPage:function(){return Boolean(this.totalUsers>this.users.length)}},methods:{onSearch:R((function(){this.getFirstPage()}),300),filterNonUniqueUsers:function(e){var t=this.users.map((function(e){return e.id}));return e.reduce((function(e,r){return t.includes(r.id)||e.push(r),e}),[])},getFirstPage:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a,o,c,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=Object(s["a"])({},e.params),n=I().page+1,e.users=[],e.loading=!0,t.next=6,v(Object(s["a"])(Object(s["a"])({},r),{},{page:n}));case 6:if(a=t.sent,e.loading=!1,o=S(r,e.params),o){t.next=11;break}return t.abrupt("return");case 11:if(!a.isRight()){t.next=17;break}return e.params.page=n,e.totalUsers=a.value.total_count,c=a.value.items,e.users=Object(i["a"])(c),t.abrupt("return");case 17:u=a.value,u instanceof f["c"]?(e.loading=!0,e.retryRequest(u.wait,r,e.getFirstPage,(function(e){null!==e?j["a"].error({title:"Превышен лимит запросов",text:"".concat(e,"-я попытка повторить запрос")}):j["a"].error({title:"Не удалось получить ответ от сервера, попробуйте позже"})}))):u instanceof f["f"]?j["a"].error({title:"Что-то пошло не так"}):u instanceof f["e"]?j["a"].error({title:"Что-то пошло совсем не так"}):Object(f["g"])(u);case 19:case"end":return t.stop()}}),t)})))()},getNextPage:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a,o,c,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.params.page!==I().page){t.next=2;break}return t.abrupt("return");case 2:if(!e.loading){t.next=4;break}return t.abrupt("return");case 4:if(e.hasNextPage){t.next=6;break}return t.abrupt("return");case 6:return r=Object(s["a"])({},e.params),n=r.page+1,e.loading=!0,t.next=11,v(Object(s["a"])(Object(s["a"])({},r),{},{page:n}));case 11:if(a=t.sent,e.loading=!1,o=S(r,e.params),o){t.next=16;break}return t.abrupt("return");case 16:if(!a.isRight()){t.next=21;break}return e.params.page=n,c=a.value.items,e.users=[].concat(Object(i["a"])(e.users),Object(i["a"])(e.filterNonUniqueUsers(c))),t.abrupt("return");case 21:u=a.value,u instanceof f["c"]?(e.loading=!0,e.retryRequest(u.wait,r,e.getNextPage,(function(e){null===e?j["a"].error({title:"Не удалось получить ответ от сервера, попробуйте позже"}):j["a"].error({title:"Превышен лимит запросов",text:"".concat(e,"-я попытка повторить запрос")})}))):u instanceof f["f"]?j["a"].error({title:"Что-то пошло не так"}):u instanceof f["e"]?j["a"].error({title:"Что-то пошло совсем не так"}):Object(f["g"])(u);case 23:case"end":return t.stop()}}),t)})))()},retryRequest:function(e,t,r,n){var a=this,i=5;if(t=Object(s["a"])({},t),this.retry.attempt>=i)return this.retry.attempt=0,n&&n(null),this.loading=!1,Promise.resolve();var o=!S(t,this.retry.params);return o&&(this.retry.params=Object(s["a"])({},t),this.retry.attempt=0),this.retry.attempt++,n&&n(this.retry.attempt),new Promise((function(t){return setTimeout(t,e)})).then((function(){var e=S(t,a.params);e&&(a.loading=!1,r())}))},initLoadingElement:function(){var e=this.$refs.loading;this.$vs.loading({target:e,type:"scale"})}},mounted:function(){this.getFirstPage(),this.initLoadingElement()}}),N=E,A=(r("ac80"),Object(y["a"])(N,n,a,!1,null,"db9ebdb6",null));t["default"]=A.exports},eda9:function(e,t,r){},fb6a:function(e,t,r){"use strict";var n=r("23e7"),a=r("da84"),i=r("e8b5"),s=r("68ee"),o=r("861d"),c=r("23cb"),u=r("07fa"),l=r("fc6a"),f=r("8418"),d=r("b622"),p=r("1dde"),g=r("f36a"),v=p("slice"),b=d("species"),m=a.Array,h=Math.max;n({target:"Array",proto:!0,forced:!v},{slice:function(e,t){var r,n,a,d=l(this),p=u(d),v=c(e,p),x=c(void 0===t?p:t,p);if(i(d)&&(r=d.constructor,s(r)&&(r===m||i(r.prototype))?r=void 0:o(r)&&(r=r[b],null===r&&(r=void 0)),r===m||void 0===r))return g(d,v,x);for(n=new(void 0===r?m:r)(h(x-v,0)),a=0;v<x;v++,a++)v in d&&f(n,a,d[v]);return n.length=a,n}})},fce3:function(e,t,r){var n=r("d039"),a=r("da84"),i=a.RegExp;e.exports=n((function(){var e=i(".","s");return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))}}]);
//# sourceMappingURL=users.6dd8969f.js.map