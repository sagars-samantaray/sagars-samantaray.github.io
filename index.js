
(function(){
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (e.ctrlKey && ['u','s','a'].includes(key)) { e.preventDefault(); return; }
    if (e.ctrlKey && e.shiftKey && ['i','j','c'].includes(key)) { e.preventDefault(); return; }
    if (e.key === 'F12') { e.preventDefault(); return; }
  });

  const _w = () => {
    // Disable devtools check on mobile (so keyboard doesn't trigger blur)
    if (window.innerWidth <= 768) {
      document.body.style.filter = '';
      return;
    }
    if (window.outerWidth - window.innerWidth > 180 ||
        window.outerHeight - window.innerHeight > 180) {
      document.body.style.filter = 'blur(20px)';
    } else {
      document.body.style.filter = '';
    }
  };
  window.addEventListener('resize', _w);
  _w();
})();

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
    'Building fast, scalable web & mobile experiences.',
    'React.js  ·  Node.js  ·  React Native  ·  AWS Cloud',
    'MERN Stack Developer with 2.5+ years of experience.',
    'Clean code. Great UX. Ships on time.',
    'Open to new opportunities worldwide.',
    'Shipped apps to App Store & Play Store.',
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

/* ── Scroll Progress Bar ── */
const progressBar = document.getElementById('progress-bar');
const _nav = document.querySelector('nav');
function _updatePBTop() {
  progressBar.style.top = (_nav ? _nav.getBoundingClientRect().height : 0) + 'px';
}
_updatePBTop();
window.addEventListener('resize', _updatePBTop);
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progressBar.style.width = Math.min(pct * 100, 100) + '%';
}, { passive: true });

