---
id: zhang26l_interspeech
category: audio-understanding
labels: [dataset-or-benchmark-release, generative-model]
institutions: ["Hunan University", "Yuelushan Center for Industrial Innovation"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-882
pdf: https://www.isca-archive.org/interspeech_2026/zhang26l_interspeech.pdf
---

# CTMusic: A Traditional Chinese Instrumental Music Dataset Towards Text-to-Music Generation

*Zixing Zhang, Yimin Cao, Haotian Guo, Bin Wang, Jing Han*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-882)

**Category:** `audio-understanding` · **Labels:** `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — CTMusic introduces the first text-audio paired dataset for traditional Chinese instrumental music (741 pairs, 42.7 hours), and proposes SA-TTT, which integrates Test-Time Training layers into Stable Audio Open to significantly improve genre fidelity and text alignment.

## Key contributions

- Constructed CTMusic, the first dedicated text-audio paired dataset for traditional Chinese instrumental music, comprising 741 validated pairs and 42.7 hours of audio across solo and ensemble configurations.
- Formulated a structured three-paragraph human annotation template focusing on instrumentation, musical progression/timbre, and emotion/use-cases, applied by conservatory graduates.
- Proposed an asymmetric data augmentation pipeline using DeepSeek-V3 to paraphrase ensemble text descriptions, mitigating data scarcity and increasing textual diversity.
- Designed SA-TTT by integrating Test-Time Training (TTT) layers into the diffusion transformer backbone of Stable Audio Open to better capture fine-grained dynamics and ornamentations.

## Problem

Current text-to-music generative models like MusicGen, MusicLM, and Stable Audio are predominantly trained on Western music genres (electronic, pop, rock), with non-Western genres accounting for only 5.7% of existing public datasets. This cultural bias severely restricts models from generating stylistically accurate traditional Chinese music, which features intricate ornamentations, evolving textures, and subtle rhythmic nuances. Previous efforts like CCMusic or MusicMamba focus on classification or symbolic generation rather than direct text-to-audio generation, primarily due to the scarcity of well-annotated text-audio pairs.

## Method

The base architecture builds on Stable Audio Open, which uses a Variational Autoencoder (VAE) for waveform-latent conversion, a pre-trained T5-base text encoder, and a 24-block Diffusion Transformer (DiT) backbone conditioned on text embeddings, timing, and timesteps. To capture complex traditional Chinese instrumental dynamics, Test-Time Training (TTT) layers are inserted sparsely into the final block of every four consecutive Transformer blocks (six TTT layers total). These TTT layers are placed immediately after the cross-attention layer, gated with a learnable vector initialized to 0.1 to prevent degradation from random initialization, and utilized non-causally via the bidirectional trick.

The training regimen adopts a two-stage progressive strategy: Stage 1 fine-tunes the model on the solo subset (35.59 hours, 12 instrument types) for 14,000 steps to master basic timbres and melodies; Stage 2 fine-tunes on the ensemble subset (7.11 hours) for 6,000 steps to learn multi-instrument interplay and dynamic textures. Optimization utilizes the AdamW optimizer with a batch size of 16, a learning rate of 5e-5 for LoRA parameters (applied to all self- and cross-attention layers with a rank of 128), and 1e-4 for the newly added TTT layers, while keeping VAE and T5-base frozen.

## Experimental setup

Evaluated on the CTMusic dataset consisting of 741 samples (601 solo, 140 ensemble) totaling 42.7 hours, split into a test set of 60 solo samples (5 per instrument) and 30 ensemble samples. Compared against pre-trained Stable Audio Open (SA-pretrained) and Stable Audio Open fine-tuned with LoRA on CTMusic (SA-LoRA). Metrics include objective FD_openl_3, KL_passt, and CLAP_score, alongside subjective Mean Opinion Scores (MOS) for Overall Quality (OVL) and Text Alignment (TA) assessed by 20 participants on a 5-point Likert scale.

## Results

In stage 1 (solo subset evaluation), SA-pretrained achieves an FD_openl_3 of 315.23, KL_passt of 1.61, CLAP of 0.32, OVL of 2.95, and TA of 1.63. Fine-tuning via SA-LoRA drastically improves performance, cutting FD_openl_3 to 170.44 and KL_passt to 0.59, while raising OVL to 3.22 and TA to 3.26. The proposed SA-TTT further pushes performance to an FD_openl_3 of 156.77, KL_passt of 0.47, CLAP of 0.38, OVL of 3.49, and TA of 3.38.

In stage 2 (ensemble subset evaluation), SA-pretrained scores 279.02 (FD_openl_3), 0.84 (KL_passt), 3.04 (OVL), and 1.62 (TA). SA-LoRA improves this to 155.43 (FD_openl_3), 0.43 (KL_passt), 3.61 (OVL), and 3.37 (TA). SA-TTT achieves the best results with an FD_openl_3 of 137.49, KL_passt of 0.39, CLAP of 0.51, OVL of 3.86, and TA of 3.55, demonstrating the effectiveness of TTT layers on complex multi-instrument interplay.

| System/Condition | FD_openl_3 ↓ | KL_passt ↓ | CLAP_score ↑ | OVL ↑ | TA ↑ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stage 1 (Solo Set)** |
| SA-pretrained | 315.23 | 1.61 | 0.32 | 2.95 | 1.63 |
| SA-LoRA | 170.44 | 0.59 | 0.36 | 3.22 | 3.26 |
| **SA-TTT (Ours)** | **156.77** | **0.47** | **0.38** | **3.49** | **3.38** |
| **Stage 2 (Ensemble Set)** |
| SA-pretrained | 279.02 | 0.84 | 0.40 | 3.04 | 1.62 |
| SA-LoRA | 155.43 | 0.43 | 0.47 | 3.61 | 3.37 |
| **SA-TTT (Ours)** | **137.49** | **0.39** | **0.51** | **3.86** | **3.55** |

## Limitations

The dataset scale is relatively small (741 samples, ~42 hours), limiting the variety of extreme acoustic variations and ultra-rare regional styles. The evaluation is focused entirely on instrumental music without addressing vocal genres like traditional Chinese opera or folk singing. Compute constraints required sparse insertion of TTT layers and LoRA fine-tuning rather than full network adaptation.

## Why read this

Read this paper if you are working on domain adaptation or architectural modifications for generative audio models encountering data scarcity in non-Western musical traditions. The study provides a clear blueprint for constructing niche music datasets and integrating Test-Time Training layers into Diffusion Transformer backbones.

## Code

- https://frei-2.github.io/CTMusic

## Applications

Culturally nuanced text-to-music generation engines, video scoring tools for traditional Chinese media, and educational platforms for Chinese musical composition.

## Institutions / 機構

Hunan University, Yuelushan Center for Industrial Innovation

**Funding / 經費:** National Natural Science Foundation of China, National Science and Technology Major Project of China, Science and Technology Innovation Program of Hunan Province, Guangdong Basic and Applied Basic Research Foundation, Shenzhen Natural Science Foundation, Project of Yuelushan Center for Industrial Innovation

## Related

- (link related pages by id as the wiki grows)
