---
id: yang26o_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2970
pdf: https://www.isca-archive.org/interspeech_2026/yang26o_interspeech.pdf
---

# Speech Recognition on TV Series with Video-Guided Post-ASR Correction

*Haoyuan Yang, Yue Zhang, Liqiang Jing, John Hansen*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2970)

**TL;DR** — The paper introduces Video-Guided Post-ASR Correction (VPC), a training-free framework that uses a Video-Large Multimodal Model (VLMM) and an LLM to refine ASR transcripts using video context, achieving up to a 20.75% relative WER reduction on TV series. 

## Key contributions

- Proposes the first video-guided post-ASR correction framework designed to leverage visual modality cues for resolving transcription errors.
- Formulates a two-stage extraction strategy using a VLMM with targeted prompts (TV show identification and fine-grained action descriptions).
- Integrates high-level video semantics with an LLM for context-aware ASR error correction without requiring additional model training.
- Constructs and evaluates on Violin-TV, a curated 90-hour benchmark subset of TV series clips with primary English audio.

## Problem

Automatic Speech Recognition systems degrade significantly in complex real-world environments such as TV series and movies, which feature multiple speakers, heavy overlapping speech, domain-specific terminology, and long-range contextual dependencies. Traditional audio-only decoding cannot disambiguate homophones or rare proper nouns without broader contextual knowledge. Meanwhile, existing audio-visual speech recognition (AVSR) methods like AV-HuBERT fail in these settings because they rely heavily on low-level facial movements and high-resolution, perfectly aligned lip-reading tracks that are routinely obstructed by wide shots, off-screen speakers, or poor lighting.

## Method

The framework operates in two sequential stages: ASR Generation and Video-guided Post-ASR Correction. In the first stage, audio inputs are transcribed using a fine-tuned backbone ASR model (wav2vec 2.0, HuBERT, WavLM, or Conformer). In the second stage, the corresponding video clip is processed by a Video-Large Multimodal Model (VideoLLaMA2) using two distinct question prompts: Coarse-QA (identifying the TV show and background setting) and Fine-QA (describing character actions and scene elements), yielding rich visual context strings C1 and C2.

These extracted visual contexts, alongside the initial ASR hypothesis and task instructions, are fed into a Large Language Model (GPT-4o) to execute context-aware error correction. This design choice bypasses the need to collect massive paired cross-modal training data or train dedicated sequence-to-sequence correction models. The LLM leverages the visual world knowledge (such as character names and scene settings) to perform context-dependent disambiguation, fixing phonetic approximations and homophones that text-only LLMs fail to catch.

## Experimental setup

Evaluations are performed on the Violin-TV subset comprising 10,003 TV clips (90.027 hours total duration, average clip length 32.4 seconds, 74.9% speech density), split into 72 hours for training (7,983 clips), 9 hours for validation (1,007 clips), and 9 hours for testing (1,013 clips). ASR backbones (wav2vec 2.0, HuBERT, WavLM) are pretrained on Librispeech-960h and fine-tuned with CTC loss, while Conformer-Large uses RNN-T loss. The evaluation metric is Word Error Rate (WER), comparing raw ASR outputs and text-only GPT-4o post-correction baselines against the proposed VPC framework utilizing VideoLLaMA2 and GPT-4o.

## Results

On the Violin-TV test set, the proposed VPC framework achieves substantial relative WER reductions across all evaluated backbones. For WavLM-Large, WER drops from 29.83% to 23.64%, representing a 20.75% relative improvement. For wav2vec 2.0, WER improves by 13.06% (from 29.17% to 25.36%); for HuBERT-large, by 11.86% (from 26.40% to 23.27%); and for Conformer-large, by 7.46% (from 22.66% to 20.97%). Text-only GPT-4o correction without visual context yields negligible or negative performance changes (-0.38% on wav2vec 2.0, +1.27% on WavLM), proving that visual context is mandatory for effective correction.

Prompt ablation studies across a 100-clip subset demonstrate that combining both coarse show-level cues and fine-grained scene descriptions (All-QA) achieves the best performance (22.54% WER on WavLM vs 23.37% for Coarse-QA and 23.72% for Fine-QA), confirming that both high-level situational context and visual details actively drive error correction.

| System | Raw ASR WER (%) | GPT (w/o visual) | VPC (Proposed) | Raw-VPC Impr. (%) |
|---|---|---|---|---|
| wav2vec2-large | 29.17 | 29.28 | 25.36 | 13.06% |
| HuBERT-large | 26.40 | 25.73 | 23.27 | 11.86% |
| WavLM-large | 29.83 | 29.45 | 23.64 | 20.75% |
| Conformer-large | 22.66 | 22.14 | 20.97 | 7.46% |

## Limitations

The method relies heavily on proprietary or heavy external models (VideoLLaMA2 and GPT-4o), making it computationally expensive and unsuitable for low-latency or edge/on-device real-time applications. The study is restricted to English-language TV series segments where video contains identifiable semantic cues, limiting generalizability to purely acoustic domains, audio-only podcasts, or non-English content where VLMM identification fails.

## Why read this

Researchers and engineers working on ASR post-processing or multimodal speech systems should read this paper to understand how high-level video semantics via VLMMs can correct ASR errors without training specialized audio-visual architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Media transcription for TV and film archives, automated closed-captioning for entertainment streaming, and accessibility software for complex multimedia environments.

## Related

- (link related pages by id as the wiki grows)
