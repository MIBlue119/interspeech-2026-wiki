---
id: getman26_interspeech
category: asr
labels: [self-supervised]
institutions: ["Aalto University", "South East Technological University", "Finnish Arts and Culture Agency"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-50
pdf: https://www.isca-archive.org/interspeech_2026/getman26_interspeech.pdf
---

# Data Filtering Trade-offs in Self-Supervised Speech Representation Learning: A Study on Unconstrained Broadcast Audio

*Yaroslav Getman, Tamás Grósz, Tommi Lehtonen, Mikko Kurimo*

[PDF](https://www.isca-archive.org/interspeech_2026/getman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/getman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-50)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — A controlled study on unconstrained Finnish broadcast audio compares four self-supervised pretraining data filtering pipelines, revealing that neural VAD with language identification cuts downstream ASR word error rates by up to 12.7% absolute while dropping general audio classification accuracy by up to 9 percentage points.

## Key contributions

- Evaluated four pretraining data filtering strategies (Raw, Energy VAD, Neural VAD, Neural VAD + Audio LID) on a 20.4-hour unconstrained broadcast archive.
- Proved that simple energy-based VAD consistently degrades downstream ASR and SSL representation quality compared to raw unfiltered segmentation.
- Quantified that neural VAD combined with LID achieves up to 12.7% absolute WER reduction on low-resource ASR using only 42% of the original data.
- Demonstrated that heavily selective speech-only filtering harms general audio understanding, causing drops on 6 out of 8 non-speech audio tasks.

## Problem

Raw broadcast audio provides an abundant source of unlabeled speech data for self-supervised learning (SSL) but is inherently noisy, diverse, and unstructured. Prior work relies on heuristics—such as energy-based VAD or arbitrary language pruning—without empirical evaluation of how pretraining data filtering impacts downstream speech and audio foundation model capabilities. This leaves practitioners without principled guidance on balancing preprocessing cost, data quality, and task generalizability when scaling to real-world archives.

## Method

The study uses the wav2vec 2.0 Base architecture (95M parameters) implemented in Fairseq to isolate filtering effects. Four subsets from a 20.4-hour Finnish TV archive (AlfaTV) are tested: Raw (fixed 30s chunks, 100% data, 20.4K hrs), Energy-based VAD (Auditok toolkit, 86.5% data, 17.7K hrs), Neural VAD (pyannote.audio, 58.4% data, 11.9K hrs), and Neural VAD + Audio LID (ECAPA-TDNN VoxLingua107, 42.3% data, 8.6K hrs). All models are pretrained in full precision using 512 AMD MI250X GPUs for 62K steps with a dynamic batch size of 3 minutes per GPU and a learning rate of 6e-4.

For inference and downstream evaluation, models are fine-tuned for ASR using CTC loss on Common Voice 16.1, FLEURS, and VoxPopuli over 80 epochs with an lr of 1e-4, or evaluated via frozen representation probing on ML-SUPERB and ARCH benchmarks. The key design intuition is that raw segmentation yields mixed-content chunks that simplify wav2vec 2.0's contrastive task via diverse acoustic distractors, whereas neural VAD focuses pretraining on pure speech contexts at the expense of general audio diversity.

## Experimental setup

Evaluated on Finnish subsets of Common Voice 16.1 (2.7h), FLEURS (8.8h), and VoxPopuli (22.6h) for ASR fine-tuning (80 epochs, 8x MI250X GPUs). Benchmarked using ML-SUPERB (monolingual ASR track, 10min and 1h subsets) for frozen representation CER, and the ARCH benchmark (Acoustic Events and Music domains) using single-layer linear probes for 200 epochs.

## Results

Raw baseline achieved WERs of 34.2% (Common Voice test), 26.3% (FLEURS test), and 20.0% (VoxPopuli test). Energy-based VAD underperformed raw data across all ASR metrics, yielding 39.4% on Common Voice test and 30.8% on FLEURS test. Neural VAD improved ASR to 24.1% (Common Voice) and 18.8% (FLEURS). Neural VAD + A-LID achieved the best ASR results at 21.5% (Common Voice), 16.5% (FLEURS), and 15.2% (VoxPopuli), representing up to 12.7% absolute WER reduction over baseline. However, on the ARCH non-speech benchmark, the Raw baseline won 6 out of 8 tasks (e.g., 62.4% on ESC-50, 70.2% on US8K), while N-VAD + A-LID performed worst on 3 out of 8 tasks and topped none.

| System | Common Voice Test (WER) | FLEURS Test (WER) | VoxPopuli Test (WER) |
| --- | --- | --- | --- |
| Raw (Baseline) | 34.2% | 26.3% | 20.0% |
| E-VAD | 39.4% | 30.8% | 23.0% |
| N-VAD | 24.1% | 18.8% | 15.8% |
| N-VAD + A-LID | 21.5% | 16.5% | 15.2% |

## Limitations

Evaluated exclusively on Finnish broadcast data and a single wav2vec 2.0 Base architecture, meaning language-specific linguistic properties or larger model capacities could alter the exact trade-offs. The acoustic domain is restricted to TV broadcasts (AlfaTV), which may not generalize to telephone speech, podcasts, or far-field meetings. Additionally, the highest-performing pipeline (N-VAD + A-LID) incurs a massive 4.3x preprocessing RTF overhead compared to neural VAD alone.

## Why read this

Speech engineers and researchers designing data preprocessing pipelines for large-scale SSL foundation models should read this to understand the quantifiable trade-offs between filtering cost, ASR gains, and the degradation of general audio understanding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building robust monolingual speech recognition systems from unconstrained, noisy broadcast archives and audio corpora.

## Institutions / 機構

Aalto University, South East Technological University, Finnish Arts and Culture Agency

**Funding / 經費:** Business Finland, Foundation for Aalto University Science and Technology

## Related

- [Which Data Matter? Embedding-Based Data Selection for Speech Recognition](aldeneh26_interspeech.md) — same problem · relatedness 2.2/3
- [Unsupervised Speech in the Wild Challenge: Learning Robust Multilingual Representations](gomez26_interspeech.md) — shared technique · relatedness 2.0/3
- [A Gated Multi-Task Whisper Framework for Speech, Emotion, and Scene Understanding](bhat26_interspeech.md) — shared technique · relatedness 2.0/3
- [Content–Speaker Trade-offs in Continued Self-Supervised Pre-Training Across SSL Paradigms for Multilingual Speech](schlotterbeck26_interspeech.md) — shared technique · relatedness 1.9/3
- [Leveraging Audio-LLMs to Filter Speech-to-Speech Training Data](chen26l_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
