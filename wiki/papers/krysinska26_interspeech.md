---
id: krysinska26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1040
pdf: https://www.isca-archive.org/interspeech_2026/krysinska26_interspeech.pdf
---

# Transitional Objective Learning with Connectionist Temporal Classification in Phoneme Recognition

*Izabela Krysińska, Mikołaj Morzy, Agnieszka Pludra*

[PDF](https://www.isca-archive.org/interspeech_2026/krysinska26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/krysinska26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1040)

**Category:** `asr`

**TL;DR** — Transitional Objective Learning (TOL) is a curriculum-learning framework that dynamically shifts training objectives from coarse-grained phonetic categories to fine-grained phonemes, mitigating CTC blank-token dominance and achieving relative Phoneme Error Rate reductions between 9.5% and 14.3%.

## Key contributions

- Introduces Transitional Objective Learning (TOL), a curriculum-learning framework for CTC-based phoneme recognition that utilizes concurrent loss objectives with dynamic granularity transitions.
- Eliminates the need for custom encoder architecture modifications, allowing TOL to be seamlessly applied to existing pretrained models like wav2vec 2.0.
- Formulates objective blending through a softmax-applied importance score function utilizing sigmoid and reverted-sigmoid schedules over training epochs.
- Demonstrates consistent relative Phoneme Error Rate (PER) reductions of 9.5% to 14.3% and significantly lower gradient variance across English, French, and Polish evaluation sets.

## Problem

Connectionist Temporal Classification (CTC) eliminates the requirement for frame-level annotations by marginalizing over latent alignments, but it suffers from severe blank-token dominance during early training phases. This 'suppression phase' creates flat loss landscapes, tiny gradient magnitudes, and delayed alignment learning because predicting the blank token aggressively minimizes early loss. Prior multi-task and hierarchical approaches rely on static auxiliary losses or require structural encoder modifications, failing to explicitly guide the optimization trajectory out of the blank-dominated regime via a temporally scheduled curriculum.

## Method

TOL concurrently utilizes $N$ distinct loss functions $L_i(t)$ corresponding to varying levels of acoustic abstraction, weighted dynamically at each epoch $t$ via weights $w_i(t)$ that sum to 1. The weights are derived using a Softmax function applied to importance scores $s_i(t)$, implementing either linear or sigmoid schedules ($s_i(t) = 1 / (1 + e^{-t})$). The total loss combines these objectives such that coarse-grained representations dominate initially, and fine-grained target phoneme objectives progressively take precedence.

The optimal auxiliary configuration discovered via grid search splits phonemes into three coarse categories: vowels, voiced consonants, and voiceless consonants. The fine-grained target loss uses the standard full phoneme inventory, while the auxiliary loss uses the 3-class phonetic grouping, balanced via a sigmoid schedule for the fine-grained loss and a reverted sigmoid schedule $(1 - w_i(t))$ for the auxiliary loss. 

By prioritizing broad phonetic classes early, TOL shortens the blank-dominated suppression phase, pushes the model into the peaking phase earlier, and provides smoother optimization pathways with reduced gradient norms and up to an order of magnitude lower gradient variance compared to standard fine-tuning.

## Experimental setup

Evaluated on TIMIT (English, wav2vec2-base), LnNor (Polish split, wav2vec2-XLSR), and Vibravox (French, wav2vec2-voxpopuli-fr) datasets. Compared against standard CTC fine-tuning and a random grouping ablation where phonemes were assigned to arbitrary classes. Metrics include Phoneme Error Rate (PER), validation loss, gradient norms, and gradient variance across 10 independent runs. Hyperparameters: learning rates of $1 	imes 10^{-5}$ or $1 	imes 10^{-4}$ and batch sizes of 16 or 32 optimized via grid search.

## Results

TOL achieves average PER reductions across all datasets: TIMIT drops from 0.049 to 0.044 (10.2% relative reduction, $p = .003$), LnNor drops from 0.084 to 0.076 (9.5% reduction, $p = .009$), and Vibravox drops from 0.063 to 0.054 (14.3% reduction, $p = .042$). Convergence is substantially accelerated, with TIMIT models converging by epoch 15 instead of 30, and LnNor converging by epoch 6 instead of 9. An ablation study using random phoneme groupings yields inferior performance (TIMIT PER 0.053, LnNor 0.092, Vibravox 0.206), proving that acoustically meaningful hierarchy is essential.

| Dataset | Baseline PER | TOL PER | Err. Red. |
|---|---|---|---|
| TIMIT | 0.049 ± .003 | 0.044 ± .002 | 10.2% |
| LnNor | 0.084 ± .006 | 0.076 ± .005 | 9.5% |
| Vibravox | 0.063 ± .012 | 0.054 ± .003 | 14.3% |

## Limitations

The current evaluation is restricted to a sigmoid transition schedule, a single set of four auxiliary objectives, and phoneme recognition tasks using wav2vec 2.0 backbones. Scope is bounded to three languages (English, French, Polish) and does not test scaling to full sequence-to-sequence ASR models with language models or token-level decoding. Further investigation is needed to explore alternative scheduling strategies and richer hierarchical linguistic groupings.

## Why read this

Speech researchers and engineers struggling with early-training instability or blank-token collapse in CTC-based models should read this paper to learn how a simple curriculum loss schedule can accelerate convergence and boost accuracy without altering model architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improved low-resource and standard phoneme recognition, phonetic analysis tools, and robust acoustic model pre-training initialization for downstream automatic speech recognition systems.

## Institutions / 機構

Poznan University of Technology, Pearson Central Europe

**Funding / 經費:** National Science Centre, Poland

## Related

- (link related pages by id as the wiki grows)
