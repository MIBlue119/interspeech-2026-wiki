---
id: lin26m_interspeech
category: asr
labels: [dataset-or-benchmark-release]
institutions: ["Trinity College Dublin", "Imperial College London", "NatWest AI Research"]
code: https://github.com/chaufanglin/mv2lrs3
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2583
pdf: https://www.isca-archive.org/interspeech_2026/lin26m_interspeech.pdf
---

# Assessing True Generalisability of Audio-Visual Speech Recognisers

*Zhaofeng Lin, Stavros Petridis, Maja Pantic, Naomi Harte*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2583)

**Category:** `asr` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — Evaluating five state-of-the-art audio-visual speech recognition (AVSR) architectures on a newly constructed, distribution-matched test set (MV2LRS3) reveals a universal performance collapse, proving that current systems suffer from severe adaptive overfitting to the standard LRS3 benchmark.

## Key contributions

- Constructed the MV2LRS3 (MultiVSR2LRS3) evaluation set via a multidimensional kNN matching strategy to strictly align with LRS3 test distributions across seven acoustic, demographic, and visual factors.
- Demonstrated a universal performance collapse across five SoTA AVSR models, where error rates surged from under 1.5% on LRS3 to between 14.0% and 23.5% on the matched MV2LRS3 set (yielding a linear fit slope of 10.4).
- Isolated duration as the primary driver of performance degradation via leave-one-out attribute analysis, revealing a high sensitivity to context window constraints.
- Uncovered a profound lexical bias and a surprising failure of multimodal fusion, where audio-only inference outperformed audio-visual inference for most models on the matched set.
- Released the MV2LRS3 test set, a scaled 10-hour subset, and all extracted metadata to the research community.

## Problem

Current Audio-Visual Speech Recognition (AVSR) research relies almost exclusively on the LRS3 benchmark, leading to severe performance saturation where models achieve near-perfect metrics (under 1% WER). Because the LRS3 test set is exceptionally small (0.9 hours) compared to its training corpus (433 hours), it remains unclear whether high performance reflects genuine speech recognition capability or adaptive overfitting. Constructing new out-of-distribution sets like WildVSR omits audio tracks entirely, leaving a critical gap in evaluating true AVSR generalisability under controlled, distribution-matched conditions.

## Method

The authors subsampled an unseen evaluation set from the massive MultiVSR dataset (derived from AVSpeech YouTube IDs, yielding ~12,000 hours of video) to match the LRS3 test distribution. Seven attributes were extracted per utterance: age and gender (via Uniface), apparent skin tone on the Monk Skin Tone scale (via Stone), head yaw pitch/roll (via 6DRepNet), acoustic SNR (via WADA-SNR), utterance duration, and speech rate. An empirical feature weighting strategy was applied to a multidimensional kNN matching algorithm (Duration: 100, Age: 100, Gender: 50, Skin Tone: 40, Yaw Mean: 100, Yaw Std: 50, SNR: 70, Speech Rate: 40) to select candidate vectors, from which one sample was stochastically drawn five times to create five MV2LRS3 variations. A larger 10-hour subset (10x set) was also constructed by scaling the selection pool.

Five diverse SoTA architectures were evaluated: AV-HuBERT (SSL pre-trained on unlabelled AV data, fine-tuned on LRS3), Auto-AVSR (fully-supervised end-to-end model trained on 3,448 hours including AVSpeech pseudo-labels), USR (unified teacher-student framework), Whisper-Flamingo (integrating AV-HuBERT visual features into Whisper), and Llama-AVSR (multimodal framework combining Whisper and AV-HuBERT encoders into a Large Language Model). Evaluation metrics included Word Error Rate (WER), Individual Word Error Rate (IWER) across partitioned vocabularies (V_share vs V_diff), and error-type breakdowns (substitutions, deletions, insertions).

## Experimental setup

