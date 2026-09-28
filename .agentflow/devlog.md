# STATUS

Project: interspeech-2026-wiki

Notebook: .agentflow/devlog.md — root.

Current commit: skeleton commit c3ed096 plus this closeout record commit, pushed to origin/main.

Tests/scenarios: go build/vet; iswiki validate; README regeneration idempotence; live ISCA index parse (1379 papers); stub generation round-trip.

Configuration: ag.json — schema v8; validated for claude-code this round.

Proven: repo skeleton complete, independently reviewed (3×PASS after blocker fix), pushed to github.com/MIBlue119/interspeech-2026-wiki.

Open: none.

Next: await the owner.

Artifacts: .agentflow/artifacts/A-001-interspeech-wiki-skeleton/ (tracker.md, review-001.md).

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

## [RUN-002] Event — 2026-09-28 23:09:58 +0800 (A-001)

- Independent review (native read-only subagent) on commit bcad0669: Outcome PASS, Conformance PASS, Minimality BLOCKING — a stray 9.4MB compiled `iswiki` binary had been committed at the repo root.

- Fix applied exactly as the report prescribed: `git rm --cached iswiki`, `/iswiki` added to .gitignore, worktree copy deleted, fix amended into the single unpublished commit → c3ed096; go build/vet, `iswiki validate`, and `iswiki readme` re-verified clean afterwards.

- Reviewer addendum verified the amended commit c3ed096: Outcome / Minimality / Conformance all PASS (report: .agentflow/artifacts/A-001-interspeech-wiki-skeleton/review-001.md).

- Public GitHub repo created: https://github.com/MIBlue119/interspeech-2026-wiki; gh active account switched to MIBlue119 for the push, to be switched back to weirenlan right after closeout.

# ← Reply / A-001

* _2026-09-28 23:09:58 +0800 (claude-code/unknown)_

## [SUMMARY]

- Interspeech 2026 LLM Wiki 骨架完成，並已 push 到 public repo：https://github.com/MIBlue119/interspeech-2026-wiki

- 獨立 review 抓到一個 blocker（誤 commit 的 9.4MB 編譯 binary），已在 push 前修掉並複審通過，歷史乾淨。

- 建議下一步：跑 `go run ./cmd/iswiki index --insecure` 匯入全部 1379 篇論文 metadata、先挑一個 track 補 wiki 頁，再發 LinkedIn。

## [FINAL REPORT]

1. 照先前定案的架構建 repo 骨架

   - 成功。wiki/ 放 OKF 編譯頁（YAML frontmatter：id/category/updated/confidence/source；範例 barreiros26_interspeech，摘要為原創內容、不收全文）；data/papers/*.yaml 放 metadata，README 大表由 `iswiki readme` 在 PAPERS 標記之間自動生成，避免大家改同一張表的 merge conflict。

   - AGENTS.md 與 llms.txt 告訴 Claude Code / Codex 這個 repo 怎麼查；scripts/setup-zg.sh 建 zvec-grep 語意索引；CI（.github/workflows/ci.yml）跑 go build、metadata 驗證、README 過期檢查。

   - 授權採雙軌：LICENSE（MIT，管程式碼）＋ LICENSE-CONTENT（CC BY 4.0，管 wiki 與 data 內容），README 與 CONTRIBUTING 都明示論文原文版權屬 ISCA 與原作者、只能經 DOI 取得、禁止把全文 commit 進來。

   - Go CLI `iswiki` 五個子指令（index / readme / validate / wiki / fetch）全部實測通過：go build 與 go vet 乾淨；`index --insecure` 從 ISCA 官方 index（憑證目前過期，故有 --insecure 旗標）解析出全部 1379 篇論文；`index --only` + `wiki <id>` 的 stub 生成 round-trip 驗證過；`validate` 與 `readme` 在範例資料上跑過且 README 重生成無 diff。

2. 用 godev（agentflow）執行

   - 成功。安裝了 agfnow/agentflow skill，本輪以 Ask A-001 全程記錄在 .agentflow/devlog.md；tracker 6/6 完成（.agentflow/artifacts/A-001-interspeech-wiki-skeleton/tracker.md）。

   - 獨立 read-only reviewer 審了初版 commit：Outcome PASS、Conformance PASS、Minimality BLOCKING——抓到一個誤 commit 的 9.4MB macOS binary。照報告開的處方修正（移出追蹤、加 .gitignore、amend 進唯一一顆未發布的 commit），複審 addendum 對修正後的 c3ed096 三項全 PASS。報告：.agentflow/artifacts/A-001-interspeech-wiki-skeleton/review-001.md。

3. push 到 GitHub MIBlue119

   - 成功。public repo https://github.com/MIBlue119/interspeech-2026-wiki 已建立（含專案描述），main 分支由本次 closeout push 上去；push 期間 gh active account 切到 MIBlue119，push 完成後隨即切回原本的 weirenlan。


## Questions (batched — each with a suggested default)

- None.


---

# → Ask / A-002 (miblue119)

+
