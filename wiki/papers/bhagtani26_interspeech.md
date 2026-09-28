---
id: bhagtani26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3083
pdf: https://www.isca-archive.org/interspeech_2026/bhagtani26_interspeech.pdf
---

# Speak or Stay Silent: Context-Aware Turn-Taking in Multi-Party Dialogue

[PDF](https://www.isca-archive.org/interspeech_2026/bhagtani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhagtani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3083)

**TL;DR** — This paper formulates context-aware turn-taking for multi-party dialogue assistants as a binary decision task at every pause, introducing a 120K-example benchmark and showing that supervised fine-tuning improves balanced accuracy by up to 23 percentage points.

## Problem

Traditional voice AI assistants treat every conversational pause as a cue to speak, which works in dyadic conversations but causes disruptive behaviors in multi-party settings like meetings and group calls where pauses are abundant and ambiguous. While prior multi-party research explores addressee recognition or discourse parsing in isolation, no existing system handles the integrated decision of whether an assistant should speak or stay silent. Consequently, voice agents frequently interrupt or fail to respond when appropriate because they lack context-aware turn-taking capabilities.

## Method

The authors frame context-aware turn-taking as a per-participant binary classification task (SPEAK vs. SILENT) evaluated at every utterance boundary given preceding conversation context. They construct a 120,160-sample benchmark across three corpora—AMI Meeting Corpus (workplace design meetings), Friends (social dialogue), and SPGISpeech 2.0 (earnings calls)—categorized into Explicit Address (I1), Contextual Intervention (I2), No Reference (S1), and Referenced but not addressed (S2). They evaluate eight popular closed-source and open-source large language models under zero-shot settings and apply parameter-efficient supervised fine-tuning via LoRA (rank 32, alpha 64) on attention and MLP projection layers. Training uses a four-way balanced batch sampler and label-conditioned distillation from Gemini 2.5 Flash to generate one-sentence reasoning traces, utilizing up to 8 A100 80GB GPUs with FSDP.

## Results

Zero-shot evaluation demonstrates that eight major LLMs consistently fail at context-aware turn-taking, hovering near random performance with a heavy SPEAK bias and achieving a best balanced accuracy of only 64.45% on SPGI using gemini-3.1-pro. In contrast, supervised fine-tuning yields substantial gains, improving balanced accuracy by up to 23 percentage points across datasets. For example, Mistral-7B-Instruct improves from 41.59% to 72.05% F1-average on the AMI dataset. Reasoning-oriented models like gpt-oss-20b show minimal gains from SFT due to internal chain-of-thought conflicts with the LoRA adaptation format.

## Code

- https://github.com/ishikilabsinc/context

## Applications

Speech engineers and developers building multi-party conversational AI assistants, virtual meeting bots, or group-participating voice agents can use these models and datasets to prevent disruptive interruptions during natural pauses.

## Limitations

The current approach is constrained by token context length limits (capped at 2048 tokens, truncating older turns when exceeded) and requires explicit training rather than relying on zero-shot LLM emergence.

## Related

- (link related pages by id as the wiki grows)
