---
id: nguyen26h_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3343
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26h_interspeech.pdf
---

# What Does a Pathological Speech Assessment Model Know about Acoustic Features? A Case Study on Oral and Oropharyngeal Cancer Patients

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3343)

**TL;DR** — This paper investigates what acoustic information is encoded in a Wav2Vec 2.0-based pathological speech assessment model using Projection-Weighted Canonical Correlation Analysis (PWCCA) against eGeMAPS low-level descriptors.

## Problem

Deep learning models achieve strong performance in pathological speech assessment but lack transparency, creating a barrier to clinical adoption where clinicians need explainable decisions. Conversely, handcrafted acoustic features are interpretable but lack consensus on the optimal feature set. This work bridges the two by analyzing how self-supervised representations align with established acoustic references.

## Method

The study uses a Wav2Vec 2.0 Large encoder fine-tuned on ASR followed by an intelligibility assessment model (achieving an MAE of 0.68). PWCCA is computed layer-wise to measure linear relationships between transformer layer embeddings and eGeMAPS low-level descriptors (LLDs) extracted at 25ms frames. The 25 LLDs are categorized into three clinical groups (Prosodic, Spectral, and Voice Quality) to evaluate feature representation across network depth.

## Results

Using the French C2SI corpus containing 87 oral and oropharyngeal cancer patients and 40 control speakers (134 total recording sessions), the analysis shows that spectral and prosodic features achieve high group-level correlations of 0.77 and 0.71 respectively, while voice quality reaches 0.65. At the individual level, the first MFCC coefficient yields the highest and most stable correlation across all layers, whereas formant bandwidths, jitter, shimmer, and H1-H2 show poor correlation. Final-layer representations show a drop in correlation with eGeMAPS features, suggesting the model captures higher-level phonetic or non-eGeMAPS acoustic cues.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing transparent automated screening tools for clinical speech and voice disorders.

## Limitations

The evaluation is restricted to the French C2SI corpus and oral/oropharyngeal cancer patient data.

## Related

- (link related pages by id as the wiki grows)
