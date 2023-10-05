!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Tabs=e():t.Tabs=e()}(self,(function(){return function(){"use strict";var t={187:function(t){var e,i="object"==typeof Reflect?Reflect:null,n=i&&"function"==typeof i.apply?i.apply:function(t,e,i){return Function.prototype.apply.call(t,e,i)};e=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var r=Number.isNaN||function(t){return t!=t};function s(){s.init.call(this)}t.exports=s,t.exports.once=function(t,e){return new Promise((function(i,n){function r(i){t.removeListener(e,s),n(i)}function s(){"function"==typeof t.removeListener&&t.removeListener("error",r),i([].slice.call(arguments))}p(t,e,s,{once:!0}),"error"!==e&&function(t,e,i){"function"==typeof t.on&&p(t,"error",e,{once:!0})}(t,r)}))},s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var o=10;function a(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function h(t){return void 0===t._maxListeners?s.defaultMaxListeners:t._maxListeners}function l(t,e,i,n){var r,s,o,l;if(a(i),void 0===(s=t._events)?(s=t._events=Object.create(null),t._eventsCount=0):(void 0!==s.newListener&&(t.emit("newListener",e,i.listener?i.listener:i),s=t._events),o=s[e]),void 0===o)o=s[e]=i,++t._eventsCount;else if("function"==typeof o?o=s[e]=n?[i,o]:[o,i]:n?o.unshift(i):o.push(i),(r=h(t))>0&&o.length>r&&!o.warned){o.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=t,c.type=e,c.count=o.length,l=c,console&&console.warn&&console.warn(l)}return t}function c(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function u(t,e,i){var n={fired:!1,wrapFn:void 0,target:t,type:e,listener:i},r=c.bind(n);return r.listener=i,n.wrapFn=r,r}function f(t,e,i){var n=t._events;if(void 0===n)return[];var r=n[e];return void 0===r?[]:"function"==typeof r?i?[r.listener||r]:[r]:i?function(t){for(var e=new Array(t.length),i=0;i<e.length;++i)e[i]=t[i].listener||t[i];return e}(r):d(r,r.length)}function v(t){var e=this._events;if(void 0!==e){var i=e[t];if("function"==typeof i)return 1;if(void 0!==i)return i.length}return 0}function d(t,e){for(var i=new Array(e),n=0;n<e;++n)i[n]=t[n];return i}function p(t,e,i,n){if("function"==typeof t.on)n.once?t.once(e,i):t.on(e,i);else{if("function"!=typeof t.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t);t.addEventListener(e,(function r(s){n.once&&t.removeEventListener(e,r),i(s)}))}}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return o},set:function(t){if("number"!=typeof t||t<0||r(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");o=t}}),s.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||r(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},s.prototype.getMaxListeners=function(){return h(this)},s.prototype.emit=function(t){for(var e=[],i=1;i<arguments.length;i++)e.push(arguments[i]);var r="error"===t,s=this._events;if(void 0!==s)r=r&&void 0===s.error;else if(!r)return!1;if(r){var o;if(e.length>0&&(o=e[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var h=s[t];if(void 0===h)return!1;if("function"==typeof h)n(h,this,e);else{var l=h.length,c=d(h,l);for(i=0;i<l;++i)n(c[i],this,e)}return!0},s.prototype.addListener=function(t,e){return l(this,t,e,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(t,e){return l(this,t,e,!0)},s.prototype.once=function(t,e){return a(e),this.on(t,u(this,t,e)),this},s.prototype.prependOnceListener=function(t,e){return a(e),this.prependListener(t,u(this,t,e)),this},s.prototype.removeListener=function(t,e){var i,n,r,s,o;if(a(e),void 0===(n=this._events))return this;if(void 0===(i=n[t]))return this;if(i===e||i.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete n[t],n.removeListener&&this.emit("removeListener",t,i.listener||e));else if("function"!=typeof i){for(r=-1,s=i.length-1;s>=0;s--)if(i[s]===e||i[s].listener===e){o=i[s].listener,r=s;break}if(r<0)return this;0===r?i.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(i,r),1===i.length&&(n[t]=i[0]),void 0!==n.removeListener&&this.emit("removeListener",t,o||e)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(t){var e,i,n;if(void 0===(i=this._events))return this;if(void 0===i.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==i[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete i[t]),this;if(0===arguments.length){var r,s=Object.keys(i);for(n=0;n<s.length;++n)"removeListener"!==(r=s[n])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=i[t]))this.removeListener(t,e);else if(void 0!==e)for(n=e.length-1;n>=0;n--)this.removeListener(t,e[n]);return this},s.prototype.listeners=function(t){return f(this,t,!0)},s.prototype.rawListeners=function(t){return f(this,t,!1)},s.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):v.call(t,e)},s.prototype.listenerCount=v,s.prototype.eventNames=function(){return this._eventsCount>0?e(this._events):[]}}},e={};function i(n){var r=e[n];if(void 0!==r)return r.exports;var s=e[n]={exports:{}};return t[n](s,s.exports,i),s.exports}i.d=function(t,e){for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return function(){i.r(n),i.d(n,{default:function(){return o}});class t{constructor(t){this.delete=()=>{var t;return null===(t=this.el.parentElement)||void 0===t?void 0:t.removeChild(this.el)},this.el=t,this.id=t.id}deactivate(){this.el.setAttribute("hidden","hidden"),this.el.classList.remove("is-active")}activate(){this.el.removeAttribute("hidden"),this.el.classList.add("is-active")}destroy(){this.el.removeAttribute("hidden"),this.el.classList.remove("is-active")}}var e=i(187);class r extends e.EventEmitter{constructor(t,e){var i;super(),this.active=!1,this.id="",this.init=()=>this.initEvents(),this.initEvents=()=>this.el.addEventListener("click",this.handleClick),this.handleClick=()=>this.toggle(),this.focus=()=>this.el.focus(),this.delete=()=>{var t;return null===(t=this.el.parentElement)||void 0===t?void 0:t.removeChild(this.el)},this.el=t,this.id=t.id,this.controls=(null===(i=t.getAttribute("aria-controls"))||void 0===i?void 0:i.trim().split(" ")[0])||"",this.active=JSON.parse(t.getAttribute("aria-selected")),this.callback=e}async toggle(t=!0){this.active||(await this.callback(),this.emit("Tab.activate",{controls:this.controls,element:this.el}),this.activate(t))}activate(t=!0){this.active=!0,this.el.setAttribute("tabindex","0"),this.el.setAttribute("aria-selected","true"),this.el.classList.add("is-active"),t&&this.focus()}deactivate(){this.active=!1,this.el.setAttribute("tabindex","-1"),this.el.setAttribute("aria-selected","false"),this.el.classList.remove("is-active")}destroy(){this.el.removeAttribute("tabindex"),this.el.removeAttribute("aria-selected"),this.el.classList.remove("is-active"),this.el.removeEventListener("click",this.handleClick)}}const s={hash:!0,delay:0,callback(){}};class o{constructor(t,e={}){this.current=0,this.tabPanels=[],this.tabs=[],this.href="",this.handleKeydown=t=>{const{key:e,code:i,target:n}=t,r=JSON.parse(n.getAttribute("aria-selected")),s=()=>{this.current=0>this.current-1?this.tabs.length-1:this.current-1,this.tabs[this.current].focus(),this.options.delay&&setTimeout((()=>{this.tabs[this.current].toggle(!1)}),this.options.delay)},o=()=>{this.current=this.current+1>this.tabs.length-1?0:this.current+1,this.tabs[this.current].focus(),this.options.delay&&setTimeout((()=>{this.tabs[this.current].toggle(!1)}),this.options.delay)},a=()=>{t.preventDefault(),this.current=0,this.tabs[this.current].toggle()},h=()=>{t.preventDefault(),this.current=this.tabs.length-1,this.tabs[this.current].toggle()},l={ArrowUp:s,ArrowLeft:s,ArrowDown:o,ArrowRight:o,End:h,Home:a,PageUp:a,PageDown:h,Delete:()=>r&&this.delete(t),Backspace:()=>r&&this.delete(t),default:()=>!1};return(l[e||i]||l.default)()},this.deactivateTabs=()=>this.tabs.forEach((t=>t.deactivate())),this.deactivateTabPanels=()=>this.tabPanels.forEach((t=>t.deactivate())),this.create=()=>this.init(),this.el=t,this.$tabList=this.el.querySelector('[role="tablist"]'),this.options={...s,...e},this.href=this.options.hash&&function(t){const e=t.indexOf("#");return-1===e?"":t.substring(e+1)}(window.location.hash)||""}init(){this.tabs=[...this.$tabList.querySelectorAll('[role="tab"]')].map((t=>new r(t,this.options.callback))),this.tabPanels=[...this.el.querySelectorAll('[role="tabpanel"]')].map((e=>new t(e))),this.tabs.forEach(((t,e)=>{t.init(),t.on("Tab.activate",(()=>{this.current=e,this.deactivateTabs(),this.deactivateTabPanels(),this.tabPanels.find((e=>e.id===t.controls)).activate(),this.options.hash&&(this.href=t.id,window.location.hash=t.id)})),(t.active||t.id===this.href||this.current===e)&&(this.deactivateTabs(),this.deactivateTabPanels(),t.activate(!1),this.tabPanels.find((e=>e.id===t.controls)).activate())})),this.initEvents()}initEvents(){var t;null===(t=this.$tabList)||void 0===t||t.addEventListener("keydown",this.handleKeydown)}delete({target:t}){return null!==t.getAttribute("data-deletable")&&(this.tabs[this.current].delete(),this.tabPanels[this.current].delete(),this.tabs.splice(this.current,1),this.tabPanels.splice(this.current,1),0>this.current-1?this.current=0:this.current=this.current-1,this.tabs[this.current].toggle(),!0)}destroy(){var t;null===(t=this.$tabList)||void 0===t||t.removeEventListener("keydown",this.handleKeydown),this.tabs.forEach((t=>t.destroy())),this.tabPanels.forEach((t=>t.destroy())),this.tabs=[],this.tabPanels=[]}}}(),n}()}));