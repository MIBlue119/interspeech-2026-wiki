---
id: kuan26_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1111
pdf: https://www.isca-archive.org/interspeech_2026/kuan26_interspeech.pdf
---

# Improving Text-to-Audio Instruction Following via Fine-Grained Feedback from Audio-Aware Large Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/kuan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1111)

**TL;DR** — The paper introduces ALLM-Judged Preference Optimization (AJPO), a framework that leverages audio-aware large language models as fine-grained judges to supervise text-to-audio generation for multi-event presence and temporal order.

## Problem

Current text-to-audio (TTA) models frequently fail to follow complex textual instructions that mandate multiple sound events and specific temporal progressions. This failure stems from training objectives and evaluation metrics like CLAPScore and FAD that prioritize global perceptual quality and coarse semantic similarity over instruction-level event correctness. Consequently, models often miss secondary sounds or reverse event sequences without incurring penalties on standard similarity metrics.

## Method

The authors propose AJPO, which operates in three stages: verifying ALLMs as judges, instruction-level scoring, and direct preference optimization (DPO). For each textual prompt, an underlying TTA model generates multiple candidate audio clips. Off-the-shelf audio-aware large language models (ALLMs) assess each candidate by checking sound event presence (producing an aggregated binary existence score) and temporal ordering (quantified using Kendall's Tau rank correlation). Samples satisfying both criteria are labeled as preferred, while violating samples serve as rejects to construct structured preference pairs for DPO training.

## Results

The framework is evaluated across existing benchmarks, synthetic multi-event datasets derived from ESC-50 (MultiEventTemporal-2/3/4), and S3Bench, a newly introduced narrative benchmark for evaluating multi-event temporal instruction following. Experiments demonstrate that AJPO significantly improves event completeness, temporal ordering accuracy, and joint instruction-following metrics across these benchmarks while preserving competitive baseline audio quality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building advanced text-to-audio generation systems for multimedia production, storytelling, and sound design requiring strict adherence to multi-event narratives and temporal choreography.

## Limitations

The framework's performance relies on the intrinsic judging reliability and stability of off-the-shelf audio-aware large language models.

## Related

- (link related pages by id as the wiki grows)
