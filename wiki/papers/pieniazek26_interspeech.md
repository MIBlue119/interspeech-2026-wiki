---
id: pieniazek26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2624
pdf: https://www.isca-archive.org/interspeech_2026/pieniazek26_interspeech.pdf
---

# Detection of Incorrect Place of Articulation in Polish Sibilants Using Convolutional Autoencoders

[PDF](https://www.isca-archive.org/interspeech_2026/pieniazek26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pieniazek26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2624)

**TL;DR** — This study proposes combining convolutional autoencoders with support vector machines to automatically detect incorrect place of articulation in Polish sibilants from child speech, achieving sensitivities up to 84.32%.

## Problem

Incorrect articulation of sibilant consonants is one of the most common speech disorders in children (dyslalia/sigmatism), and effective treatment relies on early diagnosis. However, timely clinical assessment is often constrained by a shortage of speech-language pathologists, making automated diagnostic tools crucial. Child speech is particularly challenging to model automatically due to its high acoustic variability, developmental instability, and low data repeatability.

## Method

The system extracts time-frequency spectrograms from isolated sibilant productions (/ʂ/ and /tʂ/) using a 20 ms Hamming window with 50% overlap, resized to 64x64 pixels. It evaluates three variants of convolutional autoencoders (CAEs): a classical CAE, a sparse CAE (SCAE) using Kullback-Leibler divergence regularization, and a multi-task CAE (MTCAE) with an auxiliary cross-entropy classification objective attached to the bottleneck layer. The encoder compresses input into a latent vector of variable dimensionality (d in {10, 13, 16, 20, 30}). Extracted latent representations are classified using a support vector machine (SVM) with a radial basis function kernel, trained with class weighting and evaluated via speaker-independent 10-fold cross-validation.

## Results

Tested on a corpus of children aged 4–8 years comprising 1,746 productions for /ʂ/ (1414 retroflex, 332 dental) and 586 productions for /tʂ/ (484 retroflex, 102 dental). The best-performing models relied on multi-task learning (MTCAE), achieving sensitivities up to 84.32% for /ʂ/ (with 72.68% overall accuracy) and 84.31% for /tʂ/. Non-parametric Kruskal-Wallis testing confirmed that the autoencoder variant significantly influenced prediction quality, with unsupervised and sparse autoencoders proving less effective than multi-task objectives for the affricate sound.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and computer-assisted speech therapy systems use this technology for automated screening and diagnosis of pediatric articulation disorders.

## Limitations

The study is restricted to two specific Polish sibilant phonemes (/ʂ/ and /tʂ/) and two place of articulation categories (retroflex versus dental), excluding less frequent articulation variants.

## Related

- (link related pages by id as the wiki grows)
