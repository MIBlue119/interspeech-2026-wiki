---
id: zou26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1552
pdf: https://www.isca-archive.org/interspeech_2026/zou26_interspeech.pdf
---

# Less is More: Boosting Bimodal Music Emotion Recognition with Adaptive Audio Sequence Compression

*Dinghao Zou*

[PDF](https://www.isca-archive.org/interspeech_2026/zou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1552)

**TL;DR** — PoolingVQ uses a VQ-VAE codebook and variance-aware adaptive pooling to compress redundant audio feature sequences (~75 Hz to ~25 Hz), resolving the information density imbalance in bimodal music emotion recognition and achieving new state-of-the-art macro-F1 on EMOPIA (0.8955) and VGMIDI (0.6018).

## Key contributions

- Proposed PoolingVQ, an adaptive audio sequence compression method that uses a VQ-VAE codebook and sliding window uniqueness counting to dynamically select between max pooling (for high-variance transients) and average pooling (for stationary regions).
- Demonstrated that mitigating audio temporal redundancy significantly boosts bimodal fusion performance for music emotion classification across both simple concatenation and cross-attention architectures.
- Achieved state-of-the-art macro-F1 scores of 0.8955 on EMOPIA and 0.6018 on VGMIDI, outperforming prior multimodal baselines like BFAM by 12.5% and 5.48% respectively.
- Released open-source implementation code for the proposed architecture.

## Problem

Music emotion recognition (MER) benefits from fusing perceptual audio cues with structural symbolic MIDI features, but audio representations suffer from severe temporal redundancy (millions of samples yielding overly long token sequences) compared to compact MIDI compound-word tokens. This creates an information density imbalance that causes feature dilution and hampers bimodal fusion efficiency. Conventional remedies like global average or max pooling indiscriminately destroy critical temporal variations, while training a low-frame-rate tokenizer from scratch demands prohibitive computational resources.

## Method

The framework consists of a frozen feature extraction stage, an audio compression module (PoolingVQ), and a bimodal fusion stage. Audio is processed by MERT-95M (resampled to 24 kHz, ~75 Hz frame rate with a 13.5 ms hop size), while MIDI features are extracted via pretrained MIDI-BERT. Maximum audio durations are set to 60s for EMOPIA and 130s for VGMIDI.

The PoolingVQ module first initializes a VQ-VAE codebook of size P via K-means clustering on cached MERT features. During training, a sliding pooling window of size w = 5 frames (~67.5 ms, covering note attack phases) with a stride of 3 downsamples the sequence to ~25 Hz. The number of unique codebook indices U(w) within each window quantifies local temporal variance. Windows with low U(w) trigger Average Pooling, while high U(w) trigger Max Pooling to preserve salient transients. Codebook centroids are fine-tuned using a commitment loss with a stop-gradient operator.

The compressed audio features and upsampled MIDI features are fused using either a simple temporal alignment concatenation or a two-stage cross-attention mechanism (Audio→MIDI cross-attention followed by MIDI→Fused Feature cross-attention). Optimization uses the Adam optimizer with grouped hyperparameters: non-codebook layers use learning rate 1e-4 and weight decay 5e-5, while codebook parameters use learning rate 5e-5 and weight decay 1e-5.

## Experimental setup

Evaluated on EMOPIA (piano-only, ~13 hours, 1,087 clips) and VGMIDI (multitrack video-game music, ~5 hours across 200 labeled pieces), mapped to Russell's four-quadrant (4Q) valence-arousal emotion categories using official train/validation/test splits (70/20/10 for EMOPIA, 60/20/20 for VGMIDI). Compared against single-modal neural networks (Short-chunk CNN, LSTM-Ann, MT-MIDIGPT, MT-MIDIBERT, SCMA, MERT/MIDIBERT branches) and multimodal baselines (BFAM, MoFi). Metrics include Accuracy and Macro-F1 score.

## Results

When paired with cross-attention fusion, PoolingVQ achieves state-of-the-art performance, recording a macro-F1 of 0.8955 (0.8953 accuracy) on EMOPIA—surpassing the strongest multimodal baseline BFAM by 12.5%—and 0.6018 macro-F1 (0.600 accuracy) on VGMIDI, outperforming BFAM by 5.48%. Ablations confirm that the variance-aware PoolingVQ outperforms both global average and global max pooling baselines. Furthermore, simple concatenation with PoolingVQ struggles on the complex VGMIDI dataset (0.4522 macro-F1), highlighting that cross-attention is necessary to recover fine-grained details lost during aggressive compression on multi-instrument data.

| System | EMOPIA Acc | EMOPIA F1 | VGMIDI Acc | VGMIDI F1 |
|---|---|---|---|---|
| Short-chunk CNN (2021) [22] | 0.670 | 0.634 | 0.247 | 0.219 |
| SCMA (2024) [10] | 0.714 | 0.712 | 0.316 | 0.224 |
| BFAM (2024) [10] | 0.822 | 0.770 | 0.625 | 0.547 |
| Simple Concat (Ours) | 0.8837 | 0.8844 | 0.450 | 0.4522 |
| Cross-Attention (Ours) | 0.8953 | 0.8955 | 0.600 | 0.6018 |

## Limitations

The pooling decision strategy is currently rule-based rather than learnable, potentially suboptimal for diverse acoustic environments. The evaluation is restricted to clean piano (EMOPIA) and limited multitrack video-game music (VGMIDI), limiting verification on noisy or polyphonic real-world commercial tracks. The reliance on frozen large pre-trained backbones (MERT-95M and MIDI-BERT) binds the pipeline's ceiling to the quality of these upstream feature extractors.

## Why read this

Researchers working on multimodal fusion and sequence compression in speech and audio will find a clean, efficient recipe for bridging temporal density gaps between continuous acoustic embeddings and symbolic tokens without retraining backbone models.

## Code

- https://anonymous.4open.science/r/poolingvq

## Applications

Automated music recommendation, affective music generation, and mood-based playlist curation.

## Related

- (link related pages by id as the wiki grows)
