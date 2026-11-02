// App shell: routing, saved progress, the intro and the four study views. The exam is in examview.js.
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const coarse=matchMedia("(pointer: coarse)").matches;
const G=window.gsap,ST=window.ScrollTrigger,M=window.Motion;
if(G&&ST)G.registerPlugin(ST);
const esc=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));

const KEY="apbio-v2";
let S={};try{S=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){}
S.ans=S.ans||{};S.known=S.known||{};S.frq=S.frq||{};S.shown=S.shown||{};
let saveT=0;
function save(){clearTimeout(saveT);saveT=setTimeout(saveNow,150)}
function saveNow(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
addEventListener("pagehide",saveNow);
// Motion plays for everyone by default. The switch in the header pauses it and the choice is remembered.
let still=S.motion==="off";
root.dataset.still=still?"1":"0";

const FORM_EXAM="sheet";
const BLURB=["",
"Water, carbon and the four macromolecules that every later unit builds on.",
"Organelles, membranes, transport, and why cells stay small.",
"Enzymes, then how photosynthesis and respiration capture and release energy.",
"How cells signal, hold steady through feedback, and divide on schedule.",
"Meiosis, Mendel, the exceptions to Mendel, and how the environment shapes phenotype.",
"From DNA replication to protein, plus regulation, mutation and biotechnology.",
"The largest unit on the exam: selection, Hardy–Weinberg, phylogeny and speciation.",
"Energy flow, populations, communities, and what disrupts an ecosystem."];
const VIEW_NAME={guide:"Study guide",videos:"Videos",practice:"Practice questions",cards:"Flashcards",frq:"Free response",exam:"Final exam"};
const plural=(n,w)=>`${n} ${w}${n===1?"":"s"}`;
// Unit 4 assessment start times, counted down on the viewer's clock.
const U4_TEST=[
  {who:"Block G",y:2026,m:11,d:22,h:7,min:30},
  {who:"Block B",y:2026,m:11,d:22,h:11,min:15},
  {who:"Block C",y:2026,m:11,d:22,h:13,min:0},
  {who:"Block F",y:2026,m:11,d:23,h:10,min:0}
];
function u4Left(t){
  const pad=n=>String(n).padStart(2,"0"),count=(n,w)=>({big:n,unit:n===1?w:w+"s"});
  const s=Math.floor((new Date(t.y,t.m-1,t.d,t.h,t.min)-Date.now())/1000);
  if(s<=0)return null;
  const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),sec=pad(s%60);
  if(d)return{...count(d,"day"),clock:`${h}h ${pad(m)}m ${sec}s`};
  if(h)return{...count(h,"hour"),clock:`${pad(m)}m ${sec}s`};
  return{...count(m,"minute"),clock:`${sec}s`};
}
const u4Num=v=>`<b>${v.big}</b> ${v.unit}`;
function u4When(t){
  const at=new Date(t.y,t.m-1,t.d,t.h,t.min);
  return`<span>${at.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})},</span> <span>${at.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}</span>`;
}
function u4Rows(){
  return U4_TEST.map((t,i)=>{const v=u4Left(t);return v?`<span class="tc-row" data-i="${i}"><span class="tc-who">${t.who}</span><span class="tc-n">${u4Num(v)}</span><span class="tc-clock">${v.clock}</span><span class="tc-when">${u4When(t)}</span></span>`:""}).join("");
}
function tickU4(){
  if(document.hidden)return;
  let over=false;
  $$(".tc-row").forEach(r=>{const v=u4Left(U4_TEST[+r.dataset.i]);if(!v){over=true;return}$(".tc-n",r).innerHTML=u4Num(v);$(".tc-clock",r).textContent=v.clock});
  if(over){paintU4Test();renderPoster()}
}
function paintU4Test(){
  const rows=u4Rows();let b=$("#u4Test");
  if(!rows){if(b)b.remove();return}
  if(!b){b=document.createElement("button");b.id="u4Test";b.type="button";b.className="tcard";b.onclick=()=>go("guide",4);$(".cta").after(b)}
  b.innerHTML=`<span class="tc-h">Unit 4 assessment</span><span class="tc-rows">${rows}</span>`;
}

let view=VIEW_NAME[S.view]?S.view:"guide",unit=Number.isInteger(S.unit)?S.unit:1,topic="all";
let seed=0,onlyMissed=false,onlyLearning=false,cardI=0,flipped=false,flipDeg=0,flipAnim=null,askReset=false;

const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
function shuffled(arr,key){return arr.map(a=>[hash(key+"|"+(a.id||a)),a]).sort((x,y)=>x[0]-y[0]).map(x=>x[1])}
// The answer key leans toward option A, so every question gets a fixed order from its own text. Picks are stored by original index.
function optOrder(stem,opts){
  const idx=opts.map((_,i)=>i),pin=idx.filter(i=>/^(all of (these|the)|none of (these|the)|both of these)/i.test(opts[i]));
  return shuffled(idx.filter(i=>!pin.includes(i)),stem).concat(pin);
}

/* motion helpers: every one of these still lands on the final state if a library is missing */
function spring(from,to,cb,opt={}){
  if(M&&!still&&M.animate)return M.animate(from,to,{type:"spring",bounce:0,visualDuration:.35,...opt,onUpdate:cb});
  cb(to);return null;
}
function tween(el,from,to){if(G&&!still&&el)return G.fromTo(el,from,{...to,clearProps:Object.keys(to).filter(k=>!["duration","ease","delay","stagger"].includes(k)).join(",")});return null}

