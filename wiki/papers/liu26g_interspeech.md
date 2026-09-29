---
id: liu26g_interspeech
category: deepfake-security
institutions: ["Beijing Jiaotong University", "Shanghai Jiao Tong University", "ITMO University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-836
pdf: https://www.isca-archive.org/interspeech_2026/liu26g_interspeech.pdf
---

# Dual-Granularity Orthogonal Disentanglement for Generalizable Audio Deepfake Detection

*Zhuodong Liu, Hugen Lv, Xiangyu Li, Chunhong Yuan*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-836)

**Category:** `deepfake-security`

**TL;DR** — A lightweight dual-granularity orthogonal disentanglement framework (2.1M parameters) is proposed to prevent implicit identity leakage in audio deepfake detection by enforcing sample-level cosine orthogonality and batch-level cross-covariance regularization under a curriculum schedule, achieving 7.88% EER on ASVspoof 2021 DF and 21.58% on In-the-Wild datasets.

## Key contributions

- Introduces a multi-level geometric enforcement strategy combining sample-level cosine orthogonality and batch-level cross-covariance regularization to decouple speaker identity from synthesis artifacts.
- Proposes a curriculum disentanglement schedule with a cosine warm-up that progressively increases constraint strength, avoiding premature representation collapse.
- Achieves competitive cross-dataset generalization (21.58% EER on In-the-Wild) and in-domain performance (1.35% EER on ASVspoof 2019 LA) using only 2.1M parameters and 0.89 GFLOPs.
- Demonstrates that explicit geometric disentanglement can match massive self-supervised models (>300M parameters) on cross-dataset evaluation while outperforming gradient reversal adversarial training by 2.60% absolute.

## Problem

Audio deepfake detectors often fail to generalize across unseen speakers because they memorize speaker-specific characteristics rather than learning transferable synthesis artifacts, a phenomenon known as implicit identity leakage. Prior approaches like gradient reversal adversarial training suffer from minimax optimization instability, while alternative methods require complex multi-encoder architectures, auxiliary reconstruction networks, or mutual information estimators. This generalization failure becomes severe when models encounter real-world distributions with heavy statistical mismatches, such as crowdsourced or in-the-wild recordings.

## Method

The architecture comprises a shallow shared encoder (3 convolutional blocks downsampling by 8x), followed by two separate branches: a content branch using 2 convolutional blocks and 8-head multi-head self-attention (MHSA) yielding a 256-dimensional embedding z_c, and an identity branch using mean statistics pooling yielding a 256-dimensional embedding z_s.

The training objective jointly optimizes naturalness via binary cross-entropy on z_c, identity classification via AAM-Softmax on z_s (computed exclusively on bonafide samples with margin m=0.2, scale s=30), and a combined dual-granularity disentanglement penalty. The disentanglement loss consists of sample-level absolute cosine similarity to eliminate directional correlations, and batch-level squared Frobenius norm of the cross-covariance matrix computed across mean-centered embedding matrices Z_c and Z_s within mini-batches to remove inter-dimensional linear correlations.

A curriculum schedule scales the disentanglement weight beta(t) via a cosine warm-up from 0 to beta_max over training epochs, preventing feature collapse while forcing independence. The network is trained using the AdamW optimizer with a learning rate of 10^-4, weight decay of 10^-4, batch size of 32, and hyperparameters alpha=0.1, beta_max=0.5, and gamma=1.0 for 50 epochs.

## Experimental setup

Models are evaluated on ASVspoof 2019 LA, ASVspoof 2021 DF (training set: 22,617 bonafide and 22,296 spoofed utterances from 107 speakers), and the In-the-Wild dataset (31,779 real-world deepfakes). Audio inputs are 16 kHz resampled waveforms transformed into 80-dimensional log-mel spectrograms using 512-point FFT and a 10ms frame shift. Comparisons include traditional classifiers (LFCC-GMM, LFCC-LCNN), end-to-end architectures (RawNet2, AASIST), self-supervised models (Wav2Vec2-AASIST, WavLM-MLP), and disentanglement baselines like GRL and DG-Agg, evaluated primarily using Equal Error Rate (EER) and tandem Detection Cost Function (t-DCF).

## Results

On ASVspoof 2019 LA, the proposed model achieves an EER of 1.35% and t-DCF of 0.0208, outperforming GRL baseline (5.30%) and DG-Agg (1.87%). On ASVspoof 2021 DF, it achieves 7.88% EER and 0.2689 t-DCF, competitive with WavLM-MLP (7.95% EER) which has over 150 times more parameters. When transferring directly to the In-the-Wild dataset without fine-tuning, the proposed full model reaches 21.58% EER, outperforming the GRL baseline by 2.60% absolute (24.18%) and beating AASIST (27.41%) and Res-TSSDNet (26.14%). Ablation studies confirm that removing either the identity branch or AAM-Softmax causes severe performance drops (+4.30% and +4.04% EER degradation), and combining both cosine orthogonality and cross-covariance regularization outperforms either constraint applied in isolation.

| System | ASV19-LA EER (%) | ASV21-DF EER (%) | In-the-Wild EER (%) |
|---|---|---|---|
| AASIST | 0.83 | 12.83 | 27.41 |
| WavLM-MLP | 0.43 | 7.95 | 21.85 |
| GRL Baseline | 5.30 | 8.91 | 24.18 |
| DG-Agg | 1.87 | 8.26 | 22.73 |
| Cosine Only | 1.50 | 8.23 | 22.16 |
| Full Model (Proposed) | 1.35 | 7.88 | 21.58 |

## Limitations

The evaluation relies heavily on benchmark datasets (ASVspoof and In-the-Wild) that may not fully represent emerging generative zero-day codecs or novel vocoding pipelines. The framework assumes clear separation between bonafide identity labels during training, limiting its effectiveness in heavily noisy or multi-speaker overlapping acoustic environments. Furthermore, while parameter count is exceptionally low, hyperparameter choices like beta_max still require tuning to balance artifact preservation against identity erasure.

## Why read this

Speech and ML engineers looking for an efficient, non-adversarial alternative to massive self-supervised models or complex adversarial setups will find this paper a clear blueprint for geometric feature disentanglement. Researchers will take away actionable recipes for combining sample-level and batch-level constraints with curriculum scheduling to solve cross-dataset generalization bottlenecks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice biometric security, anti-spoofing verification for conversational AI systems, and automated detection of audio deepfakes in telephony and social media.

## Institutions / 機構

Beijing Jiaotong University, Shanghai Jiao Tong University, ITMO University

## Related

- [Improving Generalization in Speech Deepfake Detection via Orthogonality-Constrained Common-Specific Feature Decorrelation](kim26l_interspeech.md) — same problem · relatedness 3.0/3
- [Diffusion Reconstruction towards Generalizable Audio Deepfake Detection](cheng26_interspeech.md) — same problem · relatedness 3.0/3
- [QAMO: Quality-aware Multi-centroid One-class Learning For Speech Deepfake Detection](truong26_interspeech.md) — same problem · relatedness 2.8/3
- [Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection](qin26b_interspeech.md) — same problem · relatedness 2.8/3
- [Duration-aware self-attention for speech deepfake detection](tu26_interspeech.md) — same problem · relatedness 2.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
