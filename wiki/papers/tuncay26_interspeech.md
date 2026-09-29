---
id: tuncay26_interspeech
category: speech-llm-dialogue
labels: [self-supervised]
institutions: ["IRIT", "Universite de Toulouse", "CNRS", "Toulouse INP"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2488
pdf: https://www.isca-archive.org/interspeech_2026/tuncay26_interspeech.pdf
---

# BEST-RQ-2: Contextualize-Then-Predict, a Two-Step Approach for Self-Supervised Audio Representations

*Ludovic Tuncay, Étienne Labbé, Thomas Pellegrini*

[PDF](https://www.isca-archive.org/interspeech_2026/tuncay26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tuncay26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2488)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`

**TL;DR** — BEST-RQ-2 introduces a two-step contextualize-then-predict self-supervised pretraining approach using a Vision Transformer, combining frozen random-projection targets with a lightweight predictor that is discarded at inference. It achieves an overall X-ARES linear-probing score of 0.49 (up from 0.45 for original BEST-RQ) while keeping inference compute identical.

## Key contributions

- Revisited BEST-RQ with a ViT encoder, showing it redistributes performance across audio domains rather than changing overall transfer quality.
- Introduced a two-step encoder-predictor decomposition (contextualize-then-predict) for discrete-target audio SSL, separating context encoding from masked prediction.
- Demonstrated on X-ARES and XARES-LLM that performance gains originate primarily from the two-step prediction decomposition rather than tokenization changes.
- Maintained identical inference compute to one-stage ViT baselines by discarding the predictor post-pretraining, alongside open-source code and checkpoints.

## Problem

Standard audio self-supervised learning methods like the original BEST-RQ rely on Conformer encoders with dense temporal convolutional layouts that cannot easily drop masked tokens without breaking effective receptive fields. While Vision Transformers naturally support dropping masked tokens, a naive one-stage ViT replacement shifts domain performance without improving aggregate transfer. Developing generic audio representations that transfer effectively across speech, music, and environmental sounds without increasing inference complexity remains an open challenge.

## Method

BEST-RQ-2 takes a 10 s audio clip resampled to 16 kHz mono, converted to a 128-bin log-mel spectrogram ($X \in \mathbb{R}^{128 \times 256}$) using a 128 ms window and 39.0625 ms hop. This spectrogram is partitioned into non-overlapping 16x16 patches ($P=16$), yielding $N=128$ tokens ($F/P \times T/P$). During pretraining, a mask ratio $r \sim \mathcal{U}[0.4, 0.6]$ is sampled to mask $\lfloor rN \rfloor$ patches uniformly without replacement. The context encoder $f_\theta$ is a 12-layer ViT with embedding dimension 768, 12 attention heads, and MLP ratio 4.0, processing only unmasked patch embeddings along with 2D sine-cosine positional embeddings.

A lightweight ViT predictor $g_\phi$ of depth 4 with matching width receives the contextualized unmasked representations alongside learned mask embeddings at masked positions. A linear classifier maps the predictor outputs to softmax logits over $K=8192$ discrete codes. The target generation relies on a frozen random-projection matrix sampled via Xavier/Glorot uniform initialization mapping patches to a fixed codebook $C$ of dimension $d=16$ on the hypersphere, minimizing cross-entropy exclusively over masked positions. The predictor is discarded at inference time, leaving only the encoder.

Pretraining runs for 200k optimization steps using AdamW with a learning rate of $1 \times 10^{-4}$, weight decay 0.05, linear warmup over the first 5% of training, and cosine decay in fp32 on a single NVIDIA H100 GPU.

## Experimental setup

Models are pretrained on an AudioSet split containing roughly 1.9M 10-second clips (~5.3k hours) spanning speech, music, and environmental sounds. Baselines include data2vec, wav2vec 2.0, Whisper, Audio-JEPA, BEST-RQ, and BEST-RQ (ViT), evaluated via the X-ARES (21 datasets, linear probing and kNN) and XARES-LLM (20 datasets across 2 tracks) benchmark suites.

## Results

On X-ARES linear probing, BEST-RQ-2 achieves an overall score of 0.49 and a mean-of-means (MoM) of 0.50, outperforming BEST-RQ (0.45 Overall / 0.43 MoM) and the one-stage ViT baseline BEST-RQ (ViT) (0.43 Overall / 0.44 MoM). The gains are heavily driven by environmental sound (0.41 vs 0.28 for BEST-RQ) and music domains (0.58 vs 0.41), while speech performance decreases (0.51 vs 0.59). In kNN evaluation, BEST-RQ-2 achieves an Overall score of 0.35 and MoM of 0.38, compared to BEST-RQ's 0.26 Overall and 0.25 MoM. On XARES-LLM, BEST-RQ-2 scores 0.38 Overall and 0.41 MoM, beating BEST-RQ's 0.33 Overall and 0.35 MoM, particularly improving environmental (0.33 vs 0.22) and music domains (0.59 vs 0.49).

| Model | Speech | Env. | Music | MoM | Overall |
|---|---|---|---|---|---|
| Whisper | .73 | .29 | .44 | .49 | .53 |
| Audio-JEPA | .43 | .31 | .52 | .42 | .41 |
| BEST-RQ | .59 | .28 | .41 | .43 | .45 |
| BEST-RQ (ViT) | .47 | .33 | .53 | .44 | .43 |
| BEST-RQ-2 | .51 | .41 | .58 | .50 | .49 |

## Limitations

BEST-RQ-2 exhibits a residual performance drop on speech tasks compared to the original strip-tokenized Conformer-based BEST-RQ, highlighting a time-frequency tokenization trade-off. Evaluations are bound to AudioSet pretraining scale (~5.3k hours), and the method is not tested on larger multi-million hour self-supervised pretraining regimes.

## Why read this

Speech and audio ML engineers should read this to understand how factorizing masked audio pretraining into separate contextualization and prediction stages via a ViT architecture improves cross-domain transfer without increasing inference compute.

## Code

- https://github.com/LudovicTuncay/audio-embeddings

## Applications

Universal audio frontend feature extraction for downstream classification, acoustic event detection, music tagging, and large audio language models.

## Institutions / 機構

IRIT, Universite de Toulouse, CNRS, Toulouse INP

**Funding / 經費:** ANR-3IA Artificial and Natural Intelligence Toulouse Institute ANITI

## Related

- (link related pages by id as the wiki grows)
