---
id: ahn26b_interspeech
category: asr
labels: [self-supervised]
institutions: ["Sungkyunkwan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3058
pdf: https://www.isca-archive.org/interspeech_2026/ahn26b_interspeech.pdf
---

# Whisper-CD: Accurate Long-Form Speech Recognition using Multi-Negative Contrastive Decoding

*Hoseong Ahn, Jeongyun Chae, Yoonji Park, Kyuhong Shim*

[PDF](https://www.isca-archive.org/interspeech_2026/ahn26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ahn26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3058)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — Whisper-CD is a training-free contrastive decoding framework for long-form speech recognition that contrasts clean-audio logits against multi-negative perturbations to suppress hallucinations, reducing Word Error Rate by up to 24.3 percentage points on CORAAL.

## Key contributions

- Proposes a multi-negative contrastive decoding framework for ASR that operates entirely at inference time without requiring model retraining or parameter updates.
- Introduces three acoustically motivated negative perturbation strategies (Gaussian noise injection, silence signal, and audio temporal shift) designed to target specific long-form ASR failure modes.
- Aggregates the multi-negative logits using a log-sum-exp operator combined with a single uniform contrastive coefficient alpha.
- Achieves substantial WER reductions across five English long-form benchmarks while maintaining faster token generation throughput than beam search.

## Problem

Large-scale encoder-decoder ASR models like Whisper frequently produce unsupported, confident text when processing long-form recordings with prolonged silences, acoustic degradation, or distribution shifts. This degradation manifests as silence-region hallucinations, repetition loops, and content omissions, which are often amplified and propagated when previous segment transcriptions are passed as decoding context. Prior mitigation techniques typically require architectural modifications, chunking heuristics, fine-tuning specific attention heads, or external generative error correction, lacking a unified plug-and-play decoding-time defense.

## Method

Whisper-CD modifies generation at inference time by contrasting clean-audio token logits against negative logits derived from three parallel perturbed input paths. The encoder processes the clean waveform alongside three distorted variants: (1) Gaussian noise injection with a target SNR of 10 dB to degrade local phonetic reliability, (2) an all-zero silence signal to isolate the unconditional textual prior and tackle non-speech hallucination, and (3) an audio temporal shift of 7 seconds (leftward shift with zero padding) to disrupt acoustic-prefix alignment and capture boundary failure modes. 

For each decoding step, the model computes the final contrastive logits by subtracting a log-sum-exp aggregation of the negative logits from the clean-audio logits, scaled by a uniform contrastive coefficient alpha (set between 0.5 and 2.0 with temperature tau = 1.0). To maintain efficiency, the clean and three perturbed audio inputs are packed along the batch dimension and passed through the encoder in a single batched forward pass, followed by a single batched decoder forward pass that reuses prefix tokens across all paths in parallel.

## Experimental setup

Evaluated on five English long-form datasets: CORAAL (14 recordings, 11.5 hours), Earnings22 (13-file subset, 14.3 hours), VoxPopuli (50-file subset, 1.4 hours), TED-LIUM (11 files, 3.1 hours), and REV-16 (16 recordings, 16.1 hours). Compared against standard Whisper baseline (with greedy decoding and context passing enabled) and beam search (beam size = 5). Evaluated using Word Error Rate (WER, %), decoding throughput (tokens/s), and real-time factor (RTF) measured on an NVIDIA A100 80GB PCIe GPU using Whisper Large-v3 and Large-v3-Turbo models.

## Results

Whisper-CD consistently reduces WER across all tested benchmarks. Using Whisper Large-v3-Turbo, WER drops from 38.75% to 14.43% on CORAAL, 33.25% to 16.16% on Earnings22, and 12.93% to 10.11% on TED-LIUM. Compared to beam search (beam size 5) on CORAAL, Whisper-CD achieves a lower WER (14.43% vs 22.65%) and higher throughput (147.0 vs 99.0 tokens/s). Ablations demonstrate that the multi-negative aggregation outperforms any single perturbation strategy across diverse datasets, and that alpha values around 1.0 provide optimal balance.

However, Whisper-CD is less effective when baseline models enter extremely deep repetition loops (as observed in Whisper Large-v3 on CORAAL, where baseline WER exceeds 200%), because logit-level contrast alone struggles to rescue trajectories dominated by self-reinforcing probability mass.

| System | CORAAL (WER %) | Earnings22 (WER %) | TED-LIUM (WER %) |
| --- | --- | --- | --- |
| Baseline (Turbo) | 38.75 | 33.25 | 12.93 |
| + Beam Search (beam=5) | 22.65 | - | 17.50 |
| + Whisper-CD (Turbo) | 14.43 | 16.16 | 10.11 |

## Limitations

The current evaluation is restricted to English long-form benchmarks and encoder-decoder architectures. The framework relies on a fixed, manually tuned contrastive strength alpha and static perturbation parameters, which may not be optimal across all acoustic environments or model sizes. Furthermore, logit-level contrast is insufficient to completely reverse extreme, entrenched repetition loops where the decoder assigns overwhelming probability mass to erroneous sequences.

## Why read this

Researchers and practitioners deploying large encoder-decoder ASR models like Whisper in production who need a drop-in, training-free fix for long-form hallucinations and repetition loops will find this essential reading. It provides a principled contrastive decoding formulation using multi-audio perturbations that outperforms traditional beam search while preserving generation speed.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust long-form transcription systems, offline meeting transcription, lecture captioning, and archive speech processing where audio contains prolonged silences or background noise.

## Institutions / 機構

Sungkyunkwan University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Ministry of Science and ICT

## Related

- [Segmental Attention Decoding With Long Form Acoustic Encodings](swietojanski26_interspeech.md) — same problem · relatedness 2.6/3
- [Whisper Hallucination Detection and Mitigation via Hidden Representation Steering and Sparse AutoEncoders](aparin26_interspeech.md) — same problem · relatedness 2.6/3
- [Grounding Whisper: An Audio Anchor-Based Approach for Hallucination Mitigation and Throughput-Efficient ASR](agarwal26_interspeech.md) — same problem · relatedness 2.5/3
- [Probing and Mitigating Hallucinations in Speech-augmented Language Models for Automatic Speech Recognition via Small Language Models](yan26c_interspeech.md) — same problem · relatedness 2.3/3
- [Attention-Guided Reliability Scaling for Contrastive Decoding in Robust Audio-Visual Speech Recognition](kim26h_interspeech.md) — shared technique · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
