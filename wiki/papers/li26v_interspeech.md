---
id: li26v_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1215
pdf: https://www.isca-archive.org/interspeech_2026/li26v_interspeech.pdf
---

# Tonal Contrasts in Different Vowel Contexts and Different Tonal Systems

*Mingxing Li, Pauline Bolin Liu, Yufeng Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/li26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1215)

**TL;DR** — This paper investigates how Chinese Xiang dialects realize tonal contrasts across different heights, vowel contexts, and inventory sizes using multi-dimensional acoustic measurements and XGBoost-SHAP modeling. Results show that high tones exhibit shorter durations, higher intensity, and greater periodicity (HNR, CPP), while high-front vowels [i] expand the F0 range and voice quality variation more than apical [ɹ̩] or low-back [a] vowels.

## Key contributions

- Evaluates multi-cue tone realization (F0 trajectories, mean F0, duration, intensity, H1*-H2*, HNR, CPP, and SoE) across two Chinese Xiang dialects (Shouyan and Meihua) with distinct tonal heights (3 vs. 4 levels).
- Analyzes the interaction between tone production and three distinct vowel contexts: apical [ɹ̩], high-front [i], and low-back [a].
- Employs XGBoost paired with SHAP analysis to quantify the relative importance and feature weightings of fundamental frequency versus voice quality cues in distinguishing tones.
- Demonstrates that complex tonal inventories with more height distinctions tend to recruit a broader array of non-F0 acoustic cues for reliable differentiation.

## Problem

Traditional tone research has heavily prioritized fundamental frequency (F0) as the primary or exclusive correlate of lexical tone, largely overlooking how secondary cues such as duration, intensity, and voice quality interact with different vowel contexts. Furthermore, prior work lacks systematic comparisons between dialects varying in the density of their tonal height inventories, leaving open questions about how phonetic micro-variation (like intrinsic vowel pitch and apical vs. non-apical vowel articulation) impacts tone space. Understanding these multi-dimensional interactions is critical for accurate modeling in speech technology, ASR, and phonetic typology, where tonal confusion often arises from ignoring context-dependent cue reweighting.

## Method

The study recorded monosyllabic words embedded in the carrier sentence 'I read __ nine times' from 9 Shouyan (SY) male speakers and 8 Meihua (MH) male speakers. SY features 6 tones with 3 level-tone heights (/43, 33, 11/), while MH features 6 tones with 4 level-tone heights (/55, 44, 33, 21/). Recordings were captured using a head-worn Shure SM10A-CN microphone connected to a Tascam DR-100MKIII recorder at 44.1 kHz / 16-bit. Acoustic segmentation and F0/intensity/duration extraction were performed via Praat and ProsodyPro 6.1.3, while voice quality parameters—including H1*-H2*, Harmonic-to-Noise Ratio (HNR35), Cepstral Peak Prominence (CPP), and Strength of Excitation (SoE)—were extracted using VoiceSauce in MATLAB R2025a.

Statistical evaluation utilized linear mixed-effects models (LMMs) and growth curve analysis (GCA) via R packages lme4, lmerTest, and afex, incorporating maximal random effect structures for Speaker and Item. Data were Z-score normalized prior to fitting. To assess cue importance, XGBoost classifiers integrated with SHAP (SHapley Additive exPlanations) were trained per vowel context using cross-validation and early stopping to quantify feature contributions, evaluate confusion matrices, and isolate how cue weightings shift between the 3-height SY system and the 4-height MH system.

## Experimental setup

The dataset comprises speech tokens collected from 17 native male speakers across two Chinese Xiang dialects (9 from Shouyan, 8 from Meihua) producing monosyllabic words across 3 vowel contexts ([ɹ̩], [i], [a]) with 9 repetitions per target word. Evaluations relied on growth curve analyses, linear mixed-effects models, confusion matrices, and XGBoost+SHAP feature importance metrics. Implementation was executed using Python/R for machine learning and statistical modeling, building on acoustic features extracted via Praat and VoiceSauce.

## Results

Growth curve analyses revealed that mean F0 differed significantly across all tone pairs across most vowel contexts (p < .05), with the [i] context inducing a consistently larger F0 range than [ɹ̩] and [a]. Higher tones systematically demonstrated shorter durations (e.g., t43 significantly shorter than t33 and t11 in SY, beta = -0.39 and -0.46 respectively, t < -9.1), higher overall intensity, and increased periodicity (higher HNR and CPP values, indicating less breathiness). XGBoost+SHAP feature importance rankings confirmed that while mean F0 remains the primary cue, systems with four height distinctions (MH) rely more heavily on secondary voice quality cues and cue reweighting compared to three-height systems (SY).

## Limitations

The study is restricted to male speakers from two specific Chinese Xiang dialects, limiting generalization across genders, age groups, and broader language families. The analysis focuses strictly on read speech elicited via a carrier sentence framework, which may not capture the phonetic reduction and cue variability present in spontaneous conversational speech. Furthermore, the dataset size is constrained to 17 total speakers, and acoustic measurements can be sensitive to micro-phonetic coarticulation effects not fully decoupled in the linear mixed-effects models.

## Why read this

Speech researchers and engineers working on tone modeling, cross-dialectal ASR, or TTS will appreciate this paper for its rigorous multi-cue analysis showing how vowel context dynamically alters acoustic feature weightings. It provides actionable empirical evidence that fundamental frequency alone is insufficient for modeling dense tonal inventories.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving acoustic modeling and multi-cue utilization in tone-dependent automatic speech recognition (ASR) and expressive text-to-speech (TTS) synthesis systems.

## Related

- (link related pages by id as the wiki grows)
