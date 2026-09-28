---
id: cooper26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1521
pdf: https://www.isca-archive.org/interspeech_2026/cooper26_interspeech.pdf
---

# A Large-Scale Dataset of Listener Impressions of Emotional TTS

*Erica Cooper, Xiaoxue Gao, Takuma Okamoto, Tomoki Toda, Nancy Chen, Hisashi Kawai*

[PDF](https://www.isca-archive.org/interspeech_2026/cooper26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cooper26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1521)

**TL;DR** — This paper introduces the first large-scale human-rated dataset for emotional text-to-speech (TTS) quality assessment containing 18,208 samples across five emotional styles, and evaluates zero-shot prediction models against these human judgments.

## Key contributions

- Constructed a large-scale emotional speech quality dataset consisting of 18,208 samples covering five emotional styles (neutral, happy, angry, sad, surprise) from 13 state-of-the-art TTS systems, API models, and natural speech.
- Collected multi-faceted human listener ratings from 262 US-based native speakers covering quality MOS (QMOS), emotion MOS (EMOS), free-choice perceived emotions, and valence-arousal-dominance (VAD) via the Self-Assessment Manikin.
- Benchmarked existing zero-shot automatic assessment models (SSL-MOS, UTMOS, Emotion2Vec variants, and Gemini as an audio LLM judge) on the dataset, revealing distinct performance variations across emotion categories.
- Demonstrated that distribution-level similarity metrics (Earth Mover's Distance) of valence, arousal, and dominance correlate strongly with human EMOS ratings, opening avenues for unsupervised emotional TTS evaluation.

## Problem

Current automatic speech quality assessment metrics and benchmark datasets (such as BVCC and SOMOS) focus exclusively on general-purpose, neutral synthesized speech, failing to capture the expressive nuances and emotional fidelity required for conversational AI. While individual emotional TTS papers conduct internal listening tests, raw evaluation results are rarely released, and natural speech emotion datasets like IEMOCAP or MSP-Podcast lack synthesized counterparts. Consequently, speech engineers lack standardized evaluation datasets and specialized prediction models to automatically measure naturalness and target emotion match for emotional TTS, forcing an over-reliance on slow, expensive human listening tests.

## Method

The dataset leverages the English portion of the Emotional Speech Dataset (ESD) as text and natural speech reference, providing 350 sentences per emotion across 10 speakers (12 hours). Evaluated systems span four categories: DailyTalk-based systems (DailyTalk real speech, GPT-Talker, ECSS), ESD-based systems (real ESD, Tortoise, Emo-DPO, MaskGCT, EmoSpeech, VALL-E X, EmoKnob, Vevo), text-prompted systems utilizing 10 demographic prompt conditions across age (20-60) and gender (PromptTTS++, ParaSpeechCaps, Xiaomi MiMo-Audio), and API-based models (Google Gemini API with pre-set voices).

Human evaluations were split into three independent web-interface sub-tasks to mitigate listener fatigue: QMOS (assessing pronunciation, intonation, and signal quality on a 1-5 scale), perceived emotion categories with subsequent target EMOS ratings, and VAD ratings using the Self-Assessment Manikin. A total of 262 unique listeners provided 4 to 9 ratings per sample (mostly 7). Zero-shot baselines evaluated on this data include SSL-MOS (wav2vec2 fine-tuned on BVCC), UTMOS, Emotion2Vec variants (base, large, seed extracting target emotion probability), and Google Gemini evaluated via an LLM-as-judge prompt-matching paradigm.

## Experimental setup

The dataset contains 18,208 audio samples evaluated by 262 unique human listeners. Systems compared include 13 distinct TTS models, APIs, and natural speech benchmarks grouped into DailyTalk, ESD-matched, text-prompted, and API categories. Evaluation metrics comprise System-level Spearman's Rank Correlation Coefficient (SRCC) against human QMOS and EMOS, Earth Mover's Distance (EMD) for VAD distributions, and classification error for emotion category prediction.

## Results

UTMOS achieved an overall system-level SRCC of 0.80 for QMOS prediction, though its performance dropped on the angry condition (SRCC 0.55), where Gemini as an LLM judge performed better (SRCC 0.73). For EMOS prediction, Emotion2Vec-large achieved an overall SRCC of 0.82, with near-ceiling correlations on surprise (0.94) and angry (0.90) styles, while Gemini achieved an overall EMOS SRCC of 0.84. Earth Mover's Distance analysis on VAD distributions revealed strong negative system-level correlations with EMOS, reaching up to -0.98 for angry speech.

| System / Condition | QMOS | EMOS |
|---|---|---|
| Natural ESD (Reference) | 3.71 | 3.90 |
| Tortoise | 3.77 | 2.61 |
| Emo-DPO | 3.64 | 3.59 |
| MaskGCT | 3.42 | 3.43 |
| Gemini API | 4.21 | 3.89 |
| PromptTTS++ | 2.65 | 2.47 |

## Limitations

The dataset is restricted to US English speech corpora and covers only five discrete emotion categories, omitting complex blends, conversational turn-taking dynamics, or continuous dimensional subtleties beyond VAD. Because systems varied in lexical content and speaker identities, direct cross-group system comparisons are confounded. Furthermore, zero-shot models were evaluated without domain fine-tuning, leaving open whether supervised adaptation can close performance gaps on challenging emotions like neutral and happy.

## Why read this

Speech and ML engineers building expressive conversational agents or training automated speech quality metrics should read this paper to access the first public emotional TTS evaluation benchmark and understand the failure modes of current MOS predictors on emotional prosody.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Training automatic speech quality estimators, developing reward models for emotional text-to-speech preference optimization, and establishing automated CI/CD evaluation pipelines for conversational AI voice generation.

## Related

- (link related pages by id as the wiki grows)
