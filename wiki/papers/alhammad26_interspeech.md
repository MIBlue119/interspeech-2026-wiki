---
id: alhammad26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2250
pdf: https://www.isca-archive.org/interspeech_2026/alhammad26_interspeech.pdf
---

# Interpretable Frequency-Band Attention with Gated SSL Fusion for Audio Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/alhammad26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alhammad26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2250)

**TL;DR** — BandMIL introduces a band-aware multiple instance learning framework that combines explicit frequency-band spectrogram analysis with WavLM self-supervised representations via gated fusion, achieving 1.28% EER on the ASVspoof 2019 LA benchmark.

## Problem

State-of-the-art audio deepfake detectors typically operate as monolithic end-to-end architectures or self-supervised black boxes, lacking explicit modeling of where spoofing artifacts reside in the frequency spectrum. Understanding frequency-level cues is critical to provide actionable debugging insights, target algorithm vulnerabilities, and build user trust in safety-critical verification systems. Existing sub-band methods often rely on rigid post-hoc score fusion or fail to provide a complementary global representation for attacks lacking localized spectral traces.

## Method

The architecture processes variable-length audio by segmenting utterances into 4-second overlapping windows handled by two branches. The band-level branch splits the 0–8 kHz spectrum into 8 overlapping bands, renders them as dB-normalized spectrogram images, encodes them using a shared modified ResNet-18 combined with 24 handcrafted per-band features, and pools them via learned attention weights. Simultaneously, the SSL branch extracts global temporal patterns using WavLM-Large with its final 12 transformer layers fine-tuned. A learned multi-layer perceptron gate adaptively fuses the two branch outputs element-wise per input. A multiple instance learning (MIL) framework with Log-Sum-Exp pooling aggregates window predictions during training (and top-k mean pooling during inference), supervised by a combined focal loss.

## Results

Evaluated on the ASVspoof 2019 logical access (LA) evaluation set containing unseen attacks (A07–A19), the full BandMIL model attains 1.28% EER and 0.0331 min t-DCF. This outperforms an SSL-only WavLM baseline yielding 1.73% EER and 0.0458 min t-DCF, as well as classical CQCC-GMM and RawNet2 models. Ablations confirm that the band branch achieves near-zero error on frequency-localized spoofing algorithms while struggling on certain voice conversion attacks, which are successfully compensated for by the SSL branch through adaptive gated fusion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and security researchers building auditable anti-spoofing countermeasures and automatic speaker verification security guards against voice conversion and text-to-speech synthetic attacks.

## Limitations

Certain attacks exhibit suboptimal gating weights where the gated fusion model underperforms both standalone individual branches.

## Related

- (link related pages by id as the wiki grows)
