---
id: chellaf26_interspeech
category: translation
labels: [low-resource, multilingual, efficient-on-device]
institutions: ["Avignon Universite", "Lundi Matin"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2655
pdf: https://www.isca-archive.org/interspeech_2026/chellaf26_interspeech.pdf
---

# Bridging Languages and Modalities: Lightweight Cross-Lingual Text and Speech Summarization for Low-Resource Scenarios

*Chaimae Chellaf, Salima Mdhaffar, Yannick Estève, Stéphane Huet*

[PDF](https://www.isca-archive.org/interspeech_2026/chellaf26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chellaf26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2655)

**Category:** `translation` · **Labels:** `low-resource`, `multilingual`, `efficient-on-device`

**TL;DR** — The paper introduces SBARThez, a lightweight end-to-end framework for cross-lingual text and speech summarization that projects source inputs into pre-aligned semantic embedding spaces. Operating with only 140M trainable parameters, it outperforms massive cascaded pipelines (exceeding 2.7B parameters) on low-resource text and speech summarization tasks.

## Key contributions

- A unified, lightweight end-to-end cross-lingual summarization architecture (SBARThez) using 140M trainable parameters that maps text sentences or speech utterances into a shared semantic space.
- The introduction of ABT-SpeechSUM, a new open-source evaluation dataset for cross-lingual speech summarization covering three low-resource languages (Armenian, Breton, and Tunisian Arabic).
- A two-stage training recipe that adapts a token-level seq2seq model (BARThez) to accept sentence-level or utterance-level semantic embeddings using frozen teacher models (BGE-M3 and SENSE).
- Demonstration of cross-modal zero-shot transfer where a text-trained embedding summarizer successfully processes speech inputs without direct audio fine-tuning.

## Problem

Traditional cross-lingual summarization relies heavily on cascade pipelines—such as automatic speech recognition (ASR) followed by machine translation (MT) and text summarization—which suffer from error propagation and compound information loss. Alternatively, existing end-to-end multilingual large language models or text summarization strategies demand massive compute, and cross-lingual speech summarization remains largely unexplored for low-resource languages due to a severe scarcity of parallel audio-summary data. This gap matters because billions of people communicate in low-resource spoken dialects that are excluded by high-resource data-hungry architectures.

## Method

The framework processes either input text (split into sentences) or input audio (segmented via Silero-VAD and encoded into 5-10s chunks) through modality-specific encoders: BGE-M3 (560M parameters) for text sentence embeddings and SENSE (built on w2v-BERT 2.0) for speech utterance embeddings. Both models map inputs into a shared 1024-dimensional semantic space via distillation. The sequence of embedding vectors is passed to a modified 165M-parameter BART-derivative sequence-to-sequence model named BARThez, where the original token-level embedding layer is removed and replaced by a linear projection layer with a GeLU activation function to bridge the 1024-d embedding space to the 768-d decoder input.

Training occurs in two distinct stages. In Stage 1, the seq2seq model is adapted to sentence embeddings using the French MLSUM corpus (approx. 392K articles) with AdamW (batch size 16, seq2seq learning rate 1e-5, projection layer learning rate 1e-3, cross-entropy loss). In Stage 2, the model is fine-tuned on task-specific corpora (CrossSum-FR for text, or ABT-SpeechSUM for low-resource speech). Throughout training, the BGE-M3 and SENSE embedding models remain completely frozen, ensuring that only 140M parameters (the projection layer and modified BARThez) are updated. At inference time, the model directly ingests source-language embeddings and auto-regressively generates abstractive French summaries.

## Experimental setup

Evaluated on the CrossSum text dataset across 11 low-resource languages and 3 high-resource languages, and the newly collected ABT-SpeechSUM dataset spanning Armenian (6h 41min), Breton (47min), and Tunisian Arabic (27h 18min). Baselines include cascaded text/speech pipelines combining M2M-100 (1.2B), Whisper-Large, and mT5-large (1.2B). Metrics include Rouge-L and BertScore (unscaled). Total inference footprint consists of a 560M encoder and a 140M seq2seq core (700M total parameters).

## Results

SBARThez-speech achieves top performance on the ABT-SpeechSUM test split, scoring 20.59 Rouge-L / 72.94 BertScore for Tunisian Arabic (beating Whisper+mT5's 18.95), 15.03 / 70.19 for Breton (beating Whisper+M2M+mT5's 3.08), and 14.54 / 67.97 for Armenian (beating Whisper+M2M+mT5's 1.85). In cross-lingual text summarization (CrossSum), SBARThez outperforms or matches large 1.2B parameter end-to-end and cascaded models on most low-resource languages (e.g., scoring 22.21 Rouge-L on Nigerian Pidgin and 21.64 on Igbo). The cross-modal SBARThez-text variant (trained only on text translations) remains competitive when evaluated directly on speech, outperforming cascaded speech pipelines on Breton and Armenian.

However, cascaded models still achieve higher performance on several high-resource text translation pairs (e.g., French and English source tasks), and extremely limited audio domains like Breton (only 41 minutes of training audio) yield lower absolute ROUGE scores compared to high-resource setups.

| System / Condition | Tunisian (R-L / BS) | Breton (R-L / BS) | Armenian (R-L / BS) |
|---|---|---|---|
| W-L ST + M2M100 + mT5-large | 18.95 / 72.38 | 1.04 / 47.81 | 8.80 / 61.47 |
| W-L ASR + M2M100 + mT5-large | 17.79 / 70.94 | 3.08 / 52.33 | 1.85 / 48.85 |
| SBARThez-text (ours) | 17.76 / 71.52 | 13.71 / 68.38 | 10.06 / 60.40 |
| SBARThez-speech (ours) | 20.59 / 72.94 | 15.03 / 70.19 | 14.54 / 67.97 |

## Limitations

The evaluation is constrained by the small size of the collected ABT-SpeechSUM dataset, particularly for Breton (47 minutes total duration) and Armenian (6 hours), requiring joint training to avoid optimization instability. The framework relies heavily on the quality and language coverage of the upstream frozen embedding models (BGE-M3 and SENSE), meaning unsupported dialects outside their 83-language training scope cannot be processed effectively. Furthermore, summaries for training low-resource data were synthetically generated using GPT-4o mini rather than human annotators, introducing potential synthetic bias.

## Why read this

Speech and ML engineers working under extreme data or compute constraints will find a blueprint for bypassing error-prone ASR-MT-summarization pipelines. It proves that aligning audio and text via frozen semantic embedding spaces enables efficient, high-performance cross-lingual summarization with a fraction of the parameters of standard LLMs.

## Code

- https://huggingface.co/datasets/cchellaf/ABT-SpeechSUM

## Applications

Automated cross-lingual news digestion, global podcast summarization for low-resource dialects, and multilingual archival audio cataloging.

## Institutions / 機構

Avignon Universite, Lundi Matin

## Related

- (link related pages by id as the wiki grows)