/* ── Copy Email ── */
function copyEmail() {
  navigator.clipboard.writeText('sagars.samantaray@gmail.com').then(() => {
    const toast = document.getElementById('copy-toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
}

/* ── Terminal Mode ── */
(function () {
  const overlay  = document.getElementById('terminal-overlay');
  const backdrop = document.getElementById('terminal-backdrop');
  const termBody = document.getElementById('term-body');
  const termInput= document.getElementById('term-input');
  const closeBtn = document.getElementById('term-close');
  const openBtn  = document.getElementById('terminal-btn');
  let cmdHistory = [], histIdx = -1, booted = false, isTyping = false;

  const CMDS = {
    help: () => [
      '<span class="tc-ok">  Commands</span>',
      '<span class="tc-dim">  -------------------------------------------</span>',
      '',
      '  <span class="tc-cmd">whoami</span>      <span class="tc-dim">-  About me</span>',
      '  <span class="tc-cmd">skills</span>      <span class="tc-dim">-  Tech stack</span>',
      '  <span class="tc-cmd">experience</span>  <span class="tc-dim">-  Work history</span>',
      '  <span class="tc-cmd">projects</span>    <span class="tc-dim">-  My projects with live links</span>',
      '  <span class="tc-cmd">contact</span>     <span class="tc-dim">-  Contact info</span>',
      '  <span class="tc-cmd">clear</span>       <span class="tc-dim">-  Clear the screen</span>',
      '  <span class="tc-cmd">exit</span>        <span class="tc-dim">-  Close terminal</span>',
      '',
      '<span class="tc-dim">  Tip: up/down arrows for history  |  Esc to close</span>',
    ],
    whoami: () => [
      '<span class="tc-cmd">Sagar Samantaray</span>',
      '<span class="tc-out">MERN Stack Developer · Bhubaneswar, India 🇮🇳</span>',
      '<span class="tc-out">2.5+ years building full-stack web & cross-platform mobile apps.</span>',
      '<span class="tc-dim">Currently  → <span class="tc-cmd">NetSquare, Bangalore</span></span>',
      '<span class="tc-dim">Working on → <span class="tc-cmd">TRADEPASS</span> &amp; <span class="tc-ok">STATIS</span></span>',
      '<span class="tc-out">Education  → MCA · NIIS Institute · GPA 8.6</span>',
      '<span class="tc-ok">Status     → Open to new opportunities ✅</span>',
    ],
    skills: () => [
      '<span class="tc-ok">Tech Stack:</span>',
      '',
      '<span class="tc-dim">Frontend  </span><span class="tc-out">React.js · React Native · Redux · Tailwind CSS</span>',
      '<span class="tc-dim">Backend   </span><span class="tc-out">Node.js · Express.js · REST APIs · WebSocket</span>',
      '<span class="tc-dim">Database  </span><span class="tc-out">MongoDB · MySQL · Sequelize ORM</span>',
      '<span class="tc-dim">Cloud     </span><span class="tc-out">AWS (EC2 · SQS · S3) · PM2 · Linux</span>',
      '<span class="tc-dim">Mobile    </span><span class="tc-out">App Store &amp; Play Store Deployment</span>',
      '<span class="tc-dim">Languages </span><span class="tc-out">JavaScript (ES6+) · TypeScript</span>',
      '<span class="tc-dim">Tools     </span><span class="tc-out">Git · GitHub · Postman · VS Code · Agile</span>',
    ],
    experience: () => [
      '<span class="tc-ok">Work History:</span>',
      '',
      '<span class="tc-cmd">Software Developer</span>  <span class="tc-dim">@ NetSquare, Bangalore</span>',
      '<span class="tc-dim">Oct 2024 — Present</span>',
      '  <span class="tc-out">→ TRADEPASS — Event Management SaaS Platform</span>',
      '  <span class="tc-out">→ STATIS   — Foreign National Compliance Platform</span>',
      '',
      '<span class="tc-cmd">Junior Technical Programmer</span>  <span class="tc-dim">@ Hyscaler, Bhubaneswar</span>',
      '<span class="tc-dim">Jul 2023 — Mar 2024</span>',
      '  <span class="tc-out">→ GMI TEXAS — Construction Management Platform</span>',
    ],
    projects: () => [
      '<span class="tc-ok">Projects:</span>',
      '',
      '<span class="tc-cmd">TRADEPASS</span>  <span class="tc-dim">— Event Management SaaS</span>',
      '<span class="tc-out">Node.js · React.js · React Native · MySQL · AWS SQS</span>',
      '<span class="tc-dim">↗ <a href="https://apps.apple.com/us/app/tradepass/id6752904218" target="_blank" style="color:var(--dim);text-decoration:underline;">App Store</a>  ↗ <a href="https://play.google.com/store/apps/details?id=com.tradepass.app" target="_blank" style="color:var(--dim);text-decoration:underline;">Play Store</a></span>',
      '',
      '<span class="tc-ok">STATIS</span>  <span class="tc-dim">— Foreign National Compliance</span>',
      '<span class="tc-out">Node.js · React.js · React Native · MongoDB</span>',
      '<span class="tc-dim">↗ <a href="https://statissoftware.com/" target="_blank" style="color:var(--dim);text-decoration:underline;">statissoftware.com</a></span>',
      '',
      '<span class="tc-gold">GMI TEXAS</span>  <span class="tc-dim">— Construction Management</span>',
      '<span class="tc-out">React.js · Node.js · React Native · Canvas API · WebSocket</span>',
      '',
      '<span class="tc-cmd">AI Fit Tracker</span>  <span class="tc-dim">— Personal Project</span>',
      '<span class="tc-out">React Native · Expo · SQLite · Google Gemini AI · Zustand</span>',
      '<span class="tc-dim">↳ Features an AI Meal Scanner that estimates calories & macros from photos. Offline-first local database.</span>',
      '',
      '<span class="tc-cyan">Prep Buddy</span>  <span class="tc-dim">— Personal Project</span>',
      '<span class="tc-out">React Native · Expo AV · Expo Speech · Groq AI API</span>',
      '<span class="tc-dim">↳ A voice-based AI interview assistant with mock technical/HR rounds and English fluency practice.</span>'
    ],
    contact: () => [
      '<span class="tc-ok">Contact:</span>',
      '',
      '<span class="tc-dim">Email    </span><span class="tc-out">sagars.samantaray@gmail.com</span>',
      '<span class="tc-dim">Phone    </span><span class="tc-out">+91 7205222672</span>',
      '<span class="tc-dim">LinkedIn </span><a href="https://linkedin.com/in/sagar-samantaray" target="_blank" style="color:var(--cyan);text-decoration:underline;">linkedin.com/in/sagar-samantaray</a>',
      '<span class="tc-dim">GitHub   </span><a href="https://github.com/sagars-samantaray" target="_blank" style="color:var(--cyan);text-decoration:underline;">github.com/sagars-samantaray</a>',
    ],
    hi:      () => ['<span class="tc-ok">Hey there! 👋</span>', '<span class="tc-dim">Type <span class="tc-cmd">help</span> to explore.</span>'],
    hello:   () => ['<span class="tc-ok">Hello! 😄 Welcome to my terminal.</span>', '<span class="tc-dim">Type <span class="tc-cmd">whoami</span> to know more about me.</span>'],
    hey:     () => ['<span class="tc-ok">Hey! 🙌 What\'s up?</span>', '<span class="tc-dim">Try <span class="tc-cmd">projects</span> to see what I\'ve built.</span>'],
    heyy:    () => ['<span class="tc-ok">Heyyyy! 😄 Double y energy detected.</span>'],
    helo:    () => ['<span class="tc-ok">Hello to you too! (nice typo btw 😄)</span>'],
    sup:     () => ['<span class="tc-ok">Not much, just shipping code. 🚀</span>', '<span class="tc-dim">You?</span>'],
    yo:      () => ['<span class="tc-ok">Yo! 🤙</span>', '<span class="tc-dim">Type <span class="tc-cmd">contact</span> to reach me.</span>'],
    thanks:  () => ['<span class="tc-ok">You\'re welcome! 😊</span>'],
    'thank you': () => ['<span class="tc-ok">Anytime! Happy to connect. 😊</span>'],
    ty:      () => ['<span class="tc-ok">np! 😄</span>'],
    bye:     () => ['<span class="tc-ok">Goodbye! 👋 Come back anytime.</span>', '<span class="tc-dim">(type <span class="tc-cmd">exit</span> to close the terminal)</span>'],
    lol:     () => ['<span class="tc-ok">😄😄😄</span>'],
    ok:      () => ['<span class="tc-ok">👍</span>'],
    okay:    () => ['<span class="tc-ok">Alright! 👌</span>'],
    nice:    () => ['<span class="tc-ok">Thanks! Built with ❤️ and caffeine ☕</span>'],
    cool:    () => ['<span class="tc-ok">Thanks, I think so too 😎</span>'],
    hire:    () => ['<span class="tc-ok">Great choice! 🎯</span>', '<span class="tc-out">Reach me at sagars.samantaray@gmail.com</span>', '<span class="tc-out">or call +91 7205222672</span>'],
    whyhire: () => [
      '<span class="tc-ok">Why should you hire me?</span>',
      '',
      '<span class="tc-out">1. <b>Full-Stack Mastery:</b> From React Native mobile apps to scalable Node.js/AWS backends.</span>',
      '<span class="tc-out">2. <b>Proven Impact:</b> Built complex SaaS platforms like TRADEPASS and STATIS from scratch.</span>',
      '<span class="tc-out">3. <b>Problem Solver:</b> I don\'t just write code; I design systems that solve real business problems.</span>',
      '<span class="tc-out">4. <b>Fast Learner:</b> Adaptable, proactive, and always hungry to master new technologies.</span>',
      '',
      '<span class="tc-dim">Want to talk? Type <span class="tc-cmd">contact</span> or <span class="tc-cmd">hire</span>.</span>'
    ],
    clear: () => { 
      Array.from(termBody.children).forEach(c => {
        if (c.id !== 'term-input-row') termBody.removeChild(c);
      });
      return null; 
    },
    exit:  () => { closeTerm(); return null; },
    close: () => { closeTerm(); return null; },
  };

  const termInputRow = document.getElementById('term-input-row');

  function print(lines) {
    if (!lines) return;
    lines.forEach(l => {
      const d = document.createElement('div');
      d.className = 'term-line';
      d.innerHTML = l;
      termBody.appendChild(d);
    });
    termBody.scrollTop = termBody.scrollHeight;
  }

  function printTypedLine(html, done) {
    const d = document.createElement('div');
    d.className = 'term-line';
    if (!html || !html.trim()) {
      d.innerHTML = html || '';
      termBody.appendChild(d);
      termBody.scrollTop = termBody.scrollHeight;
      if (done) done();
      return;
    }
    d.innerHTML = html;
    termBody.appendChild(d);

    const walker = document.createTreeWalker(d, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push({ node, original: node.textContent });
      node.textContent = '';
    }
    if (!textNodes.length) { termBody.scrollTop = termBody.scrollHeight; if (done) done(); return; }

    const words = [];
    textNodes.forEach(({ node, original }) => {
      const parts = original.split(/(\s+)/);
      for (const p of parts) {
        if (p) words.push({ node, text: p });
      }
    });

    let wi = 0;
    function nextWord() {
      if (wi >= words.length) {
        termBody.scrollTop = termBody.scrollHeight;
        if (done) done();
        return;
      }
      const { node, text } = words[wi++];
      node.textContent += text;
      termBody.scrollTop = termBody.scrollHeight;
      setTimeout(nextWord, text.trim() === '' ? 0 : 35);
    }
    nextWord();
  }

  function printTyped(lines, done) {
    if (!lines || !lines.length) { if (done) done(); return; }
    isTyping = true;
    let i = 0;
    function nextLine() {
      if (i >= lines.length) {
        isTyping = false;
        termInput.focus();
        if (done) done();
        return;
      }
      printTypedLine(lines[i++], () => setTimeout(nextLine, 10));
    }
    nextLine();
  }

  function openTerm() {
    overlay.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (progressBar) progressBar.style.opacity = '0';
    setTimeout(() => termInput.focus(), 60);
    if (!booted) {
      booted = true;
      print([
        '<div class="term-ascii tc-ok"> ██████╗  █████╗  ██████╗  █████╗ ██████╗ </div>',
        '<div class="term-ascii tc-ok"> ██╔════╝ ██╔══██╗██╔════╝ ██╔══██╗██╔══██╗</div>',
        '<div class="term-ascii tc-ok"> ╚█████╗  ███████║██║  ███╗███████║██████╔╝</div>',
        '<div class="term-ascii tc-ok">  ╚═══██╗ ██╔══██║██║   ██║██╔══██║██╔══██╗</div>',
        '<div class="term-ascii tc-ok"> ██████╔╝ ██║  ██║╚██████╔╝██║  ██║██║  ██║</div>',
        '<div class="term-ascii tc-ok"> ╚═════╝  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝</div>',
        '',
        '<span class="tc-dim">Portfolio Terminal v1.0  ·  Type <span class="tc-cmd">help</span> to get started</span>',
        '',
      ]);
    }
  }

  function closeTerm() {
    overlay.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (progressBar) progressBar.style.opacity = '1';
  }

  const NLP = [
    { keys: ['who are you','who r u','who is sagar','about sagar','about you','about yourself',
              'tell me about','introduce yourself','introduce you','describe yourself',
              'your background','what is your background','ur background',
              'tell me more','know about you','know more','your story',
              'who built this','who made this'], cmd: 'whoami' },

    { keys: ['your skills','what skills','what can you do','what do you know',
              'tech stack','technologies','what tech','programming languages',
              'what languages','your tech','what tools','tools you use',
              'what frameworks','your expertise','expertise','your abilities',
              'what are you good at','good at','proficient in','what do you use',
              'stack you use','your stack'], cmd: 'skills' },

    { keys: ['work experience','where have you worked','your experience',
              'work history','previous jobs','where did you work','employment',
              'job history','past work','past experience','where you worked',
              'your career','career','worked before','companies you worked',
              'previous company','previous role','past role','worked at'], cmd: 'experience' },

    { keys: ['your projects','show projects','what have you built','what did you build',
              'your work','portfolio','built what','what projects','show me what',
              'what apps','your apps','apps you built','apps you made',
              'what websites','websites you built','tradepass','statis','gmi texas',
              'what have you made','what did you make'], cmd: 'projects' },

    { keys: ['contact you','contact info','how to reach','reach you','get in touch',
              'your email','email address','phone number','phone','your number',
              'how do i contact','how can i reach','connect with you','dm you',
              'message you','your linkedin','your github','social media',
              'how to connect','how can i connect'], cmd: 'contact' },

    { keys: ['why should i hire you','why should i hire sagar','why hire you','why hire sagar',
              'why should we hire you','why should we hire sagar','reason to hire','why choose you',
              'what makes you stand out','what makes you special'], cmd: 'whyhire' },

    { keys: ['hire you','hiring','available for work','looking for job','open to work',
              'are you available','are you open','available to hire','want to hire',
              'job opportunity','opportunity for you','job offer','offer you',
              'recruit you','recruiting'], cmd: 'hire' },

    { keys: ['what can i type','what commands','list commands','show commands',
              'what to type','commands available','available commands',
              'what do i do','how to use','how does this work','guide me'], cmd: 'help' },
  ];

  function resolveNLP(input) {
    for (const { keys, cmd } of NLP) {
      if (keys.some(k => input.includes(k))) return cmd;
    }
    return null;
  }

  termInput.addEventListener('keydown', e => {
    if (isTyping) { e.preventDefault(); return; }
    
    if (e.key === 'Enter') {
      const cmd = termInput.value.trim().toLowerCase();
      termInput.value = '';
      if (!cmd) return;
      cmdHistory.unshift(cmd); histIdx = -1;
      print([`<span class="tc-ok">sagar@portfolio:~$</span> <span class="tc-cmd">${cmd}</span>`]);
      if (CMDS[cmd]) {
        const out = CMDS[cmd]();
        if (out) { printTyped(out, () => print([''])); }
      } else {
        const resolved = resolveNLP(cmd);
        if (resolved && CMDS[resolved]) {
          const out = CMDS[resolved]();
          if (out) { printTyped(out, () => print([''])); }
        } else {
          print([
            `<span class="tc-err">Hmm, I didn't get that: "<em>${cmd}</em>"</span>`,
            `<span class="tc-dim">Try: <span class="tc-cmd">whoami</span> · <span class="tc-cmd">skills</span> · <span class="tc-cmd">projects</span> · <span class="tc-cmd">contact</span> · <span class="tc-cmd">help</span></span>`,
            '',
          ]);
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < cmdHistory.length - 1) termInput.value = cmdHistory[++histIdx];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) termInput.value = cmdHistory[--histIdx];
      else { histIdx = -1; termInput.value = ''; }
    }
  });


  openBtn.addEventListener('click', openTerm);
  const fab = document.getElementById('terminal-fab');
  if (fab) fab.addEventListener('click', openTerm);
  closeBtn.addEventListener('click', closeTerm);
  backdrop.addEventListener('click', closeTerm);

  overlay.addEventListener('click', e => {
    if (e.target !== closeBtn && !e.target.closest('a')) {
      termInput.focus();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === '`') {
      overlay.classList.contains('open') ? closeTerm() : openTerm();
    }
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeTerm();
    if (e.key === 'Escape') closeResume();
  });
})();

/* ── Resume Viewer ─────────────────────────────────────────── */
(function() {
  const modal   = document.getElementById('resume-modal');
  const iframe  = document.getElementById('resume-iframe');
  const label   = document.getElementById('zoom-label');
  let zoom = 1;

  window.openResume = function() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeResume = function(e) {
    if (e && e.target !== modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.zoomIn = function() {
    zoom = Math.min(zoom + 0.15, 2);
    applyZoom();
  };

  window.zoomOut = function() {
    zoom = Math.max(zoom - 0.15, 0.5);
    applyZoom();
  };

  function applyZoom() {
    iframe.style.transform = `scale(${zoom})`;
    iframe.style.transformOrigin = 'top center';
    iframe.style.height = (100 / zoom) + '%';
    label.textContent = Math.round(zoom * 100) + '%';
  }
})();

/* ── Skill Word Cycler ─────────────────────────────────────── */
(function() {
  const words = ['web', 'backend', 'frontend', 'full stack', 'mobile apps', 'cloud'];
  let idx = 0;
  const el = document.getElementById('skill-word');
  if (!el) return;

  function cycle() {
    el.style.animation = 'wordSlideOut 0.38s cubic-bezier(.4,0,.6,1) forwards';
    setTimeout(() => {
      idx = (idx + 1) % words.length;
      el.textContent = words[idx];
      el.style.animation = 'wordSlideIn 0.38s cubic-bezier(.4,0,.6,1) forwards';
    }, 380);
  }

  setInterval(cycle, 2600);
})();

