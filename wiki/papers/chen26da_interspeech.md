---
id: chen26da_interspeech
category: self-supervised-learning
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2873
pdf: https://www.isca-archive.org/interspeech_2026/chen26da_interspeech.pdf
---

# Spectro-Temporal Interference Confounds Phase Encoding in Spatial Audio Foundation Models

[PDF](https://www.isca-archive.org/interspeech_2026/chen26da_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26da_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2873)

**TL;DR** — A psychoacoustic evaluation using the binaural masking level difference reveals that general-purpose spatial self-supervised audio models rely on spectro-temporal interference textures rather than genuine microsecond interaural phase computation.

## Problem

Current spatial self-supervised models achieve high performance on macroscopic localization tasks, but it remains unknown whether they extract the microsecond interaural phase cues governing human spatial hearing or simply exploit superficial statistical regularities. Evaluating this is critical because downstream task success does not guarantee human-like internal mechanisms or genuine cross-channel phase encoding.

## Method

The study evaluates nine frozen audio models—including binaural SSL models (WavJEPA, GRAM-T, Spatial-AST, DSpAST), neural audio codecs (EnCodec, DAC), and monaural SSL models (HuBERT-Large, WavLM-Large, Wav2Vec2-Large)—using a psychoacoustic benchmark based on the binaural masking level difference (BMLD). Inputs are processed at 16 kHz with bit-exact noise sharing across conditions to eliminate physical variance. The authors use an analytical equalization-cancellation (EC) baseline, a GCC-PHAT positive control, and progressive physical ablations (high-pass filtering above 2 kHz, short-time Fourier transform/Mel energy equalization, and 50 Hz temporal fine structure vocoding) to isolate the detection mechanism.

## Results

At 500 Hz and -14 dB SNR, the analytical EC baseline yields +15.7 dB separation, whereas WavJEPA and GRAM-T achieve deficits of x31 (+0.5 dB) and x7.5 (+2.1 dB), respectively. Spatial-AST and DSpAST reach +6.8 dB and +7.0 dB, demonstrating partial cross-channel phase sensitivity, while EnCodec achieves +7.0 dB. Monaural negative controls uniformly produce exactly 0.0 dB BMLD, confirming binaural specificity. Physical ablations show that GRAM-T and EnCodec maintain 100% detection under high-pass filtering and Mel energy equalization, but collapse under temporal fine structure vocoding (GRAM-T to 75%, EnCodec to 20%), proving reliance on fast envelope textures rather than phase fine structure.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers designing spatial audio foundation models, binaural self-supervised learning architectures, or hearing aid algorithms can use these findings to build models with genuine phase-aware constraints rather than shortcut heuristics.

## Related

- (link related pages by id as the wiki grows)
