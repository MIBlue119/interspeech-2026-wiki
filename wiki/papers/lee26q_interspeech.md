---
id: lee26q_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1787
pdf: https://www.isca-archive.org/interspeech_2026/lee26q_interspeech.pdf
---

# PhonePrune: One-shot Phoneme-Aware Pruning for Large-scale ASR Models via Phoneme Set Generation and Calibration

[PDF](https://www.isca-archive.org/interspeech_2026/lee26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1787)

**TL;DR** — PhonePrune introduces a phoneme-aware one-shot pruning method for large ASR models that preserves low-magnitude parameters responsible for fine-grained phonetic distinctions, yielding up to 13.83% Word Error Rate reductions over Distil-Whisper at 50% sparsity.

## Problem

Conventional magnitude-based pruning indiscriminately eliminates low-magnitude weights, which often encode critical fine-grained phonetic distinctions rather than just general acoustic features. This causes severe recognition failures on vulnerable acoustic segments like non-sibilant fricatives, alveolar fricatives, and transient plosives. Consequently, standard compressed models suffer significant performance drops under high sparsity, failing to capture subtle phonological variations essential for accurate speech recognition.

## Method

The paper introduces the Phoneme Ticket Hypothesis and proposes PhonePrune, consisting of Phoneme Set Generation and Phoneme-aware Calibration. It constructs contrastive phoneme triplets using phonological constraints—Complementary Distribution as a specificity filter against generic contexts and Minimal Pairs as a discriminability filter against confusable sounds—utilizing TIMIT and the Montreal Forced Aligner for temporal boundaries. A temporally-masked objective isolates gradient sensitivities at target phoneme timestamps. These gradient sensitivities are combined with global weight magnitudes via a composite scoring function controlled by a scaling factor to recalibrate weights and protect essential phoneme-specific parameters from being pruned at 50% sparsity.

## Results

Evaluated on LibriSpeech (test-clean, test-other) and Common Voice 15 (English, Korean, Japanese) at 50% unstructured sparsity. Compared against unstructured pruning baselines (Random, L0, L1, OBS) and compressed Whisper variants (Quantized Whisper, Distil-Whisper, uDistil-Whisper). PhonePrune achieves substantial Word Error Rate (WER) reductions on Korean and Japanese Common Voice 15, yielding 13.41% and 13.83% WER improvements over Distil-Whisper, respectively. Ablations demonstrate that increasing the calibration sample size up to 128 contrastive triplets steadily improves performance across all evaluated datasets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers looking to deploy large-scale automatic speech recognition models on resource-constrained or on-device environments without sacrificing accuracy on fine-grained phonetic distinctions across multiple languages.

## Limitations

The approach requires a curated calibration dataset with phoneme-level boundary alignments generated via forced alignment tools.

## Related

- (link related pages by id as the wiki grows)
