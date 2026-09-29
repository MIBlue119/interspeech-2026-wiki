---
id: pieniazek26_interspeech
category: health-clinical
labels: [low-resource]
institutions: ["Silesian University of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2624
pdf: https://www.isca-archive.org/interspeech_2026/pieniazek26_interspeech.pdf
---

# Detection of Incorrect Place of Articulation in Polish Sibilants Using Convolutional Autoencoders

*Wojciech Pieniążek, Oliwia Skórzewska, Maria Filipek, Zuzanna Miodońska*

[PDF](https://www.isca-archive.org/interspeech_2026/pieniazek26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pieniazek26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2624)

**Category:** `health-clinical` · **Labels:** `low-resource`

**TL;DR** — This paper proposes a convolutional autoencoder framework combined with support vector machines to detect incorrect place of articulation in children's Polish sibilant productions, achieving up to 84.32% sensitivity.

## Key contributions

- Evaluated three convolutional autoencoder variants (classical, sparse with KL-divergence, and multi-task) for feature extraction in pediatric speech disorder detection.
- Investigated speaker-independent classification of place of articulation errors for Polish retroflex sibilants (/ù/ and /t͡ʂù/) in 4-to-8-year-old children.
- Demonstrated that multi-task autoencoders (MTCAE) and sparse autoencoders (SCAE) outperform traditional MFCC-SVM baselines and classical autoencoders in pathology sensitivity.
- Provided a systematic analysis of latent space dimensions and SVM hyperparameter configurations using 10-fold cross-validation.

## Problem

Effective treatment of sibilant articulation disorders in young children depends on early and accurate diagnosis, but timely assessment is severely hindered by a shortage of speech-language pathologists. Traditional machine learning methods rely on handcrafted acoustic features (like MFCCs) feeding Support Vector Machines, which often fail to capture complex spectral anomalies in highly variable and developmentally unstable children's speech. While end-to-end deep convolutional networks exist, they struggle with small or heavily imbalanced datasets, making robust automated pediatric speech screening an open challenge.

## Method

The system processes isolated sibilant phonemes manually segmented from recordings captured via a close-microphone setup (Panasonic WM-61, 44.1 kHz, 16-bit). Audio is amplitude-normalized, converted to spectrograms via a 20 ms Hamming window with 50% overlap, and resized to 64x64 pixels. Three convolutional autoencoder (CAE) variants are evaluated: a classical CAE, a Sparse CAE (SCAE) incorporating Kullback-Leibler divergence regularization to enforce neuron sparsity, and a Multi-Task CAE (MTCAE) with an auxiliary cross-entropy classification head attached to the bottleneck layer. All variants use Mean Squared Error (MSE) reconstruction loss.

The encoder compresses inputs into a bottleneck latent vector of dimension d in {10, 13, 16, 20, 30}. Latent representations are subsequently classified using an SVM with a Radial Basis Function (RBF) kernel, where regularization parameter C and kernel width gamma are optimized via grid search over {0.001, 0.005, ..., 1500}. Class weighting is applied to address severe class imbalance, and a strict speaker-independent 10-fold cross-validation scheme ensures that all productions from a given speaker reside exclusively in either training or testing folds.

## Experimental setup

The dataset contains children aged 4-8 years: 1,414 retroflex and 332 dental productions from 149 speakers for /ù/, and 484 retroflex and 102 dental productions from 151 speakers for /t͡ʂù/. Models are compared against prior MFCC-based SVM pipelines and standard ResNet-style architectures. Metrics include sensitivity (prioritized for pathology detection) and overall accuracy, validated using the non-parametric Kruskal-Wallis test.

## Results

The top-performing MTCAE model achieved a maximum sensitivity of 84.31% with 72.68% accuracy for /ù/, and 84.31% sensitivity with 70.31% accuracy for /t͡ʂù/. For /ù/, SCAE delivered more consistent high sensitivity across hyperparameter settings, whereas MTCAE demonstrated clear superiority for /t͡ʂù/ in both sensitivity and accuracy. Compared to prior MFCC-SVM baselines (71.58% sensitivity) and ResNet binary classifiers (~80%), the proposed latent space representations improved pathological case detection.

| System / Condition | Sensitivity (%) | Accuracy (%) | Latent Dim (d) |
|---|---|---|---|
| MTCAE (/ù/) | 84.31 | 72.68 | 30 |
| MTCAE (/t͡ʂù/) | 84.31 | 70.31 | 16 |
| SCAE (/ù/) | 79.82 | 65.81 | 16 |
| CAE (/ù/) | 78.92 | 86.08 | 20 |

## Limitations

The study is constrained by a relatively small and class-imbalanced dataset containing substantially fewer pathological samples than normative ones. Resizing spectrograms to a low 64x64 resolution risks discarding critical high-frequency spectral details necessary for sibilant differentiation. Furthermore, the evaluation is limited to a single language (Polish) and specific sibilant phonemes.

## Why read this

Researchers building computational tools for pediatric speech therapy or low-resource clinical diagnostics should read this paper to see how unsupervised and multi-task representation learning can be leveraged with SVM classifiers to handle highly variable child speech data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech-language pathology screening tools, computer-aided pronunciation training (CAPT) systems for children, and clinical diagnostic assistants.

## Institutions / 機構

Silesian University of Technology

**Funding / 經費:** National Science Centre, Poland, European Union, Ministry of Science and Higher Education, Poland, National Centre for Research and Development

## Related

- [Informativity of high-frequency bands on the place of articulation shift in retroflex sibilants produced by children](skorzewska26_interspeech.md) — same problem · relatedness 2.1/3
- [Phoneme-Level Mispronunciation Screening in Polish-Speaking Children with an Explainable Assistant](dudek26_interspeech.md) — same problem · relatedness 2.1/3
- [A Fusion-Aware Two-Stage Framework for Mispronunciation Detection and Diagnosis in Low-Resource Modern Standard Arabic](yang26j_interspeech.md) — same problem · relatedness 2.0/3
- [From onset to coda: spectral variation in normative Polish /s/ produced by children](walczak26_interspeech.md) — complementary · relatedness 2.0/3
- [SayCheck: Gamified Speech Practice and Attribute-Based Speech Analysis for Children](shahin26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
