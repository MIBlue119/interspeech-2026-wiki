---
id: azad26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3472
pdf: https://www.isca-archive.org/interspeech_2026/azad26_interspeech.pdf
---

# Harf-Speech: A Clinically Aligned Framework for Arabic Phoneme-Level Speech Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/azad26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/azad26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3472)

**TL;DR** — Harf-Speech is a modular, open-framework for automated Modern Standard Arabic phoneme-level pronunciation assessment that achieves a 0.791 Pearson correlation with expert speech-language pathologists.

## Problem

Automated speech pronunciation assessment is critical for speech therapy and language learning, but existing validated tools for Modern Standard Arabic remain scarce. Commercial platforms like Microsoft Azure are proprietary, lack localization for Arabic phonology, and have never been formally validated against clinical expert judgments. This leaves a major gap in providing scalable, interpretable, and clinically aligned feedback for Arabic speakers.

## Method

The system pipeline combines an MSA phonetizer for ground-truth phoneme generation, a fine-tuned ASR model for speech-to-phoneme conversion, an LLM segmentator, Levenshtein alignment, and a blended scoring algorithm. The authors fine-tuned three distinct ASR architectures (Wav2Vec2, Qwen3-ASR-1.7B, and OmniASR-CTC-1B-v2) on the IqraEval dataset comprising native speech, rule-based synthetic mispronunciations from a confusion matrix, and recorded real mispronunciations. The final pronunciation score integrates the Longest Common Subsequence (LCS) ratio and a weighted combination of phonetic accuracy and completeness mapped to a 0-5 clinical scale.

## Results

Benchmarked on an IqraEval validation subset, OmniASR-CTC-1B-v2 achieved the best phoneme error rate of 8.92% and a real-time factor of 0.004, substantially outperforming zero-shot multimodal models like Gemini-3-pro (15.07% PER) and Qwen3-ASR-1.7B (16.79% PER). In clinical validation across 40 utterances evaluated by three certified speech-language pathologists, Harf-Speech attained a Pearson correlation of 0.791, an ICC(2,1) of 0.659, and a mean absolute error of 0.79 with mean expert scores. Harf-Speech outperformed the Azure baseline across all metrics, reducing MAE by 16% and improving Pearson correlation by 0.156.

## Code

- https://github.com/Iqra-Eval/MSA_phonetiser

## Applications

Speech-language pathologists, clinicians, and educators building automated tools for scalable Arabic speech therapy, articulation deficit diagnosis, and language learning.

## Related

- (link related pages by id as the wiki grows)