/* scroll */
let lenis=null;
function lenisOn(){
  if(lenis||!window.Lenis||still||coarse)return;
  lenis=new Lenis({lerp:.12,smoothWheel:true});
  lenis.on("scroll",e=>{if(ST)ST.update();if(window.Field)Field.nudge(e.velocity*.00004)});
}
function lenisOff(){if(lenis){lenis.destroy();lenis=null}}
if(G){G.ticker.add(t=>{if(lenis)lenis.raf(t*1000)});G.ticker.lagSmoothing(0)}
else{const f=t=>{if(lenis)lenis.raf(t);requestAnimationFrame(f)};requestAnimationFrame(f)}
lenisOn();
function scrollToY(y,immediate){
  if(lenis){lenis.resize();lenis.scrollTo(y,{immediate:!!immediate,force:true,duration:.7})}
  else window.scrollTo({top:y,behavior:immediate||still?"auto":"smooth"});
}
const barH=()=>$("#top").offsetHeight;
function studyTop(){return $("#study").getBoundingClientRect().top+scrollY-barH()}
function scrollToEl(el,immediate){scrollToY(el.getBoundingClientRect().top+scrollY-barH()-20,immediate)}

/* theme */
const modeNow=()=>getComputedStyle(root).getPropertyValue("--mode").trim()||"dark";
function paintMode(){
  const m=modeNow();
  $("#modeName").textContent=m==="dark"?"Fluorescence":"Brightfield";
  $("#mode").setAttribute("aria-label",m==="dark"?"Switch to brightfield, the light theme":"Switch to fluorescence, the dark theme");
  $("#mode").title=$("#mode").getAttribute("aria-label");
  if(window.Field)Field.retheme();
}
if(S.theme==="light"||S.theme==="dark")root.dataset.theme=S.theme;
$("#mode").onclick=()=>{S.theme=modeNow()==="dark"?"light":"dark";root.dataset.theme=S.theme;save();paintMode()};
matchMedia("(prefers-color-scheme: dark)").addEventListener("change",paintMode);
new MutationObserver(paintMode).observe(root,{attributes:true,attributeFilter:["data-theme"]});

/* motion switch */
const ICON_PAUSE=`<svg viewBox="0 0 20 20" width="18" height="18"><path d="M6 4h3v12H6zM11 4h3v12h-3z" fill="currentColor"/></svg>`;
const ICON_PLAY=`<svg viewBox="0 0 20 20" width="18" height="18"><path d="M6 3.5v13l10.5-6.5z" fill="currentColor"/></svg>`;
function paintMotion(){
  const b=$("#motion");
  b.setAttribute("aria-pressed",!still);
  b.setAttribute("aria-label",still?"Motion is off. Turn on animation":"Motion is on. Pause animation");
  b.title=b.getAttribute("aria-label");
  $("#motionIcon").innerHTML=still?ICON_PLAY:ICON_PAUSE;
  $("#motionName").textContent=still?"Turn on motion":"Pause motion";
  movePill(false);
}
$("#motion").onclick=()=>{
  still=!still;S.motion=still?"off":"on";save();
  root.dataset.still=still?"1":"0";
  if(window.Field)Field.setStill(still);
  paintMotion();
  if(still){lenisOff();scrubOff();stopAuto()}
  else{lenisOn();scrubOn();autoOff=false;if($("#hero").getBoundingClientRect().bottom>innerHeight*.5)startAuto();if(ST)ST.refresh()}
};

/* progress */
function unitDone(u){
  let got=0;
  u.q.forEach((q,i)=>{if(S.ans[`u${u.n}q${i}`]===q[3])got++});
  u.cards.forEach((c,i)=>{if(S.known[`u${u.n}c${i}`]===1)got++});
  u.frq.forEach((f,i)=>{const id=`u${u.n}f${i}`;if(S.shown[id]||(S.frq[id]||"").trim().length>20)got++});
  return Math.round(got/(u.q.length+u.cards.length+u.frq.length)*100);
}

/* tabs */
const pill=$("#pill");let px=0,pw=0,pillAnim=null;
function movePill(anim){
  const t=$('.tab[aria-selected="true"]');if(!t)return;
  pill.classList.add("on");
  const x=t.offsetLeft,w=t.offsetWidth,x0=px,w0=pw;
  if(pillAnim&&pillAnim.stop)pillAnim.stop();
  const set=p=>{px=x0+(x-x0)*p;pw=w0+(w-w0)*p;pill.style.transform=`translateX(${px}px)`;pill.style.width=pw+"px"};
  if(anim)pillAnim=spring(0,1,set);else set(1);
}
function markTabs(){$$(".tab").forEach(t=>{const on=t.dataset.view===view;t.setAttribute("aria-selected",on);t.tabIndex=on?0:-1;t.setAttribute("aria-controls","view")})}
$$(".tab").forEach((t,i,all)=>{
  t.onclick=()=>go(t.dataset.view);
  t.onkeydown=e=>{const d={ArrowRight:1,ArrowLeft:-1}[e.key];if(!d)return;e.preventDefault();const n=all[(i+d+all.length)%all.length];n.focus();go(n.dataset.view)};
});
addEventListener("resize",()=>movePill(false));
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{movePill(false);if(ST)ST.refresh()});

