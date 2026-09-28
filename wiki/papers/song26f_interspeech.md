---
id: song26f_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2321
pdf: https://www.isca-archive.org/interspeech_2026/song26f_interspeech.pdf
---

# Evaluating and Preserving Lexical Stress in English-to-Chinese Speech-to-Speech Translation

[PDF](https://www.isca-archive.org/interspeech_2026/song26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2321)

**TL;DR** — This paper presents a stress-aware English-to-Chinese speech-to-speech translation framework that improves cross-lingual lexical stress preservation, achieving 60.8% word-level emphasis transfer accuracy.

## Problem

State-of-the-art speech-to-speech translation (S2ST) systems typically ignore lexical stress, resulting in translations that are semantically correct but pragmatically misleading. Evaluating and transferring stress to tonal languages like Mandarin Chinese is especially difficult due to interactions with lexical tones and a severe lack of stress-annotated training data. Without dedicated modeling, both automated detectors and neural TTS systems fail to accurately capture or render target emphasis in Chinese.

## Method

The authors construct a stress-annotated Mandarin dataset of 1,883 samples (2.74 hours) recorded by two native speakers under weak, medium, and strong stress prompts. They propose Syl-BiLSTM, a Mandarin stress detector that pools character-level representations from all 25 layers of a pre-trained XLS-R model via a learnable softmax-normalized layer fusion, followed by a bidirectional LSTM. For S2ST, they employ a StressTransfer backbone (Whisper-Large-v3 encoder and Qwen2.5-3B LLM fine-tuned with LoRA) to output translation text with explicit stress tags. Finally, they fine-tune CosyVoice 3 using LoRA on the attention and projection layers with explicit stress tags to synthesize the emphasized Mandarin speech.

## Results

Evaluated on custom test splits derived from EmphST-Bench and EmphST-INSTRUCT, the Syl-BiLSTM detector achieves an F1-score of 0.91, massively outperforming English-centric baselines like Frame-Linear (0.29 F1) and Frame-BiLSTM (0.66 F1). In objective S2ST evaluations, the proposed end-to-end framework achieves a BLEU of 47.35, a UTMOS naturalness score of 3.68, a word-level cross-lingual emphasis transfer score (CETS-W) of 60.80%, and a sentence-level score (CETS-S) of 58.30%. This significantly surpasses baseline systems such as Qwen2.5-Omni (CETS-W 25.70%), GPT-4o-audio (CETS-W 25.20%), and unadapted StressTransfer (CETS-W 24.60%).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-to-speech translation systems seeking to preserve speaker intent, emphasis, and pragmatic meaning when translating from stress-accent languages to tonal languages.

## Limitations

The dataset is currently limited to 2.74 hours and two speakers, and the cascaded approach relies on accurate upstream alignment and transcription tools.

## Related

- (link related pages by id as the wiki grows)