Evaluated on the LRS3 Test set (0.9 hours, 1,321 utterances), the MV2LRS3 set (matched distribution, 5 runs), and a scaled 10x set (~10 hours, 12,987 utterances). Baseline systems compared: AV-HuBERT, Auto-AVSR, USR, Whisper-Flamingo, and Llama-AVSR. Models were evaluated across Audio-Visual (AV), Audio-Only (AO), and Video-Only (VO) settings, alongside leave-one-out attribute subsets and binned duration/yaw subsets.

## Results

On the LRS3 Test set, all models achieved WER below 1.5% (Llama-AVRS leading at 0.77%, AV-HuBERT trailing at 1.50%). On the MV2LRS3 set, performance universally collapsed: AV-HuBERT dropped to 23.5% WER, USR to 21.5%, Whisper-Flamingo to 18.6%, Llama-AVSR to 16.5%, and Auto-AVSR to 14.0% (taking the top rank due to training domain familiarity with AVSpeech). The linear fit slope between LRS3 WER and MV2LRS3 WER was 10.4, indicating extreme sensitivity to minor benchmark improvements. Leave-one-out analysis revealed that removing duration constraints improved Whisper-Flamingo WER by 47% (down to 9.9%), while short utterances (0-3s) caused severe degradation across all models except Auto-AVSR. Crucially, audio-only (AO) inference outperformed audio-visual (AV) inference for Llama-AVSR (15.3% vs 16.5%), Whisper-Flamingo (16.6% vs 18.6%), and USR (21.0% vs 21.5%), demonstrating a total collapse of multimodal advantage.

| System | LRS3 WER (%) | MV2LRS3 WER (%) | AO WER (%) | VO WER (%) |
|---|---|---|---|---|
| AV-HuBERT | 1.50 | 23.5 | 23.6 | 65.1 |
| Auto-AVSR | 0.95 | 14.0 | 16.4 | 45.5 |
| USR | 1.10 | 21.5 | 21.0 | 57.9 |
| Whisper-Flamingo | 0.86 | 18.6 | 16.6 | — |
| Llama-AVSR | 0.77 | 16.5 | 15.3 | 81.5 |

## Limitations

Despite rigorous multidimensional matching across seven factors, residual performance gaps indicate unobserved confounding variables such as speaker accents, conversational speaking styles, and visual occlusion. Furthermore, proprietary or undocumented pre-training lexicons in modern foundation models (like Whisper and LLMs) make it impossible to isolate exact baseline vocabularies. The demographic metadata was entirely generated via automated extraction tools (Uniface, Stone classifier) rather than self-reported identity, introducing potential algorithmic bias.

## Why read this

Speech and ML researchers building multimodal foundation models should read this to understand why near-zero WER on LRS3 is a misleading indicator of generalisability and why current systems fail to leverage visual cues outside narrow benchmarks.

## Code

- https://github.com/chaufanglin/mv2lrs3

## Applications

Benchmarking robust speech recognition architectures, developing reliable multimodal fusion models for noisy real-world environments, and guiding unbiased data curation for audio-visual speech datasets.

## Institutions / 機構

Trinity College Dublin, Imperial College London, NatWest AI Research

**Funding / 經費:** Research Ireland Centre for Research Training in Digitally-Enhanced Reality

## Related

- [Adaptive AVSR: Integrating Speaker and Environmental Embeddings for Robust Audio-Visual Speech Recognition](simic26_interspeech.md) — same problem · relatedness 2.1/3
- [GLAD-CSpeech: A Dialectologically Comprehensive Benchmark for Genuine Chinese Dialect Speech](xu26j_interspeech.md) — shared data / evaluation · relatedness 1.9/3
- [Tarsila-ASR: A Multi-Domain Test Suite for Benchmarking Brazilian Portuguese Speech Recognition](leal26_interspeech.md) — shared data / evaluation · relatedness 1.9/3
- [The Lipreading Gap: Do VSR Models Perceive Visual Speech Like Human Lipreaders?](jain26_interspeech.md) — same problem · relatedness 1.9/3
- [MTC-AVSR: Compressed-Token-based Audio-Visual Speech Recognition and Translation with Contrastive Language Alignment](a26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
