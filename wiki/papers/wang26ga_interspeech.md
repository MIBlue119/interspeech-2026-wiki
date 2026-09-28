---
id: wang26ga_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3043
pdf: https://www.isca-archive.org/interspeech_2026/wang26ga_interspeech.pdf
---

# Clinically-Supervised Hierarchical LoRA-MoE: A Parameter-Efficient Framework for Severity-Aware Dysarthric Speech Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/wang26ga_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26ga_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3043)

**TL;DR** — The paper proposes a clinically-supervised hierarchical LoRA-MoE framework for dysarthric speech assessment, achieving macro F1 scores of 94.54% (binary detection) and 61.55% (5-class severity classification) using a frozen WavLM backbone.

## Problem

Automatic dysarthria severity assessment suffers from severe data scarcity and high acoustic heterogeneity across speakers and pathology levels. Standard self-supervised learning (SSL) models tend to overfit or catastrophically forget when fully fine-tuned on small medical datasets, while conventional parameter-efficient fine-tuning (PEFT) methods like standard LoRA apply uniform transformations that fail to capture fine-grained severity differences.

## Method

The architecture freezes a WavLM-Large backbone and introduces a hierarchical design: lower layers use a shared LoRA adapter for general acoustic modeling, while deeper layers employ Mixture-of-Experts (MoE) LoRA modules for severity-specific patterns. A router uses temporal attention pooling on intermediate features to produce utterance-level representations, guided by a clinically-supervised loss aligned with severity annotations alongside a load-balancing penalty. The framework is trained via multi-task objectives including cross-entropy with label smoothing and specialized temporal variability data augmentation simulating articulatory interruptions.

## Results

Evaluated on the UA-Speech corpus using a strict speaker-independent One-Speaker-per-Severity (OSPS) 5-fold cross-validation protocol. In the 5-class severity task using WavLM, the proposed LoRA-MoE achieves 64.32% accuracy and 61.55% macro F1, outperforming full fine-tuning (62.30% acc, 57.94% F1) and standard LoRA (58.49% acc, 55.02% F1). In the 2-class binary detection task, it reaches 95.14% accuracy, 96.59% AUC, and 94.54% F1. Ablations on shared layer depth (N) reveal an inverse-U performance trend peaking at N=9 shared layers out of 24.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and health engineers building diagnostic and rehabilitation monitoring tools, or robust front-end front-ends for atypical speech recognition systems.

## Limitations

Evaluated exclusively on the UA-Speech English corpus; future work is required to extend it to continuous severity scoring and multimodal integration.

## Related

- (link related pages by id as the wiki grows)
