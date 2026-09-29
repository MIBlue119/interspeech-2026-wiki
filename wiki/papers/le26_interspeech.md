---
id: le26_interspeech
category: deepfake-security
labels: [self-supervised, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-497
pdf: https://www.isca-archive.org/interspeech_2026/le26_interspeech.pdf
---

# VerAno: Speaker Anonymization via Self-Supervised Tokenization and Conditional Flow Matching

*Ngoc Hung Le, Thien-Phuc Doan, Thien An Nguyen, Kyujin Kim, Souhwan Jung*

[PDF](https://www.isca-archive.org/interspeech_2026/le26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/le26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-497)

**Category:** `deepfake-security` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — VerAno is a speaker anonymization framework that uses a constrained VQ-VAE tokenizer on self-supervised WavLM features combined with a conditional flow-matching transformer to balance privacy and utility, achieving top rankings on the VoicePrivacy Challenge 2024 benchmarks.

## Key contributions

- Replaces language-dependent ASR bottlenecks and leaking continuous SSL representations with a VQ-VAE speech tokenizer using a restricted codebook size to act as an identity-filtering information bottleneck.
- Employs a non-autoregressive Conditional Flow Matching (CFM) transformer backbone with optimal transport interpolation to generate high-fidelity Mel spectrograms from discrete tokens and target speaker embeddings.
- Demonstrates robust cross-lingual generalization on unseen languages (German, Portuguese, Italian, Spanish) without requiring multilingual training transcriptions.
- Provides a tunable codebook size hyperparameter knob to systematically navigate the privacy-utility trade-off.

## Problem

Effective speaker anonymization faces a fundamental deadlock between robust privacy protection and downstream utility retention. Signal-processing methods remain vulnerable to re-identification and severe content distortion, while neural voice conversion approaches struggle with disentanglement. Automatic Speech Recognition (ASR) bottlenecks are heavily language-dependent and degrade paralinguistic and emotional fidelity, whereas continuous self-supervised learning (SSL) representations inadvertently encode speaker timbre and cause identity leakage. Furthermore, synthesis modules have historically suffered from the error propagation of autoregressive models or the complex sampling trajectories of diffusion baselines.

## Method

VerAno extracts continuous frame-level features from the 18th layer of a pretrained WavLM Large model alongside utterance-level global speaker embeddings. The WavLM features are processed by a VQ-VAE tokenizer adapted from RepCodec with Vocos backbones, using a restricted codebook size K (evaluated from 32 to 12,888) to filter out fine-grained acoustic timbre while retaining phonetic and broad prosodic structures. The VQ-VAE is optimized using a combination of reconstruction loss, codebook loss, and commitment loss with weights alpha=30, beta=0.2, and theta=0.9.

The resulting discrete tokens (s) and a randomly sampled external speaker embedding (e_spk) condition a non-autoregressive Conditional Flow Matching (CFM) transformer. The CFM module maps a Gaussian prior noise distribution to target Mel spectrograms via an Ordinary Differential Equation (ODE) solved using 10 Euler steps. The transformer architecture comprises 16 layers, 16 attention heads, a hidden dimension of 768, and an FFN dimension of 3092. The global context vector—formed by fusing sinusoidal time-step embeddings and speaker embeddings via element-wise addition—modulates network activations through an adaptive variant of Root Mean Square Layer Normalization.

During inference, the source speaker's identity is replaced by a target embedding sampled from a pre-computed external speaker pool derived from LibriSpeech train-clean-100. The generated Mel spectrograms are converted back to time-domain waveforms using a pretrained HiFi-GAN vocoder.

## Experimental setup

Models are trained on standard splits of LibriSpeech and CREMA-D, following VoicePrivacy Challenge (VPC) 2024 protocols using LibriSpeech dev/test-clean for privacy and linguistic evaluation, and IEMOCAP dev/test for emotion retention. Performance metrics include Equal Error Rate (EER) for privacy via semi-informed ASV systems, Word Error Rate (WER) for intelligibility, and Unweighted Average Recall (UAR) for affective retention, alongside the Multilingual LibriSpeech (MLS) dataset for cross-lingual evaluation. The VQ-VAE tokenizer is trained for 152k steps (batch size 32, AdamW lr=2e-4), and the flow-matching transformer is trained for 400k updates (batch size 32, AdamW lr=8e-5).

## Results

Configured with a codebook size of CB_128, VerAno secures 2nd place in privacy protection (EER 31.73% avg) while maintaining strong linguistic and emotional utility, leading to a 1st place overall average and weighted rank across VPC 2024 baselines. Conversely, expanding the codebook to CB_8192 captures finer acoustic details to achieve top ranks in linguistic utility (WER 2.20% avg) and emotional retention (UAR 57.51% avg), outperforming all official baselines (B1 through B6) in utility metrics while trading off some privacy (EER 23.13% avg). In cross-lingual evaluations on the MLS dataset against the B3-Mul baseline, CB_128 neutralizes original speaker verification (EER over 40%) and maintains competitive word error rates.

| System | LS-dev WER (%) ↓ | LS-test WER (%) ↓ | IEMOCAP-dev UAR (%) ↑ | IEMOCAP-test UAR (%) ↑ | LS-dev EER (%) ↑ | LS-test EER (%) ↑ |
|---|---|---|---|---|---|---|
| Orig. | 1.81 | 1.84 | 69.08 | 71.06 | 5.72 | 4.59 |
| B5 [7] | 4.73 | 4.37 | 38.08 | 38.17 | 34.47 | 34.34 |
| B6 [7] | 9.69 | 9.09 | 36.39 | 36.13 | 23.05 | 21.14 |
| CB_128 | 2.55 | 2.51 | 55.23 | 54.01 | 35.56 | 27.90 |
| CB_8192 | 2.19 | 2.21 | 58.07 | 56.96 | 26.83 | 19.43 |

## Limitations

The framework exhibits a strict trade-off where larger codebook sizes improve speech utility at the expense of identity masking and increased residual timbre leakage. Cross-lingual evaluations show that while English-trained models generalize well, specialized multilingual baselines retain advantages in specific target language phonetics. Furthermore, the multi-step ODE flow-matching inference requires high computational overhead, necessitating future exploration into distillation techniques for real-time on-device deployment.

## Why read this

Speech researchers and privacy engineers working on voice anonymization or neural voice conversion should read this paper to understand how discrete SSL tokenization with tunable codebook bottlenecks effectively resolves the long-standing privacy-utility trade-off.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving voice assistants, secure telephony, anonymized multi-party audio logging, and medical speech data sharing.

## Institutions / 機構

Soongsil University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Ministry of Science and ICT

## Related

- (link related pages by id as the wiki grows)
