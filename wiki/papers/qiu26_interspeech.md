---
id: qiu26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-661
pdf: https://www.isca-archive.org/interspeech_2026/qiu26_interspeech.pdf
---

# Mixture of Spectral Experts for Audio Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/qiu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/qiu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-661)

**TL;DR** — This paper proposes a mixture of spectral experts (MoSE) framework combined with a frequency audio encoder for audio deepfake detection, achieving a 0.29% equal error rate on ASVspoof 2019 LA.

## Problem

Pre-trained speech self-supervised models excel at high-level contextual representations but frequently overlook low-level physical details like magnitude irregularities and phase distortions. These low-level phase and frequency anomalies are vital for detecting modern, highly natural synthetic audio and vocoder artifacts. Furthermore, full fine-tuning is computationally expensive and can disrupt the acoustic priors learned by pre-trained models.

## Method

The framework integrates a frequency audio encoder (FAE) with a spectral parameter-efficient fine-tuning (PEFT) mechanism called Mixture of Spectral Experts (MoSE) applied to a frozen WavLM-Large backbone. The FAE processes STFT magnitude and sine/cosine phase components through 1D convolutions and depthwise separable convolutions to form a joint magnitude-phase representation fused via cross-attention. MoSE adapts the feed-forward network (FFN) weight matrices by performing full singular value decomposition (SVD), freezing the singular bases (Ul, Vl), and applying expert-specific low-rank modulation matrices to the SVD middle matrix (Sigma_l). It employs K=4 spectral experts and shares parameter groups across adjacent layers (group size G=2) with a learnable routing temperature.

## Results

Evaluated on ASVspoof 2019 LA, ASVspoof 2021 LA/DF, and In-the-Wild benchmarks using EER and min t-DCF. On ASVspoof 2019 LA, the model achieves 0.29% EER and 0.0081 min t-DCF, outperforming baseline models. For cross-dataset generalization without fine-tuning, it reaches 2.68% EER on ASVspoof 2021 LA, 3.89% EER on ASVspoof 2021 DF, and 9.25% EER on In-the-Wild. Ablations show that removing either the FAE or MoSE increases the 2019 LA EER from 0.29% to 0.51% and 0.45% respectively, while a fully vanilla WavLM base model yields 1.46% EER.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and security engineers building robust audio deepfake detectors, voice-spoofing countermeasures, and forensic audio verification systems resilient to channel variations and compression.

## Related

- (link related pages by id as the wiki grows)
