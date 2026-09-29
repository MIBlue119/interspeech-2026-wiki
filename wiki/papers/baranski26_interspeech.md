---
id: baranski26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["AGH University of Krakow"]
code: https://github.com/DSP-AGH/HALAS/tree/main
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-337
pdf: https://www.isca-archive.org/interspeech_2026/baranski26_interspeech.pdf
---

# HALAS: A Human-Annotated Dataset of Hallucinations of Modern ASR Systems

*Mateusz Barański, Jan Jasiński, Julitta Bartolewska, Marcin Witkowski, Konrad Kowalczyk*

[PDF](https://www.isca-archive.org/interspeech_2026/baranski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/baranski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-337)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — HALAS is the first human-annotated dataset of naturally occurring ASR hallucinations across seven state-of-the-art models on real earnings call recordings, establishing a rigorous benchmark where current detection methods achieve a maximum F1 score of 56.1%.

## Key contributions

- Introduced the HALAS dataset containing 3,611 human-annotated audio files with span-level labels for hallucinations and loopings across seven major ASR architectures.
- Provided a large-scale empirical analysis demonstrating strong cross-model vocabulary overlap and high semantic severity in natural speech hallucinations.
- Benchmarked standard proxy metrics, multi-model XGBoost classifiers, and LLM-based reference methods, revealing substantial performance bottlenecks (F1 max ~56.1%).
- Proposed a multi-layer decoder-embedding (DE) logistic regression detector trained on HALAS that outperforms single-layer baselines and generalizes to out-of-domain data.

## Problem

State-of-the-art end-to-end ASR models frequently hallucinate erroneous text that lacks phonetic correspondence with the speech input, which can cause severe misinformation, especially in domains like finance and healthcare. Prior hallucination mitigation and detection frameworks are typically evaluated exclusively on non-speech audio or artificially corrupted data rather than real, unprocessed spontaneous speech. This leaves a major gap in understanding how modern ASR architectures fail in the wild and lacks a standardized benchmark based on human annotations.

## Method

The HALAS dataset is built from the Earnings 22 (E22) corpus consisting of 119 hours of English earnings calls across 27 countries, totaling 57,390 segments. To maximize hallucination yield without artificial corruption, the authors selected segments exhibiting high inter-model disagreement (average pairwise Word Error Rate across seven SOTA models: Whisper large v3, v3 Turbo, v2, Crisper Whisper, Nvidia Canary-1B, Canary-1B-Flash, and Parakeet-TDT v2). Ten professional annotators independently marked span-level tokens as hallucination, looping, or looping hallucination, with a third annotator arbitrating disagreements, resulting in a high initial inter-annotator agreement (Cohen's kappa = 0.87). The resulting data is split into train (3,666 files, 33.6% hallucination rate) and test (745 files, 22.6% hallucination rate) sets stratified by source meeting, hallucination rate, and duration.

For downstream hallucination detection, the authors evaluate proxy text features (WER, CER, insertion rate, length ratio, BERTScore, SeMaScore, and GPT-2 Perplexity) using XGBoost classifiers trained under OWN, OTHER, and ALL model regimes. Additionally, they implement and extend decoder-embedding (DE) classifiers by extracting hidden states from specific transformer decoder layers of Whisper large v3 (e.g., layer 21 or concatenated layers 2, 13, and 23) after generating the End-of-Sequence token, passing them into an utterance-level Logistic Regression classifier. Cross-domain generalization is tested on non-speech-augmented datasets.

## Experimental setup

Evaluations are performed on the HALAS dataset (3,611 total filtered audio files, test split of 745 files >1.0s and >=3 words). Baselines include proxy metrics (WER, CER, BERTScore, PPL), LLM-based checkers (GPT-4o mini, Gemini 2.0 Flash), and single-layer decoder embedding detectors (DE 21). Metrics reported include Accuracy, Precision, Recall, F1-score, and ROC-AUC.

## Results

On the HALAS test split, standard SOTA detection methods struggle significantly: GPT-4o mini achieves an F1 of 40.7% (30.1% precision, 62.6% recall) and Gemini 2.0 Flash achieves an F1 of 41.6% (50.0% precision, 35.7% recall). The single-layer decoder embedding baseline (DE 21) reaches 53.1% F1, while the proposed multi-layer variant (DE 2,13,23) achieves the best performance with an F1 score of 56.1%. XGBoost classifiers built on text proxy metrics across all models (ALL) achieve a mean ROC-AUC of 0.835, demonstrating robust cross-model transferability.

In out-of-domain generalization tests on non-speech audio, the DE detectors trained on HALAS achieve an even higher F1 score of 77.3% using layers 2, 13, and 23, proving that HALAS provides a challenging and transferable training substrate.

| Detector | Accuracy (%) | Precision (%) | Recall (%) | F1 (%) |
|---|---|---|---|---|
| GPT-4o mini | 71.7 | 30.1 | 62.6 | 40.7 |
| Gemini 2.0 Flash | 84.5 | 50.0 | 35.7 | 41.6 |
| DE 21 (Single-Layer) | 87.1 | 57.8 | 49.1 | 53.1 |
| ALL (XGBoost Proxy) | 83.7 | 48.7 | 64.3 | 55.4 |
| DE 2,13,23 (Multi-Layer) | 86.4 | 53.9 | 58.5 | 56.1 |

## Limitations

The dataset focuses exclusively on English-language earnings calls, limiting generalization to other languages, acoustic domains, and heavily accented or noisy open-world environments. Because HALAS is constructed by sampling utterances with high inter-model disagreement, the dataset exhibits an intentionally inflated hallucination rate that does not reflect natural deployment prior probabilities.

## Why read this

Speech researchers and ML engineers should read this paper to understand the true failure modes of modern end-to-end ASR systems on real, unprocessed speech and to adopt the HALAS dataset as a rigorous new benchmark for hallucination detection.

## Code

- https://github.com/DSP-AGH/HALAS/tree/main

## Applications

ASR system auditing, reliable real-time speech transcription safety layers, and robust error-detection pipelines for financial or medical dictation.

## Institutions / 機構

AGH University of Krakow

**Funding / 經費:** National Science Centre, Poland, National Centre for Research and Development, Poland, Excellence initiative – research university

## Related

- (link related pages by id as the wiki grows)
