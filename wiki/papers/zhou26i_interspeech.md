---
id: zhou26i_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2436
pdf: https://www.isca-archive.org/interspeech_2026/zhou26i_interspeech.pdf
---

# Rethinking Speech Foundation Model Fine-tuning: Better SFT or Better Match?

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2436)

**TL;DR** — Supervised fine-tuning (SFT) recipe comparisons for speech foundation models depend heavily on the specific pretrained instance and random seed rather than reflecting universal performance ceilings.

## Problem

Researchers commonly interpret small downstream performance gains under a single pretrained checkpoint as evidence that one SFT recipe achieves a higher attainable performance ceiling. However, this practice assumes that the relative effectiveness of SFT methods is stable across different pretrained model checkpoints. Overlooking the interaction between the SFT recipe and the specific pretrained instance undermines the external validity of single-checkpoint evaluations.

## Method

The authors systematically evaluate eight SFT configurations across nine self-supervised speech checkpoints from wav2vec 2.0, HuBERT, and WavLM families, using base-scale (approx. 95M params) and large-scale (approx. 317M params) models. The SFT configuration space combines three feature modes (final-layer hidden state, single intermediate layer at L-3, and weighted-sum transformer layer fusion) with three freeze modes (fully fine-tuned, freezing only the convolutional front-end, and freezing the front-end plus the first 4 transformer layers). Experiments are run across three SUPERB classification tasks—intent classification, emotion recognition, and speaker identification—using a standardized training pipeline on NVIDIA H20 GPUs with multi-seed repetitions.

## Results

Evaluated on SUPERB intent classification (IC), emotion recognition (ER), and speaker identification (SID) using paired exact McNemar tests at alpha = 0.05. Results show that swapping the pretrained SSL checkpoint alters the relative ordering of SFT methods and the identity of top-group recipes. Multi-seed repetitions (seeds 1337, 2048, and 7395) on base-scale checkpoints reveal bidirectional transitions where identical configurations switch between complete convergence failures (under-activation) and top-group performance. In some extreme cases, such as hubert-large-ll60k on ER, all eight configurations yield statistically indistinguishable performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers evaluating self-supervised speech representation adaptation methods for downstream classification tasks.

## Limitations

The study focuses specifically on downstream classification tasks within the SUPERB benchmark and does not evaluate sequence-to-sequence generation tasks.

## Related

- (link related pages by id as the wiki grows)
