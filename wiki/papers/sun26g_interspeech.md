---
id: sun26g_interspeech
category: deepfake-security
labels: [low-resource, self-supervised]
institutions: ["Hefei iFly Digital Technology Co. Ltd", "University of Science and Technology of China", "Xinjiang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1847
pdf: https://www.isca-archive.org/interspeech_2026/sun26g_interspeech.pdf
---

# ADD-DINO: A Two-Stage Self-Distillation Framework for Audio Deepfake Detection

*Zhaorui Sun, Yihao Chen, Qiao Chen, Minqiang Xu, Sian Fang, Lin Liu, Jianbo Zhan, Yan Song, Guoping Hu, Lirong Dai*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1847)

**Category:** `deepfake-security` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — ADD-DINO is a two-stage self-distillation framework for audio deepfake detection that uses non-contrastive pretraining on unlabeled speech followed by lightweight fine-tuning, achieving near fully supervised performance with only 20% of labeled data and substantial cross-domain gains.

## Key contributions

- Proposes a non-contrastive self-distillation teacher-student architecture that aligns global (long segment) and local (noise-augmented short segment) views to capture robust forgery traces.
- Combines XLS-R feature extraction with AASIST-based heterogeneous spectral and temporal graph attention modules (HS-GAL and Max Graph Operations).
- Demonstrates that pretraining on 1 million unlabeled audio samples enables the model to match fully supervised baseline performance using merely 20% of labeled fine-tuning data.
- Achieves strong cross-domain and unseen synthesis generalization, yielding a 19.99% relative EER reduction across cross-domain benchmarks and a 22.7% accuracy improvement on recent generators (e.g., CosyVoice, F5-TTS).

## Problem

Modern audio deepfake detectors that couple self-supervised front-ends (like XLS-R) with classifiers heavily rely on large quantities of expensive, domain-specific labeled data. When deployed in the real world, these models frequently overfit to known training distributions and fail when confronted with unseen speech synthesis architectures, voice conversion models, or acoustic domain shifts. While data augmentations help marginally, the fundamental scarcity of high-quality forged audio labels and poor cross-domain robustness remain critical bottlenecks for scalable deployment.

## Method

The framework operates in two distinct stages. In Stage 1, a 0.3B-parameter XLS-R backbone combined with an AASIST heterogeneous graph module extracts features. Raw audio waveforms are randomly cropped into global long segments (64,600 samples) fed to the teacher network and local short segments (32,300 samples) with added noise fed to the student network. The student is updated via backpropagation using the DINO cross-entropy self-distillation loss, while the teacher parameters are updated via an exponential moving average (EMA) of the student parameters to enforce global-local semantic consistency. The AASIST component builds parallel spectral and temporal graphs handled by Graph Attention Layers (GAL) and a Max Graph Operation (MGO) to fuse features.

In Stage 2, the projection MLP head from Stage 1 is discarded, and a binary classification head is attached to the pretrained teacher backbone. This architecture is fine-tuned using binary cross-entropy loss on limited labeled data. The training recipe utilizes the Adam optimizer with a learning rate of 1e-6 for the XLS-R backbone and 1e-3 for the classifier, a weight decay of 5e-5, a batch size of 32 for pretraining across 4 NVIDIA RTX 4090 GPUs for 180 epochs, and weighted cross-entropy with speed perturbations (0.9-1.1), MUSAN noise, RIR reverberation, and codec augmentations during fine-tuning.

## Experimental setup

Stage 1 pretraining uses 1,000,000 unlabeled audio samples from public datasets disjoint from evaluation sets. Stage 2 fine-tuning uses the training and development sets of ASVspoof2019 LA (evaluated at 10%, 20%, 50%, and 100% data ratios). Evaluation benchmarks include ASVspoof 2019 LA, 2021 LA, 2021 DF, In-the-Wild, DFADD, FoR, ADD2023 R1/R2, HABLA, and 8 out-of-domain synthesis methods (Udio, AudioBox, CosyVoice, F5-TTS, FireRed-TTS, MaskGCT, Kokoro-TTS, Oute-TTS). Metrics reported are Equal Error Rate (EER, %) and Accuracy (ACC, %).

## Results

When fine-tuned on only 20% of ASVspoof 2019 LA, ADD-DINO (XLS-R) achieves EERs of 0.55%, 1.25%, and 2.95% on 19LA, 21LA, and 21DF respectively, closely approaching the fully supervised 100% baseline (0.23%, 0.84%, and 2.85%). On cross-domain test sets like DFADD and In-the-Wild, ADD-DINO trained on 20% data outperforms the fully supervised baseline trained on 100% data, dropping average cross-domain EER from 15.31% to 12.25% (a 19.99% relative reduction). On unseen modern synthesis engines (averaging across 8 generators including Udio and CosyVoice), ADD-DINO raises average accuracy from 66.5% to 81.6% (a 22.7% relative improvement), with particularly strong gains on Udio (71.00% vs 34.20% baseline) and MaskGCT (81.30% vs 62.10%).

| System | 19LA EER (%) | 21LA EER (%) | 21DF EER (%) | Unseen Gen ACC (%) |
|---|---|---|---|---|
| XLS-R + AASIST (100% data) | 0.23 | 0.84 | 2.85 | 66.5 |
| XLS-R + AASIST (20% data) | 1.19 | 4.03 | 4.55 | - |
| ADD-DINO (XLS-R, 20% data) | 0.55 | 1.25 | 2.95 | 81.6 |
| WavLM-Large + AASIST (20% data) | 1.60 | 8.52 | 9.29 | - |
| ADD-DINO (WavLM-Large, 20% data) | 0.96 | 5.74 | 7.69 | - |

## Limitations

The evaluation is restricted to speech-based deepfakes and relies heavily on pre-extracted feature architectures like XLS-R and AASIST, which inherit the computational footprint of large self-supervised models. While cross-domain generalization is robust, performance still scales with the scale and diversity of the 1-million-sample unlabelled pretraining pool. The paper does not analyze real-time processing latency or on-device mobile constraints.

## Why read this

Speech and ML engineers tackling audio deepfake detection under low-resource or rapidly shifting generator landscapes should read this to see how non-contrastive self-distillation can match fully supervised performance while drastically improving zero-shot cross-domain generalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio deepfake detection, speech security verification, scam prevention in conversational AI, and forensic audio analysis.

## Institutions / 機構

Hefei iFly Digital Technology Co. Ltd, University of Science and Technology of China, Xinjiang University

## Related

- [Interpretable Frequency-Band Attention with Gated SSL Fusion for Audio Deepfake Detection](alhammad26_interspeech.md) — same problem · relatedness 2.8/3
- [Mixture of Spectral Experts for Audio Deepfake Detection](qiu26_interspeech.md) — same problem · relatedness 2.8/3
- [Diffusion Reconstruction towards Generalizable Audio Deepfake Detection](cheng26_interspeech.md) — same problem · relatedness 2.8/3
- [Quantizer-Aware Hierarchical Neural Codec Modeling for Speech Deepfake Detection](wu26n_interspeech.md) — same problem · relatedness 2.7/3
- [Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection](qin26b_interspeech.md) — same problem · relatedness 2.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
