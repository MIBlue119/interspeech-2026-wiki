---
id: park26b_interspeech
category: paralinguistics-emotion
labels: [low-resource, self-supervised]
institutions: ["Seoul National University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-371
pdf: https://www.isca-archive.org/interspeech_2026/park26b_interspeech.pdf
---

# Accurate Source-Free Speech Classification via Meta-Learned Target-Centric Model Merging

*Ka Hyun Park, Junghun Kim, U Kang*

[PDF](https://www.isca-archive.org/interspeech_2026/park26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-371)

**Category:** `paralinguistics-emotion` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — MOCHEE is a source-free model merging framework for speech classification that combines multiple pretrained source models using limited target supervision via soft-permutation alignment and meta-reweighted target-centric scoring, outperforming baselines by up to 14.5 points in Macro-F1.

## Key contributions

- Formulates and addresses the practical source-free speech classification problem where source data are inaccessible and only limited labeled target instances are available.
- Proposes a soft-permutation alignment mechanism using Sinkhorn normalization to resolve hidden-unit permutation symmetry across independently trained source classification heads.
- Introduces a meta-reweighting optimization objective that learns generalization-oriented source-importance scores by evaluating virtual inner updates on a target validation split.
- Demonstrates consistent outperformance over standard model-merging and fine-tuning baselines across cross-corpus and cross-lingual speech emotion recognition benchmarks.

## Problem

Speech classifiers suffer severe performance degradation under cross-domain shifts such as new languages or recording conditions. In many real-world scenarios, raw source-domain data cannot be shared or accessed due to privacy constraints (e.g., hospitals or call centers), leaving only pretrained source models and a handful of target-domain labels. Typical transfer learning, data selection, and meta-learning techniques break down in this constraint because they demand source data access. Existing model merging methods like model soups or linear averaging either suffer from neuron-level representation misalignment or overfit heavily when naively optimized on scarce target supervision.

## Method

MOCHEE merges multiple pretrained source-domain speech classifiers into a single target-centric classifier without updating source-model weights. The architecture fixes a shared, frozen speech embedding encoder (wav2vec2-XLS-R-300m) and focuses entirely on aligning and merging the subsequent two-layer MLP classification heads. Because independently trained MLP heads suffer from permutation symmetry where identical functions are represented by different neuron indexings, MOCHEE introduces learnable soft permutation matrices for each source layer, normalized via Sinkhorn iterations to provide a differentiable relaxation of hard permutation matching. Once the source heads are aligned into a common hidden-unit space, MOCHEE learns a set of per-source merging weights via a two-stage meta-learning procedure. The target training set is split into a training subset and a validation subset. An inner adaptation step virtually updates only the alignment permutation parameters using the target training subset, while an outer update computes meta-gradients for the merging weights based on validation performance. The resulting softmax-normalized merging weights combine the aligned source parameters into the final target classifier, avoiding direct overfitting to the scarce target training instances.

During inference, the learned soft permutations and merging weights are frozen and applied directly to construct the single target-centric classifier in one forward-merge pass, keeping test-time compute comparable to standard model execution without requiring target fine-tuning.

## Experimental setup

Evaluated on six speech emotion recognition datasets from the CAMEO collection mapped to six common emotion classes (anger, disgust, fear, happiness, neutral, sadness). Source domains: CREMA-D (English, 7,442 instances), SubESCO (Bengali, 6,000 instances), RAVDESS (English, 1,056 instances), and MESD (Spanish, 862 instances). Target domains: CAFE (Canadian French, 792 instances) and Oréau (French, 430 instances). Compared against Uniform averaging, Re-basin, Greedy Soup, TIES, and Re-basin + TIES. Metrics include Accuracy and Macro-F1 averaged over five random seeds.

## Results

MOCHEE achieves a headline accuracy of 50.85% and Macro-F1 of 49.40% on the CAFE target domain, outperforming the strongest baseline (Re-basin + TIES at 48.56% accuracy) and surpassing even fully fine-tuned single-source or merged baselines. On the Oréau target domain, MOCHEE reaches 35.30% accuracy and 34.85% Macro-F1, substantially outperforming Greedy Soup (25.04% accuracy). Ablation studies show that removing permutation alignment (MOCHEE-w/o-perm) causes a catastrophic drop down to 38.80% accuracy on CAFE, while removing the meta-reweighted merging scores (MOCHEE-w/o-α) drops accuracy to 47.30%. Weight trajectory analysis confirms that when RAVDESS (English) is used as the target, the weight assigned to the English source (CREMA-D) steadily rises to 0.56 while linguistically distant Spanish and Bengali sources decrease.

| System | CAFE Accuracy | CAFE Macro-F1 | Oréau Accuracy | Oréau Macro-F1 |
|---|---|---|---|---|
| Uniform | 36.78 | 26.43 | 22.55 | 14.84 |
| Re-basin + Uni. | 43.44 | 39.68 | 22.61 | 16.65 |
| Greedy Soup | 41.45 | 42.01 | 25.04 | 20.38 |
| TIES | 38.35 | 30.02 | 23.07 | 17.55 |
| Re-basin + TIES | 42.66 | 36.53 | 23.48 | 17.57 |
| **MOCHEE (Ours)** | **50.85** | **49.40** | **35.30** | **34.85** |

## Limitations

The framework assumes all source models share an identical underlying feature extractor architecture (e.g., wav2vec2-XLS-R-300m) to provide a shared embedding space, limiting application across completely heterogeneous backbone architectures. Evaluation is restricted to speech emotion recognition across six datasets and limited languages (English, Spanish, Bengali, French), leaving open how well meta-learned soft permutations scale to broader tasks like ASR or multi-speaker voice conversion. Additionally, the approach still requires a small held-out target validation set to drive the meta-learning outer loop, which may be difficult to acquire in extreme zero-shot or one-shot scenarios.

## Why read this

Researchers and practitioners working on source-free domain adaptation, cross-lingual transfer, or model merging for speech classification should read this to understand how meta-learning can stabilize parameter-space merging under severe target label scarcity. It provides a concrete recipe combining Sinkhorn soft-permutation alignment and meta-reweighted scoring that avoids the overfitting typical of naive target-loss minimization.

## Code

- https://github.com/snudatalab/Mochee

## Applications

Deploying privacy-preserving speech emotion recognition systems, voice command classifiers, and speaker identification models in unseen target languages or acoustic environments using only pretrained vendor models and minimal target data.

## Institutions / 機構

Seoul National University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Korea government (MSIT), AI Star Fellowship Support Program, Global AI Frontier Lab, Artificial Intelligence Graduate School Program

## Related

- (link related pages by id as the wiki grows)
