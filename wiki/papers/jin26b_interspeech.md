---
id: jin26b_interspeech
category: tts
labels: [generative-model]
institutions: ["Tsinghua University", "Ant Group"]
code: https://thuhcsi.github.io/ElasticDLM/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1069
pdf: https://www.isca-archive.org/interspeech_2026/jin26b_interspeech.pdf
---

# Learning to Rescale: On-the-Fly Sequence Length Adaptation in Non-Autoregressive Speech Synthesis

*Jiawei Jin, Ren Wang, Zhiyu Cui, Shun Lei, Yixuan Zhou, Zhiyong Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/jin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1069)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — ElasticDLM is a variable-length non-autoregressive diffusion language model for text-to-speech that eliminates reliance on accurate pre-calculated character-level durations by introducing learnable functional tokens and dynamic length scaling, matching or exceeding baseline synthesis quality even under severe initial length mispredictions.

## Key contributions

- Proposes a variable-length non-autoregressive speech synthesis architecture integrating two functional tokens ([EXPAND] and [DELETE]) for unified, learnable length regulation.
- Develops the Differentiated Length-Scaling Training Scheme (DLTS), combining block-wise merging/insertion with an auxiliary length-scaling loss to handle acoustic redundancy.
- Introduces the Hierarchical Confidence-Guided Inference (HCGI) strategy for coarse-to-fine sequence length refinement alongside content generation with negligible latency overhead.
- Achieves robust performance across extreme initialization variations (1s to 16s) and highly expressive emotional styles without requiring precise forced alignments.

## Problem

Non-autoregressive (NAR) text-to-speech models typically rely on pre-extracted character-level durations or fixed global duration estimates from external aligners (like Montreal Forced Aligner or teacher-forcing models). Inaccurate duration predictions lead to severe audible artifacts such as unnatural speaking rates, fragmented prosody, and total synthesis failure under in-the-wild conditions. While variable-length diffusion language models exist in text generation (e.g., DreamOn), directly applying single-token insertion and deletion operations fails on speech due to high temporal resolution, acoustic redundancy, and strict inference budgets.

## Method

ElasticDLM builds upon the 16-layer Transformer architecture (hidden size 1536, 16 attention heads) of MaskGCT's Text-to-Semantic model, taking phoneme tokens and timbre-prompt semantic tokens as condition input $C$. The framework incorporates [EXPAND] and [DELETE] functional tokens into a cascaded Diffusion Language Model (DLM) to handle sequence length adjustments dynamically. During training, the Differentiated Length-Scaling Training Scheme (DLTS) applies standard content masking followed by a stochastic block-wise compression where non-overlapping blocks of $n$ masked tokens are merged with probability $p$, and insertion counts are sampled uniformly from $k \sim \text{Uniform}(1, \lfloor \alpha(t) \cdot L \rfloor)$. The model is optimized using a composite objective combining standard negative log-likelihood (NLL) loss over masked positions and an auxiliary length loss weighted by $\lambda$ that minimizes absolute error between ground-truth and predicted total length changes.

During inference, the Hierarchical Confidence-Guided Inference (HCGI) strategy processes sequences in a coarse-to-fine manner. At each step $t$, the model extracts softmax confidence scores $p_{\text{exp}}$ and $p_{\text{del}}$ for the functional tokens; if they exceed threshold $\tau$ (set to 0.8), operations are immediately triggered, executing [DELETE] removals or replacing [EXPAND] tokens with $n$ [MASK] tokens. Simultaneously, content logits utilize top-$k$ sampling ($k=20$, temperature linearly annealed from 1.5 to 0 over 50 steps), and the lowest confidence tokens are re-masked according to a sine scheduling function.

## Experimental setup

The model is trained on 100k hours of data from the English and Chinese subsets of Emilia-large using 24 NVIDIA A100 (80GB) GPUs. Training uses the AdamW optimizer with a 1e-4 learning rate and 32K warmup steps, setting expansion block size $n=5$. Evaluations are conducted on the seed-test-zh and seed-testen benchmarks from Seed-TTS, comparing against MaskGCT variants (Normal, Fix with 4s/4.5s initialization, and GT oracle), E2-TTS, and F5-TTS, using Word Error Rate (WER), Len-L1 sequence length distance, WavLM cosine speaker similarity (Sim), and Mean Opinion Score (N-MOS).

