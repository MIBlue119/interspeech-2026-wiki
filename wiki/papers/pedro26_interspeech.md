---
id: pedro26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1324
pdf: https://www.isca-archive.org/interspeech_2026/pedro26_interspeech.pdf
---

# How Bilingual Are SSL Speech Models? Cross-Lingual Probing of Articulatory Encoding with Finnish and Russian EMA

*Ailín Pollio San Pedro, Tomi H. Kinnunen, Alexandre Nikolaev, Ruchi Pandey*

[PDF](https://www.isca-archive.org/interspeech_2026/pedro26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pedro26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1324)

**TL;DR** — This paper investigates how self-supervised speech models encode physical articulatory movements across languages, using electromagnetic articulography (EMA) data from bilingual Finnish-Russian speakers. It demonstrates that intermediate network layers predict articulatory trajectories with strong correlations (Pearson r up to 0.78) using only 5 minutes of data, with multilingual and fine-tuned models outperforming monolingual counterparts.

## Key contributions

- First systematic SSL-EMA probing analysis on Finnish and Russian, addressing typologically distinct languages with vowel harmony, quantity contrasts, and palatalization.
- First cross-lingual probing evaluation across native (L1), second-language (L2), and foreign-accent imitated speech conditions in bilingual speakers.
- Comprehensive comparison of layer-wise and sensor-wise articulatory encoding across controlled read speech and spontaneous comic-strip narration tasks.
- Quantification of probe training data efficiency, revealing performance saturation at approximately 5 minutes of paired acoustic-articulatory data.

## Problem

While self-supervised learning (SSL) models like wav2vec 2.0, HuBERT, and WavLM are widely used as feature extractors, the degree to which their latent representations capture physical speech production dynamics across typologically diverse languages remains poorly understood. Prior acoustic-to-articulatory inversion (AAI) and probing studies have predominantly focused on monolingual English settings and controlled read speech. This leaves open critical questions regarding how cross-lingual transfer, spontaneous speaking styles, task structure, and speaker proficiency modulate the accessibility of articulatory geometry in SSL hidden states.

## Method

The study passes speech recordings through 24-layer pretrained SSL encoders (each with 1024-dimensional hidden representations) to extract frame-level latent vectors from all transformer layers. The evaluated models include Wav2Vec 2.0 Large (English), MMS-300m, XLSR-53, a Russian fine-tuned XLSR-53, and a Finnish fine-tuned XLS-R. Continuous articulatory features are obtained from the FROST-EMA corpus across five active sensors: tongue tip (TT), tongue anteo-dorsum (TB), tongue dorsum (TD), upper lip (UL), and lower lip (LL). For each sensor, X (back-front) and Z (up-down) coordinates are extracted at 1250 Hz, z-normalized independently per recording, low-pass filtered using a Butterworth filter, and decimated to 50 Hz to match the SSL feature frame rate.

A linear regression framework (linear probe) is trained per speaker to map 1024-dimensional SSL features from a given transformer layer to 10 continuous EMA trajectories (5 sensors x 2 axes). Data are split 80/20 into train and test sets, and performance is evaluated via the Pearson correlation coefficient (r) computed per dimension and averaged across channels and speakers (articulatory score). Five experimental setups evaluate cross-model differences, layer-sensor profiles, training-size sensitivity (20 seconds to 20 minutes), leave-one-speaker-out (LOSO) cross-validation for speaker generalization, and the effects of task structure (read vs. spontaneous) and language proficiency (L1, L2, and accent-imitated speech).

## Experimental setup

Experiments use the FROST-EMA corpus containing parallel audio and 1250 Hz EMA data from 18 bilingual Finnish-Russian speakers across 3 tasks (North Wind and the Sun, carrier sentences, and spontaneous comic narration) and 3 language conditions (L1, L2, and L1 with L2 accent imitation). Models evaluated include Wav2Vec 2.0 Large, MMS-300m, XLSR-53, and language-specific fine-tuned variants. Evaluation metrics rely on Pearson correlation coefficients (r) between predicted and reference EMA trajectories under both within-speaker and leave-one-speaker-out (LOSO) configurations.

## Results

MMS-300m and language fine-tuned variants achieve the highest overall mean articulatory scores (r ≈ 0.69), outperforming Wav2Vec 2.0 Large (r = 0.641) and XLSR-53 (r = 0.620). Layer-wise profiles show that articulatory predictability peaks at intermediate transformer layers before dropping sharply in the deepest layers (especially for XLSR-53 at layers 22-23). Training size sensitivity analysis demonstrates that linear probe performance rises sharply up to 300 seconds (5 minutes) of paired data, after which it stabilizes. In LOSO cross-validation with MMS-300m, peak per-speaker correlations reach r ≈ 0.78, with tongue sensors (TB, TT) yielding more consistent predictions than vertical upper lip movements (UL_Z). Controlled reading tasks yield substantially higher correlations (r ≈ 0.70–0.74) compared to spontaneous picture description (r ≈ 0.58–0.62), though L2 speech closely matches L1 accuracy in several channels (up to r ≈ 0.76).

| System / Condition | Mean Pearson r | Peak Layer Behavior |
|---|---|---|
| Wav2Vec 2.0 Large (EN) | 0.641 | Intermediate peak, sharp drop in deep layers |
| MMS-300m (Multilingual) | 0.689 | Intermediate peak, smooth late-layer drop |
| XLSR-53 (Multilingual) | 0.620 | Sharp correlation crash at layers 22-23 |
| XLSR-53 (RU Fine-tuned) | 0.689 | High stability across middle-to-late layers |
| XLS-R (FI Fine-tuned) | 0.686 | Strong alignment across intermediate layers |

## Limitations

The study is constrained by relying on a modest cohort of 18 bilingual Finnish-Russian speakers from a single specialized articulatory corpus (FROST-EMA), limiting phonetic and dialectal diversity. The probing framework utilizes a simple linear regression model, which cannot capture non-linear articulatory mappings or complex gestural timing dependencies. Additionally, the analysis excludes lateral (Y-axis) motion and suffers from inherent inter-speaker anatomical and sensor-placement variability.

## Why read this

Speech researchers and ML engineers should read this paper to understand where physical speech production properties reside inside multilingual transformer representations, and how task structure and fine-tuning affect articulatory decodability. It offers actionable insights for building accent-robust, low-resource articulatory and speech-to-articulatory inversion models using compact paired training data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource articulatory modeling, acoustic-to-articulatory inversion, clinical speech analysis, and computer-assisted pronunciation training for L2 learners.

## Related

- (link related pages by id as the wiki grows)
