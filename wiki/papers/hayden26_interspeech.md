---
id: hayden26_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2749
pdf: https://www.isca-archive.org/interspeech_2026/hayden26_interspeech.pdf
---

# Accent-Emotion Entanglement in LM-Based Text-to-Speech Systems

*Matthew Hayden, Jinzuomu Zhong, Korin Richmond*

[PDF](https://www.isca-archive.org/interspeech_2026/hayden26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hayden26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2749)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — The paper identifies "accent-emotion entanglement," a phenomenon where emotion conditioning in zero-shot TTS systems unintentionally alters the speaker's accent, revealing that standard speaker similarity metrics fail to capture these synthesis errors.

## Key contributions

- Identifies and defines accent-emotion entanglement, showing how instruction or affective conditioning unintentionally shifts synthetic accents.
- Compares two language-model-based ZS-TTS systems (CosyVoice2 and MaskGCT) to demonstrate that high speaker similarity scores can mask severe accent instability.
- Proposes a multi-faceted evaluation framework combining accent SMOS listening tests, entropy of accent probability distributions, UMAP accent space projections, and centroid cosine distances.
- Demonstrates through subjective (30 listeners) and objective evaluations that CosyVoice2 exhibits major accent variance across emotions while MaskGCT remains stable.

## Problem

Modern zero-shot TTS systems rely heavily on automated speaker similarity metrics (such as ERes2Net and WavLM) to evaluate synthesis fidelity, frequently ignoring accent. However, relying on a single scalar metric hides critical errors, particularly when advanced conditioning methods like affective instruction prompts are used. This paper investigates why prior approaches overlook accent shifts and argues that failing to evaluate accent can lead to harmful cultural and regional stereotypes being propagated by synthetic voices.

## Method

The study conducts a case study comparing CosyVoice2 (0.5B Qwen2.5-based LLM with instruction fine-tuning) and MaskGCT (trained on 50k hours of Emilia English speech). The MEAD audio-visual dataset was used, selecting 4 reference speakers (M007, M012, W018, W033) portraying happy, angry, and neutral emotions at intensity level 2. For CosyVoice2, the prompt "Make this sound [emotion]" was provided alongside reference audio, whereas MaskGCT received only emotion-specific reference audio.

To measure accent consistency, 9 target sentences were each synthesized 100 times per condition (totaling 5,400 utterances per model setup), and passed through GenAID, an accent classification model yielding a probability distribution across 13 accents. The average entropy of these distributions was calculated. For deeper evaluation, penultimate-layer accent embeddings from GenAID were extracted to compute cosine distances to category centroids and generate 2D UMAP projections fitted against CommonAccent, VCTK, and MEAD ground-truth embeddings.

Subjective evaluation utilized Prolific, recruiting 30 native English-speaking L1 participants (balanced across sex and aged 25-64) across five countries to perform Accent SMOS (Similarity Mean Opinion Score) tests, comparing synthesized audio directly against ground-truth MEAD speaker recordings of identical content and emotion.

## Experimental setup

Evaluations used the MEAD audio-visual dataset (8 emotions, 3 intensity levels; specifically happy, angry, and neutral at intensity 2) across 4 speakers (M007, M012, W018, W033). Baselines compared were CosyVoice2 and MaskGCT. Metrics included Accent SMOS (Mean Opinion Scores), GenAID accent classification entropy, UMAP spatial visualization, and average cosine distance to accent centroids. Subjective testing involved 30 human listeners with 5 attention checks.

## Results

CosyVoice2 exhibited severe accent instability, with accent SMOS scores ranging widely from 1.17 to 4.13 across different texts and emotions, and high standard deviations (averaging 1.16). In contrast, MaskGCT maintained stable accent realization with SMOS scores predominantly above 3.3 and a low standard deviation of 0.26. CosyVoice2's centroid cosine distances were consistently higher across all speakers and emotions (reaching up to 0.058 for happy utterances) compared to MaskGCT (as low to 0.010), confirming spatial dispersion in UMAP projections where happy and angry generations drifted into South Asian or African accent clusters.

| System | Emotion | Accent SMOS (Text 021) | Accent SMOS (Text 027) | Cosine Distance to Centroid |
|---|---|---|---|---|
| CosyVoice2 | Angry | 1.33 ± 1.03 | 2.63 ± 1.24 | 0.032 |
| CosyVoice2 | Happy | 1.17 ± 0.49 | 4.13 ± 1.06 | 0.055 |
| CosyVoice2 | Neutral | 4.13 ± 0.87 | 4.00 ± 0.85 | 0.035 |
| MaskGCT | Angry | 3.75 ± 1.14 | 4.13 ± 0.90 | 0.017 |
| MaskGCT | Happy | 3.79 ± 1.20 | 3.83 ± 1.07 | 0.010 |
| MaskGCT | Neutral | 4.33 ± 0.78 | 3.83 ± 1.03 | 0.026 |

## Limitations

The study is limited by testing only two zero-shot TTS architectures and a restricted pool of four reference speakers from a single dataset (MEAD) due to subjective evaluation budget constraints. The authors hypothesize root causes for CosyVoice2's behavior—such as automated data labeling artifacts via SenseVoice or demographic imbalances in instruction tuning data—but cannot definitively confirm them due to proprietary training data.

## Why read this

Speech and ML researchers developing zero-shot or instruction-based TTS models should read this paper to understand that standard speaker similarity metrics are insufficient for comprehensive evaluation. It provides a concrete blueprint for combining automated embedding geometry (UMAP/cosine distance) with human listening tests to catch hidden synthesis pathologies like accent drift.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing zero-shot text-to-speech systems for geographic and demographic bias, designing robust multi-modal evaluation pipelines for affective TTS, and developing bias-free instruction-tuned speech generation models.

## Institutions / 機構

University of Edinburgh

## Related

- (link related pages by id as the wiki grows)
