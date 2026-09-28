---
id: li26v_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1215
pdf: https://www.isca-archive.org/interspeech_2026/li26v_interspeech.pdf
---

# Tonal Contrasts in Different Vowel Contexts and Different Tonal Systems

[PDF](https://www.isca-archive.org/interspeech_2026/li26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1215)

**TL;DR** — This study investigates how acoustic properties and voice qualities realize contrastive tones across different vowel contexts and tonal systems, finding that higher tones generally exhibit shorter duration, higher intensity, and greater periodicity than lower tones.

## Problem

Tones are often assumed to rely primarily on fundamental frequency (F0), but recent work shows they integrate multiple acoustic cues. However, how these cues interact with varying vowel contexts—such as apical versus high-front and low-back vowels—and across tonal systems with different height inventories remains insufficiently understood. Understanding these dynamics is critical for capturing the multi-dimensional nature of lexical tone realization in natural speech.

## Method

The authors recorded monosyllabic words from two Chinese Xiang dialects: Shouyan (SY), which distinguishes tones at three height levels, and Meihua (MH), which uses four levels. Recordings were collected from 9 SY and 8 MH male speakers across three vowel contexts: apical [ɹ̩ ], high-front [i], and low-back [a]. Acoustic measurements included F0 trajectories, duration, intensity, and voice qualities like H1*-H2*, HNR, CPP, and Strength of Excitation (SoE). Data were analyzed using growth curve models and linear mixed-effects models, alongside XGBoost combined with SHAP values to quantify the relative importance of each acoustic feature.

## Results

Growth curve and linear mixed-effects analyses revealed significant main effects and interactions across tone categories and vowel contexts. The high-front vowel [i] consistently induced a wider F0 range for contrastive tones compared to [ɹ̩ ] and [a]. Higher tones were generally shorter in duration, higher in intensity, and exhibited greater periodicity (higher HNR and CPP) than lower tones, though exceptions occurred in the MH apical vowel context. XGBoost and SHAP analyses confirmed that F0 cues (such as mean F0) dominate tone distinction, while systems with more height distinctions (MH) tend to leverage a broader set of auxiliary cues.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians and speech engineers studying tone production, multi-cue speech synthesis, or dialectal speech recognition.

## Limitations

The study is restricted to male speakers from two specific Chinese Xiang dialects.

## Related

- (link related pages by id as the wiki grows)
