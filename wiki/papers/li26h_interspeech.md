---
id: li26h_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-615
pdf: https://www.isca-archive.org/interspeech_2026/li26h_interspeech.pdf
---

# SRF-SVB: Style-Consistent Singing Voice Beautifying via Rectified Flow

[PDF](https://www.isca-archive.org/interspeech_2026/li26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-615)

**TL;DR** — SRF-SVB is a rectified flow-based singing voice beautifying model that corrects pitch and rhythm while preserving singer timbre, achieving state-of-the-art objective and subjective scores across English and Chinese test sets.

## Problem

Current singing voice beautifying (SVB) methods either focus solely on pitch correction while ignoring rhythm and expression, or sacrifice the amateur singer's unique timbre and expressive style in pursuit of professional vocal quality. Furthermore, existing generative approaches often rely on scarce parallel amateur-professional training data or struggle with high generation quality and efficient inference.

## Method

The framework uses rectified flow with a Diffusion Transformer (DiT) backbone to transport noise to target mel-spectrogram distributions via straight ODE trajectories over 10 sampling steps using Euler's method. It decouples acoustic attributes into pitch (extracted via RMVPE), timbre (extracted via CAM++), content (PPG from a pre-trained Conformer), and a valid frame mask. A context-guided masked mel-spectrogram inpainting mechanism masks the target generation region with a consecutive masking ratio alpha=0.5, utilizing amateur audio context and professional target guidance aligned via Dynamic Time Warping (DTW). The model is trained on 160 hours of multi-source Chinese and English singing datasets for 500k steps using an AdamW optimizer on a single RTX 4090 GPU.

## Results

Evaluated on an English test set (617 pairs) and a Chinese test set (874 pairs) against Diff-Pitcher and NSVB baselines, SRF-SVB achieves a Raw Pitch Accuracy (RPA) of 0.57 (English) and 0.50 (Chinese), outperforming Diff-Pitcher and NSVB. It scores highest in Speaker Embedding Cosine Similarity (SECS) at 0.85 (English) and 0.82 (Chinese), compared to NSVB's 0.58 and 0.40. In subjective evaluations, it secures top scores in Quality MOS (MOS-Q: 3.91 English, 3.62 Chinese) and Similarity MOS (MOS-S: 4.47 English, 4.06 Chinese). Ablations confirm that consecutive masking with alpha=0.5 outperforms random masking and smaller alpha ratios.

## Code

- https://mrwho729.github.io/SRF-SVB/

## Applications

Professional music production and online karaoke systems needing automated pitch and rhythm correction while retaining the original user's voice identity.

## Limitations

The generative reconstruction process can occasionally impact pronunciation clarity, resulting in slightly higher Character Error Rates.

## Related

- (link related pages by id as the wiki grows)
