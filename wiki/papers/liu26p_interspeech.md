---
id: liu26p_interspeech
category: tts
labels: [generative-model]
institutions: ["Shanghai Himalaya Technology Co., Ltd"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2125
pdf: https://www.isca-archive.org/interspeech_2026/liu26p_interspeech.pdf
---

# audiobook-cc: Controllable Long-context Speech Generation for Multicast Audiobook

*Min Liu, JingJing Yin, Xiang Zhang, JianHao Ye, Siyu Hao, Siwei Xia, Hongbin Zhou*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2125)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — Audiobook-CC is a context-aware and emotion-controllable speech synthesis framework designed for multicast audiobooks, achieving 4.25 M-MOS on chapter-level generation (a 14% relative gain over strongest baselines).

## Key contributions

- A context modeling mechanism incorporating pre- and post-context text inputs to improve semantic and narrative consistency across long-form generations.
- A decoupled training paradigm that separates target speech style from prompt speech, eliminating unwanted prosodic carryover while preserving target speaker timbre via Cam++ embeddings.
- A multi-constraint prompt selection mechanism using chapter-level clustering and voiceprint similarity constraints to maintain character persona stability.
- An iterative self-distillation strategy leveraging synthetic data augmentation to enhance high-intensity emotional control and reduce phoneme error rates.

## Problem

Existing text-to-speech architectures focus primarily on single-sentence synthesis or podcast creation, lacking explicit inter-sentence modeling and fine-grained control needed for coherent, multi-character audiobook production. Prior modular pipelines or memory modules suffer from prosodic rigidity, redundancy, or persona inconsistency because they rely on coupled prompt-target training where the style is inadvertently dictated by the prompt audio. Audiobook production requires precise narrative flow, dynamic emotional transitions, and stable voice identities across chapters, which current automated solutions fail to deliver simultaneously.

## Method

The Audiobook-CC framework builds on the CosyVoice2 architecture, retaining its text and speech tokenizers and flow-matching modules, but replaces the HiFi-GAN vocoder with BigVGAN to maximize audio fidelity and robustness. The core auto-regressive text-speech language model takes a speaker embedding V (extracted via Cam++ from a semantically unrelated utterance of the same speaker), text tokens W, ground-truth speech tokens U, and structured contextual boundaries representing pre-context (C_pre) and post-context (C_post). Control sequences including emotional tokens (categorized into nine emotions with four intensity levels: extremely, considerable, some, slight), volume, and speaking rate are concatenated directly into the sequence.

To decouple style from prompts during training, the model uses independent data pairings where the prompt speaker audio shares timbre and persona with the target speaker but contains completely unrelated text content, allowing prosody to emerge purely from local text semantics and context markers. At inference time, post-context is pulled directly from subsequent sentences in the script to guide transitions. To resolve high-intensity emotion data sparsity, a self-distillation pipeline generates candidate samples, filters them based on phoneme error rate (PER < 2%), speaker similarity (SS > 0.7), and pitch dynamics, and re-injects balanced synthetic subsets for iterative model refinement.

## Experimental setup

Training occurred in three distinct stages: first, 1,000,000 hours of diverse audio (audiobooks, podcasts, TV dramas) for general fine-tuning initialized from CosyVoice2; second, 150,000 hours of context-aware audiobook data and 100 hours of instruction-labeled recordings; third, 100 hours of self-distilled data augmentation. The model was optimized using AdamW with learning rates of 1e-4, 1e-5, and 1e-6 across the three stages on 64 NVIDIA A800 GPUs with a batch size of 384 for 720k, 300k, and 10k steps. Evaluations used Test-NAR (100 paragraphs), Test-DIA (570 dialog sentences), and Test-CHAP (15 chapters) via S-MOS, M-MOS, ABX listening tests, phoneme error rate (PER), and speaker similarity (SS) against CosyVoice2 and MOSS-TTSD baselines.

## Results

In subjective evaluations, the proposed Infer-ctx&inst configuration achieved headline M-MOS scores of 4.25 ± 0.11 on chapter-level generation and S-MOS scores of 4.11 ± 0.06 on dialog, outperforming CosyVoice2 (3.88 chapter M-MOS) and MOSS-TTSD (3.72 chapter M-MOS). For narration tests, context-aware inference alone (Infer-ctx) reached 4.06 ± 0.08 M-MOS compared to 3.91 for CosyVoice2. In ABX preference tests, the combined configuration won 73.0% preference on chapter-level tasks and 61.4% on dialog against baselines. Ablation analyses proved that a decoupling threshold of 0.68 balances speaker similarity (SS = 0.69) and naturalness (S-MOS = 3.86) better than non-decoupled models (SS = 0.87, S-MOS = 3.45). Self-distillation data scaling reduced phoneme error rates from 4.54% down to 1.23% while recovering emotion F1 scores.

| System / Condition | Narration (M-MOS) | Dialogue (S-MOS) | Chapter (M-MOS) |
|---|---|---|---|
| CosyVoice2 [6] | 3.91 ± 0.07 | 3.84 ± 0.09 | 3.88 ± 0.07 |
| MOSS-TTSD [8] | 3.78 ± 0.11 | 3.67 ± 0.07 | 3.72 ± 0.09 |
| Proposed (Infer-ctx) | 4.06 ± 0.08 | 3.93 ± 0.06 | 4.13 ± 0.09 |
| Proposed (Infer-inst) | / | 3.96 ± 0.08 | / |
| Proposed (Infer-ctx&inst) | / | 4.11 ± 0.06 | 4.25 ± 0.11 |

## Limitations

The framework relies heavily on large-scale domain-specific pretraining datasets (1M+ hours) and fine-grained script annotations (timestamps, speaker IDs, chapter positions), which may limit reproducibility for lower-resource languages or independent academic labs. While self-distillation helps mitigate data sparsity, extremely synthetic datasets can initially introduce distributional shifts that impact emotional F1 metrics. Evaluation is limited primarily to Chinese datasets and test sets, leaving multilingual scalability unverified.

## Why read this

Researchers and engineers building long-form conversational or multi-character speech generation systems should read this paper to understand how decoupled prompt training and local text context integration can eliminate prosodic prompt artifacts without sacrificing speaker identity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated production of multicast audiobooks, dramatic multi-character podcast creation, and expressive long-form audio storytelling.

## Institutions / 機構

Shanghai Himalaya Technology Co., Ltd

## Related

- [MagpieTTS-LF: Inference-Time Long-Form Speech Generation Without Training on Long-Form data](ghosh26f_interspeech.md) — same problem · relatedness 2.2/3
- [AuDirector: A Self-Reflective Closed-Loop Framework for Immersive Audio Storytelling](ren26d_interspeech.md) — same problem · relatedness 2.0/3
- [FineCombo-TTS: Collaborative and Precise Controllable Speech Synthesis Using Text Descriptions and Reference Speech](zhou26h_interspeech.md) — same problem · relatedness 2.0/3
- [Continuous Time-Varying Emotion Control Zero-Shot Text-To-Speech With Emotion Orthogonal LoRA](wan26b_interspeech.md) — same problem · relatedness 2.0/3
- [Word-level Emotional Intensity Control in TTS via Emotion Residual Vectors](park26i_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
