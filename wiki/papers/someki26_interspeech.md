---
id: someki26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2698
pdf: https://www.isca-archive.org/interspeech_2026/someki26_interspeech.pdf
---

# ESPnet3: Infrastructure for Scalable Speech and Audio Research in the Foundation Model Era

[PDF](https://www.isca-archive.org/interspeech_2026/someki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/someki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2698)

**TL;DR** — ESPnet3 is a modular speech and audio research framework featuring configuration-driven dataset composition and sharded iteration, reducing per-epoch OWSM pre-training time by 22.2% compared to ESPnet2.

## Problem

Modern speech research increasingly utilizes multi-million-hour datasets and billion-parameter foundation models, but legacy toolkits tightly couple experimental logic with framework internals. This high coupling causes excessive engineering overhead when integrating heterogeneous corpora, applying parameter-efficient fine-tuning, or scaling to distributed multi-node hardware.

## Method

ESPnet3 introduces a Hydra-based DataOrganizer for declarative dataset composition and rank-aware dataset sharding for lazy-loaded, memory-efficient iteration across distributed workers. It provides a centralized orchestration layer via a BaseSystem abstraction that separates framework internals from recipe-specific logic. The framework supports PyTorch Lightning training and integrates third-party parameter-efficient fine-tuning methods natively.

## Results

Evaluated on OWSM-V4 base model (102M parameters) pre-training across a 4-node, 16-GPU H100 setup using ~320k hours of speech data, ESPnet3 achieves over 80% multi-node GPU scaling efficiency. Compared to ESPnet2, it cuts per-epoch training time from 95.3 to 74.2 minutes (a 21.1-minute relative reduction) and reduces dataset refresh time from 311.5 to 13.1 seconds. Additionally, CPU RAM overhead for dataset metadata drops from 35.9 GB to 73.1 MB through shard-based lazy loading.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing large-scale speech foundation models, multi-task audio systems, or performing domain-specific fine-tuning on massive audio corpora.

## Related

- (link related pages by id as the wiki grows)
