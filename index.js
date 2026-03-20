
/* ── Cursor ── */
const cur=document.getElementById('cur');
const ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function loop(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();
document.querySelectorAll('a,button,.stat,.pill').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.5)';cur.style.background='var(--lime)';ring.style.width='52px';ring.style.height='52px';ring.style.borderColor='rgba(184,255,87,.5)'});
  el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';cur.style.background='var(--cyan)';ring.style.width='36px';ring.style.height='36px';ring.style.borderColor='rgba(0,229,255,.4)'});
});

/* ── Scroll mouse tracker ── */
const scrollMouse=document.getElementById('scroll-mouse');
const smouseBody=document.getElementById('smouse-body');
window.addEventListener('scroll',()=>{
  const s=window.scrollY;
  const pct=Math.min(s/(document.body.scrollHeight-window.innerHeight),1);
  s>60?scrollMouse.classList.add('visible'):scrollMouse.classList.remove('visible');
  smouseBody.style.top=(window.innerHeight*.08+(window.innerHeight*.8-36)*pct)+'px';
});

/* ── Particles ── */
const pc=document.getElementById('canvas-particles');
const ctx=pc.getContext('2d');
let PW,PH;
function resizeP(){PW=pc.width=window.innerWidth;PH=pc.height=window.innerHeight}
resizeP();window.addEventListener('resize',resizeP);
class Dot{
  constructor(){this.reset(true)}
  reset(r){
    this.x=r?Math.random()*PW:(Math.random()<.5?-5:PW+5);
    this.y=r?Math.random()*PH:Math.random()*PH;
    this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;
    this.r=Math.random()*1.6+.3;this.a=Math.random()*.5+.08;
    const n=Math.random();this.col=n>.8?'#ff3d7f':n>.55?'#b8ff57':'#00e5ff';
  }
  update(){
    const dx=this.x-mx,dy=this.y-my,d=Math.sqrt(dx*dx+dy*dy);
    if(d<140){const f=(140-d)/140;this.x+=dx/d*f*4;this.y+=dy/d*f*4}
    this.x+=this.vx;this.y+=this.vy;
    if(this.x<-20||this.x>PW+20||this.y<-20||this.y>PH+20)this.reset(false);
  }
  draw(){
    ctx.save();ctx.globalAlpha=this.a;ctx.shadowBlur=10;ctx.shadowColor=this.col;
    ctx.fillStyle=this.col;ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fill();ctx.restore();
  }
}
const dots=[];
for(let i=0;i<200;i++)dots.push(new Dot());
function drawLines(){
  for(let i=0;i<dots.length;i++)for(let j=i+1;j<dots.length;j++){
    const dx=dots[i].x-dots[j].x,dy=dots[i].y-dots[j].y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<95){ctx.save();ctx.globalAlpha=(1-d/95)*.1;ctx.strokeStyle='#00e5ff';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(dots[i].x,dots[i].y);ctx.lineTo(dots[j].x,dots[j].y);ctx.stroke();ctx.restore()}
  }
}
function animLoop(){ctx.clearRect(0,0,PW,PH);dots.forEach(d=>{d.update();d.draw()});drawLines();requestAnimationFrame(animLoop)}
animLoop();

/* ── Typewriter ── */
(function(){
  const el=document.getElementById('typewriter');
  const lines=[
    'Building fast,scalable web & mobile experiences.',
    'Node.js  ·  React.js  ·  MySQL  ·  AWS Cloud',
    'Full Stack Developer with 2+ year of experience.',
    'Clean code. Great UX. Ships on time.',
    'Open to new opportunities worldwide.',
    'Deploying scalable solutions.',
  ];
  let li=0,ci=0,deleting=false;
  const typeSpeed=48,deleteSpeed=24,pauseEnd=1600,pauseStart=300;
  function hi(s){
    return s.replace(/(fast, scalable|AWS Cloud|Full Stack|Clean code|Great UX|Ships on time|worldwide|Deploying|scalable|solutions|2\+ year)/g,'<b style="color:var(--text);font-weight:400">$1</b>')
             .replace(/(Node\.js|React\.js|MySQL)/g,'<b style="color:var(--text);font-weight:400">$1</b>');
  }
  function tick(){
    const line=lines[li];
    if(!deleting){
      el.innerHTML=hi(line.slice(0,ci+1));ci++;
      if(ci===line.length){setTimeout(()=>{deleting=true;tick()},pauseEnd);return}
      setTimeout(tick,typeSpeed);
    } else {
      el.innerHTML=hi(line.slice(0,ci-1));ci--;
      if(ci===0){deleting=false;li=(li+1)%lines.length;setTimeout(tick,pauseStart);return}
      setTimeout(tick,deleteSpeed);
    }
  }
  setTimeout(tick,1200);
})();

/* ── Code card lit ── */
const codeCard=document.querySelector('.code-card');
if(codeCard){
  new IntersectionObserver(en=>{
    en.forEach(e=>{if(e.isIntersecting)codeCard.classList.add('lit')});
  },{threshold:.3}).observe(codeCard);
}

/* ── Mobile menu ── */
function toggleMenu(){
  const m=document.getElementById('mobile-menu'),b=document.getElementById('hamburger');
  m.classList.toggle('open');b.classList.toggle('open');
  document.body.style.overflow=m.classList.contains('open')?'hidden':'';
}
function closeMenu(){
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow='';
}

/* ── Magnetic buttons ── */
document.querySelectorAll('.mag').forEach(el=>{
  el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-(r.left+r.width/2))*.16}px,${(e.clientY-(r.top+r.height/2))*.16}px)`});
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

/* ── Generic reveal ── */
const obs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')})},{threshold:.1});
document.querySelectorAll('.rv').forEach(r=>obs.observe(r));

/* ── Smooth hash links ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t)t.scrollIntoView({behavior:'smooth'});
  });
});

(function initTimelineFill(){
  const items = Array.from(document.querySelectorAll('.resume-item'));
  if(!items.length) return;

  function updateFills(){
    const vh = window.innerHeight;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemH = rect.height;

      const startY = vh * 0.85;
      const endY   = vh * 0.15;

      const traveled = startY - rect.top;
      const total    = startY - endY + itemH;
      const raw      = Math.min(Math.max(traveled / total, 0), 1);

      item.style.setProperty('--fill', raw);

      if(raw > 0.05){
        item.classList.add('in-view');
      } else {
        item.classList.remove('in-view');
      }
    });
  }

  window.addEventListener('scroll', updateFills, { passive: true });
  window.addEventListener('resize', updateFills, { passive: true });

  updateFills();
})();
