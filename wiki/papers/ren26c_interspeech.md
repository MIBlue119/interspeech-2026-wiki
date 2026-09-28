---
id: ren26c_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1117
---

# Adapting Audio Large Language Models for Speaker Verification

**TL;DR** — Fine-tuning audio LLMs with a hard-pair sampling strategy substantially closes the gap to conventional speaker verification models, and extends naturally to jointly verifying identity and spoken content.

## Problem

It's unclear how well Audio Large Language Models (ALLMs), which weren't designed for speaker verification (SV), can be adapted for it, and zero-shot performance had not been systematically assessed.

## Method

The authors reformulate SV as an audio question answering task, first showing via zero-shot evaluation on public benchmarks that current ALLMs have limited SV capability; they then apply supervised fine-tuning with a rule-based hard-pair sampling strategy to construct more challenging training pairs, and extend the approach to text-dependent SV by jointly querying ALLMs to verify both speaker identity and spoken content.

## Results

Lightweight fine-tuning substantially improves ALLM performance on SV, though a gap to conventional SV models remains; the text-dependent extension yields results competitive with cascaded ASR-SV systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Unified audio-LLM-based systems that combine speaker verification with general audio understanding, e.g., voice-based authentication assistants.

## Related

- (link related pages by id as the wiki grows)
