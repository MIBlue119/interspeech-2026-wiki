---
id: schlotterbeck26_interspeech
category: asr
labels: [multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2946
pdf: https://www.isca-archive.org/interspeech_2026/schlotterbeck26_interspeech.pdf
---

# Content–Speaker Trade-offs in Continued Self-Supervised Pre-Training Across SSL Paradigms for Multilingual Speech

*Danner Schlotterbeck, Alessandro Huaman, Juan Gomez*

[PDF](https://www.isca-archive.org/interspeech_2026/schlotterbeck26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/schlotterbeck26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2946)

**Category:** `asr` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — A controlled empirical study across SSL paradigms reveals that continued pre-training (CPT) on multilingual speech systematically trades speaker-discriminative information for linguistic content gains in discrete-unit models. CPT improves content metrics like character error rate with high run-to-run variance, while speaker diarization degrades consistently.

## Key contributions

- Evaluated continued pre-training across three distinct SSL architectures (HuBERT, WavLM, OmniASR) using shared curated datasets and evaluation tasks.
- Proposed a lightweight, metadata-driven VAD and language-scarcity curation pipeline to build 100 h and 500 h subsets from the million-hour Unsupervised People's Speech (UPS) corpus.
- Identified a systematic content-speaker trade-off showing that discrete-unit models suffer massive speaker diarization drops under CPT while contrastive models resist this degradation.
- Demonstrated through pseudo-label ablations that embedding-based k-means labels drive ASR gains whereas MFCC-based labels preserve speaker identity but harm content tasks.

## Problem

While continued pre-training (CPT) adapts self-supervised learning (SSL) models to domain-shifted audio, prior work has predominantly focused on contrastive frameworks like wav2vec 2.0 while leaving discrete-unit models (such as HuBERT and WavLM) underexplored. For discrete-unit models, CPT requires recomputing offline pseudo-labels on target data, and it remains unclear whether multitask setups induce catastrophic forgetting. Resolving these questions is critical to ensure speech models adapt safely to low-resource and domain-shifted multilingual environments without silently degrading auxiliary capabilities like speaker identification.

## Method

The study curates 100 h and 500 h multilingual subsets from the 1 million hour UPS corpus via a two-stage pipeline filtering shards by VAD density (>70% threshold) and inverse language-frequency scarcity scores, feeding non-overlapping 10-second chunks into sequential training streams. For discrete-unit models (HuBERT-base with 95M params, WavLM base+ with 97M params, and WavLM-large with 317M params), new pseudo-labels are assigned by streaming chunks through the model, extracting 9th-layer hidden representations (499 frames per chunk), and clustering them via an online MiniBatchKMeans with 500 clusters. The contrastive model (OmniASR, a 300M parameter wav2vec 2.0 variant) updates natively via its internal product quantizer.

All models are trained for 5 epochs using span-based masking (8% start points, length 10, masking ~57% of frames) with the AdamW optimizer, linear warmup over 1,500 steps, and a learning rate of 5×10^-5. HuBERT and WavLM employ a cross-entropy objective on masked positions mapping hidden states (768 or 1024 dims) to 500 cluster logits, with WavLM utilizing intra-batch utterance mixing (10% probability, random SNR between -5 and 5 dB) to predict clean pseudo-labels from noisy inputs. OmniASR optimizes a combined contrastive loss over 100 negatives and a codebook diversity loss weighted at 0.1.

Inference relies on evaluating downstream task performance on held-out test sets across language identification, speaker diarization, and automatic speech recognition, alongside a linear CTC probe on LibriSpeech to measure catastrophic forgetting.

## Experimental setup

Experiments use 100 h and 500 h subsets curated from the MLCommons Unsupervised People's Speech (UPS) dataset. Models evaluated include HuBERT-base (95M), WavLM base+ (97M), WavLM-large (317M), and OmniASR (300M), compared against off-the-shelf base checkpoints. Downstream metrics are Macro-F1 for language ID, Adjusted Rand Index (ARI) for speaker diarization, Character Error Rate (CER) for ASR, and Word Error Rate (WER) via a linear CTC probe on LibriSpeech train-clean-100. HuBERT-base experiments ran on a single NVIDIA A100 40 GB GPU, while WavLM-large and OmniASR used an A100 80 GB GPU.

## Results

Off-the-shelf HuBERT-base improved in language ID Macro-F1 from 0.56 to 0.67 and CER from 0.72 to 0.65 after CPT on the 100 h subset, but its speaker diarization Adjusted Rand Index (ARI) collapsed from 0.76 to 0.32. Similarly, WavLM base+ saw ARI drop from 0.59 to 0.31, and WavLM-large saw ARI drop from 0.76 to 0.38, whereas contrastive OmniASR maintained or slightly increased ARI from 0.37 to 0.42. Multi-seed evaluations on HuBERT-base showed that content metrics like CER exhibit extremely high variance across runs (ranging from 0.55 to 0.74, mean 0.65 ± 0.10), whereas the speaker information loss (ARI drop) is systematic and low-variance (mean 0.32 ± 0.05). In the pseudo-label ablation, using MFCC-based labels instead of embedding-based labels degraded Macro-F1 (0.27) and CER (0.79) while largely preserving ARI (0.72).

| System / Condition | F1 ↑ | CER ↓ | ARI ↑ |
|---|---|---|---|
| HuBERT-base (Baseline) | .56 | .72 | .76 |
| HuBERT-base (100 h CPT) | .67 | .65 | .32 |
| WavLM-base+ (Baseline) | .71 | .69 | .59 |
| WavLM-base+ (100 h CPT) | .72 | .68 | .31 |
| OmniASR (Baseline) | .12 | .94 | .37 |
| OmniASR (100 h CPT) | .06 | .84 | .42 |

## Limitations

The study is restricted by compute constraints to 100 h and 500 h subsets and short 5-epoch training schedules rather than full-corpus pre-training. Multi-seed evaluations were limited to HuBERT-base due to resource limits, leaving content-gain variances for larger models unmapped. The evaluation focuses exclusively on three downstream tasks and a single held-out test split, lacking broader benchmarks like ML-SUPERB.

## Why read this

Speech and ML researchers working on self-supervised domain adaptation will find this paper essential for understanding the hidden architectural trade-offs between discrete-unit and contrastive models. It provides concrete guidance on avoiding catastrophic performance drops in speaker tasks when applying continued pre-training.

## Code

- https://github.com/dannersm/ups-continuous-pretraining

## Applications

Adapting speech recognition models to low-resource or domain-shifted audio environments while mitigating catastrophic forgetting.

## Institutions / 機構

Factored AI

**Funding / 經費:** Factored AI

## Related

- (link related pages by id as the wiki grows)
