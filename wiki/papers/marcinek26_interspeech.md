---
id: marcinek26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2747
pdf: https://www.isca-archive.org/interspeech_2026/marcinek26_interspeech.pdf
---

# Vocal Effort Modulation Strategies: A Cross-Corpus Taxonomy with Noise Robustness and ASR Implications

[PDF](https://www.isca-archive.org/interspeech_2026/marcinek26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/marcinek26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2747)

**TL;DR** — This paper establishes a data-driven taxonomy of speaker vocal effort strategies using multidimensional acoustic slope profiling, identifying three stable types that exhibit distinct noise robustness, cross-corpus consistency, and ASR word error rate impacts.

## Problem

Prior speech research and effort-controllable text-to-speech systems typically treat inter-speaker variability in vocal effort as random noise around population averages, applying uniform transformations without accounting for distinct speaker strategy types. This failure to model individual adaptation profiles limits speech technology personalization and obscures how different modulation tactics interact with environmental noise and recognition models.

## Method

The authors analyze 50 speakers from the AVID corpus recorded across four effort levels (soft, normal, loud, very loud) by fitting ordinary least squares slopes for four acoustic dimensions: F0, RMS energy, spectral tilt (energy above/below 1 kHz), and speaking rate. Using K-means clustering ($k=3$, selected via silhouette score, gap statistic, and stability ARI across 30 random subsamples of 40 speakers), they categorize speakers into distinct strategy groups. They validate the taxonomy across 840,000 noise-mixed utterances spanning 12 noise types and SNR levels from -15 to +15 dB, replicate findings on the French FLombard corpus, and evaluate downstream ASR word error rates using Whisper-base and Wav2Vec2-base.

## Results

One-way ANOVA confirms significant differences across clusters for all features ($F(2,47)=7.72$ to $28.29$, all $p<10^{-5}$, $\eta^2=0.25$ to $0.55$), yielding three groups: High Modulators ($n=12$), Spectro-Temporal speakers ($n=19$), and Conservative Modulators ($n=19$). A corrected leave-one-speaker-out (LOSO) multinomial logistic regression classifier achieves 96–98% accuracy (macro-F1 = 0.97, ARI = 0.93). Noise validation shows cluster assignments are robustly recoverable at $\text{SNR} \ge +10\text{ dB}$ (mean ARI = 0.86), while cross-corpus replication on FLombard matches the Conservative type with a cosine similarity of 0.873. Stratified ASR evaluation reveals that Conservative speakers consistently yield lower word error rates than High Modulators across all SNRs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building effort-controllable text-to-speech (TTS), speaker-adaptive voice cloning, and robust automatic speech recognition (ASR) data augmentation strategies can use this taxonomy to tailor models to individual speaker modulation profiles.

## Limitations

Gender shows only a directional, non-significant association with cluster membership within the AVID corpus ($\chi^2=4.37, p=0.113$), and cluster-based ASR performance degrades severely at SNRs below $+5\text{ dB}$ for speech-like noise.

## Related

- (link related pages by id as the wiki grows)
