---
id: wang26ea_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2730
pdf: https://www.isca-archive.org/interspeech_2026/wang26ea_interspeech.pdf
---

# Not Flat, But Dissociated: Prosodic and Segmental Divergence in Neural TTS

[PDF](https://www.isca-archive.org/interspeech_2026/wang26ea_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26ea_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2730)

**TL;DR** — An acoustic and phonetic analysis of neural text-to-speech systems reveals a cross-timescale prosodic dissociation and severe vowel centralization, with systems retaining only 9-30% of human vowel space area.

## Problem

Standard TTS evaluations rely on global perceptual ratings and mel-cepstral distances that collapse distinct linguistic dimensions, obscuring structural deficiencies. Specifically, it remains unknown whether phonetic deviations concentrate at a single level of organization or diverge independently across temporal scales. Addressing this gap enables principled diagnosis of acoustic models beyond aggregate mean opinion scores.

## Method

The authors analyze 13,100 matched utterances from the LJ-TTS corpus across four representative neural TTS architectures (Tacotron2-DDC, FastSpeech2, Glow-TTS, and MixerTTS) paired with a shared HiFi-GAN vocoder. Prosodic evaluation extracts 21 utterance-level features using Praat/Parselmouth alongside LASSO logistic regression with L1 regularization and nested 5-fold cross-validation. Segmental evaluation utilizes Montreal Forced Aligner boundaries to measure cardinal and 10-vowel convex hull vowel space areas. Consonant-vowel coarticulation is examined via F2 transition extent and locus equation slopes across labial, alveolar, and velar places of articulation.

## Results

Pooled comparisons reveal that global F0 variability is compressed (d = -0.55) while local pitch reversals increase (d = +0.82), indicating weakened hierarchical coordination rather than flat intonation. Vowel space area contracts severely, with systems retaining between 9% (FastSpeech2) and 30% (MixerTTS) of the human cardinal vowel triangle area. Locus equation analysis demonstrates consistent place-conditioned coarticulation deficits for alveolars, where TTS slopes (0.827–0.870) significantly exceed the human slope of 0.793. A LASSO classifier distinguishes human from synthetic speech with an AUC of 0.851 based on prosodic features, while correlation analyses show that prosodic and segmental deviations are largely uncorrelated.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building or evaluating text-to-speech systems can use these granular diagnostic frameworks to isolate architectural flaws instead of relying solely on subjective MOS ratings.

## Limitations

The analysis is restricted to a single American English female speaker dataset (LJSpeech) and four specific two-stage neural TTS architectures.

## Related

- (link related pages by id as the wiki grows)
