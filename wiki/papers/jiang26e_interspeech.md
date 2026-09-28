---
id: jiang26e_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1724
pdf: https://www.isca-archive.org/interspeech_2026/jiang26e_interspeech.pdf
---

# Cognitive-Heuristic Guided Multimodal Data Augmentation for Alzheimer’s Disease Detection Using LLM and TTS

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1724)

**TL;DR** — A cognitive-heuristic guided multimodal generative augmentation framework using RAG-enhanced LLMs and attribute-guided TTS is proposed to alleviate data scarcity in speech-based Alzheimer's disease detection, improving test accuracy on ADReSSo from 0.789 to 0.831 using CogniAlign.

## Problem

Speech-based Alzheimer's disease (AD) detection suffers from severe data scarcity due to privacy constraints and limited public corpora. Existing data augmentation techniques in text and speech typically rely on unconstrained single-modality perturbations or generation, failing to maintain multimodal alignment and neglecting critical cognitive markers of AD such as abnormal pauses, fillers, and reduced lexical diversity. This leads to augmented samples that lack clinical validity and fail to enhance downstream detection robustness effectively.

## Method

The framework operates in three stages: cognitive-heuristic data annotation to build a behavioral profile (lexical complexity MATTR, non-lexical fillers, and pause-to-speech ratios); knowledge-constrained text generation using a Dual-Source Retrieval-Augmented Generation (RAG) strategy combined with Qwen2.5-Omni/LLMs guided by hierarchical instruction mapping; and attribute-guided speech synthesis using a fine-tuned CosyVoice2 model conditioned on the generated text scripts containing explicit temporal and disfluency markers. The TTS model is fine-tuned for 10 epochs on the DementiaBank Pitt Corpus using a single NVIDIA H100 GPU. The augmented data is mixed at a 1:1 ratio with the original training set.

## Results

Evaluated primarily on the ADReSSo dataset (237 samples) and DementiaBank Pitt Corpus, using Accuracy, F1-score, Recall, and Precision. Across three downstream detection architectures (ERNIE, MM-AD, and CogniAlign), the proposed augmentation consistently improves performance. For CogniAlign, accuracy increases from 0.789 to 0.831 and F1 from 0.783 to 0.833. Text-only augmentation outperforms back-translation and fine-tuned GPT-2, achieving an accuracy of 0.857 and F1 of 0.853. Audio augmentation ablation demonstrates that explicitly conditioning TTS on cognitive labels (Accuracy 0.831, F1 0.833) outperforms acoustic perturbations, voice conversion, and unconditioned TTS. Data-scale analysis shows optimal performance at 1.0× to 2.0× expansion ratios.

## Code

- https://jiangyu1205.github.io/Data-Augmentation-for-Alzheimer-s/

## Applications

Speech and machine learning engineers developing non-invasive, digital health screening tools for early detection and monitoring of neurodegenerative disorders like Alzheimer's disease.

## Limitations

Excessive augmentation scaling beyond 2.0x yields diminishing returns and potential overfitting, indicating a sensitivity to data volume.

## Related

- (link related pages by id as the wiki grows)
