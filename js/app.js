/* 畫面運作：點元件、顯示筆記、照片放大。一般不需要改。 */
function photoBlock(id){
  const ps = PHOTOS[id]; if(!ps) return '';
  return `<div class="blk"><h3>本院實際照片 <span style="font-weight:400;color:var(--muted);font-size:13px">點照片放大</span></h3><div class="photos">${ps.map((p,i)=>`<button type="button" class="ph-btn" data-ph="${id}:${i}" aria-label="放大：${p.title}"><img src="${p.src}" alt="${p.title}" loading="lazy"><span>${p.title}</span></button>`).join('')}</div></div>`;
}
let lbList=[], lbI=0;
const lb=document.getElementById('lb');
function lbShow(){
  const p=lbList[lbI];
  document.getElementById('lbImg').src=p.src; document.getElementById('lbImg').alt=p.title;
  document.getElementById('lbWrap').querySelectorAll('.mk').forEach(m=>m.remove());
  p.marks.forEach(m=>{const d=document.createElement('div');d.className='mk'+(m.l?' l':'');d.style.left=m.x+'%';d.style.top=m.y+'%';d.innerHTML='<i></i><b></b>';d.querySelector('b').textContent=m.t;document.getElementById('lbWrap').appendChild(d)});
  document.getElementById('lbTitle').textContent=p.title;
  document.getElementById('lbCap').innerHTML=p.cap;
  document.getElementById('lbCount').textContent=`${lbI+1} / ${lbList.length}`;
  document.getElementById('lbPrev').disabled = lbList.length<2; document.getElementById('lbNext').disabled = lbList.length<2;
}
function lbOpen(id,i){ lbList=PHOTOS[id]; lbI=i; lbShow(); try{lb.showModal()}catch(e){lb.setAttribute('open','')} }
document.getElementById('lbPrev').addEventListener('click',()=>{lbI=(lbI-1+lbList.length)%lbList.length;lbShow()});
document.getElementById('lbNext').addEventListener('click',()=>{lbI=(lbI+1)%lbList.length;lbShow()});
document.getElementById('lbClose').addEventListener('click',()=>lb.close());
lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
lb.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')document.getElementById('lbPrev').click();if(e.key==='ArrowRight')document.getElementById('lbNext').click()});


/* ---------- wiring ---------- */
const panel = document.getElementById('panel');
function show(id, scroll){
  const tp = T[id] || T.intro;
  panel.innerHTML = `<button type="button" class="sheet-x" data-close>關閉</button><div class="ph"><span class="k">${tp.k}</span><h2>${tp.title}</h2>${tp.sub?`<p>${tp.sub}</p>`:''}</div>${photoBlock(id)}${LOCAL[id]||''}${tp.body()}`;
  if(tp.after) tp.after();
  panel.scrollTop = 0;
  document.querySelectorAll('.hs').forEach(g=>g.classList.toggle('on', g.dataset.id===id));
  document.querySelectorAll('[data-pick]').forEach(b=>b.setAttribute('aria-pressed', b.dataset.pick===id));
  if(location.hash.slice(1)!==id){ try{ history.replaceState(null,'','#'+id) }catch(e){} }
  if(scroll){ if(isMobile()) openSheet(); else if(window.innerWidth < 1100) panel.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth', block:'start'}); }
}
document.querySelectorAll('.hs').forEach(g=>{
  g.addEventListener('click',()=>show(g.dataset.id,true));
  g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(g.dataset.id,true)}});
});
const chip = ([id,l]) => `<button type="button" class="chip" data-pick="${id}" aria-pressed="false">${l}${PHOTOS[id]?'<span class="cam" aria-label="有照片"></span>':''}</button>`;
document.getElementById('chipsParts').innerHTML = PARTS.map(chip).join('');
document.getElementById('chipsTopics').innerHTML = TOPICS.map(chip).join('');
document.addEventListener('click',e=>{
  const ph=e.target.closest('[data-ph]'); if(ph){const [id,i]=ph.dataset.ph.split(':');lbOpen(id,+i);return}
  const p=e.target.closest('[data-pick]'); if(p){show(p.dataset.pick,true);return}
  const g=e.target.closest('[data-go]'); if(g){show(g.dataset.go,false)}
});
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1); if(T[h]) show(h,false)});
const isMobile = () => matchMedia('(max-width: 760px)').matches;
function openSheet(){ panel.classList.add('open'); }
function closeSheet(){ panel.classList.remove('open'); }
document.addEventListener('click',e=>{ if(e.target.closest('[data-close]')) closeSheet(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape' && panel.classList.contains('open') && !document.getElementById('lb').open) closeSheet(); });
(function(){ const h=location.hash.slice(1); show(T[h] ? h : 'intro', false); if(T[h] && h!=='intro' && isMobile()) openSheet(); })();
