---
id: zhou26i_interspeech
category: resources-evaluation
labels: [self-supervised]
institutions: ["Kyoto University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2436
pdf: https://www.isca-archive.org/interspeech_2026/zhou26i_interspeech.pdf
---

# Rethinking Speech Foundation Model Fine-tuning: Better SFT or Better Match?

*Wangjin Zhou, Yizhou Zhang, Yichi Wang, Tatsuya Kawahara*

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2436)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`

**TL;DR** — Supervised fine-tuning (SFT) outcomes for speech self-supervised models depend heavily on the specific pretrained instance and random seed rather than universal architectural ceilings, revealing that reported recipe gains often reflect "elicitation match."

## Key contributions

- Conducted a systematic empirical study evaluating eight SFT configurations across nine SSL checkpoints from wav2vec 2.0, HuBERT, and WavLM on three SUPERB classification tasks.
- Demonstrated that the identity of the top-performing SFT configuration varies across pretrained instances even when backbone architecture and model size are identical.
- Introduced the perspective of "capacity elicitation match" to explain that apparent SFT superiority measures activation reliability rather than an elevated performance ceiling.
- Identified optimization convergence anomalies and seed-dependent bidirectional transitions between full activation and under-activation under identical training recipes.

## Problem

Supervised fine-tuning (SFT) is the dominant paradigm for adapting self-supervised learning (SSL) speech representations to downstream classification, yet researchers typically evaluate new SFT methods on a single pretrained checkpoint. This practice implicitly assumes that the relative ranking of SFT recipes is stable across different checkpoints of comparable capability. However, this assumption ignores the intricate interactions between backbone architecture, pretraining data, and the adaptation recipe. As a result, small performance gains are often misinterpreted as method-level improvements in attainable performance ceilings when they actually stem from instance-dependent activation dynamics.

## Method

The paper parameterizes the SFT configuration space along two axes: feature mode ($m_f \in \{1, 2, 3\}$) and freeze mode ($m_z \in \{0, 1, 2\}$). Feature mode 1 uses the final-layer last hidden state; mode 2 uses a single intermediate layer fixed to the fourth layer from the end ($L-3$); mode 3 uses a weighted-sum fusion across all transformer layers. Freeze mode 0 fine-tunes the entire network and task head; mode 1 freezes only the convolutional front-end while tuning all transformer layers; mode 2 freezes the convolutional front-end and the first $N=4$ transformer layers, fine-tuning the remaining layers and the task head.

Experiments use standard SUPERB classification pipelines and hyperparameters held constant within each task, running on a single NVIDIA H20 GPU for roughly 10,000 total GPU hours. Evaluation relies on the official evaluation scripts and built-in evaluators. Statistical significance for top-group determination is assessed using paired exact McNemar tests at a 95% confidence level ($\alpha=0.05$).

## Experimental setup

Evaluated on three SUPERB speech classification tasks: intent classification (IC), emotion recognition (ER), and speaker identification (SID). Utilizes nine SSL checkpoints across three families (wav2vec 2.0, HuBERT, and WavLM) with model sizes ranging from ~95M to ~317M parameters. A two-seed protocol is employed: all settings use a default seed (1337), and representative base-scale models (wav2vec2-base-960h, hubert-base-ls960, wavlm-base) are rerun with seeds 2048 and 7395.

## Results

Across all tasks and models, relative rankings of SFT variants are highly unstable when swapping pretraining checkpoints, with top-group configurations changing even when architecture and size are held constant. For instance, on the SID task with wav2vec2-base-960h, $F_1-Z_2$ achieves an accuracy of 0.7833 while other modes experience convergence anomalies down to 0.0006, whereas large-scale models like hubert-large-ll60k on ER show all eight configurations performing in the statistically indistinguishable top group (e.g., ranging tightly around 0.71 to 0.73). Multi-seed experiments demonstrate that identical configurations can unpredictably flip between complete failure (under-activation) and top-tier success solely due to random seed initialization.

| System / Condition | SID Acc | IC Acc | ER Acc |
|---|---|---|---|
| wav2vec2-base ($F_1-Z_2$) | 0.7833 | 0.9963 | 0.7005 |
| wav2vec2-base ($F_2-Z_1$) | 0.0006* | 0.9955 | 0.7060 |
| hubert-base ($F_1-Z_2$) | 0.8353 | 0.9958 | 0.6765 |
| hubert-base ($F_2-Z_1$) | 0.8753 | 0.9960 | 0.7032 |
| wavlm-base ($F_2-Z_0$) | 0.7237 | 0.9958 | 0.6664 |
| wavlm-base ($F_1-Z_0$) | 0.1139* | 0.9818 | 0.5410 |

## Limitations

The study focuses exclusively on speech classification tasks from the SUPERB benchmark and does not evaluate sequence-to-sequence tasks like ASR or TTS. The findings are restricted to base- and large-scale encoder models, leaving ultra-large foundation models or generative speech LMs unexplored. Furthermore, the analysis is limited to three random seeds for representative checkpoints due to high compute costs.

## Why read this

Speech ML researchers and engineers evaluating fine-tuning recipes or proposing new SFT variants should read this paper to understand that single-checkpoint benchmarks are prone to misleading conclusions. It provides a rigorous framework using McNemar tests and multi-seed evaluations to distinguish true performance improvements from random activation matching.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guidelines for robust evaluation of speech representation learning, downstream adaptation of self-supervised models for classification tasks.

## Institutions / 機構

Kyoto University

**Funding / 經費:** JST BOOST

## Related

- (link related pages by id as the wiki grows)
