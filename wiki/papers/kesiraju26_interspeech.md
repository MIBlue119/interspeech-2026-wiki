---
id: kesiraju26_interspeech
category: applications-other
labels: [multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3315
pdf: https://www.isca-archive.org/interspeech_2026/kesiraju26_interspeech.pdf
---

# FLiP: Towards understanding and interpreting multimodal multilingual sentence embeddings

*Santosh Kesiraju, Bolaji Yusuf, Šimon Sedláček, Oldřich Plchot, Petr Schwarz*

[PDF](https://www.isca-archive.org/interspeech_2026/kesiraju26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kesiraju26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3315)

**Category:** `applications-other` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — The paper introduces Factorized Linear Projection (FLiP), a diagnostic model that recovers lexical content from sentence embeddings, showing that sentence encoders linearly preserve 75-80% of lexical information. Using FLiP to analyze SONAR, LaBSE, and Gemini reveals robust cross-modal alignment alongside a strong English bias in cross-lingual representations.

## Key contributions

- Proposes FLiP, a factorized log-linear model (W = AB) with L1 sparsity regularization on A, for parameter-efficient embedding interpretation without heuristic vocabulary filtering.
- Demonstrates that factorized linear projections recall 75-80% of lexical content from sentence embeddings, outperforming non-factorized full-rank linear probing baselines.
- Performs a systematic diagnostic study uncovering language and modality biases across SONAR, LaBSE, and Gemini embedding spaces.
- Achieves roughly double the span-aware accuracy (61.45% vs 29.58%) compared to the SpLiCE concept-decomposition baseline under identical vocabulary conditions.

## Problem

Analyzing single-vector sentence embeddings across modalities (speech, text) and languages typically relies on massive downstream benchmarks like MTEB, which yield only a single aggregate score and fail to reveal internal representation failures. Prior linear interpretation frameworks struggle with high-dimensional vocabulary spaces or require heuristic-heavy vocabulary filtering such as PMI and frequency thresholds (e.g., SpLiCE). Understanding how well semantic spaces actually encode lexical and linguistic properties without heavy downstream task fine-tuning remains an open challenge for speech and NLP practitioners.

## Method

The core framework maps a sentence embedding vector u (from text or speech encoders like SONAR, LaBSE, or Gemini) to vocabulary log-probabilities via a factorized projection matrix W = AB and a bias vector b. The matrix A in R^(|V| x r) acts as a word embedding matrix, while B in R^(r x d) projects the sentence embedding to a latent space of rank r <= d. By factorizing W, the model gains implicit regularization and memory efficiency over the massive vocabulary dimension (|V| = 100,000 unigrams), and L1 regularization (implemented via proximal gradient descent with soft-thresholding) induces sparsity on A. For cross-modal and cross-lingual training, the objective function jointly minimizes regularized log-likelihood over aligned pairs (t_n, s_n) using a mixing weight alpha (defaulting to 0.5 for balanced multi-source training or 0.0/1.0 for single modality/language isolation).

At inference time, keyword extraction requires no search or iterative optimization: the model computes logits z = b + A(Bu) in a single forward pass and selects the top-k indices. The bias vector b captures the unigram log-prior distribution over the vocabulary; removing it during inference prevents frequent stop words from crowding out rare named entities in the top-k selections. The rank r is set to 512 (down from the full sentence embedding dimension d = 1024 for SONAR), balancing parameter count and extraction performance.

## Experimental setup

Evaluated on English, German, and French speech-text pairs from Mozilla Common Voice (v15.0, containing ~1.7M English and ~0.5M German/French pairs) and parallel text corpora from Europarl (EN-DE, EN-FR) and Samanantar (EN-BN, EN-HI, EN-TA, EN-TE with ~1.8M bitexts each). Compared against full-rank linear probing (LiP) and SpLiCE using unigram/bigram concept vocabularies restricted to 10k or 100k words. Evaluated via unigram accuracy, span-aware accuracy, Jaccard index for inter-model consistency, and named-entity recall at top-k. Models are trained using AdamW (initial learning rate 5e-3, halved on plateau) for up to 100 epochs with a batch size of 6000 on high-performance computing clusters.

## Results

FLiP achieves a headline keyword extraction accuracy of 77.29% on English text SONAR embeddings and 74.09% on English speech embeddings, significantly outperforming non-factorized full-rank LiP baselines (~59.45%). In direct comparison on Mozilla Common Voice English, FLiP nearly doubles the span-aware accuracy of SpLiCE (61.45% vs 29.58% for text, and 58.83% vs 28.21% for speech). Cross-modal evaluations show robust alignment within languages (Jaccard indices ~84-89% between text and speech), whereas cross-lingual evaluations reveal that English heavily dominates as the preferred anchor language; non-English source languages suffer sharp accuracy drops when transferring to or from distant language pairs like English-Telugu (TE) or English-Tamil (TA).

| System / Condition | Text Accuracy (%) | Speech Accuracy (%) | Span-Aware Acc. (Text) |
|---|---|---|---|
| Full-rank LiP (Vanilla) | 59.45 | 57.27 | - |
| FLiP (Full Rank, r=1024) | 77.29 | 74.09 | - |
| FLiP (Low Rank, r=512) | 76.77 | 73.62 | - |
| SpLiCE Baseline | - | - | 29.58 |
| FLiP (Proposed) | - | - | 61.45 |

## Limitations

The evaluation is restricted to lowercased text without punctuation and fixed unigram/bigram vocabularies capped at 100k words. Cross-lingual performance drops significantly for morphologically rich or low-resource language pairs (such as Bengali, Tamil, and Telugu), indicating that semantic linearity degrades outside high-resource Indo-European languages. The approach assumes that text and speech encoders map into a shared space, limiting its diagnostic efficacy on unaligned or purely unimodal legacy models.

## Why read this

Speech and NLP engineers seeking a lightweight, mathematically grounded diagnostic tool to audit what information is preserved inside pretrained multilingual and multimodal sentence embeddings will find this essential reading. It provides a concrete alternative to massive downstream benchmarks (like MTEB) for isolating modality and language bottlenecks.

## Code

- https://github.com/BUTSpeechFIT/FLiP

## Applications

Diagnosing representation failures in multilingual and multimodal sentence encoders, intrinsic evaluation of speech-text joint embedding spaces, and zero-search keyword/concept extraction.

## Institutions / 機構

Brno University of Technology

**Funding / 經費:** Ministry of Education, Youth and Sports of the Czech Republic, European Union

## Related

- (link related pages by id as the wiki grows)
