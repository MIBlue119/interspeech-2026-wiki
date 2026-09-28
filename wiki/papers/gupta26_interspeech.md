---
id: gupta26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2849
---

# Closing the Modality Gap via Simplex-Constrained Representations

**TL;DR** — Moving multimodal contrastive embeddings from the unit sphere onto the probability simplex nearly eliminates the persistent gap between audio and text (or other modality) embeddings in models like CLIP and CLAP.

## Problem

Multimodal contrastive models such as CLIP and CLAP learn shared audio/text embedding spaces but their embeddings show a persistent modality gap — the two modalities cluster in different regions rather than truly overlapping.

## Method

The authors change the embedding domain from the unit sphere to the probability simplex, attaching lightweight softmax adapters and using Total Variation similarity so the simplex's nonnegative, unit-mass structure acts as a cross-modal calibration forcing both modalities into the same coordinate system.

## Results

The simplex-constrained approach reduces the centroid L2 modality gap by 97-99% across five multimodal retrieval benchmarks while matching or exceeding the retrieval performance of standard unconstrained embeddings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving audio-text (and other cross-modal) retrieval and grounding systems, such as CLAP-based audio search or captioning pipelines, by geometrically fixing embedding misalignment.

## Related

- (link related pages by id as the wiki grows)
