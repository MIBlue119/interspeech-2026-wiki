---
id: zhang26s_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1228
pdf: https://www.isca-archive.org/interspeech_2026/zhang26s_interspeech.pdf
---

# DASR-CPO: Reference-Free Contrastive Preference Optimization for Correcting Mandarin Semantic Drift in Low-Resource Chinese Dialect ASR

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1228)

**TL;DR** — DASR-CPO is a reference-free contrastive preference optimization method that reduces Mandarin semantic drift in low-resource Chinese dialect ASR, lowering CER from 24.85% to 22.58% on MagicData Sichuanese.

## Problem

Pretrained foundation ASR models like Whisper degrade on low-resource Chinese dialects because their Mandarin-dominant priors favor frequent homophones over correct dialect words, leading to systematic Mandarin semantic drift. This failure mode specifically damages entity- and keyword-critical spans where semantic fidelity is paramount. Standard supervised fine-tuning and LoRA optimize maximum likelihood without explicitly penalizing these high-probability Mandarin-biased competitor spans.

## Method

The method introduces DASR-CPO, a two-stage framework combining offline confusion mining and span-level contrastive preference optimization. First, preference pairs and hard-negative Mandarin confusions are mined automatically using tone-stripped pinyin edit distances. Second, a full-sequence dynamic matching strategy handles BPE fragmentation to localize dialect spans and compute a span-level contrastive loss with hard-negative pooling. The model uses a Whisper-Large-v3 backbone adapted via LoRA on query/value projections (r=32), trained with a mixed objective combining standard cross-entropy and the span-level CPO loss with zero inference-time overhead.

## Results

Evaluated on the MagicData Sichuanese corpus (4.53 hours), DASR-CPO is compared against zero-shot Whisper, pure LoRA SFT, and a context bias loss-reweighting baseline. DASR-CPO achieves a character error rate (CER) of 22.58% (compared to 24.85% for pure LoRA and 23.40% for context bias), improves dialect entity F1 from 72.82 to 74.15, and reduces false-positive entity mentions to 32 compared to 39 for the baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers adapting large pretrained ASR models to low-resource dialects or localized domains where semantic drift on entity-critical terms is a bottleneck.

## Related

- (link related pages by id as the wiki grows)
