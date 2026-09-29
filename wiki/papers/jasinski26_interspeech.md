---
id: jasinski26_interspeech
category: asr
labels: [self-supervised]
institutions: ["AGH University of Krakow"]
code: https://github.com/DSP-AGH/asr_hallucination_detection_prompts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-338
pdf: https://www.isca-archive.org/interspeech_2026/jasinski26_interspeech.pdf
---

# From Text Metrics to Model Internals: A Study of Whisper ASR Hallucination Detection

*Jan Jasiński, Mateusz Barański, Julitta Bartolewska, Marcin Witkowski, Konrad Kowalczyk*

[PDF](https://www.isca-archive.org/interspeech_2026/jasinski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jasinski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-338)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper evaluates automatic speech recognition (ASR) hallucination detection across text-based, LLM-based, and decoder internal-state probing paradigms using Whisper large v3. It demonstrates that probing intermediate decoder states yields strong reference-free detection (F1 62.1%), which can be further boosted to an F1 of 68.3% via a late-fusion meta-classifier combining text and internal signals.

## Key contributions

- Comprehensive evaluation of oracle vs. reference-free text features, showing tree-based ensembles (XGBoost) heavily outperform linear baselines but collapse without a ground-truth reference.
- Demonstration that out-of-the-box LLMs struggle with detection, and while prompt engineering with domain-specific pathology data improves precision, they remain outperformed by lightweight text models.
- Discovery that probing intermediate layers of the Whisper decoder (specifically layers 14-24 using sequence mean-pooling or BLSTM) provides strong reference-free hallucination detection without requiring ground-truth text.
- A lightweight late-fusion Logistic Regression meta-classifier combining text and internal-state probabilities that achieves a state-of-the-art F1 score of 68.3% and ROC AUC of 90.0%.

## Problem

Large-scale ASR models trained on weakly supervised data frequently generate fluent transcriptions that lack any phonetic connection to the audio input, posing severe safety and cascading error risks for downstream NLP applications. Existing detection approaches rely either on oracle text metrics (WER, CER, BERTScore) requiring ground-truth transcripts, or zero-shot heuristics and generic LLMs that fail to robustly separate hallucinations from standard acoustic mishearings. The lack of reliable reference-free detection limits the deployment of safeguards in streaming or real-world speech processing applications.

## Method

The study investigates three detection paths: text metrics, LLMs, and decoder internal probes. Text features are split into oracle (BERT, CER, IER, WER, SeMaScore, Length Ratio, Common Hallucinated Phrase) and reference-free (Characters Per Second, Perplexity, wav2vec Alignment confidence, 5-gram repetition rate), fed into Logistic Regression, Random Forest, and XGBoost classifiers optimized via Recursive Feature Elimination. LLM detection tests GPT-4o-mini, Gemini 2.0 Flash, and Gemini 3.0 Flash with iterative prompt enhancements including Whisper-specific error taxonomies and few-shot examples.

For internal state probing, hidden representations from Whisper's decoder (858 hallucinated vs 2753 non-hallucinated utterances from the HALAS dataset based on Whisper large v3) are extracted at three block levels: Self-Attention (SA), Cross-Attention (CA), and Multi-Layer Perceptron output (D). A Bidirectional LSTM (BLSTM) processes the entire token-by-token decoding sequence embeddings across layers (optimized via 5-fold CV). Finally, a late-fusion Logistic Regression meta-classifier combines XGBoost text probabilities, BLSTM internal probabilities, and audio duration to produce the final decision.

## Experimental setup

Evaluated on the HALAS dataset using predictions from Whisper large v3 on Earnings-22 audio data (total 3,611 predictions, with 858 marked as hallucinations). Evaluated using ROC AUC, Accuracy, Precision, Recall, and F1 score via 5-fold stratified cross-validation.

## Results

The XGBoost text classifier using all features achieves an F1 of 62.8% and Recall of 74.1%, but its reference-free variant collapses to an F1 of 37.7%. Prompt-engineered LLMs peak at an F1 of 58.7% with high computational overhead. In contrast, the BLSTM classifier operating on Whisper decoder internal states achieves an F1 of 65.5% and an AUC of 87.6% entirely reference-free (notably optimal around layers 21-24 for MLP output). Combining text and internal states via the late-fusion Logistic Regression meta-classifier yields the headline F1 of 68.3% and ROC AUC of 90.0%.

| System / Condition | Acc [%] | Prec [%] | Rec [%] | F1 [%] | AUC [%] |
|---|---|---|---|---|---|
| XGBoost (All Text Features) | - | - | 74.1 | 62.8 | 87.8 |
| XGBoost (Reference-Free Text) | - | - | - | 37.7 | - |
| LLM (Gemini 3.0 + Pathology Prompt) | 88.4 | - | - | 58.7 | - |
| BLSTM (Decoder Internal States, D) | 83.7 | 67.9 | 64.8 | 66.1 | 87.0 |
| LR Meta-Classifier (Late Fusion) | 90.7 | 71.0 | 65.7 | 68.3 | 90.0 |

## Limitations

The study focuses exclusively on a single model architecture (Whisper large v3) and a single dataset (HALAS derived from Earnings-22), leaving cross-model generalization untested. The late-fusion meta-classifier and oracle text methods forfeit reference-free usability, while internal probing requires low-level model access that commercial black-box APIs do not expose.

## Why read this

Researchers and engineers building safety filters for deployment of speech foundation models will learn how to bypass the reliance on ground-truth transcripts by probing intermediate decoder representations.

## Code

- https://github.com/DSP-AGH/asr_hallucination_detection_prompts

## Applications

Real-time speech-to-text safety filtering, ASR error mitigation, and hallucination detection for downstream conversational agents.

## Institutions / 機構

AGH University of Krakow

**Funding / 經費:** National Science Centre, Excellence initiative - research university

## Related

- (link related pages by id as the wiki grows)
