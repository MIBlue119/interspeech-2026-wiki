---
id: teikitohe26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
institutions: ["University of French Polynesia", "Dartmouth College", "University of Auckland"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3276
pdf: https://www.isca-archive.org/interspeech_2026/teikitohe26_interspeech.pdf
---

# Speech Recognition to Accelerate Documentation of Marquesan and Cook Islands Māori

*Marie Teikitohe, Rolando Coto-Solano, Sally Akevai Nicholas*

[PDF](https://www.isca-archive.org/interspeech_2026/teikitohe26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/teikitohe26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3276)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — This paper investigates Automatic Speech Recognition (ASR) for endangered Marquesan and Cook Islands Māori, establishing that fine-tuned Wav2Vec2 models combined with KenLM language models achieve a WER of 30.0% and accelerate human language documentation workflows by 0.7x to 2.4x.

## Key contributions

- Collected and manually transcribed a new 17-hour naturalistic speech corpus for Marquesan spanning 38 speakers and 6 dialectal varieties.
- Benchmarked multiple speech foundation models (Wav2Vec2, Whisper, MMS, Parakeet, Qwen3, Omnilingual) for Marquesan, demonstrating that Wav2Vec2-XLSR53 with a KenLM language model performs best (CER 16.0, WER 31.4).
- Improved the Cook Islands Māori ASR state-of-the-art using Wav2Vec2 + KenLM down to CER 1.8 and WER 7.2.
- Quantified real-world language documentation time savings, showing that correcting ASR transcripts reduces transcription time by 74% to 243% compared to completely manual typing.

## Problem

Endangered Polynesian languages like Marquesan and Cook Islands Māori suffer from severe scarcity of speech processing resources, threatening data sovereignty and long-term preservation of oral heritage. Traditional language documentation is bottlenecked by entirely manual transcription workflows, which are notoriously slow. While low-resource ASR has advanced, prior studies present contradictory evidence regarding whether modern ASR actually yields time gains for fieldworkers—often breaking down when Word Error Rates exceed 30% or when handling acoustically challenging naturalistic fieldwork audio.

## Method

The authors evaluate several speech foundation models, notably Meta's Wav2Vec2 Large XLSR-53, MMS-1b-all, OpenAI's Whisper Medium, Nvidia's Parakeet TDT 0.6b v3, Alibaba's Qwen3 ASR 1.7B, and Meta's Omnilingual 1B. Inference for Wav2Vec2, MMS, Whisper, and Omnilingual was augmented using KenLM language models to handle orthography and reduce lexical errors. Training utilized 17 hours of Marquesan data (16,417 recordings, avg duration 3.7 seconds) and 4 hours of Cook Islands Māori (CIM) data (5,086 recordings, avg duration 2.9 seconds) on an Nvidia A100 GPU using roughly 246 total GPU hours. Cross-lingual transfer and joint fine-tuning experiments were conducted using the best-performing model architecture (Wav2Vec2 + LM) by merging or sequentially training on datasets from both closely related Polynesian languages. Audio segmentation relied on Silero VAD to provide time-stamped utterance boundaries prior to acoustic model decoding.

## Experimental setup

Evaluated on a 17-hour Marquesan corpus (38 L1 speakers, 6 dialectal varieties) and a 4-hour Cook Islands Māori corpus (11 speakers, 4 islands), split into random 80/10/10 train/dev/test partitions across 5 runs. Baselines included Whisper Medium, MMS-1b-all, Parakeet TDT 0.6b v3, Qwen3 ASR 1.7B, and Omnilingual 1B, with and without KenLM language models. Evaluation metrics were median Character Error Rate (CER) and Word Error Rate (WER).

## Results

For Marquesan monolingual fine-tuning, Wav2Vec2-XLSR53 with a KenLM language model achieved the best results with a CER of 16.0 and a WER of 31.4, outperforming Whisper Medium + LM (CER 21.0, WER 44.4) and Omnilingual 1B + LM (CER 18.9, WER 36.4). Joint training on both Marquesan and Cook Islands Māori provided a minor improvement for Marquesan, reaching CER 15.4 and WER 30.8, though a Mann-Whitney U test indicated this difference was not statistically significant (p=0.30). Conversely, CIM did not benefit from transfer or joint training, retaining its best performance under monolingual fine-tuning at CER 1.8 and WER 7.2. In workflow evaluations, manual transcription required 5.18 to 9.14 work-minutes per audio minute, whereas correcting ASR outputs required only 1.51 to 5.18 work-minutes per audio minute, proving 74% to 243% faster.

| System / Condition | CER | WER |
|---|---|---|
| Wav2Vec2-XLSR53 (Marquesan Mono) | 20.7 | 50.0 |
| Wav2Vec2-XLSR53 + LM (Marquesan Mono) | 16.0 | 31.4 |
| Wav2Vec2-XLSR53 + LM (Marquesan Transfer) | 16.9 | 33.3 |
| Wav2Vec2-XLSR53 + LM (Marquesan Joint) | 15.4 | 30.8 |
| Wav2Vec2-XLSR53 + LM (CIM Mono) | 1.8 | 7.2 |
| Wav2Vec2-XLSR53 + LM (CIM Joint) | 3.4 | 11.9 |

## Limitations

The study is constrained by a relatively small data scale (17 hours for Marquesan, 4 hours for CIM) and limited language coverage restricted to two Eastern Polynesian languages. Naturalistic fieldwork audio introduces unconstrained acoustic variation, background noise, overlapping speakers, and code-switching (primarily French), which degraded model stability and drove up insertion errors. Furthermore, the observed cross-lingual transfer gains between closely related languages were negligible, indicating current transfer methodologies remain brittle for extremely low-resource settings.

## Why read this

Researchers and engineers building speech tools for extremely low-resource, endangered languages should read this paper to see a rigorous end-to-end evaluation of foundation models combined with language models in real fieldwork documentation pipelines. It provides concrete proof and quantification of transcription time savings, bridging the gap between raw WER metrics and practical linguistic field applications.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Accelerating Indigenous language documentation workflows, community-driven language revitalization projects, and automated transcription pipelines for low-resource Austronesian languages.

## Institutions / 機構

University of French Polynesia, Dartmouth College, University of Auckland

## Related

- (link related pages by id as the wiki grows)
