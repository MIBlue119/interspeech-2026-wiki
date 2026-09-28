---
id: chen26y_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2412
pdf: https://www.isca-archive.org/interspeech_2026/chen26y_interspeech.pdf
---

# Improving Flow Matching based Text-to-Speech with Dual-Model Preference Optimization and Classifier-Free Guidance

[PDF](https://www.isca-archive.org/interspeech_2026/chen26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2412)

**TL;DR** — This paper proposes a dual-model preference optimization and improved classifier-free guidance framework for flow-matching-based text-to-speech, significantly improving intelligibility, speaker similarity, and naturalness.

## Problem

Conventional zero-shot text-to-speech training and inference paradigms struggle to effectively integrate human feedback, creating a mismatch between training objectives and evaluation metrics. Furthermore, single-model preference optimization and standard classifier-free guidance suffer from parameter conflicts and weight offsets when simultaneously balancing preferred and dispreferred distributions.

## Method

The authors introduce a dual-model framework based on F5-TTS (158M parameters) that independently models preferred and dispreferred distributions using two distinct Diffusion Transformer models initialized from a shared reference model. During training, a unified preference optimization loss is applied using preference-ranked pairs curated via proxy metrics like Word Error Rate and Speaker Similarity. During inference, an integrated sampling strategy combines the preferred and dispreferred model outputs using a linear proxy-prompt combination. Additionally, the classifier-free guidance mechanism incorporates an optimized scale factor via velocity projection and a zero-init technique for early ODE solver steps.

## Results

Evaluated on the Seed-TTS test-en and test-zh benchmark datasets, the proposed PA-Dual method outperforms the F5-TTS baseline across intelligibility (Word Error Rate, WER), speaker similarity (SSIM), and naturalness metrics (UTMOS, CMOS, SMOS). Ablation studies confirm that both optimized scaling and zero-init contribute to performance gains, with zero-init preventing early-step timbre collapse. Data efficiency experiments show that the DPO training plateaus at around 250 to 500 preference pairs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building zero-shot text-to-speech systems for personalized digital assistants, accessible tools, and creative content production.

## Limitations

The method introduces additional storage and computational overhead due to maintaining two distinct models during training and inference.

## Related

- (link related pages by id as the wiki grows)
