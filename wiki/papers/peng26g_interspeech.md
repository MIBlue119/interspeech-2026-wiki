---
id: peng26g_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1986
pdf: https://www.isca-archive.org/interspeech_2026/peng26g_interspeech.pdf
---

# Cross-modal Consistency Guidance for Robust Emotion Control in Auto-Regressive TTS Models

[PDF](https://www.isca-archive.org/interspeech_2026/peng26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1986)

**TL;DR** — The paper introduces Cross-modal Consistency Guided Classifier-Free Guidance and preference distillation to resolve emotional conflicts between text semantics and style prompts in autoregressive TTS, achieving up to a 12% absolute improvement in emotion recognition accuracy.

## Problem

When modern natural-language-controlled TTS systems are given target emotions that conflict with textual semantics (such as demanding a surprised tone for a sad memory), expressiveness and speech quality severely degrade. Standard classifier-free guidance (CFG) can amplify the target style but naively introduces severe synthesis artifacts and hurts intelligibility. Resolving this cross-modal mismatch remains a major challenge in autoregressive speech models.

## Method

The authors propose Cross-modal Consistency Guided CFG (CCG-CFG), which replaces the standard unconditional dropout conditioning with the text's inherent emotion when cross-modal inconsistency is detected. An external LLM evaluates the degree of inconsistency across three profiles (Identical, Inconsistent, Highly Inconsistent) to dynamically scale guidance weights via a mapping of {1.0, 2.5, 3.0}. To eliminate two-pass inference overhead and CFG artifacts, the guidance signal is distilled into the autoregressive TTS LLM using Direct Preference Optimization (DPO). Training employs a hard-sample mining strategy that pairs text with contrasting emotions, sampling candidates across multiple seeds and scales, and ranking them via a composite score balancing WER and emotion confidence.

## Results

Evaluated on a combined 40-hour corpus of seven emotional datasets (ESD, MESS, MEAD, TESS, SAVEE, LibriTTS, VCTK) and two TTS benchmarks, the proposed dynamic-scale CCG-CFG applied to CosyVoice2 achieves up to a 12% absolute improvement in emotion recognition accuracy and a 10% relative improvement in subjective scores. Compared against baselines like HierSpeech++, Qwen3-TTS, and original CosyVoice2, the approach maintains high intelligibility, naturalness, and speech quality. DPO distillation with hard-sample mining further retains strong performance while removing runtime decoding overhead.

## Code

- https://pengyizhou.github.io/Emotional_tts_demo

## Applications

Speech engineers and developers building conversational agents, virtual assistants, and digital avatars that require robust zero-shot natural language emotional control over synthesized speech.

## Limitations

The method relies on an external LLM to detect text emotion and assess cross-modal inconsistency profiles during inference, introducing dependency on a secondary language model module.

## Related

- (link related pages by id as the wiki grows)
