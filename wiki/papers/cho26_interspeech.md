---
id: cho26_interspeech
category: speech-llm-dialogue
labels: [low-resource, self-supervised]
institutions: ["Korea Advanced Institute of Science and Technology"]
code: https://github.com/hyebin-c/aspl
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-885
pdf: https://www.isca-archive.org/interspeech_2026/cho26_interspeech.pdf
---

# Acoustic Prompting via Stage-wise Modulation for Few-Shot Learning in Audio Language Models

*Hyebin Cho, Jaehyuk Jang, Changick Kim, Joon Son Chung*

[PDF](https://www.isca-archive.org/interspeech_2026/cho26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cho26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-885)

**Category:** `speech-llm-dialogue` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — The paper introduces Audio-Side Prompt Learning (ASPL), a plug-and-play parameter-efficient framework that injects lightweight continuous acoustic prompts into the audio encoder of audio-language models, yielding an average top-1 accuracy gain of ~1.1% across 11 datasets in a 16-shot setting.

## Key contributions

- Identifies and addresses the text-centric bias in prior audio-language model few-shot adaptation research.
- Proposes a three-stage acoustic prompting mechanism via continuous affine transformations at the log-mel spectrogram, patch embedding, and early Swin Transformer block levels.
- Achieves extreme parameter efficiency (adding only 320 to 704 parameters regardless of dataset class complexity) compared to class- or instance-dependent text prompts.
- Demonstrates plug-and-play compatibility and synergy with existing text-side prompt adaptation techniques such as CoOp, CoCoOp, and PALM.

## Problem

Current audio-language model (ALM) adaptation research heavily favors text-centric prompting (e.g., CoOp, CoCoOp, PALM) because the text embedding space is stable and semantically structured. In contrast, audio signals are continuous, high-dimensional, and exhibit severe intra-class variance and background noise. Keeping the audio encoder entirely frozen creates a fundamental bottleneck, preventing the model from bridging domain shifts between massive pretraining corpora and diverse downstream audio tasks. This paper argues that joint audio-text mutual adaptation is necessary to overcome this cross-modal misalignment.

## Method

The proposed ASPL framework modulates the audio pipeline through lightweight affine transformations applied at three strategic locations, utilizing learnable 1D continuous prompt vectors ($\gamma, \beta$) broadcasted channel-wise. Formally, a prompt-driven modulation is applied as $\gamma \cdot X + \beta$, where the parameters are shared across all classes and instances. The first stage targets log-mel spectrograms ($X \in \mathbb{R}^{B \times F \times T}$) with frequency-wise parameters $\gamma_{\text{spec}}, \beta_{\text{spec}} \in \mathbb{R}^F$, acting as a learnable equalizer for spectral and recording conditions. The second stage targets latent tokens ($X \in \mathbb{R}^{B \times L \times C}$) after patch embedding with channel-wise parameters $\gamma_{\text{tok}}, \beta_{\text{tok}} \in \mathbb{R}^C$. The third stage (in extended ASPL*) conditions representations immediately after the first local-global mixing layer of the Swin Transformer block using $\gamma_{\text{block1}}, \beta_{\text{block1}} \in \mathbb{R}^C$. 

These components are trained on top of frozen pre-trained CLAP-HTSAT audio encoders and CLIP text encoders (from PENGI). The optimization uses cross-entropy loss and SGD with a learning rate of 0.01, momentum of 0.9, and batch size of 16 for 100 epochs. Cosine similarity scores between L2-normalized audio and text embeddings use a fixed temperature $\tau = 0.01$. The design choice of targeting early layers rather than late layers or output spaces prevents physical nuances from disrupting pre-trained semantic abstractions in deeper layers.

## Experimental setup

Evaluated on 11 audio classification datasets covering instrument, sound event, emotion, vocal sound, surveillance, acoustic scene, and music analysis (Beijing-Opera, CREMA-D, ESC50, ESC50-Actions, GT-Music-Genre, NS-Instruments, RAVDESS, SESA, TUT2017, UrbanSound, VocalSound). Compared against baselines CoOp, CoCoOp, and PALM under a few-shot protocol with $K \in \{1, 2, 4, 8, 16\}$ training samples per class, using 3 random seeds (0, 1, 2) and reporting average top-1 accuracy. Implemented using an NVIDIA RTX A5000 with models built on CLAP-HTSAT and PENGI text encoders.

## Results

When combined with the PALM baseline, ASPL and ASPL* improve average top-1 accuracy from 77.86% to 78.98% and 79.26% respectively, while adding only 320 to 704 parameters. When combined with CoCoOp, average accuracy rises from 76.45% to 77.85%. Ablations show that early-block structural conditioning (ASPL* average 75.54% with CoOp) outperforms late-block (74.09%) or output-space modulation (73.90%), confirming that early audio-side intervention is critical. The method exhibits minor drops relative to baselines exclusively in the extreme 1-shot setting due to insufficient supervision for optimizing continuous prompts.

| Method | # Params | Latency (ms) | Avg. Acc. (%) |
|---|---|---|---|
| CoOp | 8,192 | 2.60 | 73.56 |
| CoCoOp | 107,072 | 14.76 | 76.45 |
| PALM | 4,100 | 2.60 | 77.86 |
| + ASPL | 4,420 | 3.09 | 78.98 |
| + ASPL* | 4,804 | 2.97 | 79.26 |

## Limitations

The framework exhibits performance degradation in the extreme 1-shot regime due to data scarcity preventing robust optimization of continuous prompts without minor overfitting. The evaluation is limited to discriminative audio classification and sound event tasks using CLAP-HTSAT, leaving generative ALMs and alternative audio foundation backbones unexplored.

## Why read this

Researchers and engineers working on parameter-efficient adaptation of audio foundation models should read this to understand how audio-side continuous prompting complements text-side prompt tuning and bypasses the text-centric bottleneck.

## Code

- https://github.com/hyebin-c/aspl

## Applications

Resource-constrained or few-shot audio classification applications such as acoustic scene monitoring, environmental sound recognition, and emotion detection.

## Institutions / 機構

Korea Advanced Institute of Science and Technology

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- (link related pages by id as the wiki grows)
