!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Contentmeter=e():t.Contentmeter=e()}("undefined"!=typeof self?self:this,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),r=n(1),s=(o=r)&&o.__esModule?o:{default:o};var c=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.barSelector=e,this.contentSelector=n,this.init()}return i(t,[{key:"updateClasses",value:function(){s.default.getDocScrolltop()>this.content.height+this.content.offset||s.default.getDocScrolltop()+this.content.visibleHeight<this.content.offset?this.barContainer.classList.add("js-invisible"):this.barContainer.classList.remove("js-invisible")}},{key:"getBarWidth",value:function(){var t;return this.content||this.readContentDimensions(),t=((this.content.selfScrolled?this.contentContainer.scrollTop:s.default.getDocScrolltop())+this.content.barBasicVal)/this.content.height*100,s.default.limitTheNumber(t,0,100)}},{key:"setBarWidth",value:function(){this.bar.style.width=this.getBarWidth()+"%"}},{key:"setCounterValue",value:function(){this.counter.textContent=Math.ceil(this.getBarWidth())}},{key:"readContentDimensions",value:function(){this.content=this.content||{},this.content.selfScrolled=this.contentContainer.scrollHeight>this.contentContainer.clientHeight,this.content.height=this.contentContainer.scrollHeight,this.content.visibleHeight=Math.min(window.innerHeight,this.contentContainer.clientHeight),this.content.offset=this.content.selfScrolled?0:this.contentContainer.offsetTop,this.content.barBasicVal=-1*this.content.offset+this.content.visibleHeight,console.log(this.content)}},{key:"bindUIEvents",value:function(){var t=this;(this.content.selfScrolled?this.contentContainer:window).addEventListener("scroll",function(){t.setBarWidth(),t.setCounterValue()}),window.addEventListener("scroll",function(){return t.updateClasses()}),window.addEventListener("resize",function(){t.readContentDimensions(),t.setBarWidth(),t.setCounterValue(),t.updateClasses()})}},{key:"createMeter",value:function(){var t=this;s.default.createDOMElement("div","contentmeter__bar",this.barContainer,function(e){t.bar=e,t.setBarWidth()}),s.default.createDOMElement("div","contentmeter__counter",this.barContainer,function(e){t.counter=e,t.setCounterValue()}),this.updateClasses(),this.bindUIEvents()}},{key:"init",value:function(){if(this.barContainer=s.default.getDOMElement(this.barSelector),this.contentContainer=s.default.getDOMElement(this.contentSelector),null===this.barContainer||null===this.contentContainer)throw new Error("Wrong selectors or given selectors match no elements.");this.readContentDimensions(),this.createMeter()}}]),t}();e.default=c,t.exports=e.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();var r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return i(t,null,[{key:"getDOMElement",value:function(t){var e=null;return"string"==typeof t&&-1!==t.indexOf("#")&&0===t.indexOf("#")?e=document.getElementById(t.slice(1)):"object"===(void 0===t?"undefined":o(t))&&void 0!==t.nodeType&&void 0===t.length&&(e=t),e}},{key:"createDOMElement",value:function(t,e,n,o){var i=document.createElement(t);return i.classList.add(e),n&&n.appendChild(i),o&&o(i),i}},{key:"getDocScrolltop",value:function(){return document.documentElement.scrollTop||document.body.scrollTop}},{key:"limitTheNumber",value:function(t,e,n){return t>e?t<n?t:n:e}}]),t}();e.default=r,t.exports=e.default}])});
//# sourceMappingURL=contentmeter.js.map