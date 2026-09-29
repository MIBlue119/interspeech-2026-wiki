---
id: sirigiraju26_interspeech
category: applications-other
labels: [low-resource, self-supervised]
institutions: ["International Institute of Information Technology Hyderabad", "Saintgits College of Engineering"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3247
pdf: https://www.isca-archive.org/interspeech_2026/sirigiraju26_interspeech.pdf
---

# ALFreeD: Teacher-Guided Few-Shot Pronunciation Assessment via Segmentation-Free Deviation Modeling

*Meenakshi Sirigiraju, Nevin K Mathew, Reni K Cherian, Chiranjeevi Yarra*

[PDF](https://www.isca-archive.org/interspeech_2026/sirigiraju26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sirigiraju26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3247)

**Category:** `applications-other` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — ALFreeD is a segmentation-free automatic pronunciation assessment framework that evaluates L2 learner speech by computing Dynamic Time Warping (DTW) deviations against text-matched teacher utterances in a pre-trained HuBERT space, achieving a 0.74 Pearson correlation on SpeechOcean762 using minimal labeled data.

## Key contributions

- Eliminates reliance on canonical phoneme forced alignments and manual boundaries for pronunciation assessment.
- Formulates teacher-guided pronunciation quality estimation via frame-level cosine distance mapping and DTW path extraction in HuBERT space.
- Adapts the i-vector framework (UBM-GMM and variability matrix V) to extract utterance-level deviation vectors while stripping non-pronunciation variability.
- Achieves competitive performance (0.74 Pearson correlation) compared to fully-supervised end-to-end models while requiring minimal labeled data.

## Problem

Traditional automatic pronunciation assessment (APA) systems rely on hidden Markov models and Goodness of Pronunciation (GOP) scores derived from forced alignments against canonical phoneme transcriptions. This assumption breaks down when non-native learner speech deviates significantly from expected patterns, causing boundary errors and misrepresenting substitutions, insertions, or deletions. While subsequent deep neural networks and end-to-end models (such as GOPT, 3M, HiPAMA) improved scoring robustness, they introduced an unyielding dependency on large-scale labeled training data and phonetic annotations.

## Method

The ALFreeD framework extracts frame-level contextualized embeddings from both a teacher utterance and an L2 learner utterance using a pre-trained HuBERT-base model, producing embedding sequences T and L. To overcome temporal differences, a pairwise cosine distance matrix D is computed between all frames, and Dynamic Time Warping (DTW) yields an optimal alignment path P subject to boundary, monotonicity, and continuity constraints. For each learner frame, the local deviation score is calculated as the average cosine distance to all aligned teacher frames, forming a deviation score sequence delta.

To strip out variabilities unrelated to pronunciation quality (such as speaker timbre or channel noise), an i-vector style deviation modeling pipeline is employed. A Gaussian Mixture Model (GMM) Universal Background Model (UBM) with K=32 components is trained using deviation scores computed exclusively from teacher-to-teacher utterances. Zero-th and first-order sufficient statistics are accumulated for the learner deviation sequence using posterior probabilities, yielding an utterance-level pronunciation deviation vector wu via a low-rank variability matrix V.

Finally, the utterance-level deviation vector wu is fed into a two-layer Multi-Layer Perceptron (MLP) with ReLU activations and cross-entropy loss trained via the Adam optimizer. Only the MLP parameters are optimized using labeled pronunciation ratings, whereas all upstream components (HuBERT, DTW, UBM-GMM, i-vector extraction) operate in an unsupervised manner without requiring pronunciation score annotations during feature generation.

## Experimental setup

Evaluated on the Speechocean762 dataset, which comprises 5,000 utterances (2,500 training, 2,500 testing) spanning approximately 6 hours of speech from 250 Mandarin-speaking L2 adults and children. Teacher references were synthesized using Google TTS with US English male and female voices. Baselines include traditional GOP, GOPT, 3M, and HiPAMA. Metrics focus on Pearson correlation against the median of 5 expert annotator ratings (0 to 10 scale). Notable implementation choices include HuBERT-base embeddings, diagonal-covariance UBMs with 32 GMM components, i-vector dimension of 10, and varying labeled training set sizes from 300 to 2,500 samples.

## Results

ALFreeD achieves a Pearson correlation of 0.68 with only 300 labeled samples (a 9.7% relative improvement over the unsupervised GOP baseline of 0.62). Performance scales steadily with supervision, reaching 0.71 with 1,000 samples (matching GOPT), 0.72 with 2,000 samples (approaching HiPAMA's 0.73), and 0.74 with the full 2,500 training samples (competing closely with the 3M model's 0.76). Layer-wise analysis of HuBERT demonstrates that intermediate layers (peaking around layer 7) provide the optimal balance for APA, whereas lower layers focus excessively on acoustic/speaker variation and higher layers capture overly abstract linguistic features. Ablations show that GMM performance peaks at 32 mixture components and a deviation embedding dimension of 10, dropping off if components or dimensions grow too large due to data sparsity.

| System / Condition | Labeled Samples | Pearson Correlation |
|---|---|---|
| GOP (Baseline) | Unsupervised | 0.62 |
| GOPT | Full (2500) | 0.71 |
| HiPAMA | Full (2500) | 0.73 |
| ALFreeD (Ours) | 300 | 0.68 |
| ALFreeD (Ours) | 1000 | 0.71 |
| ALFreeD (Ours) | 2500 | 0.74 |

## Limitations

The framework relies on synthetic text-matched teacher prompts via text-to-speech rather than native human reference recordings of the exact same speaker demographic, which could introduce synthetic artifacts. Evaluation is restricted to a single dataset (Speechocean762, Mandarin-accented English) and utterance-level score prediction rather than diagnostic phoneme-level error localization. The approach assumes clean time-alignment via DTW which can degrade under severe speech degradation or non-speech noise.

## Why read this

Read this if you want to bypass forced alignment and large-scale data dependencies in pronunciation assessment by leveraging teacher-learner contrastive representations and classical i-vector modeling on top of self-supervised speech models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) systems, automated second-language spoken proficiency testing, and real-time pronunciation feedback tools.

## Institutions / 機構

International Institute of Information Technology Hyderabad, Saintgits College of Engineering

## Related

- (link related pages by id as the wiki grows)
