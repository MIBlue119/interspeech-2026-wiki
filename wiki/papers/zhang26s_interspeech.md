---
id: zhang26s_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1228
---

# DASR-CPO: Reference-Free Contrastive Preference Optimization for Correcting Mandarin Semantic Drift in Low-Resource Chinese Dialect ASR

**TL;DR** — A reference-free contrastive preference optimization method teaches Whisper-style ASR to stop mistranscribing dialect words as similar-sounding but wrong Mandarin words, cutting character error rate with zero extra inference cost.

## Problem

Pretrained ASR models like Whisper-Large-v3 degrade on low-resource Chinese dialects because a Mandarin-dominant prior favors frequent homophones, causing "Mandarin semantic drift" where dialect words get transcribed as phonetically similar but semantically wrong Mandarin forms, especially on entity/keyword-critical spans; standard LoRA fine-tuning reduces error rate but doesn't explicitly suppress these competing Mandarin forms.

## Method

DASR-CPO is a reference-free contrastive preference optimization method that teaches the model to prefer dialect-correct spans over mined Mandarin confusions, using preference pairs from data-driven confusion mining (no manual annotation), localizing drift-prone spans via sequence matching and training with a span-level contrastive objective using hard negatives.

## Results

On MagicData Sichuanese (4.53 h), DASR-CPO reduces character error rate from 24.85% to 22.58% and improves dialect-entity F1 from 72.82 to 74.15, with zero inference-time overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving ASR accuracy for low-resource Chinese dialects that are prone to Mandarin-biased mistranscription, particularly for entity/keyword-critical content.

## Related

- (link related pages by id as the wiki grows)
