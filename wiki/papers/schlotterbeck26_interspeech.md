---
id: schlotterbeck26_interspeech
category: self-supervised-learning
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2946
pdf: https://www.isca-archive.org/interspeech_2026/schlotterbeck26_interspeech.pdf
---

# Content–Speaker Trade-offs in Continued Self-Supervised Pre-Training Across SSL Paradigms for Multilingual Speech

[PDF](https://www.isca-archive.org/interspeech_2026/schlotterbeck26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/schlotterbeck26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2946)

**TL;DR** — Continued self-supervised pre-training (CPT) on multilingual data improves content-related downstream tasks like ASR while causing a systematic, consistent degradation in speaker diarization performance across discrete-unit models.

## Problem

While continued pre-training (CPT) is widely used to adapt speech models to new domains, existing research has largely focused on contrastive architectures rather than discrete-unit models, and rarely examines task specialization or catastrophic forgetting in multitask setups. This leaves a gap in understanding how CPT affects representations across different self-supervised learning (SSL) paradigms when applied to diverse, web-crawled multilingual corpora. Addressing this is crucial for practitioners adapting pre-trained models to low-resource or domain-shifted audio without inadvertently destroying important non-content capabilities like speaker discrimination.

## Method

The study investigates CPT across three SSL architectures—HuBERT-base (95M), WavLM base+/large (97M/317M), and OmniASR (300M contrastive)—using 100-hour and 500-hour language-balanced subsets curated from the Unsupervised People’s Speech (UPS) corpus via VAD density and language-scarcity scoring. For discrete-unit models, k-means pseudo-labels (typically 500 clusters from the 9th layer) are recomputed on the target audio stream and a cross-entropy masked prediction objective is resumed, while the contrastive OmniASR updates its codebook on-the-fly. The paper also ablates pseudo-label design choices by comparing embedding-based targets against traditional 39-dimensional MFCC-based targets, varying clustering layers (6th, 9th, 12th), and cluster sizes (300, 500, 1000).

## Results

Evaluated on the UPS Challenge held-out test set, models were tested on language identification (Macro-F1), speech recognition (CER), and speaker diarization (Adjusted Rand Index, ARI). Results show that CPT improves content metrics like CER and language ID, but content gains exhibit high variance across seeds and data scales (e.g., HuBERT-base CER ranges from 0.55 to 0.74 across seeds). Conversely, speaker diarization (ARI) degrades consistently across all discrete-unit models (e.g., HuBERT-base drops from 0.76 to 0.32, WavLM-large from 0.76 to 0.38), whereas contrastive OmniASR slightly improves ARI from 0.37 to 0.42. A pseudo-label ablation reveals that embedding-based labels favor content tasks, whereas MFCC-based labels preserve speaker identity at the expense of content performance. Catastrophic forgetting measured via linear CTC probes on LibriSpeech shows variable WER degradation (+1.26 pp to +8.03 pp) for discrete-unit models, but an improvement (-12.86 pp) for OmniASR.

## Code

- https://github.com/dannersm/ups-continuous-pretraining

## Applications

Speech engineers and ML practitioners adapting pre-trained speech models to low-resource or domain-shifted multilingual datasets will use these insights to balance linguistic content gains against speaker-information retention.

## Limitations

Experiments were constrained by compute limits to single A100 GPUs, restricting multi-seed evaluations primarily to HuBERT-base while other model configurations relied on single runs.

## Related

- (link related pages by id as the wiki grows)
