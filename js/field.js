// The particle field: one set of points that re-forms into each unit's subject. Raw WebGL, no scene library.
const Field=(()=>{
const small=Math.min(innerWidth,innerHeight)<700;
const N=small?7000:18000;
let still=false;

function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const TAU=Math.PI*2;

function ball(R){let x,y,z;do{x=R()*2-1;y=R()*2-1;z=R()*2-1}while(x*x+y*y+z*z>1);return[x,y,z]}
function shell(R){const u=R()*2-1,t=R()*TAU,s=Math.sqrt(1-u*u);return[s*Math.cos(t),s*Math.sin(t),u]}

const makers={
water(p,R,n){ // H-bonded water cluster: one O and two H per molecule
  const g=[];for(let x=-3;x<=3;x++)for(let y=-3;y<=3;y++)for(let z=-2;z<=2;z++){const a=[x*.3+(R()-.5)*.1,y*.3+(R()-.5)*.1,z*.3+(R()-.5)*.1];if(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]<1.3)g.push(a)}
  const per=Math.floor(n*.94/g.length);
  g.forEach(c=>{
    const u=shell(R),v0=shell(R),d=u[0]*v0[0]+u[1]*v0[1]+u[2]*v0[2],v=[v0[0]-d*u[0],v0[1]-d*u[1],v0[2]-d*u[2]],l=Math.hypot(...v)||1;
    const a=.91,h1=[],h2=[];for(let i=0;i<3;i++){const e=v[i]/l;h1[i]=c[i]+.105*(u[i]*Math.cos(a)+e*Math.sin(a));h2[i]=c[i]+.105*(u[i]*Math.cos(a)-e*Math.sin(a))}
    for(let i=0;i<per;i++){const f=i/per;let C=c,r=.066,ch=0;if(f>.62){C=f>.81?h1:h2;r=.038;ch=1}const b=ball(R);p(C[0]+b[0]*r,C[1]+b[1]*r,C[2]+b[2]*r,ch,.55+R()*.4)}
  });
},
cell(p,R,n){
  for(let i=0;i<n*.34;i++){const s=shell(R),w=1+.018*Math.sin(s[0]*9+s[1]*7)+(R()-.5)*.012;p(s[0]*w*1.06,s[1]*w*.98,s[2]*w,0,.45+R()*.45)}
  for(let i=0;i<n*.22;i++){const s=shell(R),r=.36+R()*.05*R();p(s[0]*r-.18,s[1]*r+.08,s[2]*r,1,.5+R()*.5)}
  for(let i=0;i<n*.06;i++){const b=ball(R);p(b[0]*.1-.12,b[1]*.1+.12,b[2]*.1,1,.95)}
  for(let i=0;i<n*.12;i++){const s=shell(R),r=.47+.05*Math.sin(s[0]*14+s[2]*10);p(s[0]*r-.18,s[1]*r+.08,s[2]*r,0,.25+R()*.35)} // ER folds
  for(let m=0;m<16;m++){const c=shell(R),rad=.56+R()*.3,o=[c[0]*rad,c[1]*rad,c[2]*rad],d=shell(R);for(let i=0;i<n*.016;i++){const t=(R()-.5)*.2,s=shell(R),w=.04;p(o[0]+d[0]*t+s[0]*w,o[1]+d[1]*t+s[1]*w,o[2]+d[2]*t+s[2]*w,1,.6+R()*.4)}}
},
chloroplast(p,R,n){
  const E=[1.3,.68,.68];
  for(let i=0;i<n*.26;i++){const s=shell(R),w=1+(R()<.5?0:.03);p(s[0]*E[0]*w,s[1]*E[1]*w,s[2]*E[2]*w,0,.3+R()*.4)}
  const stacks=[];for(let k=0;k<13;k++){stacks.push([-1+k*.165+(R()-.5)*.05,(R()-.5)*.56,(R()-.5)*.56])}
  const each=Math.floor(n*.6/stacks.length/8);
  stacks.forEach(s=>{const r=.13+R()*.05,top=s[1]-.1;for(let d=0;d<8;d++){const y=top+d*.032;for(let i=0;i<each;i++){const a=R()*TAU,q=Math.sqrt(R())*r;p(s[0]+Math.cos(a)*q,y,s[2]+Math.sin(a)*q,1,.45+R()*.5)}}});
  for(let i=0;i<n*.1;i++){const a=stacks[Math.floor(R()*12)],b=stacks[stacks.indexOf(a)+1],t=R();p(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t+(R()-.5)*.02,a[2]+(b[2]-a[2])*t,1,.3+R()*.3)} // lamellae
},
spindle(p,R,n){
  const pole=[-1.1,1.1],targets=[];for(let i=0;i<46;i++){const a=R()*TAU,r=Math.sqrt(R())*.68;targets.push([(R()-.5)*.05,Math.cos(a)*r,Math.sin(a)*r])}
  const fibers=170,pf=Math.floor(n*.5/fibers);
  for(let f=0;f<fibers;f++){const px=pole[f%2],t=targets[f%46],bx=px*.45,by=t[1]*1.25,bz=t[2]*1.25;for(let i=0;i<pf;i++){const u=R(),v=1-u,x=v*v*px+2*v*u*bx+u*u*t[0],y=2*v*u*by+u*u*t[1],z=2*v*u*bz+u*u*t[2];p(x+(R()-.5)*.008,y+(R()-.5)*.008,z+(R()-.5)*.008,0,.25+R()*.5)}}
  for(let i=0;i<n*.14;i++){const px=pole[i%2],s=shell(R),r=R()*R()*.42;p(px+s[0]*r,s[1]*r,s[2]*r,0,.5+R()*.5)} // asters
  const per=Math.floor(n*.34/46);targets.forEach(t=>{const a=R()*TAU;for(let i=0;i<per;i++){const u=(R()-.5)*.17,w=R()<.5?-1:1;p(t[0]+w*.02+(R()-.5)*.018,t[1]+Math.cos(a)*u+(R()-.5)*.018,t[2]+Math.sin(a)*u+(R()-.5)*.018,1,.6+R()*.4)}});
},
chromosome(p,R,n){
  function arm(cx,cy,ang,len,ch,tip,pts){for(let i=0;i<pts;i++){const t=R(),a=R()*TAU,w=.1*(1-Math.pow(t,6))*(.35+.65*Math.min(1,t*6)),ww=w*(.6+.4*Math.sqrt(R())),coil=Math.sin(t*44+a)*.012,l=t*len,x=cx+Math.cos(ang)*l-Math.sin(ang)*(Math.cos(a)*ww+coil),y=cy+Math.sin(ang)*l+Math.cos(ang)*(Math.cos(a)*ww+coil),z=Math.sin(a)*ww,band=.45+.5*Math.abs(Math.sin(t*19+cx*3));p(x,y,z,t>tip?1-ch:ch,band)}}
  const each=Math.floor(n/8),dd=.17;
  [[-.58,0],[.58,0]].forEach(([cx,cy],k)=>{
    const ch=k;
    arm(cx,cy,Math.PI/2+dd,.95,ch,k?.62:2,each);arm(cx,cy,Math.PI/2-dd,.95,ch,2,each);
    arm(cx,cy,-Math.PI/2+dd,.62,ch,2,each);arm(cx,cy,-Math.PI/2-dd,.62,ch,k?2:.55,each);
  });
},
helix(p,R,n){
  const H=1.28,r=.4,turns=2.7;
  for(let i=0;i<n*.56;i++){const y=(R()*2-1)*H,a=y/H*turns*Math.PI,s=i%2?0:Math.PI,jr=.03,b=ball(R);p(Math.cos(a+s)*r+b[0]*jr,y+b[1]*jr,Math.sin(a+s)*r+b[2]*jr,0,.5+R()*.5)}
  const rungs=46,per=Math.floor(n*.42/rungs);
  for(let k=0;k<rungs;k++){const y=-H+(k+.5)/rungs*2*H,a=y/H*turns*Math.PI,ch=k%2;for(let i=0;i<per;i++){const t=R()*2-1,b=ball(R);p(Math.cos(a)*r*t+b[0]*.012,y+b[1]*.012,Math.sin(a)*r*t+b[2]*.012,ch,.3+R()*.55)}}
},
tree(p,R,n){
  const seg=[];
  for(let k=0;k<3;k++){(function grow(x,y,z,a,e,len,depth){const nx=x+Math.cos(a)*Math.cos(e)*len,ny=y+Math.sin(a)*Math.cos(e)*len,nz=z+Math.sin(e)*len;seg.push([x,y,z,nx,ny,nz,depth,len]);if(depth>0){const sp=.42+R()*.22;grow(nx,ny,nz,a+sp,e+(R()-.5)*.55,len*.77,depth-1);grow(nx,ny,nz,a-sp,e+(R()-.5)*.55,len*.77,depth-1)}})(0,0,0,k*TAU/3+.5,(R()-.5)*.2,.3,6)}
  const total=seg.reduce((s,a)=>s+a[7],0),tips=seg.filter(s=>s[6]===0),tipPts=Math.floor(n*.25/tips.length);
  seg.forEach(s=>{const c=Math.floor(n*.72*s[7]/total);for(let i=0;i<c;i++){const t=R(),j=.006+.012*s[6]/6;p(s[0]+(s[3]-s[0])*t+(R()-.5)*j,s[1]+(s[4]-s[1])*t+(R()-.5)*j,s[2]+(s[5]-s[2])*t+(R()-.5)*j,0,.4+R()*.4)}});
  tips.forEach(s=>{for(let i=0;i<tipPts;i++){const b=ball(R);p(s[3]+b[0]*.035,s[4]+b[1]*.035,s[5]+b[2]*.035,1,.6+R()*.4)}});
},
pyramid(p,R,n){
  const tiers=[[1.02,-.62,.3,.62,0],[.66,-.27,.3,.24,0],[.39,.08,.3,.1,1],[.19,.43,.3,.04,1]];
  tiers.forEach(([r,y,h,f,ch])=>{for(let i=0;i<n*f;i++){const a=R()*TAU,q=Math.sqrt(R())*r,e=R()<.3?1:0,qq=e?r:q;p(Math.cos(a)*qq,y+R()*h,Math.sin(a)*qq,ch,(e?.65:.35)+R()*.35)}});
},
sheet(p,R,n){ // answer sheet: 60 rows of four bubbles
  const per=Math.floor(n/240),cols=[-.86,-.14,.58];
  for(let c=0;c<3;c++)for(let r=0;r<20;r++){const pick=Math.floor(R()*4);for(let b=0;b<4;b++){const x=cols[c]+b*.118,y=.92-r*.097,f=b===pick;for(let i=0;i<per;i++){const a=R()*TAU,q=f?Math.sqrt(R())*.036:.034+(R()-.5)*.005;p(x+Math.cos(a)*q,y+Math.sin(a)*q,(R()-.5)*.012,f?1:0,f?.9:.4+R()*.3)}}}
}};

const look={
water:{spin:.1,rx:.25,roll:0,c:{dark:["#5AA2FF","#E6F2FF"],light:["#1D4FBF","#7A2E8E"]}},
cell:{spin:.16,rx:.2,roll:0,c:{dark:["#3DE386","#5E8BFF"],light:["#C2186B","#3B1E91"]}},
chloroplast:{spin:.14,rx:.28,roll:.22,c:{dark:["#50E08A","#FF5A6E"],light:["#0B7F4C","#C2203E"]}},
spindle:{spin:.12,rx:.1,roll:-.1,c:{dark:["#38E0D2","#7A8CFF"],light:["#007784","#3B1E91"]}},
chromosome:{spin:.12,rx:.08,roll:.08,c:{dark:["#F277E4","#54D6FF"],light:["#A5158F","#135FB8"]}},
helix:{spin:.32,rx:.08,roll:.42,c:{dark:["#FFD83F","#FF7A59"],light:["#8A6200","#C2203E"]}},
tree:{spin:.1,rx:.32,roll:0,c:{dark:["#FF9A45","#FFE28A"],light:["#B24F00","#7C3A00"]}},
pyramid:{spin:.15,rx:.3,roll:0,c:{dark:["#B7E545","#FFF18A"],light:["#587A00","#A36E00"]}},
sheet:{spin:0,rx:-.32,roll:-.1,c:{dark:["#AEB9C6","#FFFFFF"],light:["#7A7088","#1B1426"]}}
};

const cache={};
function positions(name){
  if(cache[name])return cache[name];
  const R=rng(name.length*7919+name.charCodeAt(0)),a=new Float32Array(N*4);let i=0;
  const p=(x,y,z,ch=0,b=.7)=>{if(i<N){a[i*4]=x;a[i*4+1]=y;a[i*4+2]=z;a[i*4+3]=ch*2+Math.min(.99,b);i++}};
  makers[name](p,R,N);
  const filled=i||1;while(i<N){const k=Math.floor(R()*filled)*4;p(a[k],a[k+1],a[k+2],Math.floor(a[k+3]/2),.3)}
  for(let k=N-1;k>0;k--){const j=Math.floor(R()*(k+1));for(let c=0;c<4;c++){const t=a[k*4+c];a[k*4+c]=a[j*4+c];a[j*4+c]=t}}
  return cache[name]=a;
}

let gl,prog,U={},bufA,bufB,seeds,canvas,dpr=1,raf=0,visible=true,mode="dark";
let curA,curB,name="helix",mix=1,mixStart=0,mixDur=0,time=0,last=0;
let ry=.6,rx=.08,roll=.42,spin=.32,zoom=0,dragV=0,pxOff=0,pyOff=0,pxCur=0,pyCur=0;
let colA=[[1,1,1],[1,1,1]],colB=[[1,1,1],[1,1,1]];
const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);

