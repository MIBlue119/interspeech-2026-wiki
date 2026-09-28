---
id: he26_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-602
pdf: https://www.isca-archive.org/interspeech_2026/he26_interspeech.pdf
---

# TTBA: Spatial Prompted Text to Binaural Audio Generation Using Transformer

[PDF](https://www.isca-archive.org/interspeech_2026/he26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-602)

**TL;DR** — TTBA is a discrete-token-based autoregressive transformer framework for text-to-binaural audio generation that achieves controllable spatial localization and high semantic fidelity using cross-arranged channel encoding and spatial prompt conditioning.

## Problem

Mainstream text-to-audio systems almost exclusively generate monaural or non-spatialized stereo audio, while existing mono-to-binaural rendering techniques suffer from limited content flexibility and spatial drift. Generating high-quality binaural audio directly from simple textual instructions is traditionally complex and costly, requiring tedious manual positioning and mixing inside a digital audio workstation.

## Method

The model utilizes a pre-trained T5-large text encoder and a spatial prompt encoder that maps user-defined source triplets (start direction, end direction, and scalar motion speed) into continuous embeddings fused via multi-head attention. Audio is tokenized using a pre-trained monaural Enencodec, where left and right channels are fused in a cross-arranged discrete representation space to capture inter-channel dependencies. An autoregressive Transformer audio language model (24 layers, hidden dimension 1536) predicts the combined token sequence. Training employs a dual-objective loss combining cross-entropy on joint tokens and a knowledge distillation loss from a larger monaural teacher model (48 layers), alongside classifier-free guidance.

## Results

Evaluated on the BEWO-1M dataset across Single Static, Double Static, Single Dynamic, and Mixed subsets using metrics including CLAPscore, FAD, FDopenl3, KLpasst, and interaural error metrics (DILD, DITD, DIACC) against baselines like Stable-audio-open and SpatialSonic. TTBA outperforms competing approaches across quantitative metrics and subjective Mean Opinion Scores for overall quality, text relevance, and spatialization quality. Ablations confirm that removing monaural knowledge distillation hurts semantic content accuracy, whereas removing spatial prompt encodings severely degrades spatial metrics like DILD.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and content creators in virtual reality, augmented reality, gaming, and 360-degree video production can use this model to automatically synthesize immersive binaural audio with precise directional movement directly from text descriptions and spatial parameters.

## Limitations

The paper does not explicitly state hard scope bounds, though spatial realism could potentially be extended to even more complex multi-source audio environments.

## Related

- (link related pages by id as the wiki grows)
