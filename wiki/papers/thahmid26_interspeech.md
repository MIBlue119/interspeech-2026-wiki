---
id: thahmid26_interspeech
category: asr
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2199
pdf: https://www.isca-archive.org/interspeech_2026/thahmid26_interspeech.pdf
---

# Layer-wise Probing of Whisper's Encoder Representations for Bengali Phone-like Units

*Munim Thahmid, Sadia Sharmin*

[PDF](https://www.isca-archive.org/interspeech_2026/thahmid26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/thahmid26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2199)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates where Bengali phone-like units become linearly separable across Whisper's encoder layers, revealing that while small and medium models peak in the mid-to-late layers, Whisper-large-v3 maintains a broad late-layer plateau with minimal degradation compared to self-supervised models like wav2vec2-XLSR.

## Key contributions

- A reproducible probing pipeline for Bengali Whisper encoders using strict speaker-disjoint evaluation.
- A scaling analysis across Whisper-small (12 layers), -medium (24), and -large-v3 (32) demonstrating that late-layer phonetic degradation decreases as model size increases.
- A direct comparison against a self-supervised baseline (wav2vec2-XLSR), showing that supervised ASR training preserves phonetic detail much deeper into the encoder.
- Granular per-class F1, ABX discriminability, duration stratification, and alignment-confidence robustness analyses highlighting that acoustic bursts separate early while nasals and sibilants drive mid-layer gains.

## Problem

Multilingual speech encoders are heavily utilized as feature extractors, yet the internal distribution of phonetic information across their layers remains poorly understood for non-English languages and supervised ASR models like Whisper. Prior interpretability work predominantly targets self-supervised models such as wav2vec 2.0 or HuBERT in English, observing a severe drop in phonetic separability in upper layers. This work addresses the gap for Bengali—the seventh most spoken language globally—by asking how phone-like unit linear separability evolves across Whisper's encoder depth and model scales.

## Method

The authors extract hidden states from frozen HuggingFace checkpoints of Whisper (small, medium, large-v3) using 50 Hz frame outputs (20 ms per frame). Bengali phone segments are obtained via the MMS forced aligner on normalized uromanized transcripts, merging adjacent token spans deterministically into 30 phone-like targets. Each phone segment is mapped to model frames by maximum temporal overlap, excluding frames where the dominant phone covers less than 70% of the duration, and averaging the central third of frames to yield a single representation per phone per layer. Probes are trained using multinomial logistic regression (C=0.1, L2 penalty, lbfgs solver, with per-layer z-score standardization) under speaker-disjoint evaluation, and evaluated via accuracy and Macro-F1 across three random seeds.

An MLP ablation (one hidden layer of 256 units, ReLU, dropout 0.1, trained for 30 epochs with Adam) and ABX discriminability checks using cosine distance on 5,000 trials validate the linear probing findings. Robustness is verified by filtering alignments using a confidence threshold (min_score >= 0.7), varying frame-majority thresholds, label-shuffle controls, text-disjoint splits, and alternative forced-alignment annotations via an English and Bengali Montreal Forced Aligner (MFA) audit.

## Experimental setup

Experiments use OpenSLR 53 (Bengali ASR), utilizing a shared 2,000-utterance subset (yielding ~6.1k train and ~1.5k test segments across ~395 and ~99 speakers) and smaller 500/100 utterance subsets for robustness tests. Baselines include wav2vec2-large-xlsr-53 (24 layers) and an English cross-lingual baseline using 200 utterances from LibriSpeech test-clean evaluated via MFA. Metrics include Accuracy, Macro-F1, binary classification F1 for aspiration and retroflexion contrasts, and ABX discriminability.

## Results

Whisper-small peaks at layer 8/12 with a Macro-F1 of 0.837 (Accuracy 0.890), while Whisper-medium peaks at layer 15/24 with a Macro-F1 of 0.858 (Accuracy 0.897). Whisper-large-v3 reaches a peak Macro-F1 of 0.860 at layer 26/32, but crucially forms a broad plateau, staying within ~2% of its peak through the final layer (Macro-F1 0.842 at layer 32). In contrast, wav2vec2-XLSR peaks at layer 15/24 (Macro-F1 0.801) before suffering a steep decline to 0.689 at the final layer (layer 24/24), dropping 14 percentage points compared to Whisper-large-v3's modest 2 percentage point loss.

Ablations on alignment confidence (min_score >= 0.7) improve Whisper-small, medium, and large-v3 Macro-F1s to 0.891, 0.902, and 0.904 respectively while preserving peak depth rankings. Per-class analysis reveals that aspirated stops (th, bh), affricates (ch), and open vowels (a) saturate early (F1 >= 0.90 by layers 4-5), whereas nasals (n, nn) and sibilants (ss) peak later (layers 7-9) and drive mid-layer gains. The approach does not win cleanly on fine-grained confusions like dental vs. retroflex nasals (n vs. nn, showing 13%-10% confusion rates).

| Model | Peak Layer / Total | Peak Depth Ratio | Accuracy | Macro-F1 | Final Layer Macro-F1 |
|---|---|---|---|---|---|
| Whisper-small | 8/12 | 0.67 | 0.890 ± 0.006 | 0.837 ± 0.017 | 0.812 |
| Whisper-medium | 15/24 | 0.63 | 0.897 ± 0.001 | 0.858 ± 0.003 | 0.818 |
| Whisper-large-v3 | 26/32 | 0.81 | 0.906 ± 0.005 | 0.860 ± 0.003 | 0.842 |
| wav2vec2-XLSR | 15/24 | 0.63 | - | 0.801 ± 0.010 | 0.689 ± 0.033 |

## Limitations

The study relies on coarse uromanization proxies and MMS forced alignments rather than canonical phonological inventories, meaning fine-grained phonological conclusions should be interpreted cautiously. Extracted segments are short (median duration of 20 ms), and experiments are constrained to a single self-supervised baseline (wav2vec2-XLSR) and a modest Bengali MFA audit subset (191 utterances), leaving broader SSL comparisons and context-controlled ABX trials to future work.

## Why read this

Speech and ML researchers investigating model interpretability or reusing Whisper as a feature extractor should read this to understand how supervised ASR training alters encoder representation depth compared to self-supervised models. It provides concrete proof that large supervised models mitigate late-layer phonetic degradation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Feature extraction selection for downstream spoken language processing tasks, acoustic model interpretability, and cross-lingual representation analysis.

## Institutions / 機構

Bangladesh University of Engineering and Technology

## Related

- (link related pages by id as the wiki grows)
