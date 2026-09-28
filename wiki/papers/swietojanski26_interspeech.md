---
id: swietojanski26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-341
pdf: https://www.isca-archive.org/interspeech_2026/swietojanski26_interspeech.pdf
---

# Segmental Attention Decoding With Long Form Acoustic Encodings

[PDF](https://www.isca-archive.org/interspeech_2026/swietojanski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/swietojanski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-341)

**TL;DR** — This paper resolves the permutation invariance and boundary artifact failures of attention-based encoder-decoder models on long-form speech, closing the accuracy gap between segmented and continuous audio encodings.

## Problem

Attention-based encoder-decoder (AED) models trained on segmented utterances implicitly learn absolute positions from boundary effects where acoustic context is absent. When applied to long-form audio streams, these boundary cues vanish, causing cross-attention permutation invariance to fail, resulting in repetitive transcription loops and an inability to emit end-of-sentence tokens. This fundamental incompatibility restricts full auto-regressive attention decoding in long-form scenarios, forcing reliance on multi-pass rescoring or external windowing hacks.

## Method

The authors propose four targeted modifications: 1) injecting explicit absolute positional encodings directly into the cross-attention keys and values for each segment, 2) expanding acoustic context during training to eliminate reliance on short-form boundary artifacts, 3) segment concatenation to expose the model to diverse segmentations, and 4) adding a CTC semantic segmentation head to identify sentence boundaries instead of relying on voice activity detection. The models use a CTC-AED hybrid architecture comprising causal Conformer encoders and a lightweight 18M-parameter unidirectional transformer decoder. Two variants are evaluated: Ours.base (90M parameters total, 12 encoder blocks) and Ours.small (240M parameters total, 28 encoder blocks), sharing 512 hidden dimensions and 8 attention heads.

## Results

Evaluated primarily on the TED-LIUM 3 long-form test set alongside LibriSpeech, CommonVoice, and Earnings21, the baseline AED model suffers catastrophic degradation on long-form acoustic encodings with attention decoding WER exploding to 14.5%. Combining all proposed modifications (segment concatenation, acoustic context expansion, positional encodings, and semantic segmentation) successfully closes this performance gap, achieving parity between short-form and long-form decoding modes. The system maintains competitive accuracy across attention rescoring, pure attention decoding, and joint CTC-attention modes compared to similarly sized models while avoiding repetitive token insertion errors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building end-to-end speech recognition systems that require robust, streaming, or long-form auto-regressive attention decoding without relying on external VAD segmentation.

## Limitations

The approach relies on fixed left and right conformer look-back and look-ahead context windows during training to regulate receptive fields.

## Related

- (link related pages by id as the wiki grows)
