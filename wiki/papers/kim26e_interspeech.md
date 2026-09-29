---
id: kim26e_interspeech
category: deepfake-security
institutions: ["Sungkyunkwan University", "University of Toronto", "Jaume I University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-474
pdf: https://www.isca-archive.org/interspeech_2026/kim26e_interspeech.pdf
---

# Temporal Transition-Aware Multi-Head Modeling for Partially Spoofed Audio Detection and Localization

*Yunsu Kim, Juyeob Lee, Eunil Park*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-474)

**Category:** `deepfake-security`

**TL;DR** — This paper introduces a transition-aware framework for partially spoofed audio localization that explicitly models directional frame-to-frame transitions (Real-to-Fake and Fake-to-Real) alongside frame authenticity. Evaluated at a challenging 20 ms resolution, it achieves a state-of-the-art frame-level equal error rate of 6.45% on the PartialSpoof Dataset and down to 3.85% on PartialEdit-E2.

## Key contributions

- Re-conceptualizes partially spoofed audio localization (PSAL) around directional inter-frame transitions rather than isolated frame authenticity or point-wise boundary labels.
- Proposes a multi-head training objective incorporating a frame head, a 3-way transition head (Real->Fake, Fake->Real, None), and a refinement head that fuses both signals.
- Designs a Multi-Scale Gated Recurrent Unit (MS-GRU) backbone combining multi-dilated 1D convolutions and a Bi-GRU via a GEGLU gating mechanism.
- Achieves state-of-the-art frame-level EER across three benchmark datasets (PartialSpoof, PartialEdit-E1, and PartialEdit-E2) at a fine-grained 20 ms resolution.

## Problem

Detecting fine-grained manipulation spans (such as word or phoneme replacements) within otherwise genuine utterances remains a critical challenge in speech deepfake security. Prior approaches relying purely on frame-level binary classification fail because statistical irregularities are heavily confounded by intrinsic speech variability, while boundary-aware methods typically treat boundaries as static point-wise binary labels that ignore the directional evolution of representations. This limits their effectiveness when utterances contain multiple manipulated spans or when boundary cues are smoothed out, causing high error rates at fine-grained temporal resolutions.

## Method

The framework takes 20 ms frame-level embeddings extracted from a pretrained SSL model (Wav2Vec2-based XLS-R-300M, 1024-dim projected to d_model = 256) and passes them through a Multi-Scale GRU (MS-GRU) backbone. The MS-GRU processes inputs via two parallel branches: a 1D convolutional branch with 3 dilation pathways (dk in {1, 3, 5}, capturing local contexts at +-60 ms) combined using softmax-normalized weights, and a Bi-GRU branch capturing utterance-level sequential context. These two representations are dynamically fused per frame using a GEGLU gating mechanism with residual connections and layer normalization.

Stacking L=2 MS-GRU blocks yields frame-wise features **f_t**, which are fed into a multi-head loss architecture. The frame head optimizes a cross-entropy loss over 2-way bona fide/spoof logits. The transition head uses an MLP to classify adjacent frame pairs into 3 classes (None, Real->Fake, Fake->Real) using class-weighted cross-entropy (with weights alpha to combat non-boundary dominance). The refinement head concatenates **f_t**, the frame-head probability, and the adjacent transition probabilities (Real->Fake, Fake->Real), passing them through a feed-forward network and Bi-GRU to produce boundary-calibrated authenticity logits optimized via weighted binary cross-entropy.

During training, models use a batch size of 8, learning rates of 1e-4 (back-end) and 1e-6 (SSL front-end), weight decay 1e-4, and loss weights lambda_trans = 0.5 and lambda_ref = 1.0 on 4-second random crops. At inference, full variable-length sequences are processed directly.

## Experimental setup

Evaluated on the PartialSpoof Dataset (PSD) using official train/dev/eval splits, and PartialEdit-E1/E2 datasets using ASVspoof 2019 speaker-disjoint splits combined with VCTK bona fide speech. Compared against frozen and tuned baselines including ResNet+BiLSTM, TDL, GNCL, BAM, and CFPRF (all re-implemented at 20 ms resolution). The primary metric is frame-level Equal Error Rate (EER %). Implementation uses PyTorch on 16 kHz audio processed into 20 ms frames.

## Results

On the PartialSpoof Dataset at 20 ms resolution, the proposed tuned model achieves a headline EER of 6.45%, outperforming the strongest baseline CFPRF (7.41%) by 0.96 percentage points. On PartialEdit-E1 and E2, it achieves 4.50% and 3.85% EER respectively, consistently beating all baselines under both frozen and tuned SSL front-end conditions. Ablations demonstrate that removing the MS-GRU backbone degrades PSD EER by +1.46%, removing both refinement and transition losses degrades EER by +0.43%, and substituting 3-way transition supervision with conventional binary boundary labels increases PSD EER from 6.45% to 7.20%.

| System (20ms resolution) | PSD (EER%) | PE-E1 (EER%) | PE-E2 (EER%) |
|---|---|---|---|
| TDL (Frozen) | 18.92 | 23.18 | 21.63 |
| GNCL (Frozen) | 11.81 | 9.01 | 8.22 |
| BAM (Tuned) | 11.26 | 6.30 | 4.90 |
| CFPRF (Tuned) | 7.41 | 4.90 | 4.14 |
| Ours (Frozen) | 7.30 | 5.36 | 4.92 |
| Ours (Tuned) | 6.45 | 4.50 | 3.85 |

## Limitations

The evaluation and data corpora are currently restricted exclusively to English speech datasets (PSD and VCTK/PartialEdit derivatives). The model's performance on highly diverse multilingual speech corpora, cross-lingual generalization, or unseen zero-day vocoder and synthesis artifacts remains unverified.

## Why read this

Speech and ML researchers focusing on audio deepfake detection or fine-grained sequence localization should read this paper to see how modeling directional inter-frame transitions rather than point-wise frame labels resolves boundary ambiguity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated voice security screening, forensic audio analysis, and synthetic speech segment localization in telephony or broadcast media.

## Institutions / 機構

Sungkyunkwan University, University of Toronto, Jaume I University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Korea government (MSIT)

## Related

- [FakeSound2: A Benchmark for Explainable, Traceable, and Generalizable Deepfake Sound Detection](xie26_interspeech.md) — same problem · relatedness 2.2/3
- [QAMO: Quality-aware Multi-centroid One-class Learning For Speech Deepfake Detection](truong26_interspeech.md) — same problem · relatedness 2.0/3
- [MultiAPI Spoof: A Multi-API Dataset and Local-Attention Network for Speech Anti-spoofing Detection](zhang26p_interspeech.md) — same problem · relatedness 2.0/3
- [DeepFense: A Unified, Modular, and Extensible Framework for Robust Audio Deepfake Detection](kheir26_interspeech.md) — same problem · relatedness 2.0/3
- [Diffusion Reconstruction towards Generalizable Audio Deepfake Detection](cheng26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
