---
id: pizarro26_interspeech
category: deepfake-security
institutions: ["Ruhr University Bochum", "LKA NRW", "Technische Universität Berlin"]
code: https://github.com/matiuste/RSF
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1361
pdf: https://www.isca-archive.org/interspeech_2026/pizarro26_interspeech.pdf
---

# Lightweight Detection and Model Attribution of Synthetic Speech via Residual Statistical Fingerprints

*Matías Pizarro, Mike Laszkiewicz, Dorothea Kolossa, Asja Fischer*

[PDF](https://www.isca-archive.org/interspeech_2026/pizarro26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pizarro26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1361)

**Category:** `deepfake-security`

**TL;DR** — The paper introduces Residual Statistical Fingerprints (RSFs)—a training-free, distance-based forensic method that isolates model-specific spectral artifacts using simple filters to perform synthetic speech detection, open-world single-model attribution, and out-of-domain rejection with an AUROC up to 1.00.

## Key contributions

- Proposed model-specific Residual Statistical Fingerprints (RSFs) derived via content-preserving frequency filtering to capture synthesis artifacts without requiring access to model architectures or parameters.
- Formulated single-model attribution, closed-world multi-model attribution, and out-of-domain detection into a unified covariance-aware Mahalanobis distance metric in the residual feature space.
- Enabled open-world single-model attribution requiring only target-model samples during training, eliminating the need for multi-model supervised label sets or retraining when new models emerge.
- Demonstrated data efficiency, showing that robust RSFs can be extracted using fewer than 100 audio samples per model.

## Problem

Modern speech generation tools (TTS, VC, neural codecs) produce highly realistic audio samples that are increasingly weaponized for identity fraud, unauthorized voice cloning, and disinformation campaigns. Existing defenses rely heavily on binary deepfake detection or closed-world multi-model classifiers (e.g., X-vectors, LCNNs, ResNets) trained on fixed label sets, failing to scale when deployed in open-world settings or when encountering previously unseen generative architectures. Furthermore, these black-box neural networks require extensive training data, lack forensic interpretability, and break completely when new synthesis models appear in the wild, necessitating costly full-network retraining.

## Method

The framework processes arbitrary-length audio by first computing log-magnitude short-time Fourier transforms (STFT) using an 8 ms window and 0.125 ms hop size, then averaging across time frames to yield a fixed-dimensional vector $Ex^{(i)} \in \mathbb{R}^F$ that suppresses phonetic variability.

To isolate generative artifacts, the method applies content-preserving filters. While neural compression via EnCodec (24 kHz) was tested, frequency-selective finite impulse response (FIR) equiripple filters designed via the Parks–McClellan algorithm proved superior—specifically low-pass filtering at a 1 kHz cutoff and band-pass filtering at 5–6 kHz. The residual embedding for sample $i$ is calculated as $R^{(i)} = E_{x}^{(i)} - E_{f}(x^{(i)})$, and the model's RSF ($\hat{F}$) is the empirical mean of residuals across $N$ training samples.

For inference, the framework computes the Mahalanobis distance $d_{md}(R_{test}, \hat{F}) = \sqrt{(R_{test} - \hat{F})^T \Sigma^{-1} (R_{test} - \hat{F})}$ using the empirical covariance matrix $\Sigma$ from training residuals. This covariance-aware scoring normalizes feature correlations. Open-world attribution uses a simple binary threshold on $d_{md}$, while closed-world multi-model attribution assigns the test sample to the minimum distance among known fingerprints $\{\hat{F}_m\}$.

## Experimental setup

Evaluated across four diverse speech corpora: Augmented LJSpeech (13,100 utterances, 10 synthesis models spanning GAN, diffusion, flow, and hybrid frameworks), JSUT (5,000 Japanese basic utterances with 2 WaveFake models), ASVspoof 2019 Logical Access (122k utterances, 107 speakers, 19 TTS/VC systems with 11 unseen systems in evaluation), and CodecFake (1.06M utterances including English VCTK and Chinese AISHELL3, covering 7 neural codec-based methods). Baselines included X-vectors, LCNNs, ResNets, SE-ResNets, and TADA ($k$-NN on wav2vec features). Evaluated via AUROC, AUPRC, classification accuracy, and F1-score.

## Results

On open-world single-model attribution, RSFs achieved near-perfect separation with 1.00 AUROC on A-LJSpeech and JSUT, and 0.99 average AUROC on ASVspoof LA. In closed-world multi-model attribution, an optional small CNN trained on residual features (RSF CNN) matched or exceeded all deep neural network baselines, hitting 1.00 accuracy across A-LJSpeech, JSUT, ASVspoof LA, and CodecFake. For out-of-domain detection on ASVspoof LA, the non-parametric RSF approach achieved an AUROC and AUPRC of 0.98, outperforming TADA (0.97) and standard neural models (0.79–0.93). The method does not win when evaluated against sophisticated adaptive projected gradient descent (PGD) attacks that have full access to model RSFs (achieving 1.00 success on CodecFake) and experiences performance drops under heavy reverberation (AUROC falling to 0.65–0.84), though simple data augmentation restores performance.

| System | A-LJSpeech (Acc/F1) | JSUT (Acc/F1) | ASVspoof LA (Acc/F1) | CodecFake (Acc/F1) |
|---|---|---|---|---|
| X-vector | 0.99 / 0.99 | 0.99 / 0.99 | 1.00 / 1.00 | 1.00 / 1.00 |
| LCNN | 0.98 / 0.98 | 0.98 / 0.98 | 1.00 / 1.00 | 0.98 / 0.98 |
| ResNet | 0.98 / 0.98 | 0.99 / 0.99 | 1.00 / 1.00 | 1.00 / 1.00 |
| SE-ResNet | 0.98 / 0.98 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| RSF (Ours - Distance) | 1.00 / 1.00 | 1.00 / 1.00 | 0.97 / 0.97 | 0.99 / 0.99 |
| RSF CNN (Ours) | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |

## Limitations

The method is vulnerable to advanced adaptive white-box attacks using projected gradient descent (PGD-2 success rate hits 1.00 on CodecFake when attackers optimize against known RSFs). Severe acoustic distortions like room reverberation significantly degrade raw attribution scores (AUROC drops to 0.65), requiring deliberate data augmentation and fingerprint re-estimation to recover robustness. Additionally, systems sharing identical underlying vocoders or quantization strategies (e.g., matching RVQ blocks or WORLD generators) show reduced discriminability.

## Why read this

Speech forensics and deepfake security researchers should read this to understand how training-free, distance-based statistical fingerprinting can supplant heavy supervised neural networks for model attribution while drastically reducing data requirements.

## Code

- https://github.com/matiuste/RSF

## Applications

Applied speech forensics, legal chain-of-evidence verification for forged audio, automated synthetic voice moderation in communications platforms, and speaker attribution for security auditing.

## Institutions / 機構

Ruhr University Bochum, LKA NRW, Technische Universität Berlin

**Funding / 經費:** Deutsche Forschungsgemeinschaft, Ministry of Culture and Science of North Rhine-Westphalia

## Related

- (link related pages by id as the wiki grows)
