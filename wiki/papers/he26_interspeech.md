---
id: he26_interspeech
category: tts
labels: [generative-model]
institutions: ["Harbin Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-602
pdf: https://www.isca-archive.org/interspeech_2026/he26_interspeech.pdf
---

# TTBA: Spatial Prompted Text to Binaural Audio Generation Using Transformer

*Changjun He, Lianyu Zhou, Yukun Qian, Shiyun Xu, Wenjie Zhang, Mingjiang Wang, Weiping Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/he26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-602)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — TTBA is an end-to-end text-to-binaural audio generation model that jointly models semantic content and spatial trajectories via a cross-arranged discrete token representation and a spatial prompt encoder, outperforming baseline models on multi-source spatial audio datasets.

## Key contributions

- A cross-arranged codebook fusing left and right channel discrete EnCodec tokens to jointly capture semantic content and inter-channel spatial dependencies.
- A spatial prompt encoder (SPE) mapping explicit source motion triplets (start direction, end direction, speed) into a continuous embedding fused via multi-head attention with T5 text features.
- A knowledge distillation and multi-loss training framework using a pre-trained 48-layer monaural teacher model to initialize and guide a 24-layer student model.
- Superior quantitative and perceptual performance on multi-source and dynamic binaural generation splits of BEWO-1M compared to Stable-audio-open and SpatialSonic.

## Problem

Mainstream text-to-audio models generate exclusively monaural or unconditioned stereo signals, failing to offer directional control or spatial perception required for virtual reality and immersive media. Existing spatial audio renderers convert mono tracks post-hoc using video or visual cues, while recent end-to-end diffusion models suffer from spatial drift, localization errors, and unstable binaural cues. TTBA addresses these shortcomings by providing a discrete-token-based, text-and-prompt-conditioned autoregressive generation pipeline.

## Method

TTBA consists of four main modules: a text encoder, a spatial prompt encoder (SPE), an audio encoder-decoder, and a Transformer-based audio language model (ALM). The text encoder uses T5-large (max length 128, dim 1536) to extract semantic representations. The SPE maps source spatial descriptors—parameterized as triplets of start direction, end direction, and scalar motion speed (quantized into five sectors: left, left-front, front, right-front, right)—through a two-layer MLP into a spatial embedding, which is then expanded and used as queries in multi-head attention to fuse with the text representation.

For audio discretization, a pre-trained monaural EnCodec neural encoder (4 codebooks, 2048 bins) tokenizes the left and right waveform channels into discrete sequences ($x_l, x_r \in \mathbb{Z}^{K \times D}$). These are interleaved via a cross-arranged strategy along the codebook dimension to form a unified joint token space fed into the ALM. The ALM is a 24-layer decoder-only autoregressive Transformer with a hidden dimension of 1536 and 24 heads.

The training pipeline leverages knowledge distillation from a pre-trained 48-layer monaural text-to-audio teacher model, whose parameters are halved to initialize the student. The objective combines cross-entropy loss over the joint left-right token prediction ($L_{CE}^{all}$) and a distillation loss ($L_{KD}$) that matches student representations against the repeated teacher codes. Classifier-free guidance (CFG) is used during training and inference to balance content fidelity and spatial controllability.

## Experimental setup

Evaluated on the BEWO-1M dataset containing over 1 million text-audio pairs (~2,800 hours), divided into Single Static (SS), Double Static (DS), Single Dynamic (SD), and Mixed (Mix) subsets. Compared against Stable-audio-open and SpatialSonic. Metrics include FD_openl3, FAD, KL_passt, CLAP score, and spatial error metrics DILD, DITD, and DIACC (mean absolute error of interaural level difference, interaural time difference, and interaural cross-correlation). Implemented with the Adam optimizer (lr = $5 \times 10^{-5}$, $\beta = (0.9, 0.999)$) and evaluated at 10K training steps.

## Results

On the DS subset, TTBA achieves an FD_openl3 of 81.97, FAD of 4.39, KL_passt of 2.19, and CLAP score of 0.35, outperforming SpatialSonic (FD_openl3 128.32, FAD 4.83). On the challenging Mix subset, TTBA scores 190.91 in FD_openl3 and 6.45 in FAD compared to SpatialSonic's 296.38 and 11.06, demonstrating superior capability in multi-source spatial text conditioning. Ablations reveal that removing knowledge distillation drastically hurts semantic metrics (e.g., Mix FD_openl3 degrades from 190.91 to 260.35), while removing the spatial prompt encoder (SPE) degrades spatial localization accuracy (DILD).

| Sub-Set | Model | FD_openl3 ↓ | KL_passt ↓ | CLAP score ↑ | FAD ↓ | DILD ↓ |
|---|---|---|---|---|---|---|
| SS | SpatialSonic [28] | 136.33 | 1.84 | 0.34 | 4.35 | 1.24 |
| SS | Ours | 104.2 | 1.99 | 0.30 | 5.12 | 1.13 |
| DS | SpatialSonic [28] | 128.32 | 2.20 | 0.32 | 4.83 | 0.59 |
| DS | Ours | 81.97 | 2.19 | 0.35 | 4.39 | 0.55 |
| Mix | SpatialSonic [28] | 296.38 | 3.47 | 0.19 | 11.06 | 0.90 |
| Mix | Ours | 190.91 | 3.42 | 0.30 | 6.45 | 0.72 |

## Limitations

The current evaluation focuses primarily on simplified categorical directional sectors (five discrete bins) and straightforward motion speeds, which may not capture highly complex acoustic room impulse responses or continuous 3D trajectories. The model's generalization is tied to the scope of the BEWO-1M dataset and relies heavily on a pre-trained monaural teacher model for knowledge transfer.

## Why read this

Speech and ML researchers working on generative spatial audio and audio language models should read this to see how cross-arranged discrete codebooks and spatial prompt encoders can enforce strict directional control in autoregressive transformers.

## Code

- https://spatialaudiodemo.github.io/TTBA/

## Applications

Virtual reality (VR), augmented reality (AR), spatial sound design in gaming, and automated 360-degree video production.

## Institutions / 機構

Harbin Institute of Technology

**Funding / 經費:** National Natural Science Foundation of China, Guangdong Basic and Applied Basic Research Foundation, Shenzhen Higher Education Institutions Stability Support Program, Key Research and Development Program of Xinjiang Uygur Autonomous Region

## Related

- (link related pages by id as the wiki grows)
