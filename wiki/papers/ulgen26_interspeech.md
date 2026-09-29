---
id: ulgen26_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-942
pdf: https://www.isca-archive.org/interspeech_2026/ulgen26_interspeech.pdf
---

# Rethinking Speaker Embeddings for Speech Generation: Sub-Center Modeling for Capturing Intra-Speaker Diversity

*Ismail Rasim Ulgen, John Hansen, Carlos Busso, Berrak Sisman*

[PDF](https://www.isca-archive.org/interspeech_2026/ulgen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ulgen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-942)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper proposes a sub-center modeling framework for speaker embeddings to bridge the gap between recognition-driven compactness and generation-oriented variability, improving naturalness and pitch diversity in zero-shot voice conversion.

## Key contributions

- A generation-oriented perspective that reframes intra-speaker variance as a design parameter rather than noise to suppress.
- A sub-center training formulation using an extended AAM-Softmax objective that learns multiple prototypes per speaker while maintaining discriminability.
- Empirical demonstration via voice conversion that increased intra-speaker embedding variance improves naturalness, intelligibility, and prosodic expressiveness.
- Analysis of temperature-scaling effects on sub-center utilization and the trade-off between speaker similarity and intelligibility.

## Problem

Conventional speaker embeddings are trained for speaker recognition using large-scale classification objectives that enforce small intra-speaker variance and high inter-speaker separation. While this single-center prototype structure optimizes recognition performance, it collapses acoustic variations caused by prosody, style, and emotion. Consequently, these recognition-optimized embeddings are suboptimal when used as conditioning signals for downstream speech generation systems like text-to-speech and voice conversion, which require structured intra-speaker diversity to sound natural and expressive.

## Method

The authors modify the standard ECAPA-TDNN architecture by replacing the single class-center classification head with a sub-center formulation. The classifier weight matrix is expanded to $W_c \in \mathbb{R}^{L \times N \times C}$, maintaining $C$ sub-centers per speaker class ($n$), where $L$ is the embedding dimension and $N$ is the number of speakers. The similarity $s_{n,c}$ between an embedding vector $x_i$ and the $c$-th sub-center of class $n$ is aggregated using temperature-scaled softmax weights to compute a sub-class similarity score $\tilde{s}_n$, which is then fed into an adapted Additive Angular Margin Softmax (AAM-Softmax) loss with margin $m$ and scale $k$.

To evaluate the embeddings in a generative context, the authors adopt a speech-resynthesis voice conversion pipeline built on discrete HuBERT units (from the 6th layer clustered via k-means with $K=100$ on LibriSpeech-clean-100) and pitch units extracted using the Dio algorithm combined with a VQ-VAE. A HiFi-GAN decoder generates expressive waveforms conditioned on these linguistic units, pitch units, and a 192-dimensional sub-center speaker embedding extracted from a reference utterance. The embedding network is trained on VoxCeleb2 using the Adam optimizer with a base learning rate of $1e-4$, a cyclic learning rate schedule, online data augmentation (noise and reverberation), batch size 32, margin $m=0.2$, and scale $s=30$.

## Experimental setup

Speaker embeddings are trained on VoxCeleb2. Voice conversion experiments use the VCTK corpus (110 English speakers, ~400 utterances each), with 90 speakers for training and 20 unseen speakers for zero-shot evaluation. Baselines include standard ECAPA-TDNN embeddings. Evaluations use Equal Error Rate (EER) on VCTK and VoxCeleb1-E test sets, Word Error Rate (WER) and Character Error Rate (CER) via a Wav2Vec2 ASR model, Speaker Embedding Cosine Similarity (SECS), and subjective listening tests including MOS for naturalness, SMOS for speaker similarity, and ABX tests for prosody.

## Results

Sub-center ECAPA-TDNN models achieve lower or comparable EER on speaker verification while successfully increasing intra-to-inter-class variance ratios. For instance, the $C=20$ configuration yields an intra/inter-class variance ratio of 0.47 on VCTK (vs 0.42 for baseline ECAPA-TDNN) and 0.91 on VoxCeleb1-E (vs 0.66 for baseline), alongside an improved VCTK verification EER of 1.55%. In voice conversion objective evaluations, the $C=20$ sub-center model achieves the lowest WER (13.93% vs 14.84% baseline) and CER (6.41% vs 6.82% baseline), whereas lower-temperature variants ($T=0.1$) optimize SECS (65.86% vs 64.04%). Subjectively, the $C=20$ model significantly outperforms the baseline in naturalness MOS (3.18 vs 2.94) and similarity MOS (2.88 vs 2.65), and wins clear preference in ABX prosody tests.

| System | EER (%) ↓ | WER ↓ | SECS (%) ↑ | Naturalness MOS ↑ |
|---|---|---|---|---|
| Baseline ECAPA-TDNN | 1.71 | 14.84 | 64.04 | 2.94 |
| Sub-center ($C=10, T=0.1$) | 1.47 | 14.32 | 65.86 | 2.89 |
| Sub-center ($C=10$) | 1.50 | 14.65 | 64.14 | — |
| Sub-center ($C=20$) | 1.55 | 13.93 | 64.59 | 3.18 |

## Limitations

The evaluation is restricted to English using a single voice conversion framework (VCTK and VoxCeleb datasets) and does not test cross-lingual or highly expressive pathological speech variations. The exploration of sub-center scaling is limited to $C=10$ and $C=20$ with two temperature values, leaving optimal hyperparameter tuning across diverse model capacities unexhausted. Additionally, the approach demonstrates an empirical trade-off where higher variance improves intelligibility and prosody at a minor cost to strict speaker identity similarity.

## Why read this

Speech and ML researchers building personalization or zero-shot generation systems should read this to understand why standard recognition-trained speaker embeddings limit expressive output and how simple sub-center classification modifications resolve this bottleneck.

## Code

- https://choughtotem.github.io/subcentervc_demo/

## Applications

Zero-shot voice conversion, expressive text-to-speech, and personalized multi-speaker audio generation systems.

## Institutions / 機構

Johns Hopkins University, University of Texas at Dallas, Carnegie Mellon University

**Funding / 經費:** National Science Foundation

## Related

- (link related pages by id as the wiki grows)
