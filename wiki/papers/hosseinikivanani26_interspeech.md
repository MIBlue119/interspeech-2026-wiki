---
id: hosseinikivanani26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-26
pdf: https://www.isca-archive.org/interspeech_2026/hosseinikivanani26_interspeech.pdf
---

# Speaker or Language? Explaining Variance in Charismatic Prosody Across Luxembourgish and French

*Nina Hosseini-Kivanani, Nafiseh Taghva, Peter Gilles, Oliver Niebuhr*

[PDF](https://www.isca-archive.org/interspeech_2026/hosseinikivanani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hosseinikivanani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-26)

**TL;DR** — This study analyzes spontaneous bilingual political speech across Luxembourgish and French to determine whether speaker identity or language choice drives variance in charismatic prosody. The findings reveal that individual speaker identity dominates prosodic variance (median ICC of 0.56), while language accounts for less than 1% of variance but systematically modulates specific acoustic features.

## Key contributions

- Constructed a parallel within-speaker dataset of 400 spontaneous utterances from 10 high-profile Luxembourgish politicians speaking both Luxembourgish and French.
- Extracted and analyzed 41 acoustic-prosodic features covering F0, timing, intensity, and bio-informational voice-quality dimensions (BID).
- Fitted linear mixed-effects models with Benjamini-Hochberg FDR correction, proving that speaker identity explains over 50% of feature variance whereas language explains only ~0.5%.
- Identified systematic language-dependent differences: French exhibits higher shimmer and phrase-final F0, while Luxembourgish shows significantly stronger mid-frequency spectral energy (250 Hz to 3750 Hz).

## Problem

Prior research on charismatic speech has focused almost exclusively on monolingual speakers and prepared, read, or semicontrolled speech, leaving a major gap regarding how charisma-related prosody is realized in spontaneous bilingual speech where languages differ in sociolinguistic function and prestige. Although bilingual prosody studies report language-dependent shifts in pitch, timing, and voice quality, their implications for charismatic speech and their magnitude relative to stable speaker-specific signatures remain unknown. This gap is especially prominent in multilingual polities like Luxembourg, where languages carry distinct sociolinguistic identities (informal identity vs. high-prestige institutional variety).

## Method

The study analyzes speech from 10 bilingual politicians (5 female, 5 male) obtained from the RTL Archive. For each speaker, 20 spontaneous sentences in Luxembourgish and 20 in French were extracted, totaling 400 intonationally and syntactically coherent sentence tokens. Audio was processed at 16 kHz mono. Automatic orthographic transcriptions were generated using LuxASR and subsequently verified. Sentence boundaries were forced-aligned using WebMAUS and manually corrected in Praat using waveform and spectrogram inspections. Prosodic features were extracted via the ProsodyPro script for Praat, yielding 41 metrics spanning fundamental frequency (F0), intensity, interval duration, and bio-informational dimension (BID) voice-quality measures such as harmonics-to-noise ratio, jitter, shimmer, spectral center of gravity, and long-term spectral slope indicators.

All 41 features were inspected for outliers, log-transformed if strongly skewed, and z-scored to zero mean and unit variance. Principal component analysis (PCA) was performed to visualize the global prosodic space. Linear mixed-effects models were fitted separately for each feature, specifying Language (Luxembourgish vs. French), Gender, and sentence Duration as fixed effects, and Speaker as a random intercept. The intraclass correlation coefficient for Speaker (ICCSpeaker) was calculated to quantify between-speaker variance, while marginal R-squared and type III sums of squares quantified language variance shares. To test RQ1, an interaction term of Language × Gender was added, with Benjamini-Hochberg FDR adjustments applied across all 41 models. Additionally, a composite charisma index combining six established acoustic cues was evaluated to test for overall charismatic advantage across languages.

## Experimental setup

The dataset consists of 400 spontaneous utterances (20 per language for each of the 10 political figures: 5 female, 5 male) extracted from public speeches, press briefings, interviews, and parliamentary debates. Statistical evaluations rely on linear mixed-effects models across 41 standardized acoustic-prosodic features with speaker random intercepts and FDR-corrected p-values. No external machine learning baselines or speech synthesis models were evaluated, as this is an empirical phonetic and sociolinguistic investigation.

## Results

The PCA map shows that French and Luxembourgish sentences form partially overlapping bands along PC1 (31.4% variance) and PC2 (16.8% variance), indicating a modest language-induced displacement. Mixed-effects variance partitioning reveals a median ICC for Speaker of 0.56 (IQR 0.11–0.74, range 0.01–0.86), meaning more than half of feature variance is driven by stable individual differences, whereas Language accounts for a median of only 0.5%. Out of 41 features, 18 showed significant language differences after FDR correction. French productions exhibited significantly higher values for only two metrics: shimmer (d = 0.90) and phrase-final F0 (d = 0.68), pointing toward a polite, considerate, and institutionally controlled voice setting. Conversely, 16 features were significantly higher in Luxembourgish, driven by massive energy elevations across mid-frequency bands (e.g., d = -1.67 at 2750 Hz, d = -1.62 at 2500 Hz, d = -1.56 at 250 Hz), indicating a brighter, more vocally present and projected profile. No Language by Gender interactions survived FDR correction, and a composite charisma index showed no main effect of Language (d = -0.03, p = 0.89, R^2_Language ≈ 0), demonstrating no global charisma advantage for either language code.

| Feature / Metric | Domain | Direction | Effect Size (d) |
|---|---|---|---|
| Shimmer | Voice Quality | French > Luxembourgish | 0.90 |
| Final F0 | F0 Contour | French > Luxembourgish | 0.68 |
| Energy Band 250 Hz | Spectrum | Luxembourgish > French | -1.56 |
| Energy Band 1000 Hz | Spectrum | Luxembourgish > French | -1.28 |
| Energy Band 2500 Hz | Spectrum | Luxembourgish > French | -1.62 |
| Energy Band 2750 Hz | Spectrum | Luxembourgish > French | -1.67 |

## Limitations

The dataset is constrained to exactly ten high-profile political speakers from a single speech community (Luxembourg), limiting broad cross-cultural generalization. The study relies entirely on spontaneous political monologues, omitting dialogue dynamics or read speech styles. Furthermore, findings are derived from acoustic-prosodic feature correlations rather than direct perceptual listening tests, leaving open how human listeners subjectively scale these specific spectral differences.

## Why read this

Speech and ML researchers working on multilingual speech representation, speaker embeddings, and style transfer should read this to understand the fundamental ceiling of language-dependent prosodic shifts versus speaker-specific idiosyncrasies. It provides concrete empirical evidence that voice quality and spectral energy distributions shift systematically with sociolinguistic prestige, even when speaker identity remains the dominant source of variance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual voice conversion, text-to-speech style conditioning, and multilingual speaker recognition systems seeking to disentangle speaker identity from sociolinguistic style.

## Related

- (link related pages by id as the wiki grows)
