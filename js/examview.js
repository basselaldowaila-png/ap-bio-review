// The final exam tab: Section I with an answer sheet, Section II with a plotting tool, self-scoring and a rough AP estimate.
window.ExamView=(()=>{
const FRQ_TOTAL=EXAM_FRQ.reduce((s,f)=>s+f.pts,0);
const LETTERS="ABCD",SECONDS=5400;
const X=()=>S.exam||(S.exam={mc:{picks:{},flags:{},left:SECONDS,cur:0,started:false,done:false},frq:{text:{},plot:[{},{}],left:SECONDS,cur:0,started:false,done:false,rub:{}}});
let screen="home",asking=null,missedOnly=true,series=0,clock=0,mapOpen=false;

const pad=n=>String(n).padStart(2,"0");
function fmt(s){const t=Math.max(0,Math.ceil(s));return`${Math.floor(t/3600)}:${pad(Math.floor(t%3600/60))}:${pad(t%60)}`}
function stopClock(){clearInterval(clock);clock=0}
function startClock(sec,finish){
  stopClock();let last=Date.now(),n=0;
  clock=setInterval(()=>{
    if(view!=="exam"){stopClock();return}
    const now=Date.now();sec.left=Math.max(0,sec.left-(now-last)/1000);last=now;
    const c=$("#clock");if(c){c.textContent=fmt(sec.left);c.classList.toggle("low",sec.left<300)}
    if(++n%5===0)save();
    if(sec.left<=0){stopClock();finish(true)}
  },1000);
}
function toTop(){const l=$("#layout");if(l.getBoundingClientRect().top<barH())scrollToEl(l,true)}
function open(sc){screen=sc;asking=null;stopClock();refresh();scrollToY(studyTop(),true);posterIn()}
function refresh(){const r=$("#rail"),t=r.scrollTop;renderPoster();rail(r);r.scrollTop=t;render()}
function repaintRail(){const r=$("#rail"),t=r.scrollTop;rail(r);r.scrollTop=t}
function ask(msg,yes,no,onYes,onNo){return{msg,yes,no,onYes,onNo}}
function askHTML(){return asking?`<div class="confirm" role="alertdialog" aria-label="Confirm"><p>${esc(asking.msg)}</p><div class="row"><button class="btn small" type="button" id="cfNo">${esc(asking.no)}</button><button class="btn small" type="button" id="cfYes">${esc(asking.yes)}</button></div></div>`:""}
function bindAsk(){
  const y=$("#cfYes"),n=$("#cfNo");if(!y)return;
  const a=asking;
  y.onclick=()=>{asking=null;a.onYes()};
  n.onclick=()=>{asking=null;(a.onNo||render)()};
  n.focus({preventScroll:true});
  y.closest(".confirm").scrollIntoView({block:"nearest"});
}

/* scoring */
const mcRight=()=>{const x=X().mc;return EXAM_MC.reduce((s,q,i)=>s+(x.picks[i]===q[3]?1:0),0)};
const frqPts=()=>{const x=X().frq;return EXAM_FRQ.reduce((s,f)=>s+f.rubric.reduce((a,r,i)=>a+(x.rub[`${f.n}-${i}`]?r[0]:0),0),0)};
const composite=()=>mcRight()/EXAM_MC.length*50+frqPts()/FRQ_TOTAL*50;
const apEst=c=>c>=65?5:c>=52?4:c>=40?3:c>=28?2:1;

/* rail */
function sheetHTML(results){
  const x=X().mc;
  return`<div class="sheet" role="group" aria-label="Answer sheet">${EXAM_MC.map((q,i)=>{
    const order=optOrder(q[1],q[2]),p=x.picks[i],k=p==null?-1:order.indexOf(p);
    let cls="s-row";if(results)cls+=p===q[3]?" good":" miss";else if(x.flags[i])cls+=" flag";
    const lab=`Question ${i+1}${p!=null?", answered "+LETTERS[k]:", blank"}${!results&&x.flags[i]?", marked for review":""}`;
    return`<button class="${cls}" type="button" data-i="${i}" aria-label="${lab}" ${!results&&i===x.cur?'aria-current="true"':""}><span class="n">${i+1}</span>${[0,1,2,3].map(b=>`<i class="bb${b===k?" f":""}"></i>`).join("")}</button>`}).join("")}</div>`;
}
function mapHTML(results){
  const x=X().mc,answered=Object.keys(x.picks).length;
  return`<details class="map" ${mapOpen?"open":""}><summary>Question map, ${answered} of ${EXAM_MC.length} answered</summary><div class="grid-nav">${EXAM_MC.map((q,i)=>{
    let cls="g-n";if(results)cls+=x.picks[i]===q[3]?" good":" miss";else{if(x.picks[i]!=null)cls+=" f";if(x.flags[i])cls+=" flag"}
    return`<button class="${cls}" type="button" data-i="${i}" ${!results&&i===x.cur?'aria-current="true"':""}>${i+1}</button>`}).join("")}</div></details>`;
}
function navHTML(){
  const x=X();
  const row=(id,name,note)=>`<button class="r-unit" type="button" data-sc="${id}" data-u="0" aria-current="${screen===id}"><span>${name}</span><small>${note}</small></button>`;
  return`<div class="ex-nav">${row("home","Overview","")}${row("mc","Section I",x.mc.done?"done":x.mc.started?"open":"")}${row("frq","Section II",x.frq.done?"done":x.frq.started?"open":"")}${row("results","Results","")}</div>`;
}
function rail(r){
  const x=X();
  r.className="rail ex-rail";
  if(screen==="mc"&&!x.mc.done){
    r.classList.add("live");
    r.innerHTML=`<div class="ex-side"><div class="ex-bar"><span class="timer" id="clock" role="timer" aria-label="Time left">${fmt(x.mc.left)}</span><button class="btn small" type="button" id="leave">Save and leave</button><button class="btn small" type="button" id="sub">Submit Section I</button></div>${sheetHTML(false)}${mapHTML(false)}</div>`;
    $("#leave",r).onclick=()=>{save();open("home")};
    $("#sub",r).onclick=askSubmitMC;
    bindJump(r,i=>{x.mc.cur=i;asking=null;render();repaintRail();toTop()});
  }else if(screen==="frq"&&!x.frq.done){
    r.classList.add("live");
    r.innerHTML=`<div class="ex-side"><div class="ex-bar"><span class="timer" id="clock" role="timer" aria-label="Time left">${fmt(x.frq.left)}</span><button class="btn small" type="button" id="leave">Save and leave</button><button class="btn small" type="button" id="sub">Submit Section II</button></div></div>`;
    $("#leave",r).onclick=()=>{save();open("home")};
    $("#sub",r).onclick=askSubmitFRQ;
  }else{
    r.innerHTML=`<div class="ex-side">${navHTML()}${screen==="results"&&x.mc.done?sheetHTML(true)+mapHTML(true):""}</div>`;
    $$("[data-sc]",r).forEach(b=>b.onclick=()=>enter(b.dataset.sc));
    bindJump(r,i=>{if(!$("#rv-"+i)){missedOnly=false;render()}const t=$("#rv-"+i);if(t)scrollToEl(t,true)});
  }
  const m=$(".map",r);if(m)m.ontoggle=()=>{mapOpen=m.open};
}
function bindJump(r,fn){$$("[data-i]",r).forEach(b=>b.onclick=()=>fn(+b.dataset.i))}
function enter(sc){
  const x=X();
  if(sc==="mc"){if(x.mc.done)return open("results");x.mc.started=true}
  if(sc==="frq"){if(x.frq.done)return open("results");x.frq.started=true}
  save();open(sc);
}

/* overview */
function renderHome(){
  const x=X(),mc=x.mc,fr=x.frq,ans=Object.keys(mc.picks).length,wrote=Object.values(fr.text).filter(t=>t.trim()).length;
  const counts=UNITS.map(u=>({u,n:EXAM_MC.filter(q=>q[0]===u.n).length})),peak=Math.max(...counts.map(c=>c.n));
  const mcState=mc.done?`Scored, ${mcRight()} of ${EXAM_MC.length} correct`:mc.started?`${ans} of ${EXAM_MC.length} answered, ${fmt(mc.left)} left`:"Not started";
  const frState=fr.done?`Submitted, ${frqPts()} of ${FRQ_TOTAL} points so far`:fr.started?`${wrote} answers started, ${fmt(fr.left)} left`:"Not started";
  $("#view").innerHTML=`<div class="col wide">
    <div class="exam-lead"><p class="big">A full practice exam in the current College Board format. Each section takes 90 minutes and counts for half of your score.</p>
    <p class="notes">The clock runs only while a section is open, and your place is saved in this browser, so you can stop and come back.</p></div>
    <div class="specs">
      <section class="spec"><h3>Section I, multiple choice</h3><ul><li>60 questions in 90 minutes</li><li>Single questions, plus sets of 4 that share data or a model</li><li>No feedback until you submit, and no penalty for guessing</li></ul><p class="state">${mcState}</p><button class="btn solid" type="button" id="goMc">${mc.done?"Review Section I":mc.started?"Resume Section I":"Start Section I"}</button></section>
      <section class="spec"><h3>Section II, free response</h3><ul><li>2 long questions at 9 points each, one with a graph</li><li>4 short questions at 4 points each</li><li>You score your answers with a rubric after you submit</li></ul><p class="state">${frState}</p><button class="btn solid" type="button" id="goFr">${fr.done?"Score Section II":fr.started?"Resume Section II":"Start Section II"}</button></section>
    </div>
    <h3 class="sec-title">Section I questions by unit</h3>
    <div class="bars">${counts.map(c=>`<div class="barrow" style="--sc:var(--u${c.u.n})"><span>${esc(c.u.short)}</span><span class="track"><i style="width:${c.n/peak*100}%"></i></span><span class="v">${c.n} Qs, ${esc(c.u.w)}</span></div>`).join("")}</div>
    <p class="notes">Percentages are College Board's unit weights. On the real exam you answer multiple choice in the Bluebook app and handwrite free responses in a paper booklet, so try writing Section II by hand at least once. Calculators are allowed.</p>
    <div class="tools" style="margin-top:20px"><button class="btn small" type="button" id="toRes">See results</button><button class="btn small" type="button" id="rst">Reset the exam</button></div>
    ${askHTML()}
  </div>`;
  $("#goMc").onclick=()=>enter("mc");$("#goFr").onclick=()=>enter("frq");$("#toRes").onclick=()=>open("results");
  $("#rst").onclick=askReset;bindAsk();
  $$(".barrow i").forEach((b,i)=>tween(b,{scaleX:0,transformOrigin:"0 50%"},{scaleX:1,duration:.5,delay:i*.03,ease:"power2.out"}));
}
function askResetFor(){asking=ask("Clear all of your exam answers, notes and scores? This can't be undone.","Clear the exam","Keep them",()=>{delete S.exam;save();open("home")});render()}
const askReset=askResetFor;

/* Section I */
function askSubmitMC(){
  const x=X().mc,blank=EXAM_MC.length-Object.keys(x.picks).length,marked=Object.keys(x.flags).filter(k=>x.flags[k]).length;
  asking=ask(`Submit Section I? You have ${blank} blank and ${marked} marked for review. You can't change answers after this.`,"Submit Section I","Keep working",()=>finishMC(false));
  render();
}
function finishMC(timedOut){const x=X().mc;x.done=true;x.timedOut=!!timedOut;stopClock();save();open("results")}
function renderMC(){
  const x=X().mc;
  if(x.done){screen="results";return refresh()}
  const i=x.cur,q=EXAM_MC[i],order=optOrder(q[1],q[2]),pick=x.picks[i];
  let stim="";
  if(q[5]){
    const idx=EXAM_MC.map((m,j)=>m[5]===q[5]?j:-1).filter(j=>j>=0),s=STIMS[q[5]];
    stim=`<section class="stim"><h4>Questions ${idx[0]+1} to ${idx[idx.length-1]+1} use this information</h4><div class="prose">${s.h}</div></section>`;
  }
  $("#view").innerHTML=`<div class="col ex-q">${stim}
    <div class="ex-num">Question ${i+1} of ${EXAM_MC.length}</div>
    <div class="stem">${esc(q[1])}</div>
    <div class="opts">${order.map((o,k)=>`<button class="opt${pick===o?" picked":""}" type="button" data-o="${o}" aria-pressed="${pick===o}"><span class="l">${LETTERS[k]}</span><span>${esc(q[2][o])}</span></button>`).join("")}</div>
    <div class="ex-acts"><button class="btn small flagb" type="button" id="flag" aria-pressed="${!!x.flags[i]}">${x.flags[i]?"Marked for review":"Mark for review"}</button>
      <span class="sp"><button class="btn small" type="button" id="back" ${i?"":"disabled"}>Back</button>${i<EXAM_MC.length-1?`<button class="btn small nx" type="button" id="next">Next</button>`:`<button class="btn small nx" type="button" id="finish">Submit Section I</button>`}</span></div>
    ${askHTML()}
    ${coarse?"":`<p class="keys">Press A to D to answer, M to mark, and the arrow keys to move.</p>`}
  </div>`;
  $$(".opt").forEach(b=>b.onclick=()=>pickMC(+b.dataset.o));
  $("#flag").onclick=toggleFlag;
  $("#back").onclick=()=>moveMC(-1);
  const n=$("#next");if(n)n.onclick=()=>moveMC(1);else $("#finish").onclick=askSubmitMC;
  bindAsk();
  if(!clock)startClock(x,finishMC);
}
function pickMC(o){
  const x=X().mc,i=x.cur;x.picks[i]=o;save();
  $$(".opt").forEach(b=>{const on=+b.dataset.o===o;b.classList.toggle("picked",on);b.setAttribute("aria-pressed",on)});
  const el=$(`.opt[data-o="${o}"]`);if(el)spring(.975,1,v=>{el.style.transform=`scale(${v})`},{visualDuration:.25});
  repaintRail();
}
function toggleFlag(){const x=X().mc,i=x.cur;x.flags[i]=!x.flags[i];save();const f=$("#flag");f.setAttribute("aria-pressed",x.flags[i]);f.textContent=x.flags[i]?"Marked for review":"Mark for review";repaintRail()}
function moveMC(d){const x=X().mc,n=x.cur+d;if(n<0||n>=EXAM_MC.length)return;x.cur=n;asking=null;save();render();repaintRail();toTop();tween($(".ex-q .stem"),{opacity:.25},{opacity:1,duration:.2})}
function keys(e){
  if(screen!=="mc"||X().mc.done)return;
  const k=e.key.toLowerCase();
  if("abcd".includes(k)&&k.length===1){const q=EXAM_MC[X().mc.cur],o=optOrder(q[1],q[2])["abcd".indexOf(k)];if(o!=null)pickMC(o)}
  else if(k==="m")toggleFlag();
  else if(k==="arrowright")moveMC(1);
  else if(k==="arrowleft")moveMC(-1);
}

/* Section II */
function askSubmitFRQ(){
  asking=ask("Submit Section II? You'll then score your answers with the rubric, and your written answers lock.","Submit Section II","Keep working",()=>finishFRQ(false));
  render();
}
function finishFRQ(timedOut){const x=X().frq;x.done=true;x.timedOut=!!timedOut;stopClock();save();open("results")}
function renderFRQ(){
  const x=X().frq;
  if(x.done){screen="results";return refresh()}
  const f=EXAM_FRQ[x.cur];
  const has=q=>q.parts.some((_,k)=>(x.text[`${q.n}-${k}`]||"").trim())||(q.graph&&Object.keys(x.plot[0]).length+Object.keys(x.plot[1]).length>0);
  $("#view").innerHTML=`<div class="col ex-q">
    <div class="f-tabs" role="group" aria-label="Questions">${EXAM_FRQ.map((q,i)=>`<button class="f-tab${has(q)?" done":""}" type="button" data-f="${i}" ${i===x.cur?'aria-current="true"':""}>Q${q.n}, ${q.pts} pts</button>`).join("")}</div>
    <div class="ex-num">Question ${f.n} of ${EXAM_FRQ.length}, about ${f.mins} minutes. ${esc(f.kind)}</div>
    <div class="prose">${f.stem}</div>
    ${f.parts.map((p,k)=>`<div class="f-part">${f.graph&&k===0?`<p class="plabel">${esc(p)}</p>${plotHTML(f.graph,x.plot,false)}`:`<label for="fa-${f.n}-${k}">${esc(p)}</label><textarea id="fa-${f.n}-${k}" data-k="${f.n}-${k}" data-lenis-prevent>${esc(x.text[`${f.n}-${k}`]||"")}</textarea>`}</div>`).join("")}
    <div class="ex-acts"><span class="sp"><button class="btn small" type="button" id="back" ${x.cur?"":"disabled"}>Back</button>${x.cur<EXAM_FRQ.length-1?`<button class="btn small nx" type="button" id="next">Next question</button>`:`<button class="btn small nx" type="button" id="finish">Submit Section II</button>`}</span></div>
    ${askHTML()}
  </div>`;
  const move=d=>{x.cur+=d;asking=null;save();render();toTop()};
  $$(".f-tab").forEach(b=>b.onclick=()=>{x.cur=+b.dataset.f;asking=null;save();render();toTop()});
  $("#back").onclick=()=>move(-1);
  const n=$("#next");if(n)n.onclick=()=>move(1);else $("#finish").onclick=askSubmitFRQ;
  $$("#view textarea").forEach(t=>t.oninput=()=>{x.text[t.dataset.k]=t.value;save()});
  if(f.graph)bindPlot(f.graph,x.plot);
  bindAsk();
  if(!clock)startClock(x,finishFRQ);
}

/* click-to-plot graph */
const P={w:600,h:360,l:62,r:18,t:16,b:52};
const COL=["var(--s1)","var(--s2)"];
function mark(s,x,y,extra=""){return s===0?`<circle cx="${x}" cy="${y}" r="5.5" fill="${COL[0]}" stroke="var(--surface)" stroke-width="2" ${extra}/>`:`<rect x="${x-5.5}" y="${y-5.5}" width="11" height="11" rx="1.5" fill="${COL[1]}" stroke="var(--surface)" stroke-width="2" ${extra}/>`}
function hollow(s,x,y){return s===0?`<circle cx="${x}" cy="${y}" r="8" fill="none" stroke="${COL[0]}" stroke-width="1.5"/>`:`<rect x="${x-8}" y="${y-8}" width="16" height="16" rx="2" fill="none" stroke="${COL[1]}" stroke-width="1.5"/>`}
function plotSVG(g,plot,showKey){
  const x0=g.x[0],x1=g.x[g.x.length-1];
  const sx=v=>P.l+(v-x0)/(x1-x0)*(P.w-P.l-P.r),sy=v=>P.h-P.b-v/g.yMax*(P.h-P.t-P.b);
  let h=`<svg id="plot" viewBox="0 0 ${P.w} ${P.h}" role="img" aria-label="Graph of ${esc(g.yLabel)} against ${esc(g.xLabel)}. Tap to place a point for the selected series.">`;
  for(let y=0;y<=g.yMax;y+=10)h+=`<line x1="${P.l}" x2="${P.w-P.r}" y1="${sy(y)}" y2="${sy(y)}" stroke="var(--line)" stroke-width="1"/><text class="ax" x="${P.l-8}" y="${sy(y)+4}" text-anchor="end">${y}</text>`;
  g.x.forEach(v=>{h+=`<line x1="${sx(v)}" x2="${sx(v)}" y1="${P.t}" y2="${P.h-P.b}" stroke="var(--line)" stroke-width="1" opacity=".5"/><text class="ax" x="${sx(v)}" y="${P.h-P.b+18}" text-anchor="middle">${v}</text>`});
  h+=`<text class="ax" x="${(P.l+P.w-P.r)/2}" y="${P.h-10}" text-anchor="middle">${esc(g.xLabel)}</text><text class="ax" transform="translate(16 ${(P.t+P.h-P.b)/2}) rotate(-90)" text-anchor="middle">${esc(g.yLabel)}</text>`;
  if(showKey)g.series.forEach((s,k)=>{h+=`<polyline points="${s.v.map((v,i)=>`${sx(g.x[i])},${sy(v)}`).join(" ")}" fill="none" stroke="${COL[k]}" stroke-width="1.5" stroke-dasharray="3 4"/>`;s.v.forEach((v,i)=>{h+=hollow(k,sx(g.x[i]),sy(v))})});
  g.series.forEach((s,k)=>{
    const pts=Object.keys(plot[k]).map(Number).sort((a,b)=>a-b);
    if(pts.length>1)h+=`<polyline points="${pts.map(i=>`${sx(g.x[i])},${sy(plot[k][i])}`).join(" ")}" fill="none" stroke="${COL[k]}" stroke-width="2"/>`;
    pts.forEach(i=>{h+=mark(k,sx(g.x[i]),sy(plot[k][i]))});
  });
  if(!showKey)h+=`<g id="xh" visibility="hidden"><line id="xhV" y1="${P.t}" y2="${P.h-P.b}" stroke="var(--muted)" stroke-width="1"/><line id="xhH" x1="${P.l}" x2="${P.w-P.r}" stroke="var(--muted)" stroke-width="1"/></g>`;
  return h+`</svg>`;
}
function plotHTML(g,plot,showKey){
  const legend=g.series.map((s,k)=>showKey?`<span class="lg-i"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">${k===0?`<circle cx="7" cy="7" r="5" fill="${COL[0]}"/>`:`<rect x="2" y="2" width="10" height="10" rx="1.5" fill="${COL[1]}"/>`}</svg>${esc(s.name)}</span>`
    :`<button class="chip lg-i" type="button" data-s="${k}" aria-pressed="${series===k}"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">${k===0?`<circle cx="7" cy="7" r="5" fill="${COL[0]}"/>`:`<rect x="2" y="2" width="10" height="10" rx="1.5" fill="${COL[1]}"/>`}</svg>${esc(s.name)}</button>`).join("");
  return`<div class="plot"><div class="plot-tools">${legend}${showKey?`<span class="tally">Your points are solid. The correct points are hollow and dashed.</span>`:`<span class="tally" id="readout" aria-live="off">Pick a series, then tap the graph</span><button class="btn small" type="button" id="plotClear">Clear</button>`}</div><div class="plot-wrap" id="plotWrap">${plotSVG(g,plot,showKey)}</div></div>`;
}
function bindPlot(g,plot){
  const x0=g.x[0],x1=g.x[g.x.length-1],wrap=$("#plotWrap");
  const toPoint=e=>{
    const svg=$("#plot"),m=svg.getScreenCTM();if(!m)return null;
    const px=(e.clientX-m.e)/m.a,py=(e.clientY-m.f)/m.d;
    if(px<P.l-14||px>P.w-P.r+14||py<P.t-14||py>P.h-P.b+14)return null;
    const v=x0+(px-P.l)/(P.w-P.l-P.r)*(x1-x0);
    let idx=0;g.x.forEach((t,i)=>{if(Math.abs(t-v)<Math.abs(g.x[idx]-v))idx=i});
    const y=Math.max(0,Math.min(g.yMax,Math.round((P.h-P.b-py)/(P.h-P.t-P.b)*g.yMax)));
    return{idx,y};
  };
  const draw=()=>{wrap.innerHTML=plotSVG(g,plot,false);renderBind()};
  function renderBind(){
    const svg=$("#plot");
    svg.onclick=e=>{const p=toPoint(e);if(!p)return;plot[series][p.idx]=p.y;save();draw();$("#readout").textContent=`${g.series[series].name}: ${g.xLabel.split(" ")[0]} ${g.x[p.idx]}, ${p.y} placed`};
    svg.onpointermove=e=>{
      if(e.pointerType!=="mouse")return;
      const p=toPoint(e),xh=$("#xh");if(!xh)return;
      if(!p){xh.setAttribute("visibility","hidden");return}
      const X_=P.l+(g.x[p.idx]-x0)/(x1-x0)*(P.w-P.l-P.r),Y_=P.h-P.b-p.y/g.yMax*(P.h-P.t-P.b);
      xh.setAttribute("visibility","visible");
      $("#xhV").setAttribute("x1",X_);$("#xhV").setAttribute("x2",X_);$("#xhH").setAttribute("y1",Y_);$("#xhH").setAttribute("y2",Y_);
      $("#readout").textContent=`${g.series[series].name}: ${g.xLabel.split(" ")[0]} ${g.x[p.idx]}, ${p.y}`;
    };
    svg.onpointerleave=()=>{const xh=$("#xh");if(xh)xh.setAttribute("visibility","hidden")};
  }
  renderBind();
  $$(".plot-tools [data-s]").forEach(b=>b.onclick=()=>{series=+b.dataset.s;$$(".plot-tools [data-s]").forEach(c=>c.setAttribute("aria-pressed",+c.dataset.s===series))});
  $("#plotClear").onclick=()=>{plot[0]={};plot[1]={};save();draw()};
}

/* results */
function scoreTiles(){
  const x=X(),both=x.mc.done&&x.frq.done,c=composite();
  return`<div><b>${x.mc.done?`${mcRight()}/${EXAM_MC.length}`:"--"}</b><span>Section I${x.mc.done?`, ${Math.round(mcRight()/EXAM_MC.length*100)}%`:", not submitted"}</span></div>
  <div><b>${x.frq.done?`${frqPts()}/${FRQ_TOTAL}`:"--"}</b><span>Section II${x.frq.done?`, scored by you`:", not submitted"}</span></div>
  <div><b>${both?`${Math.round(c)}%`:"--"}</b><span>Combined, each section half</span></div>
  <div class="ap"><b>${both?apEst(c):"--"}</b><span>${both?"Rough AP score estimate":"AP estimate after both sections"}</span></div>`;
}
function renderResults(){
  const x=X(),mc=x.mc,fr=x.frq;
  let h=`<div class="col wide"><div class="score" id="tiles">${scoreTiles()}</div>
    <p class="notes" style="margin-bottom:24px">The AP estimate is only a rough guide. College Board doesn't publish a fixed cutoff, and the score scale changes from year to year.</p>`;
  if(!mc.done&&!fr.done)h+=`<div class="empty"><p>Nothing has been submitted yet.</p><button class="btn small" type="button" id="goHome">Go to the overview</button></div>`;
  else{
    if(!mc.done)h+=`<div class="tools"><button class="btn small" type="button" id="goMc">${mc.started?"Resume":"Start"} Section I</button></div>`;
    if(!fr.done)h+=`<div class="tools"><button class="btn small" type="button" id="goFr">${fr.started?"Resume":"Start"} Section II</button></div>`;
  }
  if(mc.done)h+=reviewMC();
  if(fr.done)h+=reviewFRQ();
  if(mc.done||fr.done)h+=`<div class="tools" style="margin-top:32px"><button class="btn small" type="button" id="rst">Reset the exam and retake it</button></div>`;
  h+=askHTML()+`</div>`;
  $("#view").innerHTML=h;
  const on=(id,fn)=>{const e=$("#"+id);if(e)e.onclick=fn};
  on("goHome",()=>open("home"));on("goMc",()=>enter("mc"));on("goFr",()=>enter("frq"));on("rst",askReset);
  on("togMiss",()=>{missedOnly=!missedOnly;render()});
  if(fr.done){
    $$("#view .rub input").forEach(c=>c.onchange=()=>{const k=c.dataset.r;if(c.checked)fr.rub[k]=1;else delete fr.rub[k];save();$("#tiles").innerHTML=scoreTiles();const b=c.closest(".rub").querySelector(".sum");if(b)b.textContent=rubSum(EXAM_FRQ.find(f=>f.n===+c.dataset.n))});
  }
  bindAsk();
  $$(".barrow i").forEach(b=>tween(b,{scaleX:0,transformOrigin:"0 50%"},{scaleX:1,duration:.5,ease:"power2.out"}));
}
function rubSum(f){const x=X().frq,got=f.rubric.reduce((a,r,i)=>a+(x.rub[`${f.n}-${i}`]?r[0]:0),0);return`${got} of ${f.pts} points`}
function reviewMC(){
  const x=X().mc;
  const byU=UNITS.map(u=>{const idx=EXAM_MC.map((q,i)=>q[0]===u.n?i:-1).filter(i=>i>=0),r=idx.filter(i=>x.picks[i]===EXAM_MC[i][3]).length;return{u,r,n:idx.length}});
  const list=EXAM_MC.map((q,i)=>i).filter(i=>!missedOnly||x.picks[i]!==EXAM_MC[i][3]);
  return`<h3 class="sec-title">Section I by unit</h3>
  ${x.timedOut?`<p class="notes" style="margin-bottom:12px">Time ran out, so this section was submitted automatically.</p>`:""}
  <div class="bars">${byU.map(b=>`<div class="barrow" style="--sc:var(--u${b.u.n})"><span>${esc(b.u.short)}</span><span class="track"><i style="width:${b.n?b.r/b.n*100:0}%"></i></span><span class="v">${b.r}/${b.n}</span></div>`).join("")}</div>
  <div class="head" style="margin-top:32px"><h3 class="sec-title" style="margin:0">Review answers</h3><button class="btn small" type="button" id="togMiss">${missedOnly?"Show all 60":"Show only missed"}</button></div>
  ${list.length?list.map(reviewItem).join(""):`<div class="empty"><p>You didn't miss any.</p></div>`}`;
}
function reviewItem(i){
  const x=X().mc,q=EXAM_MC[i],order=optOrder(q[1],q[2]),p=x.picks[i],ok=p===q[3];
  return`<article class="rv" id="rv-${i}"><div class="ex-num" style="margin:0">Question ${i+1}, Unit ${q[0]}</div>
    ${q[5]?`<details class="stimd"><summary>Show the shared information</summary><div class="prose">${STIMS[q[5]].h}</div></details>`:""}
    <div class="stem">${esc(q[1])}</div>
    <div class="opts">${order.map((o,k)=>`<button class="opt ${o===q[3]?"right":o===p?"wrong":"dim"}" type="button" disabled><span class="l">${LETTERS[k]}</span><span>${esc(q[2][o])}</span></button>`).join("")}</div>
    <div class="why ${ok?"ok":"no"}"><b>${ok?"Correct.":p==null?`Left blank. The answer is ${LETTERS[order.indexOf(q[3])]}.`:`The answer is ${LETTERS[order.indexOf(q[3])]}.`}</b>${esc(q[4])}</div></article>`;
}
function reviewFRQ(){
  const x=X().frq;
  return`<h3 class="sec-title" style="margin-top:40px">Score Section II</h3><p class="notes" style="margin-bottom:12px">Check each rubric line your answer earned. Your total updates at the top of the page.</p>
  ${x.timedOut?`<p class="notes" style="margin-bottom:12px">Time ran out, so this section was submitted automatically.</p>`:""}
  ${EXAM_FRQ.map(f=>`<article class="rv"><div class="ex-num" style="margin:0">Question ${f.n}, ${f.pts} points. ${esc(f.kind)}</div>
    <details class="stimd"><summary>Show the prompt</summary><div class="prose">${f.stem}</div></details>
    ${f.parts.map((p,k)=>{const t=(x.text[`${f.n}-${k}`]||"").trim();return`<div class="f-part" style="margin:0"><p class="plabel">${esc(p)}</p>${f.graph&&k===0?plotHTML(f.graph,x.plot,true):`<p class="ans${t?"":" blank"}">${t?esc(t):"Left blank"}</p>`}</div>`}).join("")}
    <div class="rub"><h4>Rubric, <span class="sum">${rubSum(f)}</span></h4>${f.rubric.map((r,i)=>`<label><input type="checkbox" data-r="${f.n}-${i}" data-n="${f.n}" ${x.rub[`${f.n}-${i}`]?"checked":""}><span>${esc(r[1])}</span></label>`).join("")}</div></article>`).join("")}`;
}

function render(){
  if(screen==="mc")renderMC();
  else if(screen==="frq")renderFRQ();
  else if(screen==="results"){stopClock();renderResults()}
  else{stopClock();renderHome()}
}
return{render,rail,keys,onHome:()=>screen==="home"};
})();
