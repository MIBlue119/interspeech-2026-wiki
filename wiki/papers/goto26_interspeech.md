---
id: goto26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1997
pdf: https://www.isca-archive.org/interspeech_2026/goto26_interspeech.pdf
---

# Online Predictive Coding for Dual-Mode Self-Supervised Speech Models

[PDF](https://www.isca-archive.org/interspeech_2026/goto26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/goto26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1997)

**TL;DR** — This paper introduces Online Predictive Coding and Dual-mode Layer Normalization to robustly pre-train dual-mode self-supervised speech models, reducing the online-offline word error rate gap and achieving 3.40% WER on LibriSpeech test-clean at 160 ms latency.

## Problem

Dual-mode self-supervised speech models handle both streaming and non-streaming tasks within a single architecture by sharing parameters across modes, but computing attention over different context ranges creates a severe optimization bottleneck. Although appending learnable online registers to streaming chunks provides surrogate context, prior models fail to explicitly regularize these tokens, leaving a performance gap between online and offline modes. Resolving this mismatch is critical for deploying high-capacity self-supervised representations in real-time streaming applications without sacrificing offline accuracy.

## Method

The proposed pre-training framework builds on a wav2vec 2.0 BASE architecture using Dynamic Chunk Training with chunk sizes sampled uniformly from 2 to 32 and lookahead from 0 to the chunk size. It incorporates exactly one learnable online register per chunk combined with two key additions: Online Predictive Coding (OPC), which applies multi-step future prediction objectives via linear projections from registers to offline representations across four future steps (Nf=4) using cosine distance and stop-gradient on targets; and Dual-mode Layer Normalization, which maintains separate affine parameters (gamma and beta) for online and offline modes while sharing all other weights. The model is jointly optimized using CTC loss, codebook diversity loss, and the OPC loss with a weight of 0.1 for 100k steps on 16 GPUs.

## Results

Evaluated on LibriSpeech and WSJ using a Flashlight beam search decoder with a 4-gram language model. On LibriSpeech at 160 ms latency (Nc=8, Nl=0), adding online registers and OPC reduces online word error rates from 3.65% to 3.40% on test-clean and from 10.15% to 9.65% on test-other, while offline WER improves from 2.73% to 2.64% on test-clean and 6.63% to 6.41% on test-other. Ablations show that predicting four future frames (Nf=4) yields the optimal balance, whereas too few (Nf=2) or too many (Nf=8) degrade accuracy. Comparisons against UFO2 demonstrate superior online WER on both test-clean and test-other sets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers deploying speech recognition systems that require both low-latency real-time streaming and high-accuracy offline transcription within a unified model.

## Limitations

Auxiliary future-prediction tasks can introduce domain-specific biases when the target evaluation domain differs from the pre-training distribution.

## Related

- (link related pages by id as the wiki grows)
