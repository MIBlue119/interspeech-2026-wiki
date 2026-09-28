---
id: juvekar26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3408
pdf: https://www.isca-archive.org/interspeech_2026/juvekar26_interspeech.pdf
---

# Vividh-ASR: A Complexity-Tiered Benchmark and Optimization Dynamics for Robust Indic Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/juvekar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/juvekar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3408)

**TL;DR** — The paper introduces Vividh-ASR, a complexity-stratified benchmark for Indic languages, and Reverse Multi-Stage Fine-Tuning (R-MFT), achieving robust spontaneous speech recognition by pairing hard-to-easy data curricula with high initial learning rates.

## Problem

Fine-tuning multilingual models like Whisper on low-resource Indic languages usually relies on conservative learning rates and easy-to-hard curricula, causing studio-bias where read speech performs well but spontaneous conversational audio fails severely. Standard practice traps models in sub-optimal local basins defined by their pre-trained priors, failing to adapt to complex local phonotactics and prosody. Vividh-ASR and R-MFT address this by systematically decoupling learning rate timing and acoustic complexity ordering to diagnose and overcome these failure modes.

## Method

The authors perform a 2x2 factorial study isolating learning rate schedules (decreasing vs. increasing) and curriculum orderings (hard-to-easy vs. easy-to-hard) using Whisper-small (244M) and Whisper-medium (769M). R-MFT consists of a three-stage recipe: Stage 1 trains on spontaneous data (Tier C) with a high learning rate (2e-4) to maximize plasticity; Stage 2 handles broadcast data (Tier B) at 1e-4; and Stage 3 consolidates using a 1:1 mixture of studio (Tier A) and spontaneous data at 1e-5. Representational dynamics are analyzed using Centered Kernel Alignment (CKA), singular value decomposition (SVD), relative L2 weight displacement, and Wasserstein distance.

## Results

Evaluated on Hindi and Malayalam across studio, broadcast, spontaneous, and synthetic noise tiers from corpora like Kathbath, Shrutilipi, and Indic Voices. High initial learning rates improve global WER by roughly 12 absolute points over conservative baselines, while hard-to-easy curricula yield additional gains for spontaneous speech. In Malayalam, R-MFT reaches 39.36% global WER, outperforming conventional easy-to-hard MFT (42.25%). A parameter-efficient 244M R-MFT model achieves 44.41% (Malayalam) and 21.41% (Hindi) global WER, outperforming a 769M single-stage low-LR baseline (77.79% and 25.25%) despite having only a third of the parameters.

## Code

- https://huggingface.co/collections/adalat-ai/vividh-asr

## Applications

Speech engineers and developers building robust automatic speech recognition systems for low-resource or morphologically complex languages deployed in unscripted, real-world environments like courtroom dictation or conversational telephony.

## Limitations

Evaluated primarily on Whisper architectures for Hindi and Malayalam.

## Related

- (link related pages by id as the wiki grows)
