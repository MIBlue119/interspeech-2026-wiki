---
id: kumar26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1007
pdf: https://www.isca-archive.org/interspeech_2026/kumar26c_interspeech.pdf
---

# Overcoming Decoder Inconsistencies in Whisper for Dravidian and Low-Resource Languages

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1007)

**TL;DR** — This paper introduces decoder-level enhancements—Weighted-Attention and Self-Conditioning—to Whisper, achieving consistent WER reductions across low-resource, morphologically rich Dravidian and agglutinative languages.

## Problem

Multilingual ASR models like Whisper exhibit significantly higher Word Error Rates for Dravidian languages compared to Indo-Aryan ones due to longer average word lengths, higher vocabulary diversity, and lower word repetition. These linguistic characteristics lead to sparse token distributions, decoder imbalances between self-attention and cross-attention, and frequent character-level substitution errors within known words. Addressing this is crucial for achieving equitable performance in massively multilingual speech recognition.

## Method

The authors propose two architectural modifications to the Whisper-medium decoder: a Weighted-Attention mechanism using lightweight two-layer feedforward gating networks to dynamically balance self- and cross-attention sources, and a Self-Conditioning module that reinjects intermediate token predictions with an auxiliary cross-entropy loss at the second-last decoder layer. These modules introduce less than 1% additional parameters and are trained using AdamW for 3 epochs with a batch size of 16 on the Kathbath speech corpus. Morphological splitting is also explored as an analytical baseline to demonstrate the impact of vocabulary sparsity.

## Results

Evaluated primarily on the Kathbath dataset covering Indian languages, the proposed modifications yield average WER improvements of 1.54% to 1.65%, with standout relative gains on complex Dravidian languages such as Malayalam (up to 3.00%) and Telugu (up to 2.03%). Additional evaluations on non-Indian agglutinative languages like Korean and Swahili confirm cross-lingual generalization. The methods incur minimal overhead, raising inference latency by less than 2% and adding only 2-3% training overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building multilingual ASR systems for low-resource, highly agglutinative, or morphologically complex languages.

## Limitations

The approach focuses primarily on decoder-level adjustments for autoregressive models and provides more modest gains on high-resource languages where baseline performance is already saturated.

## Related

- (link related pages by id as the wiki grows)
