---
id: grundhuber26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2406
pdf: https://www.isca-archive.org/interspeech_2026/grundhuber26_interspeech.pdf
---

# Beyond Cross-Reconstruction: Probing-Based Disentanglement Evaluation for Acoustic Teleportation Codecs

[PDF](https://www.isca-archive.org/interspeech_2026/grundhuber26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/grundhuber26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2406)

**TL;DR** — This paper extends a probing-based framework to quantify partition-level disentanglement in neural audio codecs, revealing that acoustic parameters like reverberation time emerge blindly in acoustic embeddings while speaker identity is largely confined to speech partitions.

## Problem

Neural audio codecs partition their latent spaces to disentangle speech attributes for tasks like acoustic teleportation and voice conversion, but existing evaluations rely on downstream cross-reconstruction quality and qualitative checks. These methods cannot reliably detect leakage across embedding partitions because decoders can ignore redundant information in the wrong partition. Classical disentanglement metrics assume dimension-wise independence and cannot handle partition-level structure, making a systematic, probe-based evaluation framework necessary.

## Method

The authors treat the pre-trained encoder of an acoustic teleportation codec as a fixed feature extractor, generating 128-dimensional representations split equally into 64-dimensional speech and acoustic partitions. Identical lightweight multi-layer perceptron probes consisting of mean pooling, three fully connected layers with 128 hidden units, ReLU activations, and 10% dropout are trained independently on each partition. Regression probes predict room-acoustic parameters across seven octave bands and broadband (reverberation time T60, clarity C50, and direct-to-reverberant ratio DRR) using mean-squared error, while classification probes predict speaker identity using cross-entropy loss. The dataset comprises 60,000 samples for room parameters derived from DNS5 read speech and GWAsmall RIRs, and a subset of 7,806 samples for top-100 speaker classification, evaluating models across various training tasks, quantization levels (N in {4, 8, 16} and unquantized), and temporal downsampling factors.

## Results

Evaluating across 60,000 test samples, the acoustic embedding MLP achieves a broadband T60 root mean square error of 0.094 s and Pearson correlation of 0.947, falling within 0.02 s RMSE of fully supervised CRNN-MB baselines (0.082 s, rho = 0.959) without any explicit room supervision. Speaker identity is effectively confined to the speech partition, with a top-1 accuracy gap of 56.8 percentage points for the N=8 quantized model (83.1% vs 26.3%), whereas acoustic information partially leaks into speech embeddings with T60 Pearson correlation remaining above 0.75 across configurations. Temporal downsampling of the acoustic partition leaves room parameter estimation largely unchanged (T60 rho from 0.895 to 0.915), confirming temporal compressibility. Ablations show that standard output-quality metrics like ScoreQ do not predict disentanglement, proving that probing is required to expose cross-partition leakage.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers designing neural audio codecs, acoustic teleportation systems, or voice conversion models can use this probing framework to rigorously measure latent space disentanglement and leakage.

## Limitations

Probes use simple MLPs, meaning measured leakage serves as a lower bound on actual information content, and disentanglement gaps cannot be directly compared across different factors.

## Related

- (link related pages by id as the wiki grows)
