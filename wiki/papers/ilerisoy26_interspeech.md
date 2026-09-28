---
id: ilerisoy26_interspeech
category: zero-shot
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2235
pdf: https://www.isca-archive.org/interspeech_2026/ilerisoy26_interspeech.pdf
---

# Zero-Shot Respiratory Sound Classification through LLM-Augmented Audio-Text Alignment

*Mustafa Talha İlerisoy, Hung Manh Pham, Mathias Funk, Mykola Pechenizkiy, Aaqib Saeed*

[PDF](https://www.isca-archive.org/interspeech_2026/ilerisoy26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ilerisoy26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2235)

**TL;DR** — REACH aligns pre-trained unimodal respiratory encoders with medical text using LLM-synthesized reports and similarity-aware negative sampling, achieving a 61.3% mean zero-shot AUC across 9 tasks on 6 datasets while using 57% less training data than full-scale baselines.

## Key contributions

- A modular semantic alignment framework (REACH) transforming pre-trained unimodal respiratory encoders into zero-shot capable multimodal models.
- An LLM-augmented report synthesis pipeline converting metadata into structured clinical reports to serve as semantic anchors without requiring paired audio-report data.
- A structure-preserving alignment strategy combining a sigmoid contrastive objective with the encoder's native masked reconstruction MSE loss and similarity-aware negative sampling.
- Comprehensive validation across 9 tasks from 6 datasets demonstrating superior performance compared to full-scale pre-training and much larger audio-language models.

## Problem

Self-supervised respiratory encoders yield powerful acoustic representations for fine-grained auscultatory events, but their latent spaces remain semantically opaque and unanchored to medical concepts. Consequently, every new clinical task requires scarce, expert-curated labeled data for supervised fine-tuning. General-purpose audio-text models like CLAP fail in clinical settings because they lack grounding in specialized medical language. Training a specialized multimodal model from scratch is blocked by the complete absence of large-scale paired audio-report datasets for respiratory sounds.

## Method

The framework utilizes an off-the-shelf medical-grade LLM (GPT-4) to synthesize standardized 2-3 line clinical reports from discrete patient metadata (demographics, sound types, adventitious labels), acting as semantic anchors for contrastive learning. The architecture pairs a respiratory-specific transformer audio encoder with the frozen text branch of MedSigLIP, mapping both into a shared d-dimensional space via lightweight linear projection heads followed by layer normalization.

The training objective combines a SigLIP-based sigmoid contrastive loss (alpha learnable temperature, batch-independent binary classification formulation) with a masked spectrogram reconstruction MSE regularizer to prevent the distortion of pre-trained acoustic manifolds. To prevent in-batch semantic overlap, FAISS offline indexing is used for online negative swapping, substituting 50% of batch negatives with the k=10 furthest embedding from the positive anchor. During training (100 epochs, lr = 1e-5), the text encoder remains completely frozen while the audio encoder and projection heads are optimized on 43% of the open-access baseline training corpus.

## Experimental setup

Evaluated across 9 tasks from 6 publicly available respiratory datasets (CovidUK, COUGHVID, ICBHI, Coswara, KAUH, Resp.@TR), split into 5 in-domain and 4 out-of-domain tasks. Compared against unimodal encoders (OpenSMILE, VGGish, AudioMAE, OPERA family), general-purpose audio-text models (CLAP), and audio-language decoders (Qwen2-Audio 7B, Audio-Flamingo3) using Linear Probing, k-NN, and Zero-Shot protocols measured in AUC (%).

## Results

REACH achieves a 61.3% mean zero-shot AUC, outperforming CLAP (51.4%) and Qwen2-Audio 7B (54.9%). For linear probing, REACH achieves the highest mean AUC of 71.6% using only 43% of full-scale training data, outperforming data-matched OGT (65.4%) and even full-corpus OGT (67.7%). In k-NN evaluation, REACH reaches 65.2% mean AUC, surpassing OGT-dagger (58.8%). Ablations reveal that removing the MSE reconstruction regularizer drops zero-shot AUC by 7.2 points, while replacing FAISS-mined distant negatives with random sampling collapses zero-shot AUC to 53.5%. Performance remains near chance on subtle cough variation tasks (T3 cough Covid classification at 51.3% zero-shot) and multi-class COPD severity grading (T9 at 52.1%).

| System | Linear Probe AUC (%) | k-NN AUC (%) | Zero-Shot AUC (%) |
|---|---|---|---|
| CLAP | 68.5 | 61.7 | 51.4 |
| Qwen2 Audio 7B | - | - | 54.9 |
| Audio-Flamingo 3 | - | - | 53.5 |
| OGT (Full Corpus) | 67.7 | 57.6 | - |
| OGT (43% Open Data) | 65.4 | 58.8 | - |
| **REACH (Ours)** | **71.6** | **65.2** | **61.3** |

## Limitations

Evaluated exclusively on respiratory sound tasks, leaving general audio or speech recognition out of scope. Performance is constrained by small sample sizes on certain datasets (e.g., KAUH with 234 samples), which leads to regression in neighborhood metrics like k-NN. The method relies on high-quality metadata to synthesize reliable text reports via LLMs; noisy metadata could degrade semantic anchor quality.

## Why read this

Researchers and engineers working on clinical audio foundation models will learn how to leverage frozen medical text encoders and LLM report synthesis to achieve zero-shot inference without paired audio-text corpora. It offers a practical blueprint for sample-efficient multimodal alignment in data-scarce medical domains.

## Code

- https://github.com/mtilerisoy/REACH

## Applications

Automated zero-shot screening and diagnostic support for respiratory pathologies using acoustic auscultation and cough recordings in low-resource clinical settings.

## Related

- (link related pages by id as the wiki grows)
