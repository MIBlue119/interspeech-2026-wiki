---
id: gonzalez26b_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-905
pdf: https://www.isca-archive.org/interspeech_2026/gonzalez26b_interspeech.pdf
---

# Probing Linguistic Information in Speech Embeddings: A Diagnostic Analysis across Acoustic and Structural Domains

[PDF](https://www.isca-archive.org/interspeech_2026/gonzalez26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gonzalez26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-905)

**TL;DR** — This study probes the linguistic interpretability of pretrained speech embeddings using sparse linear regression, finding strong linear associations with acoustic and phonetic properties but weak relationships with higher-level syntactic and morphological structures.

## Problem

Modern speech and audio-language models rely heavily on dense representation spaces without explicit symbolic constraints, making their internal encoding of linguistic features poorly understood. Bridging this gap is crucial for understanding how hierarchical linguistic properties are captured in self-supervised representations and improving their interpretability in applied speech sciences.

## Method

The authors evaluate W2V-BERT 2.0 (a 600M-parameter Conformer model trained on 4.5M hours of audio across 143 languages) on a multilingual subset of the FLEURS dataset containing 43,185 recordings (136 hours) across 36 languages. Utterance-level embeddings are extracted via median pooling over temporal frames and mapped to three feature categories (core acoustic, acoustic-phonetic, and higher-level linguistic structure) using Lasso regression with 5-fold cross-validation. Regularized linear mappings identify sparse embedding dimensions associated with each feature to test linear accessibility.

## Results

Using test R-squared scores, acoustic and phonetic properties exhibited the strongest linear associations with embeddings, led by Shimmer (R2 = 0.59), Spectral Flatness (R2 = 0.56), Duration (R2 = 0.51), and Zero-Crossing Rate (R2 = 0.51). Among higher-level features, lexical diversity (CTTR) showed a notable association (R2 = 0.43), whereas morphological complexity (UPOS entropy, lemma complexity) and syntactic complexity (clause density) showed negligible linear accessibility (R2 <= 0.04). These results demonstrate that self-supervised embeddings capture signal-proximal and lexical properties in a distributed manner, while syntax and morphology are far less linearly accessible.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers analyzing the internal representations of self-supervised models, as well as computational linguists investigating cross-lingual feature encoding in speech foundation models.

## Limitations

The analysis focuses strictly on linear associations via Lasso regression, which may underestimate non-linear encodings of higher-level linguistic structures within the embedding space.

## Related

- (link related pages by id as the wiki grows)
