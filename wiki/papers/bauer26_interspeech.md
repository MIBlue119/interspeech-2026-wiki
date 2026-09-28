---
id: bauer26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2523
pdf: https://www.isca-archive.org/interspeech_2026/bauer26_interspeech.pdf
---

# VAD to the Bone: Ultra-Tiny Speech Activity Detection for Edge Deployment

[PDF](https://www.isca-archive.org/interspeech_2026/bauer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bauer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2523)

**TL;DR** — The paper introduces kiloVAD, an ultra-tiny, convolution-only voice activity detection model that achieves 0.850 AUC on AVA-Speech with 2.1 k parameters under strictly causal 200 ms evaluation.

## Problem

Prior compact voice activity detection models rely on non-standard components like custom learnable filterbanks, recurrent units, or specialized activations that complicate embedded deployment and prevent sharing standard Mel frontends with downstream tasks. Furthermore, many lightweight models evaluate using non-causal sliding windows with heavy overlap, which overstates streaming performance and introduces high latency incompatible with always-on edge requirements.

## Method

kiloVAD utilizes a purely convolutional architecture operating on standard Mel spectrograms, featuring an input adapter layer, depthwise separable convolutions, a residual block, a dilated block, and temporal global average pooling. To compress the model, the authors apply per-layer structured magnitude pruning optimized via Optuna with a multi-objective search, followed by self-distillation fine-tuning using an unpruned teacher. For low-bit execution, they propose an angle-based quantization-aware training method that freezes full-precision class weights as prototypes and applies an align-repel cosine similarity objective to mitigate quantization-induced angular errors.

## Results

Evaluated causally on the AVA-Speech dataset with a 200 ms context window, the unpruned baseline achieves 0.862 AUC, while the pruned version reaches 0.850 AUC with only 2.1 k parameters and 44 k MACs. Per-layer structured pruning stably compresses the model down to 622 parameters (0.831 AUC) without layer collapse, outperforming uniform global pruning. The proposed angle-based QAT outperforms standard STE-based QAT by 1 to 4 percent under INT4 quantization.

## Code

- https://huggingface.co/spaces/kiloVAD-demo

## Applications

Speech and ML engineers can deploy kiloVAD as an always-on front-end trigger for resource-constrained edge devices such as smart speakers, hearables, and IoT hardware.

## Limitations

The evaluation relies on frame-level causal classification without temporal smoothing mechanisms.

## Related

- (link related pages by id as the wiki grows)
