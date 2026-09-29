---
id: mokshagundam26_interspeech
category: phonetics-linguistics
labels: [multilingual, self-supervised]
institutions: ["International Institute of Information Technology Hyderabad"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3144
pdf: https://www.isca-archive.org/interspeech_2026/mokshagundam26_interspeech.pdf
---

# Boundaryless Speech-to-Syllable Representations with Hierarchical CNN for Linguistically Inspired Automatic Stress Detection

*Namrata Mokshagundam, Sai Harshitha Aluru, Chiranjeevi Yarra*

[PDF](https://www.isca-archive.org/interspeech_2026/mokshagundam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mokshagundam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3144)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — A fully boundary-independent architecture uses a hierarchical CNN to convert frame-level self-supervised speech representations directly into syllable-level representations, achieving up to 94.86% (GER) and 96.24% (ITA) accuracy on lexical stress detection for L2 learners.

## Key contributions

- A fully boundary-independent framework mapping speech directly to syllable-level structures without requiring explicit syllable or phoneme alignment boundaries.
- A hierarchical convolutional temporal reduction module using stacked 1D convolutions and max-pooling to progressively downsample variable-length frame sequences down to syllable counts.
- Integration of the linguistic Post-net2.0 loss function and a decoding post-processing step to enforce the one-primary-stress-per-word constraint.
- Comprehensive cross-language evaluation demonstrating robust transfer capabilities across German and Italian L2 English speaker profiles.

## Problem

Automatic syllable stress detection is a core requirement for Computer-Assisted Language Learning (CALL) systems to correct L2 pronunciation errors, but prior methods rely heavily on manually annotated boundaries or unreliable forced alignments that introduce alignment errors. Previous attempts at boundary-independent modeling use dual-attention mechanisms yet still fall back on phoneme-level boundaries. Furthermore, standard binary cross-entropy (BCE) optimization fails to enforce basic linguistic rules, such as the constraint that every multi-syllable word contains exactly one primary stressed syllable.

## Method

The pipeline starts by extracting 768-dimensional frame-level representations from raw audio using a pretrained wav2vec 2.0 model (25ms window, 20ms shift). Utterances are padded to a maximum sequence length of 210 frames, with padding frames masked. A bidirectional LSTM encoder captures wider contextual information across frames without changing sequence length.

Next, a hierarchical temporal compression block consisting of six 1D convolutional and max-pooling layers progressively reduces the temporal resolution from the maximum frame length down to the maximum syllable count ($210 \to 105 \to 53 \to 27 \to 14 \to 7 \to 5$). The resulting syllable-level embeddings are fed into a decoder block. The authors evaluate two decoders: a non-autoregressive (NAR) decoder using stacked BiLSTMs that predicts all syllable probabilities in parallel, and an autoregressive (AR) decoder using stacked LSTMs that predicts stresses sequentially using teacher forcing during training.

Models are optimized using either Binary Cross-Entropy (BCE) or the Post-net2.0 loss, which combines BCE with an adaptive weighted penalty ($\omega_n$) penalizing deviations from the single-stressed-syllable rule. During post-processing, the syllable with the highest predicted probability in each word is forcibly designated as stressed, and all others as unstressed.

## Experimental setup

Evaluated on the ISLE corpus containing 7,834 utterances from 46 non-native English speakers (23 German, 23 Italian, ~160 utterances/speaker), restricted to 12,388 stressed and 16,005 unstressed polysyllabic words. Compared against boundary-dependent baselines (DNN, LSTM) and a partially boundary-independent baseline (AttTTS). Evaluated across Matched, Combined (GER+ITA training), and Cross (train on GER, test on ITA and vice versa) scenarios using classification accuracy metrics.

## Results

The proposed autoregressive model with Post-net2.0 loss (PN-CNN-AR) achieved headline accuracies of 94.86% for German and 96.24% for Italian under the combined training scenario. Compared to the partially boundary-independent AttTTS baseline, the proposed approach yielded massive absolute gains of 18.67% (GER) and 16.12% (ITA) in the combined setting, and over 20% in cross-language tests. Incorporating the Post-net2.0 loss consistently improved performance over standard BCE across all configurations, with autoregressive variants generally outperforming non-autoregressive variants when paired with Post-net2.0.

| System / Condition | GER (Combined) | ITA (Combined) | GER (Cross) | ITA (Cross) |
|---|---|---|---|---|
| DNN (Boundary-Dependent) | 94.09% | 94.33% | 90.74% | 92.09% |
| LSTM (Boundary-Dependent) | 93.77% | 93.79% | 89.98% | 91.37% |
| AttTTS (Partially Boundary-Indep.) | 76.19% | 80.12% | 73.13% | 73.10% |
| Proposed PN-CNN-NAR | 94.19% | 95.44% | 92.26% | 92.95% |
| Proposed PN-CNN-AR | 94.86% | 96.24% | 92.72% | 93.59% |

## Limitations

Evaluated exclusively on English speech produced by German and Italian L2 speakers from a single corpus (ISLE), leaving broader multilingual generalization across diverse language pairs unverified. The framework relies on oracle syllable counts ($n$) during inference, meaning performance may degrade if an external automatic syllabification or word boundary segmentation tool fails in fully unconstrained streaming speech applications.

## Why read this

Researchers and engineers building robust CALL systems or exploring temporal compression architectures for speech will find a clean blueprint for eliminating forced alignment bottlenecks using hierarchical CNNs combined with linguistic loss penalties.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-Assisted Language Learning (CALL) systems, automated pronunciation scoring, and L2 speech diagnostic tools.

## Institutions / 機構

International Institute of Information Technology Hyderabad

## Related

- [Multilingual and Cross-lingual Lexical Stress Detection Using SSL Feature Vectors](alhabshi26_interspeech.md) — same problem · relatedness 2.8/3
- [ProWhistress: An Enhanced Dual-Stream Transcription Architecture for Prosody-Aware Sentence Stress Detection](gu26b_interspeech.md) — same problem · relatedness 2.3/3
- [A Novel Sentence Stress Detection Framework Leveraging Auxiliary Word-Stress Modeling and Loss Optimization](lo26_interspeech.md) — same problem · relatedness 2.2/3
- [Evaluating and Preserving Lexical Stress in English-to-Chinese Speech-to-Speech Translation](song26f_interspeech.md) — same problem · relatedness 2.0/3
- [ALFreeD: Teacher-Guided Few-Shot Pronunciation Assessment via Segmentation-Free Deviation Modeling](sirigiraju26_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
