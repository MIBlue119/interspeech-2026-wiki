---
id: azad26_interspeech
category: health-clinical
institutions: ["Ministry of Defense", "Ability Center", "University of Rochester"]
code: https://github.com/Iqra-Eval/MSA_phonetiser
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3472
pdf: https://www.isca-archive.org/interspeech_2026/azad26_interspeech.pdf
---

# Harf-Speech: A Clinically Aligned Framework for Arabic Phoneme-Level Speech Assessment

*Asif Azad, MD Sadik Hossain Shanto, Mohammad Sadat Hossain, Bdour Alwuqaysi, Sabri Boughorbel, Yahya Bokhari, Abdulrhman Aljouie, Ayah Othman Sindi, Ehsan Hoque*

[PDF](https://www.isca-archive.org/interspeech_2026/azad26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/azad26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3472)

**Category:** `health-clinical`

**TL;DR** — Harf-Speech is a modular, open-source framework for clinically aligned phoneme-level Arabic pronunciation assessment that achieves an 8.92% phoneme error rate and a 0.791 Pearson correlation with expert speech-language pathologist scores.

## Key contributions

- Developed a complete, open-source, modular framework for Arabic phoneme-level speech assessment combining reference phonetization, speech-to-phoneme ASR, LLM segmentation, and blended edit-distance scoring.
- Fine-tuned and benchmarked multiple ASR architectures on an Arabic phoneme dataset, identifying OmniASR-CTC-1B-v2 as the top performer with an 8.92% PER and 0.004 RTF.
- Established a rigorous clinical validation benchmark using 40 utterances independently scored by three certified SLPs, demonstrating superior alignment over commercial black-box tools like Azure.
- Created a scoring mechanism combining longest common subsequence (LCS) ratio and Levenshtein-based accuracy and completeness metrics linearly mapped to a clinical 0-5 scale.

## Problem

Automated pronunciation evaluation is crucial for speech therapy and language learning, yet existing tools for Modern Standard Arabic (MSA)—which features complex emphatic/pharyngeal phonemes and diacritics—remain scarce and proprietary. Commercial platforms like Microsoft Azure operate as black-box systems without Arabic phonological localization or validation against professional speech-language pathologist (SLP) judgments. Consequently, their clinical validity for diagnosing articulation deficits in Arabic has been unverified, motivating an open and clinically grounded alternative.

## Method

The Harf-Speech pipeline operates in four automated stages. First, reference text is converted into a canonical phoneme sequence using an MSA phonetizer, normalized by removing suffixes and geminates. Second, the participant's audio is processed by a fine-tuned speech-to-phoneme ASR model (OmniASR-CTC-1B-v2) to predict the articulated phonemes directly. Third, an LLM segments and aligns the reference and predicted phoneme sequences into words, followed by Levenshtein distance calculation for substitutions (S), deletions (D), and insertions (I).

Fourth, a blended scoring algorithm computes an LCS Ratio (longest common subsequence scaled to 0-100) and a PronScore derived from Accuracy (1 - S/(N+S)) and Completeness (1 - D/(N+D)), where N is the reference phoneme count. The final score combines these via empirical weights (w_lcs = 0.6, w_pron = 0.4) and linearly maps them to a 0-5 clinical scale. Fine-tuning utilized mixed precision (FP16/BF16), gradient accumulation, and linear learning rate schedules on the IqraEval dataset combining native MSA speech, TTS-generated synthetic errors using a confusion matrix, and recorded real mispronunciations.

## Experimental setup

Evaluated using the IqraEval dataset containing fully vowelized MSA speech (native, synthetic, and real mispronunciations), with a random 500-sample validation subset used for benchmarking due to zero-shot inference constraints. Clinical validation used 40 curated samples rated on a 0-5 scale by three certified SLPs (8-10 years experience). Baselines included zero-shot multimodal models (Gemini-3-flash, Gemini-3-pro, Qwen3-ASR-1.7B) and commercial Azure Pronunciation Assessment. Metrics comprise Phoneme Error Rate (PER), Real-Time Factor (RTF), Pearson Correlation Coefficient (PCC), Spearman Correlation Coefficient (SCC), Intraclass Correlation Coefficient (ICC(2,1)), MAE, RMSE, exact agreement, and ±1 agreement.

## Results

OmniASR-CTC-1B-v2 achieved the lowest phoneme error rate of 8.92% and fastest inference speed (RTF 0.004), outperforming Wav2Vec2-LV60-CV (13.58% PER, RTF 0.009), Qwen3-ASR-1.7B (16.79% PER), and zero-shot Gemini-3-pro (15.07% PER, RTF 10.75). Against the mean expert SLP score, Harf-Speech reached a Pearson correlation of 0.791, an ICC(2,1) of 0.659, and a ±1 agreement rate of 76.9%, outperforming Azure Pronunciation Assessment which scored 0.635 PCC, 0.593 ICC, and higher MAE (0.94 vs 0.79).

| System | PCC vs Mean SLP | ICC(2,1) | MAE | ±1 Agreement (%) |
|---|---|---|---|---|
| Harf-Speech | **0.791** | **0.659** | **0.79** | **76.9** |
| Azure Pronunciation | 0.635 | 0.593 | 0.94 | 76.9 |

## Limitations

The clinical validation relies on a relatively small set of 40 utterances evaluated by three raters, which, while stable for initial reliability, warrants expansion to larger patient cohorts. Evaluation was restricted to Modern Standard Arabic (MSA), leaving dialectal Arabic variants untested. Additionally, zero-shot multimodal foundation models exhibited prohibitive inference latencies (e.g., RTF > 10 for Gemini-3-pro), limiting their real-time clinical deployment feasibility.

## Why read this

Speech and ML researchers building clinical AI tools will find a reproducible blueprint for building transparent, open-source pronunciation assessment frameworks that surpass proprietary black-box APIs in expert alignment.

## Code

- https://github.com/Iqra-Eval/MSA_phonetiser

## Applications

Automated speech therapy platforms, computer-assisted language learning (CALL) tools, and clinical articulation deficit screening.

## Institutions / 機構

Ministry of Defense, Ability Center, University of Rochester

## Related

- [IQRA 2026: Interspeech Challenge on Automatic Assessment Pronunciation for Modern Standard Arabic (MSA)](kheir26b_interspeech.md) — same problem · relatedness 2.4/3
- [A Fusion-Aware Two-Stage Framework for Mispronunciation Detection and Diagnosis in Low-Resource Modern Standard Arabic](yang26j_interspeech.md) — same problem · relatedness 2.4/3
- [Light-weight Pronunciation Assessment via Discrete Speech Token Surprisal](sara26_interspeech.md) — same problem · relatedness 2.3/3
- [Phoneme-Level Mispronunciation Screening in Polish-Speaking Children with an Explainable Assistant](dudek26_interspeech.md) — same problem · relatedness 2.2/3
- [ALFreeD: Teacher-Guided Few-Shot Pronunciation Assessment via Segmentation-Free Deviation Modeling](sirigiraju26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
