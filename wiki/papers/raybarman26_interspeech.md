---
id: raybarman26_interspeech
category: tts
labels: [multilingual]
institutions: ["Indian Institute of Technology Guwahati"]
code: https://github.com/snehagitrep/TTSEvalVH_interspeech2026.git
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3311
pdf: https://www.isca-archive.org/interspeech_2026/raybarman26_interspeech.pdf
---

# Towards a Phonology-Informed Evaluation of Multilingual TTS

*Sneha Ray Barman, Neeraj Kumar Sharma, Shakuntala Mahanta*

[PDF](https://www.isca-archive.org/interspeech_2026/raybarman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/raybarman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3311)

**Category:** `tts` · **Labels:** `multilingual`

**TL;DR** — The paper proposes a classifier-based phonological audit framework to detect systematic sound contrast failures in neural TTS, revealing that Meta's MMS TTS underproduces [+ATR] mid vowels in Assamese in one-third of tokens despite sounding natural.

## Key contributions

- A two-task evaluation pipeline that learns an acoustic-to-phonology mapping from human speech and transfers it cross-domain to audited synthesized speech.
- A human benchmark corpus of 14 native Assamese speakers (8,125 vowel tokens) annotated with Lobanov-normalized formants, B1 bandwidth, duration, height, and backness.
- A phonological faithfulness audit demonstrating a 7:1 underproduction-to-overgeneration bias for [+ATR] mid vowels in MMS TTS.
- Word-level harmony classification experiments proving that predicted ATR acoustic profiles outperform ground-truth phonological labels on TTS transfer.

## Problem

Standard neural TTS evaluation relies on Mean Opinion Scores (MOS), MUSHRA, and intelligibility metrics (WER/CER) that assess perceived global naturalness and word recoverability but completely miss phonological faithfulness errors. Even when a system sounds entirely natural to human listeners, it may systematically neutralize or misplace harmony-conditioned sound contrasts dictated by grammatical context. Existing automatic metrics like Mel Cepstral Distortion, PESQ, STOI, or speaker embedding similarities do not evaluate whether structured phonological alternations are preserved. This leaves a critical gap in evaluating whether TTS voices respect the phonological grammar of low-resource and linguistically diverse languages.

## Method

The authors construct a human benchmark corpus by recording 14 native Assamese speakers reading target words in a carrier frame ('moi X buli kolu'). Target vowels are manually sliced in Praat, extracting F1, F2, F3, B1 bandwidth at the 50% temporal midpoint, and total duration. Speaker-level Lobanov-normalization is applied to remove physiological variation. Meta's MMS TTS (mms-tts-asm) is used via Hugging Face with a fixed random seed to synthesize 114 target words (80 overlapping with human data, 34 unique) at 16 kHz mono, using global z-normalization across the TTS corpus.

Task 1 trains logistic regression (LR with L2 penalty, C=1.0, LBFGS solver) and random forest (RF with 200 estimators) classifiers on 7 features (normalized formants, B1, duration, height, backness) to predict binary ATR categories ([+ATR] vs [-ATR]). Four cross-domain transfer directions (H->H, H->TTS, TTS->TTS, TTS->H) are evaluated to isolate domain shift. A phonological faithfulness audit then compares ground-truth transcription labels against classifier-predicted ATR labels, categorizing discrepancies into overgeneration ([-ATR] -> [+ATR]) and underproduction ([+ATR] -> [-ATR]).

Task 2 evaluates word-level harmony classification into three categories (AgrYesMixNo, AgrYesMixYes, AgrNoMixYes) using an RF classifier. It leverages Feature Set A (11 acoustic aggregate features: mean/std of normalized formants, B1, duration, first/last vowel F1, vowel count) and Feature Set B (7 ATR sequence summary features: counts, proportion [+ATR], entropy, majority ATR, all-agree flag, switches). Set B uses either ground-truth labels (Bgroun/Bgld) or predicted labels (Bpred). The core design choice relies on comparing classifier transfer performance when using intended phonological targets versus realized acoustic properties to expose structural mismatches.

## Experimental setup

The human benchmark dataset contains 8,125 vowel tokens (4,793 [+ATR], 3,332 [-ATR]) across 14 speakers, while the TTS evaluation dataset comprises 114 words (281 vowel tokens after outlier removal). Evaluation metrics include classification accuracy (Acc), macro-averaged F1, and token mismatch rates with directional error breakdowns. Models include Logistic Regression and Random Forest classifiers, evaluated using 5-fold GroupKFold cross-validation by speaker for human baselines.

## Results

For Task 1, Logistic Regression maintains stable cross-domain transfer with 81.7% accuracy for H->H and 83.0% for H->TTS (macro-F1 flat at 0.81). Random Forest achieves higher within-domain human accuracy (90.5%, macro-F1 0.90) but suffers a drop on H->TTS (74.7% accuracy, macro-F1 0.73). In the phonological faithfulness audit, human speech exhibits a balanced mismatch rate of 18.5% with symmetric error directions (9.1% overgeneration, 9.4% underproduction). In contrast, MMS TTS shows an overall mismatch rate of 16.4% dominated by a 7:1 underproduction-to-overgeneration bias (14.2% undergeneration vs 2.1% overgeneration, chi-square p < 0.001), concentrated heavily in mid [+ATR] vowels /e/ and /o/ (mismatch rates of 32.7% and 30.8%).

For Task 2 word-level harmony classification, using ground-truth ATR labels with acoustic features (A+Bgld) collapses on TTS transfer, dropping from 88.8% (0.83 macro-F1) within-domain to 58.8% (0.49 macro-F1), which underperforms the acoustic-only baseline (A) at 71.1%. Conversely, using predicted ATR labels (A+Bpred) holds up substantially better on TTS transfer at 69.3% accuracy (0.62 macro-F1), demonstrating that the system's acoustic realizations diverge significantly from its intended phonological specifications.

| System / Condition | Accuracy (H->H) | Macro-F1 (H->H) | Accuracy (H->TTS) | Macro-F1 (H->TTS) |
| :--- | :--- | :--- | :--- | :--- |
| LR (Task 1 Vowel ATR) | 81.7% | 0.81 | 83.0% | 0.81 |
| RF (Task 1 Vowel ATR) | 90.5% | 0.90 | 74.7% | 0.73 |
| Acoustic Only (Set A, Task 2) | 84.0% | 0.76 | 71.1% | 0.64 |
| Acoustic + Ground-Truth ATR (A+Bgld) | 88.8% | 0.83 | 58.8% | 0.49 |
| Acoustic + Predicted ATR (A+Bpred) | 84.2% | 0.77 | 69.3% | 0.62 |

## Limitations

The evaluation is constrained to a single TTS system (Meta's MMS TTS), a single language (Assamese), and a single phonological phenomenon (Advanced Tongue Root vowel harmony), utilizing a relatively small and class-imbalanced TTS dataset (114 words). Certain categories like the vowel /U/ and the AgrNoMixYes word category had very few tokens, limiting statistical reliability for those specific subsets. Furthermore, the approach requires prior phonological description and measurable acoustic correlates (like F1/B1 shifts) to construct the human benchmark.

## Why read this

Speech researchers and TTS engineers working on low-resource or multilingual speech synthesis should read this to understand why high MOS scores can mask severe phonological failures. It provides a concrete, reproducible methodology for building classifier-based diagnostic audits that catch context-conditioned sound errors missed by standard intelligibility and naturalness metrics.

## Code

- https://github.com/snehagitrep/TTSEvalVH_interspeech2026.git

## Applications

Targeted diagnostic evaluation of multilingual and low-resource text-to-speech systems, linguistic diversity auditing, and improvement of phonological faithfulness in speech generation.

## Institutions / 機構

Indian Institute of Technology Guwahati

## Related

- (link related pages by id as the wiki grows)
