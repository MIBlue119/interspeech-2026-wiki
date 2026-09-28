---
id: park26b_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-371
pdf: https://www.isca-archive.org/interspeech_2026/park26b_interspeech.pdf
---

# Accurate Source-Free Speech Classification via Meta-Learned Target-Centric Model Merging

[PDF](https://www.isca-archive.org/interspeech_2026/park26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-371)

**TL;DR** — MOCHEE combines multiple pretrained source speech classifiers into a single target-centric model using scarce target data, outperforming baseline model merging techniques by up to 14.5 points in Macro-F1.

## Problem

Speech classification models experience severe performance degradation under cross-domain shifts, such as moving to a new language. In many scenarios, original source-domain training data cannot be accessed due to privacy constraints, leaving only pretrained source models and a small set of labeled target data. Existing model merging methods easily overfit to this limited target supervision because they lack mechanisms to handle parameter misalignment and generalization-oriented weighting.

## Method

The framework takes frozen pretrained speech embeddings (such as wav2vec2.0 or Whisper) with lightweight MLP heads from multiple source domains and merges them without updating source parameters. First, it addresses hidden-unit permutation symmetry across independently trained source heads by learning layer-wise soft re-indexing matrices via Sinkhorn normalization. Second, it optimizes source merging weights using a meta-learning procedure that performs a virtual inner adaptation on a target training split and computes an outer meta-gradient update based on validation performance on a held-out target split. This meta-reweighting formulation ensures that the resulting source contributions promote robust target generalization instead of fitting noisy target training instances.

## Results

Evaluated on six multilingual speech-emotion corpora from the CAMEO collection—utilizing CREMA-D, SubESCO, RAVDESS, and MESD as source domains and CAFÉ and Oréau as target domains mapped to six emotion classes—MOCHEE consistently surpasses strong baselines. It achieves improvements of up to 14.5 points in Macro-F1 over standard averaging and heuristic model selection methods under low-shot target adaptation constraints.

## Code

- https://github.com/snudatalab/Mochee

## Applications

Speech and ML engineers building call center analytics, voice command processors, or speech emotion recognition systems for new, unseen domains or languages when raw source training data is strictly confidential.

## Limitations

Requires a small amount of labeled target-domain data split into training and validation sets for meta-reweighting.

## Related

- (link related pages by id as the wiki grows)