## Results

On the seed-test-zh benchmark, Ours-Normal achieves a WER of 2.387%, Len-L1 of 0.7091s, N-MOS of 4.20, and speaker similarity of 0.772, performing comparably to the oracle MaskGCT-GT while outperforming standard MaskGCT-Normal on naturalness and length accuracy. Under the challenging Fix setting (with fixed 4s/4.5s initialization), the baseline MaskGCT-Fix degrades severely (WER 4.182% zh / 13.341% en, Len-L1 1.6993s zh), whereas ElasticDLM (Ours-Fix) maintains strong robustness with a WER of 2.582% (zh) / 4.349% (en) and Len-L1 of 0.8752s (zh). Ablations confirm that removing the length-loss or HCGI strategy causes substantial performance drops, with w/o HCGI-Fix skyrocketing WER to 4.005% (zh) and 5.652% (en). In extreme initial length tests ranging from 1s to 16s, baseline models like E2-TTS, F5-TTS, and MaskGCT experience catastrophic WER degradation (up to 107.76% at 16s), whereas ElasticDLM constantly maintains low WER (~2.4% to 2.6%).

| System | WER (zh) | Len-L1 (zh) | N-MOS (zh) | WER (en) | Len-L1 (en) | N-MOS (en) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| MaskGCT-GT | 2.286% | - | 4.23 ± 0.13 | 3.833% | - | 4.27 ± 0.14 |
| MaskGCT-Fix | 4.182% | 1.6993s | 3.72 ± 0.16 | 13.341% | 1.0156s | 3.58 ± 0.19 |
| MaskGCT-Normal | 2.330% | 0.8555s | 3.84 ± 0.18 | 3.936% | 0.5429s | 3.96 ± 0.14 |
| Ours-Fix | 2.582% | 0.8752s | 4.17 ± 0.15 | 4.349% | 0.6956s | 4.29 ± 0.12 |
| Ours-Normal | 2.387% | 0.7091s | 4.20 ± 0.13 | 3.534% | 0.5283s | 4.44 ± 0.12 |

## Limitations

The approach requires a two-stage cascaded setup (semantic token generation followed by acoustic decoding via MaskGCT), adding architectural complexity. Evaluation is presently restricted to English and Chinese datasets, leaving multi-lingual scaling beyond these families unverified. Furthermore, the block-size hyperparameter $n$ requires manual tuning (optimal at $n=5$), and performance relies on sufficient pre-trained weight initialization from existing large-scale discrete speech models.

## Why read this

Speech researchers and engineers working on non-autoregressive text-to-speech should read this paper to learn how to completely decouple generative acoustic models from rigid forced-aligner durations using functional tokens and confidence-guided inference strategies.

## Code

- https://thuhcsi.github.io/ElasticDLM/

## Applications

High-fidelity text-to-speech generation, expressive audiobooks, and interactive voice assistants requiring dynamic speaking rates and robust handling of unconstrained text inputs.

## Institutions / 機構

Tsinghua University, Ant Group

**Funding / 經費:** National Natural Science Foundation of China, National Social Science Foundation of China, Ant Group

## Related

- [DLLM-TTS: Block Discrete Diffusion Language Model for Text-to-Speech Synthesis](madha26_interspeech.md) — same problem · relatedness 2.5/3
- [Beyond Two-stage Diffusion TTS: Joint Structure and Content Refinement via Jump Diffusion](ai26b_interspeech.md) — same problem · relatedness 2.4/3
- [RobustSpeechFlow: Learning Robust Text-to-Speech Trajectories via Augmentation-based Contrastive Flow Matching](yang26p_interspeech.md) — same problem · relatedness 2.1/3
- [DiFlow-TTS: Compact and Low-Latency Zero-Shot Text-to-Speech with Discrete Flow Matching](nguyen26d_interspeech.md) — same problem · relatedness 2.1/3
- [Semantic-VAE: Semantic-Alignment Latent Representation for Better Speech Synthesis](niu26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
