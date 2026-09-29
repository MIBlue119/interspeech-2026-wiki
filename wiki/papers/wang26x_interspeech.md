---
id: wang26x_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1345
pdf: https://www.isca-archive.org/interspeech_2026/wang26x_interspeech.pdf
---

# Eliminating Stability Hallucinations in LLM-based TTS models via Attention Guidance

*Shiming Wang, Zhihao Du, Yang Xiang, Tianyu Zhao, Han Zhao, Qian Chen, Xiangang Li, Hanjie Guo, Zhen-Hua Ling*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1345)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper resolves stability hallucinations (repetitions and omissions) in LLM-based TTS models like CosyVoice2 by introducing an Optimal Alignment Score (OAS) metric and a teacher-guided chain-of-thought (CoT) training recipe, reducing hard-text Word Error Rate by up to 3.5% absolute.

## Key contributions

- Proposed the Optimal Alignment Score (OAS) using the Viterbi algorithm to evaluate text-to-speech alignment quality across decoder-only LLM attention heads, showing a -0.638 correlation with WER.
- Integrated OAS regularization into specific alignment heads (layers 8-9) of CosyVoice2 during training to enforce continuous and monotonic text-speech attention paths.
- Developed an attention-guided student training framework using optimal attention paths from a teacher model as pseudo-forced alignment labels, eliminating the need for external forced-alignment tools.
- Introduced sparse text repetition and an auxiliary progress bar prediction task (combining L1 and first-order difference loss) to prevent error accumulation and track absolute positional synthesis progress.

## Problem

Decoder-only LLM-based TTS models lack an explicit text-speech alignment mechanism and rely entirely on autoregressive next-token prediction. When processing long, complex, or repetitive texts, they frequently suffer from stability hallucinations—generating endless loops or omitting segments entirely. Prior mitigation strategies either rely on hard stepwise monotonic attention that degrades speech naturalness, or require expensive forced-alignment labels that are difficult to scale to massive datasets.

## Method

The base model is CosyVoice2, built on Qwen-0.5B (24 transformer layers, 14 attention heads per layer), pretrained on WenetSpeech4TTS. Through attention visualization, middle-layer heads (specifically layers 8 and 9) were identified as containing global forward alignment paths analogous to cross-attention. To supervise these, the Viterbi algorithm calculates an optimal alignment path P through the attention probability matrix A, maximizing probability along monotonic paths. The OAS metric (ratio of path probability to regional sum) is added as a loss objective.

To further suppress hallucinations, a student CosyVoice2 model is trained via chain-of-thought distillation using the highest-OAS attention head from a pre-trained teacher model as a pseudo-forced alignment label. To prevent error propagation from inaccurate boundaries, text tokens are structured as sparse repetition targets (e.g., [t1, M, M, t2, M, M]) where each token appears once with masks. Additionally, an absolute progress bar value p_i is predicted alongside text tokens, supervised via a joint L1 loss and first-order difference loss to track total synthesis progress.

## Experimental setup

Models were evaluated using WenetSpeech4TTS for scratch training, and tested on Seed-TTS-Eval (meta_zh / hardcase subsets) and CV3-Eval (zh / hard_zh subsets). Baselines include CosyVoice1 (CV1), standard CosyVoice2 (CV2), manually masked heads (CV2_M), and OAS-regularized models (CV2_OAS). Evaluation metrics comprise Word Error Rate (WER via Paraformer), Speaker Similarity (SIM via WavLM-large), UTMOS, and subjective Mean Opinion Score (MOS) evaluated by 15 native Mandarin speakers.

## Results

On the Seed-TTS-Eval hard text subset, standard CV2 achieves a 13.568% WER, which drops to 11.472% with OAS regularization (CV2_OAS) and further down to 9.984% with the full attention-guided sparse text and progress bar setup (CVAG). On the CV3-Eval hard text subset, WER drops from 10.239% (CV2) to 6.660% (CVAG), while maintaining competitive speaker similarity (0.725 vs 0.715) and UTMOS scores. Ablations show that sparse text token supervision outperforms full text token supervision (Dev accuracy 96.25% vs 89.59%), and adding the progress bar yields an additional WER drop. Subjective MOS under common text scenarios shows slight gains over baseline (4.25 for CV2_OAS vs 4.17 for CV2 on Seed-TTS).

| System | Seed-TTS (Hard WER) | Seed-TTS (Common WER) | CV3-Eval (Hard WER) | CV3-Eval (Common WER) |
|---|---|---|---|---|
| CV1 | 17.362% | 4.032% | 14.844% | 5.487% |
| CV2 | 13.568% | 1.938% | 10.239% | 4.089% |
| CV2_OAS | 11.472% | 1.755% | 8.657% | 3.637% |
| CVAG + sparse text & pb | 9.984% | 1.899% | 6.660% | 3.211% |

## Limitations

The approach is evaluated exclusively on Mandarin datasets (WenetSpeech4TTS, Seed-TTS-Eval, CV3-Eval), leaving multilingual scalability unverified. The method relies on a pre-trained teacher model (CosyVoice2) whose alignment paths serve as pseudo-labels, meaning any foundational failure in the teacher model could upper-bound the student's alignment quality. Furthermore, compute overhead introduced by attention masking and auxiliary progress tracking heads during training is not explicitly quantified.

## Why read this

Speech and ML researchers working on autoregressive LLM-based speech generation should read this to learn how to inject explicit monotonic alignment constraints and teacher distillation into decoder-only architectures without external forced-aligners.

## Code

- https://wsmzzz.github.io/llm_attn/index.html

## Applications

Robust zero-shot text-to-speech generation, audiobook synthesis, and conversational AI agents handling complex or repetitive text inputs.

## Institutions / 機構

University of Science and Technology of China

## Related

- (link related pages by id as the wiki grows)
