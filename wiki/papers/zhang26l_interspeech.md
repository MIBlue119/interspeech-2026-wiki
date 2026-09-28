---
id: zhang26l_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-882
pdf: https://www.isca-archive.org/interspeech_2026/zhang26l_interspeech.pdf
---

# CTMusic: A Traditional Chinese Instrumental Music Dataset Towards Text-to-Music Generation

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-882)

**TL;DR** — The paper introduces CTMusic, a 42-hour text-music dataset of traditional Chinese instruments, and proposes SA-TTT, which integrates test-time training layers into Stable Audio Open to improve generation quality.

## Problem

Current text-to-music generation models exhibit a cultural bias, with non-Western genres making up less than six percent of existing training data. Specifically, traditional Chinese music is underexplored because there are no dedicated text-audio paired datasets available. Constructing such resources is challenging due to scattered recordings, intricate performance styles, and the need for culturally nuanced descriptions.

## Method

The authors curate CTMusic with 741 text-music pairs spanning over 42 hours across solo and ensemble traditional Chinese instrumental music. Audio clips are harvested from professional digital albums and video platforms, screened via automated scripts (PANNs) and human review, segmented under 400 seconds, and normalized to -14 LUFS. Text annotations follow a structured three-paragraph template covering instrumentation, musical progression, and emotion/context, with DeepSeek-V3 used for ensemble text augmentation. For generation, they build SA-TTT by inserting Test-Time Training (TTT) layers into 6 of the 24 blocks of Stable Audio Open's Diffusion Transformer backbone, specifically after cross-attention layers, gated with a learnable vector initialized to 0.1 and using a bidirectional non-causal formulation.

## Results

Evaluated on CTMusic test sets using Fréchet Distance (FDopenl3), Kullback-Leibler divergence (KLpasst), CLAP score, and subjective metrics (Overall quality OVL, Text Alignment TA), the proposed SA-TTT model outperforms both pre-trained Stable Audio Open and LoRA-tuned baselines. In stage 1 (solo subset), SA-TTT achieves an FDopenl3 of 156.77, KLpasst of 0.38, CLAP score of 3.49, OVL of 3.38, and TA of 3.55 (improving over SA-LoRA's FD of 170.44 and CLAP of 3.22). In stage 2 (ensemble subset), SA-TTT further reduces FDopenl3 to 137.49 and increases CLAP score to 3.86, compared to SA-LoRA's FD of 155.43 and CLAP of 3.61.

## Code

- https://frei-2.github.io/CTMusic

## Applications

Speech and ML engineers building culturally diverse music generation systems, as well as composers and content creators working with traditional Chinese music.

## Limitations

The dataset scope is currently limited to instrumental music, omitting vocal genres.

## Related

- (link related pages by id as the wiki grows)
