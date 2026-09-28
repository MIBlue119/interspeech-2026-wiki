---
id: jeon26d_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2021
pdf: https://www.isca-archive.org/interspeech_2026/jeon26d_interspeech.pdf
---

# ParaPairAudioBench: Paralinguistic Pairwise Audio Benchmark for LALM-as-a-Judge

*Jisu Jeon, Seungyeon Jwa, Joosung Lee, Jinhyeon Kim, Woojin Chung, Hwiyeol Jo, Jeonghoon Kim, Jonghyun Choi, Soyoon Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/jeon26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeon26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2021)

**TL;DR** — PARAPAIRAUDIOBENCH evaluates Large Audio-Language Models (LALMs) as judges across 5,175 pairwise audio comparisons spanning five paralinguistic dimensions, revealing that even top models lag humans by 17.7%p–32%p and fail severely on calibration and position bias.

## Key contributions

- Introduces a diagnostic pairwise benchmark (PARAPAIRAUDIOBENCH) containing 5,175 audio pairs across five distinct paralinguistic dimensions: Style, Rate, Emphasis, Age, and Gender.
- Exposes pervasive calibration failures where models systematically force preferences instead of abstaining via Tie cases (e.g., GPT-4o Audio drops from 69.0% on Non-Tie Style to 3.8% on Tie cases).
- Reveals a Style-Emphasis modality asymmetry via transcript control: models over-rely on textual/lexical cues for Style but require cross-transcript prosodic scaffolding for Emphasis.
- Uncovers significant position bias and order sensitivity across LALM judges, led by SpeechJudge-7B showing a 29.4%p accuracy gap between A/B order swaps.

## Problem

Current speech evaluation pipelines increasingly rely on Large Audio-Language Models (LALMs) as automated judges, but existing benchmarks focus almost exclusively on holistic, aggregate naturalness. This leaves fine-grained paralinguistic distinctions (such as speaking rate, local emphasis, style, age, and gender) completely underexplored. Furthermore, prior work fails to diagnose critical judge failure modes such as calibration limits (the inability to correctly abstain when both samples are equivalent), lexical-versus-acoustic confounding, and positional presentation bias.

## Method

The benchmark comprises 5,175 instances sampled from validated public speech corpora: Expresso (Emphasis, Style), Sonos Voice Control Bias Assessment (Age, Gender), LibriTTS (Gender), and EARS (Rate). Each task uses a pairwise comparison framework where an LALM processes two audio inputs (Audio A and Audio B) within a single inference call along with a specific criterion instruction, yielding one of three decisions: [[A]], [[B]], or [[TIE]].

To decouple modalities, the benchmark balances instances across same-transcript and cross-transcript conditions. Same-transcript pairs control for lexical content so models must process fine-grained prosody, rhythm, and timbre, while cross-transcript pairs evaluate whether global prosodic or lexical shifts confound or clarify the target attribute. To handle calibration, Tie cases are integrated by including 'Both Good' and 'Both Bad' scenarios (excluding Rate which lacks natural tie parity). Position bias is explicitly tracked by evaluating every pair under input order swaps (Acc@A vs Acc@B).

Models are prompted using standardized, unmodifiable template strings per criterion. Commercial models (Gemini 2.5 Flash, GPT-4o Audio) and open-source foundation models (Kimi-Audio-7B, Qwen2.5-Omni-7B) use greedy decoding, whereas fine-tuned task-specific judges (SpeechJudge-7B) follow their original inference recipe utilizing majority voting over 10 runs at temperature 1.0.

## Experimental setup

Evaluates 5 models (Gemini 2.5 Flash, GPT-4o Audio, SpeechJudge-7B, Kimi-Audio-7B-Instruct, Qwen2.5-Omni-7B) against a human evaluation baseline of 250 items (50 per criterion evaluated by 6 raters with Fleiss kappa of 0.67). Uses 5,175 total pairs (2,415 Tie cases, 2,760 Non-Tie cases). Metrics include overall accuracy, Non-Tie vs. Tie accuracy, same- vs. cross-transcript accuracy, consistency, and Acc@A–Acc@B position bias gaps.

## Results

Gemini 2.5 Flash achieves the highest overall accuracy at 61.5%, yet trails the human average (79.2%) by 17.7%p. For specific criteria, Gemini reaches 88.9% on Rate and 64.2% on Gender, but drops to 48.5% on Style and 49.7% on Emphasis. Other models perform substantially worse: Kimi-Audio-7B achieves 50.2%, Qwen2.5-Omni-7B gets 44.0%, GPT-4o Audio gets 46.4%, and SpeechJudge-7B scores 33.8% (barely above the 33.3% three-way chance level).

In Tie calibration tests, models collapse drastically: GPT-4o Audio plunges from 69.0% on Non-Tie Style down to 3.8% on Tie cases, and SpeechJudge-7B hits 1.7% Style Tie accuracy. In transcript condition ablations for Style, Gemini drops from 83.8% (Same transcript) to 36.6% (Cross transcript), indicating heavy reliance on lexical cues; conversely, for Emphasis, Gemini's accuracy improves from 43.5% (Same) to 56.4% (Cross) due to global prosodic scaffolding. Position bias is severe across all models, exemplified by SpeechJudge exhibiting a 29.4%p gap between Acc@A and Acc@B.

| System / Condition | Style | Rate | Emphasis | Age | Gender | Average |
|---|---|---|---|---|---|---|
| Human Baseline | 85.7 | 91.0 | 85.7 | 52.7 | 80.7 | 79.2 |
| Gemini 2.5 Flash | 48.5 | 88.9 | 49.7 | 56.5 | 64.2 | 61.5 |
| GPT-4o Audio | 36.4 | 77.6 | 43.8 | 34.9 | 39.3 | 46.4 |
| Kimi-Audio-7B | 45.9 | 76.0 | 42.9 | 27.5 | 58.6 | 50.2 |
| Qwen2.5-Omni-7B | 35.8 | 61.9 | 36.7 | 38.1 | 47.4 | 44.0 |
| SpeechJudge-7B | 32.6 | 48.0 | 32.9 | 25.8 | 29.9 | 33.8 |

## Limitations

The benchmark relies on subset extractions from specific English corpora (Expresso, LibriTTS, EARS, Sonos), restricting language coverage and cultural prosodic variation. Rate pairs completely omit Tie cases due to inherent rhythmic variability in natural speech. Graded attributes like Age show low inter-rater human agreement (kappa = 0.365), making ground-truth labels noisy for subtle age brackets.

## Why read this

Speech and ML engineers building or deploying LALMs as automated evaluation judges must read this paper to realize that holistic naturalness scores mask severe underlying failures in fine-grained paralinguistic discrimination, calibration, and position bias.

## Code

- https://github.com/jsujeon/ParaPairAudioBench

## Applications

Automated evaluation pipelines for Text-to-Speech (TTS), speech-to-speech translation, and voice conversion systems seeking fine-grained paralinguistic diagnostic feedback.

## Related

- (link related pages by id as the wiki grows)
