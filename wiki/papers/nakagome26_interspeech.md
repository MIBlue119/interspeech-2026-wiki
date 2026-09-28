---
id: nakagome26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-360
pdf: https://www.isca-archive.org/interspeech_2026/nakagome26_interspeech.pdf
---

# MixProLAP: Mixture-Induced Uncertainty Modeling for Probabilistic Language-Audio Pretraining

[PDF](https://www.isca-archive.org/interspeech_2026/nakagome26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nakagome26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-360)

**TL;DR** — MixProLAP models many-to-many cross-modal ambiguity by replacing masking-based uncertainty with additive waveform mixing and multi-level inclusion loss, improving zero-shot audio-text retrieval.

## Problem

Conventional Contrastive Language-Audio Pretraining (CLAP) models map each modality to deterministic point embeddings, assuming a strict one-to-one alignment. This fails to capture real-world many-to-many ambiguities where a single acoustic scene can be described in multiple valid ways or hierarchically related ways (e.g., heavy rain entails rain). Prior probabilistic adaptations using masking often destroy transient acoustic cues or fail to create hierarchical variations, making them poorly suited for the temporal and compositional nature of audio.

## Method

The framework builds on the CLAP architecture (HTS-AT audio encoder and GPT2 text encoder) by adding dual projection heads that output the mean and log-variance of diagonal Gaussian distributions. Inter-modal alignment is optimized via Probabilistic Pairwise Contrastive Learning (PPCL) using Closed-form Sampled Distance (CSD) and an inter-modal inclusion loss. To model intra-modal uncertainty, the authors introduce additive audio mixing—superimposing two waveforms with ratios from U(0.5, 1.0)—along with parallel text concatenation using conjunctions like 'and'. A multi-level inclusion (MLI) loss with three mixing levels enforces graded hierarchical uncertainty, backed by a variational information bottleneck (VIB) loss to prevent variance collapse.

## Results

Evaluated on AudioCaps (51k clips) and ClothoV2 (6k clips) using Recall@1, Recall@10, and mAP@10 for both audio-to-text (A->T) and text-to-audio (T->A) zero-shot retrieval. When trained on AudioCaps, MixProLAP outperforms the finetuned CLAP baseline on A->T retrieval (R@1 26.85 vs 24.23, mAP@10 20.24 vs 18.89) and achieves competitive T->A results. On ClothoV2, MixProLAP yields substantial consistent gains across in-domain and out-of-domain cross-modal evaluations. Ablation studies confirm that combining PPCL, inter-modal inclusion, mixing-based intra-modal inclusion, and multi-level inclusion progressively boosts performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building multimodal audio retrieval systems, sound event search engines, or acoustic captioning models that need to handle ambiguous or hierarchical descriptions.

## Limitations

Text-to-audio retrieval improvements are less consistent compared to audio-to-text retrieval due to the asymmetry of simple text concatenation versus physical audio waveform mixing.

## Related

- (link related pages by id as the wiki grows)
