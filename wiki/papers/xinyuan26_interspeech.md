---
id: xinyuan26_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-198
pdf: https://www.isca-archive.org/interspeech_2026/xinyuan26_interspeech.pdf
---

# Universal Speech Content Factorization

*Henry Li Xinyuan, Zexin Cai, Lin Zhang, Leibny Paola Garcia-Perera, Berrak Sisman, Sanjeev Khudanpur, Nicholas Andrews, Matthew Wiesner*

[PDF](https://www.isca-archive.org/interspeech_2026/xinyuan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xinyuan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-198)

**TL;DR** — Universal Speech Content Factorization (USCF) extends closed-set Speech Content Factorization to an open-set zero-shot voice conversion and training-efficient TTS representation by using least-squares optimization to strip speaker timbre from WavLM features while preserving phonetic content.

## Key contributions

- Proposes USCF to generalize linear speech content factorization to unseen speakers via a least-squares universal mapping and single-utterance speaker transformation estimation.
- Evaluates USCF as a zero-shot voice conversion system, demonstrating competitive intelligibility, naturalness, and speaker similarity without extra neural network training.
- Demonstrates that USCF features serve as highly effective acoustic targets for training timbre-prompted text-to-speech (TTS) models with reduced convergence time.
- Performs embedding analyses showing USCF features successfully minimize speaker-identifying information within phonemes better than raw WavLM or ContentVec while keeping high phonetic classification accuracy.

## Problem

Prior self-supervised learning (SSL) space voice conversion and speech disentanglement approaches either rely on complex explicitly trained generative models like VAEs requiring massive speaker-specific data, or are restricted to closed-set settings where target speakers must be known during factorization (such as original Speech Content Factorization). Closed-set methods fail in open-set downstream tasks like web-scale or crowd-sourced multi-speaker TTS datasets (e.g., CommonVoice, Emilia) where unseen speakers lack sufficient enrollment speech or re-computing decompositions is prohibitively expensive. It is critical to enable speaker-agnostic content extraction and one-shot speaker adaptation without expensive retraining.

## Method

USCF builds upon the closed-set Speech Content Factorization (SCF) framework which performs rank-r truncated SVD on a concatenated matrix of content-aligned WavLM features X across k speakers (yielding X approx U Sigma S). To map unseen speakers to content, three formulations for a universal mapping matrix W are explored: W0 via least-squares optimization on U * Sigma, W1 via least-squares optimization directly on the orthonormal content matrix U (factoring out singular values to prevent amplification of over-represented acoustic contexts), W2 by approximately inverting speaker transformations, and W3 by assuming linear separability of content and timbre subspaces, setting W3 as the Moore-Penrose inverse of a random speaker's transformation matrix Si.

For inference on an unseen speaker m with a small set of target frames X'_m, the speaker transformation matrix S_m is derived via least-squares using the universal mapping W (specifically, S_m approx W^+ X'_m or via pre-multiplication formulations). Rank r is set to 75 by default. The target transformation derivation requires at least 500 frames (approx 10 seconds) of target speech for stable similarity. For TTS, USCF features replace mel-filterbanks in a flow-matching framework adapted from ZipVoice, trained on LibriSpeech.

## Experimental setup

Evaluated using LibriSpeech (20 source speakers from test-clean, 5 target speakers per source from test-other, and 40 speakers from test-clean/dev-clean for SVD factorization). Evaluated via ASR WER using Whisper-large for intelligibility, UTMOS-v2 for quality, ECAPA-TDNN cosine similarity for speaker similarity, and human evaluations (MOS and SMOS). Compared against kNN-VC, LinearVC, closed-set SCF, partial open-set SCF, and SeedVC. TIMIT test split is used for phoneme and speaker ID-within-phoneme embedding analyses. TTS models are evaluated on LibriSpeech.

## Results

USCF achieve competitive objective and subjective results: USCF W1 scores 2.70% ASR WER, 2.805 UTMOS, and 0.524 speaker similarity, outperforming SeedVC (6.24% WER) in intelligibility and ranking on par with kNN-VC (3.16% WER) and LinearVC (2.69% WER). In human evaluations, listeners showed no statistically significant preference between USCF, kNN-VC, LinearVC, and SCF, while heavily favoring them over SeedVC. In speaker ID within phonemes on TIMIT, USCF achieves a higher Speaker EER of 36.40% (compared to WavLM's 21.77%), confirming superior removal of speaker identity while maintaining strong phonetic EER (11.43%). In TTS training, USCF features achieve an ASR WER of 11.44% in 25 epochs, outperforming raw mel-filterbanks (27.93% WER, 39 epochs) and normalized mels (11.92% WER, 33 epochs). USCF underperforms relative to kNN-VC and LinearVC on absolute ECAPA speaker similarity score when target adaptation data is limited.

| Method | WER (%) ↓ | UTMOS ↑ | Spk Sim ↑ |
|---|---|---|---|
| USCF W1 | 2.70 | 2.805 | 0.524 |
| USCF W2 | 4.04 | 2.519 | 0.557 |
| USCF W3 | 2.31 | 2.826 | 0.420 |
| kNN-VC | 3.16 | 2.855 | 0.666 |
| LinearVC | 2.69 | 2.765 | 0.621 |
| SCF | 2.18 | 2.886 | 0.603 |

## Limitations

Speaker similarity drops significantly if the target speaker adaptation audio falls below 500 frames (10 seconds), showing sensitivity to low-resource enrollment data. The linear assumption separating content and timbre may break down under highly expressive, emotional, or noisy acoustic conditions. Evaluation is primarily validated on clean English read speech (LibriSpeech/TIMIT), leaving cross-lingual and noisy open-set web data robustness unproven.

## Why read this

Speech and ML researchers building zero-shot voice conversion or efficient timbre-prompted TTS pipelines should read this to learn how linear least-squares factorization over WavLM features can eliminate the need for heavy neural network retraining during speaker adaptation.

## Code

- https://github.com/HSTEHSTEHSTE/uscf

## Applications

Zero-shot voice conversion, timbre-prompted text-to-speech synthesis, and privacy-preserving speech anonymization.

## Related

- (link related pages by id as the wiki grows)
