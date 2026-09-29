---
id: lu26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Samsung", "Samsung Electronics"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-998
pdf: https://www.isca-archive.org/interspeech_2026/lu26_interspeech.pdf
---

# PolyBench: Benchmarking LLM-based TTS Systems for Chinese Polyphone Disambiguation

*Chunhui Lu, Rui Zhou, Feifan Chen, Liming Song, YoonChoon Hwang, Junkwang Oh, Gunu Jho*

[PDF](https://www.isca-archive.org/interspeech_2026/lu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-998)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — PolyBench is a comprehensive benchmark for evaluating Chinese polyphone disambiguation in LLM-TTS systems, revealing that even the top-performing SOTA system achieves only 82.02% pronunciation accuracy across 494 characters.

## Key contributions

- Constructed PolyBench, featuring three complementary test sets (Main, DictWords, ALLinONE) covering 494 high-frequency polyphonic characters and 88 polyphonic words with rigorous four-stage filtering.
- Validated Qwen3-Omni-Instruct as an automated pronunciation annotator for synthesized speech, achieving 93.06% labeling accuracy on the challenging ALLinONE set compared to traditional ASR tools.
- Benchmarked 17 state-of-the-art open-source LLM-TTS systems and 3 G2P models, uncovering systematic weaknesses in dialectal, colloquial, and multi-polyphone contexts.

## Problem

Large Language Model-based Text-to-Speech (LLM-TTS) systems implicitly integrate grapheme-to-phoneme disambiguation into their parameters without explicit G2P modules, making pronunciation errors invisible to standard ASR metrics like CER/WER. Prior Chinese polyphone datasets (e.g., CPP, MCP, CVTE-poly) suffer from annotation errors, incomplete coverage, single-pronunciation flaws, and lack of contextual domain diversity. This leaves the true capability of modern LLM-TTS architectures in handling context-dependent polyphonic pronunciations largely unexplored and unquantified.

## Method

The main dataset was extracted from the 7th Edition of the Contemporary Chinese Dictionary, targeting the 3500 Level-I standard characters. After rule-based filtering (excluding interjections, variant/archaic forms, non-standard symbols, and single-pronunciation entries), DeepSeek-V3.1 generated contextual sentences across categories (Common, Surname, Dialectal, Colloquial, Literary) which were subsequently verified by native Mandarin speakers, yielding 6,016 sentences. The supplementary DictWords set contains 2,137 high-frequency compound words from the BCC corpus for lexical-context disambiguation, while ALLinONE uses DeepSeek-R1 to create 494 sentences packed with multiple conflicting pronunciations per character.

Evaluation relies on Qwen3-Omni-Instruct to transcribe audio into Pinyin, measuring Poly-CharAcc (percentage of correctly recognized target characters) and Poly-PyAcc (percentage of matching initials, finals, and tones). Tested models include 3 explicit G2P modules (F5-TTS G2P, G2PM, G2PW) and 17 LLM-TTS architectures (such as FireRedTTS-2, Index-TTS 2, Qwen3-TTS, CosyVoice2, and LLaSA). Each model synthesizes roughly 6 hours of audio across the test suites, with statistical significance determined via McNemar's test (p < 0.05).

## Experimental setup

Evaluated on three bespoke test sets: Main (6,016 sentences, 494 characters), DictWords (2,137 words, 375 characters), and ALLinONE (494 sentences, 1,138 polyphone instances). Tested against 3 G2P baselines and 17 open-source LLM-TTS systems. Primary metrics are Character Error Rate (CER), Polyphone Character Accuracy (Poly-CharAcc), and Polyphone Pinyin Accuracy (Poly-PyAcc).

## Results

FireRedTTS-2 achieved the best overall performance with a Main Poly-PyAcc of 85.58%, a DictWords Poly-PyAcc of 69.66%, and a CER of 1.08%, significantly outperforming competing models. However, models struggled heavily with dialectal categories (best scores around 40-43%) and colloquial usage (around 30-51%), while the ALLinONE set demonstrated that even the leading model could fully correct all polyphones in only 202 out of 494 dense sentences.

| System | CER (%) | Poly-CharAcc (%) | Main Poly-PyAcc (%) | DictWords Poly-PyAcc (%) |
|---|---|---|---|---|
| G2PW | — | — | 81.00 | 61.83 |
| CosyVoice2 | 1.45 | 91.84 | 80.68 | 66.14 |
| Qwen3-TTS | 1.18 | 92.40 | 81.68 | 66.58 |
| Index-TTS 2 | 1.11 | 92.61 | 84.20 | 68.51 |
| FireRedTTS-2 | 1.08 | 92.67 | 85.58 | 69.66 |

## Limitations

Evaluation is constrained to the 3500 Level-I standard Chinese characters and excludes rare or out-of-vocabulary polyphones. The automated labeling approach relies on Qwen3-Omni-Instruct, which introduces minor labeling errors and tone discrepancies compared to human judgment. The study is limited to open-source Chinese LLM-TTS models and does not assess proprietary commercial systems.

## Why read this

Speech and ML researchers building or fine-tuning Chinese LLM-TTS models should read this to understand why standard CER metrics miss pronunciation failures and how their systems handle challenging lexical and dialectal contexts.

## Code

- https://github.com/Chunhui-Lu/PolyBench

## Applications

Improving text-to-speech synthesis pipelines, audiobook generation, virtual assistants, and text normalization modules for Mandarin Chinese speech generation.

## Institutions / 機構

Samsung, Samsung Electronics

## Related

- (link related pages by id as the wiki grows)
