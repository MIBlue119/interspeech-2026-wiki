---
id: zou26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1552
pdf: https://www.isca-archive.org/interspeech_2026/zou26_interspeech.pdf
---

# Less is More: Boosting Bimodal Music Emotion Recognition with Adaptive Audio Sequence Compression

[PDF](https://www.isca-archive.org/interspeech_2026/zou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1552)

**TL;DR** — The paper introduces PoolingVQ, a VQ-VAE-guided dynamic audio sequence compression technique that reduces audio temporal redundancy to improve bimodal music emotion recognition, achieving state-of-the-art macro-F1 on EMOPIA (0.8955) and VGMIDI (0.6018).

## Problem

Fusing audio and symbolic MIDI modalities provides complementary affective cues for music emotion classification, but audio features suffer from severe temporal redundancy compared to compact MIDI representations. This information density imbalance leads to feature dilution and hampers fusion efficiency. Standard global pooling methods indiscriminately aggregate temporal signals and discard emotional dynamics, while large low-frame-rate tokenizers require prohibitive retraining costs.

## Method

The framework utilizes frozen pre-trained backbones (MERT-95M for audio, MIDI-BERT for MIDI) to extract features from fixed-duration clips (60s for EMOPIA, 130s for VGMIDI). An initialization phase uses K-means clustering on MERT features to build a VQ-VAE codebook. During training, a sliding window of 5 frames (stride 3, compressing the ~75 Hz audio sequence down to ~25 Hz) counts unique codebook indices to measure local temporal variation intensity; low-diversity segments use average pooling while high-diversity segments use max pooling. The compressed audio and MIDI features are then combined using either simple concatenation or a two-stage cross-attention mechanism (Audio-to-MIDI followed by MIDI-to-fused features) and optimized via cross-entropy and VQ-VAE commitment losses.

## Results

Evaluated on the EMOPIA and VGMIDI datasets using accuracy and macro-F1 score against baselines including Short-chunk CNN, LSTM-Ann, MT-MIDIGPT, MT-MIDIBERT, SCMA, BFAM, and MoFi. The proposed cross-attention model with PoolingVQ achieves a macro-F1 of 0.8955 on EMOPIA and 0.6018 on VGMIDI, outperforming previous state-of-the-art methods like BFAM by 12.5% on EMOPIA and 5.48% on VGMIDI. Ablations demonstrate the superiority of adaptive PoolingVQ over global average and max pooling baselines, and analyze the impact of different codebook sizes.

## Code

- https://anonymous.4open.science/r/poolingvq

## Applications

Speech and audio engineers building music emotion recognition systems, multimodal affective computing applications, or intelligent music retrieval engines.

## Limitations

The pooling decision strategy is currently rule-based rather than learnable.

## Related

- (link related pages by id as the wiki grows)
