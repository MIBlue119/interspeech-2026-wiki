---
id: rackauckas26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/rackauckas26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/rackauckas26_interspeech.pdf
---

# AdaptLingo: A Speech-to-Speech English Practice System with Fluency-Adaptive Responses

[PDF](https://www.isca-archive.org/interspeech_2026/rackauckas26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rackauckas26_interspeech.html)

**TL;DR** — AdaptLingo is an open-source speech-to-speech English conversational agent that adapts its vocabulary difficulty and text-to-speech rate to the user's predicted speaking fluency, achieving a 95% test macro F1 on a labeled fluency dataset.

## Problem

Second-language learners often struggle with static computer-assisted language learning systems because beginners get overwhelmed by fast speech and complex language, while advanced learners disengage from simplified dialogues. Providing comfortable, low-stakes conversational practice remains difficult without human partners who can dynamically adjust their communication level. This system addresses the gap by automatically matching response complexity to real-time learner proficiency.

## Method

The system pipeline extracts temporal acoustic features (such as speech rate and articulation rate) using a Praat script on silence-trimmed and normalized waveforms. A random forest classifier categorizes user speech into three proficiency levels (beginner, intermediate, or advanced) aligned with EIKEN vocabulary standards. User audio is transcribed using the CrisperWhisper model to drive backend processing, and EIKEN word collections are retrieved via k-nearest-neighbor search and logit boosting during text generation. Responses are synthesized via gpt-4o-mini-tts with speaking rates set to 0.8x, 0.9x, and 1.0x depending on the predicted level. The framework is deployed through a Gradio interface inside a FastAPI application.

## Results

The random forest fluency classifier achieved 95% test macro F1 on a labeled fluency dataset, but dropped to 47% accuracy on noisier user-study speech. A within-subjects user study with native Japanese, Mandarin, and Spanish speakers compared AdaptLingo against a non-adaptive LLM baseline across 19 survey items. Japanese participants strongly favored AdaptLingo, preferring it on 15 out of 19 items, whereas Mandarin and Spanish speakers more frequently favored the baseline chatbot on naturalness and flexibility.

## Code

- https://github.com/zackrack/AdaptLingo

## Applications

Second-language learners and educators seeking low-pressure, interactive, and level-adapted spoken conversation practice.

## Limitations

The fluency classifier suffers from a substantial performance drop when transitioning from clean labeled datasets to noisy in-the-wild user-study speech, and adaptation preferences vary significantly by native-language background.

## Related

- (link related pages by id as the wiki grows)
