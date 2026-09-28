# STATUS

Project: interspeech-2026-wiki

Notebook: .agentflow/devlog.md — root.

Current commit: none yet; the first Agentflow closeout will create it.

Tests/scenarios: none.

Configuration: ag.json — schema v8; validated for claude-code this round.

Proven: the host template was initialized.

Open: none.

Next: await the first request.

Artifacts: none.

Archived eras: none.

Streams: none.

---

# → Ask / A-001 (miblue119)

+ 好 那就照這個架構開始建骨架吧 use godev to implemnet this repo and push it to my remote miblue119

+ (補充: godev = agentflow, 來自 https://github.com/agfnow/agentflow)

+ 架構（前面討論定案）: Interspeech 2026 開源論文 wiki repo — OKF/llm-wiki 形式:
  - wiki/ : 每篇論文一個 OKF markdown 編譯頁(YAML frontmatter: id/category/updated/confidence/source), 原創摘要非全文轉檔(ISCA版權歸ISCA, 不可收全文)
  - data/papers/*.yaml : 每篇論文 metadata(title/authors/doi/isca_url/code連結等), README 大表由此自動生成避免 merge conflict
  - scripts 或 Go CLI : 抓 ISCA index(注意 isca-archive.org SSL憑證過期)、本地下載PDF轉md(gitignore)、生成README表、驗證schema、建 zvec-grep(zg)索引
  - AGENTS.md/llms.txt : 告訴 Claude/Codex 怎麼檢索這個 wiki
  - License 雙授權: 程式碼 MIT (LICENSE), 內容 CC BY 4.0 (LICENSE-CONTENT), README註明論文原文版權屬ISCA
  - 範例論文: barreiros26_interspeech (Massive Open-Vocabulary Keyword Spotting)
  - 完成後 push 到 GitHub MIBlue119 帳號 (gh 已登入該帳號, 目前 active 是 weirenlan, 需切換)

---

## [RUN-001] Event — 2026-09-28 22:48:44 +0800 (A-001)

- Skeleton complete: README (auto-generated table markers), CONTRIBUTING, AGENTS.md, llms.txt, dual license (MIT code / CC BY 4.0 content), example paper barreiros26_interspeech (yaml + OKF wiki page), wiki/index.md, CI workflow, setup-zg.sh.

- Go CLI `iswiki` built and verified: `go build`/`go vet` clean; `validate` OK; `readme` regenerates table; `index --insecure` parses all 1379 papers from the live ISCA index (expired-cert handling works); `index --only` + `wiki <id>` generated a correct stub for baek26_interspeech (test files removed after proof).

- Tracker T-1..T-5 proven; scope matches tracker expected paths (docs, licenses, data/wiki example, cmd/iswiki, CI, scripts). Remaining: T-6 publish to GitHub MIBlue119.
