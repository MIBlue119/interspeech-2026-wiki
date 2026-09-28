---
id: yang26p_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3086
pdf: https://www.isca-archive.org/interspeech_2026/yang26p_interspeech.pdf
---

# RobustSpeechFlow: Learning Robust Text-to-Speech Trajectories via Augmentation-based Contrastive Flow Matching

[PDF](https://www.isca-archive.org/interspeech_2026/yang26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3086)

**TL;DR** — RobustSpeechFlow introduces length-preserving repeat and skip latent augmentations into contrastive flow-matching text-to-speech to penalize failure modes, reducing WER from 1.44 to 1.38 on Seed-TTS-eval with a 0.06B parameter model.

## Problem

Modern flow-matching text-to-speech models frequently suffer from content fidelity issues like word skipping and repetition caused by imperfect text-speech alignment. These errors become significantly more pronounced under tight parameter capacity constraints or low number of function evaluation (NFE) settings. While prior mitigation strategies rely on auxiliary ASR models, external aligners, or costly preference datasets, they increase system complexity and training overhead.

## Method

The paper proposes RobustSpeechFlow, a training technique that extends contrastive flow matching with synthetic hard negatives in the latent space without requiring external models or preference data. It perturbs ground-truth Supertonic autoencoder latents while preserving sequence length, utilizing two modes sampled evenly: repeat augmentation (overwriting a source span onto a target span) and skip augmentation (shifting subsequent latents forward and padding the tail with silence). The model is optimized using a linear probability path conditional flow matching objective combined with contrastive regularization terms for random batch negatives and these structured failure-mode hard negatives. Experiments use a compact 0.06B parameter SupertonicTTS backbone trained for 500k steps on 10k hours of English and Korean data.

## Results

Evaluated on the public Seed-TTS-eval benchmark, RobustSpeechFlow achieves a word error rate (WER) of 1.38 and speaker similarity (SIM) of 0.60, outperforming the baseline SupertonicTTS (WER 1.44) and standard ContrastiveFM (WER 1.41) while using only 0.06B parameters. On the custom ZERO500 multilingual benchmark across diverse speaker and prosody conditions, it consistently improves intelligibility under low-NFE settings; at NFE=24, it reduces English character error rate (CER) from 0.48% to 0.35% and Korean CER from 0.81% to 0.57%.

## Code

- https://robustspeechflow.github.io/

## Applications

Speech engineers and developers building on-device, lightweight, or low-latency text-to-speech systems desiring high content fidelity and robust zero-shot speaker cloning.

## Related

- (link related pages by id as the wiki grows)
