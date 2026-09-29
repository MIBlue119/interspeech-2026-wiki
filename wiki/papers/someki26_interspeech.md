---
id: someki26_interspeech
category: asr
labels: [efficient-on-device]
institutions: ["Carnegie Mellon University", "Brno University of Technology", "Instituto Superior Técnico", "Hanyang University", "Hitachi Astemo", "Shanghai Jiao Tong University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2698
pdf: https://www.isca-archive.org/interspeech_2026/someki26_interspeech.pdf
---

# ESPnet3: Infrastructure for Scalable Speech and Audio Research in the Foundation Model Era

*Masao Someki, Alexander Polok, Carlos Carvalho, Chyi-Jiunn Lin, Da-Hee Yang, Jiatong Shi, Jinchuan Tian, Nelson Enrique Yalta Soplin, Samuele Cornell, Siddhant Arora, Francisco Teixeira, Wei Wang, William Chen, Alberto Abad, Chenda Li, Shinji Watanabe, Wangyou Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/someki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/someki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2698)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — ESPnet3 is a modernized speech and audio research framework featuring configuration-driven data organization, dataset sharding, and modular Python workflows, reducing OWSM per-epoch training time by 21.1 minutes compared to ESPnet2 while scaling past 80% GPU utilization.

## Key contributions

- Configuration-driven DataOrganizer built on Hydra for modular dataset composition and ingestion.
- Shard-level dataset iteration reducing dataset metadata RAM usage from 35.9 GB to 73.1 MB.
- Centralized BaseSystem orchestration separating execution stages from lightweight Python/YAML experiment recipes.
- Native integration of external libraries for parameter-efficient fine-tuning (PEFT, e.g., LoRA) and HuggingFace models.

## Problem

As speech research transitions to foundation models involving multi-million-hour corpora and billion-parameter systems, legacy toolkits like ESPnet2 and ESPnet-EZ suffer from tightly coupled experimental logic, heavy recipe orchestration scripts, and memory bottlenecks when iterating over massive datasets. Specifically, handling heterogeneous datasets previously required extensive recipe-level glue code and manual format conversions, while adding features like LoRA to existing models required modifying dozens of core framework files. This creates a high engineering barrier that slows down exploratory experimentation and multi-task pipeline development.

## Method

ESPnet3 restructures the framework into a configuration-driven pipeline using Hydra for YAML declarations and PyTorch Lightning for training mechanics. The DataOrganizer abstraction unifies heterogeneous corpora into a standard PyTorch Dataset dictionary output without pipeline code modifications. To handle million-hour scales, ESPnet3 implements rank-aware shard rotation where $S$ shards are distributed across $R$ workers, utilizing lazy-loading via HuggingFace Datasets to avoid full-split initialization overhead.

The core execution is orchestrated through a centralized BaseSystem class that implements standard stages such as train() and infer(), eliminating the complex shell and Perl orchestration scripts of ESPnet2. Recipe-specific modifications are handled by subclassing BaseSystem and writing lightweight Python entry points (e.g., a 70-line OWSM run.py versus 2,289 lines in ESPnet2). Integration of third-party architectures like Whisper and PEFT libraries (LoRA) is supported natively within this unified Pythonic workflow, keeping configuration logic declarative and cleanly separated from infrastructure code.

## Experimental setup

Evaluated using OWSM-V4 base model (102M parameters) pre-trained on ~320k hours of speech using a 4-node, 16-GPU setup (H100s with Slingshot interconnect), and fine-tuned on the 5k-hour FalAR European Portuguese parliamentary dataset using Whisper Large v3. Baselines include ESPnet2. Metrics include Word Error Rate (WER) on CHiME-4 and the CAMÕES benchmark, wall-clock time per optimizer update, epoch duration, CPU RAM memory overhead, and GPU utilization percentage.

## Results

ESPnet3 achieves an average epoch time of 74.2 minutes for OWSM-Base pre-training compared to 95.3 minutes for ESPnet2 (a 22.2% relative reduction), while cutting per-update time from 0.594s to 0.441s. Shard-based iteration drops dataset refresh time from 311.5 seconds to 13.1 seconds and memory overhead from 35.9 GB to 73.1 MB on a 16-GPU setup while maintaining >80% GPU utilization. On-the-fly data augmentation via DataOrganizer improves OWSM-Base WER on CHiME-4 from 12.84% to 12.53% at 350k updates. For fine-tuning Whisper Large v3 on the FalAR dataset, full fine-tuning yields a WER of 19.42% and LoRA (PEFT) yields 19.47% (compared to 22.65% zero-shot), while reducing required integration code to 46 lines.

| Framework / Setting | Update Time (s) | Epoch Time (min) | RAM Usage | Dataset Refresh (s) |
|---|---|---|---|---|
| ESPnet2 (OWSM-Base) | 0.594 | 95.3 | 35.9 GB | 311.5 |
| ESPnet3 (OWSM-Base) | 0.441 | 74.2 | 73.1 MB | 13.1 |

## Limitations

The evaluation primarily demonstrates systems-level efficiency (training speed, memory overhead, code complexity) rather than introducing novel speech modeling architectures. Model-specific fine-tuning metrics are restricted to ASR tasks (Whisper on FalAR/CAMÕES and OWSM on CHiME-4), leaving comprehensive scaling validations across TTS, speech translation, and neural coding for future releases. Furthermore, multi-node scaling metrics are specifically shown for a 4-node H100 cluster with Slingshot interconnect, and behavior across more heterogeneous hardware configurations is not extensively quantified.

## Why read this

Read this paper if you are a speech researcher or systems engineer bogged down by legacy toolkit spaghetti code and looking to build or scale massive multi-dataset speech foundation models. It offers a blueprint for clean, modular framework design using Hydra and PyTorch primitives that drastically cuts down boilerplate engineering.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Scalable pre-training of multi-task speech foundation models and parameter-efficient fine-tuning (PEFT) of external models on custom domain corpora.

## Institutions / 機構

Carnegie Mellon University, Brno University of Technology, Instituto Superior Técnico, Hanyang University, Hitachi Astemo, Shanghai Jiao Tong University

**Funding / 經費:** Advanced Cyberinfrastructure Coordination Ecosystem: Services & Support, National Science Foundation, Ministry of Education, Youth and Sports of the Czech Republic

## Related

- [A Unified and Reproducible Experimentation Framework for Speech Understanding](peng26e_interspeech.md) — complementary · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
