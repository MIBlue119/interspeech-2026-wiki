---
id: khanagha26_interspeech
category: enhancement-separation
labels: [self-supervised]
institutions: ["University of Hamburg"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2707
pdf: https://www.isca-archive.org/interspeech_2026/khanagha26_interspeech.pdf
---

# Your U-Net Dereverberation Model is Secretly an RIR Encoder

*Sina Khanagha, Timo Gerkmann*

[PDF](https://www.isca-archive.org/interspeech_2026/khanagha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khanagha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2707)

**Category:** `enhancement-separation` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates how U-Net based speech dereverberation models implicitly learn room impulse response (RIR) representations, and proposes explicitly conditioning them on pre-trained contrastive RIR embeddings to achieve up to 0.28 PESQ gains while requiring fewer inference steps.

## Key contributions

- Demonstrates that mid-to-deep layers of NCSN++ U-Net dereverberation models (both diffusion and discriminative) implicitly encode structured, RIR-dependent representations that correlate with performance.
- Proposes a self-supervised contrastive learning framework using InfoNCE and hard-negative mining to train standalone RIR encoders (ResNet34 and Conformer variants) invariant to speech content.
- Introduces Feature-wise Linear Modulation (FiLM) conditioning to inject pre-trained RIR embeddings into BigGAN residual blocks of the NCSN++ U-Net backbone.
- Shows that RIR conditioning accelerates training convergence, improves latent representation separation, and significantly reduces the required reverse diffusion steps (N) at inference.

## Problem

Single-channel speech dereverberation typically relies on DNNs trained via supervised regression or diffusion processes (like SGMSE+), but the theoretical justification for applying generative diffusion models to deterministic convolutional reverberation remains ambiguous. While diffusion models perform well by conditioning on reverberant input channels at every step, the internal mechanisms by which they handle acoustic room geometry were previously unexplored. Understanding and improving these internal representations is critical because standard diffusion baselines are bottlenecked by slow inference schedules and reliance on exponential moving averages (EMA) for stable training.

## Method

The authors train standalone RIR encoders using a contrastive setup with an InfoNCE loss combined with a hard negative-pair loss. Positive pairs are created by convolving two distinct clean speech utterances with the same RIR, while hard negatives use the same utterance convolved with two different RIRs to enforce speech content invariance. The encoders map inputs to 2-dimensional l2-normalized embeddings via ResNet34 or 10-layer Conformer architectures (256 hidden units, 4 heads), optimized using AdamW (lr 10^-4, weight decay 10^-2, batch size 16) for 200 epochs.

For dereverberation, the NCSN++ U-Net backbone (SGMSE+ setup with 27.8M parameters) is modified to incorporate Feature-wise Linear Modulation (FiLM). RIR embeddings are normalized via LayerNorm, projected linearly, and split into channel-wise scaling (gamma) and shifting (beta) parameters. FiLM layers are injected into every BigGAN residual block after the second normalization layer. To ensure stable optimization, FiLM weights and biases are zero-initialized with bounded scaling (gamma = 1 + 0.1 tanh(gamma_raw), beta = 0.1 beta_raw), allowing the model to be trained successfully without exponential moving average (EMA), unlike the standard SGMSE+ baseline.

## Experimental setup

Evaluated on the VCTK-Reverb dataset containing ~44 hours of 16 kHz audio (103 training speakers, 2 validation, 2 testing), convolved with approximately 10K real RIRs split 0.9/0.05/0.05. Baselines include standard SGMSE+ and discriminative NCSN++ (both 27.8M parameter M configurations). Metrics reported are wide-band PESQ and DNSMOS across various reverse diffusion inference steps (N = 15, 30, 50, 100). A secondary dataset of 950 samples is used exclusively for t-SNE embedding visualizations.

## Results

Equipping SGMSE+ with Conformer RIR embeddings yields consistent PESQ improvements of 0.17, 0.24, 0.27, and 0.28 across reverse diffusion steps N=15, 30, 50, and 100 respectively compared to the unconditioned SGMSE+ baseline. Similar positive trends are observed on the DNSMOS metric for both ResNet34- and Conformer-conditioned models. Furthermore, removing EMA from the standard SGMSE+ baseline severely harms convergence and performance, whereas the proposed RIR conditioning strategy stabilizes optimization without requiring EMA.

| System | PESQ (N=15) | PESQ (N=50) | DNSMOS |
|---|---|---|---|
| SGMSE+ (Baseline) | -- | 2.62 | -- |
| NCSN++ (Discriminative) | -- | 2.77 | -- |
| SGMSE+ w/ ResNet34 Embs. | -- | 2.86 | -- |
| SGMSE+ w/ Conformer Embs. | -- | 2.89 | -- |

## Limitations

The study is restricted to single-channel dereverberation evaluated on simulated VCTK-Reverb mixtures using 16 kHz audio. The approach relies on pre-trained RIR encoders requiring external RIR collections, and the evaluation does not test cross-dataset generalization to wildly mismatched acoustic environments (e.g., extremely large concert halls or highly unusual dampening materials).

## Why read this

Speech and ML researchers working on diffusion-based audio generation or acoustic modeling should read this to understand how U-Net backbones implicitly learn environmental geometry, and how explicit latent conditioning can bypass training instabilities and reduce inference steps.

## Code

- https://github.com/sp-uhh/rir-encoder

## Applications

Single-channel speech enhancement, robust automatic speech recognition front-ends, and teleconferencing systems operating in reverberant rooms.

## Institutions / 機構

University of Hamburg

**Funding / 經費:** Deutsche Forschungsgemeinschaft

## Related

- (link related pages by id as the wiki grows)
