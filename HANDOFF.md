# Handoff — 2026-05-10 12:03

## 專案目標
為 Chloe 製作英語複習 web app，目標是劍橋英檢 **Movers** (AI Movers)。
產題方式：隨機挑主詞 + root verb，要求作答；UI 採 Duolingo 式字塊排列組合。

## 目前進度
- ✅ Repo 初始化並 push 到 GitHub: https://github.com/bluebeckie/Chloe-English-Review (private)
- ✅ `src/` 內 20 張 HEIC 詞彙照片轉成 JPEG，放在 `src/jpeg/`（IMG_5162–5181.jpg）
- ✅ 規劃方向已確認（見下）
- ⏳ 尚未開始程式碼

## 已確認的決策
1. **平台**：Web（Vite + React + TypeScript + Tailwind）
2. **題目提示語言**：中文
3. **資料儲存**：本地 JSON 檔（`data/vocab/*.json`、`data/grammar/*.json`），進度用 localStorage
4. **詞彙範圍**：先做 Movers Level 4 + Level 6；Level 5 之後再補
5. **文法模組（依此順序開發）**
   1. 簡單式 vs. 進行式
   2. 現在簡單式 / 現在進行式 第三人稱動詞
   3. 現在簡單式 / 現在進行式 否定句與疑問句
   4. 過去簡單式 / 過去進行式（規則與不規則）
   5. 過去簡單式 / 過去進行式 否定句與疑問句
   - 未來會擴增（祈使句、完成式…），所以每個文法主題一個獨立模組檔

## 下一步（接手後立刻做）
1. **讀 `src/jpeg/` 裡的 20 張詞彙照片**，抽出 Level 4 與 Level 6 詞彙，整理成：
   - `data/vocab/movers-level4.json`
   - `data/vocab/movers-level6.json`
   - 動詞 entry schema：`{ base, thirdPerson, ing, past, pastParticiple, regular, level, sampleObjects[] }`
   - 名詞/主詞另一張表（含單複數、人稱）
2. 建 Vite + React + TS + Tailwind 專案骨架（在 repo root）
3. 實作第一個文法模組「**第三人稱單數 -s/-es**」端到端跑通：
   - generator → Duolingo 式選字 UI → 對錯回饋 → localStorage 進度
4. 補其餘 4 個文法模組
5. 加錯題複習機制

## 詞彙資料 schema 範例
```json
{
  "base": "go", "thirdPerson": "goes",
  "ing": "going", "past": "went", "pastParticiple": "gone",
  "regular": false, "level": 4,
  "sampleObjects": ["to school", "home"]
}
```

## 相關檔案
- `src/jpeg/IMG_5162.jpg` ~ `IMG_5181.jpg` — 詞彙照片（待 OCR/人工抽取）
- `src/*.HEIC` — 原始照片（保留備份）
- `.gitignore` — 已設好（node_modules, dist, .DS_Store…）

## Carryon 指令
下次開始時說「carryon」或「繼續」，或直接讓 Claude 讀這個 `HANDOFF.md`。
