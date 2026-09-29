---
id: wu26h_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1985
pdf: https://www.isca-archive.org/interspeech_2026/wu26h_interspeech.pdf
---

# SongBench: A Fine-Grained Multi-Aspect Benchmark for Song Quality Assessment

*Dapeng Wu, Shun Lei, Wei Tan, Guangzheng Li, Yunzhe Wang, Huaicheng Zhang, Lishi Zuo, Zhiyong Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1985)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — SongBench is a fine-grained, multi-aspect benchmark and expert-annotated dataset designed for song quality assessment across seven aesthetic dimensions, overcoming the rating saturation and ceiling effects of prior music evaluation frameworks. It achieves strong correlation with expert ratings (system-level LCC > 0.95) and successfully captures incremental quality gains across state-of-the-art text-to-song models.

## Key contributions

- Establishes a 7-dimensional song-specific evaluation framework reflecting real composition elements (Vocal, Instrument, Melody, Structure, Arrangement, Mixing, Musicality) to minimize semantic overlap and inter-dimensional coupling.
- Constructs the largest expert-annotated text-to-song dataset to date comprising 11,717 high-quality samples (~683.5 hours) from diverse open-source models, commercial systems, and real human references.
- Implements a rigorous two-stage expert calibration protocol (ranking tests, Pearson correlation, and gap scores) to select elite annotators and ensure reliable, consistent labeling.
- Demonstrates superior fine-grained aesthetic discernment over prior work (SongEval), avoiding score compression and achieving >60% accuracy in challenging intra-model pairwise comparisons.

## Problem

Evaluating modern text-to-song generation remains difficult because objective metrics like FAD, CLAP, and Phone Error Rate measure only distributional similarity or raw controllability rather than aesthetic and perceptual musical quality. Existing automated frameworks like MusicEval and AudioBox focus on short instrumentals or abstract universal domains, while the prior song-specific SongEval benchmark suffers from severe semantic overlap among dimensions and a 'ceiling effect' where top-tier models cluster tightly in saturated score brackets. This lack of fine-grained evaluative resolution and resistance to rating compression hinders reliable comparison, diagnostics, and optimization of rapidly evolving generative models.

## Method

The SongBench framework decouples song assessment into seven orthogonal atomic metrics: Vocal (clarity, pitch stability, techniques), Instrument (synthesis quality, realism), Melody (richness, memorability), Structure (section organization, transition logic), Arrangement (harmonic framework, orchestration), Mixing (track balance, spatial imaging), and Musicality (holistic artistic impact). Data collection synthesized 4,000 lyrics and 384 prompts using Hunyuan LLM, pairing them to yield 20,000 raw samples across Suno (v4, v4.5, v5), open-source systems (LeVo, SongBloom, ACE-Step), and 1,000 human copyrighted references processed via SongPrep. After rigorous expert calibration and multi-annotator filtering, 11,717 clean samples were retained.

The automated evaluation model uses the pre-trained MuQ self-supervised backbone to extract musical representations, optimized on an In-Distribution training/test split (95:5). Training uses 8 NVIDIA A100 GPUs with a batch size of 8, employing the AdamW optimizer and a CosineAnnealingLR scheduler with an initial learning rate of 1e-4. This design directly targets high-granularity score distributions to prevent label compression and capture subtle technical polish across incremental model iterations.

## Experimental setup

Evaluated on 11,717 high-quality samples (~683.5 hours, balanced 1:1 Chinese/English) split into 95% training and 5% ID test sets, alongside a 352-sample Out-of-Distribution (OOD) test set from external models (DiffRhythm 2, HeartMula, ACE-Step v1.5, MiniMax, Mureka, Suno v4.5+). Baseline models and systems include SongEval. Metrics comprise Mean Absolute Error (MAE), Pearson Linear Correlation Coefficient (LCC), Spearman’s Rank Correlation Coefficient (SRCC), and Kendall’s Tau (KTAU) at both utterance and system levels.

## Results

At the utterance level, the model achieves robust predictive stability with LCC and SRCC exceeding 0.78 for Melody, Arrangement, and Musicality, and a low Instrument MAE of 0.528. At the system level, performance surges with LCCs exceeding 0.95 and SRCCs between 0.89 and 0.96 across all dimensions. In comparative evaluations, SongEval exhibits a ceiling effect by assigning stagnant scores across progressive commercial iterations (e.g., Suno v4.5 to v5), whereas SongBench successfully tracks incremental quality improvements (Suno rising from 6.60 to 6.86; MiniMax leaping to 6.52). In intra-model AB testing on LeVo and Suno pairs, SongBench maintains over 60% accuracy compared to SongEval's near-random 43-55% performance.

| System / Condition | Melody | Arrangement | Musicality | Vocal | Instrument | Mixing | Structure |
|---|---|---|---|---|---|---|---|
| DiffRhythm 2 | 5.16 | 5.09 | 4.15 | 5.24 | 5.10 | 4.72 | 5.02 |
| LeVo | 5.10 | 5.23 | 4.33 | 5.56 | 5.87 | 5.18 | 5.08 |
| ACE-Step v1.5 | 6.11 | 6.31 | 5.12 | 6.17 | 6.37 | 6.12 | 6.09 |
| MiniMax 2.5 | 6.33 | 6.55 | 5.49 | 6.69 | 7.79 | 6.41 | 6.37 |
| Mureka V8 | 6.85 | 7.08 | 6.01 | 7.26 | 7.18 | 6.88 | 6.84 |
| Suno v5 | 6.80 | 7.11 | 5.96 | 7.28 | 7.13 | 6.96 | 6.81 |

## Limitations

The dataset is bounded by its dual-language coverage (strictly Chinese and English) and relies heavily on outputs synthesized from specific commercial architectures like Suno and select open-source models, which may constrain generalization to entirely different regional musical styles or niche genres not captured in the 44 style prompts. Furthermore, while expert calibration reduces subjective variance, human annotator bias can still introduce minor noise into fine-grained score gradients.

## Why read this

Researchers and engineers developing text-to-song generation models should read this to understand how fine-grained, decoupled musical evaluation can replace flawed coarse metrics and overcome the ceiling effects of legacy benchmarks like SongEval.

## Code

- https://github.com/Tencent/SongBench

## Applications

Diagnostic evaluation, hyperparameter tuning, and automated reward modeling for text-to-song generation systems.

## Institutions / 機構

Tsinghua University, Tencent

**Funding / 經費:** National Natural Science Foundation of China, Shenzhen Science and Technology Program

## Related

- (link related pages by id as the wiki grows)
