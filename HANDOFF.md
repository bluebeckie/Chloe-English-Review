# Handoff — 2026-05-10 (Updated after vocab extraction)

## 專案目標
為 Chloe 製作英語複習 web app，目標是劍橋英檢 **Movers** (AI Movers)。
產題方式：隨機挑主詞 + root verb，要求作答；UI 採 Duolingo 式字塊排列組合。

## ✅ 已完成
- Repo 初始化並 push 到 GitHub: https://github.com/bluebeckie/Chloe-English-Review (private)
- 20 張詞彙照片（HEIC）轉換為結構化 JSON，JPEGs 已從 git history 清除
- HEIC 仍在 `src/` — owner 之後自行移除

## 資料結構（已建好）
```
data/vocab/
  movers-level4.json   ← Level 4, Unit 1-3 (照片 IMG_5162-5169)
  movers-level6.json   ← Level 6 "David's World 6", Unit 1-3 (照片 IMG_5170-5177)
  irregular-verbs.json ← ~75 個不規則動詞，含 base/past/pp/ing/thirdPerson/zh
  subjects.json        ← 人稱代名詞 + 範例人名，附 thirdPerson flag
```

### verb schema
```json
{
  "base": "go", "thirdPerson": "goes", "ing": "going",
  "past": "went", "pp": "gone", "regular": false, "zh": "去"
}
```

### subject schema
```json
{ "word": "she", "person": 3, "number": "singular", "thirdPerson": true, "zh": "她" }
```

## 已確認的決策
1. **平台**：Web（Vite + React + TypeScript + Tailwind）
2. **題目提示語言**：中文
3. **資料儲存**：JSON files + localStorage（進度）
4. **詞彙範圍**：Level 4 + Level 6 已完成；Level 5 之後補
5. **文法模組順序**：
   1. 第三人稱單數 -s/-es（最簡單，先跑通整條 pipeline）
   2. 簡單式 vs. 進行式
   3. 現在簡單式 / 現在進行式 否定句與疑問句
   4. 過去簡單式 / 過去進行式
   5. 過去簡單式 / 過去進行式 否定句與疑問句

## 下一步（接手後立刻做）
1. **建 Vite + React + TS + Tailwind 專案骨架**（在 repo root）
   ```bash
   npm create vite@latest . -- --template react-ts
   npm install
   npm install -D tailwindcss @tailwindcss/vite
   ```
2. **實作第一個文法模組「第三人稱單數」**，端到端跑通：
   - generator：隨機 pick subject（he/she/it/名字）+ verb → 產出正確 token 序列 + 干擾 token
   - Duolingo 式選字 UI（點字塊排成句子）
   - 對錯回饋 + localStorage 進度
3. 補其餘 4 個文法模組
4. 加首頁（選模組）+ 錯題複習

## 注意事項
- Level 4 的中文是推斷補上的（照片中文欄被遮住），上線前需校對
- `irregular-verbs.json` 是兩個 Level 共用，generator 應 merge 兩者的動詞列表再 dedupe
- `movers-level6.json` 的 `verbPhrases`（如 "take care of"）先不用於基礎文法題，留待進階題型
- `movers-level4.json` 裡 `cookie` 重複出現（Unit 1 + 其他），generator 要 dedupe

## Carryon 指令
下次開始時說「carryon」或讓 Claude 讀這個 `HANDOFF.md`。
