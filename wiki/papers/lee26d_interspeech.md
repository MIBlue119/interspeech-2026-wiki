---
id: lee26d_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-639
pdf: https://www.isca-archive.org/interspeech_2026/lee26d_interspeech.pdf
---

# SAM: A Mamba-2 State-Space Audio-Language Model

[PDF](https://www.isca-archive.org/interspeech_2026/lee26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-639)

**TL;DR** — SAM is a State-Space Audio-Language Model integrating an EAT audio encoder with a Mamba-2 backbone, achieving 21.1 mAP on AudioSet and 17.6 SPICE on AudioCaps while matching or outperforming larger 7B transformer models.

## Problem

Audio-language models typically rely on transformer backbones whose attention mechanisms scale quadratically with sequence length, creating heavy computational bottlenecks. While State-Space Models (SSMs) like Mamba offer linear-time scaling alternatives, replacing transformers with SSMs requires understanding how they interact with multi-dimensional audio token sequences and handle sequence length versus token information density.

## Method

SAM comprises an EAT-base audio encoder (88M parameters), a text encoder, a two-layer MLP connector, and a Mamba-2 LLM backbone available in 130M, 780M, and 2.7B parameter sizes. The audio features are formatted via concatenation, time-major, or frequency-major connector designs, incorporating boundary separator tokens to preserve positional structure. Models are trained on the OpenAQA dataset using a four-stage curriculum, autoregressive cross-entropy loss, and LoRA adapters applied to the in_proj and out_proj layers of each Mamba-2 block.

## Results

Evaluated on diverse zero-shot audio classification and captioning tasks, SAM-2.7B achieves 89.7 ESC-50 accuracy, 48.7 DCASE Mi-F1, 70.9 VocalSound accuracy, 21.1 mAP on AudioSet, and 17.6 SPICE on AudioCaps. Joint audio encoder finetuning yields substantial accuracy gains compared to frozen encoder baselines. Training with the newly introduced OpenReasonAQA dataset increases MMAU-Sound accuracy from 22.8 to 56.8, outperforming the Gemma3n-4B baseline.

## Code

- https://github.com/sam-audio-language-model/sam

## Applications

Speech and ML engineers building efficient on-device or resource-constrained multimodal audio understanding systems for speech, music, and sound event classification or reasoning.

## Limitations

SSM recurrent state capacity creates a bottleneck where uncompressed long token sequences yield lower effective ranks and poorer utilization in smaller model scales.

## Related

- (link related pages by id as the wiki grows)
