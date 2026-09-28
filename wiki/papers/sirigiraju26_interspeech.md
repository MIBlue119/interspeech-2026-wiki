---
id: sirigiraju26_interspeech
category: asg
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3247
pdf: https://www.isca-archive.org/interspeech_2026/sirigiraju26_interspeech.pdf
---

# ALFreeD: Teacher-Guided Few-Shot Pronunciation Assessment via Segmentation-Free Deviation Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/sirigiraju26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sirigiraju26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3247)

**TL;DR** — ALFreeD is a segmentation-free automatic pronunciation assessment framework that models deviations between learner and teacher utterances using self-supervised representations and i-vectors with minimal labeled data.

## Problem

Traditional automatic pronunciation assessment systems rely heavily on canonical phonemes, forced alignment boundaries, and large-scale labeled datasets, which are costly and brittle when handling non-native pronunciation errors. Mispronunciations, substitutions, and deletions are often misrepresented or overlooked due to boundary propagation errors. Eliminating the need for phonetic alignments while maintaining high accuracy under low-resource conditions is crucial for scalable computer-assisted language learning.

## Method

The framework extracts frame-level contextualized embeddings from both teacher and learner speech using a pre-trained HuBERT-base model. It computes temporal correspondence and frame-level deviation scores using Dynamic Time Warping (DTW) with cosine distance in the shared embedding space. An i-vector framework is then adopted—using a Universal Background Model (UBM) trained on teacher deviations—to extract an utterance-level pronunciation deviation vector that suppresses speaker and background variabilities. Finally, a two-layer multilayer perceptron (MLP) trained with cross-entropy loss maps the deviation vector to an utterance-level pronunciation score, with only the MLP parameters updated via supervised learning.

## Results

Evaluated on the Speechocean762 dataset containing 5,000 utterances (6 hours) across 250 Mandarin-speaking L2 learners, ALFreeD achieves competitive performance compared to recent end-to-end methods under minimal labeled supervision settings (tested across 300 to 2,500 labeled training utterances). The architecture explores layer-wise HuBERT behavior, UBM mixture components ranging from 4 to 64, and i-vector dimensionalities between 5 and 100. It demonstrates that pronunciation deviation modeling guided by teacher references effectively bypasses the requirement for forced phoneme alignments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) systems and automated language tutoring platforms requiring scalable, objective pronunciation scoring for second-language learners with limited annotation budgets.

## Related

- (link related pages by id as the wiki grows)
