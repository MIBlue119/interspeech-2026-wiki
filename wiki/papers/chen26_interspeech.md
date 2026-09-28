---
id: chen26_interspeech
category: speech-translation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-42
pdf: https://www.isca-archive.org/interspeech_2026/chen26_interspeech.pdf
---

# MoVE: Translating Laughter and Tears via Mixture of Vocalization Experts in Speech-to-Speech Translation

[PDF](https://www.isca-archive.org/interspeech_2026/chen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-42)

**TL;DR** — MoVE is a Mixture-of-LoRA-Experts speech-to-speech translation framework that transfers emotional nuances and non-verbal vocalizations like laughter and crying, reproducing target non-verbal vocalizations in 76% of cases.

## Problem

Current speech-to-speech translation systems achieve strong semantic accuracy but strip away non-verbal vocalizations and emotional prosody, leading to pragmatic communication failures. This limitation stems from a scarcity of high-quality expressive training corpora and the extreme difficulty of training end-to-end models across ASR, machine translation, and TTS without inter-emotional interference.

## Method

The authors propose a scalable expressive data synthesis pipeline using IndexTTS2, attribute decoupling, and filtering to build a 1000-hour English-Chinese expressive corpus. Building on a pretrained Kimi-Audio AudioLLM and a fine-tuned expressive detokenizer, they introduce MoVE, which features five parallel LoRA adapters specialized in Happy, Sad, Angry, Laughing, and Crying manifolds. A dynamic soft-weighting router blends these experts at the token level without explicit emotion supervision. Training uses a two-stage strategy: independent expert specialization for 2 epochs, followed by end-to-end router optimization for 1 epoch.

## Results

Evaluated on English-Chinese translation tasks, MoVE achieves an ASR-BLEU of 32.5 (en->zh) and 21.4 (zh->en), an Arousal-Valence Similarity of 0.53, a Naturalness MOS of 3.85, an Emotion SMOS of 3.79, and a non-verbal match accuracy of 76%. In A/B preference tests, MoVE wins over a single-LoRA baseline 60.0% of the time against 17.3% losses. Data efficiency experiments reveal that fine-tuning with as little as 30 minutes of data preserves 95% of emotional fidelity, whereas training from scratch collapses entirely.

## Code

- https://47zzz.github.io/MoVE/

## Applications

Engineers building cross-language speech-to-speech translation systems, voice assistants, and immersive communication tools that require faithful preservation of emotional state and non-verbal reactions.

## Limitations

The current scope focuses primarily on English-Chinese translation and five core affective/non-verbal states due to base model and synthesis pipeline constraints.

## Related

- (link related pages by id as the wiki grows)
