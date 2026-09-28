---
id: geng26b_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1227
pdf: https://www.isca-archive.org/interspeech_2026/geng26b_interspeech.pdf
---

# Stabilizing Instruction Supervision for Instruct-TTS via Controllable Diversification and Drift Filtering

[PDF](https://www.isca-archive.org/interspeech_2026/geng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/geng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1227)

**TL;DR** — This paper addresses instruction supervision instability in Instruct-TTS by proposing a data-centric stabilization recipe that reduces semantic drift and raises instruction-following accuracy to 56.4%.

## Problem

Instruct-TTS models rely on LLMs to translate structured style labels into natural-language instructions, but over 40% of unconstrained rewrites suffer from semantic drift such as instruction-to-execution, role-assumption, or entity/label drift. These corrupted training signals degrade generalization and cause naive fine-tuning to underperform no-SFT baselines. The paper formalizes this as instruction supervision instability and demonstrates that improving data coverage and fidelity simultaneously is critical for reliable performance.

## Method

The authors introduce a three-part data-centric pipeline built on a CosyVoice 2-0.5B backbone trained on a 90-hour Chinese speech collection. First, attribute-aligned supervision pairs acoustic perturbations in pitch, speed, and volume with structured text templates to ground low-level prosody. Second, controllable instruction diversification uses hard constraints on personas, syntactic patterns, and attribute slots to systematically expand coverage via DeepSeek-R1 without free-form drift. Third, an LLM verifier powered by GPT-4o applies confidence scoring and self-consistency voting to filter out residual supervision-corrupting rewrites.

## Results

Evaluated on the Chinese split of InstructTTSEval across attribute-controlled pronunciation and style, dialogue scene description, and role-playing tasks, the full recipe achieves an average instruction-following accuracy of 56.4% (compared to 34.5% for base and 51.0% for naive SFT). Human evaluations show dramatic gains, yielding naturalness (NMOS) and controllability (CMOS) scores of 4.16, outperforming baseline systems by over 0.7 points. Ablation studies confirm that drift filtering is the most impactful single mechanism, dropping to 48.9% when removed.

## Code

- https://piedpiperg.github.io/instruct-tts-stabilizer/

## Applications

Speech and ML engineers building expressive text-to-speech, conversational assistants, and audiobook generation systems controlled by free-form natural language prompts.

## Limitations

The study focuses primarily on the Chinese language split and relies on external LLMs (GPT-4o and DeepSeek-R1) for instruction generation and filtering.

## Related

- (link related pages by id as the wiki grows)
