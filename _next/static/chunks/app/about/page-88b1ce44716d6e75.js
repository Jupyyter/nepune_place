(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[301],{2410:function(e,t,r){Promise.resolve().then(r.bind(r,766))},766:function(e,t,r){"use strict";r.r(t);var n=r(7437),i=r(6648),o=r(7449),l=r.n(o),a=r(1942),s=r(5233),c=r(2265);let m={darkGreen:{bg:"bg-green-700",text:"text-white",tooltip:"Specialized & Preferred"},lightGreen:{bg:"bg-lime-500",text:"text-black",tooltip:"Highly Preferred"},lightBlue:{bg:"bg-sky-400",text:"text-black",tooltip:"Generally Liked"},white:{bg:"bg-gray-200",text:"text-black",tooltip:"Neutral / Competent"},yellow:{bg:"bg-yellow-400",text:"text-black",tooltip:"Use when needed"},orange:{bg:"bg-orange-500",text:"text-black",tooltip:"Used, but with reservations"},red:{bg:"bg-red-600",text:"text-white",tooltip:"Disliked / Avoid if possible"},gray:{bg:"bg-gray-600",text:"text-white",tooltip:"Version Control"}},d="border-gray-400",u="border-2",h=e=>{let{text:t}=e;return(0,n.jsx)("div",{className:"absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs hidden group-hover:block bg-purple-700 text-white text-xs sm:text-sm p-2 rounded z-30 shadow-lg pointer-events-none whitespace-normal text-center",children:t})},f=e=>{var t,r;let{tech:i,isOval:o=!1}=e,l=m[i.preference],a=l?l.bg:"bg-gray-500",s=["lightGreen","lightBlue","white","yellow","orange"].includes(i.preference)?"text-black":"text-white",d=o?"text-2xl":"text-3xl sm:text-4xl";return(0,n.jsxs)("div",{className:"group relative flex flex-col items-center m-1 sm:m-2 transition-colors duration-200 ".concat(a," ").concat(o?"rounded-full p-2 flex flex-col justify-center items-center w-16 h-16":"rounded-lg p-2 shadow-md w-auto h-auto"),children:[(0,n.jsx)(h,{text:i.comment}),i.icon&&(0,n.jsx)("div",{className:"flex items-center justify-center ".concat(o?"h-6 w-6 mb-0.5":"h-8 w-8 sm:h-10 sm:w-10 mb-1"," ").concat((null===(t=m[i.preference])||void 0===t?void 0:t.text)||"text-white"),children:c.isValidElement(i.icon)&&"string"!=typeof i.icon?c.cloneElement(i.icon,{className:"".concat(d," ").concat((null===(r=m[i.preference])||void 0===r?void 0:r.text)||"text-white")}):(0,n.jsx)("span",{className:d,children:i.icon})}),(0,n.jsx)("p",{className:"text-center font-medium ".concat(s," ").concat(o?"text-xs":"text-xs sm:text-sm"),children:i.name})]})},p=e=>{let{title:t,comment:r,preference:i}=e,o=m[i],l=o?o.bg:"bg-gray-500",a=["lightGreen","lightBlue","white","yellow","orange"].includes(i)?"text-black":"text-white";return(0,n.jsxs)("div",{className:"group relative inline-block mb-4",children:[(0,n.jsx)("div",{className:"rounded-lg p-2 shadow-md ".concat(l," cursor-default"),children:(0,n.jsx)("h3",{className:"text-2xl font-medium text-center capitalize ".concat(a),children:t})}),(0,n.jsx)(h,{text:r})]})},g=e=>{let{colorKey:t}=e,r=m[t];return r?(0,n.jsx)("div",{className:"group relative w-5 h-5 sm:w-6 sm:h-6 m-0.5 cursor-default ".concat(r.bg," border border-gray-700 flex-shrink-0"),children:(0,n.jsx)(h,{text:r.tooltip})}):null};t.default=()=>{let e={icon:(0,n.jsx)(s.Ces,{}),name:"C/C++",comment:"my favoryte programing language. can do anything with it. the program not efficient? skill issue",preference:"darkGreen"},t={icon:(0,n.jsx)(a.MmV,{}),name:"Git",comment:"i like typing commands instead of using an ui for managing my projects with github",preference:"darkGreen"},r=[{title:"Sites",titleComment:"this is the only site i have ever coded :) (i dont really like web developement)",titlePreference:"yellow",technologies:[{icon:(0,n.jsx)(a.r8,{}),name:"CSS",comment:":)",preference:"white"},{icon:(0,n.jsx)(a.gtO,{}),name:"HTML",comment:":)",preference:"white"},{icon:(0,n.jsx)(a.huN,{}),name:"React",comment:"i used nextjs which uses react for this site, so react=yes=i do indeed like it over the other site-making-software",preference:"lightGreen"},{icon:(0,n.jsx)(s.Xou,{}),name:"Next.js",comment:"used it to make this site. its great for making websites with react",preference:"darkGreen"},{icon:(0,n.jsx)(s.vl3,{}),name:"JavaScript",comment:'0 == [] (true); 0 == "0" (true); "0" == [] (false); do I need to say anything else?',preference:"orange"},{icon:(0,n.jsx)(s.WZi,{}),name:"TypeScript",comment:"JavaScript but better. I used it to make this site",preference:"white"},{icon:(0,n.jsx)(s.YnA,{}),name:"Tailwind",comment:"Great utility-first CSS framework. Used for this site.",preference:"lightBlue"}]},{title:"Games",titleComment:"i like games. i wanna make games",titlePreference:"darkGreen",technologies:[{icon:(0,n.jsx)(a.bOe,{}),name:"Unity",comment:"too much ui for me, but its really powerfull (can do a lot of things with it). besides, its not open source",preference:"lightBlue"},{icon:(0,n.jsx)("span",{className:"font-mono font-bold",children:"#"}),name:"C#",comment:"The primary language for Unity. It's decent, but I prefer C++.",preference:"lightBlue"},{icon:(0,n.jsx)(a.zEo,{}),name:"Java",comment:"I learned the basics by making checkers and some other game in greenfoot. i hate the syntax",preference:"yellow"},{icon:(0,n.jsx)(i.default,{src:"/imgs/Greenfoot_Logo.jpg",alt:"Greenfoot Logo",width:32,height:32,className:"rounded",priority:!0}),name:"Greenfoot",comment:"a joke of a game engine. the sound system simply doesnt work properly for some reason. worst experience that i ever had using any software.",preference:"red"},{icon:(0,n.jsx)(i.default,{src:"/imgs/gdscript.jpg",alt:"GDScript",width:32,height:32,className:"rounded",priority:!0}),name:"GDScript",comment:"the language used in godot. its like python but for godot compatibility :)",preference:"lightBlue"},{icon:(0,n.jsx)(i.default,{src:"/imgs/godot.png",alt:"Godot",width:32,height:32,className:"rounded",priority:!0}),name:"Godot",comment:"great engine. i like it more than unity because its more lightweight and its open source (hooray)",preference:"darkGreen"},{icon:(0,n.jsx)(s.$ZY,{}),name:"SFML",comment:"practical graphics library when you want to make things appear on the screen. i choose it over sdl2 altho thats just because its more simple",preference:"lightGreen"},{icon:(0,n.jsx)(i.default,{src:"/imgs/sdl.svg",alt:"SDL2",width:32,height:32,className:"rounded filter invert",priority:!0}),name:"SDL2",comment:"its ok. i had a good experience with sdl2, but i would only use it over sfml when developing android or ios apps. i dont really know why, but i think i simply dont like how the code looks",preference:"lightBlue"}]},{title:"Other Windows Apps",titleComment:"i use windows (fear of change)",titlePreference:"lightBlue",technologies:[{icon:(0,n.jsx)(a.osz,{}),name:"Python",comment:"the best choice for any non-performance oriented project",preference:"lightGreen"}]}],o=["darkGreen","lightGreen","lightBlue","white","yellow","orange","red","gray"].reduce((e,t,r)=>(e[t]=r,e),{});return r.forEach(e=>{e.technologies.sort((e,t)=>{var r,n;return(null!==(r=o[e.preference])&&void 0!==r?r:99)-(null!==(n=o[t.preference])&&void 0!==n?n:99)})}),(0,n.jsxs)("div",{className:"flex flex-col items-center justify-start pt-6 text-gray-200 w-full",children:[(0,n.jsxs)(l(),{children:[(0,n.jsx)("title",{children:"About Me"}),(0,n.jsx)("link",{rel:"preload",href:"/imgs/sdl.svg",as:"image"}),(0,n.jsx)("link",{rel:"preload",href:"/imgs/godot.png",as:"image"}),(0,n.jsx)("link",{rel:"preload",href:"/imgs/gdscript.jpg",as:"image"}),(0,n.jsx)("link",{rel:"preload",href:"/imgs/Greenfoot_Logo.jpg",as:"image"})]}),(0,n.jsxs)("main",{className:"p-4 w-full flex flex-col items-center",children:[(0,n.jsxs)("div",{className:"w-full max-w-[60%] mx-auto mb-8 text-left",children:[(0,n.jsx)("h1",{className:"text-4xl font-bold mb-6 text-center text-white",children:"things about me:"}),["- im about 20 years old (more or less im too lazy to update that)","- my current location is Bucharest (the capital city of Romania, a country in Europe)","- i hate humans if you are a human i hate you you better be a carpet or a bed i like beds (the ones which also have a pillow and a blanket so i can use it to hide from the humans)"].map((e,t)=>(0,n.jsx)("p",{className:"text-xl text-gray-300 py-1",children:e},t))]}),(0,n.jsxs)("div",{className:"w-full flex flex-col items-center",children:[(0,n.jsxs)("div",{className:"w-full flex flex-col items-center gap-y-4 mb-5 px-4 relative",children:[(0,n.jsx)("h2",{className:"text-3xl font-semibold text-center text-white",children:"things i use for developing"}),(0,n.jsxs)("div",{className:"flex flex-col items-center max-w-xs sm:max-w-xl",children:[(0,n.jsx)("div",{className:"text-center mb-1",children:(0,n.jsxs)("p",{className:"text-base sm:text-lg font-medium text-gray-200",children:["what i specialize in and what i prefer ",(0,n.jsx)("u",{className:"decoration-purple-400 decoration-2",children:"based on colors"})]})}),(0,n.jsx)("div",{className:"flex flex-wrap justify-center",children:Object.keys(m).filter(e=>"gray"!==e||"gray"===t.preference).map(e=>(0,n.jsx)(g,{colorKey:e},e))})]})]}),(0,n.jsxs)("div",{className:"w-full border-t ".concat(d," ").concat(u," relative"),children:[(0,n.jsx)("div",{className:"flex flex-col lg:flex-row justify-center",children:r.map((t,i)=>{let o="Games"===t.title,l="Other Windows Apps"===t.title,a=i===r.length-1,s="p-6";return o?s+=" pb-16 lg:pb-6 lg:pr-16":l&&(s+=" pt-16 lg:pt-6 lg:pl-16"),(0,n.jsxs)("div",{className:"flex-1 relative ".concat(i>0?"lg:border-l ".concat(d," ").concat(u):""," ").concat(a?"":"border-b lg:border-b-0 ".concat(d," ").concat(u)),children:[(0,n.jsxs)("div",{className:"flex flex-col items-center ".concat(s),children:[(0,n.jsx)(p,{title:t.title,comment:t.titleComment,preference:t.titlePreference}),(0,n.jsx)("div",{className:"flex flex-wrap justify-center items-start gap-1 sm:gap-2 min-h-[50px] w-full",children:t.technologies.map(e=>(0,n.jsx)(f,{tech:e},e.name))})]}),l&&(0,n.jsx)("div",{className:"absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 lg:hidden z-10 border ".concat(d," ").concat(u," rounded-full bg-black p-0.5"),children:(0,n.jsx)(f,{tech:e,isOval:!0})})]},t.title)})}),(0,n.jsx)("div",{className:"hidden lg:block absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10 border ".concat(d," ").concat(u," rounded-full bg-black p-0.5"),children:(0,n.jsx)(f,{tech:e,isOval:!0})})]}),(0,n.jsxs)("div",{className:"mt-5 mb-0 flex items-center justify-center gap-2",children:[(0,n.jsx)("span",{className:"text-lg text-gray-400",children:"i obviously use"}),(0,n.jsx)(f,{tech:t}),(0,n.jsx)("span",{className:"text-lg text-gray-400",children:"with alll my projects (duh)"})]})]})]})]})}},7449:function(e,t){"use strict";function r(){return null}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1810:function(e,t,r){"use strict";r.d(t,{w_:function(){return m}});var n=r(2265),i={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=n.createContext&&n.createContext(i),l=["attr","size","title"];function a(){return(a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){var n,i;n=t,i=r[t],(n=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(n))in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function m(e){return t=>n.createElement(d,a({attr:c({},e.attr)},t),function e(t){return t&&t.map((t,r)=>n.createElement(t.tag,c({key:r},t.attr),e(t.child)))}(e.child))}function d(e){var t=t=>{var r,{attr:i,size:o,title:s}=e,m=function(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}(e,l),d=o||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",a({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,i,m,{className:r,style:c(c({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),s&&n.createElement("title",null,s),e.children)};return void 0!==o?n.createElement(o.Consumer,null,e=>t(e)):t(i)}}},function(e){e.O(0,[957,699,648,971,23,744],function(){return e(e.s=2410)}),_N_E=e.O()}]);