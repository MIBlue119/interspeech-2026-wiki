---
id: arumugam26_interspeech
category: asr
labels: [self-supervised, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/arumugam26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/arumugam26_interspeech.pdf
---

# A Human-in-the-Loop Multi-Agent Companion for Real-Time Entity Extraction and SLU-Driven ASR Error Correction

*Shiva Shankar Arumugam, Ameyaditya Achar J, Aashraya Sachdeva*

[PDF](https://www.isca-archive.org/interspeech_2026/arumugam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arumugam26_interspeech.html)

**Category:** `asr` · **Labels:** `self-supervised`, `streaming-real-time`

**TL;DR** — MACE is a closed-loop multi-agent contact-center architecture that recycles human agent UI corrections into streaming ASR biasing entries and post-ASR substitution rules without acoustic retraining. On Whisper-large-v3, it reduces Named Entity Word Error Rate (NE-WER) by 17.1% and EditRate by 18.6% over a no-biasing baseline.

## Key contributions

- A multi-agent companion architecture where a reflection sub-agent autonomously translates live UI corrections into dynamic ASR biasing entries and substitution rules off the audio path.
- A self-bootstrapping domain vocabulary loop that operates without acoustic model retraining or a priori entity lists.
- An empirical validation on ContextASR-Bench showing that feedback channels saturate rapidly (biasing list at batch 3, substitution rules at batch 28), closing over 22% of the gap to oracle biasing.
- Rigorous statistical verification using 32 sequential batches with paired bootstrap confidence intervals to isolate the impact of adaptive corrections from dialogue-mix variance.

## Problem

Contact-center speech processing struggles with tail-frequency named entities like customer identifiers, product SKUs, and proper nouns, causing streaming ASR misrecognitions that cascade into CRM errors and manual rework. Prior approaches rely on static a priori vocabulary lists or expensive acoustic model retraining, and they fail to harness the clean supervision signal generated when human agents correct AI suggestions on live companion UIs. This matters because real-time customer interactions demand high-accuracy entity capture to prevent costly operational errors.

## Method

The MACE architecture operates via a forward transcription pipeline and an asynchronous feedback loop. Audio is transcribed by Whisper-large-v3 using a dynamic contextual biasing list B, passed through a post-ASR word-correction stage governed by a substitution rule set R, and routed to an extraction sub-agent. When a human agent corrects an extracted entity on the companion UI, the delta set captures discrepancies classified as misrecognitions, hallucinations, or omissions.

The reflection sub-agent consumes these deltas via two operators: NewBias, which adds corrected entity strings directly to B for subsequent calls, and NewRules, which generates surface-pattern substitution pairs (si -> e*) only after a pattern has been observed across at least tau = 2 distinct dialogues to suppress one-off alignment artefacts. To manage capacity, the biasing list |B| is software-capped at 500 entries to fit Whisper's 448-token prompt capacity (roughly 70-100 effective entries), and the substitution rule set |R| is capped at 200 to prevent false-positive regex firings. The entire reflection update is processed off the audio path to maintain live transcription latency, with tenant-isolated key-value stores persisting B and R across calls.

The training and evaluation recipe partitions dialogues into K = 100 sequential batches (evaluated specifically across N = 32 batches of roughly 52 dialogues each), ensuring updates committed during batch k are strictly visible to batch k+1 to mimic real-world deployment semantics.

## Experimental setup

Evaluated on the English ContextASR-Dialogue split of ContextASR-Bench containing 5,273 multi-speaker dialogues with approximately 63,000 named-entity mentions across 10+ domains. Compared against two conditions on a shared denominator using Whisper-large-v3 on a T4 GPU: No Biasing (B = R = empty) and Oracle Biasing (B = ground-truth entities provided in advance). Metrics include NE-WER, EditRate, and capacity tracking of |B| and |R| over N = 32 batches with 95% confidence intervals derived from 10,000 paired bootstrap resamples.

## Results

MACE Adaptive achieves an NE-WER of 0.147 +/- 0.004 (sigma = 0.012) and an EditRate of 0.247 +/- 0.006 (sigma = 0.016), compared to the No Biasing baseline scores of 0.178 +/- 0.005 (sigma = 0.014) and 0.304 +/- 0.006 (sigma = 0.016) respectively. This yields a 17.1% reduction in NE-WER and an 18.6% reduction in EditRate, successfully closing 23.6% and 22.0% of the gap to Oracle Biasing without overlapping confidence intervals. The adaptive feedback channels demonstrate rapid saturation, with |B| reaching its capacity cap by batch 3 and |R| saturating by batch 28.

| System | NE-WER | EditRate |
|---|---|---|
| No Biasing | 0.178 | 0.304 |
| MACE Adaptive | 0.147 | 0.247 |
| Oracle Biasing | -- | -- |

## Limitations

The evaluation relies on a deterministic surrogate extractor and oracle editor rather than an end-to-end LLM extraction sub-agent in the loop during large-scale replaying. The system is currently validated exclusively on English multi-speaker TTS-synthesised dialogue data from ContextASR-Bench, leaving multilingual and live telephony acoustic robustness unverified. Furthermore, capacities are strictly bounded by software caps (|B| <= 500, |R| <= 200), which may limit performance in extremely high-vocabulary domains if saturation plateaus prematurely.

## Why read this

Read this paper if you build production speech interfaces for contact centers and want to leverage human-in-the-loop feedback to dynamically adapt streaming ASR without costly acoustic retraining. It provides a concrete, multi-agent blueprint for turning UI corrections into persistent biasing and substitution rules.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time contact center voice assistants, customer relationship management (CRM) auto-fill systems, and streaming ASR error correction.

## Institutions / 機構

Observe.AI

## Related

- (link related pages by id as the wiki grows)
