---
id: kim26i_interspeech
category: speaker
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1146
pdf: https://www.isca-archive.org/interspeech_2026/kim26i_interspeech.pdf
---

# Revisiting Label-Free Speaker Embedding Enhancement with vMF Profile Likelihood

*Seunghwan Kim, Jinyong Kim, Sooyoung Yang, Youngjin Ko, Myungjoo Kang*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1146)

**Category:** `speaker` · **Labels:** `robustness-noise`

**TL;DR** — This paper presents a label-free speaker embedding enhancement method using a von Mises-Fisher profile likelihood (vMF-PL) objective on the unit hypersphere, yielding robust mismatch improvements without modifying frozen backbones. It achieves consistent Equal Error Rate reductions across challenging benchmarks like CN-Celeb and VOiCES while maintaining training stability under broad single-view recipes.

## Key contributions

- Revisits label-free speaker embedding enhancement with a simple direct matching formulation on normalized embeddings.
- Derives a von Mises-Fisher (vMF) profile likelihood objective that yields a closed-form loss with adaptive sample-wise reweighting based on residual magnitude.
- Demonstrates that the proposed objective effectively down-weights high-residual outlier pairs, mitigating the impact of heterogeneous real-world acoustic corruptions.
- Shows superior training stability compared to recent diffusion-based post-processors under unified, broad single-view training data recipes.

## Problem

Acoustic mismatches such as background noise, reverberation, and channel effects severely degrade speaker verification performance when test conditions diverge from training data. While full-network retraining or heavy domain adaptation can mitigate this, they are computationally expensive and impractical for changing deployment environments. Prior lightweight post-processing approaches either require explicit speaker/session supervision labels or rely on complex, structured generative diffusion formulations (like SEED) that can be unstable or highly sensitive to training data recipes and batch construction.

## Method

The method operates on $L_2$-normalized speaker embeddings produced by frozen pre-trained backbones (ECAPA-TDNN with dimension $p=512$ and ResNet-34 with $p=256$). The goal is to learn a deterministic mapping $f_theta: \mathbb{S}^{p-1} \to \mathbb{S}^{p-1}$ using a lightweight residual Multi-Layer Perceptron (3 blocks of hidden width $2p$, LayerNorm, SiLU activations, and output $L_2$ normalization). During training, clean target embeddings $x_c$ and degraded variant embeddings $x_n$ are paired, framing enhancement as direct matching on the unit hypersphere.

To handle heterogeneous noise severity, the conditional distribution of the clean target is modeled using a von Mises-Fisher (vMF) density. By profiling out the sample-wise concentration parameter $\kappa_i$, the negative log-likelihood simplifies to an objective proportional to $\log(1 - s_i)$, where $s_i$ is the cosine similarity between the prediction and the target. Expressed using squared residual norms for unit vectors ($\|x_c - \hat{x}_c\|_2^2 = 2(1 - s_i)$), the final profile likelihood loss minimizes $\log(\|x_c - \hat{x}_c\|_2^2 + \epsilon)$ with a numerical stability term $\epsilon = 10^{-6}$.

This objective imparts an adaptive weighting behavior: its gradient with respect to the prediction scales inversely with the squared residual norm. Consequently, high-residual pairs (outliers or severe corruptions) are automatically down-weighted, while low-residual pairs retain stronger supervision to preserve clean-condition behavior. Training uses the AdamW optimizer with a learning rate of $5 \times 10^{-4}$ and weight decay of $5 \times 10^{-5}$ on a single NVIDIA RTX A6000 GPU, processing audio sampled at 16 kHz and cropped to 2.015 seconds.

## Experimental setup

Evaluated using frozen ECAPA-TDNN and ResNet-34 backbones across seven datasets: VoxCeleb1 test sets (Vox1-O, Vox1-E, Vox1-H), VoxSRC23, CN-Celeb, VOiCES, and VC-Mix. Training data comprises a heterogeneous single-view pool combining VoxCeleb2 dev set (2360 hours, subsampled 20% per epoch), LibriTTS-R (244 hours), and Libri-Light (577 hours), augmented via overlapping MUSAN noise/music (SNR [-20, 20] dB), simulated RIRs, telephony down-sampling to 8 kHz, $\mu$-law companding, and random volume scaling. Metrics reported are Equal Error Rate (EER %) and minimum Detection Cost Function (minDCF at $P_{target}=0.05$).

## Results

Using ECAPA-TDNN, the proposed vMF-PL method improves or preserves the baseline across datasets, lowering EER on VOiCES from 6.50% to 6.17% (minDCF 0.374), on CN-Celeb from 18.28% to 17.89% (minDCF 0.628), and on VC-Mix from 2.96% to 2.82% (minDCF 0.255). With ResNet-34, EER decreases on CN-Celeb from 14.54% to 13.78% and on VOiCES from 5.62% to 5.30%. In controlled single-view recipe comparisons, diffusion baseline SEED suffers severe degradation (e.g., VoxSRC23 EER increases to 10.65%), whereas vMF-PL remains stable at 5.65%. Ablation of the objective against standard MSE (which corresponds to fixed concentration vMF) demonstrates that profile likelihood weighting improves Vox1-O EER from 1.05% to 0.88% and VoxSRC23 EER from 6.38% to 5.65%.

| System & Backbone | Vox1-O EER | VoxSRC23 EER | VOiCES EER | CN-Celeb EER |
| :--- | :--- | :--- | :--- | :--- |
| ECAPA Baseline | 0.91 | 5.64 | 6.50 | 18.28 |
| ECAPA + SEED | 0.94 | 5.96 | 6.18 | 17.99 |
| ECAPA + vMF-PL (Ours) | 0.88 | 5.65 | 6.17 | 17.89 |
| ResNet-34 Baseline | 0.88 | 5.45 | 5.62 | 14.54 |
| ResNet-34 + SEED | 0.94 | 5.37 | 5.63 | 13.92 |
| ResNet-34 + vMF-PL (Ours) | 0.88 | 5.39 | 5.30 | 13.78 |

## Limitations

The evaluation is restricted to post-processing frozen speaker embeddings and does not test joint fine-tuning of the backbone architecture. The augmentation pipeline relies on simulated environmental and telephony degradations, which may not capture all real-world acoustic failure modes. Furthermore, the approach requires paired clean and degraded utterances during training, limiting its applicability to entirely unsupervised unaligned corpora.

## Why read this

Speech and machine learning researchers working on robust speaker verification or plug-and-play representation enhancement will find this paper a clean, computationally efficient alternative to complex diffusion or adversarial frameworks. It demonstrates that careful probability-informed loss design (vMF profile likelihood) outperforms heavy generative architectures while avoiding training instability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying lightweight, robust post-processing layers on edge devices or telephony servers to clean up speaker verification embeddings under noisy real-world acoustic mismatches without retraining upstream feature extractors.

## Institutions / 機構

Seoul National University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Korea government, National Research Foundation of Korea

## Related

- (link related pages by id as the wiki grows)
