---
id: sun26_interspeech
category: prosody
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-478
pdf: https://www.isca-archive.org/interspeech_2026/sun26_interspeech.pdf
---

# Prosodic ABX: A Language-Agnostic Method for Measuring Prosodic Contrast in Speech Representations

*Haitong Sun, Stephen McIntosh, Kwanghee Choi, Eunjung Yeo, Daisuke Saito, Nobuaki Minematsu*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-478)

**TL;DR** — The paper introduces "prosodic ABX," a training-free framework for evaluating lexical prosody encoding in self-supervised speech models (S3Ms) using minimal pairs and dynamic time warping. Experiments across English stress, Japanese pitch accent, and Mandarin tone show that S3Ms achieve error rates comparable to human listeners (e.g., best S3M error rate of 5% on Mandarin vs 2% for humans).

## Key contributions

- Proposed the prosodic ABX framework to measure lexical prosody contrast in S3M representations using dynamic time warping without requiring labeled classifiers.
- Built and released a publicly available dataset of clean English noun-verb stress minimal pairs (15 pairs, 10 speakers, 4.6 mins) and Japanese pitch accent minimal pairs (23 pairs, 10 speakers, 5.3 mins).
- Evaluated 17 S3M models alongside acoustic baselines and human listeners (total n=66 across English, Japanese, and Mandarin), revealing strong correlation between human and model error rates (r = 0.94 for English stress).
- Demonstrated that out-of-context analysis strongly predicts in-context behavior (partial r = 0.97) and that synthetic speech via TTS functions as a viable proxy for layer/model selection in low-resource settings.

## Problem

Probing studies have shown that prosodic information exists within S3M hidden layers, but they do not prove that prosody is geometrically prominent in the representation space, which is crucial for distance-based applications like clustering and retrieval. Traditional categorical probing requires expensive labeled data and collapses temporal structures via mean pooling. Existing evaluations lack a language-agnostic, training-free mechanism to directly measure whether S3M representation geometry honors fine-grained prosodic minimal pair contrasts.

## Method

The framework uses a triplet of speech utterances (A, B, X) where A and B share the same phonemic sequence and speaker but differ in lexical prosodic pattern (a minimal pair), while X comes from a different speaker with the same phonemic content and prosody as A. Representation sequences RA, RB, and RX are extracted from a given S3M layer after clipping minimal pairs from surrounding audio to reduce context correlation. Dynamic time warping (DTW) aligns RB and RA to RX, yielding frame-wise distances draw, which are normalized by path length into distance metric d. The ABX score evaluates whether d(RA, RX) < d(RB, RX), and this score is subtracted from 1 to report an error rate.

To handle resource-scarce setups, the authors test variants using synthetic speech generated via Google Cloud Text-to-Speech (G-TTS) and Kokoro across 4 voices per language, as well as an in-context variant where minimal pairs are embedded within identical carrier sentences (tested on Japanese). The approach leverages the fastabx library for efficient frame-level distance computations without training classifiers or tuning hyperparameters.

## Experimental setup

Evaluated on 17 S3Ms (wav2vec 2.0, HuBERT, XLSR53, mHuBERT-147, WavLM, and language-specific variants in English, Japanese, and Mandarin) across base and large sizes. Datasets include natural recordings (English: 15 pairs, 10 speakers, 4.6 minutes; Japanese: 23 pairs, 10 speakers, 5.3 minutes; Mandarin: MCAE-Monosyllable corpus with 2310 pairs, 6 speakers, 100.2 minutes) and TTS-synthesized counterparts. Baselines include mel spectrograms, MFCCs, and human listeners (English n=33, Japanese n=18, Mandarin n=15). Metrics are ABX error rates and Spearman/Pearson rank correlations.

## Results

Across all tasks, the best-performing S3M layers substantially outperformed acoustic baselines and random chance (50% error rate). On Mandarin tone, Chinese HuBERT-large layer 15 achieved an error rate of 5% (compared to 2% for human listeners). On Japanese pitch accent, the best model achieved a 19% error rate (vs 9% for humans). On English lexical stress, best S3M models achieved a 26% error rate, slightly outperforming native English human listeners (29%), with a strong word-level correlation of r = 0.94 between human and model error rates. Synthesized speech showed high layer-wise correlation with natural speech for Japanese (r = 0.93) and Mandarin (r = 0.93), but lower for English (r = 0.50 with G-TTS, r = 0.85 with Kokoro). In-context evaluation on Japanese showed that in-context performance is consistently better than out-of-context (median best-layer delta of 9.4%), with a partial correlation of r = 0.97 between the two settings after accounting for depth.

| System / Condition | English Stress (Error Rate %) | Japanese Pitch Accent (Error Rate %) | Mandarin Tone (Error Rate %) |
|---|---|---|---|
| Random Chance | 50.0 | 50.0 | 50.0 |
| Mel Spectrogram Baseline | ~42.0 | ~35.0 | ~40.0 |
| Best S3M Layer (Model Peak) | 26.0 | 19.0 | 5.0 |
| Human Listeners | 29.0 | 9.0 | 2.0 |

## Limitations

The datasets focus strictly on lexical-level prosody (lexical stress, pitch accent, and lexical tone) and do not evaluate sentence-level intonation, focus, or pragmatic prosody. Synthesized speech proxies showed poor ranking correlation for English G-TTS, indicating that TTS quality constraints can hinder proxy reliability in stress-heavy Germanic languages. The evaluation is restricted to three major languages, leaving agglutinative or tone-less languages without stress contrast unexamined.

## Why read this

Speech and representation learning researchers seeking a rigorous, training-free diagnostic to audit whether S3M internal layers encode prosody geometrically should read this. It offers concrete proof that hidden layers capture prosodic contrasts on par with humans and provides actionable guidelines on using out-of-context or synthetic proxies.

## Code

- https://github.com/stephenmac7/prosodic-abx

## Applications

Visual pronunciation feedback tools for language learners, unsupervised prosodic token discovery for speech language models, and model/layer selection for prosody-sensitive downstream tasks.

## Related

- (link related pages by id as the wiki grows)
