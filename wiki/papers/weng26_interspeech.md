---
id: weng26_interspeech
category: phonetics-linguistics
labels: [robustness-noise]
institutions: ["Hong Kong Polytechnic University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1274
pdf: https://www.isca-archive.org/interspeech_2026/weng26_interspeech.pdf
---

# Tone-space Distribution Modulates Transfer from Non-linguistic Pitch Training to Cantonese Tone-in-Noise Perception in Native Speakers

*Yi Weng, Junjie Zhang, Yanyuan Ye, Gang Peng*

[PDF](https://www.isca-archive.org/interspeech_2026/weng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/weng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1274)

**Category:** `phonetics-linguistics` · **Labels:** `robustness-noise`

**TL;DR** — This study investigates whether non-linguistic pitch training improves native Cantonese lexical tone perception in noise, demonstrating successful psychophysical near-transfer and noise-dependent far-transfer that is constrained by tone-space crowding. Results show significant just-noticeable difference reductions alongside marked tone identification improvements in multitalker babble noise.

## Key contributions

- Evaluated the effect of an 8-session online non-linguistic pitch training program (using ABX discrimination on pure tones) on 29 native Cantonese adults.
- Demonstrated robust psychophysical near-transfer, with significant post-training reductions in just-noticeable differences for both level and contour pitch stimuli.
- Documented conditional far-transfer to lexical tone identification tasks, which emerged selectively under noise-degraded conditions (0 dB and -5 dB SNR) rather than in quiet.
- Revealed a tone-space limitation where acoustically distinct tones (T1, T3, T4) generalized to novel talkers, whereas tones in crowded spaces (T2, T5, T6) showed limited generalization.

## Problem

Although native tone language speakers possess superior pitch processing abilities, lexical tone perception remains highly vulnerable to signal degradation in adverse listening environments like multi-talker babble noise. Prior work shows that Cantonese tone perception is particularly fragile due to a crowded tone space involving fine-grained height and contour contrasts prone to F0 overlap and ongoing mergers. It has remained unclear whether low-level psychophysical bottlenecks can be mitigated via domain-general non-linguistic pitch training, or whether such training fails to address higher-level linguistic demands.

## Method

The experiment comprised pre-training, online training, and post-training phases. The training phase consisted of eight online sessions over 14 days using an adaptive 2-down-1-up ABX discrimination task with pure tones (126-217 Hz base frequency range). Level tone difficulty was varied using semitone differences across 10 levels (0.03 to 2 st), while contour tone difficulty was adjusted by altering the duration of the sinusoidal frequency modulation window (10% to 95% of a 400-ms window). Participants received trial-by-trial feedback, and JNDs were estimated from the final six reversal points.

Evaluation involved a word identification task using monosyllables (/fan/, /fu/, /ji/) paired with the six Cantonese tones under clean, 0 dB SNR, and -5 dB SNR 6-talker babble noise conditions. Post-testing included a generalization phase using stimuli from two novel untrained talkers (one male, one female). Pitch sensitivity was separately tracked via a three-interval oddity task measuring level and contour thresholds before and after training.

## Experimental setup

Twenty-nine native Cantonese adults (aged 19–32 years, 12 females) completed the full protocol after normal audiometric screening. Baselines compared pre-training vs. post-training performance across three noise conditions (clean, 0 dB SNR, -5 dB SNR) and evaluated generalization to two novel speakers. Metrics included psychophysical just-noticeable differences (st for level tones, modulation window duration for contour tones) and percentage accuracy in a 6-alternative forced-choice word identification task.

## Results

Psychophysical near-transfer was confirmed by significant main effects of training session on oddity task JNDs for both level tones (F(1, 27) = 4.24, p = 0.049) and contour tones (F(1, 27) = 35.00, p < 0.001). For word identification, a strong main effect of noise condition (F(1.60, 43.20) = 125.28, p < 0.01) showed accuracy dropped sharply in adverse SNRs. Far-transfer improvements were heavily manifested under noise: at -5 dB SNR, T1, T3, T4, and T6 showed robust pre-to-post improvements. However, under novel-talker testing, T2, T4, T5, and T6 exhibited significant performance declines relative to the trained-talker post-test, proving that tones in compressed, overlapping pitch registers fail to achieve talker-invariant generalization from domain-general pitch training.

| System / Condition | Level JND (st) Pre/Post | Contour JND Pre/Post | 0 dB SNR Accuracy | -5 dB SNR Accuracy |
|---|---|---|---|---|
| Pre-Training Baseline | ~0.6 st | ~200 ms | Baseline | Baseline |
| Post-Training (Trained Talker) | Significantly Lower | Significantly Lower | Improved (T3, T4, T6) | Improved (T1, T3, T4, T6) |
| Generalization (Novel Talker) | - | - | Retained (T2, T3, T4) | Declined (T2, T4, T5, T6) |

## Limitations

The study is limited by a relatively small sample size of 29 participants, an exclusive focus on native Cantonese speakers, and evaluation restricted to monosyllabic words rather than continuous speech or sentence-level prosody. Furthermore, the home-based web training setup introduced variable listening environments outside the laboratory, and the intervention was restricted to short pure-tone discrimination without linguistic context.

## Why read this

Speech researchers and auditory neuroscientists studying perceptual learning and speech-in-noise perception should read this paper to understand the exact boundaries of vertical transfer between domain-general psychophysical training and speech categorization in crowded phonetic spaces.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditory rehabilitation protocols, computer-aided speech training software for tonal languages, and hearing-aid algorithm design for adverse signal-to-noise ratios.

## Institutions / 機構

Hong Kong Polytechnic University

**Funding / 經費:** Research Grants Council of the Hong Kong SAR, China

## Related

- [English Vowel Perceptual Training under Multitalker Babble: A Comparison of Humans and Large Language Models](dong26b_interspeech.md) — same problem · relatedness 1.8/3
- [Mutual Cancellation between Masking Effects Benefits Speech Intelligibility](gu26_interspeech.md) — same problem · relatedness 1.8/3
- [Hearing Smiles in the Crowd: How Babble Noise Shapes Smiled Speech Perception](li26t_interspeech.md) — relatedness 1.8/3
- [Neural Oscillatory Mechanisms of Speaker Normalization Under Cognitive Load: Evidence from Cantonese Tone Perception](zhang26ba_interspeech.md) — same problem · relatedness 1.7/3
- [Effects of listener language experience, masker language, and cognitive load on word monitoring accuracy and response time](chin26_interspeech.md) — same problem · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