/* routes: #guide #videos #practice #cards #frq #exam #u3 #u3-videos #u3-practice #u3-cards #u3-frq */
function tokenFor(){
  if(view==="exam")return"exam";
  if(view==="guide")return"u"+unit;
  return(unit?`u${unit}-`:"")+view;
}
function parseHash(h){
  h=(h||"").replace(/^#/,"");if(!h)return null;
  if(VIEW_NAME[h]&&h!=="guide")return{v:h,u:h==="exam"?undefined:0};
  if(h==="guide")return{v:"guide"};
  const m=/^u([1-8])(?:-(videos|practice|cards|frq))?$/.exec(h);
  return m?{v:m[2]||"guide",u:+m[1]}:null;
}
function setChannel(n){root.dataset.unit=n}
function studyChannel(){return view==="exam"?0:unit}

function go(v,u,o={}){
  const wasIn=scrollY>=studyTop()-4,same=v===view&&(u===undefined||u===unit);
  view=v;if(u!==undefined)unit=u;
  if(view==="guide"&&!unit)unit=S.lastUnit||1;
  if(unit)S.lastUnit=unit;
  S.view=view;S.unit=unit;save();
  topic="all";onlyMissed=false;onlyLearning=false;cardI=0;flipped=false;flipDeg=0;askReset=false;seed=0;
  markTabs();movePill(!o.instant);
  setChannel(studyChannel());
  renderAll();
  if(o.scroll!==false)scrollToY(studyTop(),true);
  if(!o.instant&&(!same||!wasIn))posterIn();
  try{history.replaceState(null,"","#"+tokenFor())}catch(e){}
  saveNow();
}
function renderAll(){renderPoster();renderRail();renderView()}
function renderView(){
  if(spy){spy.disconnect();spy=null}
  ({guide:renderGuide,videos:renderVideos,practice:renderPractice,cards:renderCards,frq:renderFrq,exam:()=>ExamView.render()})[view]();
}

/* poster */
function renderPoster(){
  const p=$("#poster");
  p.classList.toggle("compact",view!=="guide"&&!(view==="exam"&&ExamView.onHome()));
  if(view==="exam"){p.innerHTML=`<div class="poster-in"><h2><span>Final exam</span> Three hours, 66 questions</h2><div class="poster-row"><div class="poster-data"><span><b>Section I</b> 60 multiple choice</span><span><b>Section II</b> 6 free response</span></div><div class="poster-scale"><i></i><span>90 + 90 minutes</span></div></div></div>`;return}
  const u=unit?UNITS[unit-1]:null;
  const q=u?u.q.length:UNITS.reduce((s,x)=>s+x.q.length,0),c=u?u.cards.length:UNITS.reduce((s,x)=>s+x.cards.length,0),f=u?u.frq.length:UNITS.reduce((s,x)=>s+x.frq.length,0);
  const title=u?`<span>Unit ${u.n}</span> ${esc(u.name)}`:`<span>All units</span> ${VIEW_NAME[view]}`;
  const vids=scopeUnits().flatMap(unitVideos);
  const data=(view==="guide"?[`<b>${u.w}</b> of the exam`,plural(u.topics.length,"topic")]:view==="videos"?[`<b>${vids.length}</b> videos`,runtime(vids)]:view==="practice"?[`<b>${q}</b> questions`]:view==="cards"?[`<b>${c}</b> cards`]:[`<b>${f}</b> prompts`]);
  if(u&&view!=="guide")data.unshift(`<b>${VIEW_NAME[view]}</b>`);
  const test=unit===4?u4Rows():"";
  p.innerHTML=`<div class="poster-in"><h2>${title}</h2>${test?`<div class="poster-test"><span class="tc-h">Unit 4 assessment</span><span class="tc-rows">${test}</span></div>`:""}<div class="poster-row"><div class="poster-data">${data.map(d=>`<span>${d}</span>`).join("")}</div>${u?`<div class="poster-scale"><i></i><span><b>${esc(u.scale)}</b> ${esc(u.scaleOf)}</span></div>`:""}</div></div>`;
}
function posterIn(){
  if(!G||still)return;
  const p=$("#poster"),sp=$("h2 span",p);
  G.killTweensOf([p,sp]);
  G.fromTo(p,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:.6,ease:"power3.out",clearProps:"clipPath"});
  if(sp)G.fromTo(sp,{fontStretch:"60%"},{fontStretch:"118%",duration:.8,ease:"power3.out",clearProps:"fontStretch"});
}

/* rail */
function railUnit(u,cur){
  const on=cur===u.n;
  return`<button class="r-unit" type="button" data-u="${u.n}" style="--sc:var(--u${u.n})" aria-current="${on}"><span>${u.n}. ${esc(u.short)}</span><small>${esc(u.w)}</small><span class="meter" aria-label="${unitDone(u)}% done"><i style="width:${unitDone(u)}%"></i></span></button>`;
}
function renderRail(){
  const r=$("#rail");
  if(view==="exam"){ExamView.rail(r);return}
  r.className="rail";
  let h="";
  if(view!=="guide")h+=`<button class="r-unit" type="button" data-u="0" aria-current="${!unit}"><span>All units</span><small>mixed</small></button>`;
  UNITS.forEach(u=>{
    h+=railUnit(u,unit);
    if(view==="guide"&&u.n===unit)h+=`<ul class="r-topics">${u.topics.map(t=>`<li><a href="#" data-t="${t[0]}"><span>${t[0]}</span><span>${esc(t[1])}</span></a></li>`).join("")}</ul>`;
  });
  r.innerHTML=h;
  $$(".r-unit",r).forEach(b=>b.onclick=()=>go(view,+b.dataset.u));
  $$(".r-topics a",r).forEach(a=>a.onclick=e=>{e.preventDefault();const s=document.getElementById("t"+a.dataset.t);if(s)scrollToEl(s)});
}
function refreshMeters(){$$(".r-unit[data-u]").forEach(b=>{const n=+b.dataset.u;if(!n)return;const u=UNITS[n-1],i=$(".meter i",b);if(i)i.style.width=unitDone(u)+"%"})}

