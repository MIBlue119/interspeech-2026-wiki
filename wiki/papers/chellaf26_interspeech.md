---
id: chellaf26_interspeech
category: speech-translation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2655
pdf: https://www.isca-archive.org/interspeech_2026/chellaf26_interspeech.pdf
---

# Bridging Languages and Modalities: Lightweight Cross-Lingual Text and Speech Summarization for Low-Resource Scenarios

[PDF](https://www.isca-archive.org/interspeech_2026/chellaf26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chellaf26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2655)

**TL;DR** — A lightweight end-to-end framework projects text sentences and speech utterances into a shared multilingual embedding space to achieve cross-lingual summarization into French under severe data constraints.

## Problem

Traditional cross-lingual speech and text summarization pipelines rely on cascaded ASR and machine translation systems, which suffer from error propagation and high resource requirements. Developing direct end-to-end models for low-resource languages is difficult due to scarce parallel training data and structural disparities between source and target languages.

## Method

The approach utilizes a sentence-based encoder-decoder model named SBARThez (140M trainable parameters), built by modifying BARThez to accept sentence or utterance embeddings via a linear projection layer with GeLU activation. Text inputs are encoded using BGE-M3 (560M parameters), while speech inputs are processed using SENSE, a teacher-student model that maps audio directly into the BGE-M3 semantic space using w2v-BERT 2.0. Training follows a two-stage strategy: first adapting the seq2seq model on the French MLSUM text summarization corpus using sentence embeddings, followed by task-specific fine-tuning on the CrossSum dataset.

## Results

Evaluated on 11 low-resource and 3 high-resource languages using CrossSum (Text to French) with Rouge-L and BertScore metrics, SBARThez outperforms or remains competitive against massive cascaded baselines (like M2M100 paired with BARThez or mT5-large) despite having only 140M trainable parameters. Notably, the model achieves superior performance on several low-resource languages such as Igbo and Pidgin, and handles languages unseen during text embedding pretraining. It also bypasses the need for explicit machine translation systems, which are unavailable for certain dialects like Kirundi and Tunisian Arabic.

## Code

- https://huggingface.co/datasets/cchellaf

## Applications

Engineers and researchers building low-resource cross-lingual speech translation, document archiving, or audio content summarization tools for under-resourced languages.

## Related

- (link related pages by id as the wiki grows)
