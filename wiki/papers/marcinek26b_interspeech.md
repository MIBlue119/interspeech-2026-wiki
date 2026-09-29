---
id: marcinek26b_interspeech
category: asr
labels: [robustness-noise]
institutions: ["KTH Royal Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2799
pdf: https://www.isca-archive.org/interspeech_2026/marcinek26b_interspeech.pdf
---

# Optimal Linguistic Complexity for Dialogue System Speech in Noise: Convergent Evidence from Automatic and Human Transcription

*Lubos Marcinek, Jonas Beskow, Joakim Gustafson*

[PDF](https://www.isca-archive.org/interspeech_2026/marcinek26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/marcinek26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2799)

**Category:** `asr` · **Labels:** `robustness-noise`

**TL;DR** — This paper investigates the optimal linguistic complexity for dialogue system speech in noise across 168,000 ASR transcriptions and a human listening pilot (N=15), revealing a U-shaped error curve where natural grammatical sentences (9–16 words) outperform telegraphic forms by 43–45% in word error rate.

## Key contributions

- Evaluates 168,000 synthesized utterances varying complexity (5 levels), TTS systems (2), noise types (12 DEMAND environments), SNRs (-15 to +15 dB), and ASR models (Whisper large-v3, Wav2Vec2 base-960h).
- Establishes a broad optimal linguistic zone of 9–19 words (Level 3-4) that consistently minimizes transcription error for both ASR and human listeners.
- Uncovers a paradoxical SNR scaling effect where the relative grammar advantage grows as acoustic conditions improve, peaking at +10 dB SNR.
- Conducts a human listening pilot (N=15) demonstrating a 45% relative error reduction from telegraphic to natural grammatical speech, replicating the ASR U-shaped trend.

## Problem

Spoken dialogue systems operating in noisy environments require output that is easily understood by both humans and automated recognizers. While systems often default to adaptive simplification—shortening and truncating utterances into telegraphic forms when noise is detected—the actual impact of linguistic complexity on intelligibility in noise remains empirically underexplored. Prior psycholinguistic work addresses perception broadly but has not been operationalized as a noise-adaptive design principle for dialogue system output. This leaves system designers guessing whether shorter, simpler output aids or hurts comprehension under acoustic degradation.

## Method

The authors created 250 semantically matched sentence sets across five topics, generated via Claude and partitioned into five complexity levels (L1 telegraphic 3-5 words, L2 simple 5-13 words, L3 natural 9-16 words, L4 moderate 9-19 words, and L5 complex 13-30 words). Stimuli were synthesized using XTTS v2 and KokoroTTS with neutral prosody (~150 wpm) for both male and female voices at 16 kHz. Additive acoustic noise from the 12 DEMAND environments was mixed across seven SNRs (-15 to +15 dB in 5 dB steps).

For Study 1, transcription was performed using Whisper large-v3 (1.55B parameters) and Wav2Vec2 base-960h (95M parameters), yielding 168,000 evaluations. Word error rates (WER) were computed via Levenshtein distance after text normalization. Statistical evaluation employed ordinary least squares (OLS) regression with two-way cluster-robust standard errors grouped by sentence ID and noise type, controlling for length artifacts and GPT-2 perplexity.

For Study 2, 15 native English-speaking participants on Prolific completed an online transcription pilot across 40 trials each using headphones, testing three complexity levels (L1, L3, L5), four DEMAND noise environments, and three SNRs (-10, 0, +10 dB). The key design choice to overlap word counts across complexity levels while altering grammatical structure isolated syntax as the core experimental variable, rejecting the hypothesis that sentence length alone dictates intelligibility.

## Experimental setup

Study 1 evaluated 168,000 synthesized audio files across 5 complexity levels, 2 TTS engines (XTTS v2, KokoroTTS), 2 voice genders, 12 DEMAND noise types, and 7 SNRs. Study 2 piloted N=15 human participants evaluating 600 total trials across 3 complexity levels, 4 noise environments, and 3 SNRs. Metrics included Word Error Rate (WER) via Levenshtein distance, Flesch-Kincaid grade level, and GPT-2 perplexity.

## Results

Aggregated Study 1 results showed a U-shaped WER curve across complexity: L1 (47.5%), L2 (32.4%), L3 (26.9%), L4 (27.7%), and L5 (29.0%). Moving from telegraphic (L1) to natural grammatical speech (L3) reduced WER by 20.6 percentage points (43% relative). Levels 3 and 4 formed an optimal zone with no statistically significant difference between them. The L1/L3 WER ratio grew monotonically from 1.33x at -15 dB to 3.36x at +10 dB, indicating that grammatical advantage scales positively with cleaner acoustic conditions. Study 2 human listeners mirrored this trend, yielding a mean WER of 35.3% for L1, 19.4% for L3, and 27.3% for L5 (Friedman chi-square = 19.60, p < 0.001), representing a 45% relative error reduction.

| Level | Label | -15 dB WER (%) | 0 dB WER (%) | +15 dB WER (%) |
|---|---|---|---|---|
| 1 | Telegraphic | 83.5 | 44.5 | 18.0 |
| 2 | Simple | 68.7 | 26.1 | 8.3 |
| 3 | Natural | 62.6 | 19.4 | 5.7 |
| 4 | Moderate | 63.8 | 19.7 | 5.1 |
| 5 | Complex | 65.6 | 21.2 | 5.2 |

## Limitations

Study 2 is limited by a small pilot sample size (N=15), precluding robust subgroup analyses or interaction evaluations across specific noise environments for human listeners. The acoustic evaluation used additive stationary DEMAND noise without convolutive reverberation effects. The study is restricted to English, leaving morphologically rich or topic-prominent languages unverified.

## Why read this

Speech and dialogue system researchers should read this paper to discard the common assumption that dialogue outputs should be shortened in noisy conditions, and instead adopt the empirically backed 9–19 word optimal grammatical zone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Spoken dialogue systems, in-car voice assistants, and social robots operating in noisy environments.

## Institutions / 機構

KTH Royal Institute of Technology

**Funding / 經費:** PerCorSo, AAIS, WASP, Digital Futures

## Related

- [Readability Does Not Predict Speech Recognition Errors: Contrasting Human and Machine Perception.](ramonda26_interspeech.md) — same problem · relatedness 2.2/3
- [Synthesizing the Lombard Effect: Multi-Level Control of Speech Clarity and Vocal Effort in TTS](akti26_interspeech.md) — same problem · relatedness 1.8/3
- [English Vowel Perceptual Training under Multitalker Babble: A Comparison of Humans and Large Language Models](dong26b_interspeech.md) — same problem · relatedness 1.8/3
- [From Noisy Speech to Accurate APIs: LLM-driven Embedding Steering for Resilient Tool Retrieval](zorila26_interspeech.md) — same problem · relatedness 1.8/3
- [MoDiCoL: A Modular Diagnostic Continual Learning Dataset for Robust Speech Recognition](pekarekrosin26_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
