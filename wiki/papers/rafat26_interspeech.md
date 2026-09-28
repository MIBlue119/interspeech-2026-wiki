---
id: rafat26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3334
pdf: https://www.isca-archive.org/interspeech_2026/rafat26_interspeech.pdf
---

# Dynamic Block-Online Streaming ASR for Low-Resource Agglutinative Code-Switching Speech with Morphology-Aware Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/rafat26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rafat26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3334)

**TL;DR** — A dynamic block-online ASR framework for low-resource intra-sentential Bangla-English code-switching uses VAD-aligned inference and script-anchored loanword injection to achieve a 38.73% Word Error Rate.

## Problem

Strictly causal streaming ASR models struggle with low-resource agglutinative code-switching because fixed lookahead windows fail when prefixes, suffixes, and English loanwords cross language boundaries, causing severe morphological truncation and alignment drift. Standard Word Error Rate metrics also fail to isolate where failures occur across roots, language switches, and suffixes.

## Method

The paper introduces a Non-Autoregressive Paraformer backbone utilizing SAN-M blocks with a Voice Activity Detector (VAD) to trigger dynamic macro-blocks up to 3 seconds, restoring global bidirectional attention during inference. To address data scarcity, they propose Script-Anchored Loanword Injection, embedding 750 high-frequency English loanwords into a 750-hour composite Bangla training corpus to form 20% code-switched training sentences. They also establish Fine-Grained CS-WER (Eswitch/Eroot/Emorph) to measure switch-point, loanword root, and morphological boundary errors independently.

## Results

Evaluated on a 750-hour composite Bangla-English conversational test set and a specialized menstrual health dataset, the Dynamic Block Paraformer achieves a Global WER of 38.73% (CER 15.62%), matching large offline models while maintaining streaming capability. Compared to causal streaming models that plateau at an Mroot of 0.35 and Mmorph of 0.42, the dynamic block approach improves morphological precision to an Mroot of 0.29 and Mmorph of 0.35. Script-anchored loanword injection drastically reduces root errors from 87% to 25% for offline and 99% to 61% for online setups. Domain adaptation on a menstrual health test set yielded a 27% WER and an Eroot of 22 after fine-tuning.

## Code

- https://github.com/Dynamic-ASR

## Applications

Engineers and developers building real-time speech recognition pipelines for low-resource, agglutinative, and code-switched languages, particularly for downstream tasks like small language models in health tech domains.

## Limitations

The framework depends heavily on the accuracy of an external Voice Activity Detector, and the training data covers a curated set of the 750 most common loanwords rather than the complete vocabulary space.

## Related

- (link related pages by id as the wiki grows)
