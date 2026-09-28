---
id: mizumoto26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3241
pdf: https://www.isca-archive.org/interspeech_2026/mizumoto26_interspeech.pdf
---

# Does Translation-Enhanced Speech Encoder Pre-training Affect Speech LLMs?

[PDF](https://www.isca-archive.org/interspeech_2026/mizumoto26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mizumoto26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3241)

**TL;DR** — Incorporating bidirectional English translation into speech encoder pre-training bridges structural misalignments with downstream LLMs, improving speech translation, ASR, and intent classification performance.

## Problem

Connecting a pre-trained speech encoder to a text-based LLM suffers from a structural mismatch, as SSL and ASR encoders produce language-specific acoustic spaces while LLMs operate in a shared, language-agnostic semantic space. While standard unidirectional translation (non-English to English) helps, it leaves English inputs reliant on monolingual transcription, failing to fully abstract semantic representations for English and limiting cross-modal integration.

## Method

The authors adopt the Whisper-medium encoder architecture and pre-train it using a Seq2Seq objective on a 130k-hour multilingual corpus covering English, Japanese, German, and Chinese. Synthetic parallel translation data generated via Qwen2.5-32B-Instruct supplements the corpora. They compare three pre-training configurations: ASR-only, ASR & ST (X -> en), and bidirectional ASR & ST (X <-> en) using a redesigned multi-target decoder prompt. The pre-trained encoders are then integrated with a frozen Llama-3.2 (1B or 3B) LLM via a lightweight trainable adaptor consisting of two CNN downsampling layers and a linear projection.

## Results

Evaluated on 130k hours of pre-training data and 6.2k hours of multi-task Speech LLM fine-tuning data, the bidirectional X <-> en configuration consistently outperforms ASR-only and unidirectional baselines across scale. For the 1B LLM, Japanese ASR CER drops from 29.2 (ASR-only) to 21.1 (X -> en) and 19.7 (X <-> en). On the 3B model, bidirectional pre-training boosts English intent classification accuracy on SLURP from 57.3 up to 64.5 and German intent accuracy on Speech-MASSIVE to 66.3, while preserving acoustic-dependent emotion recognition performance on MELD.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building direct Speech LLMs for multilingual speech translation, spoken language understanding, ASR, and intent classification.

## Limitations

Experiments are restricted to a targeted subset of four languages due to computational constraints rather than a massive multi-dozen language scale.

## Related

- (link related pages by id as the wiki grows)
