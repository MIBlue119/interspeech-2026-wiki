---
id: kashiwagi26_interspeech
category: asr
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1604
pdf: https://www.isca-archive.org/interspeech_2026/kashiwagi26_interspeech.pdf
---

# Speaker-Aware Hypothesis Clustering and Merging for Target-Speaker-free and Target-Speaker Multi-Talker ASR

*Yosuke Kashiwagi, Osamu Take, Hayato Futami, Emiru Tsunoo, Siddhant Arora, Shinji Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/kashiwagi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kashiwagi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1604)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper integrates continuous speaker embeddings into Hypothesis Clustering and Merging (HCM) for multi-talker ASR, achieving up to 46% relative WER reduction under identical-content conditions and 23% in target-speaker selection.

## Key contributions

- Identified critical failure modes of transcript-only clustering in HCM, specifically under identical-content multi-talker scenarios where transcript edit distance becomes zero.
- Proposed a speaker-aware extension to HCM that redefines agglomerative hierarchical clustering distance in a joint transcript-speaker space using continuous speaker embeddings.
- Extended the framework to target-speaker multi-talker ASR via centroid-based embedding selection against cluster representations, replacing coarse discrete k-means token prompting.
- Demonstrated substantial robustness gains on identical-content VCTK benchmarks while preserving baseline competitive performance on standard LibriMix multi-speaker sets.

## Problem

Multi-talker ASR systems such as Permutation Invariant Training (PIT), Serialized Output Training (SOT), and Hypothesis Clustering and Merging (HCM) struggle when multiple speakers articulate identical or nearly identical phrases because transcript-similarity metrics collapse to zero, causing distinct acoustic sources to be incorrectly merged. Furthermore, in target-speaker scenarios where enrollment utterances are provided, discrete k-means quantized speaker tokens fail to preserve fine-grained acoustic identity details. These shortcomings prevent existing hypothesis-space models from reliably separating overlapping speech or fully exploiting enrollment information.

## Method

The proposed approach augments the standard Hypothesis Clustering and Merging (HCM) framework by redefining the Agglomerative Hierarchical Clustering (AHC) distance metric to operate in a joint transcript-speaker space. Given decoding hypotheses and aligned acoustic segments, speaker embeddings are extracted using a pretrained TitaNet-large model, and a speaker distance term (evaluated via squared L2 distance, cosine distance, or inverse PLDA score) is linearly combined with the normalized edit distance using a balancing hyperparameter alpha. The joint distance allows AHC to successfully cluster hypotheses even when transcript edit distances are entirely non-discriminative (i.e., identical content).

For target-speaker multi-talker ASR, the framework eliminates discrete token prompting by directly leveraging the joint embedding space. After HCM clusters hypotheses, the centroid of each cluster is computed by averaging the speaker tokens, and the target cluster is selected by minimizing the distance between the cluster centroids and an enrollment speaker embedding. The underlying acoustic model is an encoder-decoder architecture featuring a 12-block Conformer encoder and a 6-layer Transformer decoder (~30M parameters), trained on LibriMix datasets for 100 epochs with checkpoint averaging, while inference uses a beam size of 1 and top-N = 20 speaker tokens.

## Experimental setup

Evaluated on LibriMix (1-speaker, 2-speaker, and 3-speaker clean and noisy subsets) and a pseudo identical-content dataset constructed from VCTK. Compared against Serialized Output Training (SOT) and conventional transcript-only HCM baselines. The primary metric is Word Error Rate (WER), utilizing a ~30M parameter Conformer-Transformer network and TitaNet-large for speaker embeddings.

## Results

On the VCTK identical-content setting, text-only HCM yielded 68.3% WER for 2-speaker and 88.3% for 3-speaker mixtures, whereas the proposed L2 variant reduced these to 36.6% (a 46.4% relative reduction) and 57.2% (a 35.2% relative reduction), respectively. On standard LibriMix benchmarks, the joint distance variants maintained competitive performance close to baseline HCM (e.g., 2-speaker clean LibriMix at ~8.7% WER vs 8.2% for text-only HCM when alpha = 0.005). In target-speaker MT-ASR on clean 2-speaker LibriMix, embedding-based selection improved WER from 18.7% (discrete token prompting) to 14.4%, a 23.0% relative improvement.

| Method | VCTK 2spk (Identical) | VCTK 3spk (Identical) | LibriMix 2spk (Clean) | LibriMix 3spk (Clean) |
|---|---|---|---|---|
| SOT | 27.4% | 37.5% | 9.1% | 30.1% |
| HCM (text-only) | 68.3% | 88.3% | 8.2% | 21.5% |
| HCM + L2 (alpha=0.005) | 36.6% | 57.2% | 8.7% | 24.0% |
| HCM + Cosine (alpha=0.5) | 46.4% | 64.9% | 8.3% | 21.7% |
| HCM + PLDA (alpha=0.005) | 43.4% | 61.8% | 8.3% | 22.3% |

## Limitations

Performance degrades significantly in extremely challenging 3-speaker noisy target-speaker environments where WER exceeds 120% across all evaluated methods due to severe acoustic overlap and noise. The approach introduces a sensitive balancing hyperparameter alpha that, if set too high (>0.01), overemphasizes speaker distance and damages useful transcript-level similarity. Additionally, hypothesis-space methods remain computationally demanding due to the requirement of generating and clustering multiple decoding hypotheses.

## Why read this

Speech researchers and ML engineers tackling complex overlapping multi-talker conversational audio should read this to learn how to mathematically unify continuous speaker embeddings with hypothesis-space ASR decoders to resolve identical-content failure modes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-world meeting transcription systems, multi-speaker conversational transcription, and target-speaker extraction engines for smart home assistants.

## Institutions / 機構

Sony, Carnegie Mellon University

## Related

- (link related pages by id as the wiki grows)
