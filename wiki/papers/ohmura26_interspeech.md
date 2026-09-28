---
id: ohmura26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2231
pdf: https://www.isca-archive.org/interspeech_2026/ohmura26_interspeech.pdf
---

# LibriTTS-VI: A Public Corpus and Novel Methods for Efficient Voice Impression Control

[PDF](https://www.isca-archive.org/interspeech_2026/ohmura26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ohmura26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2231)

**TL;DR** — This paper introduces LibriTTS-VI, the first public corpus for numerical voice impression control, alongside disentangled and reference-free training strategies that significantly reduce impression leakage in text-to-speech synthesis.

## Problem

Numerical voice impression control (VIC) enables fine-grained speaker manipulation along 11 perceptual dimensions (e.g., brightness, calmness), but progress has been hindered by the lack of a public corpus and the problem of impression leakage. Impression leakage occurs when a single reference utterance biases the synthesized voice toward the reference's natural impression rather than the intended target vector. Furthermore, alternative natural language prompt-based text-to-speech models struggle with precise numerical control and semantic entanglement.

## Method

The authors introduce LibriTTS-VI by manually annotating 130 LibriTTS-R utterances across 11 impression scales and scaling it to the full corpus via 100-fold similarity-based data augmentation to train a voice impression estimator (VIE). To fix impression leakage, they propose VIC-dis (disentangled training using two separate utterances from the same speaker, one for identity and one providing the target VI via VIE) and VIC-srf (a speaker-reference-free method replacing the speaker reference with Gaussian noise). The text-to-speech backbone builds upon VITS integrated with a Conformer-based text encoder, connectionist temporal classification loss, and adaptive layer-norm zero Transformers, using 256-dimensional embeddings.

## Results

Evaluated on the LibriTTS-R test-clean set (39 unseen speakers), the proposed methods are compared against VIC-base, VITS, and LLM-based voice design models (QVD-z and QVD-f). Objectively, VIC-srf improves 11-dimensional voice impression mean squared error (VI-MSE) down to 0.41 (from 0.61 for VIC-base) and reduces word error rate (WER) to 7.72% (from 8.17%). Subjectively, VI-MSE drops from 1.15 to 0.92, while UTMOS audio quality slightly increases to 4.26 (compared to 4.23 for VIC-base and 4.17 for ground truth).

## Code

- https://github.com/sony/LibriTTS-VI

## Applications

Engineers building expressive text-to-speech systems, character voice design tools, or conversational AI platforms requiring fine-grained, numerical acoustic style adjustments.

## Limitations

Inter-annotator agreement for several perceptual dimensions (such as cold-warm and calm-restless) remains low (Krippendorff's alpha under 0.3), reflecting the inherent subjectivity of voice impressions.

## Related

- (link related pages by id as the wiki grows)
