---
id: eeckt26_interspeech
category: asr
labels: [efficient-on-device]
institutions: ["KU Leuven"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3169
pdf: https://www.isca-archive.org/interspeech_2026/eeckt26_interspeech.pdf
---

# Parameter-Efficient Continual Learning for Automatic Speech Recognition

*Steven Vander Eeckt, Hugo Van hamme*

[PDF](https://www.isca-archive.org/interspeech_2026/eeckt26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/eeckt26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3169)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — The paper introduces Continual Structured Singular Value Decomposition (CSSVD), a parameter-efficient continual learning method for speech recognition that restricts weight updates to low-energy tail subspaces and applies weight averaging, reducing forgetting and outperforming vision/NLP baselines.

## Key contributions

- Comprehensive empirical study evaluating recent parameter-efficient continual learning (PECL) methods from NLP and computer vision within an ASR framework.
- Proposed Continual Structured SVD (CSSVD), a novel PECL method tailored for speech foundation models that preserves dominant singular components while training approximate rotations in low-energy tail subspaces.
- Averaging mechanism combining task-specific rotation matrices to further mitigate catastrophic forgetting without requiring task identity at inference time.
- Ablation studies isolating the impact of tail-subspace restriction, rotation selection, and task-merging schedules.

## Problem

Large speech foundation models suffer from catastrophic forgetting when sequentially fine-tuned on downstream tasks, leading to dramatic performance degradation on previously mastered domains. While parameter-efficient continual learning (PECL) has been heavily studied in NLP (with LoRA variants) and computer vision, ASR research has largely relied on full data storage or regularization techniques without strict parameter budgets. Existing NLP/vision PECL methods fail to account for the unique spectral properties of speech foundation models, resulting in either severe forgetting or under-adaptation when transferred to multi-task ASR sequences.

## Method

CSSVD targets the weight matrices $W \in \mathbb{R}^{d_{out} \times d_{in}}$ of all linear layers (excluding output layers) in a pretrained ASR model. Prior to learning a new task, the singular value decomposition (SVD) of $W$ is computed, sorting singular values in decreasing order. The weight matrix is partitioned into a 'head' containing the top $d - k$ dominant singular directions (retaining major speech knowledge) and a 'tail' containing the bottom $k$ singular directions. Adaptation is strictly restricted to the tail subspace by introducing a learnable approximate rotation matrix $G := I - 2K$ (where $K$ is a skew-symmetric matrix), completely freezing the head subspace to prevent interference with initial tasks $T_0$.

For subsequent tasks $T_{i+1}$, a new SVD is computed to allow important singular directions that grew during previous tasks to migrate from the tail into the protected head. To prevent forgetting across tasks sharing the same tail subspace, task-specific rotations are combined via weight averaging using $W_{i+1} = (1 - \alpha) W_i + \alpha \tilde{W}_{i+1}$, with the averaging coefficient set to $\alpha = 1 / (i + 1)$. This formulation requires no explicit rescaling terms because the approximate orthogonal constraint implicitly captures scaling, and it operates entirely without task identity at inference time.

## Experimental setup

Experiments use the OWSM v3.2 small model (366.7M total parameters, comprising 9 E-Branchformer encoder layers and 9 Transformer decoder layers, pretrained on 180k hours of multilingual speech across 151 languages). Initial tasks $T_0$ consist of English, German, and Spanish from Common Voice. Experiment 1 uses Dutch subsets from the Corpus Gesproken Nederlands (CGN): Netherlands Dutch (NL) as $T_1$ and Belgian Dutch (VL) as $T_2$. Experiment 2 uses Belgian Dutch as $T_1$ and dialectal Flemish from the Southern Dutch Dialects corpus (DVL) as $T_2$. Baseline methods include Full Fine-Tuning, Separate Model (oracle), LoRA ($r=20$, ~9.3M parameters), LoRA+FTA, SSVD ($p=0.40$, ~9.0M parameters), MiLoRA, OPLoRA, BiLoRA, and EWC-LoRA. All PECL methods train approximately 9.0M parameters over 20 epochs using the Adam optimizer.

## Results

In Experiment 1, CSSVD achieves the lowest Average WER of 18.33%, significantly outperforming all PECL baselines and Full Fine-Tuning (28.94%), while recording a minimal Backward Transfer (BWT) of -1.9% (indicating almost negligible forgetting). By comparison, standard LoRA yields an Average WER of 43.66% with severe forgetting (BWT -35.7%), LoRA+FTA scores 19.64% (BWT -3.6%), and baseline SSVD scores 44.49%. In Experiment 2 (which incorporates highly challenging dialectal data DVL as $T_2$), CSSVD again achieves the best overall performance with an Average WER of 24.82% and BWT of -2.2%, improving the strongest baseline (LoRA+FTA at 26.58%) by 7% relative error and reducing its forgetting by over 50%.

Ablations demonstrate that skipping the weight-averaging step increases Average WER to 19.16% and BWT to -3.3%, while restricting updates to the top-k singular directions (standard SSVD) catastrophically degrades Average WER to 44.49%. The method does not win on raw adaptation speed for extreme dialect shifts (where unconstrained LoRA achieves slightly lower single-task WER on DVL at the expense of wiping out all prior tasks).

| System / Condition | Exp 1: Avg WER (%) | Exp 1: BWT (%) | Exp 2: Avg WER (%) | Exp 2: BWT (%) |
|---|---|---|---|---|
| Initial Model | 22.48 | — | 31.98 | — |
| Full Fine-Tuning | 28.94 | -18.2 | 48.95 | -41.0 |
| LoRA ($r=20$) | 43.66 | -35.7 | 74.70 | -72.5 |
| LoRA + FTA | 19.64 | -3.6 | 26.58 | -4.8 |
| SSVD ($p=0.40$) | 44.49 | -36.4 | 74.76 | -71.7 |
| CSSVD (Ours) | **18.33** | **-1.9** | **24.82** | **-2.2** |

## Limitations

The method uniformly applies a fixed hyperparameter budget ($p=0.40$) across all linear layers without considering layer-specific sensitivity or acoustic relevance. Evaluation is restricted to incremental accent and dialect adaptation sequences (English/German/Spanish to Dutch variants/dialects) within a medium-sized OWSM architecture, leaving scalability to massive 10B+ parameter speech foundation models and non-linguistic tasks (such as speaker verification or emotion recognition) unexplored.

## Why read this

Speech and ML researchers focusing on parameter-efficient adaptation of foundation models will find this a compelling blueprint for resolving catastrophic forgetting without storing task-specific checkpoints or auxiliary data. It provides rigorous empirical evidence that spectral subspace routing (targeting low-energy tail vectors) vastly outperforms standard NLP/vision LoRA-based continual learning adaptations in speech domains.

## Code

- https://github.com/StevenVdEeckt/pecl-for-asr

## Applications

On-device speech recognition systems requiring continual adaptation to user accents, local dialects, or domain-specific vocabulary streams without cloud data retention or catastrophic forgetting of base models.

## Institutions / 機構

KU Leuven

**Funding / 經費:** Research Foundation Flanders

## Related

- (link related pages by id as the wiki grows)
