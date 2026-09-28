---
id: kishi26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1172
pdf: https://www.isca-archive.org/interspeech_2026/kishi26_interspeech.pdf
---

# Do speech foundation models perceive speaker similarity as humans do?

[PDF](https://www.isca-archive.org/interspeech_2026/kishi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kishi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1172)

**TL;DR** — This study evaluates over 40 speech foundation models to determine how well their speaker embedding similarities correlate with human subjective perception, discovering that large-scale supervised encoder models align most closely with human similarity judgments.

## Problem

While speech foundation models excel at speaker verification, it remains unclear whether the geometric distances in their embedding spaces genuinely reflect human cognitive perception of speaker similarity. Understanding this alignment is crucial for developing perceptually grounded speech representations and identifying which architectural choices foster human-like speaker perception.

## Method

The authors analyze 43 open-source models—spanning supervised ASR, TTS, TTA, audio classification, and self-supervised learning (SSL) models—using frame-averaged mean hidden states from specific Transformer layers to construct model similarity graphs. They compute cosine similarities between speaker pairs and evaluate correspondence against human perceptual scores from the JVS and VCTK datasets using three metrics: pairwise correlation (Pearson and Spearman), element-wise Frobenius distance, and spectral distance of graph Laplacians. Finally, they perform a multiple regression analysis using variables such as architecture type (encoder vs. decoder), training objective (SSL vs. supervised), multilinguality, training data size in hours, and parameter count.

## Results

Evaluated across 43 models using JVS and VCTK perceptual similarity datasets, the analysis reveals that encoder-based architectures and large-scale supervised models achieve significantly better alignment with human perception (higher max correlation across layers) than decoder-based or pure SSL models. Multiple regression models account for roughly 80% of the variance ($R^2 \approx 0.75-0.98$) in peak layer alignment (`layer max`), showing that decoder usage and SSL objectives negatively impact perceptual alignment. Conversely, model parameter scale and decoder usage flatten the layer-wise score distribution, though model configurations explain far less of the layer-wise trend variance ($R^2 \approx 0.2$).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers designing multi-speaker TTS, voice conversion, or spoken dialogue systems can use these insights to select or fine-tune embedding spaces that better mirror human perceptual similarities.

## Limitations

The study is restricted to the available intra-gender speaker pairs and datasets provided (JVS and VCTK male scores are absent), and audio-related models were excluded from the primary multiple regression analysis.

## Related

- (link related pages by id as the wiki grows)
