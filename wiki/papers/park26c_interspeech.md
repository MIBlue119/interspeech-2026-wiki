---
id: park26c_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-952
pdf: https://www.isca-archive.org/interspeech_2026/park26c_interspeech.pdf
---

# LoRA-Tuned Large Language Models for Dementia Detection via Multi-View Speech-Derived Features

[PDF](https://www.isca-archive.org/interspeech_2026/park26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-952)

**TL;DR** — This paper proposes a low-rank adaptation (LoRA)-tuned large language model that performs structured multi-view reasoning over lexical, temporal, phonological, and discourse-level speech features, achieving a headline F1-score of 90.14% on the ADReSSo dementia detection benchmark.

## Problem

Dementia alters speech across acoustic, temporal, and linguistic domains, but conventional automated detection systems typically analyze these dimensions independently or fuse them via separate modality-specific encoders. This separation limits integrative reasoning across heterogeneous cognitive symptoms. Developing a unified approach that jointly interprets these complementary signals is crucial for improving early screening reliability.

## Method

The framework extracts four speech-derived views per utterance: ASR transcripts with inline pause markers generated via Whisper large-v3; temporal fluency statistics and silence intervals (using a 0.5s operational threshold) from Montreal Forced Aligner; zero-shot discourse topic and cluster labels based on a fixed 8-cluster scheme derived via GPT-5.2; and phonological sequences from HuPER. These four views are serialized into a unified JSON-structured prompt. Open-source LLMs including Qwen3 and Gemma-3 are fine-tuned using LoRA (rank r = 8, alpha = 16 on query and value projections) for utterance-level binary classification, with speaker-level predictions aggregated via majority voting.

## Results

Evaluated on the ADReSSo challenge dataset (derived from the DementiaBank Pitt corpus with 166 train and 71 test participants), the proposed multi-view LoRA framework achieves a speaker-level F1-score of 90.14% using Qwen3-14B, outperforming prior systems such as Swin-BERT (87.32%) and Whisper-based baselines (84.50%). A stepwise ablation study shows that starting from a transcript-only baseline (81.48%), adding discourse topic/cluster cues yields the largest individual gain (+5.81%), followed by pause/duration features (+1.44%) and phoneme sequences (+1.41%). Model scaling experiments demonstrate consistent performance gains from 4B up to 14B parameters.

## Code

- https://github.com/vivivic/is26dementia

## Applications

Clinicians, speech pathologists, and digital health engineers building automated, non-invasive screening tools for early detection of Alzheimer's disease and related dementias from spontaneous speech.

## Limitations

The extraction of discourse-oriented representations relies on commercial APIs (GPT-5.2) restricting control over the process, and evaluation is currently limited to English datasets, which may restrict cross-lingual generalizability.

## Related

- (link related pages by id as the wiki grows)
