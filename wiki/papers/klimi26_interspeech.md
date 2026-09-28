---
id: klimi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2567
pdf: https://www.isca-archive.org/interspeech_2026/klimi26_interspeech.pdf
---

# Beyond Standard Greek: Adapting Whisper for Greek Dialects through Curriculum Multitask Learning

[PDF](https://www.isca-archive.org/interspeech_2026/klimi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/klimi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2567)

**TL;DR** — This paper proposes a staged multitask curriculum framework for adapting Whisper to low-resource Greek dialects, consistently outperforming standard fine-tuning across multiple model scales.

## Problem

Adapting Automatic Speech Recognition systems to regional dialects results in extreme Word Error Rates due to orthographic variations, dialectal distances, and language-contact effects, creating a significant "dialectal tax" compared to standard language models. Standard fine-tuning under low-resource conditions is prone to overfitting and instability because dialects represent distinct acoustic-linguistic domains rather than minor variations. Addressing this requires robust training strategies that handle severe data scarcity while bridging the domain gap.

## Method

The framework integrates donor-language data augmentation, joint speech recognition and translation multitask learning, and a staged curriculum. The curriculum progresses from Stage 0 (donor-language Standard Greek-to-English translation), through Stage 1 (mixed domain using Standard Greek ASR and dialect speech translation), Stage 2 (dialect domain transition shifting toward dialect ASR while retaining translation regularization), to Stage 3 (target domain specialized entirely on dialect ASR). The approach is evaluated using Whisper-small, Whisper-medium, and Whisper-large-v3, with the encoder frozen except for the convolutional feature extractor during training.

## Results

Evaluated on Cypriot, Cretan, and Messenian Greek dialect corpora using Word Error Rate (WER) and Character Error Rate (CER), the proposed curriculum consistently beats zero-shot and standard fine-tuning baselines across all model sizes. For instance, with Whisper-large-v3, the curriculum reduces Cypriot WER down to 14.56% (compared to 24.89% for standard fine-tuning and 58.33% zero-shot), and Messenian WER to 5.66% (compared to 12.14% for fine-tuning). Ablation studies confirm that both the auxiliary donor-language data and the joint translation-ASR supervision are critical for stable and effective adaptation.

## Code

- https://github.com/athena-ilsp/Dialect-Adaptation

## Applications

Speech engineers and developers building robust automatic speech recognition systems for low-resource regional dialects and under-represented linguistic varieties.

## Limitations

The method is tested exclusively on southern Greek dialect varieties under low-resource data budgets.

## Related

- (link related pages by id as the wiki grows)
