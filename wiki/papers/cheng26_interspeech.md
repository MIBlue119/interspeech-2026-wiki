---
id: cheng26_interspeech
category: deepfake-security
labels: [generative-model, robustness-noise]
institutions: ["Southern University of Science and Technology", "Tencent Youtu Lab"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-158
pdf: https://www.isca-archive.org/interspeech_2026/cheng26_interspeech.pdf
---

# Diffusion Reconstruction towards Generalizable Audio Deepfake Detection

*Bo Cheng, Songjun Cao, Xiaoming Zhang, Jie Chen, Long Ma, Fei Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/cheng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cheng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-158)

**Category:** `deepfake-security` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — This paper proposes a diffusion-based audio reconstruction framework combined with multi-layer feature aggregation and Regularization-Assisted Contrastive Learning (RACL) to dramatically improve cross-domain generalization in audio deepfake detection, reducing average EER from 15.79% to 8.25% across five test sets.

## Key contributions

- Identifies diffusion-based audio reconstruction (via SemantiCodec) as the most effective paradigm for hard sample generation compared to vocoder-based and neural codec reconstructions.
- Introduces an adaptive multi-layer feature aggregation module that pools transformer representations from a frozen XLS-R 300M encoder using learned attention weights.
- Proposes a Regularization-Assisted Contrastive Learning (RACL) objective combining dual contrastive losses and an intra-class variance regularization loss to enforce tight clusters and widen decision boundaries.
- Achieves consistent out-of-domain robustness, lowering average EER across ASVspoof, ITW, DiffSSD, WaveFake, and CodecFake test sets.

## Problem

Contemporary audio deepfake detection models heavily overfit to specific training artifacts, failing to generalize to unseen out-of-domain synthesis methods like neural codec-based or diffusion-based generators. Prior strategies utilizing spectral representations or cross-aggregation lack mechanisms to handle challenging hard samples or force invariant representations across novel domains. This leaves critical vulnerabilities against real-world threats like social media disinformation and telecommunication fraud.

## Method

The framework takes raw audio and passes it through an audio reconstruction module to create synthetic hard samples. While HiFi-GAN, DAC, and Enencodec were evaluated, SemantiCodec (a latent diffusion model leveraging dual-encoder semantic and acoustic features) is chosen because its stochastic nature generates the most informative artifacts. For detection, the audio is processed by a frozen pretrained XLS-R 300M model. Instead of using only the final layer, an adaptive layer aggregation module computes a weighted sum of outputs across all transformer layers using global average pooling followed by 1D convolution.

The resulting aggregated features feed into an AASIST classifier. To optimize the network, the authors introduce Regularization-Assisted Contrastive Learning (RACL), which minimizes a multi-part loss function: L_RACL = alpha * L_std + beta * L_enh + gamma * L_reg + L_cls. Here, L_std is a standard margin-based contrastive loss over all samples, while L_enh is an enhanced contrastive loss focusing exclusively on bona fide and reconstructed bona fide pairs to isolate hard samples. L_reg is a variance-based penalty applied independently to bona fide and non-bona fide classes within each batch, minimizing feature-wise variance to force compact intra-class clusters. Finally, L_cls is a standard cross-entropy loss distinguishing bona fide samples from all spoof and reconstructed variations.

During training, waveforms are resampled to 16 kHz and padded or truncated to exactly 64,600 samples. Augmentations include room impulse responses (RIRs), MUSAN corpus noise/music (0-15 dB SNR), and multi-speaker speech mixing. The AASIST classifier is trained for 100 epochs using the Adam optimizer with an initial learning rate of 5e-4 decaying by 0.5 every 10 epochs, with model parameters averaged over the lowest validation loss epoch and its four predecessors.

## Experimental setup

Models are evaluated on five diverse datasets: ASVspoof 2019 LA eval, CodecFake, DiffSSD (8 diffusion methods and 2 APIs), WaveFake (GAN-based), and ITW (uncontrolled social media audio). Baselines include the original CodecFake implementation, a standard baseline implementation without reconstruction, and variants using HiFi-GAN, DAC, and Encodec reconstructions. The system uses a frozen XLS-R 300M coupled with a trainable AASIST backbone, trained with a fixed random seed of 688.

## Results

The complete framework achieves an average EER of 8.247% across the five evaluation sets, representing a massive improvement over the implementation baseline's 15.789% average EER. On the difficult In-The-Wild (ITW) dataset, the RACL Diffusion model reaches 9.155% EER compared to the baseline's 17.949%. On DiffSSD, EER drops from 21.587% to 10.081%. Ablation experiments confirm that adding the enhanced contrastive loss (L_enh) improves feature distance separations, while the intra-class variance regularization loss (L_reg) acts as a stabilizer, culminating in the optimal average EER of 8.247% when all components are active. 

However, the approach does not universally win on every single subset; for instance, on specific CodecFake subsets like C4 and C7, dedicated codec-specific reconstructions occasionally outperform the diffusion model on matching codec types, illustrating a minor trade-off where generalized diffusion training slightly sacrifices narrow, domain-specific artifact matching for superior global robustness.

| System | ASVspoof | ITW | DiffSSD | WaveFake | CodecFake | Avg Total |
|---|---|---|---|---|---|---|
| Baseline | 0.216 | 17.949 | 21.587 | 2.395 | 36.799 | 15.789 |
| HiFi-GAN | 0.201 | 23.779 | 38.991 | 1.723 | 39.616 | 20.862 |
| DAC | 1.010 | 39.477 | 25.833 | 3.319 | 39.972 | 21.922 |
| Encodec | 0.295 | 22.964 | 15.129 | 3.031 | 29.816 | 14.247 |
| Diffusion | 0.166 | 18.159 | 14.479 | 1.235 | 27.063 | 12.220 |
| RACL Diffusion | 0.206 | 9.155 | 10.081 | 1.597 | 20.198 | 8.247 |

## Limitations

The framework relies on a frozen large-scale self-supervised model (XLS-R 300M) paired with an AASIST frontend, inheriting compute and memory constraints unsuitable for ultra-low-power edge devices. The evaluation is bound to English and standard benchmark languages present in ASVspoof/CodecFake, leaving multilingual zero-shot capabilities under-explored. Furthermore, generating diffusion-based reconstructions offline for training significantly increases data preprocessing overhead compared to standard waveform pipelines.

## Why read this

Audio deepfake researchers and security engineers should read this paper to understand how stochastic diffusion reconstruction and variance-regularized contrastive learning can be combined to conquer out-of-domain generalization limits. It provides actionable design rules for constructing hard samples and structuring latent feature spaces against unseen generative architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying robust audio forensic verification tools for spotting telecommunication fraud, deepfake voice impersonation, and unverified social media audio clips.

## Institutions / 機構

Southern University of Science and Technology, Tencent Youtu Lab

**Funding / 經費:** Shenzhen Key Technology Program Funding, Center for Computational Science and Engineering at Southern University of Science and Technology

## Related

- (link related pages by id as the wiki grows)
