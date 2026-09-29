---
id: gupta26_interspeech
category: speech-llm-dialogue
labels: [self-supervised]
institutions: ["Mila – Québec AI Institute", "ServiceNow", "McGill University", "Université Laval"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2849
pdf: https://www.isca-archive.org/interspeech_2026/gupta26_interspeech.pdf
---

# Closing the Modality Gap via Simplex-Constrained Representations

*Shubham Gupta, Siva Reddy, Perouz Taslakian, Valentina Zantedeschi, Cem Subakan*

[PDF](https://www.isca-archive.org/interspeech_2026/gupta26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gupta26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2849)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`

**TL;DR** — Replacing the standard spherical embedding domain with a probability simplex via lightweight softmax adapters eliminates 97-99% of the multimodal embedding gap across five retrieval benchmarks without hurting retrieval performance.

## Key contributions

- Proposes simplex-constrained adapters for multimodal retrieval that reduce centroid l2 modality gap by 97-99% across five audio-text and image-text benchmarks.
- Develops RELGAP, a geometry-adjusted gap measure normalizing centroid separation by intra-modality spread for fair comparisons across embedding domains.
- Isolates output geometry from architectural capacity by evaluating matched-capacity Euclidean and simplex baselines.
- Analyzes coarse-to-fine behavior and dimensional scaling, showing Euclidean gaps grow with representation dimension while simplex gaps remain small.

## Problem

Multimodal contrastive models like CLIP and CLAP suffer from a persistent modality gap where embeddings from different modalities are systematically offset, which can miscalibrate similarities and distort zero-shot decision boundaries. Prior mitigation strategies modify objective functions, introduce complex cross-attention architectural fusion, or use adversarial alignment, but these often add substantial overhead or fail to isolate geometric causes. Understanding and resolving this gap purely through output representation geometry is critical for principled, lightweight cross-modal calibration.

## Method

The paper uses frozen pretrained multimodal encoders (LAION-CLAP for audio-text, FLAVA for image-text) and attaches a lightweight shared adapter (either a linear layer or a 2-layer MLP) containing fewer than 1% trainable parameters. For Euclidean baselines, embeddings are normalized to the unit sphere S^{d-1} and scored using cosine similarity. For the proposed simplex-constrained approach, logits are projected to the probability simplex Delta^{d-1} via a softmax activation, yielding probability vectors invariant to global logit shifts, and scored using negative Total Variation (TV) distance (-0.5 ||p_u - p_v||_1). 

Training utilizes a symmetric in-batch contrastive loss (DPR-style InfoNCE) optimized with AdamW (learning rate 4e-4, batch size 64) for 200,000 steps with a learnable temperature parameter tau. To disentangle output geometry from cross-attention, the authors compare against XAttn (which uses ReTreever's shared cross-attention queries but outputs Euclidean cosine-scored embeddings) and ReTreever (which outputs multi-resolution simplex embeddings). Coarse-to-fine comparisons are also performed against Matryoshka Representation Learning (MRL).

Simplex constraints remove the rotational and sign-flip invariances of spherical domains, forcing both modalities to allocate a shared probability budget over identical coordinates. Estimating the Dirichlet concentration parameter alpha via moment matching reveals that learned high-dimensional representations reside in a sparse regime where baseline distances plateau rather than contract, preserving effective similarity scaling.

## Experimental setup

Evaluated on three audio-text datasets (Clotho, AudioCaps, SoundDescs) and two image-text datasets (MS-COCO Captions, Flickr30k). Baselines include frozen backbones, Euclidean Linear/MLP adapters, XAttn, MRL, and non-softmax variants. Metrics include Centroid l2 distance, Silhouette score, Relative Gap (RELGAP), and NDCG@10 for bidirectional retrieval.

## Results

Simplex-constrained models reduce centroid l2 modality gaps by 97-99% across all datasets; for instance, on MS-COCO, the MLP gap drops from 0.411 to 0.009 with softmax, and on Flickr30k from 0.246 to 0.007. Despite the dramatic gap collapse, retrieval performance (NDCG@10) matches or exceeds unconstrained Euclidean counterparts (e.g., ReTreever achieves top audio-text retrieval on SoundDescs with T2A of 0.535 and A2T of 0.542). Furthermore, RELGAP confirms that this alignment represents true semantic convergence rather than mere distance scaling.

| System | Clotho T2A | Clotho A2T | SoundDescs T2A | SoundDescs A2T | COCO T2I | COCO I2T |
|---|---|---|---|---|---|---|
| Frozen Baseline | 0.259 | 0.436 | 0.273 | 0.250 | 0.630 | 0.529 |
| Linear (Euclidean) | 0.373 | 0.453 | 0.410 | 0.418 | 0.711 | 0.644 |
| MLP + Softmax (Simplex) | 0.361 | 0.438 | 0.507 | 0.499 | 0.674 | 0.594 |
| ReTreever (Simplex) | 0.381 | 0.464 | 0.535 | 0.542 | 0.694 | 0.613 |

## Limitations

The study is restricted to retrieval tasks and frozen backbones (LAION-CLAP and FLAVA), leaving full end-to-end training unexamined. The analysis focuses primarily on audio-text and image-text modalities, and applicability to larger-scale generative speech LLMs or discrete token spaces requires further verification.

## Why read this

Speech and ML researchers seeking a lightweight, geometrically principled method to eliminate modality gaps without altering core pre-trained backbones or adding heavy cross-attention layers should read this paper.

## Code

- https://github.com/ServiceNow/retreever

## Applications

Cross-modal speech-text retrieval, zero-shot audio classification, and multi-modal embedding alignment for downstream speech-language models.

## Institutions / 機構

Mila – Québec AI Institute, ServiceNow, McGill University, Université Laval

**Funding / 經費:** Natural Sciences and Engineering Research Council of Canada, Digital Research Alliance of Canada

## Related

- (link related pages by id as the wiki grows)
