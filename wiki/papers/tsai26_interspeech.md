---
id: tsai26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-39
pdf: https://www.isca-archive.org/interspeech_2026/tsai26_interspeech.pdf
---

# The False Resonance: A Critical Examination of Emotion Embedding Similarity for Speech Generation Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/tsai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tsai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-39)

**TL;DR** — This paper evaluates the widespread practice of using state-of-the-art speech emotion recognition embeddings (like emotion2vec) to measure emotional similarity in text-to-speech and voice conversion, revealing that these metrics are easily confounded by speaker and linguistic distractors and poorly align with human perception.

## Problem

Objective evaluation of emotional expressiveness in generated speech heavily relies on computing cosine similarity between latent embeddings from encoders like emotion2vec. However, this practice assumes spatial proximity in the latent space directly reflects affective transfer without accounting for linguistic or speaker interference. Relying on such unverified metrics risks driving model development toward acoustic mimicry of non-emotional attributes rather than genuine emotional synthesis.

## Method

The study proposes a rigorous framework to evaluate emotion similarity (EMO-SIM) metrics across categorical robustness, dimensional sensitivity, and human perception alignment. Because preliminary analysis shows emotion2vec representations occupy a narrow, anisotropic cone, the authors introduce a mean-centering calibration step to eliminate dominating mean vectors before similarity calculation. They systematically test base and fine-tuned emotion2vec variants (seed, base, large) alongside SSL baselines (HuBERT, Wav2vec 2.0, TERA) using triplet tasks across six diverse speech datasets spanning English, Chinese, and Russian.

## Results

In categorical evaluation under controlled adversarial settings (e.g., fixed linguistic content or speaker identity), emotion2vec and baseline encoders frequently perform at or near random chance (around 50% triplet accuracy), with linguistic distractors dropping accuracy as low as 3.38%. For continuous dimensions, Spearman's rank correlations for valence and arousal hover near zero (e.g., between -0.01 and -0.20), showing the metric fails to capture emotional magnitude. Furthermore, human perception alignment tests demonstrate that while some fine-tuned encoders achieve statistically significant preferences over random baselines, performance remains severely limited and deep-layer representations actively degrade perceptual correlation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing text-to-speech, voice conversion, or evaluation toolkits who need to choose reliable automated metrics for model selection and optimization.

## Related

- (link related pages by id as the wiki grows)
