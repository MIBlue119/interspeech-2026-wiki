---
id: fong26b_interspeech
category: speech-llm-dialogue
labels: [low-resource, multilingual, self-supervised]
institutions: ["University of Trento", "Fondazione Bruno Kessler"]
code: https://github.com/X-LANCE/SLAM-LLM
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1229
pdf: https://www.isca-archive.org/interspeech_2026/fong26b_interspeech.pdf
---

# Towards Enabling Multilingual Multitask SpeechLLMs in Data-Scarce Settings

*Seraphina Fong, Marco Matassoni, Alessio Brutti*

[PDF](https://www.isca-archive.org/interspeech_2026/fong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1229)

**Category:** `speech-llm-dialogue` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — This paper investigates how to adapt Speech-based Large Language Models (SpeechLLMs) to multiple languages and tasks using under 5 hours of labeled data per task-language pair, showing that high-resource ASR-pretrained projectors make low-resource multitask transfer possible. Using this approach, the system achieves strong performance across Automatic Speech Recognition (ASR), Speech Translation (ST), and Topic Identification (TID), outperforming models trained from scratch.

## Key contributions

- Extends high-resource ASR pretraining methodologies to data-scarce multilingual multitask SpeechLLMs.
- Demonstrates successful multitask transfer to generation and classification tasks beyond ASR, specifically speech translation and topic identification.
- Shows that cross-lingual multitask transfer behavior is tightly coupled with language-family proximity.
- Establishes that zero-shot task generalization does not emerge organically, proving that unseen tasks require explicit target-task supervision.

## Problem

Current SpeechLLMs handle multilinguality and multitask learning in isolation or depend on massive training corpora comprising over 100 million hours of audio, severely disadvantaging low-resource languages. Existing frameworks also exhibit poor zero-shot behavior when moving to tasks or languages absent from pretraining. It remains unclear how SpeechLLMs behave when jointly adapted to multiple tasks and languages using only a few hours of labeled data, a critical gap for realistic deployment scenarios where data scarcity is the norm.

## Method

The architecture utilizes a modular, non-cascaded design consisting of a frozen OpenAI Whisper-large-v3-turbo speech encoder and a frozen EuroLLM-1.7B-Instruct multilingual LLM, bridged by a lightweight linear projection layer. To resolve length discrepancies between modalities, extracted speech embeddings are downsampled by a factor of k = 5. The linear projector contains a single hidden layer with a ReLU activation followed by a regression layer, totaling 17.31M trainable parameters, while the encoder and LLM remain completely frozen. Training is performed using the SLAM-LLM framework via dynamic frame batching (train_max_frame_length = 1500, eval_max_frame_length = 3000), optimized with standard cross-entropy loss between predicted tokens and ground-truth label tokens. Optimization uses a scheduler with 1,000 warmup steps, a constant learning rate thereafter, a maximum of 10 epochs with early stopping, and beam search decoding (beam size = 4) during inference. Task-specific prompting is used to switch behaviors across ASR, ST, and TID.

The initialization strategies compared include training from scratch, CommonVoice (CV) 20.0 ASR pretraining (monolingual 200h IT or multilingual 500h across IT, ES, EN, FR, DE), and a highly multilingual pretrained projector (MEUSLI, supporting 28 European languages) adapted via LoRA adapters (r = 8, alpha = 32) on query and value projection layers adding 1.4M parameters.

## Experimental setup

Experiments use the Italian (IT), Spanish (ES), Galician (GL), Czech (CS), and Finnish (FIN) subsets of the SIB-Fleurs dataset, providing roughly 3 to 5 hours of parallel labeled training data per task and language. High-resource ASR pretraining leverages CommonVoice 20.0 (200 hours or 500 hours). Performance metrics are Word Error Rate (WER, %) for ASR, BLEU (%) for ST, and Accuracy (%) and Macro F1 (%) for TID. The primary open-weight baseline is Qwen2-Audio-7B-Instruct, evaluated zero-shot without SIB-Fleurs finetuning. All runs were executed on a single NVIDIA Ada Lovelace L40S GPU.

## Results

Training multitask models from scratch with under 5 hours of data fails catastrophically, yielding high ASR error rates (WER 129.0–162.0%) and near-zero BLEU scores, whereas bootstrapping from a 200-hour IT ASR-pretrained projector drops Italian WER from 129.0% to 5.4%, raises ST BLEU from 0.8% to 48.2%, and increases TID accuracy from 71.8% to 81.5%. When comparing finetuning configurations using a 5-language CV ASR pretrained projector, monolingual finetuning is more stable for distant languages like Czech (25.2% vs 58.2% WER) and Finnish (33.1% vs 48.3% WER) compared to joint multilingual multitask finetuning. However, when using a strongly multilingual projector (MEUSLI, 28 languages), monolingual and multilingual finetuning perform comparably well across all languages (e.g., Czech WER 11.0% vs 12.9%). Zero-shot cross-lingual transfer drops rapidly as language-family distance increases from Spanish and Galician down to Czech and Finnish, and zero-shot cross-task transfer completely fails for unseen tasks (e.g., 0% accuracy on TID when trained only on ASR and ST).

| System / Condition | ASR WER (%) ↓ | ST BLEU (%) ↑ | TID Acc (%) ↑ |
|---|---|---|---|
| Scratch (Multi) - Italian | 12.6 | 43.3 | 66.1 |
| Scratch (Multi) - Czech | 43.1 | 22.2 | 60.8 |
| CV-Pretrained + Multi FT - Italian | 22.8 | 47.1 | 74.8 |
| CV-Pretrained + Mono FT - Italian | 6.0 | 51.5 | 79.7 |
| MEUSLI + Mono FT - Czech | 11.0 | 40.7 | 77.4 |
| Qwen2-Audio-7B-Instruct (Zero-Shot) - Finnish | >100.0 | <5.0 | 26.1 |

## Limitations

The study is experimentally bounded to European language families (Romance, Slavic, and Uralic) and restricts evaluation to three specific tasks (ASR, ST, TID). The findings rely on low-resource regimes of 3–5 hours per language-task pair, meaning behavior at intermediate data scales (e.g., 20-50 hours) remains unexplored. Furthermore, zero-shot transfer limits indicate that open-ended task expansion requires explicit supervision rather than relying solely on instruction-tuned prompt adaptation.

## Why read this

Speech and ML researchers building low-resource multilingual speech models should read this to understand the precise impact of ASR projector pretraining versus end-to-end training from scratch. It provides a practical roadmap for achieving multi-task competence under strict data scarcity without scaling up to massive proprietary audio corpora.

## Code

- https://github.com/X-LANCE/SLAM-LLM/blob/main/examples/aispeech_asr

## Applications

On-device multilingual voice assistants and speech processing pipelines requiring simultaneous transcription, translation, and intent/topic classification for low-resource or regional dialects.

## Institutions / 機構

University of Trento, Fondazione Bruno Kessler

**Funding / 經費:** European Union

## Related

- (link related pages by id as the wiki grows)
