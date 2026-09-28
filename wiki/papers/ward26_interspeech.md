---
id: ward26_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-390
pdf: https://www.isca-archive.org/interspeech_2026/ward26_interspeech.pdf
---

# The Interspeech 2026 Challenge on Transfer of Pragmatic Intent in Speech-to-Speech Translation

[PDF](https://www.isca-archive.org/interspeech_2026/ward26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ward26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-390)

**TL;DR** — This paper presents the Interspeech 2026 challenge on Transfer of Pragmatic Intent in Speech-to-Speech Translation (S2ST), evaluating systems on their ability to preserve prosody and interpersonal stance across languages.

## Problem

Current speech-to-speech translation systems prioritize semantic fidelity and output naturalness while ignoring interpersonal and pragmatic goals conveyed through prosody. This gap prevents S2ST models from ideally supporting natural conversations across language barriers. The challenge establishes benchmarks and datasets to measure how well current technology transfers pragmatic intent and identifies which functions remain unhandled.

## Method

The challenge evaluates systems across two primary conditions: audio-to-audio S2ST (C1) and prosodic feature-mapping (C2) using 103 English and 101 Spanish average-pooled HuBert features. Four university teams submitted systems: CUHK-SZ used a cascaded pipeline (Whisper, Qwen2.5-72B-Instruct, and FishAudio/OpenaAudio-S1-Mini) conditioned on source speech and text prompts; MUC employed a transformer-based feature-mapper with an enhanced Marco loss function; BLCU utilized a retrieval-augmented approach mapping to similarity-weighted averages of 70 training neighbors; and PAPTAN combined techniques from Seamless and Hibiki. Evaluation utilized both human subjective scoring on a 1-to-5 scale across 59 dialog sets and the automated Segura metric based on HuBert feature cosine similarity.

## Results

In the Spanish-to-English audio condition (59 sets, 4 bilingual judges), the CUHK-SZ system achieved a mean human rating of 3.46 (std. dev. 0.63) compared to 2.98 (std. dev. 0.64) for the Seamless baseline, while human re-enactments scored 4.59. All subjective performance differences were statistically significant at p < 0.01. On the automated Segura metric for C1, CUHK-SZ scored 0.7270 versus Seamless at 0.7175. For the English-to-Spanish feature-mapping condition, MUC achieved the highest Segura score of 0.8601, closely followed by the baseline MLP at 0.8574, BLCU at 0.8288, and PAPTAN at 0.6259. Qualitative analysis revealed that both S2ST systems defaulted to neutral read-style speech, successfully conveying fewer than 30% of the pragmatic functions present in original utterances.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building conversational speech-to-speech translation systems, cross-lingual communication tools, and speech assistants that need to preserve emotional stance and speaker intent.

## Limitations

The automated Segura metric is non-comparable across audio and feature-mapping conditions and occasionally shows over-sensitivity to hesitation and confidence nuances.

## Related

- (link related pages by id as the wiki grows)
