/* =====================================================================
   本院實際照片與「本院」方框
   ---------------------------------------------------------------------
   加一張照片：
     1. 把照片放進 photos/ 資料夾（建議 jpg，寬 400–800 px 即可）
     2. 在下面 PHOTOS 裡找到對應的元件 id，加一行：
        P('檔名.jpg','照片標題','<p>說明文字</p>',[{x:50,y:40,t:'標籤'}]),
        最後的 [...] 是照片上的紅圈：x、y 是從左上角算起的百分比，
        t 是標籤文字，加 l:1 讓標籤放在左邊。不需要紅圈就整段拿掉。
   「本院」方框：在 LOCAL 裡用元件 id 加一段 HTML。
   ===================================================================== */
const P = (src,title,cap,marks) => ({src:'photos/'+src,title,cap,marks:marks||[]});
const RES1 = P('01-reservoir.jpg','Venous reservoir 與下方的 oxygenator','<p>上方透明的 hardshell venous reservoir，刻度可看血位。下方圓形的是和 reservoir 接在一起的 oxygenator（含 heat exchanger）。</p>',[{x:31,y:30,t:'Reservoir'},{x:43,y:74,t:'Oxygenator'}]);
const PHOTOS = {};   /* 公開版：不放照片 */
const LOCAL = {
  pump:'<div class="local"><h3>本院</h3><p>Main pump 是 <b>Stöckert S5 roller pump</b>（看「Roller 怕空氣」那一列）。</p></div>',
  gas:'<div class="local"><h3>本院體循師習慣：sweep 跟著 main pump flow 調</h3><div class="tbl"><table><thead><tr><th>Main pump flow</th><th>Sweep gas flow</th></tr></thead><tbody><tr><td>&lt; 5 L/min</td><td>約 1.5 L/min</td></tr><tr><td>5–6 L/min</td><td>約 2 L/min</td></tr></tbody></table></div><p>再依 blood gas 的 PaCO2 微調。</p><p><b>CO2</b> 另外接，不經過 gas blender。</p></div>',
  alf:'<div class="local"><h3>本院</h3><p>ALF 已整合在 oxygenator 內，沒有獨立的 ALF。</p></div>',
  ventpumps:'<div class="local"><h3>本院</h3><p>標籤顏色：<b>白、黃 = cardiotomy suction</b>，<b>貼紅色標籤 = venting</b>。共 2 台 cardiotomy + 1 台 venting。</p></div>',
  cp:'<div class="local"><h3>本院</h3><p>Cardioplegia pump 是<b>粉紅色蓋</b>那台。<b>粉紅色旁邊那台小的</b>是備用 pump，從 oxygenator 旁接出、平常夾住：<b>臨時要轉 blood cardioplegia，打開就能用</b>。</p><p>Cardioplegia 有自己的降溫器，heater-cooler 那一路的冷水設 <b>2°C</b>。</p></div>',
  hemo:'<div class="local"><h3>本院</h3><p>這台 hemoconcentrator 接在 <b>main pump 之後</b>：靠 pump 壓力過濾，不需要額外 vacuum。有些人會接在 main pump 之前，那就要在濾液端加 vacuum。</p></div>',
  vavd:'<div class="local"><h3>本院</h3><p>用 <b>Maquet VAVD controller</b> 調負壓，數字同步顯示在 S5 monitor；實際使用約 <b>−15 到 −17 mmHg</b>。</p></div>',
  vclamp:'<div class="local"><h3>本院</h3><p>V line 用<b>電子式 occluder</b>（Stöckert EVO）控制：100% = 全放。</p></div>'
};
