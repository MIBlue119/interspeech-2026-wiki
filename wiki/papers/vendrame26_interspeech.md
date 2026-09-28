---
id: vendrame26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2769
pdf: https://www.isca-archive.org/interspeech_2026/vendrame26_interspeech.pdf
---

# Joint Speech And Text Training For LLM-based End-To-End Spoken Dialogue State Tracking

[PDF](https://www.isca-archive.org/interspeech_2026/vendrame26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/vendrame26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2769)

**TL;DR** — The paper introduces a joint speech-and-text training framework for end-to-end spoken dialogue state tracking that leverages unpaired text data from target domains to achieve cross-domain generalization without requiring target-domain speech training data.

## Problem

End-to-end spoken dialogue state tracking (DST) models suffer from severe data scarcity because collecting annotated spoken dialogue data for every target domain is costly and laborious. While cascade systems avoid this by using text DST, they suffer from error propagation and increased complexity, whereas existing end-to-end speech-LLM models struggle to generalize to unseen domains and slot values without domain-specific speech training data.

## Method

The architecture combines a pretrained WavLM speech encoder, a 4-layer Transformer connector, a text encoder for written user queries, and a large language model (Gemma-3-1B-it, 4B-it, 12B-it, or OLMo-1B) with LoRA adapters. The model is trained in two phases: first, the speech encoder and connector are pretrained for ASR on diverse corpora; second, the connector, text encoder, and LoRA parameters are jointly finetuned on parallel speech-DST and unpaired text-DST batches using a sum of cross-entropy losses while keeping the base LLM and speech encoder frozen. The text encoder maps written user inputs directly into the connector embedding space during training and is discarded at inference time.

## Results

Evaluated primarily on the SpokenWOZ and Speech-Aware MultiWOZ datasets using Joint Goal Accuracy (JGA), the proposed joint training consistently improves cross-domain performance. Training on SpokenWOZ speech jointly with MultiWOZ text reduced the JGA performance gap on the MultiWOZ validation set by 28.9% compared to models trained without text, while the reverse direction reduced the gap by 64.7%. Mixing target domain text with larger corpora like DialogStudio maintains strong adaptation benefits, and scaling up the LLM size (e.g., to Gemma-3-12B-it) further shrinks or eliminates cross-domain performance degradation.

## Code

- https://github.com/kackav/dialogue_state_tracking

## Applications

Task-oriented dialogue systems and conversational agents requiring robust end-to-end spoken dialogue state tracking across diverse, resource-constrained domains where only written textual dialogue data is readily available.

## Limitations

Performance on certain target domains can be constrained if the available text data originates from a different geographic context (e.g., MultiWOZ training text featuring Cambridge versus validation/test sets featuring New York), impacting slot value generalization.

## Related

- (link related pages by id as the wiki grows)
