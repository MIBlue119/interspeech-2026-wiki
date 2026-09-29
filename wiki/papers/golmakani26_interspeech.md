---
id: golmakani26_interspeech
category: deepfake-security
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1949
pdf: https://www.isca-archive.org/interspeech_2026/golmakani26_interspeech.pdf
---

# Acoustic token admixture for joint speaker and content anonymization

*Ali Golmakani, Seyed Ahmad Hosseini, Omar Manil Bendali, Emmanuel Vincent, Brij Mohan Lal Srivastava*

[PDF](https://www.isca-archive.org/interspeech_2026/golmakani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/golmakani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1949)

**Category:** `deepfake-security`

**TL;DR** — The paper introduces an acoustic token-space framework that jointly anonymizes speaker identity and linguistic content per-frame using residual vector quantization (RVQ) admixture and named entity recognition (NER)-triggered span replacement. On the VoicePrivacy 2024 benchmark, it achieves a speaker equal error rate (EER) of 42.54% and a word error rate (WER) of 3.73%.

## Key contributions

- NER-triggered frame-level token replacement that re-generates sensitive spans from phoneme features and splices them back into the token stream without boundary discontinuities.
- Dual-stream RVQ admixture that per-frame blends encoder-derived and phoneme-conditioned tokens using a scalar parameter beta to suppress biometric identity and stylometric fingerprints.
- Cosine similarity gating to reject misaligned phoneme-derived tokens and maintain intelligibility on noisy in-domain speech.
- A unified single-vocoder architecture that preserves in-domain acoustic characteristics, avoiding full re-synthesis.

## Problem

Speech data reuse in regulated domains (healthcare, legal) is severely restricted because recordings expose personally identifiable information through two separate channels: biometric speaker identity (exploited by speaker verification systems) and linguistic stylometry (enabling authorship attribution). Existing solutions treat these channels in isolation and rely on full re-synthesis, which destroys the valuable in-domain acoustic properties, prosodic rhythms, and voice qualities of the original recordings. Furthermore, prior content anonymization paradigms either render text unintelligible via phone-code masking, introduce acoustic artifacts through substitution, or require expensive utterance-wide routing.

## Method

The system processes speech through two parallel streams fed into a BigVGAN neural vocoder conditioned on a linguistic token sequence, a transformed F0 contour, and an ECAPA-TDNN pseudospeaker embedding.

Stream A (encoder tokens) extracts frame-level representations using a frozen Whisper large-v2 encoder (1280-dim at 50 fps) passed through an M=8 stage residual vector quantizer with 1024-entry codebooks, trained with LoRA rank 32. Stream B (phoneme-conditioned tokens) converts Whisper transcripts to IPA via Transphone, aligns them via a CTC forced aligner, maps them to 64-dim articulatory feature vectors, and decodes them autoregressively using a 220M-parameter T5 transformer into RVQ token sequences.

The two streams merge at a frame-level admixture node controlled by a scalar beta in [0, 1] and a cosine similarity gate (threshold tau = 0.6) that falls back to Stream A if continuous representations diverge due to aligner errors. Additionally, an NER tagger triggers override signals on sensitive spans to substitute tokens directly, while F0 contours are transformed via a 32-frame moving average with added Gaussian noise (+2 dB) and pseudospeaker x-vectors are incorporated.

## Experimental setup

Evaluated on the VoicePrivacy 2024 corpus (LibriSpeech libri-train-clean-360 training split with 360 hours from 921 speakers). ASR utility is tested on libri-dev-asr and libri-test-asr using Whisper medium.en; privacy is evaluated across VoicePrivacy trial sets; emotion utility uses IEMOCAP. The T5 model was trained for 100K iterations (batch size 16, AdamW, peak lr 3e-4) and BigVGAN from scratch for 800K iterations (batch size 12). Baselines include T12-5 (VPC top submission) and HLTCOE utterance-level admixture.

## Results

At the primary operating point of beta = 0.7, the system achieves an EER of 42.54% (within one point of the VPC top submission's 43.23%), a competitive WER of 3.73%, and an unweighted average recall (UAR) of 40.11%. Ablations show that EER scales monotonically with beta (rising from 23.0% at beta=0.0 to 42.54% at beta=0.7), while WER remains stable below 3.8%. On the speech editing evaluation set, the full system achieves an edit similarity of 0.959 and a naturalness MOS of 3.84, confirming seamless integration across NER-replaced spans.

| System | EER (%) | WER (%) | UAR (%) |
|---|---|---|---|
| Original speech | 10.2 | 1.8 | 70.1 |
| T12-5 (VPC top) | 43.23 | 4.56 | 37.83 |
| HLTCOE admixture | 40.81 | 3.33 | 47.09 |
| Ours (beta = 0.0) | 23.0 | 2.5 | 41.51 |
| Ours (beta = 0.3) | 30.0 | 2.7 | 40.94 |
| Ours (beta = 0.7) | 42.54 | 3.73 | 40.11 |

## Limitations

The system's emotion utility (UAR 40.11%) lags behind utility-focused baselines like HLTCOE because token prediction does not explicitly model emotional prosody. The evaluation is primarily bounded to English and French corpora, and span-level token replacement can introduce minor residual boundary artifacts.

## Why read this

Researchers and engineers building production speech data sanitization pipelines should read this paper to learn how to achieve joint speaker and content anonymization inside a single neural vocoder token space without full re-synthesis.

## Code

- https://github.com/Nijta/acoustic-token-admixture

## Applications

Privacy-compliant dataset curation for healthcare, legal transcription, and enterprise telephony analytics requiring retention of in-domain acoustic properties.

## Institutions / 機構

Nijta, Universite de Lorraine, CNRS, Inria, LORIA

## Related

- (link related pages by id as the wiki grows)
