# Research handoff evaluation

The three handoffs serve different starting points:

- **Paper:** `createPaperHandoff` includes the complete wiki digest and metadata. The recipient should immediately analyze the paper and attempt its original PDF when tools permit.
- **Homepage:** `researchPrompt` supports discovery without a supplied topic. The initial response should provide a bounded shortlist and a focused question, without downloading a corpus of PDFs.
- **Filtered selection:** `createFilteredAgentBrief` freezes the human-selected IDs. The recipient may prioritize a first batch, but must identify pending papers and ask before expanding the set. Reading a selected paper's PDF does not expand the paper scope.

## What to evaluate

Run the generated payloads through a recipient model, rather than only asking a model to review the prompt. Check for actual source retrieval, useful first output, an evidence-supported method diagram, experimental setup, metric definitions, and separation of reported findings from proposed reproduction steps. Check arithmetic, units and boundary cases independently. A successful download is not proof of PDF reading; a `full-paper` digest label describes provenance, not the recipient's access.

Also run without browsing tools. A paper handoff should still produce useful digest-based analysis and accurately state its evidence limits. A homepage prompt without accessible data must not invent catalog entries. A filtered brief with only metadata and summaries must not fabricate detailed experiments.

The automated tests in `scripts/web/agent-export.test.ts` verify source-preserving exports, frozen IDs, bounded discovery and prompt-policy consistency. They do not prove that ChatGPT, Claude, or any other recipient will follow those instructions.

## 2026-09-29 behavioral checks

- BACON (`xu26o_interspeech`), tool-enabled subagent: retrieved the original PDF through its metadata URL and read text extracted from all five pages. The response included reconstructed method equations, a Mermaid diagram, reported setup, metric definitions and analysis of the paper's latency proxy.
- The same generated paper handoff, Claude Opus 5.5 with tools disabled: produced a substantive digest-based analysis, diagram, setup table, metric definitions and proposed reproduction work. It correctly disclosed that it had not retrieved the PDF. Review caught errors in derived context-window arithmetic and an excessive number of follow-up questions; the final prompt adds explicit unit/boundary checks and limits the ending to one focused question. Those instructions reduce omissions; they do not establish mathematical correctness.
- Homepage, Claude Opus 5.5 with read-only local catalog/digest fixtures standing in for URL responses: produced six research directions, five justified starter papers, and a method/data/metrics comparison; no PDFs were fetched. This checks response behavior, not live catalog-fetch reliability. Its no-URL-tools fallback explicitly avoided inventing catalog entries.
- Filtered selection, the same fixture-based recipient test for BACON, `andrusenko26_interspeech`, and `yang26h_interspeech`: retained exactly those three IDs, produced a comparison and method diagram, defined metrics, identified reproducibility gaps, and avoided ranking incompatible scores. It disclosed unavailable PDFs. The metadata-only fallback limited its claims to the supplied summaries.

The homepage/filtered samples predate the final clarification that the detailed reading-note format applies only to deep reads. Their fallback samples were generated in the same model context, not isolated controls. The filtered response was lengthy and overstated a metadata-listed checkpoint as verified; a listed URL does not establish independent resource verification. These remain recipient-model limitations to watch in future evaluations.

These are sampled evaluations, not a guarantee of identical output across models. PDF access depends on the recipient's tools and source availability. This evaluation does not constitute a test in the ChatGPT web application.
