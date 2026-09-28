---
id: eom26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3190
pdf: https://www.isca-archive.org/interspeech_2026/eom26_interspeech.pdf
---

# Transcript-Free Flow-Matching Text-to-Speech via Speech Feature Conditioning

[PDF](https://www.isca-archive.org/interspeech_2026/eom26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/eom26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3190)

**TL;DR** — RTFree-F5 replaces text-based reference conditioning in F5-TTS with continuous self-supervised speech representations via a lightweight adapter, reducing word error rate on dysarthric speech from 24.6% to 10.4%.

## Problem

Current zero-shot flow-matching and diffusion TTS models rely heavily on external ASR transcripts of reference audio to guide style and voice cloning. For accented, non-native, or dysarthric speakers, ASR errors degrade output quality, and text-based conditioning can propagate atypical acoustic patterns into the generated speech.

## Method

The authors propose RTFree-F5, which extracts frame-level representations from a reference waveform using a frozen WavLM-Large encoder and maps them into the F5-TTS text-conditioning space using a lightweight two-layer MLP projector with LayerNorm. The projected speech features are concatenated along the temporal axis with target text features processed by the original ConvNeXt V2 text encoder. Training uses a two-stage strategy on cross-utterance speaker pairs from LibriTTS: first optimizing only the 0.8M-parameter projector for cross-modal alignment (10 epochs), then jointly fine-tuning the projector and the DiT flow-matching backbone (20 epochs).

## Results

Evaluated on LibriSpeech-PC and SeedTTS, RTFree-F5 achieves competitive naturalness (UTMOS MOS 4.13 on LibriSpeech-PC) and maintains low word error rates. On atypical speech benchmarks like L2-ARCTIC (non-native English), RTFree-F5 reduces WER from 10.75% (original) to 1.44%, outperforming both oracle transcript (2.00%) and ASR transcript (1.99%) baselines. On the SAP dysarthric speech dev set, it reduces WER from 24.6% to 10.4% and improves predicted MOS naturalness from 2.91 to 3.49. Ablations show that Stage 2 joint fine-tuning is vital, as a projector-only approach catastrophically fails (90% WER) on dysarthric speech due to distribution shift.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Zero-shot text-to-speech and voice cloning, particularly for atypical populations such as dysarthric or non-native accented speakers requiring high intelligibility and naturalness.

## Limitations

Speaker similarity decreases slightly on certain atypical benchmarks compared to oracle text baselines.

## Related

- (link related pages by id as the wiki grows)
