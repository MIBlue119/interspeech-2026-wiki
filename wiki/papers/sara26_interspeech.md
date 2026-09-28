---
id: sara26_interspeech
category: asreval
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1153
pdf: https://www.isca-archive.org/interspeech_2026/sara26_interspeech.pdf
---

# Light-weight Pronunciation Assessment via Discrete Speech Token Surprisal

[PDF](https://www.isca-archive.org/interspeech_2026/sara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1153)

**TL;DR** — This paper proposes a lightweight pronunciation assessment framework using native speech token surprisal and transcript-guided alignment, improving Pearson Correlation Coefficient on SpeechOcean762 from 0.60 to 0.66.

## Problem

Traditional automated pronunciation assessment methods rely heavily on costly labeled learner errors, explicit phoneme inventories, and forced aligners, making them impractical for low-resource or zero-resource settings. Building robust systems without requiring expensive, domain-specific non-native speech annotations remains an important challenge in computer-assisted language learning.

## Method

The framework converts continuous speech into discrete symbolic units using a frozen HuBERT base layer 9 encoder and a K-means codebook of size K=512 trained on 960 hours of native LibriSpeech data. A token-level 3-gram language model computes surprisal over these native sequences to capture phonotactic deviations, while a CANINE-S character encoder and Transformer decoder map reference text into the same discrete space (Text2DUnit). Dynamic Time Warping (DTW) with centroid L2 distance aligns the canonical text-derived tokens to the learner acoustic tokens to extract error-sensitive alignment features. Finally, a lightweight Ridge regression model maps these unsupervised token surprisal and transcript-guided features to final pronunciation scores.

## Results

Evaluated primarily on the SpeechOcean762 test set, the method achieves a Pearson Correlation Coefficient (PCC) of 0.661 when combining audio and transcript-guided features via Ridge regression, near supervised baselines. In unsupervised settings, the DTW distance alone achieves high negative correlation with accuracy, fluency, and prosody (reaching up to −0.709 on fluency). Cross-dataset evaluation on L2-ARCTIC demonstrates consistent zero-shot generalization performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) systems, speech tutors, and automated language assessment platforms needing to evaluate non-native pronunciation without annotated learner corpora.

## Related

- (link related pages by id as the wiki grows)
