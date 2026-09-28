---
id: kashiwagi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1604
pdf: https://www.isca-archive.org/interspeech_2026/kashiwagi26_interspeech.pdf
---

# Speaker-Aware Hypothesis Clustering and Merging for Target-Speaker-free and Target-Speaker Multi-Talker ASR

[PDF](https://www.isca-archive.org/interspeech_2026/kashiwagi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kashiwagi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1604)

**TL;DR** — This paper integrates continuous speaker embeddings into Hypothesis Clustering and Merging (HCM) for multi-talker ASR, achieving up to 46% relative Word Error Rate reduction under identical-content conditions.

## Problem

Standard Hypothesis Clustering and Merging (HCM) relies entirely on transcript-level similarity for clustering, ignoring speaker identity. This causes failures when multiple speakers utter identical or highly similar phrases due to transcript collapse, and prevents the optimal use of enrollment information in target-speaker multi-talker ASR scenarios.

## Method

The authors redefine the HCM agglomerative hierarchical clustering distance to operate in a joint transcript-speaker space by combining normalized edit distance with a speaker embedding distance term weighted by a hyperparameter alpha. Speaker embeddings are extracted using a pretrained TitaNet-large model, and M=1024 k-means centroids are used to define discrete speaker tokens during training. For target-speaker multi-talker ASR, the framework replaces discrete token prompting with direct embedding-based cluster selection by computing the minimum distance between enrollment speaker embeddings and cluster centroid averages. The model utilizes a 30M-parameter Conformer-Transformer encoder-decoder architecture.

## Results

Evaluated on LibriMix and a pseudo identical-content VCTK dataset using Word Error Rate (WER) as the metric, compared against SOT and text-only HCM baselines. On the identical-content VCTK clean 2-speaker setting, the L2 distance variant reduced WER from 68.3% to 36.6% (a 46.4% relative reduction), and from 88.3% to 57.2% in the 3-speaker setting. On standard LibriMix benchmarks, performance remained competitive with text-only HCM. In target-speaker MT-ASR, embedding-based speaker selection reduced WER from 18.7% to 14.4% (23.0% relative improvement) in the clean 2-speaker condition, and from 28.5% to 25.2% in the noisy 2-speaker condition. Ablation on alpha showed that values above 0.01 degraded standard LibriMix performance, identifying alpha = 0.005 as optimal.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building speech recognition systems for crowded acoustic environments, meetings, and multi-speaker conversational settings where speakers may overlap or repeat identical phrases.

## Limitations

In extremely challenging 3-speaker noisy settings, WER exceeded 120% for both baseline and proposed strategies due to severe overlap and noise, and the computational complexity of generating and clustering multiple hypotheses remains high.

## Related

- (link related pages by id as the wiki grows)
