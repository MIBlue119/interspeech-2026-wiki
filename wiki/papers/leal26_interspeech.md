---
id: leal26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-450
pdf: https://www.isca-archive.org/interspeech_2026/leal26_interspeech.pdf
---

# Tarsila-ASR: A Multi-Domain Test Suite for Benchmarking Brazilian Portuguese Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/leal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/leal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-450)

**TL;DR** — The paper introduces Tarsila-ASR, a 72.4-hour spontaneous speech benchmark for Brazilian Portuguese, and demonstrates that fine-tuning open-source models on diverse conversational data significantly reduces word error rates.

## Problem

Spontaneous speech recognition for Brazilian Portuguese remains limited because standard Transformer-based ASR systems struggle with disfluencies, fillers, hesitations, and regional accents. This performance bottleneck persists largely due to the scarcity of standardized, acoustically diverse benchmarks capturing real-world conversational variability. Without specialized evaluation suites, measuring true generalization across conversational styles and regional accents is impractical.

## Method

The authors compile Tarsila-ASR by unifying test subsets from multiple public Brazilian Portuguese corpora, totaling 62,094 samples (72.46 hours) standardized to a 16kHz sampling rate with estimated gender distributions. To tackle performance gaps, they fine-tune multiple model architectures—including Distil-Whisper, Whisper (medium and large-v3), and OmnilingualASR (300M and 1B variants)—on an aggregated training set of 1,156 hours of spontaneous speech. Experiments are conducted using a single NVIDIA H100 GPU (80GB VRAM) with varying training steps (e.g., up to 750k for Distil-Whisper and 75k for Whisper-large-v3). Evaluation metrics include Word Error Rate (WER), Character Error Rate (CER), BERTScore, SeMaScore, and Real-Time Factor (RTF).

## Results

Zero-shot models achieve high error rates on spontaneous subsets, such as Whisper-large-v3 reaching a mean WER of 33.03% and Omnilingual 7B reaching 51.71% across the benchmark. Fine-tuning on diverse spontaneous data drastically lowers these errors into the 15% to 19% range. Specifically, Whisper-large-v3 fine-tuned for 75k steps establishes the new state-of-the-art with the lowest WER, lowest CER, and highest BERTScore. Meanwhile, Distil-Whisper fine-tuned for 200k steps achieves a competitive WER within 1.2 absolute points of the top model while operating roughly three to four times faster in inference.

## Code

- https://github.com/nilc-nlp/tarsila-asr

## Applications

Speech engineers and conversational AI developers building voice assistants, automated meeting summarizers, real-time speech-to-speech duplex models, or call center customer service solutions for Brazilian Portuguese.

## Limitations

Fine-tuned models risk overfitting if training runs excessively long (e.g., Whisper-large-v3 overfits after 75k steps), and high-accuracy models like Whisper-large-v3 incur significantly higher inference latency compared to distilled variants.

## Related

- (link related pages by id as the wiki grows)
