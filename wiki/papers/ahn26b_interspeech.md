---
id: ahn26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3058
pdf: https://www.isca-archive.org/interspeech_2026/ahn26b_interspeech.pdf
---

# Whisper-CD: Accurate Long-Form Speech Recognition using Multi-Negative Contrastive Decoding

[PDF](https://www.isca-archive.org/interspeech_2026/ahn26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ahn26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3058)

**TL;DR** — Whisper-CD is a training-free contrastive decoding framework for long-form speech recognition that suppresses hallucinations and repetition loops, reducing word error rate by up to 24.3 percentage points on challenging benchmarks.

## Problem

Large encoder-decoder ASR models like Whisper frequently suffer from hallucinations during non-speech intervals, repetition loops, and error accumulation when previous segment transcripts are passed as context. Existing mitigation methods either require structural model modifications, retraining, or post-correction, and fail to jointly address diverse failure modes at inference time. This matters because these errors undermine transcription reliability in real-world deployment without any easy way to steer token probabilities dynamically.

## Method

Whisper-CD computes clean-audio logits alongside three acoustically perturbed negative paths in a single batched forward pass: additive Gaussian noise (SNR 10 dB), a silence-only all-zero spectrogram, and a leftward temporal shift of 7 seconds. These three negative signals capture distinct failure modes including silence hallucination, prior biases, and temporal misalignment. The negative logits are aggregated using a log-sum-exp operator with a uniform contrastive coefficient alpha and a temperature parameter tau. Because it operates purely at the logit level during decoding, it acts as a drop-in replacement for existing encoder-decoder pipelines without requiring parameter updates.

## Results

Evaluated across five English long-form speech benchmarks (CORAAL, Earnings22, VoxPopuli, TED-LIUM, and REV-16) using Whisper Large-v3 and Large-v3-Turbo models. Whisper-CD consistently lowers word error rate and eliminates repetition loops compared to standard greedy decoding and beam search. For instance, on the CORAAL dataset using Whisper Large-v3-Turbo, it reduces WER from 38.75% down to 14.43% with an optimal contrastive strength of alpha equals 1.0. Ablation studies confirm that combining all three negative perturbations outperforms individual strategies. Furthermore, Whisper-CD achieves a 48% faster token generation throughput than traditional beam search.

## Code

- https://github.com/openai/whisper

## Applications

Speech engineers and developers deploying large encoder-decoder ASR models like Whisper who need to eliminate hallucinations and repetition loops in long-form audio without retraining.

## Limitations

The additional forward paths introduce a modest computational overhead on faster models like Whisper-Turbo, though this is partially offset by generating fewer repetitive tokens.

## Related

- (link related pages by id as the wiki grows)
