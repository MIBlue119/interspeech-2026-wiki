---
id: duraisamy26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2884
pdf: https://www.isca-archive.org/interspeech_2026/duraisamy26_interspeech.pdf
---

# Subject-Invariant Dynamic Graph Modeling for Cross-Subject EEG Imagined Speech Decoding

[PDF](https://www.isca-archive.org/interspeech_2026/duraisamy26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/duraisamy26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2884)

**TL;DR** — A subject-invariant dynamic graph modeling framework improves cross-subject EEG imagined speech decoding, achieving a classification accuracy of 31.20% on Dataset 1 and 30.36% on Dataset 2 under a strict leave-one-subject-out protocol.

## Problem

Decoding imagined speech from electroencephalography (EEG) suffers from severe performance degradation on unseen subjects due to low signal-to-noise ratios and high inter-subject variability. Standard EEG Transformers often collapse to chance-level performance under strict leave-one-subject-out (LOSO) evaluations because they treat electrode channels as exchangeable inputs and fail to capture neurophysiological connectivity or suppress subject-specific traits.

## Method

The framework builds on a pretrained EEGPT backbone by combining electrode-aware tokenization, dynamic multi-view graph priors, and adversarial subject disentanglement. The architecture segments 2-second trials into overlapping windows to extract K complementary adjacency views—including radial basis function spatial priors, phase-locking value, spectral coherence, and envelope correlation across frequency bands. These priors bias the self-attention mechanism via a Graphormer module, while trial-level features are optimized using a word classification loss alongside an adversarial subject classification loss driven by a gradient reversal layer (GRL).

## Results

Evaluated across 15 subjects on two independent 64-channel 5-word datasets using a strict leave-one-subject-out protocol. Compared to a fine-tuned EEGPT baseline accuracy of 23.60% on Dataset 1 and 23.80% on Dataset 2, the full model (Graph + GRL) improves accuracy to 31.20% and 30.36%, respectively (statistically significant improvements with p < 0.001). Ablation tests confirm that both dynamic graph priors and adversarial GRL independently improve performance, and their combination minimizes cross-subject variance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing non-invasive brain-computer interfaces for silent or covert speech communication for individuals with severe speech impairments.

## Limitations

Residual EEG noise remains an inherent challenge despite notch filtering, band-pass filtering, and independent component analysis artifact removal.

## Related

- (link related pages by id as the wiki grows)
