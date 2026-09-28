---
id: ye26e_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3341
pdf: https://www.isca-archive.org/interspeech_2026/ye26e_interspeech.pdf
---

# OPERA-Net: Octave-aware Phase-sensitive Enhanced Recognition Architecture for Singing Voice Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/ye26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ye26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3341)

**TL;DR** — OPERA-Net is a dual-stream singing voice deepfake detection architecture that combines phase-consistent time-frequency representations with semantic-guided gating, achieving a state-of-the-art pooled equal error rate of 1.54% on the CtrSVDD dataset.

## Problem

State-of-the-art speech spoofing detectors fail significantly when applied to singing voices due to dense background music interference and a reliance on magnitude-only spectra that discard critical phase anomalies. Singing audio features wide dynamic ranges, vibrato, and complex harmonic structures, while neural vocoders often leave distinct phase discontinuity artifacts that sound metallic. Existing countermeasures either lack high-frequency resolution or suffer from severe acoustic masking caused by instrumental accompaniment.

## Method

OPERA-Net introduces a dual-stream architecture comprising a Phase-Consistent CQT (PC-CQT) stream and a semantic stream. The PC-CQT stream stacks log-magnitude spectra and instantaneous frequency (IF) derivatives (unwrapped temporal phase differences) channel-wise into a tensor fed to a lightweight ResNet-18 encoder. The semantic stream employs a WavLM Base+ model with the bottom 6 layers frozen and top 6 layers fine-tuned. A Semantic-Guided Gating mechanism uses a soft attention mask generated via an MLP and sigmoid function from the WavLM features to element-wise gate the PC-CQT signal features, suppressing non-vocal polyphonic noise and amplifying vocal forgery traces. The refined features are concatenated and classified using a two-layer fully connected head with a weighted cross-entropy loss.

## Results

Evaluated on the controlled CtrSVDD benchmark (attacks A09-A13) and the in-the-wild SingFake dataset across splits T01 (seen singers), T02 (unseen singers), and T03 (unseen codecs). On CtrSVDD, OPERA-Net achieves a pooled EER of 1.54%, outperforming the SVDD 2024 Challenge champion Fosafer Speech (1.65%) and establishing superior performance on the challenging diffusion-based attack A12 (3.85% EER). On SingFake, it attains an overall EER of 4.72%, outperforming domain-specific baselines like SingGraph (6.05%). Ablations demonstrate that adding phase information drops the CtrSVDD EER from 2.85% (WavLM + magnitude CQT) down to 1.82%, and the semantic-guided gating further reduces it to 1.54%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building audio forensics, anti-spoofing systems, and content moderation tools to detect copyright infringement, voice impersonation, and misinformation from synthetic singing.

## Related

- (link related pages by id as the wiki grows)
