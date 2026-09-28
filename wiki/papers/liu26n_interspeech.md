---
id: liu26n_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1747
pdf: https://www.isca-archive.org/interspeech_2026/liu26n_interspeech.pdf
---

# Learning Contextualized Tonal Contours from F0: A Core-Auxiliary Branched Transformer for Mandarin Tone Recognition

*Yi-Fen Liu, Xiang-Li Lu, Po-Yu Chiu*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1747)

**TL;DR** — This paper proposes a core-auxiliary branched Transformer framework for Mandarin tone recognition that relies exclusively on suprasegmental F0 and duration features, achieving a headline tone accuracy of 97.5%.

## Key contributions

- A simplified suprasegmental-only input design using log-scaled F0 values and duration metrics across syllable, word, and chunk granularities without reliance on standard spectral features like MFCCs.
- A core-auxiliary branched architecture (C-Net core and auxiliary C-Net/R-Net branches) that guides representation learning during training via cross-attention and layer-specific attention pooling (LSAP).
- Detachable auxiliary branches that improve training gradients and feature robustness while being completely removed at inference time to lower computational overhead.
- The introduction and utilization of the FCU-VOICE-360 speech corpus containing 360 speakers and 380,383 verified syllable boundaries for Mandarin tone modeling.

## Problem

Automatic Mandarin tone recognition in running speech has traditionally relied heavily on spectral or articulatory representations such as MFCCs, filterbanks, or raw waveforms, requiring high computational complexity. While prior prosody-based models like TNet-Full incorporate rhythm encoders, they often struggle to scale across multi-granularity linguistic structures (syllable, word, chunk) and lack robust gradient pathways during training. This creates a trade-off between model capacity and inference efficiency that limits deployment in computer-assisted pronunciation training (CAPT) systems for L2 learners.

## Method

The framework models Mandarin tone recognition using two main network streams: C-Net (Contour Network) for F0 representations and R-Net (Rhythm Network) for durational variability. F0 time series are extracted at 10 ms intervals, log-scaled, and normalized via speaker-specific 0.1% and 99.9% percentiles, then projected into 256-dimensional embeddings. BERT-style alternating tokens ([A], [B]) and content-aware special tokens ([VAL], [NAN], [CLS], [SEP], [CON]) are appended to capture structured linguistic spans across syllable (Syl), word (Wrd), and chunk (Chk) levels. R-Net extracts a 9-dimensional durational variability feature vector (interval duration, deviation from utterance mean, average pairwise difference) across three intervals (syllable, final segment, vocalic segment), replacing the final pairwise difference with nPVI-Int for the utterance end.

The architecture uses a core-auxiliary branched design. C-Net applies four Transformer layers for pitch-level representations, followed by CLS pooling and two additional Transformer layers for syllable-level contour representations. During training, auxiliary branches (either a secondary C-Net or R-Net) interact with the core branch through a layer-specific attention pooling (LSAP) module, which stacks intermediate hidden states across layers 1 through 6, computes 2-layer FFN tanh-activated softmax attention weights, and feeds the resulting weighted representations into modified Transformer blocks featuring multi-head cross-attention. The training loss is an unweighted sum of categorical cross-entropy losses computed across the core branch and both auxiliary branches. During inference, auxiliary branches are stripped away, leaving solely the lightweight core branch to classify the five lexical tones via a two-layer MLP classifier.

## Experimental setup

Evaluated on the FCU-VOICE-360 dataset comprising 360 balanced-gender speakers, 75,552 inter-pausing units (IPUs), and 380,383 syllables force-aligned via the ILAS aligner. Compared against the single-branch TNet-Full baseline and various internal ablation configurations (varying input granularity from Syl-only to Syl-Wrd-Chk and alternating auxiliary choices). Evaluated using classification accuracy percentage and per-tone F1 scores, alongside MACs, IPU inference latency (ms), and per-tone inference latency (ms). Data split follows an 80% train, 10% development, and 10% test protocol.

## Results

The full proposed core-auxiliary model with syllable, word, and chunk granularities (v3-m2/v3-m3) achieves a headline accuracy of 97.5%, outperforming the single-branch TNet-Full baseline (97.0%) and the baseline C-Net configuration with only syllable-level inputs (88.9% accuracy). Progressive addition of linguistic granularities in C-Net consistently boosts performance, moving from 94.5% (Syl-only with C-Net auxiliary) to 97.2% (Syl-Wrd) and 97.5% (Syl-Wrd-Chk). For efficiency, the optimal core-auxiliary model (v2-m3) requires 353.0M MACs and 4.8M parameters with an IPU inference latency of 2.045 ms, demonstrating superior speed compared to the single-branch TNet-Full which requires 374.3M MACs, 6.9M parameters, and a 3.413 ms IPU latency.

| Models | Architecture | Acc. (%) | T1 F1 | T2 F1 | T3 F1 | T4 F1 | T5 F1 |
|---|---|---|---|---|---|---|---|
| v1-m1 | Syl-only (No Aux) | 88.9 | 0.895 | 0.858 | 0.877 | 0.918 | 0.837 |
| v1-m2 | Syl-only + C-Net Aux | 94.5 | 0.950 | 0.928 | 0.936 | 0.959 | 0.923 |
| v2-m2 | Syl+Wrd + C-Net Aux | 97.2 | 0.980 | 0.962 | 0.963 | 0.980 | 0.966 |
| TNet-Full | Single-branch Baseline | 97.0 | 0.979 | 0.960 | 0.959 | 0.977 | 0.971 |
| v3-m2 | Syl+Wrd+Chk + C-Net Aux | 97.5 | 0.983 | 0.966 | 0.964 | 0.983 | 0.972 |
| v3-m3 | Syl+Wrd+Chk + R-Net Aux | 97.5 | 0.984 | 0.967 | 0.964 | 0.983 | 0.972 |

## Limitations

The evaluation is restricted to clean read speech from native Mandarin speakers collected in controlled environments, limiting its direct generalization to spontaneous, noisy, or conversational speech. The framework relies heavily on accurate automatic force-alignment to establish phonetic, syllable, word, and chunk boundaries for feature extraction. Furthermore, the evaluation is constrained to Mandarin Chinese, and its effectiveness on other tonal languages or L2 learner disfluent speech requires further empirical validation.

## Why read this

Researchers and engineers building efficient prosody-based speech models or CAPT systems should read this paper to learn how auxiliary cross-attention branches and layer-specific attention pooling can boost training representations without adding inference latency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted pronunciation training (CAPT) systems, mispronunciation detection and diagnosis for L2 Mandarin learners, and tonal contour recognition.

## Related

- (link related pages by id as the wiki grows)
