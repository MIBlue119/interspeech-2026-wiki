---
id: dong26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-514
pdf: https://www.isca-archive.org/interspeech_2026/dong26_interspeech.pdf
---

# Membership Inference Attacks against Large Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/dong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-514)

**TL;DR** — This paper evaluates membership inference attacks (MIAs) on large audio language models (LALMs), revealing that high MIA success rates are often artifacts of dataset distribution shifts rather than true model memorization.

## Problem

Evaluating privacy risks in Large Audio Language Models (LALMs) via Membership Inference Attacks is challenging because audio contains rich non-semantic cues, such as speaker identity and recording conditions, which can lead to irreversible identity-content binding. Furthermore, standard audio benchmarks often suffer from acoustic distribution shifts between training and test sets, which spuriously inflate MIA performance and make it difficult to distinguish true data memorization from dataset artifacts.

## Method

The authors propose a three-phase privacy auditing framework: a Multi-modal Blind Baseline using metadata, TF-IDF text features, and aggregated acoustic descriptors (MFCCs, pitch, energy) trained via Logistic Regression; an MIA Auditing phase employing a two-stage generation protocol (autonomous greedy decoding followed by self-conditioned scoring across a 30-dimensional vector of metrics like perplexity, Min-k%, and Max-Rényi divergence); and a Modality Disentanglement protocol replacing audio with silence, noise, or TTS/TTA-resynthesized speech. They evaluate two fully open-source LALMs, Audio-Flamingo 3 (AF3) and Music-Flamingo (MF), across eight diverse datasets spanning ASR, audio captioning, and music understanding.

## Results

Across eight datasets (LibriSpeech, GigaSpeech, TED-LIUM, VoxPopuli, SPGISpeech, Clotho, CochlScene, NSynth), blind baselines reveal near-perfect train/test separability (AUC up to 100.0% on LibriSpeech) due to dataset artifacts, which strongly correlate with LALM MIA scores. On relatively clean, distribution-matched datasets (VoxPopuli, SPGISpeech, Clotho, NSynth), actual model memorization yields lower sample-level AUCs (ranging from 48.9 to 68.1). Modality disentanglement experiments demonstrate that MIA performance completely collapses when audio or text inputs are replaced by silence, noise, or resynthesized versions (e.g., dropping from 62.0 to ~50-52 on VoxPopuli), confirming that LALM memorization relies strictly on cross-modal binding between specific vocal identities and text.

## Code

- https://github.com/snooow1029/ALM_MIA

## Applications

Speech and ML engineers building or auditing multimodal audio-language models can use this framework to reliably quantify true data privacy risks and avoid false-positive memorization alarms caused by dataset artifacts.

## Limitations

The study is restricted to open-source foundation models with fully documented training data provenance, such as Audio-Flamingo 3 and Music-Flamingo, due to the requirement for ground-truth membership labels.

## Related

- (link related pages by id as the wiki grows)
