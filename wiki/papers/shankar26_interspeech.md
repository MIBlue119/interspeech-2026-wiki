---
id: shankar26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-822
pdf: https://www.isca-archive.org/interspeech_2026/shankar26_interspeech.pdf
---

# GC-LoRA: Gated Convolutional LoRA for Parameter-Efficient Acoustic Adaptation

[PDF](https://www.isca-archive.org/interspeech_2026/shankar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shankar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-822)

**TL;DR** — GC-LoRA introduces a Conformer-style gated convolutional bottleneck into Transformer attention projections for parameter-efficient acoustic domain adaptation, achieving up to 10.9% WER reductions over standard LoRA.

## Problem

Transformer-based Speech Foundation Models perform poorly when encountering acoustic distribution shifts like environmental noise, telephony bandlimiting, dialectal variations, or child speech because global self-attention lacks localized context modeling. While standard parameter-efficient fine-tuning (PEFT) methods update few parameters, linear low-rank adaptations fail to capture fine-grained temporal structures essential for resolving domain-specific variations.

## Method

The method proposes Gated Convolutional LoRA (GC-Lora), which embeds a Conformer-inspired convolutional module inside the low-rank residual pathway specifically targeting the attention output projection matrix (Wo). Given input features compressed via down-projection matrix A, the architecture applies a pointwise convolution, a Gated Linear Unit (GLU) for dynamic feature selection, a 1D depthwise convolution for temporal context, Group Normalization, and a Swish activation. A second pointwise convolution mixes channels before scaling and projecting back via matrix B to combine with the frozen pretrained weights. Using a rank of r=8, kernel size of k=31, and alpha of 16, GC-LoRA updates only 447k parameters on a Whisper backbone.

## Results

Evaluated on AMI (acoustically degraded), Switchboard (bandlimited telephony), CORAAL (African American English dialects), and MyST (child speech) datasets using a Whisper-medium backbone. GC-LoRA achieves test set WERs of 11.5% on AMI, 6.3% on Switchboard, 9.9% on CORAAL, and 8.6% on MyST, outperforming standard LoRA baselines while using approximately 46% fewer trainable parameters (447k vs. 829k). Ablations against standard LoRA applied to Wo, traditional bottleneck adapters, and single or multi-kernel Conv-LoRA variants confirm that the gated depthwise-separable design yields superior acoustic robustness.

## Code

- https://github.com/balaji1312/gc_lora

## Applications

Speech engineers adapting deployed Transformer-based Automatic Speech Recognition (ASR) systems to challenging downstream acoustic environments such as children's speech, accented/dialectal speech, or noisy telephony channels without incurring full fine-tuning costs.

## Related

- (link related pages by id as the wiki grows)
