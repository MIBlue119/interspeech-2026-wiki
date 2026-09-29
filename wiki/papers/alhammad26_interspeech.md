---
id: alhammad26_interspeech
category: deepfake-security
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2250
pdf: https://www.isca-archive.org/interspeech_2026/alhammad26_interspeech.pdf
---

# Interpretable Frequency-Band Attention with Gated SSL Fusion for Audio Deepfake Detection

*Abeer Alhammad, Abdullah Aldahlawi*

[PDF](https://www.isca-archive.org/interspeech_2026/alhammad26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alhammad26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2250)

**Category:** `deepfake-security` · **Labels:** `self-supervised`

**TL;DR** — BandMIL is an audio deepfake detection framework that combines explicit frequency-band analysis with WavLM self-supervised representations using gated fusion and multiple instance learning, achieving 1.28% EER on ASVspoof 2019 LA.

## Key contributions

- A two-branch architecture combining frequency-band decomposition and self-supervised representations that yields interpretable band-attention weights.
- A gated fusion mechanism that adaptively weights band-level and SSL features per input, reducing EER from 1.73% (SSL-only) to 1.28%.
- A multiple instance learning (MIL) framework using Log-Sum-Exp pooling to handle variable-length audio and localize temporal spoofing artifacts without truncation.

## Problem

State-of-the-art countermeasure systems rely on monolithic self-supervised front-ends or raw waveform end-to-end architectures (such as AASIST and RawNet2) that operate as black boxes, providing zero visibility into where spoofing artifacts reside in the frequency spectrum. While prior sub-band techniques attempted frequency decomposition, they either used rigid post-hoc score fusion or lacked a complementary global representation for voice conversion attacks that lack prominent frequency-localized traces. This opacity hinders auditability, trust, and targeted failure analysis in deployment environments.

## Method

The architecture takes variable-length utterances and segments them into overlapping 4-second windows (2-second hop). Each window undergoes two parallel paths: a band branch and an SSL branch. The band branch computes an STFT (1024-point FFT, 160-sample hop, Hann window) mapped to dB scale, splitting the 0–8 kHz range into K=8 overlapping frequency bands with 25% overlap. Each band is represented as a 64x256 grayscale spectrogram image normalized between -80 dB and 0 dB. A shared ResNet-18 processes each band image into a 512-dimensional vector, which is concatenated with 24 handcrafted per-band features (totaling 536 dimensions) and projected to d=256 via LayerNorm, GELU, and linear layers. Learned band attention weights combine these band embeddings to provide frequency-level interpretability.

Simultaneously, the SSL branch feeds the raw waveform into WavLM-Large, fine-tuning the final 12 transformer layers while keeping earlier layers frozen. The frame-level hidden states undergo mean-pooling and are projected to d=256. A learned gated fusion module uses a two-layer MLP with a sigmoid output to produce element-wise weights g in [0,1]^d from the concatenation of both branch vectors, fusing them via element-wise scaling. This allows the model to suppress uninformative branches dynamically.

The fused representation passes through a two-layer MLP classifier with dropout (p=0.4) to output logits. During training, Log-Sum-Exp (LSE) pooling with temperature tau=1.0 aggregates window scores into an utterance-level decision while maintaining gradients across all windows, optimized using a combination of audio-level and auxiliary window-level focal loss (gamma=2.0, lambda=0.2). At inference, top-k mean aggregation (k=5) replaces LSE. Training utilizes AdamW (lr=10^-4, weight decay 10^-3) with cosine annealing warm restarts for 60 epochs under mixed precision and an effective batch size of 8, supported by augmentations such as band dropout (p=0.15), time-frequency masking, additive Gaussian noise (sigma=0.002), and gain perturbation.

## Experimental setup

Evaluated on the ASVspoof 2019 Logical Access (LA) benchmark, containing 6 known attacks in train/dev and 13 unseen attacks (A07-A19) in the evaluation set. Compared against classical baselines (CQCC-GMM, LFCC-GMM) and deep models (RawNet2, RawGAT-ST, AASIST, XLS-R-AASIST). Performance metrics are Equal Error Rate (EER) and minimum tandem detection cost function (min t-DCF). Implementation features mixed precision, AdamW optimizer, and 60 training epochs.

## Results

BandMIL achieves 1.28% EER and 0.0331 min t-DCF on the ASVspoof 2019 LA evaluation set, outperforming the SSL-only ablation (1.73% EER, 0.0458 min t-DCF) and the band-only ablation (9.71% EER, 0.1766 min t-DCF). For specific voice conversion attacks like A17 and A18 where band-only analysis fails severely (41.12% and 22.89% EER), gated fusion successfully suppresses the band branch (mean gate < 0.50) and drops error rates down to 0.21% and 6.13%, outperforming SSL-only.

However, gated fusion underperforms both individual branches on three attacks (A10, A11, A15), highlighting that a global gate cannot universally determine optimal branch trust. Additionally, state-of-the-art monolithic systems like XLS-R-AASIST still achieve lower raw EER (0.22%), meaning BandMIL trades a fraction of raw accuracy for interpretability.

| System | EER (%) | min t-DCF |
|---|---|---|
| LFCC-GMM [1] | 8.09 | 0.2116 |
| RawNet2 [3] | 5.13 | 0.1175 |
| AASIST [2] | 0.83 | 0.0275 |
| XLS-R-AASIST [17] | 0.22 | 0.0063 |
| Band-only (ours) | 9.71 | 0.1766 |
| SSL-only (ours) | 1.73 | 0.0458 |
| Full - BandMIL (ours) | 1.28 | 0.0331 |

## Limitations

Evaluated exclusively on the ASVspoof 2019 LA dataset without testing on modern evaluation sets like ASVspoof 2021, ASVspoof 5, or diverse in-the-wild audio data. The global gated fusion mechanism struggles on a subset of attacks (A10, A11, A15) where fusion underperforms both individual branches, indicating that static or simple gating strategies fail to optimally balance feature streams in every scenario.

## Why read this

Speech researchers and security engineers seeking to audit deepfake detectors will learn how to extract explicit frequency-band attention and fuse it with self-supervised models without sacrificing competitive performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditable anti-spoofing countermeasures for biometric automatic speaker verification systems, telephony fraud detection, and forensic audio analysis.

## Institutions / 機構

Thaka

**Funding / 經費:** Thaka

## Related

- (link related pages by id as the wiki grows)
