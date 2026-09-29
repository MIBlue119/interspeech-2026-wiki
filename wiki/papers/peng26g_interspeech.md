---
id: peng26g_interspeech
category: tts
labels: [generative-model]
institutions: ["Nanyang Technological University", "Alibaba", "Alibaba-NTU Global e-Sustainability CorpLab"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1986
pdf: https://www.isca-archive.org/interspeech_2026/peng26g_interspeech.pdf
---

# Cross-modal Consistency Guidance for Robust Emotion Control in Auto-Regressive TTS Models

*Yizhou Peng, Yukun Ma, Chong Zhang, Yi-Wen Chao, Chongjia Ni, Bin Ma, Eng Siong Chng*

[PDF](https://www.isca-archive.org/interspeech_2026/peng26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1986)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — The paper introduces Cross-modal Consistency Guided Classifier-Free Guidance (CCG-CFG) and a subsequent DPO distillation strategy to resolve emotional degradation when target emotions conflict with textual semantics in auto-regressive TTS models, achieving up to a 12% absolute improvement in emotion-recognition accuracy.

## Key contributions

- Replaces standard unconditional dropout in Classifier-Free Guidance with the detected text emotion when cross-modal inconsistency is detected, effectively expanding the guidance margin.
- Introduces a dynamic guidance scale (DS-CCG-CFG) mapped from an LLM-measured inconsistency profile (Identical, Inconsistent, Highly Inconsistent) to balance expressiveness and intelligibility.
- Applies a hard-sample mining and Direct Preference Optimization (DPO) distillation strategy to internalize the guidance signal, removing the two-pass decoding inference overhead and CFG artifacts.
- Curates a multi-dataset emotional corpus comprising 40 hours across 7 datasets and 7 emotion categories for robust training and evaluation.

## Problem

Modern neural TTS systems enable fine-grained emotion control via natural language instructions, but frequently encounter cross-modal inconsistencies where the user-specified rendered emotion conflicts directly with the input text semantics (e.g., stating 'It isn't a happy memory' in a surprised tone). Traditional auto-regressive architectures and standard Classifier-Free Guidance (CFG) either fail to reconcile competing signals or introduce severe speech artifacts, high Word Error Rates (WER), and degraded intelligibility. Resolving this mismatch is critical for reliable, expressive virtual assistants and conversational agents.

## Method

The framework builds upon an auto-regressive speech LLM (CosyVoice2). Given target text and a user-specified rendered emotion prompt, an external LLM (gpt-5.2-2025-12-11) extracts the text emotion and categorizes the inconsistency profile into one of three states: Identical, Inconsistent, or Highly Inconsistent. During inference, two parallel passes are executed: one conditioned on the rendered emotion and the other on the text emotion (replacing the zero/unconditional dropout of standard CFG). These logits are fused using a dynamic scale w mapped from the profile via {1.0, 2.5, 3.0}, determined via grid search.

To remove inference-time two-pass overhead and CFG artifacts, the DS-CCG-CFG signal is distilled via Direct Preference Optimization (DPO). A hard-sample mining strategy pairs texts with contrasting target emotions to artificially induce mismatch. For each text, 25 candidate utterances are generated across 5 random seeds and 5 CFG scales (w in [1.0, 3.0]). Candidates are ranked using an objective score combining ASR transcription correctness (Whisper-Large-V3-Turbo) and SER-based emotion confidence penalizing wrong predictions. The highest and lowest scoring samples form preference pairs for DPO.

Training uses the combined Train split plus 20k text-only VCTK samples (EXT) on a single H20-96GB GPU. Optimization uses the Adam optimizer with a learning rate of 10^-5, effective batch size of 640 seconds, and runs for 4 epochs without model averaging.

## Experimental setup

Evaluated on a combined corpus of 7 datasets (ESD, MESS, MEAD, TESS, SAVEE, LibriTTS, VCTK) spanning 40 hours of training data (38,883 utterances), 2.8 hours of validation (2,445 utterances), and 2.8 hours of testing (2,445 utterances) across 7 emotion categories. Baselines include HierSpeech++, Qwen3-TTS, and the original CosyVoice2. Metrics include EmoACC via emo2vec-plus-large, UTMOS, DNSMOS, NISQA, WER via Whisper-Large-V3-Turbo, human evaluations (NMOS, EMOS, MOS), and Model-as-Judge (MaJ) using Gemini-3.1-Pro-preview.

## Results

CosyVoice2 without a rendered emotion reference yields an EmoACC of 50.63% and WER of 4.61%. Standard static-scale CFG improves EmoACC up to 56.40% but degrades WER to a poor 9.88% at high guidance scales. The proposed training-free DS-CCG-CFG recovers EmoACC to 64.83% with a moderate WER of 7.86% and the highest MaJ score of 58.4. The distilled DS-CCG-CFG-DPO model with hard external data eliminates inference overhead while achieving a superior low WER of 3.76% and an EmoACC of 59.55%, outperforming zero-shot baselines and matching or beating reference-leaking baselines in human subjective tests (3.94 NMOS, 3.67 EMOS, 4.33 MOS).

| Systems / Conditions | EmoACC (%) ↑ | WER (%) ↓ | UTMOS ↑ | MaJ ↑ |
| --- | --- | --- | --- | --- |
| CosyVoice2 (Neutral Ref) | 50.63 | 4.61 | 4.32 | 53.0 |
| CosyVoice2-CFG (High) | 56.40 | 9.88 | 4.15 | 50.8 |
| DS-CCG-CFG (Proposed) | 64.83 | 7.86 | 4.09 | 58.4 |
| DS-CCG-CFG-DPO + Hard Ext | 59.55 | 3.76 | 4.29 | 57.0 |

## Limitations

The approach relies on an external LLM at training time (and inference time unless distilled via DPO) to evaluate text-rendered emotional consistency profiles. The evaluation is currently restricted to English/standard speech corpora and standard categorical emotions, meaning generalization to code-switching, highly nuanced paralinguistics, or wild acoustic conditions remains untested.

## Why read this

Speech researchers and engineers working on auto-regressive emotional TTS or Classifier-Free Guidance modifications should read this paper to learn how to replace unconditional dropouts with semantic text conditions and how to eliminate inference-time multi-pass overhead using preference optimization.

## Code

- https://pengyizhou.github.io/Emotional_tts_demo

## Applications

Expressive virtual assistants, audiobook narration systems, and digital avatar voice generation requiring natural language emotional control under semantic-emotional conflict.

## Institutions / 機構

Nanyang Technological University, Alibaba, Alibaba-NTU Global e-Sustainability CorpLab

**Funding / 經費:** Agency for Science, Technology and Research, Alibaba Group, Nanyang Technological University

## Related

- (link related pages by id as the wiki grows)
