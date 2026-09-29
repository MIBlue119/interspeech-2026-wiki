---
id: rackauckas26_interspeech
category: speech-llm-dialogue
institutions: ["RoleGaku", "Columbia University"]
code: https://github.com/zackrack/AdaptLingo
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/rackauckas26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/rackauckas26_interspeech.pdf
---

# AdaptLingo: A Speech-to-Speech English Practice System with Fluency-Adaptive Responses

*Zackary Rackauckas*

[PDF](https://www.isca-archive.org/interspeech_2026/rackauckas26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rackauckas26_interspeech.html)

**Category:** `speech-llm-dialogue`

**TL;DR** — AdaptLingo is an open-source, speech-to-speech English conversational agent that adapts its vocabulary and TTS speaking rate based on the learner's predicted spoken fluency. While it achieved 95% macro F1 on a clean labeled fluency dataset, its in-the-wild accuracy dropped to 47% on noisy user-study speech.

## Key contributions

- Developed an open-source, speech-to-speech conversational agent that automatically adjusts its pedagogical difficulty to user fluency.
- Integrated temporal acoustic features (articulation and speech rates) via a random forest classifier to categorize learners into three EIKEN proficiency tiers.
- Employed EIKEN-aligned vocabulary lists combined with k-NN retrieval and logit boosting during text generation to constrain response lexical complexity.
- Implemented level-specific TTS rate modulation (0.8x, 0.9x, and 1.0x speed) alongside safety filters for toxicity and detailed interaction logging.
- Conducted a multi-lingual user study with Japanese, Mandarin, and Spanish speakers, revealing distinct preference splits across native-language backgrounds.

## Problem

Standard speech-to-speech CALL systems often fail to adapt to varying proficiency levels, causing beginners to feel overwhelmed by rapid, complex speech and advanced learners to disengage from overly simplified dialogues. Native conversation partners are not always available, and prior LLM-based systems generally lack real-time fluency estimation coupled with constrained lexical generation. This creates a gap for low-stakes, personalized spoken practice environments that match a learner's exact linguistic background.

## Method

AdaptLingo operates via a browser-based Gradio interface mounted on a FastAPI backend. When a user records audio, the system trims silence, normalizes the waveform, transcribes it using CrisperWhisper, and extracts temporal acoustic features (articulation rate and speech rate) via a Praat script. A random forest classifier predicts one of three fluency levels: beginner, intermediate, or advanced.

The predicted level controls two key mechanisms: EIKEN-controlled vocabulary generation and text-to-speech rate adjustment. For response generation, the system performs a k-nearest-neighbor search over EIKEN-aligned vocabulary lists corresponding to the predicted tier. These words are used in prompting and their generation logits are explicitly boosted during decoding to enforce level-appropriate language without relying solely on soft prompt instructions. Finally, the response text is synthesized using gpt-4o-mini-tts, with speaking speeds set to 0.8x for beginners, 0.9x for intermediates, and 1.0x for advanced users.

The architecture also integrates safety guardrails, running a toxicity classifier on both user inputs and assistant outputs to block inappropriate interactions and support secure deployment for remote user studies.

## Experimental setup

The fluency classifier was evaluated using a labeled fluency dataset and noisy speech collected from a user study. The user study compared AdaptLingo against a non-adaptive baseline chatbot across 39 participants (10 Japanese, 11 Mandarin, 18 Spanish native speakers) using 19 survey items modeled after Curriculum-driven Edubot. The system was implemented using FastAPI, Gradio, Uvicorn, CrisperWhisper for transcription, and gpt-4o-mini-tts for speech synthesis.

## Results

The random forest fluency classifier achieved a 95% test macro F1 score on clean labeled evaluation data, but performance degraded to 47% accuracy on unconstrained, noisy user-study speech. In the user-study survey comparing AdaptLingo to a non-adaptive LLM baseline, Japanese users strongly favored AdaptLingo, preferring it on 15 out of 19 survey items. Conversely, Mandarin and Spanish speakers preferred the baseline chatbot on 13/19 and 17/19 items respectively, particularly for naturalness, coherence, and flexibility, though they still acknowledged AdaptLingo's superior capability in recognizing them as language learners.

| System / Group | N | AdaptLingo Wins | Baseline Wins | Ties |
|---|---|---|---|---|
| Japanese Users | 10 | 15 | 1 | 3 |
| Mandarin Users | 11 | 4 | 13 | 2 |
| Spanish Users | 18 | 1 | 17 | 1 |

## Limitations

The fluency classifier suffers from a substantial generalization gap, dropping from 95% F1 on curated data to 47% accuracy on noisy in-the-wild user speech. The user study revealed that the current adaptation strategy is not universally appealing, with native speakers of Mandarin and Spanish preferring a more flexible baseline chatbot over rigid level constraints. Furthermore, the system's vocabulary control relies heavily on EIKEN lists, which are primarily optimized for Japanese educational contexts.

## Why read this

Speech and ML engineers building conversational AI for education should read this paper to understand the practical engineering pipeline and real-world failure modes of coupling real-time acoustic feature extraction with constrained LLM generation. It offers valuable lessons on why one-size-fits-all linguistic adaptation falls short across different native-language backgrounds.

## Code

- https://github.com/zackrack/AdaptLingo

## Applications

Computer-assisted language learning (CALL), spoken dialogue systems, and interactive second-language tutoring platforms.

## Institutions / 機構

RoleGaku, Columbia University

## Related

- (link related pages by id as the wiki grows)
