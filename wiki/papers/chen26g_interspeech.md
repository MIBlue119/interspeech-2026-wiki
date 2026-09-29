---
id: chen26g_interspeech
category: applications-other
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-869
pdf: https://www.isca-archive.org/interspeech_2026/chen26g_interspeech.pdf
---

# Using Phonological-Level Wav2Vec2 for Mandarin Automatic Mispronunciation Detection and Diagnosis

*Jinghao Chen, Mostafa Shahin, Beena Ahmed*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-869)

**Category:** `applications-other` · **Labels:** `self-supervised`

**TL;DR** — This paper proposes a unified Wav2Vec2-CTC framework for Mandarin mispronunciation detection and diagnosis (MDD) that decomposes phonemes into binary segmental and tonal attributes. Compared to a phoneme-only baseline, the approach reduces False Acceptance Rate by 10.1% and Diagnostic Error Rate by 23.6%.

## Key contributions

- A refined Mandarin speech-attribute inventory integrating both segmental (manner, place, vowel height/backness/rounding) and tonal distinctions.
- A self-supervised attribute-level modeling framework (built on Wav2Vec2-XLSR-53) for joint segmental and tonal multi-label prediction.
- A multi-level diagnosis mechanism using Levenshtein alignment to link phoneme-level confusions with specific articulatory and tonal attribute errors.
- Empirical analysis of diphthong decomposition (IPA-D vs. IPA-S) and tone modeling strategies (categorical Tone-CAT vs. pitch-target Tone-PT).

## Problem

Mandarin presents severe challenges for automatic mispronunciation detection and diagnosis (MDD) due to its tightly coupled initial-final segmental structures and lexical pitch contours. Prior end-to-end and HMM-GOP systems (such as standard Wav2Vec2 and CTC/RNN-T models) focus primarily on phoneme-level detection accuracy or coarse tone labels, failing to explicitly separate segmental and tonal error attributes. Without decomposing phonemes into low-level phonological components, diagnostic feedback remains black-box and uninformative for language learners trying to understand how an error was physically generated.

## Method

The framework operates in two stages: native speech-attribute model training and L2 diagnostic inference. Transcripts are converted to International Phonetic Alphabet (IPA) sequences using Dragonmapper and normalized following Xiandai Hanyu. Two IPA mappings are evaluated: IPA-S (treating diphthongs/rimes as single units) and IPA-D (decomposing them into constituent monophthongs). Two tone representations are explored: Tone-CAT (categorical labels like High, Rising, Dipping, Falling) and Tone-PT (pitch-target descriptors capturing onset, mid, and offset pitch values on a 1-5 scale). This yields a 2x2 factorial setup with attribute inventories ranging from 40 to 50 dimensions.

The acoustic backbone uses pre-trained Wav2Vec 2.0 XLSR-53 with frozen CNN encoders. A multi-label CTC objective is optimized to predict binary (+att/-att) attribute sequences. During inference on L2 speech, predicted attribute sequences are compared against reference representations using Levenshtein alignment. Attribute-level feedback isolates missing, altered, or extra articulatory/tonal features, while an attributes-to-phoneme transcriber converts sequences back to provide phoneme-level substitution, insertion, and deletion feedback.

## Experimental setup

Models are trained on Common Voice 13-CN (CV13-CN, 67.2 hours, 288 speakers). Cross-corpus evaluation uses AISHELL-1 (AS-1, 170 hours, 400 speakers) for attribute recognition and LATIC (LAT, 4 hours, 4 non-native speakers from Russian, Korean, French, Arabic backgrounds) for MDD evaluation. Baselines include a Wav2Vec2-XLSR-53 phoneme-recognition model and a Pitch-aware RNN-T system trained on AISHELL-3. Training uses AdamW with a peak learning rate of 5e-4, 15% warmup ratio, gradient clipping of 5.0, ctc_zero_infinity, and runs for 15 epochs on 16 kHz audio.

## Results

On AISHELL-1 cross-corpus attribute recognition, diphthong decoupling (IPA-D) drastically improves vowel and consonant modeling, reducing average Attribute Error Rate (AER) from 3.27% (IPA-S) down to 1.83% (IPA-D × Tone-CAT). Within IPA-D models, Tone-CAT yields the lowest overall AER (1.83%), whereas Tone-PT achieves the best tone-specific performance (AER 0.0303).

On the LATIC non-native corpus, the proposed IPA-D × Tone-CAT model reduces phoneme-level False Acceptance Rate (FAR) to 8.15% (compared to 9.97% for the Wav2Vec2 baseline and 7.70% for the Pitch-aware RNN-T). The IPA-D × Tone-PT model achieves the lowest Diagnostic Error Rate (DER) at 26.05%, outperforming the Wav2Vec2 phoneme baseline (34.03%) and Pitch-aware RNN-T (31.80%). However, attribute-based modeling increases False Rejection Rate (FRR) due to heightened acoustic sensitivity to minor deviations. Furthermore, attribute-level evaluation on tonal confusion pairs reduces FAR by an average of 72% relative to phoneme-level detection.

| System | PER (%) | FAR (%) | FRR (%) | DER (%) |
|---|---|---|---|---|
| Pitch-aware RNN-T [15] | 26.69 | 7.70 | 25.57 | 31.80 |
| Wav2Vec2-XLSR-53 | 30.89 | 9.97 | 24.85 | 34.03 |
| IPA-D × Tone-CAT (Proposed) | 27.24 | 8.15 | 26.34 | 27.86 |
| IPA-D × Tone-PT (Proposed) | 27.93 | 8.79 | 27.34 | 26.05 |

## Limitations

The evaluation dataset (LATIC) is restricted to a very small cohort of only 4 speakers across 4 L1 backgrounds (Russian, Korean, French, Arabic) spanning just 4 hours, limiting demographic breadth. High-level pitch attributes (such as offset-5 in Tone 1 and Tone 2) exhibit higher error rates (up to 8.35% AER), indicating that pitch-target representations struggle with sustained high contours. The increased sensitivity of attribute models also leads to higher false rejection rates, occasionally penalizing natural pronunciation variations.

## Why read this

Speech researchers and EdTech engineers building computer-aided pronunciation learning (CAPL) tools for tonal languages should read this paper to see how decomposing phonemes into binary articulatory-tonal attributes via Wav2Vec2-CTC substantially improves diagnostic interpretability and lowers diagnostic error rates.

## Code

- https://github.com/Evanchan1923/MDD_SpeechAttribute

## Applications

Computer-Aided Pronunciation Learning (CAPL) software, L2 Mandarin mispronunciation detection and automated diagnostic feedback generation.

## Institutions / 機構

UNSW

## Related

- (link related pages by id as the wiki grows)
