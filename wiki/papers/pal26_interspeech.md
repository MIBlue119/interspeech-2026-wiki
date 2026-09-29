---
id: pal26_interspeech
category: asr
labels: [low-resource]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2497
pdf: https://www.isca-archive.org/interspeech_2026/pal26_interspeech.pdf
---

# Two-stage semi-supervised learning with pseudo-labels: A case study on Northern Sámi ASR

*Priyanshi Pal, Yaroslav Getman, Kristiina Ojala, Tamás Grósz, Mikko Kurimo*

[PDF](https://www.isca-archive.org/interspeech_2026/pal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2497)

**Category:** `asr` · **Labels:** `low-resource`

**TL;DR** — This paper investigates semi-supervised learning and pseudo-labeling for Northern Sámi ASR, demonstrating that a two-stage fine-tuning strategy (unfiltered pseudo-labels followed by human-labeled data) substantially improves a smaller model's out-of-domain generalization without extra manual labels. It achieves a drop in word error rate down to 28.52% on the 282utt test set compared to 32.06% for the supervised baseline.

## Key contributions

- Systematic evaluation of WER-based multi-teacher model agreement filtering vs. retaining all pseudo-labels for low-resource ASR.
- Proposal and validation of an order-sensitive two-stage fine-tuning schedule (pseudo-labels followed by gold-labeled data) that outperforms single-step mixed training.
- Comprehensive error analysis examining character-level confusions, dialectal/compounding variants, and the amplification of teacher biases in low-resource agglutinative settings.

## Problem

Northern Sámi is an endangered, morphologically rich agglutinative language with roughly 20,000 speakers and scarce transcribed corpora, creating a heavy bottleneck for supervised ASR training. While Self-Supervised Learning helps, smaller parameter-efficient models heavily lag behind larger counterparts. Existing semi-supervised methods like iterative pseudo-labeling, confidence filtering, or language model integration either risk domain overfitting, discard useful acoustic diversity, or propagate systematic errors.

## Method

The study builds upon two wav2vec 2.0 foundation models pre-trained on 22,400 hours of KAVI broadcast data: a small 95M parameter model (12 transformer blocks) and a large 317M parameter model (24 transformer blocks). Unlabeled speech comprises roughly 75 hours from Sámi Parliament recordings containing code-switching and dialectal variations. For pseudo-labeling, predictions from both models on the unlabeled set are filtered using an agreement threshold (WER < 10%), yielding ~28 hours of high-confidence text, alongside the full 75-hour unfiltered set (PL-Full). Single-stage training mixes human-labeled (HL) and pseudo-labeled data in the same batch, whereas the two-stage recipe trains sequentially—either first on HL and then on PL, or crucially, first on all pseudo-labels (PL-Full) to learn broad acoustic representations and then fine-tuned on 20 hours of gold-standard transcriptions for calibration.

Optimization uses the AdamW optimizer with a learning rate of 5e-4, a 0.25 warmup ratio with linear decay, and a batch size of 16 on a single NVIDIA V100 GPU (32 GB VRAM). Early stopping based on an early validation loss minimum is applied to prevent overfitting. The system intentionally omits an external language model to avoid biasing the acoustic model toward restricted text domains during out-of-domain evaluation.

## Experimental setup

Experiments use 20 hours of supervised Parliament data for the baseline, 75 hours of unlabeled Parliament data for pseudo-labeling, a 1-hour in-domain validation split, and three out-of-domain test sets: 282utt (85 mins of mixed read/spontaneous speech), YLE Sámi Podcast (1 hour of spontaneous speech), and UIT-SME (8 hours of TTS recordings). Evaluation metrics are Word Error Rate (WER) and Character Error Rate (CER). Models are trained for up to 60 epochs with early stopping.

## Results

The 20-hour supervised baseline yields a WER of 43.07% (16.50% CER) on the Parliament validation set, 32.06% WER on 282utt, 34.45% WER on YLE podcasts, and 24.52% WER on UIT-SME. Training the small model on the full unfiltered pseudo-label set combined with a second-stage human label fine-tuning (PL-Full + HL 2-stage) yields the best performance across out-of-domain sets, dropping WER to 39.25% (Parliament val), 28.52% (282utt), and 29.84% (YLE podcast), while tightening score variance across utterances.

In contrast, the mixed HL + PL-Filtered training approach degrades performance, producing high substitution errors due to data distribution conflicts. Agreement-based filtering (PL-Filtered) underperforms unfiltered training (PL-Full) by discarding difficult acoustic variations, leading to higher deletion rates. When matching pseudo-label volume to supervised data via random sampling [PL-Full (capped)], no performance gains are observed, confirming that scale and diversity outweigh strict confidence pruning in this setup.

| System | Labeled Data (h) | Parl. Val WER (%) | 282utt WER (%) | YLE Podcast WER (%) | UIT-SME WER (%) |
|---|---|---|---|---|---|
| HL [baseline] | 20 | 43.07 | 32.06 | 34.45 | 24.52 |
| PL-Filtered | 28 | 44.94 | 35.35 | 35.17 | 31.60 |
| PL-Full | 75 | 42.03 | 32.03 | 32.92 | 27.61 |
| PL-Filtered + HL (2-stage) | 28 + 20 | 40.36 | 30.49 | 31.13 | 24.80 |
| PL-Full + HL (2-stage) | 75 + 20 | 39.25 | 28.52 | 29.84 | 24.80 |
| Teacher (Large Model) | 20 | 33.32 | 22.29 | 26.07 | 16.78 |

## Limitations

The study is scoped to a single low-resource agglutinative language (Northern Sámi) using a single round of pseudo-labeling without external language models or data augmentation techniques like Mixup. Pseudo-labeling directly inherits and reinforces teacher model blind spots, leading to poor recognition of rare characters (e.g., ä, ö, ø, č) and loanword/code-switching artifacts (e.g., w, å).

## Why read this

Speech researchers and engineers working on low-resource or agglutinative ASR should read this to understand how unconstrained pseudo-labeling and sequencing order impact domain generalization. It offers a practical blueprint for bootstrapping smaller student models using larger teacher checkpoints.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated transcription and speech recognition pipelines for endangered, low-resource, or morphologically rich minority languages.

## Institutions / 機構

Aalto University, INESC-ID, Instituto Superior Técnico, Walton Institute, South East Technological University

**Funding / 經費:** Business Finland, Finnish Cultural Foundation

## Related

- (link related pages by id as the wiki grows)
