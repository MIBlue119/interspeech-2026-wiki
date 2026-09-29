---
id: singh26c_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2764
pdf: https://www.isca-archive.org/interspeech_2026/singh26c_interspeech.pdf
---

# FlowEdit: Associative Memory for Lifelong Pronunciation Adaptation in Flow-Matching TTS

*Harshit Singh, Ayush Pratap Singh, Nityanand Mathur*

[PDF](https://www.isca-archive.org/interspeech_2026/singh26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/singh26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2764)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — FlowEdit is a lifelong pronunciation adaptation framework for frozen flow-matching TTS that optimizes text embedding perturbations and stores them in a Modern Hopfield Network. It reduces target-word Phoneme Error Rate by 92.7% while maintaining zero forgetting on general speech.

## Key contributions

- Introduces latent input optimization for targeted pronunciation correction in frozen flow-matching TTS without updating model weights.
- Designs a Hopfield Refiner with a similarity-gated retrieval mechanism for non-destructive, lifelong episodic memory.
- Curates POLYGLOT-NOUNS, a benchmark of 312 proper nouns across 18 language families for personalized pronunciation adaptation.
- Achieves a 92.7% relative reduction in target-word Phoneme Error Rate with mathematically guaranteed zero forgetting of general speech and cross-speaker transfer.

## Problem

State-of-the-art flow-matching and diffusion text-to-speech models achieve high zero-shot quality but remain static after deployment, frequently mispronouncing out-of-vocabulary proper nouns and foreign loan-words. Traditional grapheme-to-phoneme dictionaries fail on polyglot names, while fine-tuning or weight-editing methods like LoRA or ROME risk catastrophic forgetting, voice drift, and cumulative parameter interference. These limitations prevent deployed voice assistants and accessibility tools from reliably learning user-specific corrections over time.

## Method

FlowEdit builds upon F5-TTS, utilizing a frozen Diffusion Transformer (DiT) backbone (22 layers, embedding dimension d=1024) and ODE solver with N=32 Euler integration steps. When a user provides a corrective reference audio paired with target text, WhisperLarge-v3 forced alignment localizes the target word and extracts token indices I. FlowEdit freezes all DiT parameters and optimizes a token-level perturbation vector delta in the text embedding space via an objective minimizing mel-reconstruction error regularized by a weight lambda=0.001. Gradients are computed efficiently using the adjoint sensitivity method.

To ensure permanence, each optimized correction is stored as a key-value pair in a Modern Hopfield Network placed after the text encoder. During inference, stored corrections are retrieved using soft-attention mechanisms coupled with a learned similarity gate (sigmoid function with a threshold scalar tau approx 5.0). This gating suppresses irrelevant retrievals and enables fuzzy morphological matching, allowing a correction for a root word (e.g., 'Linux') to adapt inflected variants (e.g., 'Linux's'). Deduplication via exponential moving averages and least-recently-used pruning manage the memory budget.

## Experimental setup

Evaluated on POLYGLOT-NOUNS (312 proper nouns across 18 language families, 1,560 clips) and 500 held-out utterances from LibriTTS-R for general speech forgetting. Compared against F5-TTS zero-shot, eSpeak-NG lexicon overrides, full fine-tuning, LoRA (r=16), and prompt tuning (8 prefix tokens). Metrics include target-word PER evaluated via a finetuned wav2vec 2.0 recognizer, general PER, Mel-Cepstral Distortion (MCD), human evaluation scores from 24 listeners, and A100 GPU wall-clock time.

## Results

FlowEdit achieves a headline target-word PER of 3.1%, representing a 92.7% relative reduction over the zero-shot baseline (42.5%), outperforming fine-tuning (8.2%) and LoRA (11.8%). General speech PER remains statically tied to the baseline at 4.1%, demonstrating zero forgetting compared to full fine-tuning which degrades general PER to 15.3%. Corrections converge in approximately 50 optimization steps taking roughly 15 seconds on a single A100 GPU. Ablations confirm that removing the Hopfield memory degrades PER to 6.9%, while omitting the similarity gate causes general speech PER to rise to 5.8% due to unconstrained latent activation.

| System | PER_target ↓ | PER_gen ↓ | MCD ↓ | Human Eval ↑ | Time |
| --- | --- | --- | --- | --- | --- |
| Zero-shot | 42.5 ± 1.2 | 4.1 | 6.82 | 72.1 | — |
| Lexicon | 18.7 ± 0.9 | 4.1 | 5.61 | 68.3 | Manual |
| Fine-tuning | 8.2 ± 0.5 | 15.3 | 4.10 | 74.8 | ~20m |
| LoRA | 11.8 ± 0.9 | 6.7 | 4.65 | 71.4 | ~8m |
| Prompting | 18.3 ± 1.1 | 4.2 | 5.31 | 69.8 | ~5m |
| FlowEdit | 3.1 ± 0.3 | 4.1 | 3.22 | 78.6 | ~15s |

## Limitations

Residual errors concentrate on monosyllabic words with single-phoneme targets and tonal languages (Mandarin and Vietnamese) due to mel-reconstruction loss under-weighting fundamental frequency variations. Memory retrieval accuracy begins to degrade when the stored correction count exceeds M=1,000 entries, requiring sharding strategies for large-scale enterprise deployments.

## Why read this

Speech and ML engineers building production text-to-speech systems will learn how to implement non-destructive, lifelong adaptation in frozen generative models via latent optimization and associative memory rather than costly weight fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Personalized voice assistants, screen readers, and accessibility tools requiring dynamic, zero-retraining correction of proper nouns and foreign loan-words.

## Institutions / 機構

University of Maryland, TU Darmstadt, Smallest AI

## Related

- (link related pages by id as the wiki grows)
