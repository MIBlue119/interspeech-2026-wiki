---
id: vendrame26_interspeech
category: speech-llm-dialogue
labels: [low-resource]
institutions: ["Brno University of Technology"]
code: https://github.com/kackav/dialogue_state_tracking
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2769
pdf: https://www.isca-archive.org/interspeech_2026/vendrame26_interspeech.pdf
---

# Joint Speech And Text Training For LLM-based End-To-End Spoken Dialogue State Tracking

*Katia Vendrame, Bolaji Yusuf, Santosh Kesiraju, Šimon Sedláček, Oldřich Plchot, Honza Černocký*

[PDF](https://www.isca-archive.org/interspeech_2026/vendrame26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/vendrame26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2769)

**Category:** `speech-llm-dialogue` · **Labels:** `low-resource`

**TL;DR** — This paper proposes jointly training end-to-end speech-to-DST models on paired spoken data from a source domain and unpaired text data from target domains, using a shared connector and LLM with a text encoder. This approach bridges up to 79% of the cross-domain dialogue state tracking performance gap without needing expensive domain-specific speech collection.

## Key contributions

- Introduces a multimodal E2E DST architecture that augments a speech encoder-connector-LLM pipeline with a parallel text encoder to consume unpaired task-oriented dialogue text.
- Demonstrates cross-domain generalization on SpokenWOZ and MultiWOZ, recovering up to 64.7% to 79% of the performance gap compared to training directly on target-domain speech.
- Shows that joint text training remains effective even when target text forms a small fraction of a larger, noisy text corpus (e.g., DialogStudio).
- Compares joint text training against Text-to-Speech (TTS) data augmentation, proving it matches TTS-based adaptation without the complexity and resource overhead of high-quality TTS engines.

## Problem

End-to-end spoken dialogue state tracking (DST) models combine speech encoders and large language models to directly map speech audio to structured JSON dialogue states, avoiding error propagation from cascaded ASR systems. However, these models suffer from severe data scarcity, as collecting annotated spoken DST data across multiple specialized domains is excessively costly and difficult. Prior models struggle to generalize to unseen target domains (such as slot values for new restaurants or locations) without target-domain speech. While unpaired written task-oriented dialogue text is abundant and inexpensive, leveraging it jointly with limited speech remains underexplored for E2E DST.

## Method

The base architecture builds upon an E2E framework consisting of a pretrained WavLM speech encoder, a 4-layer Transformer connector with 2 convolutional subsampling layers (yielding 8 Hz speech embeddings), and an LLM (Gemma-3-1B-it, 4B, 12B, or OLMo-1B) with LoRA adapters (rank and alpha 32). To incorporate text, a parallel Transformer text encoder with identical dimensions to the connector Transformer is introduced to process natural language user turns. The speech encoder and base LLM weights are frozen while the connector, text encoder, and LoRA parameters are jointly fine-tuned. 

Training proceeds in two phases. Phase 1 pretrains the speech encoder and connector on diverse ASR corpora (Fisher, Librispeech, CommonVoice 17, VoxPopuli) for 100k steps using the AdamW optimizer (learning rate peaked at 2e-4 via 1000 warmup steps, then decayed to 2e-6). Phase 2 fine-tunes the model for up to 60k steps using AdamW (lr warmup to 5e-5) by minimizing a sum of cross-entropy losses computed over speech DST batches, text DST batches from unpaired data, and text DST batches derived from the transcriptions of the speech data. During inference, the text encoder is discarded entirely, incurring zero additional inference latency or parameter overhead compared to the baseline speech DST model.

## Experimental setup

Experiments use the SpokenWOZ (SW) and Speech-Aware MultiWOZ (MW) datasets, alongside DialogStudio (DS) for broad text corpora. ASR pretraining utilizes Fisher, Librispeech, CommonVoice 17, and VoxPopuli. Models evaluated include Gemma-3-1B-it, Gemma-3-4B-it, Gemma-3-12B-it, and OLMo-1B. Performance is measured via Joint Goal Accuracy (JGA) using standard MultiWOZ scripts with fuzzy matching, alongside Word Error Rate (WER) and Slot Key F1 score.

## Results

Training on SpokenWOZ speech jointly with MultiWOZ text on Gemma-3-1B-it yields 19.0% JGA on MW Val (reducing the gap to the fully supervised MW speech baseline by 28.9%), while the reverse (MW speech + SW text) achieves 30.6% JGA on SW Val (reducing the gap by 64.7%). On test sets using OLMo-1B, training with MW text closes 46% of the MW performance gap, while training with SW text on MW speech recovers 79% of the SpokenWOZ gap. Scaling the LLM from 1B to 12B parameters substantially diminishes cross-domain degradation, with Gemma-3-12B-it achieving 42.2% JGA on SW Test when trained on MW speech and SW text—virtually matching the performance of models trained directly on SW speech (42.6%). Ablations reveal that removing the text encoder and simply fine-tuning LoRA on text hurts target performance, confirming the text encoder's critical role in aiding the speech pipeline's entity extraction.

| System / Condition | Training Speech | Training Text | SW Val JGA (%) | MW Val JGA (%) |
|---|---|---|---|---|
| Baseline (A1) | SW | None | 36.1 | 15.1 |
| Joint Training (A2) | SW | MultiWOZ | 36.3 | 19.0 |
| Baseline (B1) | MW | None | 20.5 | 28.6 |
| Joint Training (B2) | MW | SpokenWOZ | 30.6 | 24.7 |
| Mixed Text (A3) | SW | MW, DialogStudio | 37.9 | 18.4 |
| Oracle Text (C4) | MW+SW | MW-val, SW-val | 55.3 | 42.4 |

## Limitations

The evaluation is constrained to English-language task-oriented dialogue datasets (SpokenWOZ and MultiWOZ) and may not generalize straightforwardly to highly morphologically complex or low-resource spoken languages lacking robust base text corpora. MultiWOZ exhibits a distribution shift between training (Cambridge) and evaluation (New York) cities, which bounds how effectively text value transfer can succeed without domain-aligned slot values. Additionally, the approach relies on having access to at least some in-domain or related task-oriented dialogue text corpora.

## Why read this

Speech and ML engineers building end-to-end spoken dialogue agents should read this to learn how to exploit abundant text DST datasets for cross-domain speech adaptation without expensive synthetic TTS generation or target-domain audio collection.

## Code

- https://github.com/kackav/dialogue_state_tracking

## Applications

Task-oriented dialogue systems, voice assistants, and spoken dialogue state tracking for automotive, smart home, and customer service applications.

## Institutions / 機構

Brno University of Technology

**Funding / 經費:** PRINS, European Union, Horizon Europe, MoE

## Related

- (link related pages by id as the wiki grows)
