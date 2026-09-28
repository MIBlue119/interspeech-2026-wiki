---
id: someki26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2698
---

# ESPnet3: Infrastructure for Scalable Speech and Audio Research in the Foundation Model Era

**TL;DR** — ESPnet3 is a redesigned, modular speech research framework that cuts per-epoch training time, improves GPU utilization at scale, and lets new models and datasets be integrated with only a few dozen lines of extra code.

## Problem

Modern speech research increasingly involves large datasets, complex models, and diverse experimental workflows, but existing frameworks require substantial engineering effort to support such large-scale experiments.

## Method

ESPnet3 is built on a modular system architecture with configuration-driven dataset composition and unified Python-based workflows, introducing a DataOrganizer abstraction for flexible dataset integration and dataset sharding for memory-efficient large-scale training, while allowing lightweight recipe-specific stage overrides.

## Results

In OWSM pretraining experiments, ESPnet3 reduces per-epoch training time by 21.1 minutes compared to ESPnet2 and achieves over 80% GPU utilization in multi-node training; fine-tuning experiments show new models and datasets can be integrated with about 46 lines of additional code; it will be publicly released with model checkpoints and training logs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Large-scale, foundation-model-era speech and audio research infrastructure for labs building and comparing many models across many datasets.

## Related

- (link related pages by id as the wiki grows)
