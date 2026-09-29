---
id: carson26_interspeech
category: enhancement-separation
labels: [robustness-noise]
institutions: ["Skyworks Solutions", "Georgia Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-794
pdf: https://www.isca-archive.org/interspeech_2026/carson26_interspeech.pdf
---

# Balancing Speech Reconstruction and Noise Suppression Using Dual-Asymmetric Loss

*Merlin Carson, Suyash Dandekar*

[PDF](https://www.isca-archive.org/interspeech_2026/carson26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/carson26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-794)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — The paper introduces Dual-Asymmetric Loss, a novel training objective with an adjustable parameter to continuously trade off speech reconstruction against noise suppression, achieving strong Pearson correlations of 0.95 (speech quality) and -0.96 (noise suppression) across 13 parameter settings.

## Key contributions

- Proposed Dual-Asymmetric Loss, combining two asymmetric penalty terms with magnitude and complex components to independently target speech attenuation and residual noise.
- Introduced an adjustable scalar weighting hyperparameter ($\lambda$) that enables continuous, predictable tuning of speech quality versus noise suppression trade-offs.
- Validated the loss across four diverse state-of-the-art speech enhancement architectures (LiSenNet, DPCRN, SEMamba, MP-SENet), ranging from lightweight (57K parameters) to large transformer/SSM models.
- Demonstrated improved generalization on out-of-distribution real-world data (DNS5 Blind Test Set) and enhanced speech intelligibility for downstream ASR, reducing WER by 32-45% over noisy baselines.

## Problem

Modern AI-based speech enhancement (SE) models must operate under strict memory and computational constraints for embedded, mobile, or real-time deployment, often forcing a compromise between speech fidelity and background noise attenuation. Prior optimization strategies lack performance-specific training controls, leading to unpredictable degradation in either speech quality or noise suppression. Existing tunable methods use separate weighting of uncoordinated components or single-term maximum objectives that can cause optimization oscillations, and they frequently omit phase-aware terms crucial for complex models and STFT consistency. Consequently, deploying standard SE models leaves engineers unable to tailor performance dynamically for specialized downstream demands like in-game chat versus emergency telecommunications.

## Method

The proposed Dual-Asymmetric Loss is built upon two conceptual pillars: Complex Compressed Mean Squared Error (CCMSE) and asymmetric loss. The objective combines an asymmetric speech loss ($L_{speech}$) and an asymmetric noise loss ($L_{noise}$) scaled by a hyperparameter $\lambda$: $\mathcal{L} = \lambda L_{speech} + (1-\lambda) L_{noise}$.

Each asymmetric component consists of a magnitude term and a complex term. The magnitude term uses a compressed difference ($c=0.3$) lower-bounded by a ReLU activation function: for $L_{speech}$, a penalty is incurred only when predicted magnitude is less than target magnitude (speech attenuation); for $L_{noise}$, a penalty is incurred when predicted magnitude exceeds target magnitude (residual noise). Because sign differences do not apply in the complex plane, indicator functions $\mathbb{1}_{|S| > |\hat{S}|}$ and $\mathbb{1}_{|\hat{S}| > |\span S|}$ are multiplied element-wise with complex compressed errors to select the exact frequency bins responsible for attenuation or noise leakage.

All models were trained at 16 kHz using batches of eight 2-second audio segments, using Hann-windowed STFT frames of 512 samples with 50% overlap and an STFT consistency constraint. Training used a learning rate of $5 \times 10^{-4}$ with 0.99 pre-epoch exponential decay for 200 epochs, selecting the checkpoint with the lowest validation loss. Setting $\lambda = 0.5$ balances the terms to a scaled CCMSE, while lower $\lambda$ ($\sim$0.35) prioritizes noise suppression (BAK) and higher $\lambda$ ($\sim$0.65) prioritizes speech quality (SIG).

## Experimental setup

Models were trained on the VoiceBank-DEMAND dataset (downsampled to 16 kHz) and evaluated on two test sets: the ICASSP 2023 DNS5 Challenge Track 1 Blind Test Set (389 real-world noisy audio files) and the VoiceBank-DEMAND noisy test set (824 clips). Baselines included unprocessed noisy audio, and official pre-trained weights for SEMamba and MP-SENet (plus reproduced DPCRN and LiSenNet models). Evaluation metrics included DNSMOS (SIG, BAK, OVRL), PESQ, STOI, SI-SDR, and Word Error Rate (WER) transcribed via Whisper. Computational setups included a GPU with 48 GB memory to handle long files.

## Results

Models trained with $\lambda = 0.35$ achieved the highest Background (BAK) DNSMOS scores across both test sets (e.g., LiSenNet reaching 3.66 on DNS5 vs 2.63 noisy; MP-SENet reaching 3.95), effectively prioritizing noise suppression. Conversely, models trained with $\lambda = 0.65$ achieved the highest Signal (SIG) speech quality scores (e.g., MP-SENet reaching 3.43 on DNS5). Across 13 distinct $\lambda$ values tested on LiSenNet, the Pearson correlation coefficient between $\lambda$ and SIG was 0.95 ($p = 4.1 \times 10^{-7}$), and between $\lambda$ and BAK was -0.96 ($p = 2.7 \times 10^{-7}$). While official baseline models trained on specific composite losses sometimes scored higher on VoiceBank-DEMAND PESQ (since they were explicitly optimized for it), models trained with Dual-Asymmetric loss generalized better to the out-of-distribution DNS5 Blind Test Set and improved Word Error Rate (WER) by 32% to 45% relative to unprocessed noisy inputs.

| System / Condition | $\lambda$ | DNS5 SIG | DNS5 BAK | DNS5 OVRL | VoiceBank PESQ | VoiceBank SI-SDR (dB) | WER (%) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | |
| Noisy (Unprocessed) | n/a | 3.19 | 2.63 | 2.36 | 1.97 | 8.45 | 10.67 |
| LiSenNet | 0.35 | 3.09 | **3.66** | 2.67 | **2.93** | 18.08 | **6.80** |
| LiSenNet | 0.50 | 3.12 | 3.60 | 2.69 | 2.88 | **18.10** | 7.26 |
| LiSenNet | 0.65 | **3.22** | 3.54 | **2.73** | 2.77 | 17.93 | 7.09 |
| SEMamba (Baseline) | n/a | 3.39 | 3.86 | 3.03 | **3.54** | 19.72 | **5.82** |
| SEMamba (Proposed) | 0.50 | 3.37 | 3.89 | 3.03 | 3.38 | **19.92** | 5.87 |

## Limitations

Extreme values of $\lambda$ ($\le 0.25$ or $\ge 0.7$) lead to sharp drops in either speech intelligibility (due to over-attenuation) or noise suppression (due to severe noise leakage). The evaluation is constrained by the hardware memory limits required for processing long-form audio files with complex architectures like MP-SENet. Additionally, metric evaluations rely on non-intrusive AI proxies like DNSMOS which have inherent estimation variance, and reference-based metrics depend heavily on synthetic alignment conditions.

## Why read this

Speech and ML engineers looking for a drop-in loss function to control the trade-off between speech preservation and noise suppression in real-time enhancement models should read this paper. It provides a principled mathematical formulation combining complex and magnitude asymmetric terms with a single tuning hyperparameter that reliably correlates with perceptual scores.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying customizable real-time speech enhancement on edge devices, mobile operating systems, communication headsets, and teleconferencing tools where use-cases demand dynamically tuning models for either aggressive noise elimination or pristine speech intelligibility.

## Institutions / 機構

Skyworks Solutions, Georgia Institute of Technology

## Related

- (link related pages by id as the wiki grows)
