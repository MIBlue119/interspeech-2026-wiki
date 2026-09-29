---
id: seki26_interspeech
category: enhancement-separation
labels: [generative-model]
institutions: ["CyberAgent"]
code: https://github.com/goombalab/hydra
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1833
pdf: https://www.isca-archive.org/interspeech_2026/seki26_interspeech.pdf
---

# Improving DF-Conformer using Hydra for high-fidelity generative speech enhancement on discrete codec token

*Shogo Seki, Shaoxiang Dang, Li Li*

[PDF](https://www.isca-archive.org/interspeech_2026/seki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/seki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1833)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — This paper proposes DC-Hydra, replacing the FAVOR+ linear attention mechanism in DF-Conformer with the Hydra bidirectional state-space model to improve generative speech enhancement on discrete codec tokens. The proposed Hydra model surpasses both FAVOR+ and Bi-Mamba baselines across non-intrusive and downstream metrics while retaining linear time complexity.

## Key contributions

- Identifies specific performance bottlenecks in the DF-Conformer's FAVOR+ module, including poor focus ability, reduced feature diversity, and semantic confusion due to low-rank approximations.
- Introduces DC-Hydra to generative speech enhancement (Genhancer), substituting FAVOR+ with Hydra—a quasiseparable matrix mixer model offering superior bidirectional Mamba modeling.
- Demonstrates that Hydra-based Genhancer achieves state-of-the-art performance among linear-complexity alternatives, outperforming Bi-Mamba and even beating Softmax attention on character accuracy (88.95%).
- Provides comprehensive evaluations across non-intrusive SE, task-independent, and task-dependent downstream metrics under varying sequence lengths up to 96 seconds.

## Problem

Traditional speech enhancement has evolved into generative speech enhancement (GSE) by recovering missing content using neural codecs and vocoders, with Genhancer acting as a prominent framework. Genhancer relies on the DF-Conformer backbone, which combines dilated convolutions with FAVOR+ (positive orthogonal random features) to achieve linear time complexity O(Trd) instead of O(T^2 d) softmax attention. However, linear attention mechanisms rely on low-rank approximations that suffer from blurred attention maps, limited feature diversity, and non-injective semantic confusion. While full softmax attention avoids these issues, it carries prohibitive quadratic complexity for long-form speech generation.

## Method

The proposed DC-Hydra framework integrates the Hydra architecture into the Genhancer pipeline, replacing FAVOR+ within the latent denoiser and token generator blocks. Genhancer operates on Descript Audio Codec (DAC) tokens (K=9 quantizers, 1024 codewords, 8-dimensional tokens at 86 Hz) combined with pretrained large WavLM self-supervised learning features through a fusion layer. The core backbone stacks 8 blocks (256 channels) for the latent denoiser and 12 blocks (512 channels) for the token generator, where depthwise dilated convolutions (dilation scale factor of 2 every 4 blocks) and Hydra modules are sandwiched between feed-forward networks with LayerNorm and residual connections.

Mathematically, sequence transformations are viewed through the matrix mixer framework where softmax uses a dense full-rank matrix, FAVOR+ uses a low-rank kernel approximation, and Mamba/Hydra utilize semiseparable and quasiseparable matrix mixers respectively. Unlike addition-based Bi-Mamba which shares non-diagonal parameters across forward and backward directions, Hydra models diagonal elements separately to deliver stronger representational capacity with linear complexity.

## Experimental setup

Models were trained on LibriTTS-R speech data (upsampled to 48 kHz via bandwidth extension, resampled to 44.1 kHz), mixed on-the-fly with noises from TAU Urban Audio-Visual Scenes 2021, DNS Challenge, and SFS-Static, plus room impulse responses from MIT IR Survey, EchoThief, and OpenSLR28 at SNRs between -10 and 20 dB. Evaluation used the DAPS dataset containing 1200 test samples across 12 real-world noisy environments. Baselines include Miipher, Softmax attention, FAVOR+, and Bi-Mamba. Training ran for 400,000 steps using AdamW optimizer (cosine learning rate from 1e-5 to 1e-4 warmup, decaying to 1e-5), batch size 16 (8-second audio chunks) on 4 NVIDIA A100 GPUs for approximately 5 days. Parameter counts are 98M (FAVOR+ and Softmax), 107M (Bi-Mamba), and 106M (Hydra).

## Results

On the DAPS evaluation set, the proposed Hydra model achieves top-tier results: DNSMOS 3.44, NISQA 4.81, UTMOS 3.48, SpeechBERTScore 0.89, LPS 0.84, SpkSim 0.83, and CAcc of 88.95%. It outperforms the baseline FAVOR+ across all metrics (e.g., NISQA 4.76 vs 4.81, UTMOS 3.33 vs 3.48) and exceeds Bi-Mamba (CAcc 88.04% vs 88.95%). The Softmax baseline hits an upper bound on DNSMOS (3.46) and UTMOS (3.53) with quadratic complexity, but Hydra surpasses even Softmax in character accuracy (88.95% vs 87.88%). In sequence length scaling experiments up to 96 seconds, Softmax suffers severe performance degradation, whereas FAVOR+ and Hydra maintain stable performance, with Hydra consistently outperforming all linear variants.

| System | DNSMOS ↑ | NISQA ↑ | UTMOS ↑ | SpeechBERTScore ↑ | SpkSim ↑ | CAcc [%] ↑ |
|---|---|---|---|---|---|---|
| Clean | 3.39 | 4.71 | 3.83 | N/A | N/A | 91.35 |
| Noisy | 2.56 | 2.58 | 1.70 | 0.82 | 0.91 | 90.93 |
| Miipher | 3.33 | 3.83 | 2.77 | 0.86 | 0.73 | 87.82 |
| Softmax | 3.46 | 4.78 | 3.53 | 0.88 | 0.83 | 87.88 |
| FAVOR+ | 3.44 | 4.76 | 3.33 | 0.87 | 0.79 | 88.24 |
| Hydra (ours) | 3.44 | 4.81 | 3.48 | 0.89 | 0.83 | 88.95 |

## Limitations

Like other generative SE approaches, all evaluated models yield lower character accuracy than noisy input due to generative hallucinations such as breathing artifacts. The evaluation is restricted to English datasets (LibriTTS-R and DAPS) and tested up to 96-second sequence lengths. Furthermore, compute resources required for training (4x A100 GPUs for 5 days) remain substantial.

## Why read this

Read this paper if you are building state-space model backbones for speech generation or struggling with the approximation trade-offs of linear attention mechanisms like FAVOR+. It provides a clear architectural recipe for integrating bidirectional quasiseparable SSMs (Hydra) into discrete token generative speech enhancement frameworks.

## Code

- https://github.com/goombalab/hydra

## Applications

High-fidelity generative speech enhancement, noise suppression, and dereverberation for telecommunications and downstream speech recognition pipelines.

## Institutions / 機構

CyberAgent

## Related

- [Seed-Enh: Generative Speech Enhancement in Decoupled Semantic and Timbre Spaces](shang26_interspeech.md) — same problem · relatedness 2.6/3
- [UniSE: A Unified Framework for Decoder-Only Autoregressive LM-Based Speech Enhancement](yan26_interspeech.md) — same problem · relatedness 2.6/3
- [Schrödinger Bridge Mamba for One-Step Speech Enhancement](yang26e_interspeech.md) — same problem · relatedness 2.5/3
- [DelayGSE: A Generative Speech Enhancement Framework with Delayed Text-Aware Conditioning](yuan26b_interspeech.md) — same problem · relatedness 2.5/3
- [StuPASE: Towards Low-Hallucination Studio-Quality Generative Speech Enhancement](rong26_interspeech.md) — same problem · relatedness 2.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
