---
id: kheir26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1366
pdf: https://www.isca-archive.org/interspeech_2026/kheir26_interspeech.pdf
---

# DeepFense: A Unified, Modular, and Extensible Framework for Robust Audio Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/kheir26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kheir26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1366)

**TL;DR** — DeepFense is an open-source, modular PyTorch framework for speech deepfake detection that provides over 100 recipes and 456 pre-trained models to streamline benchmarking and large-scale cross-domain evaluation.

## Problem

Speech deepfake detection research suffers from fragmented implementations, hidden hyperparameter configurations across disparate codebases, and a lack of standardized evaluation protocols. These artifacts make it difficult to isolate true algorithmic improvements from implementation details and hinder reproducibility across studies.

## Method

The framework utilizes a configuration-driven architecture built around four main components: a YAML-based Configuration Orchestrator, a Data Foundry pipeline handling transforms and stochastic augmentations via Parquet metadata files, a modular DeepFense Engine combining SSL front-ends, classification back-ends, and loss functions, and a unified Trainer supporting Weights & Biases and TensorBoard logging. It integrates various SSL front-ends loaded via Hugging Face, Fairseq, and Unilm (such as Wav2Vec 2.0, WavLM, HuBERT, EAT, MERT, Whisper, BEATs, and Wav2Vec2-BERT) which can be frozen, fine-tuned, or layer-aggregated. It supports seven classification back-ends (AASIST, ECAPA-TDNN, RawNet2, Nes2Net, TCM, MLP, Pool, and BiCrossMamba-ST), four loss functions (Cross-Entropy, OC-Softmax, AM-Softmax, A-Softmax), and ten augmentation pipelines including RawBoost and codec simulation.

## Results

Using DeepFense, the authors conducted a large-scale evaluation of over 400 models across 6 training sets (including ASV19, ASV5, ADD23, CodecFake, HABLA, PartialSpoof) and 13 test sets. Replicating state-of-the-art systems on out-of-domain test sets like In-the-Wild, ASV5, and CodecFake showed consistent performance matching or exceeding original papers (e.g., AASIST average EER improved from 22.83% to 20.16% when trained on ASV19). Large-scale comparisons revealed that Wav2Vec2 achieves the lowest macro-average EER of 25.5% across benchmarks, and that front-end choices dominate performance variance while models exhibit severe biases regarding audio quality, speaker gender, and language.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing voice biometric security systems, audio forensic investigators, and researchers benchmarking synthetic speech detectors.

## Limitations

The study highlights severe vulnerabilities in high-performing deepfake detectors regarding audio quality, speaker gender, and language biases.

## Related

- (link related pages by id as the wiki grows)
