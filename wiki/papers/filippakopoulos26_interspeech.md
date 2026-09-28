---
id: filippakopoulos26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1299
pdf: https://www.isca-archive.org/interspeech_2026/filippakopoulos26_interspeech.pdf
---

# Segregate, Refine, Integrate: Decomposing Multimodal Fusion for Sentiment Analysis

[PDF](https://www.isca-archive.org/interspeech_2026/filippakopoulos26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/filippakopoulos26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1299)

**TL;DR** — SeRIn is a multimodal language model fusion scheme for sentiment analysis that structurally decouples modality-specific refinement from cross-modal integration, achieving state-of-the-art results on CH-SIMS and CMU-MOSEI across all metrics.

## Problem

Multimodal sentiment analysis requires simultaneously refining modality-specific signals and modeling cross-modal interactions, but standard tensor and attention methods entangle these objectives within a single fusion operation. While disentanglement approaches and auxiliary objectives encourage modality-specific representations, they place no structural restriction on multimodal fusion during the forward pass, meaning specialization relies on learned penalties rather than architectural constraints.

## Method

The method introduces SeRIn (Segregate, Refine, Integrate), built on a frozen pretrained language model augmented with learnable fusion tokens. It segregates fusion tokens into disjoint modality-specific pathways (audio, visual, and an audiovisual pathway that reads but never writes back to unimodal streams) using parameter-free modality-constrained attention masks. It refines each pathway against its encoder context via internally gated cross-attention (IGCA) and self-attention (IGSA) modules using content-dependent element-wise gates. Full cross-modal integration is deferred entirely to a final prediction step using a standard late-fusion mechanism. Interaction topology is treated as a design axis while keeping fusion depth and token count fixed to prior DeepMLF optima.

## Results

SeRIn is evaluated on the CH-SIMS and CMU-MOSEI benchmarks, improving over all baseline metrics on both datasets. Ablations demonstrate that performance gains are driven by the proposed structural interaction topology rather than added parameter capacity, as capacity-matched models lacking these architectural constraints fall below DeepMLF performance. Gate analysis under visual corruption further demonstrates emergent, unsupervised modality reweighting.

## Code

- https://github.com/SeRIn-MSA

## Applications

Engineers and researchers building affective computing systems, conversational agents, and mental health assessment tools that require robust multimodal sentiment analysis.

## Related

- (link related pages by id as the wiki grows)