const VS=`attribute vec4 aA;attribute vec4 aB;attribute vec3 aS;
uniform float uM,uT,uZ,uPx,uAl;uniform vec2 uK,uShift;uniform vec3 uR;uniform vec3 uA0,uA1,uB0,uB1;
varying vec3 vC;varying float vA;
void main(){
float d=.6,t=clamp(uM*(1.+d)-aS.x*d,0.,1.);t=t*t*(3.-2.*t);
vec3 p=mix(aA.xyz,aB.xyz,t);float arc=sin(t*3.14159);
p+=arc*.3*vec3(sin(aS.y*6.28+uT*.6),cos(aS.y*9.+uT*.5),sin(aS.x*12.+uT*.4));
p+=.005*vec3(sin(uT*1.7+aS.y*50.),cos(uT*1.3+aS.x*70.),sin(uT*1.1+aS.z*90.));
float cy=cos(uR.y),sy=sin(uR.y),cx=cos(uR.x),sx=sin(uR.x),cz=cos(uR.z),sz=sin(uR.z);
p=vec3(cy*p.x+sy*p.z,p.y,-sy*p.x+cy*p.z);p=vec3(p.x,cx*p.y-sx*p.z,sx*p.y+cx*p.z);p=vec3(cz*p.x-sz*p.y,sz*p.x+cz*p.y,p.z);
float w=max(3.4-uZ-p.z,.04);vec2 s=p.xy/w*3.1;
gl_Position=vec4(s.x*uK.x+uShift.x,s.y*uK.y+uShift.y,0.,1.);
float chA=floor(aA.w/2.),chB=floor(aB.w/2.),bA=aA.w-2.*chA,bB=aB.w-2.*chB,b=mix(bA,bB,t);
vC=mix(mix(uA0,uA1,chA),mix(uB0,uB1,chB),t);
float near=clamp((w-.25)/.5,0.,1.),fog=clamp(1.15-(w-2.2)*.42,.35,1.);
vA=uAl*b*fog*near;
gl_PointSize=min(uPx*aS.z*(.75+b*.7)/w,70.);
}`;
const FS=`precision mediump float;varying vec3 vC;varying float vA;
void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,.1,d);if(a<.01)discard;gl_FragColor=vec4(vC,a*vA);}`;

