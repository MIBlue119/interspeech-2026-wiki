---
id: xu26b_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-650
pdf: https://www.isca-archive.org/interspeech_2026/xu26b_interspeech.pdf
---

# Enhancing BEST-RQ Pseudo-Label Quality Through Online Refinement for Automatic Speech Recognition

*Jingjing Xu, Zijian Yang, Mohammad Zeineldeen, Eugen Beck, Ralf Schlüter, Hermann Ney*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-650)

**TL;DR** — This paper proposes three online refinement modifications to the BEST-RQ self-supervised speech representation learning method—incremental PCA projection, iterative codebook centroid updates, and intermediate-layer codebook distillation—achieving a 12% relative word error rate reduction on Librispeech test-other.

## Key contributions

- Replaces the random static linear projection matrix in BEST-RQ's quantizer with an incremental PCA projection estimated online during the first training epoch.
- Introduces iterative codebook refinement, updating each codebook entry as the centroid of its assigned projected feature vectors during training.
- Adds a secondary codebook trained via codebook distillation, matching the temporal self-similarity matrix of intermediate Transformer/Conformer layers.
- Achieves performance comparable to multi-codebook ensembling (6 random codebooks) while cutting extra pretraining computational overhead.

## Problem

BEST-RQ relies on a static, randomly initialized linear projection and codebook to quantize low-level log-Mel features into online pseudo-labels, making the targets weak, unadapted to speech distributions, and highly sensitive to random seed initialization. While multi-round clustering models like HuBERT produce better targets, they are computationally heavy and require high disk storage. Prior work trying to fix BEST-RQ either adds multiple independent codebooks which substantially increases pretraining time, or fails to properly stabilize non-stationary intermediate representations.

## Method

The model uses a 12-block Conformer encoder with a VGG front-end operating on 80-dimensional log-Mel filterbank features (10ms shift, 4x time-downsampling). About 60% of frames are masked in spans of 16 frames for BERT-style masked prediction. To fix the weak quantizer, the random linear down-projection matrix is replaced with the top F' right singular vectors obtained via an incremental GPU-based PCA computed over input batches during the first training epoch only.

Next, the primary codebook (size 8192) is iteratively updated online: running sums and counts of projected features assigned to each codebook entry are tracked, and entries are updated periodically as centroids. Finally, a second smaller codebook (size 256) is introduced after 30% of training has elapsed. This codebook is updated using codebook distillation, minimizing the element-wise absolute difference between its temporal self-similarity matrix and that of intermediate Conformer layers (specifically layers 5-7, which balance phonetic and contextual properties). Distillation uses a loss scale of 0.5 and is applied only to unmasked frames.

Supervised fine-tuning uses Connectionist Temporal Classification (CTC) with 79 end-of-word augmented phonemes as targets. Decoding is performed via Viterbi search with a 4-gram word-level language model.

## Experimental setup

Unsupervised pre-training uses the full 960-hour Librispeech dataset for 30 epochs. Downstream supervised fine-tuning uses 100-hour Librispeech, 10-hour Libri-light, and 1-hour Libri-light splits for 30 or 100 epochs. Baselines include training from scratch, standard BEST-RQ, and BiRQ. Metrics include Word Error Rate (WER) on Librispeech/Libri-light dev-clean, test-clean, dev-other, and test-other sets. Implemented in RETURNN using a single H100 GPU.

## Results

Fine-tuning the fully enhanced model on the 100-hour split yields a WER of 8.8% on Librispeech test-other, compared to 10.1% for the standard BEST-RQ baseline (a 12% relative reduction) and 9.8% for BiRQ. On the highly constrained 1-hour supervised fine-tuning split, test-other WER drops from 16.9% (baseline) to 14.8%. 

Ablations show that each proposed addition (PCA projection, iterative refinement, and distillation) contributes a consistent 3-4% relative WER improvement. Earth Mover's Distance (EMD) analysis confirms that PCA and iterative refinement reduce inter-codebook variance from an initial average EMD of 0.99 down to 0.25, mitigating random initialization sensitivity. Distillation layer ablations indicate that intermediate layers (e.g., layers 5-7) outperform lower or higher layers.

| System | 100h test-clean | 100h test-other | 1h test-other |
|---|---|---|---|
| Scratch | 5.0% | 14.7% | 93.0% |
| BEST-RQ Baseline | 4.2% | 10.1% | 16.9% |
| + PCA Projection | 4.1% | 9.5% | 16.6% |
| + Iterative CB Refinement | 4.0% | 9.2% | 15.1% |
| + CB Distillation (Full) | 3.9% | 8.8% | 14.8% |
| BiRQ [21] | 4.2% | 9.8% | 16.0% |

## Limitations

The evaluation is restricted to English ASR datasets (Librispeech and Libri-light), leaving multilingual and low-resource non-English robustness unproven. The method relies on a fixed CTC decoding setup with a traditional n-gram language model rather than end-to-end sequence-to-sequence or autoregressive speech LLM decoders. The additional distillation codebook introduces a mild hyperparameter dependency regarding layer selection and loss scaling.

## Why read this

Speech researchers and engineers working on self-supervised representation learning who want to improve the pseudo-label quality of lightweight methods like BEST-RQ without paying the heavy computational tax of multi-round clustering (HuBERT) or multi-codebook ensembling.

## Code

- https://github.com/rwth-i6/returnn-experiments/tree/master/2026enhance-bestrq

## Applications

Automatic speech recognition, particularly in scenarios with limited supervised transcript data.

## Related

- (link related pages by id as the wiki grows)
