---
id: deng26b_interspeech
category: speaker
labels: [robustness-noise]
institutions: ["Hong Kong Polytechnic University", "University of York"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1004
pdf: https://www.isca-archive.org/interspeech_2026/deng26b_interspeech.pdf
---

# Codec-induced Mismatch, Speech Duration, and Speaker-dependent Effect in a DNN-based Forensic Speaker Recognition System

*Guangmou Deng, Bruce Xiao Wang, Vincent Hughes*

[PDF](https://www.isca-archive.org/interspeech_2026/deng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/deng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1004)

**Category:** `speaker` · **Labels:** `robustness-noise`

**TL;DR** — This study evaluates how lossy speech codecs and speech duration jointly impact forensic automatic speaker recognition (FASR) at both the system and individual levels, revealing that aggregate metrics mask severe, speaker-dependent vulnerability to compression artifacts. Opus causes minimal degradation, whereas low-bitrate AMR-NB causes severe drops and exposes substantial individual-level instability.

## Key contributions

- Evaluates the joint interaction of lossy codecs (G.711 A-law, AMR-NB at 6.7 and 12.2 kb/s, and Opus) and questioned-speech (QS) durations (5s to 90s) in a DNN-based FASR pipeline.
- Performs individual-level forensic analysis using by-speaker Cllr metrics, demonstrating that promising global performance hides extreme instability and high error rates for specific speakers.
- Establishes a significant linear relationship (R^2 = 0.43) showing that speakers with poorer overall baseline performance are systematically more sensitive to codec-induced mismatch.
- Demonstrates that system-level performance saturates at around 30 seconds of questioned speech across all evaluated codec conditions.

## Problem

Forensic voice comparison requires evaluating likelihood ratios under severe channel mismatch and limited questioned-speech (QS) durations, whereas reference samples (KS) are clean police interviews. Prior FASR studies have evaluated codecs or duration in isolation and relied solely on system-level aggregation, ignoring how individual speaker variability and codec sensitivities interact. This lack of fine-grained validation poses risks in forensic casework where global averages do not guarantee reliability for specific defendants.

## Method

The front-end extracts 64-dimensional log-Mel filterbank features (25ms window, 10ms shift, 20-3900 Hz range) with cepstral mean and variance normalization. The speaker embedding network uses a ResNet34 backbone (four residual layers with {3, 4, 6, 3} blocks and {32, 64, 128, 256} channels) paired with an 8-head multi-head attentive statistics pooling (MHA) layer that maps frame-level features into a 512-dimensional utterance embedding. Training uses VoxCeleb1+2 (7,205 speakers) augmented with MUSAN noise and RIR room reverberation, optimized via Additive Angular Margin (AAM-) softmax loss (margin 0.2, scale 30) using the Adam optimizer with a learning rate warming up to 0.001 and decaying via cosine annealing over 105 epochs; the final checkpoint averages the last 10 epochs.

For the back-end, an LDA-PLDA model is trained on 68 Hong Kong Cantonese speakers (reducing LDA dimension to 50) to output common-source likelihood ratios (LRs), which are subsequently calibrated using a logistic-regression variant of bi-Gaussianized calibration. Codec degradation (G.711 A-law at 64 kb/s via FFmpeg, AMR-NB at 12.2 and 6.7 kb/s, and Opus at 16 kHz/128 kb/s via libopus) is applied exclusively to the questioned speech (QS) across durations from 5s to 90s in 5s increments, while known samples (KS) remain uncorrupted high-quality recordings exceeding 90s.

## Experimental setup

Evaluated on non-contemporaneous recordings from 102 young male Hong Kong Cantonese speakers (102 speakers total, with 68 used for LDA-PLDA training and 34 held out for cross-validation generating 130 same-speaker and 4,292 different-speaker trials). Metrics include system-level log-likelihood-ratio cost (Cllr) and individual-level by-speaker Cllr (Cllr^spk).

## Results

System-level Cllr shows that Opus-HQ matches clean HQ-HQ performance almost perfectly, while G.711 A-law causes minor degradation and AMR-NB at 6.7 kb/s induces the worst system-level error. Performance improves with duration up to 30s, after which system-level Cllr plateaus.

At the individual level, however, certain speakers experience severe failures: speakers #80 and #93 exceed a Cllr^spk of 1.0 (indicating misleading LRs) under AMR-NB (6.7 kb/s) at short durations, and speaker #91 maintains elevated errors (>0.3) beyond 60s across all codec conditions. A linear regression model confirms that a speaker's mean cross-condition error strongly predicts their sensitivity to codec mismatch (R^2 = 0.43, beta = 0.23, p < 0.001), meaning harder speakers are disproportionately vulnerable to compression artifacts.

## Limitations

The evaluation is restricted to a single demographic cohort (young male Hong Kong Cantonese speakers) and a controlled set of simulated codecs, omitting multi-stage cascade codecs (e.g., landline transmission subsequently recorded on a mobile app). The dataset size (34 test speakers, 130 same-speaker trials) is relatively small compared to non-forensic speaker verification benchmarks, and individual-level Cllr metrics inherently exhibit high sampling variability due to limited trials per speaker.

## Why read this

Speech and ML engineers building robust speaker embedding models should read this to understand that global validation metrics can completely mask individual failure modes under lossy compression. It provides concrete evidence that modern neural embeddings still suffer from speaker-dependent robustness gaps.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic automatic speaker recognition, voice comparison casework validation, and robust speaker verification in low-bitrate telecommunication channels.

## Institutions / 機構

Hong Kong Polytechnic University, University of York

**Funding / 經費:** Hong Kong Polytechnic University, Research Grants Council of the Hong Kong Special Administrative Region

## Related

- (link related pages by id as the wiki grows)
