---
id: he26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1113
pdf: https://www.isca-archive.org/interspeech_2026/he26c_interspeech.pdf
---

# LLM-HB: Language-Aware LLM-Guided Hotword Biasing for Code-Switching ASR

[PDF](https://www.isca-archive.org/interspeech_2026/he26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1113)

**TL;DR** — LLM-HB integrates a mixture-of-experts adaptor, an auxiliary language head, and LLM-based prompting for code-switching ASR hotword biasing, achieving a 20.30% relative reduction in mixed error rate to 5.85% on the ASRU2019 dataset.

## Problem

Code-switching speech features rapid language transitions that cause cross-language confusion in automatic speech recognition systems. While large language models and hotword biasing techniques have advanced monolingual ASR, effectively combining them for multilingual code-switching with rare or named entities remains largely unexplored. This gap is critical because standard ASR models fail to accurately transcribe code-switched named entities without explicit contextual guidance and specialized language representations.

## Method

The framework uses a pre-trained Whisper-medium encoder coupled with a mixture-of-experts (MoE) adaptor containing 2 experts and a top-2 gating mechanism to project acoustic features into 2560 dimensions. A frozen Qwen3-4B LLM receives the speech embeddings alongside text-encoded hotwords and transcriptions via LoRA fine-tuning. An auxiliary language prediction head computes cross-entropy loss over three classes (Mandarin, English, and other) to supply explicit supervision to the shared LLM hidden states. The training objective jointly minimizes standard ASR cross-entropy, a hotword biasing loss, and the auxiliary language loss using AdamW for 94,080 steps.

## Results

Evaluated on the ASRU2019 code-switching test set with 15 distractor hotwords per utterance, the full multi-dataset training setup (2,200 hours including AISHELL-2, LibriSpeech, and ASRU2019-CS) achieves a mixed error rate (MER) of 5.85%, character error rate (CER) of 4.94%, and word error rate (WER) of 13.21%. Compared against a baseline MER of 7.34%, this yields a 20.30% relative reduction, alongside substantial gains on hotword metrics such as bias-MER dropping from 22.11% to 8.99%. Ablation studies show that a 2-expert top-2 MoE configuration outperforms 1-expert and 4-expert variants, while a bias loss weight of lambda_1 = 0.6 balances character and word accuracy across languages.

## Code

- https://anonymous.4open.science/r/IS26-ASRU2019-Hotword-List/

## Applications

Speech engineers and developers building multilingual voice assistants, transcription tools for bilingual communities, or dictation systems for code-switched audio will use this to improve rare entity recognition.

## Limitations

The current framework is optimized for bilingual Mandarin-English code-switching and requires extension to handle near-homophones and scale to larger hotword vocabularies.

## Related

- (link related pages by id as the wiki grows)
