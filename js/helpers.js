/* 共用的小工具：產生清單、表格、EACTS 建議等。一般不需要改。 */
const tag = s => s ? `<span class="tag">${s}</span>` : '';
const ul = (h, items) => `<div class="blk">${h?`<h3>${h}</h3>`:''}<ul class="n">${items.map(([s,t])=>`<li><span>${t}${tag(s)}</span></li>`).join('')}</ul></div>`;
const tbl = (h, head, rows, s) => `<div class="blk"><h3>${h}${tag(s)}</h3><div class="tbl"><table><thead><tr>${head.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
const recs = items => `<div class="blk"><h3>EACTS 2024 建議${tag('E')}</h3><div class="recs">${items.map(([t,x,c,l])=>`<div class="rec"><span class="t">${t}</span><span>${x}</span><span><span class="cls cls-${c}">${c}</span><span class="lvl">${l}</span></span></div>`).join('')}</div></div>`;
const warn = h => `<p class="warn">${h}</p>`;
const go = (id, label) => `<button type="button" class="go" data-go="${id}">${label}</button>`;
const K = s => `<span class="key mono">${s}</span>`;

/* Kaplan Table 31.7 的 MVO2 長條圖（心臟頁使用） */
const MV = {temps:['37','32','28','22'], rows:[['Beating, full',[9.0,null,null,null]],['Fibrillating, empty',[6.5,3.8,3.0,2.0]],['Beating, empty',[5.5,5.0,4.0,2.9]],['K⁺ cardioplegia',[1.8,0.8,0.6,0.3],1]]};
function drawMvo2(){
  const t = document.getElementById('temps'); if(!t) return;
  t.innerHTML = MV.temps.map((x,i)=>`<button type="button" class="chip" data-t="${i}" aria-pressed="${i===0}">${x}°C</button>`).join('');
  const draw = ti => { document.getElementById('mvBars').innerHTML = MV.rows.map(([n,v,k])=>`<div class="bar${k?' k':''}"><span>${n}</span><div class="track"><div class="fill" style="width:${v[ti]==null?0:v[ti]/9*100}%"></div></div><span class="mono" style="text-align:right">${v[ti]==null?'—':v[ti].toFixed(1)}</span></div>`).join(''); };
  t.addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(!b)return;t.querySelectorAll('[data-t]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+b.dataset.t)});
  draw(0);
}

