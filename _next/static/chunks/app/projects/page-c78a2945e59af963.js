(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[895],{8785:function(e,t,a){Promise.resolve().then(a.bind(a,1059))},1059:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return m}});var i=a(7437),n=a(2265),r=a(6648),l=a(9315),o=a.n(l);async function s(e,t,a){a(!0);try{let a=await fetch(e);if(!a.ok)throw Error("HTTP error! status: ".concat(a.status));let i=await a.blob(),n=URL.createObjectURL(i),r=document.createElement("a");r.style.display="none",r.href=n,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n),alert("File downloaded successfully!")}catch(e){console.error("Error downloading file:",e),alert("There was an error downloading the file. Please try again.")}finally{a(!1)}}async function c(e,t){t(!0);try{let t="showSaveFilePicker"in window?await window.showSaveFilePicker({suggestedName:"".concat(e.title,".zip"),types:[{description:"ZIP Archive",accept:{"application/zip":[".zip"]}}]}):null;if(!t){!function(e,t){e.forEach(e=>{let a=document.createElement("a");a.href=e,a.download=t||e.split("/").pop()||"",a.click()})}(e.downloadUrls,"".concat(e.title,".zip"));return}let a=new(o());await Promise.all(e.downloadUrls.map(async e=>{let t=await fetch(e);if(!t.ok)throw Error("HTTP error! status: ".concat(t.status," for file: ").concat(e));let i=await o().loadAsync(await t.blob());await Promise.all(Object.keys(i.files).map(async e=>{a.file(e,await i.files[e].async("blob"))}))}));let i=await t.createWritable();await i.write(await a.generateAsync({type:"blob"})),await i.close(),alert("Files combined and saved successfully!")}catch(e){console.error("Error:",e),alert("Error: ".concat(e instanceof Error?e.message:"Unknown error",". The download has been cancelled."))}finally{t(!1)}}let d={UNITY:{name:"Unity",description:"created using Unity engine",color:"bg-green-500"},GODOT:{name:"Godot",description:"created using Godot engine",color:"bg-blue-700"},GREENFOOT:{name:"Greenfoot",description:"created using greenfoot 'engine'. since this thing will not let me export any jar or exe file, the only way for you to play this, is directly in greenfoot, so you should download that too if you wanna run this (its disrespectful for the other engines to call this a real game engine)",color:"bg-cyan-900"},SDL2:{name:"SDL2",description:"created using the SDL2 graphics library",color:"bg-yellow-500"},SFML:{name:"SFML",description:"created using the SFML graphics library",color:"bg-purple-700"},LARGE_FILE:{name:"100MB+",description:"the size of the file is greater than 100 MB so github forced my hand to separate it into multiple files and combine them into 1 so i can continue abusing their servers. even after it downloaded, wait until the button on which you pressed to download it stops showing 'processing'",color:"bg-red-500"},CPP:{name:"C++",description:"developed using C++",color:"bg-blue-900"},"C#":{name:"C#",description:"developed using C#",color:"bg-purple-900"},GDSCRIPT:{name:"Gdscript",description:"developed using Gdscript",color:"bg-green-900"},JAVA:{name:"Java",description:"developed using Java",color:"bg-yellow-900"},JAVASCRIPT:{name:"JavaScript",description:"developed using JavaScript",color:"bg-yellow-300"},REACT:{name:"React",description:"Built with React framework (or library or whatever this is)",color:"bg-cyan-500"},JAR:{name:"Jar",description:"there will be a jar instead of an executable. clicking on a jar file while in the zip file will only show you the source code, which is ok, but if you want to run the app without compiling it, you should extract it from the zip file",color:"bg-cyan-500"}},h=[{id:0,title:"jhonny",thumbnail:"/_next/static/media/jhonny.1dc9c8f8.png",description:"you play as jhonny and you shoot gangsters. i made possible for a multiplayer game, but since i dont have servers for this, you will have to use hamachi if you dont play multiplayer locally. i also dont recomand shooting until all the players are connected :)",downloadUrls:["jhonnyGang.zip"],tags:["UNITY","C#"],createdAt:new Date,relevance:8,repoName:"jhonny"},{id:1,title:"video in ascii",thumbnail:"/_next/static/media/badApple.b7224e90.png",description:"this thing plays any video in ascii, but the default video is bad apple",downloadUrls:["asciiVideo.zip","badApple.zip"],tags:["CPP","LARGE_FILE"],createdAt:new Date,relevance:7,repoName:"BADAPPLE"},{id:2,title:"gabriel the hungry",thumbnail:"/_next/static/media/GabrielIsHungry.a058c8f2.png",description:"this is the story of gabriel",downloadUrls:["gabrielIsHungry.zip","gabrielIsHungry0.zip"],tags:["GODOT","GDSCRIPT","LARGE_FILE"],createdAt:new Date,relevance:9,repoName:"I-am-hungry-and-my-name-is-Gabriel"},{id:3,title:"fight Jhon Cena",thumbnail:"/_next/static/media/bingChilling.8d8f2ac0.png",description:"i like undertale. because of that, i made a game in which you fight john cena in an undertale-style fight",downloadUrls:["bingChilling.zip"],tags:["UNITY","C#"],createdAt:new Date,relevance:6,repoName:"fightJohnCena"},{id:4,title:"shadow wizzard money gang",thumbnail:"/_next/static/media/shadowGang.56b6646e.png",description:"i made this with a classmate (code: 95% me, art: 1% me ) for a contest. unfortunately the contest required the usage of 'greenfoot'. the creation date shown here is wrong (the github api shows the date on which the repository was created, and i had to fork this project from my classmate for the api to work, so it shows the date on which i forked the project, true date: i dont remember, but it was 2024 :) )",downloadUrls:["shadowGang.zip"],tags:["GREENFOOT","JAVA"],createdAt:new Date,relevance:5,repoName:"WizardGang"},{id:5,title:"the 3 room adventure",thumbnail:"/_next/static/media/cppGame.9f0d01dc.png",description:"a simple project made in c++ using sdl2 instead of a game engine",downloadUrls:["cppGame2.zip","cppGame3.zip"],tags:["CPP","SDL2","LARGE_FILE"],createdAt:new Date,relevance:7,repoName:"project-rpg"},{id:6,title:"checkers",thumbnail:"/_next/static/media/checkers.788d4812.png",description:"checkers",downloadUrls:["worldOfTanks.jar"],tags:["JAVA","JAR"],createdAt:new Date,relevance:4,repoName:"checkers"},{id:7,title:"i dont wanna be a bunny anymore",thumbnail:"/_next/static/media/ikeaMan.a456d98f.jpg",description:"you fight ikeaMan. i recomand you extract the files from the zip file if you wanna use the leveleditor properly",downloadUrls:["ikeaBattle0.zip","ikeaBattle1.zip"],tags:["CPP","SFML"],createdAt:new Date,relevance:9,repoName:"99layers"}],p=[{value:"none",label:"Default"},{value:"date",label:"Latest First"},{value:"relevance",label:"Most Relevant First"}];async function u(e){try{let t=await fetch("".concat("https://api.github.com","/repos/").concat("Jupyyter","/").concat(e),{headers:{Accept:"application/vnd.github.v3+json"}});if(!t.ok)return console.error("Failed to fetch repo data for ".concat(e,": ").concat(t.status)),null;let a=await t.json();return new Date(a.created_at)}catch(t){return console.error("Error fetching repo data for ".concat(e,":"),t),null}}var m=function(){let[e,t]=(0,n.useState)(null),[a,l]=(0,n.useState)(!1),[o,m]=(0,n.useState)(null),[g,w]=(0,n.useState)({x:0,y:0,alignTop:!1}),[f,b]=(0,n.useState)(!1),[x,y]=(0,n.useState)("none"),[v,j]=(0,n.useState)(h),N=(0,n.useRef)(null),k=(0,n.useRef)(null),A=(0,n.useRef)(null);(0,n.useEffect)(()=>{(async()=>{j(await Promise.all(h.map(async e=>{if(e.repoName){let t=await u(e.repoName);return t?{...e,createdAt:t}:e}return e})))})()},[]);let E=[...v].sort((e,t)=>{switch(x){case"date":return t.createdAt.getTime()-e.createdAt.getTime();case"relevance":return t.relevance-e.relevance;default:return 0}});(0,n.useEffect)(()=>{let e=()=>{b(window.innerWidth<768)};e();let t=()=>{if(e(),N.current){let e=N.current.offsetWidth;N.current.style.gridTemplateColumns="repeat(".concat(Math.max(1,Math.floor(e/300)),", minmax(0, 1fr))")}};return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]),(0,n.useEffect)(()=>{let e=k.current;if(!e)return;let t=e=>{let{deltaY:t,currentTarget:a}=e;a.scrollHeight>a.clientHeight&&(e.preventDefault(),a.scrollTop+=t)};return e.addEventListener("wheel",t,{passive:!1}),()=>{e.removeEventListener("wheel",t)}},[e]);let C=a=>{a.id!==(null==e?void 0:e.id)&&t(a)},z=e=>{if(l(!0),1===e.downloadUrls.length){let t=e.downloadUrls[0].split("/").pop()||"".concat(e.title,".zip");s(e.downloadUrls[0],t,l)}else c(e,l)},L=(e,t)=>{m(e);let a=t.currentTarget.getBoundingClientRect(),i=window.innerHeight,n=a.left,r=a.bottom,l=!1;a.top>i-a.bottom&&(r=a.top,l=!0),n+160>window.innerWidth&&(n=window.innerWidth-160),w({x:n,y:r,alignTop:l})},S=e=>{y(e),t(null)};return(0,i.jsxs)("div",{className:"flex flex-col items-center justify-start min-h-screen p-2 pt-8",children:[(0,i.jsxs)("div",{className:"w-full max-w-7xl px-4 flex flex-col items-center",children:[(0,i.jsxs)("header",{className:"text-center mb-8 w-full",children:[(0,i.jsx)("h1",{className:"text-4xl font-bold mb-4 break-words",children:"My Projects"}),(0,i.jsx)("p",{className:"text-lg mb-4 break-words whitespace-pre-wrap max-w-full",children:"projects here and there and here and everywhere"}),(0,i.jsxs)("div",{className:"flex justify-center items-center gap-4 mb-4",children:[(0,i.jsx)("span",{className:"text-gray-300",children:"Sorting by:"}),(0,i.jsx)("div",{className:"flex gap-4",children:p.map(e=>{let{value:t,label:a}=e;return(0,i.jsx)("button",{onClick:()=>S(t),className:"px-4 py-2 rounded-lg transition-colors duration-200 ".concat(x===t?"bg-purple-900 text-white hover:bg-white hover:text-black":"bg-gray-700 text-gray-300 hover:bg-white hover:text-black"),children:a},t)})})]})]}),(0,i.jsxs)("div",{className:"flex justify-between w-full relative",ref:N,children:[(0,i.jsx)("div",{className:"grid gap-8 ".concat(e&&!f?"w-[70%]":"w-full"),style:{gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))"},children:E.map(t=>(0,i.jsxs)("div",{className:"bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer select-none hover:scale-110\n                          ".concat((null==e?void 0:e.id)===t.id?"ring-2 ring-blue-500":""),onClick:()=>C(t),onDragStart:e=>e.preventDefault(),children:[(0,i.jsx)("div",{className:"relative w-full h-48",children:(0,i.jsx)(r.default,{src:t.thumbnail,alt:t.title,fill:!0,className:"object-cover pointer-events-none",sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",quality:100,priority:!0,loading:"eager"})}),(0,i.jsxs)("div",{className:"".concat((null==e?void 0:e.id)===t.id?"bg-blue-700":"bg-gray-800"," w-full h-full"),children:[(0,i.jsx)("h3",{className:"text-lg font-semibold text-white p-3",children:t.title}),(0,i.jsx)("div",{className:"flex flex-wrap px-2 pb-2",children:t.tags.map(e=>(0,i.jsx)("span",{className:"".concat(d[e].color," text-white text-xs px-2 py-1 rounded mr-2 mb-2"),children:d[e].name},e))}),(0,i.jsxs)("div",{className:"px-3 pb-3 text-sm text-gray-400",children:["Created: ",t.createdAt.toLocaleDateString()]})]})]},t.id))}),e&&(0,i.jsxs)("div",{className:"bg-gray-800 shadow-lg overflow-auto ".concat(f?"fixed inset-0 top-[64px] z-50":"w-[28%] sticky"),ref:k,style:{top:f?void 0:"".concat(120,"px"),height:f?void 0:"calc(100vh - ".concat(104,"px)")},children:[(0,i.jsx)("button",{onClick:()=>{t(null)},className:"absolute text-white bg-red-500 hover:bg-red-600 w-8 h-8 flex items-center justify-center text-xl font-bold z-10 top-0 right-0 rounded-tr-lg rounded-bl-lg",children:"\xd7"}),(0,i.jsxs)("div",{className:"p-3",children:[(0,i.jsx)("div",{className:"relative w-full h-56",children:(0,i.jsx)(r.default,{src:e.thumbnail,alt:e.title,fill:!0,className:"object-cover rounded-lg pointer-events-none",sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",quality:100,priority:!0})}),(0,i.jsx)("h3",{className:"text-xl font-semibold text-white mb-3 mt-4",children:e.title}),(0,i.jsx)("div",{className:"flex flex-wrap mb-3",children:e.tags.map(e=>(0,i.jsx)("div",{className:"relative inline-block mr-2 mb-2",onMouseEnter:t=>L(e,t),onMouseLeave:()=>m(null),children:(0,i.jsx)("span",{className:"".concat(d[e].color," text-white text-xs px-2 py-1 rounded cursor-help"),children:d[e].name})},e))}),(0,i.jsx)("p",{className:"text-gray-300 text-sm mb-2",children:e.description}),(0,i.jsxs)("p",{className:"text-gray-400 text-sm mb-5",children:["Created: ",e.createdAt.toLocaleDateString()]}),(0,i.jsx)("button",{onClick:()=>z(e),className:"bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm w-full",disabled:a,children:a?"Processing...":"Download"})]})]})]})]}),o&&(0,i.jsx)("div",{ref:A,className:"fixed bg-gray-900 text-white text-xs p-2 rounded z-50 break-words w-40",style:{left:"".concat(g.x,"px"),top:"".concat(g.y,"px"),...g.alignTop&&{transform:"translateY(-100%)"}},children:d[o].description})]})}}},function(e){e.O(0,[173,127,971,23,744],function(){return e(e.s=8785)}),_N_E=e.O()}]);