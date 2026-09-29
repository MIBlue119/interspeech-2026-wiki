---
id: tu26_interspeech
category: deepfake-security
institutions: ["Hong Kong Polytechnic University", "University of Science and Technology of China", "iFLYTEK"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2200
pdf: https://www.isca-archive.org/interspeech_2026/tu26_interspeech.pdf
---

# Duration-aware self-attention for speech deepfake detection

*Youzhi Tu, Xin Fang, Liping Chen, Zhen-Hua Ling, Kong Aik Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/tu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2200)

**Category:** `deepfake-security`

**TL;DR** — The paper introduces duration-aware self-attention (DASA), which incorporates audio duration and segment offset timing embeddings into self-attention to mitigate performance degradation caused by training-evaluation duration mismatches in speech deepfake detection. Using the relative positional encoding (RPE) variant with a ConFusionformer backend, DASA improves generalization across variable-length audio and achieves superior EER on ASVspoof21-DF, In-the-Wild, and CodecFake benchmarks.

## Key contributions

- Proposes injecting timing embeddings, derived via Fourier feature mapping from audio duration and segment offsets, into self-attention to provide models with a global temporal context.
- Introduces three specific DASA implementations: frame-independent, frame-dependent, and relative positional encoding (RPE) dependent.
- Demonstrates that RPE-dependent DASA effectively regularizes attention bias correction without introducing unconstrained noise.
- Achieves improved robustness against duration mismatch between training (fixed ~4s segments) and evaluation (variable or full-length utterances).

## Problem

Current speech deepfake detectors predominantly rely on fixed-length training and evaluation pipelines, utilizing padding for short utterances and truncation for long ones. Padding introduces abrupt boundary artifacts that confuse models, while truncation discards critical regions containing deepfake evidence. Consequently, models struggle when deployed in real-world settings with inherently variable utterance lengths.

## Method

The front-end feature extractor uses a pre-trained wav2vec 2.0 XLS-R (300M) model, whose representations are fed into a 9-layer ConFusionformer or 6-layer Conformer backbone with 4 attention heads and a base channel dimension of 160. Timing embeddings are formulated by computing learnable Fourier feature mappings (frequency vector dimension $d_F = 32$, max time $t_{max} = 15$s) of the audio duration ($t_d$) and segment offset ($t_o$), concatenated into a unified timing embedding vector $\mathbf{t}$.

The paper proposes three DASA strategies to inject $\mathbf{t}$ into the self-attention mechanism by modifying the attention bias map $\mathbf{B}_h$. Frame-independent DASA learns a per-head bias directly from $\mathbf{t}$ via an MLP. Frame-dependent DASA allows $\mathbf{t}$ to interact with query features frame-wise. RPE-dependent DASA integrates $\mathbf{t}$ by concatenating it into the relative positional encoding matrix (with maximum relative distance $R=63$), which restricts bias corrections locally and avoids over-correcting the attention score map.

During training, input audios are padded or clipped to ~4-second segments with RawBoost data augmentation applied (using convolutional and additive noise for ASVspoof21-LA, and signal-independent noise for ASVspoof21-DF, In-the-Wild, and CodecFake). During inference, the offset is set to 0 and full-length utterances are processed. Optimization uses the Adam optimizer with weight decay 5e-5, learning rate 1e-6, batch size 16 per GPU across 2 RTX 4090 GPUs, and early stopping based on validation EER for up to 60 epochs.

## Experimental setup

The models are trained on the ASVspoof19 logical access (LA) training set and evaluated on ASVspoof21-LA, ASVspoof21-DF, In-the-Wild, and CodecFake datasets. Evaluation metrics are reported as Equal Error Rate (EER, best and average across 3 random runs). Baselines include ConFusionformer-9, Conformer-6, Mamba, TCM, and AASIST.

## Results

