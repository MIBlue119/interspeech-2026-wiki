---
id: geng26b_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1227
pdf: https://www.isca-archive.org/interspeech_2026/geng26b_interspeech.pdf
---

# Stabilizing Instruction Supervision for Instruct-TTS via Controllable Diversification and Drift Filtering

*Yizhong Geng, Kecan Mao, Qifei Li, Cong Wang, Yingming Gao, Ruimin Wang, Chunfeng Wang, Hao Li, Ya Li*

[PDF](https://www.isca-archive.org/interspeech_2026/geng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/geng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1227)

**TL;DR** — Over 40% of unconstrained LLM rewrites in Instruct-TTS label-to-instruction pipelines contain semantic drift, corrupting training supervision; the authors propose a data-centric stabilization recipe that raises instruction-following accuracy from 34.5% (no SFT) to 56.4% on the Chinese split of InstructTTSEval.

## Key contributions

- Formalized instruction supervision instability and established a concrete three-category drift taxonomy (instruction-to-execution, role-assumption, entity/label drift) showing that over 40% of unconstrained rewrites corrupt training.
- Designed a data-centric stabilization recipe combining controllable instruction diversification, LLM verifier-based drift filtering, and attribute-aligned supervision.
- Demonstrated that combining confidence thresholding and self-consistency voting for drift filtering successfully trades off data retention (61.5%) for semantic fidelity.
- Achieved state-of-the-art results on the Chinese split of InstructTTSEval, improving instruction-following accuracy to 56.4% and boosting human-rated naturalness (NMOS) and controllability (CMOS) to 4.16.

## Problem

Instruct-TTS models rely on expanding structured style labels into natural-language instructions using LLM rewriting (the label-to-instruction pipeline). However, this supervision source suffers from two major limitations: limited phrasing coverage and severe semantic drift where LLMs silently alter control meanings, produce execution utterances, or assume in-character personas. Unconstrained rewriting yields a 40.4% drift rate, causing naive fine-tuning to underperform or degrade generalization. Without fixing these data-level defects, model-side architectures alone cannot reliably learn robust instruction-following behavior.

## Method

The proposed stabilization recipe comprises three stages: attribute-aligned supervision, controllable instruction diversification, and drift filtering. First, pre-segmented speech clips annotated with structured attributes (accent, emotion, gender, style) are augmented with parameterized acoustic perturbations (pitch by ±1/2/3 semitones, speed by 0.8/0.9/1.1/1.2/1.3x, and volume by ±3/6/9 dB) mapping to 17 variants per clip using lightweight templates, which grounds low-level prosody control.

Second, controllable instruction diversification expands text coverage by generating instructions from seed attributes using DeepSeek-R1 constrained by three hard rules: persona (speaker viewpoint), syntactic pattern (surface form), and attribute slots (nondroppable target attributes), preventing free-form drift and generating up to 24 candidates per seed.

Third, drift filtering utilizes GPT-4o as an independent verifier to score candidates against the drift taxonomy, discarding those below a confidence threshold (<= 5/10) and using self-consistency majority voting for borderline cases. The retained high-fidelity pairs are used to fine-tune a CosyVoice 2.0-0.5B backbone using AdamW (lr 2e-5, batch size 16, 3 epochs, cosine schedule with a 500-step warmup).

## Experimental setup

Evaluated on the Chinese split of InstructTTSEval across three tasks: Attribute-controlled Pronunciation and Style (APS), Dialogue Scene Description (DSD), and Role-Playing (RP). The training set consists of approximately 90 hours of Chinese speech (12k clips under 30s) from 8 accent and 10 style categories. Baselines include VoxInstruct and a no-SFT CosyVoice 2.0-0.5B base model, alongside naive SFT on unfiltered rewrites. Metrics include Gemini 3 Pro-judged instruction-following accuracy (%), Character Error Rate (CER %), and 20-listener human evaluations for Naturalness (NMOS) and Controllability (CMOS) on a 1-5 scale.

## Results

The Full Recipe achieves a headline instruction-following accuracy of 56.4% on InstructTTSEval (Chinese), outperforming the no-SFT baseline (34.5%) and naive SFT (51.0%), while lowering CER to 17.7%. In human evaluation, the recipe reaches an NMOS of 4.16 and CMOS of 4.16, outperforming VoxInstruct (NMOS 3.18, CMOS 3.12). Ablations confirm the necessity of all three mechanisms: removing drift filtering drops accuracy to 48.9%, removing controllable diversification drops it to 51.8%, and removing attribute-aligned supervision drops it to 53.1% (with APS specifically falling from 49.5% to 42.7%). Constrained rewriting reduces raw drift from 40.4% down to 15.4%, and the combined scoring-and-voting filtering strategy yields 65.4% DSD accuracy at a 61.5% data retention rate.

| System / Condition | APS Acc (%) | DSD Acc (%) | RP Acc (%) | Avg Acc (%) | CER (%) | NMOS |
|---|---|---|---|---|---|---|
| VoxInstruct | 47.5 | 52.3 | 42.6 | 47.5 | 22.5 | 3.18 |
| Base (no SFT) | 20.2 | 45.5 | 37.7 | 34.5 | 35.0 | 3.30 |
| Naive SFT | 45.2 | 62.2 | 45.5 | 51.0 | 19.2 | 3.46 |
| Full Recipe | 49.5 | 65.4 | 54.4 | 56.4 | 17.7 | 4.16 |

## Limitations

The evaluation is restricted to the Chinese language split of InstructTTSEval, leaving multilingual and cross-lingual generalization untested. The dataset scale used for fine-tuning is relatively small (~90 hours), and compute requirements depend on external frontier LLMs (DeepSeek-R1 and GPT-4o) for generation and verification. The drift taxonomy is currently tailored specifically to instruct-driven TTS tasks rather than generic speech-language models.

## Why read this

Speech researchers and engineers building Instruct-TTS systems will learn how to systematically audit, filter, and expand LLM-rewritten instruction data to prevent semantic drift. It provides a principled, reproducible recipe for turning noisy label-to-instruction pipelines into high-fidelity training corpora.

## Code

- https://piedpiperg.github.io/instruct-tts-stabilizer/

## Applications

Building robust natural-language-controlled text-to-speech engines for audiobooks, conversational AI assistants, and expressive media content creation.

## Related

- (link related pages by id as the wiki grows)
