---
id: mallik26_interspeech
category: audio-understanding
labels: [self-supervised]
institutions: ["Sony"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-384
pdf: https://www.isca-archive.org/interspeech_2026/mallik26_interspeech.pdf
---

# MAC-VAD: A Modality-Aligned Cross-Attentive Framework for Robust Voice Activity Detection

*Bruhanth Mallik, Chintan Tundia, Kumud Tripathi, Shreyas Nagoor, Pankaj Wasnik*

[PDF](https://www.isca-archive.org/interspeech_2026/mallik26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mallik26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-384)

**Category:** `audio-understanding` · **Labels:** `self-supervised`

**TL;DR** — MAC-VAD is a modality-aligned, cross-attentive audio-visual voice activity detection framework that combines wavelet-based acoustic encoding, EfficientViT visual features, and self-supervised knowledge distillation to achieve 93.52% accuracy and an 86.39% F1-score on a newly adapted multimodal benchmark.

## Key contributions

- Proposes a Dynamic Audio-Visual Cross Attention (DAVCA) module featuring a weighted gating mechanism to prevent modality collapse under noisy or occluded conditions.
- Introduces WavelNet, an audio encoder leveraging learnable wavelet band-pass filters from the Daubechies and Symlet families for robust spectral-temporal feature extraction.
- Adapts the AVA-Speech dataset into a comprehensive multimodal VAD benchmark (MMVAD) containing complex real-world acoustic and visual challenges.
- Integrates a knowledge distillation strategy using a frozen pre-trained Wav2Vec 2.0 teacher network via a regression adapter head to enrich acoustic representations without inflating inference complexity.

## Problem

Traditional voice activity detection (VAD) models rely exclusively on acoustic features, causing reliability to plummet in environments plagued by heavy background noise, reverberation, and overlapping speech. Prior multimodal approaches leverage basic late fusion, autoencoders, or simple cross-attention, but they frequently suffer from modality collapse when one stream becomes degraded or uninformative. This creates a critical bottleneck for downstream speech processing pipelines that demand robust speech/non-speech boundary detection in unconstrained, in-the-wild settings.

## Method

The MAC-VAD architecture consists of modality-specific encoders, a dual cross-attention fusion block with a dynamic gating mechanism, temporal modeling networks, and a teacher-guided distillation head. The audio branch uses WavelNet with learnable scaling factors based on mother wavelets (such as Db2-Db6 or Sym2-Sym6), followed by a Bidirectional LSTM to aggregate time-frequency context. The visual branch employs EfficientViT, pre-trained on CasiaWebface and CelebA to extract 112x112 face/lip crops, combined with a Visual Temporal Network (VTN) consisting of batch normalization, ReLU, depth-wise separable convolutions, and a 1D convolution layer.

To fuse these representations, the Dynamic Audio-Visual Cross Attention (DAVCA) module projects features into a bottleneck space via fully connected layers with GELU activation, calculates symmetric cross-attention matrices, and passes them through a temperature-controlled softmax gating mechanism ($G_a$ and $G_v$). This gating weights the contribution of each modality before applying residual skip connections and concatenation to form a joint embedding $F_{AV}$.

The training objective utilizes a composite loss function combining primary cross-entropy losses for the fused ($L_{AV}$), audio ($L_A$), and visual ($L_V$) outputs, alongside an MSE-based knowledge distillation loss ($L_{distil}$) aligning student features with a frozen Wav2Vec 2.0 teacher (augmented with an adapter network), and an audio-visual synchronization loss ($L_{sync}$) to minimize attention divergence. The total loss is weighted using hyperparameters $\alpha=0.4, \beta=0.4, \gamma=0.4,$ and $\delta=0.2$.

## Experimental setup

Evaluations are performed on the MMVAD dataset, adapted from the AVA-Speech dataset (comprising 15-minute continuous YouTube movie clips across 188 movies, consolidated into Binary Speech vs. Non-Speech classes). Baselines include unimodal configurations (MFCC, SincNet, ResNet18, EfficientViT), standard fusion methods (concatenation, element-wise addition, compact bilinear pooling, standard cross-attention), and representative active speaker/speech activity models (TS-TalkNet, ACLNet, LightASD, Pyannote). The model contains 21.4M parameters, optimized using AdamW with an initial learning rate of $10^{-4}$ in PyTorch, achieving a GPU latency of 21.9 ms (45.7 FPS) and CPU latency of 107.4 ms per frame.

## Results

On the MMVAD validation set, the full MAC-VAD model with WavelNet, EfficientViT, and Wav2Vec 2.0 distillation achieves a headline accuracy of 93.52%, an F1-score of 86.39%, precision of 90.28%, recall of 82.82%, and an AUROC of 97.85%. It outperforms the state-of-the-art audio-only Pyannote model (87.66% accuracy, 86.23% F1) and multimodal baselines like LightASD (89.54% accuracy, 83.06% F1) and TS-TalkNet (90.53% accuracy, 80.00% F1).

Ablations on fusion strategies show that DAVCA outperforms standard cross-attention (85.41% F1) and compact bilinear pooling (84.90% F1). Teacher backbone ablations demonstrate that Wav2Vec 2.0 outperforms HuBERT (91.28% accuracy, 82% F1), WavLM (91.44% accuracy, 83% F1), and xLSR (91.11% accuracy, 83% F1). Noise robustness tests using MUSAN noise mixed at 0 dB to 15 dB SNR show that MAC-VAD maintains stable performance, retaining 92.26% accuracy and 83.50% F1 even at 0 dB SNR.

| System / Condition | Acc (%) | F1 (%) | Pre (%) | Rec (%) | AUROC (%) |
|---|---|---|---|---|---|
| Pyannote (Audio-only) | 87.66 | 86.23 | 93.47 | 80.15 | 89.01 |
| TS-TalkNet | 90.53 | 80.00 | 86.00 | 73.00 | 94.70 |
| LightASD | 89.54 | 83.06 | 88.12 | 78.56 | 94.51 |
| MAC-VAD (Cross-Attention) | 93.11 | 85.41 | 91.75 | 79.89 | - |
| MAC-VAD (DAVCA + Distil) | 93.52 | 86.39 | 90.28 | 82.82 | 97.85 |

## Limitations

The evaluation relies on the MMVAD dataset derived from movie clips, which may not fully represent unscripted, highly dynamic real-world environments like multi-party meeting rooms or distant-microphone teleconferencing. The visual branch assumes the speaker's face and lips are consistently visible, meaning performance would degrade under severe occlusion, extreme head rotation, or total darkness. Additionally, the computational footprint of 21.4M parameters and a GPU latency of 21.9 ms per frame poses constraints for ultra-low-power, always-on edge devices without hardware acceleration.

## Why read this

Researchers and engineers tackling robust speech segmentation in noisy, multi-speaker environments should read this paper to see how dynamic gating in cross-attention and self-supervised distillation prevent modality collapse. It provides a concrete blueprint for integrating wavelet-based audio frontends with vision transformers for superior audio-visual alignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust voice activity detection for video conferencing systems, automated meeting transcription pipelines, and voice-activated smart home assistants operating in noisy acoustic environments.

## Institutions / 機構

Sony

## Related

- (link related pages by id as the wiki grows)
