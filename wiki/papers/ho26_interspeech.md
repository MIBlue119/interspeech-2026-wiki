---
id: ho26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-621
pdf: https://www.isca-archive.org/interspeech_2026/ho26_interspeech.pdf
---

# An Investigation on Combining Geometry and Consistency Constraints into Phase Estimation for Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/ho26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ho26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-621)

**TL;DR** — The paper introduces the Multi-Source Griffin-Lim Algorithm (MSGLA), an iterative phase estimation framework for speech enhancement that combines STFT consistency constraints with geometric relations (law of cosines and sines) to resolve sign ambiguity.

## Problem

Geometry-based phase estimation in speech enhancement computes the absolute phase difference between sources using known magnitudes, but reducing this to a binary choice requires solving a challenging sign ambiguity. Prior deep learning sign predictors often struggle due to the unstructured and random nature of sign targets, leading to large phase errors when misclassified. This work addresses this gap by integrating geometric constraints directly into an iterative consistency-preserving framework.

## Method

The framework proposes two variants: noise magnitude-based MSGLA (NM-MSGLA) and noise phase-based MSGLA (NP-MSGLA). NM-MSGLA uses a DNN to predict speech and noise magnitudes, alternating Griffin-Lim style consistency updates and geometric projections. NP-MSGLA utilizes the law of sines to reconstruct speech phase from estimated speech magnitude and noise phase, exploiting the empirical observation that noise phase is easier to estimate in low-energy speech regions. The backbone architecture employs TF-GridNet with roughly 1.3 million parameters, trained using L1 magnitude loss and cosine distance loss with phase derivatives for 160 epochs.

## Results

Evaluated on VoiceBank-DEMAND (VB-DMD) and WSJ0-CHiME3 datasets using PESQ, ESTOI, SI-SNR, and CBAK metrics. MSGLA variants match or slightly outperform direct phase estimation and DNN-based sign predictors, showing particular strength in background noise suppression metrics like CBAK (reaching 3.18 on VB-DMD and 2.51 on WSJ0-CHiME3). Oracle experiments confirm that providing ground-truth noise information allows MSGLA to closely recover clean speech phases (cosine similarity up to 0.87).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers building single-channel speech enhancement systems for robust automatic speech recognition, telephony, or hearing aids.

## Limitations

Performance is dependent on the accuracy of the underlying DNN magnitude or noise phase estimates, as demonstrated by the drop in cosine similarity when moving from oracle to estimated inputs.

## Related

- (link related pages by id as the wiki grows)
