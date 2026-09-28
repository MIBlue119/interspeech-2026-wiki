---
id: ding26d_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1815
pdf: https://www.isca-archive.org/interspeech_2026/ding26d_interspeech.pdf
---

# SGAD: A State-Guided Adaptive Decision Framework for Robust EEG-Based Auditory Attention Switch Decoding

[PDF](https://www.isca-archive.org/interspeech_2026/ding26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ding26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1815)

**TL;DR** — The paper introduces a state-guided adaptive decision framework for EEG-based auditory attention switch decoding that dynamically modulates temporal smoothing to improve decoding stability and accuracy while keeping response latency low.

## Problem

Auditory attention switch decoding suffers from high output variability during attentional transitions due to inherent EEG non-stationarity and window-wise independence. Traditional post-processing methods rely on fixed temporal smoothing, which forces an unfavorable trade-off between steady-state stability and rapid switch tracking. Furthermore, existing evaluations often overlook confounding factors tied to data partitioning, masking true model generalization.

## Method

The proposed State-Guided Adaptive Decision (SGAD) framework operates on top of frozen EEG and speech encoders (CNNT/FCTNet for EEG and a pretrained wav2vec 2.0 with a projection layer for speech, mapped to dimension d=64). It features a causal state detector (CSD) containing a causal multi-head attention mechanism with a key-value caching sliding window of length 15 to compute attention-switch probabilities from multi-band EEG embeddings. An adaptive gating mechanism then maps the transition probability to a time-varying smoothing factor via a monotonic function, dynamically updating the decision margin in a recursive loop. SGAD is trained using a multi-task objective comprising binary cross-entropy for decoding, auxiliary state supervision using soft triangular labels, and a smoothness regularization term.

## Results

Evaluated on the MS-AASD dataset across six hierarchical generalization protocols combining trial, audio, and subject splits, SGAD is compared against window decoding (WD), persistence-based decision (PBD), and exponential moving average decision (EBD) baselines using decoding accuracy (Acc), switch F1-score (Sw-F1), and switch detection latency (SDL). With the FCTNet backbone on the standard LOTO protocol, SGAD achieves an accuracy of 85.6%, a switch-F1 score of 72.5%, and an SDL of 1.25s, outperforming EBD baselines while effectively managing response latency across unseen audio, speaker, and subject conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Neuro-steered intelligent hearing aids and auditory assistive devices aiming to dynamically track user attention shifts in multi-talker environments.

## Limitations

The framework depends on frozen feature encoders and requires careful hyperparameter tuning for the adaptive gating bounds and auxiliary loss weights.

## Related

- (link related pages by id as the wiki grows)