function compile(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}

function init(c){
  canvas=c;
  gl=c.getContext("webgl",{antialias:false,alpha:false,powerPreference:"high-performance"});
  if(!gl){c.closest(".stage")?.classList.add("no-gl");return false}
  prog=gl.createProgram();gl.attachShader(prog,compile(gl.VERTEX_SHADER,VS));gl.attachShader(prog,compile(gl.FRAGMENT_SHADER,FS));gl.linkProgram(prog);gl.useProgram(prog);
  ["uM","uT","uZ","uPx","uAl","uK","uShift","uR","uA0","uA1","uB0","uB1"].forEach(k=>U[k]=gl.getUniformLocation(prog,k));
  const R=rng(42);seeds=new Float32Array(N*3);for(let i=0;i<N;i++){seeds[i*3]=R();seeds[i*3+1]=R();seeds[i*3+2]=.55+R()*R()*1.5}
  const sb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,sb);gl.bufferData(gl.ARRAY_BUFFER,seeds,gl.STATIC_DRAW);
  const aS=gl.getAttribLocation(prog,"aS");gl.enableVertexAttribArray(aS);gl.vertexAttribPointer(aS,3,gl.FLOAT,false,0,0);
  bufA=gl.createBuffer();bufB=gl.createBuffer();
  curA=positions("helix");curB=curA;upload(bufA,"aA",curA);upload(bufB,"aB",curB);
  gl.enable(gl.BLEND);
  readTheme();
  colA=colorsOf(name);colB=colorsOf(name);
  resize();
  if("ResizeObserver"in window)new ResizeObserver(resize).observe(c);else addEventListener("resize",resize);
  new IntersectionObserver(e=>{visible=e[0].isIntersecting;kick()}).observe(c.closest(".stage"));
  document.addEventListener("visibilitychange",kick);
  const a=look[name];spin=a.spin;rx=a.rx;roll=a.roll;
  raf=requestAnimationFrame(frame);
  return true;
}
function upload(buf,attr,data){const loc=gl.getAttribLocation(prog,attr);gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,data,gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,4,gl.FLOAT,false,0,0)}
function colorsOf(n){return look[n].c[mode].map(hex)}
function readTheme(){
  const cs=getComputedStyle(document.documentElement);
  mode=cs.getPropertyValue("--mode").trim()||"dark";
  bg=hex(cs.getPropertyValue("--bg").trim()||"#06080c");
  if(gl){if(mode==="dark")gl.blendFunc(gl.SRC_ALPHA,gl.ONE);else gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA)}
}
let bg=[.02,.03,.05];
function retheme(){readTheme();if(!gl)return;colA=colorsOf(name);colB=colorsOf(name);kick()}
function kick(){if(gl&&visible&&!raf&&!document.hidden){last=performance.now();raf=requestAnimationFrame(frame)}}
function setStill(v){still=v;kick()}
function resize(){
  if(!gl)return;
  dpr=Math.min(devicePixelRatio||1,small?1.5:2);
  const w=canvas.clientWidth,h=canvas.clientHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);gl.viewport(0,0,canvas.width,canvas.height);
  kick();
}
function bakeCurrent(){ // freeze a morph in progress so the next one starts from what's on screen
  const out=new Float32Array(N*4),d=.6;
  for(let i=0;i<N;i++){let t=Math.min(1,Math.max(0,mix*(1+d)-seeds[i*3]*d));t=t*t*(3-2*t);const k=i*4;for(let c=0;c<3;c++)out[k+c]=curA[k+c]+(curB[k+c]-curA[k+c])*t;out[k+3]=t>.5?curB[k+3]:curA[k+3]}
  return out;
}
function to(next,dur=1.5){
  if(!gl||!look[next]||next===name)return;
  const done=mix>=1;
  const nextA=done?curB:bakeCurrent();
  colA=done?colB:colA.map((c,i)=>c.map((v,j)=>v+(colB[i][j]-v)*mix));
  curA=nextA;curB=positions(next);name=next;colB=colorsOf(next);
  upload(bufA,"aA",curA);upload(bufB,"aB",curB);
  mix=still?1:0;mixStart=performance.now();mixDur=still?.001:dur*1000;
  kick();
}
function setZoom(z){zoom=z}
function nudge(dx){dragV+=dx}
function pointer(x,y){pxOff=x;pyOff=y}
function frame(now){
  raf=0;if(!visible||document.hidden)return;
  const dt=Math.min(.05,(now-last)/1000);last=now;time+=dt;
  if(mix<1){const t=Math.min(1,(now-mixStart)/mixDur);mix=t}
  const a=look[name],k=1-Math.pow(.02,dt);
  spin+=(a.spin-spin)*k;rx+=(a.rx-rx)*k;roll+=(a.roll-roll)*k;
  if(!still)ry+=spin*dt;
  ry+=dragV;dragV*=Math.pow(.02,dt);
  pxCur+=(pxOff-pxCur)*k*.6;pyCur+=(pyOff-pyCur)*k*.6;
  const W=canvas.clientWidth||1,H=canvas.clientHeight||1,asp=W/H,wide=asp>1.05;
  const kk=wide?[1/asp,1]:[1,asp];const fit=wide?.72:Math.min(.92,.5+asp*.42);
  gl.useProgram(prog);
  gl.clearColor(bg[0],bg[1],bg[2],1);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform1f(U.uM,mix);gl.uniform1f(U.uT,still?0:time);gl.uniform1f(U.uZ,zoom);
  gl.uniform1f(U.uPx,(wide?8.4:6.4)*dpr*(small?1.2:1)*Math.max(.8,Math.min(1.25,H/820)));
  gl.uniform1f(U.uAl,mode==="dark"?(wide?.9:.72):1);
  gl.uniform2f(U.uK,kk[0]*fit,kk[1]*fit);
  gl.uniform2f(U.uShift,wide?.42:0,wide?.05:.38);
  gl.uniform3f(U.uR,rx+pyCur*.12,ry+pxCur*.18,roll);
  gl.uniform3fv(U.uA0,colA[0]);gl.uniform3fv(U.uA1,colA[1]);gl.uniform3fv(U.uB0,colB[0]);gl.uniform3fv(U.uB1,colB[1]);
  gl.drawArrays(gl.POINTS,0,N);
  if(!still||mix<1)raf=requestAnimationFrame(frame); // a still field draws once and waits for the next change
}
return{init,to,setZoom,nudge,pointer,retheme,setStill,get name(){return name}};
})();
window.Field=Field;
