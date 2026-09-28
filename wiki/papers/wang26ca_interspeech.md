---
id: wang26ca_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2069
pdf: https://www.isca-archive.org/interspeech_2026/wang26ca_interspeech.pdf
---

# FreqGuard: Leveraging Frequency-Domain Feature Priors for Universal Proactive Voice Defense

*Yankai Wang, Zhipeng Chen, Yuxuan Du, Rong Zheng, Jing Deng*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26ca_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26ca_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2069)

**TL;DR** — FreqGuard is a universal proactive voice defense framework that uses frequency-domain feature priors and a multi-loss optimization strategy to disrupt unauthorized speech synthesis while preserving high audio fidelity, reducing attack success rates to a maximum of 27.50% on large-scale TTS models like XTTS-v2 and CosyVoice.

## Key contributions

- Developed a prior-driven structured defense utilizing a systematically built knowledge base of disruptive yet low-distortion frequency-domain operations to target the shared subspace between identity and synthesis features.
- Proposed a multi-objective loss function combining time-domain reconstruction, magnitude, phase, log-power spectrum, structural similarity, and speaker embedding cosine losses for balanced fidelity and defense.
- Introduced a dual-module architecture comprising PriorNet for quality preservation/perturbation stabilization and GradPert for gradient-guided frequency-domain adversarial perturbation generation.
- Demonstrated robust cross-model generalization and resilience against diffusion-based purification models across multi-speaker and multilingual corpora.

## Problem

Existing proactive defense methods predominantly focus on embedding-space displacement initialized from random noise, without modeling the underlying spectral statistical structures of speech. Consequently, these approaches rely heavily on specific feature extractors or surrogate models, leading to severe performance drops in cross-model scenarios. Furthermore, recent studies show that diffusion-based purification and frequency-domain filtering can easily strip away these fragile perturbations, highlighting the urgent need for structural frequency-domain defenses that withstand real-world adaptive attacks.

## Method

FreqGuard consists of two main components: PriorNet and GradPert. PriorNet takes clean speech and reconstructs magnitude (Ŝ_m) and phase (Ŝ_p) spectrograms via an encoder-decoder architecture with 4 attention blocks, preserving speech quality and stabilizing perturbations. GradPert operates on the frequency domain by injecting adversarial perturbations into the magnitude spectrogram, guided by gradients to minimize speaker verification cosine similarity. Because the pre-trained ERes2NetV2 model normally takes Fbank features, the authors modified its input to accept magnitude spectrograms directly and retrained it for proper backpropagation.

The overall training relies on a composite objective function containing 7 distinct losses: time-domain L1 loss (L_time), magnitude mean squared error (L_mag), phase discrepancy combining cosine and sine errors (L_pha), log-spectral MSE (L_log), structural similarity SSIM loss (L_ssim), and speaker embedding cosine distance (L_speaker). The guidance dataset contains 24,000 samples split into balanced (40%), disruptive (40%), and reference (20%) subsets covering operations like codec compression, quantization, masking, and reverberation.

During inference, GradPert generates the magnitude perturbation Ŝ_adv, which is combined with Ŝ_m and synthesized via Inverse STFT using Ŝ_p to yield the protected audio waveform. STFT parameters are configured with N_FFT = 512 and N_hop = 256. Perturbation magnitude is controlled by epsilon = 0.03, and PriorNet is optimized using AdamW with a learning rate of 2e-4 and CosineAnnealingLR for 100 epochs on 4 NVIDIA RTX 4090 GPUs.

## Experimental setup

Evaluated on a 4,200-sample dataset comprising LJSpeech (1 speaker), VCTK (10 speakers), and AIShell3 (10 speakers) with 200 utterances per speaker at 16 kHz. Compared against baseline proactive defense methods including Attack-VC, E2E, PoP, and Enkidu across four TTS systems (YourTTS, StyleTTS2, XTTS-v2, and CosyVoice). Evaluated using PESQ, STOI, Speaker Recognition Similarity (SRS), and Attack Success Rate (ASR). Implemented on 4 NVIDIA RTX 4090 GPUs with speaker verification threshold theta = 0.78.

## Results

FreqGuard achieves superior cross-model generalization, maintaining a maximum ASR of 27.50% against massive models like XTTS-v2 and CosyVoice, whereas baselines such as Attack-VC and PoP experience up to 100% ASR. Against StyleTTS2 on VCTK, FreqGuard limits ASR to 2.60% while maintaining a PESQ of 2.467 and STOI of 0.883. In cross-ASV generalization tests on VCTK, FreqGuard achieves low ASR across diverse verification models, such as 4.95% on ERes2NetV2, 1.70% on Cam++, 2.50% on ERes2Net, and 2.70% on ECAPA-TDNN. Under De-AntiFake purification attacks, FreqGuard achieves an ASR of 5.00% on LJSpeech and 31.75% on VCTK, outperforming methods like Attack-VC (9.50% and 54.25%).

| System / Condition | PESQ ↑ | STOI ↑ | XTTS-v2 ASR (%) ↓ | CosyVoice ASR (%) ↓ |
|---|---|---|---|---|
| Attack-VC (LJSpeech) | 3.428 | 0.804 | 12.50 | 100.00 |
| PoP (LJSpeech) | 2.806 | 0.956 | 25.00 | 99.49 |
| Enkidu (LJSpeech) | 1.331 | 0.903 | 7.00 | 36.00 |
| FreqGuard (LJSpeech) | 2.344 | 0.943 | 1.75 | 27.50 |
| FreqGuard (AIShell3) | 2.042 | 0.916 | 8.55 | 12.75 |
| FreqGuard (VCTK) | 2.467 | 0.883 | 2.60 | 25.05 |

## Limitations

While FreqGuard improves robustness against purification and cross-model synthesis, its ASR on VCTK still rises to 31.75% under downstream diffusion purification. The framework relies on a fixed set of frequency priors derived from specific synthetic degradation operations, which may require expansion for unseen acoustic environments. Furthermore, evaluation is restricted to three datasets (LJSpeech, VCTK, AIShell3) totaling 21 speakers, leaving large-scale multi-accent and highly diverse open-world scenarios unverified.

## Why read this

Speech and ML security researchers should read this paper to understand how frequency-domain priors and multi-loss optimization can replace fragile random-noise perturbations in proactive deepfake defense. It offers actionable insights into constructing guidance datasets that bridge speaker verification and speech synthesis subspaces.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Proactive voice data protection for social media uploads, privacy-preserving personal voice assistance, and authorized audio licensing frameworks.

## Related

- (link related pages by id as the wiki grows)
