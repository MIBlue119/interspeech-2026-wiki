---
id: purser26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3206
pdf: https://www.isca-archive.org/interspeech_2026/purser26_interspeech.pdf
---

# Variation and change in dynamicity of Australian English diphthongs in Sydney

*Benjamin Purser*

[PDF](https://www.isca-archive.org/interspeech_2026/purser26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/purser26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3206)

**TL;DR** — This paper presents a multivariate functional principal component analysis (MFPCA) of over 57,000 spontaneous speech tokens from the ANU Corpus of Sydney Speech to simultaneously examine F1 and F2 vowel dynamicity across six Australian English diphthongs. The results confirm that younger speakers and women drive ongoing shifts in diphthong trajectories, providing a holistic view of co-occurring formant shape changes that traditional separate-formant methods miss.

## Key contributions

- Applies multivariate functional principal component analysis (MFPCA) to model F1 and F2 formant trajectories in tandem across six Australian English diphthongs (FACE, FLEECE, NEAR, GOAT, MOUTH, PRICE) using spontaneous speech.
- Analyzes a large sociolinguistic dataset of 57,269 vowel tokens from 119 speakers, systematically isolating both linguistic conditioning (phonological context, duration, speech rate) and social conditioning (age group, gender, social class).
- Establishes that the first two functional principal components (PCs) capture 75% to 85% of variance across all vowel categories, cleanly separating social change directions from linguistic and contextual effects.
- Provides empirical proof that younger adults and women are leading the expected changes in vowel shape trajectories, such as the raising and fronting of FACE and lowering and backing of MOUTH.

## Problem

Prior acoustic studies of Australian English diphthongs have predominantly relied on static vowel measures or single-point approaches, failing to capture the degree and timing of spectral change across the vowel trajectory. While more recent dynamic approaches like discrete cosine transforms (DCT) and generalised additive mixed-models (GAMMs) have been adopted, they typically analyze F1 and F2 separately, ignoring the inherent temporal and spectral dependencies between formants. Furthermore, prior dynamic analyses of spontaneous speech have been restricted to single vowels rather than a comprehensive set, leaving a gap in understanding how multivariate formant dynamics co-occur across the entire diphthong system under social and linguistic conditioning.

## Method

The study analyzes data from the ANU Corpus of Sydney Speech (2015-Present), comprising roughly 30 minutes of transcribed and force-aligned spontaneous sociolinguistic interviews per speaker. F1 and F2 values were extracted at equidistant 10% to 90% points (nine timepoints per formant token) using FastTrack in LaBB-CAT, with formant ceilings set to 5000-7000 Hz for females and 4500-6500 Hz for males. After extensive filtering to remove stopwords, extreme durations (>500ms or <20ms), rapid speech rates, and formant outliers beyond +/-3.5 standard deviations, 57,269 tokens remained. Raw formants were normalized using an adapted Lobanov method across the full vowel inventory.

For each of the six diphthong categories, the nine-timepoint F1 and F2 sequences were jointly converted into continuous functions and processed via Multivariate Functional Principal Component Analysis (MFPCA) using the R 'MFPCA' package. MFPCA projects these paired functional curves onto orthogonal dimensions, where PC scores represent the weighting coefficients needed to reconstruct individual token curves from the dataset's mean trajectory. Across all vowels, the first two PCs captured 75% to 85% of total variance.

To identify drivers of this variation, 12 separate mixed-effects models (one for each PC across six vowels) were fitted using the 'lme4' package in R with Satterthwaite approximations for degrees of freedom. Fixed effects included age group (Adults born ~1960s vs Young Adults born ~1990s), gender, social class (Working Class, Lower Middle Class, Middle Class), phonological context (pre-obstruent, pre-nasal, word-final), token duration, speech rate, and log word frequency, along with an age-by-gender interaction and random intercepts for speaker and word (with hapax legomena pooled).

## Experimental setup

The dataset comprises 57,269 vowel tokens extracted from 119 native Australian English speakers (63 female, 56 male) split into Adults (N=58) and Young Adults (N=61) stratified across three social classes. Evaluation metrics relied on coefficients from linear mixed-effects models mapping fixed social and linguistic predictors to MFPCA PC scores, alongside post-hoc Tukey adjusted significance tests. Notable implementation details include automated uncorrected vowel extraction coupled with strict multi-pass outlier removal to preserve natural formant trajectory shapes.

## Results

The first principal components (PC1) successfully tracked expected generational changes: positive or negative shifts in PC scores aligned with younger speakers and women leading the generational direction of change (e.g., FACE PC1 b=-0.93 for age, b=-0.51 for gender, p < 0.001). For FLEECE, an age-gender interaction (b=-0.42, p < 0.001) revealed that Adult men maintain significantly more conservative, retracted realisations than all other groups. Phonological context also played a massive role, with pre-nasal environments consistently promoting lowering and fronting (e.g., pre-nasal FLEECE and GOAT lowering, and MOUTH fronting). Middle class speakers showed significantly lower and backer MOUTH and more open/fronted PRICE trajectories compared to working class speakers (p < 0.001).

Where MFPCA did not cleanly separate factors, certain dimensions reflected overlapping constraints; for instance, NEAR variation was co-conditioned by word-final retraction and duration effects, but younger speakers and women consistently exhibited greater overall trajectory excursion through the vowel space.

## Limitations

The analysis is scoped strictly to native speakers of Australian English residing in Sydney, limiting geographic generalization. The study relies on uncorrected, automatically force-aligned and tracked formant data which, despite robust outlier filtering, may retain minor tracking errors at individual timepoints. Furthermore, ethnic diversity within the corpus was intentionally excluded from the statistical models due to scope constraints.

## Why read this

Phoneticians, sociolinguists, and speech engineers working on acoustic modeling should read this paper to learn how Multivariate Functional Principal Component Analysis (MFPCA) can be deployed to analyze multi-formant trajectories simultaneously in spontaneous speech without discarding temporal dynamics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Sociolinguistic acoustic analysis, automated dialect and regional variation detection, and forensic speech comparison.

## Related

- (link related pages by id as the wiki grows)
