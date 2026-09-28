---
id: suzuki26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-914
pdf: https://www.isca-archive.org/interspeech_2026/suzuki26_interspeech.pdf
---

# ELSA: Acoustic Event-Level Semantic Alignment for Fine-Grained Reference-Free Text-to-Audio Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/suzuki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/suzuki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-914)

**TL;DR** — ELSA is a reference-free automatic evaluation metric for text-to-audio generation that decomposes text queries into acoustic events to assess fine-grained semantic alignment, achieving a higher Spearman correlation with human ratings than prior metrics across multiple benchmarks.

## Problem

Current reference-free evaluation metrics for text-to-audio generation rely on holistic, global text-audio similarities computed within shared embedding spaces like CLAP. This coarse-grained approach frequently misses short or transient acoustic events, resulting in poor correlation with human subjective ratings such as relevance and perceptual quality.

## Method

ELSA hierarchically combines global text-audio matching with event-level semantic alignment. It uses an LLM (GPT-5.2) to parse the text query into distinct noun-verb event phrases and a language-queried audio source separation model (SAM Audio) to isolate corresponding audio segments. Human-CLAP embeddings are then extracted globally and event-wise to compute precision, recall, and F1 scores, which are adaptively blended with global cosine similarity using a normalization factor.

## Results

Evaluated on four text-to-audio benchmarks (AudioCaps, Clotho, MusicCaps, RELATE), ELSA consistently outperforms eight baseline metrics including PAM and various CLAPScore variants. On AudioCaps, its Kendall's tau for relevance improved by 13.1 points over the best baseline. Ablation studies show that utilizing SAM Audio and Human-CLAP feature spaces yields superior correlation against alternative source separation models or generic CLAP embeddings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing and benchmarking text-to-audio generation models to automatically evaluate audio relevance and quality without requiring ground-truth reference audio or costly human studies.

## Related

- (link related pages by id as the wiki grows)
