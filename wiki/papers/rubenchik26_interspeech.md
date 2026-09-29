---
id: rubenchik26_interspeech
category: enhancement-separation
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1401
pdf: https://www.isca-archive.org/interspeech_2026/rubenchik26_interspeech.pdf
---

# Latent Flow Matching Based Speech Separation Using Speaker Diarization

*Boris Rubenchik, Sharon Gannot, Ethan Fetaya*

[PDF](https://www.isca-archive.org/interspeech_2026/rubenchik26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rubenchik26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1401)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — A generative single-channel speech separation framework combining latent-space Flow Matching with End-to-End Neural Diarization (EEND) mixture-derived attractors, achieving a dramatic reduction in speaker confusion (TSIM down to 0.08%).

## Key contributions

- Integrates EEND-EDA speaker attractors and activity probabilities to condition a latent-space Flow Matching separator without requiring any explicit external enrollment signal.
- Introduces Adversarial Speaker Guidance (ASG), a training-free inference mechanism that negatively conditions the flow model using the interfering speaker's velocity to prevent target confusion.
- Adopts Permutation Aware Training (PIT) within the latent flow-matching framework to resolve speaker permutation ambiguities inherent in blind source separation.
- Demonstrates that mixture-derived EEND attractors drastically outperform traditional ECAPA-TDNN speaker embeddings, cutting transcription similarity (TSIM) failure rates by up to two orders of magnitude.

## Problem

Discriminative regression-based separation networks often suffer from statistical over-smoothing and perceptual artifacts due to pointwise distance minimization. Meanwhile, generative speech separation and extraction models frequently exhibit speaker or target confusion—ignoring the conditioning signal to extract the same dominant speaker repeatedly. Traditional enrollment-based conditioning (such as ECAPA-TDNN) relies on auxiliary audio clips and fails to robustly differentiate overlapping speakers within a single acoustic mixture, highlighting the need for representations specifically optimized for mixture speaker discrimination.

## Method

The architecture keeps a pretrained vocoder, mel-spectrogram VAE, and an EEND-EDA model completely frozen, training only a lightweight latent U-Net Flow Matching model. The 16 kHz input mixture is downsampled to 8 kHz to feed the EEND model, which extracts frame-level activity probabilities and speaker attractors; these are temporally pooled to form a compact conditioning vector injected via Feature-wise Linear Modulation (FiLM). The VAE encoder generates a latent mixture representation that is concatenated with Gaussian noise of identical dimensions to initialize the iterative flow matching process.

The Conditional Flow Matching (CFM) loss is optimized using Permutation Aware Training (PIT) to handle permutation ambiguities across reference sources. During inference, chunking with a 50% overlap and crossfaded overlap-and-add is applied for inputs exceeding 10.24 seconds. To eliminate speaker confusion without retraining, the method introduces Adversarial Speaker Guidance (ASG), combining the target speaker velocity, unconditional velocity, and the interfering speaker's estimated velocity via a weighted formula where the null guidance weight is set to 0.5 and the negative adversarial weight is set to 1.0.

## Experimental setup

Trained on LibriSpeech mixtures dynamically generated with Signal-to-Interference Ratios (SIR) ranging from -5 dB to 5 dB, using 10.24-second segments. Evaluated on the LibriMix 16kHz min-configuration test set. Compares against SoloSpeech, DiffSep+SV, DDTSE, and an ablation variant using ECAPA-TDNN enrollment embeddings (ECAPAv). Evaluated via DNSMOS, OVRL, Word Error Rate (WER using Whisper-small), Speaker Similarity (SIM), and Transcription Similarity (TSIM) to detect separation failure.

## Results

The proposed latent flow matching model achieves an OVRL score of 3.20 and a DNSMOS of 3.76, nearly matching heavy sample-space generative baselines while operating more efficiently. In terms of intelligibility, the proposed model scores a 13.26% WER, outperforming the ECAPA-TDNN extraction baseline (19.48% WER). When evaluating target confusion via the TSIM metric, the proposed EEND-conditioned model drops to 0.08%, outperforming the ECAPAv variant (9.7%) by roughly two orders of magnitude and SoloSpeech (0.8%) by an order of magnitude. Ablations show that adding ASG consistently improves speech quality and lowers speaker confusion across both EEND- and ECAPA-based variations.

| Name | E/S | OVRL | DNSMOS | WER | SIM | TSIM |
|---|---|---|---|---|---|---|
| Mixture | - | 2.63 | 3.41 | - | 0.54 | - |
| Sources | - | 3.26 | 3.78 | 5.95 | - | - |
| Ours | S | 3.20 | 3.76 | 13.26 | 0.81 | 0.08 |
| Ours - G | S | 3.15 | 3.68 | 13.52 | 0.81 | 0.14 |
| ECAPAv | E | 3.20 | 3.77 | 19.48 | 0.77 | 9.7 |
| SoloSpeech | E | 3.29 | 3.85 | 9.30 | 0.89 | 0.8 |

## Limitations

The framework inherits limitations from its frozen components, such as the EEND model operating at 8 kHz which requires downsampling 16 kHz mixtures. The evaluation is restricted to clean two-speaker LibriMix scenarios, leaving out-of-domain noise robustness, arbitrary multi-speaker counts beyond two, and real-world acoustic reverberation for future work. Furthermore, the approach assumes attractor discriminability is clean and does not explicitly quantify how diarization segmentation errors propagate into the latent separator.

## Why read this

Researchers and engineers building generative speech separation or extraction pipelines should read this paper to see how replacing standard enrollment embeddings with EEND-EDA mixture attractors and applying Adversarial Speaker Guidance can eliminate speaker confusion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Single-channel multi-talker speech separation, meeting transcription preprocessing, and cocktail-party problem mitigation for downstream automatic speech recognition systems.

## Institutions / 機構

Bar-Ilan University

**Funding / 經費:** Israel Science Foundation, German Research Foundation, ISF-DFG Joint Research Program, AUDIENCE: Audio-Visual Analysis and Separation, Council of Higher Education, Israel

## Related

- (link related pages by id as the wiki grows)
