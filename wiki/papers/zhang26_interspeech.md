---
id: zhang26_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-87
pdf: https://www.isca-archive.org/interspeech_2026/zhang26_interspeech.pdf
---

# AURA: Audio-Geometry Conditioned U-Net Refinement with Flow Matching for High-Fidelity Monaural-to-Binaural Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-87)

**TL;DR** — AURA is a two-stage binaural audio synthesis framework combining a hybrid U-Net coarse estimator with conditional flow matching refinement, achieving a Wave-L2 score of 0.123 on monaural-to-binaural speech rendering.

## Problem

Generating realistic binaural audio from a single monaural recording requires inferring missing spatial cues like direction and distance while preserving timbral fidelity and environmental acoustics. Traditional HRTF measurements are rigid and expensive, whereas existing neural networks struggle to capture fine-grained spatial micro-cues and dynamic environmental noise without artificial artifacts.

## Method

AURA processes time-dynamic warped monaural audio through a two-stage pipeline. The first stage uses a Transformer-CNN Downsample Block (TCDB) and Spatial-Enhanced Residual Upsample Blocks (SERUB) alongside a Spatial-Awareness and Motion Attention (SAMA) mechanism to predict a coarse binaural estimate conditioned on source position and quaternion orientation. The second stage uses conditional flow matching with an optimal transport path to refine the coarse output, injecting stochastic background details and subtle spatial micro-cues. The model is trained using a composite loss combining waveform L2, STFT phase error, STFT amplitude error, and flow matching velocity loss.

## Results

Evaluated on a 2-hour dataset of recorded speech paired with mannequin-tracked listener motion at 48 kHz, AURA outperforms baselines including WarpNet, BinauralGrad, NFS, and DPATFNet. Quantitatively, it achieves a Wave-L2 of 0.123, Amp-L2 of 0.028, and Phase-L2 of 0.843. In subjective listening tests with 15 participants, AURA reaches an overall MOS of 3.82, Spatialization MOS of 3.89, and Similarity MOS of 4.21.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers building virtual reality, mixed reality, and telepresence systems where monaural voice feeds need real-time immersive spatial rendering.

## Related

- (link related pages by id as the wiki grows)
