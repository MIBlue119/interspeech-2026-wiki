---
id: li26ka_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3434
pdf: https://www.isca-archive.org/interspeech_2026/li26ka_interspeech.pdf
---

# Read What You Hear: Reference-Free Hypotheses Evaluation with Acoustic Discrepancy

[PDF](https://www.isca-archive.org/interspeech_2026/li26ka_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ka_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3434)

**TL;DR** — The paper introduces READ, a reference-free evaluation and refinement metric that leverages pretrained text-to-speech models to compute acoustic discrepancies, achieving up to 20% relative error rate reduction.

## Problem

Reference-based evaluation methods like Word Error Rate require ground-truth transcripts, making them unusable for large-scale unsupervised scenarios. Meanwhile, existing reference-free approaches rely either on overconfident internal ASR decoder probabilities or text-only language models that completely ignore the underlying speech signal. This lack of acoustic grounding hinders interpretable diagnostic evaluation and robust hypothesis correction, especially in noisy environments.

## Method

The proposed method, READ (Reference-free Hypothesis Evaluation with Acoustic Discrepancy), utilizes an off-the-shelf, pretrained discrete auto-regressive text-to-speech model (specifically CosyVoice2) in teacher-forcing mode without any task-specific retraining. It calculates the frame-level negative log-likelihood of speech tokens conditioned on text hypotheses to yield a fine-grained discrepancy sequence. To map these frame-level scores back to text segments, it extracts monotonic alignments directly from the attention weights of the TTS decoder's self-attention maps using dynamic programming. This enables both sentence-level N-best rescoring and greedy segment-level hypothesis combination, as well as integration as an auxiliary candidate in ROVER.

## Results

Experiments across LibriSpeech, SPGISpeech, Switchboard, TEDLIUM3, VCTK-noisy, and code-switching datasets (ASRU2019, TALCS) under clean and WHAM!-augmented noise conditions (0, 10, 20 dB SNR) demonstrate that READ correlates strongly with WER. When applied to ASR hypothesis refinement using Whisper-large-v3 N-best lists (beam size 60, top-5 candidates), READ achieves up to a 20% relative error rate reduction. The approach shows exceptionally strong performance gains under heavy acoustic noise where acoustic failures dominate.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers can use READ for unsupervised ASR evaluation, N-best hypothesis rescoring, and robust error correction in noisy or unlabelled speech recognition deployment settings.

## Limitations

The segment-level combination relies on a locality assumption and a greedy selection scheme.

## Related

- (link related pages by id as the wiki grows)
