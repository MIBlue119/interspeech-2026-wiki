---
id: jiang26f_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2642
pdf: https://www.isca-archive.org/interspeech_2026/jiang26f_interspeech.pdf
---

# Earnings25: A Comprehensive 500-Hour Speech Benchmark for Finance

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2642)

**TL;DR** — Earnings25 is a 500-hour financial speech benchmark designed to evaluate automatic speech recognition on earnings calls across diverse industries and speaker roles, reporting baseline word error rates between 6.1% and 19.4% depending on model and normalization.

## Problem

Earnings calls combine spontaneous dialogue, heavy financial jargon, dense numeracy, and rapid turn-taking under realistic telephony or noisy conditions, exposing severe domain-specific failure modes in standard ASR systems. Existing datasets either function merely as large training corpora, lack standardized evaluation protocols, or omit rich structured metadata like speaker roles and industry classifications that prevent fine-grained error analysis.

## Method

The benchmark comprises two test sets: testset-full (498 hours of S&P 500 earnings calls from Q4 2025) and testset-segmented (a 46-hour, industry-balanced evaluation set of 290 segments sampled from 2025 U.S. calls). Audio is processed using NVIDIA NeMo for CTC-based forced alignment with a 0.5-second max duration constraint to acquire word-level timestamps, followed by quality filtering and greedy 5-to-10-minute block aggregation. Standardized evaluation is benchmarked using OpenAI Whisper models (base, medium, large-v2) and NVIDIA NeMo's Parakeet-TDT-0.6B-v2 without external language models or custom prompting.

## Results

Evaluated across four scoring variants (raw WER, NeMo-normalized, lowercased/punctuation-removed, and combined), Parakeet-TDT-0.6B-v2 achieves the best performance with a normalized, lowercased, punctuation-removed WER of 0.06114 on testset-full and 0.06062 on testset-segmented, whereas Whisper-large-v2 scores 0.08036 and 0.08174 under the same settings. While aggregate metrics are heavily influenced by high-volume sectors, terminology-dense subsectors like biotech and pharma exhibit much higher error rates between 15.3% and 15.4% on Parakeet-TDT. Performance on the stratified segmented set is slightly worse than the full set despite shorter duration, reflecting increased exposure to long-tail vocabulary.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers studying domain adaptation, long-form speech transcription, and robustness in financial technology.

## Limitations

The benchmark focuses exclusively on English-language earnings calls and primarily reflects speech from U.S.-domiciled companies, omitting broader global linguistic and accent diversity.

## Related

- (link related pages by id as the wiki grows)
