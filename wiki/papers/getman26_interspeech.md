---
id: getman26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-50
pdf: https://www.isca-archive.org/interspeech_2026/getman26_interspeech.pdf
---

# Data Filtering Trade-offs in Self-Supervised Speech Representation Learning: A Study on Unconstrained Broadcast Audio

[PDF](https://www.isca-archive.org/interspeech_2026/getman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/getman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-50)

**TL;DR** — This paper evaluates four pretraining data filtering pipelines on unconstrained broadcast audio for self-supervised speech representation learning, showing that neural voice activity detection combined with language identification yields up to a 12.7% absolute word error rate reduction in downstream ASR while degrading general audio understanding by up to 9 percentage points.

## Problem

Unconstrained broadcast audio archives offer abundant unlabeled data for self-supervised learning (SSL) pretraining, but they contain diverse acoustic noise, silence, and multiple languages. Practitioners typically rely on heuristic filtering choices like energy-based voice activity detection or language identification without systematic evaluations of how these steps impact SSL representation quality. Consequently, the trade-offs between preprocessing overhead, downstream speech recognition accuracy, and general audio grounding remain poorly understood.

## Method

The study compares four filtering pipelines of increasing selectivity on 20,400 hours of Finnish broadcast TV data: Raw (fixed 30-second segmentation without filtering, retaining 100% of data), Energy-based VAD using Auditok (retaining 86.5%), Neural VAD using pyannote.audio (retaining 58.4%), and Neural VAD combined with an ECAPA-TDNN audio-based language identification model targeting Finnish from 107 languages (retaining 42.3%). A wav2vec 2.0 Base model (95M parameters) is pretrained from scratch on each subset using 512 AMD MI250X GPUs for 62K steps. Pretraining representations are evaluated using fine-tuned ASR, frozen-feature ML-SUPERB benchmarking, and non-speech audio classification probing via the ARCH benchmark.

## Results

Fine-tuning on Common Voice, FLEURS, and VoxPopuli shows that neural VAD with language identification achieves the best ASR performance, delivering absolute WER reductions of 4.8% to 12.7% over raw segmentation (with the largest gains on the smallest Common Voice set). Frozen-feature probing on ML-SUPERB confirms consistent CER improvements for neural VAD methods, whereas energy-based VAD consistently degrades representation quality compared to raw segmentation across tasks. Conversely, probing on the ARCH benchmark reveals that raw unfiltered audio yields superior general audio and music understanding, outperforming selective pipelines on 6 out of 8 non-speech classification tasks and avoiding drops of up to 9 percentage points seen with aggressive filtering.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building speech foundation models from unconstrained real-world broadcast archives or noisy multilingual audio collections.

## Limitations

The investigation is restricted to a single base architecture (wav2vec 2.0), a single target language (Finnish), and specific toolkits for VAD and language identification.

## Related

- (link related pages by id as the wiki grows)
