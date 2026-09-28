---
id: hosseinikivanani26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-26
pdf: https://www.isca-archive.org/interspeech_2026/hosseinikivanani26_interspeech.pdf
---

# Speaker or Language? Explaining Variance in Charismatic Prosody Across Luxembourgish and French

[PDF](https://www.isca-archive.org/interspeech_2026/hosseinikivanani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hosseinikivanani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-26)

**TL;DR** — An acoustic analysis of 400 spontaneous political utterances from bilingual Luxembourgish-French speakers shows that speaker identity accounts for most prosodic variance, while language choice introduces systematic differences where French exhibits higher shimmer and phrase-final F0 and Luxembourgish shows stronger mid-frequency spectral energy.

## Problem

Charismatic speech studies have predominantly focused on monolingual speakers and prepared material, leaving it unclear how charisma-related prosody is realized in spontaneous bilingual speech where languages carry different sociolinguistic prestige. Furthermore, it is unknown whether language-dependent prosodic shifts outweigh stable, idiosyncratic speaker signatures in bilingual political contexts. This matters because it helps disentangle universal acoustic markers of persuasion from language-specific social-indexical norms.

## Method

The authors analyzed 400 spontaneous sentences extracted from public speeches, interviews, and parliamentary debates delivered by 10 high-profile Luxembourgish politicians (5 female, 5 male), with each speaker contributing 20 utterances in Luxembourgish and 20 in French. Speech materials were processed using LuxASR for automatic transcription, WebMAUS for forced alignment, and ProsodyPro in Praat to extract 41 acoustic-prosodic features covering F0 metrics, intensity, duration, and bio-informational dimension (BID) measures of voice quality and spectral characteristics. The analytical pipeline utilized principal component analysis (PCA) for dimensionality reduction and linear mixed-effects models incorporating Language, Gender, and Duration as fixed effects with Speaker as a random intercept to partition variance and test for systematic feature shifts.

## Results

Mixed-effects variance partitioning revealed that speaker identity is the dominant source of variation, with an intraclass correlation (ICCSpeaker) median of 0.56 across features, whereas language accounted for a median of only 0.5 percent of the variance. Benjamini-Hochberg corrected linear mixed models identified significant language effects in 18 of the 41 features, with French productions showing higher shimmer (Cohen's d = 0.90) and phrase-final F0 (d = 0.68), and Luxembourgish productions exhibiting significantly higher energy in low-to-mid spectral bands between 500 and 3750 Hz (e.g., d = -1.67 at 2750 Hz). A global composite charisma index derived from key prosodic dimensions showed no reliable main effect of language or language-by-gender interaction, confirming that language choice does not confer an overall global charisma advantage.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, sociolinguists, and researchers studying multilingual text-to-speech synthesis, voice conversion, or speaker profiling in bilingual communities.

## Limitations

The dataset is restricted to political speech from only ten high-profile speakers in a single bilingual speech community, and relies entirely on acoustic production analyses rather than listener perception experiments.

## Related

- (link related pages by id as the wiki grows)