On ASVspoof21-DF, the ConFusionformer-9 with RPE-dependent DASA achieved a best EER of 1.53% (average 1.71%), outperforming standard ConFusionformer-9 (1.64% / 1.84%) and Mamba (1.76% / 1.95%). On the In-the-Wild dataset, RPE-dependent DASA attained a best EER of 6.56% (average 6.89%), improving over the vanilla ConFusionformer-9 baseline (6.23% best, but 7.01% average). On CodecFake, ConFusionformer-9 with frame-independent DASA (DASA-1) achieved a best EER of 24.63% (average 26.31%) compared to 25.56% for the baseline.

Ablations on DASA variants showed that frame-independent and frame-dependent DASA frequently degraded performance (e.g., ConFusionformer-9 + DASA-2 rose to 1.70% EER on DF and 7.87% on In-the-Wild) due to unconstrained noise or limited logit correction capability. Duration-mismatch experiments on ASVspoof21-DF demonstrated that while standard SA drops significantly when evaluated at 2s (4.18% EER) or full-length (2.61% EER) compared to a 4s training match (1.84% EER), RPE-dependent DASA maintains robust performance, achieving 1.71% EER on full-length evaluation.

| System | ASVspoof21-LA | ASVspoof21-DF | In-the-Wild | CodecFake |
|---|---|---|---|---|
| ConFusionformer-9 (Base) | 1.10 / 1.27 | 1.64 / 1.84 | **6.23** / 7.01 | 25.56 / 27.63 |
| ConFusionformer-9 + DASA-1 | 1.23 / 1.71 | 1.72 / 2.10 | 7.26 / 7.63 | **24.63** / **26.31** |
| ConFusionformer-9 + DASA-2 | 1.36 / 1.75 | 1.70 / 1.92 | 7.87 / 8.21 | 26.36 / 30.01 |
| ConFusionformer-9 + DASA-3 | **1.01** / **1.13** | **1.53** / **1.71** | 6.56 / **6.89** | 25.36 / 28.32 |
| Mamba [8] (reproduce) | 0.98 / 1.21 | 1.76 / 1.95 | 6.57 / 7.06 | 33.75 / 37.11 |
| AASIST [4] (reproduce) | 1.24 / 1.47 | 2.42 / 2.89 | 9.63 / 10.81 | 33.21 / 41.02 |

## Limitations

The evaluation relies heavily on synthetic or semi-controlled deepfake datasets (ASVspoof, In-the-Wild, CodecFake) which may not exhaustively cover all real-world acoustic conditions or unseen modern neural audio codecs. The method is specifically bounded to self-attention architectures (Conformers/ConFusionformers) using pre-trained wav2vec 2.0 front-ends, and frame-dependent or frame-independent DASA variants show a tendency to introduce noise and degrade performance if unconstrained.

## Why read this

Speech ML researchers and engineers working on audio deepfake detection or variable-length sequence modeling will learn how to design temporal-aware attention biases. It provides a practical blueprint for adapting Transformer and Conformer self-attention mechanisms to handle length generalization without requiring fixed-length padding or truncation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-world speech deepfake detection systems, telecommunication security filters, and audio forensics pipelines handling variable-length intercepted audio streams.

## Institutions / 機構

Hong Kong Polytechnic University, University of Science and Technology of China, iFLYTEK

**Funding / 經費:** Innovation and Technology Fund, National Key R&D Program of China

## Related

- [Dual-Granularity Orthogonal Disentanglement for Generalizable Audio Deepfake Detection](liu26g_interspeech.md) — same problem · relatedness 2.8/3
- [QAMO: Quality-aware Multi-centroid One-class Learning For Speech Deepfake Detection](truong26_interspeech.md) — same problem · relatedness 2.8/3
- [Improving Generalization in Speech Deepfake Detection via Orthogonality-Constrained Common-Specific Feature Decorrelation](kim26l_interspeech.md) — same problem · relatedness 2.8/3
- [Quantizer-Aware Hierarchical Neural Codec Modeling for Speech Deepfake Detection](wu26n_interspeech.md) — same problem · relatedness 2.7/3
- [Mixture of Spectral Experts for Audio Deepfake Detection](qiu26_interspeech.md) — same problem · relatedness 2.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
