---
id: mallik26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-384
pdf: https://www.isca-archive.org/interspeech_2026/mallik26_interspeech.pdf
---

# MAC-VAD: A Modality-Aligned Cross-Attentive Framework for Robust Voice Activity Detection

[PDF](https://www.isca-archive.org/interspeech_2026/mallik26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mallik26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-384)

**TL;DR** — MAC-VAD is an audio-visual voice activity detection framework leveraging modality-aligned cross-attention and self-supervised knowledge distillation, achieving 93.52% accuracy and an 86.39% F1-score on the MMVAD dataset.

## Problem

Conventional voice activity detection models heavily rely on acoustic features, making them vulnerable to background noise, reverberation, and overlapping speech. Multimodal approaches offer a solution by combining audio with visual cues like lip movements, but effectively fusing these disparate modalities without suffering from modality collapse remains a significant challenge. This work addresses the gap by proposing a robust architecture that leverages both facial dynamics and spectral audio representations guided by self-supervised learning.

## Method

The framework utilizes a wavelet-based SincNet audio encoder (WavelNet) and an EfficientViT-based vision encoder pretrained on face datasets, followed by dedicated temporal modeling networks (Bi-LSTM and VTN). These unimodal representations are fused using a Dynamic Audio-Visual Cross Attention (DAVCA) module equipped with temperature-scaled gating weights to prevent modality collapse. Additionally, a frozen Wav2Vec 2.0 teacher network distills semantic knowledge into the student's audio branch via MSE loss, alongside an auxiliary synchronization loss. The overall architecture contains 21.4 million parameters and is trained using an AdamW optimizer with a composite loss function.

## Results

Evaluated on the MMVAD benchmark (derived from AVA-Speech), the complete MAC-VAD model achieves 93.52% accuracy, 86.39% F1-score, and a 97.85% AUROC, outperforming strong baselines like Pyannote, TS-TalkNet, ACLNet, and LightASD. Unimodal ablations show that EfficientViT alone achieves 89.87% accuracy while WavelNet achieves 78.89%, proving the strong contribution of visual cues. Comparisons of fusion strategies demonstrate that the proposed DAVCA module outperforms standard channel-wise concatenation, element-wise addition, bilinear pooling, and standard cross-attention. Teacher model ablations confirm Wav2Vec 2.0 outperforms HuBERT, xLSR, and WavLM as the distillation backbone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building robust speech processing pipelines, automatic meeting transcription systems, or video conferencing tools operating in noisy, reverberant environments.

## Related

- (link related pages by id as the wiki grows)
