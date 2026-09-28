---
id: anand26b_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3357
pdf: https://www.isca-archive.org/interspeech_2026/anand26b_interspeech.pdf
---

# Preferences of a Voice-First Nation: Large-Scale Pairwise Evaluation and Preference Analysis for TTS in Indian Languages

*Srija Anand, Ashwin Sankar, Ishvinder Sethi, Aaditya Pareek, Kartik Rajput, Gaurav Yadav, Nikhil Narasimhan, Adish Pandya, Deepon Halder, Mohammed Safi Ur Rahman Khan, Praveen Srinivasa Varadhan, Shobhit Banga, Mitesh M Khapra*

[PDF](https://www.isca-archive.org/interspeech_2026/anand26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/anand26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3357)

**TL;DR** — The paper presents a large-scale, multidimensional pairwise evaluation framework for multilingual text-to-speech (TTS) in 10 Indian languages, leveraging over 120K human comparisons from 1,900+ native raters. Through Bradley-Terry modeling and SHAP analysis, the study reveals that human preference is primarily driven by expressiveness and intelligibility once basic noise and hallucination robustness are met.

## Key contributions

- Curated a phonetically diverse benchmark of 5,357 sentences across 10 Indic languages spanning normalized, symbolic, and code-mixed inputs.
- Collected over 120K pairwise comparisons from more than 1,900 vetted native raters across 16 real-world application domains.
- Established a statistically grounded multilingual TTS leaderboard using Bradley-Terry modeling with bootstrap confidence intervals.
- Conducted SHAP and XGBoost analysis on 6 fine-grained perceptual axes to quantify the exact drivers of listener preference (achieving 86.1% cross-language prediction accuracy).

## Problem

Traditional TTS evaluation protocols (MOS, CMOS, MUSHRA) suffer from absolute rating calibration issues across raters and obscure diagnostic details. In linguistically diverse regions like India, speech naturally incorporates code-mixing, complex numerals, and multi-script usage. Prior multilingual TTS evaluations lack the scale, linguistic coverage, and granular perceptual attribution required to diagnose why one synthesis model outperforms another.

## Method

The evaluation framework assesses 7 state-of-the-art TTS systems using a strict two-step annotation workflow. Raters first provide a holistic overall preference (Model A, Model B, Both Good, Both Bad) for an anonymized audio pair given a text prompt, locking their choice before unlocking the second phase. In the second phase, raters independently evaluate the identical audio pair across six granular perceptual axes: intelligibility, expressiveness, voice quality, liveliness, hallucinations, and noise.

Raw pairwise comparisons are converted into latent scores using a maximum-likelihood Bradley-Terry model and mapped onto an Elo-like scale. Uncertainty is quantified via 500-fold bootstrap resampling to establish strict, significance-aware ranking criteria. To understand human decision-making, an XGBoost classifier is trained on binary axis-level superiority vectors to predict overall preference across held-out languages, and SHAP values are extracted to measure feature contributions.

## Experimental setup

Evaluates 5,357 sentences spanning 10 Indian languages (Bengali, Gujarati, Hindi, Kannada, Malayalam, Marathi, Odia, Tamil, Telugu, Urdu) and 16 domains. Compares 7 TTS systems: Gemini 2.5 Pro TTS, ElevenLabs v3, Sonic 3, Bulbul v3 Beta, Speech 2.8 HD, GPT-4o-Mini TTS, and Indic F5. Gathers 120,455 total comparisons from 1,915 vetted native raters.

## Results

Gemini 2.5 Pro TTS ranks first overall with a Bradley-Terry score of 1128.53 and a 70% win rate, leading across 9 of 10 languages and all 16 domains. ElevenLabs v3 (1056.28 score, 57% win rate) and Sonic 3 (1050.83 score, 56% win rate) tie closely for second, while open-source Indic F5 ranks last with a score of 805.75 and a 22% win rate. SHAP analysis proves that expressiveness (+1.01 mean absolute value) and intelligibility (+0.62) dominate human preference, whereas noise (+0.10) and hallucinations (+0.17) have minimal impact because most models already clear baseline robustness thresholds. Reliability tests indicate that stable rankings (Spearman rho >= 0.95) emerge using roughly 100-200 raters and about 1,000 sentences.

| Rank | System | BT Score | Win Rate | Supported Languages |
|---|---|---|---|---|
| 1 | Gemini 2.5 Pro TTS | 1128.53 ± 3 | 70% | 10 |
| 2 | ElevenLabs v3 | 1056.28 ± 2 | 57% | 9 |
| 3 | Sonic 3 | 1050.83 ± 3 | 56% | 8 |
| 4 | Bulbul v3 Beta | 1021.91 ± 3 | 52% | 9 |
| 5 | Speech 2.8 HD | 993.94 ± 6 | 47% | 2 |
| 6 | GPT-4o-Mini TTS | 942.76 ± 4 | 40% | 5 |

## Limitations

The study is scoped primarily to 10 Indic languages and does not evaluate streaming inference latency or computational footprint. While rank stability is achieved with moderate sample sizes, absolute score confidence intervals remain non-trivial for closely ranked adjacent models. The evaluation relies on default system voices, which may not fully represent the upper bound of customizable model capabilities.

## Why read this

Speech researchers and ML engineers building multilingual or low-resource TTS systems should read this to understand how to design scalable, diagnostic-rich human evaluation frameworks rather than relying on noisy MOS scores. It provides concrete empirical evidence on sample efficiency and the exact perceptual dimensions that drive human adoption.

## Code

- https://huggingface.co/datasets/ai4bharat/SpeechArenaBench/

## Applications

Benchmarking and iterative development of multilingual text-to-speech models, conversational AI assistants, digital accessibility tools, and localized voice interfaces.

## Related

- (link related pages by id as the wiki grows)
