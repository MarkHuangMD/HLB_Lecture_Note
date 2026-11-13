# CPB 互動讀書筆記（公開版，不含照片）

以一張 CPB 迴路示意圖為底，點各個元件就會看到對應的筆記與 EACTS 2024 建議。

> 這是**公開版**：不含本院照片，可以放在 public repository 用 GitHub Pages 分享。含照片的版本另外保存，不要放進這個 repository。

內容整理自 Miller's Anesthesia Ch50、Kaplan's Cardiac Anesthesia Ch31、2024 EACTS/EACTAIC/EBCP Guidelines on CPB。

---

## 資料夾結構

```
cpb-notes/
├── index.html          頁面骨架與 CPB 示意圖（SVG）
├── css/style.css       外觀
├── js/helpers.js       產生清單、表格、EACTS 建議的小工具
├── js/app.js           點擊、顯示筆記、照片放大
├── content/topics.js   ★ 筆記內容（最常改這個）
├── content/photos.js   ★ 照片說明與「本院」方框
└── photos/             ★ 照片檔
```

平常只需要改有 ★ 的三個地方。

---

## 在自己電腦上看

直接雙擊 `index.html` 就能開。`photos/`、`content/` 這些資料夾要和 `index.html` 放在一起。

---

## 放上 GitHub Pages

1. 在 GitHub 建一個新的 repository，例如 `cpb-notes`。
2. 把這個資料夾裡的所有檔案上傳到 repository 的最上層（`index.html` 要在最上層，不要多包一層資料夾）。
   - 網頁上傳：repository 頁面 → **Add file → Upload files** → 把檔案和資料夾整批拖進去 → **Commit changes**。
3. 到 **Settings → Pages**：
   - Source 選 **Deploy from a branch**
   - Branch 選 **main**，資料夾選 **/ (root)** → **Save**
4. 等一兩分鐘，網址會是 `https://你的帳號.github.io/cpb-notes/`。

> **注意：** 免費帳號的 GitHub Pages 需要 repository 設成 **Public**，任何人都看得到內容和照片。上傳前請再檢查一次照片裡沒有病人資料、病歷號、醫院內部標籤等資訊。

---

## 怎麼改內容

改完存檔後，在 GitHub 上傳覆蓋（或用 GitHub 網頁直接點檔案右上角的鉛筆編輯），一兩分鐘後網頁就會更新。

### 改某個元件的筆記

打開 `content/topics.js`，找到那個元件的 id（例如 `reservoir:`、`gas:`），直接改文字。

可用的寫法（檔案最上面也有說明）：

| 寫法 | 產生什麼 |
| --- | --- |
| `ul('小標題', [['M','文字'], ['K','文字']])` | 條列；第一格是來源標籤 M、K、E、補充，或留空 `''` |
| `tbl('標題', ['欄1','欄2'], [['a','b']], 'M')` | 表格 |
| `recs([['T40','建議內容','I','A']])` | EACTS 建議：Table、內容、Class、Level |
| `warn('文字')` | 紅底提醒 |
| `go('gas','看 Gas blender')` | 跳到另一個元件的連結 |
| `K('90%')` | 紅色粗體數字 |

每一段之間用 `+` 接起來。

### 加一張照片

1. 照片放進 `photos/`，檔名用英文和數字，例如 `34-sucker.jpg`。寬度 400–800 px 就夠。
2. 打開 `content/photos.js`，在 `PHOTOS` 裡找到元件 id，加一行：

   ```js
   P('34-sucker.jpg','照片標題','<p>說明文字</p>',[{x:50,y:40,t:'標籤'}]),
   ```

   - 最後的 `[...]` 是照片上的紅圈：`x`、`y` 是從左上角算起的百分比，`t` 是標籤文字，加 `l:1` 讓標籤放在圈圈左邊。
   - 不需要紅圈就寫 `P('34-sucker.jpg','標題','<p>說明</p>')`。

   如果那個元件還沒有任何照片，就新增一組：

   ```js
   suction:[
     P('34-sucker.jpg','標題','<p>說明</p>')
   ],
   ```

### 改「本院」方框

在 `content/photos.js` 的 `LOCAL` 裡，用元件 id 加或改一段，例如：

```js
pump:'<div class="local"><h3>本院</h3><p>文字</p></div>',
```

### 在示意圖上加一個新元件（進階）

1. `index.html`：在 `<svg>` 裡畫出元件，外面包一層
   `<g class="hs" data-id="新id" tabindex="0" role="button" aria-label="名稱"> … </g>`
2. `content/topics.js`：在 `T` 裡加 `新id:{k:'…', title:'…', sub:'…', body:()=> … }`，並把 `['新id','按鈕文字']` 加進 `PARTS`。
3. 有照片的話，`content/photos.js` 的 `PHOTOS` 也加一組。

### 元件 id 對照

| id | 元件 | id | 元件 |
| --- | --- | --- | --- |
| heart | 心臟 | reservoir | Venous reservoir |
| aorta | Aorta | vavd | VAVD |
| clamp | X-clamp | hemo | Hemoconcentrator |
| ante | Aortic root | pump | Arterial pump |
| retro | Coronary sinus | he | Heat exchanger |
| lvvent | LV vent | oxy | Oxygenator |
| venous | Venous cannula | gas | Gas blender |
| vclamp | Venous line | hcu | Heater-cooler |
| suction | Suction | alf | ALF |
| ventpumps | Vent pumps | safety | 壓力／氣泡 |
| cp | Cardioplegia | lungs | 肺 |
| anes | 麻醉端 | | |

主題（沒有對應單一元件）：`intro`、`targets`、`monitor`、`drugs`、`organ`、`arch`、`wean`。

---

## 出錯時

改完打開網頁一片空白或點了沒反應，通常是 `content/*.js` 少了逗號、引號或括號。在瀏覽器按 F12 → Console，會顯示是哪個檔案第幾行出錯。
