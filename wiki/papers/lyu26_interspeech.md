---
id: lyu26_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-995
pdf: https://www.isca-archive.org/interspeech_2026/lyu26_interspeech.pdf
---

# TriA Pipeline: A Large-Scale Automatic Audio Annotation Pipeline For Audio Classification In Specific Scenarios

[PDF](https://www.isca-archive.org/interspeech_2026/lyu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lyu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-995)

**TL;DR** — The paper introduces the TriA Pipeline, an automatic audio annotation framework that converts raw web audio into a large-scale training dataset spanning 2,130 hours and 431 classes, yielding relative accuracy gains of up to 3.97% on domestic audio classification tasks.

## Problem

Audio classification research is heavily bottlenecked by the scarcity of large-scale, annotated data tailored to specific acoustic domains like domestic environments. Existing general-purpose datasets lack sufficient target-domain coverage, while specialized datasets are severely limited in scale (often comprising only a few thousand clips). This annotation bottleneck restricts the performance and generalizability of downstream acoustic recognition systems.

## Method

The TriA Pipeline operates in four sequential stages: Standardization (converting heterogeneous inputs to 24 kHz mono WAV with normalized loudness and amplitude), Audio Activity Detection (using the auditok tool based on scenario-specific Event and Silent Critical Times), Audio Event Detection (employing the BEATsiter3+ model with local and global scanning windows to generate event annotations), and Filtering (retaining high-confidence segments using Audiobox Aesthetics Production Complexity and Production Quality indicators alongside CLAP text-audio similarity thresholds). The resulting TriA dataset comprises over 2,130 hours across 431 classes harvested from video streaming platforms. From this, domain-specific subsets termed TriAGK are partitioned using prior-knowledge-guided thresholds for tasks including general domestic, kitchen, and safety monitoring audio classification.

## Results

Evaluated on 284.7 hours of test data processed at a real-time factor (RTF) of 0.03 on an NVIDIA RTX 3090, the pipeline achieved a subjective annotation accuracy of 93.67%. When fine-tuning models on three domestic audio classification tasks (DESEDAC, Kitchen20, and Nonspeech7k), incorporating the automatically generated TriAGK subset alongside manually annotated data delivered average relative improvements of 3.97% in accuracy and 3.35% in Macro-F1 compared to using manual data alone. Fine-tuning models exclusively on TriAGK achieved performance competitive with training purely on human-labeled baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio machine learning engineers can use this pipeline to automatically scale up training data for specialized audio event detection, domestic activity recognition, and environmental sound classification tasks.

## Limitations

Automatic annotation introduces a lower CLAP similarity score for overall reliability compared to strictly human-annotated corpora like Kitchen20 and Nonspeech7k, and aggressive filtering thresholds reduce class diversity and total dataset duration.

## Related

- (link related pages by id as the wiki grows)
