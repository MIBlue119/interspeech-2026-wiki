---
id: gupta26_interspeech
category: multimodal
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2849
pdf: https://www.isca-archive.org/interspeech_2026/gupta26_interspeech.pdf
---

# Closing the Modality Gap via Simplex-Constrained Representations

[PDF](https://www.isca-archive.org/interspeech_2026/gupta26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gupta26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2849)

**TL;DR** — Switching multimodal contrastive representation outputs from the unit sphere to a probability simplex via lightweight softmax adapters collapses the cross-modal centroid l2 gap by 97-99% while maintaining or improving retrieval performance.

## Problem

Multimodal contrastive models like CLIP, CLAP, and FLAVA map different streams into shared latent spaces, but suffer from a persistent modality gap where modality-wise distributions remain systematically offset. This separation miscalibrates cross-modal similarities, hurts retrieval quality, and distorts zero-shot decision boundaries. While various alignment objectives and architectural fusion strategies have been explored, it remains debated how output geometry alone dictates cross-modal separation.

## Method

The authors keep frozen pretrained backbones (LAION-CLAP for audio-text and FLAVA for image-text) and attach lightweight shared adapters—either linear layers or 2-layer MLPs—followed by a softmax projection to map pooled representations to the probability simplex (delta^(d-1)). Training uses a symmetric in-batch InfoNCE objective optimized with negative Total Variation distance rather than cosine similarity. Matched-capacity and matched-form baselines are evaluated, including Euclidean linear/MLP adapters, Euclidean cross-attention variants (XAttn), and multi-resolution Euclidean baselines (Matryoshka Representation Learning, MRL). To fairly compare gaps across domains, they introduce a geometry-adjusted metric (RelGap) that normalizes centroid separation by intra-modality spread.

## Results

Evaluated on five cross-modal benchmarks including Clotho, AudioCaps, SoundDescs, COCO, and Flickr30k. Adding softmax adapters reduced the centroid l2 gap by 97-99% across all datasets, with COCO dropping from 0.810 to 0.009 and Flickr30k dropping from 0.731 to 0.007 using MLP+Sfx. On SoundDescs, ReTreever achieved top retrieval performance with an NDCG@10 of 0.535/0.542 while keeping a minimal centroid gap of 0.012 and the lowest RelGap of 0.097. Ablations separating cross-attention from output geometry reveal that Euclidean cross-attention models (XAttn) retain large gaps, proving that simplex output constraints drive the gap closure rather than shared attention capacity. Dimensional scaling analysis shows that Euclidean gaps grow with dimension while simplex gaps remain small.

## Code

- https://github.com/ServiceNow/retreever

## Applications

Speech, audio, and machine learning engineers building multi-modal retrieval systems, audio-text search engines, or vision-language models seeking aligned embedding spaces without retraining large backbones.

## Related

- (link related pages by id as the wiki grows)
