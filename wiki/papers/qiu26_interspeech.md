---
id: qiu26_interspeech
category: deepfake-security
labels: [self-supervised]
institutions: ["Xinjiang University", "University of Hong Kong"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-661
pdf: https://www.isca-archive.org/interspeech_2026/qiu26_interspeech.pdf
---

# Mixture of Spectral Experts for Audio Deepfake Detection

*Yaxuan Qiu, Zhe Li, Mieradilijiang Maimaiti, Zunwang Ke, Wushour Silamu*

[PDF](https://www.isca-archive.org/interspeech_2026/qiu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/qiu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-661)

**Category:** `deepfake-security` · **Labels:** `self-supervised`

**TL;DR** — This paper proposes an audio deepfake detection framework that combines an explicit magnitude-phase frequency audio encoder with a Mixture of Spectral Experts (MoSE) for SVD-domain parameter-efficient fine-tuning of WavLM, achieving a state-of-the-art 0.29% EER on ASVspoof 2019 LA.

## Key contributions

- A Frequency Audio Encoder (FAE) that explicitly decomposes STFT outputs into magnitude, sine-phase, and cosine-phase components with stochastic phase perturbations to capture low-level physical generation artifacts.
- A Mixture of Spectral Experts (MoSE) parameter-efficient fine-tuning method that adapts pre-trained Transformer FFN weights via expert-specific low-rank updates in the SVD middle matrix while freezing singular bases.
- A shared-layer strategy and input-dependent gating with a learnable temperature parameter to dynamically route and weight spectral expert representations.
- Cross-attention feature fusion that aligns low-level FAE spectral representations with high-level contextual SSL backbone representations.

## Problem

Self-supervised pre-trained models (PTMs) like WavLM and wav2vec 2.0 excel at semantic speech representations but underrepresent low-level physical cues such as magnitude irregularities and phase distortions that expose synthetic audio generation. Prior frequency-incorporation methods often inadequately model phase information (suffering from phase wrapping or omission) or fail to bridge the representation gap between explicit frequency features and high-level PTM embeddings. Furthermore, full fine-tuning is computationally expensive and risks erasing acoustic priors learned during self-supervised pre-training, while conventional LoRA/adapter methods apply additive updates in raw weight space without controlling singular directions.

## Method

The framework utilizes a frozen WavLM-Large backbone paired with a Frequency Audio Encoder (FAE). The FAE computes the Short-Time Fourier Transform (STFT) of 4-second audio inputs using a 25 ms window, 10 ms hop, and 512 FFT bins, yielding magnitude, cosine-phase, and sine-phase features (with elementwise stochastic phase noise added during training). These are concatenated into a joint tensor, projected, and processed by depthwise separable convolutions (DW/PW convs) to produce a compact time-frequency representation.

To adapt the WavLM feed-forward network (FFN) weights without full fine-tuning, the Mixture of Spectral Experts (MoSE) applies singular value decomposition (SVD) to each target weight matrix $W_l = U_l \Sigma_l V_l^T$. The singular bases $U_l$ and $V_l$ are frozen, while the middle matrix $\Sigma_l$ receives expert-specific low-rank modulation via trainable bottleneck matrices $A$ and $B$. A group-sharing strategy couples every $G=2$ adjacent Transformer layers to share the same low-rank expert parameters. An input-dependent gating mechanism—using a sequence-level vector from temporal average pooling and a learnable routing temperature $\tau \approx 0.9831$—dynamically routes and combines $K=4$ spectral experts.

Finally, the layer-aggregated PTM representations ($Z_{final}$) and the FAE representation ($P$) are fused via cross-attention, followed by a weighted cross-entropy classifier ($\lambda_{\text{bonafide}}=0.9$, $\lambda_{\text{spoof}}=0.1$) to handle class imbalance.

## Experimental setup

Models are trained on the ASVspoof 2019 Logical Access (LA) training set and evaluated in-domain on the ASVspoof 2019 LA evaluation set. Zero-shot cross-dataset generalization is assessed on ASVspoof 2021 LA, ASVspoof 2021 Deepfake (DF), and In-the-Wild (ITW) benchmarks using Equal Error Rate (EER) and minimum tandem detection cost function (min t-DCF). Implementation uses a frozen WavLM-Large backbone, AdamW optimizer (learning rate $10^{-4}$, weight decay $10^{-4}$, batch size 32), cosine annealing over 50 epochs, resulting in approximately 4.8M trainable parameters.

## Results

On the ASVspoof 2019 LA evaluation set, the proposed MoSE-WavLM-FAE model achieves an EER of 0.29% and a min t-DCF of 0.0081, outperforming strong baselines like WavLM+MFA (0.42% EER) and XLSR-53+ASP (0.31% EER). In zero-shot cross-dataset evaluations, it records 2.68% EER on ASVspoof 2021 LA and 9.25% EER on In-the-Wild, placing it ahead of comparative methods such as MoLEx (9.60% on ITW) and wav2vec 2.0-MoE-LoRA (3.70% on 21 LA). On ASVspoof 2021 DF, it achieves 3.89% EER, remaining competitive though slightly behind MoLEx (3.32%).

Ablation studies confirm the additive value of both components: removing both MoSE and FAE drops performance to 0.72% EER (1.46% for vanilla WavLM base), removing just FAE yields 0.51% EER, and removing just MoSE yields 0.45% EER. Hyperparameter sweeps show that $K=4$ experts and group size $G=2$ optimize the tradeoff between parameter sharing and adaptation capacity.

| System / Condition | ASVspoof 2019 LA EER (%) | ASVspoof 2019 LA min t-DCF | ASVspoof 2021 LA EER (%) | In-the-Wild EER (%) |
|---|---|---|---|---|
| wav2vec 2.0-MoE [4] | 0.74 | - | - | - |
| WavLM+MFA [3] | 0.42 | 0.0126 | - | - |
| XLSR-53+ASP [30] | 0.31 | - | - | - |
| MoLEx [33] | - | - | 4.31 | 9.60 |
| wav2vec 2.0-MoE-LoRA [32] | - | - | 3.70 | 15.59 |
| **Ours (MoSE-WavLM-FAE)** | **0.29** | **0.0081** | **2.68** | **9.25** |

## Limitations

The evaluation relies heavily on standard benchmark datasets (ASVspoof and In-the-Wild) which may not fully capture emerging generative audio paradigms like multi-speaker conversational models or real-time neural streaming codecs. The framework introduces architectural complexity via explicit SVD factorizations, group-shared expert layers, and cross-attention fusion. Furthermore, performance is only validated on English-centric or standard public spoofing corpora, leaving broader multilingual and cross-lingual robustness largely unexplored.

## Why read this

Speech and ML researchers focusing on deepfake detection or parameter-efficient fine-tuning should read this paper to learn how SVD-domain weight adaptation combined with explicit phase-magnitude frequency encoders can surpass standard LoRA and vanilla SSL representations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated voice biometric security systems, real-time telephony fraud prevention, and social media content moderation pipelines filtering synthetic speech.

## Institutions / 機構

Xinjiang University, University of Hong Kong

**Funding / 經費:** National Natural Science Foundation of China, Xinjiang "Tianchi Talent" Recruitment and Introduction Program

## Related

- [Interpretable Frequency-Band Attention with Gated SSL Fusion for Audio Deepfake Detection](alhammad26_interspeech.md) — same problem · relatedness 3.0/3
- [Quantizer-Aware Hierarchical Neural Codec Modeling for Speech Deepfake Detection](wu26n_interspeech.md) — same problem · relatedness 2.9/3
- [Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection](qin26b_interspeech.md) — same problem · relatedness 2.9/3
- [ADD-DINO: A Two-Stage Self-Distillation Framework for Audio Deepfake Detection](sun26g_interspeech.md) — same problem · relatedness 2.8/3
- [Dual-Granularity Orthogonal Disentanglement for Generalizable Audio Deepfake Detection](liu26g_interspeech.md) — same problem · relatedness 2.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
