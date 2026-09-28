---
id: chen26h_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1037
pdf: https://www.isca-archive.org/interspeech_2026/chen26h_interspeech.pdf
---

# Geometrically Constrained Decentralized Independent Vector Analysis for Distributed Microphone Arrays

[PDF](https://www.isca-archive.org/interspeech_2026/chen26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1037)

**TL;DR** — This paper proposes a geometrically constrained decentralized independent vector analysis (GC-Dec-IVA) method for distributed microphone arrays that improves blind speech separation and cross-array permutation consistency without transmitting raw audio.

## Problem

Decentralized independent vector analysis (Dec-IVA) enables cross-array source separation by exchanging only power-related statistics, avoiding raw microphone signal transmission and privacy concerns. However, Dec-IVA often yields negligible gains over local array processing because of cross-array permutation mismatches and a rigid source model that amplifies errors in noisy environments. These alignment failures mix energies from different speakers, misguiding optimization updates and degrading separation quality.

## Method

The paper introduces direction-of-arrival (DOA) priors into a MAP-based cost function to penalize misalignment and force demixing filters to target identical speakers across all arrays. Additionally, a modified source model splits source activity measures across arrays, treating each array's frequency bins as a sub-frequency band to weaken uniform cross-array dependencies and increase robustness to noise. Optimization is carried out using a vectorwise coordinate descent (VCD) algorithm that iteratively updates auxiliary covariance variables and demixing vectors. The approach requires exchanging only power statistics rather than multichannel signals, preserving communication efficiency.

## Results

Experiments were conducted on 100 ten-second speech mixtures generated using the CMU ARCTIC corpus within simulated reverberant rooms using 2 to 8 distributed two-microphone arrays under both noiseless and noisy conditions. Evaluated against local IVA and standard Dec-IVA baselines, the proposed GC-Dec-IVA method consistently improves both separation performance and cross-array permutation consistency. The revised source model successfully prevents block-permutation-like failures caused by background noise and cross-array mismatch.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech/ML engineers working on blind source separation, meeting transcription, teleconferencing, and smart spaces utilizing wireless acoustic sensor networks or distributed microphone arrays.

## Related

- (link related pages by id as the wiki grows)
