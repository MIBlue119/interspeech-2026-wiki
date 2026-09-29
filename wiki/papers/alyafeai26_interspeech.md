---
id: alyafeai26_interspeech
category: resources-evaluation
labels: [low-resource, self-supervised, dataset-or-benchmark-release]
institutions: ["Technology Innovation Institute"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1049
pdf: https://www.isca-archive.org/interspeech_2026/alyafeai26_interspeech.pdf
---

# Hamsa: A Manually Annotated Emirati Arabic Corpus for Speech and Language Technologies

*Mohammed Alyafeai, Hamza Alobeidli, Omar Alkaabi, Shaikha Alsuwaidi, Leen AlQadi, Ahmed Alzubaidi, Maitha Alhammadi, Basma El Amel Boussaha, Hakim Hacid*

[PDF](https://www.isca-archive.org/interspeech_2026/alyafeai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alyafeai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1049)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — The paper introduces Hamsa, an 11-hour manually transcribed and validated monolingual Emirati Arabic speech corpus, and demonstrates that fine-tuning multilingual ASR models on it reduces Word Error Rate from over 40% to 24.46% for Whisper-v2.

## Key contributions

- Introduces Hamsa, the first large-scale manually annotated monolingual Emirati Arabic speech corpus consisting of 11 hours of conversational recordings.
- Establishes rigorous orthographic and phonetic annotation guidelines for Emirati Arabic to resolve common confusions like the ق/ج alternation and dialect-specific negation particles.
- Evaluates multiple state-of-the-art multilingual ASR models (Whisper, Seamless-M4T, MMS, FastConformer, ArTST) on both Hamsa and the external Mixat benchmark.
- Proves that fine-tuning on a modest, highly curated dialect-matched corpus yields substantial performance gains and generalizes to external test domains.

## Problem

Spoken Arabic dialects like Emirati Arabic differ drastically in phonology, morphology, and lexicon from Modern Standard Arabic (MSA), yet existing large speech datasets (such as MGB, QASR, and Common Voice) predominantly cover MSA, Egyptian, or Levantine varieties. Gulf Arabic resources are extremely scarce, and prior Emirati datasets like Mixat focus heavily on English code-switching or podcast domains, making them ill-suited for clean monolingual conversational ASR. Consequently, off-the-shelf multilingual ASR models suffer from severe zero-shot error rates (often exceeding 40% WER) due to dialectal phenomena such as phonological shifts, distinct negation particles, and localized feminine morphology.

## Method

The Hamsa corpus was assembled by web-scraping publicly available UAE-based online content, filtering for clean coherent speech, and removing overlapping speaker segments to yield 4,174 audio samples averaging 1 minute and 3 seconds in length. Manual transcription and quality assurance were performed by five native Emirati speakers across 16 total hours of effort, following explicit guidelines to standardize Emirati-specific phenomena (e.g., mapping spoken ج back to MSA ق where etymologically required, preserving feminine terminal ج pronouns like 'راويتج', and utilizing Emirati negation particles like 'مب' or 'هب' instead of 'مو').

For ASR adaptation, prominent multilingual models—specifically Whisper-v2, Whisper-v3, Seamless-M4T-v2-Large, and MMS-1B-All—were fine-tuned using the Hugging Face Trainer library. Training utilized a batch size of 32, a learning rate of 1e-5 with a 5-step warmup, mixed-precision training (FP16), and a sequence length cap of 225 tokens for exactly 3 epochs on a single NVIDIA H100 GPU node using gradient checkpointing. The models were evaluated against zero-shot baselines (including FastConformer-Hybrid and ArTST-v3) using Word Error Rate (WER) and Character Error Rate (CER) on both the Hamsa test split (51 minutes, 861 samples) and the independent Mixat benchmark.

## Experimental setup

The evaluation relies on the Hamsa test split (51.8 minutes across 861 samples) and the independent Mixat test corpus. Models compared include Whisper-v2, Whisper-v3, Seamless-M4T-v2-Large, MMS-1B-All, FastConformer-Hybrid-Large, and ArTST-v3. Metrics reported are Word Error Rate (WER) and Character Error Rate (CER). Training was executed for 3 epochs with a batch size of 32 and a learning rate of 1e-5 on an NVIDIA H100 GPU.

## Results

Fine-tuning on Hamsa drastically cuts error rates across the board: Whisper-v2's WER on Hamsa drops from a zero-shot 42.25% down to 24.46% (with CER plummeting from 71.91% to 8.27%), while Whisper-v3 improves from 29.69% to 23.04%. These Hamsa-adapted models also generalize well to the independent Mixat benchmark, with Whisper-v2 achieving 25.74% WER. In contrast, models fine-tuned on the code-switched Mixat dataset often degraded or failed to generalize as cleanly, highlighting the purity and utility of Hamsa's monolingual training signal. However, MMS-1B-All remained the weakest overall model, yielding a high 41.55% WER even after fine-tuning.

| System / Condition | Fine-Tuning Data | Hamsa WER (%) | Hamsa CER (%) | Mixat WER (%) | Mixat CER (%) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Whisper-v2 | Zero-shot | 42.25 | 71.91 | 32.16 | 19.15 |
| Whisper-v2 | Hamsa | 24.46 | 8.27 | 25.74 | 11.54 |
| Whisper-v3 | Zero-shot | 29.69 | 31.49 | 26.42 | 13.29 |
| Whisper-v3 | Hamsa | 23.04 | 8.89 | 26.39 | 11.52 |
| FastConformer (Hybrid) | Zero-shot | 35.00 | 15.20 | 30.03 | 15.56 |
| ArTST-v3 | Zero-shot | 38.29 | 17.36 | 33.55 | 15.07 |

## Limitations

At roughly 11 hours, the corpus is modest in scale compared to massive multi-hundred-hour datasets. Geographic coverage is restricted, omitting finer rural or border-region dialectal nuances, and the training/test splits are not strictly speaker-independent. Additionally, formal inter-annotator agreement (IAA) metrics were omitted due to non-overlapping task allocation among annotators, relying instead on a secondary review pass over 45% of the data.

## Why read this

Speech and ML researchers focusing on low-resource dialectal ASR will find this a blueprint for building high-impact datasets with minimal manual hours. It demonstrates how careful orthographic guidelines and targeted fine-tuning can outperform models with vastly larger general pre-training data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Dialect-aware ASR systems, automatic subtitling, call center automation, and local LLM voice interfaces for the UAE market.

## Institutions / 機構

Technology Innovation Institute

## Related

- (link related pages by id as the wiki grows)
