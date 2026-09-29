---
id: horiguchi26_interspeech
category: speaker
institutions: ["NTT"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-45
pdf: https://www.isca-archive.org/interspeech_2026/horiguchi26_interspeech.pdf
---

# Tight Boundary Prediction in Speaker Diarization Using Causal-Anticausal Consistency

*Shota Horiguchi, Marc Delcroix, Naohiro Tawara, Takanori Ashihara, Atsushi Ando*

[PDF](https://www.isca-archive.org/interspeech_2026/horiguchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/horiguchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-45)

**Category:** `speaker`

**TL;DR** — This paper proposes a co-training framework that uses causal and anticausal speaker diarization models to iteratively transform loose multi-talker ASR annotations into tight pseudo labels, recovering about 70% of the tightening effect of ideal supervised training.

## Key contributions

- Formulates a novel task of training speaker diarization models to output tight boundaries using only loose, multi-talker ASR annotations from single-channel recordings.
- Introduces causal-anticausal consistency to prevent unidirectional models from padding segment boundaries or filling pauses, using their disagreement to mask and tighten loose labels.
- Proposes three label-tightening strategies (Basic, VAD, and Speaker-Counting / SC tightening) along with a segment restoration rule to mitigate over-deletion.
- Develops a progressive co-training scheme that updates causal and anticausal model parameters at every minibatch to iteratively refine pseudo labels.

## Problem

Multi-talker ASR corpora are widely used to train end-to-end neural diarization (EEND) systems, but their annotations are inherently loose—containing padded boundaries and filled interior pauses to protect semantic continuity. When models are trained on these loose labels, they internalize this padding behavior, producing blurred boundaries that degrade downstream tasks like guided source separation and spoken dialogue modeling. Prior methods for obtaining tight boundaries rely either on costly manual annotation (such as DIHARD or VoxConverse, requiring 15X to 30X real-time rates) or forced alignment on channel-separated headset recordings, rendering them inapplicable to single-channel web audio or large-scale ASR corpora.

## Method

The method leverages the architectural constraints of unidirectional models: a causal model (processing past frames) cannot pad the beginning of a speech segment or determine if post-speech silence is a pause or a true termination, while an anticausal model (processing future frames) cannot pad the end. For multi-speaker inputs, the authors map powerset class outputs Q to speaker-wise posteriors P using a power-set to multilabel conversion function Q2P, where the maximum number of overlapping speakers is restricted to S=4 (yielding R=12 classes). To handle speaker confusion, they introduce Speaker-Counting (SC) tightening, which pairs missed-speaker and false-alarmed speaker frames and swaps their posterior probabilities based on sorted speaking durations.

During training, causal (vector parameters theta-vec) and anticausal (vector parameters theta-carat) models run forward passes on a minibatch X and loose labels Y-tilde. Their frame-wise posterior probabilities are converted and fed into a tightening function combined with a restoration step that recovers loose segments if more than 50% of an interval is removed. The resulting tightened labels Y-tight supervise both models simultaneously via multi-class cross-entropy loss over powerset classes. Once co-training completes on the compound dataset, a final non-causal diarization model is trained from scratch using the generated pseudo labels.

The system utilizes an EEND-vector clustering framework where local diarization uses 10-second windows with a 1-second shift, followed by ECAPA-TDNN or ReDimNet (variant B2) frontends and an LSTM classification backend. Causal and anticausal variants are built by replacing convolutions and self-attention Transformer blocks with causal-masked versions while retaining batch normalization and squeeze-and-excitation (SE) blocks.

## Experimental setup

Experiments are conducted on a compound dataset totaling 382 training/validation hours: ASR corpora (AMI-MHM 81h train, AMI-SDM 80h train, AliMeeting 111h train) with loose labels, and diarization corpora (MSDWild 64h train, VoxConverse 18h train) with tight labels. Out-of-domain evaluation is performed on DIHARD III. Baselines include non-causal models trained on loose labels (B1) and ideal tight labels via forced alignment (B2). Performance is evaluated via Diarization Error Rate (DER) broken into Missed Detection (MI), False Alarm (FA), and Speaker Confusion (CF), as well as time-constrained minimum-permutation word error rate (tcpWER) on multi-talker ASR pipelines (GSS + Whisper, and SE-DiCoW). Models are optimized using Adam with a batch size of 32 for up to 180k steps, and 6k additional steps for co-training.

## Results

On in-domain ASR corpora with ECAPA-TDNN, the baseline loose-label model (B1) yields DERs of 35.24% (AMI-MHM), 38.79% (AMI-SDM), and 29.39% (AliMeeting), whereas the ideal tight-label topline (B2) achieves 16.12%, 20.54%, and 23.49% respectively. The proposed SC tightening method (P3) recovers roughly 70% of this gap, achieving DERs of 20.96% (AMI-MHM), 25.29% (AMI-SDM), and 26.10% (AliMeeting). ReDimNet backends show similar trends, improving AMI-MHM from 34.92% (B1) down to 19.14% (P3).

On the out-of-domain DIHARD III corpus using ReDimNet, the baseline DER of 29.89% improves to 25.28% with SC tightening, outperforming the ideal tight-label baseline of 26.07%. In multi-talker ASR evaluations on AMI-SDM, VAD tightening (P2) successfully reduces single-channel ASR tcpWER from 28.30% down to 26.31% (compared to 25.93% for the ideal tight topline), demonstrating that aggressive tightening successfully reduces insertion errors without catastrophic deletion penalties.

| System | AMI-MHM DER (%) | AMI-SDM DER (%) | AliMeeting DER (%) | MSDWild DER (%) |
|---|---|---|---|---|
| (B1) Non-causal + Loose | 35.24 | 38.79 | 29.39 | 27.53 |
| (B2) Non-causal + Tight (Topline) | 16.12 | 20.54 | 23.49 | 26.23 |
| (P1) Non-causal + Basic Tightening | 23.36 | 25.94 | 26.93 | 27.52 |
| (P2) Non-causal + VAD Tightening | 24.30 | 28.29 | 26.40 | 28.09 |
| (P3) Non-causal + SC Tightening | 20.96 | 25.29 | 26.10 | 27.28 |

## Limitations

The framework requires a small amount of ideal tight labels on validation sets to assess model convergence during co-training. The experiments were restricted to moderately sized corpora with forced-alignment-based labels, leaving large-scale unverified data scales for future work. The model architectures are smaller than massive self-supervised speech models like WavLM, and aggressive progressive tightening can occasionally increase deletion errors in downstream ASR tasks.

## Why read this

Speech and ML researchers tackling speaker diarization or multi-talker speech processing will learn how to leverage directional model asymmetries to extract high-quality supervision from noisy, loose annotations without manual intervention.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guided source separation, conversational spoken dialogue system data curation, and multi-talker automatic speech recognition preprocessing.

## Institutions / 機構

NTT

## Related

- (link related pages by id as the wiki grows)
