---
id: meng26f_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2153
pdf: https://www.isca-archive.org/interspeech_2026/meng26f_interspeech.pdf
---

# Similarity as Evidence: An Explainable Siamese Framework for Snore Sound Classification

[PDF](https://www.isca-archive.org/interspeech_2026/meng26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2153)

**TL;DR** — An explainable Siamese framework uses metric learning and class-centroid inference for four-class snore classification, improving macro-recall from 0.401 to 0.638 on the Munich-Passau Snore Sound Corpus.

## Problem

Automatic snore sound classification into clinical categories is hindered by severe class imbalance, non-stationary noise, and device variability. Furthermore, standard deep learning classifiers act as black boxes, lacking the transparency and clinical explainability required for trustworthy biomedical decision support.

## Method

The framework employs a lightweight 2D CNN encoder operating on log-Mel spectrograms with per-frequency cepstral mean and variance normalisation (CMVN) to map inputs into an l2-normalised D-dimensional hypersphere embedding space. It uses a joint objective combining semi-hard triplet loss with effective-number weighted class-balanced cross-entropy, trained via class-balanced P×M batch sampling. At inference, classification is performed non-parametrically using a Class Centroid rule that assigns queries to the nearest class prototype under Euclidean distance. Interpretability is provided by a support-based mechanism that links query embeddings to concrete, geometrically central reference examples and visually aligned time-frequency activation patterns.

## Results

Evaluated on the Munich-Passau Snore Sound Corpus (MPSSC) under a four-class VOTE taxonomy using macro-averaged recall, the proposed model improves clean-condition macro-recall to 0.638 compared to 0.401 for a wav2vec2 baseline, while maintaining robustness under additive noise. Quantitative deletion and perturbation tests confirm the faithfulness and stability of the support-based explanations. Ablations demonstrate the effectiveness of combining metric learning with class-balanced cross-entropy objectives.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and automated sleep assessment systems for screening sleep-related breathing disorders and localizing upper-airway obstruction patterns.

## Related

- (link related pages by id as the wiki grows)
