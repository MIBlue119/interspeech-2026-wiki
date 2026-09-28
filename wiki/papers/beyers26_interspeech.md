---
id: beyers26_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-408
pdf: https://www.isca-archive.org/interspeech_2026/beyers26_interspeech.pdf
---

# Scaling few-shot spoken word classification with generative meta-continual learning

*Louise Beyers, Batsirayi Mupamhi Ziki, Ruan van der Merwe*

[PDF](https://www.isca-archive.org/interspeech_2026/beyers26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/beyers26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-408)

**TL;DR** — This paper investigates scaling few-shot spoken word classification up to 1,000 classes using Generative Meta-Continual Learning (GeMCL), demonstrating accuracy within 3% of fully-tuned HuBERT while adapting 2,000 times faster with two orders of magnitude less training data and time.

## Key contributions

- First application of Generative Meta-Continual Learning (GeMCL) to speech data, evaluated on large-scale few-shot spoken word classification up to 1,000 classes.
- Rigorous evaluation framework testing models at intermediate points of the continual learning process to track per-class stability and catastrophic forgetting.
- Demonstration that GeMCL achieves competitive accuracy with frozen-backbone HuBERT classifier heads while requiring no retraining or gradient-based updates when new classes arrive.
- Comprehensive computational and time-to-adaptation benchmarking showing GeMCL trains on ~477 hours of data and adapts in 0.06 hours compared to over 120 hours for baselines.

## Problem

Few-shot spoken word classification is traditionally studied for small class inventories on edge devices, limiting its usefulness for expanding vocabulary or acting as a data labeling flywheel for moderately resourced languages. Standard self-supervised foundation models like HuBERT and Wav2Vec2 are data-hungry, computationally expensive to fine-tune continually from scratch, and prone to catastrophic forgetting. Consequently, there is a need for meta-continual learning architectures that can generalise to thousands of unseen words using only a handful of shots without retraining the entire encoder.

## Method

GeMCL pairs a 12-layer, 12-head transformer encoder (85.1M parameters) taking 13-dimensional MFCCs (16 kHz, 25 ms frame length, 10 ms shift, 40 mel filterbanks) with a generative Bayesian classifier. Each class distribution in the embedding space is modeled as a Gaussian, and the set of classes forms a mixture model where the mean and precision parameters follow a Normal-Gamma distribution. Because the Normal-Gamma distribution is conjugate to the Gaussian likelihood, incoming samples from new classes update the class-specific hyperparameters analytically in closed form via Bayes' rule, completely isolating parameters and ensuring immunity to catastrophic forgetting.

During meta-training, the encoder and prior hyperparameters (alpha_0, beta_0) are optimized using episodic N-way-K-shot tasks (25-way 5-shot episodes) with a cross-entropy query set loss. The model is trained for 5,000 steps on batches of 16 episodes, ingesting roughly 10 million total samples (~2,778 hours, translating to ~477 hours of unique audio). In contrast, the baselines utilize the pre-trained HuBERT base checkpoint (94.6M to 94.8M parameters) taking raw waveforms, trained via AdamW with a batch size of 32 for 200 epochs (under 300 classes) or 500 epochs (over 300 classes) using full fine-tuning or a frozen backbone with a trained projector and classifier head.

At inference time, GeMCL evaluates new support sets (5 shots per class) entirely through closed-form statistical updates without gradient descent, whereas baseline models require full fine-tuning runs from scratch every time the class inventory is incremented by 25 classes up to 1,000 classes.

## Experimental setup

Experiments use the English portion of the Multilingual Spoken Words Corpus (MSWC), filtering for words with at least 5 train and test samples, resulting in 12,736 words split 70/30 into 8,915 meta-train and 3,821 meta-test words. Models are compared against fully fine-tuned HuBERT (full FT) and a frozen HuBERT backbone with a trained classifier head and projector (CH), evaluated iteratively every 25 classes from 25 up to 1,000 classes across 10 random episodes of 5-shot support and query sets.

## Results

GeMCL achieves stable performance across all increments, closely tracking the accuracy of the frozen HuBERT classifier head (CH) up to 450 classes and staying within 3% of the 1,000-class CH baseline. While fully fine-tuned HuBERT occasionally achieves higher absolute accuracy at certain steps, it exhibits severe per-word volatility, with an average absolute accuracy change of 24.55% between consecutive continual learning steps compared to just 0.48% for GeMCL. GeMCL trails CH at class counts above 750 classes according to a Mann-Whitney U test (alpha = 0.05).

| System | 25 Classes | 500 Classes | 1,000 Classes | Total Training Time (hrs) | Adaptation Time (hrs) |
|---|---|---|---|---|---|
| GeMCL (Ours) | ~0.85 | ~0.65 | ~0.50 | 27.55 | 0.06 |
| Frozen HuBERT + CH | ~0.87 | ~0.68 | ~0.53 | ~1,976 | 124.25 |
| Fully Fine-tuned HuBERT | ~0.89 | ~0.72 | ~0.58 | ~1,976 | 185.96 |

## Limitations

The evaluation is restricted solely to English data from a single dataset (MSWC), leaving multilingual and cross-lingual scalability unverified. GeMCL's representational capacity is bounded by its transformer encoder trained from scratch on ~477 hours of data, which underperforms fully fine-tuned massive foundation models when scaling to extremely large class manifolds beyond 750 classes.

## Why read this

Researchers and engineers building on-device or streaming speech recognition systems with dynamic, user-defined vocabularies will learn how meta-continual learning eliminates catastrophic forgetting and avoids costly retraining cycles.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Dynamic user-defined keyword spotting on edge devices and automated data labeling flywheels for low-resource languages.

## Related

- (link related pages by id as the wiki grows)
