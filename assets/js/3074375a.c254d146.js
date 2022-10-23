"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6610],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),b=l(n),f=o,m=b["".concat(s,".").concat(f)]||b[f]||p[f]||i;return n?r.createElement(m,a(a({ref:t},c),{},{components:n})):r.createElement(m,a({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=b;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u.mdxType="string"==typeof e?e:o,a[1]=u;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}b.displayName="MDXCreateElement"},8924:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return u},metadata:function(){return l},toc:function(){return p}});var r=n(3117),o=n(102),i=(n(7294),n(3905)),a=["components"],u={slug:"why-ubiquitous-objects",title:"Why Ubiquitous Objects",authors:{name:"Ubiquitous Objects",title:"Ubiquitous Objects Core Team",url:"https://github.com/wgao19",image_url:"https://github.com/wgao19.png"},tags:["offline-first","persistence","ephemeral"]},s="What we all want",l={permalink:"/blog/why-ubiquitous-objects",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/blog/blog/2022-01-01-Why-Ubiquitous-Objects.md",source:"@site/blog/2022-01-01-Why-Ubiquitous-Objects.md",title:"Why Ubiquitous Objects",description:"one schema, automatic handling of data online and offline",date:"2022-01-01T00:00:00.000Z",formattedDate:"January 1, 2022",tags:[{label:"offline-first",permalink:"/blog/tags/offline-first"},{label:"persistence",permalink:"/blog/tags/persistence"},{label:"ephemeral",permalink:"/blog/tags/ephemeral"}],readingTime:.285,truncated:!1,authors:[{name:"Ubiquitous Objects",title:"Ubiquitous Objects Core Team",url:"https://github.com/wgao19",image_url:"https://github.com/wgao19.png",imageURL:"https://github.com/wgao19.png"}],frontMatter:{slug:"why-ubiquitous-objects",title:"Why Ubiquitous Objects",authors:{name:"Ubiquitous Objects",title:"Ubiquitous Objects Core Team",url:"https://github.com/wgao19",image_url:"https://github.com/wgao19.png",imageURL:"https://github.com/wgao19.png"},tags:["offline-first","persistence","ephemeral"]},nextItem:{title:"Offline First App Design",permalink:"/blog/offline-first"}},c={authorsImageUrls:[void 0]},p=[],b={toc:p};function f(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"one schema, automatic handling of data online and offline"),(0,i.kt)("h1",{id:"what-we-have-now"},"What we have now"),(0,i.kt)("p",null,"many schemas. DB. API.... NoSQL dbs, then GraphQL are reactions to this. moving the schema definitions."),(0,i.kt)("h1",{id:"ubiquitous-objects"},"Ubiquitous Objects"),(0,i.kt)("p",null,"Ubiquitous Objects is ..."),(0,i.kt)("p",null,"extensibility: cloud functions"),(0,i.kt)("p",null,"real-time messaging and high performance: ephemeral data"),(0,i.kt)("p",null,"durability and transactionality, ACID: persisted data"),(0,i.kt)("p",null,"bulk storage: file store"))}f.isMDXComponent=!0}}]);