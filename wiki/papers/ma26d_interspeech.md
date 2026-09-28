---
id: ma26d_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2309
pdf: https://www.isca-archive.org/interspeech_2026/ma26d_interspeech.pdf
---

# Retention-Preserving Gradient Projection with Entropy-Guided Token-Level Distillation for Rehearsal-Free Continual ASR

[PDF](https://www.isca-archive.org/interspeech_2026/ma26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ma26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2309)

**TL;DR** — The paper introduces a rehearsal-free continual learning framework for ASR that uses entropy-guided token-level distillation and retention-preserving gradient projection, achieving a 7.2% relative reduction in mean word error rate compared to Learning without Forgetting.

## Problem

Large pretrained ASR models such as Whisper experience catastrophic forgetting when sequentially adapted to new domains. Standard rehearsal-free techniques like Learning without Forgetting (LwF) treat all teacher predictions equally despite uncertainty, and suffer from gradient conflicts between supervised adaptation and knowledge retention. This is problematic because real-world deployments must continuously adapt to emerging terminology without accessing historical training data or replay buffers.

## Method

The framework freezes the encoder based on a diagonal Fisher information analysis showing higher decoder sensitivity, and fine-tunes only the decoder of Whisper Large-v3. It computes token-level distillation weights using normalized Shannon entropy to down-weight uncertain teacher tokens while maintaining a minimum weight threshold. When the supervised gradient conflicts with the entropy-weighted distillation gradient, a retention-preserving gradient projection attenuates the opposing supervised component using a tunable projection coefficient eta.

## Results

Evaluated on sequential English domain adaptation across LibriSpeech, AMI, TED-LIUM, and SPGISpeech, the method achieves a final average word error rate (WER) of 8.12%, outperforming LwF's 8.75% and full fine-tuning's 9.66%. Backward transfer improves from -4.63 (LwF) to -2.82. Furthermore, multilingual degradation on Common Voice test sets is reduced by 51.5% relative to LwF, achieving an average absolute increase of only 0.95% across Spanish, French, and Korean.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers deploying large-scale speech recognition models in production environments that require continuous domain adaptation without storing historical training data.

## Related

- (link related pages by id as the wiki grows)
