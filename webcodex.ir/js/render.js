/* ساخت صفحه از SITE و زبان فعلی. نوع بخش جدید = یک تابع جدید در B. شماره بخش‌ها خودکار است. */
(()=>{
'use strict';
const S=window.SITE,D=document,$=s=>D.querySelector(s);
let L=S.defaultLang;try{L=localStorage.getItem('lang')||L}catch(_){}
const T=x=>x&&typeof x==='object'&&'f' in x?(L==='fa'?x.f:x.e):x;
const e=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const st=D.documentElement.style;for(const k in S.theme)st.setProperty('--'+k,S.theme[k]);
const mark=`<img class="mk" src="${S.assets.logo}" width="22" height="22" alt="">`;
/* عنوان بخش: کلمه‌به‌کلمه با انیمیشن ورود */
const H=s=>{let i=0;const w=(t,c)=>String(T(t)).split(' ').map(x=>`<span class="w${c}"><span style="--i:${i++}">${e(x)}</span></span>`).join(' ');return `<h2>${w(s.title,'')} ${w(s.acc,' ac')}</h2>`};
const kind=c=>T(S.sections.find(s=>s.type==='projects').categories[c]);
const svg=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICON={intent:svg('<circle cx="12" cy="12" r="9" pathLength="1"/><circle cx="12" cy="12" r="5" pathLength="1"/><circle cx="12" cy="12" r="1.2" pathLength="1"/>'),
 speed:svg('<path pathLength="1" d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>'),
 access:svg('<path pathLength="1" d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3" pathLength="1"/>')};
const win=(d,body)=>`<div class="win"><div class="wb"><i></i><i></i><i></i><em>${e(d)}</em></div><div class="wc">${body}</div></div>`;
const MOCK={
 chart:d=>win(d,`<div class="bars">${[62,88,47,95,71,80,58].map((h,i)=>`<b style="--h:${h}%;--i:${i}"></b>`).join('')}</div><div class="rows">${[90,72,48].map(w=>`<p><span></span><u style="--w:${w}%"></u></p>`).join('')}</div>`),
 list:d=>win(d,`<div class="ls">${[0,1,2,3].map(i=>`<p style="--i:${i}"><s></s><span></span><u></u></p>`).join('')}</div>`),
 tiles:d=>win(d,`<div class="tls">${[0,1,2,3,4,5].map(i=>`<b style="--i:${i}"></b>`).join('')}</div>`)};
const B={
 about:s=>`<div class="two">${H(s)}<div><p class="txt">${e(T(s.text))}</p><a class="btn" href="#contact">${e(T(S.ui.cta))}</a></div></div>`,
 principles:s=>`${H(s)}<div class="how">${s.items.map((p,i)=>`<article class="hc" style="--rd:${i*120}ms"><span class="hn">0${i+1}</span><div class="hic">${ICON[p.k]||''}</div><h3>${e(T(p.t))}</h3><p>${e(T(p.d))}</p><i class="hl"></i></article>`).join('')}</div>`,
 skills:s=>`${H(s)}<div class="skills">${s.items.map(([n,v])=>`<div class="sk"><span>${e(T(n))}</span><i style="--w:${+v}%"></i></div>`).join('')}</div>`,
 tags:s=>`${H(s)}<div class="chips">${s.items.map(c=>`<span>${e(T(c))}</span>`).join('')}</div>`,
 projects:s=>{
  const doms=S.projects.filter(p=>p[2]),half=Math.ceil(doms.length/2);
  const feat=s.featured.map((x,i)=>{const p=S.projects.find(q=>q[2]===x.d);
   return `<a class="bc bc${i}" href="https://${e(x.d)}" target="_blank" rel="noopener" style="--rd:${i*130}ms"><div class="bci"><span class="spot"></span>${MOCK[x.mock||'chart'](x.d)}<div class="bi"><span class="pill">${e(T(x.kind))}</span><h3>${e(L==='fa'?p[0]:p[1])}</h3><p>${e(T(x.desc))}</p><span class="vis">${e(T(S.ui.visit))} <i>↗</i></span></div></div></a>`}).join('');
  const mq=(a,c)=>`<div class="mq ${c}"><div>${(h=>h+h)(a.map(p=>`<span><i></i>${e(p[2])}</span>`).join(''))}</div></div>`;
  return `${H(s)}<div class="bento">${feat}</div><div class="mqs" aria-hidden="true">${mq(doms.slice(0,half),'')}${mq(doms.slice(half),'rev')}</div>
  <div class="fbar"><div class="filters" id="filters">${s.categories.map((c,i)=>`<button data-c="${i}" class="${i?'':'on'}">${e(T(c))}</button>`).join('')}</div><span class="cnt" id="cnt"></span></div><div class="pgrid" id="grid"></div>`},
 timeline:s=>`${H(s)}<ol class="tl">${s.items.map(([t,m,p])=>`<li><b>${e(T(t))}</b>${m?`<small>${e(T(m))}</small>`:''}${p?`<p>${e(T(p))}</p>`:''}</li>`).join('')}</ol>`,
 contact:s=>{const f=s.form;return `<div class="two">${H(s)}<form class="form" id="cf"><label><span class="lb">${e(T(f.name))}</span><input name="n" required placeholder="${e(T(f.ph))}"></label><label><span class="lb">${e(T(f.phone))}</span><input name="p" type="tel" dir="ltr" placeholder="09xx xxx xxxx"></label><label class="full"><span class="lb">${e(T(f.msg))}</span><textarea name="m" rows="4"></textarea></label><button class="btn pri full">${e(T(f.send))}</button></form></div>
 <div class="contact">${s.phones.map(p=>`<a class="btn" href="tel:${p.replace(/\s/g,'').replace(/^0/,'+98')}" dir="ltr">${e(p)}</a>`).join('')}<a class="btn" href="mailto:${e(s.email)}" dir="ltr">${e(s.email)}</a></div>`}
};
function render(){
 const d=D.documentElement;d.lang=L;d.dir=L==='fa'?'rtl':'ltr';
 D.title=T(S.meta.title);$('meta[name=description]').content=T(S.meta.description);
 $('#photo').src=S.assets.photo;
 $('#brand').innerHTML=`${mark}${e(T(S.person.name))}`;
 $('#menu').innerHTML=S.sections.filter(s=>s.nav).map(s=>`<a href="#${s.id}">${e(T(s.nav))}</a>`).join('');
 $('#ln').textContent=T(S.ui.langName);$('#lf').textContent=L==='fa'?'IR':'US';
 $('#cta span').textContent=T(S.ui.cta);$('#install').textContent=T(S.ui.install);
 $('#langmenu').innerHTML=`<button data-l="fa">فارسی</button><button data-l="en">English</button>`;
 $('#foot').innerHTML=`<img class="footer-logo" src="${S.assets.logo}" width="26" height="26" alt=""> ${e(S.person.brand)} · ${e(T(S.person.name))}`;
 const h=S.hero;
 $('#top').innerHTML=`
<section class="hero" id="home"><div class="h-top"><p class="lb"><i class="dot"></i>${e(T(h.avail))}</p><p class="lb">${e(T(h.roleLabel))}</p></div>
 <div class="h-bot"><div class="h-l"><p class="hi">${e(T(h.hi))}</p><h1><b>${e(T(h.t1))}</b><span>${e(T(h.t2))}</span></h1></div>
 <div class="h-r"><p class="intro">${e(T(h.introTitle))}</p><p class="txt">${e(T(h.introText))}</p><a class="lnk" href="#projects">${e(T(h.introLink))} ↗</a></div></div></section>
<section class="stats">${S.stats.map(x=>`<div><p class="num"><span data-n="${x.n}">0</span>${x.plus?'<sup>+</sup>':''}</p><i class="ln"></i><p class="lbl">${e(T(x.label))}</p></div>`).join('')}</section>
<div class="strip lb"><span>${e(T(S.strip))}</span><a href="#about">${e(T(S.ui.scroll))} ↓</a></div>`
 +S.sections.map(s=>{const hd='';
  return `<section id="${s.id}" class="sec reveal">${hd}${B[s.type](s)}</section>`}).join('');
 const gr=$('#grid'),fl=$('#filters');
 const draw=c=>{const list=S.projects.filter(p=>!c||p[3]===c);
  $('#cnt').textContent=`(${L==='fa'?list.length.toLocaleString('fa-IR'):list.length})`;
  gr.innerHTML=list.map((p,i)=>{
   const inner=`<b class="bd">${e((p[1]||'?')[0].toUpperCase())}</b><span class="pt"><span class="t">${e(L==='fa'?p[0]:p[1])}</span><span class="dm">${e(p[2]||kind(p[3]))}</span></span><span class="go">↗</span>`,a=`style="animation-delay:${Math.min(i*28,600)}ms"`;
   return p[2]?`<a class="pc" ${a} href="https://${e(p[2])}" target="_blank" rel="noopener">${inner}</a>`:`<div class="pc" ${a}>${inner}</div>`}).join('')};
 draw(0);
 fl.onclick=ev=>{const b=ev.target.closest('button');if(!b)return;fl.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));draw(+b.dataset.c)};
 $('#cf').onsubmit=ev=>{ev.preventDefault();const f=new FormData(ev.target),c=S.sections.find(s=>s.type==='contact');
  location.href=`mailto:${c.email}?subject=${encodeURIComponent(f.get('n'))}&body=${encodeURIComponent(f.get('m')+'\n\n'+f.get('n')+' - '+f.get('p'))}`};
}
window.renderSite=render;
window.setLang=l=>{L=l;try{localStorage.setItem('lang',l)}catch(_){}render();window.initFx&&window.initFx()};
window.getLang=()=>L;
render();
})();
