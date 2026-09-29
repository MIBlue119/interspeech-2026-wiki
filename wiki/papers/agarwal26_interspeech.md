---
id: agarwal26_interspeech
category: asr
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1314
pdf: https://www.isca-archive.org/interspeech_2026/agarwal26_interspeech.pdf
---

# Grounding Whisper: An Audio Anchor-Based Approach for Hallucination Mitigation and Throughput-Efficient ASR

*Prateek Agarwal, Saurabh Kumar, Priyanka Bhatt*

[PDF](https://www.isca-archive.org/interspeech_2026/agarwal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/agarwal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1314)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — The paper introduces "anchor audio"—prepending a short, acoustically distinct, and domain-orthogonal phrase to audio inputs—to completely suppress Whisper hallucinations on non-speech audio while enabling safe utterance batching for throughput optimization, all without model fine-tuning.

## Key contributions

- Introduces anchor audio as an input-level, dual-purpose mechanism for suppressing ASR hallucinations and acting as a delimiter for safe multi-utterance batching within Whisper's 30-second window.
- Proposes a batching-with-fallback inference strategy (A5) that validates delimiter token counts to retain high throughput while guaranteeing structural alignment and zero-failure safety.
- Achieves a dramatic reduction in Hallucination Error Rate (HER) on Urban8k down to 0.12% (compared to 72.2% for vanilla Whisper and 18.19% for VAD alone) without any model modifications.
- Demonstrates that anchor audio improves overall word error rate (WER) on retail customer service data from 32.18% down to 13.23% while matching baseline VAD latency.

## Problem

Whisper exhibits a severe failure mode of hallucinating random, spurious text on silence and environmental noise, severely undermining production reliability in real-time systems. Traditional mitigation strategies such as Voice Activity Detection (VAD) filtering, confidence thresholds, token suppression, or post-processing error correction fall short because they fail when the model assigns high confidence to hallucinations or leave residual errors. Furthermore, conversational ASR often involves short utterances that severely underutilize Whisper's fixed 30-second context window, leading to heavy compute wastage that prior streaming or distillation methods fail to resolve.

## Method

The processing pipeline consists of a VAD pre-processing step, a transcript processing stage using an int8 inference-optimized whisper-turbo model, and a post-processing stabilization buffer. To construct the augmented input, a short silence buffer delta (fixed empirically at 2.0 seconds) and an anchor phrase A are prepended to the target utterance U, creating X_prime = [A, delta, U]. Two anchor candidates were evaluated: "The present user said" and "Mongolia". The proper noun "Mongolia" was chosen because its strong nasals (/m/, /n/) and plosive (/g/) provide high acoustic distinctiveness, and its semantic distance from the retail domain prevents false positives. It is synthesized via TTS (male/female) at a reduced amplitude of 0.25 relative to the utterance. By successfully decoding the anchor, the autoregressive decoder is conditioned on producing faithful transcriptions before encountering the target audio, preventing self-reinforcing hallucination loops.

Five inference approaches are compared: Vanilla Whisper (A1), VAD only (A2), VAD with Anchor (A3), Naive Batching (A4), and Batching with Fallback (A5). Approach A4 physically concatenates multiple discrete utterances separated by delimiters [delta, A, delta] into a single 30-second buffer to maximize GPU throughput, splitting the output string by the anchor text. However, to resolve delimiter-matching failures where the expected anchor count N_out does not equal the input count N_in, Approach A5 introduces token cardinality validation. If validation fails, the system discards the batch output and automatically falls back to processing each constituent input individually via Approach 3.

## Experimental setup

The primary evaluation dataset consists of a privately licensed retail customer-service speech corpus containing 18,178 samples. Non-speech evaluation is performed on 6,614 clips from UrbanSound8K (excluding children playing). Standardized benchmarking utilizes 1,093 LibriSpeech clean, 1,419 LibriSpeech other, and 5,929 AMI meeting corpus samples, restricted to segment lengths between 1-5 seconds (totaling 33,233 test samples). The system is evaluated across concurrency levels of 32, 48, and 64 using Word Error Rate (WER), Hallucination Error Rate (HER), and end-to-end p95 latency.

## Results

On the Urban8k non-speech dataset, vanilla Whisper (A1) exhibits a catastrophic 72.2% HER, which VAD alone (A2) reduces to 18.19%. Incorporating VAD with Anchor (A3) virtually eliminates hallucinations, dropping Urban8k HER to 0.12% and overall system WER from 32.18% to 13.21% at concurrency 32, with a p95 latency of 579ms (comparable to the VAD baseline's 571ms). Naive Batching (A4) achieves lower latency (487ms) but incurs an 8.45% system failure rate and a disastrous 33.65% AMI WER due to delimiter alignment mismatches. Approach A5 (Batch with Fallback) matches the robust accuracy of A3 (13.23% overall WER, 0.38% Urban8k WER, 0% failures) while unlocking higher throughput efficiency when batch structures hold.

In an ablation study, text-only prompting (initial_prompt = "Transcript:") reduced Urban8k HER to 3.51% but degraded speech WER on the retail dataset to 17.40%, whereas the audio anchor achieved superior speech WER (16.10%) alongside lower HER (0.12%). On LibriSpeech, the anchor introduced a marginal increase in WER (2.87% to 3.03%), which manual inspection revealed to be surface-level orthographic spelling shifts for proper nouns (e.g., "Brackton" vs "Bracton") rather than semantic transcription errors.

| System / Condition | Urban8k HER (%) | Retail WER (%) | Overall WER (%) | P95 Latency (ms, C=32) |
|---|---|---|---|---|
| A1: Only Whisper | 72.20 | 16.40 | 32.18 | 529 |
| A2: Only VAD | 18.19 | 16.52 | 16.67 | 570 |
| A3: VAD with Anchor | 0.12 | 16.10 | 13.21 | 579 |
| A4: Naive Batching | 0.27 | 18.65 | 19.17 | 487 |
| A5: Batch + Fallback | 0.14 | 16.12 | 13.23 | 566 |

## Limitations

Anchor phrase selection requires domain-specific tuning, as phrases optimized for retail customer service may not generalize directly to other specialized or multi-domain environments. The benefits of batch concatenation heavily depend on the utterance length distribution, suffering diminishing returns for long utterances exceeding 10 seconds. The evaluation is restricted entirely to the Whisper architecture, and while the technique is theoretically model-agnostic, cross-model validation remains unproven. Furthermore, experimentation was limited exclusively to English language audio, leaving multilingual deployment open for future work.

## Why read this

Speech and ML engineers building production-grade real-time ASR systems with Whisper will learn how to drastically eliminate costly environmental hallucinations and optimize GPU throughput via input-level prompt engineering without requiring model retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Production-ready real-time customer service conversational bots, call center audio transcription pipelines, and high-throughput offline ASR batch processing systems.

## Institutions / 機構

Walmart Global Tech

## Related

- (link related pages by id as the wiki grows)
