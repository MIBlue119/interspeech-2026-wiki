---
id: bhattacharya26b_interspeech
category: deepfake-security
labels: [efficient-on-device, streaming-real-time, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3055
pdf: https://www.isca-archive.org/interspeech_2026/bhattacharya26b_interspeech.pdf
---

# Exploiting Neural Audio Codec Latents for Adversarial Audio Attacks

*Sameek Bhattacharya, Bharath Krishnamurthy, Ajita Rattani*

[PDF](https://www.isca-archive.org/interspeech_2026/bhattacharya26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhattacharya26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3055)

**Category:** `deepfake-security` · **Labels:** `efficient-on-device`, `streaming-real-time`, `generative-model`

**TL;DR** — A real-time generative adversarial attack framework operates directly in the continuous latent space of the Descript Audio Codec (DAC), achieving up to 99% targeted attack success with sub-7 ms inference. This bypasses the prohibitive computational overhead of traditional iterative waveform attacks.

## Key contributions

- Proposed a trainable conditional generator operating entirely within the continuous latent space of the pre-trained DAC neural audio codec.
- Designed an end-to-end differentiable pipeline bridging the pre-quantization latent manifold to victim classifiers via a differentiable time-frequency preprocessor.
- Achieved real-time generation in under 7 ms per sample, outperforming generative baselines by up to 24× and iterative optimization by thousands of times.
- Demonstrated robust attack success rates (77% to 99%) across diverse domains including speech commands, environmental sound classification, and speaker verification.

## Problem

Deep neural networks deployed in smart speakers and voice assistants are vulnerable to adversarial attacks, but realistic threat assessment is hindered by high-dimensional waveform optimization. Traditional gradient-based methods like FGSM, PGD, and Carlini-Wagner (C&W) require costly iterative backward passes, making them entirely impractical for real-time streaming services. Meanwhile, prior generative waveform attacks suffer from perceptible artifacts or heavy task-specific architectures that limit their flexibility and streaming applicability. This work addresses the critical gap of evaluating real-time, low-latency generative attacks against general audio classifiers and speaker verification systems without incurring prohibitive inference-time optimization overhead.

## Method

The framework takes a raw audio waveform $x \in \mathbb{R}^T$ and maps it to a continuous, lower-dimensional manifold via a frozen Descript Audio Codec (DAC) encoder, yielding latent $z \in \mathbb{R}^{C \times L}$ where $L \ll T$. A trainable conditional generator $G_\theta$ uses multi-scale 1D convolutions, batch normalization, and ReLU activations to fuse this pristine latent with a target class label $y_t$ or speaker embedding $v_{tgt}$. Rather than predicting absolute latents, $G_{\theta}$ outputs a residual perturbation scaled by a learnable parameter $\alpha$, with the terminal Conv1D layer zero-initialized for stability, and clamps the resulting latent between -5 and 5 to prevent gradient explosion.

The bounded adversarial latent $z_{adv}$ is passed through a frozen DAC decoder to reconstruct the adversarial waveform $x_{adv}$. To connect the waveform to frozen downstream victim models $f_v$, a fully differentiable preprocessor performs an STFT, Mel-filterbank mapping, and logarithmic compression. The end-to-end model is optimized using a composite objective combining an $L_2$ latent regularization term to preserve acoustic fidelity with task-specific losses: a Cross-Entropy and Carlini-Wagner margin loss for discrete classification, or a cosine similarity and geometric margin loss for open-set speaker verification. To stabilize non-convex optimization, generator weights maintain an Exponential Moving Average (EMA), and inference exclusively utilizes these EMA weights.

## Experimental setup

Evaluated on four datasets: Google Speech Commands (80k train / 4,273 test), TAU Urban Acoustic Scenes 2019 (7,348 train / 4,185 test), UrbanSound8K (6,806 train / 936 test across folds), and LibriSpeech train-clean-100 (1,255 genuine and 313,750 imposter trials). Victim models include an Audio Spectrogram Transformer (AST) for speech commands, PANNs CNN14 for acoustic scene/environmental classification, and an ECAPA-TDNN for speaker verification. Compared against gradient-based baselines (FGSM, PGD, C&W) and single-shot generative baselines (FAPG, CGAN) using Attack Success Rate (ASR) and Model Accuracy (Acc) metrics on NVIDIA RTX 5000 Ada and A10 GPUs.

## Results

On Google Speech Commands using AST, the proposed method achieves 96.58% untargeted ASR (outperforming PGD's 45.65% and FAPG's 82.08%) and 77.65% targeted ASR in 0.0067 seconds per sample. On UrbanSound8K, it obtains 99.11% untargeted ASR and 97.17% targeted ASR, while on DCASE2019 it reaches 100% untargeted ASR and 94.07% targeted ASR with a latency of 0.0039–0.0056s. For speaker verification on LibriSpeech against ECAPA-TDNN, it achieves 100% untargeted ASR and 99.80% targeted ASR in just 0.0035 seconds, outperforming FAPG by 21.40% in the targeted setting. The primary scenario where the method drops slightly behind specific baselines is targeted ASR on short 1-second speech commands (77.65% vs. CGAN's 93.56%), indicating that manipulating localized phonemes via global latents is more challenging.

| Method | Speech Cmd Untarg ASR | Speech Cmd Targ ASR | UrbanSound8K Targ ASR | LibriSpeech Targ ASR | Time (sec/sample) |
|---|---|---|---|---|---|
| FGSM | 8.88% | 3.63% | 12.16% | 2.06% | 0.08 - 1.89 |
| PGD | 45.65% | 12.63% | 30.21% | 12.43% | 1.24 - 6.55 |
| CW | 77.60% | 66.22% | 92.21% | 82.64% | 6.14 - 66.20 |
| FAPG | 82.08% | 80.77% | 96.52% | 78.40% | 0.0097 - 0.08 |
| CGAN | 93.72% | 93.56% | 77.13% | N/A | 0.0158 - 0.0232 |
| Ours | 96.58% | 77.65% | 97.17% | 99.80% | 0.0035 - 0.0067 |

## Limitations

The evaluation is restricted to white-box settings where victim model architectures and gradients are accessible through a differentiable feature extractor. The approach shows reduced relative dominance in targeted attacks on very short audio segments (such as 1-second Google Speech Commands) compared to broader scene or speaker classifications. Black-box transferability and robustness against codec compression changes or latent-space defenses remain unexplored.

## Why read this

Speech and ML security researchers looking to understand the vulnerabilities of neural audio codecs should read this paper to see how continuous latent manifolds can bypass the massive compute bottleneck of iterative waveform-domain attacks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time security auditing, adversarial robustness benchmarking, and threat assessment for voice assistants and biometric authentication systems.

## Institutions / 機構

University of North Texas

## Related

- (link related pages by id as the wiki grows)
