---
id: zhang26aa_interspeech
category: asr
labels: [multilingual]
institutions: ["Alibaba Group", "University of Macau", "Chinese University of Hong Kong"]
code: https://github.com/ChenX17/PART
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1734
pdf: https://www.isca-archive.org/interspeech_2026/zhang26aa_interspeech.pdf
---

# PART: Progressive Alignment Representation Training for Multilingual Speech-To-Text with LLMs

*Pei Zhang, Andong Chen, Xi Chen, Baosong Yang, Derek F. Wong, Fei Huang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26aa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26aa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1734)

**Category:** `asr` · **Labels:** `multilingual`

**TL;DR** — PART is a multi-stage, multi-task training framework for multilingual speech large models that uses progressive encoder unfreezing and task-dependent LLM activation to prevent language collapse, achieving state-of-the-art results on FLEURS, Common Voice 15, and CoVoST2.

## Key contributions

- Proposes a multi-stage alignment framework separating in-language ASR from cross-lingual S2TT to prevent multilingual representation collapse.
- Designs a task-dependent activation strategy freezing the LLM during in-language ASR while activating it for multilingual tasks.
- Implements a progressive encoder unfreezing schedule starting with the last 8 layers before opening the full speech encoder.
- Introduces an adapter-only first stage for coarse-grained alignment followed by joint optimization with LLM LoRA.

## Problem

Mainstream speech large models freeze the LLM and jointly train speech encoders on mixed multilingual data, causing audio representations to collapse into a shared feature space across languages. This degrades fine-grained multilingual speech distinctions and yields only coarse modality-level alignment. Overcoming this is critical for robust performance in complex multilingual speech recognition and translation tasks.

## Method

The model consists of a 700M SenseVoice-large speech encoder, a lightweight adapter (two transformer layers and one CNN layer), and a multilingual Qwen2.5 LLM (1.5B or 7B parameters). Log-mel spectrogram features are projected into the LLM embedding space and concatenated with instruction tokens.

Training proceeds in three distinct stages. In Stage 1 (Adapter-only Within-Language Alignment), the encoder and LLM are frozen while training only the adapter on 810k hours of multilingual ASR data (D_mimo) for coarse alignment. In Stage 2 (Within-Language Alignment with Progressive Encoder Unfreezing), the encoder is unfrozen in two phases—first the last 8 layers, then the entire encoder—while still using ASR data to refine feature representations without cross-lingual interference. In Stage 3 (Joint Optimization with LLM-Adaptive), cross-lingual S2TT tasks (434k hours) are introduced, and the LLM is unfrozen via LoRA alongside the encoder and adapter to handle length discrepancies and semantic mapping.

Inference uses greedy decoding on the combined speech and instruction embeddings.

## Experimental setup

Experiments use 810k hours of commercial ASR data across 10 languages and 434k hours of S2TT data from CoVoST2, TED-LIUM, MuST-C, and translations. Evaluation datasets are FLEURS, Common Voice 15 (ASR via CER/WER), and CoVoST2 (S2TT via BLEU). Models are trained on 256 NVIDIA A800 GPUs for three epochs, comparing against Whisper-large-v3, Qwen2-Audio, Qwen2.5-Omni, MinMo, Speech-LLaMA, and LLaST.

## Results

On FLEURS ASR, PART-2B achieves an average WER of 4.7 (vs 6.4 for Baseline-2stage and 6.0 for Whisper-large-v3), while PART-8B reaches 3.7. On Common Voice 15 ASR, PART-2B records 7.4 average WER (vs 9.2 for Baseline-2stage), and PART-8B reaches 6.6. On CoVoST2 xx->en translation, PART-2B obtains 35.4 average BLEU (vs 34.0 for Baseline-2stage), and PART-8B reaches 39.1 BLEU. Ablations show that removing staged ASR-to-S2TT, LLM LoRA, or progressive unfreezing results in consistent performance drops of 0.3 to 1.6 points across metrics.

| Models | Params | FLEURS Avg WER | CV15 Avg WER | CoVoST2 xx->en BLEU |
|---|---|---|---|---|
| Whisper-large-v3 | 1.6B | 6.0 | 8.0 | 31.5 |
| MinMo | 8B | 4.3 | 7.8 | 38.4 |
| Baseline-2stage | 2B | 6.4 | 9.2 | 34.0 |
| PART-2B | 2B | 4.7 | 7.4 | 35.4 |
| PART-8B | 8B | 3.7 | 6.6 | 39.1 |

## Limitations

Evaluated on a restricted set of 10 languages for ASR and 7 translation directions for S2TT, leaving out low-resource languages beyond this set. The reliance on massive proprietary commercial datasets (810k ASR hours) limits exact reproducibility by external research groups. The compute scale required (256 NVIDIA A800 GPUs) makes training inaccessible for smaller labs.

## Why read this

Speech-language model researchers should read this to understand how multi-stage training schedules and gradient alignment mitigate representation collapse in multilingual speech LLMs. It provides concrete recipes for combining encoder unfreezing with adapter and LLM fine-tuning.

## Code

- https://github.com/ChenX17/PART

## Applications

Multilingual automatic speech recognition and real-time speech-to-text translation systems deployed in global assistant applications.

## Institutions / 機構

Alibaba Group, University of Macau, Chinese University of Hong Kong

**Funding / 經費:** Science and Technology Development Fund of Macau SAR, UM and UMDF

## Related

- (link related pages by id as the wiki grows)
