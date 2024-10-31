var L=globalThis?.document,_={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta",219:"219"},m={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},C={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},A={option:"alt",command:"meta",return:"enter",escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},k;for(p=1;p<20;++p)_[111+p]="f"+p;var p;for(p=0;p<=9;++p)_[p+96]=p.toString();function K(e,r,a){if(e.addEventListener){e.addEventListener(r,a,!1);return}e.attachEvent("on"+r,a)}function q(e){if(e.type=="keypress"){var r=String.fromCharCode(e.which);return e.shiftKey||(r=r.toLowerCase()),r}return _[e.which]?_[e.which]:m[e.which]?m[e.which]:String.fromCharCode(e.which).toLowerCase()}function R(e,r){return e.sort().join(",")===r.sort().join(",")}function B(e){var r=[];return e.shiftKey&&r.push("shift"),e.altKey&&r.push("alt"),e.ctrlKey&&r.push("ctrl"),e.metaKey&&r.push("meta"),r}function F(e){if(e.preventDefault){e.preventDefault();return}e.returnValue=!1}function U(e){if(e.stopPropagation){e.stopPropagation();return}e.cancelBubble=!0}function P(e){return e=="shift"||e=="ctrl"||e=="alt"||e=="meta"}function V(){if(!k){k={};for(var e in _)e>95&&e<112||_.hasOwnProperty(e)&&(k[_[e]]=e)}return k}function H(e,r,a){return a||(a=V()[e]?"keydown":"keypress"),a=="keypress"&&r.length&&(a="keydown"),a}function X(e){return e==="+"?["+"]:(e=e.replace(/\+{2}/g,"+plus"),e.split("+"))}function x(e,r){var a,u,c,y=[];for(a=X(e),c=0;c<a.length;++c)u=a[c],A[u]&&(u=A[u]),r&&r!="keypress"&&C[u]&&(u=C[u],y.push("shift")),P(u)&&y.push(u);return r=H(u,y,r),{key:u,modifiers:y,action:r}}function d(e){var r=this;if(e=e||L,!(r instanceof d))return new d(e);r.target=e,r._callbacks={},r._directMap={};var a={},u,c=!1,y=!1,w=!1;function S(t){t=t||{};var i=!1,s;for(s in a){if(t[s]){i=!0;continue}a[s]=0}i||(w=!1)}function E(t,i,s,n,o,v){var f,l,g=[],h=s.type;if(!r._callbacks[t])return[];for(h=="keyup"&&P(t)&&(i=[t]),f=0;f<r._callbacks[t].length;++f)if(l=r._callbacks[t][f],!(!n&&l.seq&&a[l.seq]!=l.level)&&h==l.action&&(h=="keypress"&&!s.metaKey&&!s.ctrlKey||R(i,l.modifiers))){var O=!n&&l.combo==o,N=n&&l.seq==n&&l.level==v;(O||N)&&r._callbacks[t].splice(f,1),g.push(l)}return g}function b(t,i,s,n){r.stopCallback(i,i.target||i.srcElement,s,n)||t(i,s)===!1&&(F(i),U(i))}r._handleKey=function(t,i,s){var n=E(t,i,s),o,v={},f=0,l=!1;for(o=0;o<n.length;++o)n[o].seq&&(f=Math.max(f,n[o].level));for(o=0;o<n.length;++o){if(n[o].seq){if(n[o].level!=f)continue;l=!0,v[n[o].seq]=1,b(n[o].callback,s,n[o].combo,n[o].seq);continue}l||b(n[o].callback,s,n[o].combo)}var g=s.type=="keypress"&&y;s.type==w&&!P(t)&&!g&&S(v),y=l&&s.type=="keydown"};function M(t){typeof t.which!="number"&&(t.which=t.keyCode);var i=q(t);if(i){if(t.type=="keyup"&&c===i){c=!1;return}r.handleKey(i,B(t),t)}}function D(){clearTimeout(u),u=setTimeout(S,1e3)}function I(t,i,s,n){a[t]=0;function o(h){return function(){w=h,++a[t],D()}}function v(h){b(s,h,t),n!=="keyup"&&(c=q(h)),setTimeout(S,10)}for(var f=0;f<i.length;++f){var l=f+1===i.length,g=l?v:o(n||x(i[f+1]).action);T(i[f],g,n,t,f)}}function T(t,i,s,n,o){r._directMap[t+":"+s]=i,t=t.replace(/\s+/g," ");var v=t.split(" "),f;if(v.length>1){I(t,v,i,s);return}f=x(t,s),r._callbacks[f.key]=r._callbacks[f.key]||[],E(f.key,f.modifiers,{type:f.action},n,t,o),r._callbacks[f.key][n?"unshift":"push"]({callback:i,modifiers:f.modifiers,action:f.action,seq:n,level:o,combo:t})}r._bindMultiple=function(t,i,s){for(var n=0;n<t.length;++n)T(t[n],i,s)},K(e,"keypress",M),K(e,"keydown",M),K(e,"keyup",M)}d.prototype.bind=function(e,r,a){var u=this;return e=e instanceof Array?e:[e],u._bindMultiple.call(u,e,r,a),u};d.prototype.unbind=function(e,r){var a=this;return a.bind.call(a,e,function(){},r)};d.prototype.trigger=function(e,r){var a=this;return a._directMap[e+":"+r]&&a._directMap[e+":"+r]({},e),a};d.prototype.reset=function(){var e=this;return e._callbacks={},e._directMap={},e};d.prototype.stopCallback=function(e,r,a){if("mousetrapDontStop"in r.dataset||(" "+r.className+" ").indexOf(" mousetrap ")>-1)return!1;if("composedPath"in e&&typeof e.composedPath=="function"){let c=e.composedPath()[0];c!==e.target&&(r=c)}return r.tagName=="INPUT"||r.tagName=="SELECT"||r.tagName=="TEXTAREA"||r.tagName=="BUTTON"&&a.includes("tab")||r.contentEditable&&r.contentEditable=="true"};d.prototype.handleKey=function(){var e=this;return e._handleKey.apply(e,arguments)};function $(e){for(var r in e)e.hasOwnProperty(r)&&(_[r]=e[r]);k=null}var Y=new d(L),z=Y;export{d as Mousetrap,$ as addKeycodes,z as default};
