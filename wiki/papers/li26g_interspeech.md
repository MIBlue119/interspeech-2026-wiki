---
id: li26g_interspeech
category: deepfake-security
labels: [robustness-noise]
institutions: ["Hong Kong Polytechnic University", "Brno University of Technology", "Shenzhen Zhuiyi Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-582
pdf: https://www.isca-archive.org/interspeech_2026/li26g_interspeech.pdf
---

# Aleatoric Style Uncertainty Augmentation with GMM for Domain Generalization in Anti-spoofing

*Jin Li, Man-Wai Mak, Johan Rohdin, Oldřich Plchot, Kong Aik Lee, Bo Wen, Yunfeng Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/li26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-582)

**Category:** `deepfake-security` · **Labels:** `robustness-noise`

**TL;DR** — Aleatoric Style Uncertainty (ASU) models multi-modal feature styles using an online Gaussian mixture model (GMM) during training, significantly improving domain generalization for speech anti-spoofing and spoofing-aware speaker verification (SASV).

## Key contributions

- Proposes a K-component diagonal-covariance GMM in the style space to capture within-component aleatoric style variability, overcoming the unimodal limits of prior style augmentation methods like DSU and CSU.
- Develops an efficient online Expectation-Maximization (EM)-like update mechanism for mixture weights, means, and diagonal variances to stabilize estimation within mini-batches.
- Combines batch-level dispersion with GMM-based aleatoric uncertainty through a re-parameterization technique, adding no computational cost during inference.
- Achieves state-of-the-art results on ASVspoof 5 Track 1 and Track 2 open conditions, outperforming standard baselines and existing style augmentation techniques.

## Problem

Speech anti-spoofing systems frequently fail when deployed in out-of-domain (OOD) environments due to unseen synthetic attacks, codecs, background noise, and varying channel characteristics. Prior style augmentation techniques like MixStyle, DSU, and CSU rely on a single batch-level Gaussian distribution, assuming unimodal style dispersion. However, multi-domain training batches contain complex multimodal distributions (e.g., diverse TTS and voice conversion algorithms), causing single-component approximations to fail at capturing true intra-class and cross-domain variance.

## Method

The architecture builds upon a WavLM-Base upstream encoder (~94M parameters) followed by a multi-head factorized attentive pooling (MHFA) downstream module. For each training mini-batch, channel-wise means and standard deviations are calculated across the time dimension. The standard deviation vector of each utterance is treated as a random variable modeled by a $K$-component diagonal-covariance Gaussian mixture model (GMM).

An online EM-like algorithm updates the GMM parameters per mini-batch. In the E-step, component log-likelihoods and sample responsibilities are computed, with numerical stability controlled by a small floor epsilon. In the M-step, soft counts update the mixture weights, component means, and diagonal covariance vectors. The total uncertainty combines batch-level variability (via DSU) and aleatoric within-component variability (scaled by a hyperparameter $\lambda$), injected via the re-parameterization trick during training with probability $p=0.5$.

During inference, the ASU module is completely disabled, introducing zero additional parameters or computational overhead. The network is optimized using AAM-softmax loss with a margin of 0.2 and scale of 30, trained over 10 epochs with a starting learning rate of $1 \times 10^{-4}$ decayed by 5% per epoch.

## Experimental setup

Evaluated on ASVspoof 5 Track 1 (speech anti-spoofing) and Track 2 open conditions (spoofing-aware speaker verification with a ResNet221 ASV subsystem). Metrics include equal error rate (EER), minimum detection cost function (minDCF), minimum a-DCF, minimum t-DCF, and t-EER. Training utilized WavLM-Base (94M parameters) augmented with MUSAN noise, room impulse responses (RIR), RawBoost, Audiomentations, and audio codecs, setting hyperparameters to $K=7$, $\lambda=0.9$, and augmentation probability $p=0.5$.

## Results

On the ASVspoof 5 Track 1 evaluation set, the proposed ASU system achieves a headline EER of 3.96% and minDCF of 0.108, outperforming the WavLM+MHFA baseline (EER 4.99%, minDCF 0.141), DSU (EER 4.77%, minDCF 0.129), and CSU (EER 4.64%, minDCF 0.129) without requiring system fusion. In the SASV Task 2 evaluation set, ASU attains a min a-DCF of 0.118, min t-DCF of 0.192, and t-EER of 4.23%, surpassing the baseline (0.156 min a-DCF, 5.44% t-EER) and DSU/CSU variants. Ablation studies confirm that combining both batch-level variability and GMM-based aleatoric uncertainty yields superior performance compared to using either in isolation.

Hyperparameter sweeps reveal that $K=7$ mixture components and an augmentation weight of $\lambda=0.9$ provide the optimal balance, whereas excessively large values of $K$ degrade performance due to unstable responsibility estimations under limited batch statistics.

| System | Style Aug. | Eval minDCF | Eval EER (%) |
|---|---|---|---|
| WavLM+MHFA (Baseline) | None | 0.141 | 4.99 |
| WavLM+MHFA | DSU [7] | 0.129 | 4.77 |
| WavLM+MHFA | CSU [8] | 0.129 | 4.64 |
| WavLM+MHFA (Ours) | ASU | **0.108** | **3.96** |

## Limitations

The reliance on online EM updates for the GMM assumes that individual mini-batches contain sufficient domain representation to stably estimate component parameters, which may falter under extremely small batch sizes. The hyperparameter choices (such as $K=7$ and $\lambda=0.9$) were empirically tuned for ASVspoof 5 and might require recalibration for other domains or radically different network architectures. Furthermore, evaluation is restricted to specific open conditions of ASVspoof 5, leaving broader generalization across arbitrary acoustic environments or unseen sensor types open for future investigation.

## Why read this

Speech and ML researchers focusing on domain generalization, anti-spoofing, or robust representation learning should read this paper to see how to replace naive unimodal feature perturbation with an online GMM for capturing multimodal style uncertainty.

## Code

- https://github.com/happyjin/ASU

## Applications

High-security voice authentication systems, automated speech anti-spoofing detectors, and spoofing-aware speaker verification pipelines deployed in telephony or hostile acoustic environments.

## Institutions / 機構

Hong Kong Polytechnic University, Brno University of Technology, Shenzhen Zhuiyi Technology

**Funding / 經費:** Innovation and Technology Fund of the Hong Kong SAR, National Key R&D Program of China, Digital Europe Programme, Ministry of Education, Youth and Sports of the Czech Republic

## Related

- (link related pages by id as the wiki grows)
