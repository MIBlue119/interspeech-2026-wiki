---
id: shin26_interspeech
category: enhancement-separation
institutions: ["Seoul National University", "University of Iowa"]
code: https://github.com/argaaw/TRUST-TSE
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-595
pdf: https://www.isca-archive.org/interspeech_2026/shin26_interspeech.pdf
---

# Breaking Shortcut Learning for Cross-Trial EEG-Guided Target Speech Extraction via Two-Stage Training

*Wonchul Shin, Inyong Choi, Kyogu Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/shin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-595)

**Category:** `enhancement-separation`

**TL;DR** — TRUST-TSE is a two-stage training framework for EEG-guided target speech extraction that breaks shortcut learning caused by trial-specific EEG structures, raising cross-trial selection accuracy from 37.56% (NeuroHeed) to 62.27% on the KUL dataset.

## Key contributions

- Identifies and systematically analyzes cross-trial generalization failure in end-to-end EEG-guided target speech extraction due to trial-specific EEG shortcut learning.
- Proposes Stage 1 cross-modal contrastive pretraining with attended-speaker negative sampling to suppress trial identity cues and encourage fine-grained EEG-speech alignment.
- Introduces a confidence-weighted SI-SDR extraction objective (CWS) using EEG-source similarity margins to couple frozen representations and handle ambiguous segments.
- Demonstrates consistent cross-trial performance gains on both the KUL and DTU public datasets compared to end-to-end baselines like NeuroHeed and M3ANet.

## Problem

Recent end-to-end EEG-guided target speech extraction models report high within-trial performance, often claiming SI-SDR above 10 dB and attended-source accuracy near 90%. However, continuous EEG exhibits slow temporal drifts and high autocorrelation over seconds to minutes. This allows end-to-end models to exploit trial-specific nuisance patterns as shortcuts to identify the target speaker rather than decoding actual attention. Consequently, these models suffer severe performance degradation when evaluated under strict cross-trial protocols where training and test segments originate from completely different recording sessions.

## Method

TRUST-TSE decouples representation learning from waveform extraction via a two-stage training framework. In Stage 1, an EEG encoder (F_theta) and a mel-spectrogram audio encoder (H_psi) are pretrained via a contrastive loss (L_NCE) with temperature tau = 0.07. To prevent trial-identity shortcuts, the authors introduce attended-speaker negative sampling, where negative audio segments are drawn from non-aligned blocks spoken by the *same* attended speaker within the same trial. Both encoders use lightweight convolutional structures. L2-normalized embeddings at time step t are computed across a shared D-dimensional space, with audio embeddings linearly interpolated to match the temporal resolution of the EEG sequence.

In Stage 2, the pretrained EEG encoder is frozen to prevent drift toward shortcut cues, and a time-domain Dual-Path RNN (DPRNN) speech extractor (G_phi) maps a mixed waveform and the frozen EEG embedding to target speech. Conditioning is applied by linearly interpolating the EEG sequence and using channel-wise concatenation. To mitigate unstable gradients from ambiguous EEG guidance, Stage 2 optimizes a confidence-weighted SI-SDR objective (L_CWS). The similarity margin delta = s(z, a_att) - s(z, a_ign) is converted via a tanh weighting function with sharpness parameter kappa = 5. Segments where the embedding aligns more closely with the ignored source (negative weights) retain their magnitude to train the extractor to remain responsive without dropping data.

## Experimental setup

Evaluated on two public auditory attention datasets: KUL (16 subjects, 64-channel EEG, 8 trials per subject of ~6 mins, Dutch speech) and DTU (18 subjects, 64-channel EEG, 60 trials per subject of 50 s, Danish speech). Evaluated using strict 4-fold cross-trial protocols (trial-level splits avoiding data leakage). Compared against end-to-end baselines NeuroHeed and M3ANet. Metrics include target selection accuracy (%), SI-SDRatt-All, SI-SDRatt-Correct, and SI-SDRign-Wrong. Stage 1 is trained for up to 50 epochs using AdamW (lr 5e-4, batch size 64). Stage 2 is trained for up to 100 epochs using AdamW (lr 3e-4, batch size 8).

## Results

Under strict cross-trial evaluation with 5 s windows on the KUL dataset, TRUST-TSE achieves a selection accuracy of 62.27%, significantly outperforming M3ANet (48.42%) and NeuroHeed (37.56%), while reaching an SI-SDRatt-Correct of 15.23 dB. On the DTU dataset, TRUST-TSE reaches 70.40% accuracy and an SI-SDRatt-Correct of 19.21 dB, compared to NeuroHeed's 55.79% and M3ANet's 50.23%. Ablation studies confirm that attended-speaker negative sampling yields the most robust pretraining selection accuracy (65.62% on KUL) compared to in-batch (64.05%) or ignored-speaker sampling (39.63%). Furthermore, the confidence-weighted positive-and-negative tanh objective outperforms non-weighted (39.07%) and positive-only variants (42.73%) on KUL.

| System | Accuracy (%) | SI-SDRatt-All (dB) | SI-SDRatt-Correct (dB) |
|---|---|---|---|
| NeuroHeed (KUL) | 37.56 | -12.09 | 9.52 |
| M3ANet (KUL) | 48.42 | -0.19 | 3.62 |
| TRUST-TSE (KUL, Ours) | 62.27 | 0.26 | 15.23 |
| NeuroHeed (DTU) | 55.79 | 0.08 | 10.40 |
| M3ANet (DTU) | 50.23 | -0.57 | 4.83 |
| TRUST-TSE (DTU, Ours) | 70.40 | 4.85 | 19.21 |

## Limitations

The evaluation is restricted to modest public EEG datasets (KUL and DTU) featuring limited speaker and language diversity. While the framework suppresses trial-specific shortcuts, broader multi-session deployment data, cross-device electrode shifts, and unseen-subject domain shifts remain challenging real-world bottlenecks.

## Why read this

Speech and ML researchers building neuro-steered hearing aids should read this paper to understand how within-trial evaluation protocols artificially inflate speech extraction performance, and how a two-stage contrastive framework resolves this reliability gap.

## Code

- https://github.com/argaaw/TRUST-TSE

## Applications

Neuro-steered hearing aids, brain-computer interfaces, and selective auditory attention prosthetics.

## Institutions / 機構

Seoul National University, University of Iowa

**Funding / 經費:** National Research Foundation of Korea, Institute of Information & Communications Technology Planning & Evaluation

## Related

- [SAGE: Switch-Aware EEG-Guided Soft Gating for Target Speaker Extraction with In-Trial Switching](wang26p_interspeech.md) — same problem · relatedness 2.3/3
- [NeuroMultiSpEx: Neuro-Guided Target Speaker Extraction for Multi-Speaker Scenarios](silva26_interspeech.md) — same problem · relatedness 2.2/3
- [TGTSE: Token-Guided Target Speaker Extraction with Visual Cue](ling26_interspeech.md) — same problem · relatedness 2.1/3
- [WeSep: A Modular and Cue-Composable Framework for Target Speaker Extraction](zhang26k_interspeech.md) — same problem · relatedness 2.1/3
- [SPOT-TSE: Spatial Point-Guided Target Speech Extraction](ryu26c_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
