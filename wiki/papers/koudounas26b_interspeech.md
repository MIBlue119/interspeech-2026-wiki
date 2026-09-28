---
id: koudounas26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2347
pdf: https://www.isca-archive.org/interspeech_2026/koudounas26b_interspeech.pdf
---

# Hallucination Benchmark for Speech Foundation Models

[PDF](https://www.isca-archive.org/interspeech_2026/koudounas26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koudounas26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2347)

**TL;DR** — The paper introduces SHALLOW, a benchmark framework for categorizing and quantifying Automatic Speech Recognition (ASR) hallucinations across four distinct dimensions—lexical, phonetic, morphological, and semantic—demonstrating that aggregate metrics like Word Error Rate obscure fine-grained model failure modes.

## Problem

Modern ASR foundation models increasingly prioritize fluency over acoustic fidelity via generative language capabilities, leading to hallucinations—plausible content completely ungrounded in the input speech. Standard metrics like Word Error Rate (WER) treat all errors equally and fail to differentiate between surface-level phonetic variations and critical semantic alterations that reverse meaning, which is particularly hazardous in high-stakes domains like healthcare and legal transcription. Because existing hallucination taxonomies focus on text or vision generation, the speech community lacks standardized, interpretable evaluation methods to systematically isolate and measure ASR deviation from spoken input.

## Method

The SHALLOW framework decomposes ASR errors into four dimensions using tailored, weighted composite metrics: (1) Lexical Fabrications measured via insertion, substitution, and deletion ratios with insertions weighted highest (0.5); (2) Phonetic Fabrications evaluated using metaphone encodings with normalized Hamming, Levenshtein, and Jaro-Winkler distances; (3) Morphological Errors tracking structural and grammatical distortions; and (4) Semantic Errors capturing local word-level and global sentence-level meaning preservation and divergence. To validate the framework, the authors construct a controlled synthetic dataset of 1,050 ASR hypothesis-reference pairs using GPT-4o across five error categories (150 samples each plus 150 mixed), and verify metric orthogonality via t-SNE projections and human annotation studies.

## Results

Evaluations across diverse model architectures reveal that encoder-decoder models like Whisper exhibit balanced error profiles, whereas decoder-based models like Phi-4-Multimodal-Instruct leverage strong language modeling to achieve superior morphological and semantic performance at the cost of phonetically plausible substitutions. Statistical analysis shows that SHALLOW metrics strongly correlate with WER in low-error-rate regimes, but this relationship decouples as transcription quality degrades, exposing nuanced error structures that aggregate metrics miss. t-SNE embeddings of synthetic data confirm that SHALLOW metrics form compact, non-redundant, and distinct clusters for lexical and morphological errors, validating their discriminative power.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing or deploying ASR systems in high-stakes domains (healthcare, legal, education) can use SHALLOW for targeted model selection, architectural debugging, and robust evaluation against hallucinations.

## Limitations

The framework relies on a curated synthetic dataset and reference-based metrics to stress-test error dimensions, which may not capture every open-domain acoustic anomaly.

## Related

- (link related pages by id as the wiki grows)
