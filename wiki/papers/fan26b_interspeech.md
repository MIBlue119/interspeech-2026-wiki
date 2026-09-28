---
id: fan26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2746
pdf: https://www.isca-archive.org/interspeech_2026/fan26b_interspeech.pdf
---

# Robust Multi-Tier Infant-Centered Audio Understanding with Whisper via Structured Speaker Conditioning

[PDF](https://www.isca-archive.org/interspeech_2026/fan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2746)

**TL;DR** — This paper presents a multi-tier infant-centered audio tagger combining a LoRA-finetuned Whisper encoder and a target-speaker-aware transformer, achieving strong framewise classification performance on naturalistic home recordings.

## Problem

Naturalistic infant-centered home audio recordings present severe challenges including limited labeled data, poor signal-to-noise ratios, overlapping speech, and cross-family domain shifts caused by varying acoustic environments and speaker traits. Standard clipping datasets fail to capture these complexities, requiring fine temporal resolution frame-level labeling that merges diarization and vocalization classification. Addressing these domain gaps is critical for reliable automated analysis of child-adult interactions in longitudinal developmental research.

## Method

The framework utilizes a pretrained Whisper-large-v2 encoder updated via low-rank adaptation (LoRA, rank 4, alpha 8) on query and value projections to extract 1280-dimensional acoustic embeddings. A windowed MLP downsamples and aggregates consecutive frames by a factor of five (window size 5, output dimension 512) to improve computational efficiency. A target-speaker extractor module conditions a two-layer transformer encoder on factorized speaker tokens, which decompose into a shared category tier token plus a learned family-specific offset. Finally, per-tier two-layer MLP classifiers generate framewise labels, trained using cross-entropy alongside a sequence-level temporal smoothing loss to penalize rapid oscillations.

## Results

Evaluated on ~17 hours of daylong home recordings from 52 non-overlapping families (37 train, 5 validation, 10 test) captured via LittleBeats wearable devices, the proposed model achieves an unweighted average Macro-F1 of 74.88 and Cohen's kappa of 68.14 across tiers. It outperforms baselines such as TL-TR512 (Macro-F1 69.55) and overlapping-removal W2V-LB (Macro-F1 68.11), while ablation experiments confirm the performance contributions of LoRA fine-tuning, family-specific speaker offsets, and the temporal smoothing loss.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developmental psychologists studying naturalistic child-adult interactions, early language acquisition, and home audio environments using wearable audio recorders.

## Limitations

Evaluated exclusively on family audio datasets collected via specific wearable hardware, and requires family ID supervision during training to utilize the factorized speaker offset embeddings.

## Related

- (link related pages by id as the wiki grows)
