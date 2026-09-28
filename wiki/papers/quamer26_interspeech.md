---
id: quamer26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2741
pdf: https://www.isca-archive.org/interspeech_2026/quamer26_interspeech.pdf
---

# Privacy and quality trade-off in real-time speaker anonymization via editing of age and sex attributes

[PDF](https://www.isca-archive.org/interspeech_2026/quamer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/quamer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2741)

**TL;DR** — This paper analyzes the privacy-quality trade-off in streaming speaker anonymization by editing age and sex attributes in the embedding space, discovering an optimal modification sweet spot around 0.25 standard deviations.

## Problem

Prior speaker anonymization research treats transformation as a monolithic, black-box process without isolating how individual speaker attributes contribute to identity concealment versus speech naturalness. This lack of attribution leaves developers without actionable guidance on how much to modify specific traits to reach an ideal operating point. Addressing this gap is critical for building efficient, real-time voice-privacy applications that balance identity suppression against quality loss.

## Method

The system decomposes speech using a content encoder (HuBERT-Kmeans units), a speaker encoder (concatenated X-vectors and ECAPA-TDNN), a speaker/variance adapter using AdaIN and FiLM, and a causal HiFiGAN decoder. Attribute editing is performed by applying PCA to the speaker embedding space and shifting embeddings along composite directions formed by weighting principal components with Pearson correlations against target age and femininity labels. The synthesis model and PCA decomposition were trained on the LibriTTS corpus using two NVIDIA RTX 3090 GPUs, utilizing SpeechBrain extractors and a wav2vec2-based age/sex predictor for pseudo-labels.

## Results

Evaluated on LibriTTS using speaker cosine similarity, DNS-MOS for objective quality, and a perceptual listening test with N=20 Amazon Mechanical Turk raters. Linear regressions reveal that femininity modifications ($\beta_2 = -0.459$ for similarity, $-0.64$ for quality) impact both identity and quality more strongly than age modifications ($\beta_1 = -0.309$ for similarity, $-0.55$ for quality). Because speaker similarity drops more steeply than DNS-MOS, a sweet spot emerges around $\pm 0.25$ standard deviations of modification. Perceptual tests validate this, showing moderate modifications achieve an 83% speaker differentiation rate while maintaining high naturalness (quality score 2.6 vs 3.1 for clean audio).

## Code

- https://anonymousis23.github.io/demos/pca-voice-editing/

## Applications

Speech engineers and privacy researchers designing real-time voice-based applications or tuning attribute-based speech anonymization and voice conversion pipelines.

## Limitations

The PCA-based attribute editing approach does not perfectly disentangle correlated attributes like age and sex, which are naturally mediated by pitch.

## Related

- (link related pages by id as the wiki grows)
