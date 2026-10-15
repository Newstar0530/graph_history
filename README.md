# Les Traces de Nova

一個旋轉的 3D 地球，會飄出各國語言的「哈囉」。造訪過的國家會發出紫色光芒，點進去照片會環狀散開，再點照片會出現歷史典故（網站內容為英文）。

## 啟動

```bash
python -m http.server 8000
```

然後打開 http://localhost:8000 （直接雙擊 `index.html` 也可以）。

## 新增國家與照片

1. 把照片放到 `photos/<國家>/`，例如 `photos/japan/kinkakuji.jpg`
2. 編輯 `js/data.js`，在 `TRAVELS` 裡新增或修改國家與照片資料
   - key 要用英文國名，例如 `"South Korea"`、`"United Kingdom"`、`"United States of America"`
   - 照片還沒放進去時，會自動顯示「照片待補」佔位圖

## 檔案結構

```
index.html      頁面結構
css/style.css   樣式
js/data.js      ← 你的旅行資料（主要編輯這個）
js/app.js       地球與互動邏輯
photos/         你的照片
```

## 線上網址

- 獨立網站：https://newstar0530.github.io/graph_history/
- 個人網站（CV）的「Travels」區塊用 iframe 嵌入上面的網址，所以只要更新這個專案，CV 上的內容就會跟著更新。

更新內容後 commit 並 push 到 `main`，GitHub Pages 約一兩分鐘後就會生效。
