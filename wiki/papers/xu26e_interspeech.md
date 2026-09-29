---
id: xu26e_interspeech
category: tts
labels: [generative-model]
institutions: ["Tencent", "University of Electronic Science and Technology of China"]
code: https://github.com/vspeech/SCNet
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-843
pdf: https://www.isca-archive.org/interspeech_2026/xu26e_interspeech.pdf
---

# SCNet: Enhancing GAN-based Speech Generation with Subband Condition Network and Magnitude-aware Phase Loss

*Nan Xu, Mingxue Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-843)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — SCNet is a dual-branch, GAN-based neural vocoder that integrates a lightweight Subband Condition Network (CondNet) and a magnitude-aware anti-wrapping phase loss to improve spectral and phase reconstruction, outperforming baseline models on both in-domain and out-of-domain datasets.

## Key contributions

- Proposes a dual-branch architecture (SCNet) combining an iSTFT-based backbone with a lightweight subband condition network (CondNet) to inject low-frequency Fourier spectral priors.
- Introduces a magnitude-aware anti-wrapping phase loss that utilizes a squared sine periodic function weighted by raw target magnitudes to focus optimization on high-energy time-frequency bins.
- Stabilizes feature matching loss during training, resolving the black-box divergence issues common in traditional GAN-based neural vocoders.
- Achieves competitive MOS and objective scores compared to larger models like BigVGAN while requiring approximately 1/8 of its parameter footprint and significantly shorter training days.

## Problem

Standard GAN-based and iSTFT-based neural vocoders typically operate as black-box models that predict full-band spectral coefficients without explicit initial conditions, causing feature matching loss to become unstable or drift upward during training. Existing source-filter approaches rely on error-prone pitch estimators (e.g., DIO, pYIN) that yield voicing errors and pitch halving or doubling, while previous supervised phase losses treat all time-frequency bins equally and suffer from phase wrapping. These shortcomings lead to fine-grained spectral information loss and audible artifacts, making it difficult for models to maintain high generalization on out-of-domain speakers without massive model capacities.

## Method

SCNet features a dual-branch architecture consisting of an iSTFT-based backbone (built on HiFiGAN with Snake activations instead of Leaky ReLU) and a secondary subband condition network (CondNet). CondNet takes an 80-bin mel-spectrogram and uses four ConvNeXtV2 blocks (intermediate dimension 768) to predict magnitude and phase components for a low-frequency subband, which are transformed via iSTFT into a 6 kHz subband waveform. This subband signal is converted back to the frequency domain via STFT (hop sizes 4 and 1) and fused into the backbone's upsample layers using two coupling blocks containing normal and dilated convolutions (kernel sizes [7, 11], dilations [1, 3]).

To handle phase optimization, the network uses a magnitude-aware anti-wrapping phase loss defined as the square of a sine function applied to the true phase error (bounded in (-π, π] via minimum wrapping distance), weighted directly by the target signal's magnitude matrix. This forces the model to prioritize phase accuracy in high-energy regions where errors are most perceptible and prevents the non-convergence seen in unweighted phase losses.

The entire network is trained using LSGAN adversarial loss, L1 feature matching loss (applied exclusively to the backbone), L1 mel-spectrogram reconstruction loss (applied to both backbone and conditional branches), and the magnitude-aware phase loss with scalar weights set to lambda_mel = 45 and lambda_pha = 45. Optimization uses the AdamW optimizer (betas: 0.8, 0.99, initial learning rate 2e-4 with 0.999 exponential decay) on 24576-sample audio segments with a batch size of 16 for up to 1M steps on an NVIDIA A100 GPU.

## Experimental setup

Evaluated on the LibriTTS train-clean-100 dataset (24 kHz) for training, using a 500-utterance in-domain (ID) test set and a 500-utterance out-of-domain (OD) VCTK test set for generalization. Baselines include HiFiGAN, iSTFTNet, HiFTNet, Vocos, and BigVGAN. Metrics comprise PESQ (16 kHz wide-band), Multi-resolution STFT (M-STFT), periodicity error, V/UV F1 score, pitch root mean square error, and crowd-sourced 5-point Mean Opinion Score (MOS). Notable implementation details: SCNet contains 15.86M parameters, trains with a segment length of 24576, and synthesis speed is benchmarked on an NVIDIA V100 GPU.

## Results

SCNet achieves superior objective and subjective scores across both in-domain and out-of-domain test sets compared to models of similar parameter scale. On the ID test set, SCNet reaches a PESQ of 4.02 and an MOS of 4.21 +/- 0.09, outperforming BigVGAN (PESQ 3.74, MOS 4.11) despite using only about 14% of BigVGAN's parameter count (15.86M vs 112.4M). On the OD test set, SCNet maintains its advantage with a PESQ of 3.78 and an MOS of 4.14 +/- 0.10. In text-to-speech evaluations using CosyVoice generated features, SCNet achieves a top MOS of 4.09 +/- 0.10, besting Vocos (3.91) and BigVGAN (4.01).

Ablations demonstrate that replacing CondNet's subband output with full-band prediction or removing the STFT operator in coupling blocks degrades PESQ and pitch accuracy, while completely omitting CondNet causes catastrophic failure. Furthermore, dropping the magnitude weights from the phase loss triggers non-convergence and performance drops comparable to having no phase loss at all.

| System | PESQ (ID) | PESQ (OD) | M-STFT (ID) | Pitch (ID) | MOS (ID) |
|---|---|---|---|---|---|
| Ground Truth | 4.50 | 4.50 | 0.00 | - | 4.59 |
| HiFiGAN | 3.23 | 3.07 | 0.903 | 37.01 | 3.99 |
| iSTFTNet | 3.10 | 3.01 | 0.934 | 39.69 | 3.96 |
| HiFTNet | 3.53 | 3.47 | 0.830 | 27.26 | 4.06 |
| BigVGAN | 3.74 | 3.66 | 0.796 | 28.53 | 4.11 |
| SCNet | 4.02 | 3.78 | 0.740 | 20.11 | 4.21 |

## Limitations

SCNet exhibits a slower synthesis speed than non-autoregressive spectral vocoders like Vocos (145.67 vs 609.01 samples/sec factor relative to realtime). Additionally, the model has only been validated on speech generation and lacks verification as a universal vocoder for general audio and music synthesis.

## Why read this

Speech synthesis researchers and engineers seeking a lightweight, high-fidelity neural vocoder that overcomes the black-box training instabilities of traditional GANs should read this paper. It offers a clear blueprint for integrating frequency-domain subband priors and magnitude-weighted phase objectives to maximize performance under constrained model capacities.

## Code

- https://github.com/vspeech/SCNet

## Applications

Text-to-speech (TTS), voice conversion (VC), and singing voice synthesis (SVS).

## Institutions / 機構

Tencent, University of Electronic Science and Technology of China

## Related

- [RAF: Relativistic Adversarial Feedback For Universal Speech Synthesis](lee26e_interspeech.md) — same problem · relatedness 2.7/3
- [EffVOC: Low-Delay Efficient Speech Waveform Reconstruction from Spectral Representations Without Phase](shi26f_interspeech.md) — same problem · relatedness 2.7/3
- [Spiking Vocos: An Energy-Efficient Neural Vocoder](chen26j_interspeech.md) — same problem · relatedness 2.3/3
- [One-Step Token-to-Waveform Generation with MeanFlow in Latent Space](dai26c_interspeech.md) — same problem · relatedness 2.3/3
- [Multilingual Multi-Speaker Unit Vocoders: A Systematic Analysis of Discrete Speech Representations](kothari26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
