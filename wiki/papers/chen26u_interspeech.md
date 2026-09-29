---
id: chen26u_interspeech
category: deepfake-security
institutions: ["National Taiwan University", "CyCraft", "RIKEN", "MoonShine Animation Studio"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1979
pdf: https://www.isca-archive.org/interspeech_2026/chen26u_interspeech.pdf
---

# Latent-Mark: An Audio Watermark Robust to Neural Codec Compression

*Yen-Shan Chen, Shih-Yu Lai, Ying-Jung Tsou, Yi-Cheng Lin, Bing-Yu Chen, Yun-Nung Chen, Hung-yi Lee, Shang-Tse Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1979)

**Category:** `deepfake-security`

**TL;DR** — Latent-Mark is the first zero-bit audio watermarking framework designed to survive neural codec compression by optimizing audio waveforms to induce a detectable, manifold-aligned directional shift in the codec's latent space, achieving over 58-93% survivability where prior methods drop to near-zero.

## Key contributions

- Identifies neural codec compression as a manifold projector attack that destroys off-manifold, traditional waveform-level noise watermarks.
- Proposes Latent-Mark, a gradient-based waveform optimization framework that induces a structured latent directional shift to survive quantization bottlenecks.
- Introduces Cross-Codec Optimization using surrogate codec committees (SNAC, DAC, EnCodec) to enable zero-shot transferability to unseen black-box neural codecs.
- Employs a median-based ensemble detection score (Delta-score) using normalized margins to maintain stability against outlier distortions.

## Problem

Traditional audio watermarking techniques like AudioSeal, WavMark, and Timbre excel against standard digital signal processing (DSP) distortions but fail catastrophically under neural codec compression (e.g., EnCodec, SNAC, DAC). Modern neural codecs use residual vector quantization (RVQ) inside an encoder-decoder bottleneck that treats imperceptible waveform noise as off-manifold residual and strips it away. Because neural codecs are becoming the standard infrastructure for audio distribution and generative speech models, this vulnerability exposes a critical security gap for intellectual property protection and deepfake detection.

## Method

Latent-Mark formulates zero-bit watermarking as a constrained optimization problem on the input waveform $s \in \mathbb{R}^T$ to produce watermarked audio $s_{wm} = s + \delta$. The encoder $E_{wm}$ optimizes perturbation $\delta$ via the Adam optimizer for 150 steps to minimize a hinge loss objective, forcing the sequence mean latent representation to shift toward a secret manifold axis $v_c \in \mathbb{R}^d$ with a safety margin $\gamma_c = 1.5$. Perceptibility is enforced by a dynamic RMS-based threshold $\epsilon = \beta \cdot \text{RMS}(s) \cdot 10^{-\text{SDR}/20}$ with $\beta = 2.5$. The secret axis $v_c$ is derived via $k$-means clustering ($k=2$) of the codebook weights $W$ into centroids $\mu_A$ and $\mu_B$, defining $v_c = (\mu_B - \mu_A)/\|\mu_B - \mu_A\|_2$. For cross-codec optimization, a multi-rate resampling loop synchronizes a workspace at 44.1 kHz, normalizing gradients using clean audio baseline calibration $\alpha_c$ across surrogate committee members (e.g., SNAC, DAC, EnCodec). Detection computes a normalized margin $m_c = (\bar{p}_c(s') - \tau_c)/\sigma_c$, aggregating views via the median statistic to prevent outlier degradation.

During inference, suspect audio undergoes latent extraction through the codec encoder, and the sequence-level projection score is evaluated against the statistically derived threshold $\tau_c = \mu_c + k\sigma_c$ ($k=1.5$).

## Experimental setup

Evaluated on 9 datasets across 3 domains (Ambient/Environmental: AIR, Clotho; Speech: LibriSpeech, DAPS; Music/Vocals: PCD, jaCappella, MAESTRO, GuitarSet, Freischuetz) by uniformly sampling 120 instances per dataset. Compared against three state-of-the-art baselines: WavMark, SilentCipher, and AudioSeal. Evaluated using Detectability (accuracy, TPR, FPR on clean audio) and Survivability (detection rate post-codec attack), alongside UTMOS and Delta SI-SNR for perceptual quality and fidelity.

## Results

Latent-Mark achieves clean-audio detectability accuracy above 95% across most datasets, matching baselines. Under SNAC (24kHz) neural codec compression, baseline watermarks collapse to near 0% survivability, whereas Latent-Cluster achieves survivability rates consistently between 58% and 93.3% (peaking at 93.3% on DAPS and 86.7% on GuitarSet). In cross-codec transferability tests across unseen architectures like EnCodec48 and DAC24, joint optimization configurations maintain robust 50-70% survivability. Against traditional DSP attacks (Gaussian noise, amplitude scaling, low-pass filtering, resampling), Latent-Mark matches or exceeds dedicated baselines on several datasets while preserving human-perceived quality measured via UTMOS.

| System / Condition | AIR (Surv.) | Clotho (Surv.) | DAPS (Surv.) | LibriSpeech (Surv.) | jaCappella (Surv.) |
|---|---|---|---|---|---|
| WavMark | 0.0% | 0.0% | 0.0% | 4.2% | 0.0% |
| SilentCipher | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |
| AudioSeal | 0.0% | 0.0% | 0.0% | 5.0% | 0.0% |
| Latent-Cluster | 61.7% | 58.3% | 93.3% | 80.8% | 75.8% |
| Latent-Joint | 53.3% | 58.3% | 76.7% | 74.2% | 75.8% |

## Limitations

The framework assumes white-box or gray-box access to surrogate neural codecs for gradient-based optimization during watermarking. Joint cross-codec optimization yields a minor trade-off in single-codec peak survivability compared to specialized single-codec configurations. Evaluation is restricted to specific sampling rates and pre-trained codec families, and environmental noise sets (like AIR) show lower retention than speech domains.

## Why read this

Researchers and engineers building audio watermarking, ownership verification, or deepfake tracking pipelines against modern generative models must read this paper to understand how neural codecs act as manifold projectors that destroy traditional waveform watermarks, and how latent space shifting solves this.

## Code

- https://github.com/yenshan0530/Latent-Mark

## Applications

Intellectual property protection for AI-generated audio assets, deepfake audio detection, and provenance tracking across neural codec communication and distribution pipelines.

## Institutions / 機構

National Taiwan University, CyCraft, RIKEN, MoonShine Animation Studio

**Funding / 經費:** National Science and Technology Council

## Related

- (link related pages by id as the wiki grows)
