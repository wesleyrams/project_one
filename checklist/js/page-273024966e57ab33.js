(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[754,550],{1284:function(e,r,a){Promise.resolve().then(a.bind(a,5742)),Promise.resolve().then(a.bind(a,6875)),Promise.resolve().then(a.bind(a,3881)),Promise.resolve().then(a.t.bind(a,231,23))},5742:function(e,r,a){"use strict";a.d(r,{default:function(){return u}});var t=a(7437);a(4590);var n=(0,a(8064).$)("a16986593e787f0131b19cf0603c72cd2a5b564b"),o=a(3881),i=a(3537),s=a(2265);function u(){let{checkedSet:e}=(0,o.$)(),[r,a]=(0,s.useState)(""),[u,c]=(0,s.useState)(!1);async function l(a){a.preventDefault(),c(!0);let t=Array.from(e),o=await n({userEmail:r,checklistString:t.toString()});await d(o),c(!1)}let d=async e=>{try{let a=await fetch("/api/create-checklist-checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:r,emailId:e})}),t=await (0,i.J)("pk_live_51PdKgyCCwrfeEbthlWkzixS8p1QZwSiSOvVKtJm2lW8zFHF7RypVTuR6UmJJNLyh1LafmcJTJvux9MhBsCVIyqtL00qZziADSw");if(c(!1),!t)throw Error("Stripe failed to initialize.");let{sessionId:n}=await a.json();await t.redirectToCheckout({sessionId:n})}catch(e){console.error(e)}};return(0,t.jsxs)("form",{onSubmit:l,className:"flex gap-2 mt-2",children:[(0,t.jsx)("input",{value:r,onChange:e=>a(e.target.value),type:"email",name:"email",id:"email",placeholder:"Seu e-mail",className:"w-full border rounded-lg border-primarypink py-2 px-4",required:!0}),(0,t.jsx)("button",{disabled:u,className:"text-sm lg:text-base border-primarypink rounded-md bg-primarypink w-[200px] h-[50px] font-bold disabled:opacity-70",children:u?"Salvando...":"Salvar R$9,99"})]})}},6875:function(e,r,a){"use strict";a.d(r,{default:function(){return d}});var t=a(7437);a(4590);var n=(0,a(8064).$)("cac7fd340bb18a97d89048ac4faa34e69855e990"),o=a(3881),i=a(6463);function s(e){let{number:r,question:a,checked:s,setChecked:c}=e,l=(0,i.useSearchParams)().get("emailId"),{checkedSet:d}=(0,o.$)();return(0,t.jsxs)("div",{className:"w-full h-14 flex items-center gap-4",children:[(0,t.jsx)("button",{onClick:function(){c(r),l&&n({checklistId:l,checklistString:Array.from(d).toString()})},className:"\n        size-10 border rounded-lg flex items-center justify-center flex-shrink-0\n        ".concat(s?"bg-primarypink text-white":"text-primarypink"),children:s?(0,t.jsx)(u,{}):null}),(0,t.jsxs)("span",{children:[r,". ",a]})]})}function u(){return(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:4,stroke:"currentColor",className:"size-7",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m4.5 12.75 6 6 9-13.5"})})}let c=["Trocar cartas de amor","Jantar \xe0 luz de velas","Sair com looks combinando","Fazer uma tattoo juntos","Chorar por ter brigado","Fazer trilha juntos","Dormir de conchinha","Ter um animal de estima\xe7\xe3o","Viajar para outro estado","Viajar para outro pa\xeds","Piquenique juntos","Jogar videogame juntos","Maratona de filmes","Maratona de s\xe9rie","Guerra de travesseiro","Cozinhar juntos","Participar de um karaok\xea","Dia na praia","Acampar juntos","Assistir ao p\xf4r do sol","Cultivar uma plantinha","Viajar de trem","Parque de divers\xf5es","Massagem","Rir at\xe9 chorar","Fazer amor no carro","Fazer amor na piscina","Comer sushi","Guerra de c\xf3cegas","Declara\xe7\xe3o na madrugada","Ir no circo","Presentear com flores","Mergulhar no mar","Ir ao boliche","Ir a um show","Comemorar anivers\xe1rio de namoro","Ir em um restaurante chique","Ir no dog\xe3o da esquina","Ir a um evento esportivo","Ficar b\xeabados juntos","Caf\xe9 da manh\xe3 na cama","Tomar banho juntos","Dan\xe7ar juntos","Tomar banho de chuva","Passar uma noite em um hotel de luxo","Fazer um \xe1lbum de fotos de casal","Hospedar em um chal\xe9 nas montanhas","Fazer um churrasco juntos","Viajar de avi\xe3o","Visita ao zool\xf3gico","Visita a um museu","Ir a uma pe\xe7a de teatro","Tomar sorvete juntos","Ter um dia de spa caseiro","J\xe1 lemos um livro juntos","Beijamos por mais de 1 hora","Mandamos nudes","Encontro rom\xe2ntico surpresa","Fazer um passeio de bal\xe3o","Dormir em uma rede juntos","Andar de pedalinho em um lago","V\xeddeo juntos no Tiktok","Passar um dia inteiro na cama","Passar um dia sem celular juntos","Viajar de carro sem destino definido","Criar uma tradi\xe7\xe3o de casal","Contar hist\xf3rias assustadoras \xe0 noite","Passar o Natal juntos","Andar de bicicleta juntos","Pintar ou desenhar juntos","Fazer maquiagem no(a) outro(a)","Fazer uma playlist do casal","Contamos estrelas juntos","Presente surpresa","Criamos nossa p\xe1gina de relacionamento Loveyuu"];var l=a(2265);function d(e){let{children:r,emailData:a}=e,{checkedSet:n,setCheckedSet:i}=(0,o.$)();function u(e){n.has(e)?n.delete(e):n.add(e),i(new Set(n))}return(0,l.useEffect)(()=>{a&&a.checklistString&&i(new Set(a.checklistString.split(",").map(Number)))},[a]),(0,t.jsxs)(t.Fragment,{children:[r,(0,t.jsxs)("div",{className:"border mt-4 p-4 rounded-lg shadow-lg",children:[(0,t.jsx)("div",{className:"text-center text-sm my-2",children:"Clique para marcar"}),c.map((e,r)=>(0,t.jsx)(s,{number:r+1,question:e,checked:n.has(r+1),setChecked:u},r))]}),(0,t.jsxs)("div",{className:"flex flex-col gap-2 items-center justify-center my-4 text-center border rounded-lg px-8 h-[400px]",children:[(0,t.jsx)("h4",{children:"Pontua\xe7\xe3o"}),(0,t.jsxs)("span",{className:"text-9xl font-bold",children:[n.size,"/",c.length]}),(0,t.jsx)("span",{className:"text-sm mt-10",children:n.size>=0&&n.size<=15?"Ainda faltam muuuitas coisas para fazerem juntos. Saiam desse site e v\xe3o dar um rol\xea agora \uD83E\uDEE2":n.size>15&&n.size<=30?"Voc\xeas ainda n\xe3o fizeram muita coisa juntos... Mas usem a lista como sugest\xe3o e se divirtam juntinhos!":n.size>30&&n.size<=45?"Voc\xeas j\xe1 tiveram algumas experi\xeancias muito legais, por\xe9m ainda precisam construir mem\xf3rias.":n.size>45&&n.size<=60?"Um casal de respeito, possui muitas experi\xeancias juntos e pode dizer que conhece um ao outro.":n.size>60&&n.size<75?"Casal com muita experi\xeancia de vida e que pode dizer com propriedade que realmente ama um ao outro.":"MEU DEEEUS! \xc9 O CASAL PERFEITO!!! \uD83E\uDD73 Todo mundo quer ser como voc\xeas quando crescer."})]})]})}},3881:function(e,r,a){"use strict";a.d(r,{$:function(){return i}});var t=a(7437),n=a(2265);let o=(0,n.createContext)(void 0);r.default=e=>{let{children:r}=e,[a,i]=(0,n.useState)(new Set);return(0,t.jsx)(o.Provider,{value:{checkedSet:a,setCheckedSet:i},children:r})};let i=()=>{let e=(0,n.useContext)(o);if(!e)throw Error("useChecklistContext must be used within a ChecklistProvider");return e}},6463:function(e,r,a){"use strict";var t=a(1169);a.o(t,"useRouter")&&a.d(r,{useRouter:function(){return t.useRouter}}),a.o(t,"useSearchParams")&&a.d(r,{useSearchParams:function(){return t.useSearchParams}})},8064:function(e,r,a){"use strict";Object.defineProperty(r,"$",{enumerable:!0,get:function(){return n}});let t=a(4590);function n(e){let{createServerReference:r}=a(6671);return r(e,t.callServer)}},3537:function(e,r,a){"use strict";a.d(r,{J:function(){return f}});var t,n="https://js.stripe.com/v3",o=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,i=function(){for(var e=document.querySelectorAll('script[src^="'.concat(n,'"]')),r=0;r<e.length;r++){var a=e[r];if(o.test(a.src))return a}return null},s=function(e){var r=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",a=document.createElement("script");a.src="".concat(n).concat(r);var t=document.head||document.body;if(!t)throw Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return t.appendChild(a),a},u=function(e,r){e&&e._registerWrapper&&e._registerWrapper({name:"stripe-js",version:"4.0.0",startTime:r})},c=null,l=null,d=null,m=function(e,r,a){if(null===e)return null;var t=e.apply(void 0,r);return u(t,a),t},p=!1,h=function(){return t||(t=(null!==c?c:(c=new Promise(function(e,r){if("undefined"==typeof window||"undefined"==typeof document){e(null);return}if(window.Stripe,window.Stripe){e(window.Stripe);return}try{var a,t=i();t?t&&null!==d&&null!==l&&(t.removeEventListener("load",d),t.removeEventListener("error",l),null===(a=t.parentNode)||void 0===a||a.removeChild(t),t=s(null)):t=s(null),d=function(){window.Stripe?e(window.Stripe):r(Error("Stripe.js not available"))},l=function(){r(Error("Failed to load Stripe.js"))},t.addEventListener("load",d),t.addEventListener("error",l)}catch(e){r(e);return}})).catch(function(e){return c=null,Promise.reject(e)})).catch(function(e){return t=null,Promise.reject(e)}))};Promise.resolve().then(function(){return h()}).catch(function(e){p||console.warn(e)});var f=function(){for(var e=arguments.length,r=Array(e),a=0;a<e;a++)r[a]=arguments[a];p=!0;var t=Date.now();return h().then(function(e){return m(e,r,t)})}}},function(e){e.O(0,[231,971,23,744],function(){return e(e.s=1284)}),_N_E=e.O()}]);