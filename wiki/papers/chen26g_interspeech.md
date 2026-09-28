---
id: chen26g_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-869
pdf: https://www.isca-archive.org/interspeech_2026/chen26g_interspeech.pdf
---

# Using Phonological-Level Wav2Vec2 for Mandarin Automatic Mispronunciation Detection and Diagnosis

[PDF](https://www.isca-archive.org/interspeech_2026/chen26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-869)

**TL;DR** — This paper proposes a unified Wav2Vec2-CTC framework for Mandarin mispronunciation detection and diagnosis that models both segmental and tonal phonological attributes, reducing False Acceptance Rate by 10.1% and Diagnostic Error Rate by 23.6%.

## Problem

End-to-end mispronunciation detection and diagnosis systems for L2 Mandarin usually output coarse phoneme-level judgments or category scores, failing to explicitly isolate segmental and tonal errors. Mandarin's tightly coupled initial-final structures and rich contrastive pitch contours demand a phonetic representation that captures both articulatory mechanics and tonal realization to provide interpretable, fine-grained diagnostic feedback.

## Method

The framework converts transcripts into International Phonetic Alphabet (IPA) sequences and maps phonemes to binary phonological attributes across manner, place, vowel height, backness, rounding, diphthongs, and tone categories. It evaluates two IPA mappings (IPA-S keeping complex rimes intact, IPA-D decomposing them) and two tone modeling strategies (categorical Tone-Cat and pitch-target descriptors Tone-PT). A pre-trained Wav2Vec 2.0 XLSR-53 acoustic backbone is fine-tuned via CTC using a multi-label attribute prediction objective on CommonVoice 13-CN. Final diagnostic feedback is derived by aligning predicted and reference attribute vectors and converting attributes back to phonemes via a dedicated transcriber.

## Results

Evaluated on the LATIC non-native learner corpus and AISHELL-1 for cross-corpus generalization, the IPA-D mapping reduces segmental Attribute Error Rate from 3.38% to 1.83% compared to IPA-S. For phoneme-level MDD on LATIC, the IPA-D × Tone-CAT model reduces the False Acceptance Rate from 9.97% to 8.15% relative to a Wav2Vec2 baseline, while IPA-D × Tone-PT achieves the lowest Diagnostic Error Rate at 26.05%. At the attribute level, attribute-based evaluation of phoneme confusion pairs reduces FAR by an average of 72% compared to traditional phoneme-level error calculation.

## Code

- https://github.com/Evanchan1923/MDD_SpeechAttribute

## Applications

Computer-assisted language learning systems designed for L2 Mandarin learners seeking interpretable, detailed diagnostic feedback on specific articulatory and tonal pronunciation errors.

## Limitations

The high-level pitch offset attribute (offset-5) shows the highest attribute error rate at 8.35%, and pitch-target tone modeling increases detection sensitivity, making it more prone to false alarms.

## Related

- (link related pages by id as the wiki grows)
