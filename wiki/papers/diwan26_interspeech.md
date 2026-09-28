---
id: diwan26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1437
pdf: https://www.isca-archive.org/interspeech_2026/diwan26_interspeech.pdf
---

# ParaSpeechCLAP: A Dual-Encoder Speech-Text Model for Rich Stylistic Language-Audio Pretraining

[PDF](https://www.isca-archive.org/interspeech_2026/diwan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/diwan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1437)

**TL;DR** — ParaSpeechCLAP is a dual-encoder speech-text model family that maps speech waveforms and rich natural-language style descriptions (covering intrinsic speaker traits and situational emotions) into a shared embedding space, outperforming baseline models on style retrieval, attribute classification, and inference-time TTS reward guidance.

## Problem

Existing speech-caption alignment models only handle a narrow set of stylistic attributes like basic emotions, failing to capture diverse real-world speech variations such as pitch, texture, and clarity specified through free-form text. This limitation hinders downstream applications like style-prompted text-to-speech (TTS), expressive retrieval, and spoken dialog systems that require fine-grained stylistic control. Developing unified models capable of aligning rich intrinsic and situational descriptors remains challenging due to data sparsity and optimization trade-offs between specialized and multi-task learning.

## Method

The model family comprises specialized Intrinsic and Situational encoders as well as a unified Combined model, using a 317M-parameter WavLM-Large speech encoder and a 278M-parameter Granite Embedding Multilingual text encoder to project into a 768-dimensional space. All models are trained on the ParaSpeechCaps dataset via a bidirectional InfoNCE contrastive loss with a learnable temperature. ParaSpeechCLAP-Intrinsic introduces a multitask objective combining the contrastive loss with an inference-like classification loss using LLM-generated paraphrased prompts (via Gemini 2.5 Pro) for 28 intrinsic tags, paired with class-balanced training using inverse frequency sampling.

## Results

Evaluated on the ParaSpeechCaps holdout and test sets containing 23 situational and 28 intrinsic rich style tags, ParaSpeechCLAP models outperform baselines including random projections, standard ParaCLAP, and VoxProfile-VQ. On the intrinsic dataset, ParaSpeechCLAP-Intrinsic achieves an R@1 of 18.62% and a UAR of 46.58%. The unified ParaSpeechCLAP-Combined model reaches an R@1 of 14.31% and R@10 of 52.17% on compositional evaluation sets, outperforming specialized variants on joint tasks while trailing them on single-domain tests. In best-of-N TTS inference guidance (N=10), ParaSpeechCLAP reward guidance improves style consistency (increasing intrinsic tag recall from 57.9% to 62.4% and situational recall from 69.2% to 74.3%) without degrading naturalness (NMOS) or intelligibility (WER).

## Code

- https://github.com/ajd12342/paraspeechclap

## Applications

Speech and ML engineers building style-prompted text-to-speech systems, expressive speech retrieval engines, rich style captioning pipelines, and expressive spoken dialog systems.

## Limitations

Specialized models require selecting the appropriate variant at inference time, while the unified Combined model underperforms specialized variants on single-domain evaluation tasks.

## Related

- (link related pages by id as the wiki grows)
