---
id: pandey26_interspeech
category: phonetics-linguistics
labels: [multilingual, dataset-or-benchmark-release, robustness-noise]
institutions: ["University of Eastern Finland"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1914
pdf: https://www.isca-archive.org/interspeech_2026/pandey26_interspeech.pdf
---

# Beyond Speaker Independence: Evaluating Cross-Lingual Acoustic-to-Articulatory Inversion Across Finnish and Russian

*Ruchi Pandey, Tomi H. Kinnunen*

[PDF](https://www.isca-archive.org/interspeech_2026/pandey26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pandey26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1914)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`, `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — This paper establishes the first systematic acoustic-to-articulatory inversion (AAI) benchmarks on the bilingual Finnish-Russian FROST-EMA corpus, demonstrating that cross-language domain shifts degrade inversion performance (Pearson r drops of 0.10–0.20) more severely than cross-gender shifts (0.05–0.10 drops).

## Key contributions

- Introduced standardized AAI benchmarking and data preprocessing pipelines for the 18-speaker bilingual FROST-EMA corpus.
- Defined controlled evaluation protocols to independently isolate cross-gender (within-language) and cross-language (within-gender) domain shifts.
- Conducted a systematic ablation study across acoustic front-ends, articulatory targets, and network back-ends.
- Quantified that language-specific phonological factors (such as Russian palatalization) cause tongue constriction variables to degrade more under cross-lingual transfer than lip aperture.

## Problem

Prior acoustic-to-articulatory inversion (AAI) research suffers from a heavy English bias and limited speaker diversity, relying predominantly on small datasets like MOCHA-TIMIT and mngu0. Although deep neural networks model coarticulation well, they degrade unpredictably under domain shifts such as cross-speaker, cross-gender, and cross-language scenarios. Previous cross-linguistic studies failed to systematically isolate gender from language as independent factors or evaluate modern self-supervised learning front-ends, limiting progress toward truly robust, speaker-independent AAI.

## Method

The AAI pipeline takes head-movement-corrected AG501 EMA trajectories sampled at 1250 Hz, processes them through linear interpolation, a 6th-order low-pass Butterworth filter at 20 Hz, polyphase resampling to 50 Hz, and per-utterance z-score normalization. The target space compares 10-dimensional Raw EMA coordinates (upper/lower lips, tongue tip, blade, dorsum; X and Z axes) against a 5-dimensional tract variable (TV) representation (lip aperture, lip protrusion, and three tongue constriction locations). Acoustic front-ends comprise a 40-dim MFCC baseline and three frozen self-supervised models: Wav2Vec 2.0 Base (768-dim), XLSR-53 Large (1024-dim), and MMS-300m (1024-dim), utilizing features from their final encoder layers without fine-tuning.

For the inversion back-ends, the paper evaluates a 2-layer BiLSTM with 256 hidden units per direction followed by a 2-layer MLP, and a lightweight Transformer encoder ('Attn-lite') featuring 4 attention layers, 4 heads, a 256 embedding dimension, and a 512 feedforward dimension. Models are trained on non-overlapping 2-second windows (100 frames) using the Mean Squared Error (MSE) loss function optimized with Adam (learning rate 1e-3, batch size 8) for up to 50 epochs with early stopping (patience 8). Evaluation metrics rely on per-dimension Pearson correlation coefficient (r) between predicted and reference articulatory trajectories.

## Experimental setup

Experiments are conducted on the FROST-EMA corpus containing 18 bilingual speakers (11 Finnish, 7 Russian; 8 female, 10 male) divided into FIN-M (5), FIN-F (6), RUS-M (5), and RUS-F (2) groups. Baselines are compared across MFCCs versus SSL front-ends, BiLSTM versus Attn-lite back-ends, and Raw EMA versus Tract Variables. Evaluation uses leave-one-speaker-out (LOSO) in-domain splits, cross-gender transfer, and cross-language transfer protocols, reporting Pearson correlation (r) across articulatory dimensions.

## Results

In-domain leave-one-speaker-out (LOSO) baselines using Wav2Vec 2.0 with BiLSTM achieved peak per-channel Pearson correlations reaching approximately 0.40–0.50 for vertical tongue coordinates and tract variable tongue constriction locations. For cross-gender transfer, performance dropped moderately by r = 0.05–0.10, with Finnish female-to-male transfer outperforming male-to-female (e.g., tongue tip r of 0.46 vs 0.34). Cross-language transfer caused larger degradations of r = 0.10–0.20, and combined language-plus-gender (L+G) shifts produced the most severe drops. In the systematic ablation, self-supervised front-ends (Wav2Vec 2.0 and MMS-300m) consistently outperformed MFCCs (e.g., achieving ID LOSO TV correlations of 0.49 vs 0.42 for MFCC), while BiLSTM outperformed the Attn-lite Transformer across all configurations.

| System / Condition | Front-End | Target | LOSO (ID) | Cross-Gender (G) | Cross-Language (L) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| BiLSTM (FIN-M) | MFCC | Raw EMA | 0.30 | 0.27 | 0.32 |
| BiLSTM (FIN-M) | Wav2Vec 2.0 | Raw EMA | 0.40 | 0.35 | 0.35 |
| BiLSTM (FIN-M) | MMS-300m | Raw EMA | 0.41 | 0.34 | 0.30 |
| BiLSTM (FIN-M) | Wav2Vec 2.0 | Tract Var | 0.49 | 0.34 | 0.39 |
| Attn-lite (FIN-M) | Wav2Vec 2.0 | Tract Var | 0.42 | 0.30 | 0.35 |
| Attn-lite (FIN-M) | MMS-300m | Tract Var | 0.44 | 0.30 | 0.29 |

## Limitations

The evaluation is constrained by a small female Russian speaker pool (only 2 speakers in RUS-F), making certain cross-language and cross-gender directions less statistically robust. The analysis is restricted strictly to L1 native speech productions, omitting L2 proficiency effects and imitated foreign accent conditions available in FROST-EMA. Furthermore, constriction degree (CD) tract variables could not be computed due to the lack of palate-trace references in the corpus.

## Why read this

Speech researchers and ML engineers building cross-lingual or speaker-independent articulatory inversion systems should read this paper to understand the compounding effects of language and gender domain shifts. It provides clear architectural and front-end recipes—proving that recurrent BiLSTMs paired with frozen SSL representations like Wav2Vec 2.0 or MMS-300m outperform attention models and standard DSP features under low-resource EMA constraints.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Pronunciation training tools, speech synthesis, and automatic speech recognition systems utilizing articulatory features.

## Institutions / 機構

University of Eastern Finland

## Related

- [Towards Language-Agnostic Speech Inversion](tabatabaee26_interspeech.md) — same problem · relatedness 2.6/3
- [Acoustic-to-Articulatory Inversion of Clean Speech Using an MRI-Trained Model](azzouz26_interspeech.md) — same problem · relatedness 2.5/3
- [ArtBoost: Synthetic Articulatory Data Augmentation for Acoustic-to-Articulatory Inversion](kim26f_interspeech.md) — same problem · relatedness 2.3/3
- [How Bilingual Are SSL Speech Models? Cross-Lingual Probing of Articulatory Encoding with Finnish and Russian EMA](pedro26_interspeech.md) — shared data / evaluation · relatedness 2.2/3
- [Articulatory Entrainment and Coordination Complexity in Spontaneous Autistic and Non-autistic Dialogue](withanage26_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
