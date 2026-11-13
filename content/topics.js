/* =====================================================================
   筆記內容：每個元件或主題一段
   ---------------------------------------------------------------------
   格式：
     id:{k:'英文小標', title:'標題', sub:'一句話重點', body:()=> 內容 }
   內容可用的工具（定義在 js/helpers.js）：
     ul('小標題', [['來源','文字'], ...])   來源寫 M、K、E、補充，或留空 ''
     tbl('表格標題', ['欄1','欄2'], [['a','b'], ...], '來源')
     recs([['T40','建議內容','I','A'], ...])   EACTS：Table、內容、Class、Level
     warn('提醒文字')      紅底提醒
     go('id','連結文字')   跳到另一個元件或主題
     K('數字')             紅色粗體數字
   每段之間用 + 串起來。文字裡可以用 <b>粗體</b>。
   ===================================================================== */
const T = {
 intro:{k:'START', title:'從哪裡開始', sub:'點圖上的元件，或下面的位置與主題按鈕。', body:()=>
   `<div class="blk"><h3>血流路徑</h3><div class="flow"><b>RA venous cannula</b><span>→</span><b>Venous reservoir</b><span>→</span><b>Arterial pump</b><span>→</span><b>Heat exch. + Oxygenator</b><span>→</span><b>ALF</b><span>→</span><b>Aortic cannula</b></div></div>`+
   ul('CPB 的 4 個功用',[['K','Oxygenation + CO2 elimination（取代肺）'],['K','Circulation of blood（取代心）'],['K','Systemic cooling and rewarming'],['K','把血從心臟引開 → bloodless surgical field']])+
   ul('整體流程',[['','選迴路 + priming → '+go('reservoir','Reservoir')],['','Heparin、ACT → '+go('anes','麻醉端')],['','先 arterial 再 venous 插管 → '+go('aorta','Aorta')+'、'+go('venous','Venous cannula')],['','放開 venous clamp → full flow → '+go('vclamp','On-pump')],['','Cross-clamp + cardioplegia → '+go('clamp','X-clamp')+'、'+go('cp','Cardioplegia')],['','Rewarming → '+go('wean','Weaning')],['','Protamine → decannulation']])
 },

 heart:{k:'HEART', title:'心臟：心肌保護', sub:'讓心臟停止電機械活動，是降低心肌代謝最重要的單一步驟。', body:()=>
   ul('數字',[['M','K arrest（常溫）→ MVO2 降 '+K('90%')],['M','K arrest + 心肌 < 22°C → 降 '+K('97%')],['K','Fig 31.10：減壓（vent 成空跳）40% · 停跳 34% · 降溫 11% → <b>減壓 > 停跳 > 降溫</b>']])+
   `<div class="blk"><h3>Kaplan Table 31.7：溫度對 MVO2 的影響${tag('K')}</h3><div class="temps" id="temps"></div><div class="bars" id="mvBars"></div><span style="font-size:12.5px;color:var(--muted)">單位 mL O2/100 g/min。常溫下 VF（6.5）比 empty beating（5.5）更耗氧。</span></div>`+
   ul('結束停搏',[['M','Warm normokalemic blood 再灌流 coronary → 恢復跳動']])+
   `<p>Cardioplegia 怎麼給：${go('cp','系統與成分')} · ${go('ante','Antegrade')} · ${go('retro','Retrograde')}</p>`+
   recs([['T25','心肌保護策略依病人、病變與手術複雜度個別化，而非固定一種液','I','C'],['T25','Selected patients 用 blood cardioplegia，減少 hemodilution、出血與輸血','IIa','B'],['T26','CPB 前後以 TOE 評估 LV、RV 功能','I','B'],['T21','用氣麻的病人做 remote ischaemic preconditioning','IIa','A']]),
   after:drawMvo2
 },

 aorta:{k:'AORTA', title:'升主動脈與 arterial cannula', sub:'先插 arterial 再插 venous；插管時把 MAP 壓下來。', body:()=>
   ul('Arterial cannulation',[['K','Aortotomy 與插管時 MAP '+K('< 70 mmHg')+'，降低 dissection 風險'],['K','併發症：air／atheromatous embolization、dissection、血管壁損傷'],['補充','先 arterial 再 venous：出狀況時至少能從 arterial 快速輸液']])+
   tbl('不同手術的 arterial 插管位置','手術,Arterial'.split(','),[['CABG、AVR、MVR、root replacement','Ascending aorta'],['Aortic arch','Axillary 或 femoral artery'],['Redo','Femoral artery']],'M')+
   recs([['T8','Epiaortic ultrasonography 評估 ascending aorta plaque，降低腦損傷','IIa','B']])+
   `<p>Aortic arch 手術與 DHCA：${go('arch','看 Arch／DHCA')}</p>`
 },

 clamp:{k:'X-CLAMP', title:'Aortic cross-clamp', sub:'上 clamp 後心臟靠 cardioplegia 保護；放開就是再灌流。', body:()=>
   ul('',[['K','Clamp 還沒上（心臟仍靠自己的 coronary 灌流）：MAP 維持 '+K('60–80 mmHg')+'，尤其有 coronary stenosis 或 LVH'],['M','上 clamp → 給 cardioplegia 停跳，'+go('cp','看 Cardioplegia')],['M','手術結束放開 clamp → warm normokalemic blood 再灌流 → 恢復跳動']])+
   recs([['T31','Cross-clamp 期間繼續通氣或 CPAP','III','A']])
 },

 ante:{k:'AORTIC ROOT', title:'Antegrade cardioplegia 與 root vent', sub:'同一支 root 針，可以灌注也可以排氣。', body:()=>
   ul('Antegrade',[['M','Aortic cannula 與 aortic valve 之間的 root 插針灌注'],['M','最符合生理的方式'],['M','嚴重 CAD：狹窄後方灌不到'],['M','AR：root 撐不起壓力，劑流進 LV → 改 '+go('retro','retrograde')+' 或打開 root 直接灌 coronary ostia']])+
   ul('Root vent',[['K','排出卡在 root 的空氣，降低 air embolism'],['K','同時間接減壓 LV']])+
   tbl('不同手術的 cardioplegia 與 vent','手術,Cardioplegia,Vent'.split(','),[['CABG','Root／CS','Aortic root'],['AVR','Root／CS，開 root 後 handheld 灌 ostia','LV + root'],['MVR、root、arch、其他','Root／CS','LV + root'],['Redo','Root／CS','Root／LV']],'M')
 },

 retro:{k:'CORONARY SINUS', title:'Retrograde cardioplegia', sub:'經 RA 放 balloon-tipped cannula 進 coronary sinus。', body:()=>
   ul('',[['K','灌注壓 '+K('< 40 mmHg')+'：避免 perivascular edema 與出血'],['M','不受 coronary 狹窄與 AR 影響']])+
   ul('Kaplan Box 31.4：何時用',[['K','搭配 antegrade 一起用'],['K','Aortic insufficiency'],['K','Aortic（及 mitral）valve 手術'],['K','灌流嚴重病變的 coronary']])
 },

 lvvent:{k:'LV VENT', title:'LV vent', sub:'CPB 中 LV 仍會有血回流，要排掉避免 distention。', body:()=>
   ul('為什麼要 vent',[['K','避免心肌 rewarming'],['K','降低 LV wall tension'],['K','限制心肌耗氧']])+
   ul('LV 的血從哪裡來',[['K','<b>Bronchial veins</b>：deep bronchial veins 流進 pulmonary vein／LA'],['K','<b>Thebesian veins</b>：心壁內小靜脈，直接排進 LA、LV（生理性 right-to-left shunt）'],['K','<b>AR</b>：arterial inflow 倒灌進 LV']])+
   ul('放哪裡',[['K','經 <b>right superior PV</b> → mitral valve → LV'],['K','其他：PA、aortic root、LV apex']])+
   warn('Kaplan 原文寫「left superior PV」，應為 right superior PV（Treffalls et al., JTCVS Open 2023）。')
 },

 suction:{k:'SUCTION', title:'Cardiotomy suction', sub:'把手術野的血吸回 reservoir；吸太多會傷血球、帶入發炎物質。', body:()=>
   ul('',[['K','和 root vent、LV vent 一樣用 roller pump 抽回'],['E','開始給 protamine 就停 suction：含 protamine 的血回到 circuit 會凝血']])+
   recs([['T9','限制 cardiotomy suction、避免 reservoir 與 vent 管路吸入空氣','IIa','B'],['T10','使用獨立的 cardiotomy reservoir，減少 shed mediastinal blood 的害處','IIa','B'],['T49','考慮丟棄 shed mediastinal blood','IIa','B'],['T49','Shed blood 先處理（cell salvage）再回輸','IIa','B'],['T38','開始給 protamine 時停 cardiotomy suction','IIa','C']])
 },

 ventpumps:{k:'VENT PUMPS', title:'Vent 與 suction 幫浦', sub:'三條管路各有一台小 roller pump，全部回到 reservoir。', body:()=>
   `<p>${go('ante','Root vent')} · ${go('lvvent','LV vent')} · ${go('suction','Suction')}</p>`+
   ul('',[['M','Roller pump 能產生很大負壓：vent 吸太猛會把空氣吸進心臟或傷血球'],['補充','On-pump 後 vent 方向要確認是「抽出」，接反會把空氣打進心臟']])
 },

 venous:{k:'VENOUS CANNULA', title:'Venous cannula（RA）', sub:'2-stage 或 bicaval；要開 RA 就用 bicaval。', body:()=>
   tbl('Venous 插管選擇','手術,Venous'.split(','),[['CABG、AVR、root、arch','2-stage（RA）'],['MVR、其他心內手術','Bicaval（SVC + IVC 各一支）'],['Redo','Femoral vein']],'M')+
   ul('On-pump 後確認 venous outflow（Box 31.9）',[['K','血有沒有流到 reservoir'],['K','SVC obstruction：臉部腫脹、CVP 升高'],['K','高 CVP／低 PAP → drainage 不良'],['M','Drainage 好 → CVP、PAP 降到約 0']])
 },

 vclamp:{k:'INITIATION', title:'Venous line 與 on-pump', sub:'Venous return 靠重力；放開 clamp 就是 on-pump。', body:()=>
   ul('On-pump 步驟',[['M','放開 venous cannula 與 reservoir 之間的 clamp'],['M','同時 arterial pump 漸增到 full flow'],['M','確認 CVP、PAP 降到約 '+K('0')+'，動脈波形變 non-pulsatile'],['M','Cerebral oximetry 明顯改變 → 重新確認 cannula 位置'],['K','Full flow 後停輸液給藥、停通氣與吸入麻藥']])+
   ul('On-pump 時的低血壓',[['K','MAP 掉到 '+K('30–40 mmHg')+' 常見'],['K','原因：nonblood prime 稀釋 → blood viscosity 急降'],['K','Venous line partial clamp 可刻意減少回流，讓心臟保留容積']])+
   `<p>On-pump 後的目標值：${go('targets','看 CPB 中的目標值')}</p>`
 },

 vavd:{k:'VAVD', title:'VAVD（vacuum-assisted venous drainage）', sub:'在 venous reservoir 加負壓幫忙把血「吸」回來，不只靠重力。', body:()=>
   ul('',[['補充','好處：可以用較細的 venous cannula、reservoir 不必放很低，仍有足夠 drainage'],['M','Reservoir 負壓比 '+K('−60 mmHg')+' 更負 → microbubbles 增加'],['補充','負壓太大也會讓 venous line 吸進空氣、血球受傷']])+
   recs([['T44','Assisted venous drainage 要用核准的 venous reservoir','I','C'],['T44','使用時監測 venous line 負壓','I','C'],['T44','過度負壓（溶血）','III','B']])+
   `<p>Reservoir 本身：${go('reservoir','看 Venous reservoir')}</p>`
 },

 hemo:{k:'ULTRAFILTRATION', title:'Hemoconcentrator（ultrafiltration）', sub:'俗稱「尿尿」，也有人叫它人工腎臟：把多餘的水分濾掉、提高 Hct，濾出來的水從旁邊流到接尿筒。但它做的是 ultrafiltration，不是洗腎（dialysis）。', body:()=>
   ul('接在哪裡，決定要不要額外的力量',[['','接在 <b>main pump 之前</b>：血沒有被推的力量，濾液端需要另外接 <b>vacuum</b> 才濾得出來'],['','接在 <b>main pump 之後</b>：靠 pump 打出來的壓力就能推過濾膜，<b>不需要額外的力量</b>'],['','濾出來的水（ultrafiltrate）從旁邊的管子流出，接到接尿筒；過濾後的血回到 reservoir']])+
   ul('為什麼要脫水',[['M','Prime 讓循環容積增加 20–35% → hemodilution'],['E','CPB 中 Hct < 18% 要輸 PRBC（I / C）：先把水濾掉，可能少輸一點血']])+
   tbl('和洗腎（hemodialysis）哪裡不一樣','項目,CPB 的 hemoconcentrator,洗腎 hemodialysis'.split(','),[
     ['主要機轉','<b>Ultrafiltration + convection</b>：靠壓力差把 plasma water 推過膜，小分子跟著水一起被帶走（solvent drag）<sup>[1][2]</sup>','<b>Diffusion</b>：靠血和透析液之間的濃度差，溶質從高濃度移到低濃度<sup>[1]</sup>'],
     ['膜的另一側','<b>沒有透析液</b>，只有濾出來的水，流到接尿筒','<b>透析液</b>和血逆向流動，維持濃度差<sup>[1]</sup>'],
     ['驅動力','<b>跨膜壓（TMP）</b><sup>[2]</sup>','<b>濃度梯度</b>；脫水量另外用 TMP 控制<sup>[1]</sup>'],
     ['主要目的','脫水、把血變濃（提高 Hct）','清尿毒素、矯正電解質與酸鹼，也脫水'],
     ['電解質濃度','小分子隨水<b>按血漿濃度</b>一起被帶走，所以單靠它<b>不太會改變</b>血中 K 等的濃度<sup>[1]</sup>','可以靠透析液把 K 降下來、把 bicarbonate 補進去'],
     ['會不會補液','不補，目的就是脫水','HD 不需補液；純 hemofiltration（ICU 的 CVVH）才要補 replacement fluid<sup>[1]</sup>']])+
   `<div class="blk"><h3>為什麼接在 pump 前要加 vacuum：看 TMP 公式</h3><p class="mono" style="background:var(--chip);padding:8px 10px;border-radius:6px">TMP = (P<sub>in</sub> + P<sub>out</sub>) / 2 + |P<sub>濾液端負壓</sub>|</p><ul class="n"><li><span>前半是血路的平均壓，後半是濾液端加的負壓<sup>[2]</sup></span></li><li><span><b>接在 main pump 之後</b>：pump 打出來的壓力讓血路壓夠高，TMP 就夠，不必加 vacuum</span></li><li><span><b>接在 main pump 之前</b>：血路壓很低，只能靠濾液端的負壓撐起 TMP。Tamari 等人的例子：血路平均壓約 30 torr，濾液端加 −400 torr，TMP 才到 430 torr<sup>[2]</sup></span></li><li><span>CPB 迴路適合做 ultrafiltration，正是因為它本來就有 pump 或正壓的位置可以推血通過 hemoconcentrator<sup>[3]</sup></span></li></ul></div>`+
   recs([['T24','高風險或貧血病人用 MUF，或 CUF 合併 MUF，減少胸管出血與輸血','I','A']])+
   `<p>CUF = conventional ultrafiltration（CPB 中）；MUF = modified ultrafiltration（CPB 後）。</p>`+
   `<div class="blk"><h3>參考文獻</h3><ol style="margin:0;padding-left:20px;font-size:13.5px;display:flex;flex-direction:column;gap:6px"><li>Reis T, Ronco C, Soranno DE, et al. <a href="https://karger.com/bpu/article/53/5/329/862430/Standardization-of-Nomenclature-for-the-Mechanisms">Standardization of Nomenclature for the Mechanisms and Materials Utilized for Extracorporeal Blood Purification</a>. <i>Blood Purif.</i> 2024;53(5):329–342. doi:10.1159/000533330</li><li>Tamari Y, Nelson R, Levy R, et al. <a href="https://ject.edpsciences.org/articles/ject/pdf/1983/05/ject1983155p133.pdf">Concentration of Blood in the Extracorporeal Circuit Using Ultrafiltration</a>. <i>J Extra Corpor Technol.</i> 1983;15(5):133–142.</li><li>Searles B. <a href="https://ject.edpsciences.org/articles/ject/pdf/2006/01/ject-38-64.pdf">Ultrafiltration Techniques and CPB: What We Know and What We Think We Know</a>. <i>J Extra Corpor Technol.</i> 2006;38:64. doi:10.1051/ject/200638064</li></ol></div>`
 },

 reservoir:{k:'RESERVOIR', title:'Venous reservoir 與 priming', sub:'Prime volume 是 CPB hemodilution 的主因。', body:()=>
   ul('Reservoir',[['M','Collapsible bag 或 hard-shell container'],['','負壓輔助引流：'+go('vavd','看 VAVD')],['M','Vacuum-assisted drainage：負壓比 '+K('−60 mmHg')+' 更負 → microbubbles 增加']])+
   ul('Priming',[['M','On-pump 時循環容積增加 '+K('20–35%')+'：稀釋蛋白、formed elements、藥物濃度'],['M','Prime 常加 albumin、heparin、bicarbonate'],['M','Miller 提到加 mannitol，但 EACTS 不建議 routine 加（III / B）']])+
   recs([['T36','減少 priming volume、使用 autologous priming','I','A'],['T36','Prime 中 routine 加 mannitol','III','B'],['T36','Prime 中用 low-molecular-weight starch','III','C'],['T36','維持 pH 7.35–7.45、避免 hyperchloraemic acidosis','IIa','B'],['T35','以 MiECC 的概念優化 CPB 系統','I','B'],['T5','Priming 前先用 CO2 flush 整個 circuit','I','B'],['T2','Hardshell reservoir 要有 level sensor','I','C'],['T44','Assisted drainage 要用核准的 venous reservoir','I','C'],['T44','Assisted drainage 時監測 venous line 負壓','I','C'],['T44','過度負壓（溶血）','III','B'],['T10','Closed venous reservoir 減少發炎反應','IIb','B']])
 },

 pump:{k:'ARTERIAL PUMP', title:'Arterial pump', sub:'Roller 怕空氣，Centrifugal 怕逆流。', body:()=>
   tbl('Roller vs. Centrifugal','項目,Roller,Centrifugal'.split(','),[['類型','Positive displacement · occlusive','Kinetic · nonocclusive'],['Blood trauma','較高','較低'],['壓力','可產生極高正壓與負壓','無法產生極端壓力'],['空氣','<span class="key">風險高</span>：會把大量空氣打進病人','風險低：空氣留在錐體內，pump 推不動'],['逆流','無（管路被壓扁）','<span class="key">風險高</span>：轉速過低 → 血倒流回 reservoir'],['安全裝置','Servo-regulation：高壓或氣泡自動降速','One-way valve、電子動脈管夾、轉速控制']],'M')+
   recs([['T2','用 centrifugal arterial pump','IIa','C'],['T12','預期 CPB 時間較長 → centrifugal pump','IIa','C'],['T42','Pulsatile perfusion 改善腎灌流（尤其高風險病人）','IIa','B']])
 },

 he:{k:'HEAT EXCHANGER', title:'Heat exchanger 與溫度', sub:'通常和 oxygenator 做在一起，用水路控制血溫。', body:()=>
   ul('',[['補充','水–血溫差不宜過大（常見 ≤ 10°C）：升溫時氣體溶解度下降會冒泡'],['K','動脈血溫不超過 37.5°C（Kaplan）'],['E','EACTS：oxygenator 出口溫最高 '+K('37°C')]])+
   recs([['T28','限制 oxygenator arterial outlet 最高 37°C，避免 hyperthermia','I','A'],['T28','能維持足夠 DO2 時，normothermic CPB 減少術後認知功能障礙','IIa','B'],['T16','持續監測 oxygenator 出口溫','I','C'],['T16','同時在多個部位量血溫與組織溫','I','C']])+
   `<p>水從哪來：${go('hcu','Heater-cooler unit')}</p>`
 },

 hcu:{k:'HEATER-COOLER', title:'Heater-cooler unit', sub:'提供 heat exchanger 的循環水；注意 Mycobacterium chimaera 感染。', body:()=>
   recs([['T6','依機構政策建立 M. chimaera 感染偵測流程','I','B'],['T6','依廠商或驗證流程定期採樣、清潔、消毒（至少每年）','I','C'],['T6','HCU 盡量放在手術室外','I','C'],['T6','用 PCR 加培養提升 HCU 汙染診斷','IIb','C'],['T6','HCU 排氣導出手術室、距病人至少 2 公尺','IIb','C']])
 },

 oxy:{k:'OXYGENATOR', title:'Oxygenator', sub:'像自己的肺：gas space 與 blood space 之間靠 passive diffusion。', body:()=>
   ul('',[['M','Membrane 隔開 gas 與 blood'],['M','氣體有獨立 inlet、outlet，持續流動 = sweep gas'],['M','Volatile anesthetic 可接在 sweep gas 上給'],['補充','PaO2 看 FiO2，PaCO2 看 sweep flow']])+
   recs([['T11','Microporous membrane oxygenator 為標準','I','B'],['T11','用氣麻時選 polymethylpentene（PMP）oxygenator','III','B'],['T13','Leucodepletion filter 與 membrane oxygenator 併用時 routine 使用','III','B'],['T52','成人 high-moderate hypothermia 用 alpha-stat','IIa','B'],['T16','持續監測 SvO2 與 HCT','I','B'],['T16','定時或連續做 blood gas','I','C']])+
   `<p>氣體與氣麻：${go('gas','Gas blender')}</p>`
 },

 gas:{k:'GAS', title:'Gas blender、sweep gas 與氣麻', sub:'FiO2 決定 PaO2，sweep flow 決定 PaCO2。', body:()=>
   ul('CO2：另外接，不經過 gas blender',[['','Sweep gas 只有 O2 和 air；CO2 通常另外接一條'],['E','<b>Priming 前</b>：用 CO2 flush 整個 CPB circuit，把迴路裡的空氣換成 CO2。CO2 溶解度比空氣高很多，殘留的氣泡容易溶掉，減少 gaseous microemboli'],['E','<b>手術中</b>：有些心外醫師會把 CO2 吹進<b>手術野</b>（CO2 insufflation），把開放的心臟和胸腔裡的空氣趕走，減少 air emboli'],['E','吹 CO2 時要調整氣流，避免 hypercapnic acidosis：CO2 會被吸收進血液，sweep flow 可能要調大']])+
   recs([['T5','Priming 前用 CO2 flush CPB circuit，作為降低 GME 的標準做法','I','B'],['T5','手術野 CO2 insufflation 減少 emboli','IIb','B'],['T5','手術野吹 CO2 時調整氣流，避免 hypercapnic acidosis','I','C']])+
   recs([['T4','O2、air、CO2 管路供應在 CPB 前確認、CPB 中監測，並備有鋼瓶','I','C'],['T4','監測所有進出氣體','IIa','C'],['T4','有接氣麻時，oxygenator 出口要有 scavenging','I','C'],['T47','用核准的設備在 CPB 中給氣麻','I','C'],['T47','監測 oxygenator exhaust 的氣麻濃度','IIa','B'],['T47','CPB 中用氣麻維持麻醉','IIb','B'],['T47','CPB 前後立即使用 nitrous oxide（N2O）','III','B']])
 },

 alf:{k:'ALF', title:'Arterial line filter', sub:'移除 particulate 與 gaseous microemboli。', body:()=>
   ul('',[['M','新一代產品把動脈過濾整合進 oxygenator']])+
   recs([['T13','ALF 減少 microemboli','IIb','C'],['T13','Leucodepletion filter 與 membrane oxygenator 併用時 routine 使用','III','B']])
 },

 safety:{k:'SAFETY', title:'Arterial line 壓力與 bubble detector', sub:'打進病人的那條管路要有壓力、氣泡、流量監測。', body:()=>
   ul('',[['M','Arterial line 壓力維持 '+K('< 300 mmHg')+'，避免傷害 formed elements'],['K','Inflow line pressure 太高：想到 dissection、cannula 位置不對']])+
   recs([['T2','Arterial line（oxygenator 前後）與 cardioplegia 都要壓力監測','I','C'],['T2','所有通往病人的管路都要 bubble detector','I','C'],['T2','重要系統隨時有備援','I','C'],['T16','Arterial line 用超音波量流量','I','C']])
 },

 cp:{k:'CARDIOPLEGIA', title:'Cardioplegia 系統', sub:'從 oxygenator 取血（或晶體液）加 K，經自己的 heat exchanger 打出。', body:()=>
   ul('成分',[['K','Blood vs. crystalloid：<b>blood 能帶氧</b>'],['K','K：induction 最高，maintenance 降低'],['K','Buffers：bicarbonate、THAM'],['K','Osmotic：glucose、mannitol、K'],['K','Substrates：glucose、glutamate、aspartate']])+
   tbl('溫度','種類,溫度,備註'.split(','),[['Cold','10–12°C','最常用，常搭配 ice slush'],['Tepid','27–30°C',''],['Warm','37–38°C','']],'K')+
   tbl('安全停搏時間','策略,溶液,時間'.split(','),[['Multidose','一般高鉀液','<span class="mono">20–30 min</span>（每劑間）'],['Single-dose','del Nido','<span class="mono">45 min</span>'],['Single-dose','HTK','<span class="mono key">90 min</span>']],'M')+
   `<p>灌進去：${go('ante','Antegrade（root）')} · ${go('retro','Retrograde（CS）')}</p>`
 },

 lungs:{k:'LUNGS', title:'肺', sub:'CPB 時肺不參與氣體交換；術後 atelectasis、pleural effusion 常見。', body:()=>
   ul('',[['K','PA catheter 往後拉 '+K('3–5 cm')],['K','術後 atelectasis 與 pleural effusion 常見']])+
   recs([['T31','Aortic cross-clamp 期間繼續通氣或 CPAP','III','A'],['T32','Routine 用 steroids 保護肺','III','A'],['T30','Selective pulmonary artery perfusion（高風險病人）','IIb','B'],['T14','Biocompatible circuit 減少肺部發炎反應','IIa','B']])
 },

 anes:{k:'ANESTHESIA', title:'麻醉端：抗凝與監測', sub:'Heparin 上機、protamine 下機；監測看腦、心、灌流是否足夠。', body:()=>
   ul('Anticoagulation',[['M','Heparin '+K('300–400 U/kg')],['K','給完至少等 '+K('3 min')+' 再驗'],['M','ACT 量的是抗凝<b>效果</b>，不是 heparin 濃度'],['補充','常見上機目標 ACT > 400–480 秒（依各院 protocol）']])+
   recs([['T37','依院內 protocol 定時驗 ACT 並追加 heparin','I','C'],['T45','AT deficiency：首選 antithrombin concentrate','I','B'],['T45','沒有 AT concentrate 時給 FFP','IIa','C'],['T39','Acute type 2 HIT → 第一線 bivalirudin','IIa','B'],['T39','HIT 且明顯腎功能不全 → argatroban','IIb','C'],['T38','Protamine : heparin < 1.0','I','B']])+
   `<p>其他：${go('targets','CPB 中目標值')} · ${go('monitor','監測與術前用藥')} · ${go('drugs','麻藥與輸血')}</p>`
 },

 targets:{k:'TARGETS', title:'CPB 中的目標值', sub:'考試以 EACTS 數字為準：MAP 50–80、DO2 ≥ 280、出口溫 ≤ 37°C。', body:()=>
   tbl('三份資料的數字對照','參數,Miller／Kaplan,EACTS 2024'.split(','),[['MAP','50–90 mmHg','<span class="key">50–80 mmHg</span>（I / A）'],['DO2','> 270','<span class="key">≥ 280 mL/min/m²</span>（I / A）'],['動脈血溫','≤ 37.5°C（K）','<span class="key">≤ 37°C</span>（I / A）'],['Pump flow','50–70 mL/kg/min，CI 2.2–2.4','依代謝參數，無 validated threshold'],['SvO2','> 65%','—'],['Arterial line','< 300 mmHg','—'],['Base excess','< −5 建議校正','—']])+
   recs([['T40','MAP 維持 50–80 mmHg','I','A'],['T40','用 vasopressor 把 MAP 拉到 > 80','III','B'],['T40','依個人 cerebral autoregulation 設定 MAP','IIa','A'],['T40','Vasoplegia → α1-agonist 和／或 vasopressin','I','C'],['T40','Refractory → methylene blue 或 terlipressin','IIa','B'],['T40','Hydroxocobalamin 或 angiotensin II','IIb','C'],['T41','上機前依 BSA 與降溫程度估算 pump flow','I','C'],['T41','Flow 是否足夠依 oxygenation 與代謝參數判斷','IIa','B'],['T41','DO2 最低 280 mL/min/m²','I','A'],['T41','肥胖以 lean body mass 計算 flow','IIb','B'],['T43','Goal-directed perfusion 降低 early AKI','I','A'],['T43','限制 DO2 nadir 與低 DO2 的時間','I','B'],['T43','Normothermic CPB 時 DO2 下限 280–300','IIa','B']])
 },

 monitor:{k:'MONITORING', title:'監測與術前用藥', sub:'', body:()=>
   recs([['T20','TOE（除非 absolute contraindication）','I','B'],['T20','Selected cases 用 PAC','IIa','B'],['T20','Selected patients 用 pulse contour','IIb','B'],['T17','NIRS-guided algorithm 偵測 cerebral hypoperfusion','IIa','B'],['T18','Processed EEG 減少 awareness 與麻醉過深','IIa','B'],['T19','Selective cerebral perfusion 時用 TCD','IIb','C'],['T33','使用 CPB checklist','I','C'],['T22','手術前才開始 statin','III','A'],['T22','原本吃 statin 維持原劑量','IIa','B'],['T23','Chronic β-blocker 繼續','I','A'],['T23','β-blocker naive 短期低劑量','IIb','B']])
 },

 drugs:{k:'DRUGS', title:'麻藥與輸血', sub:'低溫時 remifentanil 要減量，其他 IV 藥不能減。', body:()=>
   ul('',[['E','Remifentanil 要減量：低溫降低 esterase 活性'],['E','其他 IV 藥因 hemodilution 與 circuit 吸附，劑量不能減']])+
   recs([['T47','Maintenance phase：IV 麻藥與 opioids 至少同 CPB 前（remifentanil 除外）','IIa','B'],['T47','Remifentanil：32°C 20–30 min 後減 30%，< 28°C 立即減 60%','IIb','B'],['T47','Normothermia／mild hypothermia 用 Minto model','IIb','B'],['T47','Fast-track／ERAS：CPB 前用 short-acting NMB','IIa','B'],['T45','CPB 中 Hct < 18%（Hb 6.0）→ 輸 PRBC','I','C'],['T45','Hct 18–24% → 依組織氧合考慮','IIb','B'],['T45','Hct > 24% 且 DO2 可接受 → 輸 PRBC','III','C'],['T45','預防性給 FFP','III','B'],['T24','高風險或貧血病人用 MUF（或 CUF + MUF）','I','A']])
 },

 organ:{k:'END-ORGAN', title:'End-organ effects', sub:'三個機轉：whole-body inflammatory response + embolization + hypoperfusion。', body:()=>
   tbl('Kaplan Key Points','器官,重點'.split(','),[['心臟','短暫缺血可造成 stunning；blood cardioplegia 能帶氧'],['CNS','<b>年齡</b>是 stroke 與 neurocognitive dysfunction 最重要的危險因子'],['腎','AKI 影響預後；dopamine、diuretics 無法預防'],['肺','Atelectasis、pleural effusion 常見'],['腸胃','Pancreatitis、GI bleeding、bowel infarction、cholecystitis']],'K')+
   recs([['T28','Oxygenator 出口最高 37°C','I','A'],['T29','Routine 用 vasoconstrictor 拉高 MAP 預防 AKI','III','A'],['T29','圍術期 IV balanced amino acids','IIa','B'],['T29','CKD 病人 IV N-acetylcysteine','IIb','B'],['T46','Routine 使用 haemoadsorption','III','B']])
 },

 arch:{k:'ARCH / DHCA', title:'Aortic arch 與 DHCA', sub:'Antegrade、moderate hypothermia、bilateral NIRS。', body:()=>
   ul('',[['E','鼻咽溫代表腦溫、變化快；膀胱／直腸溫代表內臟、變化慢，一起看才知道降溫與升溫是否均勻']])+
   recs([['T51','優先 antegrade arterial inflow','IIa','B'],['T51','Antegrade systemic perfusion 用 axillary cannulation','IIa','B'],['T51','複雜 arch 用 antegrade cerebral perfusion','IIa','B'],['T51','Moderate hypothermia（20.1–28°C）circulatory arrest + ACP','IIa','B'],['T51','同時量鼻咽溫 + core 溫','I','C'],['T51','Bilateral NIRS','I','C'],['T51','TCD 個別化 cerebral perfusion','IIb','C'],['T52','Alpha-stat','IIa','B'],['T53','Sodium thiopental 保護腦','IIb','B'],['T53','Steroids 保護腦','IIb','C']])
 },

 wean:{k:'WEANING', title:'Weaning 與 Separation', sub:'離機前確認溫度、節律、檢驗值、通氣、de-airing；離不下來不要硬拉。', body:()=>
   ul('離機前 checklist',[['補充','已回溫，動脈血溫不超過 37°C'],['補充','Rhythm／rate：必要時 pacing'],['補充','K、iCa、Hb、ABG、glucose'],['補充','恢復通氣、EtCO2'],['補充','TEE 確認 de-airing'],['補充','Monitors re-zero；inotropes／vasopressors 備好']])+
   ul('Separation',[['補充','部分夾 venous line、降 pump flow，讓心臟慢慢 fill'],['補充','看 TEE、CVP、PAP、BP 評估 preload 與 contractility'],['補充','成功 → 回輸 → protamine → decannulation']])+
   recs([['T54','Weaning 前使用 checklist','I','C'],['T55','Difficult weaning 採多專科合作','I','B'],['T55','用高劑量 inotropes 與 vasoconstrictors 硬是 wean','III','B'],['T55','短期 mechanical circulatory support','IIa','B'],['T48','LCOS 第一線 inotropes 和／或 vasopressors','I','A'],['T48','低 LVEF 的 isolated CABG → levosimendan','IIa','A'],['T48','LV 差且 LCOS → levosimendan 改善存活','IIb','B'],['T38','Protamine : heparin < 1.0','I','B'],['T56','CPB circuit 殘餘血液輸回','I','C'],['T56','Processed 殘餘血液輸回','IIa','B'],['T50','病人關胸前 CPB circuit 保持可用','I','C']])
 }
};

const PARTS = [['heart','心臟'],['aorta','Aorta'],['clamp','X-clamp'],['ante','Aortic root'],['retro','Coronary sinus'],['lvvent','LV vent'],['venous','Venous cannula'],['vclamp','Venous line'],['suction','Suction'],['reservoir','Reservoir'],['vavd','VAVD'],['hemo','Hemoconcentrator'],['pump','Arterial pump'],['he','Heat exch.'],['oxy','Oxygenator'],['gas','Gas blender'],['hcu','Heater-cooler'],['alf','ALF'],['safety','壓力／氣泡'],['cp','Cardioplegia'],['ventpumps','Vent pumps'],['lungs','肺'],['anes','麻醉端']];
const TOPICS = [['intro','從哪裡開始'],['targets','CPB 中目標值'],['monitor','監測與術前用藥'],['drugs','麻藥與輸血'],['organ','End-organ'],['arch','Arch／DHCA'],['wean','Weaning']];
