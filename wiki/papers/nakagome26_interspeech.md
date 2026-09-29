---
id: nakagome26_interspeech
category: audio-understanding
labels: [self-supervised]
institutions: ["LINE WORKS Corporation", "NAVER Cloud Corporation"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-360
pdf: https://www.isca-archive.org/interspeech_2026/nakagome26_interspeech.pdf
---

# MixProLAP: Mixture-Induced Uncertainty Modeling for Probabilistic Language-Audio Pretraining

*Yu Nakagome, Jaesong Lee, Soo-Whan Chung*

[PDF](https://www.isca-archive.org/interspeech_2026/nakagome26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nakagome26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-360)

**Category:** `audio-understanding` · **Labels:** `self-supervised`

**TL;DR** — MixProLAP is a probabilistic audio-language pretraining framework that models many-to-many cross-modal alignment ambiguities using additive waveform mixing and multi-level inclusion losses, outperforming deterministic CLAP baselines on zero-shot audio-text retrieval.

## Key contributions

- Replaces masking-based intra-modal uncertainty with additive audio waveform mixing to accurately construct semantic supersets without destroying transient acoustic cues.
- Proposes a text concatenation strategy ("A and B" / "A while B") to pair with audio mixtures, maintaining structural alignment across modalities.
- Introduces a multi-level inclusion (MLI) loss conditioned on mixing coefficients to enforce graded semantic uncertainty hierarchies.
- Demonstrates robust zero-shot audio-text retrieval improvements on both AudioCaps and ClothoV2 benchmarks compared to deterministic and masked probabilistic baselines.

## Problem

Conventional contrastive audio-language pretraining frameworks (like CLAP) rely on deterministic point embeddings, which enforce a strict one-to-one alignment assumption. This fails to capture real-world many-to-many relationships where a single acoustic scene can be described in diverse ways or contain multiple overlapping sounds, and hierarchical semantic inclusions (e.g., "heavy rain" entailing "rain") cannot be represented. While prior probabilistic methods like ProLAP attempted to use spectrogram patch masking to simulate uncertainty, masking often completely erodes transient events like gunshots or leaves ambient global semantics unchanged, breaking the required subset-inclusion assumptions. MixProLAP addresses this by using structured additive mixing to reliably generate semantic superset variations in the audio domain.

## Method

MixProLAP builds upon the CLAP architecture, using HTS-AT as the audio encoder and GPT-2 as the text encoder. To introduce probabilistic representations, two independent projection heads are attached to each encoder to predict the mean (L2-normalized) and variance (predicted in log-scale for stability) of diagonal Gaussian distributions. The model employs Probabilistic Pairwise Contrastive Learning (PPCL) using Closed-form Sampled Distance (CSD) and an inter-modal inclusion loss to encourage audio distributions to sit within corresponding text distributions.

To model intra-modal uncertainty without information removal, the framework superimposes two audio waveforms from different minibatch pairs using mixing coefficients sampled uniformly from alpha ~ U(0.5, 1.0). Corresponding textual captions are merged via conjunctions ("and", "while") to form composite text descriptions. An intra-modal inclusion loss forces individual source distributions to reside within their composite mixture distribution.

To capture graded ambiguity, a multi-level inclusion (MLI) loss is applied using L = 3 distinct audio mixture levels governed by scaling ratios. The final objective sums the PPCL loss, inter-modal inclusion loss, audio and text intra-modal inclusion losses, multi-level inclusion loss, and a variational information bottleneck (VIB) loss weighted by beta = 1e-5 to prevent variance collapse.

## Experimental setup

Evaluated on the AudioCaps dataset (~51k clips from AudioSet) and the ClothoV2 dataset (~6k samples, 5 captions each). Audio inputs are processed in 10-second segments (with ClothoV2 test chunks averaged). Evaluated on zero-shot audio-to-text (A->T) and text-to-audio (T->A) retrieval using Recall@1, Recall@10, and mAP@10 metrics. Compared against a finetuned CLAP baseline initialized from official pretrained weights and trained with InfoNCE loss. Trained for 30 epochs with AdamW (lr 1e-5, cosine annealing, 5-epoch warmup) and an effective batch size of 2,048.

## Results

When trained on AudioCaps, MixProLAP outperforms the CLAP baseline on A->T retrieval (R@1: 26.85% vs 24.23%, mAP@10: 20.24% vs 18.89%), though CLAP retains a minor edge on AudioCaps T->A retrieval. When trained on ClothoV2, MixProLAP shows clear superiority, outperforming CLAP across in-domain A->T (R@1: 15.60% vs 13.40%) and T->A metrics, as well as exhibiting superior out-of-domain generalization on the AudioCaps test set.

Ablation studies verify that adding the mixing-based intra-modal inclusion loss and the multi-level inclusion loss progressively lifts A->T performance (R@1 jumping from 22.98% with base PPCL/Inter-modal up to 26.85% with all components). Furthermore, comparing augmentation strategies shows that combining audio mixing with text concatenation significantly outperforms spectrogram and token masking baselines (A->T R@1 of 26.85% vs 22.64%).

| System | Train Set | A->T R@1 | A->T mAP@10 | T->A R@1 | T->A mAP@10 |
|---|---|---|---|---|---|
| CLAP [4] | AudioCaps | 24.23 | 18.89 | 26.85 | 39.93 |
| MixProLAP | AudioCaps | 26.85 | 20.24 | 25.53 | 38.76 |
| CLAP [4] | ClothoV2 | 13.40 | 9.65 | 16.56 | 25.11 |
| MixProLAP | ClothoV2 | 15.60 | 11.19 | 15.62 | 25.08 |

## Limitations

The approach relies heavily on synthetic audio waveform mixing and template-based text concatenation, which may not fully capture complex organic acoustic layering or abstract linguistic composition. Text-to-audio retrieval improvements are less consistent than audio-to-text retrieval, suggesting that simple text concatenation (using "and" / "while") is a weaker uncertainty inducer than physical audio mixing. Evaluation is currently restricted to English-language datasets (AudioCaps and ClothoV2) and fixed 10-second segments.

## Why read this

Speech and multimodal researchers seeking to move beyond deterministic point embeddings in CLAP models should read this to understand how waveform-level additive mixing acts as a mathematically consistent alternative to masking for uncertainty modeling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust zero-shot audio retrieval, sound event localization in complex acoustic environments, and multimodal audio-text search engines.

## Institutions / 機構

LINE WORKS Corporation, NAVER Cloud Corporation

## Related

- (link related pages by id as the wiki grows)