/* study guide */
let spy=null;
function renderGuide(){
  const u=UNITS[unit-1],nx=UNITS[unit];
  $("#view").innerHTML=`<div class="col">${u.topics.map(t=>`<section class="topic" id="t${t[0]}" data-t="${t[0]}"><h2><span class="num">Topic ${t[0]}</span>${esc(t[1])}</h2>${topicVideo(u,t)}<div class="prose">${t[2]}</div></section>`).join("")}
  <div class="pager">
    <button class="btn small" type="button" id="toPractice">Practice ${u.q.length} questions on Unit ${u.n}</button>
    ${nx?`<button class="next-u" type="button" id="toNext" data-u="${nx.n}" style="--sc:var(--u${nx.n})"><span>Next, Unit ${nx.n}</span><b>${esc(nx.name)}</b></button>`
       :`<button class="next-u" type="button" id="toExam" data-u="0"><span>Last unit done. Next,</span><b>the final exam</b></button>`}
  </div></div>`;
  $("#toPractice").onclick=()=>go("practice",unit);
  bindVideos();
  if(nx)$("#toNext").onclick=()=>go("guide",nx.n);else $("#toExam").onclick=()=>go("exam");
  if("IntersectionObserver"in window){
    spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$(".r-topics a").forEach(a=>a.setAttribute("aria-current",a.dataset.t===e.target.dataset.t))}),{rootMargin:"-30% 0px -65% 0px"});
    $$(".topic").forEach(s=>spy.observe(s));
    revealDiagrams();
  }
}
function revealDiagrams(){
  if(!G||still)return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
    G.fromTo(e.target.querySelector("svg"),{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0% 0 0)",duration:.8,ease:"power2.out",clearProps:"clipPath"})}),{rootMargin:"0px 0px -12% 0px"});
  $$(".diagram").forEach(d=>{const r=d.getBoundingClientRect();if(r.top>innerHeight)io.observe(d)});
}

/* shared chips */
function topicChips(items){
  if(!unit)return"";
  const u=UNITS[unit-1],has=new Set(items);
  return`<div class="chips" role="group" aria-label="Filter by topic"><button class="chip" type="button" data-k="all" aria-pressed="${topic==="all"}">All topics</button>${u.topics.filter(t=>has.has(t[0])).map(t=>`<button class="chip" type="button" data-k="${t[0]}" aria-pressed="${topic===t[0]}">${t[0]} ${esc(t[1])}</button>`).join("")}</div>`;
}
function bindChips(after){$$(".chips .chip").forEach(c=>c.onclick=()=>{topic=c.dataset.k;cardI=0;flipped=false;flipDeg=0;askReset=false;const x=$(".chips").scrollLeft;after();const n=$(".chips");if(n)n.scrollLeft=x})}
const scopeUnits=()=>unit?[UNITS[unit-1]]:UNITS;

/* practice */
function qItems(){
  let out=[];
  scopeUnits().forEach(u=>u.q.forEach((q,i)=>{if(topic==="all"||q[0]===topic)out.push({id:`u${u.n}q${i}`,u:u.n,t:q[0],stem:q[1],opts:q[2],c:q[3],why:q[4]})}));
  if(seed)out=shuffled(out,"s"+seed);
  return out;
}
function optHTML(it,orig,k,picked){
  let cls="opt";
  if(picked!=null){if(orig===it.c)cls+=" right";else if(orig===picked)cls+=" wrong";else cls+=" dim"}
  return`<button class="${cls}" type="button" data-o="${orig}" ${picked!=null?"disabled":""}><span class="l">${"ABCD"[k]}</span><span>${esc(it.opts[orig])}</span></button>`;
}
function whyHTML(it,order,picked){
  const ok=picked===it.c;
  return`<div class="why ${ok?"ok":"no"}" role="status"><b>${ok?"Correct.":`Not quite. The answer is ${"ABCD"[order.indexOf(it.c)]}.`}</b>${esc(it.why)}</div>`;
}
function qHTML(it,n){
  const order=optOrder(it.stem,it.opts),picked=S.ans[it.id];
  return`<article class="q" data-id="${it.id}"><div class="meta">Question ${n}, topic ${it.t}</div><div class="stem">${esc(it.stem)}</div><div class="opts">${order.map((o,k)=>optHTML(it,o,k,picked)).join("")}</div>${picked!=null?whyHTML(it,order,picked):""}</article>`;
}
function tallyHTML(items){
  const a=items.filter(i=>S.ans[i.id]!=null),r=a.filter(i=>S.ans[i.id]===i.c).length;
  return`<b>${a.length}</b> of ${items.length} answered, <b>${r}</b> correct${a.length?` (${Math.round(r/a.length*100)}%)`:""}`;
}
function renderPractice(){
  const all=scopeUnits().flatMap(u=>u.q.map(q=>q[0]));
  const items=qItems(),missed=items.filter(i=>S.ans[i.id]!=null&&S.ans[i.id]!==i.c);
  const list=onlyMissed?missed:items;
  $("#view").innerHTML=`<div class="col">
    ${topicChips(all)}
    <div class="head"><div class="tally" id="tally" aria-live="polite">${tallyHTML(items)}</div></div>
    <div class="tools">
      <button class="btn small" type="button" id="shuf">${seed?"Original order":"Shuffle"}</button>
      <button class="btn small" type="button" id="miss" aria-pressed="${onlyMissed}">${onlyMissed?"Show all":`Only missed (${missed.length})`}</button>
      <button class="btn small" type="button" id="rst">Reset answers</button>
    </div>
    ${askReset?confirmHTML("Clear the answers for these questions?","Clear answers"):""}
    <div id="qlist">${list.length?list.map((it,i)=>qHTML(it,i+1)).join(""):`<div class="empty"><p>No missed questions here.</p></div>`}</div>
  </div>`;
  bindChips(renderPractice);
  $("#shuf").onclick=()=>{seed=seed?0:1+Math.floor(Math.random()*1e6);renderPractice()};
  $("#miss").onclick=()=>{onlyMissed=!onlyMissed;renderPractice()};
  $("#rst").onclick=()=>{askReset=true;renderPractice()};
  bindConfirm(()=>{items.forEach(i=>delete S.ans[i.id]);save();refreshMeters();renderPractice()},renderPractice);
  $("#qlist").onclick=e=>{
    const b=e.target.closest(".opt");if(!b||b.disabled)return;
    const art=b.closest(".q"),it=items.find(i=>i.id===art.dataset.id);if(!it)return;
    const orig=+b.dataset.o,order=optOrder(it.stem,it.opts);
    S.ans[it.id]=orig;save();
    $(".opts",art).innerHTML=order.map((o,k)=>optHTML(it,o,k,orig)).join("");
    art.insertAdjacentHTML("beforeend",whyHTML(it,order,orig));
    const why=$(".why",art),pickEl=$(`.opt[data-o="${orig}"]`,art);
    if(pickEl&&M&&!still){spring(.97,1,v=>{pickEl.style.transform=`scale(${v})`},{visualDuration:.25})}
    tween(why,{height:0,opacity:0},{height:"auto",opacity:1,duration:.28,ease:"power2.out"});
    $("#tally").innerHTML=tallyHTML(items);
    const ms=items.filter(i=>S.ans[i.id]!=null&&S.ans[i.id]!==i.c).length;
    if(!onlyMissed)$("#miss").textContent=`Only missed (${ms})`;
    refreshMeters();
  };
}
function confirmHTML(msg,yes){return`<div class="confirm" role="alertdialog" aria-label="${esc(msg)}"><p>${esc(msg)} This can't be undone.</p><div class="row"><button class="btn small" type="button" id="cfNo">Keep them</button><button class="btn small" type="button" id="cfYes">${esc(yes)}</button></div></div>`}
function bindConfirm(yes,again){
  const y=$("#cfYes"),n=$("#cfNo");if(!y)return;
  y.onclick=()=>{askReset=false;yes()};
  n.onclick=()=>{askReset=false;again()};
  n.focus({preventScroll:true});
}

/* flashcards */
function cardItems(){
  let out=[];
  scopeUnits().forEach(u=>u.cards.forEach((c,i)=>{if(topic==="all"||c[0]===topic)out.push({id:`u${u.n}c${i}`,u:u.n,t:c[0],term:c[1],def:c[2]})}));
  if(seed)out=shuffled(out,"s"+seed);
  return out;
}
function renderCards(){
  const all=scopeUnits().flatMap(u=>u.cards.map(c=>c[0]));
  const items=cardItems(),known=items.filter(i=>S.known[i.id]===1).length,list=onlyLearning?items.filter(i=>S.known[i.id]!==1):items;
  if(cardI>=list.length)cardI=0;
  const it=list[cardI];
  let body;
  if(!it)body=`<div class="empty"><p>You've marked every card here as known.</p><button class="btn small" type="button" id="showAll">Show all cards</button></div>`;
  else body=`<div class="deck"><button class="fc" type="button" id="fc" aria-label="Flip card"><span class="fc-f front" style="--c:var(--u${it.u})"><small>Topic ${it.t}</small><b>${esc(it.term)}</b></span><span class="fc-f back" data-lenis-prevent><small>${esc(it.term)}</small><p>${esc(it.def)}</p></span></button></div>
    <div class="fc-acts"><button class="btn" type="button" id="learn">Still learning</button><button class="btn know" type="button" id="know">Know it</button></div>
    <div class="fc-nav"><span class="tally"><b>${cardI+1}</b> of ${list.length}, <b>${known}</b> known</span><span class="tools" style="margin:0"><button class="btn small" type="button" id="prev" aria-label="Previous card">Back</button><button class="btn small" type="button" id="next" aria-label="Next card">Skip</button></span></div>`;
  $("#view").innerHTML=`<div class="col">
    ${topicChips(all)}
    <div class="tools">
      <button class="btn small" type="button" id="shuf">${seed?"Original order":"Shuffle"}</button>
      <button class="btn small" type="button" id="lrn" aria-pressed="${onlyLearning}">${onlyLearning?"Show all":`Only unlearned (${items.length-known})`}</button>
    </div>
    ${body}
    ${it&&!coarse?`<p class="keys">Space flips. 1 is still learning, 2 is know it. Arrow keys move.</p>`:""}
  </div>`;
  bindChips(renderCards);
  $("#shuf").onclick=()=>{seed=seed?0:1+Math.floor(Math.random()*1e6);cardI=0;flipped=false;flipDeg=0;renderCards()};
  $("#lrn").onclick=()=>{onlyLearning=!onlyLearning;cardI=0;flipped=false;flipDeg=0;renderCards()};
  if(!it){$("#showAll").onclick=()=>{onlyLearning=false;cardI=0;renderCards()};return}
  const fc=$("#fc");fc.style.transform=`rotateY(${flipDeg}deg)`;
  fc.onclick=flipCard;
  const step=d=>{cardI=(cardI+d+list.length)%list.length;flipped=false;flipDeg=0;if(flipAnim&&flipAnim.stop)flipAnim.stop();renderCards();tween($(".deck"),{x:d*22,opacity:.3},{x:0,opacity:1,duration:.24,ease:"power2.out"})};
  const mark=v=>{S.known[it.id]=v;save();refreshMeters();flipped=false;flipDeg=0;if(flipAnim&&flipAnim.stop)flipAnim.stop();if(onlyLearning&&v===1){renderCards()}else step(1)};
  $("#learn").onclick=()=>mark(0);$("#know").onclick=()=>mark(1);$("#prev").onclick=()=>step(-1);$("#next").onclick=()=>step(1);
  cardKeys=e=>{const k=e.key;if(k===" "&&e.target.closest("button")&&e.target.id!=="fc")return;if(k===" "){e.preventDefault();flipCard()}else if(k==="ArrowRight")step(1);else if(k==="ArrowLeft")step(-1);else if(k==="1")mark(0);else if(k==="2")mark(1)};
}
let cardKeys=null;
function flipCard(e){
  if(e&&e.preventDefault)e.preventDefault();
  const fc=$("#fc");if(!fc)return;
  flipped=!flipped;
  const from=flipDeg,to=flipped?180:0;
  if(flipAnim&&flipAnim.stop)flipAnim.stop();
  flipAnim=spring(from,to,v=>{flipDeg=v;fc.style.transform=`rotateY(${v}deg)`},{visualDuration:.45});
}
document.addEventListener("keydown",e=>{
  if(/^(TEXTAREA|INPUT)$/.test(e.target.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;
  if(view==="cards"&&cardKeys&&$("#fc"))cardKeys(e);
  else if(view==="exam"&&window.ExamView)ExamView.keys(e);
});

/* free response */
function renderFrq(){
  const all=scopeUnits().flatMap(u=>u.frq.map(f=>f[0]));
  const items=[];scopeUnits().forEach(u=>u.frq.forEach((f,i)=>{if(topic==="all"||f[0]===topic)items.push({id:`u${u.n}f${i}`,t:f[0],p:f[1],a:f[2]})}));
  const wrote=items.filter(i=>(S.frq[i.id]||"").trim()).length;
  $("#view").innerHTML=`<div class="col">
    ${topicChips(all)}
    <div class="head"><div class="tally"><b id="wrote">${wrote}</b> of ${items.length} started. Answers save in this browser.</div></div>
    ${items.map((it,n)=>`<article class="q" data-id="${it.id}"><div class="meta">Prompt ${n+1}, topic ${it.t}</div><div class="stem">${esc(it.p)}</div>
      <div class="field"><label for="a-${it.id}">Your answer</label><textarea id="a-${it.id}" data-lenis-prevent>${esc(S.frq[it.id]||"")}</textarea></div>
      <div><button class="btn small" type="button" data-show aria-expanded="${!!S.shown[it.id]}">${S.shown[it.id]?"Hide model answer":"Show model answer"}</button></div>
      <div class="model" ${S.shown[it.id]?"":"hidden"}><b>Model answer</b>${esc(it.a)}</div></article>`).join("")}
  </div>`;
  bindChips(renderFrq);
  $$("#view textarea").forEach(t=>t.oninput=()=>{const id=t.closest(".q").dataset.id;S.frq[id]=t.value;save();$("#wrote").textContent=items.filter(i=>(S.frq[i.id]||"").trim()).length;refreshMeters()});
  $$("#view [data-show]").forEach(b=>b.onclick=()=>{
    const q=b.closest(".q"),id=q.dataset.id,m=$(".model",q),show=m.hidden;
    m.hidden=!show;if(show)S.shown[id]=1;else delete S.shown[id];save();refreshMeters();
    b.textContent=show?"Hide model answer":"Show model answer";b.setAttribute("aria-expanded",show);
    if(show)tween(m,{opacity:0,y:-6},{opacity:1,y:0,duration:.22,ease:"power2.out"});
  });
}

/* videos: the GitHub Pages build plays them on the page. The artifact frame can't embed other sites, so there they're links to YouTube. */
const EMBED=!!window.EMBED_VIDEOS;
// One entry per video, so one that covers two topics (2.9 and 2.10) is listed once.
function unitVideos(u){
  const out=[];
  u.topics.forEach(t=>{
    const r=VIDEOS[t[0]];if(!r)return;
    const same=out.find(v=>v.id===r[0]);
    if(same){same.code+=" and "+t[0];same.title+=" / "+t[1]}
    else out.push({id:r[0],len:r[1],code:t[0],title:t[1],u:u.n});
  });
  return out;
}
function runtime(list){
  const m=Math.round(list.reduce((s,v)=>{const[a,b]=v.len.split(":");return s+ +a*60+ +b},0)/60);
  return m<60?`${m} min`:`${Math.floor(m/60)} h ${m%60} min`;
}
const ytLink=id=>`https://www.youtube.com/watch?v=${id}`;
function vidHTML(v,cls,name,sub){
  const thumb=`<span class="vid-thumb" aria-hidden="true">${EMBED?`<img src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" alt="" loading="lazy">`:`<span class="vid-code">${v.code.split(" ")[0]}</span>`}<span class="vid-go">${ICON_PLAY}</span><span class="vid-len">${v.len}</span></span>`;
  const body=`${thumb}<span class="vid-txt"><b>${name}</b>${sub?`<small>${sub}</small>`:""}</span>`;
  return EMBED?`<div class="vid ${cls}" style="--sc:var(--u${v.u})" data-v="${v.id}" data-n="${esc(v.code+" "+v.title)}"><button class="vid-btn" type="button">${body}</button></div>`
    :`<div class="vid ${cls}" style="--sc:var(--u${v.u})"><a class="vid-btn" href="${ytLink(v.id)}" target="_blank" rel="noopener">${body}</a></div>`;
}
function topicVideo(u,t){
  const r=VIDEOS[t[0]];if(!r)return"";
  const v=unitVideos(u).find(x=>x.id===r[0]);
  return vidHTML(v,"row",`Watch topic ${t[0]} with Gabe Poser`,`${v.len}${v.code.includes(" and ")?`, covers ${v.code}`:""}${EMBED?"":", opens YouTube"}`);
}
function playVideo(box){
  $$(".vid.playing").forEach(stopVideo);
  const id=box.dataset.v;
  box._tile=box.innerHTML;
  box.classList.add("playing");
  box.innerHTML=`<div class="vid-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${esc(box.dataset.n)}, video by Gabe Poser" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
    <div class="vid-under"><a href="${ytLink(id)}" target="_blank" rel="noopener">Open on YouTube</a><button class="btn small" type="button">Close video</button></div>`;
  $("button",box).onclick=()=>{stopVideo(box);$(".vid-btn",box).focus({preventScroll:true})};
  if(box.classList.contains("tile"))scrollToEl(box);
  tween(box,{opacity:0},{opacity:1,duration:.25,ease:"power2.out"});
}
function stopVideo(box){
  box.classList.remove("playing");
  box.innerHTML=box._tile;
  $(".vid-btn",box).onclick=()=>playVideo(box);
}
function bindVideos(){if(EMBED)$$(".vid-btn").forEach(b=>b.onclick=()=>playVideo(b.closest(".vid")))}
function renderVideos(){
  $("#view").innerHTML=`<div class="col wide">
    <p class="vid-credit">Every video is by <a href="${VIDEO_CHANNEL}" target="_blank" rel="noopener">Gabe Poser, PoseKnows Biology</a>, numbered to match the topics here. ${EMBED?"They play right on this page.":"They open on YouTube."}</p>
    ${scopeUnits().map(u=>`<section class="vid-unit"><div class="head">${unit?"":`<h3>Unit ${u.n}. ${esc(u.short)}</h3>`}<a class="btn small" href="https://www.youtube.com/playlist?list=${VIDEO_LISTS[u.n]}" target="_blank" rel="noopener">Play all of Unit ${u.n} on YouTube</a></div>
      <div class="vid-grid">${unitVideos(u).map(v=>vidHTML(v,"tile",`${v.code} ${esc(v.title)}`,"")).join("")}</div></section>`).join("")}
    ${unit?`<div class="pager"><button class="btn small" type="button" id="toPractice">Practice ${UNITS[unit-1].q.length} questions on Unit ${unit}</button></div>`:""}
  </div>`;
  bindVideos();
  if(unit)$("#toPractice").onclick=()=>go("practice",unit);
  if(G&&!still){const tl=G.from(".vid.tile",{y:16,opacity:0,duration:.4,stagger:.025,ease:"power2.out",clearProps:"all"});setTimeout(()=>tl.progress(1),1500)} // same guard as the hero: a hidden frame gets no ticks
}

/* intro */
const heroSeq=UNITS.map(u=>u.n).concat(0);
let heroU=6,auto=0,autoOff=false;
function setScale(n){
  const u=n?UNITS[n-1]:null;
  $("#scaleV").textContent=u?u.scale:"66 questions";
  $("#scaleT").textContent=u?u.scaleOf:"on the three-hour final exam";
}
function showUnit(n){
  heroU=n;setChannel(n);setScale(n);
  if(window.Field)Field.to(n?UNITS[n-1].form:FORM_EXAM);
  $$(".sbtn").forEach(b=>b.classList.toggle("on",+b.dataset.u===n));
}
function stopAuto(){clearInterval(auto);auto=0}
function startAuto(){
  if(still||autoOff||auto)return;
  auto=setInterval(()=>{if(document.hidden)return;const i=heroSeq.indexOf(heroU);showUnit(heroSeq[(i+1)%heroSeq.length])},4200);
}
function buildIntro(){
  const q=UNITS.reduce((s,u)=>s+u.q.length,0),c=UNITS.reduce((s,u)=>s+u.cards.length,0),f=UNITS.reduce((s,u)=>s+u.frq.length,0),t=UNITS.reduce((s,u)=>s+u.topics.length,0);
  $("#lede").textContent=`Every unit in the current course: ${t} topics, ${UNITS.flatMap(unitVideos).length} videos, ${q} practice questions, ${c} flashcards, ${f} free-response prompts, and a timed final exam.`;
  const lastU=S.lastUnit;
  $("#ctaStart").textContent=lastU?`Continue Unit ${lastU}`:"Start with Unit 1";
  $("#ctaStart").onclick=()=>go(S.view&&S.view!=="exam"?S.view:"guide",lastU||1);
  $("#ctaExam").onclick=()=>go("exam");
  const days=Math.ceil((new Date(2027,4,3,8)-Date.now())/864e5);
  $("#countdown").textContent=days>0?`${days} days until the exam on May 3, 2027`:"";
  paintU4Test();
  $("#strip").innerHTML=UNITS.map(u=>`<button class="sbtn" type="button" data-u="${u.n}" style="--sc:var(--u${u.n})"><small>Unit ${u.n}</small>${esc(u.short)}</button>`).join("")+`<button class="sbtn" type="button" data-u="0"><small>66 Qs</small>Final exam</button>`;
  $$(".sbtn").forEach(b=>{
    const n=+b.dataset.u;
    const peek=()=>{autoOff=true;stopAuto();showUnit(n)};
    b.onpointerenter=e=>{if(e.pointerType==="mouse")peek()};
    b.onfocus=peek;
    b.onclick=()=>n?go("guide",n):go("exam");
  });
  $("#steps").innerHTML=UNITS.map(u=>`<section class="step" data-u="${u.n}" style="--sc:var(--u${u.n})"><div class="step-in" style="--sc:var(--u${u.n})">
    <h2><span>Unit ${u.n}</span>${esc(u.name)}</h2><p>${BLURB[u.n]}</p>
    <div class="data"><span><b>${esc(u.w)}</b> of the exam</span><span><b>${esc(u.scale)}</b> ${esc(u.scaleOf)}</span></div>
    <div class="data"><span>${plural(u.topics.length,"topic")}</span><span>${unitVideos(u).length} videos</span><span>${u.q.length} questions</span><span>${u.cards.length} cards</span><span>${u.frq.length} FRQs</span></div>
    <button class="btn solid" type="button" data-open="${u.n}">Open Unit ${u.n}</button></div></section>`).join("")
    +`<section class="step" data-u="0"><div class="step-in"><h2><span>Final exam</span>Three hours, 66 questions</h2><p>Section I is 60 multiple-choice questions. Section II is 6 free-response questions. Both are timed, in the current College Board format, with a rough AP score at the end.</p>
    <div class="data"><span><b>90 + 90</b> minutes</span><span><b>50%</b> each section</span></div>
    <button class="btn solid" type="button" data-open="0">Open the exam</button></div></section>
    <div class="step-end" id="stepEnd" aria-hidden="true"></div>`;
  $$("[data-open]").forEach(b=>b.onclick=()=>{const n=+b.dataset.open;n?go("guide",n):go("exam")});
  setScale(heroU);
  $$(".sbtn").forEach(b=>b.classList.toggle("on",+b.dataset.u===heroU));
}
function watchIntro(){
  const zone=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    const t=e.target;
    if(t.id==="hero"){if(!autoOff)startAuto();showUnit(heroU)}
    else if(t.id==="study"){stopAuto();setChannel(studyChannel())}
    else{stopAuto();showUnit(+t.dataset.u)}
  }),{rootMargin:"-49% 0px -49% 0px"});
  zone.observe($("#hero"));$$(".step").forEach(s=>zone.observe(s));zone.observe($("#study"));
  scrubOn();
}
let scrubs=[];
function scrubOn(){
  if(!G||!ST||still||scrubs.length)return;
  scrubs.push(ST.create({trigger:"#stepEnd",start:"top 75%",end:"bottom top",scrub:true,onUpdate:s=>Field.setZoom(s.progress*s.progress*3.05)}));
  $$(".step h2 span").forEach(s=>scrubs.push(G.fromTo(s,{fontStretch:"62%"},{fontStretch:"125%",ease:"none",scrollTrigger:{trigger:s.closest(".step"),start:"top 85%",end:"top 30%",scrub:.4}})));
}
function scrubOff(){
  scrubs.forEach(x=>{if(x.scrollTrigger)x.scrollTrigger.kill();x.kill()});scrubs=[];
  if(G)G.set(".step h2 span",{clearProps:"fontStretch"});
  if(window.Field)Field.setZoom(0);
}
function heroIn(){
  if(!G||still)return;
  const tl=G.timeline({defaults:{ease:"power3.out"}})
   .from("h1 .ln>span",{yPercent:105,duration:.8,stagger:.08})
   .from("#lede",{y:14,opacity:0,duration:.5},.35)
   .from(".cta,#u4Test",{y:14,opacity:0,duration:.5,clearProps:"all"},.45)
   .from("#strip",{y:28,opacity:0,duration:.6,clearProps:"all"},.5);
  setTimeout(()=>tl.progress(1),1500); // a hidden frame gets no animation ticks, so never leave the headline parked
}

