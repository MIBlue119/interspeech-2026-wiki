---
id: koudounas26b_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Politecnico di Torino", "Kore University of Enna", "Amazon", "Universita degli Studi di Palermo"]
code: https://github.com/SALT-Research/SHALLOW
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2347
pdf: https://www.isca-archive.org/interspeech_2026/koudounas26b_interspeech.pdf
---

# Hallucination Benchmark for Speech Foundation Models

*Alkis Koudounas, Moreno La Quatra, Manuel Giollo, Sabato Marco Siniscalchi, Elena Baralis*

[PDF](https://www.isca-archive.org/interspeech_2026/koudounas26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koudounas26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2347)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — SHALLOW is the first comprehensive evaluation benchmark for automatic speech recognition (ASR) hallucinations that categorizes errors across four distinct dimensions—lexical, phonetic, morphological, and semantic—demonstrating that standard Word Error Rate (WER) fails to capture critical semantic and polarity-flipping errors in high-stakes domains.

## Key contributions

- Introduces a structured taxonomy of ASR hallucination types grounded in linguistic and acoustic distinctions, accompanied by transparent, quantifiable sub-metrics.
- Provides a standardized evaluation framework (SHALLOW) that avoids single-score aggregation to preserve interpretable diagnostic profiles across model architectures.
- Constructs a controlled synthetic dataset of 1,050 hypothesis-reference pairs across 6 distinct error categories to validate the orthogonality and responsiveness of individual metrics.
- Demonstrates through clinical medical ASR case studies that SHALLOW successfully flags critical meaning-reversal errors (e.g., swapping 'can' and 'can not') that have deceptively low WER.

## Problem

Modern large-scale ASR foundation models increasingly incorporate generative language model decoders that prioritize fluency over acoustic fidelity, frequently generating plausible-sounding hallucinations ungrounded in the input speech. Standard aggregate metrics like Word Error Rate (WER) treat all errors uniformly, failing to distinguish between surface-level character typos and severe semantic alterations that completely reverse meaning. This presents critical safety risks in domains like healthcare, legal transcription, and education, where traditional NLP hallucination frameworks (such as ROUGE or factual consistency checkers) cannot be applied because the ground truth is an acoustic speech signal rather than external text.

## Method

The SHALLOW framework decomposes ASR errors into four primary axes without collapsing them into a single aggregate score. Lexical Fabrications (LF) use a composite scoring function across insertion (weight 0.5), substitution (0.3), and deletion (0.2) ratios, prioritizing insertions as the most damaging ungrounded fabrications. Phonetic Fabrications (PF) transform tokens into metaphone strings and compute normalized Hamming, Levenshtein, and Jaro-Winkler distance metrics. Morphological Errors (ME) combine structural divergence (SD, weight 0.4, calculated via dependency graph Jaccard similarity) and weighted grammatical/spelling errors (GE, weight 0.6). Semantic Errors (SE) combine local multi-scale sliding window contextual embeddings for unigrams (0.5), bigrams (0.3), and trigrams (0.2) with global sentence embedding cosine distance and a contradiction-aware Natural Language Inference (NLI) score multiplied by BERTScore F1 (weighted 0.25 local and 0.75 global).

Component weights for each dimension were validated and tuned using an exhaustive discriminability search across weight configurations and a human annotation study measuring inter-annotator agreement (Fleiss' kappa = 0.71). The framework evaluates models zero-shot using open-source pre-trained weights across diverse speech families without domain-specific fine-tuning, exposing fundamental architectural tensions between acoustic encoders and language generation decoders.

## Experimental setup

Evaluations span standard speech (LibriSpeech-Other, TEDLIUM, GIGASPEECH), noisy domestic conditions (CHiME6), accented/dialectal speech (CORAAL, CV16-Accented, GLOBE-v2, SpeechOcean), and specialized domains (MyST Child, VoxPopuli). Twelve models from four major paradigms are compared: self-supervised encoders (HuBERT, MMS), encoder-decoders (Whisper-Large-v2, Whisper-Large-v3, Canary), encoder-transducers (Parakeet), and multimodal SpeechLLMs (SALMONN, Qwen2-Audio, Qwen2.5-Omni, Granite-Speech, Kimi-Audio, Phi-4-Multimodal-Instruct). Performance is measured via WER and SHALLOW's four dimensional scores, using Spearman rank correlations across five distinct WER regimes (10% to 90%).

## Results

While decoder-only models like Phi-4 (WER 12.07%) and Qwen2.5-Omni (WER 12.76%) achieve the lowest aggregate WER, SHALLOW reveals distinct structural trade-offs. Encoder-transducer models like Parakeet achieve the lowest phonetic fabrication scores (PF = 15.33), demonstrating superior acoustic-to-token alignment. Spearman correlation analysis shows that SHALLOW metrics track closely with WER in low-error regimes (rho > 0.80 at 10-30% WER), but completely decouple as recognition quality degrades (dropping to negative correlations like rho = -0.45 between lexical and semantic dimensions at 90% WER). In clinical zero-shot evaluations on Medical-ASR and AfriSpeech, models with low WER (0.14-0.20) exhibit dangerously high semantic error scores (SE > 56.0) when critical symptoms or polarities are altered.

| System / Condition | WER (%) | Lexical (LF) | Phonetic (PF) | Morphological (ME) | Semantic (SE) |
|---|---|---|---|---|---|
| HuBERT | 40.94 | 14.56 | 35.56 | 27.55 | 35.30 |
| Whisper-Large-v3 | 14.20 | 6.74 | 17.75 | 11.13 | 14.74 |
| Parakeet | 12.54 | 5.38 | 15.33 | 10.59 | 13.33 |
| Qwen2.5-Omni | 12.76 | 5.17 | 16.25 | 10.56 | 12.71 |
| Phi-4-Multimodal | 12.07 | 6.18 | 17.94 | 11.22 | 14.37 |

## Limitations

The current benchmark implementation is restricted to English evaluation due to its heavy reliance on language-specific dependency parsers, metaphone dictionaries, and semantic embedding models. The assigned component weights reflect general empirical calibrations and human perceptual studies, but they cannot be universally optimal across all specialized downstream deployment domains. Additionally, computing composite scores per dimension sacrifices individual sub-metric granularity for the sake of interpretability.

## Why read this

Speech and ML engineers building ASR deployment pipelines for high-stakes domains (healthcare, legal) should read this paper to understand why WER is blind to dangerous semantic hallucinations and how to diagnose architectural trade-offs between acoustic fidelity and language model fluency.

## Code

- https://github.com/SALT-Research/SHALLOW

## Applications

Automated quality assurance and safety auditing for ASR systems deployed in clinical transcription, legal proceedings, educational assessment, and voice assistants.

## Institutions / 機構

Politecnico di Torino, Kore University of Enna, Amazon, Universita degli Studi di Palermo

## Related

- (link related pages by id as the wiki grows)
