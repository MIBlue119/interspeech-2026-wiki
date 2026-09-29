---
id: marcinek26_interspeech
category: paralinguistics-emotion
labels: [robustness-noise]
institutions: ["KTH Royal Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2747
pdf: https://www.isca-archive.org/interspeech_2026/marcinek26_interspeech.pdf
---

# Vocal Effort Modulation Strategies: A Cross-Corpus Taxonomy with Noise Robustness and ASR Implications

*Lubos Marcinek, Jonas Beskow, Joakim Gustafson*

[PDF](https://www.isca-archive.org/interspeech_2026/marcinek26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/marcinek26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2747)

**Category:** `paralinguistics-emotion` · **Labels:** `robustness-noise`

**TL;DR** — This paper provides the first formal clustering of inter-speaker vocal effort strategies, identifying three stable types (High Modulators, Spectro-Temporal speakers, and Conservative Modulators) via linear acoustic slopes across effort levels, and demonstrates their impact on noise robustness and ASR performance.

## Key contributions

- First formal data-driven clustering of vocal effort strategies using the AVID corpus, identifying three distinct, stable speaker types.
- Acoustic slope representation across all four effort levels yielding 96-98% cross-validated cluster prediction accuracy (macro-F1 = 0.97).
- Noise robustness validation across 840,000 utterances, 12 noise types, and 7 SNR levels, establishing +10 dB SNR as the practical profiling boundary.
- Cross-corpus replication in French Lombard speech (FLombard) showing high correspondence for the Conservative cluster (cosine = 0.873).
- Cluster-stratified ASR analysis revealing systematic WER differences, showing that Conservative speakers consistently yield lower WER than High Modulators.

## Problem

While the Lombard effect and vocal effort adjustments are extensively studied, prior literature treats inter-speaker variability merely as noise around population averages rather than as a structured behavioral signal. Existing effort-controllable TTS systems and speech applications apply uniform acoustic transformations regardless of speaker identity, ignoring individual adaptation strategies. This gap causes suboptimal performance in expressive synthesis and fails to explain systematic disparities in speech recognition robustness across speakers.

## Method

The study analyzes 50 speakers from the AVID corpus (25F, 25M) recorded at four ordinal effort levels: soft (0), normal (1), loud (2), and very loud (3). For each speaker, ordinary least squares slopes are computed across levels for four features: median F0 (Praat, Hz/level), RMS energy (dB/level), spectral tilt (log-ratio of energy above vs. below 1 kHz), and speaking rate (syllables/second via envelope peak-counting). All features are z-score standardized without session normalization.

K-means clustering (k-means++, 100 restarts) with k=3 is selected based on maximum stability (pairwise ARI = 0.651 across 30 random subsamples of 40 speakers), balanced sizes, and interpretability. Multinomial logistic regression evaluated via a leave-one-sample-out (LOSO) cross-validation protocol predicts cluster membership, where clusters are recomputed on training speakers and test speakers are assigned to the nearest centroid. Noise robustness is tested by mixing 840,000 utterances across 12 noise types and 7 SNRs (-15 to +15 dB). Cross-corpus validation applies the same pipeline to the FLombard corpus (4 effort levels, 0-85 dB SPL noise).

## Experimental setup

Evaluated on the AVID corpus (50 speakers, 10,000 utterances) and validated on the FLombard corpus (38 speakers) and 840,000 noise-mixed utterances using 12 noise types (bus, car, metro, traffic, station, cafeteria, restaurant, meeting room, office, kitchen, living room, washing machine). Baselines include K-means solutions at alternative k values (k=2 through 6), Gaussian Mixture Models (GMM), and pairwise soft-to-loud difference features. Metrics include silhouette score, gap statistic, Adjusted Rand Index (ARI), macro-F1, Tukey HSD ANOVA effect sizes (eta-squared), cosine similarity, and Word Error Rate (WER) using Whisper-base and Wav2Vec2-base.

## Results

One-way ANOVA confirms significant differences across clusters for all features (F(2, 47) = 7.72 to 28.29, all p < 10^-5, eta^2 = 0.25 to 0.55). The three clusters are: C1 High Modulators (n=12, F0 slope +32.9 Hz/lev, RMS +7.7 dB/lev), C2 Spectro-Temporal (n=19, tilt +0.12, rate -0.21 syl/s/lev), and C3 Conservative (n=19, F0 +11.8 Hz/lev, RMS +5.4 dB/lev). LOSO cross-validation achieves 96-98% accuracy (macro-F1 = 0.97, ARI = 0.93). Feature slope representation outperforms pairwise soft-to-loud features (84% vs 96-98% predictability).

In noise robustness evaluations, cluster assignments are strongly recoverable at SNR >= +10 dB across all noise types (ARI = 0.86 overall) but drop to chance below -5 dB for speech/babble noise. Cross-corpus replication with FLombard yields a strong Conservative cluster match (cosine = 0.873) and mirrors the Spectro-Temporal female lean. In ASR evaluations, Conservative speakers (C3) consistently achieve lower WER than High Modulators (C1) across all SNRs for both Whisper and Wav2Vec2 (Wav2Vec2 ANOVA eta^2 = 0.026, p < 0.0001), indicating that models are penalized by large acoustic deviations rather than rewarded by increased contrast.

| Cluster | F0 Slope (Hz/lev) | RMS Slope (dB/lev) | Tilt Slope | Rate Slope (syl/s/lev) | N |
| --- | --- | --- | --- | --- | --- |
| C1: High Modulators | +32.9 | +7.7 | -0.04 | -0.05 | 12 |
| C2: Spectro-Temporal | +26.0 | +6.6 | +0.12 | -0.21 | 19 |
| C3: Conservative | +11.8 | +5.4 | +0.01 | -0.11 | 19 |

## Limitations

The silhouette score at k=3 is modest (0.239), reflecting the continuous underlying nature of phonatory strategies. The gender association within AVID is directional but non-significant (p = 0.113), requiring validation on larger datasets before drawing mechanistic conclusions. The FLombard cross-corpus replication is partial due to differences between English instructed effort and French noise-induced Lombard speech. Furthermore, GMM clustering yields a different partition (ARI = 0.23), indicating that cluster boundaries are sensitive to distributional assumptions.

## Why read this

Speech and ML researchers building effort-controllable TTS or noise-robust ASR should read this to understand that speaker-dependent modulation strategies cannot be modeled with uniform scaling. The paper provides a lightweight, validated four-feature taxonomy and classifier that can be integrated directly into modern speech architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speaker-adaptive and effort-controllable text-to-speech synthesis, cluster-stratified data augmentation for robust automatic speech recognition, and conversational agent speech style adaptation.

## Institutions / 機構

KTH Royal Institute of Technology

**Funding / 經費:** WASP, Digital Futures

## Related

- [Synthesizing the Lombard Effect: Multi-Level Control of Speech Clarity and Vocal Effort in TTS](akti26_interspeech.md) — same problem · relatedness 2.0/3
- [The ArtComp dataset: Articulatory and Acoustic Measurements of Swedish in Speech with Naturally Manipulated Jaw Position](cortes26_interspeech.md) — complementary · relatedness 1.8/3
- [Adaptive AVSR: Integrating Speaker and Environmental Embeddings for Robust Audio-Visual Speech Recognition](simic26_interspeech.md) — complementary · relatedness 1.8/3
- [VIB-AVSR: Variational Information Bottleneck for Noise-Robust LLM-Based Audio-Visual Speech Recognition](arora26b_interspeech.md) — same problem · relatedness 1.8/3
- [Whisper-Aware LLM: Self-Supervised Uncertainty Learning for Robust Whispered Speech Recognition](xu26g_interspeech.md) — complementary · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