/* start */
if(window.Field){Field.setStill(still);try{if(!Field.init($("#field")))$("#stage").classList.add("no-gl")}catch(e){$("#stage").classList.add("no-gl")}}
if(!coarse&&window.Field)addEventListener("pointermove",e=>Field.pointer(e.clientX/innerWidth-.5,e.clientY/innerHeight-.5),{passive:true});
paintMode();
paintMotion();
buildIntro();
const first=parseHash(location.hash);
try{history.scrollRestoration="manual"}catch(e){}
addEventListener("load",()=>{if(ST)ST.refresh()});
setInterval(tickU4,1000);
addEventListener("hashchange",()=>{const r=parseHash(location.hash);if(r&&(r.v!==view||(r.u!==undefined&&r.u!==unit)))go(r.v,r.u)});
let booted=false;
document.addEventListener("DOMContentLoaded",boot);
if(document.readyState!=="loading")boot();
function boot(){
  if(booted)return;booted=true;
  if(first){view=first.v;if(first.u!==undefined)unit=first.u}
  if(view==="guide"&&!unit)unit=S.lastUnit||1;
  markTabs();movePill(false);
  renderAll();
  watchIntro();
  if(first){setChannel(studyChannel());requestAnimationFrame(()=>scrollToY(studyTop(),true))}
  else{window.scrollTo(0,0);setChannel(heroU);heroIn();startAuto()}
}
