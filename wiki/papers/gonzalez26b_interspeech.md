---
id: gonzalez26b_interspeech
category: phonetics-linguistics
labels: [self-supervised]
institutions: ["Defence Science and Technology Group"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-905
pdf: https://www.isca-archive.org/interspeech_2026/gonzalez26b_interspeech.pdf
---

# Probing Linguistic Information in Speech Embeddings: A Diagnostic Analysis across Acoustic and Structural Domains

*Simon Gonzalez, Tao Hoang, Hayden Ooi, Chloe Dean, Bradley Donnelly, Myung Kim, Latchman Singh, Jason Littlefield, Tim Cawley, Jennifer Biggs*

[PDF](https://www.isca-archive.org/interspeech_2026/gonzalez26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gonzalez26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-905)

**Category:** `phonetics-linguistics` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates how pretrained speech embeddings encode linguistic, phonetic, and acoustic features via sparse linear regression, discovering that signal-level properties are strongly represented while higher-level syntactic and morphological structures are largely inaccessible linearly. Shimmer ($R^2=0.59$), spectral flatness ($R^2=0.56$), and duration ($R^2=0.51$) exhibit the strongest associations with W2V-BERT 2.0 embeddings.

## Key contributions

- Evaluates the linear accessibility of 15 diverse acoustic, phonetic, and structural linguistic features across a multilingual set of 36 languages from the FLEURS corpus.
- Proves that W2V-BERT 2.0 utterance-level embeddings strongly encode amplitude variability (shimmer, $R^2=0.59$), spectral noise (flatness, $R^2=0.56$), and temporal dynamics (duration, $R^2=0.51$).
- Reveals a sharp disparity between lower-level signal properties and higher-level grammar: lexical diversity shows measurable correlation ($CTTR, R^2=0.43$), whereas morphological and syntactic complexities show near-zero linear association ($R^2 < 0.05$).
- Provides a diagnostic framework utilizing Lasso regression with 5-fold cross-validation to isolate sparse embedding dimensions responsible for encoding specific linguistic attributes.

## Problem

While modern speech-language models and automatic speech recognition systems rely heavily on dense vector representations, the internal linguistic interpretability of these embeddings remains underexplored. Traditional speech research and clinical applications depend on interpretable, discrete units (phonemes, morphemes, syntactic categories), whereas modern self-supervised models learn continuous, distributed spaces without explicit symbolic supervision. Understanding how and which linguistic features are mapped into high-dimensional embedding spaces is critical for bridging symbolic linguistics with black-box deep learning architectures, particularly for low-resource languages.

## Method

The study extracts frame-level embeddings of dimension 1024 from W2V-BERT 2.0 (a ~600M parameter Conformer pretrained on 4.5M hours of audio across 143+ languages). Because Transformer self-attention creates quadratic complexity burdens on long audio, utterances longer than 10 seconds are segmented into fixed 10-second chunks, and utterance-level representations are obtained by applying median pooling over the temporal dimension.

To map embeddings to language features, the authors formulate a sparse regression task using Lasso regression with an $L_1$ penalty weighted by regularization strength $\lambda$. This maps the embedding matrix $E \in \mathbb{R}^{N \times D_E}$ to the linguistic feature matrix $L \in \mathbb{R}^{N \times D_L}$ by optimizing $\min_{W, b} \frac{1}{2N} \|E W + \mathbf{1}b - L\|_2^2 + \lambda \sum_{j} \|W_{j,\cdot}\|_1$. Model selection is executed via 5-fold cross-validation on a training split, identifying minimal subsets of active embedding dimensions that predict specific phonetic or structural targets without multicollinearity distortions.

Features are categorized into three groups extracted via Librosa and Parselmouth: acoustic features (jitter, shimmer, spectral flatness, zero-crossing rate, centroid, bandwidth, rolloff), phonetic features (duration, speech rate, RMSE, pitch range), and structural features (UPOS entropy, lemma complexity, clause complexity, corrected type-token ratio).

## Experimental setup

Experiments use a 36-language subset of the FLEURS corpus containing 43,185 read speech recordings totaling over 136 hours (mean 3.78 hours per language). The data is partitioned into a training set of 35,647 recordings (83%) and a test set of 7,538 recordings (17%). Evaluation metrics report $R^2$ scores on the held-out test split alongside counts of non-zero Lasso coefficients.

## Results

Acoustic and phonetic properties dominate the embedding space: Shimmer achieves the highest test $R^2$ of 0.585 (using 821 active coefficients), closely followed by Spectral Flatness ($R^2 = 0.558$, 936 coefficients), Duration ($R^2 = 0.510$, 815 coefficients), and Zero-Crossing Rate ($R^2 = 0.508$, 670 coefficients). Higher-level lexical complexity measured via CTTR maintains a moderate association ($R^2 = 0.427$, 640 coefficients), indicating that vocabulary distribution leaves traces in the acoustic embedding space.

Conversely, syntactic and morphological structures fail to yield meaningful linear associations. UPOS Entropy ($R^2 = 0.039$), Clause Complexity ($R^2 = 0.022$), and Lemma Complexity ($R^2 = -0.005$) demonstrate near-zero predictability. The authors note this implies that hierarchical grammar is either processed via transformer self-attention layers or obscured by temporal median pooling rather than being linearly decodable from utterance-level vectors.

| System/Condition | Shimmer ($R^2$) | Flatness ($R^2$) | Duration ($R^2$) | CTTR ($R^2$) | UPOS Entropy ($R^2$) | Lemma Complexity ($R^2$) |
|---|---|---|---|---|---|---|
| Test Split (W2V-BERT 2.0) | 0.59 | 0.56 | 0.51 | 0.43 | 0.04 | -0.01 |

## Limitations

The conclusions are constrained by the specific architecture tested (W2V-BERT 2.0) and may not generalize uniformly to autoregressive decoders or token-quantized discrete speech models like HuBERT or WavLM. The reliance on utterance-level median pooling discards fine-grained temporal trajectories, potentially neutralizing syntactic dependencies that unfold across longer sentence spans. Furthermore, evaluations are bound to read-speech corpora (FLEURS), which lack the spontaneous conversational disfluencies and complex pragmatic variations found in natural dialogue.

## Why read this

Speech and ML engineers building downstream spoken language models or leveraging self-supervised representations for linguistics should read this to understand the exact boundaries of what continuous embeddings capture linearly. It provides rigorous proof that while acoustic and prosodic traits are deeply baked into embedding geometry, syntactic and morphological properties require specialized downstream decoders or non-linear probing to be extracted effectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual acoustic analysis, clinical voice assessment, automatic speech recognition representation tuning, and low-resource speech processing.

## Institutions / 機構

Defence Science and Technology Group

## Related

- [Beyond task performance: Decoding bioacoustic embeddings with speech features](nolasco26_interspeech.md) — shared technique · relatedness 2.4/3
- [Do speech foundation models really learn words?](huo26_interspeech.md) — shared technique · relatedness 2.3/3
- [Probing the Layer-wise Geometry of Chinese Dialect Representations in Wav2Vec 2.0](peng26c_interspeech.md) — shared technique · relatedness 2.1/3
- [Speech Codec Probing from Semantic and Phonetic Perspectives](shi26g_interspeech.md) — shared technique · relatedness 2.1/3
- [Do Learned Layer Weights Reflect Pretrained Information Structure in Self-Supervised Speech Models?](getman26b_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
