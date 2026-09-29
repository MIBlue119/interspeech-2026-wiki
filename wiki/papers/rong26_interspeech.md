---
id: rong26_interspeech
category: enhancement-separation
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-837
pdf: https://www.isca-archive.org/interspeech_2026/rong26_interspeech.pdf
---

# StuPASE: Towards Low-Hallucination Studio-Quality Generative Speech Enhancement

*Xiaobin Rong, Jun Gao, Zheng Wang, Mansur Yesilbursa, Kamil Wojcicki, Jing Lu*

[PDF](https://www.isca-archive.org/interspeech_2026/rong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-837)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — StuPASE is a generative speech enhancement framework that combines dry-target finetuning with a diffusion transformer (DiT) flow-matching module to achieve studio-quality speech generation while suppressing hallucinations.

## Key contributions

- Replaced the traditional simulated early-reflection targets with dry-target finetuning in PASE, yielding substantial dereverberation improvements.
- Replaced PASE's original GAN-based DualVocoder with a DiT-based flow-matching module and Mel vocoder to eliminate residual noise, reverberation, and processing artifacts.
- Introduced a simplified semantic-acoustic conditioning pipeline using continuous phonetic representations from DeWavLM-R directly, eliminating the need for an intermediate large language model.
- Demonstrated state-of-the-art performance on benchmark datasets (DNS1 and simulated test sets) across objective perceptual, linguistic, and speaker similarity metrics, verified by human listening tests (Q-MOS/S-MOS).

## Problem

Generative speech enhancement methods like GANs, diffusion, flow-matching, and language models synthesize high perceptual quality speech but are notoriously prone to hallucinating linguistic content or speaker characteristics. Previous approaches addressing this via a two-stage semantic-acoustic paradigm often rely on complex language model pipelines or suffer from moderate perceptual quality under severe reverberation. Furthermore, standard discriminative SE training practices utilize simulated early reflections (first 50 ms), which introduce spectral blurring and perceptual reverberation that bias the target distribution of generative models.

## Method

StuPASE builds upon the PASE framework by organizing enhancement into two sequential stages: semantic enhancement (DeWavLM-R) and acoustic enhancement (DiT flow-matching with a Mel vocoder).

First, the semantic module (DeWavLM-R) is initialized from pre-trained WavLM weights and finetuned using Denoising Representation Distillation (DRD) for 50k steps with a peak learning rate of 2e-5, minimizing mean-squared error against clean phonetic representations from dry recordings. This stage provides purified, high-level semantic conditions.

Second, instead of a GAN-based dual-stream vocoder, StuPASE employs a 12-layer DiT-based flow-matching module with 16 attention heads, a hidden dimension of 1024, and a feedforward dimension of 2048. The semantic representations from DeWavLM-R are linearly projected from 1024 to 512 dimensions, concatenated with the noisy Mel spectrogram (100-dim log-Mel, 1280 window, 320 hop) to form the conditioning signal, and paired with Gaussian noise. The flow-matching module is trained for 100k steps with a peak learning rate of 1e-4 using a speech-infilling training paradigm where masking ratios are sampled from [0.7, 1.0] for clean Mels and [0.5, 1.0] for noisy Mels, minimizing MSE between predicted and target velocities. Inference requires only 8 sampling steps.

Finally, a pre-trained Mel vocoder (an improved Vocos architecture) transforms the clean enhanced Mel spectrogram back into a 16 kHz time-domain waveform.

## Experimental setup

The training dataset consists of roughly 2,000 hours of clean speech sourced from LibriVox (DNS5), LibriTTS, VCTK, and Common Voice 19.0. Noise data comes from DNS5, WHAM!, FSD50K, and FMA, combined with RIRs from openSLR26 and openSLR28 at SNRs between -5 and 15 dB. A filtered subset of 1,000 hours (using a UTMOS threshold of 4.0 and adding LibriSpeech denoised via DPCRN) is used for training the flow-matching module. Evaluation uses the DNS1 test set (150 no-reverb and 150 with-reverb utterances) and a custom simulated test set of 1,000 pairs combining LibriSpeech test-clean with unseen noises and high-RT60 RIRs (0.6–1.6 s). Baselines include TF-GridNet, FlowSE, PASE, SenSE, and Adobe Enhance Speech V2 (AES-V2). Models were trained on 2 NVIDIA RTX 4090 GPUs using AdamW optimizer with cosine decay.

## Results

On the DNS1 with-reverb test set, StuPASE achieves a headline UTMOS of 4.01 (vs. 1.30 noisy, 1.42 TF-GridNet, 3.51 FlowSE, 3.55 SenSE, and 3.71 AES-V2) and a dWER of 7.89%, outperforming all generative baselines in linguistic fidelity under severe reverberation. On the simulated test set, StuPASE reaches a UTMOS of 4.08, SBS of 0.85, LPS of 0.90, and WER of 11.57% (beating SenSE's 12.73% and TF-GridNet's 13.46%). Subjectively, StuPASE scores highest in both Q-MOS (4.19) and S-MOS (3.98), significantly outperforming SenSE (Q-MOS 3.59, S-MOS 3.68). Ablations show that replacing dry targets, removing semantic conditioning, or using noisy semantic inputs causes dramatic degradation, notably raising dWER from 7.89% up to 19.79% (noisy semantic) and 36.36% (no semantic).

| System | DNSMOS (with-reverb) | UTMOS (with-reverb) | dWER (%) | WER (%) [Simulated] |
|---|---|---|---|---|
| Noisy | 1.39 | 1.30 | 10.23 | 14.74 |
| TF-GridNet | 2.63 | 1.42 | 8.86 | 13.46 |
| FlowSE | 3.34 | 3.51 | 15.58 | 27.84 |
| SenSE | 3.37 | 3.55 | 11.30 | 12.73 |
| AES-V2 | 3.40 | 3.71 | 18.87 | 25.97 |
| StuPASE | 3.39 | 4.01 | 7.89 | 11.57 |

## Limitations

The evaluation relies heavily on English speech benchmarks (DNS1 and LibriSpeech-derived simulated sets), leaving cross-lingual and low-resource generalizability unverified. The compute requirements rely on large pre-trained SSL models (WavLM-Large) and a DiT flow-matching architecture requiring multi-step sampling, which may challenge strict real-time, low-latency on-device constraints. Furthermore, speaker similarity (SpkSim) remains slightly lower compared to certain discriminative baselines under specific dry test conditions.

## Why read this

Researchers and audio engineers working on generative speech enhancement or vocoding should read this paper to see how replacing GAN bottlenecks with DiT flow-matching and leveraging continuous phonetic representations from dry-target finetuning can eliminate hallucinations without complex language model wrappers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Studio-quality speech restoration, telecommunication enhancement, podcast mastering, and high-fidelity archival audio cleaning.

## Institutions / 機構

Nanjing University, Cisco Systems, Horizon Robotics

**Funding / 經費:** National Natural Science Foundation of China, Yangtze River Delta Science and Technology Innovation Community Joint Research Project

## Related

- (link related pages by id as the wiki grows)
