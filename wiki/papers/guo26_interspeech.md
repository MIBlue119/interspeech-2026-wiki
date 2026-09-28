---
id: guo26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1022
pdf: https://www.isca-archive.org/interspeech_2026/guo26_interspeech.pdf
---

# GLAD: Global-Local Aware Dynamic Mixture-of-Experts for Multi-Talker ASR

[PDF](https://www.isca-archive.org/interspeech_2026/guo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1022)

**TL;DR** — The paper introduces GLAD, a global-local aware dynamic mixture-of-experts architecture for multi-talker ASR that outperforms standard serialized output training baselines across various overlap conditions.

## Problem

End-to-end multi-talker automatic speech recognition struggles with overlapping speech because speaker-specific acoustic attributes get diluted in deeper network layers, hindering accurate speaker differentiation. While Mixture-of-Experts could dynamically allocate capacity for varying speaker counts, standard layer-local routers fail because they miss these diluted cues. Furthermore, external speaker diarization helpers introduce extra computational overhead and deployment complexities.

## Method

The method integrates a Mixture of Low-Rank Experts (MoLE) into a Conformer encoder by replacing linear layers with parallel low-rank modules and a shared linear path. It incorporates global routers operating on shallow convolutional acoustic features to capture speaker-aware context alongside intermediate local routers. A global-local aware dynamic fusion module then adaptively computes frame-level gating weights to blend both routing distributions. Training utilizes a switch transformer load-balancing auxiliary loss combined with the standard ASR loss.

## Results

Evaluated on LibriSpeechMix (LSM-2mix and LSM-3mix) and CH109 datasets using Word Error Rate and Overlap-Aware WER metrics, GLAD-SOT achieves superior performance compared to baselines like SOT, CSE-SOT, and SOT+SACTC, especially in challenging high-overlap scenarios. Ablation studies confirm that removing either the global encoder or the dynamic fusion mechanism leads to notable performance degradation, particularly under low and high overlap conditions.

## Code

- https://github.com/NKU-HLT/GLAD

## Applications

Speech and machine learning engineers working on meeting transcription systems, multi-party dialogue analysis, and automatic speech recognition in cocktail-party environments.

## Limitations

The text does not explicitly state major limitations or scope bounds beyond reliance on simulated and specific evaluation mixtures.

## Related

- (link related pages by id as the wiki grows)
