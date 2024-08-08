(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[895],{8785:function(e,i,t){Promise.resolve().then(t.bind(t,2108))},2108:function(e,i,t){"use strict";t.r(i),t.d(i,{default:function(){return g}});var a=t(7437),n=t(2265),l=t(6648),o=t(9315),s=t.n(o);async function r(e,i,t){if(t(!0),!("showSaveFilePicker"in window)){d([e],i),t(!1);return}try{let t=await window.showSaveFilePicker({suggestedName:i,types:[{description:"ZIP Archive",accept:{"application/zip":[".zip"]}}]}),a=await fetch(e),n=await a.blob(),l=await t.createWritable();await l.write(n),await l.close(),alert("File download started. It will be saved shortly.")}catch(e){e instanceof Error&&"AbortError"===e.name?console.log("File save cancelled by user"):(console.error("Error saving file:",e),alert("There was an error saving the file. The download has been cancelled."))}finally{t(!1)}}async function c(e,i){i(!0);try{let i="showSaveFilePicker"in window?await window.showSaveFilePicker({suggestedName:"".concat(e.title,".zip"),types:[{description:"ZIP Archive",accept:{"application/zip":[".zip"]}}]}):null;if(!i){d(e.downloadUrls,"".concat(e.title,".zip"));return}let t=new(s());await Promise.all(e.downloadUrls.map(async e=>{let i=await fetch(e);if(!i.ok)throw Error("HTTP error! status: ".concat(i.status," for file: ").concat(e));let a=await s().loadAsync(await i.blob());await Promise.all(Object.keys(a.files).map(async e=>{t.file(e,await a.files[e].async("blob"))}))}));let a=await i.createWritable();await a.write(await t.generateAsync({type:"blob"})),await a.close(),alert("Files combined and saved successfully!")}catch(e){console.error("Error:",e),alert("Error: ".concat(e instanceof Error?e.message:"Unknown error",". The download has been cancelled."))}finally{i(!1)}}function d(e,i){e.forEach(e=>{let t=document.createElement("a");t.href=e,t.download=i||e.split("/").pop()||"",t.click()})}let h={UNITY:{name:"Unity",description:"created using Unity engine",color:"bg-green-500"},GODOT:{name:"Godot",description:"created using Godot engine",color:"bg-blue-700"},GREENFOOT:{name:"Greenfoot",description:"created using greenfoot 'engine'. since this thing will not let me export any jar or exe file, the only way for you is to play this, is directly in greenfoot, so you should download that too if you wanna run this (its disrespectful for the other engines to call this a real game engine)",color:"bg-cyan-500"},SDL2:{name:"SDL2",description:"created  using the SDL2 graphics library",color:"bg-yellow-500"},LARGE_FILE:{name:"100MB+",description:"the size of the file is greater than 100 MB so github forced me to separate it into multiple files and combine them into 1 so i can continue abusing their servers. even after it downloaded, wait until the button on which you pressed to download it stops showing 'processing'",color:"bg-red-500"},CPP:{name:"C++",description:"developed using C++",color:"bg-blue-900"},"C#":{name:"C#",description:"developed using C#",color:"bg-purple-900"},GDSCRIPT:{name:"Gdscript",description:"developed using Gdscript",color:"bg-green-900"},JAVA:{name:"Java",description:"developed using Java",color:"bg-yellow-900"},JAVASCRIPT:{name:"JavaScript",description:"developed using JavaScript",color:"bg-yellow-300"},REACT:{name:"React",description:"Built with React framework (or library or whatever this is)",color:"bg-cyan-500"},JAR:{name:"Jar",description:"there will be a jar instead of an executable. clicking on a jar file while in the zip file will only show you the source code, which is ok, but if you want to run the app without compiling it, you should extract it from the zip file",color:"bg-cyan-500"}},u=[{id:0,title:"jhonny",thumbnail:"/imgs/jhonny.png",description:"you play as jhonny and you shoot gangsters. i made possible for a multiplayer game, but since i dont have servers for this, you will have to use hamachi if you dont play multiplayer locally. i also dont recomand shooting until all the players are connected :)",downloadUrls:["jhonnyGang.zip"],tags:["UNITY","C#"]},{id:1,title:"video in ascii",thumbnail:"/imgs/badApple.png",description:"this thing plays any video in ascii, but the default video is bad apple",downloadUrls:["asciiVideo.zip","badApple.zip"],tags:["CPP","LARGE_FILE"]},{id:2,title:"gabriel the hungry",thumbnail:"/imgs/GabrielIsHungry.png",description:"this is the story of gabriel",downloadUrls:["gabrielIsHungry.zip","gabrielIsHungry0.zip"],tags:["GODOT","GDSCRIPT","LARGE_FILE"]},{id:3,title:"fight Jhon Cena",thumbnail:"/imgs/bingChilling.png",description:"i liked undertale. because of that, i made a game in which you fight john cena in an undertale-style fight",downloadUrls:["bingChilling.zip"],tags:["UNITY","C#"]},{id:4,title:"shadow wizzard money gang",thumbnail:"/imgs/shadowGang.png",description:"i made this with a classmate (code: 95% me, art: 1% me ) for a contest. unfortunately the contest required the usage of 'greenfoot'",downloadUrls:["shadowGang.zip"],tags:["GREENFOOT","JAVA"]},{id:5,title:"the 3 room adventure",thumbnail:"/imgs/cppGame.png",description:"this looks too simple for a game, and it is, except the fact that it was made in c++ using sdl2 instead of a game engine",downloadUrls:["cppGame.zip","cppGame0.zip"],tags:["CPP","SDL2","LARGE_FILE"]},{id:6,title:"checkers",thumbnail:"/imgs/checkers.png",description:"checkers",downloadUrls:["worldOfTanks.jar"],tags:["JAVA","JAR"]}];var g=function(){let[e,i]=(0,n.useState)(null),[t,o]=(0,n.useState)(!1),[s,d]=(0,n.useState)(null),[g,p]=(0,n.useState)({isAbove:!1,alignRight:!1}),m=(0,n.useRef)({});(0,n.useEffect)(()=>{if(s){let e=m.current[s];if(e){let i=e.getBoundingClientRect(),t=window.innerHeight,a=window.innerWidth,n=i.top;p({isAbove:t-i.bottom<n,alignRight:i.left+200>a})}}},[s]);let w=t=>{i(t.id===(null==e?void 0:e.id)?null:t)},b=e=>{if(o(!0),1===e.downloadUrls.length){let i=e.downloadUrls[0].split("/").pop()||"".concat(e.title,".zip");r(e.downloadUrls[0],i,o)}else c(e,o)};return(0,a.jsxs)("div",{className:"flex flex-col items-center justify-start min-h-screen p-4",children:[(0,a.jsxs)("header",{className:"text-center mb-8",children:[(0,a.jsx)("h1",{className:"text-4xl font-bold mb-4 py-4",children:"My Projects"}),(0,a.jsx)("p",{className:"text-lg mb-4",children:"projects here and there and here and everywhere"})]}),(0,a.jsxs)("div",{className:"w-full max-w-6xl flex",children:[(0,a.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-6 ".concat(e?"w-2/3":"w-full"),children:u.map(i=>(0,a.jsxs)("div",{className:"bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all\n                          /*".concat((null==e?void 0:e.id)===i.id?"ring-2 ring-blue-500":"","*/\n                          hover:scale-105"),onClick:()=>w(i),children:[(0,a.jsx)(l.default,{src:i.thumbnail,alt:i.title,className:"w-full h-48 object-cover",width:777,height:777,quality:100,priority:!0}),(0,a.jsx)("div",{className:"p-3 ".concat((null==e?void 0:e.id)===i.id?"bg-blue-700":""),children:(0,a.jsx)("h3",{className:"text-xl font-semibold text-white",children:i.title})})]},i.id))}),e&&(0,a.jsxs)("div",{className:"w-1/3 ml-6 bg-gray-800 rounded-lg shadow-lg relative ",children:[(0,a.jsx)("button",{onClick:()=>{i(null)},className:"absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center",children:"\xd7"}),(0,a.jsx)(l.default,{src:e.thumbnail,alt:e.title,className:"w-full h-48 object-cover rounded-t-lg",quality:100,width:777,height:777,priority:!0}),(0,a.jsxs)("div",{className:"p-4",children:[(0,a.jsx)("h3",{className:"text-xl font-semibold text-white mb-2",children:e.title}),(0,a.jsx)("div",{className:"flex flex-wrap mb-2",children:e.tags.map(e=>(0,a.jsxs)("div",{className:"relative inline-block mr-2 mb-2",onMouseEnter:()=>d(e),onMouseLeave:()=>d(null),ref:i=>{m.current&&(m.current[e]=i)},children:[(0,a.jsx)("span",{className:"".concat(h[e].color," text-white text-xs px-2 py-1 rounded cursor-help"),children:h[e].name}),s===e&&(0,a.jsx)("span",{className:"\n              absolute bg-gray-900 text-white text-xs p-2 rounded z-50 break-words\n              w-48 \n              ".concat(g.isAbove?"bottom-full mb-1":"top-full mt-1","\n              ").concat(g.alignRight?"right-0":"left-0","\n            "),children:h[e].description})]},e))}),(0,a.jsx)("p",{className:"text-gray-300 mb-4",children:e.description}),(0,a.jsx)("button",{onClick:()=>b(e),className:"bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",disabled:t,children:t?"Processing...":"Download"})]})]})]})]})}}},function(e){e.O(0,[173,127,971,23,744],function(){return e(e.s=8785)}),_N_E=e.O()}]);