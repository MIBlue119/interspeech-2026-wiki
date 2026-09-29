---
id: jiang26f_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2642
pdf: https://www.isca-archive.org/interspeech_2026/jiang26f_interspeech.pdf
---

# Earnings25: A Comprehensive 500-Hour Speech Benchmark for Finance

*Denglin Jiang, Haoran Zhou, Anshul Wadhawan, Brendan Fahy, Vinay Ramesh, David Weisberg, Dmitriy Derkachevskiy, Helen Sheehan, Srivas Prasad, Michele Franceschini*

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2642)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — Earnings25 is a 500-hour finance-domain ASR benchmark comprising full and industry-stratified earnings calls from 2025, enabling fine-grained speaker- and industry-aware evaluations. Baseline tests reveal that while NVIDIA Parakeet-TDT-0.6B achieves a 10.84% WER on full calls, specialized sectors like biotech spike to over 15% WER.

## Key contributions

- Introduces Earnings25, featuring a 498-hour full-call test set (testset-full) from 2025 Q4 S&P 500 earnings calls and a 46-hour industry-balanced test set (testset-segmented) spanning 290 unique industry categories.
- Provides structured metadata including speaker roles, company identifiers, and fine-grained industry classifications to support error analysis beyond aggregate word error rate (WER).
- Establishes reproducible evaluation pipelines and standardized baselines using OpenAI Whisper (base, medium, large-v2) and NVIDIA NeMo Parakeet-TDT-0.6B-v2.
- Demonstrates that aggregate WER metrics mask severe performance degradation in long-tail, terminology-dense sectors like biotech and pharmaceuticals.

## Problem

Earnings calls combine spontaneous dialogue, heavy financial jargon, dense numeracy, rapid turn-taking, and speaker overlap under real-world acoustic variations. Existing public benchmarks either lack finance-specific terminology and metadata, or serve strictly as massive training corpora rather than controlled evaluation suites (e.g., SPGISpeech). Furthermore, older finance benchmarks like Earnings-22 lack industry-balanced sampling, allowing high-frequency sectors to obscure domain-specific failure modes. Earnings25 addresses this by providing a standardized, metadata-rich testbed designed to measure true domain robustness.

## Method

The corpus generation pipeline uses a two-stage disproportionate stratified sampling procedure over more than 2,100 U.S. earnings calls from 2025 to guarantee broad industry coverage without high-frequency sector dominance. Forced alignment is executed using Connectionist Temporal Classification (CTC) models implemented in NVIDIA NeMo, producing frame-level log-probabilities decoded via Viterbi alignment to extract word-level timestamps with a 0.5-second maximum word-duration constraint. Extracted audio blocks are padded by 0.2 seconds and split at speaker turn boundaries to yield 5-to-10 minute evaluation units.

For inference benchmarking, OpenAI Whisper models (base, medium, large-v2) are evaluated with deterministic decoding settings, English language specification, and no external language models or prompt boosting. NVIDIA NeMo's Parakeet-TDT-0.6B-v2 uses greedy transducer decoding without external LMs. Scoring is conducted using four standardized variants: raw WER, NeMo-normalized WER (WER-N), lowercase/punctuation-removed WER (WER-nc-np), and the fully normalized combination (WER-N-nc-np). All experiments enforce strict reproducibility via fixed framework and hash seeds.

## Experimental setup

Evaluations are performed on two subsets: testset-full (498 hours, MP3, 11-44.1 kHz, 284 industries, 12 countries) and testset-segmented (46 hours, WAV sampled at 16 kHz, 290 segments representing 290 U.S. industries). Baselines include Whisper-base, Whisper-medium, Whisper-large-v2, and Parakeet-TDT-0.6B-v2. Metrics include raw and normalized Word Error Rates (WER, WER-N, WER-nc-np, WER-N-nc-np). All runs use fixed random seed 2025.

## Results

On the full call test set, Parakeet-tdt-0.6b-v2 achieves a headline WER of 10.837% (6.114% with full normalization WER-N-nc-np), outperforming Whisper-large-v2 which registers a 14.039% WER (8.036% normalized). Whisper-medium and large-v2 perform closely, while Whisper-base lags significantly at 17.853% WER. Curiously, performance on the industry-segmented set is slightly worse across models (e.g., Parakeet-tdt reaches 11.109% WER), driven by uniform exposure to long-tail, terminology-heavy sectors.

Subsector breakdowns reveal that specialized, jargon-heavy domains such as Biotech and Pharma experience much higher error rates (15.440% and 15.343% WER respectively using Parakeet-tdt) compared to the overall dataset average, proving that frequency-weighted aggregate metrics hide severe vulnerability in niche economic sectors.

| System / Condition | WER | WER-N | WER-nc-np | WER-N-nc-np |
| :--- | :--- | :--- | :--- | :--- |
| Whisper-base (Full) | 0.1785 | 0.1707 | 0.1157 | 0.1104 |
| Whisper-medium (Full) | 0.1440 | 0.1366 | 0.0859 | 0.0815 |
| Whisper-large-v2 (Full) | 0.1404 | 0.1341 | 0.0842 | 0.0804 |
| Parakeet-tdt-0.6b-v2 (Full) | 0.1084 | 0.1033 | 0.0641 | 0.0611 |
| Parakeet-tdt-0.6b-v2 (Segmented) | 0.1111 | 0.1050 | 0.0647 | 0.0606 |

## Limitations

The benchmark is strictly restricted to English-language earnings calls and heavily skews toward U.S.-domiciled companies (93.8% of testset-full), limiting its ability to evaluate global accent robustness comprehensively outside of a small subset of international calls. Furthermore, it functions purely as an evaluation benchmark rather than a training corpus, and does not yet address multilingual corporate reporting.

## Why read this

Speech and ML researchers focusing on domain adaptation, long-form conversational speech, or financial NLP should read this to understand how standard ASR models falter on dense numerical and domain-specific vocabulary. It provides a definitive, reproducible testbed and baselines for measuring real-world financial speech recognition robustness.

## Code

- https://doi.org/10.5281/zenodo.18762168

## Applications

Automated financial transcription, corporate earnings analytics, and domain-specific ASR evaluation for telephony and meeting environments.

## Institutions / 機構

Bloomberg

## Related

- (link related pages by id as the wiki grows)
