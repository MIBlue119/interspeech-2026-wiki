---
id: pokel26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-776
pdf: https://www.isca-archive.org/interspeech_2026/pokel26_interspeech.pdf
---

# Data-Efficient ASR Personalization for Non-Normative Speech Using an Uncertainty-Based Phoneme Difficulty Score for Guided Sampling

[PDF](https://www.isca-archive.org/interspeech_2026/pokel26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pokel26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-776)

**TL;DR** — The paper introduces an uncertainty-driven phoneme difficulty score using variational adapters or dropout to guide targeted oversampling for non-normative ASR personalization, yielding up to a 14.97 percentage point reduction in WER for very low intelligibility speakers.

## Problem

State-of-the-art ASR models fail on non-normative speech due to high acoustic variability, lack of training data, and a tendency to overfit when fine-tuned with scarce per-individual samples. Standard parameter-efficient methods and data augmentation treat all samples equally, while raw softmax-based entropy or confidence measures conflate unlearnable acoustic noise with true articulatory difficulty and fail to prioritize problematic patterns.

## Method

The framework computes epistemic uncertainty using either Monte Carlo Dropout (MCD with pdrop=1%, M=20 passes) or Variational Low-Rank Adaptation (VI LoRA using mean-field diagonal Gaussians over adapter matrices A and B). It combines this uncertainty with phoneme error rate and ground-truth agreement into a composite Phoneme Difficulty Score (PhDScore) derived from the pre-trained model. Utterances are then min-max normalized to a sampling weight range of [1.0, 5.0] to oversample difficult patterns during fine-tuning. Experiments use the Whisper backbone, trained via Adam with effective batch size 32, learning rates of 5e-6 for full fine-tuning and 1e-4 for LoRA/VI LoRA, and early stopping on validation non-normative character error rate (CER).

## Results

Evaluated on UA-Speech (English, 16 speakers) and BF-Sprache (German, 505 isolated words from a child with Apert syndrome), the method demonstrates consistent improvements on impaired speech that scale inversely with speaker intelligibility. On UA-Speech, uncertainty-guided oversampling with Full FT/LoRA/VI LoRA reduces Word Error Rate (WER) by up to 14.97 percentage points for very low intelligibility speakers. For BF-Sprache, LoRA personalization reduces error rates by up to 2.70 percentage points in WER. A longitudinal clinical validation against two logopedic reports taken one year apart shows that the PhDScore achieves an Average Precision (AP) of up to 0.82 in aligning with expert-identified atypical phonemes (compared to 0.54 for raw entropy), confirming it captures persistent articulatory traits.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building assistive technology, personalized ASR solutions for individuals with speech impairments, or supplementary tooling for clinical logopedic assessments.

## Limitations

The detailed longitudinal phoneme-level clinical validation is currently constrained to a single speaker in the BF-Sprache dataset due to the strict requirements of ethical approvals for pediatric impaired speech.

## Related

- (link related pages by id as the wiki grows)
