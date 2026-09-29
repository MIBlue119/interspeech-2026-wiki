---
id: nieto26_interspeech
category: asr
labels: [multilingual, dataset-or-benchmark-release]
institutions: ["Stanford University", "Google"]
code: https://doi.org/10.5281/zenodo.20575155
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-458
pdf: https://www.isca-archive.org/interspeech_2026/nieto26_interspeech.pdf
---

# Dialect Bias in Speech Recognition Across 10 Spanish and French Varieties

*Rodrigo Nieto, Maria Angelika-Nikita, Diane Sarkis, Diyi Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/nieto26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nieto26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-458)

**Category:** `asr` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — This paper investigates dialect bias in Spanish and French Automatic Speech Recognition across 10 varieties using a new 20-hour evaluation corpus, demonstrating that transcription errors are systematically driven by linguistic and acoustic distance from high-resource training distributions and originate primarily in the model decoder.

## Key contributions

- Constructed the first manually transcribed, gender-balanced evaluation corpus for Spanish and French (1,223 minutes, 129 speakers across 10 dialects) with country-level stratification.
- Benchmarked seven state-of-the-art ASR models (including Whisper v3, GPT-4o-Transcribe, Otter, Wav2Vec2, Qwen2-7B, and SALMONN-7B), uncovering significant non-uniform dialect and gender performance disparities.
- Conducted a two-pronged linguistic analysis utilizing Jensen-Shannon Divergence word-shifts to identify lexical failure modes (morphosyntactic correction, regionalisms, pragmatic markers) and speaker embeddings to measure acoustic distance.
- Performed diagnostic fine-tuning experiments (freezing encoder vs. decoder) that successfully localized dialect bias and error recovery to the decoder.

## Problem

ASR bias research has been overwhelmingly English-centric, leaving global languages with immense sociolinguistic diversity like Spanish and French underexplored. Furthermore, the underlying root causes of transcription disparities across dialects remain poorly understood. Prior approaches rely on resources like Common Voice that use standardized read speech, scrubbing away vital morphosyntax, regional discourse markers, and authentic phonetic variations. Understanding these mechanisms is critical to deploying equitable speech technologies in sensitive domains like legal and medical transcription.

## Method

The authors created an evaluation corpus by extracting conversational podcast audio from Apple Podcasts across 5 Spanish dialects (Spain, Mexico, Argentina, Chile, Dominican Republic) and 5 French dialects (France, Belgium, Canada, Senegal, Ivory Coast). Audio clips were segmented to 5-30 seconds, single-speaker filtered, and manually transcribed with regional orthography preserved. Seven models were evaluated, with Whisper v3 serving as the primary testbed for downstream analysis.

To diagnose error drivers, the study applied Jensen-Shannon Divergence (JSD) word-shift analysis on token-level probability distributions between correct transcripts and error corpora (substitutions, deletions, insertions). Acoustic analyses tested speaker embeddings from an external pyannote model and Whisper's Layer 16 encoder representations using Logistic Regression for dialect classification (LOSO-CV), global centroid distance, and anchor distance correlations. Finally, diagnostic LoRA fine-tuning (rank=32, alpha=64 on attention projections) of whisper-large-v3 was conducted under encoder-frozen and decoder-frozen conditions to isolate where adaptation succeeds or fails.

## Experimental setup

The evaluation corpus contains 1,223 minutes of audio (602 minutes across 5 Spanish dialects with 34 speakers; 621 minutes across 5 French dialects with 95 speakers), balanced for gender with at least 3 speakers per gender-dialect cell. Models benchmarked include Whisper v3, Whisper v2, GPT-4o-Transcribe, Otter, Wav2Vec2, Qwen2-7B, and SALMONN-7B, evaluated via Word Error Rate (WER). Statistical evaluations used Kruskal-Wallis H tests, Dunn's post-hoc tests with Bonferroni correction, and Mann-Whitney U tests.

## Results

Whisper v3 achieved the lowest overall WER across most dialects, though performance varied widely. In Spanish, Dominican Republic and Argentina achieved the lowest error rates (e.g., Dominican Male 2.58%, Argentine Female 1.93%), while Chile exhibited the highest error rates (Chilean Male 9.08%). In French, European varieties (France Male 4.90%, Belgium Male 3.51%) outperformed Canadian (Canada Male 6.24%) and African varieties (Senegal Male 8.82%, Ivory Coast Male 8.63%). Wav2Vec2 and SALMONN-7B struggled significantly more, with SALMONN-7B recording a 66.18% WER on Chilean Male speech.

Ablations on fine-tuning showed that Full LoRA yielded modest relative improvements (Spanish -10.7%, French -3.3%). Crucially, freezing the encoder produced near-identical results to full fine-tuning, while freezing the decoder eliminated gains (French decoder-frozen showed 5.51% WER vs 5.49% baseline), proving that the bottleneck lies in language-modeling priors rather than acoustic perception.

| System / Condition | Spanish - Spain (M) | Spanish - Chile (M) | French - France (M) | French - Senegal (M) |
|---|---|---|---|---|
| Whisper v3 | 6.14% | 9.08% | 4.90% | 8.82% |
| Whisper v2 | 7.28% | 9.76% | 5.13% | 9.17% |
| GPT4o-Transcribe | 14.28% | 15.96% | 10.56% | 19.09% |
| Wav2Vec2 | 27.81% | 45.98% | 32.91% | 50.24% |
| Qwen2-7B | 18.20% | 24.73% | 18.47% | 31.82% |

## Limitations

The evaluation corpus is restricted to 20 hours total across 10 dialects, resulting in small sample sizes per dialect-gender cell (minimum 3 speakers) which limited fine-grained intra-dialect speaker analysis. Podcast audio, while conversational, does not capture all registers or speaking styles. Furthermore, LoRA fine-tuning on this scale was insufficient to completely eliminate performance gaps across dialects, indicating that adapter updates cannot fully overwrite deeper model biases.

## Why read this

Speech and ML researchers building inclusive multilingual speech models should read this paper to understand the linguistic and architectural roots of dialectal bias. It provides a blueprint for constructing stratified non-English evaluation corpora and proves that ASR errors are largely decoder-driven language-modeling failures rather than perceptual encoder failures.

## Code

- https://doi.org/10.5281/zenodo.20575155

## Applications

Improving equitable speech recognition systems, voice-activated assistants, and automated transcription tools for public services, legal, and medical domains across diverse global dialects.

## Institutions / 機構

Stanford University, Google

## Related

- (link related pages by id as the wiki grows)
