---
id: gering26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1152
pdf: https://www.isca-archive.org/interspeech_2026/gering26_interspeech.pdf
---

# A System-Agnostic Approach to Modelling Interaction Quality in Spoken Dialogue Systems

[PDF](https://www.isca-archive.org/interspeech_2026/gering26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gering26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1152)

**TL;DR** — This study introduces a system-agnostic approach for predicting interaction quality in spoken dialogue systems using acoustic, textual, and temporal features, achieving performance comparable to system-dependent approaches when end-to-end fine-tuning is applied.

## Problem

Automatic evaluation of spoken dialogue systems traditionally relies on system-dependent features like internal log files, which limits model generalisability across different architectures and tasks. While prior system-agnostic attempts used textual and temporal context, they lacked raw acoustic signals and paralinguistic cues essential for capturing user satisfaction. Overcoming this gap is critical for scalable, holistic evaluations of human-system interactions.

## Method

The study evaluates long short-term memory (LSTM) classifiers with self-attention for multi-class interaction quality prediction on the CMU Let's Go (LEGO) corpus (229 dialogues, 5477 exchanges). It compares system-dependent (SD) features (extracted from logs and encoded via SBERT, RoBERTa, and TOD-BERT) against system-agnostic (SA) features (transcripts from Whisper large-v3-turbo/WhisperX, turn-taking metrics, response tokens, and acoustic features from eGeMAPSv02, HuBERT, WavLM, and Wav2Vec 2.0). The pipeline is tested in two phases: Phase 1 uses frozen pre-trained features with PCA dimensionality reduction, while Phase 2 implements joint end-to-end fine-tuning of encoders, feature projection layers, LayerNorm, and the LSTM backend.

## Results

Models were evaluated on a dialogue-level test split using Macro-F1 and Unweighted Average Recall (UAR), benchmarking against a majority baseline and prior work by Ultes. In Phase 1 (static pipeline), the SD feature set significantly outperformed the SA set, achieving a Macro-F1 of 0.469 versus 0.389 (UAR 0.463 vs 0.383). In Phase 2 (fine-tuned pipeline), the performance gap narrowed, with the fine-tuned SA model reaching Macro-F1 of 0.454 and UAR 0.453, performing statistically comparable to the SD models (Macro-F1 0.462, UAR 0.471). Permutation tests confirmed that while static SD significantly outperformed static SA (p = .046), fine-tuning raised SA performance to parity with SD (p > .05). Inference latency remained below 20 ms per exchange across all models.

## Code

- https://github.com/prgering/interaction-quality-modelling-sds

## Applications

Speech and ML engineers building spoken dialogue systems can use this approach to automate user satisfaction monitoring and dialogue quality evaluation without relying on internal system logs.

## Limitations

The system-agnostic pipeline relied on manually corrected transcripts rather than a fully automated speech-to-text pipeline, and evaluations were restricted to a single dated telephone corpus.

## Related

- (link related pages by id as the wiki grows)
