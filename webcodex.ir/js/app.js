/* رفتارها و موشن‌ها؛ مستقل از محتوا */
(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(pointer:fine)').matches;
let obs=[];
window.initFx=()=>{
 obs.forEach(o=>o.disconnect());obs=[];
 const fa=n=>n.toLocaleString(getLang()==='fa'?'fa-IR':'en-US');
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
 $$('.reveal').forEach(x=>io.observe(x));
 const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
  const el=$('[data-n]',e.target),n=+el.dataset.n,t0=performance.now();e.target.classList.add('in');
  (function f(t){const k=Math.min((t-t0)/1400,1);el.textContent=fa(Math.round(n*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
 $$('.stats>div').forEach(x=>co.observe(x));
 const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#menu a').forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50%'});
 $$('main section[id]').forEach(s=>so.observe(s));
 obs.push(io,co,so);
};
initFx();

/* عکس ثابت پشت صفحه: کم‌رنگ شدن هنگام اسکرول + حرکت ملایم با ماوس */
const root=document.documentElement,bar=$('#bar'),ph=$('#photo');let tk=0,mx=0,my=0;
const upd=()=>{tk=0;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight||1;
 bar.style.transform=`scaleX(${y/h})`;ph.style.opacity=Math.max(.3,1-y/innerHeight*.55);
 ph.style.transform=`translate(${mx}px,${my-y*.04}px) scale(1.02)`;$('.nav').classList.toggle('sc',y>20)};
addEventListener('scroll',()=>{tk||(tk=requestAnimationFrame(upd))},{passive:true});upd();
if(!RM&&FINE){
 addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*-16;my=(e.clientY/innerHeight-.5)*-10;tk||(tk=requestAnimationFrame(upd))},{passive:true});
 const c=$('#cur');let x=0,y=0,cx=0,cy=0;
 addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;c.style.opacity=1},{passive:true});
 addEventListener('pointerdown',()=>c.classList.add('dn'));addEventListener('pointerup',()=>c.classList.remove('dn'));
 document.addEventListener('pointerover',e=>c.classList.toggle('hv',!!e.target.closest('a,button,input,textarea')));
 (function f(){cx+=(x-cx)*.2;cy+=(y-cy)*.2;c.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(f)})();
}

/* نورافکن و تیلت کارت‌ها */
const cd=t=>t.closest&&t.closest('.fc,.pn');
document.addEventListener('pointermove',e=>{const c=cd(e.target);if(!c)return;const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
 c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
 if(c.classList.contains('fc')&&!RM){c.style.setProperty('--ry',((x/r.width-.5)*10)+'deg');c.style.setProperty('--rx',((.5-y/r.height)*8)+'deg');c.style.setProperty('--ty','-6px')}},{passive:true});
document.addEventListener('pointerout',e=>{const c=cd(e.target);if(c&&!c.contains(e.relatedTarget))['--rx','--ry','--ty'].forEach(k=>c.style.removeProperty(k))});

/* نور دنبال‌کننده ماوس و کج‌شدن کارت‌ها */
document.addEventListener('pointermove',e=>{const c=e.target.closest('.hc,.bci,.pc');if(!c)return;const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
 c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
 if(c.classList.contains('bci')&&!RM){c.style.setProperty('--rx',(.5-y/r.height)*7+'deg');c.style.setProperty('--ry',(x/r.width-.5)*9+'deg')}});
document.addEventListener('pointerout',e=>{const c=e.target.closest('.bci');if(c&&!c.contains(e.relatedTarget)){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}});

const mn=$('#menu'),bg=$('#burger'),dd=$('#dd');
bg.onclick=()=>bg.setAttribute('aria-expanded',mn.classList.toggle('open'));
mn.onclick=e=>{if(e.target.tagName==='A'){mn.classList.remove('open');bg.setAttribute('aria-expanded','false')}};
$('#lang').onclick=e=>{e.stopPropagation();dd.classList.toggle('open')};
$('#langmenu').onclick=e=>{const b=e.target.closest('button');if(b){dd.classList.remove('open');setLang(b.dataset.l)}};
addEventListener('click',()=>dd.classList.remove('open'));

if('serviceWorker'in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
let dp;const ib=$('#install');
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;ib.hidden=false});
ib.onclick=async()=>{ib.hidden=true;dp&&dp.prompt();dp=null};
addEventListener('appinstalled',()=>ib.hidden=true);
})();
