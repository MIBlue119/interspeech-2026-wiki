---
id: saini26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-912
pdf: https://www.isca-archive.org/interspeech_2026/saini26_interspeech.pdf
---

# Listening Like a Judge: A Music-Aware Framework for Automatic Singing Performance Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/saini26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/saini26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-912)

**TL;DR** — MUSICJUDGE is a block-aligned multimodal framework for automated singing quality assessment that jointly evaluates lyric correctness and pitch-rhythm fidelity, achieving a Spearman correlation of 0.683 with human expert judgments.

## Problem

Existing singing quality assessment methods evaluate either acoustic properties or lyrics exclusively, failing to holistically capture human expert judgments. Furthermore, combining these modalities is difficult because standard ASR systems struggle with singing-specific phenomena such as melisma, vibrato, tempo elasticity, and pronunciation variations.

## Method

The framework utilizes Demucs for source separation and a fine-tuned Whisper-large-v3 model using a novel Modality-Guided LoRA (MG-LoRA) strategy that incorporates pitch, timing, and alignment regularization terms. It employs sliding windows and multi-signal matching combining semantic embeddings, fuzzy lexical matching, and phonetic similarity to detect temporal song blocks under structural uncertainty. Pitch and rhythm fidelity are measured via pYIN contour tracking against the global key and onset-to-beat deviations, respectively. The system combines these content and musical scores using weighted aggregation and leverages an LLM to generate section-aware natural-language feedback.

## Results

Evaluated on the curated SWARALYRICS dataset (420 samples) and SingMOS-Pro, MUSICJUDGE achieves a Spearman correlation of 0.683 (a 32% improvement) and Kendall's tau of 0.499 (a 41% improvement) against human expert rankings. MG-LoRA reduces Word Error Rate (WER) across diverse singing genres by an average of 20.1% and across five test languages by 27.7% compared to base Whisper. Ablation studies confirm that coupling content and musical modalities yields over 9.1% more reliable assessment than single-modality baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive training tools for vocalists, automated evaluation of synthetic music generation, and scalable judging support for music competitions.

## Limitations

Evaluation is currently limited to solo singing performances, with multi-singer scenarios left for future work.

## Related

- (link related pages by id as the wiki grows)
