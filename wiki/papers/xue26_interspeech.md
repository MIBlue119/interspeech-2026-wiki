---
id: xue26_interspeech
category: deepfake-security
institutions: ["Army Engineering University of PLA", "Chinese University of Hong Kong", "Information Support Force Engineering University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-105
pdf: https://www.isca-archive.org/interspeech_2026/xue26_interspeech.pdf
---

# Imperceptible Voiceprint Protection via Human-Machine Perception Discrepancy Feature Disentanglement

*Chenlong Xue, Meng Sun, Qiang Zhang, Xiongwei Zhang, Kunyuan Li, Yuan Liao, Xiaoyi Ge, Kui Yao*

[PDF](https://www.isca-archive.org/interspeech_2026/xue26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xue26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-105)

**Category:** `deepfake-security`

**TL;DR** — A two-stage adversarial protection framework isolates speaker identity from linguistic content via an information bottleneck and injects imperceptible perturbations into the speaker embedding space, achieving an 87.2% defense success rate against voice cloning while maintaining high audio quality (MOS 4.18).

## Key contributions

- A two-stage disentanglement-reconstruction framework that separates content codes and speaker embeddings to prevent perturbation leakage into linguistic features.
- A speaker-embedding-space perturbation generator combined with time-frequency psychoacoustic masking constraints to target machine sensitivity without human perceptual degradation.
- Superior white-box defense success rate (87.2% at tau=0.5) and robust black-box transferability across unseen voice cloning architectures (YourTTS, VALL-E, AdaptVC).

## Problem

Existing voice cloning defenses suffer from a strict trade-off: waveform-level and frequency-domain signal perturbations either introduce audible artifacts or get stripped by audio preprocessing, while unconstrained embedding-space perturbations entangle with content features and ruin speech intelligibility. Prior methods also fail to generalize well when transferred to unseen black-box cloning systems. Solving this is critical to protect individuals from unauthorized voice cloning, financial fraud, and identity spoofing.

## Method

The framework operates in two distinct stages. Stage 1 trains an AutoVC-based disentanglement network using a content encoder (3 convolutional layers plus a bidirectional LSTM with a bottleneck dimension of 32) and a speaker encoder (finetuned GE2E) to decompose mel-spectrograms ($x \in \mathbb{R}^{T \times 80}$) into downsampled content codes ($c \in \mathbb{R}^{T' \times 32}$) and speaker embeddings ($h \in \mathbb{R}^{256}$). An adversarial entropy maximization loss ($L_{dis}$) forces content codes to yield a uniform speaker classification distribution, preventing speaker identity leakage.

Stage 2 freezes the Stage 1 network and trains a generator $G(\cdot)$ to produce perturbations $\delta = G(h)$, yielding a protected embedding $h_{adv} = h + \alpha \cdot \delta$ (with scaling factor $\alpha = 0.10$). The protected mel-spectrogram $x_{adv} = D(c, h_{adv})$ is synthesized into audio via a HiFi-GAN vocoder. The multi-objective generator loss comprises a mel-spectrogram loss ($L_{mel}$), a psychoacoustic masking loss ($L_{mask}$) constrained against the MPEG psychoacoustic threshold $\theta_x(k)$, an LSGAN realism loss ($L_{GAN}$), and a defense loss ($L_{de}$) that minimizes cosine similarity between speech cloned from the stolen embedding and the original speaker.

Key hyperparameters include training Stage 1 for 500k iterations ($\lambda_{cd} = 1.0, \lambda_{dis} = 0.01$) and Stage 2 for 200k iterations ($\alpha = 0.10, \lambda_{per} = 15.0, \lambda_{de} = 5.0, \lambda_{mask} = 0.1$). This design ensures perturbations strictly target machine-vulnerable subspaces while remaining imperceptible to human ears.

## Experimental setup

Evaluated on the VCTK corpus containing 110 English speakers resampled to 16kHz (80 for training, 10 for validation, 20 for testing, with 100 utterances per test speaker). Compared against time-domain baselines (Gaussian Noise, Voice Guard, CloneShield), frequency-domain baselines (VocalCrypt), and embedding-space baselines (MI-FGSM, RoVo). Metrics include Simprot (identity preservation), Simclone (cloning similarity), Defense Success Rate (DSR) at thresholds $\tau \in \{0.3, 0.4, 0.5\}$, Mean Opinion Score (MOS) rated by 50 listeners, and Word Error Rate (WER) using Whisper-large.

## Results

The proposed method achieves a white-box DSR of 87.2% at $\tau = 0.5$, outperforming RoVo (79.2%) and Voice Guard (79.8%), while maintaining a high MOS of 4.18 and a low WER of 5.30%. Simprot reaches 0.95 and Simclone drops to 0.13. Ablations show that removing the defense loss ($L_{de}$) causes DSR to collapse to 12.5%, whereas removing the psychoacoustic masking loss ($L_{mask}$) drops MOS from 4.18 to 3.38 and raises WER to 8.92%, confirming the necessity of psychoacoustic constraints. In black-box cross-architecture evaluations, the method maintains superior DSR across YourTTS, VALL-E, and AdaptVC compared to signal-level and baseline embedding defenses.

| Method | Domain | Simprot $\uparrow$ | Simclone $\downarrow$ | DSR(%) $\tau=0.5$ $\uparrow$ | MOS $\uparrow$ | WER(%) $\downarrow$ |
|---|---|---|---|---|---|---|
| Original | – | 1.00 | 0.91 | 0.0 | 4.53 | 4.78 |
| Voice Guard | Time | 0.87 | 0.18 | 79.8 | 3.52 | 10.25 |
| VocalCrypt | Freq. | 0.88 | 0.21 | 74.6 | 3.58 | 8.95 |
| RoVo | Emb. | 0.89 | 0.18 | 79.2 | 3.72 | 7.15 |
| Ours | Emb. | 0.95 | 0.13 | 87.2 | 4.18 | 5.30 |

## Limitations

The evaluation is restricted to clean English speech from the VCTK corpus and evaluated primarily against specific open-source cloning architectures (AutoVC, YourTTS, VALL-E, AdaptVC). The paper does not evaluate robustness against adaptive attacks where the attacker knows the exact defense mechanism, nor does it test performance under real-world acoustic degradations like lossy audio compression or environmental noise.

## Why read this

Speech and security researchers looking to balance adversarial defense efficacy and perceptual transparency should read this to see how feature disentanglement and psychoacoustic constraints solve embedding-space vulnerability trade-offs.

## Code

- https://cero529.github.io/voiceprint-protection-demo/

## Applications

Voice data privacy protection, pre-emptive defense against zero-shot voice cloning, and anti-spoofing watermarking for personal audio.

## Institutions / 機構

Army Engineering University of PLA, Chinese University of Hong Kong, Information Support Force Engineering University

**Funding / 經費:** National Natural Science Foundation of China, Natural Science Foundation of Jiangsu Province, China Postdoctoral Science Foundation

## Related

- (link related pages by id as the wiki grows)
