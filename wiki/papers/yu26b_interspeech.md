---
id: yu26b_interspeech
category: tts
labels: [efficient-on-device, generative-model]
institutions: ["Zuoyebang"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1015
pdf: https://www.isca-archive.org/interspeech_2026/yu26b_interspeech.pdf
---

# Enhancing Flow Matching with A Unified Guidance Framework for Efficient and Robust Speech Synthesis

*Zuda Yu, Qianhui Xu, Ting Chen, Junhui Zhang, Tao Fu, Hongjiang Yu, Qiangqiang Wang, Yang Song*

[PDF](https://www.isca-archive.org/interspeech_2026/yu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1015)

**Category:** `tts` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — A unified guidance framework for Flow Matching speech synthesis combines data-level heterogeneous perturbations with model-level intrinsic guidance distillation and trajectory rectification, achieving a 3.25× speedup (3 NFE) and improved speaker similarity.

## Key contributions

- Proposed a dual-stage Data-guidance (DG) strategy using model-driven cross-synthesis and signal-driven acoustic deformation (pitch/energy shifting) to suppress source acoustic shortcuts and prevent timbre leakage.
- Introduced an Enhanced Model-guidance (MG) mechanism that jointly optimizes intrinsic guidance distillation and online trajectory rectification in a single batch-level training loop.
- Eliminated Classifier-Free Guidance (CFG) double-pass overhead during inference, enabling high-fidelity speech generation in only 3 steps (NFE).
- Demonstrated a 3.25× inference acceleration while improving zero-shot speaker similarity across both Voice Conversion and Text-to-Speech tasks.

## Problem

Flow Matching (FM) speech models suffer from two major bottlenecks: high inference latency from curved ODE paths requiring high Number of Function Evaluations (NFE) compounded by Classifier-Free Guidance (CFG) double-forward-pass overhead, and zero-shot timbre leakage caused by information shortcuts where discrete semantic tokens retain residual source acoustic hints. Prior acceleration methods like Rectified Flow, InstaFlow, Consistency Models, and distillation techniques reduce NFE but leave CFG overhead untouched, while vector quantization and standard training fail to fully disentangle linguistic content from speaker identity. Solving these dual challenges is critical for deploying high-fidelity, robust zero-shot speech generation in real-time scenarios.

## Method

The framework utilizes a 330M-parameter Diffusion Transformer (DiT) decoder consisting of 20 stacked blocks with an attention dimension of 1024, a feed-forward dimension of 4096, and speaker conditioning injected via Adaptive Layer Normalization (AdaLN). The architecture replaces standard convolution-augmented decoders with pure DiT blocks to support continuous flow matching.

The training recipe is split into two stages: a foundational pre-training phase on 50k hours of Emilia English speech for 5 epochs using AdamW (learning rate warmed up to 1×10⁻⁴, cosine decayed to 1×10⁻⁵), followed by a 2-epoch unified optimization phase on a 60k-hour mixed corpus using 16 NVIDIA H100 GPUs. During this second phase, the DiT decoder undergoes batch-level joint optimization via two sequential backward passes: first, computing an intrinsic guidance distillation loss to internalize the CFG-aware velocity field directly into network weights without requiring dual passes at inference; second, using the updated model to simulate straight ODE paths on the fly via numerical integration and backpropagating a trajectory rectification loss.

Data-guidance is applied concurrently by feeding source tokens through a pretrained generative VC/TTS model for cross-synthesis, followed by randomized pitch and energy scaling deformations. This produces heavily mismatched training pairs (c_tilde) that force the model to rely solely on target acoustic prompts for timbre, preventing acoustic shortcut exploitation.

## Experimental setup

The model is pre-trained on 50k hours from the Emilia dataset and fine-tuned on a curated 60k-hour mixed corpus (combining clean high-DNSMOS data with 30k hours of heterogeneously perturbed pairs). Evaluations compare against a 10-NFE Base Model, Vanilla MG, and official CosyVoice2 baselines on LibriTTS and Seed-TTS datasets. Metrics include Real-Time Factor (RTF), Word Error Rate (WER) using Whisper-Large, and Speaker Similarity (SIM) via the Cam++ embedding model.

## Results

For Voice Conversion on LibriTTS, the Unified Guidance framework (3 NFE) achieves an RTF of 0.024 (a 3.25× speedup over the 10-NFE Base Model at 0.078 RTF) while maintaining strong non-parallel speaker similarity (0.808 vs 0.793 for Base). When applied as an acoustic backend for Text-to-Speech using the CosyVoice2 LLM, the Unified Guidance model matches the baseline intelligibility with a competitive WER of 2.60 on LibriTTS while outperforming the base model in speaker similarity (0.888 vs 0.871).

Ablation studies show that Data-guidance alone yields the highest absolute speaker similarity (0.869 non-parallel LibriTTS), while Enhanced Model-guidance alone achieves the extreme 0.024 RTF speedup but incurs a minor SIM drop. The combined Unified framework successfully balances both, recovering the SIM degradation while retaining the 3-step inference efficiency.

| System / Condition | RTF (↓) | LibriTTS Non-Parallel SIM (↑) | Seed-TTS Non-Parallel SIM (↑) |
|---|---|---|---|
| Ground Truth Reference | - | 0.073 | 0.128 |
| Base Model (10 NFE) | 0.078 | 0.793 | 0.730 |
| Data-guidance (10 NFE) | 0.078 | 0.869 | 0.792 |
| Vanilla MG (10 NFE) | 0.058 | 0.813 | 0.744 |
| Enhanced MG (3 NFE) | 0.024 | 0.792 | 0.722 |
| Unified Guidance (3 NFE) | 0.024 | 0.850 | 0.767 |

## Limitations

The evaluation is restricted to English speech corpora (Emilia and LibriTTS/Seed-TTS), leaving multilingual robustness and cross-lingual transfer unverified. Extreme trajectory rectification (3 steps) causes a slight degradation in WER compared to unperturbed baselines. The approach requires heavy auxiliary pipelines—including pretrained VC/TTS systems and signal augmentation engines—to construct the 30k-hour heterogeneous perturbation subset.

## Why read this

Researchers and engineers building real-time, flow-matching-based speech generation or voice conversion systems should read this to learn how to eliminate Classifier-Free Guidance overhead and mitigate timbre leakage simultaneously via joint data-model distillation.

## Code

- https://yuzuda283.github.io/unified-guidance-flow-matching/Interspeech2026_demo_samples/

## Applications

Real-time zero-speech text-to-speech, voice conversion, and high-fidelity speech generation backends for conversational audio-language models.

## Institutions / 機構

Zuoyebang

## Related

- (link related pages by id as the wiki grows)
